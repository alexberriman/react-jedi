/**
 * Color System
 *
 * This file implements a comprehensive color system for the React Jedi library,
 * including color management, semantic color mapping, and color shade generation.
 * It enables consistent, beautiful, and accessible color palettes for themes.
 */

import type { ColorScale, ThemeColors } from "../../types/schema/specification";

/**
 * Color Formats
 */
export type RgbColor = { r: number; g: number; b: number };
export type HslColor = { h: number; s: number; l: number };

/**
 * Semantic Color Intent
 * Represents the purpose of a color in the UI
 */
export type ColorIntent = 
  | "primary"    // Main brand color
  | "secondary"  // Supporting brand color
  | "accent"     // Highlight/accent color
  | "neutral"    // Gray/neutral color
  | "success"    // Positive feedback
  | "warning"    // Cautionary feedback
  | "error"      // Error/negative feedback
  | "info";      // Informational feedback

/**
 * Color Shade Level
 * Represents the intensity level in a color scale (50-900)
 */
export type ColorShadeLevel = 
  | "50" | "100" | "200" | "300" | "400" 
  | "500" | "600" | "700" | "800" | "900";

/**
 * Color Scale Generator Options
 */
export interface ColorScaleOptions {
  /**
   * Base color in hex format (#RRGGBB)
   */
  baseColor: string;
  
  /**
   * Shade level of the base color (default: "500")
   */
  baseShade?: ColorShadeLevel;
  
  /**
   * Color temperature adjustment (-100 to 100)
   * Negative values make the palette cooler, positive values make it warmer
   */
  temperature?: number;
  
  /**
   * Saturation adjustment for the scale (-100 to 100)
   * Negative values reduce saturation, positive values increase saturation
   */
  saturation?: number;
  
  /**
   * Contrast adjustment for the scale (0.5 to 2.0)
   * Lower values reduce contrast between shades, higher values increase contrast
   */
  contrast?: number;
}

/**
 * Color Palette Configuration
 */
export interface ColorPaletteConfig {
  /**
   * Primary color (main brand color)
   */
  primary: string | ColorScaleOptions;
  
  /**
   * Secondary color (supporting brand color)
   */
  secondary?: string | ColorScaleOptions;
  
  /**
   * Accent color (highlight/emphasis color)
   */
  accent?: string | ColorScaleOptions;
  
  /**
   * Neutral color (grayscale)
   */
  neutral?: string | ColorScaleOptions;
  
  /**
   * Semantic feedback colors
   */
  semantic?: {
    /**
     * Success color (positive feedback)
     */
    success?: string | ColorScaleOptions;
    
    /**
     * Warning color (cautionary feedback)
     */
    warning?: string | ColorScaleOptions;
    
    /**
     * Error color (negative feedback)
     */
    error?: string | ColorScaleOptions;
    
    /**
     * Info color (informational feedback)
     */
    info?: string | ColorScaleOptions;
  };
  
  /**
   * Custom colors beyond the standard palette
   */
  custom?: Record<string, string | ColorScaleOptions>;
}

/**
 * Generates a complete theme color object from color palette configuration
 * 
 * @param config - Color palette configuration
 * @returns Theme colors object
 */
