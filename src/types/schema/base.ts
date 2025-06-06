/**
 * Base Component Schema
 *
 * This file defines the TypeScript interfaces for the base component specification schema.
 * All component specifications extend this base interface.
 */

import type { EventHandlerSpec } from "../events";

// Forward declaration for circular dependency
export interface ComponentSpec extends BaseComponentSpec {
  // This extends BaseComponentSpec and may be further extended in other files
  // The empty interface is intentional to support the component type system
  _brand?: never; // Brand property to make the type distinct

  // Add [Symbol.iterator] method to support iterator usage
  [Symbol.iterator]?(): Iterator<ComponentSpec>;
}

/**
 * Type for component children that allows a string, a single component, or multiple components.
 * Also supports mixed arrays of strings and components for text interpolation.
 */
export type ComponentChildren = string | ComponentSpec | ComponentSpec[] | Array<string | ComponentSpec>;

/**
 * Base component specification that all components extend.
 */
export interface BaseComponentSpec {
  /**
   * Unique identifier for the component instance.
   */
  id?: string;

  /**
   * The type of the component.
   * Each component implementation must specify its own type.
   */
  type: string;

  /**
   * Optional children components or content.
   */
  children?: ComponentChildren;

  /**
   * Optional CSS class names to apply to the component.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the component.
   */
  style?: Record<string, string | number>;

  /**
   * Allow other properties for component-specific attributes
   */
  [key: string]: unknown;

  /**
   * Optional event handlers for the component.
   */
  eventHandlers?: Record<string, EventHandlerSpec>;

  /**
   * Optional accessibility properties.
   */
  a11y?: AccessibilityProps;

  /**
   * Optional data attributes to add to the component.
   */
  data?: Record<string, string>;

  /**
   * Optional test identifiers for testing frameworks.
   */
  testId?: string;

  /**
   * Grid columns configuration.
   * Used by Grid components.
   */
  columns?: string | number | Record<string, string | number>;

  /**
   * Flex direction configuration.
   * Used by Flex components.
   */
  direction?: "row" | "row-reverse" | "column" | "column-reverse";

  /**
   * Heading level.
   * Used by Heading components.
   */
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Component state configuration.
   * Can be a string reference to global state key or a full state config.
   */
  state?: string | Record<string, unknown>;

  /**
   * Conditional rendering expression.
   * If provided, the component will only render when this condition evaluates to true.
   * Can be a boolean or a string expression like "state.isVisible" or "props.type === 'primary'".
   */
  when?: string | boolean;

  /**
   * Conditional properties.
   * Properties that are applied conditionally based on expressions.
   * Each key is a property name, and the value is an object mapping conditions to values.
   */
  conditionalProps?: Record<string, Record<string, unknown>>;
}

/**
 * The ComponentSpec interface is defined above as a forward declaration.
 * The full union type that includes all component types is defined in components.ts.
 */

/**
 * Event handler definition.
 */
export interface EventHandler {
  /**
   * The type of action to perform.
   */
  action: string;

  /**
   * Optional parameters for the action.
   */
  params?: Record<string, unknown>;
}

/**
 * Accessibility properties for components.
 */
export interface AccessibilityProps {
  /**
   * ARIA label for the component.
   */
  ariaLabel?: string;

  /**
   * ARIA described by reference.
   */
  ariaDescribedBy?: string;

  /**
   * ARIA controls reference.
   */
  ariaControls?: string;

  /**
   * ARIA expanded state.
   */
  ariaExpanded?: boolean;

  /**
   * ARIA hidden state.
   */
  ariaHidden?: boolean;

  /**
   * Tab index for keyboard navigation.
   */
  tabIndex?: number;

  /**
   * Whether the component has a popup.
   */
  hasPopup?: boolean;

  /**
   * ARIA live region setting.
   */
  ariaLive?: "off" | "polite" | "assertive";

  /**
   * ARIA atomic setting for live regions.
   */
  ariaAtomic?: boolean;

  /**
   * ARIA role for the component.
   */
  role?: string;
}
