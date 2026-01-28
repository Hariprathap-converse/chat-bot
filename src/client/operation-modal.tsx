"use client";

import { useState, useRef } from "react";
import { X, Send, Upload, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaWandMagicSparkles } from "react-icons/fa6";

export type OperationType = "summarize" | "extract" | "classify" | "sentiment";

interface OperationModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: OperationType;
}

export function OperationModal({ isOpen, onClose, type }: OperationModalProps) {
    const [inputText, setInputText] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    if (!isOpen) return null;

    const getTitle = () => {
        switch (type) {
            case "extract":
                return "Extract Data";
            case "classify":
                return "Classify Team";
            case "sentiment":
                return "Analyze Sentiment";
            default:
                return "Summarize Content";
        }
    };

    const getPlaceholder = () => {
        switch (type) {
            case "extract":
                return "Paste text to extract from...";
            case "classify":
                return "Describe the team or paste details to classify...";
            case "sentiment":
                return "Paste text to analyze sentiment...";
            default:
                return "Type or paste text here...";
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSend = () => {
        if (!inputText.trim() && !selectedFile) return;

        const operationData = {
            type,
            input: inputText,
            fileName: selectedFile?.name,
            timestamp: Date.now(),
        };

        // Store generic pending generic operation
        localStorage.setItem(
            "pendingOperation",
            JSON.stringify(operationData)
        );

        // Clear specific pendingSummary if it exists to avoid conflicts
        localStorage.removeItem("pendingSummary");

        router.push("/chat");
        onClose();
        // Reset state after close
        setTimeout(() => {
            setInputText("");
            setSelectedFile(null);
        }, 500);
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
                    className="absolute cursor-pointer right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent capitalize">
                            {getTitle()}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {type === "extract"
                                ? "Upload a document or paste text to extract information."
                                : "Enter the details below to proceed."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={getPlaceholder()}
                            className="min-h-[150px] resize-none focus-visible:ring-accent"
                        />

                        {/* File Upload for Extract Only */}
                        {type === "extract" && (
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-foreground/80">
                                    Attach Document (Optional)
                                </label>

                                {!selectedFile ? (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 mt-1 border-dashed border-border hover:border-accent hover:bg-accent/5 rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1.5 group"
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.txt"
                                        />
                                        <div className="p-2 bg-muted rounded-full group-hover:scale-105 transition-transform duration-200">
                                            <Upload className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-foreground">
                                                Click to upload
                                            </p>
                                            <p className="text-[10px] text-muted-foreground mt-0.5">
                                                PDF, DOC, DOCX or TXT
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative group border border-border rounded-xl p-2.5 flex items-center gap-2.5 bg-card hover:shadow-sm transition-all duration-200">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <FileText className="w-4 h-4 text-accent" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground">
                                                {(selectedFile.size / 1024).toFixed(0)} KB
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFile(null);
                                                if (fileInputRef.current) fileInputRef.current.value = '';
                                            }}
                                            className="p-1.5 hover:bg-muted rounded-full text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            onClick={handleSend}
                            disabled={!inputText.trim() && !selectedFile}
                            className="bg-linear-to-r cursor-pointer font-normal  from-[#7468FC] via-[#ED799C] to-[#918FFF] hover:opacity-95 transition-opacity capitalize"
                        >


                            {type}
                            <FaWandMagicSparkles className="max-h-4 " />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
