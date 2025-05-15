import { z } from "zod";

/**
 * Schema for Text component specifications.
 * This defines the JSON structure for text elements with various styling options.
 */
export const textSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  element: z
    .enum(["p", "span", "div", "blockquote", "code", "strong", "em", "small"])
    .optional()
    .default("p"),
  variant: z.enum(["default", "primary", "secondary", "accent", "muted", "destructive"]).optional(),
  size: z.enum(["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]).optional(),
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
  align: z.enum(["left", "center", "right", "justify"]).optional(),
  transform: z.enum(["uppercase", "lowercase", "capitalize", "normal"]).optional(),
  decoration: z.enum(["none", "underline", "line-through"]).optional(),
  italic: z.boolean().optional(),
  gradient: z.enum(["none", "primary", "rainbow", "sunset", "ocean", "neon", "golden"]).optional(),
  shadow: z.enum(["none", "sm", "md", "lg", "xl", "2xl"]).optional(),
  animation: z.enum(["none", "glow", "pulse", "bounce", "shimmer"]).optional(),
  truncate: z
    .union([z.boolean(), z.enum(["ellipsis", "multiline", "multiline-3", "multiline-4"])])
    .optional(),
  wrap: z.enum(["normal", "nowrap", "pre", "pre-line", "pre-wrap"]).optional(),
  lineHeight: z.enum(["none", "tight", "snug", "normal", "relaxed", "loose"]).optional(),
  tracking: z.enum(["tighter", "tight", "normal", "wide", "wider", "widest"]).optional(),
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

export type TextSpecification = z.infer<typeof textSchema>;

/**
 * Example text specification:
 *
 * ```json
 * {
 *   "type": "text",
 *   "text": "This is a paragraph with custom styling.",
 *   "size": "lg",
 *   "weight": "medium",
 *   "variant": "primary",
 *   "align": "center"
 * }
 * ```
 *
 * More examples:
 *
 * ```json
 * {
 *   "type": "text",
 *   "text": "This is a styled span element.",
 *   "element": "span",
 *   "gradient": "rainbow",
 *   "weight": "bold",
 *   "shadow": "md"
 * }
 * ```
 *
 * ```json
 * {
 *   "type": "text",
 *   "text": "A blockquote with inspiration.",
 *   "element": "blockquote",
 *   "variant": "muted",
 *   "italic": true
 * }
 * ```
 *
 * ```json
 * {
 *   "type": "text",
 *   "text": "This is a very long text that will be truncated after two lines to save space while giving readers a preview of the content.",
 *   "truncate": "multiline",
 *   "size": "sm"
 * }
 * ```
 */

export default textSchema;
