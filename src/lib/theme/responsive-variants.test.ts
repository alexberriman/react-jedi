/**
 * Tests for Responsive Variants System
 */

import { describe, it, expect } from "vitest";
import {
  createResponsiveToken,
  generateResponsiveCssVars,
  createResponsiveCategory,
  resolveTokenAtBreakpoint,
  applyResponsiveToken,
  createResponsiveColorToken,
  createResponsiveSpacingToken,
  createResponsiveTypographyToken,
  type ResponsiveDesignToken,
} from "./responsive-variants";
import type { DesignToken } from "./theme-tokens";
import type { ThemeSpecification } from "../../types/schema/specification";
import { DEFAULT_BREAKPOINTS } from "./responsive-system";

function transformer(value: number): string {
  return `${value}px`;
}

describe("Responsive Variants System", () => {
  const mockTheme: ThemeSpecification = {
    breakpoints: DEFAULT_BREAKPOINTS as Record<string, string>,
  };

  const mockBaseToken: DesignToken<string> = {
    id: "primary-500",
    name: "Primary 500",
    value: "#3B82F6",
    category: "color",
    cssVariable: "--color-primary-500",
    path: "colors.primary.500",
  };

  describe("createResponsiveToken", () => {
    it("should create responsive token from single value", () => {
      const result = createResponsiveToken(mockBaseToken, "#3B82F6", DEFAULT_BREAKPOINTS);

      expect(result).toEqual({
        ...mockBaseToken,
        value: { base: "#3B82F6" },
        responsive: false,
      });
    });

    it("should create responsive token from responsive object", () => {
      const responsiveValue = {
        base: "#3B82F6",
        md: "#2563EB",
        lg: "#1D4ED8",
      };

      const result = createResponsiveToken(mockBaseToken, responsiveValue, DEFAULT_BREAKPOINTS);

      expect(result).toEqual({
        ...mockBaseToken,
        value: responsiveValue,
        responsive: true,
      });
    });

    it("should create responsive token from array", () => {
      const responsiveValue = ["#3B82F6", "#2563EB", "#1D4ED8"];

      const result = createResponsiveToken(mockBaseToken, responsiveValue, DEFAULT_BREAKPOINTS);

      expect(result.value).toEqual({
        base: "#3B82F6",
        xs: "#2563EB",
        sm: "#1D4ED8",
      });
      expect(result.responsive).toBe(true);
    });
  });

  describe("generateResponsiveCssVars", () => {
    it("should generate CSS variables for single value", () => {
      const token: ResponsiveDesignToken<string> = {
        ...mockBaseToken,
        value: { base: "#3B82F6" },
        responsive: false,
      };

      const result = generateResponsiveCssVars(token, DEFAULT_BREAKPOINTS);

      expect(result).toEqual({
        "--color-primary-500": "#3B82F6",
      });
    });

    it("should generate CSS variables for responsive values", () => {
      const token: ResponsiveDesignToken<string> = {
        ...mockBaseToken,
        value: {
          base: "#3B82F6",
          md: "#2563EB",
          lg: "#1D4ED8",
        },
        responsive: true,
      };

      const result = generateResponsiveCssVars(token, DEFAULT_BREAKPOINTS);

      expect(result).toEqual({
        "--color-primary-500": "#3B82F6",
        "--color-primary-500-md": "#2563EB",
        "--color-primary-500-lg": "#1D4ED8",
      });
    });

    it("should use transformer function if provided", () => {
      const token: ResponsiveDesignToken<number> = {
        id: "spacing-4",
        name: "Spacing 4",
        value: { base: 16 },
        category: "spacing",
        cssVariable: "--spacing-4",
        path: "spacing.4",
        responsive: false,
      };

      const result = generateResponsiveCssVars(token, DEFAULT_BREAKPOINTS, transformer);

      expect(result).toEqual({
        "--spacing-4": "16px",
      });
    });
  });

  describe("createResponsiveCategory", () => {
    const mockTokens: Record<string, DesignToken<string>> = {
      primary: {
        id: "primary",
        name: "Primary",
        value: "#3B82F6",
        category: "color",
        cssVariable: "--color-primary",
        path: "colors.primary",
      },
      secondary: {
        id: "secondary",
        name: "Secondary",
        value: "#10B981",
        category: "color",
        cssVariable: "--color-secondary",
        path: "colors.secondary",
      },
    };

    it("should create responsive category from tokens", () => {
      const variants = {
        primary: {
          base: "#3B82F6",
          md: "#2563EB",
        },
      };

      const result = createResponsiveCategory(mockTokens, variants, DEFAULT_BREAKPOINTS);

      expect(result.primary.value).toEqual(variants.primary);
      expect(result.primary.responsive).toBe(true);
      expect(result.secondary.value).toEqual({ base: "#10B981" });
      expect(result.secondary.responsive).toBe(false);
    });
  });

  describe("resolveTokenAtBreakpoint", () => {
    const responsiveToken: ResponsiveDesignToken<string> = {
      ...mockBaseToken,
      value: {
        base: "#3B82F6",
        md: "#2563EB",
        lg: "#1D4ED8",
      },
      responsive: true,
    };

    it("should resolve value at specific breakpoint", () => {
      expect(resolveTokenAtBreakpoint(responsiveToken, "md", DEFAULT_BREAKPOINTS)).toBe("#2563EB");
    });

    it("should fallback to smaller breakpoint", () => {
      expect(resolveTokenAtBreakpoint(responsiveToken, "sm", DEFAULT_BREAKPOINTS)).toBe("#3B82F6");
    });

    it("should return undefined if no value found", () => {
      const token: ResponsiveDesignToken<string> = {
        ...mockBaseToken,
        value: { md: "#2563EB" },
        responsive: true,
      };

      expect(resolveTokenAtBreakpoint(token, "sm", DEFAULT_BREAKPOINTS)).toBeUndefined();
    });
  });

  describe("applyResponsiveToken", () => {
    const responsiveToken: ResponsiveDesignToken<string> = {
      ...mockBaseToken,
      value: {
        base: "#3B82F6",
        md: "#2563EB",
      },
      responsive: true,
    };

    it("should apply token to CSS property", () => {
      const result = applyResponsiveToken(responsiveToken, "color", (v) => v, DEFAULT_BREAKPOINTS);

      expect(result).toEqual({
        color: "#3B82F6",
        "@media (min-width: 768px)": { color: "#2563EB" },
      });
    });

    it("should use transformer function", () => {
      const numberToken: ResponsiveDesignToken<number> = {
        id: "spacing",
        name: "Spacing",
        value: { base: 4, md: 8 },
        category: "spacing",
        cssVariable: "--spacing",
        path: "spacing",
        responsive: true,
      };

      const result = applyResponsiveToken(
        numberToken,
        "margin",
        (v) => `${v * 4}px`,
        DEFAULT_BREAKPOINTS
      );

      expect(result).toEqual({
        margin: "16px",
        "@media (min-width: 768px)": { margin: "32px" },
      });
    });
  });

  describe("Utility Functions", () => {
    describe("createResponsiveColorToken", () => {
      it("should create responsive color token", () => {
        const result = createResponsiveColorToken(
          "primary",
          "Primary Color",
          { base: "#3B82F6", md: "#2563EB" },
          mockTheme
        );

        expect(result.category).toBe("color");
        expect(result.cssVariable).toBe("--color-primary");
        expect(result.value).toEqual({ base: "#3B82F6", md: "#2563EB" });
        expect(result.responsive).toBe(true);
      });
    });

    describe("createResponsiveSpacingToken", () => {
      it("should create responsive spacing token", () => {
        const result = createResponsiveSpacingToken(
          "4",
          "Spacing 4",
          { base: "1rem", md: "1.5rem" },
          mockTheme
        );

        expect(result.category).toBe("spacing");
        expect(result.cssVariable).toBe("--spacing-4");
        expect(result.value).toEqual({ base: "1rem", md: "1.5rem" });
        expect(result.responsive).toBe(true);
      });
    });

    describe("createResponsiveTypographyToken", () => {
      it("should create responsive typography token", () => {
        const result = createResponsiveTypographyToken(
          "body",
          "Body Text",
          { base: "14px", md: "16px" },
          mockTheme
        );

        expect(result.category).toBe("typography");
        expect(result.cssVariable).toBe("--typography-body");
        expect(result.value).toEqual({ base: "14px", md: "16px" });
        expect(result.responsive).toBe(true);
      });
    });
  });
});