export function generateColorPalette(config: ColorPaletteConfig): ThemeColors {
  const colors: ThemeColors = {};

  // Process primary, secondary, accent, and neutral colors
  colors.primary = generateColorScale(resolveColorInput(config.primary));
  
  if (config.secondary) {
    colors.secondary = generateColorScale(resolveColorInput(config.secondary));
  }
  
  if (config.accent) {
    colors.accent = generateColorScale(resolveColorInput(config.accent));
  }
  
  if (config.neutral) {
    colors.neutral = generateColorScale(resolveColorInput(config.neutral));
  } else {
    // If no neutral is provided, generate a balanced grayscale
    colors.neutral = generateNeutralScale({
      baseColor: "#6B7280", // Default gray-500
      saturation: -50, // Reduce saturation for a more neutral gray
    });
  }
  
  // Process semantic colors
  if (config.semantic) {
    if (config.semantic.success) {
      colors.success = generateColorScale(resolveColorInput(config.semantic.success));
    } else {
      colors.success = generateColorScale({ baseColor: "#10B981" }); // Default green
    }
    
    if (config.semantic.warning) {
      colors.warning = generateColorScale(resolveColorInput(config.semantic.warning));
    } else {
      colors.warning = generateColorScale({ baseColor: "#F59E0B" }); // Default amber
    }
    
    if (config.semantic.error) {
      colors.error = generateColorScale(resolveColorInput(config.semantic.error));
    } else {
      colors.error = generateColorScale({ baseColor: "#EF4444" }); // Default red
    }
    
    if (config.semantic.info) {
      colors.info = generateColorScale(resolveColorInput(config.semantic.info));
    } else {
      colors.info = generateColorScale({ baseColor: "#3B82F6" }); // Default blue
    }
  } else {
    // Default semantic colors if not provided
    colors.success = generateColorScale({ baseColor: "#10B981" }); // Green
    colors.warning = generateColorScale({ baseColor: "#F59E0B" }); // Amber
    colors.error = generateColorScale({ baseColor: "#EF4444" }); // Red
    colors.info = generateColorScale({ baseColor: "#3B82F6" }); // Blue
  }
  
  // Process custom colors
  if (config.custom) {
    for (const [key, value] of Object.entries(config.custom)) {
      colors[key] = generateColorScale(resolveColorInput(value));
    }
  }
  
  // Generate text/background/border color mappings
  colors.background = generateBackgroundColors(colors);
  colors.text = generateTextColors(colors);
  colors.border = generateBorderColors(colors);
  
  return colors;
}

/**
 * Generate a complete color scale from a base color
 * 
 * @param options - Color scale generation options
 * @returns Complete color scale with 10 shades (50-900)
 */
export function generateColorScale(options: ColorScaleOptions): ColorScale {
  const { 
    baseColor, 
    baseShade = "500", 
    temperature = 0,
    saturation = 0,
    contrast = 1
  } = options;
  
  // Convert base color to HSL for easier manipulation
  const baseHsl = hexToHsl(baseColor);

  // Calculate step sizes for lightness based on contrast setting
  const lightnessSteps = calculateLightnessSteps(baseHsl.l, baseShade, contrast);
  
  // Initialize the scale
  const scale: ColorScale = {};
  
  // Generate each shade
  const shades: ColorShadeLevel[] = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
  
  for (const [index, shade] of shades.entries()) {
    // Apply temperature shift (adjust hue slightly)
    const tempAdjust = temperature / 500; // Scale to small hue shifts
    const tempShiftedHue = adjustHue(baseHsl.h, tempAdjust * (index - shades.indexOf(baseShade)));
    
    // Apply saturation adjustment (lighter shades get less saturation, darker get more)
    const satIndex = index - shades.indexOf(baseShade);
    const satAdjust = 1 + (saturation / 100) - (satIndex * 0.05);
    const adjustedSat = Math.max(0, Math.min(100, baseHsl.s * satAdjust));
    
    // Set lightness based on shade and pre-calculated steps
    const lightness = lightnessSteps[index];
    
    // Create the color and convert back to hex
    const color = hslToHex({
      h: tempShiftedHue,
      s: adjustedSat,
      l: lightness
    });
    
    scale[shade] = color;
  }
  
  return scale;
}

/**
 * Generate a neutral gray scale
 * 
 * @param options - Color scale options
 * @returns A neutral gray scale with subtle color tint
 */
export function generateNeutralScale(options: ColorScaleOptions): ColorScale {
  // Use original function but with adjusted contrast for more uniform steps
  return generateColorScale({
    ...options,
    contrast: 0.8, // Lower contrast for more uniform grayscale
    saturation: options.saturation ?? -70, // Significantly reduce saturation by default
  });
}

/**
 * Generate background colors based on the color palette
 * 
 * @param colors - Theme colors object with primary, neutral, etc.
 * @returns Background color mapping
 */
