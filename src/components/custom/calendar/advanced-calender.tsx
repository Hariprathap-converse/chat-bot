"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { parse, isValid, format as formatDate } from "date-fns";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  subDays,
} from "date-fns";
import { useState } from "react";
import { CalenderlabelRightElement } from "./advanced-calender/calendar-label-right";
import { CalendarInputElement } from "./advanced-calender/calendar-input-element";
import { CalendarLabelElement } from "./advanced-calender/calendar-label";
import { DATE_FORMATS, monthNames } from "@/utils/calender/date-formates";
import { useDateInput } from "./advanced-calender/hooks/useDateInput";
import { parseFormat } from "@/utils/calender/date-input-parser";
import {
  CalenderProps,
  DateFormatKey,
  DateFormatPart,
} from "@/types/components/calender";
import { toZonedTime } from "date-fns-tz";

export function DateTimePicker({
  config,
  formConfig,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  setErrors,
  fieldName,
  dateFormat,
  className,
  allowFormatChange = false,
  calendarDisableConfig = {
    disableToday: false,
    disableTomorrow: false,
    disableYesterday: false,
    disableStartDate: new Date("0000-00-00"),
    disableEndDate: new Date("0000-00-00"),
    disabledYearIndexes: [],
    disableWeekends: false,
    disabledWeekdays: [],
    weekStartsOn: 1,
    disablePastDates: new Date("0000-00-00"),
    disableFutureDates: new Date("0000-00-00"),
    disabledYearMonthPairs: [],
    allowedDateRange: {
      from: new Date("0000-00-00"),
      to: new Date("0000-00-00"),
    },
  },
}: CalenderProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(value || new Date());
  const [view, setView] = React.useState<"day" | "month" | "year">("day");
  const [yearPage, setYearPage] = React.useState(0);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasBeenModified, setHasBeenModified] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const [selectedFormat, setSelectedFormat] = React.useState<DateFormatKey>(
    config.dateFormat || "DD/MM/YYYY",
  );
  const [typedDate, setTypedDate] = useState<string>("");
  const [inputDay, setInputDay] = useState<number | null>(null);
  const [inputMonth, setInputMonth] = useState<number | null>(null);
  const [inputYear, setInputYear] = useState<number | null>(null);
  const [count, setCount] = useState(-1);
  const format = dateFormat?.toLowerCase() ?? "MM-DD-YYYY";
  const parts = React.useMemo(() => parseFormat(format), [format]);
  const [monthName, setMonthName] = useState<string | null>(null);
  const refs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const typedBuffer = React.useRef("");
  const buffers = React.useRef<{
    day: string;
    month: string;
    year: string;
    monthName: string;
  }>({
    day: "",
    month: "",
    year: "",
    monthName: "",
  });

  const shouldOpenCalender = !(
    !inputDay &&
    (!inputMonth || !monthName) &&
    !inputYear
  );

  const clamp = (num: number, min: number, max: number, state?: "year") => {
    if (num > max) return state == "year" ? MIN_YEAR : min;
    if (num < min) return max;
    return num;
  };

  const timeZone = "Asia/Kolkata";
  const getZonedNow = () => toZonedTime(new Date(), timeZone);

  const MIN_YEAR = 1900;
  const MAX_YEAR = 2099;
  const YEARS_PER_PAGE = 16;
  const TOTAL_YEARS = MAX_YEAR - MIN_YEAR + 1;
  const TOTAL_PAGES = Math.ceil(TOTAL_YEARS / YEARS_PER_PAGE);

  const fontSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const currentFormatConfig = DATE_FORMATS[selectedFormat];

  React.useEffect(() => {
    const currentYear = toZonedTime(month, timeZone).getFullYear();
    const pageIndex = Math.floor((currentYear - MIN_YEAR) / YEARS_PER_PAGE);
    setYearPage(Math.max(0, Math.min(pageIndex, TOTAL_PAGES - 1)));
  }, [month]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setView("day");
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const parseInputDate = (inputValue: string): Date | null => {
    try {
      const parsedDate = parse(
        inputValue,
        currentFormatConfig.format,
        new Date(),
      );

      if (isValid(parsedDate)) {
        return parsedDate;
      }

      if (
        selectedFormat === "Month DD, YYYY" ||
        selectedFormat === "DD Month YYYY"
      ) {
        const formats = [
          currentFormatConfig.format,
          selectedFormat === "Month DD, YYYY" ? "MMM dd, yyyy" : "dd MMM yyyy",
          selectedFormat === "Month DD, YYYY" ? "MMMM d, yyyy" : "d MMMM yyyy",
          selectedFormat === "Month DD, YYYY" ? "MMM d, yyyy" : "d MMM yyyy",
        ];

        for (const format of formats) {
          const parsed = parse(inputValue, format, new Date());
          if (isValid(parsed)) {
            return parsed;
          }
        }
      }

      return null;
    } catch {
      return null;
    }
  };

  const { handleDateInput } = useDateInput({
    config,
    setDate,
    parts,
    refs,
    setInputDay,
    setInputMonth,
    setInputYear,
    setMonthName,
    setCount,
    setErrors,
    buffers,
    fieldName,
    typedBuffer,
    error,
    clamp,
    onChange,
    parseInputDate,
    inputDay,
    inputMonth,
    inputYear,
    monthName,
  });

  const renderPart = (part: DateFormatPart, index: number) => {
    if (part.type === "separator") {
      return part.value;
    }

    const value =
      part.type === "day"
        ? inputDay === null
          ? (String(part.value) ?? "dd")
          : String(inputDay).padStart(2, "0")
        : part.type === "month"
          ? inputMonth === null
            ? (String(part.value) ?? "mm")
            : String(inputMonth).padStart(2, "0")
          : part.type === "year"
            ? inputYear === null
              ? (String(part.value) ?? "yyyy")
              : String(inputYear).padStart(4, "0")
            : part.type === "monthName"
              ? monthName || "Month"
              : part.value || "Month";
    return (
      <div
        key={index}
        ref={(el) => {
          refs.current[part.type] = el;
        }}
        role="spinbutton"
        className={cn(
          "border-none focus-visible:outline-none",
          config.isDisabled == true || formConfig.viewMode == true
            ? "pointer-events-none "
            : "focus:bg-primary focus:!text-primary-foreground !pointer-events-auto  focus-visible:bg-primary focus-visible:!text-primary-foreground",
          part.type === "monthName" && "mr-2",
          part.type === "monthName" && index > 0 && " ml-2",
          value.startsWith("d") ||
            value.startsWith("mon") ||
            value.startsWith("mm") ||
            value.startsWith("DD") ||
            value.startsWith("Mon") ||
            value.startsWith("MM") ||
            value.startsWith("y") ||
            value.startsWith("Y")
            ? "text-[hsl(var(--disabled-placeholder))] font-light"
            : "text-[#31363f] font-medium",
        )}
        aria-label={part.type}
        aria-disabled={config.isDisabled || formConfig.viewMode}
        aria-valuemin={
          part.type === "day" ? 1 : part.type === "month" ? 1 : MIN_YEAR
        }
        aria-valuemax={
          part.type === "day" ? 31 : part.type === "month" ? 12 : MAX_YEAR
        }
        aria-valuenow={
          part.type === "day"
            ? (inputDay ?? 1)
            : part.type === "month"
              ? (inputMonth ?? 1)
              : (inputYear ?? MIN_YEAR)
        }
        onBlur={() => {
          let fullDate = "";
          typedBuffer.current = "";
          parts.forEach((p) => {
            if (p.type === "separator") {
              fullDate += p.value;
            } else if (p.type === "day") {
              fullDate += inputDay ? String(inputDay).padStart(2, "0") : "dd";
            } else if (p.type === "month") {
              fullDate += inputMonth
                ? String(inputMonth).padStart(2, "0")
                : "mm";
            } else if (p.type === "year") {
              fullDate += inputYear
                ? String(inputYear).padStart(4, "0")
                : "yyyy";
            } else if (p.type === "monthName") {
              fullDate += monthName ? String(monthName) : "Month";
            }
          });

          setTypedDate(fullDate);

          if (inputDay && (inputMonth || monthName) && inputYear) {
            const parsedDate = parseInputDate(fullDate);
            if (parsedDate) {
              const zonedDate = toZonedTime(parsedDate, timeZone);
              setDate(zonedDate);
              setMonth(zonedDate);
              setHasBeenModified(true);
              config.value = fullDate;

              onChange?.(zonedDate);

              setErrors?.((prev: any) => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
              });
            } else {
              setDate(undefined);
              onChange?.(undefined);
              config.value = undefined;
              validateDateOnBlur();
            }
          }
        }}
        aria-valuetext={value}
        tabIndex={config.isDisabled || formConfig.viewMode ? -1 : 0}
        onKeyDown={(e) => {
          if (config.isDisabled || formConfig.viewMode) {
            e.preventDefault();
            return;
          }
          switch (part.type) {
            case "day":
              handleDateInput(e, 1, 31, "day", 2);
              break;
            case "month":
              handleDateInput(e, 1, 12, "month", 2);
              break;
            case "year":
              handleDateInput(e, 1, MAX_YEAR, "year", 4, MIN_YEAR);
              break;
            case "monthName":
              handleDateInput(
                e,
                undefined as any,
                undefined as any,
                "monthName",
                undefined as any,
              );
              break;
          }
        }}
      >
        {value}
      </div>
    );
  };
  const isDateDisabled = (date: Date): boolean => {
    const {
      disableStartDate,
      disableEndDate,
      disabledYearIndexes,
      disableWeekends,
      disabledWeekdays,
      disablePastDates,
      disableFutureDates,
      disabledYearMonthPairs,
      disableToday,
      disableTomorrow,
      disableYesterday,
      allowedDateRange,
    } = calendarDisableConfig;

    if (allowedDateRange) {
      const { from, to } = allowedDateRange;
      if (isBefore(date, startOfDay(from)) || isAfter(date, startOfDay(to))) {
        return true;
      }
    }

    const day = date.getDay();
    const today = startOfDay(new Date());
    const tomorrow = startOfDay(addDays(today, 1));
    const yesterday = startOfDay(subDays(today, 1));

    if (
      (disableToday && isSameDay(date, today)) ||
      (disableTomorrow && isSameDay(date, tomorrow)) ||
      (disableYesterday && isSameDay(date, yesterday))
    ) {
      return true;
    }

    if (
      disableStartDate instanceof Date &&
      disableEndDate instanceof Date &&
      isWithinInterval(startOfDay(date), {
        start: startOfDay(disableStartDate),
        end: startOfDay(disableEndDate),
      })
    ) {
      return true;
    }

    if (disabledWeekdays?.includes(day)) {
      return true;
    }

    if (disableWeekends && (day === 0 || day === 6)) {
      return true;
    }

    if (disabledYearIndexes?.includes(date.getFullYear())) {
      return true;
    }

    if (disablePastDates && startOfDay(date) < startOfDay(disablePastDates)) {
      return true;
    }

    if (
      disableFutureDates &&
      startOfDay(date) > startOfDay(disableFutureDates)
    ) {
      return true;
    }

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    if (
      disabledYearMonthPairs?.some(
        ({ year, month }: { year: number; month: number }) =>
          year === currentYear && month === currentMonth,
      )
    ) {
      return true;
    }

    return false;
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    const zonedDate = selectedDate
      ? toZonedTime(selectedDate, timeZone)
      : undefined;
    setDate(zonedDate);
    if (zonedDate) {
      setMonth(zonedDate);
      setHasBeenModified(true);
      setTypedDate(formatDate(zonedDate, currentFormatConfig.format));
      const day = zonedDate.getDate().toString().padStart(2, "0");
      const month = (zonedDate.getMonth() + 1).toString().padStart(2, "0");
      const monthIndex = zonedDate.getMonth();
      const year = zonedDate.getFullYear().toString();

      if (
        selectedFormat.includes("Month") ||
        selectedFormat.includes("month")
      ) {
        setMonthName(monthNames[monthIndex]);
      }
      setInputDay(Number(day));
      setInputMonth(Number(month));
      setInputYear(Number(year));
      config.value =
        formatDate(zonedDate!, currentFormatConfig.format) + "date2";
    } else {
      setTypedDate("");
      setInputDay(null);
      setInputMonth(null);
      setInputYear(null);
      config.value = undefined;
    }
    onChange?.(zonedDate);
    setIsOpen(false);
    setView("day");
    setIsFocused(false);
  };

  const handlePresetClick = (presetDate: Date) => {
    const zonedDate = toZonedTime(presetDate, timeZone);
    const day = zonedDate.getDate().toString().padStart(2, "0");
    const month = (zonedDate.getMonth() + 1).toString().padStart(2, "0");
    const monthIndex = zonedDate.getMonth();
    const year = zonedDate.getFullYear().toString();

    if (selectedFormat.includes("Month") || selectedFormat.includes("month")) {
      setMonthName(monthNames[monthIndex]);
    }
    setInputDay(Number(day));
    setInputMonth(Number(month));
    setInputYear(Number(year));
    setTypedDate(formatDate(zonedDate, currentFormatConfig.format));
    setView("day");
    setDate(zonedDate);
    setMonth(zonedDate);
    setHasBeenModified(true);
    onChange?.(zonedDate);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleFocus = () => {
    if (!config.isDisabled && !formConfig.viewMode) {
      setIsFocused(true);
      setIsHovered(false);
      onFocus?.();
      if (inputRef.current) {
        inputRef.current.select();
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleBlur = () => {
    onBlur?.();
    validateYearRange();
    setIsFocused(false);
    validateDateOnBlur();
  };

  const handleClear = () => {
    setDate(undefined);
    setTypedDate("");
    onChange?.(undefined);
    inputRef.current?.focus();
    setIsFocused(false);
    setHasBeenModified(false);
    setErrors?.((prev: any) => ({ ...prev, [fieldName]: "" }));
  };

  const handleFormatChange = (newFormat: DateFormatKey) => {
    setSelectedFormat(newFormat);

    if (date) {
      const newFormatConfig = DATE_FORMATS[newFormat];
      setTypedDate(
        formatDate(toZonedTime(date, timeZone), newFormatConfig.format),
      );
    }
  };

  const now = getZonedNow();

  const presetOptions = [
    {
      label: "Today",
      getValue: () => now,
      disabled: calendarDisableConfig?.disableToday,
    },
    {
      label: "Yesterday",
      getValue: () => subDays(now, 1),
      disabled: calendarDisableConfig?.disableYesterday,
    },
    {
      label: "Tomorrow",
      getValue: () => addDays(now, 1),
      disabled: calendarDisableConfig?.disableTomorrow,
    },
    {
      label: "Start of Quarter",
      getValue: () => startOfQuarter(now),
    },
    {
      label: "End of Quarter",
      getValue: () => endOfQuarter(now),
    },
    {
      label: "Start of Year",
      getValue: () => startOfYear(now),
    },
    {
      label: "End of Year",
      getValue: () => endOfYear(now),
    },
  ];

  const isMonthFullyDisabled = (year: number, monthIndex: number): boolean => {
    const startDate = startOfMonth(new Date(year, monthIndex, 1));
    const endDate = endOfMonth(startDate);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    return days.every((day) => isDateDisabled(day));
  };

  const isYearFullyDisabled = (year: number): boolean => {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      if (!isMonthFullyDisabled(year, monthIndex)) {
        return false;
      }
    }
    return true;
  };

  const validateDateOnBlur = () => {
    setErrors?.((prev: any) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });

    if (!typedDate) return;
    if (inputDay && (inputMonth || monthName) && inputYear) {
      const parsedDate = parseInputDate(typedDate);
      if (!parsedDate || parsedDate == null) {
        setErrors?.((prev: any) => ({
          ...prev,
          [fieldName]: `Please enter a valid date`,
        }));
        return;
      }
    } else {
      setErrors?.((prev: any) => ({
        ...prev,
        [fieldName]: `Please enter/select valid Date of Birth`,
      }));
    }
  };

  const validateYearRange = () => {
    if (!typedDate) return;

    const parsedDate = parseInputDate(typedDate);
    if (parsedDate) {
      const year = parsedDate.getFullYear();
      if (year < MIN_YEAR || year > MAX_YEAR) {
        setErrors?.((prev: any) => ({
          ...prev,
          [fieldName]: `Please enter a year between ${MIN_YEAR} and ${MAX_YEAR}`,
        }));
      } else {
        setErrors?.((prev: any) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    }
  };

  const displayValue = date
    ? formatDate(toZonedTime(date, timeZone), currentFormatConfig.format)
    : "";
  const isVisible = true;
  if (!isVisible) return null;

  if (formConfig.layout.labelPosition === "left") {
    return (
      <div className=" flex items-center flex-row gap-4">
        <div
          className={cn(
            "w-1/3 relative my-auto",
            error && "pt-0",
            formConfig.viewMode && "pt-0",
          )}
        >
          <CalendarLabelElement
            config={config}
            formConfig={formConfig}
            hasBeenModified={hasBeenModified}
            fontSizeClasses={fontSizeClasses}
            allowFormatChange={allowFormatChange}
            selectedFormat={selectedFormat}
            handleFormatChange={handleFormatChange}
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="">
            <div className="relative">
              <CalenderlabelRightElement
                config={config}
                formConfig={formConfig}
                isFocused={isFocused}
                displayValue={displayValue}
                handleClear={handleClear}
              />
            </div>
            <CalendarInputElement
              config={config}
              formConfig={formConfig}
              isHovered={isHovered}
              isFocused={isFocused}
              className={className}
              inputDay={inputDay}
              inputMonth={inputMonth}
              inputYear={inputYear}
              monthName={monthName}
              typedBuffer={typedBuffer}
              setIsHovered={setIsHovered}
              setIsFocused={setIsFocused}
              handleBlur={handleBlur}
              setIsOpen={setIsOpen}
              displayValue={displayValue}
              error={error}
              fontSizeClasses={fontSizeClasses}
              handleFocus={handleFocus}
              parts={parts}
              renderPart={renderPart}
              isOpen={isOpen}
              shouldOpenCalender={shouldOpenCalender}
              view={view}
              month={month}
              date={date}
              timeZone={timeZone}
              MIN_YEAR={MIN_YEAR}
              MAX_YEAR={MAX_YEAR}
              yearPage={yearPage}
              YEARS_PER_PAGE={YEARS_PER_PAGE}
              TOTAL_PAGES={TOTAL_PAGES}
              weekStartsOn={calendarDisableConfig.weekStartsOn}
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
            {error && (
              <div
                id={`${config.id}-error`}
                className="flex items-center text-destructive gap-1 pt-[2px] text-[12px]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33416 6.66602H8.6675V9.99935H7.33416V6.66602ZM7.3335 10.666H8.66683V11.9993H7.3335V10.666Z"
                    fill="#E53D3D"
                  />
                  <path
                    d="M9.17888 2.7998C8.94688 2.36313 8.49488 2.0918 8.00022 2.0918C7.50555 2.0918 7.05355 2.36313 6.82155 2.80046L1.92955 12.0425C1.82125 12.2455 1.76763 12.4732 1.77394 12.7032C1.78025 12.9332 1.84628 13.1577 1.96555 13.3545C2.08315 13.5522 2.2504 13.7158 2.45072 13.829C2.65103 13.9422 2.87746 14.0011 3.10755 13.9998H12.8929C13.3649 13.9998 13.7922 13.7585 14.0355 13.3545C14.1548 13.1577 14.2208 12.9332 14.2272 12.7032C14.2335 12.4732 14.1798 12.2455 14.0715 12.0425L9.17888 2.7998ZM3.10755 12.6665L8.00022 3.42446L12.8962 12.6665H3.10755Z"
                    fill="#E53D3D"
                  />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const errorElement = error && (
    <div className="flex items-center gap-1 text-[#E53D3D] text-xs font-medium inter">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.5"
        height="15.5"
        viewBox="0 0 16 16"
        fill="none"
        className="mb-[3px]"
      >
        <path
          d="M7.33416 6.66602H8.6675V9.99935H7.33416V6.66602ZM7.3335 10.666H8.66683V11.9993H7.3335V10.666Z"
          fill="#E53D3D"
        />
        <path
          d="M9.17888 2.7998C8.94688 2.36313 8.49488 2.0918 8.00022 2.0918C7.50555 2.0918 7.05355 2.36313 6.82155 2.80046L1.92955 12.0425C1.82125 12.2455 1.76763 12.4732 1.77394 12.7032C1.78025 12.9332 1.84628 13.1577 1.96555 13.3545C2.08315 13.5522 2.2504 13.7158 2.45072 13.829C2.65103 13.9422 2.87746 14.0011 3.10755 13.9998H12.8929C13.3649 13.9998 13.7922 13.7585 14.0355 13.3545C14.1548 13.1577 14.2208 12.9332 14.2272 12.7032C14.2335 12.4732 14.1798 12.2455 14.0715 12.0425L9.17888 2.7998ZM3.10755 12.6665L8.00022 3.42446L12.8962 12.6665H3.10755Z"
          fill="#E53D3D"
        />
      </svg>
      {error}
    </div>
  );

  return (
    <div className="space-y-1 relative">
      <CalendarLabelElement
        config={config}
        formConfig={formConfig}
        hasBeenModified={hasBeenModified}
        fontSizeClasses={fontSizeClasses}
        allowFormatChange={allowFormatChange}
        selectedFormat={selectedFormat}
        handleFormatChange={handleFormatChange}
      />
      <CalendarInputElement
        config={config}
        formConfig={formConfig}
        isHovered={isHovered}
        isFocused={isFocused}
        className={className}
        inputDay={inputDay}
        inputMonth={inputMonth}
        inputYear={inputYear}
        monthName={monthName}
        typedBuffer={typedBuffer}
        setIsHovered={setIsHovered}
        setIsFocused={setIsFocused}
        handleBlur={handleBlur}
        setIsOpen={setIsOpen}
        displayValue={displayValue}
        error={error}
        fontSizeClasses={fontSizeClasses}
        handleFocus={handleFocus}
        parts={parts}
        renderPart={renderPart}
        isOpen={isOpen}
        shouldOpenCalender={shouldOpenCalender}
        view={view}
        month={month}
        date={date}
        timeZone={timeZone}
        MIN_YEAR={MIN_YEAR}
        MAX_YEAR={MAX_YEAR}
        yearPage={yearPage}
        YEARS_PER_PAGE={YEARS_PER_PAGE}
        TOTAL_PAGES={TOTAL_PAGES}
        weekStartsOn={calendarDisableConfig.weekStartsOn}
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
      {errorElement}
    </div>
  );
}
