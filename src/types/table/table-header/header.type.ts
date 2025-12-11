import { TableData } from "@/types/table/table.type";

export interface DynamicTableHeaderProps {
  viewOptions: TableData['view_options'];
  selectedView: string;
  onSelectedViewChange: (view: string) => void;
  defaultView: string;
  onDefaultViewChange: (view: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}