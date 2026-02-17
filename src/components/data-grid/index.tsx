"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  Download,
  X,
  Search,
  ListFilter,
  ArrowUpAz,
  Columns,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Filter as FilterIcon,
  PinOff,
  WandSparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { TableConfig } from "./types";
import { renderCell } from "./cell-renderers";
import { OperationModal } from "@/client/operation-modal";
import { ColumnSummaryModal } from "./column-summary-modal";

interface DataGridProps {
  config: TableConfig;
}

export function DataGrid({ config }: DataGridProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [density, setDensity] = React.useState<
    "compact" | "standard" | "comfortable"
  >("standard");
  const [columnPinning, setColumnPinning] = React.useState<{
    left?: string[];
    right?: string[];
  }>({
    left: ["select"],
    right: ["actions"],
  });
  const [confirmDialog, setConfirmDialog] = React.useState<{
    open: boolean;
    option: string;
    rowId: string;
  }>({ open: false, option: "", rowId: "" });
  const [summaryModal, setSummaryModal] = React.useState<{
    open: boolean;
    column: any | null;
  }>({ open: false, column: null });

  const handlePinColumn = React.useCallback(
    (columnId: string, position: "left" | "right" | false) => {
      setColumnPinning((prev) => {
        const newPinning = { ...prev };

        newPinning.left = (newPinning.left || []).filter(
          (id) => id !== columnId,
        );
        newPinning.right = (newPinning.right || []).filter(
          (id) => id !== columnId,
        );

        if (position === "left") {
          newPinning.left = [...(newPinning.left || []), columnId];
        } else if (position === "right") {
          newPinning.right = [...(newPinning.right || []), columnId];
        }

        return newPinning;
      });
    },
    [],
  );

  const handleActionClick = (option: string, rowId: string = "header") => {
    setConfirmDialog({ open: true, option, rowId });
  };

  const handleConfirm = () => {
    console.log(
      `Confirmed ${confirmDialog.option} for row ${confirmDialog.rowId}`,
    );
    // Add your action logic here
    setConfirmDialog({ open: false, option: "", rowId: "" });
  };

  const columns: ColumnDef<any>[] = React.useMemo(() => {
    const baseColumns: ColumnDef<any>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="border-muted-foreground/30 cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border-muted-foreground/30"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      ...(config.columns ?? []).map((col) => ({
        id: col.accessorKey,
        accessorKey: col.accessorKey,
        header: ({ column }: any) => {
          const isPinned = column.getIsPinned();
          const columnId = column.id;
          const isSorted = column.getIsSorted();

          return (
            <div className="flex items-center justify-between gap-2 group">
              <div className="flex items-center gap-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7  hover:bg-transparent   cursor-pointer"
                    >
                      <WandSparkles className="h-4 w-4 hover:text-primary cursor-pointer group-hover:text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40  bg-card rounded-[6px] border-none"
                  >

                    <DropdownMenuItem
                      onClick={() => handleActionClick("Option A", "header")}
                      className="text-sm cursor-pointer"
                    >
                      Option A
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleActionClick("Option B", "header")}
                      className="text-sm cursor-pointer"
                    >
                      Option B
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleActionClick("Option C", "header")}
                      className="text-sm cursor-pointer"
                    >
                      Option C
                    </DropdownMenuItem>
                    {col.type === 'number' && (
                      <DropdownMenuItem
                        onClick={() => setSummaryModal({ open: true, column: col })}
                        className="text-sm cursor-pointer gap-2"
                      >
                        Summarize
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <span>{col.header}</span>
                {isSorted && (
                  <div className="text-primary">
                    {isSorted === "asc" ? (
                      <ArrowUp className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDown className="h-3.5 w-3.5" />
                    )}
                  </div>
                )}
                {isPinned && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-muted ml-1"
                    onClick={() => handlePinColumn(columnId, false)}
                    title="Unpin column"
                  >
                    <PinOff className="h-3 w-3 text-muted-foreground" />
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 cursor-pointer p-0 hover:bg-muted opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 rounded-lg bg-card dark:bg-zinc-900"
                  >
                    <DropdownMenuItem
                      onClick={() => column.toggleSorting(false)}
                      className="gap-2 text-sm cursor-pointer"
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span>Ascending</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => column.toggleSorting(true)}
                      className="gap-2 text-sm cursor-pointer "
                    >
                      <ArrowDown className="h-4 w-4" />
                      <span>Descending</span>
                    </DropdownMenuItem>
                    {isSorted && (
                      <DropdownMenuItem
                        onClick={() => column.clearSorting()}
                        className="gap-2 text-sm cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                        <span>Clear Sorting</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                      <FilterIcon className="h-4 w-4" />
                      <span>Filter</span>
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        },
        cell: ({ row }: any) => {
          const value = row.getValue(col.accessorKey);
          return renderCell(value, col.cellType, col.cellConfig);
        },
        size: col.width || 150,
      })),
      // Actions column at the end
      {
        id: "actions",

        cell: ({ row }) => (
          <div className="flex items-center justify-center bg-transparent ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7  hover:bg-transparent   cursor-pointer"
                >
                  <WandSparkles className="h-4 w-4 hover:text-primary cursor-pointer group-hover:text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40  bg-card rounded-[6px] border-none"
              >
                <DropdownMenuItem
                  onClick={() => handleActionClick("Option A", row.id)}
                  className="text-sm cursor-pointer"
                >
                  Option A
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleActionClick("Option B", row.id)}
                  className="text-sm cursor-pointer"
                >
                  Option B
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleActionClick("Option C", row.id)}
                  className="text-sm cursor-pointer"
                >
                  Option C
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 60,
      },
    ];

    return baseColumns;
  }, [config.columns, handlePinColumn]);

  const table = useReactTable({
    data: config.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnPinning,
    },
  });

  const densityStyles = {
    compact: "!py-2 px-4",
    standard: "!py-3 px-4",
    comfortable: "!py-4 px-4",
  };

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <>
      <div className="flex items-center absolute top-5 bg-transparent  gap-3 mb-3">
        <h2 className="text-[20px] font-semibold text-foreground">
          {config.title || "Leaderboard"}
        </h2>
      </div>
      <div className="w-full max-h-full flex flex-col overflow-hidden">
        {/* Header - Attached to Table */}

        <div className="flex items-center justify-between gap-4 py-4 px-0 bg-transparent dark:bg-transparent backdrop-blur-md border-none rounded-b-[10px] shadow-none">
          <div className="flex items-center justify-between w-full gap-2">
            <div className="relative group ">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={
                  (table
                    .getColumn(config.options?.searchColumn || "employee")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(config.options?.searchColumn || "employee")
                    ?.setFilterValue(event.target.value)
                }
                className="pl-9 h-8 w-70 bg-card border-muted rounded-[8px] focus-visible:ring-1 focus-visible:ring-primary/20 text-sm"
              />
            </div>
            <div className="flex  gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                className="h-8 !px-6 gap-1.5 cursor-pointer  border-muted rounded-[8px] bg-card hover:bg-muted text-xs"
              >
                <ListFilter className="h-3.5 w-3.5" />
                Filter
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 !px-6 gap-1.5 cursor-pointer border-muted rounded-[8px] bg-card hover:bg-muted text-xs"
                  >
                    <ArrowUpAz className="h-3.5 w-3.5" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-[8px] bg-card w-44"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      // Sort all sortable columns ascending
                      const firstSortableColumn = table
                        .getAllColumns()
                        .find((col) => col.getCanSort());
                      if (firstSortableColumn) {
                        firstSortableColumn.toggleSorting(false);
                      }
                    }}
                    className="gap-2 text-sm cursor-pointer"
                  >
                    <ArrowUp className="h-4 w-4" />
                    <span>Sort Ascending</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      // Sort all sortable columns descending
                      const firstSortableColumn = table
                        .getAllColumns()
                        .find((col) => col.getCanSort());
                      if (firstSortableColumn) {
                        firstSortableColumn.toggleSorting(true);
                      }
                    }}
                    className="gap-2 text-sm cursor-pointer"
                  >
                    <ArrowDown className="h-4 w-4" />
                    <span>Sort Descending</span>
                  </DropdownMenuItem>
                  {sorting.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => table.resetSorting()}
                        className="gap-2 text-sm"
                      >
                        <X className="h-4 w-4" />
                        <span>Clear All Sorting</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 !px-6 gap-1.5  cursor-pointer border-muted rounded-[8px] bg-card hover:bg-muted text-xs"
                  >
                    <Columns className="h-3.5 w-3.5" />
                    Density
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-[8px] bg-card w-32"
                >
                  <DropdownMenuItem
                    onClick={() => setDensity("compact")}
                    className="text-sm cursor-pointer"
                  >
                    Compact
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDensity("standard")}
                    className="text-sm cursor-pointer"
                  >
                    Standard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDensity("comfortable")}
                    className="text-sm cursor-pointer"
                  >
                    Comfortable
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="h-5 w-px bg-muted" />

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-transparent cursor-pointer"
                onClick={() => handleActionClick("AI Action from Header")}
              >
                <WandSparkles className="h-4 w-4 hover:text-primary cursor-pointer group-hover:text-primary" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-hidden flex flex-col   shadow-sm relative">
          <div className="flex-1 overflow-auto border bg-card rounded-[6px] rounded-b-[5px] max-w-full ">
            <Table className="max-h-full">
              <TableHeader className="sticky top-0 z-40  bg-background/95">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent border-b"
                  >
                    {headerGroup.headers.map((header) => {
                      const isPinned = header.column.getIsPinned();
                      const isLastLeftPinned =
                        isPinned === "left" &&
                        header.column.getIsLastColumn("left");
                      const isFirstRightPinned =
                        isPinned === "right" &&
                        header.column.getIsFirstColumn("right");

                      return (
                        <TableHead
                          key={header.id}
                          className={cn(
                            "h-10 px-4 font-medium relative text-xs text-muted-foreground ",
                            isPinned && "sticky z-20",
                            isLastLeftPinned &&
                            "shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] border-none  bg-background/95 clip-right",
                            isFirstRightPinned &&
                            "shadow-[-2px_0_4px_-1px_rgba(0,0,0,0.1)] border-none clip-left",
                            !isLastLeftPinned &&
                            !isFirstRightPinned &&
                            "after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-1/2 after:w-[2px] after:bg-gray-200/40 after:content-['']",
                          )}
                          style={{
                            width: header.getSize(),
                            left:
                              isPinned === "left"
                                ? `${header.column.getStart("left")}px`
                                : undefined,
                            right:
                              isPinned === "right"
                                ? `${header.column.getAfter("right")}px`
                                : undefined,
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="bg-card  ">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-b last:border-0 hover:bg-primary/0.1 data-[state=selected]:bg-primary/8 group"
                    >
                      {row.getVisibleCells().map((cell) => {
                        const isPinned = cell.column.getIsPinned();
                        const isLastLeftPinned =
                          isPinned === "left" &&
                          cell.column.getIsLastColumn("left");
                        const isFirstRightPinned =
                          isPinned === "right" &&
                          cell.column.getIsFirstColumn("right");

                        return (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              densityStyles[density],
                              isPinned && "sticky  z-10 ",
                              isLastLeftPinned && "   min-w-12 min-h-12 ",
                              isFirstRightPinned && "bg-transparent ",
                              "bg-card group-data-[state=selected]:bg-primary/8  group-hover:bg-primary/4 group-hover:relative group-hover:z-50  ",
                            )}
                            style={{
                              width: cell.column.getSize(),
                              left:
                                isPinned === "left"
                                  ? `${cell.column.getStart("left")}px`
                                  : undefined,
                              right:
                                isPinned === "right"
                                  ? `${cell.column.getAfter("right")}px`
                                  : undefined,
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground text-sm"
                    >
                      No entries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex items-center justify-between py-2.5 px-4 pl-1 bg-transparent border-none">
            <div className="flex items-center bg-transparent gap-2">
              <span className="text-xs text-muted-foreground">
                Show per page
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 bg-card rounded-md text-xs px-2 min-w-[60px]"
                  >
                    {table.getState().pagination.pageSize}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="rounded-lg bg-card min-w-[80px]"
                >
                  {[10, 20, 30, 40, 50].map((size) => (
                    <DropdownMenuItem
                      key={size}
                      onClick={() => table.setPageSize(size)}
                      className="text-xs"
                    >
                      {size}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-xs text-muted-foreground">
                1-
                {Math.min(
                  table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length,
                )}{" "}
                of {table.getFilteredRowModel().rows.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-7 w-7 rounded-md hover:bg-muted bg-card cursor-pointer disabled:opacity-30"
              >
                <ChevronDown className="h-3.5 w-3.5 rotate-90" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-7 w-7 rounded-md hover:bg-muted bg-card cursor-pointer disabled:opacity-30"
              >
                <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>

        <OperationModal
          isOpen={confirmDialog.open}
          onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
          type={"summarize"}
        />
        <ColumnSummaryModal
          isOpen={summaryModal.open}
          onClose={() => setSummaryModal({ ...summaryModal, open: false })}
          column={summaryModal.column}
          config={config}
          data={config.data}
        />
      </div>
    </>
  );
}
