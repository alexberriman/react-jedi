/**
 * Tests for brand preset utilities
 */

import { describe, it, expect } from "vitest";
import {
  describePersonality,
  analyzeThemePersonality,
  findMatchingPreset,
  mergePresets,
  createThemeFromPreset,
  getComplementaryPresets,
} from "./utils";
import { techStartupPreset, minimalPreset, creativePreset } from "./presets";
import type { ThemeSpecification } from "@/types/schema/specification";

describe("Brand Preset Utils", () => {
  describe("describePersonality", () => {
    it("should describe personality traits", () => {
      const description = describePersonality({
        modern: 95,
        professional: 75,
        playful: 40,
        minimal: 60,
        bold: 80,
        elegant: 50,
      });

      expect(description).toContain("very modern");
      expect(description).toContain("professional");
      expect(description).toContain("very bold");
      expect(description).not.toContain("playful");
    });

    it("should handle edge cases", () => {
      const description = describePersonality({
        modern: 0,
        professional: 100,
        playful: 0,
        minimal: 0,
        bold: 0,
        elegant: 0,
      });

      expect(description).toContain("highly professional");
      expect(description).not.toContain("modern");
    });
  });

  describe("analyzeThemePersonality", () => {
    it("should analyze theme personality", () => {
      const theme: ThemeSpecification = {
        version: "1.0",
        typography: {
          fontFamily: {
            sans: "Inter, system-ui, sans-serif",
          },
        },
        animation: {
          enabled: false,
        },
        radius: {
          base: "0.25rem",
        },
        shadows: {
          base: "0 2px 4px rgb(0 0 0 / 0.04)",
        },
      };

      const personality = analyzeThemePersonality(theme);

      expect(personality.modern).toBeGreaterThan(50);
      expect(personality.minimal).toBeGreaterThan(50);
      expect(personality.elegant).toBeGreaterThan(50);
    });

    it("should detect playful themes", () => {
      const theme: ThemeSpecification = {
        version: "1.0",
        animation: {
          timing: {
            fast: "150ms",
          },
          enabled: true,
        },
        radius: {
          lg: "2rem",
        },
      };

      const personality = analyzeThemePersonality(theme);
      expect(personality.playful).toBeGreaterThan(50);
    });
  });

  describe("findMatchingPreset", () => {
    it("should find matching preset", () => {
      const theme: ThemeSpecification = {
        version: "1.0",
        typography: {
          fontFamily: {
            sans: "Inter, sans-serif",
          },
        },
        animation: {
          enabled: true,
        },
      };

      const match = findMatchingPreset(theme);
      expect(match).toBeDefined();
      expect(match?.personality.modern).toBeGreaterThan(50);
    });
  });

  describe("mergePresets", () => {
    it("should merge two presets", () => {
      const merged = mergePresets(techStartupPreset, minimalPreset, 0.5);

      expect(merged.id).toBe("tech-startup-minimal");
      expect(merged.name).toBe("Tech Startup + Minimal");
      expect(merged.colors.primary).toBe(techStartupPreset.colors.primary);

      // Personality should be averaged
      expect(merged.personality.modern).toBe(
        Math.round((techStartupPreset.personality.modern + minimalPreset.personality.modern) / 2)
      );
    });

    it("should handle weighted merge", () => {
      const merged = mergePresets(techStartupPreset, minimalPreset, 0.2);

      // Should be weighted toward tech startup (80%)
      expect(merged.personality.modern).toBeCloseTo(
        techStartupPreset.personality.modern * 0.8 + minimalPreset.personality.modern * 0.2
      );
    });
  });

  describe("createThemeFromPreset", () => {
    it("should create theme from preset id", () => {
      const theme = createThemeFromPreset("tech-startup");

      expect(theme.name).toBe("Tech Startup");
      expect(theme.colors?.primary).toBeDefined();
      expect(theme.typography).toBeDefined();
    });

    it("should throw for invalid preset", () => {
      expect(() => {
        createThemeFromPreset("invalid");
      }).toThrow("Unknown preset: invalid");
    });
  });

  describe("getComplementaryPresets", () => {
    it("should find complementary presets", () => {
      const complementary = getComplementaryPresets(minimalPreset);

      expect(complementary.length).toBeGreaterThan(0);
      
      // Creative should be complementary to minimal
      const hasCreative = complementary.some((p) => p.id === "creative-agency");
      expect(hasCreative).toBe(true);
    });

    it("should not include the same preset", () => {
      const complementary = getComplementaryPresets(techStartupPreset);
      
      const hasSelf = complementary.some((p) => p.id === "tech-startup");
      expect(hasSelf).toBe(false);
    });
  });
});