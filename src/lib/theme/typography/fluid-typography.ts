/**
 * Fluid Typography System
 *
 * This module provides utilities for creating responsive, fluid typography
 * that automatically scales based on viewport size using CSS clamp.
 */

import type { ThemeTypography } from "@/types/schema/specification";
import { type ScaleRatio, SCALE_RATIOS, generateTypeScale } from "./type-scale";

/**
 * Breakpoint configuration
 */
export interface Breakpoint {
  /**
   * Breakpoint name (e.g., 'sm', 'md', 'lg')
   */
  name: string;
  
  /**
   * Minimum viewport width in pixels
   */
  minWidth: number;
  
  /**
   * Base font size at this breakpoint (in pixels)
   */
  baseFontSize?: number;
  
  /**
   * Scale ratio to use at this breakpoint
   */
  scaleRatio?: number | ScaleRatio;
}

/**
 * Default breakpoints for responsive design
 */
export const DEFAULT_BREAKPOINTS: Breakpoint[] = [
  {
    name: "xs", 
    minWidth: 320,
    baseFontSize: 14,
    scaleRatio: "minorThird"
  },
  {
    name: "sm", 
    minWidth: 640,
    baseFontSize: 15,
    scaleRatio: "majorThird"
  },
  {
    name: "md", 
    minWidth: 768,
    baseFontSize: 16,
    scaleRatio: "perfectFourth"
  },
  {
    name: "lg", 
    minWidth: 1024,
    baseFontSize: 17,
    scaleRatio: "perfectFourth"
  },
  {
    name: "xl", 
    minWidth: 1280,
    baseFontSize: 18,
    scaleRatio: "augmentedFourth"
  },
  {
    name: "2xl", 
    minWidth: 1536,
    baseFontSize: 20,
    scaleRatio: "perfectFifth"
  }
];

/**
 * Fluid typography configuration
 */
export interface FluidTypographyConfig {
  /**
   * Breakpoints for responsive design
   */
  breakpoints?: Breakpoint[];
  
  /**
   * Default base font size (in pixels)
   */
  defaultBaseFontSize?: number;
  
  /**
   * Default scale ratio
   */
  defaultScaleRatio?: number | ScaleRatio;
  
  /**
   * Steps above base font size
   */
  stepsUp?: number;
  
  /**
   * Steps below base font size
   */
  stepsDown?: number;
  
  /**
   * Minimum font size as a percentage of the calculated size (0.0-1.0)
   * Used to prevent text from becoming too small on small screens
   */
  minSizeMultiplier?: number;
  
  /**
   * Maximum font size as a percentage of the calculated size (1.0+)
   * Used to prevent text from becoming too large on large screens
   */
  maxSizeMultiplier?: number;
  
  /**
   * Whether to use rem units instead of pixels
   */
  useRem?: boolean;
  
  /**
   * Precision for font size calculations (decimal places)
   */
  precision?: number;
}

/**
 * Default configuration for fluid typography
 */
export const DEFAULT_FLUID_TYPOGRAPHY_CONFIG: FluidTypographyConfig = {
  breakpoints: DEFAULT_BREAKPOINTS,
  defaultBaseFontSize: 16,
  defaultScaleRatio: "perfectFourth",
  stepsUp: 7,
  stepsDown: 2,
  minSizeMultiplier: 0.75,
  maxSizeMultiplier: 1.25,
  useRem: true,
  precision: 4
};

/**
 * Generate a fluid font size using CSS clamp
 * 
 * @param minSize Minimum font size in pixels
 * @param maxSize Maximum font size in pixels
 * @param minWidth Minimum viewport width in pixels
 * @param maxWidth Maximum viewport width in pixels
 * @param precision Decimal precision for calculated values
 * @param useRem Whether to use rem units instead of pixels
 * @returns CSS clamp function string
 */
