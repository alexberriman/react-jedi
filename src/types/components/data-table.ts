import type { BaseComponentSpec } from "@/types/schema/base";

export interface DataTableColumnSpec {
  id: string;
  header: string;
  accessorKey?: string;
  enableSorting?: boolean;
  enableHiding?: boolean;
  className?: string;
  type?: "text" | "number" | "date" | "badge" | "currency" | "custom";
  format?: {
    currency?: string;
    locale?: string;
    dateFormat?: string;
  };
}

export interface DataTableActionSpec {
  label: string;
  handler: string;
  icon?: string;
}

export interface DataTablePaginationSpec {
  enabled?: boolean;
  pageSize?: number;
}

export interface DataTableFeaturesSpec {
  columnFilter?: boolean;
  viewOptions?: boolean;
  selectable?: boolean;
  sortable?: boolean;
}

export interface DataTableSpec extends Omit<BaseComponentSpec, "data"> {
  type: "DataTable";
  columns: DataTableColumnSpec[];
  data: Record<string, unknown>[] | string; // Can be inline data or reference to data source
  filterColumn?: string;
  filterPlaceholder?: string;
  actions?: DataTableActionSpec[];
  pagination?: DataTablePaginationSpec;
  features?: DataTableFeaturesSpec;
  onSelectionChange?: string; // Event handler for row selection
  onAction?: string; // Event handler for actions
}
