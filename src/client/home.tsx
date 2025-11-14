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
import { Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
const Iconss = () => (
  <svg
    fill="#FFFF"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 31.806 31.806"
  >
    <g>
      <g>
        <path d="M1.286,12.465c-0.685,0.263-1.171,0.879-1.268,1.606c-0.096,0.728,0.213,1.449,0.806,1.88l6.492,4.724L30.374,2.534    L9.985,22.621l8.875,6.458c0.564,0.41,1.293,0.533,1.964,0.33c0.67-0.204,1.204-0.713,1.444-1.368l9.494-25.986    c0.096-0.264,0.028-0.559-0.172-0.756c-0.199-0.197-0.494-0.259-0.758-0.158L1.286,12.465z" />
        <path d="M5.774,22.246l0.055,0.301l1.26,6.889c0.094,0.512,0.436,0.941,0.912,1.148c0.476,0.206,1.025,0.162,1.461-0.119    c1.755-1.132,4.047-2.634,3.985-2.722L5.774,22.246z" />
      </g>
    </g>
  </svg>
);
export const components: Record<string, JSX.Element> = {
  BotIcon: <BotIcon />,
  MessageIcon: <MessageIcon />,
  LeaveIcon: <LeaveIcon />,
  HoverLeaveIcon: <HoverLeaveIcon />,
  RoleIcon: <RoleIcon />,
  TeamIcon: <TeamIcon />,
  EditIcon: <EditIcon />,
  Sparkles: <Iconss />,
};

export default function DynamicHome() {
  const { data } = useOpsBot();

  return (
    <div className="bg-background h-full w-full p-[87px] pb-0 flex item-center justify-center">
      <main className="flex flex-col gap-[45px]">
        <div className="flex flex-col items-center gap-[27px]">
          <div className="flex flex-col items-center w-full gap-1.5">
            <span>{components[data.header.icon]}</span>
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

        <div className="flex flex-col gap-[23px]  max-w-[1198px]">
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
              <button
                className={cn(
                  " absolute top-2.5 right-3 p-2  font-semibold  bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 flex items-center rounded-[10px]  border-[1px] border-[hsla(245,96%,70%,1)] bg-[linear-gradient(91.96deg,rgba(116,104,252,0.7)_-16.64%,rgba(116,104,252,0.8)_117.28%)] hover:text-white hover:bg-sidebar-accent cursor-pointer  text-sm text-white   shadow-[0px_2px_10px_0px_hsla(245,100%,90%,1)]",
                  "  "
                )}
              >
                {components[data.search.buttonIcon]}{" "}
                {/* <span className="absolute inset-0 rounded-2xl pointer-events-none bg-white/20 opacity-40 mix-blend-overlay"></span> */}
              </button>
            </Link>
          </div>

          {data.sections.map((section, idx) => (
            <div
              key={idx}
              className="w-full border bg-white rounded-2xl flex flex-col gap-[18px] p-[38px] pb-[25px] pt-3"
            >
              <div className="flex gap-3 items-center  ">
                <span>{components[section.icon]}</span>

                <span className="text-heading text-base font-medium tracking-normal">
                  {section.title}
                </span>
              </div>

              <div className="flex gap-[39px]">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="group bg-white cursor-pointer w-[170px] border hover:border-[hsla(245,96%,70%,0.3)] rounded-2xl flex flex-col gap-2 items-center justify-center relative h-[150px]"
                  >
                    <div className="max-h-[40px] h-full w-full max-w-[40px] absolute top-[28%] left-[45%] bg-circle  group-hover:bg-dark-circle rounded-full"></div>
                    <span className="absolute top-3 right-4 group-hover:block hidden">
                      <Sparkles className="text-[hsla(245,96%,70%,1)] h-5 w-5" />
                    </span>
                    <span className="relative  z-50 ">
                      {components[item.icon]}
                    </span>

                    <span className="text-foreground relative z-50 group-hover:text-[hsla(245,96%,70%,1)] text-sm font-medium text-start ">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {data.footerSection.map((footer, idx) => (
            <div
              key={idx}
              className="w-full border bg-white rounded-2xl  flex flex-col gap-[18px] p-[38px] pb-[25px] pt-4"
            >
              <div className="flex gap-3 items-center  ">
                <span className="text-heading text-base font-medium tracking-normal">
                  {footer.title}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-[11px]">
                {footer.items.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-[7px] hover:border-dark-circle cursor-pointer p-[7px] px-3 w-full flex gap-2 items-center"
                  >
                    <span>{components[item.icon]}</span>
                    <span className="text-xs font-medium w-full tracking-normal text-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
