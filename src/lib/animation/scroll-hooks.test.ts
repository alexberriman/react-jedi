import { renderHook } from "@testing-library/react";
import {
  useScrollAnimation,
  useScrollProgress,
  useParallax,
  useScrollReveal,
  scrollPresets,
} from "./scroll-hooks";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnimationProvider } from "./animation-provider";
import React from "react";

// Mock framer-motion
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useMotionValue: vi.fn().mockImplementation((initial) => ({
      get: () => initial,
      set: vi.fn(),
      onChange: vi.fn(),
    })),
    useTransform: vi.fn().mockImplementation((value, from, to) => {
      return { value, from, to };
    }),
    MotionConfig: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // Cast Document to Element if present, otherwise use null
    let root = null;
    if (options?.root) {
      root = options.root instanceof Element ? options.root : null;
    }
    this.root = root;
    this.rootMargin = options?.rootMargin || "0px";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold || 0];
  }

  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window and intersectionObserver
globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock matchMedia
beforeEach(() => {
  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Provider wrapper for hooks
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(AnimationProvider, null, children);

// Test cases
describe("scroll-hooks", () => {
  describe("useScrollAnimation", () => {
    it("returns ref, isInView and hasTriggered properties", () => {
      const { result } = renderHook(() => useScrollAnimation(), { wrapper });
      expect(result.current).toHaveProperty("ref");
      expect(result.current).toHaveProperty("isInView");
      expect(result.current).toHaveProperty("hasTriggered");
    });

    it("defaults to not in view", () => {
      const { result } = renderHook(() => useScrollAnimation(), { wrapper });
      expect(result.current.isInView).toBe(false);
      expect(result.current.hasTriggered).toBe(false);
    });

    it("respects disabled option", () => {
      const { result } = renderHook(() => useScrollAnimation({ disabled: true }), { wrapper });
      expect(result.current.isInView).toBe(false);
    });
  });

  describe("useScrollProgress", () => {
    it("returns ref and scrollYProgress properties", () => {
      const { result } = renderHook(() => useScrollProgress(), { wrapper });
      expect(result.current).toHaveProperty("ref");
      expect(result.current).toHaveProperty("scrollYProgress");
    });
  });

  describe("useParallax", () => {
    it("returns ref, yOffset, xOffset, and scrollYProgress properties", () => {
      const { result } = renderHook(() => useParallax(), { wrapper });
      expect(result.current).toHaveProperty("ref");
      expect(result.current).toHaveProperty("yOffset");
      expect(result.current).toHaveProperty("xOffset");
      expect(result.current).toHaveProperty("scrollYProgress");
    });

    it("defaults to 0.5 speed if not provided", () => {
      const { result } = renderHook(() => useParallax(), { wrapper });
      expect(result.current.yOffset).toBeDefined();
    });

    it("accepts custom speed parameter", () => {
      const { result } = renderHook(() => useParallax(0.8), { wrapper });
      expect(result.current.yOffset).toBeDefined();
    });
  });

  describe("useScrollReveal", () => {
    it("returns ref, isInView, hasTriggered, and visibleItems properties", () => {
      const { result } = renderHook(() => useScrollReveal(), { wrapper });
      expect(result.current).toHaveProperty("ref");
      expect(result.current).toHaveProperty("isInView");
      expect(result.current).toHaveProperty("hasTriggered");
      expect(result.current).toHaveProperty("visibleItems");
    });

    it("starts with empty visibleItems array", () => {
      const { result } = renderHook(() => useScrollReveal(), { wrapper });
      expect(result.current.visibleItems).toEqual([]);
    });
  });

  describe("scrollPresets", () => {
    it("contains all required preset animations", () => {
      expect(scrollPresets).toHaveProperty("fadeIn");
      expect(scrollPresets).toHaveProperty("slideUp");
      expect(scrollPresets).toHaveProperty("slideDown");
      expect(scrollPresets).toHaveProperty("slideLeft");
      expect(scrollPresets).toHaveProperty("slideRight");
      expect(scrollPresets).toHaveProperty("scaleIn");
      expect(scrollPresets).toHaveProperty("rotateIn");
      expect(scrollPresets).toHaveProperty("blur");
    });

    it("each preset has initial, animate, and transition properties", () => {
      for (const preset of Object.values(scrollPresets)) {
        expect(preset).toHaveProperty("initial");
        expect(preset).toHaveProperty("animate");
        expect(preset).toHaveProperty("transition");
      }
    });
  });
});
