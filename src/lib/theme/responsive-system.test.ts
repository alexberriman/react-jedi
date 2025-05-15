/**
 * Tests for Responsive System
 */

import { describe, it, expect } from "vitest";
import {
  DEFAULT_BREAKPOINTS,
  extractBreakpoints,
  getBreakpointOrder,
  generateMediaQuery,
  generateContainerQuery,
  createMediaQueries,
  createContainerQueries,
  isResponsiveValue,
  normalizeResponsiveValue,
  getResponsiveValue,
  mapResponsiveValues,
  createResponsiveStyles,
  createResponsiveUtils,
  type ResponsiveValue,
  type ResponsiveObject,
} from "./responsive-system";
import type { ThemeSpecification } from "@/types/schema/specification";

describe("Responsive System", () => {
  describe("extractBreakpoints", () => {
    it("should return default breakpoints when theme has none", () => {
      const result = extractBreakpoints();
      expect(result).toEqual(DEFAULT_BREAKPOINTS);
    });

    it("should return theme breakpoints when available", () => {
      const theme: ThemeSpecification = {
        breakpoints: {
          sm: "600px",
          md: "900px",
          lg: "1200px",
        },
      };
      const result = extractBreakpoints(theme);
      expect(result).toEqual(theme.breakpoints);
    });

    it("should return default breakpoints for empty theme breakpoints", () => {
      const theme: ThemeSpecification = {
        breakpoints: {},
      };
      const result = extractBreakpoints(theme);
      expect(result).toEqual(DEFAULT_BREAKPOINTS);
    });
  });

  describe("getBreakpointOrder", () => {
    it("should return default order for default breakpoints", () => {
      const order = getBreakpointOrder(DEFAULT_BREAKPOINTS);
      expect(order).toEqual(["base", "xs", "sm", "md", "lg", "xl", "2xl"]);
    });

    it("should append custom breakpoints to default order", () => {
      const customBreakpoints = {
        ...DEFAULT_BREAKPOINTS,
        "3xl": "1920px",
        mobile: "375px",
      };
      const order = getBreakpointOrder(customBreakpoints);
      expect(order).toEqual([
        "base",
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "mobile",
      ]);
    });
  });

  describe("generateMediaQuery", () => {
    it("should return empty string for base breakpoint", () => {
      const result = generateMediaQuery("base");
      expect(result).toBe("");
    });

    it("should generate min-width media query by default", () => {
      const result = generateMediaQuery("md");
      expect(result).toBe("@media (min-width: 768px)");
    });

    it("should generate max-width media query when specified", () => {
      const result = generateMediaQuery("md", DEFAULT_BREAKPOINTS, {
        type: "max-width",
      });
      expect(result).toBe("@media (max-width: 768px)");
    });

    it("should include orientation when specified", () => {
      const result = generateMediaQuery("md", DEFAULT_BREAKPOINTS, {
        orientation: "landscape",
      });
      expect(result).toBe("@media (min-width: 768px) and (orientation: landscape)");
    });

    it("should include preferences when specified", () => {
      const result = generateMediaQuery("md", DEFAULT_BREAKPOINTS, {
        prefers: "dark",
      });
      expect(result).toBe("@media (min-width: 768px) and (prefers-dark)");
    });

    it("should throw error for unknown breakpoint", () => {
      expect(() => generateMediaQuery("unknown")).toThrow(
        'Breakpoint "unknown" not found'
      );
    });
  });

  describe("generateContainerQuery", () => {
    it("should generate basic container query", () => {
      const result = generateContainerQuery("500px");
      expect(result).toBe("@container (inline-size >= 500px)");
    });

    it("should use custom container name", () => {
      const result = generateContainerQuery("500px", { container: "card" });
      expect(result).toBe("@container card (inline-size >= 500px)");
    });

    it("should use custom query type", () => {
      const result = generateContainerQuery("500px", { type: "block-size" });
      expect(result).toBe("@container (block-size >= 500px)");
    });
  });

  describe("createMediaQueries", () => {
    it("should create media queries for all breakpoints", () => {
      const queries = createMediaQueries(DEFAULT_BREAKPOINTS);
      expect(queries).toEqual({
        xs: "@media (min-width: 480px)",
        sm: "@media (min-width: 640px)",
        md: "@media (min-width: 768px)",
        lg: "@media (min-width: 1024px)",
        xl: "@media (min-width: 1280px)",
        "2xl": "@media (min-width: 1536px)",
      });
    });
  });

  describe("createContainerQueries", () => {
    it("should create container queries for all breakpoints", () => {
      const queries = createContainerQueries(DEFAULT_BREAKPOINTS);
      expect(queries).toEqual({
        xs: "@container (inline-size >= 480px)",
        sm: "@container (inline-size >= 640px)",
        md: "@container (inline-size >= 768px)",
        lg: "@container (inline-size >= 1024px)",
        xl: "@container (inline-size >= 1280px)",
        "2xl": "@container (inline-size >= 1536px)",
      });
    });
  });

  describe("isResponsiveValue", () => {
    it("should return true for arrays", () => {
      expect(isResponsiveValue([1, 2, 3])).toBe(true);
    });

    it("should return true for objects with base key", () => {
      expect(isResponsiveValue({ base: 1, md: 2 })).toBe(true);
    });

    it("should return true for objects with breakpoint keys", () => {
      expect(isResponsiveValue({ sm: 1, md: 2 })).toBe(true);
    });

    it("should return false for plain values", () => {
      expect(isResponsiveValue("value")).toBe(false);
      expect(isResponsiveValue(123)).toBe(false);
    });

    it("should return false for objects without responsive keys", () => {
      expect(isResponsiveValue({ foo: "bar" })).toBe(false);
    });
  });

  describe("normalizeResponsiveValue", () => {
    it("should convert single value to object", () => {
      const result = normalizeResponsiveValue("value");
      expect(result).toEqual({ base: "value" });
    });

    it("should return responsive object as-is", () => {
      const input: ResponsiveObject<string> = { base: "a", md: "b" };
      const result = normalizeResponsiveValue(input);
      expect(result).toBe(input);
    });

    it("should convert array to object with breakpoints", () => {
      const result = normalizeResponsiveValue(["a", "b", "c"]);
      expect(result).toEqual({
        base: "a",
        xs: "b",
        sm: "c",
      });
    });

    it("should handle sparse arrays", () => {
      const result = normalizeResponsiveValue(["a", undefined, "c"]);
      expect(result).toEqual({
        base: "a",
        sm: "c",
      });
    });
  });

  describe("getResponsiveValue", () => {
    it("should get value for specific breakpoint", () => {
      const value: ResponsiveObject<string> = {
        base: "small",
        md: "medium",
        lg: "large",
      };
      expect(getResponsiveValue(value, "md")).toBe("medium");
    });

    it("should fallback to smaller breakpoint", () => {
      const value: ResponsiveObject<string> = {
        base: "small",
        lg: "large",
      };
      expect(getResponsiveValue(value, "md")).toBe("small");
    });

    it("should handle single values", () => {
      expect(getResponsiveValue("value", "md")).toBe("value");
    });

    it("should return undefined when no suitable value found", () => {
      const value: ResponsiveObject<string> = {
        md: "medium",
      };
      expect(getResponsiveValue(value, "sm")).toBeUndefined();
    });
  });

  describe("mapResponsiveValues", () => {
    const transformer = (value: string) => `${value}px`;

    it("should map single value", () => {
      const result = mapResponsiveValues("width", "10", transformer);
      expect(result).toEqual({ width: "10px" });
    });

    it("should map responsive object", () => {
      const value: ResponsiveObject<string> = {
        base: "10",
        md: "20",
        lg: "30",
      };
      const result = mapResponsiveValues("width", value, transformer);
      expect(result).toEqual({
        width: "10px",
        "@media (min-width: 768px) { width": "20px",
        "@media (min-width: 1024px) { width": "30px",
      });
    });
  });

  describe("createResponsiveStyles", () => {
    const transformer = (value: string) => `${value}px`;

    it("should create CSS string for responsive values", () => {
      const value: ResponsiveObject<string> = {
        base: "10",
        md: "20",
      };
      const result = createResponsiveStyles("width", value, transformer);
      expect(result).toBe("width: 10px; @media (min-width: 768px) { width: 20px; }");
    });
  });

  describe("createResponsiveUtils", () => {
    const utils = createResponsiveUtils();

    it("should create up utility", () => {
      const result = utils.up("md");
      expect(result).toBe("@media (min-width: 768px)");
    });

    it("should create down utility", () => {
      const result = utils.down("md");
      expect(result).toBe("@media (max-width: 768px)");
    });

    it("should create between utility", () => {
      const result = utils.between("sm", "lg");
      expect(result).toBe(
        "@media (min-width: 640px) and @media (max-width: 1024px)"
      );
    });

    it("should create container utility", () => {
      const result = utils.container("500px");
      expect(result).toBe("@container (inline-size >= 500px)");
    });

    it("should get value from responsive object", () => {
      const value: ResponsiveObject<string> = {
        base: "small",
        md: "medium",
      };
      expect(utils.getValue(value, "md")).toBe("medium");
    });

    it("should map values with utility", () => {
      const value: ResponsiveObject<string> = {
        base: "10",
        md: "20",
      };
      const result = utils.mapValues("width", value, v => `${v}px`);
      expect(result).toEqual({
        width: "10px",
        "@media (min-width: 768px) { width": "20px",
      });
    });
  });
});