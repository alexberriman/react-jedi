/**
 * AdvancedModeToggle Component
 *
 * A visually stunning, animated toggle for switching between light, dark, and system color modes.
 * Features slick micro-animations, glass morphism, and modern design aesthetics.
 */

import React, { useEffect, useState } from "react";
import { useColorMode } from "./color-mode-provider";
import type { ThemeMode } from "../../../types/schema/theme";

/**
 * AdvancedModeToggle Props Interface
 */
export interface AdvancedModeToggleProps {
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Size of the toggle (default: "md")
   */
  size?: "sm" | "md" | "lg" | "xl";
  
  /**
   * Visual style variant
   */
  variant?: "default" | "glass" | "solid" | "minimal" | "pill";
  
  /**
   * Whether to show labels
   */
  showLabels?: boolean;
  
  /**
   * Animation style
   */
  animation?: "slide" | "fade" | "scale" | "morph";
  
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
 * Enhanced Sun Icon with animations
 */
const EnhancedSunIcon = () => (
  <svg
    className="icon-sun"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle className="sun-center" cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
    <g className="sun-rays">
      <path d="M12 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 21V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.95 7.05L18.364 5.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.636 18.364L7.05 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.95 16.95L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.636 5.636L7.05 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

/**
 * Enhanced Moon Icon with animations
 */
const EnhancedMoonIcon = () => (
  <svg
    className="icon-moon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="moon-body"
      d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.9329C2.5 17.2568 6.7432 21.5 12.0671 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <g className="moon-stars">
      <path
        className="moon-star moon-star-1"
        d="M9.5 3.5L10 2L10.5 3.5L12 4L10.5 4.5L10 6L9.5 4.5L8 4L9.5 3.5Z"
        fill="currentColor"
      />
      <path
        className="moon-star moon-star-2"
        d="M18.5 7.5L19 6L19.5 7.5L21 8L19.5 8.5L19 10L18.5 8.5L17 8L18.5 7.5Z"
        fill="currentColor"
      />
      <path
        className="moon-star moon-star-3"
        d="M16.5 14.5L17 13L17.5 14.5L19 15L17.5 15.5L17 17L16.5 15.5L15 15L16.5 14.5Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

/**
 * Enhanced System Icon with animations
 */
const EnhancedSystemIcon = () => (
  <svg
    className="icon-system"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      className="system-screen"
      x="3"
      y="4"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      className="system-base"
      d="M8 20H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      className="system-stand"
      d="M12 16V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      className="system-day-night"
      d="M7.5 9.5C7.5 8.39543 8.39543 7.5 9.5 7.5H10.5C11.6046 7.5 12.5 8.39543 12.5 9.5V9.5C12.5 10.6046 11.6046 11.5 10.5 11.5H9.5C8.39543 11.5 7.5 10.6046 7.5 9.5V9.5Z"
      fill="currentColor"
    />
    <path
      className="system-day-night"
      d="M14.5 11.5C14.5 10.3954 15.3954 9.5 16.5 9.5H16.5C17.6046 9.5 18.5 10.3954 18.5 11.5V11.5C18.5 12.6046 17.6046 13.5 16.5 13.5H16.5C15.3954 13.5 14.5 12.6046 14.5 11.5V11.5Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Get display name for a color mode
 */
function getModeName(mode: ThemeMode): string {
  switch (mode) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    case "system":
      return "Auto";
    default:
      return "";
  }
}

/**
 * AdvancedModeToggle Component
 * 
 * A visually stunning toggle for switching between color modes.
 */
export function AdvancedModeToggle({
  className = "",
  size = "md",
  variant = "default",
  showLabels = false,
  animation = "slide",
  modes = ["light", "dark", "system"],
  onChange,
}: AdvancedModeToggleProps): React.ReactElement {
  const { colorMode, setColorMode, resolvedColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Prevent hydration mismatch by rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Handle mode change with animation
  const handleModeChange = () => {
    // Start animation
    setIsAnimating(true);
    
    // Calculate next mode
    const currentIndex = modes.indexOf(colorMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    
    // Set after short delay for animation
    setTimeout(() => {
      setColorMode(nextMode);
      
      if (onChange) {
        onChange(nextMode);
      }
      
      // End animation after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 150);
  };
  
  // Size classes based on the size prop
  const sizeClasses = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
    xl: "h-16 text-lg",
  }[size];
  
  // Width classes based on showLabels and size
  const widthClasses = showLabels ? {
    sm: "w-28",
    md: "w-32",
    lg: "w-36",
    xl: "w-44",
  }[size] : {
    sm: "w-8",
    md: "w-10",
    lg: "w-12",
    xl: "w-16",
  }[size];
  
  // Variant-based classes
  const variantClasses = {
    default: "bg-background border border-input shadow-sm hover:border-accent",
    glass: "backdrop-blur-md bg-background/50 border border-white/20 shadow-lg",
    solid: "bg-primary text-primary-foreground shadow",
    minimal: "bg-transparent hover:bg-background hover:border-input hover:border",
    pill: "rounded-full bg-accent hover:bg-accent/90",
  }[variant];
  
  // Animation classes
  const animationClass = `anim-${animation}`;
  
  // Icons based on color mode
  const getIcon = (mode: ThemeMode) => {
    switch (mode) {
      case "light":
        return <EnhancedSunIcon />;
      case "dark":
        return <EnhancedMoonIcon />;
      case "system":
        return <EnhancedSystemIcon />;
      default:
        return null;
    }
  };
  
  // If not mounted yet, return an empty placeholder
  if (!mounted) {
    return <div className={`${widthClasses} ${sizeClasses} opacity-0`} />;
  }
  
  return (
    <button
      type="button"
      onClick={handleModeChange}
      disabled={isAnimating}
      className={`
        color-mode-toggle-advanced
        ${widthClasses}
        ${sizeClasses}
        ${variantClasses}
        ${animationClass}
        ${isAnimating ? "animating" : ""}
        relative overflow-hidden inline-flex items-center justify-center
        rounded-md transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${className}
      `}
      aria-label={`Switch color mode, current mode: ${getModeName(colorMode)}`}
      data-color-mode={colorMode}
      data-resolved-mode={resolvedColorMode}
    >
      {/* Fancy background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/10 dark:from-background/10 dark:to-transparent"></div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 glow-effect glow-${colorMode}`}></div>
      
      {/* Icon container */}
      <div className="relative flex items-center justify-center">
        <div className={`icon-wrapper ${colorMode}`}>
          {getIcon(colorMode)}
        </div>
        
        {/* Show label if enabled */}
        {showLabels && (
          <span className="ml-2 font-medium">{getModeName(colorMode)}</span>
        )}
      </div>
    </button>
  );
}