function generateBackgroundColors(colors: ThemeColors): Record<string, string> {
  const backgrounds: Record<string, string> = {
    // Default backgrounds
    default: colors.neutral?.["50"] ?? "#FFFFFF",
    paper: colors.neutral?.["100"] ?? "#F9FAFB",
    subtle: colors.neutral?.["200"] ?? "#F3F4F6",
    
    // Primary backgrounds with decreased opacity for overlays
    primaryLight: colors.primary?.["50"] ?? "#F0F9FF",
    primary: colors.primary?.["100"] ?? "#E0F2FE",
    primaryBold: colors.primary?.["200"] ?? "#BAE6FD",
    
    // Semantic backgrounds (lighter shades for better readability)
    success: colors.success?.["50"] ?? "#ECFDF5",
    warning: colors.warning?.["50"] ?? "#FFFBEB",
    error: colors.error?.["50"] ?? "#FEF2F2",
    info: colors.info?.["50"] ?? "#EFF6FF",
    
    // Inverse background for dark sections
    inverse: colors.neutral?.["900"] ?? "#111827",
  };
  
  return backgrounds;
}

/**
 * Generate text colors based on the color palette
 * 
 * @param colors - Theme colors object
 * @returns Text color mapping
 */
function generateTextColors(colors: ThemeColors): Record<string, string> {
  const textColors: Record<string, string> = {
    // Primary text colors
    primary: colors.neutral?.["900"] ?? "#111827",
    secondary: colors.neutral?.["700"] ?? "#374151",
    tertiary: colors.neutral?.["500"] ?? "#6B7280",
    disabled: colors.neutral?.["400"] ?? "#9CA3AF",
    
    // Branded text
    brand: colors.primary?.["600"] ?? "#0284C7",
    
    // Semantic text colors (prefer darker shades for readability)
    success: colors.success?.["700"] ?? "#047857",
    warning: colors.warning?.["700"] ?? "#B45309",
    error: colors.error?.["700"] ?? "#B91C1C",
    info: colors.info?.["700"] ?? "#1D4ED8",
    
    // Inverse text for dark backgrounds
    inverse: colors.neutral?.["50"] ?? "#F9FAFB",
  };
  
  return textColors;
}

/**
 * Generate border colors based on the color palette
 * 
 * @param colors - Theme colors object
 * @returns Border color mapping
 */
function generateBorderColors(colors: ThemeColors): Record<string, string> {
  const borderColors: Record<string, string> = {
    // Default borders
    default: colors.neutral?.["200"] ?? "#E5E7EB",
    strong: colors.neutral?.["300"] ?? "#D1D5DB",
    subtle: colors.neutral?.["100"] ?? "#F3F4F6",
    
    // Primary borders
    primary: colors.primary?.["300"] ?? "#7DD3FC",
    
    // Semantic borders
    success: colors.success?.["300"] ?? "#6EE7B7",
    warning: colors.warning?.["300"] ?? "#FCD34D",
    error: colors.error?.["300"] ?? "#FCA5A5",
    info: colors.info?.["300"] ?? "#93C5FD",
    
    // Focus state border
    focus: colors.primary?.["500"] ?? "#0EA5E9",
  };
  
  return borderColors;
}

/**
 * Resolves a color input to ColorScaleOptions
 * 
 * @param input - Color input (either hex string or options)
 * @returns ColorScaleOptions
 */
function resolveColorInput(input: string | ColorScaleOptions): ColorScaleOptions {
  if (typeof input === "string") {
    return { baseColor: input };
  }
  return input;
}

/**
 * Calculate lightness steps for generating a color scale
 * 
 * @param baseLightness - Lightness of the base color (0-100)
 * @param baseShade - Shade level of the base color
 * @param contrast - Contrast factor (0.5-2.0)
 * @returns Array of 10 lightness values for each shade
 */
function calculateLightnessSteps(
  baseLightness: number, 
  baseShade: ColorShadeLevel,
  contrast: number
): number[] {
  const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
  const baseIndex = shades.indexOf(baseShade);
  
  // Default lightness values for a balanced scale with 500 as the base
  const defaultLightness = [
    97, // 50
    94, // 100
    88, // 200
    80, // 300
    70, // 400
    60, // 500
    50, // 600
    40, // 700
    30, // 800
    20  // 900
  ];
  
  if (baseIndex === 4) { // 500 is the default base
    // Adjust the default scale based on contrast
    return defaultLightness.map(l => {
      // Apply contrast adjustment
      const delta = (l - 60) * contrast;
      return Math.max(2, Math.min(98, 60 + delta));
    });
  }
  
  // For non-default base shades, we need to shift the scale
  const lightnessValues: number[] = [];
  
  for (let i = 0; i < shades.length; i++) {
    if (i === baseIndex) {
      // Base shade gets the original lightness
      lightnessValues[i] = baseLightness;
    } else if (i < baseIndex) {
      // Lighter shades
      const stepsLighter = baseIndex - i;
      const lighterDelta = stepsLighter * (10 * contrast);
      lightnessValues[i] = Math.min(98, baseLightness + lighterDelta);
    } else {
      // Darker shades
      const stepsDarker = i - baseIndex;
      const darkerDelta = stepsDarker * (10 * contrast);
      lightnessValues[i] = Math.max(2, baseLightness - darkerDelta);
    }
  }
  
  return lightnessValues;
}

