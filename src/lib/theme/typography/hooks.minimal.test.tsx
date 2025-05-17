/**
 * Minimal Test to isolate the typography hooks issue
 */

import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { renderHook } from "@testing-library/react";
import React from "react";
import { useTypography } from "./hooks";
import { ThemeProvider } from "../theme-provider";
import type { ThemeSpecification } from "../../../types/schema/specification";

// Mock matchMedia for tests
beforeAll(() => {
  const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    configurable: true,
    value: mockMatchMedia,
  });
});

afterAll(() => {
  // Clean up by resetting the property
  Object.defineProperty(globalThis, "matchMedia", {
    value: undefined,
    writable: true,
    configurable: true,
  });
});

// Base theme for testing
const baseTheme: ThemeSpecification = {
  typography: {
    fontFamilies: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Georgia", "serif"],
      mono: ["Fira Code", "monospace"],
      display: ["Montserrat", "sans-serif"],
    },
    fontSizes: {
      xs1: "0.75rem",
      xs2: "0.625rem",
      base: "1rem",
      lg1: "1.125rem",
      lg2: "1.25rem",
      "1xl": "1.5rem",
      "2xl": "1.875rem",
      "3xl": "2.25rem",
      "4xl": "3rem",
      "5xl": "3.75rem",
    },
    fontWeights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },
};

describe("Minimal Typography Test", () => {
  it("should return original base theme when fluid typography is disabled", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={baseTheme} enableFluidTypography={false}>
        {children}
      </ThemeProvider>
    );

    const { result } = renderHook(() => useTypography(), { wrapper });

    // Log the result to see what we're getting
    console.log("Result fontSizes:", result.current.fontSizes);
    console.log("Expected fontSizes:", baseTheme.typography?.fontSizes);

    expect(result.current).toEqual(baseTheme.typography);
  });
});
