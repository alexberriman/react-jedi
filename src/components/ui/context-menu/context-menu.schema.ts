import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Base item schema for common properties
const contextMenuItemBase = z.object({
  label: z.string().optional(),
  icon: z.string().optional(),
  disabled: z.boolean().optional(),
});

// Item type schema
const contextMenuStandardItem = contextMenuItemBase.extend({
  type: z.literal("item"),
  shortcut: z.string().optional(),
  variant: z.enum(["default", "destructive"]).optional(),
  onSelect: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

// Checkbox item schema
const contextMenuCheckboxItem = contextMenuItemBase.extend({
  type: z.literal("checkbox"),
  checked: z.boolean().optional(),
  onSelect: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

// Radio item schema
const contextMenuRadioItem = contextMenuItemBase.extend({
  type: z.literal("radio"),
  value: z.string().optional(),
  checked: z.boolean().optional(),
});

// Separator item schema
const contextMenuSeparatorItem = z.object({
  type: z.literal("separator"),
});

// Label item schema
const contextMenuLabelItem = contextMenuItemBase.extend({
  type: z.literal("label"),
});

// Define the sub menu type interface
interface ContextMenuSubItemType {
  type: "sub";
  label?: string;
  icon?: string;
  disabled?: boolean;
  items?: unknown[];
}

// Sub menu item schema (recursive)
const contextMenuSubItem: z.ZodType<ContextMenuSubItemType> = contextMenuItemBase.extend({
  type: z.literal("sub"),
  items: z.lazy(() => z.array(contextMenuItemSpec).optional()),
});

// Union of all item types
const contextMenuItemSpec = z.union([
  contextMenuStandardItem,
  contextMenuCheckboxItem,
  contextMenuRadioItem,
  contextMenuSeparatorItem,
  contextMenuLabelItem,
  contextMenuSubItem,
]);

// Main context menu schema
export const contextMenuSchema = baseComponentSchema.extend({
  type: z.literal("context-menu"),
  trigger: z.any(),
  items: z.array(contextMenuItemSpec).optional(),
  defaultOpen: z.boolean().optional(),
  open: z.boolean().optional(),
  onOpenChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  modal: z.boolean().optional(),
});

// Individual component schemas for direct usage
export const contextMenuTriggerSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuTrigger"),
  asChild: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const contextMenuContentSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuContent"),
  children: z.array(z.any()).optional(),
});

export const contextMenuItemSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuItem"),
  inset: z.boolean().optional(),
  variant: z.enum(["default", "destructive"]).optional(),
  disabled: z.boolean().optional(),
  onSelect: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const contextMenuCheckboxItemSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuCheckboxItem"),
  checked: z.boolean().optional(),
  onCheckedChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  disabled: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const contextMenuRadioGroupSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuRadioGroup"),
  value: z.string().optional(),
  onValueChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.array(z.any()).optional(),
});

export const contextMenuRadioItemSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuRadioItem"),
  value: z.string(),
  disabled: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const contextMenuLabelSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuLabel"),
  inset: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const contextMenuSeparatorSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuSeparator"),
});

export const contextMenuShortcutSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuShortcut"),
  children: z.string().optional(),
});

export const contextMenuSubSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuSub"),
  defaultOpen: z.boolean().optional(),
  open: z.boolean().optional(),
  onOpenChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.array(z.any()).optional(),
});

export const contextMenuSubTriggerSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuSubTrigger"),
  inset: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const contextMenuSubContentSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuSubContent"),
  children: z.array(z.any()).optional(),
});

export const contextMenuPortalSchema = baseComponentSchema.extend({
  type: z.literal("ContextMenuPortal"),
  children: z.array(z.any()).optional(),
});

export type ContextMenuProps = z.infer<typeof contextMenuSchema>;
export type ContextMenuItemSpec = z.infer<typeof contextMenuItemSpec>;