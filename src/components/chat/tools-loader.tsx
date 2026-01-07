import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Mail, MessageSquare, Smartphone, Zap, X } from "lucide-react";

interface ToolsLoaderProps {
  type: "email" | "sms" | "calendar" | null;
  target?: string;
  status?: "idle" | "processing" | "sending" | "success" | "error";
  onPopupClose?: () => void;
}

export function ToolsLoader({
  type,
  target,
  status = "processing",
  onPopupClose,
}: ToolsLoaderProps) {
  const [internalStage, setInternalStage] = useState<
    "scan" | "draft" | "fly" | "done" | "error"
  >("scan");
  const [elapsed, setElapsed] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "processing" || status === "sending") {
      const startTime = Date.now();
      interval = setInterval(() => {
        setElapsed((Date.now() - startTime) / 1000);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status]);

  
  useEffect(() => {
    if (status === "success" || status === "error") {
      setInternalStage(status === "success" ? "done" : "error");
      const timeout = setTimeout(() => {
        setIsPopupOpen(false);
        
        setTimeout(() => {
          if (onPopupClose) {
            onPopupClose();
          }
        }, 100);
      }, 3500); 
      return () => clearTimeout(timeout);
    }
  }, [status, onPopupClose]);

  useEffect(() => {
    if (status === "processing") {
      setInternalStage("scan");
    }
    if (status === "sending") {
      setInternalStage("draft");
    }
    
  }, [status]);

  if (!type) return null;

  const LoaderIcon =
    type === "email" ? Mail : type === "sms" ? Smartphone : Zap;

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isPopupOpen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
          : "contents", 
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-white  border border-slate-100 transition-all duration-300",
          isPopupOpen
            ? "w-full max-w-sm rounded-2xl shadow-xl" 
            : "w-full rounded-2xl my-2 shadow-md",
        )}
      >
        {/* Refactored Header: White bg, Gradient Text */}
        <div className="bg-white/80 backdrop-blur-sm px-5 py-2 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            {/* Icon with gradient background shape or color */}
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500/10 to-indigo-500/10 flex items-center justify-center">
              <LoaderIcon className="w-4 h-4 text-indigo-600" />
            </div>

            <span className="font-bold text-sm tracking-wide uppercase bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {type === "email" ? "Email Agent" : "Message Agent"}
            </span>
          </div>

          {/* Status Indicators */}
          <div className="flex gap-1.5">
            <div
              className={cn(
                "w-[7px] h-[7px] rounded-full transition-colors duration-300",
                status === "processing"
                  ? "bg-indigo-500 animate-[pulse_1s_infinite]"
                  : "bg-slate-200",
              )}
            />
            <div
              className={cn(
                "w-[7px] h-[7px] rounded-full transition-colors duration-300",
                status === "sending"
                  ? "bg-indigo-500 animate-[pulse_1s_infinite]"
                  : "bg-slate-200",
              )}
            />
            <div
              className={cn(
                "w-[7px] h-[7px] rounded-full transition-colors duration-300",
                status === "success"
                  ? "bg-green-500"
                  : status === "error"
                    ? "bg-red-500"
                    : "bg-slate-200",
              )}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className={cn(
            internalStage === "error"
              ? "p-0 min-h-[50px]"
              : "min-h-[200px] p-5 flex flex-col justify-center relative",
            "bg-slate-50/30",
            isPopupOpen && "!min-h-[200px]",
          )}
        >
          {/* STAGE 1: SCANNING */}
          {internalStage === "scan" && (
            <div className="flex flex-col items-center animate-scale-in w-full py-2">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/5 mb-4 relative">
                <LoaderIcon className="w-6 h-6 text-indigo-500" />
                <div className="absolute inset-0 rounded-full border-2 border-indigo-100 animate-[spin_3s_linear_infinite] border-t-indigo-500" />
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-0.5">
                Processing Request
              </h3>
              <p className="text-slate-400 text-center text-xs px-4 font-medium mb-4">
                Analyzing content and recipient...
              </p>

              <div className="w-40 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-violet-500 to-indigo-500 animate-progress-bar" />
              </div>
            </div>
          )}

          {/* STAGE 2: DRAFTING / SKELETON / FLY */}
          {(internalStage === "draft" || internalStage === "fly") && (
            <div
              className={cn(
                "relative w-full bg-white rounded-xl border border-slate-100 shadow-sm p-4 mx-auto transition-all duration-300",
                internalStage === "fly"
                  ? "animate-paper-plane"
                  : "animate-scale-in",
              )}
            >
              <div className="flex items-center gap-3 mb-3 border-b border-slate-50 pb-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-slate-400">
                    TO
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] text-slate-400 font-bold tracking-wider mb-0.5">
                    RECIPIENT
                  </div>
                  <div className="text-xs font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 inline-block truncate max-w-full">
                    {target}
                  </div>
                </div>
              </div>

              <div className="space-y-2 opacity-60">
                <div className="h-1.5 w-3/4 bg-slate-100 rounded" />
                <div className="h-1.5 w-full bg-slate-100 rounded delay-75" />
                <div className="h-1.5 w-5/6 bg-slate-100 rounded delay-150" />
              </div>
            </div>
          )}

          {/* STAGE 3: SUCCESS STATE */}
          {internalStage === "done" && (
            <div className="flex flex-col items-center justify-center h-full animate-scale-in py-2">
              <div className="relative mb-3">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center shadow-sm">
                  <Check className="w-8 h-8 text-green-500 animate-[scale-in-center_0.4s_cubic-bezier(0.25,0.46,0.45,0.94)_both]" />
                </div>
                <div className="absolute inset-0 rounded-full border border-green-200 animate-[ping_1s_ease-out]" />
              </div>

              <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                Sent Successfully
              </h2>
              <div className="flex items-center gap-1.5 mt-2 bg-green-50/50 px-3 py-1 rounded-full border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] uppercase font-bold text-green-700 tracking-wider">
                  Delivered
                </span>
              </div>
            </div>
          )}

          {/* STAGE 4: ERROR STATE */}
          {isPopupOpen && internalStage === "error" && (
            <div className="flex items-center justify-center animate-scale-in">
              <div
                className={cn(
                  isPopupOpen ? "min-h-[200px]" : "min-h-[100px]",
                  "bg-red-50/50  p-5 w-full flex items-center justify-between gap-4 ",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <X className="w-6 h-6 text-white animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]" />
                  </div>

                  <div className="flex flex-col min-w-0 text-left">
                    <h2 className="text-base font-bold text-slate-800 leading-tight">
                      Failed to Send
                    </h2>
                    <p className="text-[11px] text-red-600/70 font-medium truncate mt-0.5">
                      Action could not be completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* STAGE 4: ERROR STATE */}
          {!isPopupOpen && internalStage === "error" && (
            <div className="flex items-center justify-center animate-scale-in">
              <div
                className={cn(
                  isPopupOpen ? "min-h-[200px]" : "min-h-[50px]",
                  "bg-red-50/50  p-5 w-full flex items-center justify-between gap-4 ",
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col min-w-0 gap-0.5 text-left">
                    <h2 className="text-base font-bold text-slate-800 leading-tight flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-sm shrink-0">
                        <X className="w-3 h-3 text-white animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]" />
                      </div>
                      Failed to Send
                    </h2>
                    <p className="text-[11px] text-red-600/70 font-medium truncate mt-0.5">
                      Action could not be completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        {!isPopupOpen && internalStage == "error" && (
          <div className="bg-slate-50/50 px-5 py-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  status === "success"
                    ? "bg-green-500"
                    : status === "error"
                      ? "bg-red-500"
                      : "bg-indigo-500 animate-pulse",
                )}
              />
              {status === "error" ? "System Error" : "System Active"}
            </span>
            <span className="font-mono">
              {status === "processing" || status === "sending"
                ? `${elapsed.toFixed(1)}s`
                : status === "error"
                  ? "Failed"
                  : "Complete"}
            </span>
          </div>
        )}
        {isPopupOpen && (
          <div className="bg-slate-50/50 px-5 py-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  status === "success"
                    ? "bg-green-500"
                    : status === "error"
                      ? "bg-red-500"
                      : "bg-indigo-500 animate-pulse",
                )}
              />
              {status === "error" ? "System Error" : "System Active"}
            </span>
            <span className="font-mono">
              {status === "processing" || status === "sending"
                ? `${elapsed.toFixed(1)}s`
                : status === "error"
                  ? "Failed"
                  : "Complete"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