export function generateFluidFontSize(
  minSize: number,
  maxSize: number,
  minWidth: number,
  maxWidth: number,
  precision = 4,
  useRem = true
): string {
  // Calculate the slope (how quickly the font size grows)
  const sizeDifference = maxSize - minSize;
  const widthDifference = maxWidth - minWidth;
  const slope = sizeDifference / widthDifference;
  
  // Calculate the y-axis intersection for the linear equation
  const yAxisIntersection = minSize - slope * minWidth;
  
  // Convert to preferred units (rem or px)
  const minSizeUnit = useRem ? `${(minSize / 16).toFixed(precision)}rem` : `${minSize.toFixed(precision)}px`;
  const maxSizeUnit = useRem ? `${(maxSize / 16).toFixed(precision)}rem` : `${maxSize.toFixed(precision)}px`;
  
  // Calculate the vw value based on the slope
  const vwValue = slope * 100;
  const vwUnit = `${vwValue.toFixed(precision)}vw`;
  
  // Calculate the point where the line crosses 0 viewport width
  const baseValue = useRem ? yAxisIntersection / 16 : yAxisIntersection;
  const baseUnit = useRem ? `${baseValue.toFixed(precision)}rem` : `${baseValue.toFixed(precision)}px`;
  
  // Create the final clamp function (min, preferred, max)
  return `clamp(${minSizeUnit}, ${baseUnit} + ${vwUnit}, ${maxSizeUnit})`;
}

/**
 * Generate a fluid type scale with breakpoint-based responsive values
 */
export function generateBreakpointFluidTypeScale(
  config: Partial<FluidTypographyConfig> = {}
): Record<string, string> {
  // Merge with default configuration
  const mergedConfig: FluidTypographyConfig = {
    ...DEFAULT_FLUID_TYPOGRAPHY_CONFIG,
    ...config
  };
  
  const {
    breakpoints = DEFAULT_BREAKPOINTS,
    defaultBaseFontSize = 16,
    defaultScaleRatio = "perfectFourth",
    stepsUp = 7,
    stepsDown = 2,
    minSizeMultiplier = 0.75,
    maxSizeMultiplier = 1.25,
    useRem = true,
    precision = 4
  } = mergedConfig;
  
  // Sort breakpoints by minWidth to ensure proper scaling
  const sortedBreakpoints = [...breakpoints].sort((a, b) => a.minWidth - b.minWidth);
  
  if (sortedBreakpoints.length < 2) {
    throw new Error("At least two breakpoints are required for fluid typography");
  }
  
  // Get the smallest and largest breakpoints
  const smallestBreakpoint = sortedBreakpoints[0];
  const largestBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1];
  
  // Determine the minimum and maximum viewport widths
  const minViewportWidth = smallestBreakpoint.minWidth;
  const maxViewportWidth = largestBreakpoint.minWidth;
  
  // Prepare the scale object
  const scale: Record<string, string> = {};
  
  // Determine the base font sizes and scale ratios for min and max breakpoints
  const minBaseFontSize = smallestBreakpoint.baseFontSize ?? defaultBaseFontSize;
  const maxBaseFontSize = largestBreakpoint.baseFontSize ?? defaultBaseFontSize;
  
  const minScaleRatio = typeof smallestBreakpoint.scaleRatio === "string"
    ? SCALE_RATIOS[smallestBreakpoint.scaleRatio as ScaleRatio]
    : smallestBreakpoint.scaleRatio ?? 
      (typeof defaultScaleRatio === "string" 
        ? SCALE_RATIOS[defaultScaleRatio as ScaleRatio] 
        : defaultScaleRatio);
  
  const maxScaleRatio = typeof largestBreakpoint.scaleRatio === "string"
    ? SCALE_RATIOS[largestBreakpoint.scaleRatio as ScaleRatio]
    : largestBreakpoint.scaleRatio ?? 
      (typeof defaultScaleRatio === "string" 
        ? SCALE_RATIOS[defaultScaleRatio as ScaleRatio] 
        : defaultScaleRatio);
  
  // Generate steps below the base size
  for (let i = stepsDown; i > 0; i--) {
    // Calculate min and max sizes based on the scale ratio
    const rawMinSize = minBaseFontSize / Math.pow(minScaleRatio as number, i);
    const rawMaxSize = maxBaseFontSize / Math.pow(maxScaleRatio as number, i);
    
    // Apply size constraints
    const minSize = Math.max(rawMinSize * minSizeMultiplier, rawMinSize);
    const maxSize = Math.min(rawMaxSize * maxSizeMultiplier, rawMaxSize);
    
    // Generate the clamp function
    scale[`xs${i}`] = generateFluidFontSize(
      minSize,
      maxSize,
      minViewportWidth,
      maxViewportWidth,
      precision,
      useRem
    );
  }
  
  // Base size
  scale.base = generateFluidFontSize(
    minBaseFontSize,
    maxBaseFontSize,
    minViewportWidth,
    maxViewportWidth,
    precision,
    useRem
  );
  
  // Generate steps above the base size
  for (let i = 1; i <= stepsUp; i++) {
    // Calculate min and max sizes based on the scale ratio
    const rawMinSize = minBaseFontSize * Math.pow(minScaleRatio as number, i);
    const rawMaxSize = maxBaseFontSize * Math.pow(maxScaleRatio as number, i);
    
    // Apply size constraints
    const minSize = Math.max(rawMinSize * minSizeMultiplier, rawMinSize);
    const maxSize = Math.min(rawMaxSize * maxSizeMultiplier, rawMaxSize);
    
    // Generate the clamp function
    const key = i <= 2 ? `lg${i}` : `${i - 2}xl`;
    scale[key] = generateFluidFontSize(
      minSize,
      maxSize,
      minViewportWidth,
      maxViewportWidth,
      precision,
      useRem
    );
  }
  
  return scale;
}

