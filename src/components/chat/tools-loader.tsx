import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Mail, MessageSquare, Smartphone, Zap, Send } from "lucide-react";

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

            // Delay flight slightly to let "draft" state register, then fly
            const flyTimer = setTimeout(() => {
                setInternalStage("fly");
            }, 1000);

            return () => clearTimeout(flyTimer);
        } else if (status === "success") {
            // Only show success after flight animation (approx 1.2s)
            const doneTimer = setTimeout(() => {
                setInternalStage("done");
            }, 1000);

            const closeTimer = setTimeout(() => {
                onComplete?.();
            }, 3000); // Wait bit longer on success screen

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

                {/* Header - Lighter Colors */}
                <div className="bg-gradient-to-r from-[#A5B4FC] to-[#818CF8] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <LoaderIcon className="w-5 h-5" />
                        <span className="font-semibold text-sm tracking-wide uppercase drop-shadow-sm">
                            {type === "email" ? "Email Agent" : "Message Agent"}
                        </span>
                    </div>
                    {/* Faster, Staggered Dot Loader */}
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse-fast" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse-fast" style={{ animationDelay: '100ms' }} />
                        <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse-fast" style={{ animationDelay: '200ms' }} />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-6 min-h-[220px] flex flex-col justify-center relative bg-slate-50/50">

                    {/* STAGE 1: SCANNING - Full progress before moving to draft */}
                    {internalStage === "scan" && (
                        <div className="flex flex-col items-center animate-scale-in w-full">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 relative">
                                <LoaderIcon className="w-8 h-8 text-indigo-400" />
                                <div className="absolute inset-0 rounded-full border-2 border-indigo-100 animate-[spin_3s_linear_infinite] border-t-indigo-400" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-700 mb-1">
                                Processing...
                            </h3>
                            <p className="text-slate-500 text-center text-xs px-4 font-mono mb-4">
                                Parsing request details
                            </p>

                            {/* Clean Progress Bar */}
                            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-1/3 animate-[slideRight_1s_infinite_ease-in-out]" />
                            </div>
                        </div>
                    )}

                    {/* STAGE 2: DRAFTING / SKELETON / FLY */}
                    {(internalStage === "draft" || internalStage === "fly") && (
                        <div className={cn(
                            "relative w-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 mx-auto transition-all duration-300",
                            internalStage === "fly" ? "animate-paper-plane" : "animate-scale-in"
                        )}>
                            {/* Paper Plane Icon for Flight */}
                            {internalStage === "fly" && (
                                <div className="absolute -right-6 -top-6 rotate-12 z-20">
                                    <Send className="w-16 h-16 text-indigo-500 drop-shadow-lg fill-indigo-100" />
                                </div>
                            )}

                            {/* Email Card Interface */}
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

                    {/* STAGE 3: SUCCESS STATE */}
                    {internalStage === "done" && (
                        <div className="flex flex-col items-center justify-center h-full animate-scale-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm ring-4 ring-white">
                                <Check className="w-8 h-8 text-green-600 animate-in zoom-in duration-300" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Sent Successfully</h2>
                            <p className="text-slate-500 mt-1 text-sm">Action completed.</p>
                        </div>
                    )}

                </div>

                {/* Footer info */}
                <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                        <span className={cn("w-1.5 h-1.5 rounded-full", status === 'success' ? "bg-green-500" : "bg-indigo-400 animate-pulse")} />
                        Agent Active
                    </span>
                </div>
            </div>
        </div>
    );
}
