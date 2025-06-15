import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Sheet root schema
export const sheetSchema = baseComponentSchema.extend({
  type: z.literal("Sheet"),
  open: z.boolean().optional(),
  defaultOpen: z.boolean().optional(),
  onOpenChange: z.function().optional(),
  modal: z.boolean().optional(),
  children: z.any().optional(),
});

// SheetTrigger schema
export const sheetTriggerSchema = baseComponentSchema.extend({
  type: z.literal("SheetTrigger"),
  asChild: z.boolean().optional(),
  children: z.any().optional(),
});

// SheetContent schema
export const sheetContentSchema = baseComponentSchema.extend({
  type: z.literal("SheetContent"),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  animated: z.boolean().optional(),
  children: z.any().optional(),
  onInteractOutside: z.function().optional(),
  onEscapeKeyDown: z.function().optional(),
  forceMount: z.boolean().optional(),
});

// SheetHeader schema
export const sheetHeaderSchema = baseComponentSchema.extend({
  type: z.literal("SheetHeader"),
  children: z.any().optional(),
});

// SheetFooter schema
export const sheetFooterSchema = baseComponentSchema.extend({
  type: z.literal("SheetFooter"),
  children: z.any().optional(),
});

// SheetTitle schema
export const sheetTitleSchema = baseComponentSchema.extend({
  type: z.literal("SheetTitle"),
  children: z.any().optional(),
});

// SheetDescription schema
export const sheetDescriptionSchema = baseComponentSchema.extend({
  type: z.literal("SheetDescription"),
  children: z.any().optional(),
});

// SheetClose schema
export const sheetCloseSchema = baseComponentSchema.extend({
  type: z.literal("SheetClose"),
  asChild: z.boolean().optional(),
  children: z.any().optional(),
});

export type SheetProps = z.infer<typeof sheetSchema>;
export type SheetTriggerProps = z.infer<typeof sheetTriggerSchema>;
export type SheetContentProps = z.infer<typeof sheetContentSchema>;
export type SheetHeaderProps = z.infer<typeof sheetHeaderSchema>;
export type SheetFooterProps = z.infer<typeof sheetFooterSchema>;
export type SheetTitleProps = z.infer<typeof sheetTitleSchema>;
export type SheetDescriptionProps = z.infer<typeof sheetDescriptionSchema>;
export type SheetCloseProps = z.infer<typeof sheetCloseSchema>;