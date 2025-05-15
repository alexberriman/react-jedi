/**
 * Base Component Schema
 *
 * This file defines the TypeScript interfaces for the base component specification schema.
 * All component specifications extend this base interface.
 */

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
  children?: ComponentSpec[] | string;

  /**
   * Optional event handlers for the component.
   */
  events?: Record<string, EventHandler>;

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
}

/**
 * Generic component specification type.
 * Can be any component that extends the base specification.
 */
export type ComponentSpec = BaseComponentSpec;

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
