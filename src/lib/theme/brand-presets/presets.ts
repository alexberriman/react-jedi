/**
 * Brand preset themes
 *
 * Collection of pre-designed themes for different industries and styles
 */

import type { BrandPreset, BrandCategory } from "./types";

/**
 * Technology startup preset
 */
export const techStartupPreset: BrandPreset = {
  id: "tech-startup",
  name: "Tech Startup",
  description: "Modern, innovative theme for technology companies",
  category: "technology",
  colors: {
    primary: "#5B4FFF",
    secondary: "#00D9FF",
    accent: "#FF4F9B",
    neutral: "#1A1A1A",
    background: "#FFFFFF",
    foreground: "#000000",
    success: "#00C851",
    error: "#FF4444",
    warning: "#FFB500",
    info: "#33B5E5",
  },
  typography: {
    fontFamily: {
      heading: "Inter, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: "-0.02em",
    lineHeight: "1.5",
  },
  personality: {
    modern: 95,
    professional: 75,
    playful: 40,
    minimal: 60,
    bold: 80,
    elegant: 50,
  },
};

/**
 * Financial services preset
 */
export const financePreset: BrandPreset = {
  id: "finance",
  name: "Financial Services",
  description: "Professional, trustworthy theme for financial institutions",
  category: "finance",
  colors: {
    primary: "#003366",
    secondary: "#005599",
    accent: "#00AA44",
    neutral: "#333333",
    background: "#F8F9FA",
    foreground: "#212529",
    success: "#28A745",
    error: "#DC3545",
    warning: "#FFC107",
    info: "#17A2B8",
  },
  typography: {
    fontFamily: {
      heading: "Playfair Display, serif",
      body: "Source Sans Pro, sans-serif",
      mono: "Roboto Mono, monospace",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: "0",
    lineHeight: "1.6",
  },
  personality: {
    modern: 50,
    professional: 100,
    playful: 10,
    minimal: 40,
    bold: 60,
    elegant: 80,
  },
};

/**
 * Healthcare preset
 */
export const healthcarePreset: BrandPreset = {
  id: "healthcare",
  name: "Healthcare",
  description: "Clean, caring theme for healthcare and medical services",
  category: "healthcare",
  colors: {
    primary: "#0077B6",
    secondary: "#00B4D8",
    accent: "#90E0EF",
    neutral: "#495057",
    background: "#FFFFFF",
    foreground: "#212529",
    success: "#52C41A",
    error: "#F5222D",
    warning: "#FAAD14",
    info: "#1890FF",
  },
  typography: {
    fontFamily: {
      heading: "Poppins, sans-serif",
      body: "Roboto, sans-serif",
      mono: "Courier New, monospace",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: "0.01em",
    lineHeight: "1.7",
  },
  personality: {
    modern: 70,
    professional: 90,
    playful: 20,
    minimal: 70,
    bold: 40,
    elegant: 60,
  },
};

/**
 * Creative agency preset
 */
export const creativePreset: BrandPreset = {
  id: "creative-agency",
  name: "Creative Agency",
  description: "Bold, expressive theme for creative and design agencies",
  category: "creative",
  colors: {
    primary: "#FF006E",
    secondary: "#8338EC",
    accent: "#FFBE0B",
    neutral: "#1D1D1D",
    background: "#0F0F0F",
    foreground: "#FFFFFF",
    success: "#06FFA5",
    error: "#FF4040",
    warning: "#FFB700",
    info: "#00B4D8",
  },
  typography: {
    fontFamily: {
      heading: "Bebas Neue, Impact, sans-serif",
      body: "DM Sans, sans-serif",
      mono: "Space Mono, monospace",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: "-0.03em",
    lineHeight: "1.4",
  },
  personality: {
    modern: 100,
    professional: 60,
    playful: 90,
    minimal: 30,
    bold: 100,
    elegant: 40,
  },
};

/**
 * Minimal preset
 */
export const minimalPreset: BrandPreset = {
  id: "minimal",
  name: "Minimal",
  description: "Clean, minimalist theme with focus on content",
  category: "minimal",
  colors: {
    primary: "#000000",
    secondary: "#666666",
    accent: "#0066CC",
    neutral: "#888888",
    background: "#FFFFFF",
    foreground: "#000000",
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
  },
  typography: {
    fontFamily: {
      heading: "Helvetica Neue, Arial, sans-serif",
      body: "Helvetica Neue, Arial, sans-serif",
      mono: "Monaco, Consolas, monospace",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: "0",
    lineHeight: "1.5",
  },
  personality: {
    modern: 80,
    professional: 70,
    playful: 10,
    minimal: 100,
    bold: 20,
    elegant: 90,
  },
};

/**
 * Luxury preset
 */
export const luxuryPreset: BrandPreset = {
  id: "luxury",
  name: "Luxury",
  description: "Elegant, sophisticated theme for luxury brands",
  category: "luxury",
  colors: {
    primary: "#C9A961",
    secondary: "#1B1B1B",
    accent: "#8B7355",
    neutral: "#4A4A4A",
    background: "#FAF9F7",
    foreground: "#1B1B1B",
    success: "#2E7D32",
    error: "#C62828",
    warning: "#F57C00",
    info: "#0277BD",
  },
  typography: {
    fontFamily: {
      heading: "Didot, Georgia, serif",
      body: "Lato, Helvetica, sans-serif",
      mono: "Courier, monospace",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: "0.05em",
    lineHeight: "1.8",
  },
  personality: {
    modern: 60,
    professional: 100,
    playful: 5,
    minimal: 50,
    bold: 70,
    elegant: 100,
  },
};

/**
 * Startup preset
 */
export const startupPreset: BrandPreset = {
  id: "startup",
  name: "Startup",
  description: "Fresh, energetic theme for innovative startups",
  category: "startup",
  colors: {
    primary: "#6366F1",
    secondary: "#22D3EE",
    accent: "#F59E0B",
    neutral: "#374151",
    background: "#F9FAFB",
    foreground: "#111827",
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
  typography: {
    fontFamily: {
      heading: "Plus Jakarta Sans, sans-serif",
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
  },
  personality: {
    modern: 90,
    professional: 70,
    playful: 70,
    minimal: 50,
    bold: 75,
    elegant: 40,
  },
};

/**
 * Education preset
 */
export const educationPreset: BrandPreset = {
  id: "education",
  name: "Education",
  description: "Friendly, approachable theme for educational institutions",
  category: "education",
  colors: {
    primary: "#3F51B5",
    secondary: "#FFC107",
    accent: "#4CAF50",
    neutral: "#607D8B",
    background: "#FAFAFA",
    foreground: "#212121",
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
  },
  typography: {
    fontFamily: {
      heading: "Nunito Sans, sans-serif",
      body: "Open Sans, sans-serif",
      mono: "Source Code Pro, monospace",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: "0",
    lineHeight: "1.6",
  },
  personality: {
    modern: 65,
    professional: 80,
    playful: 60,
    minimal: 45,
    bold: 50,
    elegant: 50,
  },
};

/**
 * Collection of all preset themes
 */
export const brandPresets: Record<string, BrandPreset> = {
  "tech-startup": techStartupPreset,
  finance: financePreset,
  healthcare: healthcarePreset,
  "creative-agency": creativePreset,
  minimal: minimalPreset,
  luxury: luxuryPreset,
  startup: startupPreset,
  education: educationPreset,
};

/**
 * Get preset by ID
 */
export function getPreset(id: string): BrandPreset | undefined {
  return brandPresets[id];
}

/**
 * Get presets by category
 */
export function getPresetsByCategory(category: BrandCategory): BrandPreset[] {
  return Object.values(brandPresets).filter(
    (preset) => preset.category === category
  );
}

/**
 * Get all preset categories
 */
export function getCategories(): BrandCategory[] {
  return [...new Set(Object.values(brandPresets).map((preset) => preset.category))];
}