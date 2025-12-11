import { cn } from "@/lib/utils";
import { CalendarYearGridProps } from "@/types/components/calender";
import { toZonedTime } from "date-fns-tz";



export const CalendarYearGrid: React.FC<CalendarYearGridProps> = ({
  month,
  date,
  timeZone,
  MIN_YEAR,
  MAX_YEAR,
  yearPage,
  YEARS_PER_PAGE,
  getZonedNow,
  setMonth,
  setView,
  isYearFullyDisabled,
}) => {
  const zonedNow = getZonedNow();
  const zonedDate = date ? toZonedTime(date, timeZone) : undefined;
  const currentYear = zonedNow.getFullYear();
  const startYear = MIN_YEAR + yearPage * YEARS_PER_PAGE;
  const endYear = Math.min(startYear + YEARS_PER_PAGE - 1, MAX_YEAR);
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <div className="px-4 pb-1 xs:px-0 sm:px-[2px] 3xl:pr-5 sm:pr-6">
      <div className="grid grid-cols-4 gap-4 3xl:gap-[18.5px] sm:gap-5 sm:pl-2 xs:gap-x-0 xs:gap-y-2 xss:gap-y-3 items-center justify-center">
        {years.map((year: number) => {
          const isDisabled = isYearFullyDisabled(year);
          const isSelected = year === zonedDate?.getFullYear();
          const isCurrent = year === currentYear;

          return (
            <div
              key={year}
              className={`flex items center justify-center h-[27px] w-[50px] pt-[23px] sm:pt-3 ${
                isDisabled
                  ? "cursor-not-allowed !text-disabled_text"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (isDisabled) return;
                const zonedMonth = toZonedTime(month, timeZone);
                const newDate = toZonedTime(
                  new Date(year, zonedMonth.getMonth(), 1),
                  timeZone
                );
                setMonth(newDate);
                setView("month");
              }}
            >
              <div
                className={cn(
                  "select-none inter sm:h-[22px] sm:w-[45px] font-normal text-center rounded-[4px] flex items-center justify-center",
                  "text-[14px] sm:text-[14px] xss:text-[12px] xs:text-[11px]",
                  "h-[27px] w-[50px] xs:h-[20px] xs:w-[45px] xss:h-[24px] xss:w-[50px] 3xl:h-[27px] 3xl:w-[50px]",
                  isSelected &&
                    "bg-primary !text-calender_foreground !text-white",
                  isCurrent &&
                    "!bg-primary/65 !text-white hover:text-calender_foreground",
                  isDisabled
                    ? "text-[#979a9e] cursor-not-allowed hover:text-[#979a9e]"
                    : !isSelected &&
                        !isCurrent &&
                        "text-calender_foreground hover:text-primary hover:font-medium duration-200"
                )}
              >
                <div className="pb-[1px] sm:pb-[1px] sm:text-[12px] 3xl:text-[14px] inter">
                  {year}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
