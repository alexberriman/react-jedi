import { describe, it, expect } from "vitest";
import {
  createTween,
  createSpring,
  createInertia,
  createStaggerTransition,
  createStateTransition,
  createPropertyTransitions,
  easingPresets,
  durationPresets,
  springPresets,
  inertiaPresets,
} from "./transition-timing";

describe("Transition Timing", () => {
  describe("createTween", () => {
    it("creates a tween with number duration", () => {
      const result = createTween(0.5, "easeOut");

      expect(result).toMatchObject({
        type: "tween",
        duration: 0.5,
        ease: "ease-out",
        delay: 0,
      });
    });

    it("creates a tween with preset duration", () => {
      const result = createTween("fast", "easeOut");

      expect(result).toMatchObject({
        type: "tween",
        duration: durationPresets.fast,
        ease: "ease-out",
        delay: 0,
      });
    });

    it("handles cubic bezier array for easing", () => {
      const easing = [0.42, 0, 0.58, 1];
      const result = createTween(0.3, easing);

      expect(result).toMatchObject({
        type: "tween",
        duration: 0.3,
        ease: easing,
      });
    });

    it("resolves named easing presets", () => {
      const result = createTween("normal", "easeInCubic");

      expect(result).toMatchObject({
        type: "tween",
        duration: durationPresets.normal,
        ease: easingPresets.easeInCubic,
      });
    });

    it("applies custom delay", () => {
      const result = createTween(0.3, "easeOut", 0.5);

      expect(result).toMatchObject({
        type: "tween",
        duration: 0.3,
        ease: "ease-out",
        delay: 0.5,
      });
    });
  });

  describe("createSpring", () => {
    it("creates spring transition with default preset", () => {
      const result = createSpring();

      expect(result).toMatchObject({
        type: "spring",
        ...springPresets.default,
        delay: 0,
      });
    });

    it("creates spring transition with named preset", () => {
      const result = createSpring("bouncy");

      expect(result).toMatchObject({
        type: "spring",
        ...springPresets.bouncy,
        delay: 0,
      });
    });

    it("creates spring transition with custom config", () => {
      const customConfig = {
        stiffness: 400,
        damping: 20,
        mass: 1.5,
      };

      const result = createSpring(customConfig);

      expect(result).toMatchObject({
        type: "spring",
        ...customConfig,
        delay: 0,
      });
    });

    it("applies custom delay", () => {
      const result = createSpring("default", 0.3);

      expect(result).toMatchObject({
        type: "spring",
        ...springPresets.default,
        delay: 0.3,
      });
    });
  });

  describe("createInertia", () => {
    it("creates inertia transition with default preset", () => {
      const result = createInertia();

      expect(result).toMatchObject({
        type: "inertia",
        ...inertiaPresets.default,
      });
    });

    it("creates inertia transition with named preset", () => {
      const result = createInertia("gentle");

      expect(result).toMatchObject({
        type: "inertia",
        ...inertiaPresets.gentle,
      });
    });

    it("creates inertia transition with custom config", () => {
      const customConfig = {
        power: 0.8,
        timeConstant: 500,
        restDelta: 0.5,
      };

      const result = createInertia(customConfig);

      expect(result).toMatchObject({
        type: "inertia",
        ...customConfig,
      });
    });
  });

  describe("createStaggerTransition", () => {
    it("creates an array of staggered transitions", () => {
      const baseTransition = { type: "tween" as const, duration: 0.3 };
      const delayPerChild = 0.1;
      const childrenCount = 3;

      const result = createStaggerTransition(delayPerChild, childrenCount, baseTransition);

      expect(result).toHaveLength(childrenCount);
      expect(result[0]).toMatchObject({ ...baseTransition, delay: 0 });
      expect(result[1]).toMatchObject({ ...baseTransition, delay: 0.1 });
      expect(result[2]).toMatchObject({ ...baseTransition, delay: 0.2 });
    });

    it("respects existing delay in base transition", () => {
      const baseTransition = { type: "tween" as const, duration: 0.3, delay: 0.5 };
      const result = createStaggerTransition(0.1, 2, baseTransition);

      expect(result[0].delay).toBe(0.5);
      expect(result[1].delay).toBe(0.6);
    });
  });

  describe("createStateTransition", () => {
    it("uses preset timing for common state transitions", () => {
      const result = createStateTransition("initial", "hover");

      expect(result).toMatchObject({
        type: "tween",
        duration: durationPresets.fast,
        ease: "easeOut",
      });
    });

    it("uses provided timing for non-preset transitions", () => {
      const result = createStateTransition("custom1", "custom2", 0.5, "easeInOut");

      expect(result).toMatchObject({
        type: "tween",
        duration: 0.5,
        ease: "ease-in-out",
      });
    });

    it("handles duration presets", () => {
      const result = createStateTransition("foo", "bar", "slow", "easeOut");

      expect(result).toMatchObject({
        type: "tween",
        duration: durationPresets.slow,
        ease: "ease-out",
      });
    });

    it("resolves named easing presets", () => {
      const result = createStateTransition("foo", "bar", 0.3, "easeInOutQuad");

      expect(result).toMatchObject({
        type: "tween",
        duration: 0.3,
        ease: easingPresets.easeInOutQuad,
      });
    });
  });

  describe("createPropertyTransitions", () => {
    it("creates property-specific transitions", () => {
      const properties = {
        opacity: { duration: 0.2, ease: "easeOut" },
        scale: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
        x: { duration: "fast" as const },
      };

      const result = createPropertyTransitions(properties);

      expect(result.opacity).toMatchObject({
        type: "tween",
        duration: 0.2,
        ease: "ease-out",
        delay: 0,
      });

      expect(result.scale).toMatchObject({
        type: "tween",
        duration: 0.5,
        ease: "ease-in-out",
        delay: 0.1,
      });

      expect(result.x).toMatchObject({
        type: "tween",
        duration: durationPresets.fast,
        ease: "ease-out",
        delay: 0,
      });
    });

    it("resolves named durations and easings", () => {
      const properties = {
        opacity: { duration: "slow" as const, ease: "easeInOutCubic" },
      };

      const result = createPropertyTransitions(properties);

      expect(result.opacity).toMatchObject({
        type: "tween",
        duration: durationPresets.slow,
        ease: easingPresets.easeInOutCubic,
        delay: 0,
      });
    });
  });

  describe("constant values", () => {
    it("has appropriate easing presets", () => {
      expect(Object.keys(easingPresets).length).toBeGreaterThan(10);
      expect(easingPresets.easeInOut).toBe("ease-in-out");
      expect(Array.isArray(easingPresets.easeInQuad)).toBe(true);
    });

    it("has appropriate duration presets", () => {
      expect(Object.keys(durationPresets).length).toBeGreaterThan(5);
      expect(durationPresets.normal).toBe(0.3);
      expect(durationPresets.fast).toBe(0.2);
    });

    it("has appropriate spring presets", () => {
      expect(Object.keys(springPresets).length).toBeGreaterThan(5);
      expect(springPresets.default.stiffness).toBeDefined();
      expect(springPresets.bouncy.damping).toBeDefined();
    });

    it("has appropriate inertia presets", () => {
      expect(Object.keys(inertiaPresets).length).toBeGreaterThan(3);
      expect(inertiaPresets.default.power).toBeDefined();
      expect(inertiaPresets.gentle.timeConstant).toBeDefined();
    });
  });
});
