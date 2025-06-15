import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

/**
 * ScrollArea component schema
 * Augments native scroll functionality for custom, cross-browser styling
 */
export const scrollAreaSchema = baseComponentSchema.extend({
  type: z.literal("ScrollArea"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
  className: z.string().optional(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type ScrollAreaProps = z.infer<typeof scrollAreaSchema>;