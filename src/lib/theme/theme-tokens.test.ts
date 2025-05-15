/**
 * Theme Token System Tests
 *
 * This file contains tests for the theme token system.
 */

import { describe, it, expect } from "vitest";
import { 
  extractTokensFromTheme, 
  createTokenCollection,
  convertThemeTokens
} from "./theme-tokens";
import type { ThemeSpecification } from "../../types/schema/specification";
import type { ThemeToken } from "../../types/schema/theme";

describe("Theme Token System", () => {
  // Sample theme for testing
  const sampleTheme: ThemeSpecification = {
    colors: {
      primary: {
        "50": "#f0f9ff",
        "500": "#3b82f6",
        "900": "#1e3a8a"
      },
      success: {
        "500": "#10b981"
      },
      text: {
        primary: "#111827",
        secondary: "#6b7280"
      }
    },
    typography: {
      fontSizes: {
        xs: "0.75rem",
        base: "1rem",
        xl: "1.25rem"
      },
      fontWeights: {
        normal: 400,
        bold: 700
      }
    },
    spacing: {
      "1": "0.25rem",
      "4": "1rem",
      "8": "2rem"
    },
    borderRadius: {
      sm: "0.125rem",
      default: "0.25rem",
      xl: "0.75rem"
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    }
  };

  describe("extractTokensFromTheme", () => {
    it("should extract tokens from a theme specification", () => {
      const tokens = extractTokensFromTheme(sampleTheme);
      
      // Check we have the expected number of tokens
      expect(tokens.length).toBeGreaterThan(10);
      
      // Check expected token structure
      const primaryToken = tokens.find((t) => t.path === "colors.primary.500");
      expect(primaryToken).toBeDefined();
      expect(primaryToken?.value).toBe("#3b82f6");
      expect(primaryToken?.category).toBe("color");
      expect(primaryToken?.cssVariable).toBe("--theme-colors-primary-500");
      
      // Check typography token
      const fontSizeToken = tokens.find((t) => t.path === "typography.fontSizes.base");
      expect(fontSizeToken).toBeDefined();
      expect(fontSizeToken?.value).toBe("1rem");
      expect(fontSizeToken?.category).toBe("typography");
    });
    
    it("should use custom prefix for CSS variables", () => {
      const tokens = extractTokensFromTheme(sampleTheme, "--jedi");
      
      const primaryToken = tokens.find((t) => t.path === "colors.primary.500");
      expect(primaryToken?.cssVariable).toBe("--jedi-colors-primary-500");
    });
  });
  
  describe("createTokenCollection", () => {
    it("should organize tokens by category", () => {
      const tokens = extractTokensFromTheme(sampleTheme);
      const collection = createTokenCollection(tokens);
      
      // Check category collections
      expect(Object.keys(collection.colors).length).toBeGreaterThan(0);
      expect(Object.keys(collection.typography).length).toBeGreaterThan(0);
      expect(Object.keys(collection.spacing).length).toBeGreaterThan(0);
      
      // Check token lookup by path
      const primaryToken = collection.getByPath("colors.primary.500");
      expect(primaryToken).toBeDefined();
      expect(primaryToken?.value).toBe("#3b82f6");
      
      // Check all tokens array
      expect(collection.all.length).toBe(tokens.length);
    });
  });
  
  describe("convertThemeTokens", () => {
    it("should convert ThemeTokens to DesignTokens", () => {
      const themeTokens: ThemeToken[] = [
        {
          token: "colors.primary.500",
          value: "#3b82f6",
          category: "color"
        },
        {
          token: "typography.fontSizes.base",
          value: "1rem",
          category: "typography",
          description: "Base font size"
        }
      ];
      
      const designTokens = convertThemeTokens(themeTokens);
      
      expect(designTokens.length).toBe(2);
      expect(designTokens[0].path).toBe("colors.primary.500");
      expect(designTokens[0].value).toBe("#3b82f6");
      expect(designTokens[0].cssVariable).toBe("--theme-colors-primary-500");
      
      expect(designTokens[1].description).toBe("Base font size");
    });
  });
});