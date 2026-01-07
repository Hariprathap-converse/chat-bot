import {
  GroupedOption,
  Option,
  OptionOrGroup,
} from "@/types/components/select-config.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToElement = (
  container: HTMLElement,
  element: HTMLElement,
  duration: number = 500,
  offset: number = 0,
) => {
  const containerTop = container.scrollTop;
  const elementTop = element.offsetTop - offset;
  const distance = elementTop - containerTop;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    container.scrollTop = containerTop + distance * ease;

    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export function toCapitalCase(input?: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isGroupedOption(option: OptionOrGroup): option is GroupedOption {
  return typeof option === "object" && option !== null && "items" in option;
}

export function normalizeOptions(options: OptionOrGroup[]): OptionOrGroup[] {
  return options
    .filter(
      (option): option is OptionOrGroup =>
        !!option && typeof option === "object",
    )
    .map((option) => {
      if (isGroupedOption(option)) {
        return {
          ...option,
          group: toCapitalCase(option.group ?? ""),
          items: Array.isArray(option.items)
            ? option.items
                .filter(
                  (item): item is Option =>
                    !!item && typeof item === "object" && "value" in item,
                )
                .map((item) => ({
                  ...item,
                  value: toCapitalCase(item.value ?? ""),
                }))
            : [],
        };
      }

      if ("value" in option && typeof option.value === "string") {
        return {
          ...option,
          value: toCapitalCase(option.value),
        };
      }
      return option;
    });
}

export function normalizeMultiSelectValues(
  values: Option[] | Option,
): Option[] {
  return (Array.isArray(values) ? values : [])
    .filter(
      (item): item is Option =>
        !!item && typeof item === "object" && "id" in item && "value" in item,
    )
    .map((item) => ({
      ...item,
      value: toCapitalCase(item.value ?? ""),
    }));
}
