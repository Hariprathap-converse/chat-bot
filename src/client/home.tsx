"use client";
import { Input } from "@/components/ui/input";
import { useOpsBot } from "@/context/json-context";
import {
  EditIcon,
  HoverLeaveIcon,
  LeaveIcon,
  BotIcon,
  MessageIcon,
  RoleIcon,
  TeamIcon,
} from "@/Icons/global/home";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import * as LucideIcons from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as TbIcons from "react-icons/tb";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";

const SendIcon = () => (
  <svg
    fill="#FFFF"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 31.806 31.806"
    className=""
  >
    <g>
      <g>
        <path d="M1.286,12.465c-0.685,0.263-1.171,0.879-1.268,1.606c-0.096,0.728,0.213,1.449,0.806,1.88l6.492,4.724L30.374,2.534    L9.985,22.621l8.875,6.458c0.564,0.41,1.293,0.533,1.964,0.33c0.67-0.204,1.204-0.713,1.444-1.368l9.494-25.986    c0.096-0.264,0.028-0.559-0.172-0.756c-0.199-0.197-0.494-0.259-0.758-0.158L1.286,12.465z" />
        <path d="M5.774,22.246l0.055,0.301l1.26,6.889c0.094,0.512,0.436,0.941,0.912,1.148c0.476,0.206,1.025,0.162,1.461-0.119    c1.755-1.132,4.047-2.634,3.985-2.722L5.774,22.246z" />
      </g>
    </g>
  </svg>
);
export const dynamicIconSources: Record<string, any> = {
  ...LucideIcons,
  ...FaIcons,
  ...MdIcons,
  ...RiIcons,
  ...TbIcons,
  ...AiIcons,
  ...BsIcons,
  ...IoIcons,
  BotIcon,
  MessageIcon, // your local custom icons
  LeaveIcon,
  HoverLeaveIcon,
  RoleIcon,
  TeamIcon,
  EditIcon,
  SendIcon,
};

export const icons: Record<string, any> = {
  LeaveIcon,
  HoverLeaveIcon,
  RoleIcon,
  TeamIcon,
  EditIcon,
  SendIcon,
  Sparkles,
};
export const getIcon = (name?: string, className?: string) => {
  if (!name) return null;

  const Icon = dynamicIconSources[name];

  if (!Icon) {
    console.warn(`⚠ Unknown icon: ${name}`);
    return null;
  }

  return <Icon className={cn("h-8 w-8", className)} />;
};

