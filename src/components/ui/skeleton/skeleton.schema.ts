import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Skeleton component schema
 *
 * A placeholder component that shows a loading state with an animated pulse effect.
 * Used to indicate content is being loaded.
 */
export const skeletonSchema = baseComponentSchema.extend({
  type: z.literal("Skeleton"),

  /**
   * Children elements (typically not used as skeleton is a placeholder)
   */
  children: z.any().optional(),
});

export type SkeletonSchema = z.infer<typeof skeletonSchema>;