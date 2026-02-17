import { useState, useEffect } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useChat } from "@/context/chat-context";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  type?:
  | "text"
  | "website-loader"
  | "email-tool"
  | "sms-tool"
  | "employee-loader"
  | "table"
  | "tool-loader"
  | "json";
  file?: {
    name: string;
    size?: number;
    type?: string;
  };
  toolData?: {
    target?: string;
    status?:
    | "idle"
    | "processing"
    | "sending"
    | "success"
    | "error"
    | "cancelled";
    title?: string;
    message?: string;
    to?: string;
    subject?: string;
    body?: string;
  };
  tableData?: any;
  jsonData?: any;
  sentimentStars?: number;
}

export function useChatMessages() {
  const {
    messages,
    addMessageToConversation,
    updateMessage,
    ensureActiveConversation,
    setMessages,
    pendingFile,
    setPendingFile,
  } = useChat();
  const [input, setInput] = useState("");
  const [showEmployeeLoader, setShowEmployeeLoader] = useState(false);
  const [employeeDetailsOpen, setEmployeeDetailsOpen] = useState(false);
  const [dynamicFormData, setDynamicFormData] = useState<any>(null);
  const [botTyping, setBotTyping] = useState(false);
  const MODEL_URL = process.env.NEXT_PUBLIC_MODEL_URL;

  useEffect(() => {
    const checkPendingOperation = async () => {
      // 1. Check for Generic Pending Operation
      const storedOp = localStorage.getItem("pendingOperation");
      if (storedOp) {
        try {
          const { type, input, fileName } = JSON.parse(storedOp);
          localStorage.removeItem("pendingOperation");

          const conversationId = ensureActiveConversation(
            type === "summarize"
              ? "Summary"
              : type === "extract"
                ? "Document Extract"
                : type === "sentiment"
                  ? "Sentiment Analysis"
                  : "Classification",
          );

          const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: type !== "extract" && input,
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
              endpoint = `${MODEL_URL}/ai/summarize`;
              break;
            case "extract":
              endpoint = `${MODEL_URL}/ai/extract-invoice`;
              break;
            case "classify":
              endpoint = `${MODEL_URL}/ai/classify`;
              break;
            case "sentiment":
              endpoint = `${MODEL_URL}/ai/sentiment`;
              break;
          }

          try {
            let response;
            if (type === "extract" && pendingFile) {
              const formData = new FormData();
              formData.append("file", pendingFile);
              response = await fetch(endpoint, {
                method: "POST",
                body: formData,
              });
              setPendingFile(null); // Clear after sending
            } else {
              response = await fetch(endpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  text: input,
                  file: fileName ? { name: fileName } : null,
                }),
              });
            }
            if (!response.ok) throw new Error(`Failed to ${type}`);

            const data = await response.json();
            // Real backend returns { summary: ... } or { response: ... } or { category: ... }
            const responseText =
              data.summary ||
              data.response ||
              data.category ||
              data.sentiment ||
              "Operation completed.";

            let sentimentStars = undefined;
            if (type === "sentiment") {
              if (responseText.includes("Result: Positive")) sentimentStars = 5;
              else if (responseText.includes("Result: Negative"))
                sentimentStars = 0;
              else if (responseText.includes("Result: Neutral"))
                sentimentStars = 2.5;
            }

            setBotTyping(false);
            const botMsg: Message = {
              id: (Date.now() + 2).toString(),
              role: "bot",
              content:
                data.type === "json"
                  ? "Extracted invoice details:"
                  : responseText,
              type: data.type === "json" ? "json" : "text",
              jsonData: data.type === "json" ? data.text : undefined,
              sentimentStars,
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

      // 2. Check for Pending Message (Automatically Send)
      const pendingMessage = localStorage.getItem("pendingMessage");
      if (pendingMessage) {
        localStorage.removeItem("pendingMessage");
        const conversationId = ensureActiveConversation(pendingMessage);

        const newUserMsg: Message = {
          id: Date.now().toString(),
          role: "user",
          content: pendingMessage,
          type: "text",
        };
        addMessageToConversation(conversationId, newUserMsg);

        setBotTyping(true);

        const wsUrl = `${MODEL_URL}/ws/chat`;
        const socket = new WebSocket(wsUrl);

        socket.onopen = () => {
          socket.send(JSON.stringify({ message: pendingMessage }));
        };

        socket.onmessage = (event) => {
          try {
            const response = JSON.parse(event.data);
            setBotTyping(false);

            let content = "Sorry, I didn't get that.";
            if (typeof response === "string") {
              content = response;
            } else if (response && typeof response === "object") {
              content =
                response.text ||
                response.message ||
                response.content ||
                JSON.stringify(response);
            }

            const botMsg: Message = {
              id: (Date.now() + 1).toString(),
              role: "bot",
              content:
                response.type === "json"
                  ? typeof response.content === "string"
                    ? response.content
                    : "Structured data response:"
                  : content,
              type: response.type === "json" ? "json" : "text",
              jsonData: response.type === "json" ? response.text : undefined,
            };
            addMessageToConversation(conversationId, botMsg);
            socket.close();
          } catch (err) {
            setBotTyping(false);
            socket.close();
          }
        };

        socket.onerror = () => {
          setBotTyping(false);
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "bot",
            content: "I couldn't connect to the AI server.",
            type: "text",
          };
          addMessageToConversation(conversationId, botMsg);
        };
      }

      // 3. Check for Pending Draft (Pre-fill Input)
      const pendingDraft = localStorage.getItem("pendingDraft");
      if (pendingDraft) {
        localStorage.removeItem("pendingDraft");
        setInput(pendingDraft);
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
    conversationId: string,
  ) => {
    try {
      // 1. Initial State: Processing/Scanning (Implicit or set by caller)
      // Wait for visual effect (Scanning phase)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 2. Second State: Sending (Drafting/Flying phase)
      updateMessage(conversationId, messageId, {
        toolData: { target: to, status: "sending" },
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
          content: result.message ?? "Failed to send email",
        });
      } else {
        toast.success(result.message || "Email sent successfully");
        updateMessage(conversationId, messageId, {
          toolData: { target: to, status: "success" },
          content: `Email sent to ${to}`,
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
        content: errorMessage,
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

    /*
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
    */

    setBotTyping(true);

    // if (
    //   userMessage.includes("employee details") ||
    //   userMessage.includes("employee details form")
    // ) {
    //   setShowEmployeeLoader(true);
    //   setTimeout(() => {
    //     setShowEmployeeLoader(false);
    //     setEmployeeDetailsOpen(true);
    //   }, 2000);
    //   setBotTyping(false);
    //   return;
    // }

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
    const MODEL_URL = process.env.NEXT_PUBLIC_MODEL_WEBSOCKET_URL;
    const wsUrl = `${MODEL_URL}/ws/chat`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      socket.send(JSON.stringify({ message: userText }));
    };

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        console.log("socket response", response);
        setBotTyping(false);

        // 1. Handle Tool Response
        if (response.type === "tool") {
          const toolMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "bot",
            content: "",
            type: "tool-loader",
            toolData: {
              status: "processing",
              to: response.text?.to,
              subject: response.text?.subject,
              body: response.text?.body,
              target: response.text?.to, // for compatibility with old target prop
            },
          };
          addMessageToConversation(conversationId, toolMsg);
          socket.close();
          return;
        }

        if (response.type === "form") {
          setDynamicFormData(response);
          setShowEmployeeLoader(true);
          setTimeout(() => {
            setShowEmployeeLoader(false);
            setEmployeeDetailsOpen(true);
          }, 1000);
          socket.close();
          return;
        }

        // 2. Handle Table Response (Explicit or Implicit)
        const isTable =
          response.type === "table" ||
          (response.text && typeof response.text === "object") ||
          (!response.type &&
            typeof response === "object" &&
            !response.text &&
            !response.message &&
            !response.content);

        if (isTable) {
          const tableData =
            response.type === "table"
              ? response.text
              : response.text || response;
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "bot",
            content:
              (typeof response.content === "string"
                ? response.content
                : null) || "Generated structured data:",
            type: response.type === "json" ? "json" : "table",
            tableData: response.type === "json" ? undefined : tableData,
            jsonData: response.type === "json" ? response.text : undefined,
          };
          addMessageToConversation(conversationId, botMsg);
          socket.close();
          return;
        }

        // 3. Handle Standard Text Response
        let content = "Sorry, I didn't get that.";
        if (typeof response === "string") {
          content = response;
        } else if (response && typeof response === "object") {
          content =
            typeof response.text === "string"
              ? response.text
              : typeof response.message === "string"
                ? response.message
                : typeof response.content === "string"
                  ? response.content
                  : JSON.stringify(response);
        }

        let sentimentStars = undefined;
        if (typeof content === "string") {
          if (content.includes("Result: Positive")) sentimentStars = 5;
          else if (content.includes("Result: Negative")) sentimentStars = 0;
          else if (content.includes("Result: Neutral")) sentimentStars = 2.5;
        }

        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: content,
          type: "text",
          sentimentStars,
        };
        addMessageToConversation(conversationId, botMsg);
        socket.close();
      } catch (err) {
        console.error("Failed to parse socket message", err);
        setBotTyping(false);
        socket.close();
      }
    };

    socket.onerror = (event) => {
      setBotTyping(false);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content:
          `I couldn't connect to the AI server. Please make sure the backend is running at ${MODEL_URL} and has WebSocket support.`,
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
      const conversationId = ensureActiveConversation(
        title || "Form Submitted",
      );
      const botMsg: Message = {
        id: Date.now().toString(),
        role: "bot",
        content: "",
        type: "employee-loader",
        toolData: {
          status: "success",
          title: title || "Submitted",
          message: message || "Recorded successfully",
        },
      };
      addMessageToConversation(conversationId, botMsg);
    },
    addEmployeeCancelMessage: (title?: string, message?: string) => {
      const conversationId = ensureActiveConversation(
        title || "Form Cancelled",
      );
      const botMsg: Message = {
        id: Date.now().toString(),
        role: "bot",
        content: "",
        type: "employee-loader",
        toolData: {
          status: "error", // Use error status for cancellation visual
          title: title ? `${title} Cancelled` : "Cancelled",
          message: message || "Operation was cancelled.",
        },
      };
      addMessageToConversation(conversationId, botMsg);
    },
    handleToolAction: async (
      messageId: string,
      editedData: { to: string; subject: string; body: string },
    ) => {
      const activeConvoId = ensureActiveConversation("");
      if (!activeConvoId) return;

      try {
        // 1. Set to sending state
        updateMessage(activeConvoId, messageId, {
          toolData: {
            ...editedData,
            status: "sending",
            target: editedData.to,
          },
        });

        // 2. API Call
        const result = await apiClient("/auth/tools-send-email", {
          method: "POST",
          body: JSON.stringify({
            recipient_email: editedData.to,
            subject: editedData.subject,
            body: editedData.body,
          }),
        });

        // 3. Final State
        if (!result.success) {
          toast.error(result.message || "Failed to send email");
          updateMessage(activeConvoId, messageId, {
            toolData: {
              ...editedData,
              status: "error",
              target: editedData.to,
            },
          });
        } else {
          toast.success(result.message || "Email sent successfully");
          updateMessage(activeConvoId, messageId, {
            toolData: {
              ...editedData,
              status: "success",
              target: editedData.to,
            },
            content: `Email sent to ${editedData.to}`,
          });
        }
      } catch (err: any) {
        toast.error(err.message || "An error occurred");
        updateMessage(activeConvoId, messageId, {
          toolData: {
            ...editedData,
            status: "error",
            target: editedData.to,
          },
        });
      }
    },
    handleToolCancel: (messageId: string) => {
      const activeConvoId = ensureActiveConversation("");
      if (!activeConvoId) return;

      updateMessage(activeConvoId, messageId, {
        toolData: {
          status: "cancelled",
        },
      });
    },
  };
}
