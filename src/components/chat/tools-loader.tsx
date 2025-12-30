import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Mail, MessageSquare, Smartphone, Zap } from "lucide-react";

interface ToolsLoaderProps {
    type: "email" | "sms" | "calendar" | null;
    status: "idle" | "processing" | "sending" | "success" | "error";
    target?: string;
    onComplete?: () => void;
}

export function ToolsLoader({ type, status, target, onComplete }: ToolsLoaderProps) {
    const [internalStage, setInternalStage] = useState<"scan" | "draft" | "fly" | "done">("scan");
    const [elapsed, setElapsed] = useState(0);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'processing' || status === 'sending') {
            const startTime = Date.now();
            interval = setInterval(() => {
                setElapsed((Date.now() - startTime) / 1000);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [status]);

    // Sync internal visual stages with the external 'status' prop
    useEffect(() => {
        if (status === "processing") {
            setInternalStage("scan");
        } else if (status === "sending") {
            setInternalStage("draft");

            const flyTimer = setTimeout(() => {
                setInternalStage("fly");
            }, 2500); // Increased from 1000ms

            return () => clearTimeout(flyTimer);
        } else if (status === "success") {
            const doneTimer = setTimeout(() => {
                setInternalStage("done");
            }, 1200); // Wait for flight to finish

            const closeTimer = setTimeout(() => {
                onComplete?.();
            }, 3200);

            return () => {
                clearTimeout(doneTimer);
                clearTimeout(closeTimer);
            }
        }
    }, [status, onComplete]);

    if (!type || status === "idle") return null;

    const LoaderIcon = type === "email" ? Mail : (type === "sms" ? Smartphone : Zap);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl p-0 ring-1 ring-white/40">

                {/* Header - Darker Colors as requested */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <LoaderIcon className="w-5 h-5" />
                        <span className="font-semibold text-sm tracking-wide uppercase drop-shadow-sm">
                            {type === "email" ? "Email Agent" : "Message Agent"}
                        </span>
                    </div>
                    {/* Blink one by one */}
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/40 animate-[pulse_1.5s_infinite]" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-white/40 animate-[pulse_1.5s_infinite]" style={{ animationDelay: '500ms' }} />
                        <div className="w-2 h-2 rounded-full bg-white/40 animate-[pulse_1.5s_infinite]" style={{ animationDelay: '1000ms' }} />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-6 min-h-[220px] flex flex-col justify-center relative bg-slate-50/50">

                    {/* STAGE 1: SCANNING */}
                    {internalStage === "scan" && (
                        <div className="flex flex-col items-center animate-scale-in w-full">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 relative">
                                {/* Lighter Icon Color */}
                                <LoaderIcon className="w-8 h-8 text-indigo-400" />
                                {/* Lighter Spinner Color */}
                                <div className="absolute inset-0 rounded-full border-2 border-indigo-100 animate-[spin_3s_linear_infinite] border-t-indigo-400" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-1">
                                Processing...
                            </h3>
                            <p className="text-slate-500 text-center text-xs px-4 font-mono mb-4">
                                Parsing request details
                            </p>

                            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                {/* Lighter Progress Bar Color */}
                                <div className="h-full bg-indigo-400 w-1/3 animate-[slideRight_1s_infinite_ease-in-out]" />
                            </div>
                        </div>
                    )}

                    {/* STAGE 2: DRAFTING / SKELETON / FLY */}
                    {(internalStage === "draft" || internalStage === "fly") && (
                        <div className={cn(
                            "relative w-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 mx-auto transition-all duration-300",
                            internalStage === "fly" ? "animate-paper-plane" : "animate-scale-in"
                        )}>
                            {/* Send Icon Removed as requested */}

                            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <span className="text-[10px] font-bold text-slate-400">TO</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] text-slate-400 font-bold tracking-wider mb-0.5">RECIPIENT</div>
                                    <div className="text-sm font-semibold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 inline-block truncate max-w-full">
                                        {target}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2.5 opacity-60">
                                <div className="h-2 w-3/4 bg-slate-200 rounded" />
                                <div className="h-2 w-full bg-slate-200 rounded delay-75" />
                                <div className="h-2 w-5/6 bg-slate-200 rounded delay-150" />
                            </div>
                        </div>
                    )}

                    {/* STAGE 3: SUCCESS STATE - Refactored */}
                    {internalStage === "done" && (
                        <div className="flex flex-col items-center justify-center h-full animate-scale-in">
                            <div className="relative mb-4">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center shadow-sm">
                                    <Check className="w-10 h-10 text-green-600 animate-[scale-in-center_0.4s_cubic-bezier(0.25,0.46,0.45,0.94)_both]" />
                                </div>
                                <div className="absolute inset-0 rounded-full border border-green-200 animate-[ping_1s_ease-out]" />
                            </div>

                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Sent Successfully</h2>
                            <div className="flex items-center gap-1.5 mt-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-xs font-medium text-green-700">Delivered</span>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer info - Timer Restored */}
                <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                        <span className={cn("w-1.5 h-1.5 rounded-full", status === 'success' ? "bg-green-500" : "bg-indigo-500 animate-pulse")} />
                        Agent Active
                    </span>
                    <span>{(status === 'processing' || status === 'sending') ? `${elapsed.toFixed(1)}s` : 'Done'}</span>
                </div>
            </div>
        </div>
    );
}
