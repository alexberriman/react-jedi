import type { BaseComponentSpec, ComponentChildren } from "../schema/base";

export interface SelectSpec extends BaseComponentSpec {
  type: "Select";

  /**
   * Controlled selected value.
   */
  value?: string;

  /**
   * Default selected value for uncontrolled mode.
   */
  defaultValue?: string;

  /**
   * Whether the select is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Action to dispatch on value change.
   */
  onValueChangeAction?: string;

  /**
   * Placeholder text when no value is selected.
   */
  placeholder?: string;

  /**
   * The name attribute for form submission.
   */
  name?: string;

  /**
   * Custom CSS class names to add to the component.
   */
  className?: string;

  /**
   * Child components (SelectContent).
   */
  children?: ComponentChildren;
}

export interface SelectTriggerSpec extends BaseComponentSpec {
  type: "SelectTrigger";

  /**
   * Size variant of the trigger.
   * @default "default"
   */
  size?: "sm" | "default";

  /**
   * Custom CSS class names to add to the trigger.
   */
  className?: string;

  /**
   * Child components (SelectValue).
   */
  children?: ComponentChildren;
}

export interface SelectValueSpec extends BaseComponentSpec {
  type: "SelectValue";

  /**
   * Placeholder text when no value is selected.
   */
  placeholder?: string;
}

export interface SelectContentSpec extends BaseComponentSpec {
  type: "SelectContent";

  /**
   * Positioning mode of the content.
   * @default "popper"
   */
  position?: "item-aligned" | "popper";

  /**
   * Custom CSS class names to add to the content.
   */
  className?: string;

  /**
   * Child components (SelectItem, SelectGroup, etc.).
   */
  children?: ComponentChildren;
}

export interface SelectItemSpec extends BaseComponentSpec {
  type: "SelectItem";

  /**
   * The value of the item.
   */
  value: string;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Text content of the item.
   */
  text?: string;

  /**
   * Custom CSS class names to add to the item.
   */
  className?: string;

  /**
   * Child components or content.
   */
  children?: ComponentChildren;
}

export interface SelectGroupSpec extends BaseComponentSpec {
  type: "SelectGroup";

  /**
   * Label for the group.
   */
  label?: string;

  /**
   * Custom CSS class names to add to the group.
   */
  className?: string;

  /**
   * Child components (SelectItem, SelectLabel).
   */
  children?: ComponentChildren;
}

export interface SelectLabelSpec extends BaseComponentSpec {
  type: "SelectLabel";

  /**
   * Text content of the label.
   */
  text?: string;

  /**
   * Custom CSS class names to add to the label.
   */
  className?: string;

  /**
   * Child components or content.
   */
  children?: ComponentChildren;
}

export interface SelectSeparatorSpec extends BaseComponentSpec {
  type: "SelectSeparator";

  /**
   * Custom CSS class names to add to the separator.
   */
  className?: string;
}
