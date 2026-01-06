import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tootip-wrapper";

import React, { useRef, useState, useEffect } from "react";

type OverflowSpanProps = {
  level: number;
  text: string;
  isActive: boolean;
  navSettings: any;
  isSheetOpen?: any;
  className?: string;
  style?: React.CSSProperties;
};

const OverflowSpan: React.FC<OverflowSpanProps> = ({
  level,
  text,
  isActive,
  navSettings,
  isSheetOpen,
  className = "",
  style,
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (spanRef.current) {
        setIsOverflowing(
          spanRef.current.scrollWidth > spanRef.current.clientWidth,
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text, navSettings.isNavOpen, navSettings, isSheetOpen]);

  const baseStyles = {
    "--text-color": isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))",
    "--fw": isActive ? "medium" : navSettings.textWeight,
    fontSize: navSettings.textSize,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "inline-block",
    ...style,
  } as React.CSSProperties;
  const content = (
    <span
      ref={spanRef}
      style={baseStyles}
      className={`transition-all  z-50  truncate mr-4  ${className}`}
    >
      {text}
    </span>
  );

  if (isOverflowing && level) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            className="min-w-[100px] w-full"
          >
            {text}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

export default OverflowSpan;
