/**
 * Brand theme generator
 *
 * Utilities for generating complete theme specifications from brand presets
 */

import type {
  BrandPreset,
  BrandThemeOptions,
  GeneratedBrandTheme,
  BrandColors,
  BrandTypography,
  BrandPersonality,
} from "./types";
import type { ThemeSpecification } from "../../../types/schema/specification";
import { getPreset } from "./presets";
import { generateColorScale } from "../color-system";

/**
 * Generate a complete theme from brand options
 */
export function generateBrandTheme(options: BrandThemeOptions): GeneratedBrandTheme {
  // Start with a preset if provided
  let preset: BrandPreset;
  if (options.preset) {
    const basePreset = getPreset(options.preset);
    if (!basePreset) {
      throw new Error(`Unknown preset: ${options.preset}`);
    }
    preset = basePreset;
  } else {
    // Create a custom preset from options
    preset = createCustomPreset(options);
  }

  // Apply overrides
  const mergedColors = { ...preset.colors, ...options.colors };
  const mergedTypography = {
    ...preset.typography,
    ...options.typography,
  };
  const mergedPersonality = {
    ...preset.personality,
    ...options.personality,
  };

  // Generate theme specification
  const theme = generateThemeFromPreset(
    {
      ...preset,
      colors: mergedColors,
      typography: mergedTypography,
      personality: mergedPersonality,
    },
    options.overrides
  );

  return {
    theme,
    preset,
    metadata: {
      generatedAt: new Date().toISOString(),
      version: "1.0.0",
    },
  };
}

/**
 * Create a custom preset from options
 */
function createCustomPreset(options: BrandThemeOptions): BrandPreset {
  return {
    id: "custom",
    name: "Custom Brand",
    description: "Custom generated brand theme",
    category: "professional",
    colors: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#10B981",
      neutral: "#6B7280",
      background: "#FFFFFF",
      foreground: "#000000",
      success: "#10B981",
      error: "#EF4444",
      warning: "#F59E0B",
      info: "#3B82F6",
      ...options.colors,
    },
    typography: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif",
        mono: "Fira Code, monospace",
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      letterSpacing: "-0.01em",
      lineHeight: "1.5",
      ...options.typography,
    },
    personality: {
      modern: 70,
      professional: 80,
      playful: 30,
      minimal: 60,
      bold: 50,
      elegant: 50,
      ...options.personality,
    },
  };
}

/**
 * Generate a complete theme specification from a preset
 */
function generateThemeFromPreset(
  preset: BrandPreset,
  overrides?: Partial<ThemeSpecification>
): ThemeSpecification {
  const theme: ThemeSpecification = {
    colors: generateColorsFromBrand(preset.colors),
    typography: generateTypographyFromBrand(preset.typography),
    spacing: generateSpacingFromPersonality(preset.personality),
    animations: generateAnimationFromPersonality(preset.personality),
    borderRadius: generateRadiusFromPersonality(preset.personality),
    shadows: generateShadowsFromPersonality(preset.personality),
    ...preset.settings,
    ...overrides,
  };

  return theme;
}

/**
 * Generate color system from brand colors
 */
function generateColorsFromBrand(colors: BrandColors): ThemeSpecification["colors"] {
  const generatedColors: ThemeSpecification["colors"] = {
    primary: generateColorScale({ baseColor: colors.primary }),
    secondary: colors.secondary ? generateColorScale({ baseColor: colors.secondary }) : undefined,
    accent: colors.accent ? generateColorScale({ baseColor: colors.accent }) : undefined,
    neutral: colors.neutral
      ? generateColorScale({ baseColor: colors.neutral })
      : {
          "50": "#fafafa",
          "100": "#f5f5f5",
          "200": "#e5e5e5",
          "300": "#d4d4d4",
          "400": "#a3a3a3",
          "500": "#737373",
          "600": "#525252",
          "700": "#404040",
          "800": "#262626",
          "900": "#171717",
        },
    success: colors.success ? generateColorScale({ baseColor: colors.success }) : undefined,
    error: colors.error ? generateColorScale({ baseColor: colors.error }) : undefined,
    warning: colors.warning ? generateColorScale({ baseColor: colors.warning }) : undefined,
    info: colors.info ? generateColorScale({ baseColor: colors.info }) : undefined,
  };

  if (colors.background) {
    generatedColors.background = {
      default: colors.background,
    };
  }

  if (colors.foreground) {
    generatedColors.text = {
      default: colors.foreground,
    };
  }

  return generatedColors;
}

