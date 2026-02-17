"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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
  deleteConversation: (id: string) => void;
  toggleBookmark: (id: string) => void;
  addMessageToConversation: (conversationId: string, message: Message) => void;
  updateMessage: (
    conversationId: string,
    messageId: string,
    updates: Partial<Message>,
  ) => void;
  ensureActiveConversation: (firstMessageContent: string) => string;
  pendingFile: File | null;
  setPendingFile: (file: File | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONVERSATIONS: "opsbot_conversations",
  MESSAGES: "opsbot_messages",
  ACTIVE_ID: "opsbot_active_id",
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [messagesMap, setMessagesMap] =
    useState<Record<string, Message[]>>(initialMessagesMap);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    const storedConvos = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    const storedMsgs = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const storedActiveId = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);

    if (storedConvos) {
      try {
        setConversations(JSON.parse(storedConvos));
      } catch (e) {
        console.error("Failed to parse stored conversations", e);
      }
    }

    if (storedMsgs) {
      try {
        setMessagesMap(JSON.parse(storedMsgs));
      } catch (e) {
        console.error("Failed to parse stored messages", e);
      }
    }

    if (storedActiveId) {
      setActiveConversationId(storedActiveId);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.CONVERSATIONS,
      JSON.stringify(conversations),
    );
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messagesMap));
  }, [messagesMap]);

  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, activeConversationId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ID);
    }
  }, [activeConversationId]);

  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  // Sync currentMessages when activeConversationId or messagesMap changes
  useEffect(() => {
    if (activeConversationId && messagesMap[activeConversationId]) {
      setCurrentMessages(messagesMap[activeConversationId]);
    } else if (activeConversationId === null) {
      // Only clear if we explicitly set to null (New Chat)
      // If we are just starting up and activeConversationId is null, we are empty anyway.
      setCurrentMessages([]);
    }
  }, [activeConversationId, messagesMap]);

  const createNewChat = () => {
    setActiveConversationId(null);
    setCurrentMessages([]); // Clear view immediately
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ID);
  };

  const selectConversation = (id: string) => {
    setActiveConversationId(id);
    // currentMessages will sync via useEffect
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
    message: Message,
  ) => {
    setMessagesMap((prev) => {
      const existing = prev[conversationId] || [];
      return { ...prev, [conversationId]: [...existing, message] };
    });
  };

  const updateMessage = (
    conversationId: string,
    messageId: string,
    updates: Partial<Message>,
  ) => {
    setMessagesMap((prev) => {
      const currentMsgs = prev[conversationId] || [];
      const newMsgs = currentMsgs.map((msg) =>
        msg.id === messageId ? { ...msg, ...updates } : msg,
      );
      return { ...prev, [conversationId]: newMsgs };
    });
  };

  // Override setMessages to also update the map if we have an active conversation
  const setMessagesExternal: React.Dispatch<React.SetStateAction<Message[]>> = (
    value,
  ) => {
    // We update local state first for immediate UI feedback if needed,
    // but primarily we must update the messagesMap to persist.
    // However, the hook uses this to "setMessages".

    // If we have an active conversation, we should update the map.
    // If we are in "New Chat" (null id), we might just be updating local state
    // before the conversation is "created" (though ensureActiveConversation handles creation).

    // Wait, useChatMessages calls "ensureActiveConversation" BEFORE "setMessages" usually.
    // BUT the tools (email/sms) call setMessages directly on 'prev'.

    // The issue: "value" can be a function updater.
    // We need to know the calculated new value to update the map.

    // Let's use a dual update strategy.

    let calculatedNewMessages: Message[] = [];

    setCurrentMessages((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      calculatedNewMessages = newValue;
      return newValue;
    });

    // We need to defer this slightly or just run it.
    // But we are inside the set function callback... no we are not.
    // The above setCurrentMessages call is sync-ish for the calculate part? No.

    // Actually, "setMessagesExternal" is called by the hook.
    // We can't easily plug into "setCurrentMessages" updater to update "messagesMap".
    // Better approach: Update messagesMap DIRECTLY, and let the useEffect sync currentMessages.

    if (activeConversationId) {
      setMessagesMap((prevMap) => {
        const currentConvoMsgs = prevMap[activeConversationId] || [];
        const newValue =
          value instanceof Function ? value(currentConvoMsgs) : value;
        return {
          ...prevMap,
          [activeConversationId]: newValue,
        };
      });
    } else {
      // No active conversation?
      // This might happen if we haven't "ensured" it yet,
      // but the hook usually ensures it before sending.
      // What about tool updates? They rely on "messages" state.

      // If we are truly in "New Chat" state, we just update local currentMessages.
      setCurrentMessages(value);
    }
  };

  const updateConversationTitle = (id: string, title: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title } : c)),
    );
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setMessagesMap((prev) => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });
    if (activeConversationId === id) {
      createNewChat();
    }
  };

  const toggleBookmark = (id: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isBookmarked: !c.isBookmarked } : c,
      ),
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
        updateMessage,
        ensureActiveConversation,
        deleteConversation,
        toggleBookmark,
        pendingFile,
        setPendingFile,
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
