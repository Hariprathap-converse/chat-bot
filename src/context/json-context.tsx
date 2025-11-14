"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Types (same as before)
interface Header {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

interface SectionItem {
  label: string;
  icon: string;
  hoverIcon?: string;
}

interface Section {
  title: string;
  icon: string;
  type: string;
  layout: string;
  items: SectionItem[];
}

interface FooterItem {
  label: string;
  icon: string;
}

interface FooterSection {
  title: string;
  type: string;
  layout: string;
  icon: string | null;
  items: FooterItem[];
}

interface OpsBotData {
  header: Header;
  search: {
    placeholder: string;
    buttonIcon: string;
  };
  sections: Section[];
  footerSection: FooterSection[];
  chat: {
    introTitle: string;
    subtitle: string;
  };
}

interface OpsBotContextType {
  data: OpsBotData;
  setData: (newData: OpsBotData) => void;
}

// Default JSON
const defaultData: OpsBotData = {
  header: {
    title: "Welcome to OpsBot!",
    subtitle:
      "Your go-to assistant for all things operations! Whether you need quick answers, expert insights, or help with complex operational queries, OpsBot is here to support you.",
    description:
      "Get started by selecting an operation below or ask me directly for assistance!",
    icon: "BotIcon",
  },
  search: { placeholder: "Send a message...", buttonIcon: "Sparkles" },
  sections: [
    {
      title: "Our Operations",
      icon: "MessageIcon",
      type: "cards",
      layout: "row",
      items: [
        { label: "Leave", icon: "LeaveIcon", hoverIcon: "HoverLeaveIcon" },
        { label: "Role", icon: "RoleIcon", hoverIcon: "RoleIcon" },
        { label: "Team", icon: "TeamIcon", hoverIcon: "TeamIcon" },
      ],
    },
  ],
  footerSection: [
    {
      title: "Role Operations",
      type: "list",
      layout: "grid",
      icon: null,
      items: [
        { label: "Create Leave", icon: "EditIcon" },
        { label: "Create Leave Calendar", icon: "EditIcon" },
        { label: "Get Pending Leaves", icon: "EditIcon" },
        { label: "Get Leave History", icon: "EditIcon" },
        { label: "Get Leave Calendar", icon: "EditIcon" },
        { label: "Update Leave Status", icon: "EditIcon" },
        { label: "Update Leave Calendar", icon: "EditIcon" },
        { label: "Delete Leave Record", icon: "EditIcon" },
      ],
    },
  ],
  chat: {
    introTitle: "Hello Hari!",
    subtitle:
      "Your personal assistant for all operational queries. What can I assist you with today?",
  },
};

// Context
const OpsBotContext = createContext<OpsBotContextType>({
  data: defaultData,
  setData: () => {},
});

// Provider
export const OpsBotProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OpsBotData>(defaultData);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("opsBotData");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse opsBotData from localStorage", e);
        // Clear corrupted localStorage and set default
        localStorage.setItem("opsBotData", JSON.stringify(defaultData));
        setData(defaultData);
      }
    } else {
      // First time user: save defaultData
      localStorage.setItem("opsBotData", JSON.stringify(defaultData));
    }
  }, []);

  const updateData = (newData: OpsBotData) => {
    setData(newData);
    if (typeof window !== "undefined") {
      localStorage.setItem("opsBotData", JSON.stringify(newData));
    }
  };

  return (
    <OpsBotContext.Provider value={{ data, setData: updateData }}>
      {children}
    </OpsBotContext.Provider>
  );
};

// Custom hook
export const useOpsBot = () => useContext(OpsBotContext);
