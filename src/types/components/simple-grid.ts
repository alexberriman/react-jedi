/**
 * SimpleGrid Component Type Definition
 *
 * The SimpleGrid component creates a responsive grid layout with equal-sized cells.
 * It's ideal for creating uniform grids like image galleries or product cards.
 */

import type { BaseComponentSpec } from "./base";
import type { ComponentChildren } from "../schema/base";

/**
 * SimpleGrid Component Specification
 */
export interface SimpleGridSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "SimpleGrid" for this component.
   */
  type: "SimpleGrid";

  /**
   * Number of columns in the grid.
   * Can be a single value or responsive breakpoints.
   * @example 3
   * @example { base: 1, sm: 2, md: 3, lg: 4 }
   */
  columns?:
    | number
    | {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };

  /**
   * Spacing between grid items.
   * Can be a single value or responsive breakpoints.
   * @example "4"
   * @example { base: "2", sm: "4", md: "6" }
   */
  spacing?:
    | string
    | {
        base?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
      };

  /**
   * Minimum width for grid children.
   * When set, enables auto-fit behavior where columns
   * automatically adjust based on available space.
   * @example "200px"
   * @example "15rem"
   */
  minChildWidth?: string;

  /**
   * Custom CSS class names to add to the grid.
   */
  className?: string;

  /**
   * Child content to render inside the grid.
   */
  children?: ComponentChildren;
}
