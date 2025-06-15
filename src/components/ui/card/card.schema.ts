import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Main Card schema
export const cardSchema = baseComponentSchema.extend({
  type: z.literal("Card"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// CardHeader schema
export const cardHeaderSchema = baseComponentSchema.extend({
  type: z.literal("CardHeader"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// CardTitle schema
export const cardTitleSchema = baseComponentSchema.extend({
  type: z.literal("CardTitle"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// CardDescription schema
export const cardDescriptionSchema = baseComponentSchema.extend({
  type: z.literal("CardDescription"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// CardAction schema
export const cardActionSchema = baseComponentSchema.extend({
  type: z.literal("CardAction"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// CardContent schema
export const cardContentSchema = baseComponentSchema.extend({
  type: z.literal("CardContent"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// CardFooter schema
export const cardFooterSchema = baseComponentSchema.extend({
  type: z.literal("CardFooter"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// CardImage schema
export const cardImageSchema = baseComponentSchema.extend({
  type: z.literal("CardImage"),
  src: z.string(),
  alt: z.string().optional(),
  variant: z.enum(["cover", "contain", "zoom"]).optional(),
  overlay: z.boolean().optional(),
  animated: z.boolean().optional(),
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  loading: z.enum(["lazy", "eager"]).optional(),
});

// Export types
export type CardProps = z.infer<typeof cardSchema>;
export type CardHeaderProps = z.infer<typeof cardHeaderSchema>;
export type CardTitleProps = z.infer<typeof cardTitleSchema>;
export type CardDescriptionProps = z.infer<typeof cardDescriptionSchema>;
export type CardActionProps = z.infer<typeof cardActionSchema>;
export type CardContentProps = z.infer<typeof cardContentSchema>;
export type CardFooterProps = z.infer<typeof cardFooterSchema>;
export type CardImageProps = z.infer<typeof cardImageSchema>;