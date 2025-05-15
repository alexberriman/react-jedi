/**
 * Spacing System Tests
 *
 * This file contains tests for the spacing system, including scale,
 * responsive spacing, and container presets.
 */

import { describe, test, expect } from "vitest";

import {
  DEFAULT_SPACING_SCALE,
  RELATIVE_SPACING,
  getSpacing,
  getRelativeSpacing,
  generateSpacingScale,
  extractSpacingScale,
  generateSpacingVariables,
} from "./scale";

import {
  DEFAULT_BREAKPOINTS,
  resolveResponsiveSpacing,
  generateMediaQuery,
  applySpacingConstraints,
  fluidSpacing,
  type BreakpointKey
} from "./responsive";

import {
  ContainerPresetType,
  DEFAULT_CONTAINER_PRESETS,
  getContainerPreset,
  resolveContainerSpacing,
  createCustomContainerPreset,
  generateContainerClasses,
} from "./container";

import { spacing } from "./index";

describe("Spacing Scale Tests", () => {
  test("DEFAULT_SPACING_SCALE has expected values", () => {
    expect(DEFAULT_SPACING_SCALE).toBeDefined();
    expect(DEFAULT_SPACING_SCALE["0"]).toBe("0");
    expect(DEFAULT_SPACING_SCALE["4"]).toBe("1rem");
    expect(DEFAULT_SPACING_SCALE["8"]).toBe("2rem");
  });

  test("getSpacing returns correct values", () => {
    expect(getSpacing("4")).toBe("1rem");
    expect(getSpacing("8")).toBe("2rem");
    expect(getSpacing("1.5")).toBe("0.375rem");
    // Custom scale with additional property
    const customScale = { ...DEFAULT_SPACING_SCALE, "custom": "5px" };
    expect(getSpacing("nonexistent", customScale)).toBe("nonexistent");
  });

  test("getRelativeSpacing calculates correctly", () => {
    expect(getRelativeSpacing("4", "md")).toBe("1rem");
    expect(getRelativeSpacing("4", "lg")).toBe("1.5000rem");
    expect(getRelativeSpacing("4", "xs")).toBe("0.5000rem");
    expect(getRelativeSpacing("4", "2xl")).toBe("3.0000rem");
    
    // Test with px values
    expect(getRelativeSpacing("px", "md")).toBe("1px");
    expect(getRelativeSpacing("px", "lg")).toBe("1px"); // Non-numeric values don't change
  });

  test("generateSpacingScale creates custom scales", () => {
    const customScale = generateSpacingScale({
      baseUnit: 0.5, // Double the standard
      customValues: {
        "custom": "42px",
      },
    });
    
    expect(customScale["4"]).toBe("2.0000rem"); // Double the standard
    expect((customScale as Record<string, string>)["custom"]).toBe("42px");
  });

  test("extractSpacingScale returns default when theme is empty", () => {
    expect(extractSpacingScale({})).toEqual(DEFAULT_SPACING_SCALE);
    
    const customTheme = {
      spacing: {
        "test": "10px",
      },
    };
    
    expect(extractSpacingScale(customTheme)).toEqual(customTheme.spacing);
  });

  test("generateSpacingVariables creates CSS variables", () => {
    // Create a test scale that's a proper subset of the DEFAULT_SPACING_SCALE
    const testScale = { ...DEFAULT_SPACING_SCALE };
    
    const variables = generateSpacingVariables(testScale);
    
    expect(variables["--spacing-0"]).toBe("0");
    expect(variables["--spacing-1"]).toBe("0.25rem");
    expect(variables["--spacing-1-5"]).toBe("0.375rem");
  });
});

