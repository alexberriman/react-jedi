/**
 * Responsive System
 *
 * Comprehensive system for handling responsive design across all theme tokens.
 * Provides utilities for breakpoint management, responsive values, and container queries.
 */

import type { ThemeSpecification } from "@/types/schema/specification";

/**
 * Breakpoint definitions
 */
export interface Breakpoints {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  [key: string]: string | undefined;
}

/**
 * Default breakpoint values
 */
export const DEFAULT_BREAKPOINTS: Breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Breakpoint key type
 */
export type BreakpointKey = keyof typeof DEFAULT_BREAKPOINTS | "base" | string;

/**
 * Type for a responsive value
 */
export type ResponsiveValue<T> = T | ResponsiveObject<T> | ResponsiveArray<T>;

/**
 * Responsive object with breakpoint-specific values
 */
export type ResponsiveObject<T> = {
  [K in BreakpointKey]?: T;
} & {
  base?: T;
};

/**
 * Responsive array (mobile-first approach)
 */
export type ResponsiveArray<T> = T[];

/**
 * Media query type
 */
export type MediaQueryType = "min-width" | "max-width" | "screen" | "print";

/**
 * Media query orientation
 */
export type MediaQueryOrientation = "portrait" | "landscape";

/**
 * Container query type
 */
export type ContainerQueryType = "inline-size" | "block-size" | "style";

/**
 * Options for generating media queries
 */
export interface MediaQueryOptions {
  type?: MediaQueryType;
  orientation?: MediaQueryOrientation;
  prefers?: "light" | "dark" | "reduced-motion" | "contrast";
}

/**
 * Container query options
 */
export interface ContainerQueryOptions {
  container?: string;
  type?: ContainerQueryType;
}

/**
 * Extract breakpoints from theme
 */
export function extractBreakpoints(
  theme?: ThemeSpecification
): Breakpoints {
  if (!theme?.breakpoints || Object.keys(theme.breakpoints).length === 0) {
    return DEFAULT_BREAKPOINTS;
  }
  return theme.breakpoints;
}

/**
 * Get ordered breakpoint keys
 */
export function getBreakpointOrder(breakpoints: Breakpoints): string[] {
  const defaultOrder = ["base", "xs", "sm", "md", "lg", "xl", "2xl"];
  const customKeys = Object.keys(breakpoints).filter(
    key => !defaultOrder.includes(key)
  );
  return [...defaultOrder, ...customKeys];
}

/**
 * Generate media query string
 */
export function generateMediaQuery(
  breakpoint: BreakpointKey,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS,
  options: MediaQueryOptions = {}
): string {
  if (breakpoint === "base") {
    return "";
  }

  const value = breakpoints[breakpoint];
  if (!value) {
    throw new Error(`Breakpoint "${breakpoint}" not found`);
  }

  const parts: string[] = [];
  
  // Media type
  const mediaType = options.type || "min-width";
  parts.push(`(${mediaType}: ${value})`);

  // Orientation
  if (options.orientation) {
    parts.push(`(orientation: ${options.orientation})`);
  }

  // Preferences
  if (options.prefers) {
    parts.push(`(prefers-${options.prefers})`);
  }

  return `@media ${parts.join(" and ")}`;
}

/**
 * Generate container query string
 */
export function generateContainerQuery(
  size: string,
  options: ContainerQueryOptions = {}
): string {
  const queryType = options.type || "inline-size";
  const container = options.container ? `${options.container} ` : "";
  
  return `@container ${container}(${queryType} >= ${size})`;
}

/**
 * Map breakpoints to media queries
 */
export function createMediaQueries(
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS,
  options: MediaQueryOptions = {}
): Record<string, string> {
  const queries: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(breakpoints)) {
    if (value) {
      queries[key] = generateMediaQuery(key, breakpoints, options);
    }
  }
  
  return queries;
}

/**
 * Map breakpoints to container queries
 */
export function createContainerQueries(
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS,
  options: ContainerQueryOptions = {}
): Record<string, string> {
  const queries: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(breakpoints)) {
    if (value) {
      queries[key] = generateContainerQuery(value, options);
    }
  }
  
  return queries;
}

/**
 * Check if a value is responsive
 */
export function isResponsiveValue<T>(
  value: unknown
): value is ResponsiveValue<T> {
  if (Array.isArray(value)) {
    return true;
  }
  
  if (typeof value === "object" && value !== null) {
    const keys = Object.keys(value);
    return keys.some(key => 
      key === "base" || 
      Object.keys(DEFAULT_BREAKPOINTS).includes(key)
    );
  }
  
  return false;
}

/**
 * Normalize responsive value to object format
 */
