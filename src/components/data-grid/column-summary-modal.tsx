"use client";

import { useState, useMemo, useEffect } from "react";
import { X, ArrowDown01, ArrowUp10, Sigma, Divide, TrendingUp, Download, BarChart2, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnConfig } from "./types";
import { cn } from "@/lib/utils";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ColumnSummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    column: ColumnConfig | null;
    data: Record<string, any>[];
}

type SummaryStats = {
    sum: number;
    avg: number;
    min: number;
    max: number;
}

export function ColumnSummaryModal({ isOpen, onClose, column, data }: ColumnSummaryModalProps) {
    const [stats, setStats] = useState<SummaryStats | null>(null);
    const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Initialize chart type from column config
    useEffect(() => {
        if (column?.defaultChartType) {
            setChartType(column.defaultChartType);
        }
    }, [column]);

    // Calculate stats automatically when modal opens or column/data changes
    useEffect(() => {
        if (!isOpen || !column || !data.length) return;

        const values = data
            .map(row => row[column.accessorKey])
            .filter(val => typeof val === 'number');

        if (values.length === 0) {
            setStats({ sum: 0, avg: 0, min: 0, max: 0 });
            return;
        }

        const sum = values.reduce((acc, curr) => acc + curr, 0);
        const avg = sum / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);

        setStats({
            sum,
            avg: parseFloat(avg.toFixed(2)),
            min,
            max
        });
    }, [isOpen, column, data]);

    const chartData = useMemo(() => {
        if (!isOpen || !column || !data.length) return { items: [], maxValue: 0, groupBy: '' };

        // Try to find a grouping column (Department, Region, etc.)
        const sampleRow = data[0];
        const groupBy = Object.keys(sampleRow).find(key =>
            ['department', 'region', 'category', 'status', 'position'].includes(key.toLowerCase())
        ) || Object.keys(sampleRow).find(key => typeof sampleRow[key] === 'string' && key !== 'id' && key !== column.accessorKey);

        if (!groupBy) return { items: [], maxValue: 0, groupBy: '' };

        // Aggregate data
        const groups: Record<string, number> = {};
        data.forEach(row => {
            const groupKey = String(row[groupBy] || 'Unknown');
            const val = row[column.accessorKey];
            if (typeof val === 'number') {
                groups[groupKey] = (groups[groupKey] || 0) + val;
            }
        });

        const totalValue = Object.values(groups).reduce((acc, curr) => acc + curr, 0);

        // Convert to array and sort by value desc
        const sorted = Object.entries(groups)
            .map(([label, value]) => ({
                label,
                value,
                percentage: totalValue > 0 ? (value / totalValue) * 100 : 0
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10); // Top 10 for better visibility

        const maxValue = Math.max(...sorted.map(s => s.value));

        return { items: sorted, maxValue, groupBy };
    }, [isOpen, column, data]);

    // Helper for compact number formatting
    const formatCompactNumber = (number: number) => {
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(number);
    };

    if (!isOpen || !column) return null;

    if (!isMounted) return null;

    // Calculate additional insights
    const topCategory = chartData.items[0];
    const dataSpread = (stats?.max || 0) - (stats?.min || 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-5xl bg-[#F8FAFC] rounded-xl  border border-border p-6 pt-3 animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <div>
                        <h2 className="text-[20px] font-bold text-[#7468FC]  flex items-center gap-2">
                            {column.header} Analysis
                        </h2>
                        {/* <p className="text-muted-foreground text-sm">
                            Deep dive into {data.length} records
                        </p> */}
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
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                            subLabel="Mean Value"
                            color="emerald"
                        />
                        <StatCard
                            label="MINIMUM"
                            value={stats?.min}
                            icon={<ArrowDown01 className="w-5 h-5 text-amber-500" />}
                            subLabel="Lowest Entry"
                            color="amber"
                        />
                        <StatCard
                            label="MAXIMUM"
                            value={stats?.max}
                            icon={<ArrowUp10 className="w-5 h-5 text-purple-500" />}
                            subLabel="Highest Entry"
                            color="purple"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-2 pl-px">
                        {/* Chart Section - Takes up 2 columns */}
                        <div className="lg:col-span-2 bg-white rounded-xl  border-none shadow-sm ">
                            <div className="flex items-center justify-between mb-6 pt-2 pr-2">
                                <h3 className="text-[16px] px-5  font-semibold text-foreground uppercase flex items-center gap-2">
                                    Distribution by {chartData.groupBy}
                                </h3>
                                <div className="flex gap-1 bg-muted p-1 rounded-lg  ">
                                    <button
                                        onClick={() => setChartType('bar')}
                                        className={cn(
                                            "p-1.5 rounded-md transition-all",
                                            chartType === 'bar' ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        title="Bar Chart"
                                    >
                                        <BarChart2 className="w-4 h-4 rotate-90" />
                                    </button>
                                    <button
                                        onClick={() => setChartType('line')}
                                        className={cn(
                                            "p-1.5 rounded-md transition-all",
                                            chartType === 'line' ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        title="Line Chart"
                                    >
                                        <TrendingUp className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    {chartType === 'bar' ? (
                                        <BarChart data={chartData.items} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis
                                                dataKey="label"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748B', fontSize: 11 }}
                                                dy={10}
                                                tickFormatter={(val) => val.length > 10 ? `${val.substring(0, 10)}...` : val}
                                            />
                                            <YAxis
                                                // itemType="number" 
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748B', fontSize: 11 }}
                                                tickFormatter={formatCompactNumber}
                                                width={50}
                                            />
                                            <Tooltip
                                                cursor={{ fill: '#F1F5F9' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: number) => [value.toLocaleString(), column.header]}
                                            />
                                            <Bar
                                                dataKey="value"
                                                fill="#8B5CF6"
                                                radius={[4, 4, 0, 0]}
                                                barSize={40}
                                            />
                                        </BarChart>
                                    ) : (
                                        <LineChart data={chartData.items} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis
                                                dataKey="label"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748B', fontSize: 11 }}
                                                dy={10}
                                                tickFormatter={(val) => val.length > 10 ? `${val.substring(0, 10)}...` : val}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748B', fontSize: 11 }}
                                                tickFormatter={formatCompactNumber}
                                                width={50}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: number) => [value.toLocaleString(), column.header]}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#8B5CF6"
                                                strokeWidth={3}
                                                dot={{ fill: '#8B5CF6', r: 4, strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 6, strokeWidth: 0 }}
                                            />
                                        </LineChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>


                        <div className=" lg:col-span-2 rounded-xl p-6 border bg-card border-blue-500/10 flex flex-col justify-between shadow-sm">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-4">
                                    AI Analysis: &apos;{column.header}&apos;
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    The <strong>{column.header}</strong> data shows strong performance, with a total volume of <strong>{stats?.sum.toLocaleString()}</strong>.
                                    The average value sits at <strong>{stats?.avg.toLocaleString()}</strong>, indicating a healthy baseline.
                                    <br /><br />
                                    Outliers range from a minimum of {stats?.min.toLocaleString()} to a peak of {stats?.max.toLocaleString()},
                                    suggesting significant variance in this dataset that may warrant further investigation into the top performers.
                                </p>
                            </div>

                            <div className="mt-6 flex justify-end gap-3 pt-6 border-t border-border">
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white border-0"
                                    onClick={() => console.log("Exporting...")}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    EXPORT
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-border text-foreground hover:bg-muted"
                                    onClick={onClose}
                                >
                                    CLOSE
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, subLabel, color }: { label: string, value: number | undefined, icon: React.ReactNode, subLabel: string, color: 'blue' | 'emerald' | 'amber' | 'purple' }) {


    return (
        <div className={cn("rounded-xl p-4 border-none transition-all hover:shadow-md shadow-sm bg-card  border-none",)}>
            <div className="flex items-center gap-2 mb-3">
                {icon}
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
                {value?.toLocaleString() ?? "-"}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                {subLabel}
            </div>
        </div>
    );
}
