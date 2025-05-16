import { describe, expect, it } from "vitest";
import {
  DEFAULT_SHADOW_SCALE,
  SEMANTIC_SHADOW_PRESETS,
  DARK_MODE_SHADOW_SCALE,
  getShadow,
  getDarkModeShadow,
  generateShadowScale,
  extractShadowScale,
  generateShadowVariables,
  shadowsToVariables,
  combineShadows,
  createResponsiveShadow,
} from "./shadow-system";
import type { ThemeSpecification } from "../types/schema/specification";

describe("Shadow System", () => {
  describe("getShadow", () => {
    it("should return shadow value from default scale", () => {
      expect(getShadow("sm")).toBe(DEFAULT_SHADOW_SCALE.sm);
      expect(getShadow("lg")).toBe(DEFAULT_SHADOW_SCALE.lg);
      expect(getShadow("2xl")).toBe(DEFAULT_SHADOW_SCALE["2xl"]);
    });

    it("should return semantic shadow values", () => {
      expect(getShadow("card")).toBe(SEMANTIC_SHADOW_PRESETS.card);
      expect(getShadow("modal")).toBe(SEMANTIC_SHADOW_PRESETS.modal);
      expect(getShadow("button-hover")).toBe(SEMANTIC_SHADOW_PRESETS["button-hover"]);
    });

    it("should return custom shadow values", () => {
      const customScale = {
        ...DEFAULT_SHADOW_SCALE,
        custom: "0 0 10px rgba(255, 0, 0, 0.5)",
      };
      expect(getShadow("custom", customScale)).toBe("0 0 10px rgba(255, 0, 0, 0.5)");
    });

    it("should return raw value if key not found", () => {
      const rawShadow = "0 0 5px blue";
      expect(getShadow(rawShadow)).toBe(rawShadow);
    });
  });

  describe("getDarkModeShadow", () => {
    it("should return dark mode shadow values", () => {
      expect(getDarkModeShadow("sm")).toBe(DARK_MODE_SHADOW_SCALE.sm);
      expect(getDarkModeShadow("lg")).toBe(DARK_MODE_SHADOW_SCALE.lg);
    });

    it("should use custom dark scale if provided", () => {
      const customDarkScale = {
        ...DARK_MODE_SHADOW_SCALE,
        custom: "0 0 10px rgba(255, 255, 255, 0.1)",
      };
      expect(getDarkModeShadow("custom", customDarkScale)).toBe(
        "0 0 10px rgba(255, 255, 255, 0.1)"
      );
    });
  });

  describe("generateShadowScale", () => {
    it("should generate default scale", () => {
      const scale = generateShadowScale({});
      expect(scale).toEqual(DEFAULT_SHADOW_SCALE);
    });

    it("should generate dark mode scale", () => {
      const scale = generateShadowScale({ darkMode: true });
      expect(scale).toEqual(DARK_MODE_SHADOW_SCALE);
    });

    it("should merge custom values", () => {
      const scale = generateShadowScale({
        customValues: { custom: "0 0 5px red" },
      });
      expect(scale["custom"]).toBe("0 0 5px red");
      expect(scale.sm).toBe(DEFAULT_SHADOW_SCALE.sm);
    });

    it("should use custom base scale", () => {
      const customBase: Partial<typeof DEFAULT_SHADOW_SCALE> = {
        none: "none",
        sm: "0 1px 1px black",
      };
      const scale = generateShadowScale({
        baseScale: { ...DEFAULT_SHADOW_SCALE, ...customBase },
      });
      expect(scale.sm).toBe("0 1px 1px black");
    });
  });

  describe("extractShadowScale", () => {
    it("should return default scale when no theme provided", () => {
      const scale = extractShadowScale();
      expect(scale).toEqual(DEFAULT_SHADOW_SCALE);
    });

    it("should return default scale when theme has no shadows", () => {
      const theme: ThemeSpecification = {};
      const scale = extractShadowScale(theme);
      expect(scale).toEqual(DEFAULT_SHADOW_SCALE);
    });

    it("should extract shadow scale from theme", () => {
      const theme: ThemeSpecification = {
        shadows: {
          sm: "0 1px 2px rgba(0,0,0,0.1)",
          lg: "0 10px 20px rgba(0,0,0,0.2)",
        },
      };
      const scale = extractShadowScale(theme);
      expect(scale.sm).toBe("0 1px 2px rgba(0,0,0,0.1)");
      expect(scale.lg).toBe("0 10px 20px rgba(0,0,0,0.2)");
    });
  });

  describe("generateShadowVariables", () => {
    it("should generate CSS variables for default scale", () => {
      const variables = generateShadowVariables();
      expect(variables["--shadow-sm"]).toBe(DEFAULT_SHADOW_SCALE.sm);
      expect(variables["--shadow-lg"]).toBe(DEFAULT_SHADOW_SCALE.lg);
      expect(variables["--shadow-none"]).toBe(DEFAULT_SHADOW_SCALE.none);
    });

    it("should include semantic shadows", () => {
      const variables = generateShadowVariables();
      expect(variables["--shadow-card"]).toBe(SEMANTIC_SHADOW_PRESETS.card);
      expect(variables["--shadow-modal"]).toBe(SEMANTIC_SHADOW_PRESETS.modal);
    });

    it("should use custom prefix", () => {
      const variables = generateShadowVariables(DEFAULT_SHADOW_SCALE, "--custom-shadow");
      expect(variables["--custom-shadow-sm"]).toBe(DEFAULT_SHADOW_SCALE.sm);
    });
  });

  describe("shadowsToVariables", () => {
    it("should generate variables from theme", () => {
      const theme: ThemeSpecification = {
        shadows: {
          sm: "0 1px 2px rgba(0,0,0,0.1)",
          lg: "0 10px 20px rgba(0,0,0,0.2)",
        },
      };
      const variables = shadowsToVariables(theme);
      expect(variables["--shadow-sm"]).toBe("0 1px 2px rgba(0,0,0,0.1)");
      expect(variables["--shadow-lg"]).toBe("0 10px 20px rgba(0,0,0,0.2)");
    });

    it("should generate default variables when no theme", () => {
      const variables = shadowsToVariables();
      expect(variables["--shadow-sm"]).toBe(DEFAULT_SHADOW_SCALE.sm);
    });
  });

  describe("combineShadows", () => {
    it("should combine multiple shadows", () => {
      const combined = combineShadows(DEFAULT_SHADOW_SCALE.sm, DEFAULT_SHADOW_SCALE.inner);
      expect(combined).toBe(`${DEFAULT_SHADOW_SCALE.sm}, ${DEFAULT_SHADOW_SCALE.inner}`);
    });

    it("should filter out empty values", () => {
      const combined = combineShadows(DEFAULT_SHADOW_SCALE.sm, "", DEFAULT_SHADOW_SCALE.lg);
      expect(combined).toBe(`${DEFAULT_SHADOW_SCALE.sm}, ${DEFAULT_SHADOW_SCALE.lg}`);
    });

    it("should return empty string for no valid shadows", () => {
      const combined = combineShadows("", "");
      expect(combined).toBe("");
    });
  });

  describe("createResponsiveShadow", () => {
    it("should create responsive shadow configuration", () => {
      const responsive = createResponsiveShadow({
        base: "sm",
        md: "lg",
        xl: "2xl",
      });
      expect(responsive.shadow).toBe(DEFAULT_SHADOW_SCALE.sm);
      expect(responsive["shadow-md"]).toBe(DEFAULT_SHADOW_SCALE.lg);
      expect(responsive["shadow-xl"]).toBe(DEFAULT_SHADOW_SCALE["2xl"]);
    });

    it("should handle semantic shadow keys", () => {
      const responsive = createResponsiveShadow({
        base: "card",
        lg: "modal",
      });
      expect(responsive.shadow).toBe(SEMANTIC_SHADOW_PRESETS.card);
      expect(responsive["shadow-lg"]).toBe(SEMANTIC_SHADOW_PRESETS.modal);
    });

    it("should handle raw shadow values", () => {
      const rawShadow = "0 0 5px red";
      const responsive = createResponsiveShadow({
        base: rawShadow,
      });
      expect(responsive.shadow).toBe(rawShadow);
    });

    it("should handle empty configuration", () => {
      const responsive = createResponsiveShadow({});
      expect(responsive).toEqual({});
    });
  });
});
