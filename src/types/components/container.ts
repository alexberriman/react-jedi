/**
 * Container Component Schema
 *
 * This file defines the TypeScript interfaces for the Container component's specification schema.
 * The Container component is a layout component for controlling max-width and centering content.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Type alias for component children that can be a string, a single component, or an array of components.
 */
type ComponentChildren = string | BaseComponentSpec | BaseComponentSpec[];

/**
 * Container size options
 */
export type ContainerSize = "default" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Container padding options
 */
export type ContainerPadding = "default" | "none" | "sm" | "lg" | "xl";

/**
 * Container alignment options
 */
export type ContainerAlign = "default" | "center" | "end" | "stretch";

/**
 * Container component specification.
 */
export interface ContainerSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Container" for this component.
   */
  type: "Container";

  /**
   * The content to be rendered inside the Container.
   * Can be any valid component or text.
   */
  children: ComponentChildren;

  /**
   * Controls the max-width of the container.
   * - default: max-w-7xl
   * - sm: max-w-3xl
   * - md: max-w-5xl
   * - lg: max-w-7xl
   * - xl: max-w-[90rem]
   * - full: max-w-full
   */
  size?: ContainerSize;

  /**
   * Controls the vertical padding of the container.
   * - default: py-8 md:py-12
   * - none: py-0
   * - sm: py-4 md:py-6
   * - lg: py-12 md:py-16
   * - xl: py-16 md:py-24
   */
  padding?: ContainerPadding;

  /**
   * Controls the alignment of container contents.
   * - default: items-start
   * - center: items-center
   * - end: items-end
   * - stretch: items-stretch
   */
  align?: ContainerAlign;

  /**
   * Renders the container as a different HTML element.
   * Default is "div".
   */
  as?: string;
}
