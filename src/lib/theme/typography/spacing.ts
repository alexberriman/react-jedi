/**
 * Typography Spacing System
 *
 * This module provides utilities for managing line-height and letter-spacing
 * in the typography system, including default values, conversion utilities,
 * and variable generation functions.
 */

import type { ThemeTypography } from "@/types/schema/specification";

/**
 * Default line height values
 */
export const DEFAULT_LINE_HEIGHTS = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
  body: "1.5",
  heading: "1.25",
  code: "1.7",
};

/**
 * Default letter spacing values
 */
export const DEFAULT_LETTER_SPACINGS = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
  body: "0em",
  heading: "-0.015em",
  button: "0.025em",
  caps: "0.05em",
};

/**
 * Available line height presets
 */
export type LineHeightPreset = keyof typeof DEFAULT_LINE_HEIGHTS;

/**
 * Available letter spacing presets
 */
export type LetterSpacingPreset = keyof typeof DEFAULT_LETTER_SPACINGS;

/**
 * Line height configuration interface
 */
export interface LineHeightConfig {
  /**
   * Line height presets and their values
   */
  values: Record<string, string | number>;
  
  /**
   * Default line height for body text
   */
  body?: string | number;
  
  /**
   * Default line height for headings
   */
  heading?: string | number;
  
  /**
   * Default line height for code blocks
   */
  code?: string | number;
}

/**
 * Letter spacing configuration interface
 */
export interface LetterSpacingConfig {
  /**
   * Letter spacing presets and their values
   */
  values: Record<string, string>;
  
  /**
   * Default letter spacing for body text
   */
  body?: string;
  
  /**
   * Default letter spacing for headings
   */
  heading?: string;
  
  /**
   * Default letter spacing for buttons
   */
  button?: string;
  
  /**
   * Default letter spacing for all-caps text
   */
  caps?: string;
}

/**
 * Format a numeric line height value
 */
export function formatLineHeight(value: string | number): string {
  if (typeof value === "number") {
    return value.toString();
  }
  return value;
}

/**
 * Format a letter spacing value, ensuring it has a unit
 */
export function formatLetterSpacing(value: string): string {
  // If value is numeric or doesn't have a unit, add 'em'
  if (/^-?\d*\.?\d+$/.test(value)) {
    return `${value}em`;
  }
  return value;
}

/**
 * Extract line heights from theme typography
 */
export function extractLineHeights(typography?: ThemeTypography): Record<string, string> {
  // If no typography or lineHeights defined, return defaults
  if (!typography?.lineHeights || Object.keys(typography.lineHeights).length === 0) {
    return DEFAULT_LINE_HEIGHTS;
  }
  
  // Convert all values to strings
  const lineHeights: Record<string, string> = {};
  
  Object.entries(typography.lineHeights).forEach(([key, value]) => {
    lineHeights[key] = formatLineHeight(value);
  });
  
  return lineHeights;
}

/**
 * Extract letter spacings from theme typography
 */
export function extractLetterSpacings(typography?: ThemeTypography): Record<string, string> {
  // If no typography or letterSpacings defined, return defaults
  if (!typography?.letterSpacings || Object.keys(typography.letterSpacings).length === 0) {
    return DEFAULT_LETTER_SPACINGS;
  }
  
  // Ensure all values have appropriate units
  const letterSpacings: Record<string, string> = {};
  
  Object.entries(typography.letterSpacings).forEach(([key, value]) => {
    letterSpacings[key] = formatLetterSpacing(value);
  });
  
  return letterSpacings;
}

/**
 * Generate CSS variables for line heights
 */
export function generateLineHeightVariables(
  lineHeights: Record<string, string>,
  prefix = "--line-height"
): Record<string, string> {
  const variables: Record<string, string> = {};
  
  Object.entries(lineHeights).forEach(([key, value]) => {
    variables[`${prefix}-${key}`] = value;
  });
  
  return variables;
}

/**
 * Generate CSS variables for letter spacings
 */
export function generateLetterSpacingVariables(
  letterSpacings: Record<string, string>,
  prefix = "--letter-spacing"
): Record<string, string> {
  const variables: Record<string, string> = {};
  
  Object.entries(letterSpacings).forEach(([key, value]) => {
    variables[`${prefix}-${key}`] = value;
  });
  
  return variables;
}

/**
 * Convert line heights to CSS variables mapping
 */
export function lineHeightsToVariables(
  typography?: ThemeTypography
): Record<string, string> {
  const lineHeights = extractLineHeights(typography);
  return generateLineHeightVariables(lineHeights);
}

/**
 * Convert letter spacings to CSS variables mapping
 */
export function letterSpacingsToVariables(
  typography?: ThemeTypography
): Record<string, string> {
  const letterSpacings = extractLetterSpacings(typography);
  return generateLetterSpacingVariables(letterSpacings);
}

/**
 * Generate optimal line height based on font size
 * Uses a formula that decreases line height as font size increases
 */
export function calculateOptimalLineHeight(fontSize: number): number {
  // Formula: larger text needs less line height
  // Base: 16px text has 1.5 line height
  // As text gets larger, line height approaches 1.2
  // As text gets smaller, line height approaches 1.7
  const minLineHeight = 1.2;
  const maxLineHeight = 1.7;
  const baseFontSize = 16;
  const baseLineHeight = 1.5;
  
  // Calculate adjustment factor based on font size difference from base
  const factor = Math.max(0, Math.min(1, Math.abs(fontSize - baseFontSize) / 32));
  
  if (fontSize >= baseFontSize) {
    // For larger text, reduce line height
    return baseLineHeight - (baseLineHeight - minLineHeight) * factor;
  } else {
    // For smaller text, increase line height
    return baseLineHeight + (maxLineHeight - baseLineHeight) * factor;
  }
}

/**
 * Generate optimal letter spacing based on font size and weight
 */
export function calculateOptimalLetterSpacing(
  fontSize: number,
  fontWeight: number = 400
): string {
  // Base logic: 
  // - Larger text (especially headings) often needs tighter letter spacing
  // - Smaller text needs normal to slightly wider spacing
  // - Heavier weights often need slightly looser spacing
  
  let spacing = 0; // em units
  
  // Adjust for font size
  if (fontSize >= 24) {
    // Headings and large text: tighter spacing
    spacing -= 0.015 + (fontSize - 24) * 0.0005; // Progressive tightening
  } else if (fontSize < 14) {
    // Small text: slightly wider spacing
    spacing += 0.01;
  }
  
  // Adjust for font weight
  if (fontWeight >= 700) {
    // Bold and heavier weights
    spacing += 0.005; // Slightly wider to compensate for weight
  } else if (fontWeight <= 300) {
    // Light weights
    spacing -= 0.005; // Slightly tighter for light weights
  }
  
  // Clamp to reasonable bounds
  spacing = Math.max(-0.05, Math.min(0.1, spacing));
  
  // Format with "em" unit and return
  return spacing === 0 ? "0" : `${spacing.toFixed(4)}em`;
}