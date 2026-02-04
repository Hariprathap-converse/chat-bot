"use client";

import { useState, useMemo, useEffect } from "react";
import { X, ArrowDown01, ArrowUp10, Sigma, Divide, TrendingUp, Download, BarChart2, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnConfig } from "./types";
import { cn } from "@/lib/utils";

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
        if (!isOpen || !column || !data.length) return [];

        // Try to find a grouping column (Department, Region, etc.)
        const sampleRow = data[0];
        const groupBy = Object.keys(sampleRow).find(key =>
            ['department', 'region', 'category', 'status', 'position'].includes(key.toLowerCase())
        ) || Object.keys(sampleRow).find(key => typeof sampleRow[key] === 'string' && key !== 'id' && key !== column.accessorKey);

        if (!groupBy) return [];

        // Aggregate data
        const groups: Record<string, number> = {};
        data.forEach(row => {
            const groupKey = String(row[groupBy] || 'Unknown');
            const val = row[column.accessorKey];
            if (typeof val === 'number') {
                groups[groupKey] = (groups[groupKey] || 0) + val;
            }
        });

        // Convert to array and sort by value desc
        const sorted = Object.entries(groups)
            .map(([label, value]) => ({ label, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // Top 5

        const maxValue = Math.max(...sorted.map(s => s.value));

        return { items: sorted, maxValue, groupBy };
    }, [isOpen, column, data]);

    if (!isOpen || !column) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-4xl bg-[#F8FAFC] rounded-xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <div>

                        <h2 className="text-[20px] font-bold text-[#7468FC]  uppercase">
                            {column.header} Analysis
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-muted-foreground absolute top-2 right-4 hover:text-foreground hover:bg-muted rounded-full"
                    >
                        <X className="min-w-6 min-h-6" />
                    </Button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-4 mb-8">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chart Section */}
                    {chartData.items && chartData.items.length > 0 && (
                        <div className="bg-card rounded-xl p-5 pt-3 pl-3 border-none shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-[16px] font-semibold text-foreground uppercase flex items-center gap-2">
                                    Distribution by {chartData.groupBy}
                                </h3>
                                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                                    <button
                                        onClick={() => setChartType('bar')}
                                        className={cn(
                                            "p-1.5 rounded-md transition-all",
                                            chartType === 'bar' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        title="Bar Chart"
                                    >
                                        <BarChart2 className="w-4 h-4 rotate-90" />
                                    </button>
                                    <button
                                        onClick={() => setChartType('line')}
                                        className={cn(
                                            "p-1.5 rounded-md transition-all",
                                            chartType === 'line' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        title="Line Chart"
                                    >
                                        <TrendingUp className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="h-[200px] w-full relative flex items-end">
                                {chartType === 'bar' ? (
                                    <div className="space-y-4 w-full h-full overflow-y-auto pr-2">
                                        {chartData.items.map((item, index) => (
                                            <div key={index} className="flex flex-col gap-1.5">
                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                    <span>{item.label}</span>
                                                    <span>{item.value.toLocaleString()}</span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 ease-out"
                                                        style={{ width: `${item.percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-end justify-between px-2 gap-2 relative">
                                        {/* Simple SVG Line Chart */}
                                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d={`M ${chartData.items.map((item, i) => {
                                                    const x = (i / (chartData.items.length - 1)) * 100;
                                                    const y = 100 - (item.percentage); // Flip Y for SVG
                                                    return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                                                }).join(' ')}`}
                                                fill="none"
                                                stroke="#3b82f6"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            />
                                            <path
                                                d={`M 0 100 L ${chartData.items.map((item, i) => {
                                                    const x = (i / (chartData.items.length - 1)) * 100;
                                                    const y = 100 - (item.percentage);
                                                    return `${x}% ${y}%`;
                                                }).join(' ')} L 100 100 Z`}
                                                fill="url(#lineGradient)"
                                                stroke="none"
                                                opacity="0.2"
                                            />
                                            {/* Dots */}
                                            {chartData.items.map((item, i) => {
                                                const x = (i / (chartData.items.length - 1)) * 100;
                                                const y = 100 - (item.percentage); // Flip Y
                                                return (
                                                    <circle
                                                        key={i}
                                                        cx={`${x}%`}
                                                        cy={`${y}%`}
                                                        r="3"
                                                        fill="#3b82f6"
                                                        stroke="white"
                                                        strokeWidth="1"
                                                    />
                                                );
                                            })}
                                        </svg>

                                        {/* X Axis Labels for Line Chart */}
                                        {chartData.items.map((item, i) => (
                                            <div key={i} className="absolute bottom-[-20px] text-[10px] text-muted-foreground w-12 text-center -translate-x-1/2" style={{ left: `${(i / (chartData.items.length - 1)) * 100}%` }}>
                                                {item.label.substring(0, 3)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Analysis Section */}
                    <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl p-6 border border-blue-500/10 flex flex-col justify-between shadow-sm">
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
    );
}

function StatCard({ label, value, icon, subLabel, color }: { label: string, value: number | undefined, icon: React.ReactNode, subLabel: string, color: 'blue' | 'emerald' | 'amber' | 'purple' }) {


    return (
        <div className={cn("rounded-xl p-4 border-none transition-all hover:shadow-md shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)] bg-card  border-none",)}>
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
