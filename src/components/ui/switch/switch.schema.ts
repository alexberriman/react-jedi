import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const switchSchema = baseComponentSchema.extend({
  type: z.literal("Switch"),
  checked: z.boolean().optional(),
  defaultChecked: z.boolean().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
  animated: z.boolean().optional(),
  onCheckedChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export type SwitchProps = z.infer<typeof switchSchema>;