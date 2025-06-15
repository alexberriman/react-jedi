import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const loadingSchema = baseComponentSchema.extend({
  type: z.literal("loading"),
  size: z.enum(["sm", "md", "lg", "xl"]).optional(),
  variant: z.enum(["spinner", "dots", "pulse", "bars"]).optional(),
  text: z.string().optional(),
  fullScreen: z.boolean().optional(),
  overlay: z.boolean().optional(),
});

export type LoadingSchema = z.infer<typeof loadingSchema>;