"use client";

import { useState, useMemo, useEffect } from "react";
import {
  X,
  ArrowDown01,
  ArrowUp10,
  Sigma,
  Divide,
  TrendingUp,
  Download,
  BarChart2,
  Hash,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnConfig, TableConfig } from "./types";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useTheme } from "next-themes";

interface ColumnSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  column: ColumnConfig | null;
  config: TableConfig;
  data: Record<string, any>[];
}

type SummaryStats = {
  sum: number;
  avg: number;
  min: number;
  max: number;
};

export function ColumnSummaryModal({
  isOpen,
  onClose,
  column,
  config,
  data,
}: ColumnSummaryModalProps) {
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [chartItems, setChartItems] = useState<any[]>([]);
  const [groupByColumn, setGroupByColumn] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStats(null);
      setChartItems([]);
      setGroupByColumn("");
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen, column]);
  const MODEL_URL = process.env.NEXT_PUBLIC_MODEL_URL;

  // Fetch analytics when modal opens and column is available
  useEffect(() => {
    // If we have manual data passed in prop (length > 0) AND no config.tableName, maybe fall back to client side?
    // But requirement is to call API.
    if (!isOpen || !column || !config) return;

    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. Call LLM to get chart config
        const llmPayload = {
          table_name: config.tableName || "unknown_table",
          table_description: config.tableDescription || "",
          selected_column: {
            name: column.accessorKey,
            description: column.description || "",
            data_type: "number",
          },
          existing_columns:
            config.columns?.map((c) => ({
              name: c.accessorKey,
              type: c.type || "string",
              description: c.description || "",
            })) || [],
        };
        const llmRes = await fetch(`${MODEL_URL}/chat-analytics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(llmPayload),
        });

        if (!llmRes.ok) throw new Error("Failed to get analysis from LLM");
        const llmData = await llmRes.json();

        // 2. Call Backend Analytics with LLM config
        const analyticsPayload = {
          table_name: config.tableName || "unknown_table",
          chart: llmData.chart,
        };

        const analyticsRes = await fetch(`${MODEL_URL}/analytics/analytics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(analyticsPayload),
        });

        if (!analyticsRes.ok) throw new Error("Failed to get analytics data");
        const analyticsData = await analyticsRes.json();

        // 3. Process Response
        if (analyticsData.summary) {
          setStats({
            sum: analyticsData.summary.sum_value,
            avg: parseFloat(analyticsData.summary.avg_value.toFixed(2)),
            min: analyticsData.summary.min_value,
            max: analyticsData.summary.max_value,
          });
        }

        if (analyticsData.grouped) {
          const items = analyticsData.grouped
            .map((item: any) => ({
              label: String(item.x),
              value: item.sum_value,
            }))
            .sort((a: any, b: any) => b.value - a.value)
            .slice(0, 10);

          setChartItems(items);
          setGroupByColumn(analyticsData.chart?.x || "Group");
          setChartType(analyticsData.chart?.type || "bar");
        }
      } catch (err: any) {
        console.error("Analytics Error:", err);
        setError(err.message || "Failed to load analytics");
        // Fallback or empty state handled by UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [isOpen, column, config]);

  // Helper for compact number formatting
  const formatCompactNumber = (value: any) => {
    if (typeof value !== "number") return String(value);
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  if (!isOpen || !column) return null;
  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-5xl bg-[#F8FAFC] dark:bg-background rounded-xl border border-border p-6 pt-3 animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div>
            <h2 className="text-[20px] font-bold text-[#7468FC] flex items-center gap-2">
              {column.header} Analysis
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
          >
            <X className="min-w-6 min-h-6" />
          </Button>
        </div>

        <div className="overflow-y-auto flex-1 pr-2">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="h-8 w-8 animate-pulse text-primary" />
                <p className="text-muted-foreground">
                  Generating Smart Analysis...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center text-destructive">
              <p>Error: {error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="mt-4"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1 mb-6">
                <StatCard
                  label="SUM"
                  value={stats?.sum}
                  icon={<Sigma className="w-5 h-5 text-blue-500" />}
                  subLabel={`Total ${column.header}`}
                  color="blue"
                />
                <StatCard
                  label="AVERAGE"
                  value={stats?.avg}
                  icon={<Divide className="w-5 h-5 text-emerald-500" />}
                  subLabel={`Average ${column.header}`}
                  color="emerald"
                />
                <StatCard
                  label="MINIMUM"
                  value={stats?.min}
                  icon={<ArrowDown01 className="w-5 h-5 text-amber-500" />}
                  subLabel={`Lowest ${column.header}`}
                  color="amber"
                />
                <StatCard
                  label="MAXIMUM"
                  value={stats?.max}
                  icon={<ArrowUp10 className="w-5 h-5 text-purple-500" />}
                  subLabel={`Highest ${column.header}`}
                  color="purple"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-2 pl-px">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white dark:bg-card rounded-xl border-none shadow-sm h-[360px] flex flex-col">
                  <div className="flex items-center justify-between mb-2 pt-2 pr-2 shrink-0">
                    <h3 className="text-[16px] px-5 font-semibold text-foreground uppercase flex items-center gap-2">
                      Distribution by {groupByColumn}
                    </h3>
                    <div className="flex gap-1 bg-muted p-1 rounded-lg">
                      <button
                        onClick={() => setChartType("bar")}
                        className={cn(
                          "p-1.5 rounded-md transition-all cursor-pointer",
                          chartType === "bar"
                            ? "bg-app-white text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        title="Bar Chart"
                      >
                        <BarChart2 className="w-4 h-4 rotate-90" />
                      </button>
                      <button
                        onClick={() => setChartType("line")}
                        className={cn(
                          "p-1.5 rounded-md transition-all cursor-pointer",
                          chartType === "line"
                            ? "bg-app-white text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        title="Line Chart"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === "bar" ? (
                        <BarChart
                          data={chartItems}
                          margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={isDark ? "#334155" : "#E2E8F0"}
                          />
                          <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: isDark ? "#94A3B8" : "#64748B",
                              fontSize: 11,
                            }}
                            dy={10}
                            tickFormatter={(val) =>
                              val.length > 10
                                ? `${val.substring(0, 10)}...`
                                : val
                            }
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: isDark ? "#94A3B8" : "#64748B",
                              fontSize: 11,
                            }}
                            tickFormatter={formatCompactNumber}
                            width={50}
                          />
                          <Tooltip
                            cursor={{ fill: "transparent" }}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              backgroundColor: isDark ? "#020817" : "#ffffff",
                              color: isDark ? "#e2e8f0" : "#0f172a",
                              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.25)",
                            }}
                            formatter={(value: any) => [
                              typeof value === "number"
                                ? value.toLocaleString()
                                : value,
                              column.header,
                            ]}
                          />
                          <Bar
                            dataKey="value"
                            fill="#8B5CF6"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                          >
                            <LabelList
                              dataKey="value"
                              position="top"
                              formatter={formatCompactNumber}
                              style={{
                                fill: isDark ? "#94A3B8" : "#64748B",
                                fontSize: 11,
                                fontWeight: 500,
                              }}
                            />
                          </Bar>
                        </BarChart>
                      ) : (
                        <LineChart
                          data={chartItems}
                          margin={{ top: 10, right: 30, left: 5, bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={isDark ? "#334155" : "#E2E8F0"}
                          />
                          <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: isDark ? "#94A3B8" : "#64748B",
                              fontSize: 11,
                            }}
                            dy={10}
                            tickFormatter={(val) =>
                              val.length > 10
                                ? `${val.substring(0, 10)}...`
                                : val
                            }
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: isDark ? "#94A3B8" : "#64748B",
                              fontSize: 11,
                            }}
                            tickFormatter={formatCompactNumber}
                            width={50}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              backgroundColor: isDark ? "#020817" : "#ffffff",
                              color: isDark ? "#e2e8f0" : "#0f172a",
                              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.25)",
                            }}
                            formatter={(value: any) => [
                              typeof value === "number"
                                ? value.toLocaleString()
                                : value,
                              column.header,
                            ]}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8B5CF6"
                            strokeWidth={3}
                            dot={{
                              fill: "#8B5CF6",
                              r: 4,
                              strokeWidth: 2,
                              stroke: isDark ? "#020817" : "#ffffff",
                            }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                          >
                            <LabelList
                              dataKey="value"
                              position="insideBottomLeft"
                              formatter={formatCompactNumber}
                              style={{
                                fill: isDark ? "#94A3B8" : "#64748B",
                                fontSize: 11,
                                fontWeight: 500,
                              }}
                            />
                          </Line>
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>

                <div
                  className="lg:col-span-2 rounded-xl p-6 pt-4 border shadow-sm flex flex-col justify-between relative overflow-hidden group
                    bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-indigo-100
                    dark:from-indigo-950/40 dark:to-purple-950/30 dark:border-indigo-900/40"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2">
                        <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-300">
                        AI Analysis: {column.header}
                      </h3>
                    </div>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        Analysis generated for <strong>{column.header}</strong>{" "}
                        based on {groupByColumn}.
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        Total value is{" "}
                        <strong>{stats?.sum?.toLocaleString()}</strong> with an
                        average of{" "}
                        <strong>{stats?.avg?.toLocaleString()}</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  subLabel,
  color,
}: {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
  subLabel: string;
  color: "blue" | "emerald" | "amber" | "purple";
}) {
  return (
    <div
      className={cn(
        "rounded-[8px] p-3  border-none shadow-[0px_0px_2px_1px_rgba(0,0,0,0.1)] dark:bg-accent transition-all duration-200 ",
      )}
    >
      <div className="flex items-start gap-4 pr-4 h-full   ">
        <div
          className={cn(
            "p-2 rounded-lg",
            "bg-blue-100 dark:bg-gray-600  h-full w-14 flex justify-center items-center text-blue-600  ",
          )}
        >
          <div className="[&>svg]:w-6 [&>svg]:h-6 [&>svg]:text-blue-600 dark:[&>svg]:text-gray-300">
            {icon}
          </div>
        </div>

        <div className="space-y-1  flex  flex-col justify-center items-center flex-1">
          <div className="text-2xl font-bold text-slate-800 dark:text-foreground tracking-tight">
            {value?.toLocaleString() ?? "-"}
          </div>
          <div className="text-sm font-normal text-slate-400">{subLabel}</div>
        </div>
      </div>
    </div>
  );
}