/**
 * Generate typography system from brand typography
 */
function generateTypographyFromBrand(
  typography: BrandTypography
): ThemeSpecification["typography"] {
  return {
    fontFamilies: {
      sans: [typography.fontFamily?.body || "Inter, sans-serif"],
      serif: ["Georgia, serif"],
      mono: [typography.fontFamily?.mono || "Fira Code, monospace"],
      display: [
        typography.fontFamily?.heading || typography.fontFamily?.body || "Inter, sans-serif",
      ],
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: typography.fontWeight?.light || 300,
      normal: typography.fontWeight?.regular || 400,
      medium: typography.fontWeight?.medium || 500,
      semibold: typography.fontWeight?.semibold || 600,
      bold: typography.fontWeight?.bold || 700,
      extrabold: 800,
      black: 900,
    },
    lineHeights: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: typography.lineHeight || "1.5",
      relaxed: "1.625",
      loose: "2",
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: typography.letterSpacing || "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  };
}

/**
 * Generate spacing from personality traits
 */
function generateSpacingFromPersonality(
  personality: BrandPersonality
): ThemeSpecification["spacing"] {
  const isMinimal = personality.minimal > 70;
  const isVeryMinimal = personality.minimal >= 100;
  const isBold = personality.bold > 70;

  let baseScale = 0.3125;
  if (isVeryMinimal) {
    baseScale = 0.125;
  } else if (isMinimal) {
    baseScale = 0.25;
  } else if (isBold) {
    baseScale = 0.375;
  }

  return {
    0: "0",
    px: "1px",
    0.5: `${baseScale * 0.5}rem`,
    1: `${baseScale}rem`,
    1.5: `${baseScale * 1.5}rem`,
    2: `${baseScale * 2}rem`,
    2.5: `${baseScale * 2.5}rem`,
    3: `${baseScale * 3}rem`,
    3.5: `${baseScale * 3.5}rem`,
    4: `${baseScale * 4}rem`,
    5: `${baseScale * 5}rem`,
    6: `${baseScale * 6}rem`,
    7: `${baseScale * 7}rem`,
    8: `${baseScale * 8}rem`,
    9: `${baseScale * 9}rem`,
    10: `${baseScale * 10}rem`,
    12: `${baseScale * 12}rem`,
    14: `${baseScale * 14}rem`,
    16: `${baseScale * 16}rem`,
    20: `${baseScale * 20}rem`,
    24: `${baseScale * 24}rem`,
    28: `${baseScale * 28}rem`,
    32: `${baseScale * 32}rem`,
  };
}

/**
 * Generate animation settings from personality
 */
function generateAnimationFromPersonality(
  personality: BrandPersonality
): ThemeSpecification["animations"] {
  const isPlayful = personality.playful > 70;
  const isElegant = personality.elegant > 70;
  const isMinimal = personality.minimal > 70;

  let baseDuration: string;
  if (isElegant) {
    baseDuration = "400ms";
  } else if (isPlayful) {
    baseDuration = "200ms";
  } else {
    baseDuration = "300ms";
  }
  const fastDuration = isPlayful ? "150ms" : "200ms";
  const slowDuration = isElegant ? "700ms" : "500ms";

  const baseEasing = isElegant ? "cubic-bezier(0.4, 0, 0.2, 1)" : "cubic-bezier(0.4, 0, 0.6, 1)";

  return {
    fadeIn: {
      duration: baseDuration,
      easing: baseEasing,
    },
    fadeOut: {
      duration: baseDuration,
      easing: baseEasing,
    },
    slideIn: {
      duration: fastDuration,
      easing: "cubic-bezier(0, 0, 0.2, 1)",
    },
    slideOut: {
      duration: fastDuration,
      easing: "cubic-bezier(0.4, 0, 1, 1)",
    },
    scaleIn: {
      duration: baseDuration,
      easing: isPlayful ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)" : baseEasing,
    },
    scaleOut: {
      duration: baseDuration,
      easing: baseEasing,
    },
    rotate: {
      duration: slowDuration,
      easing: "linear",
    },
    ...(isMinimal
      ? {}
      : {
          bounce: {
            duration: "500ms",
            easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          },
        }),
  };
}

