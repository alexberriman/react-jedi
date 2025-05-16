/**
 * Shadow System
 *
 * This module provides a comprehensive system for managing shadows throughout the UI.
 * It includes default scales, utilities for responsive shadows, and preset collections.
 */

import type { ThemeSpecification } from "../../types/schema/specification";

/**
 * Default shadow scale values
 * Based on industry-standard elevation patterns
 */
export const DEFAULT_SHADOW_SCALE = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  outline: "0 0 0 3px rgba(59, 130, 246, 0.5)",
  focus: "0 0 0 2px rgba(99, 102, 241, 0.1)",
  ring: "0 0 0 1px rgba(15, 23, 42, 0.1)",
  "ring-offset": "0 0 0 2px #ffffff, 0 0 0 4px rgba(15, 23, 42, 0.1)",
  drop: "drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1))",
};

/**
 * Semantic shadow presets for common use cases
 */
export const SEMANTIC_SHADOW_PRESETS = {
  // Cards and surfaces
  card: DEFAULT_SHADOW_SCALE.default,
  "card-hover": DEFAULT_SHADOW_SCALE.lg,
  "card-elevated": DEFAULT_SHADOW_SCALE.xl,

  // Modals and dialogs
  modal: DEFAULT_SHADOW_SCALE["2xl"],
  dialog: DEFAULT_SHADOW_SCALE.xl,

  // Interactive elements
  button: DEFAULT_SHADOW_SCALE.sm,
  "button-hover": DEFAULT_SHADOW_SCALE.md,
  "button-active": DEFAULT_SHADOW_SCALE.inner,
  "button-focus": DEFAULT_SHADOW_SCALE.ring,

  // Dropdowns and popovers
  dropdown: DEFAULT_SHADOW_SCALE.lg,
  popover: DEFAULT_SHADOW_SCALE.lg,
  tooltip: DEFAULT_SHADOW_SCALE.md,

  // Navigation elements
  navbar: DEFAULT_SHADOW_SCALE.sm,
  sidebar: DEFAULT_SHADOW_SCALE.md,
  tab: DEFAULT_SHADOW_SCALE.sm,

  // Form elements
  input: DEFAULT_SHADOW_SCALE.sm,
  "input-focus": DEFAULT_SHADOW_SCALE.focus,
  "input-error": "0 0 0 2px rgba(239, 68, 68, 0.2)",

  // Special effects
  glow: "0 0 20px rgba(99, 102, 241, 0.3)",
  neon: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de",
  subtle: "0 0 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24)",
};

/**
 * Dark mode shadow adjustments
 * Shadows need adjustments in dark mode for proper contrast
 */
export const DARK_MODE_SHADOW_SCALE = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.12)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.12)",
  outline: "0 0 0 3px rgba(59, 130, 246, 0.3)",
  focus: "0 0 0 2px rgba(99, 102, 241, 0.2)",
  ring: "0 0 0 1px rgba(255, 255, 255, 0.1)",
  "ring-offset": "0 0 0 2px #1a202c, 0 0 0 4px rgba(255, 255, 255, 0.1)",
  drop: "drop-shadow(0 10px 8px rgba(0, 0, 0, 0.08)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.2))",
};

/**
 * Shadow scale type
 */
export type ShadowScale = typeof DEFAULT_SHADOW_SCALE;

/**
 * Shadow key type - any key in the shadow scale
 */
export type ShadowKey = keyof ShadowScale;

/**
 * Semantic shadow key type
 */
export type SemanticShadowKey = keyof typeof SEMANTIC_SHADOW_PRESETS;

/**
 * Get shadow value from the scale
 * @param key - Shadow key
 * @param scale - Optional custom shadow scale
 * @returns Shadow value
 */
export function getShadow(
  key: ShadowKey | SemanticShadowKey | string,
  scale: Partial<ShadowScale> & Record<string, string> = DEFAULT_SHADOW_SCALE
): string {
  // Check semantic presets first
  if (key in SEMANTIC_SHADOW_PRESETS) {
    return SEMANTIC_SHADOW_PRESETS[key as SemanticShadowKey];
  }

  // Then check the scale
  if (key in scale) {
    return scale[key as keyof typeof scale];
  }

  // Return as raw value if not found
  return key;
}

/**
 * Get shadow value for dark mode
 * @param key - Shadow key
 * @param darkScale - Optional custom dark mode shadow scale
 * @returns Shadow value for dark mode
 */
