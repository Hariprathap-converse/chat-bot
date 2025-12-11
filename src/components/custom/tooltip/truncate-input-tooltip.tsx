import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tootip-wrapper";
import { Input } from "@/components/ui/input";

interface TruncateTooltipInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

export const TruncateTooltipInput = forwardRef<
  HTMLInputElement,
  TruncateTooltipInputProps
>(({ className, ...props }, forwardedRef) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    }
  }, [props.value]);

  const inputElement = (
    <Input
      {...props}
      ref={inputRef}
      className={`h-full w-full whitespace-normal truncate ${className}`}
    />
  );

  return isOverflowed ? (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{inputElement}</TooltipTrigger>
        <TooltipContent className="py-1 relative top-[7px]">
          {props.value}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    inputElement
  );
});

TruncateTooltipInput.displayName = "TruncateTooltipInput";
