import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Spacer component schema
 *
 * A layout component that creates consistent spacing between elements.
 * Can be used vertically or horizontally to add visual separation.
 */
export const spacerSchema = baseComponentSchema.extend({
  type: z.literal("Spacer"),

  /**
   * The amount of space to add
   */
  size: z.enum([
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl"
  ]).optional(),

  /**
   * The orientation of the spacer
   * @default "vertical"
   */
  orientation: z.enum(["horizontal", "vertical"]).optional(),

  /**
   * Whether to show a guide line in development (for debugging)
   * @default false
   */
  showGuide: z.boolean().optional(),
});

export type SpacerSchema = z.infer<typeof spacerSchema>;