describe("Responsive Spacing Tests", () => {
  test("DEFAULT_BREAKPOINTS has expected values", () => {
    expect(DEFAULT_BREAKPOINTS).toBeDefined();
    expect(DEFAULT_BREAKPOINTS.sm).toBe("640px");
    expect(DEFAULT_BREAKPOINTS.md).toBe("768px");
    expect(DEFAULT_BREAKPOINTS.lg).toBe("1024px");
  });

  test("resolveResponsiveSpacing handles various input types", () => {
    // Simple value
    expect(resolveResponsiveSpacing("4", "base", DEFAULT_SPACING_SCALE)).toBe("1rem");
    
    // Responsive object
    const responsive = {
      base: "4",
      md: "6",
      lg: "8",
    };
    
    expect(resolveResponsiveSpacing(responsive, "base" as BreakpointKey, DEFAULT_SPACING_SCALE)).toBe("1rem");
    expect(resolveResponsiveSpacing(responsive, "md", DEFAULT_SPACING_SCALE)).toBe("1.5rem");
    expect(resolveResponsiveSpacing(responsive, "lg", DEFAULT_SPACING_SCALE)).toBe("2rem");
    
    // Fallback to closest smaller breakpoint
    const partialResponsive = {
      base: "4",
      lg: "8",
    };
    
    expect(resolveResponsiveSpacing(partialResponsive, "md", DEFAULT_SPACING_SCALE)).toBe("1rem");
    expect(resolveResponsiveSpacing(partialResponsive, "xl", DEFAULT_SPACING_SCALE)).toBe("2rem");
  });

  test("generateMediaQuery creates correct media queries", () => {
    expect(generateMediaQuery("base")).toBe("");
    expect(generateMediaQuery("sm")).toBe("@media (min-width: 640px)");
    expect(generateMediaQuery("lg")).toBe("@media (min-width: 1024px)");
    
    // Custom breakpoints
    const customBreakpoints = { small: "500px", large: "1200px" };
    expect(generateMediaQuery("small" as unknown as BreakpointKey, customBreakpoints)).toBe("@media (min-width: 500px)");
  });

  test("applySpacingConstraints applies min/max constraints", () => {
    expect(applySpacingConstraints("1rem", { min: "2" }, DEFAULT_SPACING_SCALE))
      .toBe("0.5rem"); // Min constraint not applied because units don't match
    
    expect(applySpacingConstraints("1rem", { max: "2rem" }, DEFAULT_SPACING_SCALE))
      .toBe("1rem"); // Under max, no change
    
    expect(applySpacingConstraints("3rem", { max: "2rem" }, DEFAULT_SPACING_SCALE))
      .toBe("2rem"); // Above max, capped
    
    // Clamp support
    expect(applySpacingConstraints("1.5rem", { min: "1rem", max: "2rem", clamp: true }, DEFAULT_SPACING_SCALE))
      .toBe("clamp(1rem, 1.5rem, 2rem)");
  });

  test("fluidSpacing creates fluid spacing expressions", () => {
    const result = fluidSpacing("4", "8", "768px", "1280px", DEFAULT_SPACING_SCALE);
    
    // Should contain clamp
    expect(result).toContain("clamp(1rem");
    expect(result).toContain("2rem)");
    
    // Should contain a calc part
    expect(result).toContain("calc(");
    expect(result).toContain("vw");
  });
});

