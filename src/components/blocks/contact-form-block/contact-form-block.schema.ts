import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const selectOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disabled: z.boolean().optional(),
});

const validationRuleSchema = z.object({
  type: z.enum(["required", "email", "phone", "url", "pattern", "minLength", "maxLength", "min", "max"]),
  value: z.union([z.string(), z.number()]).optional(),
  message: z.string().optional(),
});

const conditionalRuleSchema = z.object({
  fieldId: z.string(),
  operator: z.enum(["equals", "notEquals", "contains", "notContains", "exists", "notExists"]),
  value: z.union([z.string(), z.boolean(), z.number()]).optional(),
});

const phoneConfigSchema = z.object({
  defaultCountry: z.string().optional(),
  preferredCountries: z.array(z.string()).optional(),
  onlyCountries: z.array(z.string()).optional(),
  excludeCountries: z.array(z.string()).optional(),
  formatOnDisplay: z.boolean().optional(),
});

const fileUploadConfigSchema = z.object({
  accept: z.string().optional(),
  maxSize: z.number().optional(),
  maxFiles: z.number().optional(),
  multiple: z.boolean().optional(),
});

const formFieldSchema = z.object({
  id: z.string(),
  type: z.enum([
    "text",
    "email",
    "phone",
    "textarea",
    "select",
    "checkbox",
    "radio",
    "file",
    "date",
    "time",
    "number",
    "url",
  ]),
  label: z.string(),
  placeholder: z.string().optional(),
  defaultValue: z.union([z.string(), z.boolean(), z.array(z.string())]).optional(),
  required: z.boolean().optional(),
  disabled: z.boolean().optional(),
  readOnly: z.boolean().optional(),
  validation: z.array(validationRuleSchema).optional(),
  conditionalDisplay: conditionalRuleSchema.optional(),
  options: z.array(selectOptionSchema).optional(),
  fileConfig: fileUploadConfigSchema.optional(),
  phoneConfig: phoneConfigSchema.optional(),
  rows: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  autoComplete: z.string().optional(),
  helperText: z.string().optional(),
  className: z.string().optional(),
});

const formStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  fields: z.array(formFieldSchema),
  icon: z.string().optional(),
});

const mapConfigSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  zoom: z.number().optional(),
  marker: z.object({
    title: z.string().optional(),
    icon: z.string().optional(),
  }).optional(),
  apiKey: z.string().optional(),
});

const crmConfigSchema = z.object({
  endpoint: z.string().optional(),
  headers: z.record(z.string(), z.string()).optional(),
  fieldMapping: z.record(z.string(), z.string()).optional(),
  customData: z.record(z.string(), z.unknown()).optional(),
});

export const contactFormBlockSchema = baseComponentSchema.extend({
  type: z.literal("ContactFormBlock"),
  variant: z.enum(["simple", "detailed", "with-map", "split-screen", "wizard"]).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  fields: z.array(formFieldSchema).optional(),
  steps: z.array(formStepSchema).optional(),
  submitButton: z.object({
    text: z.string().optional(),
    loadingText: z.string().optional(),
    successText: z.string().optional(),
    variant: z.enum(["default", "primary", "secondary", "outline", "ghost"]).optional(),
    size: z.enum(["sm", "md", "lg"]).optional(),
    fullWidth: z.boolean().optional(),
  }).optional(),
  captcha: z.object({
    enabled: z.boolean().optional(),
    siteKey: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional(),
  }).optional(),
  successMessage: z.string().optional(),
  errorMessage: z.string().optional(),
  redirectUrl: z.string().optional(),
  redirectDelay: z.number().optional(),
  mapConfig: mapConfigSchema.optional(),
  splitContent: z.object({
    type: z.enum(["image", "content", "info"]),
    image: z.string().optional(),
    alt: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
  }).optional(),
  crmConfig: crmConfigSchema.optional(),
  formId: z.string().optional(),
  animated: z.boolean().optional(),
  compact: z.boolean().optional(),
  showRequiredIndicator: z.boolean().optional(),
  validateOnBlur: z.boolean().optional(),
  validateOnChange: z.boolean().optional(),
  resetOnSuccess: z.boolean().optional(),
  persistData: z.boolean().optional(),
  storageKey: z.string().optional(),
});

export type ContactFormBlockProps = z.infer<typeof contactFormBlockSchema>;