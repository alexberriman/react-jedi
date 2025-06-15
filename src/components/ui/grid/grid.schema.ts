import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Helper schema for responsive values
const responsiveNumberSchema = z.union([
  z.number(),
  z.record(z.string(), z.number())
]);

export const gridSchema = baseComponentSchema.extend({
  type: z.literal("Grid"),
  columns: responsiveNumberSchema.optional(),
  gap: responsiveNumberSchema.optional(),
  autoFit: z.boolean().optional(),
  minColWidth: z.string().optional(),
  colWidth: z.string().optional(),
  rows: responsiveNumberSchema.optional(),
  areas: z.array(z.string()).optional(),
  flow: z.enum(["row", "column", "dense", "row-dense", "column-dense"]).optional(),
  stretch: z.boolean().optional(),
  children: z.any().optional(),
});

export type GridProps = z.infer<typeof gridSchema>;