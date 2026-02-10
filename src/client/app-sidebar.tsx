"use client";

import React, { useEffect, useState } from "react";
import {
  Loader2,
  LogOut,
  MessageCirclePlus,
  PieChart,
  Settings,
  Sheet,
  TableOfContents,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavChatBot } from "@/Icons/global/home";
import { NavProjects } from "@/client/nav-projects";
import { NavHistory } from "@/client/nav-history";
import { NavBookmarks } from "@/client/nav-bookmarks";
import { useChat } from "@/context/chat-context";

import { cn } from "@/lib/utils";
import { BiCategory } from "react-icons/bi";
import { LuMessageCircleMore } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SettingsPopup } from "./settings-popup";
import { NavTrigger } from "./dynamic-form/icons/dynamic-form/all-dynamic-form-icons";

const Navdata = {
  // navMain: [
  //   {
  //     title: "Documentation",
  //     url: "#",
  //     icon: LuMessageCircleMore,
  //     items: [
  //       {
  //         title: "Introduction",
  //         url: "#",
  //       },
  //       {
  //         title: "Get Started",
  //         url: "#",
  //       },
  //       {
  //         title: "Tutorials",
  //         url: "#",
  //       },
  //       {
  //         title: "Changelog",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: BsStars,
  //     items: [
  //       {
  //         title: "General",
  //         url: "#",
  //       },
  //       {
  //         title: "Team",
  //         url: "#",
  //       },
  //       {
  //         title: "Billing",
  //         url: "#",
  //       },
  //       {
  //         title: "Limits",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: MdOutlineWbIncandescent,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
  footer: [
    {
      title: "New Chat",
      url: "#",
      icon: MessageCirclePlus,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },

    {
      title: "Layout",

      url: "#",
      icon: LogOut,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, setOpen } = useSidebar();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { createNewChat } = useChat();

  const [showTrigger, setShowTrigger] = useState(false);

  useEffect(() => {
    let timer: any;

    if (open) {
      timer = setTimeout(() => {
        setShowTrigger(true);
      }, 0);
    } else {
      setShowTrigger(false);
    }

    return () => clearTimeout(timer);
  }, [open]);
  return (
    <Sidebar
      collapsible="icon"
      className="absolute min-h-[80%]  max-h-[calc(100vh-40px)] shadow-lg rounded-2xl"
      {...props}
    >
      <SidebarHeader
        className={cn(
          !open
            ? "flex flex-col-reverse  transition-all duration-500! "
            : "grid grid-cols-[1fr_auto] w-full transition-all duration-0 pr-5  px-5 ",
          "rounded-2xl pt-5 cursor-pointer items-center gap-4 mb-1  ",
        )}
      >
        <Link
          href={"/"}
          className="pl-1 flex gap-2 items-center transition-all duration-1000"
        >
          <NavChatBot />
          {open && (
            <span className="bg-[linear-gradient(180deg,#7468FC_0%,#FF8FD9_100%)] bg-clip-text text-transparent font-semibold text-[23px] ">
              OpsBot
            </span>
          )}
        </Link>

        {!open && (
          <SidebarTrigger
            className={cn(
              "transform hover:bg-transparent duration-500 cursor-pointer group/header",
              open ? "rotate-180" : "rotate-0",
            )}
          ></SidebarTrigger>
        )}

        {open && (
          <SidebarTrigger
            className={cn(
              "transform hover:bg-transparent duration-500  cursor-pointer group/header transition-opacity",
              open ? "rotate-180" : "rotate-0",
              showTrigger ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </SidebarHeader>
      <SidebarContent
        className={cn(open ? "px-3" : "mx-auto !p-0", "rounded-2xl ")}
      >
        <div
          className={cn(
            open ? "" : "",
            "flex h-full flex-col overflow-hidden w-full justify-between pb-4 ",
          )}
        >
          <div className="flex flex-col gap-1">
            <div>
              <div
                onClick={() => {
                  router.push("/");
                  setOpen(false);
                }}
                className={cn(
                  open ? "ml-px" : "ml-2 max-w-[40px]",
                  " flex  items-center rounded-[4px] hover:text-sidebar-accent-foreground hover:bg-transparent cursor-pointer w-full justify-start text-sm font-medium p-2 pr-0 gap-2 ",
                )}
              >
                <BiCategory className={cn("w-5 h-5 pl-px")} />
                <span
                  className={cn(
                    " transition-all duration-300 whitespace-nowrap overflow-hidden",
                    open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 ",
                  )}
                >
                  Dashboard
                </span>
              </div>
              {/* <NavMain items={Navdata.navMain} /> */}
              <div
                onClick={() => {
                  router.push("/data-grid");
                  setOpen(false);
                }}
                className={cn(
                  open ? "ml-px" : "ml-2 max-w-[40px]",
                  " flex  items-center rounded-[4px] hover:text-sidebar-accent-foreground hover:bg-transparent cursor-pointer w-full justify-start text-sm font-medium p-2 pr-0 gap-2 ",
                )}
              >
                <TableOfContents className={cn("max-w-5 max-h-5 pl-px")} />
                <span
                  className={cn(
                    " transition-all duration-300 whitespace-nowrap overflow-hidden",
                    open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 ",
                  )}
                >
                  Data Grid
                </span>
              </div>
            </div>
            <NavBookmarks />
            <NavProjects projects={Navdata.projects} />
            <NavHistory />
          </div>
          <div className={cn(open ? "" : "pr-2", "w-full flex flex-col gap-2")}>
            <div
              onClick={() => {
                createNewChat();
                router.push("/chat");
                setOpen(false);
              }}
              className={cn(
                open ? "" : "ml-2 max-w-[40px]  ",
                " flex  items-center  rounded-[4px]  border-[1px] border-[hsla(245,96%,70%,1)] bg-[linear-gradient(91.96deg,rgba(116,104,252,0.7)_-16.64%,rgba(116,104,252,0.8)_117.28%)] hover:text-white hover:bg-sidebar-accent cursor-pointer w-full justify-start text-sm text-white font-medium p-2 pr-0  gap-2  shadow-sm",
              )}
            >
              <MessageCirclePlus className="max-w-5 max-h-5 " />
              <span
                className={cn(
                  " transition-all duration-300 whitespace-nowrap overflow-hidden",
                  open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 ",
                )}
              >
                New Chat
              </span>
            </div>
            <div
              onClick={() => setSettingsOpen(true)}
              className={cn(
                open ? "" : "ml-2 max-w-[40px]",
                " flex  items-center rounded-[4px] hover:text-sidebar-accent-foreground hover:bg-sidebar-accent cursor-pointer w-full justify-start text-sm font-medium p-2 pr-0 gap-2 ",
              )}
            >
              <Settings className={cn("max-w-5 max-h-5 pl-px")} />
              <span
                className={cn(
                  " transition-all duration-300 whitespace-nowrap overflow-hidden",
                  open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 ",
                )}
              >
                Settings
              </span>
            </div>

            <div
              onClick={async () => {
                setLoading(true);
                const Cookies = (await import("js-cookie")).default;
                // localStorage.removeItem("token");
                // localStorage.removeItem("refresh_token");
                Cookies.remove("token");
                Cookies.remove("refresh_token");
                router.push("/login");

                window.location.href = "/login";
              }}
              className={cn(
                open ? "" : "ml-2  max-w-[40px]",
                " flex  items-center rounded-[4px] hover:text-sidebar-accent-foreground hover:bg-sidebar-accent cursor-pointer w-full justify-start text-sm font-medium p-2 pr-0 gap-2 ",
              )}
            >
              {loading ? (
                <Loader2
                  className={cn("animate-spin max-w-5 max-h-5 ml-[3px] ")}
                />
              ) : (
                <LogOut className={cn("max-w-5 max-h-5 ml-[3px]")} />
              )}
              <span
                className={cn(
                  " transition-all duration-300 whitespace-nowrap overflow-hidden",
                  open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 ",
                )}
              >
                {loading ? "Logging out..." : "Logout"}
              </span>
            </div>
          </div>
        </div>
      </SidebarContent>
      <SettingsPopup open={settingsOpen} onOpenChange={setSettingsOpen} />
    </Sidebar>
  );
}
