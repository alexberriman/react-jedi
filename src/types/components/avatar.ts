/**
 * Avatar Component Schema
 *
 * This file defines the TypeScript interfaces for the Avatar component's specification schema.
 * The Avatar component is used to represent a user or entity with an image, fallback initial, or icon.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Type alias for component children that can be a string, a single component, or an array of components.
 */
type ComponentChildren = string | BaseComponentSpec | BaseComponentSpec[];

/**
 * Avatar component specification.
 */
export interface AvatarSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Avatar" for this component.
   */
  type: "Avatar";

  /**
   * Optional content to be rendered inside the Avatar.
   * Typically contains AvatarImage and AvatarFallback components.
   */
  children?: ComponentChildren;

  /**
   * Treat the avatar as a child slot element.
   * When true, the avatar will adapt to parent component context.
   * @default false
   */
  asChild?: boolean;

  /**
   * Optional additional CSS classes to apply to the component.
   * Can be used for custom styling, including size adjustments.
   */
  className?: string;

  /**
   * Optional ARIA label for accessibility.
   * Important when avatar has no text content.
   */
  ariaLabel?: string;
}

/**
 * AvatarImage component specification.
 */
export interface AvatarImageSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "AvatarImage" for this component.
   */
  type: "AvatarImage";

  /**
   * Source URL for the avatar image.
   */
  src: string;

  /**
   * Alt text for the avatar image.
   * Important for accessibility.
   */
  alt: string;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;

  /**
   * Treat the avatar image as a child slot element.
   * @default false
   */
  asChild?: boolean;
}

/**
 * AvatarFallback component specification.
 */
export interface AvatarFallbackSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "AvatarFallback" for this component.
   */
  type: "AvatarFallback";

  /**
   * The content to be rendered inside the AvatarFallback.
   * Typically text content (like initials) or an icon.
   */
  children: ComponentChildren;

  /**
   * Optional delay before showing the fallback in milliseconds.
   * @default 600
   */
  delayMs?: number;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;

  /**
   * Treat the avatar fallback as a child slot element.
   * @default false
   */
  asChild?: boolean;
}
