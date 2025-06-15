import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Main Tabs container schema
export const tabsSchema = baseComponentSchema.extend({
  type: z.literal("Tabs"),
  defaultValue: z.string().optional(),
  value: z.string().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  dir: z.enum(["ltr", "rtl"]).optional(),
  activationMode: z.enum(["automatic", "manual"]).optional(),
  animate: z.boolean().optional(),
  children: z.any(),
  onValueChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

// TabsList schema
export const tabsListSchema = baseComponentSchema.extend({
  type: z.literal("TabsList"),
  loop: z.boolean().optional(),
  children: z.any(),
});

// TabsTrigger schema
export const tabsTriggerSchema = baseComponentSchema.extend({
  type: z.literal("TabsTrigger"),
  value: z.string(),
  disabled: z.boolean().optional(),
  children: z.any(),
});

// TabsContent schema
export const tabsContentSchema = baseComponentSchema.extend({
  type: z.literal("TabsContent"),
  value: z.string(),
  forceMount: z.boolean().optional(),
  children: z.any(),
});

export type TabsProps = z.infer<typeof tabsSchema>;
export type TabsListProps = z.infer<typeof tabsListSchema>;
export type TabsTriggerProps = z.infer<typeof tabsTriggerSchema>;
export type TabsContentProps = z.infer<typeof tabsContentSchema>;