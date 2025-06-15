import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const datePickerSchema = baseComponentSchema.extend({
  type: z.literal("DatePicker"),
  date: z.string().optional(), // ISO string for JSON spec
  onDateChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  placeholder: z.string().optional(),
  disabled: z.boolean().optional(),
});

export type DatePickerProps = z.infer<typeof datePickerSchema>;