import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Main Dialog container schema
export const dialogSchema = baseComponentSchema.extend({
  type: z.literal("Dialog"),
  open: z.boolean().optional(),
  defaultOpen: z.boolean().optional(),
  modal: z.boolean().optional(),
  children: z.any(),
  onOpenChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

// DialogTrigger schema
export const dialogTriggerSchema = baseComponentSchema.extend({
  type: z.literal("DialogTrigger"),
  asChild: z.boolean().optional(),
  children: z.any(),
});

// DialogPortal schema
export const dialogPortalSchema = baseComponentSchema.extend({
  type: z.literal("DialogPortal"),
  forceMount: z.boolean().optional(),
  container: z.any().optional(),
  children: z.any(),
});

// DialogOverlay schema
export const dialogOverlaySchema = baseComponentSchema.extend({
  type: z.literal("DialogOverlay"),
  forceMount: z.boolean().optional(),
  children: z.any().optional(),
});

// DialogContent schema
export const dialogContentSchema = baseComponentSchema.extend({
  type: z.literal("DialogContent"),
  forceMount: z.boolean().optional(),
  onOpenAutoFocus: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onCloseAutoFocus: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onEscapeKeyDown: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onPointerDownOutside: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onInteractOutside: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  children: z.any(),
});

// DialogClose schema
export const dialogCloseSchema = baseComponentSchema.extend({
  type: z.literal("DialogClose"),
  asChild: z.boolean().optional(),
  children: z.any(),
});

// DialogHeader schema
export const dialogHeaderSchema = baseComponentSchema.extend({
  type: z.literal("DialogHeader"),
  children: z.any(),
});

// DialogFooter schema
export const dialogFooterSchema = baseComponentSchema.extend({
  type: z.literal("DialogFooter"),
  children: z.any(),
});

// DialogTitle schema
export const dialogTitleSchema = baseComponentSchema.extend({
  type: z.literal("DialogTitle"),
  asChild: z.boolean().optional(),
  children: z.any(),
});

// DialogDescription schema
export const dialogDescriptionSchema = baseComponentSchema.extend({
  type: z.literal("DialogDescription"),
  asChild: z.boolean().optional(),
  children: z.any(),
});

export type DialogProps = z.infer<typeof dialogSchema>;
export type DialogTriggerProps = z.infer<typeof dialogTriggerSchema>;
export type DialogPortalProps = z.infer<typeof dialogPortalSchema>;
export type DialogOverlayProps = z.infer<typeof dialogOverlaySchema>;
export type DialogContentProps = z.infer<typeof dialogContentSchema>;
export type DialogCloseProps = z.infer<typeof dialogCloseSchema>;
export type DialogHeaderProps = z.infer<typeof dialogHeaderSchema>;
export type DialogFooterProps = z.infer<typeof dialogFooterSchema>;
export type DialogTitleProps = z.infer<typeof dialogTitleSchema>;
export type DialogDescriptionProps = z.infer<typeof dialogDescriptionSchema>;