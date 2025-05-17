import React from "react";
import { renderHook } from "@testing-library/react/pure";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnimationProvider, useAnimation } from "./animation-provider";

// Mock window.matchMedia
beforeEach(() => {
  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("AnimationProvider", () => {
  it("provides default animation config", () => {
    const { result } = renderHook(() => useAnimation(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AnimationProvider>{children}</AnimationProvider>
      ),
    });

    expect(result.current).toMatchObject({
      reducedMotion: false,
      duration: {
        fast: 0.15,
        normal: 0.3,
        slow: 0.5,
      },
      easing: {
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    });
  });

  it("allows custom config override", () => {
    const customConfig = {
      duration: {
        fast: 0.1,
        normal: 0.2,
        slow: 0.4,
      },
    };

    const { result } = renderHook(() => useAnimation(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AnimationProvider config={customConfig}>{children}</AnimationProvider>
      ),
    });

    expect(result.current.duration).toEqual(customConfig.duration);
  });

  it("respects reducedMotion prop", () => {
    const { result } = renderHook(() => useAnimation(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AnimationProvider reducedMotion={true}>{children}</AnimationProvider>
      ),
    });

    expect(result.current.reducedMotion).toBe(true);
  });

  it("detects system reduced motion preference", () => {
    const matchMediaMock = vi.fn().mockReturnValue({
      matches: true,
    });
    globalThis.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useAnimation(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AnimationProvider>{children}</AnimationProvider>
      ),
    });

    expect(result.current.reducedMotion).toBe(true);
    expect(matchMediaMock).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("throws error when useAnimation is used outside provider", () => {
    // Test that the hook throws an error when used outside provider
    const { result } = renderHook(() => {
      try {
        return useAnimation();
      } catch (error) {
        return error;
      }
    });

    expect(result.current).toBeInstanceOf(Error);
    expect((result.current as Error).message).toBe(
      "useAnimation must be used within an AnimationProvider"
    );
  });
});
