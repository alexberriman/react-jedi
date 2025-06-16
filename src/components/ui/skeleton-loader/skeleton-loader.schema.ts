import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const skeletonLoaderSchema = baseComponentSchema.extend({
  type: z.literal("SkeletonLoader"),
  count: z.number().min(1).optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  variant: z.enum(["text", "circular", "rectangular", "rounded"]).optional(),
  animation: z.enum(["pulse", "wave", "none"]).optional(),
});

export type SkeletonLoaderProps = z.infer<typeof skeletonLoaderSchema>;