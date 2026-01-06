import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tootip-wrapper";
import { cn } from "@/lib/utils";
import { LabelElementProps } from "@/types/components/calender";
import { DATE_FORMATS } from "@/utils/calender/date-formates";

export const CalendarLabelElement: React.FC<LabelElementProps> = ({
  config,
  formConfig,
  hasBeenModified,
  fontSizeClasses,
  allowFormatChange,
  selectedFormat,
  handleFormatChange,
}) => {
  if (!config.label) {
    return null;
  }
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-[6px]">
        {formConfig.editMode && hasBeenModified && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-[15px] z-[9999]">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.98667 5.34778L9.65102 6.01222L3.1086 12.5556H2.44424V11.8911L8.98667 5.34778ZM11.5863 1C11.4058 1 11.218 1.07222 11.0808 1.20944L9.75934 2.53111L12.4673 5.23944L13.7888 3.91778C14.0704 3.63611 14.0704 3.18111 13.7888 2.89944L12.099 1.20944C11.9546 1.065 11.7741 1 11.5863 1ZM8.98667 3.30389L1 11.2917V14H3.70796L11.6946 6.01222L8.98667 3.30389Z"
                        fill="#FFB800"
                      />
                    </svg>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Unsaved</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        <label
          htmlFor={config.id}
          className={cn(
            fontSizeClasses[formConfig.fontSize],
            "font-normal dark:text-[#FAFAFA] text-[#31363F]",
            config.isRequired?.value && "after:content-['*'] after:ml-0.5 ",
          )}
        >
          {config.label}
        </label>
        {config.helperText && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M9.59458 4C10.1976 4 10.4991 4.4104 10.4991 4.88065C10.4991 5.4679 9.97528 6.01105 9.29353 6.01105C8.72248 6.01105 8.38948 5.67355 8.40523 5.11555C8.40523 4.6462 8.80168 4 9.59458 4ZM7.73923 13C7.26313 13 6.91438 12.7066 7.24738 11.4142L7.79368 9.1228C7.88863 8.7565 7.90438 8.60935 7.79368 8.60935C7.65103 8.60935 7.03363 8.86225 6.66778 9.112L6.43018 8.716C7.58758 7.7323 8.91913 7.15585 9.49063 7.15585C9.96628 7.15585 10.0455 7.7287 9.80788 8.60935L9.18193 11.0177C9.07123 11.443 9.11848 11.5897 9.22963 11.5897C9.37228 11.5897 9.84028 11.4133 10.3002 11.0465L10.5702 11.4128C9.44428 12.559 8.21443 13 7.73923 13Z"
                      fill="#81868C"
                    />
                    <circle cx="8.5" cy="8.5" r="8" stroke="#81868C" />
                  </svg>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs !z-[9999]">
                <p className="!z-[9999] ">{config.helperText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {allowFormatChange && (
        <Select value={selectedFormat} onValueChange={handleFormatChange}>
          <SelectTrigger className="w-[140px] h-6 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(DATE_FORMATS).map((format) => (
              <SelectItem key={format} value={format} className="text-xs">
                {format}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
