import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Main Avatar schema
export const avatarSchema = baseComponentSchema.extend({
  type: z.literal("Avatar"),
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional(),
  asChild: z.boolean().optional(),
});

// AvatarImage schema
export const avatarImageSchema = baseComponentSchema.extend({
  type: z.literal("AvatarImage"),
  src: z.string(),
  alt: z.string().optional(),
  asChild: z.boolean().optional(),
  onLoadingStatusChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

// AvatarFallback schema
export const avatarFallbackSchema = baseComponentSchema.extend({
  type: z.literal("AvatarFallback"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
  asChild: z.boolean().optional(),
  delayMs: z.number().optional(),
});

// Export types
export type AvatarProps = z.infer<typeof avatarSchema>;
export type AvatarImageProps = z.infer<typeof avatarImageSchema>;
export type AvatarFallbackProps = z.infer<typeof avatarFallbackSchema>;