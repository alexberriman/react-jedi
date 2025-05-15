/**
 * Badge Component Schema
 *
 * This file defines the TypeScript interfaces for the Badge component's specification schema.
 * The Badge component is used to display short informational messages, status indicators,
 * or counts in a compact visual format.
 */

import type { BaseComponentSpec } from "./base";

/**
 * Badge component specification.
 */
export interface BadgeSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Badge" for this component.
   */
  type: "Badge";

  /**
   * The variant style of the badge.
   * Controls the visual appearance and emphasis level.
   * @default "default"
   */
  variant?: "default" | "secondary" | "destructive" | "outline";

  /**
   * The content to be displayed inside the badge.
   * Can be text, icons, or a combination of both.
   */
  children: string | BaseComponentSpec | BaseComponentSpec[];

  /**
   * Treat the badge as a child slot element.
   * When true, the badge will adapt to parent component context.
   * @default false
   */
  asChild?: boolean;

  /**
   * Optional additional CSS classes to apply to the component.
   * Can be used for custom styling.
   */
  className?: string;

  /**
   * Optional ARIA label for accessibility.
   * Important when badge contains only visual elements.
   */
  ariaLabel?: string;

  /**
   * Optional icon component to display before text content.
   * Icon is automatically sized and positioned within the badge.
   */
  icon?: BaseComponentSpec;
}
