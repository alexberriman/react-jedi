/**
 * Base Component Specification
 *
 * This file defines the base TypeScript interfaces that all component specifications extend.
 * It establishes the common properties and structure that all server-driven UI components share.
 */

/**
 * Base component specification that all component specs extend.
 */
export interface BaseComponentSpec {
  /**
   * The type of the component.
   * This is used to resolve the correct React component for rendering.
   */
  type: string;

  /**
   * Optional unique identifier for the component.
   * Useful for referencing specific components in the UI tree.
   */
  id?: string;

  /**
   * Optional data attributes to be applied to the component.
   * Key-value pairs that will be added as HTML data-* attributes.
   */
  dataAttributes?: Record<string, string>;

  /**
   * Optional flag to conditionally render the component.
   * If false, the component will not be rendered.
   * @default true
   */
  visible?: boolean;

  /**
   * Optional event handlers for the component.
   * Maps event names to action identifiers or inline functions.
   */
  events?: Record<string, string | ((...args: unknown[]) => void)>;
}
