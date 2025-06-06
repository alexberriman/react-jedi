import * as React from "react";
import { DataTable, createSortableHeader } from "./data-table";
import type { DataTableColumn } from "./data-table";
import type { Column, Row } from "@tanstack/react-table";
import { Checkbox } from "../checkbox";
import { Badge } from "../badge";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// Helper function to create checkbox header
const createCheckboxHeader = () => {
  const CheckboxHeader = ({ table }: { table: { getIsAllPageRowsSelected: () => boolean; toggleAllPageRowsSelected: (value: boolean) => void } }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value: boolean | "indeterminate") =>
        table.toggleAllPageRowsSelected(!!value)
      }
      aria-label="Select all"
    />
  );
  CheckboxHeader.displayName = "CheckboxHeader";
  return CheckboxHeader;
};

// Helper function to create checkbox cell
const createCheckboxCell = () => {
  const CheckboxCell = ({ row }: { row: Row<Record<string, unknown>> }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value: boolean | "indeterminate") => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
  CheckboxCell.displayName = "CheckboxCell";
  return CheckboxCell;
};

interface DataTableComponentProps {
  columns: {
    id: string;
    header: string;
    accessorKey?: string;
    enableSorting?: boolean;
    enableHiding?: boolean;
    className?: string;
    type?: "text" | "number" | "date" | "badge" | "currency" | "custom";
  }[];
  data: Record<string, unknown>[];
  filterColumn?: string;
  filterPlaceholder?: string;
  actions?: {
    label: string;
    handler: string;
    icon?: string;
  }[];
  pagination?: {
    enabled?: boolean;
    pageSize?: number;
  };
  features?: {
    columnFilter?: boolean;
    viewOptions?: boolean;
    selectable?: boolean;
  };
  onAction?: (action: string, data: Record<string, unknown>) => void;
  onSelectionChange?: (selectedRows: Record<string, unknown>[]) => void;
  className?: string;
}

export function DataTableComponent({
  columns,
  data,
  filterColumn,
  filterPlaceholder,
  actions,
  pagination = { enabled: true, pageSize: 10 },
  features = { columnFilter: true, viewOptions: true, selectable: false },
  onAction,
  onSelectionChange,
  className,
}: Readonly<DataTableComponentProps>) {
  // Transform columns to TanStack Table format
  const tableColumns = React.useMemo(() => {
    return columns.map((col) => {
      // Handle special case for select column
      if (col.id === "select") {
        const selectColumn: DataTableColumn<Record<string, unknown>> = {
          id: "select",
          header: createCheckboxHeader(),
          cell: createCheckboxCell(),
          enableSorting: false,
          enableHiding: false,
        };
        return selectColumn;
      }
      const column: DataTableColumn<Record<string, unknown>> = {
        id: col.id,
        accessorKey: col.accessorKey || col.id,
        header: col.enableSorting
          ? (createSortableHeader(col.header) as
              | string
              | ((props: { column: Column<Record<string, unknown>, unknown> }) => React.ReactNode))
          : col.header,
        enableSorting: col.enableSorting,
        enableHiding: col.enableHiding ?? true,
      };

      // Add custom cell renderers based on type
      switch (col.type) {
        case "badge": {
          column.cell = ({ getValue }: { getValue: () => unknown }) => {
            const value = getValue();
            const variantMap: Record<string, BadgeVariant> = {
              success: "secondary",
              error: "destructive",
              warning: "secondary",
              info: "default",
              active: "secondary",
              inactive: "outline",
              processing: "default",
              pending: "secondary",
              failed: "destructive",
            };

            const badgeData =
              typeof value === "object" && value !== null
                ? (value as { type?: string; label?: string })
                : { label: String(value) };
            
            // If the value is a string, use it directly
            const label = typeof value === "string" ? value : badgeData.label;
            const variant = variantMap[label || "default"] || "default";
            
            return <Badge variant={variant}>{label}</Badge>;
          };
          break;
        }
        case "number": {
          column.cell = ({ getValue }: { getValue: () => unknown }) => {
            const value = getValue() as number;
            return new Intl.NumberFormat().format(value);
          };
          break;
        }
        case "currency": {
          column.cell = ({ getValue }: { getValue: () => unknown }) => {
            const value = Number.parseFloat(String(getValue()));
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(value);
            return <div className="font-medium">{formatted}</div>;
          };
          break;
        }
        case "date": {
          column.cell = ({ getValue }: { getValue: () => unknown }) => {
            const value = getValue() as string | number | Date;
            return new Date(value).toLocaleDateString();
          };
          break;
        }
        default: {
          break;
        }
      }
      
      // Auto-detect status columns that should render as badges
      if (col.id === "status" && !col.type) {
        column.cell = ({ getValue }: { getValue: () => unknown }) => {
          const value = getValue() as string;
          const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            success: "secondary",
            error: "destructive",
            warning: "secondary",
            info: "default",
            active: "secondary",
            inactive: "outline",
            processing: "default",
            pending: "secondary",
            failed: "destructive",
          };
          
          const variant = variantMap[value] || "default";
          return <Badge variant={variant}>{value}</Badge>;
        };
      }
      
      // Auto-detect role columns that should render as badges
      if (col.id === "role" && !col.type) {
        column.cell = ({ getValue }: { getValue: () => unknown }) => {
          const value = getValue() as string;
          const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            Admin: "default",
            Moderator: "secondary",
            User: "outline",
          };
          
          const variant = variantMap[value] || "outline";
          return <Badge variant={variant}>{value}</Badge>;
        };
      }

      return column;
    });
  }, [columns]);

  // Transform actions to DataTable format
  const tableActions = React.useMemo(() => {
    if (!actions || !onAction) return undefined;

    return actions.map((action) => ({
      label: action.label,
      onClick: (row: Record<string, unknown>) => onAction(action.handler, row),
      // Could map icon names to Lucide icons here if needed
    }));
  }, [actions, onAction]);

  return (
    <DataTable
      columns={tableColumns}
      data={data}
      filterColumn={filterColumn}
      filterPlaceholder={filterPlaceholder}
      actions={tableActions}
      pageSize={pagination.pageSize}
      className={className}
      showPagination={pagination.enabled}
      showColumnFilter={features.columnFilter}
      showViewOptions={features.viewOptions}
      selectable={features.selectable || columns.some(col => col.id === "select")}
      onRowSelect={onSelectionChange}
    />
  );
}
