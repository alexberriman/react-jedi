/**
 * Tests for brand theme generator
 */

import { describe, it, expect } from "vitest";
import { generateBrandTheme } from "./generator";
import { techStartupPreset } from "./presets";

describe("Brand Theme Generator", () => {
  describe("generateBrandTheme", () => {
    it("should generate theme from preset", () => {
      const result = generateBrandTheme({ preset: "tech-startup" });

      expect(result).toHaveProperty("theme");
      expect(result).toHaveProperty("preset");
      expect(result).toHaveProperty("metadata");

      expect(result.preset.id).toBe("tech-startup");
      expect(result.theme.name).toBe("Tech Startup");
    });

    it("should throw error for invalid preset", () => {
      expect(() => {
        generateBrandTheme({ preset: "invalid-preset" });
      }).toThrow("Unknown preset: invalid-preset");
    });

    it("should create custom theme without preset", () => {
      const result = generateBrandTheme({
        colors: {
          primary: "#FF0000",
          secondary: "#00FF00",
        },
        typography: {
          fontFamily: {
            heading: "Arial, sans-serif",
          },
        },
      });

      expect(result.preset.id).toBe("custom");
      expect(result.theme.colors?.primary).toBeDefined();
    });

    it("should apply overrides to preset", () => {
      const result = generateBrandTheme({
        preset: "tech-startup",
        colors: {
          primary: "#FF0000",
        },
        overrides: {
          name: "Custom Tech Startup",
        },
      });

      expect(result.theme.name).toBe("Custom Tech Startup");
      expect(result.preset.colors.primary).toBe("#FF0000");
    });

    it("should generate valid CSS color scales", () => {
      const result = generateBrandTheme({ preset: "tech-startup" });
      const primaryScale = result.theme.colors?.primary;

      expect(primaryScale).toBeDefined();
      expect(primaryScale).toHaveProperty("50");
      expect(primaryScale).toHaveProperty("500");
      expect(primaryScale).toHaveProperty("900");
    });

    it("should generate theme from personality", () => {
      const result = generateBrandTheme({
        personality: {
          modern: 100,
          minimal: 100,
          bold: 0,
        },
      });

      // Minimal personality should result in small spacing
      const spacing = result.theme.spacing;
      expect(spacing?.["1"]).toBe("0.125rem"); // Minimal spacing

      // Minimal personality should result in subtle shadows
      const shadows = result.theme.shadows;
      expect(shadows?.sm).toContain("0.05");
    });

    it("should handle typography customization", () => {
      const result = generateBrandTheme({
        typography: {
          fontFamily: {
            heading: "Georgia, serif",
            body: "Arial, sans-serif",
          },
          fontWeight: {
            bold: 800,
          },
        },
      });

      expect(result.theme.typography?.fontFamily?.heading).toBe("Georgia, serif");
      expect(result.theme.typography?.fontFamily?.sans).toBe("Arial, sans-serif");
      expect(result.theme.typography?.fontWeight?.bold).toBe("800");
    });

    it("should generate metadata", () => {
      const result = generateBrandTheme({ preset: "tech-startup" });

      expect(result.metadata).toHaveProperty("generatedAt");
      expect(result.metadata).toHaveProperty("version");
      expect(result.metadata.version).toBe("1.0.0");

      // Check if generatedAt is a valid ISO string
      const date = new Date(result.metadata.generatedAt);
      expect(date.toString()).not.toBe("Invalid Date");
    });

    it("should handle playful personality", () => {
      const result = generateBrandTheme({
        personality: {
          playful: 90,
          bold: 80,
        },
      });

      // Playful personality should result in larger border radius
      const radius = result.theme.radius;
      expect(radius?.base).toBe("0.5rem");
      expect(radius?.lg).toBe("1rem");

      // Playful personality should affect animation timing
      const animation = result.theme.animation;
      expect(animation?.timing?.fast).toBe("150ms");
    });

    it("should handle elegant personality", () => {
      const result = generateBrandTheme({
        personality: {
          elegant: 90,
          minimal: 70,
        },
      });

      // Elegant personality should result in subtle shadows
      const shadows = result.theme.shadows;
      expect(shadows?.base).toContain("0.04");

      // Elegant personality should affect animation easing
      const animation = result.theme.animation;
      expect(animation?.easing?.inOut).toContain("0.4, 0, 0.2, 1");
    });
  });
});