/**
 * Theme System Exports
 *
 * This file exports all theme-related functionality.
 */

// Core theme components
export { ThemeProvider, type ThemeProviderProps } from "./theme-provider";
export { ThemeContext, useThemeContext, type ThemeContextValue } from "./theme-context";
export { useTheme, type UseThemeResult } from "./use-theme";

// Design token system
export {
  extractTokensFromTheme,
  createTokenCollection,
  convertThemeTokens,
  type DesignToken,
  type TokenCollection,
  type TokenCategory
} from "./theme-tokens";

// CSS variable generation
export {
  generateCssVariables,
  applyCssVariables,
  generateCssRules,
  type CssVariableOutput,
  type CssVariableSetOptions
} from "./css-variable-generator";

// Token resolution
export {
  createTokenResolver,
  resolveThemeValue,
  cssVar,
  type TokenResolver,
  type TokenReferenceOptions
} from "./token-resolver";

// Color system
export {
  generateColorPalette,
  generateColorScale,
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  rgbToHsl,
  hslToRgb,
  isLightColor,
  getContrastRatio,
  type RgbColor,
  type HslColor,
  type ColorIntent,
  type ColorShadeLevel,
  type ColorScaleOptions,
  type ColorPaletteConfig
} from "./color-system";

// Theme presets
export {
  defaultTheme,
  themePresets,
  createDarkTheme,
  generateCustomTheme
} from "./theme-presets";

// Color mode system
export {
  ColorModeProvider,
  ColorModeContext,
  useColorMode,
  ColorModeToggle,
  AdvancedModeToggle,
  type ColorModeContextValue,
  type ColorModeProviderProps,
  type ColorModeToggleProps,
  type AdvancedModeToggleProps
} from "./color-mode";