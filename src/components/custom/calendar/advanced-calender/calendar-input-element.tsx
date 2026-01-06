import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarElement } from "./calender-element";
import { cn } from "@/lib/utils";
import { InputElementProps } from "@/types/components/calender";
import { DisbaleAndVewiModeIcon } from "@/client/dynamic-form/icons/calendar/date-picker";
import { TooltipContent } from "@/components/ui/tootip-wrapper";

export const CalendarInputElement: React.FC<InputElementProps> = ({
  config,
  formConfig,
  isHovered,
  isFocused,
  className,
  inputDay,
  inputMonth,
  inputYear,
  monthName,
  typedBuffer,
  setIsHovered,
  setIsFocused,
  handleBlur,
  setIsOpen,
  displayValue,
  error,
  fontSizeClasses,
  handleFocus,
  parts,
  renderPart,
  isOpen,
  shouldOpenCalender,
  view,
  month,
  date,
  timeZone,
  MIN_YEAR,
  MAX_YEAR,
  yearPage,
  YEARS_PER_PAGE,
  TOTAL_PAGES,
  weekStartsOn,
  setYearPage,
  getZonedNow,
  setMonth,
  setView,
  isMonthFullyDisabled,
  isYearFullyDisabled,
  isDateDisabled,
  handlePresetClick,
  handleDateSelect,
  presetOptions,
}) => {
  return (
    <>
      <TooltipProvider delayDuration={0}>
        <Tooltip open={false}>
          <TooltipTrigger asChild>
            <div className="relative">
              <div
                className={cn(
                  "grid grid-cols-[auto_1fr] gap-[1px] w-full relative items-center",
                  fontSizeClasses[formConfig.fontSize],
                  "pl-[10px] bg-background",
                  isHovered && "!border-b-primary dark:!border-b",
                  isFocused &&
                    "!border-borderFocused  transition-all ease-out duration-200",
                  config.isDisabled === true &&
                    "border-borderFocused bg-disabledBg disabled:text-disabledText disabled:opacity-100 border-[1px]",
                  formConfig.viewMode &&
                    "bg-disabledBg border-[0.5px] disabled:text-disabledText disabled:opacity-100",
                  "placeholder:text-disabledPlaceholder xs:text-[12px] xs:placeholder:text-[12px] focus:outline-none focus-visible:outline-none focus:ring-0 min-w-0 3xl:placeholder:!text-[14px] truncate placeholder:font-light font-medium h-[35px] rounded-t-[4px] rounded-b-[3px] border-[1px]",
                  className,
                  (inputDay !== null && inputDay > 0) ||
                    (inputMonth !== null && inputMonth > 0) ||
                    (inputYear !== null && inputYear > 0) ||
                    (monthName !== null && monthName.length > 0) ||
                    (typedBuffer !== null && typedBuffer.current.length > 0)
                    ? ""
                    : "text-disabledPlaceholder font-light",
                  (config.isDisabled == true || formConfig.viewMode == true) &&
                    "!pointer-events-none cursor-not-allowed",
                )}
              >
                <div
                  className={cn(
                    "flex gap-[1px] items-center border-none ",
                    fontSizeClasses[formConfig.fontSize],
                    className,
                    inputDay && (monthName || inputMonth) && inputYear
                      ? ""
                      : "text-disabledPlaceholder font-light",
                  )}
                  onMouseEnter={
                    config.isDisabled == true || formConfig.viewMode == true
                      ? undefined
                      : () => setIsHovered(true)
                  }
                  onMouseLeave={
                    config.isDisabled == true || formConfig.viewMode == true
                      ? undefined
                      : () => setIsHovered(false)
                  }
                  onFocus={
                    config.isDisabled == true || formConfig.viewMode == true
                      ? undefined
                      : handleFocus
                  }
                  onCopy={
                    config?.behavior?.copyPasteRestriction
                      ? (e) => e.preventDefault()
                      : undefined
                  }
                  onPaste={
                    config?.behavior?.copyPasteRestriction
                      ? (e) => e.preventDefault()
                      : undefined
                  }
                  onBlur={() => {
                    setIsFocused(false);
                  }}
                >
                  {parts.map(renderPart)}
                </div>
                <Popover
                  open={isOpen}
                  onOpenChange={(open) => {
                    if (!open) {
                      setIsOpen(false);
                      setIsFocused(false);
                      handleBlur();
                    } else {
                      setIsOpen(true);
                    }
                  }}
                >
                  <PopoverTrigger asChild className="">
                    <div
                      onClick={() => {
                        // if (
                        //   config.isDisabled == false ||
                        //   formConfig.viewMode == false
                        // ) {
                        //   setIsOpen(true)
                        //   setIsFocused(true)
                        // }
                      }}
                      // onFocus={(e) => {
                      //   // Only auto-open if focus came from Tab (not mouse click, not after Esc)
                      //   if (
                      //     e.relatedTarget &&
                      //     (!config.isDisabled || !formConfig.viewMode)
                      //   ) {
                      //     console.log(
                      //       'shouldOpenCalender: ',
                      //       shouldOpenCalender
                      //     )

                      //     if (shouldOpenCalender == false) {
                      //       console.log('first')
                      //       setIsOpen((prev) => !prev)
                      //       setIsFocused(true)
                      //     } else {
                      //       console.log('close')
                      //       setIsOpen(false)
                      //       setIsFocused(false)
                      //     }
                      //   }
                      // }}
                      tabIndex={!shouldOpenCalender ? 0 : -1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setIsOpen(true);
                          setIsFocused(true);
                        }
                      }}
                      className={cn(
                        "group relative pr-[10px] flex justify-end items-center gap-1 focus-visible:outline-none ",
                        {
                          "cursor-pointer":
                            config.isDisabled == false &&
                            formConfig.viewMode == false,
                          "cursor-not-allowed":
                            config.isDisabled == true ||
                            formConfig.viewMode == true,
                        },
                      )}
                    >
                      {!formConfig.viewMode && !config.isDisabled && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="fill-[#C5C5C5] dark:fill-[#414650] stroke-white dark:stroke-0 stroke-[0.6] group-focus:stroke-none group-focus:scale-110 "
                        >
                          <path d="M20.625 4.3125H16.6875V2.8125C16.6875 2.70937 16.6031 2.625 16.5 2.625H15.1875C15.0844 2.625 15 2.70937 15 2.8125V4.3125H9V2.8125C9 2.70937 8.91563 2.625 8.8125 2.625H7.5C7.39687 2.625 7.3125 2.70937 7.3125 2.8125V4.3125H3.375C2.96016 4.3125 2.625 4.64766 2.625 5.0625V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V5.0625C21.375 4.64766 21.0398 4.3125 20.625 4.3125ZM19.6875 19.6875H4.3125V10.7812H19.6875V19.6875ZM4.3125 9.1875V6H7.3125V7.125C7.3125 7.22813 7.39687 7.3125 7.5 7.3125H8.8125C8.91563 7.3125 9 7.22813 9 7.125V6H15V7.125C15 7.22813 15.0844 7.3125 15.1875 7.3125H16.5C16.6031 7.3125 16.6875 7.22813 16.6875 7.125V6H19.6875V9.1875H4.3125Z" />
                        </svg>
                      )}
                      {config.isDisabled && <DisbaleAndVewiModeIcon />}
                    </div>
                  </PopoverTrigger>

                  <PopoverContent
                    onFocusOutside={() => {
                      setIsOpen(false);
                      setIsFocused(false);
                    }}
                    side="bottom"
                    align="end"
                    className="!p-0 relative w-full  top-[6px] z-[9999] border-none bg-white dark:bg-black rounded-md"
                  >
                    <CalendarElement
                      view={view}
                      month={month}
                      date={date}
                      timeZone={timeZone}
                      MIN_YEAR={MIN_YEAR}
                      MAX_YEAR={MAX_YEAR}
                      yearPage={yearPage}
                      YEARS_PER_PAGE={YEARS_PER_PAGE}
                      TOTAL_PAGES={TOTAL_PAGES}
                      weekStartsOn={weekStartsOn}
                      setYearPage={setYearPage}
                      getZonedNow={getZonedNow}
                      setMonth={setMonth}
                      setView={setView}
                      isMonthFullyDisabled={isMonthFullyDisabled}
                      isYearFullyDisabled={isYearFullyDisabled}
                      isDateDisabled={isDateDisabled}
                      handlePresetClick={handlePresetClick}
                      handleDateSelect={handleDateSelect}
                      presetOptions={presetOptions}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div
                className={cn(
                  "absolute bottom-[0px] !z-50 left-[0.3%]  flex items-center  max-w-[99.5%] h-0.5  rounded-none transition-all duration-200 ease-out ",
                  error && isFocused ? "bg-[#E53D3D]" : " bg-primary",
                  isFocused ? "w-full " : "w-0",
                  isFocused && (!config.isDisabled || !formConfig.viewMode)
                    ? "w-full "
                    : "w-0",
                )}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs ">
            <p>{displayValue}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