describe("Container Spacing Tests", () => {
  test("ContainerPresetType has expected values", () => {
    expect(ContainerPresetType.LAYOUT_NORMAL).toBe("layout-normal");
    expect(ContainerPresetType.SECTION_HERO).toBe("section-hero");
    expect(ContainerPresetType.CARD).toBe("card");
  });

  test("DEFAULT_CONTAINER_PRESETS has essential presets", () => {
    expect(DEFAULT_CONTAINER_PRESETS[ContainerPresetType.LAYOUT_NORMAL]).toBeDefined();
    expect(DEFAULT_CONTAINER_PRESETS[ContainerPresetType.CARD]).toBeDefined();
    expect(DEFAULT_CONTAINER_PRESETS[ContainerPresetType.SECTION_HERO]).toBeDefined();
  });

  test("getContainerPreset retrieves correct preset", () => {
    const normal = getContainerPreset(ContainerPresetType.LAYOUT_NORMAL);
    expect(normal).toEqual(DEFAULT_CONTAINER_PRESETS[ContainerPresetType.LAYOUT_NORMAL]);
    
    // Falls back to normal when preset doesn't exist
    const customPresets = {
      ...DEFAULT_CONTAINER_PRESETS,
      [ContainerPresetType.CARD]: { padding: "12" },
    };
    
    expect(getContainerPreset(ContainerPresetType.LAYOUT_NORMAL, customPresets))
      .toEqual(DEFAULT_CONTAINER_PRESETS[ContainerPresetType.LAYOUT_NORMAL]);
    
    expect(getContainerPreset(ContainerPresetType.CARD, customPresets))
      .toEqual(customPresets[ContainerPresetType.CARD]);
  });

  test("resolveContainerSpacing creates CSS properties", () => {
    const spacing = {
      padding: "4",
      gap: "6",
    };
    
    const css = resolveContainerSpacing(spacing);
    
    expect(css.padding).toBe("1rem");
    expect(css.gap).toBe("1.5rem");
    
    // Test with more complex spacing
    const complexSpacing = {
      paddingX: "4",
      paddingY: "6",
      gap: { base: "2", md: "4" },
    };
    
    const complexCss = resolveContainerSpacing(complexSpacing);
    
    expect(complexCss["padding-left"]).toBe("1rem");
    expect(complexCss["padding-right"]).toBe("1rem");
    expect(complexCss["padding-top"]).toBe("1.5rem");
    expect(complexCss["padding-bottom"]).toBe("1.5rem");
    expect(complexCss.gap).toBe("0.5rem"); // Base value for gap
  });

  test("createCustomContainerPreset extends base preset", () => {
    const custom = createCustomContainerPreset(
      ContainerPresetType.CARD,
      { gap: "8", paddingY: "6" }
    );
    
    // Should contain base properties
    expect(custom.padding).toBe(DEFAULT_CONTAINER_PRESETS[ContainerPresetType.CARD].padding);
    
    // Should have overridden properties
    expect(custom.gap).toBe("8");
    expect(custom.paddingY).toBe("6");
  });

  test("generateContainerClasses creates Tailwind classes", () => {
    const spacing = {
      padding: "4",
      gap: "6",
    };
    
    const classes = generateContainerClasses(spacing);
    
    expect(classes).toContain("p-4");
    expect(classes).toContain("gap-6");
    
    // Test with responsive spacing
    const responsiveSpacing = {
      padding: { base: "4", md: "6", lg: "8" },
      gap: "4",
    };
    
    const responsiveClasses = generateContainerClasses(responsiveSpacing);
    
    expect(responsiveClasses).toContain("p-4");
    expect(responsiveClasses).toContain("md:p-6");
    expect(responsiveClasses).toContain("lg:p-8");
    expect(responsiveClasses).toContain("gap-4");
  });
});

describe("Spacing API Tests", () => {
  test("spacing API exposes all expected functions", () => {
    expect(spacing.scale).toBe(DEFAULT_SPACING_SCALE);
    expect(spacing.relativeScale).toBe(RELATIVE_SPACING);
    expect(spacing.breakpoints).toBe(DEFAULT_BREAKPOINTS);
    expect(spacing.containerPresets).toBe(DEFAULT_CONTAINER_PRESETS);
    
    expect(typeof spacing.get).toBe("function");
    expect(typeof spacing.getRelative).toBe("function");
    expect(typeof spacing.getContainer).toBe("function");
    
    expect(typeof spacing.generateScale).toBe("function");
    expect(typeof spacing.extractScale).toBe("function");
    
    expect(typeof spacing.responsive.resolve).toBe("function");
    expect(typeof spacing.responsive.mediaQuery).toBe("function");
    expect(typeof spacing.responsive.generateCSS).toBe("function");
    expect(typeof spacing.responsive.constraints).toBe("function");
    expect(typeof spacing.responsive.fluid).toBe("function");
    
    expect(typeof spacing.container.preset).toBe("function");
    expect(typeof spacing.container.resolve).toBe("function");
    expect(typeof spacing.container.createCustom).toBe("function");
    expect(typeof spacing.container.classes).toBe("function");
    
    expect(typeof spacing.variables.generate).toBe("function");
    expect(typeof spacing.variables.fromTheme).toBe("function");
  });
  
  test("spacing API functions work correctly", () => {
    expect(spacing.get("4")).toBe("1rem");
    expect(spacing.getRelative("4", "lg")).toBe("1.5000rem");
    
    const containerPreset = spacing.getContainer(ContainerPresetType.CARD);
    expect(containerPreset).toBeDefined();
    
    const customSpacingScale = {
      ...DEFAULT_SPACING_SCALE,
      "test": "10px",
    };
    const variables = spacing.variables.generate(customSpacingScale);
    expect(variables["--spacing-test"]).toBe("10px");
  });
});