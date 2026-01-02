/**
 * Custom Hook for Chat Logic
 * Handles message management and keyword detection
 */
import { useState } from "react";
import { toast } from "sonner";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  type?: "text" | "website-loader" | "email-tool" | "sms-tool";
  toolData?: {
    target?: string;
    status?: "idle" | "processing" | "sending" | "success" | "error";
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "user",
    content:
      "Hey, I've been trying to figure out why my app keeps freezing whenever I load large amounts of text. Any ideas what might cause that?",
  },
  {
    id: "2",
    role: "bot",
    content:
      "It could be related to how the rendering engine handles long strings. If everything is being re-rendered on each keystroke or state update, the UI thread might get overwhelmed. Are you processing the text on the main thread?",
  },
  {
    id: "3",
    role: "user",
    content:
      "Makes sense. Also, I noticed the UI lags even when I'm typing quickly. Could it be related to how I'm updating the state?",
  },
  {
    id: "4",
    role: "bot",
    content:
      "Possibly. If you're storing the entire text in a single state variable and updating it on each keystroke, it can trigger expensive re-renders. Try debouncing the input or splitting the logic so that only necessary components re-render.",
  },
  {
    id: "5",
    role: "user",
    content:
      "I'll try debouncing. Another thing—when I scroll through the text, it feels choppy. Is that normal for large amounts of content?",
  },
  {
    id: "6",
    role: "bot",
    content:
      "Scrolling lag usually comes from large DOM nodes or too many elements at once. Virtualization might help—only render what's visible on screen instead of the entire text block.",
  },
  {
    id: "7",
    role: "user",
    content:
      "Got it. One last thing: should I compress the text before sending it to the server? It's usually pretty long.",
  },
  {
    id: "8",
    role: "bot",
    content:
      "Yes, compressing before sending is a good practice. You can use gzip or brotli on the backend. For the frontend, if you're sending via fetch, the browser usually negotiates compression automatically, so you just need server support.",
  },
  {
    id: "9",
    role: "user",
    content:
      "Perfect. That clears up a lot. I'll implement these changes. Thanks!",
  },
  {
    id: "10",
    role: "bot",
    content:
      "Happy to help! Let me know if you need  employee details or employee details form or generate website or website generator.",
  },
];

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [showEmployeeLoader, setShowEmployeeLoader] = useState(false);
  const [employeeDetailsOpen, setEmployeeDetailsOpen] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const sendEmailTool = async (
    messageId: string,
    to: string,
    subject: string,
    message: string
  ) => {
    try {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, toolData: { ...msg.toolData, status: "idle" } }
            : msg
        )
      );
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, toolData: { ...msg.toolData, status: "sending" } }
              : msg
          )
        );
      }, 2000);
      const res = await fetch("http://localhost:8000/auth/tools-send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient_email: to,
          subject: subject,
          body: message,
        }),
      });

      // const res = await new Promise<Response>((resolve) => {
      //   setTimeout(() => {
      //     resolve(new Response(null, { status: 200 }));
      //   }, 4000); // Simulate 2 second delay
      // });
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message || "Failed to send email");
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  toolData: { ...msg.toolData, status: "error" },
                  content: result.message ?? "Failed to send email",
                }
              : msg
          )
        );
      } else {
        toast.success(result.message || "Email sent successfully");
      }
      if (!res.ok) throw new Error("Email failed");

      // Success
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                toolData: { ...msg.toolData, status: "success" },
                content: `Email sent to ${to}`,
              }
            : msg
        )
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                toolData: { ...msg.toolData, status: "error" },
                content: "Failed to send email",
              }
            : msg
        )
      );
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage = userText.toLowerCase();

    // Add user message
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      type: "text",
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");

    // Regex for Email
    // const emailMatch = userText.match(
    //   /(?:send|sending|email)\s+(?:a|an)?\s*(?:mail|email)\s*(?:to)?\s*([^\s]+)\s+(?:as|with|saying)?\s+(.+)/i
    // );
    const emailMatch = userText.match(
      /send\s+(?:an?\s+)?email\s+to\s+([^\s]+)\s+(?:with\s+)?subject\s+(.+?)\s+(?:message|body|saying|as|with)\s+(.+)/i
    );
    // Regex for SMS
    const smsMatch = userText.match(
      /(?:send|sending)\s+(?:a|an)?\s*sms\s+to\s+([^\s]+)\s+as\s+(.+)/i
    );

    if (emailMatch) {
      const targetEmail = emailMatch[1];
      console.log("targetEmail: ", targetEmail);
      const subject = emailMatch[2];
      console.log("subject: ", subject);
      const body = emailMatch[3];
      console.log("body: ", body);

      const toolMessageId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        {
          id: toolMessageId,
          role: "bot",
          content: "",
          type: "email-tool",
          toolData: {
            target: targetEmail,
            status: "processing",
          },
        },
      ]);

      sendEmailTool(toolMessageId, targetEmail, subject, body);
      return;
    }

    if (smsMatch) {
      const targetNumber = smsMatch[1];

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: "",
          type: "sms-tool",
          toolData: { target: targetNumber, status: "processing" },
        },
      ]);
      return;
    }

    // BOT STARTS TYPING (Default Flow)
    setBotTyping(true);

    // Keyword flows
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
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            role: "bot",
            content: "Loading your Employee Details form...",
            type: "text",
          },
        ]);
      }, 500);
    } else if (
      userMessage.includes("generate website") ||
      userMessage.includes("website generator")
    ) {
      // Replaced genLoader with inline message
      setTimeout(() => {
        setBotTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 3).toString(),
            role: "bot",
            content: "Generating your website...",
            type: "website-loader",
          },
        ]);
      }, 500);
    } else {
      // Simulated delayed bot response
      setTimeout(() => {
        setBotTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 4).toString(),
            role: "bot",
            content: `Bot response to "${userText}"`,
            type: "text",
          },
        ]);
      }, 5000);
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
  };
}
