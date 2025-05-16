/**
 * Toggle Component Schema
 *
 * This file defines the TypeScript interfaces for the Toggle component's specification schema.
 * The Toggle component is a button that can be toggled between two states (on/off).
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Toggle component specification.
 */
export interface ToggleSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Toggle" for this component.
   */
  type: "Toggle";

  /**
   * The variant style of the toggle.
   * Controls the visual appearance.
   * @default "default"
   */
  variant?: "default" | "outline";

  /**
   * The size of the toggle.
   * Controls the padding, height, and icon size.
   * @default "default"
   */
  size?: "default" | "sm" | "lg";

  /**
   * Whether the toggle is in the pressed/activated state.
   * @default false
   */
  pressed?: boolean;

  /**
   * Whether the toggle is disabled.
   * When true, the toggle cannot be interacted with and appears visually muted.
   * @default false
   */
  disabled?: boolean;

  /**
   * The content to be displayed inside the toggle.
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
   * Important when toggle has only icon content.
   */
  ariaLabel?: string;

  /**
   * Optional ARIA description for more detailed accessibility information.
   */
  ariaDescription?: string;

  /**
   * Treat the toggle as a child slot element.
   * When true, the toggle will adapt to parent component context.
   * @default false
   */
  asChild?: boolean;
}
