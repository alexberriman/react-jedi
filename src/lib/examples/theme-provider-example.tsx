/**
 * ThemeProvider Example
 * 
 * This file provides an example of how to use the ThemeProvider component
 * with the useTheme hook to create a themed application.
 */

import React from "react";
import { ThemeProvider, useTheme } from "../theme";
import type { ThemeSpecification } from "../../types/schema/specification";

// Define a sample theme
const sampleTheme: ThemeSpecification = {
  colors: {
    primary: {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c4a6e",
    },
    secondary: {
      "50": "#f5f3ff",
      "100": "#ede9fe",
      "200": "#ddd6fe",
      "300": "#c4b5fd",
      "400": "#a78bfa",
      "500": "#8b5cf6",
      "600": "#7c3aed",
      "700": "#6d28d9",
      "800": "#5b21b6",
      "900": "#4c1d95",
    },
    neutral: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717",
    },
  },
  typography: {
    fontFamilies: {
      sans: ["Inter", "system-ui", "sans-serif"],
      serif: ["Georgia", "serif"],
      mono: ["Fira Code", "monospace"],
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
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  spacing: {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
    "40": "10rem",
    "48": "12rem",
    "56": "14rem",
    "64": "16rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none",
  },
};

/**
 * Example component that uses the useTheme hook
 */
const ThemedComponent: React.FC = () => {
  const { theme, colorMode, toggleColorMode, getValue, getCssVar } = useTheme();
  
  const primaryColor = getValue<string>("colors.primary.500", "#000000");
  const fontFamily = getValue<string[]>("typography.fontFamilies.sans", ["sans-serif"]).join(", ");
  
  return (
    <div
      style={{
        fontFamily,
        padding: "2rem",
        backgroundColor: getValue("colors.neutral.100", "#f5f5f5"),
        color: getValue("colors.neutral.900", "#171717"),
        borderRadius: getValue("borderRadius.lg", "0.5rem"),
        boxShadow: getValue("shadows.lg", "none"),
      }}
    >
      <h1 style={{ color: primaryColor }}>Themed Component</h1>
      <p>Current theme mode: {colorMode || "system"}</p>
      <p>Primary color: {primaryColor}</p>
      <p>Font family: {fontFamily}</p>
      
      <div 
        style={{ 
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: "var(" + getCssVar("colors.primary.100") + ")",
          borderRadius: "var(" + getCssVar("borderRadius.md") + ")",
        }}
      >
        <p>This box uses CSS variables for styling.</p>
      </div>
      
      <button 
        onClick={toggleColorMode}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: primaryColor,
          color: "white",
          border: "none",
          borderRadius: getValue("borderRadius.md", "0.375rem"),
          cursor: "pointer",
        }}
      >
        Toggle Theme Mode
      </button>
    </div>
  );
};

/**
 * Example App showing how to use ThemeProvider
 */
const ThemeProviderExample: React.FC = () => {
  return (
    <ThemeProvider theme={sampleTheme} defaultColorMode="light">
      <ThemedComponent />
    </ThemeProvider>
  );
};

export default ThemeProviderExample;