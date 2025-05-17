import { describe, it, expect } from "vitest";
import {
  createFlowPattern,
  createElasticPattern,
  createStaggeredPattern,
  createLoopPattern,
  createOrchestratedPattern,
  createProgressivePattern,
  createMicroPattern,
  createDramaticPattern,
  createStagedPattern,
} from "./transition-patterns";

describe("Transition Patterns", () => {
  const baseStates = {
    initial: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
    },
    hover: {
      scale: 1.1,
      opacity: 1,
      x: 0,
      y: 0,
    },
    active: {
      scale: 0.9,
      opacity: 0.9,
      x: 0,
      y: 0,
    },
  };

  describe("createFlowPattern", () => {
    it("creates a flow pattern with proper sequence and timing", () => {
      const sequence = ["initial", "hover", "active"];
      const result = createFlowPattern(baseStates, sequence, 0.2, "ease-in-out");

      expect(result.states.initial).toEqual(baseStates.initial);
      expect(result.states.hover.transition).toMatchObject({
        duration: 0.2,
        ease: "ease-in-out",
      });
      expect(result.states.active.transition).toMatchObject({
        duration: 0.2,
        ease: "ease-in-out",
      });
      expect(result.initialState).toBe("initial");
    });
  });

  describe("createElasticPattern", () => {
    it("applies spring physics to all transitions", () => {
      const result = createElasticPattern(baseStates, 300, 15);

      expect(result.states.hover.transition).toMatchObject({
        type: "spring",
        stiffness: 300,
        damping: 15,
      });

      expect(result.states.active.transition).toMatchObject({
        type: "spring",
        stiffness: 300,
        damping: 15,
      });
    });
  });

  describe("createStaggeredPattern", () => {
    it("creates staggered configurations for multiple items", () => {
      const itemCount = 3;
      const staggerDelay = 0.05;
      const result = createStaggeredPattern(baseStates, itemCount, staggerDelay);

      expect(Object.keys(result)).toHaveLength(itemCount);
      expect(result["item-0"].states.hover.transition?.delay).toBe(0);
      expect(result["item-1"].states.hover.transition?.delay).toBe(staggerDelay);
      expect(result["item-2"].states.hover.transition?.delay).toBe(staggerDelay * 2);
    });

    it("preserves original transition properties and adds staggered delays", () => {
      const statesWithTransitions = {
        ...baseStates,
        hover: {
          ...baseStates.hover,
          transition: { duration: 0.3, ease: "easeOut" },
        },
      };

      const result = createStaggeredPattern(statesWithTransitions, 2, 0.1);

      expect(result["item-0"].states.hover.transition).toMatchObject({
        duration: 0.3,
        ease: "easeOut",
        delay: 0,
      });

      expect(result["item-1"].states.hover.transition).toMatchObject({
        duration: 0.3,
        ease: "easeOut",
        delay: 0.1,
      });
    });
  });

  describe("createLoopPattern", () => {
    it("configures states for looping transitions", () => {
      const sequence = ["initial", "active", "initial"];
      const result = createLoopPattern(baseStates, sequence, 1);

      expect(result.states.active.transition).toBeDefined();
      expect(result.states.initial.transition).toMatchObject({
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
      });
    });
  });

  describe("createOrchestratedPattern", () => {
    it("creates property-specific transitions with precise timing", () => {
      const stages = [
        {
          from: "initial",
          to: "hover",
          duration: 0.3,
          delay: 0,
          ease: "easeOut",
          properties: ["scale", "opacity"],
        },
        {
          from: "hover",
          to: "active",
          duration: 0.1,
          delay: 0.2,
          ease: "easeIn",
        },
      ];

      const result = createOrchestratedPattern(baseStates, stages);

      expect(result.states.hover.transition).toMatchObject({
        scale: {
          duration: 0.3,
          delay: 0,
          ease: "easeOut",
        },
        opacity: {
          duration: 0.3,
          delay: 0,
          ease: "easeOut",
        },
      });

      expect(result.states.active.transition).toMatchObject({
        duration: 0.1,
        delay: 0.2,
        ease: "easeIn",
      });
    });
  });

  describe("createProgressivePattern", () => {
    it("creates staggered property-specific transitions", () => {
      const properties = ["opacity", "y", "scale"];
      const result = createProgressivePattern(baseStates, properties, 0.3, 0.1);

      expect(result.states.hover.transition).toMatchObject({
        opacity: {
          duration: 0.3,
          delay: 0,
          ease: "easeOut",
        },
        y: {
          duration: 0.3,
          delay: 0.1,
          ease: "easeOut",
        },
        scale: {
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        },
      });

      expect(result.states.active.transition).toMatchObject({
        opacity: {
          duration: 0.3,
          delay: 0,
          ease: "easeOut",
        },
        y: {
          duration: 0.3,
          delay: 0.1,
          ease: "easeOut",
        },
        scale: {
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        },
      });
    });
  });

  describe("createMicroPattern", () => {
    it("configures quick responsive transitions", () => {
      const result = createMicroPattern(baseStates, 0.15);

      expect(result.states.hover.transition).toMatchObject({
        duration: 0.15,
        ease: "easeOut",
      });

      expect(result.states.active.transition).toMatchObject({
        duration: 0.15,
        ease: "easeOut",
      });
    });
  });

  describe("createDramaticPattern", () => {
    it("exaggerates transitions for dramatic effect", () => {
      const result = createDramaticPattern(baseStates);

      // Scale should be exaggerated (1.1 * 1.5 = 1.65)
      expect(result.states.hover.scale).toBeCloseTo(1.65);

      // Spring configs should be applied
      expect(result.states.hover.transition).toMatchObject({
        type: "spring",
        stiffness: 200,
        damping: 10,
        mass: 1.5,
      });
    });

    it("preserves opacity values (doesn't exaggerate them)", () => {
      const result = createDramaticPattern(baseStates);
      expect(result.states.active.opacity).toBe(0.9); // Original value
    });
  });

  describe("createStagedPattern", () => {
    it("configures multi-stage transitions with appropriate timing", () => {
      const stages = ["initial", "loading", "success"];
      const result = createStagedPattern(baseStates, stages, 0.5, 0.3);

      expect(result.states.loading.transition).toMatchObject({
        duration: 0.5,
        delay: 0.3,
      });

      expect(result.states.success.transition).toMatchObject({
        duration: 0.5,
        delay: 0.6, // 2 * 0.3
      });
    });
  });
});
