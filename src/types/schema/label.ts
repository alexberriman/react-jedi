/**
 * Label Component Schema
 *
 * This file defines the TypeScript interfaces for the Label component's specification schema.
 * The Label component is used to provide text labels for form controls.
 */

import type { BaseComponentSpec } from "./base";

/**
 * Label component specification.
 */
export interface LabelSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Label" for this component.
   */
  type: "Label";

  /**
   * The HTML "for" attribute that associates the label with a form control.
   * Should match the id of the form element it labels.
   */
  htmlFor?: string;

  /**
   * Whether the label indicates a required field.
   * When true, adds a visual indicator (asterisk) that the field is required.
   * @default false
   */
  required?: boolean;

  /**
   * Whether the label should be disabled.
   * Disabled labels have reduced opacity and cannot be interacted with.
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}
