/**
 * Spacer Component Schema
 *
 * This file defines the TypeScript interfaces for the Spacer component's specification schema.
 * The Spacer component provides flexible spacing between elements in layouts.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Size options for the Spacer component
 */
export type SpacerSize =
  | "xs" // 4px
  | "sm" // 8px
  | "md" // 16px
  | "lg" // 24px
  | "xl" // 32px
  | "2xl" // 48px
  | "3xl" // 64px
  | "4xl" // 96px
  | "5xl" // 128px
  | "6xl" // 160px
  | "7xl" // 192px
  | "8xl" // 224px
  | "9xl"; // 256px

/**
 * Spacer component specification.
 * A layout component that adds consistent spacing between elements.
 */
export interface SpacerSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Spacer" for this component.
   */
  type: "Spacer";

  /**
   * The amount of space to add.
   * @default "md"
   */
  size?: SpacerSize;

  /**
   * The direction of the spacer.
   * - "vertical": Adds vertical space (height)
   * - "horizontal": Adds horizontal space (width)
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";

  /**
   * Whether to show a visual guide in development mode.
   * Useful for debugging spacing issues.
   * @default false
   */
  showGuide?: boolean;

  /**
   * Optional additional CSS classes to apply to the component.
   * Can be used for responsive spacing or custom styling.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the component.
   */
  style?: Record<string, string | number>;
}
