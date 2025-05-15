/**
 * Color System Tests
 * 
 * Unit tests for the color system functionality.
 */

import { describe, it, expect } from "vitest";
import { 
  generateColorPalette,
  generateColorScale,
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  rgbToHsl,
  hslToRgb,
  isLightColor,
  getContrastRatio
} from "./color-system";

describe("Color System", () => {
  describe("Color Conversions", () => {
    it("converts hex to RGB correctly", () => {
      expect(hexToRgb("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("#00FF00")).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb("#0000FF")).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb("#FFFFFF")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    });
    
    it("converts RGB to hex correctly", () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe("#00ff00");
      expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe("#0000ff");
      expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
    });
    
    it("converts RGB to HSL correctly", () => {
      const redHsl = rgbToHsl({ r: 255, g: 0, b: 0 });
      expect(redHsl.h).toBeCloseTo(0);
      expect(redHsl.s).toBe(100);
      expect(redHsl.l).toBeCloseTo(50);
      
      const greenHsl = rgbToHsl({ r: 0, g: 255, b: 0 });
      expect(greenHsl.h).toBeCloseTo(120);
      expect(greenHsl.s).toBe(100);
      expect(greenHsl.l).toBeCloseTo(50);
      
      const whiteHsl = rgbToHsl({ r: 255, g: 255, b: 255 });
      expect(whiteHsl.s).toBe(0);
      expect(whiteHsl.l).toBe(100);
    });
    
    it("converts HSL to RGB correctly", () => {
      expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({ r: 0, g: 255, b: 0 });
      expect(hslToRgb({ h: 240, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255 });
      expect(hslToRgb({ h: 0, s: 0, l: 100 })).toEqual({ r: 255, g: 255, b: 255 });
      expect(hslToRgb({ h: 0, s: 0, l: 0 })).toEqual({ r: 0, g: 0, b: 0 });
    });
    
    it("provides roundtrip conversions", () => {
      const colors = [
        "#0EA5E9", // blue
        "#10B981", // green
        "#F59E0B", // amber
        "#EF4444", // red
        "#8B5CF6", // purple
        "#EC4899"  // pink
      ];
      
      for (const color of colors) {
        // Hex -> RGB -> Hex should be lossless
        const rgb = hexToRgb(color);
        const hexFromRgb = rgbToHex(rgb);
        expect(hexFromRgb.toLowerCase()).toBe(color.toLowerCase());
        
        // Hex -> HSL -> Hex should be minimally lossy 
        // (slight rounding errors may occur due to floating point)
        const hsl = hexToHsl(color);
        const hexFromHsl = hslToHex(hsl);
        
        // Convert both to RGB for comparison since HSL conversion may have minimal rounding
        const rgbOriginal = hexToRgb(color);
        const rgbResult = hexToRgb(hexFromHsl);
        
        // Allow differences due to rounding in color space conversions
        expect(Math.abs(rgbOriginal.r - rgbResult.r)).toBeLessThanOrEqual(2);
        expect(Math.abs(rgbOriginal.g - rgbResult.g)).toBeLessThanOrEqual(2);
        expect(Math.abs(rgbOriginal.b - rgbResult.b)).toBeLessThanOrEqual(2);
      }
    });
  });
  
  describe("Color Scale Generation", () => {
    it("generates a color scale with 10 shades", () => {
      const scale = generateColorScale({ baseColor: "#0EA5E9" });
      
      // Should have 10 shades (50-900)
      expect(Object.keys(scale).length).toBe(10);
      expect(scale["50"]).toBeDefined();
      expect(scale["900"]).toBeDefined();
      
      // Lighter shades should be lighter (higher HSL lightness)
      const hsl50 = hexToHsl(scale["50"] ?? "#FFFFFF");
      const hsl900 = hexToHsl(scale["900"] ?? "#000000");
      expect(hsl50.l).toBeGreaterThan(hsl900.l);
      
      // Middle shades should be in between
      const hsl300 = hexToHsl(scale["300"] ?? "#CCCCCC");
      const hsl700 = hexToHsl(scale["700"] ?? "#333333");
      expect(hsl300.l).toBeGreaterThan(hsl700.l);
      
      // Base shade (500) should be close to original color
      const hsl500 = hexToHsl(scale["500"] ?? "#0EA5E9");
      const hslBase = hexToHsl("#0EA5E9");
      expect(Math.abs(hsl500.h - hslBase.h)).toBeLessThan(5);
    });
    
    it("allows customization of the base shade", () => {
      const scale = generateColorScale({ 
        baseColor: "#0EA5E9", 
        baseShade: "300" 
      });
      
      // The 300 shade should be closest to the original color
      const hsl300 = hexToHsl(scale["300"] ?? "#0EA5E9");
      const hslBase = hexToHsl("#0EA5E9");
      
      expect(Math.abs(hsl300.h - hslBase.h)).toBeLessThan(5);
      
      // Other shades should be properly distributed
      const hsl100 = hexToHsl(scale["100"] ?? "#FFFFFF");
      const hsl900 = hexToHsl(scale["900"] ?? "#000000");
      expect(hsl100.l).toBeGreaterThan(hsl300.l);
      expect(hsl300.l).toBeGreaterThan(hsl900.l);
    });
    
    it("adjusts contrast between shades", () => {
      const normalScale = generateColorScale({ 
        baseColor: "#0EA5E9",
        contrast: 1 
      });
      
      const highContrastScale = generateColorScale({ 
        baseColor: "#0EA5E9",
        contrast: 1.5 
      });
      
      const lowContrastScale = generateColorScale({ 
        baseColor: "#0EA5E9",
        contrast: 0.5 
      });
      
      // High contrast should have greater difference between shades
      const normalDiff = hexToHsl(normalScale["100"] ?? "#FFFFFF").l - hexToHsl(normalScale["900"] ?? "#000000").l;
      const highDiff = hexToHsl(highContrastScale["100"] ?? "#FFFFFF").l - hexToHsl(highContrastScale["900"] ?? "#000000").l;
      const lowDiff = hexToHsl(lowContrastScale["100"] ?? "#FFFFFF").l - hexToHsl(lowContrastScale["900"] ?? "#000000").l;
      
      expect(highDiff).toBeGreaterThan(normalDiff);
      expect(normalDiff).toBeGreaterThan(lowDiff);
    });
    
    it("applies temperature shifts", () => {
      const normalScale = generateColorScale({ 
        baseColor: "#0EA5E9"
      });
      
      const warmerScale = generateColorScale({ 
        baseColor: "#0EA5E9",
        temperature: 50 
      });
      
      const coolerScale = generateColorScale({ 
        baseColor: "#0EA5E9",
        temperature: -50 
      });
      
      // Compare middle shades
      const normalHue = hexToHsl(normalScale["500"] ?? "#0EA5E9").h;
      const warmerHue = hexToHsl(warmerScale["700"] ?? "#0EA5E9").h;
      const coolerHue = hexToHsl(coolerScale["700"] ?? "#0EA5E9").h;
      
      // For blue, warmer = lower hue towards cyan, cooler = higher hue towards purple
      // This varies by base color, so we just check that they're different
      expect(warmerHue).not.toBe(normalHue);
      expect(coolerHue).not.toBe(normalHue);
    });
    
    it("adjusts saturation levels", () => {
      const normalScale = generateColorScale({ 
        baseColor: "#0EA5E9"
      });
      
      const moreSaturatedScale = generateColorScale({ 
        baseColor: "#0EA5E9",
        saturation: 50 
      });
      
      const lessSaturatedScale = generateColorScale({ 
        baseColor: "#0EA5E9",
        saturation: -50 
      });
      
      // Compare middle shades
      const normalSat = hexToHsl(normalScale["500"] ?? "#0EA5E9").s;
      const moreSat = hexToHsl(moreSaturatedScale["500"] ?? "#0EA5E9").s;
      const lessSat = hexToHsl(lessSaturatedScale["500"] ?? "#0EA5E9").s;
      
      expect(moreSat).toBeGreaterThan(normalSat);
      expect(normalSat).toBeGreaterThan(lessSat);
    });
  });
  
  describe("Color Palette Generation", () => {
    it("generates a complete color palette from minimal configuration", () => {
      const palette = generateColorPalette({
        primary: "#0EA5E9" // Only specify primary color
      });
      
      // Should include primary color scale
      expect(palette.primary).toBeDefined();
      expect(palette.primary?.["500"]).toBeDefined();
      
      // Should auto-generate semantic colors
      expect(palette.success).toBeDefined();
      expect(palette.warning).toBeDefined();
      expect(palette.error).toBeDefined();
      expect(palette.info).toBeDefined();
      
      // Should auto-generate neutral scale
      expect(palette.neutral).toBeDefined();
      
      // Should generate background/text/border mappings
      expect(palette.background).toBeDefined();
      expect(palette.text).toBeDefined();
      expect(palette.border).toBeDefined();
    });
    
    it("allows customization of all color aspects", () => {
      const palette = generateColorPalette({
        primary: { baseColor: "#0EA5E9", contrast: 1.2 },
        secondary: { baseColor: "#8B5CF6", saturation: 20 },
        accent: { baseColor: "#F97316", temperature: -20 },
        neutral: { baseColor: "#6B7280", saturation: -80 },
        semantic: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6"
        },
        custom: {
          purple: "#8B5CF6",
          pink: "#EC4899"
        }
      });
      
      // All specified colors should be present
      expect(palette.primary).toBeDefined();
      expect(palette.secondary).toBeDefined();
      expect(palette.accent).toBeDefined();
      expect(palette.neutral).toBeDefined();
      expect(palette.success).toBeDefined();
      expect(palette.warning).toBeDefined();
      expect(palette.error).toBeDefined();
      expect(palette.info).toBeDefined();
      expect(palette.purple).toBeDefined();
      expect(palette.pink).toBeDefined();
      
      // Custom colors should have complete scales
      expect(palette.purple && Object.keys(palette.purple).length > 0).toBe(true);
      expect(palette.pink && Object.keys(palette.pink).length > 0).toBe(true);
    });
  });
  
  describe("Color Utilities", () => {
    it("correctly identifies light and dark colors", () => {
      expect(isLightColor("#FFFFFF")).toBe(true); // White
      expect(isLightColor("#F0F0F0")).toBe(true); // Light gray
      expect(isLightColor("#FFD700")).toBe(true); // Gold
      
      expect(isLightColor("#000000")).toBe(false); // Black
      expect(isLightColor("#333333")).toBe(false); // Dark gray
      expect(isLightColor("#0000FF")).toBe(false); // Blue
    });
    
    it("calculates contrast ratios correctly", () => {
      // White on black = maximum contrast (21:1)
      expect(getContrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 0);
      
      // Black on white = maximum contrast (21:1)
      expect(getContrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 0);
      
      // Same color = minimum contrast (1:1)
      expect(getContrastRatio("#0EA5E9", "#0EA5E9")).toBeCloseTo(1, 0);
      
      // Medium contrasts
      const darkBlueOnLightBlue = getContrastRatio("#0C4A6E", "#BAE6FD");
      expect(darkBlueOnLightBlue).toBeGreaterThan(4.5); // WCAG AA for normal text
    });
  });
});