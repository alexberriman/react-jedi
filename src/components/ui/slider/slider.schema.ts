import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const sliderSchema = baseComponentSchema.extend({
  type: z.literal("Slider"),
  defaultValue: z.array(z.number()).optional(),
  value: z.array(z.number()).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  disabled: z.boolean().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  onValueChange: z.function().optional(),
});

export type SliderProps = z.infer<typeof sliderSchema>;