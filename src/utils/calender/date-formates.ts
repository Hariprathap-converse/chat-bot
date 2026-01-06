export const DATE_FORMATS = {
  "MM/DD/YYYY": {
    format: "MM/dd/yyyy",
    placeholder: "mm/dd/yyyy",
    separator: "/",
    pattern: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 2)
        cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
      if (cleaned.length >= 5)
        cleaned = cleaned.slice(0, 5) + "/" + cleaned.slice(5, 9);
      return cleaned;
    },
    parseOrder: ["month", "day", "year"] as const,
  },
  "DD/MM/YYYY": {
    format: "dd/MM/yyyy",
    placeholder: "dd/mm/yyyy",
    separator: "/",
    pattern: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 2)
        cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
      if (cleaned.length >= 5)
        cleaned = cleaned.slice(0, 5) + "/" + cleaned.slice(5, 9);
      return cleaned;
    },
    parseOrder: ["day", "month", "year"] as const,
  },
  "YYYY/MM/DD": {
    format: "yyyy/MM/dd",
    placeholder: "yyyy/mm/dd",
    separator: "/",
    pattern: /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 4)
        cleaned = cleaned.slice(0, 4) + "/" + cleaned.slice(4);
      if (cleaned.length >= 7)
        cleaned = cleaned.slice(0, 7) + "/" + cleaned.slice(7, 9);
      return cleaned;
    },
    parseOrder: ["year", "month", "day"] as const,
  },
  "Month DD, YYYY": {
    format: "MMMM dd, yyyy",
    placeholder: "Month DD, YYYY",
    separator: " ",
    pattern: /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/,
    autoFormat: (value: string) => value, // No auto-formatting for text months
    parseOrder: ["month", "day", "year"] as const,
  },
  "DD Month YYYY": {
    format: "dd MMMM yyyy",
    placeholder: "DD Month YYYY",
    separator: " ",
    pattern: /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/,
    autoFormat: (value: string) => value, // No auto-formatting for text months
    parseOrder: ["day", "month", "year"] as const,
  },
  "DD-MM-YYYY": {
    format: "dd-MM-yyyy",
    placeholder: "dd-mm-yyyy",
    separator: "-",
    pattern: /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 2)
        cleaned = cleaned.slice(0, 2) + "-" + cleaned.slice(2);
      if (cleaned.length >= 5)
        cleaned = cleaned.slice(0, 5) + "-" + cleaned.slice(5, 9);
      return cleaned;
    },
    parseOrder: ["day", "month", "year"] as const,
  },
  "YYYY-MM-DD": {
    format: "yyyy-MM-dd",
    placeholder: "yyyy-mm-dd",
    separator: "-",
    pattern: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 4)
        cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
      if (cleaned.length >= 7)
        cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7, 9);
      return cleaned;
    },
    parseOrder: ["year", "month", "day"] as const,
  },
  "MM-DD-YYYY": {
    format: "MM-dd-yyyy",
    placeholder: "mm-dd-yyyy",
    separator: "-",
    pattern: /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 2)
        cleaned = cleaned.slice(0, 2) + "-" + cleaned.slice(2);
      if (cleaned.length >= 5)
        cleaned = cleaned.slice(0, 5) + "-" + cleaned.slice(5, 9);
      return cleaned;
    },
    parseOrder: ["month", "day", "year"] as const,
  },
  "YYYY.MM.DD": {
    format: "yyyy.MM.dd",
    placeholder: "yyyy.mm.dd",
    separator: ".",
    pattern: /^(\d{4})\.(\d{1,2})\.(\d{1,2})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 4)
        cleaned = cleaned.slice(0, 4) + "." + cleaned.slice(4);
      if (cleaned.length >= 7)
        cleaned = cleaned.slice(0, 7) + "." + cleaned.slice(7, 9);
      return cleaned;
    },
    parseOrder: ["year", "month", "day"] as const,
  },
  "DD.MM.YYYY": {
    format: "dd.MM.yyyy",
    placeholder: "dd.mm.yyyy",
    separator: ".",
    pattern: /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 2)
        cleaned = cleaned.slice(0, 2) + "." + cleaned.slice(2);
      if (cleaned.length >= 5)
        cleaned = cleaned.slice(0, 5) + "." + cleaned.slice(5, 9);
      return cleaned;
    },
    parseOrder: ["day", "month", "year"] as const,
  },
  "MM.DD.YYYY": {
    format: "MM.dd.yyyy",
    placeholder: "mm.dd.yyyy",
    separator: ".",
    pattern: /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/,
    autoFormat: (value: string) => {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 2)
        cleaned = cleaned.slice(0, 2) + "." + cleaned.slice(2);
      if (cleaned.length >= 5)
        cleaned = cleaned.slice(0, 5) + "." + cleaned.slice(5, 9);
      return cleaned;
    },
    parseOrder: ["month", "day", "year"] as const,
  },
} as const;

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
