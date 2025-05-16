import type { BaseComponentSpec } from "../schema/base";

export interface SliderSpec extends BaseComponentSpec {
  type: "Slider";

  /**
   * The default value of the slider.
   * Can be a single value or an array for range sliders.
   */
  defaultValue?: number[];

  /**
   * The controlled value of the slider.
   * Can be a single value or an array for range sliders.
   */
  value?: number[];

  /**
   * The minimum value of the slider.
   * @default 0
   */
  min?: number;

  /**
   * The maximum value of the slider.
   * @default 100
   */
  max?: number;

  /**
   * The step increment of the slider.
   * @default 1
   */
  step?: number;

  /**
   * Whether the slider is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The orientation of the slider.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Action to dispatch when the value changes.
   */
  onValueChangeAction?: string;

  /**
   * Name attribute for form submission.
   */
  name?: string;

  /**
   * Inverted direction of the slider.
   * @default false
   */
  inverted?: boolean;

  /**
   * Custom CSS class names to add to the component.
   */
  className?: string;
}
