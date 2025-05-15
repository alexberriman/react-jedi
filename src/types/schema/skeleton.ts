/**
 * Skeleton Component Schema
 *
 * This file defines the TypeScript interfaces for the Skeleton component's specification schema.
 * The Skeleton component is used to show a placeholder preview of content before it loads.
 */

import type { BaseComponentSpec } from "./base";

/**
 * Skeleton component specification.
 */
export interface SkeletonSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Skeleton" for this component.
   */
  type: "Skeleton";

  /**
   * The width of the skeleton.
   * Can be a fixed value (px), percentage, or a responsive value.
   * @example "100px", "50%", "full", "1/2"
   */
  width?: string;

  /**
   * The height of the skeleton.
   * Can be a fixed value (px) or a tailwind class value.
   * @example "20px", "h-4", "h-full"
   */
  height?: string;

  /**
   * Whether the skeleton should be rounded.
   * @default false
   */
  rounded?: boolean;

  /**
   * Border radius of the skeleton.
   * Can be "none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"
   * @default "md"
   */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

  /**
   * Whether the skeleton should display a pulse animation.
   * @default true
   */
  animate?: boolean;

  /**
   * Custom animation duration in milliseconds.
   * @default 1500
   */
  animationDuration?: number;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}
