import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Combobox option schema
const comboboxOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const comboboxSchema = baseComponentSchema.extend({
  type: z.literal("Combobox"),
  
  // Value management
  value: z.string().optional(),
  onValueChange: z.any().optional(),
  
  // Options
  options: z.array(comboboxOptionSchema).optional(),
  
  // UI text
  placeholder: z.string().optional(),
  searchPlaceholder: z.string().optional(),
  emptyText: z.string().optional(),
  
  // State
  disabled: z.boolean().optional(),
});

export type ComboboxSchema = z.infer<typeof comboboxSchema>;