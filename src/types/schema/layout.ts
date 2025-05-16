/**
 * Layout Component Schemas
 *
 * This file defines the TypeScript interfaces for layout components in the Server-Driven UI system.
 * These components provide the foundation for building complex layouts.
 */

import type { BaseComponentSpec, ComponentChildren } from "./base";
import type { StackSpec } from "../components/stack";
import type { GroupSpec } from "../components/group";
import type { SimpleGridSpec } from "../components/simple-grid";
import type { MasonrySpec } from "../components/masonry";

/**
 * Box Component Specification
 *
 * A primitive div-like container component for general-purpose layouts.
 */
export interface BoxSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Box" for this component.
   */
  type: "Box";

  /**
   * The padding to apply to the box.
   * Can be a single value or different values for each side.
   * @example "4", "2 4", "2 4 6 8"
   */
  padding?: string;

  /**
   * The margin to apply around the box.
   * Can be a single value or different values for each side.
   * @example "4", "2 4", "2 4 6 8"
   */
  margin?: string;

  /**
   * Border width for the box.
   * @example "1", "2"
   */
  borderWidth?: string;

  /**
   * Border color for the box.
   * @example "gray.200", "primary.500"
   */
  borderColor?: string;

  /**
   * Border radius for the box corners (rounded).
   * Can be a theme scale value or a custom value.
   * @example "none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"
   * @example "4px", "0.5rem", "50%"
   */
  rounded?: string;

  /**
   * Background color of the box.
   * @example "white", "gray.100", "primary.50"
   */
  backgroundColor?: string;

  /**
   * Box shadow to apply.
   * @example "none", "sm", "md", "lg", "xl", "2xl"
   */
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Height of the box.
   * @example "100px", "50%", "auto", "100vh"
   */
  height?: string;

  /**
   * Width of the box.
   * @example "100px", "50%", "auto", "100vw"
   */
  width?: string;

  /**
   * Minimum height of the box.
   * @example "100px", "50%"
   */
  minHeight?: string;

  /**
   * Maximum height of the box.
   * @example "100px", "50%"
   */
  maxHeight?: string;

  /**
   * Minimum width of the box.
   * @example "100px", "50%"
   */
  minWidth?: string;

  /**
   * Maximum width of the box.
   * @example "100px", "50%"
   */
  maxWidth?: string;

  /**
   * Overflow behavior for the box.
   * @example "visible", "hidden", "scroll", "auto"
   */
  overflow?: "visible" | "hidden" | "scroll" | "auto";

  /**
   * Position property for the box.
   * @example "static", "relative", "absolute", "fixed", "sticky"
   */
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";

  /**
   * Top position when using absolute or fixed positioning.
   */
  top?: string;

  /**
   * Right position when using absolute or fixed positioning.
   */
  right?: string;

  /**
   * Bottom position when using absolute or fixed positioning.
   */
  bottom?: string;

  /**
   * Left position when using absolute or fixed positioning.
   */
  left?: string;

  /**
   * Z-index for controlling stacking order.
   */
  zIndex?: number;

  /**
   * Custom CSS class names to add to the box.
   */
  className?: string;

  /**
   * Child content to render inside the box.
   */
  children?: ComponentChildren;
}

/**
 * Container Component Specification
 *
 * A centered, width-restricted container for page content.
 */
export interface ContainerSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Container" for this component.
   */
  type: "Container";

  /**
   * The maximum width of the container.
   * @example "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "full", "none"
   * @default "xl"
   */
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full"
    | "none";

  /**
   * The padding to apply inside the container.
   * @example "4", "2 4"
   * @default "4"
   */
  padding?: string;

  /**
   * Whether to center the container horizontally.
   * @default true
   */
  centerContent?: boolean;

  /**
   * Custom CSS class names to add to the container.
   */
  className?: string;

  /**
   * Child content to render inside the container.
   */
  children?: ComponentChildren;
}

/**
 * Grid Component Specification
 *
 * A CSS Grid-based layout component for two-dimensional layouts.
 */
