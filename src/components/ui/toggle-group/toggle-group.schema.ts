import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Base schema with common props
const toggleGroupBaseSchema = baseComponentSchema.extend({
  variant: z.enum(["default", "outline"]).optional(),
  size: z.enum(["default", "sm", "lg"]).optional(),
  disabled: z.boolean().optional(),
  rovingFocus: z.boolean().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  dir: z.enum(["ltr", "rtl"]).optional(),
  loop: z.boolean().optional(),
  children: z.any().optional(),
});

// Single selection schema
const toggleGroupSingleSchema = toggleGroupBaseSchema.extend({
  type: z.literal("ToggleGroup"),
  selectionType: z.literal("single").optional(),
  value: z.string().optional(),
  defaultValue: z.string().optional(),
  onValueChange: z.function().optional(),
});

// Multiple selection schema
const toggleGroupMultipleSchema = toggleGroupBaseSchema.extend({
  type: z.literal("ToggleGroup"),
  selectionType: z.literal("multiple"),
  value: z.array(z.string()).optional(),
  defaultValue: z.array(z.string()).optional(),
  onValueChange: z.function().optional(),
});

// Union of both schemas
export const toggleGroupSchema = z.union([
  toggleGroupSingleSchema,
  toggleGroupMultipleSchema,
]);

// ToggleGroupItem schema
export const toggleGroupItemSchema = baseComponentSchema.extend({
  type: z.literal("ToggleGroupItem"),
  value: z.string(),
  disabled: z.boolean().optional(),
  variant: z.enum(["default", "outline"]).optional(),
  size: z.enum(["default", "sm", "lg"]).optional(),
  children: z.any().optional(),
  "aria-label": z.string().optional(),
});

export type ToggleGroupProps = z.infer<typeof toggleGroupSchema>;
export type ToggleGroupItemProps = z.infer<typeof toggleGroupItemSchema>;