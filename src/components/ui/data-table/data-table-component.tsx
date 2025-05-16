import * as React from "react";
import { DataTable, createSortableHeader } from "./data-table";
import type { DataTableColumn } from "./data-table";
import type { Column } from "@tanstack/react-table";

interface DataTableComponentProps {
  columns: {
    id: string;
    header: string;
    accessorKey?: string;
    enableSorting?: boolean;
    enableHiding?: boolean;
    className?: string;
    type?: "text" | "number" | "date" | "badge" | "custom";
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
          column.cell = ({ getValue }) => {
            const value = getValue();
            const colorMap: Record<string, string> = {
              success: "bg-green-100 text-green-700",
              error: "bg-red-100 text-red-700",
              warning: "bg-yellow-100 text-yellow-700",
              info: "bg-blue-100 text-blue-700",
            };

            const badgeData =
              typeof value === "object" && value !== null
                ? (value as { type?: string; label?: string })
                : { label: String(value) };
            const color = colorMap[badgeData.type || "default"] || "bg-gray-100 text-gray-700";
            return (
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${color}`}
              >
                {badgeData.label}
              </span>
            );
          };
          break;
        }
        case "number": {
          column.cell = ({ getValue }) => {
            const value = getValue() as number;
            return new Intl.NumberFormat().format(value);
          };
          break;
        }
        case "date": {
          column.cell = ({ getValue }) => {
            const value = getValue() as string | number | Date;
            return new Date(value).toLocaleDateString();
          };
          break;
        }
        default: {
          break;
        }
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
      selectable={features.selectable}
      onRowSelect={onSelectionChange}
    />
  );
}
