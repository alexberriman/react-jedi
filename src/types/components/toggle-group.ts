/**
 * Toggle Group Component Schema
 *
 * This file defines the TypeScript interfaces for the ToggleGroup component's specification schema.
 * The ToggleGroup component is a container for Toggle items that allows single or multiple selection.
 */

import type { BaseComponentSpec } from "./base";

/**
 * ToggleGroup component specification.
 */
export interface ToggleGroupSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "ToggleGroup" for this component.
   */
  type: "ToggleGroup";

  /**
   * The type of selection allowed.
   * "single" allows one item selected at a time.
   * "multiple" allows multiple items to be selected.
   * @default "single"
   */
  selectionType?: "single" | "multiple";

  /**
   * The variant style of the toggle group.
   * Controls the visual appearance.
   * @default "default"
   */
  variant?: "default" | "outline";

  /**
   * The size of the toggle group items.
   * Controls the padding, height, and icon size.
   * @default "default"
   */
  size?: "default" | "sm" | "lg";

  /**
   * The controlled value of the toggle group.
   * For single selection, this is a string.
   * For multiple selection, this is an array of strings.
   */
  value?: string | string[];

  /**
   * The default value of the toggle group for uncontrolled mode.
   * For single selection, this is a string.
   * For multiple selection, this is an array of strings.
   */
  defaultValue?: string | string[];

  /**
   * Whether the entire toggle group is disabled.
   * When true, all items cannot be interacted with.
   * @default false
   */
  disabled?: boolean;

  /**
   * The child ToggleGroupItem components.
   */
  children: BaseComponentSpec | BaseComponentSpec[];

  /**
   * Optional additional CSS classes to apply to the component.
   * Can be used for custom styling.
   */
  className?: string;

  /**
   * Optional data attributes for testing.
   */
  dataSlot?: string;

  /**
   * Action to dispatch on value change.
   */
  onValueChangeAction?: string;
}

/**
 * ToggleGroupItem component specification.
 */
export interface ToggleGroupItemSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "ToggleGroupItem" for this component.
   */
  type: "ToggleGroupItem";

  /**
   * The value of this item in the group.
   */
  value: string;

  /**
   * Whether this specific item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The content to be displayed inside the toggle item.
   * Can be text, icons, or a combination of both.
   */
  children: string | BaseComponentSpec | BaseComponentSpec[];

  /**
   * Optional additional CSS classes to apply to the component.
   * Can be used for custom styling.
   */
  className?: string;

  /**
   * Optional ARIA label for accessibility.
   * Important when toggle item has only icon content.
   */
  ariaLabel?: string;

  /**
   * Optional ARIA description for more detailed accessibility information.
   */
  ariaDescription?: string;
}
