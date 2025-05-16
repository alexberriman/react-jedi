/**
 * React Jedi - Main Entry Point
 * 
 * This file exports everything from the library.
 */

// Import styles
import "./styles/global.css";

import type { ComponentResolver, RenderOptions, UISpecification, ComponentSpec } from "./types/schema/components";
import { render } from "./lib/render";
import { defaultComponentResolver } from "./lib/component-resolver";
import { buildComponentTree } from "./lib/component-tree";

// Version information
export const VERSION = "1.0.0";

/**
 * React Jedi initialization options
 */
export interface JediOptions {
  /**
   * Custom component resolver
   */
  resolver?: ComponentResolver;
  
  /**
   * Default theme configuration
   */
  theme?: Record<string, unknown>;
  
  /**
   * Whether to enable development mode with additional debugging
   * @default false
   */
  development?: boolean;
  
  /**
   * Custom event handlers
   */
  handlers?: Record<string, (...args: unknown[]) => void>;
}

/**
 * React Jedi instance
 */
export interface Jedi {
  /**
   * Library version
   */
  version: string;
  
  /**
   * Render a UI specification or component specification
   */
  render: (spec: UISpecification | ComponentSpec, options?: RenderOptions) => React.ReactElement | null;
  
  /**
   * Build a component tree from a specification
   */
  buildTree: (spec: UISpecification | ComponentSpec) => ReturnType<typeof buildComponentTree>;
  
  /**
   * Default options for this instance
   */
  options: Required<JediOptions>;
}

/**
 * Create a React Jedi instance
 * 
 * @param options Initialization options
 * @returns Jedi instance
 */
export function createJedi(options: JediOptions = {}): Jedi {
  const defaultOptions: Required<JediOptions> = {
    resolver: defaultComponentResolver,
    theme: {},
    development: false,
    handlers: {},
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return {
    version: VERSION,
    
    render: (spec, renderOptions = {}) => {
      // Merge instance options with render-specific options
      const mergedRenderOptions = {
        resolver: mergedOptions.resolver,
        theme: mergedOptions.theme,
        development: mergedOptions.development,
        handlers: mergedOptions.handlers,
        ...renderOptions,
      };
      
      return render(spec, mergedRenderOptions);
    },
    
    buildTree: (spec) => buildComponentTree(spec),
    
    options: mergedOptions,
  };
}

// Export all components through the barrel file
export * from "./components/index";

// Export utilities, but exclude types that would conflict with types/index exports
export * from "./lib/utils";
export * from "./lib/styles";
export * from "./lib/validation";
export * from "./lib/parser";
export * from "./lib/render";
export * from "./lib/component-resolver";
export * from "./lib/component-tree";
export * from "./lib/error-handling";

// Export theme system without re-exporting duplicate breakpoints
export {
  ThemeProvider, ThemeContext, useThemeContext, useTheme,
  extractTokensFromTheme, createTokenCollection, convertThemeTokens,
  generateCssVariables, applyCssVariables, generateCssRules,
  createTokenResolver, resolveThemeValue, cssVar,
  generateColorPalette, generateColorScale, hexToRgb, rgbToHex,
  hexToHsl, hslToHex, rgbToHsl, hslToRgb, isLightColor, getContrastRatio,
  spacing, DEFAULT_SPACING_SCALE, RELATIVE_SPACING, DEFAULT_CONTAINER_PRESETS,
  ContainerPresetType,
  defaultTheme, themePresets, createDarkTheme, generateCustomTheme,
  ColorModeProvider, ColorModeContext, useColorMode, ColorModeToggle, AdvancedModeToggle,
  brandPresets, getPreset, getPresetsByCategory, getCategories, generateBrandTheme,
  createThemeFromPreset, describePersonality, analyzeThemePersonality, findMatchingPreset,
  mergePresets, getComplementaryPresets,
  // Import types for brand presets
  type BrandPreset, type BrandCategory, type BrandColors, type BrandTypography,
  type BrandPersonality, type BrandThemeOptions, type GeneratedBrandTheme
} from "./lib/theme";
// Export type-safety
export * from "./lib/type-safety";

// Export UI components
export * from "./components/ui/index";

// Export schemas
export * from "./lib/schemas/index";

// Export types with explicit re-exports to avoid conflicts
export * from "./types/components";
export type {
  // Re-export from schema with explicit names to avoid conflicts
  ComponentChildren,
  EventHandler,
  AccessibilityProps,
  SkeletonSpec,
  LabelSpec,
  InputSpec,
  UISpecification,
  SpecificationMetadata,
  ThemeSpecification,
  ThemeColors,
  ColorScale,
  ThemeTypography,
  AnimationPreset,
  StateSpecification,
  DataSourceSpecification,
  RestDataSourceConfig,
  GraphQLDataSourceConfig,
  StaticDataSourceConfig,
  WebSocketDataSourceConfig,
  FunctionDataSourceConfig,
  BoxSpec,
  ContainerSpec,
  GridSpec,
  FlexSpec,
  LayoutComponentSpec,
  TextSpec,
  HeadingSpec,
  BlockQuoteSpec,
  TypographyComponentSpec,
  UIComponentSpec,
  ComponentSpec,
  ComponentType,
  ComponentResolver,
  ComponentProps,
  RenderOptions,
  ComponentTypes,
  
  // Theme types
  ThemeMode,
  ThemePreset,
  ThemeVariant,
  ColorModeSettings,
  ThemeColorModePreset,
  ThemeExtension,
  ThemeToken,
  ThemeGeneratorConfig,
  EnhancedThemeSpecification,
} from "./types/schema";

export {
  // Guards
  isBox,
  isContainer,
  isGrid,
  isFlex,
  isAspectRatio,
  isSeparator,
  isText,
  isHeading,
  isBlockQuote,
  isButton,
  isCard,
  isBadge,
  isAvatar,
  isImage,
  isSkeleton,
  isLabel,
  isInput,
  isComponentSpec,
  isTextContent,
  isComponentSpecArray,
  isComponentType
} from "./types/schema";

// Export hooks if available
// export * from "./hooks/index";