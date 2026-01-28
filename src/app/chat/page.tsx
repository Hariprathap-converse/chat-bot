"use client";
import { useEffect, useRef } from "react";
import { AppSidebar } from "@/client/app-sidebar";
import { useOpsBot } from "@/context/json-context";
import Profile from "@/client/profile";

import { useChatMessages } from "@/hooks/use-chat-messages";

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
    dynamicFormData,
    botTyping,
    addEmployeeSuccessMessage,
    addEmployeeCancelMessage,
  } = useChatMessages();

  const scrollToBottom = () => {
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
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <main className="grid grid-rows-[1fr_auto]  pb-0  w-full h-full pt-[50px] max-h-screen overflow-hidden items-center">
        <div
          ref={containerRef}
          className="w-full  flex flex-col h-full mx-auto overflow-y-auto pt-[5px]  gap-6 pb-4 px-4 md:px-0"
        >
          {messages.length <= 0 && (
            <div className="flex flex-col items-center gap-[27px] ">
              <EmptyChatState
                title={data.chat.introTitle}
                subtitle={data.chat.subtitle}
              />
            </div>
          )}
          <div>
            <div className="w-full max-w-full sm:max-w-[90%] md:max-w-[78%] lg:max-w-[80%] xl:max-w-[74%] xl:mx-auto   md:mr-[calc(100%-90%)] 2xl:max-w-[57%] flex flex-col  h-full sm:mx-auto  gap-5 pb-4 px-2 md:px-0 ">
              {grouped.map((pair, idx) => (
                <div key={`group-${idx}`} className="flex flex-col gap-1">
                  {pair[0] && (
                    <ChatMessage
                      message={pair[0]}
                      index={idx}
                      isUser
                      scrollToBottom={scrollToBottom}
                    />
                  )}
                  {pair[1] && (
                    <ChatMessage
                      message={pair[1]}
                      index={idx}
                      isUser={false}
                      scrollToBottom={scrollToBottom}
                    />
                  )}
                </div>
              ))}

              {/* BOT TYPING LOADER */}
              {botTyping && <BotTypingLoader />}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* Messages Container */}

        {/* Input Area */}
        <div className="flex mx-auto z-40 flex-col-reverse p-5 md:px-0 pt-0 w-full md:max-w-[76%] lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[58%]">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            placeholder={data.chat.inputPlaceholder}
            buttonIcon={data.search.buttonIcon}
          />
        </div>
      </main>

      <SkeletonLoaderModal isOpen={showEmployeeLoader} />
      <EmployeeDetailsModal
        isOpen={employeeDetailsOpen}
        onClose={() => setEmployeeDetailsOpen(false)}
        dynamicData={dynamicFormData}
        onSubmitSuccess={(title, msg) => {
          setEmployeeDetailsOpen(false);
          addEmployeeSuccessMessage(title, msg);
        }}
        onCancelSuccess={(title, msg) => {
          setEmployeeDetailsOpen(false);
          addEmployeeCancelMessage(title, msg);
        }}
      />
    </div>
  );
}
