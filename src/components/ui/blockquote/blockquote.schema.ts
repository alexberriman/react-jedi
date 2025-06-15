import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const blockquoteSchema = baseComponentSchema.extend({
  type: z.literal("Blockquote"),
  
  // Text content
  children: z.union([z.string(), z.any()]).optional(),
  
  // Metadata
  cite: z.string().optional(),
  author: z.string().optional(),
  
  // Styling variants
  variant: z
    .enum(["default", "primary", "secondary", "accent", "muted", "destructive"])
    .optional(),
  size: z.enum(["sm", "base", "lg", "xl"]).optional(),
  styleVariant: z
    .enum(["classic", "modern", "elegant", "minimal", "decorative", "glossy"])
    .optional(),
  
  // Animation
  animation: z.enum(["none", "fadeIn", "slideIn", "pulse", "shimmer"]).optional(),
  
  // Visual properties
  shadow: z.enum(["none", "sm", "md", "lg"]).optional(),
  rounded: z.enum(["none", "sm", "md", "lg", "full"]).optional(),
});

export type BlockquoteSchema = z.infer<typeof blockquoteSchema>;