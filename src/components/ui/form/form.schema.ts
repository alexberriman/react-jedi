import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Validation rule schemas
const requiredRule = z.union([
  z.string(),
  z.boolean(),
  z.object({
    value: z.boolean(),
    message: z.string(),
  }),
]);

const minLengthRule = z.union([
  z.number(),
  z.object({
    value: z.number(),
    message: z.string(),
  }),
]);

const maxLengthRule = z.union([
  z.number(),
  z.object({
    value: z.number(),
    message: z.string(),
  }),
]);

const minRule = z.union([
  z.number(),
  z.object({
    value: z.number(),
    message: z.string(),
  }),
]);

const maxRule = z.union([
  z.number(),
  z.object({
    value: z.number(),
    message: z.string(),
  }),
]);

const patternRule = z.union([
  z.string(),
  z.object({
    value: z.string(),
    message: z.string(),
  }),
]);

// Field validation schema
const fieldValidationSchema = z.object({
  required: requiredRule.optional(),
  minLength: minLengthRule.optional(),
  maxLength: maxLengthRule.optional(),
  min: minRule.optional(),
  max: maxRule.optional(),
  pattern: patternRule.optional(),
  email: z.union([z.boolean(), z.string()]).optional(),
});

// Form schema (wrapper component)
export const formSchema = baseComponentSchema.extend({
  type: z.literal("Form"),
  validation: z.record(z.string(), fieldValidationSchema).optional(),
  onSubmit: z.union([z.string(), z.function()]).optional(),
  defaultValues: z.record(z.string(), z.any()).optional(),
  mode: z.enum(["onBlur", "onChange", "onSubmit", "all"]).optional(),
  children: z.any().optional(),
});

// FormField schema
export const formFieldSchema = baseComponentSchema.extend({
  type: z.literal("FormField"),
  name: z.string(),
  control: z.any().optional(),
  rules: fieldValidationSchema.optional(),
  defaultValue: z.any().optional(),
  children: z.any().optional(),
});

// FormItem schema
export const formItemSchema = baseComponentSchema.extend({
  type: z.literal("FormItem"),
  children: z.any().optional(),
});

// FormLabel schema
export const formLabelSchema = baseComponentSchema.extend({
  type: z.literal("FormLabel"),
  htmlFor: z.string().optional(),
  required: z.boolean().optional(),
  children: z.any().optional(),
});

// FormControl schema
export const formControlSchema = baseComponentSchema.extend({
  type: z.literal("FormControl"),
  children: z.any().optional(),
});

// FormDescription schema
export const formDescriptionSchema = baseComponentSchema.extend({
  type: z.literal("FormDescription"),
  children: z.any().optional(),
});

// FormMessage schema
export const formMessageSchema = baseComponentSchema.extend({
  type: z.literal("FormMessage"),
  children: z.any().optional(),
});

export type FormProps = z.infer<typeof formSchema>;
export type FormFieldProps = z.infer<typeof formFieldSchema>;
export type FormItemProps = z.infer<typeof formItemSchema>;
export type FormLabelProps = z.infer<typeof formLabelSchema>;
export type FormControlProps = z.infer<typeof formControlSchema>;
export type FormDescriptionProps = z.infer<typeof formDescriptionSchema>;
export type FormMessageProps = z.infer<typeof formMessageSchema>;