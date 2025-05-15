/**
 * Typography Hooks Tests
 */

import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { 
  useTypography, 
  useFontSize, 
  useFontFamily, 
  useLineHeight, 
  useLetterSpacing, 
  useFontWeight,
  useFluidTypography 
} from "./hooks";
import { ThemeProvider } from "../theme-provider";
import type { ThemeSpecification } from "@/types/schema/specification";
import React from "react";

// Mock matchMedia for tests
beforeAll(() => {
  // Mock matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  
  // Assign window.matchMedia to globalThis.matchMedia
  (globalThis as any).matchMedia = window.matchMedia;
});

afterAll(() => {
  // Cleanup
  vi.restoreAllMocks();
});

// Create a wrapper for testing hooks
const createWrapper = (theme: ThemeSpecification) => {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

describe("Typography Hooks", () => {
  const baseTheme: ThemeSpecification = {
    typography: {
      fontFamilies: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Fira Code", "monospace"],
        display: ["Montserrat", "sans-serif"]
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
        "5xl": "3.75rem"
      },
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
      },
      lineHeights: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2
      },
      letterSpacings: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
      }
    }
  };
  
  it("should return typography from theme", () => {
    const { result } = renderHook(() => useTypography(), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toEqual(baseTheme.typography);
  });
  
  it("should return font size", () => {
    const { result } = renderHook(() => useFontSize("lg1"), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe("1.125rem");
  });
  
  it("should return default font size when size is not specified", () => {
    const { result } = renderHook(() => useFontSize(), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe("1rem");
  });
  
  it("should return font family", () => {
    const { result } = renderHook(() => useFontFamily("serif"), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe("Georgia, serif");
  });
  
  it("should return default font family when category is not specified", () => {
    const { result } = renderHook(() => useFontFamily(), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe("Roboto, sans-serif");
  });
  
  it("should return line height", () => {
    const { result } = renderHook(() => useLineHeight("tight"), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe(1.25);
  });
  
  it("should return default line height when size is not specified", () => {
    const { result } = renderHook(() => useLineHeight(), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe(1.5);
  });
  
  it("should return letter spacing", () => {
    const { result } = renderHook(() => useLetterSpacing("wide"), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe("0.025em");
  });
  
  it("should return default letter spacing when size is not specified", () => {
    const { result } = renderHook(() => useLetterSpacing(), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe("0");
  });
  
  it("should return font weight", () => {
    const { result } = renderHook(() => useFontWeight("bold"), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe(700);
  });
  
  it("should return default font weight when weight is not specified", () => {
    const { result } = renderHook(() => useFontWeight(), {
      wrapper: createWrapper(baseTheme)
    });
    
    expect(result.current).toBe(400);
  });
  
  describe("useFluidTypography", () => {    
    it("should correctly identify if fluid typography is enabled", () => {
      // Mock useTheme with static typography
      vi.doMock("../use-theme", () => ({
        useTheme: () => ({
          theme: baseTheme,
          updateTheme: vi.fn()
        })
      }));
      
      // Re-import with mocked dependencies
      const { useFluidTypography } = require("./hooks");
      
      // Static typography test
      const { result: staticResult } = renderHook(() => useFluidTypography());
      expect(staticResult.current.isFluid).toBe(false);
      
      // Clean up and re-mock for fluid typography
      vi.resetModules();
      
      // Mock useTheme with fluid typography
      vi.doMock("../use-theme", () => ({
        useTheme: () => ({
          theme: {
            typography: {
              ...baseTheme.typography,
              fontSizes: {
                base: "clamp(1rem, 0.5rem + 1vw, 1.25rem)",
                lg1: "clamp(1.125rem, 0.625rem + 1vw, 1.5rem)"
              }
            }
          },
          updateTheme: vi.fn()
        })
      }));
      
      // Re-import with new mocks
      const { useFluidTypography: useFluidTypography2 } = require("./hooks");
      
      // Check that fluid typography is recognized
      const { result: fluidResult } = renderHook(() => useFluidTypography2());
      expect(fluidResult.current.isFluid).toBe(true);
    });
    
    it("should enable and disable fluid typography", () => {
      // Create a mock for updateTheme
      const mockUpdateTheme = vi.fn();
      
      // Mock useTheme
      vi.doMock("../use-theme", () => ({
        useTheme: () => ({
          theme: baseTheme,
          updateTheme: mockUpdateTheme
        })
      }));
      
      // Re-import with mocked dependencies
      const { useFluidTypography } = require("./hooks");
      
      // Test the hook
      const { result } = renderHook(() => useFluidTypography());
      
      // Test that the functions exist
      expect(typeof result.current.enableFluidTypography).toBe("function");
      expect(typeof result.current.disableFluidTypography).toBe("function");
      
      // Enable fluid typography and check if updateTheme was called
      act(() => {
        result.current.enableFluidTypography();
      });
      
      expect(mockUpdateTheme).toHaveBeenCalled();
      
      // Reset mock and disable fluid typography
      mockUpdateTheme.mockClear();
      
      act(() => {
        result.current.disableFluidTypography();
      });
      
      expect(mockUpdateTheme).toHaveBeenCalled();
    });
  });
});