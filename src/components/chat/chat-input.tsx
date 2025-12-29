/**
 * Chat Input Component
 * Handles message input with send functionality
 */
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getIcon } from "@/client/home";

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    placeholder: string;
    buttonIcon: string;
}

export function ChatInput({ value, onChange, onSend, placeholder, buttonIcon }: ChatInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="flex relative p-0">
            <div className="p-px rounded-[14px] w-full flex items-center shadow-[0px_2px_10px_0px_hsla(0,0%,0%,0.06)] bg-linear-to-b from-[hsla(245,100%,97%,1)] to-[hsla(245,100%,94%,1)]">
                <Textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "p-0 min-h-14 max-h-[400px] rounded-[14px] resize-none border-0 bg-white px-[21px] pr-[72px] flex items-center placeholder:font-normal placeholder:text-base placeholder:text-foreground leading-[150%] tracking-normal font-normal !text-base text-heading outline-none overflow-auto focus:ring-0 focus:ring-offset-0 focus:ring-transparent focus-visible:ring-0! focus-visible:ring-offset-0 focus-visible:ring-transparent focus:placeholder:text-sub-title",
                        value.length > 0 ? "py-4" : "pt-4"
                    )}
                    placeholder={placeholder}
                />
            </div>
            <button
                onClick={() => {
                    onSend();
                    onChange("");
                }}
                className="absolute bottom-2 right-3 cursor-pointer p-2 rounded-2xl font-semibold text-white bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 border border-white/30 flex items-center"
            >
                {getIcon(buttonIcon)}
                <span className="absolute inset-0 rounded-2xl pointer-events-none bg-white/20 opacity-40 mix-blend-overlay"></span>
            </button>
        </div>
    );
}
