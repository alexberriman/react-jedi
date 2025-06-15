import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Textarea component schema
 *
 * Multi-line text input component for longer text content.
 */
export const textareaSchema = baseComponentSchema.extend({
  type: z.literal("Textarea"),

  /**
   * The name attribute for the textarea element
   */
  name: z.string().optional(),

  /**
   * The value of the textarea
   */
  value: z.union([z.string(), z.number()]).optional(),

  /**
   * The default value of the textarea
   */
  defaultValue: z.union([z.string(), z.number()]).optional(),

  /**
   * Placeholder text shown when the textarea is empty
   */
  placeholder: z.string().optional(),

  /**
   * Whether the textarea is disabled
   */
  disabled: z.boolean().optional(),

  /**
   * Whether the textarea is read-only
   */
  readOnly: z.boolean().optional(),

  /**
   * Whether the textarea is required
   */
  required: z.boolean().optional(),

  /**
   * Number of visible text rows
   */
  rows: z.number().optional(),

  /**
   * Number of visible text columns
   */
  cols: z.number().optional(),

  /**
   * Maximum number of characters allowed
   */
  maxLength: z.number().optional(),

  /**
   * Minimum number of characters required
   */
  minLength: z.number().optional(),

  /**
   * How the textarea can be resized by the user
   */
  resize: z.enum(["none", "both", "horizontal", "vertical"]).optional(),

  /**
   * Autocomplete behavior
   */
  autoComplete: z.string().optional(),

  /**
   * Whether to automatically focus this textarea when the page loads
   */
  autoFocus: z.boolean().optional(),

  /**
   * Whether spell checking is enabled
   */
  spellCheck: z.boolean().optional(),

  /**
   * Form id that this textarea belongs to
   */
  form: z.string().optional(),

  /**
   * onChange handler
   */
  onChange: z.function().optional(),

  /**
   * onBlur handler
   */
  onBlur: z.function().optional(),

  /**
   * onFocus handler
   */
  onFocus: z.function().optional(),
});

export type TextareaSchema = z.infer<typeof textareaSchema>;