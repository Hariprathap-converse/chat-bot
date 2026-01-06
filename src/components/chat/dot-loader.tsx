import { NavChatBot } from "@/Icons/global/home";

export function BotTypingLoader() {
  return (
    <div className="flex items-end gap-3 py-4 animate-in fade-in duration-300">
      <div className="w-5 h-5 relative top-[9px] right-px rounded-full flex items-center justify-center">
        <NavChatBot />
      </div>
      <div className="flex gap-1">
        <div
          className="w-[5px] h-[5px] rounded-full bg-accent-foreground animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-[5px] h-[5px] rounded-full bg-accent-foreground animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-[5px] h-[5px] rounded-full bg-accent-foreground animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
