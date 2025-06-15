import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const labelSchema = baseComponentSchema.extend({
  type: z.literal("Label"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]),
  htmlFor: z.string().optional(),
  required: z.boolean().optional(),
});

export type LabelProps = z.infer<typeof labelSchema>;