import { HTMLMotionProps, Variants, Transition, TargetAndTransition } from "framer-motion";
import { useAnimation } from "./animation-provider";
import { useMemo } from "react";

/**
 * Defines the different possible component states for transitions
 */
export type ComponentState =
  | "initial" // Initial/default state
  | "hover" // Mouse hover state
  | "active" // Active/pressed state
  | "focus" // Keyboard focus state
  | "disabled" // Disabled state
  | "loading" // Loading state
  | "success" // Success state
  | "error" // Error state
  | "selected" // Selected state
  | "expanded" // Expanded state
  | "collapsed" // Collapsed state
  | string; // Custom states

/**
 * Configuration for a specific state
 */
export interface StateConfig extends TargetAndTransition {
  transition?: Transition;
}

/**
 * Configuration for state transitions
 */
export interface StateTransitionConfig {
  states: Record<ComponentState, StateConfig>;
  initialState?: ComponentState;
  reduceMotion?: boolean;
  duration?: "fast" | "normal" | "slow" | number;
}

/**
 * Hook for creating state transitions
 * @param config State transition configuration
 * @returns Motion props for the component
 */
export const useStateTransition = (config: StateTransitionConfig): HTMLMotionProps<"div"> => {
  const animationConfig = useAnimation();
  const {
    states,
    initialState = "initial",
    reduceMotion = animationConfig.reducedMotion,
    duration = "normal",
  } = config;

  const durationValue =
    typeof duration === "number" ? duration : animationConfig.duration[duration];

  const variants = useMemo(() => {
    if (reduceMotion) {
      // Create a simplified version with minimal animation when reduced motion is preferred
      const reducedVariants: Variants = {};
      for (const state of Object.keys(states)) {
        reducedVariants[state] = {
          opacity: states[state].opacity,
        };
      }
      return reducedVariants;
    }

    // Generate variants object from states
    const stateVariants: Variants = {};

    for (const [state, stateConfig] of Object.entries(states)) {
      const transitionConfig = {
        duration: durationValue,
        ...animationConfig.transition,
        ...stateConfig.transition,
      };

      stateVariants[state] = {
        ...stateConfig,
        transition: transitionConfig,
      };
    }

    return stateVariants;
  }, [states, reduceMotion, durationValue, animationConfig]);

  return {
    initial: initialState,
    animate: initialState,
    variants,
  };
};

/**
 * Hook for animating between stateful component variations (enabled, disabled, loading, etc.)
 * @param currentState Current component state
 * @param stateConfig Configuration for state transitions
 * @returns Motion props for the component
 */
export const useComponentState = (
  currentState: ComponentState,
  stateConfig: StateTransitionConfig
): HTMLMotionProps<"div"> => {
  const { states, initialState = "initial", reduceMotion, duration } = stateConfig;
  const motionProps = useStateTransition({ states, initialState, reduceMotion, duration });

  return {
    ...motionProps,
    animate: currentState,
  };
};

/**
 * Transition between multiple component states with orchestrated timing
 * @param states Object mapping state names to state configurations
 * @param transitions Array of state transition configurations
 * @returns Combined state transition configuration
 */
export const createStateTransition = (
  states: Record<ComponentState, StateConfig>,
  transitions: Array<{
    from: ComponentState;
    to: ComponentState;
    duration?: number;
    delay?: number;
    ease?: string;
  }>
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Add transition-specific configurations
  for (const { from, to, duration, delay, ease } of transitions) {
    if (enhancedStates[from] && enhancedStates[to]) {
      if (!enhancedStates[to].transition) {
        enhancedStates[to].transition = {};
      }

      // When transitioning from a specific state, apply these transition properties
      enhancedStates[to].transition = {
        ...enhancedStates[to].transition,
        duration,
        delay,
        ease,
      };
    }
  }

  return {
    states: enhancedStates,
    initialState: "initial",
  };
};

/**
 * Predefined state presets for common UI components
 */
