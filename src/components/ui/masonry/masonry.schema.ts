import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Schema for animation settings
const animationSchema = z.object({
  duration: z.number().optional(),
  stagger: z.number().optional(),
  easing: z.string().optional(),
});

// Schema for responsive values
const responsiveNumberSchema = z.union([
  z.number(),
  z.object({
    base: z.number().optional(),
    sm: z.number().optional(),
    md: z.number().optional(),
    lg: z.number().optional(),
    xl: z.number().optional(),
    "2xl": z.number().optional(),
  }),
]);

export const masonrySchema = baseComponentSchema.extend({
  type: z.literal("Masonry"),
  columns: responsiveNumberSchema.optional(),
  gap: responsiveNumberSchema.optional(),
  minColWidth: z.string().optional(),
  autoFit: z.boolean().optional(),
  animation: animationSchema.optional(),
  glassmorphic: z.boolean().optional(),
  itemComponent: z.string().optional(),
  children: z.any(), // Required for masonry content
});

export type MasonryProps = z.infer<typeof masonrySchema>;