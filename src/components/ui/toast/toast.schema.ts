import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Toaster schema for the toast container
export const toasterSchema = baseComponentSchema.extend({
  type: z.literal("Toaster"),
  position: z.enum([
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]).optional(),
  expand: z.boolean().optional(),
  richColors: z.boolean().optional(),
  closeButton: z.boolean().optional(),
  duration: z.number().optional(),
  visibleToasts: z.number().optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
  gap: z.number().optional(),
  offset: z.string().optional(),
  dir: z.enum(["ltr", "rtl", "auto"]).optional(),
  hotkey: z.array(z.string()).optional(),
  invert: z.boolean().optional(),
  toastOptions: z.object({
    duration: z.number().optional(),
    unstyled: z.boolean().optional(),
    classNames: z.object({
      toast: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      actionButton: z.string().optional(),
      cancelButton: z.string().optional(),
      closeButton: z.string().optional(),
      error: z.string().optional(),
      success: z.string().optional(),
      warning: z.string().optional(),
      info: z.string().optional(),
    }).optional(),
  }).optional(),
});

// Toast action schema for triggering toasts
export const toastActionSchema = z.object({
  type: z.literal("ToastAction"),
  variant: z.enum(["default", "success", "error", "warning", "info"]).optional(),
  title: z.string(),
  description: z.string().optional(),
  duration: z.number().optional(),
  action: z.object({
    label: z.string(),
    onClick: z.object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    }),
  }).optional(),
  cancel: z.object({
    label: z.string(),
    onClick: z.object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    }),
  }).optional(),
  dismissible: z.boolean().optional(),
  important: z.boolean().optional(),
  id: z.string().optional(),
  promise: z.object({
    loading: z.string(),
    success: z.union([
      z.string(),
      z.function().args(z.any()).returns(z.string()),
    ]),
    error: z.union([
      z.string(),
      z.function().args(z.any()).returns(z.string()),
    ]),
  }).optional(),
});

export type ToasterProps = z.infer<typeof toasterSchema>;
export type ToastActionProps = z.infer<typeof toastActionSchema>;