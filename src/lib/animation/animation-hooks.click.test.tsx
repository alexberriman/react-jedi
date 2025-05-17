import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  useClickAnimation,
  useClickPreset,
  clickPresets,
  type ClickPreset,
} from "./animation-hooks";
import { AnimationProvider } from "./animation-provider";
import React from "react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) =>
      React.createElement("div", props, children),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  MotionConfig: ({ children }: { children: React.ReactNode }) => children,
  Transition: {},
  AnimationProps: {},
  Variants: {},
  TargetAndTransition: {},
  HTMLMotionProps: {},
}));

describe("useClickAnimation", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AnimationProvider>{children}</AnimationProvider>
  );

  it("returns empty object when reducedMotion is enabled", () => {
    const { result } = renderHook(() => useClickAnimation(), {
      wrapper: ({ children }) => <AnimationProvider reducedMotion>{children}</AnimationProvider>,
    });

    expect(result.current).toEqual({});
  });

  it("returns default click animation configuration", () => {
    const { result } = renderHook(() => useClickAnimation(), { wrapper });

    expect(result.current).toEqual({
      whileTap: {
        scale: 0.95,
        rotate: 0,
        opacity: 1,
        y: 1,
        x: 0,
        filter: "brightness(0.9)",
      },
      transition: {
        duration: 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    });
  });

  it("accepts custom configuration", () => {
    const { result } = renderHook(
      () =>
        useClickAnimation({
          scale: 0.9,
          rotate: 5,
          opacity: 0.8,
          brightness: 0.85,
          shadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#f0f0f0",
          translateY: 2,
          translateX: 1,
          borderColor: "#333",
          outline: "2px solid red",
        }),
      { wrapper }
    );

    expect(result.current).toEqual({
      whileTap: {
        scale: 0.9,
        rotate: 5,
        opacity: 0.8,
        y: 2,
        x: 1,
        filter: "brightness(0.85)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: "#f0f0f0",
        borderColor: "#333",
        outline: "2px solid red",
      },
      transition: {
        duration: 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    });
  });

  it("supports legacy API with simple scale number", () => {
    const { result } = renderHook(() => useClickAnimation(0.85), { wrapper });

    expect(result.current.whileTap.scale).toBe(0.85);
  });

  it("handles configuration without brightness filter", () => {
    const { result } = renderHook(
      () =>
        useClickAnimation({
          scale: 0.92,
          brightness: 0.9, // Default brightness
        }),
      { wrapper }
    );

    expect(result.current.whileTap.filter).toBe("brightness(0.9)");
  });
});

describe("useClickPreset", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AnimationProvider>{children}</AnimationProvider>
  );

  for (const preset of Object.keys(clickPresets)) {
    it(`applies ${preset} preset correctly`, () => {
      const { result } = renderHook(() => useClickPreset(preset as ClickPreset), { wrapper });

      const expectedConfig = clickPresets[preset as ClickPreset];

      // Check that the preset values are applied
      if (expectedConfig.scale != null) {
        expect(result.current.whileTap.scale).toBe(expectedConfig.scale);
      }
      if (Object.prototype.hasOwnProperty.call(expectedConfig, "translateY")) {
        expect(result.current.whileTap.y).toBe(expectedConfig.translateY);
      }
      if (expectedConfig.brightness != null) {
        expect(result.current.whileTap.filter).toContain(
          `brightness(${expectedConfig.brightness})`
        );
      }
      if (expectedConfig.shadow != null) {
        expect(result.current.whileTap.boxShadow).toBe(expectedConfig.shadow);
      }
      if (expectedConfig.rotate != null) {
        expect(result.current.whileTap.rotate).toBe(expectedConfig.rotate);
      }
      if (expectedConfig.opacity != null) {
        expect(result.current.whileTap.opacity).toBe(expectedConfig.opacity);
      }
      if (expectedConfig.backgroundColor != null) {
        expect(result.current.whileTap.backgroundColor).toBe(expectedConfig.backgroundColor);
      }
    });
  }
});
