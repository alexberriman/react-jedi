import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Main Collapsible container schema
export const collapsibleSchema = baseComponentSchema.extend({
  type: z.literal("Collapsible"),
  
  // Children components
  children: z.any().optional(),
  
  // Controlled state
  open: z.boolean().optional(),
  onOpenChangeAction: z.string().optional(),
  
  // Default state
  defaultOpen: z.boolean().optional(),
  
  // Accessibility
  disabled: z.boolean().optional(),
});

// Collapsible trigger schema
export const collapsibleTriggerSchema = baseComponentSchema.extend({
  type: z.literal("CollapsibleTrigger"),
  
  // Children content
  children: z.any().optional(),
  
  // Accessibility
  asChild: z.boolean().optional(),
});

// Collapsible content schema
export const collapsibleContentSchema = baseComponentSchema.extend({
  type: z.literal("CollapsibleContent"),
  
  // Children content
  children: z.any().optional(),
});

export type CollapsibleSchema = z.infer<typeof collapsibleSchema>;
export type CollapsibleTriggerSchema = z.infer<typeof collapsibleTriggerSchema>;
export type CollapsibleContentSchema = z.infer<typeof collapsibleContentSchema>;