"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background dark:bg-[#161616] !user-select:none group/calendar text-white  data-[today=true]:text-white pr-1 pl-1 pb-1 pt-[1.5px] xs:h-[125px] xs:w-[100px] xs:[--cell-size:0rem]  [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months,
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),

        // hide
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full hidden items-center justify-between gap-1",
          defaultClassNames.nav,
        ),

        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        // hide
        month_caption: cn(
          "flex h-[--cell-size] w-full hidden items-center  justify-center px-[--cell-size]",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full  border-collapse",
        weekdays: cn("flex ", defaultClassNames.weekdays),
        //mon tue --days
        weekday: cn(
          "text-[#31363F]  !font-medium mb-[10px] xs:mb-[5px] xs:pt-1 sm:mb-[3px] sm:text-[11px] text-[14px] 3xl:text-[14px] xs:text-[10px] xss:text-[13px] font-medium inter text-calender_foreground  pt-[1px]   flex-1 select-none rounded-md ",
          defaultClassNames.weekday,
        ),
        week: cn(
          " xss:mt-1  3xl:mt-1 flex items-center w-full ",
          defaultClassNames.week,
        ),
        week_number_header: cn(
          "w-[--cell-size]  select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-muted-foreground  select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day: cn(
          "w-full h-[25px]  aspect-square flex items-center  justify-center", // important
          "hover:bg-transparent hover:text-[#1d57c7] ",
          "text-[14px] font-normal inter !text-white",
          defaultClassNames.day,
        ),
        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none ", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md ", defaultClassNames.range_end),
        //Need to revise this
        today: cn(
          "data-[selected=true]:rounded-none !ml-[4.3px] mr-[4px] hover:!text-white",
          "w-[30px] max-w-[34px] sm:h-[21px] sm:w-[21px] xs:h-[19px] xs:w-[18px] 3xl:min-h-[27.5px] 3xl:w-[30px]",
          "flex items-center justify-center !rounded-[4px]",
          "text-[14px] font-normal inter",
          "!data-[today=true]:text-white data-[today=true]:bg-primary data-[today=true]:opacity-65 data-[today=true]:hover:!text-white ", // enforce white on hover
          "hover:bg-transparent text-white",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground ",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "!text-[#979a9e] opacity-[750%] cursor-not-allowed font-light hover:bg-transparent hover:text-[#979a9e] hover:border-transparent",
          defaultClassNames.disabled,
        ),

        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  function isToday(date: Date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "inter user-select:none !font-normal hover:!font-medium transition-all duration-700 !focus:outline-none focus-ring-0 focus:ring-offset-0 !text-calender_foreground !z-[999]",
        "data-[selected-single=true]:animate-selected data-[selected-single=true]:rounded-[4px] data-[selected-single=true]:hover:!text-white data-[selected-single=true]:hover:font-light",
        "hover:!text-primary data-[selected-single=true]:!text-white",
        "xs:h-[18px] xs:w-[18px] sm:h-[21px] sm:w-[21px] xs:text-[10px] sm:text-[12px]",
        "xss:text-[12px] 3xl:text-[14px] text-[14px] sm:text-[10px]",
        "3xl:w-[30px] 3xl:h-[27px] w-[30px] h-[27px]",
        "hover:bg-transparent hover:text-primary hover:font-bold",
        "data-[selected-single=true]:text-primary-foreground",
        "data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground",
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50",
        "flex aspect-square min-w-[--cell-size] flex-col gap-1 leading-none",
        "data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        isToday(day.date) &&
          " hover:!text-white !text-white font-semibold rounded-md",
      )}
      {...props}
    >
      {isToday(day.date)
        ? isToday(day.date) && day.date.getDate()
        : day.date.getDate()}
    </Button>
  );
}

export { Calendar, CalendarDayButton };
