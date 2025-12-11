import { cn } from "@/lib/utils";
import React from "react";

export const SelectSkeleton = () => {
  return (
    <div className={cn(" max-h-fit overflow-auto  ")}>
      <div className="px-[3px] pt-1 pr-0 flex flex-col w-full gap-1 ">
        <div className="w-[95%] h-[30px] select-skeleton  rounded-sm " />
        <div className="w-[80%] h-[30px] select-skeleton  rounded-sm" />
        <div className="w-[95%] h-[30px] select-skeleton  rounded-sm " />
        <div className="w-[80%] h-[30px] select-skeleton  rounded-sm" />
        <div className="w-[95%] h-[30px] select-skeleton  rounded-sm " />
      </div>
    </div>
  );
};

export const GroupSkeleton = () => {
  return (
    <div className="px-[3px] pt-1 max-h-fit pr-0 flex flex-col  bg-white w-full gap-1">
      <div className="w-[89%] h-[30px] select-skeleton  rounded-sm " />
      <div className="w-[75%] ml-2 h-[30px] select-skeleton  rounded-sm" />
      <div className="w-[85%] ml-2 h-[30px] select-skeleton  rounded-sm" />
      <div className="w-[75%] ml-2 h-[30px] select-skeleton  rounded-sm" />
      <div className="w-[90%] h-[30px] select-skeleton  rounded-sm " />
    </div>
  );
};
