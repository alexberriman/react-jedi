/**
 * useZIndex Hook Tests
 *
 * This file contains unit tests for the useZIndex hook,
 * ensuring it correctly accesses z-index values from the theme.
 */

import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useZIndex } from "./use-z-index";
import { defaultZIndices } from "./index";

// Mock the useTheme hook
vi.mock("../use-theme", () => ({
  useTheme: vi.fn(() => ({
    theme: {
      zIndices: {
        modal: 100,
        custom: 200
      }
    }
  }))
}));

describe("useZIndex Hook", () => {
  it("should provide access to z-index values", () => {
    const { result } = renderHook(() => useZIndex());
    
    expect(result.current.get("modal")).toBe(100);
    expect(result.current.get("custom")).toBe(200);
    expect(result.current.get("tooltip")).toBe(defaultZIndices.tooltip);
  });
  
  it("should calculate relative z-index values", () => {
    const { result } = renderHook(() => useZIndex());
    
    expect(result.current.getRelative("modal")).toBe(100);
    expect(result.current.getRelative("modal", 2)).toBe(102);
    expect(result.current.getRelative("tooltip", -1)).toBe(defaultZIndices.tooltip - 1);
  });
  
  it("should create style objects with z-index", () => {
    const { result } = renderHook(() => useZIndex());
    
    expect(result.current.style("modal")).toEqual({ zIndex: 100 });
    expect(result.current.style(50)).toEqual({ zIndex: 50 });
  });
});