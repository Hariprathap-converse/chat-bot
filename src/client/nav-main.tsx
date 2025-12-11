"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { open, setOpen } = useSidebar();
  return (
    <SidebarGroup className="">
      {/* <SidebarGroupLabel className="font-medium text-sub-heading">Platform</SidebarGroupLabel> */}
      <SidebarMenu className={cn(open ? "" : " gap-2 ")}>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible w-full "
          >
            <SidebarMenuItem className={cn(open ? "" : "ml-[2px] max-w-[40px]")}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  onClick={() => {
                    setOpen(true);
                  }}
                  tooltip={item.title}
                  className="cursor-pointer mx-auto py-[18px]  min-w-full "
                >
                  {item.icon && (
                    <item.icon className={cn(open ? "" : "ml-[2px]", "min-w-5 min-h-5  group-hover/collapsible:text-sidebar-accent-foreground  font-medium text-foreground shrink-0")} />
                  )}
                  <span
                    className={cn(
                      open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 ",
                      "font-medium text-foreground group-hover/collapsible:text-sidebar-accent-foreground  transition-all duration-300 whitespace-nowrap overflow-hidden "
                    )}
                  >
                    {item.title}
                  </span>
                  <ChevronRight
                    className={cn(
                      open ? "opacity-100 max-w-xs " : "opacity-0 max-w-0 ",
                      "ml-auto max-h-[15px] max-w-[15px] transition-transform group-hover/collapsible:text-sidebar-accent-foreground  duration-200 font-medium text-foreground group-data-[state=open]/collapsible:rotate-90"
                    )}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="transition-all duration-1000">
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a
                          href={subItem.url}
                          className="py-4 font-medium text-foreground"
                        >
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
