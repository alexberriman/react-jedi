import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Checkbox component schema
 *
 * Checkbox component that allows users to select one or more options.
 * Based on Radix UI Checkbox primitive.
 */
export const checkboxSchema = baseComponentSchema.extend({
  type: z.literal("Checkbox"),

  /**
   * The controlled checked state of the checkbox.
   * Can be true, false, or "indeterminate" for partial selection
   */
  checked: z.union([z.boolean(), z.literal("indeterminate")]).optional(),

  /**
   * The default checked state for uncontrolled usage
   */
  defaultChecked: z.boolean().optional(),

  /**
   * When true, prevents the user from interacting with the checkbox
   */
  disabled: z.boolean().optional(),

  /**
   * When true, indicates that the user must check the checkbox before submitting
   */
  required: z.boolean().optional(),

  /**
   * The name of the checkbox, used when submitting an HTML form
   */
  name: z.string().optional(),

  /**
   * The value of the checkbox, used when submitting an HTML form
   */
  value: z.string().optional(),

  /**
   * Callback fired when the checked state changes
   */
  onCheckedChange: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
});

export type CheckboxSchema = z.infer<typeof checkboxSchema>;