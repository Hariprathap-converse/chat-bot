"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavChatBot } from "@/Icons/global/home";
import { History, LogOut, MessageCircleMore, User } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
interface AccountData {
  id: string;
  name: string;
  email: string;
  profileImage: null | string;
  isVendor: boolean;
  address: never[];
}
const Profile = () => {
  const displayUser: AccountData = {
    id: "",
    name: "CDS Admin",
    email: "admin@email.com",
    profileImage: "/profile.jpg",
    isVendor: false,
    address: [],
  };
  const [loading, setLoading] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer flex-row-reverse items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/50 transition">
          <Avatar className="h-10 w-10 drop-shadow p-[1px] bg-muted rounded-full">
            {displayUser.profileImage ? (
              <AvatarImage
                className="rounded-full"
                src={displayUser.profileImage}
                alt={displayUser.name}
              />
            ) : (
              <AvatarFallback
                className="    bg-gradient-to-r from-violet-600 to-violet-500 
               hover:from-violet-700 hover:to-violet-600 
               text-white shadow-sm hover:shadow-md 
               transition-all duration-200"
              >
                <User className="h-5 w-5" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-60  p-0 z-[999]" align="end">
        <div className="flex items-center gap-3 p-2 rounded-t-md">
          <div className="flex items-center p-2 gap-3 w-full rounded-[4px]">
            <Avatar className="h-10 w-10 drop-shadow p-[1px] bg-muted rounded-full">
              {displayUser.profileImage ? (
                <AvatarImage
                  className="rounded-full"
                  src={displayUser.profileImage}
                  alt={displayUser.name}
                />
              ) : (
                <AvatarFallback className="bg-accent text-white">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex flex-col">
              <span className="font-medium text-sm">
                {loading ? "Loading..." : displayUser.name}
              </span>
              <span className="text-xs font-medium capitalize text-gray-400">
                {displayUser.email}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-dashed" />

        <ul className="space-y-0.5 py-2 list-none">
          <li className="cursor-pointer border-dashed border-gray-200 px-2  last:border-t last:pt-2">
            <Link
              onClick={() => {
                setLoading(true);
              }}
              className="group flex items-center  font-medium gap-2 rounded-md py-2 px-3 text-sm capitalize transition duration-200 hover:text-accent-foreground text-foreground "
              href="/chat"
            >
              <span className="text-foreground font-medium group-hover:text-accent-foreground">
                <MessageCircleMore className="h-5 w-5" />
              </span>
              Chat
            </Link>
          </li>

          <li className="cursor-pointer border-dashed border-gray-200 px-2  last:border-t last:pt-2">
            <Link
              className="group flex items-center gap-2 rounded-md py-2 px-3 text-sm capitalize transition duration-200 hover:text-accent-foreground text-foreground   font-medium"
              href="/history"
            >
              <span className="text-foreground font-medium group-hover:text-accent-foreground">
                <History className="h-5 w-5" />
              </span>
              History
            </Link>
          </li>

          <li className="cursor-pointer border-dashed border-gray-200 px-2  last:border-t last:pt-2">
            <button
              onClick={async () => {
                const Cookies = (await import("js-cookie")).default;
                // localStorage.removeItem("token");
                // localStorage.removeItem("refresh_token");
                Cookies.remove("token");
                Cookies.remove("refresh_token");
                window.location.href = "/login";
              }}
              className="w-full group flex items-center gap-2 rounded-md py-2 px-3 text-sm capitalize transition duration-200 hover:text-accent-foreground text-foreground  font-medium "
            >
              <span className="text-foreground  group-hover:text-accent-foreground font-medium">
                <LogOut className="h-5 w-5 text-foreground  group-hover:text-accent-foreground" />
              </span>
              Logout
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
