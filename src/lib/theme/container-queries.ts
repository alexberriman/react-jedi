/**
 * Container Queries System
 *
 * Provides comprehensive support for CSS Container Queries,
 * enabling component-level responsive design.
 */

import type { ResponsiveValue } from "./responsive-system";
import { normalizeResponsiveValue, extractBreakpoints } from "./responsive-system";

/**
 * Container types for container queries
 */
export type ContainerType = "size" | "inline-size" | "block-size" | "style";

/**
 * Container name type
 */
export type ContainerName = string | string[];

/**
 * Container query conditions
 */
export interface ContainerQueryCondition {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  height?: string;
  aspectRatio?: string;
  orientation?: "portrait" | "landscape";
}

/**
 * Container definition
 */
export interface ContainerDefinition {
  name?: ContainerName;
  type?: ContainerType;
  style?: Record<string, unknown>;
}

/**
 * Container query specification
 */
export interface ContainerQuery {
  container?: string;
  conditions: ContainerQueryCondition;
}

/**
 * Container-aware responsive value
 */
export type ContainerResponsiveValue<T> = T | ContainerResponsiveObject<T>;

/**
 * Container responsive object
 */
export interface ContainerResponsiveObject<T> {
  [containerQuery: string]: T;
}

/**
 * Container sizes preset
 */
export const DEFAULT_CONTAINER_SIZES = {
  xs: "320px",
  sm: "384px",
  md: "448px",
  lg: "512px",
  xl: "576px",
  "2xl": "672px",
  "3xl": "768px",
  "4xl": "896px",
  "5xl": "1024px",
  "6xl": "1152px",
} as const;

/**
 * Container query builder options
 */
export interface ContainerQueryBuilderOptions {
  container?: string;
  type?: ContainerType;
}

/**
 * Generate container query string from conditions
 */
export function generateContainerQueryString(
  conditions: ContainerQueryCondition,
  options: ContainerQueryBuilderOptions = {}
): string {
  const parts: string[] = [];
  const containerName = options.container ? `${options.container} ` : "";
  
  // Size conditions
  if (conditions.minWidth) {
    parts.push(`(min-width: ${conditions.minWidth})`);
  }
  if (conditions.maxWidth) {
    parts.push(`(max-width: ${conditions.maxWidth})`);
  }
  if (conditions.minHeight) {
    parts.push(`(min-height: ${conditions.minHeight})`);
  }
  if (conditions.maxHeight) {
    parts.push(`(max-height: ${conditions.maxHeight})`);
  }
  if (conditions.width) {
    parts.push(`(width: ${conditions.width})`);
  }
  if (conditions.height) {
    parts.push(`(height: ${conditions.height})`);
  }
  
  // Aspect ratio
  if (conditions.aspectRatio) {
    parts.push(`(aspect-ratio: ${conditions.aspectRatio})`);
  }
  
  // Orientation
  if (conditions.orientation) {
    parts.push(`(orientation: ${conditions.orientation})`);
  }
  
  if (parts.length === 0) {
    throw new Error("Container query must have at least one condition");
  }
  
  return `@container ${containerName}${parts.join(" and ")}`;
}

/**
 * Create container definition CSS
 */
export function createContainerDefinition(
  selector: string,
  definition: ContainerDefinition
): string {
  const properties: string[] = [];
  
  if (definition.name) {
    const names = Array.isArray(definition.name) 
      ? definition.name.join(" ") 
      : definition.name;
    properties.push(`container-name: ${names}`);
  }
  
  if (definition.type) {
    properties.push(`container-type: ${definition.type}`);
  }
  
  if (definition.style) {
    for (const [prop, value] of Object.entries(definition.style)) {
      properties.push(`${prop}: ${value}`);
    }
  }
  
  return `${selector} { ${properties.join("; ")}; }`;
}

/**
 * Build container query from size
 */
export function containerQueryFromSize(
  size: keyof typeof DEFAULT_CONTAINER_SIZES | string,
  options: ContainerQueryBuilderOptions = {}
): string {
  const containerSize = DEFAULT_CONTAINER_SIZES[size as keyof typeof DEFAULT_CONTAINER_SIZES] || size;
  
  return generateContainerQueryString(
    { minWidth: containerSize },
    options
  );
}

/**
 * Container query builder utilities
 */
export const containerQuery = {
  /**
   * Create container query for minimum width
   */
  minWidth: (width: string, container?: string) => 
    generateContainerQueryString({ minWidth: width }, { container }),
  
  /**
   * Create container query for maximum width
   */
  maxWidth: (width: string, container?: string) => 
    generateContainerQueryString({ maxWidth: width }, { container }),
  
  /**
   * Create container query for width range
   */
  between: (minWidth: string, maxWidth: string, container?: string) =>
    generateContainerQueryString({ minWidth, maxWidth }, { container }),
  
  /**
   * Create container query for exact width
   */
  width: (width: string, container?: string) =>
    generateContainerQueryString({ width }, { container }),
  
  /**
   * Create container query for minimum height
   */
  minHeight: (height: string, container?: string) =>
    generateContainerQueryString({ minHeight: height }, { container }),
  
  /**
   * Create container query for aspect ratio
   */
  aspectRatio: (ratio: string, container?: string) =>
    generateContainerQueryString({ aspectRatio: ratio }, { container }),
  
  /**
   * Create container query for orientation
   */
  orientation: (orientation: "portrait" | "landscape", container?: string) =>
    generateContainerQueryString({ orientation }, { container }),
  
  /**
   * Create container query from preset size
   */
  size: (size: keyof typeof DEFAULT_CONTAINER_SIZES, container?: string) =>
    containerQueryFromSize(size, { container }),
};

