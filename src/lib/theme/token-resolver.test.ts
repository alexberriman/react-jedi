/**
 * Token Resolver Tests
 *
 * This file contains tests for the token resolver system.
 */

import { describe, it, expect } from "vitest";
import { createTokenResolver, resolveThemeValue, cssVar } from "./token-resolver";
import { extractTokensFromTheme, createTokenCollection } from "./theme-tokens";
import type { ThemeSpecification } from "../../types/schema/specification";

describe("Token Resolver", () => {
  // Sample theme for testing
  const sampleTheme: ThemeSpecification = {
    colors: {
      primary: {
        "500": "#3b82f6",
        "900": "#1e3a8a"
      },
      text: {
        primary: "#111827",
        secondary: "#6b7280"
      }
    },
    spacing: {
      "4": "1rem",
      "8": "2rem"
    },
    borderRadius: {
      sm: "0.125rem",
      default: "0.25rem"
    }
  };
  
  // Extract tokens for testing
  const tokens = extractTokensFromTheme(sampleTheme);
  const tokenCollection = createTokenCollection(tokens);
  
  describe("resolveThemeValue", () => {
    it("should resolve a value from a theme using a path", () => {
      expect(resolveThemeValue(sampleTheme, "colors.primary.500")).toBe("#3b82f6");
      expect(resolveThemeValue(sampleTheme, "spacing.4")).toBe("1rem");
      expect(resolveThemeValue(sampleTheme, "borderRadius.default")).toBe("0.25rem");
    });
    
    it("should return undefined for invalid paths", () => {
      expect(resolveThemeValue(sampleTheme, "invalid.path")).toBeUndefined();
      expect(resolveThemeValue(sampleTheme, "colors.accent.500")).toBeUndefined();
    });
    
    it("should handle nested paths", () => {
      expect(resolveThemeValue(sampleTheme, "colors.text")).toEqual({
        primary: "#111827",
        secondary: "#6b7280"
      });
    });
  });
  
  describe("cssVar", () => {
    it("should create CSS variable references", () => {
      expect(cssVar("colors-primary-500")).toBe("var(--colors-primary-500)");
      expect(cssVar("spacing-4", "1rem")).toBe("var(--spacing-4, 1rem)");
    });
  });
  
  describe("createTokenResolver", () => {
    const resolver = createTokenResolver(sampleTheme, tokenCollection);
    
    it("should resolve token values from paths", () => {
      expect(resolver.resolve("colors.primary.500")).toBe("#3b82f6");
      expect(resolver.resolve("spacing.4")).toBe("1rem");
      expect(resolver.resolve<string>("invalid.path", "fallback")).toBe("fallback");
    });
    
    it("should resolve CSS variables for tokens", () => {
      expect(resolver.resolveCssVar("colors.primary.500")).toBe("var(--theme-colors-primary-500)");
      expect(resolver.resolveCssVar("invalid.path", "fallback")).toBe("var(--theme-invalid-path, fallback)");
    });
    
    it("should resolve token references in values", () => {
      expect(resolver.resolveReference("token(colors.primary.500)")).toBe("#3b82f6");
      expect(resolver.resolveReference("not a token")).toBe("not a token");
      expect(resolver.resolveReference("token(invalid.path)")).toBe("token(invalid.path)");
    });
    
    it("should resolve token references in objects", () => {
      const input = {
        color: "token(colors.primary.500)",
        padding: "token(spacing.4)",
        nested: {
          borderRadius: "token(borderRadius.default)"
        },
        normal: "regular value"
      };
      
      const resolved = resolver.resolveReferences(input);
      
      expect(resolved).toEqual({
        color: "#3b82f6",
        padding: "1rem",
        nested: {
          borderRadius: "0.25rem"
        },
        normal: "regular value"
      });
    });
    
    it("should return CSS variable references when configured", () => {
      const cssResolver = createTokenResolver(sampleTheme, tokenCollection, {
        returnCssVariables: true
      });
      
      expect(cssResolver.resolve("colors.primary.500")).toBe("var(--theme-colors-primary-500)");
      
      const resolved = cssResolver.resolveReference<string>("token(colors.primary.500)");
      expect(resolved).toBe("var(--theme-colors-primary-500)");
    });
    
    it("should allow custom CSS variable formatting", () => {
      const customResolver = createTokenResolver(sampleTheme, tokenCollection, {
        returnCssVariables: true,
        cssFormatter: (v) => `var(${v}, fallback)`
      });
      
      expect(customResolver.resolve("colors.primary.500")).toBe("var(--theme-colors-primary-500, fallback)");
    });
    
    it("should provide access to the token collection", () => {
      expect(resolver.getTokens()).toBe(tokenCollection);
      expect(resolver.getTheme()).toBe(sampleTheme);
    });
  });
});