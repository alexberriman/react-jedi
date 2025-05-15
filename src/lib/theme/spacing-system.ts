/**
 * Spacing System
 *
 * This module provides a comprehensive system for managing spacing throughout the UI.
 * It includes default scales, utilities for responsive spacing, and container presets.
 */

import type { ThemeSpecification } from "@/types/schema/specification";

/**
 * Default spacing scale values in rem units
 * Based on a 4px (0.25rem) grid system
 */
export const DEFAULT_SPACING_SCALE = {
  px: "1px",
  "0": "0",
  "0.5": "0.125rem", // 2px
  "1": "0.25rem",    // 4px
  "1.5": "0.375rem", // 6px
  "2": "0.5rem",     // 8px
  "2.5": "0.625rem", // 10px
  "3": "0.75rem",    // 12px
  "3.5": "0.875rem", // 14px
  "4": "1rem",       // 16px
  "5": "1.25rem",    // 20px
  "6": "1.5rem",     // 24px
  "7": "1.75rem",    // 28px
  "8": "2rem",       // 32px
  "9": "2.25rem",    // 36px
  "10": "2.5rem",    // 40px
  "11": "2.75rem",   // 44px
  "12": "3rem",      // 48px
  "14": "3.5rem",    // 56px
  "16": "4rem",      // 64px
  "20": "5rem",      // 80px
  "24": "6rem",      // 96px
  "28": "7rem",      // 112px
  "32": "8rem",      // 128px
  "36": "9rem",      // 144px
  "40": "10rem",     // 160px
  "44": "11rem",     // 176px
  "48": "12rem",     // 192px
  "52": "13rem",     // 208px
  "56": "14rem",     // 224px
  "60": "15rem",     // 240px
  "64": "16rem",     // 256px
  "72": "18rem",     // 288px
  "80": "20rem",     // 320px
  "96": "24rem",     // 384px
};

/**
 * Relative spacing modifiers used for responsive adjustments
 */
export const RELATIVE_SPACING = {
  // Multipliers
  "2xs": 0.25,  // 1/4 of the base value
  xs: 0.5,      // 1/2 of the base value
  sm: 0.75,     // 3/4 of the base value
  md: 1,        // 1x of the base value (normal)
  lg: 1.5,      // 1.5x of the base value
  xl: 2,        // 2x of the base value
  "2xl": 3,     // 3x of the base value
  "3xl": 4,     // 4x of the base value
  "4xl": 6,     // 6x of the base value
};

/**
 * Container spacing presets for common layout patterns
 */
export const CONTAINER_SPACING_PRESETS = {
  // Common layout spacings
  none: {
    padding: "0",
    gap: "0",
  },
  tight: {
    padding: "4",
    gap: "4",
  },
  compact: {
    padding: "6",
    gap: "6", 
  },
  normal: {
    padding: "8",
    gap: "8",
  },
  relaxed: {
    padding: "12",
    gap: "10",
  },
  spacious: {
    padding: "16",
    gap: "12",
  },
  // Section spacing presets for distinct page sections
  hero: {
    paddingY: "24",
    paddingX: "8",
    gap: "12",
  },
  section: {
    paddingY: "20",
    paddingX: "8", 
    gap: "10",
  },
  card: {
    padding: "6",
    gap: "4",
  },
  // Form element spacing
  form: {
    padding: "4",
    gap: "6",
  },
  // Modal/dialog spacing
  modal: {
    padding: "6",
    gap: "6",
  },
};

/**
 * Spacing scale type
 */
export type SpacingScale = typeof DEFAULT_SPACING_SCALE;

/**
 * Spacing key type - any key in the spacing scale
 */
export type SpacingKey = keyof SpacingScale;

/**
 * Relative spacing key type
 */
export type RelativeSpacingKey = keyof typeof RELATIVE_SPACING;

/**
 * Container spacing preset key type
 */
export type ContainerPresetKey = keyof typeof CONTAINER_SPACING_PRESETS;

