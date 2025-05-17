import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { AnimationProvider } from "./animation-provider";
import {
  useAnimationVariants,
  useStaggerAnimation,
  useHoverAnimation,
  useHoverPreset,
  useFocusAnimation,
} from "./animation-hooks";

// Mock window.matchMedia
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

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(AnimationProvider, {}, children);

// Define the reducer motion wrapper outside the tests to fix function scoping issue
const reducedMotionWrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(AnimationProvider, { reducedMotion: true }, children);

describe("useAnimationVariants", () => {
  it("returns fadeIn animation by default", () => {
    const { result } = renderHook(() => useAnimationVariants(), { wrapper });

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    });
  });

  it("returns slideIn animation with direction", () => {
    const { result } = renderHook(
      () => useAnimationVariants({ variant: "slideIn", direction: "up" }),
      { wrapper }
    );

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, y: 20 },
    });
  });

  it("returns scaleIn animation with uniform direction", () => {
    const { result } = renderHook(() => useAnimationVariants({ variant: "scaleIn" }), { wrapper });

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    });
  });

  it("returns scaleIn animation with horizontal direction", () => {
    const { result } = renderHook(
      () => useAnimationVariants({ variant: "scaleIn", scaleDirection: "horizontal" }),
      { wrapper }
    );

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, scaleX: 0.8, scaleY: 1 },
      animate: { opacity: 1, scaleX: 1 },
      exit: { opacity: 0, scaleX: 0.8, scaleY: 1 },
    });
  });

  it("returns scaleIn animation with vertical direction", () => {
    const { result } = renderHook(
      () => useAnimationVariants({ variant: "scaleIn", scaleDirection: "vertical" }),
      { wrapper }
    );

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, scaleX: 1, scaleY: 0.8 },
      animate: { opacity: 1, scaleY: 1 },
      exit: { opacity: 0, scaleX: 1, scaleY: 0.8 },
    });
  });

  it("returns scaleOut animation with uniform direction", () => {
    const { result } = renderHook(() => useAnimationVariants({ variant: "scaleOut" }), { wrapper });

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, scale: 1.2 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.2 },
    });
  });

  it("returns scaleOut animation with horizontal direction", () => {
    const { result } = renderHook(
      () => useAnimationVariants({ variant: "scaleOut", scaleDirection: "horizontal" }),
      { wrapper }
    );

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, scaleX: 1.2, scaleY: 1 },
      animate: { opacity: 1, scaleX: 1 },
      exit: { opacity: 0, scaleX: 1.2, scaleY: 1 },
    });
  });

  it("returns scaleOut animation with vertical direction", () => {
    const { result } = renderHook(
      () => useAnimationVariants({ variant: "scaleOut", scaleDirection: "vertical" }),
      { wrapper }
    );

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, scaleX: 1, scaleY: 1.2 },
      animate: { opacity: 1, scaleY: 1 },
      exit: { opacity: 0, scaleX: 1, scaleY: 1.2 },
    });
  });

  it("returns rotateIn animation with clockwise direction", () => {
    const { result } = renderHook(() => useAnimationVariants({ variant: "rotateIn" }), { wrapper });

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, rotate: -45 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 45 },
    });
  });

  it("returns rotateIn animation with counterclockwise direction", () => {
    const { result } = renderHook(
      () => useAnimationVariants({ variant: "rotateIn", rotationDirection: "counterclockwise" }),
      { wrapper }
    );

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, rotate: 45 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: -45 },
    });
  });

  it("returns rotateIn animation with full rotation", () => {
    const { result } = renderHook(
      () => useAnimationVariants({ variant: "rotateIn", rotationDirection: "full" }),
      { wrapper }
    );

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 0, rotate: -360 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 360 },
    });
  });

  it("returns rotateOut animation with halfTurn direction", () => {
    const { result } = renderHook(
      () => useAnimationVariants({ variant: "rotateOut", rotationDirection: "halfTurn" }),
      { wrapper }
    );

    expect(result.current.variants).toMatchObject({
      initial: { opacity: 1, rotate: 0 },
      animate: { opacity: 0, rotate: 180 },
      exit: { opacity: 1, rotate: 0 },
    });
  });

  it("returns custom variants when provided", () => {
    const customVariants = {
      initial: { x: -100 },
      animate: { x: 0 },
      exit: { x: 100 },
    };

    const { result } = renderHook(() => useAnimationVariants({ custom: customVariants }), {
      wrapper,
    });

    expect(result.current.variants).toEqual(customVariants);
  });

  it("returns empty variants when disabled", () => {
    const { result } = renderHook(() => useAnimationVariants({ disabled: true }), { wrapper });

    expect(result.current.variants).toMatchObject({
      initial: {},
      animate: {},
      exit: {},
    });
  });

  it("respects duration prop", () => {
    const { result } = renderHook(() => useAnimationVariants({ duration: "fast" }), { wrapper });

    const animate = result.current.variants?.animate;
    expect(animate).toBeDefined();
    if (animate && "transition" in animate) {
      expect(animate.transition).toMatchObject({ duration: 0.15 });
    }
  });

  it("respects delay prop", () => {
    const { result } = renderHook(() => useAnimationVariants({ delay: 0.5 }), { wrapper });

    const animate = result.current.variants?.animate;
    expect(animate).toBeDefined();
    if (animate && "transition" in animate) {
      expect(animate.transition).toMatchObject({ delay: 0.5 });
    }
  });
});

