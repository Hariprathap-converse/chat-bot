"use client";

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Table as TableIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface TableMessageProps {
    data: any;
    title?: string;
}

const ITEMS_PER_PAGE = 6;

export function TableMessage({ data, title }: TableMessageProps) {
    const [currentPage, setCurrentPage] = useState(1);

    if (!data) return null;

    // Handle case where data might be wrapped in another object
    const actualData = data;

    const isArray = Array.isArray(actualData);
    const items = isArray ? actualData : [actualData];

    if (items.length === 0) return null;

    const headers = Object.keys(items[0]);
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    // Pagination logic
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300 my-2">
            <div className="bg-white dark:bg-card rounded-2xl border border-slate-100 dark:border-border shadow-lg overflow-hidden transition-all hover:shadow-xl">
                {/* Header */}
                <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm px-5 py-3 border-b border-slate-100 dark:border-border flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                            <TableIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-bold text-sm tracking-wide uppercase bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {title || "Data Insight"}
                        </span>
                    </div>
                    {items.length > ITEMS_PER_PAGE && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="p-1 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-500 dark:text-muted-foreground"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-[10px] font-bold text-slate-400 min-w-[40px] text-center">
                                PAGE {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="p-1 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-500 dark:text-muted-foreground"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                    <table className="w-full text-left border-collapse min-w-full">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-muted/30">
                                {headers.map((header) => (
                                    <th
                                        key={header}
                                        className="px-5 py-3 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-widest border-b border-slate-100 dark:border-border whitespace-nowrap"
                                    >
                                        {header.split('_').join(' ')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-border">
                            {paginatedItems.map((item, idx) => (
                                <tr key={idx} className="hover:bg-blue-50/10 dark:hover:bg-accent/5 transition-colors group cursor-pointer">
                                    {headers.map((header) => (
                                        <td key={header} className="px-5 py-4 text-sm min-w-[160px]  font-semibold text-slate-700 dark:text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {typeof item[header] === 'number'
                                                ? Number.isInteger(item[header]) ? item[header] : item[header].toFixed(1)
                                                : String(item[header])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="bg-slate-50/50 dark:bg-muted/30 px-5 py-3 border-t border-slate-100 dark:border-border flex justify-between items-center text-[10px] text-slate-400 dark:text-muted-foreground font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, items.length)} of {items.length} Entries
                    </span>
                    <span className="font-mono bg-slate-100 dark:bg-muted px-2 py-0.5 rounded text-slate-500 dark:text-muted-foreground">
                        {items.length === 1 ? 'Single Record' : 'Verified Report'}
                    </span>
                </div>
            </div>
        </div>
    );
}

