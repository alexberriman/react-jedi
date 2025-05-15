/**
 * Theme Provider Component
 *
 * This component provides theme context to the application, handling theme switching,
 * color mode management, and CSS variable application.
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ColorModeSettings, EnhancedThemeSpecification, ThemeMode } from "../../types/schema/theme";
import type { ThemeSpecification } from "../../types/schema/specification";
import { ThemeContext, type ThemeContextValue } from "./theme-context";
import { extractCssVariables, mergeThemes, resolveThemeToken } from "../schemas/theme-validation";

/**
 * ThemeProvider Props
 */
export interface ThemeProviderProps {
  /**
   * Initial theme specification
   */
  theme: ThemeSpecification;
  
  /**
   * Enhanced theme specification (optional)
   */
  enhancedTheme?: EnhancedThemeSpecification;
  
  /**
   * Children components
   */
  children: ReactNode;
  
  /**
   * Storage key for persisting theme preference (optional)
   */
  storageKey?: string;
  
  /**
   * Default color mode (optional)
   */
  defaultColorMode?: ThemeMode;
  
  /**
   * CSS variable prefix (default: "--theme")
   */
  cssPrefix?: string;
}

/**
 * Theme Provider Component
 * 
 * Provides theme context to the application and handles theme-related functionality.
 */
export function ThemeProvider({
  theme: initialTheme,
  enhancedTheme,
  children,
  storageKey = "react-jedi-theme",
  defaultColorMode = "system",
  cssPrefix = "--theme",
}: ThemeProviderProps): JSX.Element {
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
  
  // Generate CSS variables from theme
  const cssVariables = useMemo(() => {
    return extractCssVariables(theme, cssPrefix);
  }, [theme, cssPrefix]);
  
  // Update theme handler
  const updateTheme = useCallback((newTheme: Partial<ThemeSpecification>) => {
    setTheme((prevTheme) => mergeThemes(prevTheme, newTheme));
  }, []);
  
  // Resolve token from theme
  const resolveToken = useCallback((tokenPath: string): unknown => {
    return resolveThemeToken(theme, tokenPath);
  }, [theme]);
  
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
  
  // Effect to apply CSS variables to :root
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply all CSS variables to :root
    for (const [key, value] of Object.entries(cssVariables)) {
      root.style.setProperty(key, value);
    }
    
    return () => {
      // Clean up variables when component unmounts
      for (const key of Object.keys(cssVariables)) {
        root.style.removeProperty(key);
      }
    };
  }, [cssVariables]);
  
  // Effect to detect system color scheme changes
  useEffect(() => {
    if (colorMode !== "system") {
      setEffectiveColorMode(colorMode as "light" | "dark");
      return;
    }
    
    // Check for system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
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
  
  // Create context value
  const contextValue: ThemeContextValue = {
    theme,
    enhancedTheme,
    colorMode,
    updateTheme,
    setColorMode: setColorModeHandler,
    toggleColorMode,
    cssVariables,
    resolveToken,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}