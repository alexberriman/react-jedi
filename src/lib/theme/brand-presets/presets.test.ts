/**
 * Tests for brand presets
 */

import { describe, it, expect } from "vitest";
import {
  brandPresets,
  getPreset,
  getPresetsByCategory,
  getCategories,
} from "./presets";

describe("Brand Presets", () => {
  describe("brandPresets", () => {
    it("should contain all expected presets", () => {
      const expectedPresets = [
        "tech-startup",
        "finance",
        "healthcare",
        "creative-agency",
        "minimal",
        "luxury",
        "startup",
        "education",
      ];

      expectedPresets.forEach((presetId) => {
        expect(brandPresets).toHaveProperty(presetId);
      });
    });

    it("should have valid preset structure", () => {
      Object.values(brandPresets).forEach((preset) => {
        expect(preset).toHaveProperty("id");
        expect(preset).toHaveProperty("name");
        expect(preset).toHaveProperty("description");
        expect(preset).toHaveProperty("category");
        expect(preset).toHaveProperty("colors");
        expect(preset).toHaveProperty("typography");
        expect(preset).toHaveProperty("personality");
      });
    });

    it("should have valid colors", () => {
      Object.values(brandPresets).forEach((preset) => {
        expect(preset.colors).toHaveProperty("primary");
        expect(preset.colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);

        if (preset.colors.secondary) {
          expect(preset.colors.secondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        }
        if (preset.colors.accent) {
          expect(preset.colors.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
        }
      });
    });

    it("should have valid personality values", () => {
      Object.values(brandPresets).forEach((preset) => {
        ["modern", "professional", "playful", "minimal", "bold", "elegant"].forEach(
          (trait) => {
            expect(preset.personality).toHaveProperty(trait);
            const value = preset.personality[trait as keyof typeof preset.personality];
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThanOrEqual(100);
          }
        );
      });
    });
  });

  describe("getPreset", () => {
    it("should return preset by id", () => {
      const preset = getPreset("tech-startup");
      expect(preset).toBeDefined();
      expect(preset?.id).toBe("tech-startup");
      expect(preset?.name).toBe("Tech Startup");
    });

    it("should return undefined for invalid id", () => {
      const preset = getPreset("non-existent");
      expect(preset).toBeUndefined();
    });
  });

  describe("getPresetsByCategory", () => {
    it("should return presets by category", () => {
      const techPresets = getPresetsByCategory("technology");
      expect(techPresets.length).toBeGreaterThan(0);
      expect(techPresets.every((p) => p.category === "technology")).toBe(true);
    });

    it("should return empty array for invalid category", () => {
      const presets = getPresetsByCategory("invalid" as any);
      expect(presets).toEqual([]);
    });
  });

  describe("getCategories", () => {
    it("should return all unique categories", () => {
      const categories = getCategories();
      expect(categories).toContain("technology");
      expect(categories).toContain("finance");
      expect(categories).toContain("healthcare");
      expect(categories).toContain("creative");
      expect(categories).toContain("minimal");
      expect(categories).toContain("luxury");
      expect(categories).toContain("startup");
      expect(categories).toContain("education");
    });

    it("should not contain duplicates", () => {
      const categories = getCategories();
      const unique = [...new Set(categories)];
      expect(categories.length).toBe(unique.length);
    });
  });
});