export function getDarkModeShadow(
  key: ShadowKey | string,
  darkScale: Partial<ShadowScale> & Record<string, string> = DARK_MODE_SHADOW_SCALE
): string {
  return getShadow(key, darkScale);
}

/**
 * Generate a complete shadow scale from a configuration
 * @param config - Shadow configuration
 * @returns Generated shadow scale
 */
export function generateShadowScale(config: {
  customValues?: Record<string, string>;
  darkMode?: boolean;
  baseScale?: ShadowScale;
}): ShadowScale & Record<string, string> {
  const {
    customValues = {},
    darkMode = false,
    baseScale = darkMode ? DARK_MODE_SHADOW_SCALE : DEFAULT_SHADOW_SCALE,
  } = config;

  // Merge base scale with custom values
  return { ...baseScale, ...customValues };
}

/**
 * Extract shadow scale from theme specification
 * @param theme - Theme specification
 * @returns Extracted shadow scale
 */
export function extractShadowScale(
  theme?: ThemeSpecification
): ShadowScale & Record<string, string> {
  if (!theme?.shadows || Object.keys(theme.shadows).length === 0) {
    return DEFAULT_SHADOW_SCALE;
  }

  return { ...DEFAULT_SHADOW_SCALE, ...theme.shadows };
}

/**
 * Generate CSS variables for shadow values
 * @param scale - Shadow scale
 * @param prefix - CSS variable prefix
 * @returns CSS variables object
 */
export function generateShadowVariables(
  scale: Partial<ShadowScale> & Record<string, string> = DEFAULT_SHADOW_SCALE,
  prefix = "--shadow"
): Record<string, string> {
  const variables: Record<string, string> = {};

  for (const [key, value] of Object.entries(scale)) {
    variables[`${prefix}-${key}`] = value;
  }

  // Add semantic shadows as well
  for (const [key, value] of Object.entries(SEMANTIC_SHADOW_PRESETS)) {
    variables[`${prefix}-${key}`] = value;
  }

  return variables;
}

/**
 * Generate shadow CSS variables for a theme
 * @param theme - Theme specification
 * @returns CSS variables object
 */
export function shadowsToVariables(theme?: ThemeSpecification): Record<string, string> {
  const scale = extractShadowScale(theme);
  return generateShadowVariables(scale);
}

/**
 * Combine multiple shadows
 * @param shadows - Array of shadow values
 * @returns Combined shadow value
 */
export function combineShadows(...shadows: string[]): string {
  return shadows.filter(Boolean).join(", ");
}

/**
 * Create responsive shadow configuration
 * @param breakpoints - Breakpoint-specific shadow values
 * @returns Responsive shadow configuration
 */
export function createResponsiveShadow(breakpoints: {
  base?: ShadowKey | string;
  sm?: ShadowKey | string;
  md?: ShadowKey | string;
  lg?: ShadowKey | string;
  xl?: ShadowKey | string;
}): Record<string, string> {
  const responsive: Record<string, string> = {};

  if (breakpoints.base) {
    responsive.shadow = getShadow(breakpoints.base);
  }

  for (const [breakpoint, value] of Object.entries(breakpoints)) {
    if (breakpoint !== "base" && value) {
      responsive[`shadow-${breakpoint}`] = getShadow(value);
    }
  }

  return responsive;
}

/**
 * Shadow animation presets
 */
export const SHADOW_ANIMATIONS = {
  pulse: {
    from: DEFAULT_SHADOW_SCALE.sm,
    to: DEFAULT_SHADOW_SCALE.lg,
    duration: "2s",
    easing: "ease-in-out",
    iterations: Infinity,
  },
  grow: {
    from: DEFAULT_SHADOW_SCALE.none,
    to: DEFAULT_SHADOW_SCALE.xl,
    duration: "0.3s",
    easing: "ease-out",
  },
  shrink: {
    from: DEFAULT_SHADOW_SCALE.xl,
    to: DEFAULT_SHADOW_SCALE.none,
    duration: "0.3s",
    easing: "ease-in",
  },
  float: {
    "0%": DEFAULT_SHADOW_SCALE.lg,
    "50%": DEFAULT_SHADOW_SCALE["2xl"],
    "100%": DEFAULT_SHADOW_SCALE.lg,
    duration: "3s",
    easing: "ease-in-out",
    iterations: Infinity,
  },
};
