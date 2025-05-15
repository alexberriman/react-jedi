/**
 * Input Component Schema
 *
 * This file defines the TypeScript interfaces for the Input component's specification schema.
 * The Input component is used to collect user input in forms.
 */

import type { BaseComponentSpec } from "./base";

/**
 * Input component specification.
 */
export interface InputSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Input" for this component.
   */
  type: "Input";

  /**
   * The input type attribute.
   * @default "text"
   */
  inputType?: string;

  /**
   * The unique identifier for the input.
   * Used for form accessibility and label association.
   */
  id?: string;

  /**
   * The input name attribute.
   * Used for form submission.
   */
  name?: string;

  /**
   * The placeholder text to display when the input is empty.
   */
  placeholder?: string;

  /**
   * The initial value of the input.
   */
  value?: string;

  /**
   * The default value of the input.
   */
  defaultValue?: string;

  /**
   * Whether the input is required.
   * @default false
   */
  required?: boolean;

  /**
   * Whether the input is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the input is read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Minimum length of input value.
   */
  minLength?: number;

  /**
   * Maximum length of input value.
   */
  maxLength?: number;

  /**
   * Minimum value (for numeric inputs).
   */
  min?: number | string;

  /**
   * Maximum value (for numeric inputs).
   */
  max?: number | string;

  /**
   * Step value (for numeric inputs).
   */
  step?: number | string;

  /**
   * Pattern for validation (RegExp as string).
   */
  pattern?: string;

  /**
   * Whether the input should have autocomplete enabled.
   * @default "off"
   */
  autoComplete?: string;

  /**
   * Whether the input should automatically get focus.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Whether the input should enable spellcheck.
   */
  spellCheck?: boolean;

  /**
   * Size of the input.
   * @default "default"
   */
  size?: "sm" | "default" | "lg";

  /**
   * Width of the input.
   * @default "full"
   */
  width?: string;

  /**
   * Variant of the input style.
   * @default "default"
   */
  variant?: "default" | "ghost" | "outlined" | "filled";

  /**
   * Error message to display.
   */
  error?: string;

  /**
   * Helper text to display below the input.
   */
  helperText?: string;

  /**
   * Leading icon to display.
   */
  startIcon?: BaseComponentSpec;

  /**
   * Trailing icon to display.
   */
  endIcon?: BaseComponentSpec;

  /**
   * Custom CSS classes to apply.
   */
  className?: string;
}