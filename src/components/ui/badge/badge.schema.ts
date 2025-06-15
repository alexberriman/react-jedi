import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const badgeSchema = baseComponentSchema.extend({
  type: z.literal("Badge"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]),
  variant: z.enum([
    "default",
    "secondary",
    "destructive",
    "outline"
  ]).optional(),
  asChild: z.boolean().optional(),
});

export type BadgeProps = z.infer<typeof badgeSchema>;