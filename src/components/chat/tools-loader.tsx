import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  Mail,
  MessageSquare,
  Smartphone,
  Zap,
  X,
  Send,
} from "lucide-react";

interface ToolsLoaderProps {
  type: "email" | "sms" | "calendar" | null;
  target?: string;
  status?:
    | "idle"
    | "processing"
    | "sending"
    | "success"
    | "error"
    | "cancelled";
  onPopupClose?: () => void;
  toolData?: any;
  onSend?: (data: { to: string; subject: string; body: string }) => void;
  onCancel?: () => void;
}

export function ToolsLoader({
  type,
  target,
  status = "processing",
  onPopupClose,
  toolData,
  onSend,
  onCancel,
}: ToolsLoaderProps) {
  const [internalStage, setInternalStage] = useState<
    "scan" | "edit" | "draft" | "fly" | "done" | "error" | "cancelled"
  >(() => {
    if (status === "success") return "done";
    if (status === "error") return "error";
    if (status === "sending") return "draft";
    if (status === "cancelled") return "cancelled";
    return "scan";
  });

  const [formData, setFormData] = useState({
    to: toolData?.to || target || "",
    subject: toolData?.subject || "",
    body: toolData?.body || "",
  });

  const [elapsed, setElapsed] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(() => {
    // If loading from history as done/error/cancelled, start closed
    return !(
      status === "success" ||
      status === "error" ||
      status === "cancelled"
    );
  });

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
    if (status === "processing" && internalStage === "scan") {
      const timer = setTimeout(() => {
        setInternalStage("edit");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, internalStage]);

  useEffect(() => {
    if (status === "success" || status === "error" || status === "cancelled") {
      setInternalStage(
        status === "success"
          ? "done"
          : status === "cancelled"
            ? "cancelled"
            : "error",
      );

      if (isPopupOpen) {
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
    }
  }, [status, onPopupClose, isPopupOpen]);

  useEffect(() => {
    if (status === "processing" && internalStage !== "edit") {
      setInternalStage("scan");
    }
    if (status === "sending") {
      setInternalStage("draft");
    }
    if (status === "cancelled") {
      setInternalStage("cancelled");
    }
  }, [status]);

  if (!type) return null;

  const LoaderIcon =
    type === "email" ? Mail : type === "sms" ? Smartphone : Zap;

  const handleSend = () => {
    if (onSend) {
      onSend(formData);
    }
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
  };

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
          "relative overflow-hidden bg-white dark:bg-card border border-slate-100 dark:border-border transition-all duration-300",
          isPopupOpen
            ? "w-full max-w-md rounded-2xl shadow-xl"
            : "w-full rounded-2xl my-2 shadow-md",
        )}
      >
        {/* Header */}
        <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm px-5 py-3 border-b border-slate-100 dark:border-border flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500/10 to-indigo-500/10 flex items-center justify-center">
              <LoaderIcon className="w-4 h-4 text-indigo-600" />
            </div>

            <span className="font-bold text-sm tracking-wide uppercase bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {type === "email" ? "Email Agent" : "Message Agent"}
            </span>
          </div>

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
                    : status === "cancelled"
                      ? "bg-slate-500"
                      : "bg-slate-200",
              )}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className={cn(
            internalStage === "error" || internalStage === "cancelled"
              ? "p-0 min-h-[50px]"
              : "min-h-[200px] p-5 flex flex-col justify-center relative",
            "bg-slate-50/30 dark:bg-muted/10",
            isPopupOpen && "min-h-[200px]!",
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

          {/* STAGE: EDITING */}
          {internalStage === "edit" && status === "processing" && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="space-y-3">
                <div className="space-y-1 flex  gap-1 flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 ">
                    Recipient
                  </label>
                  <input
                    type="text"
                    value={formData.to}
                    onChange={(e) =>
                      setFormData({ ...formData, to: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-input border border-slate-200 dark:border-border rounded-lg text-sm text-slate-700 dark:text-foreground focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
                    placeholder="Recipient email or number"
                  />
                </div>
                {type === "email" && (
                  <div className="space-y-1 flex  gap-1 flex-col">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 ">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white dark:bg-input border border-slate-200 dark:border-border rounded-lg text-sm text-slate-700 dark:text-foreground focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
                      placeholder="Email subject"
                    />
                  </div>
                )}
                <div className="space-y-1 flex  gap-1 flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 ">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.body}
                    onChange={(e) =>
                      setFormData({ ...formData, body: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-input border  border-slate-200 dark:border-border rounded-lg text-sm text-slate-700 dark:text-foreground focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all resize-none min-h-[140px]"
                    placeholder="Type your message here..."
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCancelClick}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-muted hover:bg-slate-200 dark:hover:bg-muted/80 text-slate-600 dark:text-muted-foreground rounded-[10px] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  className="flex-2 py-2.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-[10px] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Send Now
                </button>
              </div>
            </div>
          )}

          {/* STAGE: DRAFTING / FLY (Sending) */}
          {(internalStage === "draft" || internalStage === "fly") && (
            <div
              className={cn(
                "relative w-full bg-white dark:bg-card rounded-xl border border-slate-100 dark:border-border shadow-sm p-4 mx-auto transition-all duration-300",
                internalStage === "fly"
                  ? "animate-paper-plane"
                  : "animate-scale-in",
              )}
            >
              <div className="flex items-center gap-3 mb-3 border-b border-slate-50 dark:border-border pb-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-muted flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-slate-400 dark:text-muted-foreground">
                    TO
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] text-slate-400 dark:text-muted-foreground font-bold tracking-wider mb-0.5">
                    RECIPIENT
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-foreground bg-slate-50 dark:bg-muted px-2 py-0.5 rounded border border-slate-100 dark:border-border inline-block truncate max-w-full">
                    {formData.to || target}
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

          {/* STAGE: SUCCESS STATE */}
          {internalStage === "done" && (
            <div className="flex flex-col items-center justify-center h-full animate-scale-in py-2">
              <div className="relative mb-3">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center shadow-sm">
                  <Check className="w-8 h-8 text-green-500 animate-[scale-in-center_0.4s_cubic-bezier(0.25,0.46,0.45,0.94)_both]" />
                </div>
                <div className="absolute inset-0 rounded-full border border-green-200 animate-[ping_1s_ease-out]" />
              </div>

              <h2 className="text-lg font-bold text-slate-800 dark:text-foreground tracking-tight">
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

          {/* STAGE: CANCELLED STATE */}
          {internalStage === "cancelled" && (
            <div className="flex items-center justify-center animate-scale-in">
              <div
                className={cn(
                  isPopupOpen ? "min-h-[200px]" : "min-h-[50px]",
                  "p-5 w-full flex items-center justify-between gap-4",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <X className="w-6 h-6 text-slate-500" />
                  </div>

                  <div className="flex flex-col min-w-0 text-left">
                    <h2 className="text-base font-bold text-slate-800 leading-tight">
                      Action Cancelled
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      The operation was cancelled by user
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE: ERROR STATE */}
          {internalStage === "error" && (
            <div className="flex items-center justify-center animate-scale-in">
              <div
                className={cn(
                  isPopupOpen ? "min-h-[200px]" : "min-h-[50px]",
                  "p-5 w-full flex items-center justify-between gap-4",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <X className="w-6 h-6 text-white animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]" />
                  </div>

                  <div className="flex flex-col min-w-0 text-left">
                    <h2 className="text-base font-bold text-slate-800 dark:text-foreground leading-tight">
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
        <div className="bg-slate-50/50 dark:bg-muted/30 px-5 py-2 border-t border-slate-100 dark:border-border flex justify-between items-center text-[10px] text-slate-400 dark:text-muted-foreground font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                status === "success"
                  ? "bg-green-500"
                  : status === "error"
                    ? "bg-red-500"
                    : status === "cancelled"
                      ? "bg-slate-500"
                      : "bg-indigo-500 animate-pulse",
              )}
            />
            {status === "error"
              ? "System Error"
              : status === "cancelled"
                ? "Cancelled"
                : "System Active"}
          </span>
          <span className="font-mono">
            {status === "processing" || status === "sending"
              ? `${elapsed.toFixed(1)}s`
              : status === "error"
                ? "Failed"
                : status === "cancelled"
                  ? "Stopped"
                  : "Complete"}
          </span>
        </div>
      </div>
    </div>
  );
}
