"use client";
import { AppSidebar } from "@/client/app-sidebar";
import { getIcon } from "@/client/home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useOpsBot } from "@/context/json-context";
import { NavChatBot } from "@/Icons/global/home";
import { cn } from "@/lib/utils";
import {
  Check,
  Copy,
  CopyCheck,
  Edit,
  FileArchive,
  FileDiff,
  HardDriveDownload,
  MoreHorizontal,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction, useSidebar } from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Profile from "@/client/profile";
const page = () => {
  const { data } = useOpsBot();
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([
    {
      role: "user",
      content:
        "Hey, I’ve been trying to figure out why my app keeps freezing whenever I load large amounts of text. Any ideas what might cause that?",
    },
    {
      role: "bot",
      content:
        "It could be related to how the rendering engine handles long strings. If everything is being re-rendered on each keystroke or state update, the UI thread might get overwhelmed. Are you processing the text on the main thread?",
    },
    {
      role: "user",
      content:
        "Yeah, everything’s happening in the main thread right now. I was thinking about offloading it, but I’m not sure what the best approach is.",
    },
    {
      role: "bot",
      content:
        "A good start would be to move heavy text operations into a Web Worker or a background task. That way, your UI stays responsive while the data is processed separately.",
    },
    {
      role: "user",
      content:
        "Makes sense. Also, I noticed the UI lags even when I’m typing quickly. Could it be related to how I’m updating the state?",
    },
    {
      role: "bot",
      content:
        "Possibly. If you're storing the entire text in a single state variable and updating it on each keystroke, it can trigger expensive re-renders. Try debouncing the input or splitting the logic so that only necessary components re-render.",
    },
    {
      role: "user",
      content:
        "I’ll try debouncing. Another thing—when I scroll through the text, it feels choppy. Is that normal for large amounts of content?",
    },
    {
      role: "bot",
      content:
        "Scrolling lag usually comes from large DOM nodes or too many elements at once. Virtualization might help—only render what’s visible on screen instead of the entire text block.",
    },
    {
      role: "user",
      content:
        "Got it. One last thing: should I compress the text before sending it to the server? It’s usually pretty long.",
    },
    {
      role: "bot",
      content:
        "Yes, compressing before sending is a good practice. You can use gzip or brotli on the backend. For the frontend, if you're sending via fetch, the browser usually negotiates compression automatically, so you just need server support.",
    },
    {
      role: "user",
      content:
        "Perfect. That clears up a lot. I’ll implement these changes. Thanks!",
    },
    {
      role: "bot",
      content: "Happy to help! Let me know if you run into anything else.",
    },
  ]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [useropen, setUserOpen] = useState<number | undefined>(undefined);
  const [botopen, setBotOpen] = useState<number | undefined>(undefined);
  const [reactions, setReactions] = useState<{
    [key: number]: { liked: boolean; disliked: boolean };
  }>({});

  const [copied, setCopied] = useState<{ [key: number]: boolean }>({});

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text);

    toast.success("Copied successfully!");

    // Change icon
    setCopied((prev) => ({ ...prev, [index]: true }));

    // Reset icon after 2 seconds
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [index]: false }));
    }, 2000);
  };

  const toggleLike = (index: number) => {
    setReactions((prev) => ({
      ...prev,
      [index]: {
        liked: !prev[index]?.liked,
        disliked: prev[index]?.liked ? prev[index].disliked : false,
      },
    }));
  };

  const toggleDislike = (index: number) => {
    setReactions((prev) => ({
      ...prev,
      [index]: {
        disliked: !prev[index]?.disliked,
        liked: prev[index]?.disliked ? prev[index].liked : false,
      },
    }));
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      return;
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const [input, setInput] = useState("");

  // Front End Send Meassge
  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { role: "user", content: input }]);

    // Simulate bot response (replace with API call if needed)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `Bot response to "${input}"` },
      ]);
    }, 500);

    setInput("");
  };

  // Model End Send Meassge

  // const sendMessage = async () => {
  //   if (!input.trim()) return;

  //   const userMessage = input.trim();

  //   // 1️⃣ Add user message to UI
  //   setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
  //   setInput("");

  //   // 2️⃣ Build conversation history for backend
  //   const updatedConversation = [
  //     ...messages,
  //     { role: "user", content: userMessage },
  //   ];

  //   try {
  //     // 3️⃣ Call your FastAPI backend
  //     const response = await fetch("http://127.0.0.1:8000/chat", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ conversation: updatedConversation }),
  //     });

  //     const data = await response.json();

  //     // 4️⃣ Bot message received
  //     const botMessage = data.reply || "⚠️ No response from AI";

  //     setMessages((prev) => [...prev, { role: "bot", content: botMessage }]);

  //     // 5️⃣ Append bot message to conversation (optional)
  //     updatedConversation.push({
  //       role: "assistant",
  //       content: botMessage,
  //     });
  //   } catch (err) {
  //     console.error("💥 Chat request failed:", err);

  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         role: "bot",
  //         content: "⚠️ Something went wrong while talking to the AI.",
  //       },
  //     ]);
  //   }
  // };

  const grouped = [];
  for (let i = 0; i < messages.length; i += 2) {
    grouped.push([messages[i], messages[i + 1]]);
  }

  return (
    <div className="bg-background relative min-h-screen w-full pb-0 pr-1 flex flex-col item-center justify-center">
      <div className="absolute right-3 z-50 top-1.5 ">
        <Profile />
      </div>
      <div className="absolute left-5 rounded-2xl top-5 ">
        <AppSidebar />
      </div>

      <main
        ref={containerRef}
        className="grid grid-rows-[1fr_auto] justify-centerpb-0 w-full h-full  max-h-screen  overflow-hidden  items-center"
      >
        <div className="flex flex-col items-center gap-4 mx-auto w-full h-full pt-2 overflow-auto">
          {messages.length <= 0 && (
            <div
              ref={messagesEndRef}
              className="flex flex-col items-center gap-[27px]"
            >
              <div className="flex flex-col items-center w-full gap-1.5">
                <span className="bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent font-semibold text-[45px] leading-[150%]  tracking-normal">
                  {data.chat.introTitle}
                </span>
                <span className="text-foreground text-center max-w-[696px] font-medium leading-[150%] text-base tracking-normal">
                  {data.chat.subtitle}
                </span>
              </div>
            </div>
          )}

          {/* Chat Conversation */}
          <div className="flex flex-col min-w-[60%] max-w-[61%] gap-0 p-4 ">
            {grouped.map((pair, idx) => {
              return (
                <div key={`group-${idx}`} className="flex flex-col gap-1">
                  {/* User Conversation  */}
                  {pair[0] && (
                    <div
                      key={`user-${idx}`}
                      className={`flex w-full justify-end`}
                    >
                      <div className="flex group relative flex-col  items-end  justify-end gap-[4px] ">
                        {pair[0].role === "user" && (
                          <div
                            className={cn(
                              " opacity-0  group-hover:opacity-100 flex gap-3 items-center h-[10px]",
                              useropen === idx ? "opacity-100" : "opacity-0"
                            )}
                          >
                            {/* <Copy
                            onClick={() => handleCopy(pair[0].content)}
                            className="h-[14px]  w-[14px]  cursor-pointer text-sub-title"
                          /> */}
                            {copied[idx] ? (
                              <CopyCheck className="h-[14px] w-[14px] hover:text-accent-foreground text-green-500" />
                            ) : (
                              <Copy
                                className="h-[14px] w-[14px] hover:text-accent-foreground cursor-pointer text-sub-title"
                                onClick={() => handleCopy(idx, pair[0].content)}
                              />
                            )}

                            <Edit className="h-[14px]  w-[14px] hover:text-accent-foreground  mt-1 cursor-pointer text-sub-title" />
                            <Popover
                              onOpenChange={(open) => {
                                setUserOpen(open ? idx : undefined);
                              }}
                            >
                              <PopoverTrigger asChild>
                                <div className="cursor-pointer rounded-[4px]">
                                  <MoreHorizontal className="h-[17px]  w-[17px] hover:text-accent-foreground  cursor-pointer text-sub-title" />
                                </div>
                              </PopoverTrigger>

                              <PopoverContent className="z-50 p-[6px] w-40 bg-white rounded-md shadow-md">
                                <div className="flex flex-col gap-1">
                                  <Button
                                    variant={"ghost"}
                                    className="flex group items-center gap-2 p-1 py-1 cursor-pointer  focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 justify-start  h-fit   text-sm text-foreground rounded"
                                  >
                                    <FileArchive className="h-[14px]  w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                                    Option 1
                                  </Button>
                                  <Button
                                    variant={"ghost"}
                                    className="flex group items-center gap-2 p-1  py-1 cursor-pointer  focus:ring-0 focus-visible:ring-0  focus:ring-offset-0 focus-visible:ring-offset-0 justify-start  h-fit   text-sm text-foreground rounded"
                                  >
                                    <FileDiff className="h-[14px]  w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                                    Option 2
                                  </Button>
                                  <Button
                                    variant={"ghost"}
                                    className="flex group items-center gap-2  p-1  py-1 cursor-pointer  focus:ring-0 focus-visible:ring-0  focus:ring-offset-0 focus-visible:ring-offset-0 justify-start  h-fit   text-sm text-foreground rounded"
                                  >
                                    <HardDriveDownload className="h-[14px]  w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                                    Option 3
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}
                        <div className={"flex items-center   w-full  gap-1"}>
                          <div
                            className={`relative w-full   font-medium   bg-transparent text-foreground rounded-tl-none text-end px-2 py-0`}
                          >
                            <div
                              className={cn(
                                "inline-flex max-w-[70%] min-w-[700px] text-left justify-end whitespace-pre-wrap "
                              )}
                            >
                              <span className="break-all">
                                {pair[0].content}
                              </span>
                            </div>
                          </div>
                          {pair[0].role === "user" && (
                            <div className="min-w-8 min-h-8 ml-1 rounded-full bg-muted  shadow items-center ">
                              <Image
                                src="/profile.jpg"
                                width={40}
                                height={40}
                                alt="user"
                                className="object-cover rounded-full"
                              ></Image>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bot Conversation  */}
                  {pair[1] && (
                    <div
                      key={`bot-${idx}`}
                      className={"flex w-full justify-start"}
                    >
                      <div className="flex group relative flex-col gap-[4px] ">
                        <div className={"flex items-start w-full  gap-2"}>
                          <div className="w-5 h-5 relative top-[9px] right-px rounded-full flex items-center justify-center">
                            <NavChatBot />
                          </div>

                          <div
                            className={`relative w-full   font-medium  bg-bot text-bot-foreground  relative z-10 ring-1 ring-accent !rounded-[8px]  !rounded-tl-none  px-4 py-2 shadow-[0_0_4px_0_hsla(245,96%,70%,0.12)]`}
                          >
                            <div
                              className={cn(
                                "inline-flex justify-start whitespace-pre-wrap"
                              )}
                            >
                              <span className="break-all">
                                {pair[1].content}
                              </span>
                            </div>

                            <div>
                              <span
                                className="
                          absolute -left-[6px] -top-[7.5px] !z-50 -translate-x-full
                          w-[2px] h-[14px] bg-accent
                          rotate-[88deg]
                        "
                              ></span>
                              <span
                                className="
                          absolute -left-px -top-[1px] -translate-x-full
                          w-[12px] h-[14px] z-50 shadow-[0_0_4px_0_hsla(245,96%,70%,0.12)]
                          bg-bot 
                          [clip-path:polygon(100%_0,0_0,0_100%)]
                          rotate-90
                        "
                              ></span>
                              <span
                                className="
                          absolute -left-[6px] -top-[2px] z-50 -translate-x-full
                          w-[1px] h-[18px] bg-accent
                          rotate-[130deg]
                        "
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div className="relative z-50 h-[16px]">
                          <div
                            className={cn(
                              " opacity-0 group-hover:opacity-100 flex  pl-8 max-h-[20px] gap-3 items-center",
                              botopen === idx ? "opacity-100" : "opacity-0"
                            )}
                          >
                            {copied[idx] ? (
                              <CopyCheck className="h-[14px] w-[14px] hover:text-accent-foreground text-green-500" />
                            ) : (
                              <Copy
                                className="h-[14px] w-[14px] hover:text-accent-foreground cursor-pointer text-sub-title"
                                onClick={() => handleCopy(idx, pair[1].content)}
                              />
                            )}

                            <ThumbsUp
                              className={cn(
                                "h-[14px] w-[14px] hover:text-accent-foreground cursor-pointer",
                                reactions[idx]?.liked
                                  ? "text-emerald-500"
                                  : "text-sub-title"
                              )}
                              onClick={() => toggleLike(idx)}
                            />

                            <ThumbsDown
                              className={cn(
                                "h-[14px] w-[14px] hover:text-accent-foreground cursor-pointer",
                                reactions[idx]?.disliked
                                  ? "text-red-500"
                                  : "text-sub-title"
                              )}
                              onClick={() => toggleDislike(idx)}
                            />
                            <Popover
                              onOpenChange={(open) =>
                                setBotOpen(open ? idx : undefined)
                              }
                            >
                              <PopoverTrigger asChild>
                                <div className="cursor-pointer rounded-[4px]">
                                  <MoreHorizontal className="h-[17px]  w-[17px] hover:text-accent-foreground cursor-pointer text-sub-title" />
                                </div>
                              </PopoverTrigger>

                              <PopoverContent className="z-50 p-[6px] w-40 bg-white rounded-md shadow-md">
                                <div className="flex flex-col gap-1">
                                  <Button
                                    variant={"ghost"}
                                    className="flex group items-center gap-2 p-1 py-1 cursor-pointer  focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 justify-start  h-fit   text-sm text-foreground rounded"
                                  >
                                    <FileArchive className="h-[14px]  w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                                    Option 1
                                  </Button>
                                  <Button
                                    variant={"ghost"}
                                    className="flex group items-center gap-2 p-1  py-1 cursor-pointer  focus:ring-0 focus-visible:ring-0  focus:ring-offset-0 focus-visible:ring-offset-0 justify-start  h-fit   text-sm text-foreground rounded"
                                  >
                                    <FileDiff className="h-[14px]  w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                                    Option 2
                                  </Button>
                                  <Button
                                    variant={"ghost"}
                                    className="flex group items-center gap-2  p-1  py-1 cursor-pointer  focus:ring-0 focus-visible:ring-0  focus:ring-offset-0 focus-visible:ring-offset-0 justify-start  h-fit   text-sm text-foreground rounded"
                                  >
                                    <HardDriveDownload className="h-[14px]  w-[14px] text-muted-foreground group-hover:text-accent-foreground" />{" "}
                                    Option 3
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} className="h-0 w-0" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex  mx-auto z-50  flex-col-reverse p-5 w-full max-w-[61%] ">
          <div className="flex relative  p-0">
            <div className="p-px  rounded-[14px] w-full  flex items-center shadow-[0px_2px_10px_0px_hsla(0,0%,0%,0.06)]  bg-linear-to-b from-[hsla(245,100%,97%,1)] to-[hsla(245,100%,94%,1)] ">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage?.();
                  }
                }}
                className={cn(
                  " p-0 min-h-14 max-h-[400px] rounded-[14px]   resize-none border-0 bg-white px-[21px] pr-[72px] flex  items-center  placeholder:font-normal placeholder:text-base placeholder:text-foreground   leading-[150%] tracking-normal font-normal !text-base text-heading outline-none   overflow-auto  focus:ring-0 focus:ring-offset-0 focus:ring-transparent  focus-visible:ring-0! focus-visible:ring-offset-0 focus-visible:ring-transparent focus:placeholder:text-sub-title",
                  input.length > 0 ? "py-4" : "pt-4"
                )}
                placeholder={data.chat.inputPlaceholder}
              />
            </div>
            <button
              onClick={() => {
                sendMessage();
                setInput("");
              }}
              className=" absolute bottom-2 right-3 cursor-pointer p-2 rounded-2xl font-semibold text-white  bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 border border-white/30 flex items-center "
            >
              {getIcon(data.search.buttonIcon)}
              <span className="absolute inset-0 rounded-2xl pointer-events-none bg-white/20 opacity-40 mix-blend-overlay"></span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
