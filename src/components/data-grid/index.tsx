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
    Maximize2,
    LayoutGrid,
    EyeOff,
    RotateCcw,
    Sigma,
    Pin,
    PinOff,
    WandSparkles,
    ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface DataGridProps {
    config: {
        columns: any[];
        data: any[];
        title?: string;
    };
}

export function DataGrid({ config }: DataGridProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [density, setDensity] = React.useState<"compact" | "standard" | "comfortable">("standard");
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

    const handlePinColumn = React.useCallback((columnId: string, position: 'left' | 'right' | false) => {
        setColumnPinning((prev) => {
            const newPinning = { ...prev };

            newPinning.left = (newPinning.left || []).filter(id => id !== columnId);
            newPinning.right = (newPinning.right || []).filter(id => id !== columnId);

            if (position === 'left') {
                newPinning.left = [...(newPinning.left || []), columnId];
            } else if (position === 'right') {
                newPinning.right = [...(newPinning.right || []), columnId];
            }

            return newPinning;
        });
    }, []);

    const handleActionClick = (option: string, rowId: string = "header") => {
        setConfirmDialog({ open: true, option, rowId });
    };

    const handleConfirm = () => {
        console.log(`Confirmed ${confirmDialog.option} for row ${confirmDialog.rowId}`);
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
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="border-muted-foreground/30"
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
            ...config.columns.map((col) => ({
                id: col.accessorKey,
                accessorKey: col.accessorKey,
                header: ({ column }) => {
                    const isPinned = column.getIsPinned();
                    const columnId = column.id;
                    const isSorted = column.getIsSorted();

                    return (
                        <div className="flex items-center justify-between gap-2 group">
                            <div className="flex items-center gap-1.5">
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
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 p-0 hover:bg-primary/10"
                                    onClick={() => handleActionClick(`AI Action on ${col.header}`)}
                                >
                                    <WandSparkles className="h-3.5 w-3.5 text-primary" />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 p-0 hover:bg-muted"
                                        >
                                            <MoreVertical className="h-3.5 w-3.5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="w-48 rounded-lg bg-white dark:bg-zinc-900">
                                        <DropdownMenuItem
                                            onClick={() => column.toggleSorting(false)}
                                            className="gap-2 text-sm"
                                        >
                                            <ArrowUp className="h-4 w-4" />
                                            <span>Ascending</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => column.toggleSorting(true)}
                                            className="gap-2 text-sm"
                                        >
                                            <ArrowDown className="h-4 w-4" />
                                            <span>Descending</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="gap-2 text-sm">
                                            <FilterIcon className="h-4 w-4" />
                                            <span>Filter</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="gap-2 text-sm">
                                            <Maximize2 className="h-4 w-4" />
                                            <span>Autosize</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="gap-2 text-sm">
                                                {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                                                <span>Pin Column</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuSubContent className="bg-white dark:bg-zinc-900">
                                                <DropdownMenuItem
                                                    onClick={() => handlePinColumn(columnId, 'left')}
                                                    className="gap-2 text-sm"
                                                >
                                                    <Pin className="h-4 w-4" />
                                                    Pin to Left
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handlePinColumn(columnId, 'right')}
                                                    className="gap-2 text-sm"
                                                >
                                                    <Pin className="h-4 w-4 rotate-180" />
                                                    Pin to Right
                                                </DropdownMenuItem>
                                                {isPinned && (
                                                    <DropdownMenuItem
                                                        onClick={() => handlePinColumn(columnId, false)}
                                                        className="gap-2 text-sm"
                                                    >
                                                        <PinOff className="h-4 w-4" />
                                                        Unpin
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuSub>
                                        <DropdownMenuItem className="gap-2 text-sm">
                                            <LayoutGrid className="h-4 w-4" />
                                            <span>Group By Column</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="gap-2 text-sm">
                                            <Columns className="h-4 w-4" />
                                            <span>Manage Columns</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="gap-2 text-sm">
                                            <RotateCcw className="h-4 w-4" />
                                            <span>Reset Columns</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => column.toggleVisibility(false)}
                                            className="gap-2 text-sm"
                                        >
                                            <EyeOff className="h-4 w-4" />
                                            <span>Hide Column</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="gap-2 text-sm">
                                            <Sigma className="h-4 w-4" />
                                            <span>Aggregation Select</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    );
                },
                cell: ({ row }) => {
                    const value = row.getValue(col.accessorKey);

                    if (col.accessorKey === "trend") {
                        const isPositive = String(value).startsWith("+");
                        return (
                            <Badge
                                variant="outline"
                                className={cn(
                                    "font-semibold text-xs px-2 py-0.5",
                                    isPositive
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                                        : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800"
                                )}
                            >
                                {String(value)}
                            </Badge>
                        );
                    }

                    if (col.accessorKey === "user") {
                        return (
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
                                    {String(value).split(" ").map(n => n[0]).join("")}
                                </div>
                                <span className="font-normal text-foreground text-sm">{String(value)}</span>
                            </div>
                        );
                    }

                    return <span className="text-foreground/90 font-normal text-sm">{String(value)}</span>;
                },
                size: col.width || 150,
            })),
            // Actions column at the end
            {
                id: "actions",
                
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 hover:bg-primary/10"
                                >
                                    <WandSparkles className="h-4 w-4 text-primary" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-40 rounded-lg">
                                <DropdownMenuItem
                                    onClick={() => handleActionClick("Option A", row.id)}
                                    className="text-sm"
                                >
                                    Option A
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleActionClick("Option B", row.id)}
                                    className="text-sm"
                                >
                                    Option B
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleActionClick("Option C", row.id)}
                                    className="text-sm"
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
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            columnPinning,
        },
    });

    const densityStyles = {
        compact: "py-1.5 px-4",
        standard: "py-2 px-4",
        comfortable: "py-3 px-4",
    };

    const selectedCount = table.getFilteredSelectedRowModel().rows.length;

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            {/* Header - Attached to Table */}
            <div className="flex items-center justify-between gap-4 py-3 px-6 bg-card dark:bg-zinc-900/50 backdrop-blur-md border border-b-0 rounded-t-2xl shadow-sm">
                <div className="flex items-center gap-3">
                    <h2 className="text-base font-semibold text-foreground">
                        {config.title || "Leaderboard"}
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("user")?.setFilterValue(event.target.value)
                            }
                            className="pl-9 h-8 w-48 bg-background/50 border-muted rounded-lg focus-visible:ring-1 focus-visible:ring-primary/20 text-sm"
                        />
                    </div>

                    <Button variant="outline" size="sm" className="h-8 gap-1.5 border-muted rounded-lg bg-background/50 hover:bg-muted text-xs">
                        <ListFilter className="h-3.5 w-3.5" />
                        Filter
                    </Button>

                    <Button variant="outline" size="sm" className="h-8 gap-1.5 border-muted rounded-lg bg-background/50 hover:bg-muted text-xs">
                        <ArrowUpAz className="h-3.5 w-3.5" />
                        Sort
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1.5 border-muted rounded-lg bg-background/50 hover:bg-muted text-xs">
                                <Columns className="h-3.5 w-3.5" />
                                Density
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-lg w-32">
                            <DropdownMenuItem
                                onClick={() => setDensity("compact")}
                                className="text-sm"
                            >
                                Compact
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setDensity("standard")}
                                className="text-sm"
                            >
                                Standard
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setDensity("comfortable")}
                                className="text-sm"
                            >
                                Comfortable
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="h-5 w-px bg-muted" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-primary/10"
                        onClick={() => handleActionClick("AI Action from Header")}
                    >
                        <WandSparkles className="h-4 w-4 text-primary" />
                    </Button>


                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-hidden flex flex-col border rounded-b-2xl bg-card shadow-sm relative">
                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 z-50 bg-background/95">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent border-b">
                                    {headerGroup.headers.map((header) => {
                                        const isPinned = header.column.getIsPinned();
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={cn(
                                                    "h-10 px-4 font-medium text-xs text-muted-foreground",
                                                    isPinned && "sticky bg-background z-40"
                                                )}
                                                style={{
                                                    width: header.getSize(),
                                                    left: isPinned === 'left' ? `${header.column.getStart('left')}px` : undefined,
                                                }}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="border-b last:border-0 hover:bg-primary/5 data-[state=selected]:bg-primary/10"
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            const isPinned = cell.column.getIsPinned();
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    className={cn(
                                                        densityStyles[density],
                                                        isPinned && "sticky bg-background hover:bg-primary/5 z-30"
                                                    )}
                                                    style={{
                                                        width: cell.column.getSize(),
                                                        left: isPinned === 'left' ? `${cell.column.getStart('left')}px` : undefined,
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                <div className="flex items-center justify-between py-2.5 px-4 bg-background border-t">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Show per page</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1 rounded-md text-xs px-2 min-w-[60px]">
                                    {table.getState().pagination.pageSize}
                                    <ChevronDown className="h-3 w-3 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="rounded-lg min-w-[80px]">
                                {[10, 20, 30, 40, 50].map((size) => (
                                    <DropdownMenuItem key={size} onClick={() => table.setPageSize(size)} className="text-xs">
                                        {size}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="text-xs text-muted-foreground">
                            1-{Math.min(table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-7 w-7 rounded-md hover:bg-muted disabled:opacity-30"
                        >
                            <ChevronDown className="h-3.5 w-3.5 rotate-90" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-7 w-7 rounded-md hover:bg-muted disabled:opacity-30"
                        >
                            <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Compact Selection Action Bar */}
            {selectedCount > 0 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center gap-3 py-2 px-4 bg-zinc-900 text-white rounded-xl shadow-xl border border-white/10">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-primary text-white hover:bg-primary text-xs px-2">
                                {selectedCount}
                            </Badge>
                            <span className="text-xs font-medium">Selected</span>
                        </div>
                        <div className="h-4 w-px bg-white/20" />
                        <Button variant="ghost" size="sm" className="h-7 gap-1.5 hover:bg-white/10 text-xs px-2">
                            <Download className="h-3.5 w-3.5" />
                            Export
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-white/10"
                            onClick={() => table.resetRowSelection()}
                        >
                            <X className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to execute <strong>{confirmDialog.option}</strong> for this record?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
