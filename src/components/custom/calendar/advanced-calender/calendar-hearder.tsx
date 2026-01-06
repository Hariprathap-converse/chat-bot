import {
  CalenderDoubleIconNext,
  CalenderDoubleIconPrevious,
  NextCalenderIcon,
  PreviousCalenderIcon,
} from "@/client/dynamic-form/icons/calendar/date-picker";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tootip-wrapper";
import { CalendarHeaderProps } from "@/types/components/calender";

import { formatDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  month,
  timeZone,
  MIN_YEAR,
  MAX_YEAR,
  yearPage,
  YEARS_PER_PAGE,
  TOTAL_PAGES,
  setMonth,
  setYearPage,
  setView,
}) => {
  const zonedMonth = toZonedTime(month, timeZone);
  const startYear = MIN_YEAR + yearPage * YEARS_PER_PAGE;
  const endYear = Math.min(startYear + YEARS_PER_PAGE - 1, MAX_YEAR);
  const formatted = formatDate(zonedMonth, "MMM, yyyy").toUpperCase();

  const isPreviousDisabled = () => {
    if (view === "year") {
      const firstYearInPage = yearPage * 16 + MIN_YEAR;
      return firstYearInPage <= MIN_YEAR;
    } else {
      return zonedMonth.getFullYear() <= MIN_YEAR;
    }
  };

  const isNextDisabled = () => {
    if (view === "year") {
      const lastYearInPage = (yearPage + 1) * 16 - 1 + MIN_YEAR;
      return lastYearInPage >= MAX_YEAR;
    } else {
      return zonedMonth.getFullYear() >= MAX_YEAR;
    }
  };

  return (
    <div className="flex dark:!shadow-[inset_0px_-2px_8px_0px_hsla(0,0%,0%,0.1)] shadow-[-2px_-2px_8px_0px_#00000005_inset] items-center w-full h-[41px] 3xl:h-[41px] sm:h-[35px] xs:h-[25px] xss:h-[30px] relative !z-[9999]">
      {/* Previous Year */}
      <div className="flex w-[33.33%] xs:pl-[5px] 3xl:pl-[9px]">
        {view === "day" && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center user-select-none cursor-pointer">
                  <div
                    onClick={() => {
                      const newMonth = toZonedTime(
                        new Date(
                          zonedMonth.getFullYear() - 1,
                          zonedMonth.getMonth(),
                        ),
                        timeZone,
                      );
                      setMonth(newMonth);
                    }}
                  >
                    <CalenderDoubleIconPrevious />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="z-[9999] inter xs:hidden xss:hidden sm:hidden xl:block 3xl:block pt-1 top-[-17px] left-[-34px] text-nowrap text-[13px] absolute 3xl:top-[-17px] 3xl:left-[-35px] font-medium rounded w-fit px-[7px] h-[27px] flex text-center">
                Last Year
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {/* Previous Month or Previous 16 */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`${
                  view === "year" || view === "month" ? "xs:pl-[25px]" : ""
                } user-select-none flex items-center justify-center cursor-pointer`}
              >
                <div
                  onClick={() => {
                    if (isPreviousDisabled()) return;
                    if (view === "year") {
                      if (yearPage > 0) setYearPage(yearPage - 1);
                    } else if (view === "month") {
                      setMonth(
                        toZonedTime(
                          new Date(
                            zonedMonth.getFullYear() - 1,
                            zonedMonth.getMonth(),
                          ),
                          timeZone,
                        ),
                      );
                    } else {
                      setMonth(
                        toZonedTime(
                          new Date(
                            zonedMonth.getFullYear(),
                            zonedMonth.getMonth() - 1,
                          ),
                          timeZone,
                        ),
                      );
                    }
                  }}
                >
                  <PreviousCalenderIcon
                    disabled={isPreviousDisabled()}
                    rotation={""}
                  />
                </div>
              </div>
            </TooltipTrigger>
            {!isPreviousDisabled() && (
              <TooltipContent
                className={`${
                  !isPreviousDisabled() ? "hidden" : "block"
                } xs:hidden inter xss:hidden z-[9999] sm:hidden xl:block 3xl:block pt-1 top-[-17px] left-[-34px] xl:left-[-39px] text-nowrap text-[13px] absolute 3xl:top-[-17px] 3xl:left-[-39px] font-medium rounded w-fit px-[7px] h-[27px] flex text-center ${
                  view === "year"
                    ? "3xl:left-[-39px]"
                    : view == "month"
                      ? "3xl:left-[-29px]"
                      : "3xl:top-[-17px] 3xl:left-[-42px]"
                }`}
              >
                {view === "year" ? "Previous Years" : "Last Month"}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Month & Year Toggle */}
      <div className="flex items-center justify-center w-[33.33%]">
        <div
          className="text-primary sm:text-[10px] font-semibold 3xl:text-[14px] user-select-none inter duration-1000 cursor-pointer xs:text-[11px] xss:text-[12px] text-[14px]"
          onClick={() =>
            setView(
              view === "day" ? "month" : view === "month" ? "year" : "day",
            )
          }
        >
          {view === "day"
            ? formatted
            : view === "month"
              ? formatDate(zonedMonth, "yyyy")
              : `${startYear} - ${endYear}`}
        </div>
      </div>
      <div
        className={`${
          view == "year" || view == "month" ? "xs:pr-[33px]" : ""
        } flex pt-[4px] w-[33.33%] justify-end xs:pr-2 3xl:pr-[12px]`}
      >
        {/* Next Month or Next 16 */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex items-center justify-center cursor-pointer ${
                  view === "year" || view === "month" ? "3xl:pr-[25px]" : ""
                }`}
              >
                <div
                  onClick={() => {
                    if (isNextDisabled()) return;
                    if (view === "year") {
                      if (yearPage < TOTAL_PAGES - 1) setYearPage(yearPage + 1);
                    } else if (view === "month") {
                      setMonth(
                        toZonedTime(
                          new Date(
                            zonedMonth.getFullYear() + 1,
                            zonedMonth.getMonth(),
                          ),
                          timeZone,
                        ),
                      );
                    } else {
                      setMonth(
                        toZonedTime(
                          new Date(
                            zonedMonth.getFullYear(),
                            zonedMonth.getMonth() + 1,
                          ),
                          timeZone,
                        ),
                      );
                    }
                  }}
                >
                  <NextCalenderIcon disabled={isNextDisabled()} />
                </div>
              </div>
            </TooltipTrigger>
            {!isNextDisabled() && (
              <TooltipContent
                className={`z-[9999] inter xs:hidden xss:hidden sm:hidden xl:block 3xl:block pt-1 top-[-17px] left-[-34px] text-nowrap text-[13px] absolute 3xl:top-[-19px] 3xl:left-[-39px] font-medium rounded w-fit px-[7px] h-[27px] xl:left-[-40px] flex text-center ${
                  view === "year"
                    ? "3xl:left-[-54px]"
                    : view == "month"
                      ? "3xl:left-[-55px]"
                      : "3xl:top-[-19px] 3xl:left-[-42px]"
                }`}
              >
                {view === "year" ? "Next Years" : "Next Month"}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        {/* Next Year */}
        {view === "day" && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center cursor-pointer">
                  <div
                    onClick={() => {
                      const newMonth = toZonedTime(
                        new Date(
                          zonedMonth.getFullYear() + 1,
                          zonedMonth.getMonth(),
                        ),
                        timeZone,
                      );
                      setMonth(newMonth);
                    }}
                  >
                    <CalenderDoubleIconNext />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="inter z-[9999] xs:hidden xss:hidden sm:hidden xl:block 3xl:block pt-1 top-[-17px] left-[-34px] xl:left-[-36px] text-nowrap text-[13px] absolute 3xl:top-[-19px] 3xl:left-[-38px] font-medium rounded w-fit px-[7px] h-[27px] flex text-center">
                Next Year
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};