/**
 * Generate optimized viewport-based fluid typography
 */
export function generateOptimizedFluidTypeScale(
  config: Partial<FluidTypographyConfig> = {}
): Record<string, string> {
  // This is similar to the existing generateFluidTypeScale but with additional
  // optimizations for better readability and performance
  
  // Merge with default configuration
  const mergedConfig = { ...DEFAULT_FLUID_TYPOGRAPHY_CONFIG, ...config };
  const {
    defaultBaseFontSize,
    defaultScaleRatio,
    stepsUp,
    stepsDown,
    minSizeMultiplier,
    maxSizeMultiplier,
    precision,
    useRem
  } = mergedConfig;
  
  // Use the smallest and largest breakpoints to define min/max viewport
  const breakpoints = mergedConfig.breakpoints || DEFAULT_BREAKPOINTS;
  const minViewport = breakpoints[0].minWidth;
  const maxViewport = breakpoints[breakpoints.length - 1].minWidth;
  
  // Base font sizes
  const minBaseFontSize = defaultBaseFontSize! * minSizeMultiplier!;
  const maxBaseFontSize = defaultBaseFontSize! * maxSizeMultiplier!;
  
  // Determine the scale ratio
  let ratio: number;
  if (typeof defaultScaleRatio === "string") {
    ratio = SCALE_RATIOS[defaultScaleRatio as ScaleRatio];
  } else if (typeof defaultScaleRatio === 'number') {
    ratio = defaultScaleRatio;
  } else {
    ratio = SCALE_RATIOS.perfectFourth;
  }
  
  const scale: Record<string, string> = {};
  
  // Generate steps below the base size
  for (let i = stepsDown!; i > 0; i--) {
    const minSize = minBaseFontSize / Math.pow(ratio, i);
    const maxSize = maxBaseFontSize / Math.pow(ratio, i);
    
    scale[`xs${i}`] = generateFluidFontSize(
      minSize, 
      maxSize, 
      minViewport, 
      maxViewport, 
      precision,
      useRem
    );
  }
  
  // Base size
  scale.base = generateFluidFontSize(
    minBaseFontSize, 
    maxBaseFontSize, 
    minViewport, 
    maxViewport, 
    precision,
    useRem
  );
  
  // Generate steps above the base size
  for (let i = 1; i <= stepsUp!; i++) {
    const minSize = minBaseFontSize * Math.pow(ratio, i);
    const maxSize = maxBaseFontSize * Math.pow(ratio, i);
    
    if (i <= 2) {
      scale[`lg${i}`] = generateFluidFontSize(
        minSize, 
        maxSize, 
        minViewport, 
        maxViewport, 
        precision,
        useRem
      );
    } else {
      scale[`${i - 2}xl`] = generateFluidFontSize(
        minSize, 
        maxSize, 
        minViewport, 
        maxViewport, 
        precision,
        useRem
      );
    }
  }
  
  return scale;
}

/**
 * Check if a given typography configuration uses fluid font sizes
 */
export function isFluidTypography(typography?: ThemeTypography): boolean {
  if (!typography || !typography.fontSizes) {
    return false;
  }
  
  // Check if any font size uses clamp()
  const anyClampValue = Object.values(typography.fontSizes).some(
    (value) => typeof value === 'string' && value.includes('clamp(')
  );
  
  return anyClampValue;
}

/**
 * Enhance an existing typography configuration with fluid font sizes
 */
export function enhanceWithFluidTypography(
  typography: ThemeTypography,
  config: Partial<FluidTypographyConfig> = {}
): ThemeTypography {
  // Generate fluid font sizes
  const fluidFontSizes = generateBreakpointFluidTypeScale(config);
  
  // Create a copy of the typography object with fluid font sizes
  return {
    ...typography,
    fontSizes: {
      ...typography.fontSizes,
      ...fluidFontSizes
    }
  };
}