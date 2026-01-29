"use client";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import React, { useState, useRef, useEffect } from "react";
import { Conversation, useChat } from "@/context/chat-context";
import { ChevronRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function NavHistory() {
    const { conversations, selectConversation, activeConversationId, deleteConversation, updateConversationTitle } = useChat();
    const [isOpen, setIsOpen] = useState(true);
    const { isMobile } = useSidebar();

    // Renaming state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Deletion state
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId]);

    if (conversations.length === 0) return null;

    const startRename = (id: string, currentTitle: string) => {
        setEditingId(id);
        setEditTitle(currentTitle);
    };

    const saveRename = () => {
        if (editingId && editTitle.trim()) {
            updateConversationTitle(editingId, editTitle.trim());
        }
        setEditingId(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            saveRename();
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    const confirmDelete = () => {
        if (deleteTargetId) {
            deleteConversation(deleteTargetId);
            setDeleteTargetId(null);
            setShowDeleteConfirm(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteTargetId(id);
        setShowDeleteConfirm(true);
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel
                        asChild
                        className="text-sm text-sub-heading font-medium mb-1 cursor-pointer w-full flex items-center justify-between"
                    >
                        <CollapsibleTrigger>
                            Your Chats
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent className="max-h-[310px] overflow-y-auto pr-1">
                        <SidebarMenu className="gap-[2px]">
                            {conversations.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        onClick={() => selectConversation(item.id)}
                                        isActive={activeConversationId === item.id}
                                        className="w-full rounded-[4px]  min-h-[36px]"
                                    >
                                        {editingId === item.id ? (
                                            <input
                                                ref={inputRef}
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                onBlur={saveRename}
                                                onKeyDown={handleKeyDown}
                                                className="w-full bg-transparent border-none outline-none text-sm p-0 h-auto font-inherit"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            <span className="truncate">{capitalize(item.title)}</span>
                                        )}
                                    </SidebarMenuButton>

                                    {!editingId && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuAction className="mt-[2px] rounded-[4px] hover:bg-transparent cursor-pointer" showOnHover>
                                                    <MoreHorizontal />
                                                    <span className="sr-only">More</span>
                                                </SidebarMenuAction>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-48 rounded-lg ml-2 bg-white"
                                                side={isMobile ? "bottom" : "right"}
                                                align={isMobile ? "end" : "start"}
                                            >
                                                <DropdownMenuItem className="group cursor-pointer " onClick={() => startRename(item.id, item.title)}>
                                                    <Pencil className="text-foreground mr-2 h-4 w-4 group-hover:text-accent-foreground" />
                                                    <span className="text-foreground group-hover:text-accent-foreground">Rename</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="group cursor-pointer" onClick={() => handleDeleteClick(item.id)}>
                                                    <Trash2 className="text-foreground mr-2 h-4 w-4 group-hover:text-accent-foreground" />
                                                    <span className="text-foreground group-hover:text-accent-foreground">Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </CollapsibleContent>
                </SidebarGroup>
            </Collapsible>

            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <DialogContent className="sm:max-w-[600px] p-6 !rounded-[8px] bg-white border-none shadow-xl gap-0">
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-[#eeeefc] flex items-center justify-center shrink-0">
                            <Trash2 className="w-6 h-6 text-primary stroke-2.5" />
                        </div>
                        <div className="flex-1 pt-1">
                            <DialogTitle className="text-[16px] font-bold text-gray-900 mb-1">Are you sure?</DialogTitle>
                            <p className="text-[14px] text-gray-500 leading-relaxed">Are you sure you want to delete this conversation?</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 w-full mt-6">
                        <Button
                            variant="ghost"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="text-[#6366f1] font-normal cursor-pointer hover:bg-transparent hover:font-medium"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            className=" bg-[hsl(245,96%,78%)] border border-primary hover:bg-[hsl(245,96%,78%)] text-white shadow-lg px-6 rounded-lg font-medium transition-all group "
                        >
                            <p className="group-hover:scale-105 cursor-pointer  duration-300 transition-all">Delete</p>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
