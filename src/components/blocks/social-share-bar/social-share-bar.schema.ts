import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const socialShareBarSchema = baseComponentSchema.extend({
  type: z.literal("SocialShareBar"),
  url: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  variant: z.enum(["horizontal", "vertical", "floating", "modal", "minimal"]).optional(),
  position: z.enum([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "center-left",
    "center-right"
  ]).optional(),
  showCounts: z.boolean().optional(),
  animated: z.boolean().optional(),
  platforms: z.array(
    z.enum(["twitter", "facebook", "linkedin", "reddit", "email", "copy"])
  ).optional(),
  sticky: z.boolean().optional(),
  onShare: z.string().optional(),
  counts: z.record(z.string(), z.number()).optional(),
  size: z.enum(["sm", "md", "lg"]).optional(),
  showLabels: z.boolean().optional(),
  colorScheme: z.enum(["default", "brand", "monochrome", "gradient"]).optional(),
});

export type SocialShareBarProps = z.infer<typeof socialShareBarSchema>;