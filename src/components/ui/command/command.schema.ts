import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const commandSchema = baseComponentSchema.extend({
  type: z.literal("Command"),
  value: z.string().optional(),
  onValueChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  filter: z.string().optional(), // JSON spec would use string reference
  shouldFilter: z.boolean().optional(),
  loop: z.boolean().optional(),
  disablePointerSelection: z.boolean().optional(),
  vimBindings: z.boolean().optional(),
  children: z.array(z.any()).optional(),
});

export const commandDialogSchema = baseComponentSchema.extend({
  type: z.literal("CommandDialog"),
  title: z.string().optional(),
  description: z.string().optional(),
  open: z.boolean().optional(),
  onOpenChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.array(z.any()).optional(),
});

export const commandInputSchema = baseComponentSchema.extend({
  type: z.literal("CommandInput"),
  placeholder: z.string().optional(),
  value: z.string().optional(),
  onValueChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  disabled: z.boolean().optional(),
});

export const commandListSchema = baseComponentSchema.extend({
  type: z.literal("CommandList"),
  children: z.array(z.any()).optional(),
});

export const commandEmptySchema = baseComponentSchema.extend({
  type: z.literal("CommandEmpty"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

export const commandGroupSchema = baseComponentSchema.extend({
  type: z.literal("CommandGroup"),
  heading: z.string().optional(),
  children: z.array(z.any()).optional(),
});

export const commandSeparatorSchema = baseComponentSchema.extend({
  type: z.literal("CommandSeparator"),
});

export const commandItemSchema = baseComponentSchema.extend({
  type: z.literal("CommandItem"),
  onSelect: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  value: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  disabled: z.boolean().optional(),
  forceMount: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

export const commandShortcutSchema = baseComponentSchema.extend({
  type: z.literal("CommandShortcut"),
  children: z.string().optional(),
});

export type CommandProps = z.infer<typeof commandSchema>;
export type CommandDialogProps = z.infer<typeof commandDialogSchema>;
export type CommandInputProps = z.infer<typeof commandInputSchema>;
export type CommandListProps = z.infer<typeof commandListSchema>;
export type CommandEmptyProps = z.infer<typeof commandEmptySchema>;
export type CommandGroupProps = z.infer<typeof commandGroupSchema>;
export type CommandSeparatorProps = z.infer<typeof commandSeparatorSchema>;
export type CommandItemProps = z.infer<typeof commandItemSchema>;
export type CommandShortcutProps = z.infer<typeof commandShortcutSchema>;