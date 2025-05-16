/**
 * Stack Component Schema
 *
 * This file defines the TypeScript interfaces for the Stack component's specification schema.
 * The Stack component provides vertical or horizontal stacking with consistent spacing.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Stack component specification.
 * A flexible layout component that stacks its children vertically or horizontally.
 */
export interface StackSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Stack" for this component.
   */
  type: "Stack";

  /**
   * The orientation of the stack.
   * Controls whether children are arranged horizontally or vertically.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * The spacing between child elements.
   * Utilizes CSS gap under the hood for consistent spacing.
   * @default "md"
   */
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

  /**
   * How children align on the cross axis.
   * - For horizontal stacks: controls vertical alignment
   * - For vertical stacks: controls horizontal alignment
   * @default "stretch"
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";

  /**
   * How children are distributed along the main axis.
   * @default "start"
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";

  /**
   * Whether child elements can wrap to the next line.
   * @default "nowrap"
   */
  wrap?: "wrap" | "nowrap" | "wrap-reverse";

  /**
   * Optional divider component to render between child elements.
   * The divider will appear between all children except after the last one.
   */
  divider?: BaseComponentSpec;

  /**
   * Child components to render in the stack.
   * Must be an array of component specifications.
   */
  children: BaseComponentSpec[];

  /**
   * Optional additional CSS classes to apply to the component.
   * Can be used for custom styling.
   */
  className?: string;

  /**
   * The HTML element to render as.
   * @default "div"
   */
  as?: string;
}
