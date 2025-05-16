/**
 * Form Component Schema
 *
 * This file defines the TypeScript interfaces for the Form component's specification schema.
 * The Form component is built on react-hook-form and provides comprehensive form management.
 */

import type { BaseComponentSpec } from "./base";

/**
 * Type alias for component children that can be a string, a single component, or an array of components.
 */
type ComponentChildren = string | BaseComponentSpec | BaseComponentSpec[];

/**
 * Type alias for component children that can only be a single component or an array of components.
 */
type ComponentChildrenOnly = BaseComponentSpec | BaseComponentSpec[];

/**
 * Form validation rules specification.
 */
export interface FormValidationSpec {
  /**
   * Validation rules for each field in the form.
   * Maps field names to validation rule objects.
   */
  [fieldName: string]: {
    /**
     * Whether the field is required.
     */
    required?: boolean | string;

    /**
     * Minimum length for string values.
     */
    minLength?: number | { value: number; message: string };

    /**
     * Maximum length for string values.
     */
    maxLength?: number | { value: number; message: string };

    /**
     * Pattern for regular expression validation.
     */
    pattern?: string | { value: string; message: string };

    /**
     * Email validation.
     */
    email?: boolean | string;

    /**
     * Minimum value for numeric inputs.
     */
    min?: number | { value: number; message: string };

    /**
     * Maximum value for numeric inputs.
     */
    max?: number | { value: number; message: string };
  };
}

/**
 * Form component specification.
 */
export interface FormSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Form" for this component.
   */
  type: "Form";

  /**
   * The content to be rendered inside the Form.
   * Typically FormFields and submit buttons.
   */
  children: ComponentChildrenOnly;

  /**
   * Optional validation schema for the form.
   */
  validation?: FormValidationSpec;

  /**
   * Optional default values for form fields.
   */
  defaultValues?: Record<string, unknown>;

  /**
   * Optional form submission handler ID.
   * References an action to be called when the form is submitted.
   */
  onSubmit?: string;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * FormField component specification.
 */
export interface FormFieldSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "FormField" for this component.
   */
  type: "FormField";

  /**
   * The name of the field, used for form state management.
   */
  name: string;

  /**
   * The content to be rendered inside the FormField.
   * Typically a FormItem containing FormLabel, FormControl, etc.
   */
  children: ComponentChildrenOnly;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * FormItem component specification.
 */
export interface FormItemSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "FormItem" for this component.
   */
  type: "FormItem";

  /**
   * The content to be rendered inside the FormItem.
   * Typically FormLabel, FormControl, FormDescription, and FormMessage.
   */
  children: ComponentChildrenOnly;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * FormLabel component specification.
 */
export interface FormLabelSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "FormLabel" for this component.
   */
  type: "FormLabel";

  /**
   * The content to be rendered inside the FormLabel.
   * Typically text content.
   */
  children: ComponentChildren;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * FormControl component specification.
 */
export interface FormControlSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "FormControl" for this component.
   */
  type: "FormControl";

  /**
   * The content to be rendered inside the FormControl.
   * Typically an input, textarea, select, or other form control.
   */
  children: ComponentChildrenOnly;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * FormDescription component specification.
 */
export interface FormDescriptionSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "FormDescription" for this component.
   */
  type: "FormDescription";

  /**
   * The content to be rendered inside the FormDescription.
   * Typically text content providing help or context.
   */
  children: ComponentChildren;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * FormMessage component specification.
 */
export interface FormMessageSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "FormMessage" for this component.
   */
  type: "FormMessage";

  /**
   * Optional content to be rendered inside the FormMessage.
   * If not provided, validation errors will be shown automatically.
   */
  children?: ComponentChildren;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}
