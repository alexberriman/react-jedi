import type { BaseComponentSpec } from "../schema/base";

export interface ProgressSpec extends BaseComponentSpec {
  type: "Progress";

  /**
   * The progress value (0-100).
   * @default 0
   */
  value?: number;

  /**
   * The maximum value of the progress indicator.
   * @default 100
   */
  max?: number;

  /**
   * Accessible label for the progress bar.
   */
  ariaLabel?: string;

  /**
   * A string value to provide an accessible description.
   */
  ariaValueText?: string;

  /**
   * Custom CSS class names to add to the component.
   */
  className?: string;

  /**
   * Inline styles for the component.
   */
  style?: Record<string, string | number>;
}