export function normalizeResponsiveValue<T>(
  value: ResponsiveValue<T>,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): ResponsiveObject<T> {
  // Already an object
  if (typeof value === "object" && value && !Array.isArray(value)) {
    return value as ResponsiveObject<T>;
  }

  // Single value
  if (!Array.isArray(value)) {
    return { base: value };
  }

  // Array format - map to breakpoints
  const breakpointKeys = getBreakpointOrder(breakpoints);
  const result: ResponsiveObject<T> = {};
  
  for (const [index, val] of value.entries()) {
    if (index < breakpointKeys.length && val != null) {
      result[breakpointKeys[index]] = val;
    }
  }
  
  return result;
}

/**
 * Get value at specific breakpoint
 */
export function getResponsiveValue<T>(
  value: ResponsiveValue<T>,
  breakpoint: BreakpointKey,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): T | undefined {
  const normalizedValue = normalizeResponsiveValue(value, breakpoints);
  
  // Direct match
  if (normalizedValue[breakpoint] !== undefined) {
    return normalizedValue[breakpoint];
  }
  
  // Fall back to smaller breakpoints
  const order = getBreakpointOrder(breakpoints);
  const currentIndex = order.indexOf(String(breakpoint));
  
  for (let i = currentIndex - 1; i >= 0; i--) {
    const smallerBreakpoint = order[i];
    if (normalizedValue[smallerBreakpoint] !== undefined) {
      return normalizedValue[smallerBreakpoint];
    }
  }
  
  return undefined;
}

/**
 * Map responsive values to CSS
 */
export function mapResponsiveValues<T>(
  property: string,
  value: ResponsiveValue<T>,
  transformer: (value: T) => string,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): Record<string, string> {
  const css: Record<string, string> = {};
  const normalizedValue = normalizeResponsiveValue(value, breakpoints);
  
  // Apply base value
  if (normalizedValue.base !== undefined) {
    css[property] = transformer(normalizedValue.base);
  }
  
  // Apply breakpoint values
  for (const [breakpoint, breakpointValue] of Object.entries(normalizedValue)) {
    if (breakpoint !== "base" && breakpointValue !== undefined) {
      const mediaQuery = generateMediaQuery(breakpoint, breakpoints);
      if (mediaQuery) {
        css[`${mediaQuery} { ${property}`] = transformer(breakpointValue);
      }
    }
  }
  
  return css;
}

/**
 * Create responsive CSS string
 */
export function createResponsiveStyles<T>(
  property: string,
  value: ResponsiveValue<T>,
  transformer: (value: T) => string,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): string {
  const styles = mapResponsiveValues(property, value, transformer, breakpoints);
  
  return Object.entries(styles)
    .map(([key, val]) => {
      if (key.startsWith("@media")) {
        return `${key}: ${val}; }`;
      }
      return `${key}: ${val};`;
    })
    .join(" ");
}

/**
 * Create set of responsive utilities
 */
export function createResponsiveUtils(breakpoints: Breakpoints = DEFAULT_BREAKPOINTS) {
  return {
    breakpoints,
    
    up: (breakpoint: BreakpointKey) => 
      generateMediaQuery(breakpoint, breakpoints),
    
    down: (breakpoint: BreakpointKey) => 
      generateMediaQuery(breakpoint, breakpoints, { type: "max-width" }),
    
    between: (min: BreakpointKey, max: BreakpointKey) => {
      const minQuery = generateMediaQuery(min, breakpoints);
      const maxQuery = generateMediaQuery(max, breakpoints, { type: "max-width" });
      return `${minQuery} and ${maxQuery}`;
    },
    
    container: (size: string, options?: ContainerQueryOptions) =>
      generateContainerQuery(size, options),
    
    getValue: <T>(value: ResponsiveValue<T>, breakpoint: BreakpointKey) =>
      getResponsiveValue(value, breakpoint, breakpoints),
    
    mapValues: <T>(
      property: string,
      value: ResponsiveValue<T>,
      transformer: (value: T) => string
    ) => mapResponsiveValues(property, value, transformer, breakpoints),
  };
}

/**
 * Hook-like interface for responsive utilities
 */
export interface UseResponsiveResult {
  breakpoints: Breakpoints;
  up: (breakpoint: BreakpointKey) => string;
  down: (breakpoint: BreakpointKey) => string;
  between: (min: BreakpointKey, max: BreakpointKey) => string;
  container: (size: string, options?: ContainerQueryOptions) => string;
  getValue: <T>(value: ResponsiveValue<T>, breakpoint: BreakpointKey) => T | undefined;
  mapValues: <T>(
    property: string,
    value: ResponsiveValue<T>,
    transformer: (value: T) => string
  ) => Record<string, string>;
}

/**
 * Create responsive hook
 */
export function useResponsive(
  theme?: ThemeSpecification
): UseResponsiveResult {
  const breakpoints = extractBreakpoints(theme);
  return createResponsiveUtils(breakpoints);
}