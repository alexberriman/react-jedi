import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Popover root component
export const popoverSchema = baseComponentSchema.extend({
  type: z.literal("Popover"),
  open: z.boolean().optional(),
  defaultOpen: z.boolean().optional(),
  onOpenChange: z.function().optional(),
  modal: z.boolean().optional(),
  children: z.any(), // Required for popover content
});

// PopoverTrigger component
export const popoverTriggerSchema = baseComponentSchema.extend({
  type: z.literal("PopoverTrigger"),
  asChild: z.boolean().optional(),
  children: z.any(), // Required for trigger content
});

// PopoverContent component
export const popoverContentSchema = baseComponentSchema.extend({
  type: z.literal("PopoverContent"),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  sideOffset: z.number().optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  alignOffset: z.number().optional(),
  avoidCollisions: z.boolean().optional(),
  collisionBoundary: z.any().optional(),
  collisionPadding: z.union([
    z.number(),
    z.object({
      top: z.number().optional(),
      right: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
    }),
  ]).optional(),
  sticky: z.enum(["partial", "always"]).optional(),
  hideWhenDetached: z.boolean().optional(),
  children: z.any(), // Required for content
});

// PopoverAnchor component
export const popoverAnchorSchema = baseComponentSchema.extend({
  type: z.literal("PopoverAnchor"),
  asChild: z.boolean().optional(),
  children: z.any(), // Required for anchor content
});

// Export types
export type PopoverProps = z.infer<typeof popoverSchema>;
export type PopoverTriggerProps = z.infer<typeof popoverTriggerSchema>;
export type PopoverContentProps = z.infer<typeof popoverContentSchema>;
export type PopoverAnchorProps = z.infer<typeof popoverAnchorSchema>;