import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const toggleSchema = baseComponentSchema.extend({
  type: z.literal("Toggle"),
  variant: z.enum(["default", "outline"]).optional(),
  size: z.enum(["default", "sm", "lg"]).optional(),
  pressed: z.boolean().optional(),
  defaultPressed: z.boolean().optional(),
  disabled: z.boolean().optional(),
  asChild: z.boolean().optional(),
  children: z.any().optional(),
  onPressedChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export type ToggleProps = z.infer<typeof toggleSchema>;