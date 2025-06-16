import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const ctaSchema = z.object({
  text: z.string(),
  variant: z
    .enum(["default", "destructive", "outline", "secondary", "ghost", "link"])
    .optional(),
  onClick: z.function().optional(),
  href: z.string().optional(),
});

export const featureCardSchema = baseComponentSchema
  .extend({
    type: z.literal("FeatureCard"),
    title: z.string(),
    description: z.string().optional(),
    icon: z.union([z.string(), z.any()]).optional(), // string (icon name) or React.ReactNode
    iconColor: z.string().optional(),
    iconSize: z.enum(["sm", "md", "lg", "xl"]).optional(),
    badge: z.string().optional(),
    badgeVariant: z
      .enum(["default", "secondary", "destructive", "outline"])
      .optional(),
    variant: z
      .enum([
        "default",
        "highlighted",
        "minimal",
        "bordered",
        "gradient",
        "shadow",
        "glass",
      ])
      .optional(),
    iconPosition: z.enum(["top", "left", "right", "background"]).optional(),
    align: z.enum(["left", "center", "right"]).optional(),
    highlight: z.boolean().optional(),
    highlightColor: z.string().optional(),
    gradientFrom: z.string().optional(),
    gradientTo: z.string().optional(),
    gradientDirection: z
      .enum(["to-r", "to-br", "to-b", "to-bl", "to-l", "to-tl", "to-t", "to-tr"])
      .optional(),
    borderStyle: z
      .enum(["none", "solid", "dashed", "dotted", "double"])
      .optional(),
    shadowSize: z.enum(["none", "sm", "md", "lg", "xl", "2xl"]).optional(),
    cta: ctaSchema.optional(),
    link: z.string().optional(),
    onClick: z.function().optional(),
    animated: z.boolean().optional(),
    animationDelay: z.number().optional(),
    hoverEffect: z.enum(["none", "lift", "glow", "pulse", "rotate"]).optional(),
    category: z.string().optional(),
  })
  .describe("Feature card component for showcasing features with icons and customizable styling");

export type FeatureCardSchema = z.infer<typeof featureCardSchema>;