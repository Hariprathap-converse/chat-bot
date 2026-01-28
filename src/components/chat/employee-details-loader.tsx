"use client";
import { useState } from "react";
import { NavChatBot } from "@/Icons/global/home";
import { cn } from "@/lib/utils";
import { Message } from "@/hooks/use-chat-messages";
import { XCircle } from "lucide-react";

export default function EmployeeDetailsLoader({
    onPopupClose,
    message,
}: {
    onPopupClose?: () => void;
    message?: Message;
}) {
    const status = message?.toolData?.status || "success";
    const title = message?.toolData?.title || "Employee Details Submitted";
    const resultMessage = message?.toolData?.message || "Details have been successfully recorded.";
    const isError = status === "error";

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClose = () => {
        setIsPopupOpen(false);
        if (onPopupClose) {
            setTimeout(onPopupClose, 100);
        }
    };

    const handlePreview = () => {
        // Maybe open the details view or something?
    };

    return (
        <>
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
                        "bg-card text-card-foreground overflow-hidden flex flex-col transition-all duration-300 ease-in-out",
                        isPopupOpen
                            ? "max-w-4xl w-full rounded-2xl shadow-xl border border-border/50"
                            : "w-full max-w-[450px] my-2 rounded-xl shadow-md border border-border/60",
                    )}
                >
                    {/* Header */}
                    <div
                        className={cn(
                            "bg-linear-to-r from-accent/10 via-accent/5 to-transparent border-b border-border/50 shrink-0",
                            isPopupOpen ? "p-6" : "p-3",
                        )}
                    >
                        <div
                            className={cn(
                                "space-y-3 transition-all duration-300",
                                isPopupOpen ? "text-left" : "flex items-center gap-3 space-y-0",
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center transition-all duration-300",
                                    isPopupOpen ? "justify-start gap-4" : "justify-start gap-2",
                                )}
                            >
                                <div className="relative shrink-0 transition-all duration-300">
                                    <div
                                        className={cn(
                                            "rounded-full flex items-center justify-center shadow-md transition-all duration-300",
                                            isError
                                                ? "bg-linear-to-br from-red-300 via-red-500 to-red-300"
                                                : "bg-linear-to-br from-[#7468FC] via-[#ED799C] to-[#918FFF]",
                                            isPopupOpen ? "w-10 h-10" : "w-8 h-8",
                                        )}
                                    >
                                        {isError ? (
                                            <XCircle className={cn(
                                                "text-white transition-all duration-300",
                                                isPopupOpen ? "w-6 h-6" : "w-5 h-5",
                                            )} />
                                        ) : (
                                            <svg
                                                className={cn(
                                                    "text-white transition-all duration-300",
                                                    isPopupOpen ? "w-5 h-5" : "w-4 h-4",
                                                )}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className={cn(
                                        "absolute inset-0 rounded-full blur-lg opacity-30 animate-pulse",
                                        isError ? "bg-red-200" : "bg-linear-to-br from-[#7468FC] to-[#918FFF]"
                                    )} />
                                </div>
                                <h1
                                    className={cn(
                                        isError
                                            ? "text-red-400 font-semibold leading-tight transition-all duration-300"
                                            : "bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent font-semibold leading-tight transition-all duration-300",
                                        isPopupOpen ? "text-2xl" : "text-base",
                                    )}
                                >
                                    {title}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div
                        className={cn(
                            "overflow-y-auto transition-all duration-300 scrollbar-thin scrollbar-thumb-accent/10 scrollbar-track-transparent bg-background/50",
                            isPopupOpen ? "p-6 min-h-[470px] max-h-[550px]" : "p-2 h-auto w-full",
                        )}
                    >
                        <div
                            className={cn(
                                "space-y-4",
                                !isPopupOpen && "flex flex-col h-full",
                            )}
                        >
                            <div
                                className={cn(
                                    "bg-muted/20 rounded-xl border border-border/40 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden",
                                    isPopupOpen
                                        ? "p-4 h-[400px]"
                                        : "p-0 border-0 max-h-[300px] rounded-lg mb-0",
                                )}
                            >
                                <div
                                    className={cn(
                                        isPopupOpen ? "h-full" : "h-[150px]",
                                        "bg-background rounded-lg p-3 space-y-3 border border-border/30 overflow-hidden shadow-xs flex flex-col items-center justify-center text-muted-foreground",
                                    )}
                                >
                                    <NavChatBot className={cn("w-12 h-12 opacity-20 mb-2", isError && "text-red-500 opacity-40")} />
                                    <p className={cn("text-sm font-medium opacity-60", isError && "opacity-80")}>{resultMessage}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div
                                className={cn(
                                    "flex items-center gap-3 pt-2",
                                    isPopupOpen
                                        ? "justify-center"
                                        : "justify-center flex-col sm:flex-row",
                                )}
                            >
                                {/* Buttons can be added here if needed, keeping it clean for now as per "without the value" request which implies just the visual shell */}
                                {/* If the user wants to be able to "view" it later we can add a button. For now let's keep it simple. */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
