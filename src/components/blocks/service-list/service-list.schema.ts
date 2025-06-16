import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const serviceItemSchema = z.object({
  id: z.string(),
  icon: z.union([z.string(), z.any()]).optional(),
  image: z.string().optional(),
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()).optional(),
  pricing: z.object({
    price: z.string(),
    period: z.string().optional(),
    currency: z.string().optional(),
  }).optional(),
  badge: z.enum(["popular", "new", "recommended"]).optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  highlighted: z.boolean().optional(),
});

export const serviceListSchema = baseComponentSchema.extend({
  type: z.literal("ServiceList"),
  services: z.array(serviceItemSchema),
  variant: z.enum(["cards", "list", "alternating", "tabs", "accordion"]).optional(),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  animated: z.boolean().optional(),
  showComparison: z.boolean().optional(),
});

export type ServiceListProps = z.infer<typeof serviceListSchema>;