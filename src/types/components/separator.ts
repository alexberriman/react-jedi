/**
 * Separator Component Schema
 *
 * This file defines the TypeScript interfaces for the Separator component's specification schema.
 * The Separator component is used to visually separate content with a horizontal or vertical divider.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Separator component specification.
 */
export interface SeparatorSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Separator" for this component.
   */
  type: "Separator";

  /**
   * The orientation of the separator.
   * "horizontal" creates a horizontal line, "vertical" creates a vertical line.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Whether the separator is decorative or semantic.
   * When true, it's purely visual and won't be announced by screen readers.
   * When false, it represents a thematic break and will be announced by screen readers.
   * @default true
   */
  decorative?: boolean;
}
