import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const hoverCardSchema = baseComponentSchema.extend({
  type: z.literal("hover-card"),
  defaultOpen: z.boolean().optional(),
  open: z.boolean().optional(),
  onOpenChange: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
  openDelay: z.number().optional(),
  closeDelay: z.number().optional(),
  children: z
    .array(
      z.union([
        z.object({
          type: z.literal("hover-card-trigger"),
          asChild: z.boolean().optional(),
          children: z.any(),
        }),
        z.object({
          type: z.literal("hover-card-content"),
          align: z.enum(["start", "center", "end"]).optional(),
          alignOffset: z.number().optional(),
          side: z.enum(["top", "right", "bottom", "left"]).optional(),
          sideOffset: z.number().optional(),
          collisionPadding: z
            .union([
              z.number(),
              z.object({
                top: z.number().optional(),
                right: z.number().optional(),
                bottom: z.number().optional(),
                left: z.number().optional(),
              }),
            ])
            .optional(),
          sticky: z.enum(["partial", "always"]).optional(),
          hideWhenDetached: z.boolean().optional(),
          avoidCollisions: z.boolean().optional(),
          forceMount: z.literal(true).optional(),
          className: z.string().optional(),
          children: z.any(),
        }),
      ])
    )
    .optional(),
});

export const hoverCardTriggerSchema = baseComponentSchema.extend({
  type: z.literal("hover-card-trigger"),
  asChild: z.boolean().optional(),
  children: z.any(),
});

export const hoverCardContentSchema = baseComponentSchema.extend({
  type: z.literal("hover-card-content"),
  align: z.enum(["start", "center", "end"]).optional(),
  alignOffset: z.number().optional(),
  side: z.enum(["top", "right", "bottom", "left"]).optional(),
  sideOffset: z.number().optional(),
  collisionPadding: z
    .union([
      z.number(),
      z.object({
        top: z.number().optional(),
        right: z.number().optional(),
        bottom: z.number().optional(),
        left: z.number().optional(),
      }),
    ])
    .optional(),
  sticky: z.enum(["partial", "always"]).optional(),
  hideWhenDetached: z.boolean().optional(),
  avoidCollisions: z.boolean().optional(),
  forceMount: z.literal(true).optional(),
  children: z.any(),
});

export type HoverCardSchema = z.infer<typeof hoverCardSchema>;
export type HoverCardTriggerSchema = z.infer<typeof hoverCardTriggerSchema>;
export type HoverCardContentSchema = z.infer<typeof hoverCardContentSchema>;