/**
 * Theme Provider Component
 *
 * This component provides theme context to the application, handling theme switching,
 * color mode management, and CSS variable application.
 */

import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { EnhancedThemeSpecification, ThemeMode } from "../../types/schema/theme";
import type { ThemeSpecification } from "../../types/schema/specification";
import { ThemeContext, type ThemeContextValue } from "./theme-context";
import { mergeThemes } from "../schemas/theme-validation";
import { generateCssVariables } from "./css-variable-generator";
import { createTokenResolver, type TokenResolver } from "./token-resolver";
import { createTokenCollection, type TokenCollection } from "./theme-tokens";

/**
 * ThemeProvider Props
 */
export interface ThemeProviderProps {
  /**
   * Initial theme specification
   */
  readonly theme: ThemeSpecification;
  
  /**
   * Enhanced theme specification (optional)
   */
  readonly enhancedTheme?: EnhancedThemeSpecification;
  
  /**
   * Children components
   */
  readonly children: ReactNode;
  
  /**
   * Storage key for persisting theme preference (optional)
   */
  readonly storageKey?: string;
  
  /**
   * Default color mode (optional)
   */
  readonly defaultColorMode?: ThemeMode;
  
  /**
   * CSS variable prefix (default: "--theme")
   */
  readonly cssPrefix?: string;
  
  /**
   * Whether to flatten CSS variable names for common tokens (default: false)
   * When true, creates simplified variable names like `--theme-primary-500`
   * in addition to fully-qualified names like `--theme-colors-primary-500`
   */
  readonly flattenCssVariables?: boolean;
  
  /**
   * Whether to apply CSS variables to `:root` (default: true)
   * When false, variables won't be automatically applied to the DOM
   */
  readonly applyCssToRoot?: boolean;
  
  /**
   * Element to apply CSS variables to (default: document.documentElement)
   */
  readonly cssTarget?: HTMLElement;
  
  /**
   * Style element ID for CSS variables (default: "theme-variables")
   */
  readonly styleElementId?: string;
}

/**
 * Theme Provider Component
 * 
 * Provides theme context to the application and handles theme-related functionality.
 * Implements the design token system, CSS variable generation, and token resolution.
 */
export function ThemeProvider({
  theme: initialTheme,
  enhancedTheme,
  children,
  storageKey = "react-jedi-theme",
  defaultColorMode = "system",
  cssPrefix = "--theme",
  flattenCssVariables = false,
  applyCssToRoot = true,
  cssTarget,
  styleElementId = "theme-variables",
}: ThemeProviderProps): React.ReactElement {
  // Initialize theme state
  const [theme, setTheme] = useState<ThemeSpecification>(initialTheme);
  
  // Initialize color mode state
  const colorModeSettings = enhancedTheme?.colorMode;
  const [colorMode, setColorMode] = useState<ThemeMode>(
    defaultColorMode || colorModeSettings?.defaultMode || "system"
  );
  
  // Determine effective color mode (considering system preference)
  const [effectiveColorMode, setEffectiveColorMode] = useState<"light" | "dark">(
    colorMode === "system" ? "light" : colorMode as "light" | "dark"
  );
  
  // Generate tokens and CSS variables from theme
  const { variables: cssVariables, tokens } = useMemo(() => {
    return generateCssVariables(theme, {
      prefix: cssPrefix,
      flatten: flattenCssVariables,
    });
  }, [theme, cssPrefix, flattenCssVariables]);
  
  // Create token resolver
  const tokenResolver = useMemo<TokenResolver>(() => {
    return createTokenResolver(theme, tokens, {
      cssPrefix,
    });
  }, [theme, tokens, cssPrefix]);
  
  // Update theme handler
  const updateTheme = useCallback((newTheme: Partial<ThemeSpecification>) => {
    setTheme((prevTheme) => mergeThemes(prevTheme as Record<string, unknown>, newTheme as Record<string, unknown>) as ThemeSpecification);
  }, []);
  
  // Resolve token from theme using the token resolver
  const resolveToken = useCallback((tokenPath: string): unknown => {
    return tokenResolver.resolve(tokenPath);
  }, [tokenResolver]);
  
  // Toggle color mode handler
  const toggleColorMode = useCallback(() => {
    setColorMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      
      // Save preference to storage if storageKey is provided
      if (storageKey) {
        localStorage.setItem(storageKey, newMode);
      }
      
      return newMode;
    });
  }, [storageKey]);
  
  // Handler for setting color mode
  const setColorModeHandler = useCallback((mode: ThemeMode) => {
    setColorMode(mode);
    
    // Save preference to storage if storageKey is provided
    if (storageKey) {
      localStorage.setItem(storageKey, mode);
    }
  }, [storageKey]);
  
  // Effect to apply CSS variables to :root or target element
  useEffect(() => {
    if (!applyCssToRoot) {
      return;
    }
    
    const targetElement = cssTarget || document.documentElement;
    
    // Apply CSS variables directly to the target element
    for (const [key, value] of Object.entries(cssVariables)) {
      targetElement.style.setProperty(key, value);
    }
    
    return () => {
      // Clean up variables when component unmounts
      for (const key of Object.keys(cssVariables)) {
        targetElement.style.removeProperty(key);
      }
    };
  }, [cssVariables, applyCssToRoot, cssTarget, styleElementId]);
  
  // Effect to detect system color scheme changes
  useEffect(() => {
    if (colorMode !== "system") {
      setEffectiveColorMode(colorMode as "light" | "dark");
      return;
    }
    
    // Check for system preference
    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (event: MediaQueryListEvent | MediaQueryList): void => {
      setEffectiveColorMode(event.matches ? "dark" : "light");
    };
    
    // Set initial value
    handleChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [colorMode]);
  
  // Effect to load saved color mode from storage
  useEffect(() => {
    if (storageKey) {
      const savedMode = localStorage.getItem(storageKey) as ThemeMode | null;
      
      if (savedMode) {
        setColorMode(savedMode);
      }
    }
  }, [storageKey]);
  
  // Effect to apply color mode specific theme overrides
  useEffect(() => {
    if (!colorModeSettings) return;
    
    const modeSpecificTheme = 
      effectiveColorMode === "dark" ? colorModeSettings.dark : colorModeSettings.light;
    
    if (modeSpecificTheme) {
      // Apply color mode specific overrides
      setTheme((prevTheme) => ({
        ...prevTheme,
        colors: {
          ...prevTheme.colors,
          ...modeSpecificTheme.colors,
        },
        // Apply other color mode specific properties
        ...(modeSpecificTheme.background ? { background: modeSpecificTheme.background } : {}),
        ...(modeSpecificTheme.text ? { text: modeSpecificTheme.text } : {}),
        ...(modeSpecificTheme.border ? { border: modeSpecificTheme.border } : {}),
      }));
    }
  }, [effectiveColorMode, colorModeSettings]);
  
  // Create context value with token system integration
  const contextValue: ThemeContextValue = {
    theme,
    enhancedTheme,
    colorMode,
    updateTheme,
    setColorMode: setColorModeHandler,
    toggleColorMode,
    cssVariables,
    resolveToken,
    tokens,
    tokenResolver,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}