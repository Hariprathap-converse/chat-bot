export type CellType =
  | "text"
  | "badge"
  | "currency"
  | "date"
  | "avatar"
  | "status"
  | "progress"
  | "link"
  | "number";

export interface CellTypeConfig {
  // For badge
  variant?: "default" | "success" | "warning" | "error" | "info";
  colorMap?: Record<string, { bg: string; text: string; border: string }>;

  // For currency
  currency?: string; // 'USD', 'EUR', 'GBP', etc.
  locale?: string;

  // For date
  format?: "short" | "long" | "relative" | "custom";
  customFormat?: string;

  // For status
  iconMap?: Record<string, string>;
  statusColors?: Record<string, { bg: string; text: string; icon: string }>;

  // For progress
  max?: number;
  showPercentage?: boolean;
  colorThresholds?: { value: number; color: string }[];

  // For link
  openInNewTab?: boolean;
  showIcon?: boolean;
}

export interface ColumnConfig {
  accessorKey: string;
  header: string;
  type?: "number" | "string" | "date" | "boolean";
  defaultChartType?: "bar" | "line";
  width?: number;
  cellType?: CellType;
  cellConfig?: CellTypeConfig;
  sortable?: boolean;
  filterable?: boolean;
  description?: string;
  pinnable?: boolean;
}

export interface TableOptions {
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnPinning?: boolean;
  enableDensity?: boolean;
  defaultPageSize?: number;
  searchColumn?: string;
}

export interface TableConfig {
  title: string;
  description?: string;
  tableName?: string;
  tableDescription?: string;
  columns?: ColumnConfig[];
  data: Record<string, any>[];
  options?: TableOptions;
}
