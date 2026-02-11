"use client";

import { ChatMessage } from "@/components/chat/chat-message";
import { Message } from "@/hooks/use-chat-messages";

interface CommerceChatMessageProps {
    message: Message;
    index: number;
    isUser: boolean;
}

export function CommerceChatMessage(props: CommerceChatMessageProps) {
    // Wrapper to allow for future commerce-specific message styling overrides
    return <ChatMessage {...props} />;
}