export interface GridSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Grid" for this component.
   */
  type: "Grid";

  /**
   * The number of columns in the grid.
   * Can be responsive using breakpoints.
   * @example "1", "2", "3", "12", { base: "1", md: "2", lg: "3" }
   */
  columns?: string | number | Record<string, string | number>;

  /**
   * Gap between grid items.
   * Can be a single value or different values for rows and columns.
   * @example "4", { column: "4", row: "8" }
   */
  gap?: string | { column?: string; row?: string };

  /**
   * Responsive gap sizes.
   * @example { base: "2", md: "4", lg: "6" }
   */
  responsiveGap?: Record<string, string>;

  /**
   * Defines named grid areas.
   * @example ["header header", "sidebar content", "footer footer"]
   */
  areas?: string[];

  /**
   * Defines explicit grid template rows.
   * @example "auto", "1fr 2fr", "auto 1fr auto"
   */
  rows?: string;

  /**
   * Responsive row configurations.
   * @example { base: "auto", md: "auto 1fr" }
   */
  responsiveRows?: Record<string, string>;

  /**
   * Auto-fit or auto-fill behavior for responsive grids.
   * @example { type: "auto-fit", minSize: "200px" }
   */
  autoResponsive?: {
    type: "auto-fit" | "auto-fill";
    minSize: string;
    maxSize?: string;
  };

  /**
   * Alignment of grid items along the row axis.
   */
  alignItems?: "start" | "end" | "center" | "stretch";

  /**
   * Justification of grid items along the column axis.
   */
  justifyItems?: "start" | "end" | "center" | "stretch";

  /**
   * Alignment of the entire grid within its container along the row axis.
   */
  alignContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";

  /**
   * Justification of the entire grid within its container along the column axis.
   */
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";

  /**
   * Custom CSS class names to add to the grid.
   */
  className?: string;

  /**
   * Child content (grid items) to render inside the grid.
   */
  children?: ComponentChildren;
}

/**
 * Flex Component Specification
 *
 * A Flexbox-based layout component for one-dimensional layouts.
 */
export interface FlexSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Flex" for this component.
   */
  type: "Flex";

  /**
   * Direction of the flex layout.
   * @default "row"
   */
  direction?: "row" | "row-reverse" | "column" | "column-reverse";

  /**
   * Responsive direction configurations.
   * @example { base: "column", md: "row" }
   */
  responsiveDirection?: Record<string, "row" | "row-reverse" | "column" | "column-reverse">;

  /**
   * Wrap behavior for flex items.
   * @default "nowrap"
   */
  wrap?: "nowrap" | "wrap" | "wrap-reverse";

  /**
   * Alignment of flex items on the cross axis.
   * @default "stretch"
   */
  align?: "start" | "end" | "center" | "baseline" | "stretch";

  /**
   * Responsive alignment configurations.
   */
  responsiveAlign?: Record<string, "start" | "end" | "center" | "baseline" | "stretch">;

  /**
   * Justification of flex items on the main axis.
   * @default "start"
   */
  justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";

  /**
   * Responsive justification configurations.
   */
  responsiveJustify?: Record<
    string,
    "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly"
  >;

  /**
   * Gap between flex items.
   * @example "4", "2 4" (column gap, row gap)
   */
  gap?: string;

  /**
   * Responsive gap configurations.
   */
  responsiveGap?: Record<string, string>;

  /**
   * Custom CSS class names to add to the flex container.
   */
  className?: string;

  /**
   * Child content (flex items) to render inside the flex container.
   */
  children?: ComponentChildren;
}

/**
 * AspectRatio Component Specification
 *
 * A component that maintains a specified aspect ratio for its contents.
 */
export interface AspectRatioSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "AspectRatio" for this component.
   */
  type: "AspectRatio";

  /**
   * The aspect ratio to maintain (width/height).
   * @example "16/9", "4/3", "1/1", "2/1"
   * @default "16/9"
   */
  ratio?: string;

  /**
   * Custom CSS class names to add to the component.
   */
  className?: string;

  /**
   * Child content to render inside the aspect ratio container.
   */
  children?: ComponentChildren;
}

/**
 * Separator Component Specification
 *
 * A horizontal or vertical dividing line.
 */
export interface SeparatorSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Separator" for this component.
   */
  type: "Separator";

  /**
   * The orientation of the separator.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * The thickness of the separator line.
   * @default "1px"
   */
  thickness?: string;

  /**
   * The color of the separator line.
   * @default "gray.200"
   */
  color?: string;

  /**
   * Custom CSS class names to add to the separator.
   */
  className?: string;

  /**
   * The length of the separator (width for horizontal, height for vertical).
   * @example "100%", "200px"
   * @default "100%"
   */
  length?: string;

  /**
   * Margin to add around the separator.
   * @example "4", "2 4"
   */
  margin?: string;

  /**
   * Whether to show a decorative element in the center of the separator.
   * @default false
   */
  withLabel?: boolean;

  /**
   * Label content when withLabel is true.
   */
  labelText?: string;

  /**
   * Line style of the separator.
   * @default "solid"
   */
  lineStyle?: "solid" | "dashed" | "dotted";

  /**
   * Inherited from BaseComponentSpec, overriding style property.
   * This is the inline style object for the component.
   */
  style?: Record<string, string | number>;
}

/**
 * Type alias for layout component specifications.
 */
export type LayoutComponentSpec =
  | BoxSpec
  | ContainerSpec
  | GridSpec
  | FlexSpec
  | AspectRatioSpec
  | SeparatorSpec
  | StackSpec
  | GroupSpec
  | SimpleGridSpec
  | MasonrySpec;