/**
 * Generate border radius from personality
 */
function generateRadiusFromPersonality(
  personality: BrandPersonality
): ThemeSpecification["borderRadius"] {
  const isPlayful = personality.playful > 70;
  const isMinimal = personality.minimal > 70;
  const isBold = personality.bold > 70;

  if (isMinimal) {
    return {
      none: "0",
      sm: "0.125rem",
      base: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    };
  }

  if (isPlayful || isBold) {
    return {
      none: "0",
      sm: "0.25rem",
      base: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.5rem",
      "2xl": "2rem",
      "3xl": "3rem",
      full: "9999px",
    };
  }

  // Default
  return {
    none: "0",
    sm: "0.125rem",
    base: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    full: "9999px",
  };
}

/**
 * Generate shadows from personality
 */
function generateShadowsFromPersonality(
  personality: BrandPersonality
): ThemeSpecification["shadows"] {
  const isMinimal = personality.minimal > 70;
  const isBold = personality.bold > 70;
  const isElegant = personality.elegant > 70;

  if (isMinimal) {
    return {
      none: "none",
      sm: "0 1px 2px rgb(0 0 0 / 0.05)",
      base: "0 2px 4px rgb(0 0 0 / 0.05)",
      md: "0 4px 6px rgb(0 0 0 / 0.05)",
      lg: "0 8px 16px rgb(0 0 0 / 0.05)",
      xl: "0 16px 24px rgb(0 0 0 / 0.05)",
      "2xl": "0 24px 48px rgb(0 0 0 / 0.05)",
      "3xl": "0 32px 64px rgb(0 0 0 / 0.05)",
    };
  }

  if (isBold) {
    return {
      none: "none",
      sm: "0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)",
      base: "0 4px 6px rgb(0 0 0 / 0.1), 0 2px 4px rgb(0 0 0 / 0.06)",
      md: "0 8px 12px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.06)",
      lg: "0 16px 24px rgb(0 0 0 / 0.1), 0 8px 12px rgb(0 0 0 / 0.06)",
      xl: "0 24px 36px rgb(0 0 0 / 0.1), 0 12px 16px rgb(0 0 0 / 0.06)",
      "2xl": "0 32px 48px rgb(0 0 0 / 0.1), 0 16px 24px rgb(0 0 0 / 0.06)",
      "3xl": "0 48px 64px rgb(0 0 0 / 0.1), 0 24px 32px rgb(0 0 0 / 0.06)",
    };
  }

  if (isElegant) {
    return {
      none: "none",
      sm: "0 1px 2px rgb(0 0 0 / 0.04)",
      base: "0 2px 8px rgb(0 0 0 / 0.04)",
      md: "0 4px 16px rgb(0 0 0 / 0.04)",
      lg: "0 8px 24px rgb(0 0 0 / 0.04)",
      xl: "0 12px 32px rgb(0 0 0 / 0.04)",
      "2xl": "0 16px 48px rgb(0 0 0 / 0.04)",
      "3xl": "0 24px 64px rgb(0 0 0 / 0.04)",
    };
  }

  // Default
  return {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.05)",
    base: "0 2px 6px rgb(0 0 0 / 0.05)",
    md: "0 4px 12px rgb(0 0 0 / 0.05)",
    lg: "0 8px 20px rgb(0 0 0 / 0.05)",
    xl: "0 16px 32px rgb(0 0 0 / 0.05)",
    "2xl": "0 24px 48px rgb(0 0 0 / 0.05)",
    "3xl": "0 32px 64px rgb(0 0 0 / 0.05)",
  };
}
