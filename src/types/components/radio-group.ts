import type { BaseComponentSpec, ComponentChildren } from "../schema/base";

export interface RadioGroupSpec extends BaseComponentSpec {
  type: "RadioGroup";

  /**
   * The value of the selected item.
   */
  value?: string;

  /**
   * The default value of the selected item.
   */
  defaultValue?: string;

  /**
   * Whether the radio group is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Action to dispatch on value change.
   */
  onValueChangeAction?: string;

  /**
   * Custom CSS class names to add to the radio group.
   */
  className?: string;

  /**
   * The orientation of the radio group.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Gap between items in the radio group.
   */
  gap?: string;

  /**
   * Child components (RadioGroupItem elements).
   */
  children?: ComponentChildren;
}

export interface RadioGroupItemSpec extends BaseComponentSpec {
  type: "RadioGroupItem";

  /**
   * The value of the radio item.
   */
  value: string;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * ID for label association.
   */
  id?: string;

  /**
   * Accessible label for screen readers.
   */
  ariaLabel?: string;

  /**
   * ID of element that labels this radio item.
   */
  ariaLabelledby?: string;

  /**
   * ID of element that describes this radio item.
   */
  ariaDescribedby?: string;

  /**
   * Custom CSS class names to add to the radio item.
   */
  className?: string;
}
