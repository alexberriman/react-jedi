import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * RadioGroup component schema
 *
 * A group of radio buttons that allows users to select one option from a set.
 * Based on Radix UI RadioGroup primitive.
 */
export const radioGroupSchema = baseComponentSchema.extend({
  type: z.literal("RadioGroup"),

  /**
   * The controlled value of the radio group
   */
  value: z.string().optional(),

  /**
   * The default value for uncontrolled usage
   */
  defaultValue: z.string().optional(),

  /**
   * When true, prevents the user from interacting with the radio group
   */
  disabled: z.boolean().optional(),

  /**
   * When true, indicates that the user must select an option before submitting
   */
  required: z.boolean().optional(),

  /**
   * The name of the radio group, used when submitting an HTML form
   */
  name: z.string().optional(),

  /**
   * The orientation of the radio group (for accessibility)
   */
  orientation: z.enum(["horizontal", "vertical"]).optional(),

  /**
   * Callback fired when the value changes
   */
  onValueChange: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),

  /**
   * Child components (typically RadioGroupItem elements)
   */
  children: z.any().optional(),
});

/**
 * RadioGroupItem component schema
 *
 * Individual radio button item within a RadioGroup.
 */
export const radioGroupItemSchema = baseComponentSchema.extend({
  type: z.literal("RadioGroupItem"),

  /**
   * The value of the radio item
   */
  value: z.string(),

  /**
   * When true, prevents the user from interacting with this specific item
   */
  disabled: z.boolean().optional(),
});

export type RadioGroupSchema = z.infer<typeof radioGroupSchema>;
export type RadioGroupItemSchema = z.infer<typeof radioGroupItemSchema>;