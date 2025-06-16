import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// CTA schema
const ctaSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  onClick: z.any().optional(),
  variant: z.enum(["default", "outline", "secondary", "ghost", "link", "destructive"]).optional(),
  size: z.enum(["default", "sm", "lg"]).optional(),
  icon: z.enum(["arrow", "chevron", "play", "none"]).optional(),
  iconPosition: z.enum(["left", "right"]).optional(),
});

// Badge schema
const badgeSchema = z.object({
  text: z.string(),
  variant: z.enum(["default", "secondary", "destructive", "outline"]).optional(),
});

// Stat schema
const statSchema = z.object({
  value: z.string(),
  label: z.string(),
});

// Image schema
const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  position: z.enum(["right", "left", "background", "bottom"]).optional(),
  objectFit: z.enum(["contain", "cover", "fill", "none", "scale-down"]).optional(),
  priority: z.boolean().optional(),
});

// Video schema
const videoSchema = z.object({
  src: z.string(),
  poster: z.string().optional(),
  autoPlay: z.boolean().optional(),
  loop: z.boolean().optional(),
  muted: z.boolean().optional(),
});

// Background image schema
const backgroundImageSchema = z.object({
  src: z.string(),
  overlay: z.enum(["dark", "light", "gradient", "none"]).optional(),
  overlayOpacity: z.number().optional(),
  parallax: z.boolean().optional(),
});

// Tertiary link schema
const tertiaryLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

// Main page hero header schema
export const pageHeroHeaderSchema = baseComponentSchema.extend({
  type: z.literal("page-hero-header"),
  
  // Layout variant
  variant: z.enum(["centered", "split", "fullscreen", "minimal", "left-aligned", "right-aligned", "multi-column"]).optional(),
  
  // Content
  title: z.string(),
  titleLevel: z.enum(["h1", "h2", "h3"]).optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  
  // CTAs
  primaryCTA: ctaSchema.optional(),
  secondaryCTA: ctaSchema.optional(),
  tertiaryLink: tertiaryLinkSchema.optional(),
  
  // Additional elements
  badges: z.array(badgeSchema).optional(),
  stats: z.array(statSchema).optional(),
  
  // Media
  image: imageSchema.optional(),
  video: videoSchema.optional(),
  backgroundImage: backgroundImageSchema.optional(),
  
  // Layout settings
  height: z.enum(["full", "large", "medium", "auto"]).optional(),
  alignment: z.enum(["left", "center", "right"]).optional(),
  spacing: z.enum(["tight", "normal", "loose"]).optional(),
  maxWidth: z.enum(["sm", "md", "lg", "xl", "2xl", "full"]).optional(),
  
  // Styling
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  animated: z.boolean().optional(),
});

export type PageHeroHeaderProps = z.infer<typeof pageHeroHeaderSchema>;