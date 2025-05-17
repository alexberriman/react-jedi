import { renderHook } from "@testing-library/react";
import { useDragAnimation, useDragPreset } from "./animation-hooks";
import { AnimationProvider } from "./animation-provider";
import React from "react";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AnimationProvider>{children}</AnimationProvider>
);

describe("useDragAnimation", () => {
  it("returns default animation configuration", () => {
    const { result } = renderHook(() => useDragAnimation(), { wrapper });

    expect(result.current).toHaveProperty("whileDrag");
    expect(result.current).toHaveProperty("whileHover");
    expect(result.current).toHaveProperty("transition");
  });

  it("applies custom configuration object", () => {
    const customConfig = {
      scale: 1.5,
      rotate: 45,
      opacity: 0.8,
      shadow: "0 10px 20px rgba(0,0,0,0.3)",
    };

    const { result } = renderHook(() => useDragAnimation(customConfig), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        scale: 1.5,
        rotate: 45,
        opacity: 0.8,
        boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
      })
    );
  });

  it("supports legacy scale-only API", () => {
    const { result } = renderHook(() => useDragAnimation(1.3), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        scale: 1.3,
      })
    );
  });

  it("applies brightness filter", () => {
    const { result } = renderHook(() => useDragAnimation({ brightness: 1.2 }), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        filter: "brightness(1.2)",
      })
    );
  });

  it("applies blur filter", () => {
    const { result } = renderHook(() => useDragAnimation({ blur: 5 }), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        filter: "blur(5px)",
      })
    );
  });

  it("combines multiple filters", () => {
    const { result } = renderHook(
      () => useDragAnimation({ brightness: 1.1, blur: 3 }),
      { wrapper }
    );

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        filter: "brightness(1.1) blur(3px)",
      })
    );
  });

  it("sets correct cursor states", () => {
    const { result } = renderHook(() => useDragAnimation(), { wrapper });

    expect(result.current.whileHover).toEqual(
      expect.objectContaining({
        cursor: "grab",
      })
    );
    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        cursor: "grabbing",
      })
    );
  });

  it("applies custom transition configuration", () => {
    const customTransition = {
      type: "spring" as const,
      stiffness: 500,
      damping: 30,
    };

    const { result } = renderHook(
      () => useDragAnimation({ transition: customTransition }),
      { wrapper }
    );

    expect(result.current.transition).toEqual(
      expect.objectContaining(customTransition)
    );
  });

  it("returns empty object in reduced motion mode", () => {
    const reducedMotionWrapper = ({ children }: { children: React.ReactNode }) => (
      <AnimationProvider config={{ reducedMotion: true }}>{children}</AnimationProvider>
    );

    const { result } = renderHook(() => useDragAnimation({ scale: 1.5 }), {
      wrapper: reducedMotionWrapper,
    });

    expect(result.current).toEqual({});
  });
});

describe("useDragPreset", () => {
  it("applies smooth preset", () => {
    const { result } = renderHook(() => useDragPreset("smooth"), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      })
    );
  });

  it("applies elastic preset", () => {
    const { result } = renderHook(() => useDragPreset("elastic"), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        scale: 1.05,
        rotate: 3,
      })
    );
  });

  it("applies ghost preset", () => {
    const { result } = renderHook(() => useDragPreset("ghost"), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        opacity: 0.7,
        scale: 1.05,
        filter: "blur(2px)",
      })
    );
  });

  it("applies magnetic preset", () => {
    const { result } = renderHook(() => useDragPreset("magnetic"), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        scale: 1.1,
        filter: "brightness(1.1)",
      })
    );
  });

  it("applies swing preset", () => {
    const { result } = renderHook(() => useDragPreset("swing"), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        rotate: 5,
        scale: 1.03,
      })
    );
  });

  it("applies intense preset", () => {
    const { result } = renderHook(() => useDragPreset("intense"), { wrapper });

    expect(result.current.whileDrag).toEqual(
      expect.objectContaining({
        scale: 1.15,
        rotate: -2,
        boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
        filter: "brightness(1.2)",
      })
    );
  });
});