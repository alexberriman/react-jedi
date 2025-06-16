import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Column definition schema
const dataTableColumnSchema = z.object({
  id: z.string(),
  header: z.string(),
  accessorKey: z.string().optional(),
  enableSorting: z.boolean().optional(),
  enableHiding: z.boolean().optional(),
  className: z.string().optional(),
  type: z.enum(["text", "number", "date", "badge", "currency", "custom"]).optional(),
  format: z.object({
    currency: z.string().optional(),
    locale: z.string().optional(),
    dateFormat: z.string().optional(),
  }).optional(),
});

// Action definition schema
const dataTableActionSchema = z.object({
  label: z.string(),
  handler: z.string(),
  icon: z.string().optional(),
});

// Pagination definition schema
const dataTablePaginationSchema = z.object({
  enabled: z.boolean().optional(),
  pageSize: z.number().optional(),
});

// Features definition schema
const dataTableFeaturesSchema = z.object({
  columnFilter: z.boolean().optional(),
  viewOptions: z.boolean().optional(),
  selectable: z.boolean().optional(),
  sortable: z.boolean().optional(),
});

// Main data table schema
export const dataTableSchema = baseComponentSchema.extend({
  type: z.literal("DataTable"),
  columns: z.array(dataTableColumnSchema),
  data: z.union([
    z.array(z.record(z.string(), z.unknown())),
    z.string(),
  ]),
  filterColumn: z.string().optional(),
  filterPlaceholder: z.string().optional(),
  actions: z.array(dataTableActionSchema).optional(),
  pagination: dataTablePaginationSchema.optional(),
  features: dataTableFeaturesSchema.optional(),
  onSelectionChange: z.string().optional(),
  onAction: z.string().optional(),
});

export type DataTableProps = z.infer<typeof dataTableSchema>;