/**
 * Get spacing value from the scale
 * @param key - Spacing key
 * @param scale - Optional custom spacing scale
 * @returns Spacing value
 */
export function getSpacing(
  key: SpacingKey | string | number,
  scale: SpacingScale = DEFAULT_SPACING_SCALE
): string {
  // If key is a number, convert to string for lookup
  const lookupKey = key.toString();
  
  // Return the value from the scale, or use the provided key as a raw value
  return scale[lookupKey as SpacingKey] || lookupKey;
}

/**
 * Calculate relative spacing based on a base value and modifier
 * @param base - Base spacing key
 * @param modifier - Relative modifier
 * @param scale - Optional custom spacing scale
 * @returns Calculated spacing value
 */
export function getRelativeSpacing(
  base: SpacingKey | string,
  modifier: RelativeSpacingKey,
  scale: SpacingScale = DEFAULT_SPACING_SCALE
): string {
  const baseValue = getSpacing(base, scale);
  const multiplier = RELATIVE_SPACING[modifier];
  
  // If base value is in rem, multiply the numeric part
  if (baseValue.endsWith("rem")) {
    const numValue = Number.parseFloat(baseValue);
    return `${(numValue * multiplier).toFixed(4)}rem`;
  }
  
  // If base value is in px, multiply the numeric part
  if (baseValue.endsWith("px")) {
    const numValue = Number.parseFloat(baseValue);
    return `${Math.round(numValue * multiplier)}px`;
  }
  
  // For other units or values, return as is
  return baseValue;
}

/**
 * Get container spacing preset values
 * @param preset - Container preset key
 * @returns Spacing values for the preset
 */
export function getContainerPreset(preset: ContainerPresetKey): typeof CONTAINER_SPACING_PRESETS[ContainerPresetKey] {
  return CONTAINER_SPACING_PRESETS[preset];
}

/**
 * Generate a complete spacing scale from a configuration
 * @param config - Spacing configuration
 * @returns Generated spacing scale
 */
export function generateSpacingScale(config: {
  baseUnit?: number;
  scaleFactor?: number;
  customValues?: Record<string, string>;
}): SpacingScale {
  const { baseUnit = 0.25, scaleFactor = 1, customValues = {} } = config;
  
  // Start with the default scale
  const scale = { ...DEFAULT_SPACING_SCALE };
  
  // Generate numerical scale values
  for (const [key] of Object.entries(scale)) {
    // Skip non-numerical keys like "px"
    if (key === "px" || key === "0" || !/^[\d.]+$/.test(key)) {
      continue;
    }
    
    // Convert numerical keys to their rem values using the baseUnit
    const numKey = Number.parseFloat(key);
    scale[key as SpacingKey] = `${(numKey * baseUnit * scaleFactor).toFixed(4)}rem`;
  }
  
  // Add custom values
  return { ...scale, ...customValues };
}

/**
 * Extract spacing scale from theme specification
 * @param theme - Theme specification
 * @returns Extracted spacing scale
 */
export function extractSpacingScale(theme?: ThemeSpecification): SpacingScale {
  if (!theme?.spacing || Object.keys(theme.spacing).length === 0) {
    return DEFAULT_SPACING_SCALE;
  }
  
  return theme.spacing as SpacingScale;
}

/**
 * Generate CSS variables for spacing values
 * @param scale - Spacing scale
 * @param prefix - CSS variable prefix
 * @returns CSS variables object
 */
export function generateSpacingVariables(
  scale: SpacingScale = DEFAULT_SPACING_SCALE,
  prefix = "--spacing"
): Record<string, string> {
  const variables: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(scale)) {
    // Replace dots with hyphens for CSS variable names
    const cssKey = key.replace(".", "-");
    variables[`${prefix}-${cssKey}`] = value;
  }
  
  return variables;
}

/**
 * Generate spacing CSS variables for a theme
 * @param theme - Theme specification
 * @returns CSS variables object
 */
export function spacingToVariables(theme?: ThemeSpecification): Record<string, string> {
  const scale = extractSpacingScale(theme);
  return generateSpacingVariables(scale);
}