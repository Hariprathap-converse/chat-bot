/**
 * Refactored Chat Page
 * Clean architecture with reusable components
 */
"use client";
import { useEffect, useRef } from "react";
import { AppSidebar } from "@/client/app-sidebar";
import { useOpsBot } from "@/context/json-context";
import Profile from "@/client/profile";

// Custom Hooks
import { useChatMessages } from "@/hooks/use-chat-messages";

// Components
import { EmptyChatState } from "@/components/chat/empty-chat-state";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import {
  EmployeeDetailsModal,
  SkeletonLoaderModal,
} from "@/components/chat/chat-modals";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { BotTypingLoader } from "@/components/chat/dot-loader";

export default function ChatPage() {
  const { data } = useOpsBot();
  const { setOpen } = useSidebar();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    messages,
    input,
    setInput,
    sendMessage,
    showEmployeeLoader,
    employeeDetailsOpen,
    setEmployeeDetailsOpen,
    botTyping,
  } = useChatMessages();

  // Auto-scroll to bottom on new messages
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

  // Group messages into pairs (user + bot)
  const grouped = [];
  for (let i = 0; i < messages.length; i += 2) {
    grouped.push([messages[i], messages[i + 1]]);
  }

  return (
    <div className="bg-background relative min-h-screen w-full pb-0 pr-1 flex flex-col item-center justify-center">
      {/* Header - Profile */}
      <div className="absolute right-3 top-1.5">
        <Profile />
      </div>
      <div className="absolute left-5 top-4">
        <SidebarTrigger
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        ></SidebarTrigger>
      </div>

      {/* Sidebar */}
      <div className="absolute left-5 rounded-2xl top-5 z-50">
        <AppSidebar />
      </div>

      {/* Main Chat Area */}
      <main
        ref={containerRef}
        className="grid grid-rows-[1fr_auto] justify-center pb-0 w-full h-full pt-[40px] max-h-screen overflow-hidden items-center"
      >
        {/* Messages Container */}
        <div className="flex flex-col items-center gap-4 mx-auto w-full h-full pt-2 overflow-auto">
          {/* Empty State */}
          {messages.length <= 0 && (
            <div
              ref={messagesEndRef}
              className="flex flex-col items-center gap-[27px]"
            >
              <EmptyChatState
                title={data.chat.introTitle}
                subtitle={data.chat.subtitle}
              />
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex flex-col min-w-[60%] max-w-[90%] md:max-w-[71%] lg:max-w-[61%] gap-0 p-4">
            {grouped.map((pair, idx) => (
              <div key={`group-${idx}`} className="flex flex-col gap-1">
                {pair[0] && (
                  <ChatMessage message={pair[0]} index={idx} isUser />
                )}
                {pair[1] && (
                  <ChatMessage message={pair[1]} index={idx} isUser={false} />
                )}
              </div>
            ))}

            {/* BOT TYPING LOADER */}
            {botTyping && <BotTypingLoader />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex mx-auto z-40 flex-col-reverse p-5 w-full min-w-[65%]  md:max-w-[70%] lg:max-w-[65%] xl:min-w-[61%] 2xl:max-w-[700px] ">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            placeholder={data.chat.inputPlaceholder}
            buttonIcon={data.search.buttonIcon}
          />
        </div>
      </main>

      {/* Modals */}
      <SkeletonLoaderModal isOpen={showEmployeeLoader} />
      <EmployeeDetailsModal
        isOpen={employeeDetailsOpen}
        onClose={() => setEmployeeDetailsOpen(false)}
      />
    </div>
  );
}
