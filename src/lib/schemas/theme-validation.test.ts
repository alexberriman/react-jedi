/**
 * Tests for theme validation utilities
 */

import { describe, it, expect } from "vitest";
import { 
  validateTheme, 
  validateEnhancedTheme, 
  mergeThemes,
  composeTheme,
  extractCssVariables,
  resolveThemeToken,
  generateThemeTokens
} from "./theme-validation";
import type { ThemeSpecification } from "../../types/schema/specification";

describe("Theme validation utilities", () => {
  // Valid base theme for testing
  const validBaseTheme: ThemeSpecification = {
    colors: {
      primary: {
        "500": "#3b82f6",
        "600": "#2563eb",
      },
      background: {
        default: "#ffffff",
        paper: "#f9fafb",
      },
      text: {
        primary: "#111827",
        secondary: "#6b7280",
      },
    },
    spacing: {
      "0": "0",
      "1": "0.25rem",
      "2": "0.5rem",
      "4": "1rem",
      "8": "2rem",
    },
    borderRadius: {
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
    },
  };

  describe("validateTheme", () => {
    it("should validate a valid theme", () => {
      const result = validateTheme(validBaseTheme);
      
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.val).toEqual(validBaseTheme);
      }
    });

    it("should return error for invalid theme", () => {
      const invalidTheme = {
        colors: {
          primary: "not-an-object",
        },
      };
      
      const result = validateTheme(invalidTheme);
      
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.val.length).toBeGreaterThan(0);
        expect(result.val[0].code).toBe("INVALID_THEME");
      }
    });
  });

  describe("validateEnhancedTheme", () => {
    it("should validate a valid enhanced theme", () => {
      const enhancedTheme = {
        ...validBaseTheme,
        colorMode: {
          defaultMode: "light",
          respectSystemPreference: true,
          light: {
            colors: {
              background: {
                default: "#ffffff",
              },
              text: {
                primary: "#111827",
              },
            },
          },
          dark: {
            colors: {
              background: {
                default: "#111827",
              },
              text: {
                primary: "#f9fafb",
              },
            },
          },
        },
      };
      
      const result = validateEnhancedTheme(enhancedTheme);
      
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.val).toEqual(enhancedTheme);
      }
    });

    it("should return error for invalid enhanced theme", () => {
      const invalidEnhancedTheme = {
        ...validBaseTheme,
        colorMode: {
          defaultMode: "invalid-mode",
          light: {
            colors: {},
          },
          dark: {
            colors: {},
          },
        },
      };
      
      const result = validateEnhancedTheme(invalidEnhancedTheme);
      
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.val.length).toBeGreaterThan(0);
      }
    });
  });

  describe("mergeThemes", () => {
    it("should merge two themes correctly", () => {
      const target = {
        colors: {
          primary: {
            "500": "#3b82f6",
          },
          background: {
            default: "#ffffff",
          },
        },
        spacing: {
          "1": "0.25rem",
        },
      };
      
      // Define more specific type for the source
      const source: Partial<typeof target> & {
        colors: {
          primary: {
            "500": string;
            "600": string;
          };
          background: {
            default: string;
          };
          accent: {
            "500": string;
          };
        };
        borderRadius: {
          sm: string;
        };
      } = {
        colors: {
          primary: {
            "500": "#3b82f6",
            "600": "#2563eb",
          },
          background: {
            default: "#ffffff",
          },
          accent: {
            "500": "#ec4899",
          },
        },
        borderRadius: {
          sm: "0.125rem",
        },
      };
      
      const expected = {
        colors: {
          primary: {
            "500": "#3b82f6",
            "600": "#2563eb",
          },
          background: {
            default: "#ffffff",
          },
          accent: {
            "500": "#ec4899",
          },
        },
        spacing: {
          "1": "0.25rem",
        },
        borderRadius: {
          sm: "0.125rem",
        },
      };
      
      const result = mergeThemes(target, source);
      
      expect(result).toEqual(expected);
    });

    it("should handle arrays by replacing them", () => {
      const target = {
        fonts: {
          sans: ["Roboto", "sans-serif"],
        },
      };
      
      const source = {
        fonts: {
          sans: ["Inter", "sans-serif"],
        },
      };
      
      const result = mergeThemes(target, source);
      
      expect(result.fonts.sans).toEqual(["Inter", "sans-serif"]);
    });
  });

  describe("composeTheme", () => {
    it("should compose a theme with merge strategy", () => {
      const parentTheme: ThemeSpecification = {
        colors: {
          primary: {
            "500": "#3b82f6",
            "600": "#2563eb",
          },
          background: {
            default: "#ffffff",
          },
        },
        spacing: {
          "1": "0.25rem",
          "2": "0.5rem",
        },
      };
      
      const childTheme = {
        colors: {
          primary: {
            "700": "#1d4ed8",
          },
          accent: {
            "500": "#ec4899",
          },
        },
        inheritance: {
          strategy: "merge" as const,
        },
      };
      
      const result = composeTheme(childTheme, parentTheme);
      
      expect(result.colors?.primary?.["500"]).toBe("#3b82f6");
      expect(result.colors?.primary?.["700"]).toBe("#1d4ed8");
      expect(result.colors?.accent?.["500"]).toBe("#ec4899");
      expect(result.spacing?.["1"]).toBe("0.25rem");
    });

    it("should handle exclude property when composing", () => {
      const parentTheme: ThemeSpecification = {
        colors: {
          primary: {
            "500": "#3b82f6",
          },
        },
        spacing: {
          "1": "0.25rem",
        },
        borderRadius: {
          sm: "0.125rem",
        },
      };
      
      const childTheme = {
        colors: {
          accent: {
            "500": "#ec4899",
          },
        },
        inheritance: {
          strategy: "merge" as const,
          exclude: ["borderRadius"],
        },
      };
      
      const result = composeTheme(childTheme, parentTheme);
      
      expect(result.colors?.primary?.["500"]).toBe("#3b82f6");
      expect(result.colors?.accent?.["500"]).toBe("#ec4899");
      expect(result.spacing?.["1"]).toBe("0.25rem");
      expect(result.borderRadius).toBeUndefined();
    });
  });

  describe("extractCssVariables", () => {
    it("should extract CSS variables from theme", () => {
      const theme: ThemeSpecification = {
        colors: {
          primary: {
            "500": "#3b82f6",
            "600": "#2563eb",
          },
          text: {
            primary: "#111827",
          },
        },
        spacing: {
          "1": "0.25rem",
        },
      };
      
      const result = extractCssVariables(theme);
      
      expect(result["--theme-colors-primary-500"]).toBe("#3b82f6");
      expect(result["--theme-colors-primary-600"]).toBe("#2563eb");
      expect(result["--theme-colors-text-primary"]).toBe("#111827");
      expect(result["--theme-spacing-1"]).toBe("0.25rem");
    });

    it("should use custom prefix when provided", () => {
      const theme: ThemeSpecification = {
        colors: {
          primary: {
            "500": "#3b82f6",
          },
        },
      };
      
      const result = extractCssVariables(theme, "--custom");
      
      expect(result["--custom-colors-primary-500"]).toBe("#3b82f6");
    });
  });

  describe("resolveThemeToken", () => {
    it("should resolve token from theme", () => {
      const theme: ThemeSpecification = {
        colors: {
          primary: {
            "500": "#3b82f6",
          },
        },
        spacing: {
          "4": "1rem",
        },
      };
      
      expect(resolveThemeToken(theme, "colors.primary.500")).toBe("#3b82f6");
      expect(resolveThemeToken(theme, "spacing.4")).toBe("1rem");
    });

    it("should return undefined for non-existent token", () => {
      const theme: ThemeSpecification = {
        colors: {
          primary: {
            "500": "#3b82f6",
          },
        },
      };
      
      expect(resolveThemeToken(theme, "colors.secondary.500")).toBeUndefined();
    });
  });

  describe("generateThemeTokens", () => {
    it("should generate tokens from theme", () => {
      const theme: ThemeSpecification = {
        colors: {
          primary: {
            "500": "#3b82f6",
          },
          text: {
            primary: "#111827",
          },
        },
        spacing: {
          "1": "0.25rem",
        },
      };
      
      const tokens = generateThemeTokens(theme);
      
      expect(tokens).toContainEqual({
        path: "colors.primary.500",
        value: "#3b82f6",
        category: "colors",
      });
      
      expect(tokens).toContainEqual({
        path: "colors.text.primary",
        value: "#111827",
        category: "colors",
      });
      
      expect(tokens).toContainEqual({
        path: "spacing.1",
        value: "0.25rem",
        category: "spacing",
      });
    });
  });
});