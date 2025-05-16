/**
 * Center Component Schema
 *
 * This file defines the TypeScript interfaces for the Center component's specification schema.
 * The Center component provides flexible centering of its children using flexbox.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Center component specification.
 * A layout component that centers its children horizontally and/or vertically.
 */
export interface CenterSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Center" for this component.
   */
  type: "Center";

  /**
   * The HTML element to render as.
   * @default "div"
   */
  as?: "div" | "section" | "main" | "article";

  /**
   * Whether the center container should take full viewport height.
   * @default false
   */
  fullHeight?: boolean;

  /**
   * Whether the center container should take full width.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * The direction to center content.
   * - "horizontal": Centers horizontally only
   * - "vertical": Centers vertically only
   * - "both": Centers both horizontally and vertically
   * @default "both"
   */
  centerDirection?: "horizontal" | "vertical" | "both";

  /**
   * Child components to render centered.
   * Must be an array of component specifications.
   */
  children: BaseComponentSpec[];

  /**
   * Optional additional CSS classes to apply to the component.
   * Can be used for custom styling.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the component.
   */
  style?: Record<string, string | number>;
}
