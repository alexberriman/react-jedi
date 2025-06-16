import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const pricingFeatureSchema = z.object({
  text: z.string(),
  included: z.boolean(),
  tooltip: z.string().optional(),
});

const pricingTierSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  price: z.union([z.number(), z.string()]),
  monthlyPrice: z.union([z.number(), z.string()]).optional(),
  yearlyPrice: z.union([z.number(), z.string()]).optional(),
  currency: z.string().optional(),
  period: z.string().optional(),
  features: z.array(pricingFeatureSchema),
  cta: z.object({
    text: z.string(),
    variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).optional(),
    href: z.string().optional(),
    onClick: z.function().optional(),
  }),
  badge: z.string().optional(),
  highlighted: z.boolean().optional(),
  popular: z.boolean().optional(),
  icon: z.any().optional(),
  customIcon: z.any().optional(),
  savings: z.string().optional(),
});

const testimonialSchema = z.object({
  tierName: z.string(),
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
});

export const pricingTableSchema = baseComponentSchema.extend({
  type: z.literal("PricingTable"),
  tiers: z.array(pricingTierSchema),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  variant: z.enum([
    "cards",
    "comparison",
    "minimal",
    "compact",
    "with-testimonials",
    "gradient",
  ]).optional(),
  showToggle: z.boolean().optional(),
  defaultBillingCycle: z.enum(["monthly", "yearly"]).optional(),
  onBillingCycleChange: z.function().args(z.enum(["monthly", "yearly"])).returns(z.void()).optional(),
  currency: z.string().optional(),
  showFeatureComparison: z.boolean().optional(),
  animated: z.boolean().optional(),
  testimonials: z.array(testimonialSchema).optional(),
});

export type PricingTableProps = z.infer<typeof pricingTableSchema>;