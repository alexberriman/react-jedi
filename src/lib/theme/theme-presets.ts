/**
 * Theme Presets
 *
 * This file contains predefined theme configurations using the color system.
 * These presets can be used as starting points for custom themes.
 */

import type { ThemePreset } from "../../types/schema/theme";
import type { ThemeSpecification } from "../../types/schema/specification";
import { generateColorPalette } from "./color-system";
import { createBorderRadiusScale } from "./border-radius";

/**
 * Default theme preset with blue primary color
 */
export const defaultTheme: ThemePreset = {
  id: "default",
  name: "Default",
  isDefault: true,
  theme: {
    colors: generateColorPalette({
      primary: { baseColor: "#0EA5E9" }, // Sky blue
      secondary: { baseColor: "#6366F1" }, // Indigo
      accent: { baseColor: "#EC4899" }, // Pink
      neutral: { baseColor: "#6B7280", saturation: -70 }, // Gray
      semantic: {
        success: { baseColor: "#10B981" }, // Emerald
        warning: { baseColor: "#F59E0B" }, // Amber
        error: { baseColor: "#EF4444" }, // Red
        info: { baseColor: "#3B82F6" }, // Blue
      }
    }),
    typography: {
      fontFamilies: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
        mono: ["Fira Code", "Courier New", "monospace"],
        display: ["Montserrat", "system-ui", "sans-serif"]
      },
      fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
        "8xl": "6rem",
        "9xl": "8rem"
      },
      fontWeights: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900
      },
      lineHeights: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2
      },
      letterSpacings: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
      }
    },
    spacing: {
      px: "1px",
      "0": "0",
      "0.5": "0.125rem",
      "1": "0.25rem",
      "1.5": "0.375rem",
      "2": "0.5rem",
      "2.5": "0.625rem",
      "3": "0.75rem",
      "3.5": "0.875rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "9": "2.25rem",
      "10": "2.5rem",
      "11": "2.75rem",
      "12": "3rem",
      "14": "3.5rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem",
      "28": "7rem",
      "32": "8rem",
      "36": "9rem",
      "40": "10rem",
      "44": "11rem",
      "48": "12rem",
      "52": "13rem",
      "56": "14rem",
      "60": "15rem",
      "64": "16rem",
      "72": "18rem",
      "80": "20rem",
      "96": "24rem"
    },
    borderRadius: createBorderRadiusScale({
      xs: "0.125rem",
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
    }),
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none"
    },
    breakpoints: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    zIndices: {
      auto: 0,
      "0": 0,
      "10": 10,
      "20": 20,
      "30": 30,
      "40": 40,
      "50": 50,
      "100": 100,
      "1000": 1000
    },
    animations: {
      spin: {
        duration: "1s",
        easing: "linear",
        iterations: Infinity
      },
      ping: {
        duration: "1s",
        easing: "cubic-bezier(0, 0, 0.2, 1)",
        iterations: Infinity
      },
      pulse: {
        duration: "2s",
        easing: "ease-in-out",
        iterations: Infinity
      },
      bounce: {
        duration: "1s",
        easing: "cubic-bezier(0.8, 0, 1, 1)",
        iterations: Infinity,
        direction: "alternate"
      }
    }
  }
};

/**
 * Creates the dark mode version of a theme
 * @param theme - Base theme specification
 * @returns Dark mode version of the theme
 */
export function createDarkTheme(theme: ThemeSpecification): ThemeSpecification {
  // Generate dark colors based on the light colors
  const darkColors = generateColorPalette({
    primary: { 
      baseColor: theme.colors?.primary?.["500"] || "#0EA5E9",
      temperature: 10,
      saturation: 5 
    },
    secondary: { 
      baseColor: theme.colors?.secondary?.["500"] || "#6366F1",
      temperature: -10,
      saturation: 5
    },
    accent: { 
      baseColor: theme.colors?.accent?.["500"] || "#EC4899",
      saturation: 10
    },
    // For dark mode, we make the neutral scale darker
    neutral: { 
      baseColor: "#121212", // Very dark gray for dark mode
      saturation: -90, 
      contrast: 0.8 
    },
    semantic: {
      success: { 
        baseColor: theme.colors?.success?.["500"] || "#10B981",
        saturation: 10
      },
      warning: { 
        baseColor: theme.colors?.warning?.["500"] || "#F59E0B",
        saturation: 10
      },
      error: { 
        baseColor: theme.colors?.error?.["500"] || "#EF4444",
        saturation: 10
      },
      info: { 
        baseColor: theme.colors?.info?.["500"] || "#3B82F6",
        saturation: 10
      }
    }
  });

  // Create background and text colors specific to dark mode
  darkColors.background = {
    default: darkColors.neutral?.["900"] || "#121212",
    paper: darkColors.neutral?.["800"] || "#1E1E1E",
    subtle: darkColors.neutral?.["700"] || "#2D2D2D",
    primaryLight: darkColors.primary?.["900"] || "#0C4A6E", 
    primary: darkColors.primary?.["800"] || "#075985",
    primaryBold: darkColors.primary?.["700"] || "#0369A1",
    success: darkColors.success?.["900"] || "#064E3B",
    warning: darkColors.warning?.["900"] || "#78350F",
    error: darkColors.error?.["900"] || "#7F1D1D",
    info: darkColors.info?.["900"] || "#1E3A8A",
    inverse: darkColors.neutral?.["50"] || "#F9FAFB",
  };

  darkColors.text = {
    primary: darkColors.neutral?.["50"] || "#F9FAFB",
    secondary: darkColors.neutral?.["200"] || "#E5E7EB",
    tertiary: darkColors.neutral?.["400"] || "#9CA3AF",
    disabled: darkColors.neutral?.["600"] || "#4B5563",
    brand: darkColors.primary?.["300"] || "#7DD3FC",
    success: darkColors.success?.["300"] || "#6EE7B7",
    warning: darkColors.warning?.["300"] || "#FCD34D",
    error: darkColors.error?.["300"] || "#FCA5A5",
    info: darkColors.info?.["300"] || "#93C5FD",
    inverse: darkColors.neutral?.["900"] || "#111827",
  };

  darkColors.border = {
    default: darkColors.neutral?.["700"] || "#2D2D2D",
    strong: darkColors.neutral?.["600"] || "#4B5563",
    subtle: darkColors.neutral?.["800"] || "#1E1E1E",
    primary: darkColors.primary?.["700"] || "#0369A1",
    success: darkColors.success?.["700"] || "#047857",
    warning: darkColors.warning?.["700"] || "#B45309",
    error: darkColors.error?.["700"] || "#B91C1C",
    info: darkColors.info?.["700"] || "#1D4ED8",
    focus: darkColors.primary?.["400"] || "#38BDF8",
  };

  return {
    ...theme,
    colors: darkColors,
    shadows: {
      ...theme.shadows,
      default: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
    }
  };
}

