import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CellTypeConfig } from "./types";

// Text Cell Renderer
export const renderTextCell = (value: any) => {
  return (
    <span className="text-foreground/90 font-normal text-sm">
      {String(value)}
    </span>
  );
};

// Number Cell Renderer
export const renderNumberCell = (value: any) => {
  const numValue =
    typeof value === "number" ? value : parseFloat(String(value));
  return (
    <span className="text-foreground/90 font-normal text-sm tabular-nums">
      {isNaN(numValue) ? String(value) : numValue.toLocaleString()}
    </span>
  );
};

// Badge Cell Renderer
export const renderBadgeCell = (value: any, config?: CellTypeConfig) => {
  const stringValue = String(value);

  // Check if it's a trend value (starts with + or -)
  const isTrend = stringValue.startsWith("+") || stringValue.startsWith("-");
  const isPositive = stringValue.startsWith("+");

  if (isTrend) {
    return (
      <Badge
        variant="outline"
        className={cn(
          "font-semibold text-xs px-2 py-0.5 gap-1",
          isPositive
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
            : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800",
        )}
      >
        {isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        {stringValue}
      </Badge>
    );
  }

  // Use color map if provided
  if (config?.colorMap && config.colorMap[stringValue]) {
    const colors = config.colorMap[stringValue];
    return (
      <Badge
        variant="outline"
        className="text-xs px-2 py-0.5"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          borderColor: colors.border,
        }}
      >
        {stringValue}
      </Badge>
    );
  }

  // Default badge variant
  const variant = config?.variant || "default";
  const variantClasses = {
    default:
      "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-400",
    success:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400",
    warning:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400",
    error:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-400",
    info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400",
  };

  return (
    <Badge
      variant="outline"
      className={cn("text-xs px-2 py-0.5", variantClasses[variant])}
    >
      {stringValue}
    </Badge>
  );
};

// Currency Cell Renderer
export const renderCurrencyCell = (value: any, config?: CellTypeConfig) => {
  const currency = config?.currency || "USD";
  const locale = config?.locale || "en-US";

  // Extract numeric value
  let numValue: number;
  if (typeof value === "number") {
    numValue = value;
  } else {
    const cleaned = String(value).replace(/[^0-9.-]/g, "");
    numValue = parseFloat(cleaned);
  }

  if (isNaN(numValue)) {
    return (
      <span className="text-foreground/90 font-normal text-sm">
        {String(value)}
      </span>
    );
  }

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(numValue);

  return (
    <span className="text-foreground/90 font-medium text-sm tabular-nums">
      {formatted}
    </span>
  );
};

// Date Cell Renderer
export const renderDateCell = (value: any, config?: CellTypeConfig) => {
  const format = config?.format || "short";

  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else {
    date = new Date(String(value));
  }

  if (isNaN(date.getTime())) {
    return (
      <span className="text-foreground/90 font-normal text-sm">
        {String(value)}
      </span>
    );
  }

  let formatted: string;

  switch (format) {
    case "short":
      formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      break;
    case "long":
      formatted = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      break;
    case "relative":
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) formatted = "Today";
      else if (diffDays === 1) formatted = "Yesterday";
      else if (diffDays < 7) formatted = `${diffDays} days ago`;
      else if (diffDays < 30)
        formatted = `${Math.floor(diffDays / 7)} weeks ago`;
      else if (diffDays < 365)
        formatted = `${Math.floor(diffDays / 30)} months ago`;
      else formatted = `${Math.floor(diffDays / 365)} years ago`;
      break;
    default:
      formatted = date.toLocaleDateString();
  }

  return (
    <span className="text-foreground/90 font-normal text-sm">{formatted}</span>
  );
};

// Avatar Cell Renderer
export const renderAvatarCell = (value: any) => {
  const stringValue = String(value);
  const initials = stringValue
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
        {initials}
      </div>
      <span className="font-normal text-foreground text-sm">{stringValue}</span>
    </div>
  );
};

// Status Cell Renderer
export const renderStatusCell = (value: any, config?: CellTypeConfig) => {
  const stringValue = String(value);

  const defaultStatusColors: Record<
    string,
    { bg: string; text: string; icon: string }
  > = {
    active: {
      bg: "bg-emerald-50 dark:bg-emerald-950",
      text: "text-emerald-700 dark:text-emerald-400",
      icon: "●",
    },
    inactive: {
      bg: "bg-slate-50 dark:bg-slate-950",
      text: "text-slate-700 dark:text-slate-400",
      icon: "●",
    },
    pending: {
      bg: "bg-amber-50 dark:bg-amber-950",
      text: "text-amber-700 dark:text-amber-400",
      icon: "◐",
    },
    completed: {
      bg: "bg-blue-50 dark:bg-blue-950",
      text: "text-blue-700 dark:text-blue-400",
      icon: "✓",
    },
    failed: {
      bg: "bg-rose-50 dark:bg-rose-950",
      text: "text-rose-700 dark:text-rose-400",
      icon: "✗",
    },
  };

  const statusColors = config?.statusColors || defaultStatusColors;
  const status = statusColors[stringValue.toLowerCase()] || statusColors.active;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium",
        status.bg,
        status.text,
      )}
    >
      <span>{status.icon}</span>
      <span>{stringValue}</span>
    </div>
  );
};

// Progress Cell Renderer
export const renderProgressCell = (value: any, config?: CellTypeConfig) => {
  const max = config?.max || 100;
  const showPercentage = config?.showPercentage !== false;

  let numValue: number;
  if (typeof value === "number") {
    numValue = value;
  } else {
    const cleaned = String(value).replace(/[^0-9.]/g, "");
    numValue = parseFloat(cleaned);
  }

  if (isNaN(numValue)) {
    return (
      <span className="text-foreground/90 font-normal text-sm">
        {String(value)}
      </span>
    );
  }

  const percentage = (numValue / max) * 100;

  return (
    <div className="flex items-center gap-2 w-[80%]">
      <Progress value={percentage} className="h-2 flex-1" />
      {showPercentage && (
        <span className="text-xs text-muted-foreground font-medium min-w-[3ch] tabular-nums">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

// Link Cell Renderer
export const renderLinkCell = (value: any, config?: CellTypeConfig) => {
  const stringValue = String(value);
  const openInNewTab = config?.openInNewTab !== false;
  const showIcon = config?.showIcon !== false;

  return (
    <a
      href={stringValue}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className="text-primary hover:underline font-normal text-sm inline-flex items-center gap-1"
    >
      {stringValue}
      {showIcon && openInNewTab && <ExternalLink className="h-3 w-3" />}
    </a>
  );
};

// Cell Renderer Factory
export const renderCell = (
  value: any,
  cellType?: string,
  config?: CellTypeConfig,
) => {
  switch (cellType) {
    case "badge":
      return renderBadgeCell(value, config);
    case "currency":
      return renderCurrencyCell(value, config);
    case "date":
      return renderDateCell(value, config);
    case "avatar":
      return renderAvatarCell(value);
    case "status":
      return renderStatusCell(value, config);
    case "progress":
      return renderProgressCell(value, config);
    case "link":
      return renderLinkCell(value, config);
    case "number":
      return renderNumberCell(value);
    case "text":
    default:
      return renderTextCell(value);
  }
};
