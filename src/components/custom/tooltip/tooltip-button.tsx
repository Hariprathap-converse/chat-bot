import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tootip-wrapper";

type TooltipButtonProps = {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
  testId?: string;
  type: "button" | "submit" | "reset" | undefined;
};

export const TooltipButton = ({
  label,
  onClick,
  icon,
  className,
  testId,
  type,
}: TooltipButtonProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          data-testid={testId}
          onClick={onClick}
          className={className}
          type={type}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="text-start py-1">{label}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
