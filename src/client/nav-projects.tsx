// "use client";

// import {
//   Folder,
//   Forward,
//   MoreHorizontal,
//   Trash2,
//   type LucideIcon,
// } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import React from "react";

// export function NavProjects({
//   projects,
// }: {
//   projects: {
//     name: string;
//     url: string;
//     icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   }[];
// }) {
//   const { isMobile } = useSidebar();

//   return (
//     <SidebarGroup
//       className="
//     pt-0
//     transition-opacity duration-200
//     group-data-[collapsible=icon]:hidden
//     group-data-[collapsible=icon]:pointer-events-none
//   "
//     >
//       <SidebarGroupLabel className="text-sm text-sub-heading font-medium mb-1">
//         Projects
//       </SidebarGroupLabel>
//       <SidebarMenu>
//         {projects.map((item) => (
//           <SidebarMenuItem key={item.name}>
//             <DropdownMenu>
//               <DropdownMenuTrigger className="mt-1 rounded-[4px] w-full">
//                 <SidebarMenuButton className="w-full min-h-[44px]" asChild>
//                   <a
//                     href={item.url}
//                     className="py-[18px] flex  justify-between w-full font-medium text-foreground !rounded-[4px]"
//                   >
//                     <div className="flex w-full gap-2 items-center min-w-0">
//                       <item.icon className="w-5 h-5 shrink-0" />
//                       <span
//                         className="whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:translate-x-2 group-data-[collapsible=icon]:transition-none
//     group-data-[collapsible=icon]:w-0"
//                       >
//                         {item.name}
//                       </span>
//                     </div>

//                     <MoreHorizontal />
//                   </a>
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="w-48 rounded-lg ml-6 p-2 "
//                 side={isMobile ? "bottom" : "right"}
//                 align={isMobile ? "end" : "start"}
//               >
//                 <DropdownMenuItem className="group cursor-pointer">
//                   <Folder className="text-muted-foreground group-hover:text-accent-foreground " />
//                   <span>View Project</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="group cursor-pointer">
//                   <Forward className="text-muted-foreground group-hover:text-accent-foreground " />
//                   <span>Share Project</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="group cursor-pointer">
//                   <Trash2 className="text-muted-foreground group-hover:text-accent-foreground " />
//                   <span>Delete Project</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

"use client";

import React, { useState } from "react";
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
}) {
  const { open, isMobile } = useSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const visibleProjects = collapsed ? projects.slice(0, 3) : projects;

  return (
    <SidebarGroup
      className="
        pt-1
        group-data-[collapsible=icon]:hidden
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-1">
        <SidebarGroupLabel className="text-sm text-sub-heading font-medium">
          Projects
        </SidebarGroupLabel>

        {/* hide toggle when sidebar collapsed */}
        {open && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-transparent text-sub-heading cursor-pointer group transition-colors"
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 group-hover:text-sub-heading ${
                !collapsed ? "rotate-90" : "-rotate-90"
              }`}
            />
          </button>
        )}
      </div>

      {/* PROJECT LIST */}
      <div
        className={`
          overflow-hidden
          transition-[max-height]
          duration-300
          ease-in-out
          ${collapsed ? "" : "max-h-[220px] overflow-y-auto"}
        `}
      >
        <SidebarMenu className="gap-1">
          {visibleProjects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <DropdownMenu>
                <DropdownMenuTrigger className="mt-1 rounded-[4px]  w-full">
                  <SidebarMenuButton
                    className="w-full hover:bg-transparent "
                    asChild
                  >
                    <a
                      href={item.url}
                      className=" flex justify-between w-full  font-medium text-foreground"
                    >
                      <div className="flex w-full gap-2 items-center min-w-0 ">
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.name}
                        </span>
                      </div>

                      <MoreHorizontal />
                    </a>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-48 rounded-lg ml-6 p-2"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder />
                    <span>View Project</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Forward />
                    <span>Share Project</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Trash2 />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </SidebarGroup>
  );
}
