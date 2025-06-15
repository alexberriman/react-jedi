import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const groupSchema = baseComponentSchema.extend({
  type: z.literal("group"),
  spacing: z
    .enum(["none", "xs", "sm", "md", "lg", "xl", "2xl"])
    .optional(),
  align: z
    .enum(["start", "center", "end", "baseline", "stretch"])
    .optional(),
  justify: z
    .enum(["start", "center", "end", "between", "around", "evenly"])
    .optional(),
  wrap: z.enum(["wrap", "nowrap", "wrap-reverse"]).optional(),
  grow: z.boolean().optional(),
  preventGrow: z.boolean().optional(),
  as: z.string().optional(),
  fullWidth: z.boolean().optional(),
  children: z.any().optional(),
});

export type GroupSchema = z.infer<typeof groupSchema>;