/**
 * ScrollArea Component Type
 *
 * This component provides a customizable scrollbar for overflowing content
 * with consistent look across different browsers and operating systems.
 */

// Import from the specific module where ComponentChildren is defined
import type { ComponentChildren } from "../schema/base";

export interface ScrollAreaSpecification {
  /**
   * The type identifier for the ScrollArea component
   */
  type: "ScrollArea";

  /**
   * Content to be rendered inside the scrollable area
   */
  children?: ComponentChildren;

  /**
   * Height of the scroll area (e.g., '300px', '100%')
   */
  height?: string;

  /**
   * Width of the scroll area (e.g., '300px', '100%')
   */
  width?: string;

  /**
   * Delay before hiding scrollbar in milliseconds
   * @default 600
   */
  scrollHideDelay?: number;

  /**
   * Allow other properties from BaseComponentSpec
   */
  [key: string]: unknown;
}
