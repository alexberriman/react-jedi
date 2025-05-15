/**
 * Z-Index System Tests
 *
 * This file contains unit tests for the z-index management system,
 * ensuring its functionality works as expected.
 */

import { describe, it, expect } from "vitest";
import { 
  defaultZIndices,
  getZIndex,
  createZIndexScale,
  createZIndexResolver,
  createZIndexCSSVariables,
  getRelativeZIndex,
  isValidZIndex
} from "./index";
import type { ThemeSpecification } from "../../../types/schema/specification";

describe("Z-Index System", () => {
  describe("defaultZIndices", () => {
    it("should contain expected default z-index values", () => {
      expect(defaultZIndices).toHaveProperty("hide", -1);
      expect(defaultZIndices).toHaveProperty("base", 0);
      expect(defaultZIndices).toHaveProperty("content", 1);
      expect(defaultZIndices).toHaveProperty("modal", 50);
      expect(defaultZIndices).toHaveProperty("tooltip", 80);
      expect(defaultZIndices).toHaveProperty("dev", 999);
    });
    
    it("should maintain the expected stacking order", () => {
      expect(defaultZIndices.hide).toBeLessThan(defaultZIndices.base);
      expect(defaultZIndices.base).toBeLessThan(defaultZIndices.content);
      expect(defaultZIndices.dropdown).toBeLessThan(defaultZIndices.sticky);
      expect(defaultZIndices.fixed).toBeLessThan(defaultZIndices.overlay);
      expect(defaultZIndices.overlay).toBeLessThan(defaultZIndices.modal);
      expect(defaultZIndices.modal).toBeLessThan(defaultZIndices.popover);
      expect(defaultZIndices.popover).toBeLessThan(defaultZIndices.toast);
      expect(defaultZIndices.toast).toBeLessThan(defaultZIndices.tooltip);
      expect(defaultZIndices.tooltip).toBeLessThan(defaultZIndices.dev);
    });
  });

  describe("getZIndex function", () => {
    it("should return default value when theme is undefined", () => {
      expect(getZIndex(undefined, "modal")).toBe(defaultZIndices.modal);
    });
    
    it("should return default value when theme has no zIndices", () => {
      const theme: ThemeSpecification = {};
      expect(getZIndex(theme, "modal")).toBe(defaultZIndices.modal);
    });
    
    it("should return theme value when available", () => {
      const theme: ThemeSpecification = {
        zIndices: {
          modal: 100
        }
      };
      expect(getZIndex(theme, "modal")).toBe(100);
    });
    
    it("should return default value when key not found in theme", () => {
      const theme: ThemeSpecification = {
        zIndices: {
          modal: 100
        }
      };
      expect(getZIndex(theme, "tooltip")).toBe(defaultZIndices.tooltip);
    });
    
    it("should return 0 for unknown keys", () => {
      expect(getZIndex(undefined, "unknown")).toBe(0);
    });
  });

  describe("createZIndexScale function", () => {
    it("should return default scale when no custom values provided", () => {
      const scale = createZIndexScale();
      expect(scale).toEqual(defaultZIndices);
    });
    
    it("should merge custom values with defaults", () => {
      const customValues = {
        modal: 100,
        custom: 200
      };
      
      const scale = createZIndexScale(customValues);
      
      expect(scale.modal).toBe(100);
      expect(scale.custom).toBe(200);
      expect(scale.tooltip).toBe(defaultZIndices.tooltip);
    });
  });

  describe("createZIndexResolver function", () => {
    it("should return a function that resolves z-index values", () => {
      const theme: ThemeSpecification = {
        zIndices: {
          modal: 100
        }
      };
      
      const resolver = createZIndexResolver(theme);
      expect(typeof resolver).toBe("function");
      expect(resolver("modal")).toBe(100);
      expect(resolver("tooltip")).toBe(defaultZIndices.tooltip);
    });
    
    it("should handle undefined theme", () => {
      const resolver = createZIndexResolver(undefined);
      expect(resolver("modal")).toBe(defaultZIndices.modal);
    });
  });

  describe("createZIndexCSSVariables function", () => {
    it("should convert z-index values to CSS variables", () => {
      const zIndices = {
        modal: 50,
        tooltip: 80
      };
      
      const cssVars = createZIndexCSSVariables(zIndices);
      
      expect(cssVars).toEqual({
        "--z-modal": "50",
        "--z-tooltip": "80"
      });
    });
  });

  describe("getRelativeZIndex function", () => {
    it("should calculate relative z-index with default offset", () => {
      const theme: ThemeSpecification = {
        zIndices: {
          modal: 50
        }
      };
      
      expect(getRelativeZIndex(theme, "modal")).toBe(50);
    });
    
    it("should calculate relative z-index with custom offset", () => {
      const theme: ThemeSpecification = {
        zIndices: {
          modal: 50
        }
      };
      
      expect(getRelativeZIndex(theme, "modal", 2)).toBe(52);
    });
    
    it("should handle undefined theme", () => {
      expect(getRelativeZIndex(undefined, "modal", 2)).toBe(defaultZIndices.modal + 2);
    });
  });

  describe("isValidZIndex function", () => {
    it("should return true for valid z-index values", () => {
      expect(isValidZIndex(0)).toBe(true);
      expect(isValidZIndex(100)).toBe(true);
      expect(isValidZIndex(-10)).toBe(true);
    });
    
    it("should return false for invalid z-index values", () => {
      expect(isValidZIndex(-1000)).toBe(false);
      expect(isValidZIndex(10000)).toBe(false);
    });
  });
});