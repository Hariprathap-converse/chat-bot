import { useState, useEffect } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useChat } from "@/context/chat-context";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  type?: "text" | "website-loader" | "email-tool" | "sms-tool" | "employee-loader";
  file?: {
    name: string;
    size?: number;
    type?: string;
  };
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

  useEffect(() => {
    const checkPendingOperation = async () => {
      // 1. Check for Generic Pending Operation
      const storedOp = localStorage.getItem("pendingOperation");
      if (storedOp) {
        try {
          const { type, input, fileName } = JSON.parse(storedOp);
          localStorage.removeItem("pendingOperation");

          const conversationId = ensureActiveConversation(type === "summarize" ? "Summary" : type === "extract" ? "Extraction" : "Classification");

          const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            type: "text",
            file: fileName ? { name: fileName } : undefined,
          };
          addMessageToConversation(conversationId, userMsg);

          // Add Bot Loader
          const tempBotId = (Date.now() + 1).toString();
          setBotTyping(true);

          // Determine API endpoint and loading text
          let endpoint = "";
          let loadingText = "";

          switch (type) {
            case "summarize":
              endpoint = "http://localhost:4000/summarize";
              loadingText = "Summarizing content...";
              break;
            case "extract":
              endpoint = "http://localhost:4000/extract";
              loadingText = "Extracting data...";
              break;
            case "classify":
              endpoint = "http://localhost:4000/classify";
              loadingText = "Classifying team...";
              break;
          }

          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                input: input,
                file: fileName ? { name: fileName } : null,
              }),
            });
            if (!response.ok) throw new Error(`Failed to ${type}`);

            const data = await response.json();
            // Mock server returns array or object, we take first item or the data itself
            const responseText = Array.isArray(data) ? (data[0]?.response || "Operation completed.") : data.response || "Operation completed.";

            setBotTyping(false);
            const botMsg: Message = {
              id: (Date.now() + 2).toString(),
              role: "bot",
              content: responseText,
              type: "text",
            };
            addMessageToConversation(conversationId, botMsg);

          } catch (error) {
            setBotTyping(false);
            const errorMsg: Message = {
              id: (Date.now() + 2).toString(),
              role: "bot",
              content: `Sorry, I encountered an error during ${type}.`,
              type: "text",
            };
            addMessageToConversation(conversationId, errorMsg);
          }

        } catch (e) {
          console.error("Failed to parse pending operation", e);
        }
      }
    };

    const t = setTimeout(checkPendingOperation, 500);
    return () => clearTimeout(t);
  }, []);

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
