import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const featureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  image: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  category: z.string().optional(),
  status: z.enum(['available', 'coming-soon', 'beta']).optional(),
  badge: z.string().optional(),
});

export const featuresSchema = baseComponentSchema.extend({
  type: z.literal("Features"),
  features: z.array(featureSchema),
  variant: z.enum(['grid', 'alternating', 'tabbed', 'icon-focused', 'comparison']).optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  categories: z.array(z.string()).optional(),
  comparisonPlans: z.array(z.string()).optional(),
  gridColumns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  showBenefits: z.boolean().optional(),
  animated: z.boolean().optional(),
  onFeatureClick: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export type FeaturesProps = z.infer<typeof featuresSchema>;