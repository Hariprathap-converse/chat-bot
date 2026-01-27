"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SummarizeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SummarizeModal({ isOpen, onClose }: SummarizeModalProps) {
    const [inputText, setInputText] = useState("");
    const router = useRouter();

    if (!isOpen) return null;

    const handleSend = () => {
        if (!inputText.trim()) return;

        // Store pending interaction for Chat page to handle
        localStorage.setItem(
            "pendingSummary",
            JSON.stringify({
                input: inputText,
                timestamp: Date.now(),
            })
        );

        router.push("/chat");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-lg bg-background rounded-xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent">
                            Summarize Content
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Paste the content you want to summarize below.
                        </p>
                    </div>

                    <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type or paste text here..."
                        className="min-h-[150px] resize-none focus-visible:ring-accent"
                    />

                    <div className="flex justify-end pt-2">
                        <Button
                            onClick={handleSend}
                            disabled={!inputText.trim()}
                            className="bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] hover:opacity-90 transition-opacity"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Summarize
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
