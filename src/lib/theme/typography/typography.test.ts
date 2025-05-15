/**
 * Typography System Tests
 */

import { describe, it, expect } from "vitest";
import {
  extractFontFamilies,
  fontStackToString,
  generateTypeScale,
  generateFluidTypeScale,
  extractLineHeights,
  extractLetterSpacings,
  calculateOptimalLineHeight,
  calculateOptimalLetterSpacing,
  generateTypographySystem,
  generateTypographyVariables
} from ".";

describe("Font Family System", () => {
  it("should convert font stack to CSS string", () => {
    const fonts = ["Arial", "Helvetica", "sans-serif"];
    const result = fontStackToString(fonts);
    expect(result).toBe("Arial, Helvetica, sans-serif");
  });
  
  it("should add quotes to font names with spaces", () => {
    const fonts = ["Helvetica Neue", "Arial", "sans-serif"];
    const result = fontStackToString(fonts);
    expect(result).toBe("\"Helvetica Neue\", Arial, sans-serif");
  });
  
  it("should extract font families from typography", () => {
    const typography = {
      fontFamilies: {
        sans: ["Custom Sans", "sans-serif"],
        mono: ["Fira Code", "monospace"]
      }
    };
    
    const result = extractFontFamilies(typography);
    expect(result.sans).toEqual(["Custom Sans", "sans-serif"]);
    expect(result.mono).toEqual(["Fira Code", "monospace"]);
    expect(result.serif).toBeDefined(); // Default should be added
  });
});

describe("Type Scale System", () => {
  it("should generate a type scale with default settings", () => {
    const scale = generateTypeScale();
    expect(scale).toHaveProperty("base");
    expect(scale).toHaveProperty("xs1");
    expect(scale).toHaveProperty("lg1");
    expect(scale).toHaveProperty("5xl");
  });
  
  it("should generate a fluid type scale", () => {
    const scale = generateFluidTypeScale();
    
    // Fluid scales should have clamp function
    for (const value of Object.values(scale)) {
      expect(value).toContain("clamp(");
    }
  });
});

describe("Typography Spacing System", () => {
  it("should extract line heights from typography", () => {
    const typography = {
      lineHeights: {
        body: 1.6,
        heading: 1.2
      }
    };
    
    const result = extractLineHeights(typography);
    expect(result.body).toBe("1.6");
    expect(result.heading).toBe("1.2");
  });
  
  it("should extract letter spacings from typography", () => {
    const typography = {
      letterSpacings: {
        tight: "-0.01em",
        wide: "0.02em"
      }
    };
    
    const result = extractLetterSpacings(typography);
    expect(result.tight).toBe("-0.01em");
    expect(result.wide).toBe("0.02em");
  });
  
  it("should calculate optimal line height based on font size", () => {
    const smallText = calculateOptimalLineHeight(12);
    const normalText = calculateOptimalLineHeight(16);
    const largeText = calculateOptimalLineHeight(32);
    
    expect(smallText).toBeGreaterThan(normalText);
    expect(largeText).toBeLessThan(normalText);
  });
  
  it("should calculate optimal letter spacing based on font size and weight", () => {
    const headingSpacing = calculateOptimalLetterSpacing(32, 700);
    const bodySpacing = calculateOptimalLetterSpacing(16, 400);
    const smallTextSpacing = calculateOptimalLetterSpacing(12, 400);
    
    expect(Number.parseFloat(headingSpacing)).toBeLessThan(0); // Negative for headings
    expect(Number.parseFloat(smallTextSpacing)).toBeGreaterThan(Number.parseFloat(bodySpacing));
  });
});

describe("Typography System Integration", () => {
  it("should generate a complete typography system", () => {
    const system = generateTypographySystem({
      baseFontSize: 16,
      scaleRatio: "perfectFourth"
    });
    
    expect(system.fontFamilies).toBeDefined();
    expect(system.fontSizes).toBeDefined();
    expect(system.fontWeights).toBeDefined();
    expect(system.lineHeights).toBeDefined();
    expect(system.letterSpacings).toBeDefined();
  });
  
  it("should generate CSS variables from typography", () => {
    const typography = generateTypographySystem();
    const variables = generateTypographyVariables(typography);
    
    expect(Object.keys(variables).length).toBeGreaterThan(0);
    expect(variables).toHaveProperty("--font-sans");
    expect(variables).toHaveProperty("--font-size-base");
    expect(variables).toHaveProperty("--line-height-normal");
    expect(variables).toHaveProperty("--letter-spacing-normal");
  });
});