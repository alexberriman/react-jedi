import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const dropdownMenuSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenu"),
  defaultOpen: z.boolean().optional(),
  open: z.boolean().optional(),
  onOpenChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  modal: z.boolean().optional(),
  dir: z.enum(["ltr", "rtl"]).optional(),
  children: z.array(z.any()).optional(),
});

export const dropdownMenuPortalSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuPortal"),
  forceMount: z.boolean().optional(),
  children: z.array(z.any()).optional(),
});

export const dropdownMenuTriggerSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuTrigger"),
  asChild: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const dropdownMenuContentSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuContent"),
  sideOffset: z.number().optional(),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  alignOffset: z.number().optional(),
  avoidCollisions: z.boolean().optional(),
  collisionPadding: z.union([
    z.number(),
    z.object({
      top: z.number().optional(),
      right: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
    })
  ]).optional(),
  sticky: z.enum(["partial", "always"]).optional(),
  hideWhenDetached: z.boolean().optional(),
  forceMount: z.boolean().optional(),
  children: z.array(z.any()).optional(),
});

export const dropdownMenuGroupSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuGroup"),
  children: z.array(z.any()).optional(),
});

export const dropdownMenuItemSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuItem"),
  inset: z.boolean().optional(),
  variant: z.enum(["default", "destructive"]).optional(),
  disabled: z.boolean().optional(),
  onSelect: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  textValue: z.string().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const dropdownMenuCheckboxItemSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuCheckboxItem"),
  checked: z.union([z.boolean(), z.literal("indeterminate")]).optional(),
  onCheckedChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  disabled: z.boolean().optional(),
  onSelect: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  textValue: z.string().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const dropdownMenuRadioGroupSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuRadioGroup"),
  value: z.string().optional(),
  onValueChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.array(z.any()).optional(),
});

export const dropdownMenuRadioItemSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuRadioItem"),
  value: z.string(),
  disabled: z.boolean().optional(),
  onSelect: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  textValue: z.string().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const dropdownMenuLabelSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuLabel"),
  inset: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const dropdownMenuSeparatorSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuSeparator"),
});

export const dropdownMenuShortcutSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuShortcut"),
  children: z.string().optional(),
});

export const dropdownMenuSubSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuSub"),
  defaultOpen: z.boolean().optional(),
  open: z.boolean().optional(),
  onOpenChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.array(z.any()).optional(),
});

export const dropdownMenuSubTriggerSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuSubTrigger"),
  inset: z.boolean().optional(),
  disabled: z.boolean().optional(),
  textValue: z.string().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const dropdownMenuSubContentSchema = baseComponentSchema.extend({
  type: z.literal("DropdownMenuSubContent"),
  sideOffset: z.number().optional(),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  alignOffset: z.number().optional(),
  avoidCollisions: z.boolean().optional(),
  collisionPadding: z.union([
    z.number(),
    z.object({
      top: z.number().optional(),
      right: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
    })
  ]).optional(),
  sticky: z.enum(["partial", "always"]).optional(),
  hideWhenDetached: z.boolean().optional(),
  forceMount: z.boolean().optional(),
  children: z.array(z.any()).optional(),
});

export type DropdownMenuProps = z.infer<typeof dropdownMenuSchema>;
export type DropdownMenuTriggerProps = z.infer<typeof dropdownMenuTriggerSchema>;
export type DropdownMenuContentProps = z.infer<typeof dropdownMenuContentSchema>;
export type DropdownMenuItemProps = z.infer<typeof dropdownMenuItemSchema>;
export type DropdownMenuCheckboxItemProps = z.infer<typeof dropdownMenuCheckboxItemSchema>;
export type DropdownMenuRadioGroupProps = z.infer<typeof dropdownMenuRadioGroupSchema>;
export type DropdownMenuRadioItemProps = z.infer<typeof dropdownMenuRadioItemSchema>;
export type DropdownMenuLabelProps = z.infer<typeof dropdownMenuLabelSchema>;
export type DropdownMenuSeparatorProps = z.infer<typeof dropdownMenuSeparatorSchema>;
export type DropdownMenuShortcutProps = z.infer<typeof dropdownMenuShortcutSchema>;
export type DropdownMenuSubProps = z.infer<typeof dropdownMenuSubSchema>;
export type DropdownMenuSubTriggerProps = z.infer<typeof dropdownMenuSubTriggerSchema>;
export type DropdownMenuSubContentProps = z.infer<typeof dropdownMenuSubContentSchema>;