/**
 * Z-Index System
 *
 * This file implements a standardized z-index management system for layering UI elements
 * in a consistent, maintainable way. It provides utilities to access and customize z-index values,
 * ensuring proper stacking order throughout the application.
 */

import type { ThemeSpecification } from "../../../types/schema/specification";

// Export the useZIndex hook
export { useZIndex, type UseZIndexResult } from "./use-z-index";

/**
 * Default z-index values for common UI layers
 * 
 * The z-index scale uses semantic names rather than arbitrary numbers to make
 * the stacking order more intuitive and maintainable.
 */
export const defaultZIndices: Record<string, number> = {
  hide: -1,          // Hidden elements (below the content)
  base: 0,           // Base layer (default stacking context)
  content: 1,        // Regular content
  dropdown: 10,      // Dropdown menus, select menus, etc.
  sticky: 20,        // Sticky headers, footers, etc.
  fixed: 30,         // Fixed elements (nav bars, etc.)
  overlay: 40,       // Overlays, backdrops
  modal: 50,         // Modal dialogs, drawers
  popover: 60,       // Popovers, tooltips
  toast: 70,         // Toast notifications
  tooltip: 80,       // Tooltips (highest non-dev layer)
  dev: 999,          // Development tools (highest possible layer)
};

/**
 * Get a z-index value from the theme or fallback to the default value
 * 
 * @param theme The theme specification object
 * @param key The z-index key to retrieve
 * @returns The z-index value
 */
export function getZIndex(theme: ThemeSpecification | undefined, key: string): number {
  if (!theme || !theme.zIndices) {
    return defaultZIndices[key] || 0;
  }

  return theme.zIndices[key] !== undefined 
    ? theme.zIndices[key] 
    : defaultZIndices[key] || 0;
}

/**
 * Generate a complete z-index scale by merging custom values with defaults
 * 
 * @param customZIndices Custom z-index values to merge with defaults
 * @returns A complete z-index scale
 */
export function createZIndexScale(customZIndices: Record<string, number> = {}): Record<string, number> {
  return {
    ...defaultZIndices,
    ...customZIndices,
  };
}

/**
 * Creates a function that resolves z-index values from a theme
 * 
 * @param theme The theme specification object
 * @returns A function that resolves z-index values
 */
export function createZIndexResolver(theme: ThemeSpecification | undefined) {
  return (key: string): number => getZIndex(theme, key);
}

/**
 * Convert z-index values to CSS variables for use in styles
 * 
 * @param zIndices The z-index scale object
 * @returns An object of CSS variable declarations
 */
export function createZIndexCSSVariables(zIndices: Record<string, number>): Record<string, string> {
  const cssVars: Record<string, string> = {};
  
  Object.entries(zIndices).forEach(([key, value]) => {
    cssVars[`--z-${key}`] = value.toString();
  });
  
  return cssVars;
}

/**
 * Get the relative z-index for a component within its layer
 * 
 * @param theme The theme specification object
 * @param baseLayer The base layer name (e.g. "modal", "popover")
 * @param offset The offset from the base layer (default: 0)
 * @returns The calculated z-index value
 */
export function getRelativeZIndex(
  theme: ThemeSpecification | undefined, 
  baseLayer: string, 
  offset: number = 0
): number {
  const baseValue = getZIndex(theme, baseLayer);
  return baseValue + offset;
}

/**
 * Check if a z-index value is within a valid stacking context
 * 
 * @param value The z-index value to check
 * @returns Whether the value is valid
 */
export function isValidZIndex(value: number): boolean {
  // Valid z-index values range from -999 to 9999 to avoid potential issues
  return value >= -999 && value <= 9999;
}