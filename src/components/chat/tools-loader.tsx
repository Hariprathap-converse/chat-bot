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

    // Sync internal visual stages with the external 'status' prop
    useEffect(() => {
        if (status === "processing") {
            setInternalStage("scan");
        } else if (status === "sending") {
            setInternalStage("draft");
            // After a short drafting animation, fly out
            const timer = setTimeout(() => {
                setInternalStage("fly");
            }, 1200);
            return () => clearTimeout(timer);
        } else if (status === "success") {
            setInternalStage("done");
            const timer = setTimeout(() => {
                onComplete?.();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [status, onComplete]);

    if (!type || status === "idle") return null;

    const LoaderIcon = type === "email" ? Mail : (type === "sms" ? Smartphone : Zap);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl p-0 ring-1 ring-white/40">

                {/* Header / Top Bar */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <LoaderIcon className="w-5 h-5" />
                        <span className="font-medium text-sm tracking-wide uppercase opacity-90">
                            {type === "email" ? "Email Agent" : "Message Agent"}
                        </span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/30" />
                        <div className="w-2 h-2 rounded-full bg-white/30" />
                        <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-6 min-h-[220px] flex flex-col justify-center relative bg-slate-50/50">

                    {/* STAGE 1: SCANNING / PROCESSING */}
                    {internalStage === "scan" && (
                        <div className="flex flex-col items-center animate-scale-in">
                            <div className="relative w-24 h-24 mb-6">
                                {/* Ripples */}
                                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-[ping-slow_2s_infinite]" />
                                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-[ping-slow_2s_infinite_0.5s]" />

                                <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 rounded-full border border-indigo-100">
                                    <LoaderIcon className="w-10 h-10 text-indigo-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Analyzing Request</h3>
                            <p className="text-slate-500 text-center text-sm px-4">
                                Extracting details for {target}...
                            </p>
                            <div className="w-32 h-1 bg-slate-200 rounded-full mt-6 overflow-hidden">
                                <div className="h-full bg-indigo-500 w-1/3 animate-[slideRight_1s_infinite_linear]" />
                            </div>
                        </div>
                    )}

                    {/* STAGE 2: DRAFTING / SKELETON */}
                    {(internalStage === "draft" || internalStage === "fly") && (
                        <div className={cn(
                            "relative w-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 mx-auto transition-all duration-500",
                            internalStage === "fly" ? "animate-fly-out" : "animate-scale-in"
                        )}>
                            {internalStage === "fly" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                                    <Check className="w-12 h-12 text-green-500 bg-green-100 rounded-full p-2" />
                                </div>
                            )}

                            {/* Fake Email Interface */}
                            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <span className="text-xs font-bold text-slate-400">TO</span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-slate-400 font-semibold mb-1">RECIPIENT</div>
                                    <div className="text-sm font-medium text-slate-800 font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100 inline-block">
                                        {target}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="h-2 w-3/4 bg-slate-100 rounded animate-pulse" />
                                <div className="h-2 w-full bg-slate-100 rounded animate-pulse delay-75" />
                                <div className="h-2 w-5/6 bg-slate-100 rounded animate-pulse delay-150" />
                            </div>

                            {/* Scan effect overlay */}
                            <div className="absolute inset-0 pointer-events-none animate-scan z-10" />
                        </div>
                    )}

                    {/* STAGE 3: SUCCESS STATE */}
                    {internalStage === "done" && (
                        <div className="flex flex-col items-center justify-center h-full animate-scale-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-inner ring-4 ring-green-50">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Has been Sent!</h2>
                            <p className="text-slate-500 mt-1">Operation completed successfully.</p>
                        </div>
                    )}

                </div>

                {/* Footer info */}
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase">
                    <span>AI Agent Active</span>
                    <span>{(status === 'processing' || status === 'idle') ? 'Wait...' : '0.4s'}</span>
                </div>
            </div>
        </div>
    );
}
