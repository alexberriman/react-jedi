import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

/**
 * Schema for the AspectRatio component
 */
export const aspectRatioSchema = baseComponentSchema.extend({
  type: z.literal("AspectRatio"),
  
  /**
   * The ratio of the width to height (e.g. 16/9, 1, 4/3)
   */
  ratio: z.number().optional(),
  
  /**
   * Child components or content
   */
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional()
});

export type AspectRatioProps = z.infer<typeof aspectRatioSchema>;