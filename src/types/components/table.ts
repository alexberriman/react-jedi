import type { BaseComponentSpec } from "@/types/schema/base";

export type TableCellAlign = "left" | "center" | "right";

export interface TableCellSpec {
  content: string | BaseComponentSpec | React.ReactNode; // Can be string or component spec
  className?: string;
  align?: TableCellAlign;
  colSpan?: number;
}

export interface TableRowSpec {
  className?: string;
  selected?: boolean;
  cells: TableCellSpec[];
}

export interface TableHeadSpec {
  rows: TableRowSpec[];
}

export interface TableBodySpec {
  rows: TableRowSpec[];
}

export interface TableFooterSpec {
  rows: TableRowSpec[];
}

export interface TableSpec extends BaseComponentSpec {
  type: "Table";
  caption?: string;
  head?: TableHeadSpec;
  body: TableBodySpec;
  footer?: TableFooterSpec;
  /** The visual style variant of the table */
  variant?: "default" | "striped" | "bordered" | "minimal" | "compact" | "modern";
  /** Whether the table header should be sticky when scrolling */
  stickyHeader?: boolean;
  /** Whether to show hover effects on rows */
  hoverable?: boolean;
}
