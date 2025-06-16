import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Timeline item schema
const timelineItemSchema = z.object({
  id: z.string(),
  date: z.union([z.string(), z.date()]),
  title: z.string(),
  description: z.string().optional(),
  icon: z.any().optional(), // React node - can't be strictly validated
  image: z.string().optional(),
  isMilestone: z.boolean().optional(),
  isPast: z.boolean().optional(),
  badge: z.string().optional(),
  content: z.any().optional(), // React node - can't be strictly validated
});

// Main timeline schema
export const timelineSchema = baseComponentSchema.extend({
  type: z.literal("Timeline"),
  items: z.array(timelineItemSchema),
  variant: z.enum(["vertical-centered", "vertical-alternating", "horizontal", "minimal", "with-images"]).optional(),
  lineStyle: z.enum(["solid", "dashed"]).optional(),
  animated: z.boolean().optional(),
});

export type TimelineProps = z.infer<typeof timelineSchema>;