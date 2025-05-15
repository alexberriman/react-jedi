/**
 * Theme Specification Schema
 *
 * This file defines the TypeScript interfaces for the theme specification system.
 * It provides a comprehensive typing system for theme-related structures.
 */

import type { ThemeColors, ThemeSpecification } from "./specification";

/**
 * Theme Mode for light/dark mode support
 */
export type ThemeMode = "light" | "dark" | "system";

/**
 * Theme Preset - named theme configurations
 */
export interface ThemePreset {
  /**
   * Unique identifier for the theme preset
   */
  id: string;
  
  /**
   * Display name for the theme preset
   */
  name: string;
  
  /**
   * Theme specification data
   */
  theme: ThemeSpecification;
  
  /**
   * Whether this is the default theme
   */
  isDefault?: boolean;
}

/**
 * Theme Variant - allows for component-specific theme overrides
 */
export interface ThemeVariant {
  /**
   * Unique identifier for the variant
   */
  id: string;
  
  /**
   * Display name for the variant
   */
  name: string;
  
  /**
   * Component type this variant applies to
   */
  componentType: string;
  
  /**
   * Theme overrides specific to this variant
   */
  overrides: Partial<ThemeSpecification>;
}

/**
 * Color Mode Settings - configuration for light/dark modes
 */
export interface ColorModeSettings {
  /**
   * Default color mode
   */
  defaultMode: ThemeMode;
  
  /**
   * Whether to respect system preferences
   */
  respectSystemPreference: boolean;
  
  /**
   * Storage key for persisting user preference
   */
  storageKey?: string;
  
  /**
   * Transition settings when switching modes
   */
  transition?: {
    /**
     * Duration of the transition in milliseconds
     */
    duration: number;
    
    /**
     * CSS timing function for the transition
     */
    easing: string;
  };
  
  /**
   * Light mode theme settings
   */
  light: ThemeColorModePreset;
  
  /**
   * Dark mode theme settings
   */
  dark: ThemeColorModePreset;
}

/**
 * Theme Color Mode Preset - color settings for a specific mode
 */
export interface ThemeColorModePreset {
  /**
   * Colors specific to this mode
   */
  colors: ThemeColors;
  
  /**
   * Background colors specific to this mode
   */
  background?: Record<string, string>;
  
  /**
   * Text colors specific to this mode
   */
  text?: Record<string, string>;
  
  /**
   * Border colors specific to this mode
   */
  border?: Record<string, string>;
}

/**
 * Theme Extension - extends the base ThemeSpecification with additional properties
 */
export interface ThemeExtension extends ThemeSpecification {
  /**
   * Color mode settings for light/dark mode
   */
  colorMode?: ColorModeSettings;
  
  /**
   * Theme variants for component-specific styling
   */
  variants?: Record<string, ThemeVariant>;
  
  /**
   * Component-specific theme overrides
   */
  components?: Record<string, Partial<ThemeSpecification>>;
  
  /**
   * Theme inheritance configuration
   */
  inheritance?: {
    /**
     * Parent theme identifier
     */
    parent?: string;
    
    /**
     * Whether to merge or replace properties
     */
    strategy: "merge" | "replace";
    
    /**
     * Properties to exclude from inheritance
     */
    exclude?: string[];
  };
}

/**
 * Theme Token - represents a design token that can be referenced
 */
export interface ThemeToken {
  /**
   * Token name/path (e.g., "colors.primary.500")
   */
  token: string;
  
  /**
   * Token value
   */
  value: string | number | Record<string, unknown>;
  
  /**
   * Token category
   */
  category: 
    | "color" 
    | "typography" 
    | "spacing" 
    | "borderRadius" 
    | "shadow" 
    | "animation" 
    | "breakpoint"
    | "zIndex";
  
  /**
   * Description of the token's purpose
   */
  description?: string;
}

/**
 * Theme Generator Configuration - used to generate theme variations
 */
export interface ThemeGeneratorConfig {
  /**
   * Base color to build color scales from
   */
  baseColors: {
    primary: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
  };
  
  /**
   * Typography settings
   */
  typography: {
    /**
     * Primary font family
     */
    primaryFont: string[];
    
    /**
     * Heading font family
     */
    headingFont?: string[];
    
    /**
     * Monospace font family
     */
    monoFont?: string[];
    
    /**
     * Base font size (px)
     */
    baseFontSize: number;
    
    /**
     * Scale factor for typography
     */
    scaleFactor: number;
  };
  
  /**
   * Border radius settings
   */
  borderRadius: {
    /**
     * Base border radius size
     */
    base: string;
    
    /**
     * Whether to use rounded corners
     */
    rounded: boolean;
  };
  
  /**
   * Spacing scale configuration
   */
  spacing: {
    /**
     * Base spacing unit (px)
     */
    baseUnit: number;
    
    /**
     * Scale factor for spacing
     */
    scaleFactor: number;
  };
}

/**
 * Extended theme specification with all advanced features
 */
export interface EnhancedThemeSpecification extends ThemeExtension {
  /**
   * Theme metadata
   */
  metadata?: {
    /**
     * Theme name
     */
    name: string;
    
    /**
     * Theme description
     */
    description?: string;
    
    /**
     * Theme author
     */
    author?: string;
    
    /**
     * Theme version
     */
    version?: string;
    
    /**
     * Theme tags for categorization
     */
    tags?: string[];
  };
  
  /**
   * Design tokens extracted from the theme
   */
  tokens?: ThemeToken[];
  
  /**
   * Media query breakpoints
   */
  mediaQueries?: Record<string, string>;
  
  /**
   * Container query breakpoints
   */
  containerQueries?: Record<string, string>;
  
  /**
   * Theme generation configuration
   */
  generatorConfig?: ThemeGeneratorConfig;
}