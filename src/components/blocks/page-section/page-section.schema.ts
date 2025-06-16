import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Layout schema
const layoutSchema = z.object({
  type: z.enum(["default", "image-left", "image-right", "two-column", "centered", "hero", "feature-alternating"]),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  imagePosition: z.enum(["start", "center", "end"]).optional(),
  imageZoomOnHover: z.boolean().optional(),
  imageRounded: z.boolean().optional(),
  imageShadow: z.boolean().optional(),
  imageOverlay: z.boolean().optional(),
  contentWidth: z.enum(["narrow", "medium", "wide", "full"]).optional(),
  contentSpacing: z.enum(["tight", "normal", "relaxed"]).optional(),
  reverseOnMobile: z.boolean().optional(),
});

// Background schema
const backgroundSchema = z.object({
  type: z.enum(["color", "gradient", "image", "pattern"]),
  value: z.string(),
  opacity: z.number().optional(),
});

// Heading schema
const headingSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  alignment: z.enum(["left", "center", "right"]).optional(),
});

// CTA schema
const ctaSchema = z.object({
  text: z.string(),
  href: z.string().optional(),
  variant: z.enum(["default", "secondary", "outline", "ghost", "destructive"]).optional(),
  size: z.enum(["sm", "default", "lg"]).optional(),
});

// Main page section schema
export const pageSectionSchema = baseComponentSchema.extend({
  type: z.literal("page-section"),
  
  // Layout
  variant: z.enum(["full-width", "contained", "split", "angled", "curved", "pattern"]).optional(),
  layout: layoutSchema.optional(),
  
  // Background
  background: backgroundSchema.optional(),
  alternateBackground: z.boolean().optional(),
  
  // Content
  heading: headingSchema.optional(),
  description: z.string().optional(),
  ctas: z.array(ctaSchema).optional(),
  
  // Layout settings
  padding: z.enum(["none", "sm", "md", "lg", "xl", "2xl"]).optional(),
  contentAlignment: z.enum(["left", "center", "right"]).optional(),
  
  // Effects
  parallax: z.boolean().optional(),
  animate: z.boolean().optional(),
  animationType: z.enum(["fade", "slide", "zoom", "slide-left", "slide-right"]).optional(),
  
  // Dividers
  dividerTop: z.enum(["wave", "angle", "curve", "none"]).optional(),
  dividerBottom: z.enum(["wave", "angle", "curve", "none"]).optional(),
  dividerColor: z.string().optional(),
  
  // Other
  sectionIndex: z.number().optional(),
  children: z.any(), // React node
});

export type PageSectionProps = z.infer<typeof pageSectionSchema>;