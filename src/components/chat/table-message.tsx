"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { Table as TableIcon } from "lucide-react";

interface TableMessageProps {
    data: any;
    title?: string;
}

export function TableMessage({ data, title }: TableMessageProps) {
    if (!data) return null;

    // Handle case where data might be wrapped in another object
    const actualData = data;

    const isArray = Array.isArray(actualData);
    const items = isArray ? actualData : [actualData];

    if (items.length === 0) return null;

    const headers = Object.keys(items[0]);

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300 my-2">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden transition-all hover:shadow-xl">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <TableIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-bold text-sm tracking-wide uppercase bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {title || "Data Insight"}
                        </span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-[7px] h-[7px] rounded-full bg-blue-500" />
                        <div className="w-[7px] h-[7px] rounded-full bg-slate-200" />
                        <div className="w-[7px] h-[7px] rounded-full bg-slate-200" />
                    </div>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <table className="w-full text-left border-collapse min-w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                {headers.map((header) => (
                                    <th
                                        key={header}
                                        className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap"
                                    >
                                        {header.split('_').join(' ')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {items.map((item, idx) => (
                                <tr key={idx} className="hover:bg-blue-50/10 transition-colors group">
                                    {headers.map((header) => (
                                        <td key={header} className="px-5 py-4 text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
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
                <div className="bg-slate-50/50 px-5 py-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Verified Report
                    </span>
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                        {items.length} {items.length === 1 ? 'Entry' : 'Entries'}
                    </span>
                </div>
            </div>
        </div>
    );
}
