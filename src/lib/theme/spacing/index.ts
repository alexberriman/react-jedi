/**
 * Spacing System
 *
 * This module exports the comprehensive spacing system for the theme.
 * It provides a unified API for spacing-related utilities, scales, and presets.
 */

// Re-export all spacing-related utilities
export * from "./scale";
export * from "./responsive";
export * from "./container";

// Export a unified API for the spacing system
import {
  DEFAULT_SPACING_SCALE,
  RELATIVE_SPACING,
  generateSpacingScale,
  extractSpacingScale,
  getSpacing,
  getRelativeSpacing,
  generateSpacingVariables,
  spacingToVariables,
} from "./scale";

import {
  DEFAULT_BREAKPOINTS,
  extractBreakpoints,
  resolveResponsiveSpacing,
  generateMediaQuery,
  generateResponsiveSpacingCSS,
  applySpacingConstraints,
  fluidSpacing,
} from "./responsive";

import {
  ContainerPresetType,
  DEFAULT_CONTAINER_PRESETS,
  getContainerPreset,
  resolveContainerSpacing,
  createCustomContainerPreset,
  generateContainerClasses,
} from "./container";

/**
 * Main spacing system API
 */
export const spacing = {
  // Scales and defaults
  scale: DEFAULT_SPACING_SCALE,
  relativeScale: RELATIVE_SPACING,
  breakpoints: DEFAULT_BREAKPOINTS,
  containerPresets: DEFAULT_CONTAINER_PRESETS,
  
  // Core spacing utilities
  get: getSpacing,
  getRelative: getRelativeSpacing,
  getContainer: getContainerPreset,
  
  // Scale generation
  generateScale: generateSpacingScale,
  extractScale: extractSpacingScale,
  
  // Responsive utilities
  responsive: {
    resolve: resolveResponsiveSpacing,
    mediaQuery: generateMediaQuery,
    generateCSS: generateResponsiveSpacingCSS,
    constraints: applySpacingConstraints,
    fluid: fluidSpacing,
    extractBreakpoints,
  },
  
  // Container utilities
  container: {
    preset: getContainerPreset,
    presetTypes: ContainerPresetType,
    resolve: resolveContainerSpacing,
    createCustom: createCustomContainerPreset,
    classes: generateContainerClasses,
  },
  
  // CSS variables
  variables: {
    generate: generateSpacingVariables,
    fromTheme: spacingToVariables,
  },
};