import { DATE_FORMATS } from "@/utils/calender/date-formates";
import { FormConfig } from "./form-config.type";

export interface CalendarFieldConfig {
  tableId: string;
  id: string;
  fieldId?: string;
  rowId?: string;
  name: string;
  label: string;
  type: "calendar";
  value: string | undefined;
  placeholder?: string;
  helperText?: string;
  isDisabled?: boolean;
  format?: string;
  dateFormat?: DateFormatKey;
  isRequired: {
    value: boolean;
    message?: string;
  };
  behavior: {
    copyPasteRestriction: boolean;
  };

  calenderConfig?: {
    disableToday?: boolean;
    disableTomorrow?: boolean;
    disableYesterday?: boolean;
    disableStartDate?: Date;
    disableEndDate?: Date;
    disabledYearIndexes?: number[];
    disableWeekends?: boolean;
    disabledWeekdays?: number[];
    weekStartsOn?: number;
    disablePastDates?: Date;
    disableFutureDates?: Date;
    disabledYearMonthPairs?: Array<{ year: number; month: number }>;
    allowedDateRange?: {
      from: Date;
      to: Date;
    };
  };
  autoPopulate?: {
    defaultValue?: string;
    autofill: boolean;
  };
}

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabledWeekDays?: string[];
  weekStartsOn?: any;
  calendarDisableConfig: CalendarDisableConfig;
}

export interface CalendarDisableConfig {
  disableStartDate: Date;
  disableEndDate: Date;
  disabledYearIndexes: number[];
  disableWeekends: boolean;
  disabledWeekdays: number[];
  weekStartsOn: number;
  disablePastDates: Date;
  disableFutureDates: Date;
  disabledYearMonthPairs: { year: number; month: number }[];
  disableToday?: boolean;
  disableTomorrow?: boolean;
  disableYesterday?: boolean;
  allowedDateRange?: { from: Date; to: Date };
}

export type DateFormatKey = keyof typeof DATE_FORMATS;

export interface CalenderProps {
  config: CalendarFieldConfig;
  formConfig: FormConfig;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  className?: string;
  formValues?: Record<string, any>;
  calendarDisableConfig?: any;
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  fieldName: string;
  allowFormatChange?: boolean;
  dateFormat?: DateFormatKey;
}

export type DateFormatPart = {
  type: "day" | "month" | "year" | "monthName" | "separator";
  value: string;
};

export interface CalendarHeaderProps {
  view: "day" | "month" | "year";
  month: Date;
  timeZone: string;
  MIN_YEAR: number;
  MAX_YEAR: number;
  yearPage: number;
  YEARS_PER_PAGE: number;
  TOTAL_PAGES: number;
  setMonth: (date: Date) => void;
  setYearPage: React.Dispatch<React.SetStateAction<number>>;
  setView: (view: "day" | "month" | "year") => void;
}

export interface InputElementProps extends CalendarElementProps {
  config: CalendarFieldConfig;
  formConfig: FormConfig;
  isHovered: boolean;
  isFocused: boolean;
  className: any;
  inputDay: number | null;
  inputMonth: number | null;
  inputYear: number | null;
  monthName: string | null;
  typedBuffer: React.MutableRefObject<string>;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  handleBlur: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayValue: string;
  error: string | undefined;
  fontSizeClasses: {
    small: string;
    medium: string;
    large: string;
  };
  handleFocus: () => void;
  parts: DateFormatPart[];
  renderPart: (
    part: DateFormatPart,
    index: number,
  ) => string | React.JSX.Element;
  isOpen: boolean;
  shouldOpenCalender: boolean;
}

export interface LabelRightElementProps {
  config: CalendarFieldConfig;
  formConfig: FormConfig;
  displayValue: string;
  isFocused: any;
  handleClear: any;
}

export interface LabelElementProps {
  config: CalendarFieldConfig;
  formConfig: FormConfig;
  hasBeenModified: boolean;
  fontSizeClasses: {
    small: string;
    medium: string;
    large: string;
  };
  allowFormatChange: boolean;
  selectedFormat:
    | "Month DD, YYYY"
    | "DD Month YYYY"
    | "MM/DD/YYYY"
    | "DD/MM/YYYY"
    | "YYYY/MM/DD"
    | "DD-MM-YYYY"
    | "YYYY-MM-DD"
    | "MM-DD-YYYY"
    | "YYYY.MM.DD"
    | "DD.MM.YYYY"
    | "MM.DD.YYYY";
  handleFormatChange: (
    newFormat:
      | "Month DD, YYYY"
      | "DD Month YYYY"
      | "MM/DD/YYYY"
      | "DD/MM/YYYY"
      | "YYYY/MM/DD"
      | "DD-MM-YYYY"
      | "YYYY-MM-DD"
      | "MM-DD-YYYY"
      | "YYYY.MM.DD"
      | "DD.MM.YYYY"
      | "MM.DD.YYYY",
  ) => void;
}

export interface CalendarMonthGridProps {
  month: Date;
  date?: Date;
  timeZone: string;
  getZonedNow: () => Date;
  setMonth: (date: Date) => void;
  setView: (view: "day" | "month" | "year") => void;
  isMonthFullyDisabled: (year: number, month: number) => boolean;
}

export interface CalendarYearGridProps {
  month: Date;
  date?: Date;
  timeZone: string;
  MIN_YEAR: number;
  MAX_YEAR: number;
  yearPage: number;
  YEARS_PER_PAGE: number;
  getZonedNow: () => Date;
  setMonth: (date: Date) => void;
  setView: (view: "day" | "month" | "year") => void;
  isYearFullyDisabled: (year: number) => boolean;
}

export interface CalendarElementProps {
  view: "day" | "month" | "year";
  month: Date;
  date?: Date;
  timeZone: string;
  MIN_YEAR: number;
  MAX_YEAR: number;
  yearPage: number;
  YEARS_PER_PAGE: number;
  TOTAL_PAGES: number;
  weekStartsOn: any;
  setYearPage: React.Dispatch<React.SetStateAction<number>>;
  getZonedNow: () => Date;
  setMonth: (date: Date) => void;
  setView: (view: "day" | "month" | "year") => void;
  isMonthFullyDisabled: (year: number, month: number) => boolean;
  isYearFullyDisabled: (year: number) => boolean;
  isDateDisabled: (date: Date) => boolean;
  handlePresetClick: (presetDate: Date) => void;
  handleDateSelect: (selectedDate: Date | undefined) => void;
  presetOptions: (
    | {
        label: string;
        getValue: () => Date;
        disabled: any;
      }
    | {
        label: string;
        getValue: () => Date;
        disabled?: undefined;
      }
  )[];
}
