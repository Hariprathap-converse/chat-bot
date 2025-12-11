"use client";

import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tootip-wrapper";

interface TruncateTooltipProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export const TruncateTooltip = ({
  text,
  className,
  children,
}: TruncateTooltipProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check if text is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text]);

  const spanStyles: React.CSSProperties = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "inline-block",
  };

  const spanContent = (
    <div
      ref={ref}
      style={spanStyles}
      className={`transition-all truncate duration-300 cursor-pointer ${className}`}
    >
      {children ? children : text}
    </div>
  );

  return isOverflowing ? (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{spanContent}</TooltipTrigger>
        <TooltipContent className="text-start py-1">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    spanContent
  );
};
