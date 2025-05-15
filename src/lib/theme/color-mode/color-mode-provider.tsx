/**
 * ColorModeProvider Component
 *
 * This component provides color mode (light/dark/system) context to the application,
 * with utilities for mode switching, system preference detection, and persistence.
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ColorModeSettings, ThemeColorModePreset, ThemeMode } from "../../../types/schema/theme";

/**
 * ColorModeContext Interface
 * Defines the shape of the color mode context value
 */
export interface ColorModeContextValue {
  /**
   * Current color mode (light/dark/system)
   */
  colorMode: ThemeMode;
  
  /**
   * The actual mode being used (light/dark) after resolving system preference
   */
  resolvedColorMode: "light" | "dark";
  
  /**
   * Set the color mode
   */
  setColorMode: (mode: ThemeMode) => void;
  
  /**
   * Toggle between light and dark modes
   */
  toggleColorMode: () => void;
  
  /**
   * Color mode settings from configuration
   */
  settings?: ColorModeSettings;
  
  /**
   * The current theme preset for the active color mode
   */
  activeThemePreset?: ThemeColorModePreset;
  
  /**
   * Whether the system prefers dark mode
   */
  systemPrefersDark: boolean;
  
  /**
   * Whether transition animations are enabled
   */
  transitionsEnabled: boolean;
  
  /**
   * Enable/disable transitions
   */
  setTransitionsEnabled: (enabled: boolean) => void;
}

/**
 * Create the ColorModeContext with default values
 */
export const ColorModeContext = createContext<ColorModeContextValue>({
  colorMode: "system",
  resolvedColorMode: "light",
  setColorMode: () => {
    // Default no-op implementation
  },
  toggleColorMode: () => {
    // Default no-op implementation
  },
  systemPrefersDark: false,
  transitionsEnabled: true,
  setTransitionsEnabled: () => {
    // Default no-op implementation
  },
});

/**
 * ColorModeProvider Props Interface
 */
export interface ColorModeProviderProps {
  /**
   * Color mode settings
   */
  readonly settings?: ColorModeSettings;
  
  /**
   * Initial color mode
   */
  readonly initialColorMode?: ThemeMode;
  
  /**
   * Storage key for persisting color mode preference
   */
  readonly storageKey?: string;
  
  /**
   * Children components
   */
  readonly children: ReactNode;
}

/**
 * ColorModeProvider Component
 * 
 * Provides color mode context to the application and handles color mode related functionality.
 */
export function ColorModeProvider({
  settings,
  initialColorMode = "system",
  storageKey = "react-jedi-color-mode",
  children,
}: ColorModeProviderProps): React.ReactElement {
  // State for color mode
  const [colorMode, setColorModeState] = useState<ThemeMode>(initialColorMode);
  
  // State for system preference detection
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(false);
  
  // State for enabling/disabling transitions
  const [transitionsEnabled, setTransitionsEnabled] = useState<boolean>(true);
  
  // Computed resolved mode based on system preference
  const resolvedColorMode = useMemo<"light" | "dark">(() => {
    if (colorMode === "system") {
      return systemPrefersDark ? "dark" : "light";
    }
    return colorMode as "light" | "dark";
  }, [colorMode, systemPrefersDark]);
  
  // Get active theme preset based on resolved mode
  const activeThemePreset = useMemo(() => {
    if (!settings) return undefined;
    return resolvedColorMode === "dark" ? settings.dark : settings.light;
  }, [resolvedColorMode, settings]);
  
  // Set color mode and persist to storage
  const setColorMode = useCallback((mode: ThemeMode) => {
    setColorModeState(mode);
    
    // Save to storage if storageKey is provided
    if (storageKey) {
      localStorage.setItem(storageKey, mode);
    }
  }, [storageKey]);
  
  // Toggle between light and dark modes
  const toggleColorMode = useCallback(() => {
    if (colorMode === "light") {
      setColorMode("dark");
    } else if (colorMode === "dark") {
      setColorMode("system");
    } else {
      setColorMode("light");
    }
  }, [colorMode, setColorMode]);
  
  // Effect to detect system color scheme changes
  useEffect(() => {
    // Check for system preference
    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (event: MediaQueryListEvent | MediaQueryList): void => {
      setSystemPrefersDark(event.matches);
    };
    
    // Set initial value
    handleChange(mediaQuery);
    
    // Listen for changes
    // Modern browsers all support addEventListener, so we'll always use that
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  // Effect to load saved color mode from storage
  useEffect(() => {
    if (storageKey) {
      const savedMode = localStorage.getItem(storageKey) as ThemeMode | null;
      
      if (savedMode && (savedMode === "light" || savedMode === "dark" || savedMode === "system")) {
        setColorModeState(savedMode);
      }
    }
  }, [storageKey]);
  
  // Effect to apply color mode to document root
  useEffect(() => {
    const root = document.documentElement;
    
    if (resolvedColorMode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
      
      // Apply data attribute for CSS targeting
      root.dataset.colorMode = "dark";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      
      // Apply data attribute for CSS targeting
      root.dataset.colorMode = "light";
    }
    
    // Apply user preference as data attribute
    root.dataset.userColorMode = colorMode;
  }, [resolvedColorMode, colorMode]);
  
  // Apply transition class when transitions are enabled
  useEffect(() => {
    const root = document.documentElement;
    
    if (transitionsEnabled && settings?.transition) {
      root.classList.add("theme-transition-enabled");
      root.style.setProperty(
        "--theme-transition-duration", 
        `${settings.transition.duration || 200}ms`
      );
      root.style.setProperty(
        "--theme-transition-easing", 
        settings.transition.easing || "ease"
      );
    } else {
      root.classList.remove("theme-transition-enabled");
    }
  }, [transitionsEnabled, settings?.transition]);
  
  // Create context value
  const contextValue = useMemo<ColorModeContextValue>(() => ({
    colorMode,
    resolvedColorMode,
    setColorMode,
    toggleColorMode,
    settings,
    activeThemePreset,
    systemPrefersDark,
    transitionsEnabled,
    setTransitionsEnabled,
  }), [
    colorMode,
    resolvedColorMode,
    setColorMode,
    toggleColorMode,
    settings,
    activeThemePreset,
    systemPrefersDark,
    transitionsEnabled,
  ]);
  
  return (
    <ColorModeContext.Provider value={contextValue}>
      {children}
    </ColorModeContext.Provider>
  );
}

/**
 * Hook to access the color mode context
 * @returns ColorModeContextValue - The current color mode context value
 */
export function useColorMode(): ColorModeContextValue {
  const context = useContext(ColorModeContext);
  
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  
  return context;
}