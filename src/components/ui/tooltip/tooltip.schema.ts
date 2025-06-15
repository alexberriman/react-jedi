import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * TooltipProvider component schema
 *
 * Provider component that wraps the entire tooltip context.
 * Must wrap all Tooltip components.
 */
export const tooltipProviderSchema = baseComponentSchema.extend({
  type: z.literal("TooltipProvider"),

  /**
   * The delay in milliseconds before the tooltip appears
   */
  delayDuration: z.number().optional(),

  /**
   * The delay in milliseconds before the tooltip hides when the pointer leaves
   */
  skipDelayDuration: z.number().optional(),

  /**
   * When true, tooltip can be shown immediately without delay when switching targets
   */
  disableHoverableContent: z.boolean().optional(),

  /**
   * Child components
   */
  children: z.any().optional(),
});

/**
 * Tooltip component schema
 *
 * The root component that provides context for tooltip parts.
 * Based on Radix UI Tooltip primitive.
 */
export const tooltipSchema = baseComponentSchema.extend({
  type: z.literal("Tooltip"),

  /**
   * The open state of the tooltip when initially rendered (uncontrolled)
   */
  defaultOpen: z.boolean().optional(),

  /**
   * The controlled open state of the tooltip
   */
  open: z.boolean().optional(),

  /**
   * Callback fired when the open state changes
   */
  onOpenChange: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),

  /**
   * Child components (TooltipTrigger and TooltipContent)
   */
  children: z.any().optional(),
});

/**
 * TooltipTrigger component schema
 *
 * The element that triggers the tooltip.
 */
export const tooltipTriggerSchema = baseComponentSchema.extend({
  type: z.literal("TooltipTrigger"),

  /**
   * Merge props onto child element instead of creating a wrapper
   */
  asChild: z.boolean().optional(),

  /**
   * Child element that will trigger the tooltip
   */
  children: z.any().optional(),
});

/**
 * TooltipContent component schema
 *
 * The content displayed in the tooltip.
 */
export const tooltipContentSchema = baseComponentSchema.extend({
  type: z.literal("TooltipContent"),

  /**
   * The side of the trigger to position the tooltip
   */
  side: z.enum(["top", "right", "bottom", "left"]).optional(),

  /**
   * The distance in pixels from the trigger
   */
  sideOffset: z.number().optional(),

  /**
   * The alignment of the tooltip relative to the trigger
   */
  align: z.enum(["start", "center", "end"]).optional(),

  /**
   * The distance in pixels from the align point
   */
  alignOffset: z.number().optional(),

  /**
   * Whether the tooltip should avoid collisions with boundary edges
   */
  avoidCollisions: z.boolean().optional(),

  /**
   * The element used as the collision boundary
   */
  collisionBoundary: z.any().optional(),

  /**
   * The distance in pixels from the boundary edges
   */
  collisionPadding: z.union([z.number(), z.object({
    top: z.number().optional(),
    right: z.number().optional(),
    bottom: z.number().optional(),
    left: z.number().optional(),
  })]).optional(),

  /**
   * Whether the tooltip has an arrow pointing to the trigger
   */
  arrow: z.boolean().optional(),

  /**
   * Whether the tooltip should close when the trigger is clicked
   */
  sticky: z.enum(["partial", "always"]).optional(),

  /**
   * Whether to hide the tooltip when the trigger or content is scrolled
   */
  hideWhenDetached: z.boolean().optional(),

  /**
   * Child content to display in the tooltip
   */
  children: z.any().optional(),
});

export type TooltipProviderSchema = z.infer<typeof tooltipProviderSchema>;
export type TooltipSchema = z.infer<typeof tooltipSchema>;
export type TooltipTriggerSchema = z.infer<typeof tooltipTriggerSchema>;
export type TooltipContentSchema = z.infer<typeof tooltipContentSchema>;