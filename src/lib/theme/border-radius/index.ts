/**
 * Border Radius System
 *
 * This file implements a standardized border radius management system for UI elements,
 * ensuring consistent rounded corners throughout the application. It provides utilities
 * to access and customize border radius values.
 */

import type { ThemeSpecification } from "../../../types/schema/specification";

// Export the useBorderRadius hook
export { useBorderRadius, type UseBorderRadiusResult } from "./use-border-radius";

// Export utilities
export {
  createCornerRadiusStyles,
  applyBorderRadius,
  conditionalBorderRadius,
  responsiveBorderRadius,
  BorderRadiusBuilder,
  type CornerRadiusOptions
} from "./utils";

/**
 * Default border radius values for common UI elements
 * 
 * The border radius scale uses semantic names that make the rounding system
 * more intuitive and maintainable.
 */
export const defaultBorderRadii: Record<string, string> = {
  none: "0px",          // No rounding
  xs: "2px",            // Extra small rounding
  sm: "4px",            // Small rounding
  md: "6px",            // Medium rounding
  lg: "8px",            // Large rounding
  xl: "12px",           // Extra large rounding
  "2xl": "16px",        // 2x large rounding
  "3xl": "24px",        // 3x large rounding
  full: "9999px",       // Fully rounded (circles/pills)
  // Special values for individual corners
  "top": "6px 6px 0 0",     // Top corners only
  "right": "0 6px 6px 0",   // Right corners only
  "bottom": "0 0 6px 6px",  // Bottom corners only
  "left": "6px 0 0 6px",    // Left corners only
};

/**
 * Get a border radius value from the theme or fallback to the default value
 * 
 * @param theme The theme specification object
 * @param key The border radius key to retrieve
 * @returns The border radius value
 */
export function getBorderRadius(theme: ThemeSpecification | undefined, key: string): string {
  if (!theme || !theme.borderRadius) {
    return defaultBorderRadii[key] || "0px";
  }

  if (key in theme.borderRadius) {
    return theme.borderRadius[key];
  }
  
  return defaultBorderRadii[key] || "0px";
}

/**
 * Generate a complete border radius scale by merging custom values with defaults
 * 
 * @param customBorderRadii Custom border radius values to merge with defaults
 * @returns A complete border radius scale
 */
export function createBorderRadiusScale(customBorderRadii: Record<string, string> = {}): Record<string, string> {
  return {
    ...defaultBorderRadii,
    ...customBorderRadii,
  };
}

/**
 * Creates a function that resolves border radius values from a theme
 * 
 * @param theme The theme specification object
 * @returns A function that resolves border radius values
 */
export function createBorderRadiusResolver(theme: ThemeSpecification | undefined) {
  return (key: string): string => getBorderRadius(theme, key);
}

/**
 * Convert border radius values to CSS variables for use in styles
 * 
 * @param borderRadii The border radius scale object
 * @returns An object of CSS variable declarations
 */
export function createBorderRadiusCSSVariables(borderRadii: Record<string, string>): Record<string, string> {
  const cssVars: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(borderRadii)) {
    cssVars[`--radius-${key}`] = value;
  }
  
  return cssVars;
}

/**
 * Creates a border radius value with multiple values for different corners
 * 
 * @param topLeft Top-left corner radius
 * @param topRight Top-right corner radius
 * @param bottomRight Bottom-right corner radius
 * @param bottomLeft Bottom-left corner radius
 * @returns A CSS border-radius value string
 */
export function createCustomBorderRadius(
  topLeft: string,
  topRight: string,
  bottomRight: string,
  bottomLeft: string
): string {
  return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
}

/**
 * Check if a border radius value is valid
 * 
 * @param value The border radius value to check
 * @returns Whether the value is valid
 */
export function isValidBorderRadius(value: string): boolean {
  // Simple validation - check if it contains valid CSS units or is 0
  const validUnits = ['px', 'rem', 'em', '%', 'vh', 'vw', 'vmin', 'vmax'];
  if (value === '0') return true;
  if (value === 'inherit' || value === 'initial' || value === 'unset') return true;
  
  // Basic check for CSS units
  return validUnits.some(unit => value.includes(unit));
}