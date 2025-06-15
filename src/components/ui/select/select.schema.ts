import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Main Select schema
export const selectSchema = baseComponentSchema.extend({
  type: z.literal("Select"),
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional(),
  value: z.string().optional(),
  defaultValue: z.string().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  name: z.string().optional(),
  onValueChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  open: z.boolean().optional(),
  defaultOpen: z.boolean().optional(),
  onOpenChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

// SelectTrigger schema
export const selectTriggerSchema = baseComponentSchema.extend({
  type: z.literal("SelectTrigger"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
  size: z.enum(["sm", "default"]).optional(),
  asChild: z.boolean().optional(),
});

// SelectValue schema
export const selectValueSchema = baseComponentSchema.extend({
  type: z.literal("SelectValue"),
  placeholder: z.string().optional(),
  asChild: z.boolean().optional(),
});

// SelectContent schema
export const selectContentSchema = baseComponentSchema.extend({
  type: z.literal("SelectContent"),
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional(),
  position: z.enum(["popper", "item-aligned"]).optional(),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  sideOffset: z.number().optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  alignOffset: z.number().optional(),
  avoidCollisions: z.boolean().optional(),
});

// SelectItem schema
export const selectItemSchema = baseComponentSchema.extend({
  type: z.literal("SelectItem"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]),
  value: z.string(),
  disabled: z.boolean().optional(),
  asChild: z.boolean().optional(),
});

// SelectGroup schema
export const selectGroupSchema = baseComponentSchema.extend({
  type: z.literal("SelectGroup"),
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional(),
  asChild: z.boolean().optional(),
});

// SelectLabel schema
export const selectLabelSchema = baseComponentSchema.extend({
  type: z.literal("SelectLabel"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
  asChild: z.boolean().optional(),
});

// SelectSeparator schema
export const selectSeparatorSchema = baseComponentSchema.extend({
  type: z.literal("SelectSeparator"),
  asChild: z.boolean().optional(),
});

// SelectScrollUpButton schema
export const selectScrollUpButtonSchema = baseComponentSchema.extend({
  type: z.literal("SelectScrollUpButton"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
  asChild: z.boolean().optional(),
});

// SelectScrollDownButton schema
export const selectScrollDownButtonSchema = baseComponentSchema.extend({
  type: z.literal("SelectScrollDownButton"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
  asChild: z.boolean().optional(),
});

// Export types
export type SelectProps = z.infer<typeof selectSchema>;
export type SelectTriggerProps = z.infer<typeof selectTriggerSchema>;
export type SelectValueProps = z.infer<typeof selectValueSchema>;
export type SelectContentProps = z.infer<typeof selectContentSchema>;
export type SelectItemProps = z.infer<typeof selectItemSchema>;
export type SelectGroupProps = z.infer<typeof selectGroupSchema>;
export type SelectLabelProps = z.infer<typeof selectLabelSchema>;
export type SelectSeparatorProps = z.infer<typeof selectSeparatorSchema>;
export type SelectScrollUpButtonProps = z.infer<typeof selectScrollUpButtonSchema>;
export type SelectScrollDownButtonProps = z.infer<typeof selectScrollDownButtonSchema>;