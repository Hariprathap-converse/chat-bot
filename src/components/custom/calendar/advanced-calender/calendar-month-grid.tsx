import { cn } from "@/lib/utils";
import { CalendarMonthGridProps } from "@/types/components/calender";
import { toZonedTime } from "date-fns-tz";


export const CalendarMonthGrid: React.FC<CalendarMonthGridProps> = ({
  month,
  date,
  timeZone,
  getZonedNow,
  setMonth,
  setView,
  isMonthFullyDisabled,
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const zonedNow = getZonedNow();
  const zonedMonth = toZonedTime(month, timeZone);
  const zonedDate = date ? toZonedTime(date, timeZone) : undefined;
  const currentMonth = zonedNow.getMonth();
  const currentYear = zonedNow.getFullYear();
  const selectedYear = zonedMonth.getFullYear();

  return (
    <div className="grid grid-cols-4 xs:grid-cols-3 xss:grid-cols-4 3xl:px-0 3xl:pl-3 w-[287px] xs:w-[203px] xss:w-[250px] sm:w-full gap-3 xs:pt-[10px] 3xl:pt-[23px] pt-[22px] px-3">
      {months.map((monthName, index) => {
        const isDisabled = isMonthFullyDisabled(selectedYear, index);
        const isSelected =
          index === zonedDate?.getMonth() &&
          selectedYear === zonedDate?.getFullYear();
        const isCurrent =
          currentMonth === index && currentYear === selectedYear;

        return (
          <div
            key={monthName}
            className={`flex items-center justify-center h-[27px] w-[50px] ${
              isDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              if (isDisabled) return;
              const newDate = toZonedTime(
                new Date(selectedYear, index, 1),
                timeZone
              );
              setMonth(newDate);
              setView("day");
            }}
          >
            <div
              className={cn(
                "select-none font-normal inter sm:text-[12px] 3xl:text-[14px] xs:text-[11px] xss:text-[13px]",
                "flex items-center justify-center inter text-center rounded-[4px]",
                "h-[27px] w-[50px] 3xl:h-[27px] 3xl:w-[50px] xs:h-[20px] xs:w-[35px] xss:h-[23px] xss:w-[40px]",
                isSelected &&
                  "bg-primary !text-calender_foreground !text-white",
                isCurrent &&
                  "!bg-primary/65 !text-white hover:text-calender_foreground",
                isDisabled
                  ? "!text-[#979a9e] cursor-not-allowed !hover:text-disabled_text"
                  : !isSelected &&
                      !isCurrent &&
                      !isDisabled &&
                      "hover:font-medium duration-300 text-calender_foreground hover:text-primary"
              )}
            >
              <div className="pb-[1.5px] inter sm:pb-0">{monthName}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
