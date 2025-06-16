import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const logoSchema = z.object({
  id: z.string(),
  name: z.string(),
  lightSrc: z.string(),
  darkSrc: z.string().optional(),
  href: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const brandLogoBarSchema = baseComponentSchema
  .extend({
    type: z.literal("BrandLogoBar"),
    logos: z.array(logoSchema),
    variant: z
      .enum(["scrolling", "grid", "withHeading", "grayscale", "compact"])
      .optional(),
    heading: z.string().optional(),
    headingPosition: z.enum(["above", "left"]).optional(),
    size: z.enum(["small", "medium", "large"]).optional(),
    spacing: z.enum(["tight", "normal", "loose"]).optional(),
    pauseOnHover: z.boolean().optional(),
    scrollSpeed: z.number().optional(),
    columns: z.union([
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
      z.literal(6),
    ]).optional(),
    animated: z.boolean().optional(),
    children: z.any().optional(), // React.ReactNode
  })
  .describe("Brand logo bar component for displaying partner/client logos");

export type BrandLogoBarSchema = z.infer<typeof brandLogoBarSchema>;