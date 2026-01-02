/**
 * Chat Message Component
 * Displays individual chat messages with actions
 */
import { useState } from "react";
import {
  Copy,
  CopyCheck,
  Edit,
  FileArchive,
  FileDiff,
  HardDriveDownload,
  MoreHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavChatBot } from "@/Icons/global/home";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Message } from "@/hooks/use-chat-messages";
import AIWebsiteGeneratorLoader from "@/app/loader/3/page";
import { ToolsLoader } from "@/components/chat/tools-loader";

interface ChatMessageProps {
  message: Message;
  index: number;
  isUser: boolean;
}

export function ChatMessage({ message, index, isUser }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [reaction, setReaction] = useState<{
    liked: boolean;
    disliked: boolean;
  }>({ liked: false, disliked: false });
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success("Copied successfully!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLike = () => {
    setReaction((prev) => ({
      liked: !prev.liked,
      disliked: prev.liked ? prev.disliked : false,
    }));
  };

  const toggleDislike = () => {
    setReaction((prev) => ({
      disliked: !prev.disliked,
      liked: prev.disliked ? prev.liked : false,
    }));
  };

  if (isUser) {
    return (
      <div className="flex w-full justify-end">
        <div className="flex group relative flex-col items-end justify-end gap-[4px]">
          {/* User Actions */}
          <div
            className={cn(
              "opacity-0 group-hover:opacity-100 flex gap-3 items-center h-[10px]",
              isOpen ? "opacity-100" : "opacity-0"
            )}
          >
            {copied ? (
              <CopyCheck className="h-[14px] w-[14px] hover:text-accent-foreground cursor-pointer text-green-500" />
            ) : (
              <Copy
                className="h-[14px] w-[14px] hover:text-accent-foreground cursor-pointer text-sub-title"
                onClick={handleCopy}
              />
            )}
            <Edit className="h-[14px] w-[14px] hover:text-accent-foreground mt-1 cursor-pointer text-sub-title" />
            <Popover onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <div className="cursor-pointer rounded-[4px]">
                  <MoreHorizontal className="h-[17px] w-[17px] hover:text-accent-foreground cursor-pointer text-sub-title" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="z-50 p-[6px] w-40 bg-white rounded-md shadow-md">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="flex group items-center gap-2 p-1 py-1 cursor-pointer focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 justify-start h-fit text-sm text-foreground rounded"
                  >
                    <FileArchive className="h-[14px] w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                    Option 1
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex group items-center gap-2 p-1 py-1 cursor-pointer focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 justify-start h-fit text-sm text-foreground rounded"
                  >
                    <FileDiff className="h-[14px] w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                    Option 2
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex group items-center gap-2 p-1 py-1 cursor-pointer focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 justify-start h-fit text-sm text-foreground rounded"
                  >
                    <HardDriveDownload className="h-[14px] w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                    Option 3
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* User Message */}
          <div className="flex items-start w-full gap-1">
            <div className="flex items-center h-full justify-center w-full gap-1">
              <div className="relative w-full font-medium bg-transparent text-foreground rounded-tl-none text-end px-2 py-0">
                {/* <div className="inline-flex 2xl:max-w-[70%] 2xl:min-w-[800px] max-w-[70%] min-w-[75%]  text-left justify-end whitespace-pre-wrap"> */}
                <div className="inline-flex xl:max-w-[70%] xl:min-w-[800px] max-w-[70%] min-w-[75%]  text-left justify-end whitespace-pre-wrap">
                  <span className="break-all">{message.content}</span>
                </div>
              </div>
            </div>
            <div className="min-w-8 min-h-8 ml-1 rounded-full bg-muted shadow items-start">
              <Image
                src="/profile.jpg"
                width={40}
                height={40}
                alt="user"
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Special Components inline
  if (message.type === "website-loader") {
    return (
      <div className="flex w-full justify-start mt-2 mb-2">
        <div className="flex items-start w-full gap-2">
          <div className="w-5 h-5 relative top-[9px] right-px rounded-full flex items-center justify-center shrink-0">
            <NavChatBot />
          </div>
          <div className="w-full max-w-full lg:max-w-4xl">
            <AIWebsiteGeneratorLoader />
          </div>
        </div>
      </div>
    );
  }

  if (message.type === "email-tool" || message.type === "sms-tool") {
    return (
      <div className="flex w-full justify-start mt-2 mb-2">
        <div className="flex items-start w-full gap-2">
          <div className="w-5 h-5 relative top-[9px] right-px rounded-full flex items-center justify-center shrink-0">
            <NavChatBot />
          </div>
          <div className="w-full max-w-[400px]">
            <ToolsLoader
              type={message.type === "email-tool" ? "email" : "sms"}
              target={message.toolData?.target}
              status={message.toolData?.status ?? "processing"}
            />
          </div>
        </div>
      </div>
    );
  }

  // Bot Message
  return (
    <div className="flex w-full justify-start">
      <div className="flex group relative flex-col gap-[4px]">
        <div className="flex items-start w-full gap-2">
          <div className="w-5 h-5 relative top-[9px] right-px rounded-full flex items-center justify-center">
            <NavChatBot />
          </div>
          <div className="relative w-full font-medium bg-bot text-bot-foreground relative z-10 ring-1 ring-accent !rounded-[8px] !rounded-tl-none px-4 py-2 shadow-[0_0_4px_0_hsla(245,96%,70%,0.12)]">
            <div className="inline-flex justify-start whitespace-pre-wrap">
              <span className="break-all">{message.content}</span>
            </div>
            {/* Bot message tail */}
            <div>
              <span className="absolute -left-[6px] -top-[7px] !z-50 -translate-x-full w-[2px] h-[14px] bg-accent rotate-[88deg]"></span>
              <span className="absolute -left-px -top-[1px] -translate-x-full w-[12px] h-[14px] z-50 shadow-[0_0_4px_0_hsla(245,96%,70%,0.12)] bg-bot [clip-path:polygon(100%_0,0_0,0_100%)] rotate-90"></span>
              <span className="absolute -left-[6px] -top-[2px] z-50 -translate-x-full w-[1px] h-[18px] bg-accent rotate-[130deg]"></span>
            </div>
          </div>
        </div>

        {/* Bot Actions */}
        <div className="relative mt-1 z-50 h-[16px]">
          <div
            className={cn(
              "opacity-0 group-hover:opacity-100 flex pl-8 max-h-[20px] gap-2 items-center",
              isOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <div
              className="flex items-center group/thumb gap-[3px] cursor-pointer"
              onClick={handleCopy}
            >
              <span
                className={cn(
                  copied
                    ? "text-emerald-500 group-hover/thumb:text-emerald-500"
                    : "text-foreground group-hover/thumb:text-accent-foreground",
                  "cursor-pointer text-xs"
                )}
              >
                Copy
              </span>
              {copied ? (
                <CopyCheck className="h-[14px] w-[14px] text-green-500" />
              ) : (
                <Copy className="h-[14px] w-[14px] group-hover/thumb:text-accent-foreground cursor-pointer text-sub-title" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <div
                className="flex items-start group/thumb gap-[2px]"
                onClick={toggleLike}
              >
                <span
                  className={cn(
                    reaction.liked
                      ? "text-emerald-500"
                      : "text-foreground group-hover/thumb:text-accent-foreground",
                    "cursor-pointer text-xs"
                  )}
                >
                  Good
                </span>
                <ThumbsUp
                  className={cn(
                    "h-[14px] w-[14px] cursor-pointer",
                    reaction.liked
                      ? "text-emerald-500"
                      : "text-sub-title group-hover/thumb:text-accent-foreground"
                  )}
                />
              </div>
              <div
                className="flex items-end group/thumb gap-[2px]"
                onClick={toggleDislike}
              >
                <span
                  className={cn(
                    reaction.disliked
                      ? "text-red-700"
                      : "text-foreground group-hover/thumb:text-accent-foreground",
                    "cursor-pointer text-xs"
                  )}
                >
                  Bad
                </span>
                <ThumbsDown
                  className={cn(
                    "h-[14px] w-[14px] cursor-pointer",
                    reaction.disliked
                      ? "text-red-700"
                      : "text-sub-title group-hover/thumb:text-accent-foreground"
                  )}
                />
              </div>
            </div>
            <Popover onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <div className="cursor-pointer rounded-[4px]">
                  <MoreHorizontal className="h-[17px] w-[17px] hover:text-accent-foreground cursor-pointer text-sub-title" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="z-50 p-[6px] w-40 bg-white rounded-md shadow-md">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="flex group items-center gap-2 p-1 py-1 cursor-pointer focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 justify-start h-fit text-sm text-foreground rounded"
                  >
                    <FileArchive className="h-[14px] w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                    Option 1
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex group items-center gap-2 p-1 py-1 cursor-pointer focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 justify-start h-fit text-sm text-foreground rounded"
                  >
                    <FileDiff className="h-[14px] w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                    Option 2
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex group items-center gap-2 p-1 py-1 cursor-pointer focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 justify-start h-fit text-sm text-foreground rounded"
                  >
                    <HardDriveDownload className="h-[14px] w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                    Option 3
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
