import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Error boundary schema
export const errorBoundarySchema = baseComponentSchema.extend({
  type: z.literal("ErrorBoundary"),
  children: z.array(z.lazy(() => baseComponentSchema)),
  fallback: z.object({
    type: z.string(),
    // Allow any additional properties for custom fallback component configs
  }).passthrough().optional(),
  onError: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export type ErrorBoundaryProps = z.infer<typeof errorBoundarySchema>;