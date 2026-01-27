import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useChat } from "@/context/chat-context";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  type?: "text" | "website-loader" | "email-tool" | "sms-tool" | "employee-loader";
  toolData?: {
    target?: string;
    status?: "idle" | "processing" | "sending" | "success" | "error";
  };
}

export function useChatMessages() {
  const { messages, addMessageToConversation, updateMessage, ensureActiveConversation, setMessages } = useChat();
  const [input, setInput] = useState("");
  const [showEmployeeLoader, setShowEmployeeLoader] = useState(false);
  const [employeeDetailsOpen, setEmployeeDetailsOpen] = useState(false);
  const [botTyping, setBotTyping] = useState(false);

  const sendEmailTool = async (
    messageId: string,
    to: string,
    subject: string,
    message: string,
    conversationId: string
  ) => {
    try {
      // 1. Initial State: Processing/Scanning (Implicit or set by caller)
      // Wait for visual effect (Scanning phase)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 2. Second State: Sending (Drafting/Flying phase)
      updateMessage(conversationId, messageId, {
        toolData: { target: to, status: "sending" }
      });

      // 3. API Call (Wait for it!)
      const result = await apiClient("/auth/tools-send-email", {
        method: "POST",
        body: JSON.stringify({
          recipient_email: to,
          subject: subject,
          body: message,
        }),
      });

      // 4. Final State: Success or Error
      if (!result.success) {
        toast.error(result.message || "Failed to send email");
        updateMessage(conversationId, messageId, {
          toolData: { target: to, status: "error" },
          content: result.message ?? "Failed to send email"
        });
      } else {
        toast.success(result.message || "Email sent successfully");
        updateMessage(conversationId, messageId, {
          toolData: { target: to, status: "success" },
          content: `Email sent to ${to}`
        });
      }

    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && err.message === "Failed to fetch"
          ? "Email service is unreachable"
          : err instanceof Error
            ? err.message
            : "Failed to send email";

      toast.error(errorMessage);

      updateMessage(conversationId, messageId, {
        toolData: { target: to, status: "error" },
        content: errorMessage
      });
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage = userText.toLowerCase();

    // Ensure we have a conversation ID. 
    // This creates a NEW conversation if we are in "New Chat" mode.
    const conversationId = ensureActiveConversation(userText);

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      type: "text",
    };

    addMessageToConversation(conversationId, newUserMsg);
    setInput("");

    const emailMatch = userText.match(
      /send\s+(?:an?\s+)?email\s+to\s+([^\s]+)\s+(?:with\s+)?subject\s+(.+?)\s+(?:message|body|saying|as|with)\s+(.+)/i
    );

    const smsMatch = userText.match(
      /(?:send|sending)\s+(?:a|an)?\s*sms\s+to\s+([^\s]+)\s+as\s+(.+)/i
    );

    if (emailMatch) {
      const targetEmail = emailMatch[1];
      const subject = emailMatch[2];
      const body = emailMatch[3];

      const toolMessageId = (Date.now() + 1).toString();
      const toolMsg: Message = {
        id: toolMessageId,
        role: "bot",
        content: "",
        type: "email-tool",
        toolData: {
          target: targetEmail,
          status: "processing", // Start at processing
        },
      };

      addMessageToConversation(conversationId, toolMsg);
      // Fire and forget the async tool handler
      sendEmailTool(toolMessageId, targetEmail, subject, body, conversationId);
      return;
    }

    if (smsMatch) {
      const targetNumber = smsMatch[1];
      const toolMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "",
        type: "sms-tool",
        toolData: { target: targetNumber, status: "processing" },
      };
      addMessageToConversation(conversationId, toolMsg);
      return;
    }

    setBotTyping(true);

    if (
      userMessage.includes("employee details") ||
      userMessage.includes("employee details form")
    ) {
      setShowEmployeeLoader(true);

      setTimeout(() => {
        setShowEmployeeLoader(false);
        setEmployeeDetailsOpen(true);
      }, 2000);

      setTimeout(() => {
        setBotTyping(false);
      }, 500);
    } else if (
      userMessage.includes("generate website") ||
      userMessage.includes("website generator")
    ) {
      setTimeout(() => {
        setBotTyping(false);
        const botMsg: Message = {
          id: (Date.now() + 3).toString(),
          role: "bot",
          content: "Generating your website...",
          type: "website-loader",
          toolData: { status: "processing" },
        };
        addMessageToConversation(conversationId, botMsg);
      }, 500);
    } else {
      setTimeout(() => {
        setBotTyping(false);
        const botMsg: Message = {
          id: (Date.now() + 4).toString(),
          role: "bot",
          content: `Bot response to "${userText}"`,
          type: "text",
        };
        addMessageToConversation(conversationId, botMsg);
      }, 500);
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    showEmployeeLoader,
    employeeDetailsOpen,
    setEmployeeDetailsOpen,
    botTyping,
    addEmployeeSuccessMessage: () => {
      const conversationId = ensureActiveConversation("Employee Details");
      const botMsg: Message = {
        id: (Date.now()).toString(),
        role: "bot",
        content: "",
        type: "employee-loader",
        toolData: { status: "success" },
      };
      addMessageToConversation(conversationId, botMsg);
    }
  };
}
