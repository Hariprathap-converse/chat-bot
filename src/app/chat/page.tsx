"use client";
import { AppSidebar } from "@/client/app-sidebar";
import { getIcon } from "@/client/home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useOpsBot } from "@/context/json-context";
import { NavChatBot } from "@/Icons/global/home";
import { cn } from "@/lib/utils";
import { Copy, Sparkles, User, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const page = () => {
  const { data } = useOpsBot();

  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([
    {
      sender: "user",
      text: "Hey, I’ve been trying to figure out why my app keeps freezing whenever I load large amounts of text. Any ideas what might cause that?",
    },
    {
      sender: "bot",
      text: "It could be related to how the rendering engine handles long strings. If everything is being re-rendered on each keystroke or state update, the UI thread might get overwhelmed. Are you processing the text on the main thread?",
    },
    {
      sender: "user",
      text: "Yeah, everything’s happening in the main thread right now. I was thinking about offloading it, but I’m not sure what the best approach is.",
    },
    {
      sender: "bot",
      text: "A good start would be to move heavy text operations into a Web Worker or a background task. That way, your UI stays responsive while the data is processed separately.",
    },
    {
      sender: "user",
      text: "Makes sense. Also, I noticed the UI lags even when I’m typing quickly. Could it be related to how I’m updating the state?",
    },
    {
      sender: "bot",
      text: "Possibly. If you're storing the entire text in a single state variable and updating it on each keystroke, it can trigger expensive re-renders. Try debouncing the input or splitting the logic so that only necessary components re-render.",
    },
    {
      sender: "user",
      text: "I’ll try debouncing. Another thing—when I scroll through the text, it feels choppy. Is that normal for large amounts of content?",
    },
    {
      sender: "bot",
      text: "Scrolling lag usually comes from large DOM nodes or too many elements at once. Virtualization might help—only render what’s visible on screen instead of the entire text block.",
    },
    {
      sender: "user",
      text: "Got it. One last thing: should I compress the text before sending it to the server? It’s usually pretty long.",
    },
    {
      sender: "bot",
      text: "Yes, compressing before sending is a good practice. You can use gzip or brotli on the backend. For the frontend, if you're sending via fetch, the browser usually negotiates compression automatically, so you just need server support.",
    },
    {
      sender: "user",
      text: "Perfect. That clears up a lot. I’ll implement these changes. Thanks!",
    },
    {
      sender: "bot",
      text: "Happy to help! Let me know if you run into anything else.",
    },
  ]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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
  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { sender: "user", text: input }]);

    // Simulate bot response (replace with API call if needed)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Bot response to "${input}"` },
      ]);
    }, 500);

    setInput("");
  };

  return (
    <div className="bg-background relative min-h-screen w-full p-[50px] pb-0 pr-2 flex flex-col item-center justify-center">
      <div className="absolute left-5 rounded-2xl top-5 ">
        <AppSidebar />
      </div>

      <main
        ref={containerRef}
        className="flex relative flex-col pb-0 w-full h-full  items-center"
      >
        <div className="flex flex-col items-center gap-4 mx-auto w-full max-h-[770px]  overflow-auto">
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
          <div className="flex flex-col min-w-[60%] max-w-[61%] gap-4 p-4 ">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div className="flex  flex-col gap-2">
                  <div className="flex items-start   w-full  gap-2">
                    {msg.sender === "bot" && (
                      <div className="w-5 h-5 relative top-[9px] right-px rounded-full flex items-center justify-center">
                        <NavChatBot />
                      </div>
                    )}

                    <div
                      className={`relative w-full   font-medium   ${
                        msg.sender === "bot"
                          ? "bg-bot text-bot-foreground  relative z-10 ring-1 ring-accent !rounded-[8px]  !rounded-tl-none  px-4 py-2 shadow-[0_0_4px_0_hsla(245,96%,70%,0.12)]"
                          : "bg-transparent text-foreground rounded-tl-none text-end px-2 py-2"
                      }`}
                    >
                      <span
                        className={cn(
                          msg.sender === "user"
                            ? "max-w-[70%] inline-block text-left"
                            : "w-full"
                        )}
                      >
                        {msg.text}
                      </span>
                      {msg.sender === "bot" && (
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
                      )}
                    </div>
                    {msg.sender === "user" && (
                      <div className="w-8 h-8 ml-1 rounded-full bg-muted flex shadow items-center justify-center">
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
                  {msg.sender === "bot" && (
                    <div className="flex pl-8">
                      <Copy className="h-[14px]  w-[14px]  text-sub-title" />
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex absolute bottom-2 z-50  flex-col-reverse p-5 w-full max-w-[61%] ">
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
                  " p-0 min-h-14 rounded-[14px] !max-h-[300px]  resize-none border-0 bg-white px-[21px] pr-[72px] flex  items-center  placeholder:font-normal placeholder:text-base placeholder:text-foreground   leading-[150%] tracking-normal font-normal !text-base text-heading outline-none  max-h-[100px] overflow-auto  focus:ring-0 focus:ring-offset-0 focus:ring-transparent  focus-visible:ring-0! focus-visible:ring-offset-0 focus-visible:ring-transparent focus:placeholder:text-sub-title",
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
