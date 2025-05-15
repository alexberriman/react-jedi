/**
 * Type Scale System
 *
 * This module provides utilities for creating and managing typographic scales.
 * It includes functions for generating font sizes based on different scaling methods,
 * and utilities for converting between absolute and relative units.
 */

import type { ThemeTypography } from "@/types/schema/specification";

/**
 * Font size scale ratio presets
 */
export const SCALE_RATIOS = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augmentedFourth: 1.414,
  perfectFifth: 1.5,
  goldenRatio: 1.618,
} as const;

/**
 * Available scale ratio options
 */
export type ScaleRatio = keyof typeof SCALE_RATIOS;

/**
 * Font size units
 */
export type FontSizeUnit = "rem" | "em" | "px" | "vw" | "%";

/**
 * Font size scale configuration
 */
export interface TypeScaleConfig {
  /**
   * Base font size in pixels
   */
  baseFontSize: number;

  /**
   * Scale ratio to use
   */
  scaleRatio: number | ScaleRatio;

  /**
   * Unit to use for font sizes
   */
  unit: FontSizeUnit;

  /**
   * Precision for calculations
   */
  precision?: number;

  /**
   * Number of steps above base
   */
  stepsUp?: number;

  /**
   * Number of steps below base
   */
  stepsDown?: number;
}

/**
 * Default type scale configuration
 */
export const DEFAULT_TYPE_SCALE_CONFIG: TypeScaleConfig = {
  baseFontSize: 16,
  scaleRatio: "perfectFourth",
  unit: "rem",
  precision: 4,
  stepsUp: 7,
  stepsDown: 2,
};

/**
 * Generate a modular type scale
 */
export function generateTypeScale(
  config: Partial<TypeScaleConfig> = {}
): Record<string, string> {
  // Extract config values with fallbacks to defaults
  const mergedConfig = { ...DEFAULT_TYPE_SCALE_CONFIG, ...config };
  const baseFontSize = mergedConfig.baseFontSize;
  const unit = mergedConfig.unit;
  const precision = mergedConfig.precision;
  const stepsUp = mergedConfig.stepsUp;
  const stepsDown = mergedConfig.stepsDown;
  
  // Determine the scale ratio to use (number or named ratio)
  let ratio: number;
  if (typeof mergedConfig.scaleRatio === "string") {
    ratio = SCALE_RATIOS[mergedConfig.scaleRatio as ScaleRatio];
  } else if (typeof mergedConfig.scaleRatio === 'number') {
    ratio = mergedConfig.scaleRatio;
  } else {
    ratio = SCALE_RATIOS.perfectFourth;
  }
  
  const scale: Record<string, string> = {};
  
  // Generate steps below the base size
  // Use non-null assertion since we've set defaults in mergedConfig
  const safeStepsDown = stepsDown!;
  for (let i = safeStepsDown; i > 0; i--) {
    const size = baseFontSize / Math.pow(ratio, i);
    const value = formatFontSize(size, unit, precision);
    scale[`xs${i}`] = value;
  }
  
  // Base size
  scale.base = formatFontSize(baseFontSize, unit, precision);
  
  // Generate steps above the base size
  // Default to 7 steps up if not defined
  const safeStepsUp = stepsUp ?? 7;
  for (let i = 1; i <= safeStepsUp; i++) {
    const size = baseFontSize * Math.pow(ratio, i);
    const value = formatFontSize(size, unit, precision);
    
    if (i <= 2) {
      scale[`lg${i}`] = value;
    } else {
      scale[`${i - 2}xl`] = value;
    }
  }
  
  return scale;
}

/**
 * Format a font size value with the specified unit
 */
export function formatFontSize(
  size: number,
  unit: FontSizeUnit,
  precision: number = 4
): string {
  let value: number;
  
  switch (unit) {
    case "rem": {
      value = size / 16;
      break;
    }
    case "em": {
      value = size / 16;
      break;
    }
    case "vw": {
      value = (size / 16) * 100;
      break;
    }
    case "%": {
      value = (size / 16) * 100;
      break;
    }
    default: {
      value = size;
      break;
    }
  }
  
  // First get the fixed precision string
  const fixed = value.toFixed(precision);
  
  // Then manually trim trailing zeros without regex
  let trimmed = fixed;
  if (trimmed.includes('.')) {
    // Remove trailing zeros
    while (trimmed.endsWith('0')) {
      trimmed = trimmed.slice(0, -1);
    }
    // Remove decimal point if it's the last character
    if (trimmed.endsWith('.')) {
      trimmed = trimmed.slice(0, -1);
    }
  }
  
  return `${trimmed}${unit}`;
}

