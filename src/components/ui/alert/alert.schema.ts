import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Main Alert schema
export const alertSchema = baseComponentSchema.extend({
  type: z.literal("Alert"),
  variant: z.enum([
    "default",
    "destructive",
    "info",
    "warning",
    "success"
  ]).optional(),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
  role: z.enum(["alert", "status"]).optional(),
  "aria-live": z.enum(["polite", "assertive", "off"]).optional(),
});

// AlertTitle schema
export const alertTitleSchema = baseComponentSchema.extend({
  type: z.literal("AlertTitle"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// AlertDescription schema
export const alertDescriptionSchema = baseComponentSchema.extend({
  type: z.literal("AlertDescription"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
});

// Export types
export type AlertProps = z.infer<typeof alertSchema>;
export type AlertTitleProps = z.infer<typeof alertTitleSchema>;
export type AlertDescriptionProps = z.infer<typeof alertDescriptionSchema>;