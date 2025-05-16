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

// Spacing system
export {
  spacing,
  DEFAULT_SPACING_SCALE,
  RELATIVE_SPACING,
  DEFAULT_CONTAINER_PRESETS,
  ContainerPresetType,
  type SpacingScale,
  type SpacingKey,
  type RelativeSpacingKey,
  type ResponsiveSpacingObject,
  type ContainerSpacing
} from "./spacing";

// Z-Index system
export {
  defaultZIndices,
  getZIndex,
  createZIndexScale,
  createZIndexResolver,
  createZIndexCSSVariables,
  getRelativeZIndex,
  isValidZIndex,
  useZIndex,
  type UseZIndexResult
} from "./z-index";

// Border Radius system
export {
  defaultBorderRadii,
  getBorderRadius,
  createBorderRadiusScale,
  createBorderRadiusResolver,
  createBorderRadiusCSSVariables,
  createCustomBorderRadius,
  isValidBorderRadius,
  useBorderRadius,
  createCornerRadiusStyles,
  applyBorderRadius,
  conditionalBorderRadius,
  responsiveBorderRadius,
  BorderRadiusBuilder,
  type UseBorderRadiusResult,
  type CornerRadiusOptions
} from "./border-radius";

// Shadow system
export {
  DEFAULT_SHADOW_SCALE,
  SEMANTIC_SHADOW_PRESETS,
  DARK_MODE_SHADOW_SCALE,
  getShadow,
  getDarkModeShadow,
  generateShadowScale,
  extractShadowScale,
  shadowsToVariables,
  combineShadows,
  createResponsiveShadow,
  SHADOW_ANIMATIONS,
  type ShadowScale,
  type ShadowKey,
  type SemanticShadowKey
} from "./shadow-system";

// Theme presets
export {
  defaultTheme,
  themePresets,
  createDarkTheme,
  generateCustomTheme
} from "./theme-presets";

// Style overrides
export {
  processStyleOverrides,
  createStyleFunction,
  mergeStyles,
  cascadeStyles,
  type StyleFunction
} from "./style-overrides";

// Style extension system
export {
  extractInheritableStyles,
  extractNonInheritableStyles,
  shouldInheritStyles,
  createChildStyleContext,
  composeStyles,
  cascadeStyles as cascadeExtendedStyles,
  resolveExtendedStyles,
  createStyleExtension,
  DEFAULT_INHERITABLE_PROPERTIES,
  DEFAULT_INHERITING_COMPONENTS,
  DEFAULT_BOUNDARY_COMPONENTS,
  DEFAULT_INHERITANCE_CONFIG,
  DEFAULT_COMPOSITION_CONFIG,
  DEFAULT_CASCADE_CONFIG,
  calculateSpecificity,
  createStyleComposer,
  createCascadeResolver,
  type StyleContext,
  type StyleInheritanceConfig,
  type StyleCompositionConfig,
  type StyleSource,
  type CascadeConfig
} from "./style-extension";

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

// Responsive system
export {
  DEFAULT_BREAKPOINTS,
  extractBreakpoints,
  getBreakpointOrder,
  generateMediaQuery,
  generateContainerQuery,
  createMediaQueries,
  createContainerQueries,
  isResponsiveValue,
  normalizeResponsiveValue,
  getResponsiveValue,
  mapResponsiveValues,
  createResponsiveStyles,
  createResponsiveUtils,
  useResponsive,
  type Breakpoints,
  type BreakpointKey,
  type ResponsiveValue,
  type ResponsiveObject,
  type ResponsiveArray,
  type MediaQueryType,
  type MediaQueryOrientation,
  type ContainerQueryType,
  type MediaQueryOptions,
  type ContainerQueryOptions,
  type UseResponsiveResult
} from "./responsive-system";

// Responsive variants
export {
  createResponsiveToken,
  generateResponsiveCssVars,
  createResponsiveCategory,
  createResponsiveTokenCollection,
  resolveTokenAtBreakpoint,
  applyResponsiveToken,
  createResponsiveTokenUtils,
  createResponsiveColorToken,
  createResponsiveSpacingToken,
  createResponsiveTypographyToken,
  type ResponsiveDesignToken,
  type ResponsiveTokenCollection,
  type ResponsiveTokenOptions
} from "./responsive-variants";

// Container queries
export {
  containerQuery,
  generateContainerQueryString,
  createContainerDefinition,
  containerQueryFromSize,
  applyContainerQuery,
  createContainerStyles,
  useContainerQuery,
  createHybridResponsiveStyles,
  DEFAULT_CONTAINER_SIZES,
  type ContainerType,
  type ContainerName,
  type ContainerQueryCondition,
  type ContainerDefinition,
  type ContainerQuery,
  type ContainerResponsiveValue,
  type ContainerResponsiveObject,
  type ContainerQueryBuilderOptions,
  type UseContainerQueryResult
} from "./container-queries";

// Brand presets
export {
  brandPresets,
  getPreset,
  getPresetsByCategory,
  getCategories,
  generateBrandTheme,
  createThemeFromPreset,
  describePersonality,
  analyzeThemePersonality,
  findMatchingPreset,
  mergePresets,
  getComplementaryPresets,
  type BrandPreset,
  type BrandCategory,
  type BrandColors,
  type BrandTypography,
  type BrandPersonality,
  type BrandThemeOptions,
  type GeneratedBrandTheme
} from "./brand-presets";