/**
 * Apply container query to styles
 */
export function applyContainerQuery<T>(
  property: string,
  value: ContainerResponsiveValue<T>,
  transformer: (value: T) => string
): Record<string, unknown> {
  if (!value || typeof value !== "object") {
    return { [property]: transformer(value as T) };
  }
  
  const styles: Record<string, unknown> = {};
  
  for (const [query, queryValue] of Object.entries(value as ContainerResponsiveObject<T>)) {
    if (query.startsWith("@container")) {
      styles[query] = { [property]: transformer(queryValue) };
    } else {
      // Treat as base value
      styles[property] = transformer(queryValue);
    }
  }
  
  return styles;
}

/**
 * Create container-aware component styles
 */
export function createContainerStyles(
  componentName: string,
  container: ContainerDefinition,
  styles: Record<string, ContainerResponsiveValue<string>>
): string {
  const css: string[] = [];
  
  // Add container definition
  css.push(createContainerDefinition(`.${componentName}`, container));
  
  // Add responsive styles
  for (const [property, value] of Object.entries(styles)) {
    const propertyStyles = applyContainerQuery(property, value, v => v);
    
    for (const [selector, style] of Object.entries(propertyStyles)) {
      if (typeof style === "string") {
        css.push(`.${componentName} { ${selector}: ${style}; }`);
      } else if (typeof style === "object" && style) {
        const stylesString = Object.entries(style).map(([p, v]) => `${p}: ${v}`).join("; ");
        css.push(`${selector} { .${componentName} { ${stylesString}; } }`);
      }
    }
  }
  
  return css.join("\n");
}

/**
 * Hook-like interface for container queries
 */
export interface UseContainerQueryResult {
  container: typeof containerQuery;
  apply: <T>(
    property: string,
    value: ContainerResponsiveValue<T>,
    transformer?: (value: T) => string
  ) => Record<string, unknown>;
  define: (selector: string, definition: ContainerDefinition) => string;
  sizes: typeof DEFAULT_CONTAINER_SIZES;
}

/**
 * Create container query utilities
 */
export function useContainerQuery(): UseContainerQueryResult {
  return {
    container: containerQuery,
    apply: (property, value, transformer = String) => 
      applyContainerQuery(property, value, transformer),
    define: createContainerDefinition,
    sizes: DEFAULT_CONTAINER_SIZES,
  };
}

/**
 * Example: Create responsive card component with container queries
 */
export function createResponsiveCard() {
  const containerName = "card";
  
  const definition: ContainerDefinition = {
    name: containerName,
    type: "inline-size",
  };
  
  const styles = {
    padding: {
      base: "1rem",
      [containerQuery.minWidth("400px", containerName)]: "1.5rem",
      [containerQuery.minWidth("600px", containerName)]: "2rem",
    },
    fontSize: {
      base: "0.875rem",
      [containerQuery.minWidth("400px", containerName)]: "1rem",
      [containerQuery.minWidth("600px", containerName)]: "1.125rem",
    },
    gridTemplateColumns: {
      base: "1fr",
      [containerQuery.minWidth("600px", containerName)]: "repeat(2, 1fr)",
      [containerQuery.minWidth("900px", containerName)]: "repeat(3, 1fr)",
    },
  };
  
  return createContainerStyles("responsive-card", definition, styles);
}

/**
 * Mix container queries with media queries
 */
export function createHybridResponsiveStyles<T>(
  property: string,
  mediaValues: ResponsiveValue<T>,
  containerValues: ContainerResponsiveValue<T>,
  breakpoints = extractBreakpoints(),
  transformer: (value: T) => string = String
): Record<string, unknown> {
  const styles: Record<string, unknown> = {};
  
  // Apply media query values first
  const normalizedMedia = normalizeResponsiveValue(mediaValues, breakpoints);
  for (const [breakpoint, value] of Object.entries(normalizedMedia)) {
    if (value !== undefined) {
      if (breakpoint === "base") {
        styles[property] = transformer(value);
      } else {
        const mediaQuery = `@media (min-width: ${breakpoints[breakpoint]})`;
        styles[mediaQuery] = { [property]: transformer(value) };
      }
    }
  }
  
  // Apply container query values (these will override media queries when active)
  const containerStyles = applyContainerQuery(property, containerValues, transformer);
  Object.assign(styles, containerStyles);
  
  return styles;
}