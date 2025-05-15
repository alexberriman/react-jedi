/**
 * ColorModeToggle Component
 *
 * A button component that toggles between light, dark, and system color modes.
 * Includes beautiful, modern icons and smooth transitions.
 */

import React, { useEffect, useState } from "react";
import { useColorMode } from "./color-mode-provider";
import type { ThemeMode } from "../../../types/schema/theme";

/**
 * ColorModeToggle Props Interface
 */
export interface ColorModeToggleProps {
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Size of the toggle button (default: "md")
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Button type (default: "button")
   */
  type?: "button";
  
  /**
   * A11y label for the button
   */
  ariaLabel?: string;
  
  /**
   * Whether to show a text label
   */
  showLabel?: boolean;
  
  /**
   * Custom icon for light mode (optional)
   */
  lightIcon?: React.ReactNode;
  
  /**
   * Custom icon for dark mode (optional)
   */
  darkIcon?: React.ReactNode;
  
  /**
   * Custom icon for system mode (optional)
   */
  systemIcon?: React.ReactNode;
  
  /**
   * Available modes to cycle through
   */
  modes?: ThemeMode[];
  
  /**
   * Callback when mode changes
   */
  onChange?: (mode: ThemeMode) => void;
}

/**
 * Sun icon for light mode
 */
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="color-mode-icon sun-icon"
  >
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="M4.93 4.93l1.41 1.41"></path>
    <path d="M17.66 17.66l1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="M6.34 17.66l-1.41 1.41"></path>
    <path d="M19.07 4.93l-1.41 1.41"></path>
  </svg>
);

/**
 * Moon icon for dark mode
 */
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="color-mode-icon moon-icon"
  >
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"></path>
  </svg>
);

/**
 * Computer icon for system mode
 */
const SystemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="color-mode-icon system-icon"
  >
    <rect x="2" y="3" width="20" height="14" rx="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

/**
 * Get label text for a color mode
 */
function getModeLabel(mode: ThemeMode): string {
  switch (mode) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    case "system":
      return "System";
    default:
      return "";
  }
}

/**
 * ColorModeToggle Component
 * 
 * A beautiful toggle button that switches between light, dark, and system color modes.
 */
export function ColorModeToggle({
  className = "",
  size = "md",
  type = "button",
  ariaLabel = "Toggle color mode",
  showLabel = false,
  lightIcon,
  darkIcon,
  systemIcon,
  modes = ["light", "dark", "system"],
  onChange,
}: ColorModeToggleProps): React.ReactElement {
  const { colorMode, setColorMode, resolvedColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className={`color-mode-toggle-placeholder ${size}`} />;
  }
  
  // Get the current mode's icon
  const getIcon = () => {
    switch (colorMode) {
      case "light":
        return lightIcon || <SunIcon />;
      case "dark":
        return darkIcon || <MoonIcon />;
      case "system":
        return systemIcon || <SystemIcon />;
      default:
        return null;
    }
  };
  
  // Handle toggle click
  const handleToggle = () => {
    const currentIndex = modes.indexOf(colorMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const newMode = modes[nextIndex];
    
    setColorMode(newMode);
    
    if (onChange) {
      onChange(newMode);
    }
  };
  
  // Size-based classes
  const sizeClass = {
    sm: "text-xs p-1",
    md: "text-sm p-2",
    lg: "text-base p-3",
  }[size];
  
  return (
    <button
      type={type}
      onClick={handleToggle}
      className={`
        color-mode-toggle 
        inline-flex items-center justify-center
        rounded-md bg-background
        border border-input hover:bg-accent hover:text-accent-foreground
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${sizeClass}
        ${className}
      `}
      aria-label={ariaLabel}
      title={`Current mode: ${getModeLabel(colorMode)}`}
      data-color-mode={colorMode}
      data-resolved-mode={resolvedColorMode}
    >
      <span className="color-mode-icon-wrapper">
        {getIcon()}
      </span>
      
      {showLabel && (
        <span className="ml-2 color-mode-label">
          {getModeLabel(colorMode)}
        </span>
      )}
    </button>
  );
}