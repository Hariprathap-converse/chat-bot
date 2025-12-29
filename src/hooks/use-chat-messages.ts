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
        content: "Hey, I've been trying to figure out why my app keeps freezing whenever I load large amounts of text. Any ideas what might cause that?",
    },
    {
        role: "bot",
        content: "It could be related to how the rendering engine handles long strings. If everything is being re-rendered on each keystroke or state update, the UI thread might get overwhelmed. Are you processing the text on the main thread?",
    },
    {
        role: "user",
        content: "Yeah, everything's happening in the main thread right now. I was thinking about offloading it, but I'm not sure what the best approach is.",
    },
    {
        role: "bot",
        content: "A good start would be to move heavy text operations into a Web Worker or a background task. That way, your UI stays responsive while the data is processed separately.",
    },
    {
        role: "user",
        content: "Makes sense. Also, I noticed the UI lags even when I'm typing quickly. Could it be related to how I'm updating the state?",
    },
    {
        role: "bot",
        content: "Possibly. If you're storing the entire text in a single state variable and updating it on each keystroke, it can trigger expensive re-renders. Try debouncing the input or splitting the logic so that only necessary components re-render.",
    },
    {
        role: "user",
        content: "I'll try debouncing. Another thing—when I scroll through the text, it feels choppy. Is that normal for large amounts of content?",
    },
    {
        role: "bot",
        content: "Scrolling lag usually comes from large DOM nodes or too many elements at once. Virtualization might help—only render what's visible on screen instead of the entire text block.",
    },
    {
        role: "user",
        content: "Got it. One last thing: should I compress the text before sending it to the server? It's usually pretty long.",
    },
    {
        role: "bot",
        content: "Yes, compressing before sending is a good practice. You can use gzip or brotli on the backend. For the frontend, if you're sending via fetch, the browser usually negotiates compression automatically, so you just need server support.",
    },
    {
        role: "user",
        content: "Perfect. That clears up a lot. I'll implement these changes. Thanks!",
    },
    {
        role: "bot",
        content: "Happy to help! Let me know if you need  employee details or employee details form or generate website or website generator.",
    },
];

export function useChatMessages() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [showEmployeeLoader, setShowEmployeeLoader] = useState(false);
    const [employeeDetailsOpen, setEmployeeDetailsOpen] = useState(false);
    const [genLoader, setGenLoader] = useState(false);

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = input.trim().toLowerCase();

        // Add user message
        setMessages((prev) => [...prev, { role: "user", content: input }]);

        // Check for keyword triggers
        if (userMessage.includes("employee details") || userMessage.includes("employee details form")) {
            // Show employee details form with skeleton loader
            setShowEmployeeLoader(true);

            // Simulate loading time for skeleton
            setTimeout(() => {
                setShowEmployeeLoader(false);
                setEmployeeDetailsOpen(true);
            }, 2000); // 2 second skeleton loader

            // Add bot response
            setTimeout(() => {
                setMessages((prev) => [...prev, { role: "bot", content: "Loading your Employee Details form..." }]);
            }, 500);
        } else if (userMessage.includes("generate website") || userMessage.includes("website generator")) {
            // Show website generator loader
            setGenLoader(true);

            // Add bot response
            setTimeout(() => {
                setMessages((prev) => [...prev, { role: "bot", content: "Generating your website..." }]);
            }, 500);
        } else {
            // Regular bot response
            setTimeout(() => {
                setMessages((prev) => [...prev, { role: "bot", content: `Bot response to "${input}"` }]);
            }, 500);
        }

        setInput("");
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
    };
}
