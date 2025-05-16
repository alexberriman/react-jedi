/**
 * Group Component Schema
 *
 * This file defines the TypeScript interfaces for the Group component's specification schema.
 * The Group component provides inline element arrangement with consistent spacing.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Group component specification.
 * A component that arranges inline elements horizontally with consistent spacing.
 * Perfect for button groups, toolbar actions, tag lists, and form controls.
 */
export interface GroupSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Group" for this component.
   */
  type: "Group";

  /**
   * The spacing between child elements.
   * @default "md"
   */
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * How children align vertically.
   * @default "center"
   */
  align?: "start" | "center" | "end" | "baseline" | "stretch";

  /**
   * How children are distributed horizontally.
   * @default "start"
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";

  /**
   * Whether child elements can wrap to the next line.
   * @default "wrap"
   */
  wrap?: "wrap" | "nowrap" | "wrap-reverse";

  /**
   * Whether child elements should grow to fill available space.
   * Applies flex-grow to all children.
   * @default false
   */
  grow?: boolean;

  /**
   * Prevents individual child elements from growing.
   * Useful when some children have their own flex-grow properties.
   * @default false
   */
  preventGrow?: boolean;

  /**
   * Whether the group should display as a full-width block element.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Child components to render in the group.
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