/**
 * Adjusts a hue value while keeping it in the 0-360 range
 * 
 * @param hue - Original hue value
 * @param adjustment - Adjustment to apply
 * @returns Adjusted hue value
 */
function adjustHue(hue: number, adjustment: number): number {
  const newHue = (hue + adjustment) % 360;
  return newHue < 0 ? newHue + 360 : newHue;
}

/**
 * Converts a hex color string to an HSL color object
 * 
 * @param hex - Hex color string (#RRGGBB)
 * @returns HSL color object
 */
export function hexToHsl(hex: string): HslColor {
  // Convert hex to RGB first
  const rgb = hexToRgb(hex);
  
  // Then convert RGB to HSL
  return rgbToHsl(rgb);
}

/**
 * Converts an HSL color object to a hex color string
 * 
 * @param hsl - HSL color object
 * @returns Hex color string (#RRGGBB)
 */
export function hslToHex(hsl: HslColor): string {
  // Convert HSL to RGB first
  const rgb = hslToRgb(hsl);
  
  // Then convert RGB to hex
  return rgbToHex(rgb);
}

/**
 * Converts a hex color string to an RGB color object
 * 
 * @param hex - Hex color string (#RRGGBB)
 * @returns RGB color object
 */
export function hexToRgb(hex: string): RgbColor {
  // Remove # if present
  hex = hex.replace(/^#/, "");
  
  // Parse hex values
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Converts an RGB color object to a hex color string
 * 
 * @param rgb - RGB color object
 * @returns Hex color string (#RRGGBB)
 */
export function rgbToHex(rgb: RgbColor): string {
  // Convert to hex and pad with zeros if needed
  const r = rgb.r.toString(16).padStart(2, "0");
  const g = rgb.g.toString(16).padStart(2, "0");
  const b = rgb.b.toString(16).padStart(2, "0");
  
  return `#${r}${g}${b}`;
}

/**
 * Converts an RGB color object to an HSL color object
 * 
 * @param rgb - RGB color object
 * @returns HSL color object
 */
export function rgbToHsl(rgb: RgbColor): HslColor {
  // Convert RGB to 0-1 range
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  
  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      h = ((b - r) / delta + 2) * 60;
    } else {
      h = ((r - g) / delta + 4) * 60;
    }
  }
  
  // Convert saturation and lightness to percentages
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return { h, s, l };
}

/**
 * Converts an HSL color object to an RGB color object
 * 
 * @param hsl - HSL color object
 * @returns RGB color object
 */
export function hslToRgb(hsl: HslColor): RgbColor {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0;
  let g = 0;
  let b = 0;
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

/**
 * Checks if a color is light or dark
 * 
 * @param color - Hex color string
 * @returns true if the color is light, false if dark
 */
export function isLightColor(color: string): boolean {
  const rgb = hexToRgb(color);
  
  // Calculate luminance using the perceived brightness formula
  // https://www.w3.org/TR/AERT/#color-contrast
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  
  return luminance > 0.5;
}

/**
 * Get the contrast ratio between two colors
 * 
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Calculate relative luminance values
  const lum1 = getRelativeLuminance(hexToRgb(color1));
  const lum2 = getRelativeLuminance(hexToRgb(color2));
  
  // Calculate contrast ratio
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Get the relative luminance of a color (for WCAG contrast calculations)
 * 
 * @param rgb - RGB color
 * @returns Relative luminance
 */
function getRelativeLuminance(rgb: RgbColor): number {
  // Convert RGB to sRGB
  const srgb = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255
  };
  
  // Apply transformations
  const transform = (val: number) => {
    return val <= 0.039_28
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  };
  
  // Calculate relative luminance
  return 0.2126 * transform(srgb.r) + 0.7152 * transform(srgb.g) + 0.0722 * transform(srgb.b);
}