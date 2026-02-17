"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  FileJson,
  ClipboardList,
  User,
  MapPin,
  Receipt,
  Calendar,
  CreditCard,
  Box,
} from "lucide-react";

interface JsonMessageProps {
  data: any;
  title?: string;
}

export function JsonMessage({ data, title }: JsonMessageProps) {
  if (!data) return null;

  // Separate main details from nested items
  const items = data.Items || [];
  const mainDetails = Object.entries(data).filter(([key]) => key !== "Items");

  const getIcon = (key: string) => {
    const k = key.toLowerCase();
    if (k.includes("id")) return <Receipt className="w-4 h-4" />;
    if (k.includes("date")) return <Calendar className="w-4 h-4" />;
    if (k.includes("name")) return <User className="w-4 h-4" />;
    if (k.includes("address")) return <MapPin className="w-4 h-4" />;
    if (
      k.includes("total") ||
      k.includes("amount") ||
      k.includes("subtotal") ||
      k.includes("tax")
    )
      return <CreditCard className="w-4 h-4" />;
    return <Box className="w-4 h-4" />;
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300 my-2">
      <div className="bg-white dark:bg-card rounded-2xl border border-slate-100 dark:border-border shadow-lg overflow-hidden transition-all hover:shadow-xl">
        {/* Header */}
        <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm px-5 py-3 border-b border-slate-100 dark:border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
              <FileJson className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="font-bold text-sm tracking-wide uppercase bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {title || "Extracted Data"}
            </span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Verified JSON
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainDetails.map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50/50 dark:bg-muted/30 border border-slate-100/50 dark:border-border/50 group hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-widest">
                  {getIcon(key)}
                  {key.split(/(?=[A-Z])/).join(" ")}
                </div>
                <div className="text-sm font-semibold text-slate-700 dark:text-foreground whitespace-pre-wrap">
                  {String(value)}
                </div>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="w-4 h-4 text-indigo-500" />
                <h3 className="text-xs font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-widest">
                  Line Items
                </h3>
              </div>
              <div className="border border-slate-100 dark:border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-muted/30">
                        <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider border-b border-slate-100 dark:border-border">
                          Description
                        </th>
                        <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider border-b border-slate-100 dark:border-border text-center">
                          Qty
                        </th>
                        <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider border-b border-slate-100 dark:border-border text-right">
                          Unit Price
                        </th>
                        <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider border-b border-slate-100 dark:border-border text-right">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-border/50">
                      {items.map((item: any, idx: number) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/30 dark:hover:bg-accent/5 transition-colors group"
                        >
                          <td className="px-4 py-3 text-xs font-semibold text-slate-700 dark:text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {item["Items(Description)"] ||
                              item.Description ||
                              "N/A"}
                          </td>
                          <td className="px-4 py-3 text-xs font-bold text-slate-600 dark:text-muted-foreground text-center">
                            {item["Items(Quantity)"] || item.Quantity || "0"}
                          </td>
                          <td className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-muted-foreground text-right tabular-nums">
                            {item["Items(UnitPrice)"] ||
                              item.UnitPrice ||
                              "0.00"}
                          </td>
                          <td className="px-4 py-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 text-right tabular-nums">
                            {item["Items(Amount)"] || item.Amount || "0.00"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50/50 dark:bg-muted/30 px-5 py-3 border-t border-slate-100 dark:border-border flex justify-between items-center text-[10px] text-slate-400 dark:text-muted-foreground font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            AI Extraction Complete
          </span>
          <span className="font-mono bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400">
            {items.length} Line Items
          </span>
        </div>
      </div>
    </div>
  );
}
