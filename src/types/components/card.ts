/**
 * Card Component Schema
 *
 * This file defines the TypeScript interfaces for the Card component's specification schema.
 * The Card component is a flexible container for grouping and displaying content.
 */

import type { BaseComponentSpec } from "../schema/base";

/**
 * Type alias for component children that can be a string, a single component, or an array of components.
 */
type ComponentChildren = string | BaseComponentSpec | BaseComponentSpec[];

/**
 * Type alias for component children that can only be a single component or an array of components.
 */
type ComponentChildrenOnly = BaseComponentSpec | BaseComponentSpec[];

/**
 * Card component specification.
 */
export interface CardSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Card" for this component.
   */
  type: "Card";

  /**
   * The content to be rendered inside the Card.
   * Typically a combination of CardHeader, CardContent, and CardFooter.
   */
  children: ComponentChildrenOnly;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * CardHeader component specification.
 */
export interface CardHeaderSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "CardHeader" for this component.
   */
  type: "CardHeader";

  /**
   * The content to be rendered inside the CardHeader.
   * Typically a combination of CardTitle and CardDescription.
   */
  children: ComponentChildrenOnly;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * CardTitle component specification.
 */
export interface CardTitleSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "CardTitle" for this component.
   */
  type: "CardTitle";

  /**
   * The content to be rendered inside the CardTitle.
   * Typically text content.
   */
  children: ComponentChildren;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * CardDescription component specification.
 */
export interface CardDescriptionSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "CardDescription" for this component.
   */
  type: "CardDescription";

  /**
   * The content to be rendered inside the CardDescription.
   * Typically text content.
   */
  children: ComponentChildren;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * CardContent component specification.
 */
export interface CardContentSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "CardContent" for this component.
   */
  type: "CardContent";

  /**
   * The content to be rendered inside the CardContent.
   * Can be any valid component or text.
   */
  children: ComponentChildren;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * CardFooter component specification.
 */
export interface CardFooterSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "CardFooter" for this component.
   */
  type: "CardFooter";

  /**
   * The content to be rendered inside the CardFooter.
   * Can be any valid component or text.
   */
  children: ComponentChildren;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}

/**
 * CardAction component specification.
 */
export interface CardActionSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "CardAction" for this component.
   */
  type: "CardAction";

  /**
   * The content to be rendered inside the CardAction.
   * Typically interactive elements like buttons.
   */
  children: ComponentChildrenOnly;

  /**
   * Optional additional CSS classes to apply to the component.
   */
  className?: string;
}
