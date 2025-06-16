import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Cell content schema
const cellContentSchema = z.union([
  z.string(),
  z.lazy(() => baseComponentSchema),
]);

// Table cell schema
const tableCellSchema = z.object({
  content: cellContentSchema,
  colSpan: z.number().optional(),
  rowSpan: z.number().optional(),
  className: z.string().optional(),
  align: z.enum(["left", "center", "right"]).optional(),
});

// Table row schema - for structured table spec
const tableRowSpec = z.object({
  cells: z.array(tableCellSchema),
  className: z.string().optional(),
});

// Table section schema
const tableSectionSchema = z.object({
  rows: z.array(tableRowSpec),
});

// Main table schema
export const tableSchema = baseComponentSchema.extend({
  type: z.literal("Table"),
  variant: z.enum(["default", "striped", "bordered", "minimal", "compact", "modern"]).optional(),
  stickyHeader: z.boolean().optional(),
  hoverable: z.boolean().optional(),
  caption: z.string().optional(),
  head: tableSectionSchema.optional(),
  body: tableSectionSchema.optional(),
  foot: tableSectionSchema.optional(),
  children: z.array(z.lazy(() => baseComponentSchema)).optional(),
});

// Component sub-schemas for composable usage
export const tableHeaderSchema = baseComponentSchema.extend({
  type: z.literal("TableHeader"),
  sticky: z.boolean().optional(),
  children: z.array(z.lazy(() => baseComponentSchema)).optional(),
});

export const tableBodySchema = baseComponentSchema.extend({
  type: z.literal("TableBody"),
  children: z.array(z.lazy(() => baseComponentSchema)).optional(),
});

export const tableFooterSchema = baseComponentSchema.extend({
  type: z.literal("TableFooter"),
  children: z.array(z.lazy(() => baseComponentSchema)).optional(),
});

export const tableRowSchema = baseComponentSchema.extend({
  type: z.literal("TableRow"),
  children: z.array(z.lazy(() => baseComponentSchema)).optional(),
});

export const tableHeadSchema = baseComponentSchema.extend({
  type: z.literal("TableHead"),
  children: z.union([z.string(), z.array(z.lazy(() => baseComponentSchema))]).optional(),
});

export const tableCellComponentSchema = baseComponentSchema.extend({
  type: z.literal("TableCell"),
  colSpan: z.number().optional(),
  rowSpan: z.number().optional(),
  children: z.union([z.string(), z.lazy(() => baseComponentSchema), z.array(z.lazy(() => baseComponentSchema))]).optional(),
});

export const tableCaptionSchema = baseComponentSchema.extend({
  type: z.literal("TableCaption"),
  children: z.string().optional(),
});

export type TableProps = z.infer<typeof tableSchema>;
export type TableHeaderProps = z.infer<typeof tableHeaderSchema>;
export type TableBodyProps = z.infer<typeof tableBodySchema>;
export type TableFooterProps = z.infer<typeof tableFooterSchema>;
export type TableRowProps = z.infer<typeof tableRowSchema>;
export type TableHeadProps = z.infer<typeof tableHeadSchema>;
export type TableCellProps = z.infer<typeof tableCellComponentSchema>;
export type TableCaptionProps = z.infer<typeof tableCaptionSchema>;