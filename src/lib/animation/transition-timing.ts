import { Transition } from "framer-motion";
import { AnimationConfig } from "./animation-provider";

/**
 * Easing function presets for transitions
 */
export const easingPresets = {
  // Standard CSS easing functions
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",

  // Cubic bezier presets (common easing patterns)
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],

  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],

  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],

  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],

  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],

  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutExpo: [1, 0, 0, 1],

  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],

  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55],

  // Special effects
  anticipate: [0.7, -0.4, 0.345, 1.25],
  overshoot: [0.23, 1.2, 0.32, 1.5],
  bouncy: [0.2, -0.6, 0.265, 1.55],
  snappy: [0.95, 0.05, 0.795, 0.035],
  smoothOut: [0.5, 1, 0.89, 1],
  gentle: [0.37, 0.15, 0.51, 0.84],
  swift: [0.19, 1, 0.22, 1],
  precise: [0.47, 0, 0.745, 0.715],
};

/**
 * Types of transition methods available
 */
export type TransitionType = "tween" | "spring" | "inertia" | "keyframes";

/**
 * Duration presets for transitions (in seconds)
 */
export const durationPresets = {
  instant: 0,
  ultraFast: 0.075,
  veryFast: 0.15,
  fast: 0.2,
  normal: 0.3,
  medium: 0.4,
  slow: 0.5,
  verySlow: 0.75,
  ultraSlow: 1,
  deliberate: 1.5,
  dramatic: 2,
};

export type DurationPreset = keyof typeof durationPresets;

/**
 * Configuration for spring transitions
 */
export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  restSpeed?: number;
  restDelta?: number;
}

/**
 * Spring physics presets for natural motion
 */
