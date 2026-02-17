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

export function ChatInput({
  value,
  onChange,
  onSend,
  placeholder,
  buttonIcon,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex relative p-0  w-full overflow-hidden">
      <div className="p-px rounded-[14px] w-full min-w-0 flex items-center shadow-sm bg-linear-to-b from-[hsla(245,100%,97%,1)] to-[hsla(245,100%,94%,1)] dark:from-[hsla(245,100%,97%,0.1)] dark:to-[hsla(245,100%,94%,0.1)]">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "p-0 min-h-14 max-h-[400px] rounded-[14px] resize-none border-0 bg-white dark:bg-chat-input  px-[21px] pr-[72px] flex items-center outline-none overflow-auto",
            value.length > 0 ? "py-4" : "pt-4",
            "placeholder:font-normal placeholder:text-base placeholder:text-foreground dark:placeholder:text-placeholder",
            "leading-[150%] tracking-normal font-normal !text-base text-heading dark:text-foreground",
            "focus:ring-0 focus:ring-offset-0 focus:ring-transparent focus-visible:ring-0! focus-visible:ring-offset-0 focus-visible:ring-transparent focus:placeholder:text-sub-title",
            "w-full max-w-full min-w-0",
            "whitespace-pre-wrap break-all",
            "overflow-y-auto overflow-x-hidden",
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