/**
 * Additional theme presets
 */
export const themePresets: ThemePreset[] = [
  defaultTheme,
  {
    id: "purple",
    name: "Purple",
    theme: {
      ...defaultTheme.theme,
      colors: generateColorPalette({
        primary: { baseColor: "#8B5CF6" }, // Violet
        secondary: { baseColor: "#EC4899" }, // Pink
        accent: { baseColor: "#10B981" }, // Emerald
        neutral: { baseColor: "#6B7280", saturation: -70 },
      })
    }
  },
  {
    id: "green",
    name: "Green",
    theme: {
      ...defaultTheme.theme,
      colors: generateColorPalette({
        primary: { baseColor: "#10B981" }, // Emerald
        secondary: { baseColor: "#3B82F6" }, // Blue
        accent: { baseColor: "#F59E0B" }, // Amber
        neutral: { baseColor: "#6B7280", saturation: -70 },
      })
    }
  },
  {
    id: "red",
    name: "Red",
    theme: {
      ...defaultTheme.theme,
      colors: generateColorPalette({
        primary: { baseColor: "#EF4444" }, // Red
        secondary: { baseColor: "#8B5CF6" }, // Violet
        accent: { baseColor: "#10B981" }, // Emerald
        neutral: { baseColor: "#6B7280", saturation: -70 },
      })
    }
  },
  {
    id: "monochrome",
    name: "Monochrome",
    theme: {
      ...defaultTheme.theme,
      colors: generateColorPalette({
        primary: { baseColor: "#333333", saturation: -100 }, // Pure gray
        secondary: { baseColor: "#666666", saturation: -100 },
        accent: { baseColor: "#000000", saturation: -100 },
        neutral: { baseColor: "#6B7280", saturation: -100 },
      })
    }
  }
];

/**
 * Generates a custom theme based on a primary color
 * @param primaryColor - Primary color in hex format
 * @returns Custom theme specification
 */
export function generateCustomTheme(primaryColor: string): ThemeSpecification {
  // Convert to HSL to extract hue
  const { h: primaryHue } = hexToHslHelper(primaryColor);
  
  // Create complementary and analogous colors
  const secondaryHue = (primaryHue + 180) % 360; // Complementary
  const accentHue = (primaryHue + 90) % 360; // Analogous
  
  // Convert back to hex
  const secondaryColor = hslToHexHelper({ h: secondaryHue, s: 75, l: 60 });
  const accentColor = hslToHexHelper({ h: accentHue, s: 75, l: 60 });
  
  return {
    ...defaultTheme.theme,
    colors: generateColorPalette({
      primary: { baseColor: primaryColor },
      secondary: { baseColor: secondaryColor },
      accent: { baseColor: accentColor },
      neutral: { baseColor: "#6B7280", saturation: -70 },
    })
  };
}

/**
 * Helper to convert hex to HSL
 * Simplified version for internal use - use the exported version for public API
 */
function hexToHslHelper(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  hex = hex.replace(/^#/, "");
  
  // Parse hex values
  const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  
  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      h = ((b - r) / delta + 2) * 60;
    } else {
      h = ((r - g) / delta + 4) * 60;
    }
  }
  
  // Convert saturation and lightness to percentages
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return { h, s, l };
}

/**
 * Helper to convert HSL to hex
 * Simplified version for internal use - use the exported version for public API
 */
function hslToHexHelper(hsl: { h: number; s: number; l: number }): string {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  // Calculate RGB values based on hue segment
  const rgbValues = getHslRgbValues(h, c, x);
  
  // Convert to hex
  const rHex = Math.round((rgbValues.r + m) * 255).toString(16).padStart(2, "0");
  const gHex = Math.round((rgbValues.g + m) * 255).toString(16).padStart(2, "0");
  const bHex = Math.round((rgbValues.b + m) * 255).toString(16).padStart(2, "0");
  
  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Helper function to get RGB values from HSL components
 */
function getHslRgbValues(h: number, c: number, x: number): { r: number; g: number; b: number } {
  const segment = Math.floor(h / 60) % 6;
  
  switch (segment) {
    case 0: {
      return { r: c, g: x, b: 0 };
    }
    case 1: {
      return { r: x, g: c, b: 0 };
    }
    case 2: {
      return { r: 0, g: c, b: x };
    }
    case 3: {
      return { r: 0, g: x, b: c };
    }
    case 4: {
      return { r: x, g: 0, b: c };
    }
    case 5: {
      return { r: c, g: 0, b: x };
    }
    default: {
      return { r: 0, g: 0, b: 0 };
    }
  }
}