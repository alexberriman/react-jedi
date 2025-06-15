import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const stackSchema = baseComponentSchema.extend({
  type: z.literal("Stack"),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  spacing: z.enum(["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"]).optional(),
  align: z.enum(["start", "center", "end", "stretch", "baseline"]).optional(),
  justify: z.enum(["start", "center", "end", "between", "around", "evenly"]).optional(),
  wrap: z.enum(["wrap", "nowrap", "wrap-reverse"]).optional(),
  as: z.string().optional(),
  divider: z.any().optional(),
  children: z.any().optional(),
});

export type StackProps = z.infer<typeof stackSchema>;