/**
 * Button Component Schema
 *
 * This file defines the TypeScript interfaces for the Button component's specification schema.
 * The Button component is used to trigger actions or events in the user interface.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Button component specification.
 */
export interface ButtonSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Button" for this component.
   */
  type: "Button";

  /**
   * The variant style of the button.
   * Controls the visual appearance and emphasis level.
   * @default "default"
   */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

  /**
   * The size of the button.
   * Controls the padding, height, and text size.
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";

  /**
   * Whether the button is disabled.
   * When true, the button cannot be clicked and appears visually muted.
   * @default false
   */
  disabled?: boolean;

  /**
   * The content to be displayed inside the button.
   * Can be text, icons, or a combination of both.
   */
  children: string | BaseComponentSpec | BaseComponentSpec[];

  /**
   * Treat the button as a child slot element.
   * When true, the button will adapt to parent component context.
   * @default false
   */
  asChild?: boolean;

  /**
   * The type attribute of the button element.
   * Controls form submission behavior when used within forms.
   * @default "button"
   */
  buttonType?: "button" | "submit" | "reset";

  /**
   * Optional property for loading state.
   * When true, the button should display a loading indicator.
   * @default false
   */
  loading?: boolean;

  /**
   * Optional icon component to display before text content.
   * Icon is automatically sized and spaced based on button size.
   */
  leftIcon?: BaseComponentSpec;

  /**
   * Optional icon component to display after text content.
   * Icon is automatically sized and spaced based on button size.
   */
  rightIcon?: BaseComponentSpec;
}