describe("useStaggerAnimation", () => {
  it("returns stagger configuration", () => {
    const { result } = renderHook(() => useStaggerAnimation(0.2), { wrapper });

    expect(result.current).toMatchObject({
      initial: "initial",
      animate: "animate",
      exit: "exit",
      transition: {
        staggerChildren: 0.2,
      },
    });
  });

  it("returns empty object when reduced motion is enabled", () => {
    const { result } = renderHook(() => useStaggerAnimation(), {
      wrapper: reducedMotionWrapper,
    });

    expect(result.current).toEqual({});
  });
});

describe("useHoverAnimation", () => {
  it("returns hover and tap animations with default scale", () => {
    const { result } = renderHook(() => useHoverAnimation(), { wrapper });

    expect(result.current).toMatchObject({
      whileHover: { scale: 1.05, rotate: 0, y: 0, x: 0 },
      whileTap: { scale: expect.closeTo(0.9975, 5), rotate: 0, y: 0, x: 0 },
    });
  });

  it("accepts custom scale number (legacy API)", () => {
    const { result } = renderHook(() => useHoverAnimation(1.1), { wrapper });

    expect(result.current).toMatchObject({
      whileHover: { scale: 1.1 },
      whileTap: { scale: 1.045 },
    });
  });

  it("accepts config object with various properties", () => {
    const config = {
      scale: 1.2,
      rotate: 10,
      translateY: -5,
      shadow: "0 10px 20px rgba(0,0,0,0.2)",
      brightness: 1.1,
    };
    const { result } = renderHook(() => useHoverAnimation(config), { wrapper });

    expect(result.current.whileHover).toMatchObject({
      scale: 1.2,
      rotate: 10,
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      filter: "brightness(1.1)",
    });
    expect(result.current.whileTap).toMatchObject({
      scale: 1.14, // 1.2 * 0.95
      rotate: -5, // 10 * -0.5
      y: -2.5, // -5 * 0.5
    });
  });

  it("returns empty object when reduced motion is enabled", () => {
    const { result } = renderHook(() => useHoverAnimation(), {
      wrapper: reducedMotionWrapper,
    });

    expect(result.current).toEqual({});
  });
});

describe("useHoverPreset", () => {
  it("returns lift preset animation", () => {
    const { result } = renderHook(() => useHoverPreset("lift"), { wrapper });

    expect(result.current.whileHover).toMatchObject({
      y: -6,
      boxShadow: "0 16px 32px rgba(0,0,0,0.15)",
    });
  });

  it("returns glow preset animation", () => {
    const { result } = renderHook(() => useHoverPreset("glow"), { wrapper });

    expect(result.current.whileHover).toMatchObject({
      filter: "brightness(1.1)",
      boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)",
    });
  });
});

describe("useFocusAnimation", () => {
  it("returns focus animation with defaults", () => {
    const { result } = renderHook(() => useFocusAnimation(), { wrapper });

    expect(result.current).toMatchObject({
      whileFocus: {
        scale: 1.02,
        boxShadow: "0 0 0 3px var(--ring)",
      },
    });
  });

  it("accepts custom config", () => {
    const config = {
      scale: 1.05,
      boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.3)",
      borderColor: "#6366f1",
      backgroundColor: "#f0f1ff",
    };
    const { result } = renderHook(() => useFocusAnimation(config), { wrapper });

    expect(result.current.whileFocus).toMatchObject({
      scale: 1.05,
      boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.3)",
      borderColor: "#6366f1",
      backgroundColor: "#f0f1ff",
    });
  });

  it("returns empty object when reduced motion is enabled", () => {
    const { result } = renderHook(() => useFocusAnimation(), {
      wrapper: reducedMotionWrapper,
    });

    expect(result.current).toEqual({});
  });
});
