"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
} from "@/components/ui/sheet";
import MenuIcon, {
  AdminIon,
  ChartBarIcon,
  DocumentIcon,
  GierIcon,
  GlobalIcon,
  GridIcons,
  HandIcon,
  LayoutGridIcon,
  PackageApprovedIcon,
  SettingsIcon,
  Search,
  Teams,
  Heart,
  Project,
  UserIcon,
  NavTrigger,
  NavItem,
} from "./icons/dynamic-form/all-dynamic-form-icons";
import Image from "next/image";
import { SearchCommand } from "./search-command";
import { useRouter } from "next/navigation";
import OverflowSpan from "./overflow-span";

const iconMap: Record<string, React.FC<any>> = {
  MenuIcon,
  LayoutGridIcon,
  UserIcon,
  ChartBarIcon,
  GridIcons,
  DocumentIcon,
  PackageApprovedIcon,
  GierIcon,
  Heart,
  Project,
  SettingsIcon,
  Search,
  Teams,
  HandIcon,
  AdminIon,
  GlobalIcon,
  NavItem,
};

type NavItem = {
  id: any;
  title: string;
  icon?: string;
  isActive?: boolean;
  url?: string;
  items?: NavItem[];
};

export default function AppSidebar({
  items,
  navSettings,
  toggle,
  isMobile,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  navSettings: any;
  toggle: any;
  isMobile: boolean;
  items: NavItem[];
}) {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetItem, setSheetItem] = useState<NavItem | null>(null);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState<boolean>(false);
  const [openParentPath, setOpenParentPath] = useState<string | null>(null);

  const { toggleSidebar } = useSidebar();
  function openSheetForItem(item: NavItem) {
    if (item.title === "Search") {
      setIsSearchDialogOpen(true);
    } else {
      setSheetItem(item);
      setIsSearchDialogOpen(false);
      setIsSheetOpen(true);
    }
  }

  function handleSheetCollapse() {
    if (
      navSettings.secondaryNav &&
      (currentActivePath[0] == "Projects" ||
        currentActivePath[0] == "Work Space") &&
      !isMobile
    ) {
      setIsSheetOpen(true);
    }
  }

  const isPathActive = (path: string[]) => {
    return (
      activePath.length + 1 >= path.length &&
      path.every((value, i) => activePath[i] === value)
    );
  };

  const handleSelect = (path: string[]) => {
    setActivePath(path);
  };

  function isPathOrDescendantActive(
    itemPath: string[],
    activePath: string[],
  ): boolean {
    if (activePath.length < itemPath.length) return false;
    for (let i = 0; i < itemPath.length; i++) {
      if (itemPath[i] !== activePath[i]) return false;
    }
    return true;
  }

  const [currentActivePath, setCurrentActivePath] = React.useState<string[]>(
    [],
  );

  function renderSheetSidebar(
    items: NavItem[],
    level = 0,
    currentPath: string[] = [],
  ): React.ReactNode {
    return (
      <ul className={`flex flex-col gap-y-[2px]  `}>
        {items.map((item, index) => {
          const hasChildren = item.items && item.items.length > 0;
          const newPath = [...currentPath, item.title];
          const isActive = isPathActive(newPath);
          const IconComp = item.icon ? iconMap[item.icon] : null;

          if (hasChildren) {
            return (
              <Collapsible key={item.title} defaultOpen={item.isActive}>
                <CollapsibleTrigger asChild>
                  <div
                    id={item.title}
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                    className={` flex items-center   p-1 rounded  truncate cursor-pointer group ${true ? "opacity-0 animate-slideFadeIn transition-all ease-in-out" : ""}  ${
                      isActive
                        ? "text-primary font-semibold hover:bg-transparent"
                        : "hover:text-primary hover:bg-transparent "
                    }`}
                    onClick={() => handleSelect(newPath)}
                  >
                    {IconComp && <IconComp width={18} height={18} />}
                    <OverflowSpan
                      level={level}
                      text={item.title}
                      isActive={isActive}
                      style={
                        {
                          animationDelay: `${index * 150}ms`,
                        } as React.CSSProperties
                      }
                      isSheetOpen={isSheetOpen}
                      navSettings={navSettings}
                      className={`!mt-0 mb-[1px] ${
                        hasChildren
                          ? "hover:text-primary hover:font-medium"
                          : "hover:pl-2 group-hover:pl-2 group-hover:font-medium transition-all duration-700"
                      } ${isActive ? "font-semibold" : ""}
                      text-[var(--text-color)] truncate group-hover:text-primary group-hover:font-medium hover:text-primary hover:font-medium hover:bg-transparent ${true ? "opacity-0 animate-slideFadeIn transition-all ease-in-out" : ""}`}
                    />
                    <div className="ml-auto">
                      <ChevronRight
                        className={`ml-auto  w-[14px] h-4 transition-all duration-500  group-hover:text-primary group-hover:font-medium   group-data-[state=open]:-rotate-90  group-data-[state=closed]:rotate-90 ${isActive ? "text-[hsl(var(--primary))] " : "text-icon"}`}
                      />
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="overflow-hidden pl-[10px]  transition-all duration-500 ease-in-out data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  {renderSheetSidebar(item.items!, level + 1, newPath)}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <li
              key={item.title}
              onClick={() => {
                isPathActive(newPath);
                handleSelect(newPath);
                if (item.url) {
                  router.push(`${item.url}`);
                  setTimeout(() => {
                    setIsSheetOpen(false);
                  }, 100);
                }
                if (hasChildren) {
                  handleSelect(newPath);
                  openSheetForItem(item);
                }
              }}
              style={{
                animationDelay: `${index + 150}ms`,
              }}
              className={`flex items-center truncate gap-2 p-1 rounded ${true ? "opacity-0 animate-slideFadeIn  transition-all ease-in-out" : ""} cursor-pointer group ${
                isActive
                  ? "text-primary font-medium hover:bg-transparent"
                  : "hover:text-primary hover:font-medium  hover:bg-transparent"
              }`}
            >
              {IconComp && <IconComp width={18} height={18} />}
              <OverflowSpan
                level={level}
                text={item.title}
                isActive={isActive}
                style={
                  {
                    animationDelay: `${index * 80}ms`,
                  } as React.CSSProperties
                }
                isSheetOpen={isSheetOpen}
                navSettings={navSettings}
                className={`!mt-0 mb-[1px] ${
                  !hasChildren && level === 0
                    ? "hover:text-primary hover:font-medium"
                    : "hover:pl-2 group-hover:pl-2 group-hover:font-medium transition-all duration-700"
                } ${isActive ? "font-semibold" : ""}
                text-[var(--text-color)] !mt-0 mb-[1px]  hover:text-primary group-hover:text-primary ${true ? "opacity-0 animate-slideFadeIn transition-all ease-in-out" : ""}  ${!hasChildren && level == 0 ? "hover:text-primary hover:font-medium" : "hover:pl-2 group-hover:pl-2 group-hover:font-medium  transition-all duration-700"} ${isActive ? "font-semibold" : ""}
                `}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  function renderNavItems(
    items: NavItem[],
    navSettings: any,
    level = 0,
    currentPath: string[] = [],
  ): React.ReactNode {
    return items.map((item) => {
      const IconComp = item.icon ? iconMap[item.icon] : undefined;
      const hasChildren = item.items && item.items.length > 0;
      const newPath = [...currentPath, item.title];
      const isActive = isPathOrDescendantActive(newPath, currentActivePath);
      const iconColor = isActive ? "hsl(var(--primary))" : "hsl(var(--icon))";

      if (level === 0 && hasChildren && navSettings.isNavOpen) {
        return (
          <SidebarMenuItem key={`${item.title}-${level}`} className="w-full">
            <SidebarMenuButton
              tooltip={navSettings.tooltip ? item.title : ""}
              className={`flex gap-[8px] items-center min-w-full  cursor-pointer  group ${
                isActive
                  ? " text-primary font-semibold hover:bg-transparent "
                  : "hover:text-primary  hover:font-medium hover:bg-transparent"
              }`}
              onClick={() => {
                openSheetForItem(item);
                handleSelect(newPath);
                setCurrentActivePath(newPath);
                if (item.title == "Work Space" || item.title == "Projects") {
                  setIsSheetOpen(false);
                  setTimeout(() => {
                    setIsSheetOpen(true);
                  }, 100);
                } else {
                  setIsSheetOpen(false);
                }
              }}
            >
              {IconComp &&
                React.createElement(IconComp, {
                  color: iconColor,
                })}
              <span
                style={
                  {
                    "--text-color": isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--foreground))",
                    "--fw": isActive ? "semibold " : navSettings.textWeight,
                    fontSize: navSettings.textSize,
                    whiteSpace: navSettings.isNavOpen ? "nowrap" : "normal",
                    textOverflow: navSettings.isNavOpen ? "clip" : "ellipsis",
                  } as React.CSSProperties
                }
                className={
                  "text-[var(--text-color)]    hover:font-medium hover:bg-transparent group-hover/menu-item:text-primary group-hover/menu-item:font-medium hover:text-primary "
                }
              >
                {item.title}
              </span>
              <ChevronRight
                className={` ${isSheetOpen ? " opacity-100 " : " opacity-0"} ml-auto opacity-0 !hover:opacity-100 group-hover/menu-item:opacity-100  group-hover:opacity-100  transition-all duration-500 !w-[14px]  group-hover/menu-item:!text-primary !hover:text-primary !h-4 ${isActive ? "!text-[hsl(var(--primary))]" : "!text-icon"}`}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }

      return (
        <Collapsible
          key={`${item.title}-${level}`}
          asChild
          className="group/collapsible group w-full"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={navSettings.tooltip ? item.title : ""}
                className={`flex gap-[8px] items-center min-w-full  cursor-pointer ${
                  isActive
                    ? " text-primary font-semibold hover:bg-transparent "
                    : "hover:text-primary  hover:font-medium hover:bg-transparent"
                }`}
                onClick={() => {
                  handleSelect(newPath);
                  setCurrentActivePath(newPath);

                  if (hasChildren || item.title === "Search") {
                    openSheetForItem(item);
                  }
                  if (item.title == "Work Space" || item.title == "Projects") {
                    setIsSheetOpen(false);
                    setTimeout(() => {
                      setIsSheetOpen(true);
                    }, 100);
                  } else {
                    setIsSheetOpen(false);
                  }
                }}
              >
                {IconComp &&
                  React.createElement(IconComp, {
                    color: iconColor,
                  })}
                <span
                  style={
                    {
                      "--text-color": isActive
                        ? "hsl(var(--primary))"
                        : "hsl(var(--foreground))",
                      "--fw": isActive ? "medium " : navSettings.textWeight,
                      fontSize: navSettings.textSize,
                      whiteSpace: navSettings.isNavOpen ? "nowrap" : "normal",
                      textOverflow: navSettings.isNavOpen ? "clip" : "ellipsis",
                    } as React.CSSProperties
                  }
                  className={` ${navSettings.isNavOpen ? "sm:opacity-100  " : " opacity-100 sm:opacity-0 "}  text-[var(--text-color)] hover:bg-transparent  group-hover/menu-item:text-primary `}
                >
                  {item.title}
                </span>
              </SidebarMenuButton>
            </CollapsibleTrigger>

            {hasChildren && (
              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp ">
                <SidebarMenuSub className="">
                  {renderSheetSidebar(item.items!, level + 1, newPath)}
                </SidebarMenuSub>
              </CollapsibleContent>
            )}
          </SidebarMenuItem>
        </Collapsible>
      );
    });
  }

  function renderNavItemsSidebar(
    items: NavItem[],
    navSettings: any,
    level = 0,
    currentPath: string[] = [],
  ): React.ReactNode {
    return items.map((item, index) => {
      const IconComp = item.icon ? iconMap[item.icon] : undefined;
      const hasChildren = item.items && item.items.length > 0;
      const newPath = [...currentPath, item.title];
      const isActive = isPathOrDescendantActive(newPath, currentActivePath);
      const iconColor = isActive ? "hsl(var(--primary))" : "hsl(var(--icon))";
      const currentPathStr = newPath.join(">");
      const isTopLevel = level === 0;
      const isOpen = isTopLevel ? openParentPath === currentPathStr : undefined;

      return (
        <Collapsible
          key={`${item.title}-${level}`}
          asChild
          open={isOpen}
          onOpenChange={(open) => {
            if (isTopLevel) {
              if (open) {
                setOpenParentPath(currentPathStr);
              } else if (openParentPath === currentPathStr) {
                setOpenParentPath(null);
              }
            }
          }}
          className={`group/collapsible w-full   overflow-hidden [&[data-state=open]>button>svg:nth-child(2)]:-rotate-90 [&[data-state=closed]>button>svg:nth-child(2)]:rotate-90 h-auto  data-[state=open]:transition-all transition-opacity duration-1000 delay-${index * 500}`}
        >
          {/* Prarent Container */}
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                style={{
                  animationDelay: `${level == 1 ? index * 50 : index * 100}ms`,
                }}
                tooltip={navSettings.tooltip ? item.title : ""}
                className={`group/item flex relative gap-[8px] items-center min-w-full hover:text-primary  cursor-pointer  ${level > 0 ? "opacity-0 animate-slideFadeIn transition-all ease-in-out " : ""} group ${
                  isActive
                    ? " text-primary font-semibold hover:bg-transparent group-hover/menu-item:!text-primary  "
                    : "hover:text-primary  hover:font-medium hover:bg-transparent"
                }`}
                onClick={() => {
                  if (item.title === "Search") {
                    openSheetForItem(item);
                    if (isMobile) {
                      toggleSidebar();
                    }
                  }
                  if (hasChildren && !navSettings.isNavOpen) {
                    toggle();
                  }
                  handleSelect(newPath);
                  setCurrentActivePath(newPath);
                  if (item.url) {
                    router.push(`${item.url}`);
                    setTimeout(() => {
                      setIsSheetOpen(false);
                    }, 100);
                  }
                }}
              >
                {IconComp &&
                  React.createElement(IconComp, {
                    color: iconColor,
                  })}

                <OverflowSpan
                  level={level}
                  text={item.title}
                  isActive={isActive}
                  navSettings={navSettings}
                  className={
                    ` ${navSettings.isNavOpen ? "sm:opacity-100" : "opacity-100 sm:opacity-0"} ` +
                    `${
                      (!hasChildren && level === 2) ||
                      (!hasChildren && level >= 3)
                        ? "text-sm w-full mx-auto hover:pl-2 transition-all duration-500"
                        : "w-full mx-auto"
                    } hover:text-primary  `
                  }
                />

                {hasChildren && (
                  <ChevronRight
                    className={` ${level == 0 ? "right-[-1px]" : level == 1 ? "right-[-1px] " : level == 2 ? "right-[0.5px] " : level == 3 ? "right-[1px]" : level == 4 ? "right-[2px]" : level > 5 ? "right-[2px]" : "right-[3px]"} absolute ${navSettings.isNavOpen ? "!hover:opacity-100 " : "!opacity-0"}  ${level == 0 ? "!hover:opacity-100 opacity-0 " : "opacity-100"}  ${isActive ? "group-data-[state=closed]:opacity-100 " : ""} group-data-[state=open]:opacity-100 ml-auto group-hover/menu-item:opacity-100  group-hover:opacity-100  transition-transform group-data-[state=open]:-rotate-90 group-hover/item:opacity-100
          group-hover/item:!text-primary   group-data-[state=closed]:rotate-90   duration-500 !w-[14px]  hover:!text-primary !h-4 ${isActive ? "!text-[hsl(var(--primary))]" : "!text-icon"} mx-auto ${isMobile ? "opacity-100 " : ""}`}
                  />
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>

            {hasChildren && (
              <CollapsibleContent className="transition-all  duration-500 ease-in-out data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <SidebarMenuSub
                  className={`${level == 0 && hasChildren ? "!ml-[15px] !pl-2 " : "!ml-[5px]"} m-0 gap-0 pl-1  !pr-0 scroll-snap-start `}
                >
                  {renderNavItemsSidebar(
                    item.items!,
                    navSettings,
                    level + 1,
                    newPath,
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            )}
          </SidebarMenuItem>
        </Collapsible>
      );
    });
  }

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="relative  "
        style={{
          width: navSettings.isNavOpen
            ? navSettings.width[1]
            : navSettings.width[0],
          pointerEvents: "all",
        }}
        {...props}
      >
        <SidebarHeader
          className={`flex flex-row min-w-full justify-center items-center gap-0 h-[56px] mb-[18px]  pt-5 pl-3 pr-3 transition-all duration-500`}
        >
          {navSettings.isNavOpen && navSettings.header.image && (
            <Image
              src={navSettings.header.image}
              alt="Sidebar Logo"
              width={navSettings.header.width[1]}
              height={navSettings.header.width[0]}
            />
          )}
          {navSettings.isNavOpen &&
            navSettings.header.icons &&
            navSettings.header.icons.map((iconKey: string, index: number) =>
              iconMap[iconKey] ? (
                <span
                  key={index}
                  className="hover:text-primary pl-[22px] pr-[6px] hover:bg-transparent  transition-colors"
                >
                  {React.createElement(iconMap[iconKey])}
                </span>
              ) : null,
            )}
          <SidebarTrigger className="hover:bg-transparent group/header">
            <span
              className={`transform hover:bg-transparent ${
                navSettings.isNavOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <NavTrigger />
            </span>
          </SidebarTrigger>
        </SidebarHeader>

        <SidebarGroup className="pl-5 pr-0 lg:pl-4 xl:pl-3 2xl:pl-[10px] h-full ">
          <div
            className=" max-h-[91%] !w-full navbar-scroll scroll-snap-y-mandatory "
            style={{ scrollbarGutter: "stable" }}
          >
            <SidebarMenu
              className={`flex flex-col  gap-y-[13px] pr-2 items-center transition-all ease-in duration-300  ${navSettings.isNavOpen ? "" : "ml-1 xl:ml-[6px] 2xl:ml-2 pr-[31px]"}`}
            >
              {navSettings.secondaryNav
                ? renderNavItems(items, navSettings)
                : renderNavItemsSidebar(items, navSettings)}
            </SidebarMenu>
          </div>
        </SidebarGroup>
      </Sidebar>

      <Sheet
        open={isSheetOpen}
        onOpenChange={() => {
          handleSheetCollapse();
        }}
      >
        <SheetOverlay
          onClick={() => {
            handleSelect([]);
            setCurrentActivePath([]);

            setIsSheetOpen(false);
          }}
        >
          <SheetContent
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            side="left"
            className={`w-[260px] h-full  absolute  !z-20 s  ${navSettings.isNavOpen ? "transition-all left-[225px]" : " transition-[width] left-[61px]"}  bg-background border-r pl-2 pr-1  pt-4 shadow-sheetShadow`}
          >
            <div className="flex flex-col h-full">
              <SheetHeader>
                <SheetTitle
                  style={
                    {
                      "--text-color": "hsl(var(--foreground))",
                      "--fw": navSettings.textWeight,
                      animationDelay: `${1 * 200}ms`,
                    } as React.CSSProperties
                  }
                  className={`text-icon mb-[2px] pl-[6px] text-[18px] ${true ? "opacity-0 animate-slideFadeIn transition-all ease-in-out" : ""}`}
                >
                  {sheetItem?.title}
                </SheetTitle>
              </SheetHeader>
              <div className="w-full mt-4 h-full">
                <div className="h-[99%]  pr-[3px] mt-0  overflow-hidden sheet-scroll scroll-snap-y-mandatory ">
                  <div className=" p-1 pt-0 scroll-snap-start">
                    {sheetItem?.items && renderSheetSidebar(sheetItem.items)}
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </SheetOverlay>
      </Sheet>

      <SearchCommand
        open={isSearchDialogOpen}
        onOpenChange={setIsSearchDialogOpen}
        navItems={items}
        navSettings={navSettings}
      />
    </>
  );
}