export const statePresets = {
  // Button state preset
  button: {
    initial: {
      scale: 1,
      backgroundColor: "var(--primary)",
      color: "var(--primary-foreground)",
      boxShadow: "var(--shadow-sm)",
    },
    hover: {
      scale: 1.02,
      backgroundColor: "var(--primary-600)",
      boxShadow: "var(--shadow-md)",
      transition: { duration: 0.15 },
    },
    active: {
      scale: 0.98,
      backgroundColor: "var(--primary-700)",
      boxShadow: "var(--shadow-inner)",
      transition: { duration: 0.1 },
    },
    focus: {
      boxShadow: "0 0 0 2px var(--ring)",
      transition: { duration: 0.2 },
    },
    disabled: {
      opacity: 0.6,
      backgroundColor: "var(--primary-200)",
      cursor: "not-allowed",
      transition: { duration: 0.2 },
    },
    loading: {
      opacity: 0.8,
      transition: { duration: 0.2 },
    },
    success: {
      backgroundColor: "var(--success)",
      scale: 1,
      transition: { duration: 0.3 },
    },
    error: {
      backgroundColor: "var(--destructive)",
      scale: 1,
      transition: { duration: 0.3 },
    },
  },

  // Card state preset
  card: {
    initial: {
      scale: 1,
      boxShadow: "var(--shadow-default)",
      backgroundColor: "var(--background)",
      y: 0,
    },
    hover: {
      y: -5,
      boxShadow: "var(--shadow-lg)",
      transition: { duration: 0.2 },
    },
    active: {
      scale: 0.99,
      boxShadow: "var(--shadow-md)",
      transition: { duration: 0.15 },
    },
    focus: {
      boxShadow: "0 0 0 2px var(--ring), var(--shadow-md)",
      transition: { duration: 0.2 },
    },
    expanded: {
      scale: 1.02,
      boxShadow: "var(--shadow-xl)",
      transition: { duration: 0.3 },
    },
    collapsed: {
      scale: 0.98,
      opacity: 0.9,
      transition: { duration: 0.3 },
    },
  },

  // Input state preset
  input: {
    initial: {
      borderColor: "var(--border)",
      backgroundColor: "var(--input)",
      boxShadow: "none",
    },
    hover: {
      borderColor: "var(--primary-300)",
      transition: { duration: 0.2 },
    },
    focus: {
      borderColor: "var(--primary)",
      boxShadow: "0 0 0 1px var(--ring)",
      transition: { duration: 0.2 },
    },
    disabled: {
      opacity: 0.6,
      backgroundColor: "var(--muted)",
      cursor: "not-allowed",
      transition: { duration: 0.2 },
    },
    error: {
      borderColor: "var(--destructive)",
      boxShadow: "0 0 0 1px var(--destructive-200)",
      transition: { duration: 0.2 },
    },
    success: {
      borderColor: "var(--success)",
      transition: { duration: 0.2 },
    },
  },

  // Toggle/switch preset
  toggle: {
    initial: {
      backgroundColor: "var(--muted)",
      borderColor: "var(--border)",
    },
    hover: {
      opacity: 0.9,
      transition: { duration: 0.15 },
    },
    active: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
    selected: {
      backgroundColor: "var(--primary)",
      borderColor: "var(--primary-600)",
      transition: { duration: 0.2 },
    },
    disabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      transition: { duration: 0.2 },
    },
  },

  // Menu item preset
  menuItem: {
    initial: {
      backgroundColor: "transparent",
      color: "var(--foreground)",
    },
    hover: {
      backgroundColor: "var(--muted)",
      transition: { duration: 0.1 },
    },
    active: {
      backgroundColor: "var(--accent)",
      transition: { duration: 0.1 },
    },
    focus: {
      backgroundColor: "var(--muted)",
      outline: "2px solid var(--ring)",
      transition: { duration: 0.1 },
    },
    selected: {
      backgroundColor: "var(--accent)",
      color: "var(--accent-foreground)",
      fontWeight: 500,
      transition: { duration: 0.2 },
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      transition: { duration: 0.2 },
    },
  },
};

export type StatePreset = keyof typeof statePresets;

/**
 * Hook for using predefined state presets
 * @param preset Preset name
 * @param customStates Optional custom states to merge with the preset
 * @returns State transition configuration
 */
export const useStatePreset = (
  preset: StatePreset,
  customStates: Partial<Record<ComponentState, Partial<StateConfig>>> = {}
): StateTransitionConfig => {
  const presetStates = statePresets[preset];

  // Merge custom states with preset states
  const mergedStates: Record<ComponentState, StateConfig> = { ...presetStates };

  for (const [state, config] of Object.entries(customStates)) {
    mergedStates[state] = mergedStates[state]
      ? {
          ...mergedStates[state],
          ...config,
        }
      : (config as StateConfig);
  }

  return {
    states: mergedStates,
    initialState: "initial",
  };
};

/**
 * Creates a transition sequence between multiple states
 * @param states Map of state configurations
 * @param sequence Array of states to transition through in sequence
 * @param durationPerState Duration for each state transition
 * @param delayBetweenStates Delay between state transitions
 * @returns State transition configuration with timing
 */
export const createTransitionSequence = (
  states: Record<ComponentState, StateConfig>,
  sequence: ComponentState[],
  durationPerState: number = 0.3,
  delayBetweenStates: number = 0.1
): StateTransitionConfig => {
  const transitions = [];

  // Create transitions between each state in the sequence
  for (let i = 0; i < sequence.length - 1; i++) {
    transitions.push({
      from: sequence[i],
      to: sequence[i + 1],
      duration: durationPerState,
      delay: i * delayBetweenStates,
    });
  }

  return createStateTransition(states, transitions);
};
