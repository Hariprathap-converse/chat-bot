import { TableMetadata } from "@/types/table/table.type";

export interface ViewSelectProps {
  viewOptions: TableMetadata["view_options"];
  selectedView: string;
  onSelectedViewChange: (view: string) => void;
  defaultView: string;
  onDefaultViewChange: (view: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}