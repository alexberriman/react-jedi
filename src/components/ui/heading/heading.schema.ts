import { z } from "zod";

/**
 * Schema for Heading component specifications.
 * This defines the JSON structure for heading elements with various styling options.
 */
export const headingSchema = z.object({
  type: z.literal("heading"),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).optional().default("h2"),
  text: z.string(),
  size: z.enum(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]).optional(),
  weight: z
    .enum([
      "thin",
      "extralight",
      "light",
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
      "black",
    ])
    .optional(),
  align: z.enum(["left", "center", "right"]).optional(),
  transform: z.enum(["uppercase", "lowercase", "capitalize", "normal"]).optional(),
  variant: z.enum(["default", "primary", "secondary", "accent", "muted", "destructive"]).optional(),
  decoration: z.enum(["none", "underline", "line-through"]).optional(),
  gradient: z.enum(["none", "primary", "rainbow", "sunset", "ocean", "neon", "golden"]).optional(),
  shadow: z.enum(["none", "sm", "md", "lg", "xl", "2xl"]).optional(),
  animation: z.enum(["none", "glow", "pulse", "bounce", "shimmer"]).optional(),
  className: z.string().optional(),
  id: z.string().optional(),
  style: z.record(z.string(), z.string()).optional(),
  data: z.record(z.string(), z.string()).optional(),
  testId: z.string().optional(),
  onClick: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
});

export type HeadingSpecification = z.infer<typeof headingSchema>;

/**
 * Example heading specification:
 *
 * ```json
 * {
 *   "type": "heading",
 *   "level": "h1",
 *   "text": "Welcome to Our Platform",
 *   "gradient": "rainbow",
 *   "align": "center",
 *   "weight": "extrabold",
 *   "className": "mb-6 tracking-tight"
 * }
 * ```
 *
 * More examples:
 *
 * ```json
 * {
 *   "type": "heading",
 *   "level": "h2",
 *   "text": "Featured Products",
 *   "variant": "primary",
 *   "size": "2xl",
 *   "weight": "bold"
 * }
 * ```
 *
 * ```json
 * {
 *   "type": "heading",
 *   "level": "h3",
 *   "text": "Limited Time Offer",
 *   "transform": "uppercase",
 *   "decoration": "underline",
 *   "variant": "accent"
 * }
 * ```
 */

export default headingSchema;
