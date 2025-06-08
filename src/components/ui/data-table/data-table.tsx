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
  type Row,
  type Column,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Input } from "../input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { cn } from "../../../lib/utils";

export interface DataTableColumn<TData, TValue = unknown>
  extends Omit<ColumnDef<TData, TValue>, "header" | "cell"> {
  id: string;
  accessorKey?: string;
  header?:
    | string
    | ((props: {
        column: Column<TData, TValue>;
        table: ReturnType<typeof useReactTable<TData>>;
      }) => React.ReactNode);
  cell?:
    | ((props: { row: Row<TData>; getValue: () => TValue }) => React.ReactNode)
    | ((props: { row: Row<TData> }) => React.ReactNode);
  enableSorting?: boolean;
  enableHiding?: boolean;
  className?: string;
}

export interface DataTableAction<TData> {
  label: string;
  onClick: (row: TData) => void;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableProps<TData, TValue> {
  columns: DataTableColumn<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  filterPlaceholder?: string;
  actions?: DataTableAction<TData>[];
  pageSize?: number;
  className?: string;
  showPagination?: boolean;
  showColumnFilter?: boolean;
  showViewOptions?: boolean;
  selectable?: boolean;
  onRowSelect?: (rows: TData[]) => void;
}

const createActionsColumn = <TData, TValue>(
  actions: DataTableAction<TData>[]
): ColumnDef<TData, TValue> => ({
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const rowData = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actions.map((action, index) => (
            <DropdownMenuItem key={index} onClick={() => action.onClick(rowData)}>
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
});

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Filter...",
  actions,
  pageSize = 10,
  className,
  showPagination = true,
  showColumnFilter = true,
  showViewOptions = true,
  selectable = false,
  onRowSelect,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const enhancedColumns = React.useMemo(() => {
    const cols: ColumnDef<TData, TValue>[] = [...(columns as ColumnDef<TData, TValue>[])];

    // Check if a select column already exists
    const hasSelectColumn = cols.some(col => col.id === "select");

    // Add selection column if selectable and no select column exists
    if (selectable && !hasSelectColumn) {
      cols.unshift({
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    // Add actions column if actions are provided
    if (actions && actions.length > 0) {
      cols.push(createActionsColumn(actions));
    }

    return cols;
  }, [columns, actions, selectable]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  React.useEffect(() => {
    if (onRowSelect) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original);
      onRowSelect(selectedRows);
    }
  }, [rowSelection, table, onRowSelect]);

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center justify-between">
        {showColumnFilter && filterColumn && (
          <Input
            placeholder={filterPlaceholder}
            value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        )}
        {showViewOptions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="flex items-center justify-end space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              data-testid="pagination-previous"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              data-testid="pagination-next"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to create sortable column headers
export function createSortableHeader<TData = unknown>(title: string) {
  const Component = ({ column }: { column: Column<TData, unknown> }) => {
    return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };
  Component.displayName = `SortableHeader_${title}`;
  return Component;
}
