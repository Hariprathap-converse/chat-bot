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
import { useChat } from "@/context/chat-context";
import {
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash2,
  Sheet,
  BookMarked,
  Bookmark,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavBookmarks() {
  const {
    conversations,
    selectConversation,
    activeConversationId,
    deleteConversation,
    updateConversationTitle,
    toggleBookmark,
  } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, setOpen } = useSidebar();
  const router = useRouter();

  const bookmarkedConversations = conversations.filter((c) => c.isBookmarked);

  // Renaming state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const handleChatSelect = (id: string) => {
    selectConversation(id);
    setOpen(false);
  };

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
    if (e.key === "Enter") {
      saveRename();
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="group/collapsible p-0 "
      >
        <SidebarGroup className="group-data-[collapsible=icon]:hidden pt-0 pb-0 pr-1 ">
          <SidebarGroupLabel
            asChild
            className="text-sm text-sub-heading font-medium mb-0 cursor-pointer w-full flex items-center justify-between"
          >
            <CollapsibleTrigger className="rounded-[6px]! focus-visible:ring-0">
              Bookmarks
              <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:-rotate-90 rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent className=" overflow-y-auto pr-1">
            {bookmarkedConversations.length === 0 ? (
              <div className="px-5 py-2 text-sm text-muted-foreground ">
                No bookmarks yet
              </div>
            ) : (
              <SidebarMenu className="gap-[4px] hover:bg-transparent pl-2 h-fit cursor-pointer">
                {bookmarkedConversations.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => {
                        handleChatSelect(item.id);
                        router.push("/chat");
                      }}
                      isActive={activeConversationId === item.id}
                      className="w-full rounded-[4px] hover:bg-transparent  data-[active=true]:bg-transparent hover:font-medium cursor-pointer "
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
                        <span className="truncate">
                          {capitalize(item.title)}
                        </span>
                      )}
                    </SidebarMenuButton>

                    {!editingId && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction
                            className="mt-[2px] rounded-[4px] hover:bg-transparent cursor-pointer"
                            showOnHover
                          >
                            <MoreHorizontal />
                            <span className="sr-only">More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 rounded-lg ml-2 bg-white"
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem
                            className="group cursor-pointer gap-0 "
                            onClick={() => startRename(item.id, item.title)}
                          >
                            <Pencil className="text-foreground mr-2 h-4 w-4 group-hover:text-accent-foreground" />
                            <span className="text-foreground group-hover:text-accent-foreground">
                              Rename
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="group cursor-pointer gap-0"
                            onClick={() => toggleBookmark(item.id)}
                          >
                            <Bookmark
                              className={cn(
                                item.isBookmarked
                                  ? "fill-primary stroke-primary"
                                  : "text-foreground ",
                                "mr-2 h-4 w-4 group-hover:text-accent-foreground",
                              )}
                            />
                            <span className="text-foreground group-hover:text-accent-foreground">
                              {item.isBookmarked ? "Unbookmark" : "Bookmark"}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="group cursor-pointer gap-0"
                            onClick={() => deleteConversation(item.id)}
                          >
                            <Trash2 className="text-foreground mr-2 h-4 w-4 group-hover:text-accent-foreground" />
                            <span className="text-foreground group-hover:text-accent-foreground">
                              Delete
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </>
  );
}
