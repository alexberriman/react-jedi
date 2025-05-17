import { renderHook } from "@testing-library/react/pure";
import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { AnimationProvider } from "./animation-provider";
import {
  useStateTransition,
  useComponentState,
  createStateTransition,
  useStatePreset,
  statePresets,
  createTransitionSequence,
} from "./state-transitions";

// Mock window.matchMedia for tests
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

describe("State Transitions", () => {
  describe("useStateTransition", () => {
    it("returns motion props with variants based on provided states", () => {
      const config = {
        states: {
          initial: { scale: 1, opacity: 1 },
          hover: { scale: 1.1, opacity: 1 },
          active: { scale: 0.9, opacity: 0.9 },
        },
        initialState: "initial",
      };

      const { result } = renderHook(() => useStateTransition(config), { wrapper });

      expect(result.current.initial).toBe("initial");
      expect(result.current.animate).toBe("initial");
      expect(result.current.variants).toBeDefined();
      expect(result.current.variants?.initial).toMatchObject({ scale: 1, opacity: 1 });
      expect(result.current.variants?.hover).toMatchObject({ scale: 1.1, opacity: 1 });
      expect(result.current.variants?.active).toMatchObject({ scale: 0.9, opacity: 0.9 });
    });

    it("adds transition configurations to states", () => {
      const config = {
        states: {
          initial: { scale: 1 },
          hover: { scale: 1.1 },
        },
        initialState: "initial",
        duration: "fast",
      };

      const { result } = renderHook(() => useStateTransition(config), { wrapper });

      const hoverVariant = result.current.variants?.hover;
      expect(hoverVariant).toBeDefined();
      if (hoverVariant && typeof hoverVariant === "object" && "transition" in hoverVariant) {
        expect(hoverVariant.transition).toMatchObject({
          duration: 0.15, // from the AnimationProvider's fast duration
        });
      }
    });

    it("respects reduced motion preferences", () => {
      const config = {
        states: {
          initial: { scale: 1, opacity: 1, x: 0 },
          hover: { scale: 1.2, opacity: 1, x: 10 },
        },
        initialState: "initial",
        reduceMotion: true,
      };

      const { result } = renderHook(() => useStateTransition(config), { wrapper });

      expect(result.current.variants?.initial).toMatchObject({ opacity: 1 });
      expect(result.current.variants?.hover).toMatchObject({ opacity: 1 });
      // Should not have scale or x transitions when reduced motion is true
      expect(result.current.variants?.hover).not.toMatchObject({ scale: 1.2, x: 10 });
    });
  });

  describe("useComponentState", () => {
    it("returns motion props with current state as animate value", () => {
      const config = {
        states: {
          initial: { scale: 1 },
          active: { scale: 0.9 },
        },
        initialState: "initial",
      };

      const { result } = renderHook(() => useComponentState("active", config), { wrapper });

      expect(result.current.initial).toBe("initial");
      expect(result.current.animate).toBe("active");
      expect(result.current.variants?.active).toMatchObject({ scale: 0.9 });
    });
  });

  describe("createStateTransition", () => {
    it("enhances state transitions with timing configurations", () => {
      const states = {
        initial: { scale: 1 },
        hover: { scale: 1.1 },
        active: { scale: 0.9 },
      };

      const transitions = [
        { from: "initial", to: "hover", duration: 0.2, ease: "easeOut" },
        { from: "hover", to: "active", duration: 0.1, ease: "easeIn" },
      ];

      const result = createStateTransition(states, transitions);

      expect(result.states.hover.transition).toMatchObject({
        duration: 0.2,
        ease: "easeOut",
      });

      expect(result.states.active.transition).toMatchObject({
        duration: 0.1,
        ease: "easeIn",
      });
    });
  });

  describe("useStatePreset", () => {
    it("returns a preset's state transition config", () => {
      const { result } = renderHook(() => useStatePreset("button"), { wrapper });

      expect(result.current.states.initial).toMatchObject({
        scale: 1,
        backgroundColor: "var(--primary)",
      });

      expect(result.current.states.hover).toMatchObject({
        scale: 1.02,
        backgroundColor: "var(--primary-600)",
      });
    });

    it("merges custom states with preset states", () => {
      const customStates = {
        hover: { scale: 1.5, boxShadow: "custom-shadow" },
        custom: { backgroundColor: "purple" },
      };

      const { result } = renderHook(() => useStatePreset("button", customStates), { wrapper });

      expect(result.current.states.hover).toMatchObject({
        scale: 1.5, // Custom value overrides preset
        boxShadow: "custom-shadow", // Custom value overrides preset
        backgroundColor: "var(--primary-600)", // Preset value is preserved
      });

      expect(result.current.states.custom).toMatchObject({
        backgroundColor: "purple", // Custom state is added
      });
    });
  });

  describe("createTransitionSequence", () => {
    it("creates a transition configuration for a sequence of states", () => {
      const states = {
        initial: { opacity: 1, scale: 1 },
        loading: { opacity: 0.7, scale: 0.98 },
        success: { opacity: 1, scale: 1.05 },
      };

      const sequence = ["initial", "loading", "success"];
      const result = createTransitionSequence(states, sequence, 0.3, 0.1);

      expect(result.states.loading.transition).toBeDefined();
      expect(result.states.success.transition).toBeDefined();

      // Second state should have a delay of 0.1
      expect(result.states.success.transition).toMatchObject({
        duration: 0.3,
        delay: 0.1,
      });
    });
  });

  describe("statePresets", () => {
    it("includes button preset with all required states", () => {
      expect(statePresets.button).toBeDefined();
      expect(statePresets.button.initial).toBeDefined();
      expect(statePresets.button.hover).toBeDefined();
      expect(statePresets.button.active).toBeDefined();
      expect(statePresets.button.focus).toBeDefined();
      expect(statePresets.button.disabled).toBeDefined();
    });

    it("includes card preset with all required states", () => {
      expect(statePresets.card).toBeDefined();
      expect(statePresets.card.initial).toBeDefined();
      expect(statePresets.card.hover).toBeDefined();
      expect(statePresets.card.active).toBeDefined();
    });

    it("includes input preset with all required states", () => {
      expect(statePresets.input).toBeDefined();
      expect(statePresets.input.initial).toBeDefined();
      expect(statePresets.input.focus).toBeDefined();
      expect(statePresets.input.disabled).toBeDefined();
      expect(statePresets.input.error).toBeDefined();
    });

    it("includes toggle preset with all required states", () => {
      expect(statePresets.toggle).toBeDefined();
      expect(statePresets.toggle.initial).toBeDefined();
      expect(statePresets.toggle.hover).toBeDefined();
      expect(statePresets.toggle.selected).toBeDefined();
    });

    it("includes menuItem preset with all required states", () => {
      expect(statePresets.menuItem).toBeDefined();
      expect(statePresets.menuItem.initial).toBeDefined();
      expect(statePresets.menuItem.hover).toBeDefined();
      expect(statePresets.menuItem.focus).toBeDefined();
      expect(statePresets.menuItem.selected).toBeDefined();
    });
  });
});
