import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Separator component schema
 *
 * Visual or semantic separator between content sections.
 * Based on Radix UI Separator primitive.
 */
export const separatorSchema = baseComponentSchema.extend({
  type: z.literal("Separator"),

  /**
   * The orientation of the separator
   */
  orientation: z.enum(["horizontal", "vertical"]).optional(),

  /**
   * Whether the separator is purely decorative or has semantic meaning.
   * When true, the separator will have role="none" for accessibility.
   * When false, it will have role="separator".
   */
  decorative: z.boolean().optional(),
});

export type SeparatorSchema = z.infer<typeof separatorSchema>;