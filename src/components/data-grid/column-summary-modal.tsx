"use client";

import { useState, useMemo } from "react";
import { X, Calculator, ArrowDown01, ArrowUp10, Sigma, Divide } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnConfig } from "./types";

interface ColumnSummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    column: ColumnConfig | null;
    data: Record<string, any>[];
}

type SummaryType = "sum" | "average" | "min" | "max" | null;

export function ColumnSummaryModal({ isOpen, onClose, column, data }: ColumnSummaryModalProps) {
    const [result, setResult] = useState<{ type: SummaryType; value: number | string } | null>(null);

    const values = useMemo(() => {
        if (!column) return [];
        return data.map(row => row[column.accessorKey]).filter(val => typeof val === 'number');
    }, [data, column]);

    if (!isOpen || !column) return null;

    const calculate = (type: SummaryType) => {
        if (values.length === 0) {
            setResult({ type, value: "No numeric data" });
            return;
        }

        let val: number | string = 0;
        switch (type) {
            case "sum":
                val = values.reduce((acc, curr) => acc + curr, 0);
                break;
            case "average":
                val = values.reduce((acc, curr) => acc + curr, 0) / values.length;
                val = parseFloat(val.toFixed(2));
                break;
            case "min":
                val = Math.min(...values);
                break;
            case "max":
                val = Math.max(...values);
                break;
        }
        setResult({ type, value: val });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-lg bg-background rounded-xl shadow-2xl border border-border p-5 animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold text-[#7468FC]">
                            Summarize {column.header}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            This column contains numeric data. Select an operation below to analyze the values.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 hover:border-[#7468FC] hover:bg-[#7468FC]/5 transition-all"
                            onClick={() => calculate("sum")}
                        >
                            <Sigma className="w-6 h-6 text-[#7468FC]" />
                            <span className="font-medium">Sum</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 hover:border-[#ED799C] hover:bg-[#ED799C]/5 transition-all"
                            onClick={() => calculate("average")}
                        >
                            <Divide className="w-6 h-6 text-[#ED799C]" />
                            <span className="font-medium">Average</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 hover:border-[#918FFF] hover:bg-[#918FFF]/5 transition-all"
                            onClick={() => calculate("min")}
                        >
                            <ArrowDown01 className="w-6 h-6 text-[#918FFF]" />
                            <span className="font-medium">Minimum</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 hover:border-[#7468FC] hover:bg-[#7468FC]/5 transition-all"
                            onClick={() => calculate("max")}
                        >
                            <ArrowUp10 className="w-6 h-6 text-[#7468FC]" />
                            <span className="font-medium">Maximum</span>
                        </Button>
                    </div>

                    {result && (
                        <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                            <span className="text-sm font-medium text-muted-foreground capitalize">
                                Result ({result.type}):
                            </span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#7468FC] to-[#ED799C] bg-clip-text text-transparent">
                                {result.value.toLocaleString()}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
