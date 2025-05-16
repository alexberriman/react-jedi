/**
 * Masonry Component Schema Types
 *
 * Type definitions for the Pinterest-style Masonry grid layout component.
 */

import type { BaseComponentSpec, ComponentChildren } from "../schema/base";

/**
 * Masonry Component Specification
 *
 * Creates a Pinterest-style grid layout with items flowing vertically.
 * Supports responsive columns, animations, and glassmorphic effects.
 */
export interface MasonrySpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Masonry" for this component.
   */
  type: "Masonry";

  /**
   * Number of columns in the masonry grid.
   * Can be responsive with breakpoint object.
   * @example 3, { base: 2, md: 3, lg: 4, xl: 5 }
   * @default 3
   */
  columns?: number | Record<string, number>;

  /**
   * Gap between masonry items.
   * Follows Tailwind CSS spacing scale.
   * @example 4, { base: 2, md: 4, lg: 6 }
   * @default 4
   */
  gap?: number | Record<string, number>;

  /**
   * Minimum width for columns when using auto-sizing.
   * @example "250px", "300px"
   * @default "250px"
   */
  minColWidth?: string;

  /**
   * Whether to use auto-fit columns based on container width.
   * @default false
   */
  autoFit?: boolean;

  /**
   * Animation settings for items entering the viewport.
   */
  animation?: {
    /**
     * Animation duration in seconds.
     * @default 0.3
     */
    duration?: number;

    /**
     * Stagger delay between items in seconds.
     * @default 0.05
     */
    stagger?: number;

    /**
     * Easing function for animations.
     * @default "ease-out"
     */
    easing?: string;
  };

  /**
   * Whether to apply glassmorphic effects to items.
   * Adds backdrop blur, translucent backgrounds, and hover effects.
   * @default false
   */
  glassmorphic?: boolean;

  /**
   * Custom CSS class names to add to the masonry container.
   */
  className?: string;

  /**
   * Child content to render inside the masonry grid.
   */
  children?: ComponentChildren;
}
