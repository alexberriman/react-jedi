/**
 * Brand preset utilities
 *
 * Helper functions for working with brand presets
 */

import type { BrandPreset, BrandPersonality } from "./types";
import type { ThemeSpecification } from "@/types/schema/specification";
import { brandPresets, getPreset } from "./presets";
import { generateBrandTheme } from "./generator";

/**
 * Get personality traits as a readable description
 */
export function describePersonality(personality: BrandPersonality): string {
  const traits: string[] = [];
  
  if (personality.modern > 80) traits.push("very modern");
  else if (personality.modern > 60) traits.push("modern");
  
  if (personality.professional > 80) traits.push("highly professional");
  else if (personality.professional > 60) traits.push("professional");
  
  if (personality.playful > 80) traits.push("very playful");
  else if (personality.playful > 60) traits.push("playful");
  
  if (personality.minimal > 80) traits.push("ultra-minimal");
  else if (personality.minimal > 60) traits.push("minimal");
  
  if (personality.bold >= 80) traits.push("very bold");
  else if (personality.bold > 60) traits.push("bold");
  
  if (personality.elegant > 80) traits.push("highly elegant");
  else if (personality.elegant > 60) traits.push("elegant");
  
  return traits.join(", ");
}

/**
 * Analyze a theme and suggest personality traits
 */
export function analyzeThemePersonality(theme: ThemeSpecification): BrandPersonality {
  const personality: BrandPersonality = {
    modern: 50,
    professional: 50,
    playful: 50,
    minimal: 50,
    bold: 50,
    elegant: 50,
  };
  
  // Analyze typography
  if (theme.typography?.fontFamilies?.sans?.some(f => f.includes("Inter")) ||
      theme.typography?.fontFamilies?.sans?.some(f => f.includes("system-ui"))) {
    personality.modern += 10;
  }
  
  if (theme.typography?.fontFamilies?.serif?.some(f => f.includes("Georgia")) ||
      theme.typography?.fontFamilies?.serif?.some(f => f.includes("Playfair"))) {
    personality.elegant += 10;
    personality.professional += 10;
  }
  
  // Analyze spacing
  const spacingValues = Object.values(theme.spacing || {});
  const hasLargeSpacing = spacingValues.some((val) => 
    typeof val === "string" && Number.parseFloat(val) > 4
  );
  if (hasLargeSpacing) {
    personality.minimal += 10;
  }
  
  // Analyze animation
  if (!theme.animations || Object.keys(theme.animations).length === 0) {
    personality.minimal += 20;
    personality.professional += 10;
  } else if (theme.animations?.slideIn?.duration === "150ms") {
    personality.playful += 15;
  }
  
  // Analyze border radius
  const radiusValues = Object.values(theme.borderRadius || {});
  const hasLargeRadius = radiusValues.some((val) =>
    typeof val === "string" && Number.parseFloat(val) > 1
  );
  if (hasLargeRadius) {
    personality.playful += 10;
    personality.modern += 10;
  }
  
  // Analyze shadows
  const shadowValues = Object.values(theme.shadows || {});
  const hasSubtleShadows = shadowValues.some((val) =>
    typeof val === "string" && val.includes("0.04")
  );
  if (hasSubtleShadows) {
    personality.elegant += 15;
  } else {
    personality.bold += 10;
  }
  
  // Normalize values to 0-100
  for (const key of Object.keys(personality)) {
    personality[key as keyof BrandPersonality] = Math.min(100, Math.max(0, personality[key as keyof BrandPersonality]));
  }
  
  return personality;
}

/**
 * Find best matching preset for a given theme
 */
export function findMatchingPreset(theme: ThemeSpecification): BrandPreset | null {
  const personality = analyzeThemePersonality(theme);
  let bestMatch: BrandPreset | null = null;
  let lowestDistance = Infinity;
  
  for (const preset of Object.values(brandPresets)) {
    const distance = calculatePersonalityDistance(personality, preset.personality);
    if (distance < lowestDistance) {
      lowestDistance = distance;
      bestMatch = preset;
    }
  }
  
  return bestMatch;
}

/**
 * Calculate distance between two personalities
 */
function calculatePersonalityDistance(
  a: BrandPersonality,
  b: BrandPersonality
): number {
  const traits: (keyof BrandPersonality)[] = [
    "modern",
    "professional",
    "playful",
    "minimal",
    "bold",
    "elegant",
  ];
  
  let sum = 0;
  for (const trait of traits) {
    const diff = a[trait] - b[trait];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

/**
 * Merge two brand presets
 */
export function mergePresets(
  primary: BrandPreset,
  secondary: BrandPreset,
  ratio: number = 0.5
): BrandPreset {
  const primaryWeight = 1 - ratio;
  const secondaryWeight = ratio;
  
  return {
    id: `${primary.id}-${secondary.id}`,
    name: `${primary.name} + ${secondary.name}`,
    description: `Blend of ${primary.name} and ${secondary.name}`,
    category: primary.category,
    colors: {
      ...primary.colors,
      ...secondary.colors,
      primary: primary.colors.primary, // Keep primary color from first preset
    },
    typography: {
      ...primary.typography,
      ...secondary.typography,
    },
    personality: {
      modern: Math.round(
        primary.personality.modern * primaryWeight +
        secondary.personality.modern * secondaryWeight
      ),
      professional: Math.round(
        primary.personality.professional * primaryWeight +
        secondary.personality.professional * secondaryWeight
      ),
      playful: Math.round(
        primary.personality.playful * primaryWeight +
        secondary.personality.playful * secondaryWeight
      ),
      minimal: Math.round(
        primary.personality.minimal * primaryWeight +
        secondary.personality.minimal * secondaryWeight
      ),
      bold: Math.round(
        primary.personality.bold * primaryWeight +
        secondary.personality.bold * secondaryWeight
      ),
      elegant: Math.round(
        primary.personality.elegant * primaryWeight +
        secondary.personality.elegant * secondaryWeight
      ),
    },
  };
}

/**
 * Create a theme from preset ID
 */
export function createThemeFromPreset(presetId: string): ThemeSpecification {
  const preset = getPreset(presetId);
  if (!preset) {
    throw new Error(`Unknown preset: ${presetId}`);
  }
  
  const generated = generateBrandTheme({ preset: presetId });
  return generated.theme;
}

/**
 * Get complementary presets
 */
export function getComplementaryPresets(preset: BrandPreset): BrandPreset[] {
  const complementary: BrandPreset[] = [];
  
  // Find presets with opposite personality traits
  for (const candidate of Object.values(brandPresets)) {
    if (candidate.id === preset.id) continue;
    
    const isOpposite = (
      Math.abs(preset.personality.minimal - candidate.personality.minimal) > 50 ||
      Math.abs(preset.personality.playful - candidate.personality.playful) > 50 ||
      Math.abs(preset.personality.bold - candidate.personality.bold) > 50
    );
    
    if (isOpposite) {
      complementary.push(candidate);
    }
  }
  
  return complementary;
}