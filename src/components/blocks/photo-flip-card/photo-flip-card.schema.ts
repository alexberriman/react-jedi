import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Overlay schema
const overlaySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  badge: z.string().optional(),
  content: z.any().optional(), // React node
});

// CTA schema
const ctaSchema = z.object({
  text: z.string(),
  variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).optional(),
  onClick: z.any().optional(),
  href: z.string().optional(),
});

// Gradient overlay schema
const gradientOverlaySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  direction: z.enum(["to-t", "to-tr", "to-r", "to-br", "to-b", "to-bl", "to-l", "to-tl"]).optional(),
  opacity: z.number().optional(),
});

// Main photo flip card schema
export const photoFlipCardSchema = baseComponentSchema.extend({
  type: z.literal("photo-flip-card"),
  
  // Required image
  frontImage: z.string(),
  frontImageAlt: z.string().optional(),
  
  // Front content
  title: z.string().optional(),
  description: z.string().optional(),
  
  // Back overlay content
  overlay: overlaySchema.optional(),
  
  // CTA
  cta: ctaSchema.optional(),
  
  // Animation variant
  variant: z.enum(["vertical-flip", "horizontal-flip", "fade", "slide-reveal", "rotation-3d"]).optional(),
  
  // Sizing
  size: z.enum(["sm", "md", "lg", "xl", "auto"]).optional(),
  aspectRatio: z.enum(["square", "video", "portrait", "wide", "auto"]).optional(),
  
  // Styling
  borderRadius: z.enum(["none", "sm", "md", "lg", "xl", "full"]).optional(),
  trigger: z.enum(["hover", "click", "touch"]).optional(),
  gradientOverlay: gradientOverlaySchema.optional(),
  shadow: z.enum(["none", "sm", "md", "lg", "xl", "2xl"]).optional(),
  
  // Animation
  animated: z.boolean().optional(),
  animationDuration: z.number().optional(),
});

export type PhotoFlipCardProps = z.infer<typeof photoFlipCardSchema>;