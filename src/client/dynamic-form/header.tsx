import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import {
  NavTrigger,
  NotificationIcon,
} from "./icons/dynamic-form/all-dynamic-form-icons";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useLayout } from "@/context/layout-context";

interface HeaderProps {
  toggleMobileNav: () => void;
}
const Header = ({ toggleMobileNav }: HeaderProps) => {
  const { formData } = useLayout();
  return (
    <>
      <div className="flex justify-between items-center pr-[10px]">
        <div className="flex items-center gap-1 sm:gap-2 md:gap-[4px]">
          <SidebarTrigger
            onClick={toggleMobileNav}
            className="hover:bg-transparent group/header md:hidden pl-6"
          >
            <span className={`transform hover:bg-transparent `}>
              <NavTrigger />
            </span>
          </SidebarTrigger>
          <div className="md:ml-[0px] 3xl:ml-[1px] font-normal text-sm text-foreground">
            <Breadcrumb>
              <BreadcrumbList className="flex flex-wrap items-center !gap-1">
                {Array.isArray(formData.form.breadcrumbs) &&
                  formData.form.breadcrumbs.map((item, index) => {
                    const isLast =
                      index === formData.form.breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={item.label + index}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage className="font-medium text-sm text-primary">
                              {item.label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={item.url}
                              className="font-normal text-sm text-foreground "
                            >
                              {item.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && (
                          <div>
                            <ChevronRight className="w-4 sm:w-[15px] text-[#979797]" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="flex gap-[15px] sm:gap-[29px] items-center justify-center ">
          <div className="relative pt-2">
            <span className="absolute top-1 -right-1  w-4 h-4 text-center text-xs bg-primary text-primary-foreground rounded-full">
              <span className="absolute left-[1px] top-[1px]  inline-flex h-[90%] w-[90%] animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="absolute left-0  w-4 h-4 text-center text-xs bg-primary text-primary-foreground rounded-full">
                3
              </span>
            </span>
            <NotificationIcon />
          </div>
          <Avatar className="w-[30px] h-[30px] my-auto sm:mr-[15px]">
            <AvatarImage src="image.png" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Header;
