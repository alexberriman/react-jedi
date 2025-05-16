/**
 * Responsive Spacing Utilities
 *
 * This module provides utilities for responsive spacing management in the UI.
 * It enables spacing adjustments based on breakpoints and container queries.
 */

import type { ThemeSpecification } from "../types/schema/specification";
import type { SpacingKey, SpacingScale } from "./spacing-system";
import { getSpacing, extractSpacingScale } from "./spacing-system";

/**
 * Default breakpoints for responsive design
 */
export const DEFAULT_BREAKPOINTS = {
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
export type BreakpointKey = keyof typeof DEFAULT_BREAKPOINTS | "base";

/**
 * Responsive spacing definition with values for different breakpoints
 */
export interface ResponsiveSpacing {
  base: SpacingKey | string;
  sm?: SpacingKey | string;
  md?: SpacingKey | string;
  lg?: SpacingKey | string;
  xl?: SpacingKey | string;
  "2xl"?: SpacingKey | string;
}

/**
 * Responsive spacing object with breakpoint-specific values
 */
export type ResponsiveSpacingObject = {
  [key in BreakpointKey]?: SpacingKey | string;
} & {
  base: SpacingKey | string;
};

/**
 * Spacing constraints for different contexts
 */
export interface SpacingConstraints {
  min?: SpacingKey | string;
  max?: SpacingKey | string;
  clamp?: boolean;
}

/**
 * Extract breakpoints from theme specification
 * @param theme - Theme specification
 * @returns Extracted breakpoints
 */
export function extractBreakpoints(theme?: ThemeSpecification): Record<string, string> {
  if (!theme?.breakpoints || Object.keys(theme.breakpoints).length === 0) {
    return DEFAULT_BREAKPOINTS;
  }

  return theme.breakpoints;
}

/**
 * Resolve a responsive spacing value for a specific breakpoint
 * @param spacing - Responsive spacing object or value
 * @param breakpoint - Target breakpoint
 * @param scale - Spacing scale
 * @returns Spacing value for the breakpoint
 */
export function resolveResponsiveSpacing(
  spacing: ResponsiveSpacingObject | SpacingKey | string,
  breakpoint: BreakpointKey = "base",
  scale: SpacingScale
): string {
  // If spacing is a string or SpacingKey, resolve it directly
  if (typeof spacing === "string" || typeof spacing === "number") {
    return getSpacing(spacing, scale);
  }

  // If the breakpoint exists in the responsive object, use it
  if (spacing[breakpoint]) {
    return getSpacing(spacing[breakpoint] as SpacingKey, scale);
  }

  // Otherwise, find the closest smaller breakpoint
  const breakpointOrder: BreakpointKey[] = ["base", "xs", "sm", "md", "lg", "xl", "2xl"];
  const currentIndex = breakpointOrder.indexOf(breakpoint);

  // Iterate backwards through smaller breakpoints
  for (let i = currentIndex - 1; i >= 0; i--) {
    const smallerBreakpoint = breakpointOrder[i];
    if (spacing[smallerBreakpoint]) {
      return getSpacing(spacing[smallerBreakpoint] as SpacingKey, scale);
    }
  }

  // If no matching breakpoint is found, use base value
  return getSpacing(spacing.base, scale);
}

/**
 * Generate media query for a breakpoint
 * @param breakpoint - Breakpoint key
 * @param breakpoints - Breakpoint definitions
 * @returns Media query string
 */
export function generateMediaQuery(
  breakpoint: BreakpointKey,
  breakpoints: Record<string, string> = DEFAULT_BREAKPOINTS
): string {
  if (breakpoint === "base") {
    return "";
  }

  const minWidth = breakpoints[breakpoint];
  return `@media (min-width: ${minWidth})`;
}

/**
 * Generate responsive CSS properties
 * @param property - CSS property name
 * @param value - Responsive spacing value
 * @param theme - Theme specification
 * @returns CSS properties object with media queries
 */
export function generateResponsiveSpacingCSS(
  property: string,
  value: ResponsiveSpacingObject | SpacingKey | string,
  theme?: ThemeSpecification
): Record<string, string> {
  const scale = extractSpacingScale(theme);
  const breakpoints = extractBreakpoints(theme);
  const css: Record<string, string> = {};

  // Handle simple values
  if (typeof value === "string" || typeof value === "number") {
    css[property] = getSpacing(value, scale);
    return css;
  }

  // Set base value
  css[property] = getSpacing(value.base, scale);

  // Add media queries for breakpoints
  for (const [bp, bpValue] of Object.entries(value)) {
    if (bp === "base" || !bpValue) continue;

    const mediaQuery = generateMediaQuery(bp as BreakpointKey, breakpoints);
    if (mediaQuery) {
      css[`${mediaQuery} { ${property}`] = getSpacing(bpValue, scale);
    }
  }

  return css;
}

/**
 * Apply spacing constraints (min, max, clamp)
 * @param value - Spacing value
 * @param constraints - Spacing constraints
 * @param scale - Spacing scale
 * @returns Constrained spacing value
 */
export function applySpacingConstraints(
  value: string,
  constraints: SpacingConstraints,
  scale: SpacingScale
): string {
  // Extract numeric value and unit using non-backtracking pattern
  const regex = /^(\d+(?:\.\d+)?)([a-zA-Z]+)$/;
  const match = regex.exec(value);
  if (!match) return value;

  const [, numStr, unit] = match;
  const numValue = Number.parseFloat(numStr);

  // Process min constraint
  let finalValue = numValue;
  if (constraints.min) {
    const minValue = getSpacing(constraints.min, scale);
    const minRegex = /^(\d+(?:\.\d+)?)([a-zA-Z]+)$/;
    const minMatch = minRegex.exec(minValue);
    if (minMatch && minMatch[2] === unit) {
      finalValue = Math.max(finalValue, Number.parseFloat(minMatch[1]));
    }
  }

  // Process max constraint
  if (constraints.max) {
    const maxValue = getSpacing(constraints.max, scale);
    const maxRegex = /^(\d+(?:\.\d+)?)([a-zA-Z]+)$/;
    const maxMatch = maxRegex.exec(maxValue);
    if (maxMatch && maxMatch[2] === unit) {
      finalValue = Math.min(finalValue, Number.parseFloat(maxMatch[1]));
    }
  }

  // Use clamp() if requested and supported
  if (constraints.clamp && constraints.min && constraints.max) {
    const minValue = getSpacing(constraints.min, scale);
    const maxValue = getSpacing(constraints.max, scale);
    return `clamp(${minValue}, ${value}, ${maxValue})`;
  }

  return `${finalValue}${unit}`;
}

/**
 * Create fluid spacing value that scales with viewport width
 * @param minSpace - Minimum spacing at small viewport
 * @param maxSpace - Maximum spacing at large viewport
 * @param minViewport - Minimum viewport width
 * @param maxViewport - Maximum viewport width
 * @param scale - Spacing scale
 * @returns CSS calc expression for fluid spacing
 */
export function fluidSpacing(
  minSpace: SpacingKey | string,
  maxSpace: SpacingKey | string,
  minViewport: string = "375px",
  maxViewport: string = "1920px",
  scale: SpacingScale
): string {
  const minValue = getSpacing(minSpace, scale);
  const maxValue = getSpacing(maxSpace, scale);

  // Convert to rem if possible for consistency
  const minRem = convertToRem(minValue);
  const maxRem = convertToRem(maxValue);
  const minVwRem = convertToRem(minViewport);
  const maxVwRem = convertToRem(maxViewport);

  // Ensure we have valid numbers
  if (!minRem || !maxRem || !minVwRem || !maxVwRem) {
    return maxValue; // Fallback to larger value if conversion fails
  }

  // Calculate the slope of the linear equation (y = mx + b)
  const slope = (maxRem.value - minRem.value) / (maxVwRem.value - minVwRem.value);

  // Calculate the y-intercept
  const intercept = minRem.value - slope * minVwRem.value;

  // Format with precision for better readability
  const formatSlope = slope.toFixed(6);
  const formatIntercept = intercept.toFixed(6);

  // Create the fluid spacing calc expression
  return `clamp(${minValue}, calc(${formatIntercept}rem + ${Number.parseFloat(formatSlope) * 100}vw), ${maxValue})`;
}

/**
 * Helper to convert a dimension to rem value
 * @param value - Dimension value
 * @returns Converted value and unit
 */
function convertToRem(value: string): { value: number; unit: string } | null {
  // Extract numeric value and unit using non-backtracking pattern
  const regex = /^(\d+(?:\.\d+)?)([a-zA-Z]+)$/;
  const match = regex.exec(value);
  if (!match) return null;

  const [, numStr, unit] = match;
  const numValue = Number.parseFloat(numStr);

  // Convert based on unit
  switch (unit) {
    case "rem": {
      return { value: numValue, unit: "rem" };
    }
    case "px": {
      return { value: numValue / 16, unit: "rem" };
    }
    default: {
      return null;
    }
  }
}
