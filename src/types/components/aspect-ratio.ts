/**
 * AspectRatio Component Schema
 *
 * This file defines the TypeScript interfaces for the AspectRatio component's specification schema.
 * The AspectRatio component is used to maintain a consistent width/height ratio for its content.
 */

import type { BaseComponentSpec } from "./base";

/**
 * AspectRatio component specification.
 */
export interface AspectRatioSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "AspectRatio" for this component.
   */
  type: "AspectRatio";

  /**
   * The ratio to maintain for the aspect ratio.
   * Examples: 16/9 (widescreen), 1 (square), 4/3 (standard)
   * @default 1
   */
  ratio?: number;

  /**
   * The content to be rendered inside the AspectRatio container.
   * Typically an image, video, or other media content.
   */
  children: BaseComponentSpec | BaseComponentSpec[];

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}