export default function DynamicHome() {
  const { data } = useOpsBot();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <div className="bg-background h-full w-full p-[87px] pb-0 flex item-center justify-center">
      <main className="flex flex-col gap-[45px]">
        <div className="flex flex-col items-center gap-[27px]">
          <div className="flex flex-col items-center w-full gap-1.5">
            <span>{getIcon(data.header.customIcon)}</span>
            <span className="bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent font-semibold text-[45px] leading-[150%]  tracking-normal">
              {data.header.title}
            </span>

            <span className="text-sub-title text-center max-w-[696px] font-medium leading-[150%] text-sm tracking-normal">
              {data.header.subtitle}
            </span>
          </div>
          <span className="text-sub-heading font-medium leading-[150%] text-base tracking-normal">
            {data.header.description}
          </span>
        </div>

        <div className="flex flex-col gap-[23px]  w-[1098px]">
          <div className="flex relative max-w-[1198px] p-0">
            <div className="p-px rounded-[14px] w-full  shadow-[0px_2px_10px_0px_hsla(0,0%,0%,0.06)]  bg-linear-to-b from-[hsla(245,100%,97%,1)] to-[hsla(245,100%,94%,1)] max-w-[1198px]">
              <Input
                className=" p-0 h-14 rounded-[14px] border-0 bg-white px-[21px] flex  items-center  
               placeholder:font-normal placeholder:text-base placeholder:text-foreground  
               leading-[150%] tracking-normal font-normal !text-base text-heading outline-none 
                focus:ring-0 focus:ring-offset-0 focus:ring-transparent  focus-visible:ring-0! focus-visible:ring-offset-0 focus-visible:ring-transparent focus:placeholder:text-sub-title"
                placeholder="Send a message..."
              />
            </div>
            <Link href={"/chat"}>
              <button className=" absolute top-2.5 right-3 cursor-pointer p-2 rounded-2xl font-semibold text-white  bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 border border-white/30 flex items-center ">
                {getIcon(data.search.buttonIcon)}{" "}
                <span className="absolute inset-0 rounded-2xl pointer-events-none bg-white/20 opacity-40 mix-blend-overlay"></span>
              </button>
            </Link>
          </div>

          {data.sections.map((section, idx) => (
            <div
              key={idx}
              className="max-w-full border bg-white rounded-2xl flex flex-col gap-[18px] p-[38px] pb-[25px] pt-3"
            >
              <div className="flex gap-3 items-center  ">
                <span>{getIcon(section.icon)}</span>

                <span className="text-heading text-base font-medium tracking-normal">
                  {section.title}
                </span>
              </div>

              <div className="flex gap-[39px]">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedSection(item.key)}
                    className={cn(
                      selectedSection == item.key ? "border-hover-border" : "",
                      "group bg-white cursor-pointer w-[170px] border hover:border-hover-border rounded-2xl flex flex-col gap-2 items-center justify-center relative h-[150px]"
                    )}
                  >
                    <div className="max-h-[40px] h-full w-full max-w-[40px] absolute top-[28%] left-[45%] bg-circle   rounded-full"></div>
                    <span
                      className={cn(
                        selectedSection == item.key
                          ? "opacity-100"
                          : " opacity-0 group-hover:opacity-100",
                        "absolute top-3 right-4  translate-y-1  group-hover:translate-y-0 transition-all duration-500 ease-out"
                      )}
                    >
                      <Sparkles className="text-[hsla(245,96%,70%,1)] h-5 w-5" />
                    </span>

                    <span
                      className={cn(
                        selectedSection == item.key && "scale-[140%]",
                        "relative  group-hover:scale-[140%]  transition-all duration-500 h-[50px]  z-50 "
                      )}
                    >
                      {getIcon(item.icon)}
                    </span>
                    <span className="text-foreground absolute bottom-[18%] group-hover:pt-2 transition-all duration-300  z-50  text-sm font-medium text-start ">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {selectedSection === null ? (
            <div className="max-w-full border bg-white rounded-2xl flex flex-col gap-[18px] p-[32px] pb-[23px] pt-3">
              <div className="flex gap-3 items-center">
                <span className="text-heading text-base font-medium tracking-normal">
                  Quick Operations
                </span>
              </div>

              <div className="grid grid-cols-5 gap-[11px]">
                {data.footerSection[0].items.slice(0, 6).map((item, index) => (
                  <div
                    key={index}
                    className="border group rounded-[7px]  hover:border-hover-border  hover:bg-background cursor-pointer w-[180px] p-[7px] px-3  flex gap-2 items-center"
                  >
                    <span>{getIcon(item.icon)}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            data.footerSection
              .filter((footer) => footer.sectionKey === selectedSection)
              .map((footer, idx) => (
                <div
                  key={idx}
                  className="max-w-full border bg-white rounded-2xl flex flex-col gap-[18px] p-[32px] pb-[23px] pt-3"
                >
                  <div className="flex gap-3 items-center">
                    <span className="text-heading text-base font-medium tracking-normal">
                      {footer.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-[11px]">
                    {footer.items.map((item, index) => (
                      <div
                        key={index}
                        className="border group rounded-[7px] hover:bg-background hover:border-hover-border cursor-pointer p-[7px] min-w-[180px] w-full px-3  flex gap-2 items-center"
                      >
                        <span>{getIcon(item.icon, "h-4 w-4")}</span>
                        <span className="text-xs font-medium">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </main>
    </div>
  );
}
