"use client";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import React, { useState } from "react";
import { Conversation, useChat } from "@/context/chat-context";
import { ChevronDown, ChevronRight, MessageSquare } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";


export function NavHistory() {
    const { conversations, selectConversation, activeConversationId } = useChat();
    const [isOpen, setIsOpen] = useState(true);

    if (conversations.length === 0) return null;

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
            <SidebarGroup
                className="
        transition-opacity duration-200
        group-data-[collapsible=icon]:hidden
        group-data-[collapsible=icon]:pointer-events-none
        "
            >
                <SidebarGroupLabel
                    asChild
                    className="text-sm text-sub-heading font-medium mb-1 cursor-pointer w-full flex items-center justify-between"
                >
                    <CollapsibleTrigger>
                        Your Chats
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarMenu>
                        {conversations.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton
                                    onClick={() => selectConversation(item.id)}
                                    isActive={activeConversationId === item.id}
                                    className="w-full min-h-[36px] "
                                    asChild
                                >
                                    <div className="flex w-full gap-2 items-center min-w-0  cursor-pointer">
                                        <span
                                            className="whitespace-nowrap overflow-hidden text-ellipsis text-sm"
                                        >
                                            {item.title}
                                        </span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
}
