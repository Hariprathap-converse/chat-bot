import { DateFormatPart } from "@/types/components/calender";

export function parseFormat(format: string): DateFormatPart[] {
  const parts: DateFormatPart[] = [];
  const regex = /(yyyy|mm|dd|month|[^a-z]+)/gi;
  let match;

  while ((match = regex.exec(format)) !== null) {
    const val = match[0];
    if (/^dd$/i.test(val)) {
      parts.push({ type: "day", value: val });
    } else if (/^mm$/i.test(val)) {
      parts.push({ type: "month", value: val });
    } else if (/^month$/i.test(val)) {
      parts.push({ type: "monthName", value: val });
    } else if (/^yyyy$/i.test(val)) {
      parts.push({ type: "year", value: val });
    } else {
      parts.push({ type: "separator", value: val });
    }
  }

  return parts;
}