/**
 * Generate a fluid type scale with responsive values
 */
export function generateFluidTypeScale(
  config: Partial<TypeScaleConfig> & {
    minViewport?: number;
    maxViewport?: number;
    minBaseFontSize?: number;
    maxBaseFontSize?: number;
  } = {}
): Record<string, string> {
  // Extract config values with fallbacks to defaults
  const mergedConfig = { ...DEFAULT_TYPE_SCALE_CONFIG, ...config };
  const baseFontSize = mergedConfig.baseFontSize;
  const precision = mergedConfig.precision || 4;
  const stepsUp = mergedConfig.stepsUp || 7;
  const stepsDown = mergedConfig.stepsDown || 2;
  
  // Set defaults for fluid-specific options
  const minViewport = config.minViewport || 320;
  const maxViewport = config.maxViewport || 1200;
  const minBaseFontSize = config.minBaseFontSize || baseFontSize * 0.75;
  const maxBaseFontSize = config.maxBaseFontSize || baseFontSize * 1.25;
  
  // Determine the scale ratio to use (number or named ratio)
  let ratio: number;
  if (typeof mergedConfig.scaleRatio === "string") {
    ratio = SCALE_RATIOS[mergedConfig.scaleRatio as ScaleRatio];
  } else if (typeof mergedConfig.scaleRatio === 'number') {
    ratio = mergedConfig.scaleRatio;
  } else {
    ratio = SCALE_RATIOS.perfectFourth;
  }
  
  const scale: Record<string, string> = {};
  
  // Function to generate clamp value
  const generateClamp = (minSize: number, maxSize: number): string => {
    const minRem = minSize / 16;
    const maxRem = maxSize / 16;
    const slope = (maxRem - minRem) / (maxViewport - minViewport);
    const yAxisIntersection = minRem - slope * minViewport;
    
    // Simplified formula to avoid very long strings
    const vwValue = slope * 100;
    
    return `clamp(${minRem.toFixed(precision)}rem, ${yAxisIntersection.toFixed(precision)}rem + ${vwValue.toFixed(precision)}vw, ${maxRem.toFixed(precision)}rem)`;
  };
  
  // Generate steps below the base size
  for (let i = stepsDown; i > 0; i--) {
    const minSize = minBaseFontSize / Math.pow(ratio, i);
    const maxSize = maxBaseFontSize / Math.pow(ratio, i);
    scale[`xs${i}`] = generateClamp(minSize, maxSize);
  }
  
  // Base size
  scale.base = generateClamp(minBaseFontSize, maxBaseFontSize);
  
  // Generate steps above the base size
  for (let i = 1; i <= stepsUp; i++) {
    const minSize = minBaseFontSize * Math.pow(ratio, i);
    const maxSize = maxBaseFontSize * Math.pow(ratio, i);
    
    if (i <= 2) {
      scale[`lg${i}`] = generateClamp(minSize, maxSize);
    } else {
      scale[`${i - 2}xl`] = generateClamp(minSize, maxSize);
    }
  }
  
  return scale;
}

/**
 * Extract font size scale from theme typography
 */
export function extractFontSizes(typography?: ThemeTypography): Record<string, string> {
  // If no typography or fontSizes defined, generate a default scale
  if (!typography || !typography.fontSizes || Object.keys(typography.fontSizes).length === 0) {
    return generateTypeScale();
  }
  
  return { ...typography.fontSizes };
}

/**
 * Generate CSS variables for font sizes
 */
export function generateFontSizeVariables(
  sizes: Record<string, string>,
  prefix = "--font-size"
): Record<string, string> {
  const variables: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(sizes)) {
    variables[`${prefix}-${key}`] = value;
  }
  
  return variables;
}

/**
 * Convert font sizes to CSS variables mapping
 */
export function fontSizesToVariables(
  typography?: ThemeTypography
): Record<string, string> {
  const sizes = extractFontSizes(typography);
  return generateFontSizeVariables(sizes);
}