"use client";

import React, { useState } from "react";
import {
  Loader2,
  LogOut, MessageCirclePlus,
  PieChart,
  Settings
} from "lucide-react";

import {
  Sidebar,
  SidebarContent, SidebarHeader, SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavChatBot } from "@/Icons/global/home";
import { NavProjects } from "@/client/nav-projects";

import { cn } from "@/lib/utils";
import { BiCategory } from "react-icons/bi";
import { LuMessageCircleMore } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navdata = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: BiCategory,
      items: [
        {
          title: "Dashboard 1",
          url: "#",
        },
        {
          title: "Dashboard 2",
          url: "#",
        },
        {
          title: "Dashboard 3",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: LuMessageCircleMore,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: BsStars,
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
  ],
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

  return (
    <Sidebar
      collapsible="icon"
      className="absolute min-h-[80%] max-h-[calc(100vh-40px)] shadow-[0px_0px_10px_0px_hsla(212,72%,59%,0.25)] rounded-2xl"
      {...props}
    >
      <SidebarHeader
        className={cn(
          !open
            ? "flex flex-col-reverse  transition-all !duration-500 "
            : "grid grid-cols-[1fr_auto] w-full transition-all duration-0 pr-5  px-5 ",
          "rounded-2xl pt-5 cursor-pointer items-center gap-4 mb-1  "
        )}
      >
        <Link
          href={"/"}
          className="pl-1 flex gap-2 items-center transition-all duration-300"
        >
          <NavChatBot />
          {open && (
            <span className="bg-[linear-gradient(180deg,#7468FC_0%,#FF8FD9_100%)] bg-clip-text text-transparent font-semibold text-[23px] ">
              OpsBot
            </span>
          )}
        </Link>

        <SidebarTrigger className="cursor-pointer"></SidebarTrigger>
      </SidebarHeader>
      <SidebarContent
        className={cn(open ? "px-3" : "mx-auto !p-0", "rounded-2xl ")}
      >
        <div
          className={cn(
            open ? "" : "",
            "flex h-full flex-col overflow-hidden w-full justify-between pb-4 "
          )}
        >
          <div>
            <NavMain items={Navdata.navMain} />
            <NavProjects projects={Navdata.projects} />
          </div>
          <div className={cn(open ? "" : "pr-2", "w-full flex flex-col gap-2")}>
            <div
              onClick={() => setOpen(true)}
              className={cn(
                open ? "" : "ml-2 max-w-[40px]  ",
                " flex  items-center  rounded-[4px]  border-[1px] border-[hsla(245,96%,70%,1)] bg-[linear-gradient(91.96deg,rgba(116,104,252,0.7)_-16.64%,rgba(116,104,252,0.8)_117.28%)] hover:text-white hover:bg-sidebar-accent cursor-pointer w-full justify-start text-sm text-white font-medium p-2 pr-0  gap-2  shadow-[0px_2px_10px_0px_hsla(245,100%,90%,1)]"
              )}
            >
              <MessageCirclePlus className="max-w-5 max-h-5 " />
              <span
                className={cn(
                  " transition-all duration-300 whitespace-nowrap overflow-hidden",
                  open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 "
                )}
              >
                New Chat
              </span>
            </div>
            <div
              onClick={() => setOpen(true)}
              className={cn(
                open ? "" : "ml-2 max-w-[40px]",
                " flex  items-center rounded-[4px] hover:text-sidebar-accent-foreground hover:bg-sidebar-accent cursor-pointer w-full justify-start text-sm font-medium p-2 pr-0 gap-2 "
              )}
            >
              <Settings className={cn("max-w-5 max-h-5 pl-px")} />
              <span
                className={cn(
                  " transition-all duration-300 whitespace-nowrap overflow-hidden",
                  open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 "
                )}
              >
                Settings
              </span>
            </div>
            <div
              onClick={async () => {
                setLoading(true);
                const Cookies = (await import("js-cookie")).default;
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
                Cookies.remove("token");
                router.push("/login");

                window.location.href = "/login";
              }}
              className={cn(
                open ? "" : "ml-2  max-w-[40px]",
                " flex  items-center rounded-[4px] hover:text-sidebar-accent-foreground hover:bg-sidebar-accent cursor-pointer w-full justify-start text-sm font-medium p-2 pr-0 gap-2 "
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
                  open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 "
                )}
              >
                {loading ? "Logging out..." : "Logout"}
              </span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
