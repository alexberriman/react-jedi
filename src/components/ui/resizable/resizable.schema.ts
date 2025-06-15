import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// ResizablePanelGroup component
export const resizablePanelGroupSchema = z.object({
  type: z.literal("ResizablePanelGroup"),
  className: z.string().optional(),
  id: z.string().optional(),
  dataAttributes: z.record(z.string(), z.string()).optional(),
  ariaAttributes: z.record(z.string(), z.string()).optional(),
  events: z.record(z.string(), z.unknown()).optional(),
  style: z.record(z.string(), z.string()).optional(),
  testId: z.string().optional(),
  direction: z.enum(["horizontal", "vertical"]).optional(),
  autoSaveId: z.string().optional(),
  children: z.any(), // Required for panels
});

// ResizablePanel component
export const resizablePanelSchema = baseComponentSchema.extend({
  type: z.literal("ResizablePanel"),
  defaultSize: z.number().optional(),
  minSize: z.number().optional(),
  maxSize: z.number().optional(),
  collapsible: z.boolean().optional(),
  collapsedSize: z.number().optional(),
  onCollapse: z.function().optional(),
  onExpand: z.function().optional(),
  children: z.any(), // Required for panel content
});

// ResizableHandle component
export const resizableHandleSchema = baseComponentSchema.extend({
  type: z.literal("ResizableHandle"),
  withHandle: z.boolean().optional(),
  iconName: z.string().optional(),
  disabled: z.boolean().optional(),
  children: z.any().optional(),
});

// Export types
export type ResizablePanelGroupProps = z.infer<typeof resizablePanelGroupSchema>;
export type ResizablePanelProps = z.infer<typeof resizablePanelSchema>;
export type ResizableHandleProps = z.infer<typeof resizableHandleSchema>;