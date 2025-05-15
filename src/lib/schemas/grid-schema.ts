/**
 * Specification schema for the Grid component
 *
 * This schema defines the JSON structure for configuring Grid components
 * in the Server-Driven UI architecture.
 */

import { z } from "zod";
import { baseComponentSchema } from "./base-schema";

/**
 * Schema for responsive values (can be single value or breakpoint object)
 */
const responsiveValueSchema = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z.union([valueSchema, z.record(z.string(), valueSchema)]);

/**
 * Schema for the Grid component
 */
export const gridSchema = baseComponentSchema.extend({
  type: z.literal("Grid"),

  // Grid specific properties
  columns: responsiveValueSchema(
    z.union([z.number().int().positive(), z.string()])
  ).optional(),
  gap: responsiveValueSchema(
    z.union([z.number().int().min(0), z.string()])
  ).optional(),
  autoFit: z.boolean().optional(),
  minColWidth: z.string().optional(),
  colWidth: z.string().optional(),
  rows: responsiveValueSchema(
    z.union([z.number().int().positive(), z.string()])
  ).optional(),
  areas: z.array(z.string()).optional(),
  flow: z.enum(["row", "column", "dense", "row-dense", "column-dense"]).optional(),
  stretch: z.boolean().optional(),

  // Children
  children: z.array(z.unknown()).optional(),
});

export type GridSchema = z.infer<typeof gridSchema>;

/**
 * Example usage:
 *
 * ```json
 * {
 *   "type": "Grid",
 *   "columns": 3,
 *   "gap": 4,
 *   "className": "w-full max-w-4xl",
 *   "children": [
 *     { "type": "Box", "className": "bg-blue-500 p-4", "children": ["Grid Item 1"] },
 *     { "type": "Box", "className": "bg-green-500 p-4", "children": ["Grid Item 2"] },
 *     { "type": "Box", "className": "bg-red-500 p-4", "children": ["Grid Item 3"] }
 *   ]
 * }
 * ```
 *
 * Responsive example:
 *
 * ```json
 * {
 *   "type": "Grid",
 *   "columns": { "base": 1, "md": 2, "lg": 3 },
 *   "gap": { "base": 2, "md": 4 },
 *   "className": "w-full max-w-4xl",
 *   "children": [
 *     { "type": "Box", "className": "bg-blue-500 p-4", "children": ["Grid Item 1"] },
 *     { "type": "Box", "className": "bg-green-500 p-4", "children": ["Grid Item 2"] },
 *     { "type": "Box", "className": "bg-red-500 p-4", "children": ["Grid Item 3"] }
 *   ]
 * }
 * ```
 *
 * Named areas example:
 *
 * ```json
 * {
 *   "type": "Grid",
 *   "areas": [
 *     "header header header",
 *     "sidebar content content",
 *     "footer footer footer"
 *   ],
 *   "gap": 4,
 *   "className": "w-full h-screen",
 *   "children": [
 *     {
 *       "type": "Box",
 *       "className": "bg-blue-500 p-4 [grid-area:header]",
 *       "children": ["Header"]
 *     },
 *     {
 *       "type": "Box",
 *       "className": "bg-green-500 p-4 [grid-area:sidebar]",
 *       "children": ["Sidebar"]
 *     },
 *     {
 *       "type": "Box",
 *       "className": "bg-purple-500 p-4 [grid-area:content]",
 *       "children": ["Content"]
 *     },
 *     {
 *       "type": "Box",
 *       "className": "bg-orange-500 p-4 [grid-area:footer]",
 *       "children": ["Footer"]
 *     }
 *   ]
 * }
 * ```
 */
