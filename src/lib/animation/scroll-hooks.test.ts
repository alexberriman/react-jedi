import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react";
import {
  useScrollAnimation,
  useScrollProgress,
  useParallax,
  useScrollReveal,
  scrollPresets,
} from "./scroll-hooks";

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.root = options?.root || null;
    this.rootMargin = options?.rootMargin || "0px";
    this.thresholds = Array.isArray(options?.threshold) 
      ? options.threshold : [options?.threshold || 0];
  }
  
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window and intersectionObserver
global.IntersectionObserver = MockIntersectionObserver as any;

// Test cases
describe("scroll-hooks", () => {
  describe("useScrollAnimation", () => {
    it("returns ref, isInView and hasTriggered properties", () => {
      const { result } = renderHook(() => useScrollAnimation());
      expect(result.current).toHaveProperty("ref");
      expect(result.current).toHaveProperty("isInView");
      expect(result.current).toHaveProperty("hasTriggered");
    });

    it("defaults to not in view", () => {
      const { result } = renderHook(() => useScrollAnimation());
      expect(result.current.isInView).toBe(false);
      expect(result.current.hasTriggered).toBe(false);
    });

    it("respects disabled option", () => {
      const { result } = renderHook(() => useScrollAnimation({ disabled: true }));
      expect(result.current.isInView).toBe(false);
    });
  });

  describe("useScrollProgress", () => {
    it("returns ref and scrollYProgress properties", () => {
      const { result } = renderHook(() => useScrollProgress());
      expect(result.current).toHaveProperty("ref");
      expect(result.current).toHaveProperty("scrollYProgress");
    });
  });

  describe("useParallax", () => {
    it("returns ref, yOffset, xOffset, and scrollYProgress properties", () => {
      const { result } = renderHook(() => useParallax());
      expect(result.current).toHaveProperty("ref");
      expect(result.current).toHaveProperty("yOffset");
      expect(result.current).toHaveProperty("xOffset");
      expect(result.current).toHaveProperty("scrollYProgress");
    });

    it("defaults to 0.5 speed if not provided", () => {
      const { result } = renderHook(() => useParallax());
      expect(result.current.yOffset).toBeDefined();
    });

    it("accepts custom speed parameter", () => {
      const { result } = renderHook(() => useParallax(0.8));
      expect(result.current.yOffset).toBeDefined();
    });
  });

  describe("useScrollReveal", () => {
    it("returns ref, isInView, hasTriggered, and visibleItems properties", () => {
      const { result } = renderHook(() => useScrollReveal());
      expect(result.current).toHaveProperty("ref");
      expect(result.current).toHaveProperty("isInView");
      expect(result.current).toHaveProperty("hasTriggered");
      expect(result.current).toHaveProperty("visibleItems");
    });

    it("starts with empty visibleItems array", () => {
      const { result } = renderHook(() => useScrollReveal());
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
      Object.values(scrollPresets).forEach(preset => {
        expect(preset).toHaveProperty("initial");
        expect(preset).toHaveProperty("animate");
        expect(preset).toHaveProperty("transition");
      });
    });
  });
});