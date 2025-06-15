import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const inputSchema = baseComponentSchema.extend({
  type: z.literal("Input"),
  inputType: z.enum([
    "text",
    "password",
    "email",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
    "color",
    "file",
    "hidden",
    "range"
  ]).optional(),
  name: z.string().optional(),
  value: z.union([z.string(), z.number()]).optional(),
  defaultValue: z.union([z.string(), z.number()]).optional(),
  placeholder: z.string().optional(),
  disabled: z.boolean().optional(),
  readOnly: z.boolean().optional(),
  required: z.boolean().optional(),
  autoFocus: z.boolean().optional(),
  autoComplete: z.string().optional(),
  pattern: z.string().optional(),
  min: z.union([z.string(), z.number()]).optional(),
  max: z.union([z.string(), z.number()]).optional(),
  step: z.union([z.string(), z.number()]).optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  multiple: z.boolean().optional(),
  accept: z.string().optional(),
  onChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onBlur: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onFocus: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export type InputProps = z.infer<typeof inputSchema>;