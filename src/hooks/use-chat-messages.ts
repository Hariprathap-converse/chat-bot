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
    title?: string;
    message?: string;
  };
}

export function useChatMessages() {
  const { messages, addMessageToConversation, updateMessage, ensureActiveConversation, setMessages } = useChat();
  const [input, setInput] = useState("");
  const [showEmployeeLoader, setShowEmployeeLoader] = useState(false);
  const [employeeDetailsOpen, setEmployeeDetailsOpen] = useState(false);
  const [dynamicFormData, setDynamicFormData] = useState<any>(null);
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    const checkPendingOperation = async () => {
      // 1. Check for Generic Pending Operation
      const storedOp = localStorage.getItem("pendingOperation");
      if (storedOp) {
        try {
          const { type, input, fileName } = JSON.parse(storedOp);
          localStorage.removeItem("pendingOperation");

          const conversationId = ensureActiveConversation(
            type === "summarize" ? "Summary" :
              type === "extract" ? "Extraction" :
                type === "sentiment" ? "Sentiment Analysis" :
                  "Classification"
          );

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

          switch (type) {
            case "summarize":
              endpoint = "http://127.0.0.1:5000/ai/summarize";
              break;
            case "extract":
              endpoint = "http://127.0.0.1:5000/ai/extract";
              break;
            case "classify":
              endpoint = "http://127.0.0.1:5000/ai/classify";
              break;
            case "sentiment":
              endpoint = "http://127.0.0.1:5000/ai/sentiment";
              break;
          }

          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: input,
                file: fileName ? { name: fileName } : null,
              }),
            });
            if (!response.ok) throw new Error(`Failed to ${type}`);

            const data = await response.json();
            // Real backend returns { summary: ... } or { response: ... } or { category: ... }
            const responseText = data.summary || data.response || data.category || data.sentiment || "Operation completed.";

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
      setBotTyping(false);
      return;
    }

    if (
      userMessage.includes("generate website") ||
      userMessage.includes("website generator")
    ) {
      setBotTyping(true);
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
      return;
    }

    const wsUrl = "ws://127.0.0.1:5000/ws/chat";
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      socket.send(JSON.stringify({ message: userText }));
    };

    socket.onmessage = (event) => {
      console.log("event", event)
      const data = JSON.parse(event.data);
      console.log('data', data);
      const response = data;
      console.log('response', response);
      setBotTyping(false);

      if (response.type === "form") {
        setDynamicFormData(response);
        setShowEmployeeLoader(true);
        setTimeout(() => {
          setShowEmployeeLoader(false);
          setEmployeeDetailsOpen(true);
        }, 2000);
      } else {

        // Handle string response or object with text property
        const content = (typeof response === 'object' ? response?.text : response.text) || "Sorry, I didn't get that.";
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: content,
          type: "text",
        };
        addMessageToConversation(conversationId, botMsg);
      }
      socket.close();
    };

    socket.onerror = (event) => {
      setBotTyping(false);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "I couldn't connect to the AI server. Please make sure the backend is running at http://127.0.0.1:5000 and has WebSocket support.",
        type: "text",
      };
      addMessageToConversation(conversationId, botMsg);
    };

  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    showEmployeeLoader,
    employeeDetailsOpen,
    setEmployeeDetailsOpen,
    dynamicFormData,
    botTyping,
    addEmployeeSuccessMessage: (title?: string, message?: string) => {
      const conversationId = ensureActiveConversation(title || "Form Submitted");
      const botMsg: Message = {
        id: (Date.now()).toString(),
        role: "bot",
        content: "",
        type: "employee-loader",
        toolData: {
          status: "success",
          title: title || "Submitted",
          message: message || "Recorded successfully"
        },
      };
      addMessageToConversation(conversationId, botMsg);
    },
    addEmployeeCancelMessage: (title?: string, message?: string) => {
      const conversationId = ensureActiveConversation(title || "Form Cancelled");
      const botMsg: Message = {
        id: (Date.now()).toString(),
        role: "bot",
        content: "",
        type: "employee-loader",
        toolData: {
          status: "error", // Use error status for cancellation visual
          title: title ? `${title} Cancelled` : "Cancelled",
          message: message || "Operation was cancelled."
        },
      };
      addMessageToConversation(conversationId, botMsg);
    }
  };
}
