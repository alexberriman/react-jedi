import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const buttonVariantSchema = z.enum(["default", "secondary", "destructive", "outline", "ghost", "link"]);

const heroActionSchema = z.object({
  text: z.string(),
  href: z.string().optional(),
  onClick: z.union([z.string(), z.function()]).optional(),
  variant: buttonVariantSchema.optional(),
});

export const heroSchema = baseComponentSchema.extend({
  type: z.literal("Hero"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  variant: z.enum(["centered", "left-aligned", "split"]).optional(),
  primaryAction: heroActionSchema.optional(),
  secondaryAction: heroActionSchema.optional(),
  backgroundImage: z.string().optional(),
  backgroundVideo: z.string().optional(),
  backgroundGradient: z.string().optional(),
  backgroundOverlay: z.boolean().optional(),
  animated: z.boolean().optional(),
  floatingShapes: z.boolean().optional(),
  parallax: z.boolean().optional(),
  children: z.any().optional(),
});

export type HeroProps = z.infer<typeof heroSchema>;