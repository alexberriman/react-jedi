import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Progress component schema
 *
 * Progress bar component that displays the completion progress of a task.
 * Based on Radix UI Progress primitive.
 */
export const progressSchema = baseComponentSchema.extend({
  type: z.literal("Progress"),

  /**
   * The current progress value (0-100)
   */
  value: z.number().min(0).max(100).optional(),

  /**
   * The maximum progress value (defaults to 100)
   */
  max: z.number().optional(),
});

export type ProgressSchema = z.infer<typeof progressSchema>;