export const springPresets: Record<string, SpringConfig> = {
  // Responsive UI presets
  default: {
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  gentle: {
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
  wobbly: {
    stiffness: 180,
    damping: 12,
    mass: 1,
  },
  stiff: {
    stiffness: 300,
    damping: 20,
    mass: 1,
  },
  slow: {
    stiffness: 30,
    damping: 15,
    mass: 1,
  },
  bouncy: {
    stiffness: 300,
    damping: 10,
    mass: 1.2,
    velocity: 2,
  },
  snappy: {
    stiffness: 400,
    damping: 40,
    mass: 1,
  },
  elastic: {
    stiffness: 450,
    damping: 15,
    mass: 1,
  },
  molasses: {
    stiffness: 50,
    damping: 30,
    mass: 2,
  },
  // Physics-inspired presets
  water: {
    stiffness: 100,
    damping: 20,
    mass: 1.5,
  },
  jello: {
    stiffness: 250,
    damping: 10,
    mass: 1,
  },
  rubber: {
    stiffness: 300,
    damping: 15,
    mass: 1.2,
  },
  trampoline: {
    stiffness: 400,
    damping: 8,
    mass: 1.5,
  },
  pendulum: {
    stiffness: 150,
    damping: 7,
    mass: 2,
  },
};

export type SpringPreset = keyof typeof springPresets;

/**
 * Configuration for inertia transitions
 */
export interface InertiaConfig {
  power?: number;
  timeConstant?: number;
  modifyTarget?: (v: number) => number;
  min?: number;
  max?: number;
  bounceStiffness?: number;
  bounceDamping?: number;
  restDelta?: number;
  velocityThreshold?: number;
  restSpeed?: number;
}

/**
 * Inertia presets for momentum-based transitions
 */
export const inertiaPresets: Record<string, InertiaConfig> = {
  default: {
    power: 0.8,
    timeConstant: 750,
  },
  gentle: {
    power: 0.6,
    timeConstant: 550,
  },
  smooth: {
    power: 0.7,
    timeConstant: 650,
  },
  responsive: {
    power: 0.9,
    timeConstant: 300,
  },
  momentum: {
    power: 0.8,
    timeConstant: 850,
    restDelta: 1,
  },
  swift: {
    power: 0.9,
    timeConstant: 250,
  },
  prolonged: {
    power: 0.7,
    timeConstant: 1200,
  },
  bounded: {
    power: 0.8,
    timeConstant: 400,
    bounceStiffness: 500,
    bounceDamping: 25,
  },
};

export type InertiaPreset = keyof typeof inertiaPresets;

/**
 * Factory function to create a tween transition
 */
export const createTween = (
  duration: number | DurationPreset,
  ease: string | number[] = "easeOut",
  delay: number = 0
): Transition => {
  const durationValue = typeof duration === "string" ? durationPresets[duration] : duration;

  const easingValue =
    typeof ease === "string" && ease in easingPresets 
      ? easingPresets[ease as keyof typeof easingPresets] 
      : ease;

  return {
    type: "tween",
    duration: durationValue,
    ease: easingValue,
    delay,
  };
};

/**
 * Factory function to create a spring transition
 */
export const createSpring = (
  preset: SpringPreset | SpringConfig = "default",
  delay: number = 0
): Transition => {
  const config = typeof preset === "string" ? springPresets[preset] : preset;

  return {
    type: "spring",
    ...config,
    delay,
  };
};

/**
 * Factory function to create an inertia transition
 */
export const createInertia = (preset: InertiaPreset | InertiaConfig = "default"): Transition => {
  const config = typeof preset === "string" ? inertiaPresets[preset] : preset;

  return {
    type: "inertia",
    ...config,
  };
};

/**
 * Creates a staggered transition for children
 */
export const createStaggerTransition = (
  delayPerChild = 0.05,
  childrenCount = 5,
  transition?: Transition
): Transition[] => {
  const defaultTransition: Transition = { type: "tween", duration: 0.3 };
  const baseTransition = transition || defaultTransition;

  return Array.from({ length: childrenCount }).map((_, i) => ({
    ...baseTransition,
    delay: (baseTransition.delay || 0) + i * delayPerChild,
  }));
};

/**
 * Creates a transition based on the animation config
 */
export const createTransitionFromConfig = (
  config: AnimationConfig,
  duration?: "fast" | "normal" | "slow" | number,
  ease?: string | number[],
  delay = 0
): Transition => {
  // Determine duration value
  let durationValue: number;
  if (typeof duration === "number") {
    durationValue = duration;
  } else if (duration) {
    durationValue = config.duration[duration];
  } else {
    durationValue = config.duration.normal;
  }

  // Determine easing value
  let easingValue;
  easingValue =
    typeof ease === "string" && ease in easingPresets
      ? easingPresets[ease as keyof typeof easingPresets]
      : ease || config.easing.easeOut;

  if (config.transition.type === "spring") {
    return {
      type: "spring",
      stiffness: config.transition.stiffness,
      damping: config.transition.damping,
      mass: config.transition.mass,
      delay,
    };
  }

  return {
    type: "tween",
    duration: durationValue,
    ease: easingValue,
    delay,
  };
};

/**
 * Creates a transition tailored for a specific state change
 */
export const createStateTransition = (
  fromState: string,
  toState: string,
  baseDuration: number | DurationPreset = "normal",
  ease: string | number[] = "easeOut"
): Transition => {
  // Define common state transitions with optimal easing and timing
  const stateTransitions: Record<string, Partial<Transition>> = {
    "initial-hover": { ease: "easeOut", duration: durationPresets.fast },
    "hover-active": { ease: "easeIn", duration: durationPresets.ultraFast },
    "active-hover": { ease: "easeOut", duration: durationPresets.fast },
    "hover-initial": { ease: "easeInOut", duration: durationPresets.normal },
    "initial-focus": { ease: "easeOut", duration: durationPresets.normal },
    "focus-initial": { ease: "easeInOut", duration: durationPresets.normal },
    "initial-disabled": { ease: "easeIn", duration: durationPresets.normal },
    "disabled-initial": { ease: "easeOut", duration: durationPresets.normal },
    "initial-loading": { ease: "easeIn", duration: durationPresets.normal },
    "loading-success": { ease: "easeOut", duration: durationPresets.normal },
    "loading-error": { ease: "easeInOut", duration: durationPresets.fast },
    "initial-expanded": { ease: "easeOut", duration: durationPresets.medium },
    "expanded-collapsed": { ease: "easeInOut", duration: durationPresets.normal },
    "collapsed-expanded": { ease: "easeOut", duration: durationPresets.medium },
  };

  const transitionKey = `${fromState}-${toState}`;
  const presetTransition = stateTransitions[transitionKey];

  const durationValue =
    typeof baseDuration === "string" ? durationPresets[baseDuration] : baseDuration;

  const easingValue =
    typeof ease === "string" && ease in easingPresets 
      ? easingPresets[ease as keyof typeof easingPresets] 
      : ease;

  if (presetTransition && 'duration' in presetTransition) {
    return {
      type: "tween",
      duration: presetTransition.duration || durationValue,
      ease: 'ease' in presetTransition ? presetTransition.ease : easingValue,
      ...presetTransition,
    };
  }
  
  return {
    type: "tween",
    duration: durationValue,
    ease: easingValue,
  };
};

/**
 * Creates property-specific transition timing
 */
export const createPropertyTransitions = (
  properties: Record<
    string,
    {
      duration?: number | DurationPreset;
      ease?: string | number[];
      delay?: number;
    }
  >
): Record<string, Transition> => {
  const result: Record<string, Transition> = {};

  for (const [prop, config] of Object.entries(properties)) {
    const { duration = "normal", ease = "easeOut", delay = 0 } = config;

    const durationValue = typeof duration === "string" ? durationPresets[duration] : duration;

    const easingValue =
      typeof ease === "string" && ease in easingPresets 
        ? easingPresets[ease as keyof typeof easingPresets] 
        : ease;

    result[prop] = {
      type: "tween",
      duration: durationValue,
      ease: easingValue,
      delay,
    };
  }

  return result;
};
