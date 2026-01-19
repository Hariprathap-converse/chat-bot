"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Message } from "@/hooks/use-chat-messages";
import {
    initialConversations,
    initialMessagesMap,
    Conversation,
} from "@/mock-data/chat-history";
export type { Conversation };

interface ChatContextType {
    conversations: Conversation[];
    messages: Message[];
    activeConversationId: string | null;
    setConversations: (conversations: Conversation[]) => void;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    createNewChat: () => void;
    selectConversation: (id: string) => void;
    updateConversationTitle: (id: string, title: string) => void;
    addMessageToConversation: (
        conversationId: string,
        message: Message
    ) => void;
    ensureActiveConversation: (firstMessageContent: string) => string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [conversations, setConversations] = useState<Conversation[]>(
        initialConversations
    );
    const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(
        initialMessagesMap
    );
    const [activeConversationId, setActiveConversationId] = useState<
        string | null
    >(null);

    // Current view messages (derived or state? Better to synchronize)
    // To allow independent "typing" state in hook, we might just expose the raw data here.
    // But useChatMessages has "setMessages".
    // Let's keep a local "messages" state that syncs with the active conversation.
    const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

    const createNewChat = () => {
        setActiveConversationId(null);
        setCurrentMessages([]);
    };

    const selectConversation = (id: string) => {
        setActiveConversationId(id);
        setCurrentMessages(messagesMap[id] || []);
    };

    // Helper to lazily create conversation on first message
    const ensureActiveConversation = (firstMessageContent: string): string => {
        if (activeConversationId) return activeConversationId;

        const newId = Date.now().toString();
        const title =
            firstMessageContent.length > 30
                ? firstMessageContent.substring(0, 30) + "..."
                : firstMessageContent;

        const newConversation: Conversation = {
            id: newId,
            title: title,
            date: "Today",
        };

        setConversations((prev) => [newConversation, ...prev]);
        setActiveConversationId(newId);

        // Initialize map for new convo
        setMessagesMap((prev) => ({ ...prev, [newId]: [] }));

        return newId;
    };

    const addMessageToConversation = (
        conversationId: string,
        message: Message
    ) => {
        setMessagesMap((prev) => {
            const existing = prev[conversationId] || [];
            return { ...prev, [conversationId]: [...existing, message] };
        });

        // If we are currently viewing this conversation, update currentMessages
        if (activeConversationId === conversationId || activeConversationId === null) {
            // Note: ensuring activeConversation set activeConversationId BEFORE calling this usually
            setCurrentMessages((prev) => [...prev, message]);
        }
    };

    // Override setMessages to also update the map if we have an active conversation
    const setMessagesExternal: React.Dispatch<React.SetStateAction<Message[]>> = (
        value
    ) => {
        // This is tricky because hook might use functional update.
        setCurrentMessages((prev) => {
            const newValue = value instanceof Function ? value(prev) : value;

            if (activeConversationId) {
                setMessagesMap((prevMap) => ({
                    ...prevMap,
                    [activeConversationId]: newValue
                }));
            }
            return newValue;
        });
    };

    const updateConversationTitle = (id: string, title: string) => {
        setConversations((prev) =>
            prev.map((c) => (c.id === id ? { ...c, title } : c))
        );
    };

    return (
        <ChatContext.Provider
            value={{
                conversations,
                messages: currentMessages,
                activeConversationId,
                setConversations,
                setMessages: setMessagesExternal, // This allows the hook to function as normal
                createNewChat,
                selectConversation,
                updateConversationTitle,
                addMessageToConversation,
                ensureActiveConversation,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
