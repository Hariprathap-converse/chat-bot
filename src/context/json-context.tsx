"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Header {
  title: string;
  subtitle: string;
  description: string;
  customIcon: string;
}

interface SectionItem {
  key: string;
  label: string;
  icon: string;
  hoverIcon?: string;
}

interface Section {
  title: string;
  icon: string;
  items: SectionItem[];
}

interface FooterItem {
  label: string;
  icon: string;
}

interface FooterSection {
  sectionKey: string;
  title: string;
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
    inputPlaceholder: string;
  };
}

interface OpsBotContextType {
  data: OpsBotData;
  setData: (newData: OpsBotData) => void;
}

const defaultData: OpsBotData = {
  header: {
    title: "Welcome to OpsBot!",
    subtitle:
      "Your go-to assistant for all things operations! Whether you need quick answers, expert insights, or help with complex operational queries, OpsBot is here to support you.",
    description:
      "Get started by selecting an operation below or ask me directly for assistance!",
    customIcon: "BotIcon",
  },

  search: { placeholder: "How can I assist you...", buttonIcon: "SendIcon" },

  sections: [
    {
      title: "Our Operations",
      icon: "MessageIcon",
      items: [
        {
          key: "Ai Insights",
          label: "Ai Insights",
          icon: "BrainCircuit",
          hoverIcon: "BrainCircuit",
        },
        {
          key: "leave",
          label: "Leave",
          icon: "Handshake",
          hoverIcon: "HoverLeaveIcon",
        },
        {
          key: "role",
          label: "Role",
          icon: "ShieldUser",
          hoverIcon: "ShieldUser",
        },
        {
          key: "team",
          label: "Team",
          icon: "TbBrandTeams",
          hoverIcon: "TbBrandTeams",
        },
        {
          key: "attendance",
          label: "Attendance",
          icon: "CalendarClock",
          hoverIcon: "CalendarClock",
        },
      ],
    },
  ],

  footerSection: [
    {
      sectionKey: "leave",
      title: "Leave Operations",
      icon: null,
      items: [
        { label: "Summarize", icon: "EditIcon" },
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

    {
      sectionKey: "role",
      title: "Role Operations",
      icon: null,
      items: [
        { label: "Create Role", icon: "EditIcon" },
        { label: "Update Role", icon: "EditIcon" },
        { label: "Get Role List", icon: "EditIcon" },
      ],
    },

    {
      sectionKey: "team",
      title: "Team Operations",
      icon: null,
      items: [
        { label: "Classify", icon: "EditIcon" },
        { label: "Create Team", icon: "EditIcon" },
        { label: "Update Team", icon: "EditIcon" },
        { label: "Delete Team", icon: "EditIcon" },
        { label: "Get Team Members", icon: "EditIcon" },
      ],
    },
    {
      sectionKey: "attendance",
      title: "Attendance Operations",
      icon: null,
      items: [
        { label: "Analyze Sentiment", icon: "Smile" },
        { label: "Mark Attendance", icon: "CheckIcon" },
        { label: "Get Attendance Report", icon: "FileText" },
        { label: "Update Attendance", icon: "EditIcon" },
      ],
    },
    {
      sectionKey: "Ai Insights",
      title: "Insights Operations",
      icon: null,
      items: [
        { label: "Summarize", icon: "EditIcon" },
        { label: "Classify", icon: "EditIcon" },
        { label: "Analyze Sentiment", icon: "Smile" },
        { label: "Document Extract", icon: "BookKey" },
      ],
    },
  ],

  chat: {
    introTitle: "Hello Converse!",
    subtitle:
      "Your personal assistant for all operational queries. What can I assist you with today?",
    inputPlaceholder: "How can I assist you...",
  },
};

const OpsBotContext = createContext<OpsBotContextType>({
  data: defaultData,
  setData: () => {},
});

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

        localStorage.setItem("opsBotData", JSON.stringify(defaultData));
        setData(defaultData);
      }
    } else {
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

export const useOpsBot = () => useContext(OpsBotContext);
