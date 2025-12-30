/**
 * Custom Hook for Chat Logic
 * Handles message management and keyword detection
 */
import { useState, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "user",
    content:
      "Hey, I've been trying to figure out why my app keeps freezing whenever I load large amounts of text. Any ideas what might cause that?",
  },
  {
    role: "bot",
    content:
      "It could be related to how the rendering engine handles long strings. If everything is being re-rendered on each keystroke or state update, the UI thread might get overwhelmed. Are you processing the text on the main thread?",
  },
  {
    role: "user",
    content:
      "Makes sense. Also, I noticed the UI lags even when I'm typing quickly. Could it be related to how I'm updating the state?",
  },
  {
    role: "bot",
    content:
      "Possibly. If you're storing the entire text in a single state variable and updating it on each keystroke, it can trigger expensive re-renders. Try debouncing the input or splitting the logic so that only necessary components re-render.",
  },
  {
    role: "user",
    content:
      "I'll try debouncing. Another thing—when I scroll through the text, it feels choppy. Is that normal for large amounts of content?",
  },
  {
    role: "bot",
    content:
      "Scrolling lag usually comes from large DOM nodes or too many elements at once. Virtualization might help—only render what's visible on screen instead of the entire text block.",
  },
  {
    role: "user",
    content:
      "Got it. One last thing: should I compress the text before sending it to the server? It's usually pretty long.",
  },
  {
    role: "bot",
    content:
      "Yes, compressing before sending is a good practice. You can use gzip or brotli on the backend. For the frontend, if you're sending via fetch, the browser usually negotiates compression automatically, so you just need server support.",
  },
  {
    role: "user",
    content:
      "Perfect. That clears up a lot. I'll implement these changes. Thanks!",
  },
  {
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
  const [genLoader, setGenLoader] = useState(false);
  const [botTyping, setBotTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage = userText.toLowerCase();

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setInput("");

    // BOT STARTS TYPING
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
          { role: "bot", content: "Loading your Employee Details form..." },
        ]);
      }, 500);
    } else if (
      userMessage.includes("generate website") ||
      userMessage.includes("website generator")
    ) {
      setGenLoader(true);

      setTimeout(() => {
        setBotTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Generating your website..." },
        ]);
      }, 500);
    } else {
      // Simulated delayed bot response
      setTimeout(() => {
        setBotTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: `Bot response to "${userText}"` },
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
    genLoader,
    setGenLoader,
    botTyping,
  };
}
