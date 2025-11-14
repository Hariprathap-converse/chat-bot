"use client";
import { AppSidebar } from "@/client/app-sidebar";
import { components } from "@/client/home";
import { Input } from "@/components/ui/input";
import { useOpsBot } from "@/context/json-context";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const page = () => {
  const { data } = useOpsBot();
  return (
    <div className="bg-background relative min-h-screen w-full p-[50px] pb-0 flex item-center justify-center">
      <div className="absolute left-5 rounded-2xl top-5 ">
        <AppSidebar />
      </div>
      <main className="flex flex-col pb-6 min-w-[60%] justify-between ">
        <div className="flex flex-col items-center gap-[27px]">
          <div className="flex flex-col items-center w-full gap-1.5">
            <span className="bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent font-semibold text-[45px] leading-[150%]  tracking-normal">
              {data.chat.introTitle}
            </span>
            <span className="text-foreground text-center max-w-[696px] font-medium leading-[150%] text-base tracking-normal">
              {data.chat.subtitle}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[23px] ">
          <div className="flex relative  p-0">
            <div className="p-px rounded-[14px] w-full  shadow-[0px_2px_10px_0px_hsla(0,0%,0%,0.06)]  bg-linear-to-b from-[hsla(245,100%,97%,1)] to-[hsla(245,100%,94%,1)] ">
              <Input
                className=" p-0 h-14 rounded-[14px] border-0 bg-white px-[21px] flex  items-center  
               placeholder:font-normal placeholder:text-base placeholder:text-foreground  
               leading-[150%] tracking-normal font-normal !text-base text-heading outline-none 
                focus:ring-0 focus:ring-offset-0 focus:ring-transparent  focus-visible:ring-0! focus-visible:ring-offset-0 focus-visible:ring-transparent focus:placeholder:text-sub-title"
                placeholder="Send a message..."
              />
            </div>
            <button className=" absolute top-2.5 right-3 cursor-pointer p-2 rounded-2xl font-semibold text-white  bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 border border-white/30 flex items-center ">
              {components[data.search.buttonIcon]}{" "}
              <span className="absolute inset-0 rounded-2xl pointer-events-none bg-white/20 opacity-40 mix-blend-overlay"></span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
