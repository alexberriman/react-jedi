/**
 * Typography Component Schemas
 *
 * This file defines the TypeScript interfaces for typography components in the Server-Driven UI system.
 * These components are used for displaying text content with various styles and formatting.
 */

import type { BaseComponentSpec } from "./base";

/**
 * Type for component children that can be string, a single component, or multiple components.
 */
export type ComponentChildren = string | ComponentSpec | ComponentSpec[];

/**
 * Text Component Specification
 * 
 * A component for rendering paragraph and span text elements.
 */
export interface TextSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Text" for this component.
   */
  type: "Text";

  /**
   * The text content to display.
   */
  content?: string;

  /**
   * The HTML element to render.
   * @default "p"
   */
  as?: "p" | "span" | "div" | "strong" | "em" | "mark" | "ins" | "del" | "sub" | "sup";

  /**
   * Font size of the text.
   * @example "sm", "md", "lg", "xl"
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  /**
   * Font weight of the text.
   * @default "normal"
   */
  weight?: "hairline" | "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";

  /**
   * Text alignment.
   * @default "left"
   */
  align?: "left" | "center" | "right" | "justify";

  /**
   * Text transformation.
   */
  transform?: "uppercase" | "lowercase" | "capitalize" | "none";

  /**
   * Text decoration.
   */
  decoration?: "underline" | "line-through" | "none";

  /**
   * Font style.
   * @default "normal"
   */
  fontStyle?: "normal" | "italic" | "oblique";

  /**
   * Line height.
   */
  lineHeight?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";

  /**
   * Letter spacing.
   */
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";

  /**
   * Text color.
   * @example "gray.800", "primary.500"
   */
  color?: string;

  /**
   * Whether the text should wrap.
   * @default true
   */
  wrap?: boolean;

  /**
   * How to handle text overflow.
   */
  overflow?: "clip" | "ellipsis";

  /**
   * Maximum number of lines (requires overflow: ellipsis).
   */
  maxLines?: number;

  /**
   * Custom CSS class names to add to the text.
   */
  className?: string;

  /**
   * Child content (alternative to content prop).
   */
  children?: ComponentChildren;
}

/**
 * Heading Component Specification
 * 
 * A component for rendering heading elements (h1-h6).
 */
export interface HeadingSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Heading" for this component.
   */
  type: "Heading";

  /**
   * The text content of the heading.
   */
  content?: string;

  /**
   * The heading level (h1-h6).
   * @default "h2"
   */
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Font size of the heading.
   * Will default based on heading level if not specified.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";

  /**
   * Font weight of the heading.
   * @default "bold"
   */
  weight?: "hairline" | "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";

  /**
   * Text alignment.
   * @default "left"
   */
  align?: "left" | "center" | "right" | "justify";

  /**
   * Text transformation.
   */
  transform?: "uppercase" | "lowercase" | "capitalize" | "none";

  /**
   * Text decoration.
   */
  decoration?: "underline" | "line-through" | "none";

  /**
   * Line height.
   * @default "tight"
   */
  lineHeight?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";

  /**
   * Letter spacing.
   */
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";

  /**
   * Text color.
   * @example "gray.900", "primary.700"
   */
  color?: string;

  /**
   * Whether to truncate the text with an ellipsis when it overflows.
   * @default false
   */
  truncate?: boolean;

  /**
   * Custom CSS class names to add to the heading.
   */
  className?: string;

  /**
   * Child content (alternative to content prop).
   */
  children?: ComponentChildren;
}

/**
 * BlockQuote Component Specification
 * 
 * A component for rendering quoted blocks of content.
 */
export interface BlockQuoteSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "BlockQuote" for this component.
   */
  type: "BlockQuote";

  /**
   * The quoted text content.
   */
  content?: string;

  /**
   * Attribution (source) of the quote.
   */
  attribution?: string;

  /**
   * Citation information for the quote.
   */
  cite?: string;

  /**
   * Border style for the block quote.
   * @default "left"
   */
  borderStyle?: "left" | "right" | "top" | "bottom" | "all" | "none";

  /**
   * Border color for the block quote.
   * @example "gray.300", "primary.200"
   */
  borderColor?: string;

  /**
   * Border width for the block quote.
   * @default "4px" for left/right/top/bottom, "1px" for all
   */
  borderWidth?: string;

  /**
   * Background color for the block quote.
   * @example "gray.50", "primary.50"
   */
  backgroundColor?: string;

  /**
   * Text color for the quote.
   */
  color?: string;

  /**
   * Font style for the quote.
   * @default "italic"
   */
  fontStyle?: "normal" | "italic" | "oblique";

  /**
   * Whether to show quotation marks.
   * @default true
   */
  showQuotationMarks?: boolean;

  /**
   * Style of quotation marks.
   * @default "modern"
   */
  quotationMarkStyle?: "modern" | "classic" | "none";

  /**
   * Custom CSS class names to add to the block quote.
   */
  className?: string;

  /**
   * Child content (alternative to content prop).
   */
  children?: ComponentChildren;
}

/**
 * Type for all typography component specifications.
 */
export type TypographyComponentSpec =
  | TextSpec
  | HeadingSpec
  | BlockQuoteSpec;

/**
 * Type for any component specification.
 * This is more specific than the base ComponentSpec and includes all defined component types.
 */
export type ComponentSpec = BaseComponentSpec | TypographyComponentSpec;