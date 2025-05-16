import type { BaseComponentSpec } from "../schema/base";

export interface SwitchSpec extends BaseComponentSpec {
  type: "Switch";

  /**
   * Controlled checked state of the switch.
   */
  checked?: boolean;

  /**
   * Default checked state for uncontrolled mode.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Whether the switch is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Action to dispatch when checked state changes.
   */
  onCheckedChangeAction?: string;

  /**
   * Value for form submission.
   */
  value?: string;

  /**
   * Name attribute for form submission.
   */
  name?: string;

  /**
   * Custom CSS class names to add to the component.
   */
  className?: string;
}
