"use client";
import { AppSidebar } from "@/client/app-sidebar";
import { components } from "@/client/home";
import { Input } from "@/components/ui/input";
import { useOpsBot } from "@/context/json-context";
import { NavChatBot } from "@/Icons/global/home";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const { data } = useOpsBot();
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
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
    <div className="bg-background relative min-h-screen w-full p-[50px] pb-0 flex item-center justify-center">
      <div className="absolute left-5 rounded-2xl top-5 ">
        <AppSidebar />
      </div>

      <main className="flex flex-col pb-6 min-w-[60%] justify-between ">
        <div className="flex flex-col items-center gap-4">
          {messages.length <= 0 && (
            <div className="flex flex-col items-center gap-[27px]">
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
          <div className="flex flex-col w-full max-h-[500px] overflow-y-auto gap-4 p-4 ">
            {messages.map((msg, idx) => (
              // <div
              //   key={idx}
              //   className={`flex ${
              //     msg.sender === "bot" ? "justify-start" : "justify-end"
              //   }`}
              // >
              //   <div
              //     className={`max-w-[70%] px-4 py-2 font-medium rounded-2xl ${
              //       msg.sender === "bot"
              //         ? "bg-gray-200 text-foreground rounded-tl-none"
              //         : "bg-gradient-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] text-white rounded-tr-none"
              //     }`}
              //   >
              //     {msg.text}
              //   </div>
              // </div>
              <div
                key={idx}
                className={`flex w-full ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div className="flex items-end w-full  gap-2">
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                      <NavChatBot />
                    </div>
                  )}

                  <div
                    className={`relative w-full   font-medium   ${
                      msg.sender === "bot"
                        ? "bg-bot text-bot-foreground  relative z-10 !rounded-[8px]  !rounded-tl-none px-4 py-2 shadow-[0_0_4px_0_hsla(245,96%,70%,0.12)]"
                        : "bg-transparent text-foreground rounded-tl-none text-end px-2 py-2"
                    }`}
                  >
                    {msg.text}
                    {msg.sender === "bot" && (
                      <span
                        className="
      absolute -left-px -top-[1px] -translate-x-full
      w-[12px] h-[14px] z-50 shadow-[0_0_4px_0_hsla(245,96%,70%,0.12)]
      bg-bot  
      [clip-path:polygon(100%_0,0_0,0_100%)]
      rotate-90
    "
                      ></span>
                    )}
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                      <NavChatBot />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[23px] ">
          <div className="flex relative  p-0">
            <div className="p-px rounded-[14px] w-full  shadow-[0px_2px_10px_0px_hsla(0,0%,0%,0.06)]  bg-linear-to-b from-[hsla(245,100%,97%,1)] to-[hsla(245,100%,94%,1)] ">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className=" p-0 h-14 rounded-[14px] border-0 bg-white px-[21px] flex  items-center  
               placeholder:font-normal placeholder:text-base placeholder:text-foreground  
               leading-[150%] tracking-normal font-normal !text-base text-heading outline-none 
                focus:ring-0 focus:ring-offset-0 focus:ring-transparent  focus-visible:ring-0! focus-visible:ring-offset-0 focus-visible:ring-transparent focus:placeholder:text-sub-title"
                placeholder="How can assist you..."
              />
            </div>
            <button
              onClick={() => {
                sendMessage();
                setInput("");
              }}
              className=" absolute top-2.5 right-3 cursor-pointer p-2 rounded-2xl font-semibold text-white  bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 border border-white/30 flex items-center "
            >
              {components[data.search.buttonIcon]}{" "}
              <span className="absolute inset-0 rounded-2xl pointer-events-none bg-white/20 opacity-40 mix-blend-overlay"></span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
