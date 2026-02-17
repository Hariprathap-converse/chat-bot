"use client";

import { ChatMessage } from "@/components/chat";
import { Message } from "@/hooks/use-chat-messages";

interface CommerceChatMessageProps {
  message: Message;
  index: number;
  isUser: boolean;
}

export function CommerceChatMessage(props: CommerceChatMessageProps) {
  return <ChatMessage {...props} />;
}
