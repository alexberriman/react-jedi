import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const statTrendSchema = z.object({
  value: z.number(),
  direction: z.enum(["up", "down", "neutral"]),
  label: z.string().optional(),
});

const statItemSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  unit: z.string().optional(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  description: z.string().optional(),
  trend: statTrendSchema.optional(),
  icon: z.string().optional(),
  iconPosition: z.enum(["top", "left", "right"]).optional(),
  color: z.enum(["default", "primary", "secondary", "success", "warning", "error"]).optional(),
  href: z.string().optional(),
});

export const statBlockSchema = baseComponentSchema.extend({
  type: z.literal("StatBlock"),
  variant: z.enum([
    "grid",
    "horizontal",
    "vertical",
    "card",
    "minimal",
    "detailed",
    "gradient",
    "glass",
    "modern",
    "neon"
  ]).optional(),
  stats: z.array(statItemSchema),
  columns: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6)
  ]).optional(),
  gap: z.enum(["sm", "md", "lg", "xl"]).optional(),
  alignment: z.enum(["left", "center", "right"]).optional(),
  showBorder: z.boolean().optional(),
  showBackground: z.boolean().optional(),
  showTrend: z.boolean().optional(),
  showDescription: z.boolean().optional(),
  showIcon: z.boolean().optional(),
  animated: z.boolean().optional(),
  animationDuration: z.number().optional(),
  staggerDelay: z.number().optional(),
  countUp: z.boolean().optional(),
  countUpDuration: z.number().optional(),
  size: z.enum(["sm", "md", "lg", "xl"]).optional(),
  valueSize: z.enum(["sm", "md", "lg", "xl", "2xl", "3xl"]).optional(),
  labelSize: z.enum(["xs", "sm", "md", "lg"]).optional(),
});

export type StatBlockProps = z.infer<typeof statBlockSchema>;