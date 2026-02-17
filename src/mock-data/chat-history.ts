import { Message } from "@/hooks/use-chat-messages";

export interface Conversation {
  id: string;
  title: string;
  date: string;
  isBookmarked?: boolean;
}

export const initialConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "Mountain Trip",
    date: "Today",
  },
  {
    id: "conv-2",
    title: "React Performance",
    date: "Yesterday",
  },
];

export const initialMessagesMap: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "1",
      role: "user",
      content: "Hey there! I just got back from my trip to the mountains.",
      type: "text",
    },
    {
      id: "2",
      role: "bot",
      content:
        "Wow, that sounds amazing! I’ve always wanted to see the mountains in the fall.",
      type: "text",
    },
  ],
  "conv-2": [
    {
      id: "1",
      role: "user",
      content:
        "Hey, I've been trying to figure out why my app keeps freezing whenever I load large amounts of text. Any ideas what might cause that?",
      type: "text",
    },
    {
      id: "2",
      role: "bot",
      content:
        "It could be related to how the rendering engine handles long strings. If everything is being re-rendered on each keystroke or state update, the UI thread might get overwhelmed.",
      type: "text",
    },
  ],
};
