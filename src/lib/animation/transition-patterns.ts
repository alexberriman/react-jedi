import { ComponentState, StateConfig, StateTransitionConfig } from "./state-transitions";

/**
 * Pattern for transitions that flow between multiple states
 * with natural motion and proper timing
 */
export const createFlowPattern = (
  states: Record<ComponentState, StateConfig>,
  sequence: ComponentState[] = ["initial", "hover", "active", "hover", "initial"],
  baseDuration: number = 0.2,
  easing: string = "ease-in-out"
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Create a natural flow between states with appropriate timing
  for (let index = 0; index < sequence.length - 1; index++) {
    const nextState = sequence[index + 1];

    if (enhancedStates[nextState]) {
      if (!enhancedStates[nextState].transition) {
        enhancedStates[nextState].transition = {};
      }

      // When coming from this specific state, use a customized transition
      enhancedStates[nextState].transition = {
        ...enhancedStates[nextState].transition,
        duration: baseDuration,
        ease: easing,
      };
    }
  }

  return {
    states: enhancedStates,
    initialState: sequence[0],
  };
};

/**
 * Pattern for smooth elastic transitions
 * Creates springy, bouncy transitions between states
 */
export const createElasticPattern = (
  states: Record<ComponentState, StateConfig>,
  stiffness: number = 300,
  damping: number = 15
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Add spring physics to all state transitions
  for (const state of Object.keys(enhancedStates)) {
    enhancedStates[state] = {
      ...enhancedStates[state],
      transition: {
        ...enhancedStates[state].transition,
        type: "spring",
        stiffness,
        damping,
      },
    };
  }

  return {
    states: enhancedStates,
    initialState: "initial",
  };
};

/**
 * Pattern for staggered transitions that reveal content in sequence
 * Useful for lists or groups of items
 */
export const createStaggeredPattern = (
  baseStates: Record<ComponentState, StateConfig>,
  staggerItems: number = 5,
  staggerDelay: number = 0.05
): Record<string, StateTransitionConfig> => {
  const staggered: Record<string, StateTransitionConfig> = {};

  // Create variations for each staggered item
  for (let i = 0; i < staggerItems; i++) {
    const itemStates = { ...baseStates };

    // Modify transitions with staggered delays
    for (const state of Object.keys(itemStates)) {
      if (state !== "initial") {
        itemStates[state] = {
          ...itemStates[state],
          transition: {
            ...itemStates[state].transition,
            delay: (itemStates[state].transition?.delay || 0) + i * staggerDelay,
          },
        };
      }
    }

    staggered[`item-${i}`] = {
      states: itemStates,
      initialState: "initial",
    };
  }

  return staggered;
};

/**
 * Pattern for looping transitions
 * Creates an infinite cycling between states
 */
export const createLoopPattern = (
  states: Record<ComponentState, StateConfig>,
  sequence: ComponentState[] = ["initial", "active", "initial"],
  durationPerState: number = 1
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Configure each state in the sequence for smooth looping
  for (let index = 0; index < sequence.length - 1; index++) {
    const nextState = sequence[index + 1];

    if (enhancedStates[nextState]) {
      if (!enhancedStates[nextState].transition) {
        enhancedStates[nextState].transition = {};
      }

      // Set up transition to next state with appropriate timing
      enhancedStates[nextState].transition = {
        ...enhancedStates[nextState].transition,
        duration: durationPerState,
        repeat: index === sequence.length - 2 ? Infinity : 0, // Loop on last transition
        repeatType: "loop",
      };
    }
  }

  return {
    states: enhancedStates,
    initialState: sequence[0],
  };
};

/**
 * Pattern for orchestrated transitions
 * Creates complex multi-stage transitions with precise timing
 */
export const createOrchestratedPattern = (
  states: Record<ComponentState, StateConfig>,
  stages: Array<{
    from: ComponentState;
    to: ComponentState;
    duration: number;
    delay: number;
    ease?: string;
    properties?: string[];
  }>
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Process each stage of the orchestrated transition
  for (const stage of stages) {
    const { to, duration, delay, ease, properties } = stage;

    if (enhancedStates[to]) {
      if (!enhancedStates[to].transition) {
        enhancedStates[to].transition = {};
      }

      // Create property-specific transition if properties are specified
      if (properties && properties.length > 0) {
        for (const prop of properties) {
          enhancedStates[to].transition = {
            ...enhancedStates[to].transition,
            [prop]: {
              duration,
              delay,
              ease: ease || "ease",
            },
          };
        }
      } else {
        // Otherwise apply to the whole state transition
        enhancedStates[to].transition = {
          ...enhancedStates[to].transition,
          duration,
          delay,
          ease: ease || "ease",
        };
      }
    }
  }

  return {
    states: enhancedStates,
    initialState: "initial",
  };
};

/**
 * Pattern for progressive reveal
 * Creates transitions that progressively reveal content
 */
export const createProgressivePattern = (
  states: Record<ComponentState, StateConfig>,
  properties: string[] = ["opacity", "y", "scale"],
  baseDuration: number = 0.3,
  staggerDelay: number = 0.1
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Configure property-specific timing for a progressive feel
  for (const state of Object.keys(enhancedStates)) {
    if (state !== "initial") {
      if (!enhancedStates[state].transition) {
        enhancedStates[state].transition = {};
      }

      // Stagger the properties for a progressive transition
      for (const [index, prop] of properties.entries()) {
        enhancedStates[state].transition = {
          ...enhancedStates[state].transition,
          [prop]: {
            duration: baseDuration,
            delay: index * staggerDelay,
            ease: "easeOut",
          },
        };
      }
    }
  }

  return {
    states: enhancedStates,
    initialState: "initial",
  };
};

/**
 * Pattern for micro-interactions
 * Creates subtle, quick transitions for responsive feedback
 */
export const createMicroPattern = (
  states: Record<ComponentState, StateConfig>,
  baseDuration: number = 0.15
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Configure quick, responsive transitions
  for (const state of Object.keys(enhancedStates)) {
    if (state !== "initial") {
      enhancedStates[state] = {
        ...enhancedStates[state],
        transition: {
          ...enhancedStates[state].transition,
          duration: baseDuration,
          ease: "easeOut",
        },
      };
    }
  }

  return {
    states: enhancedStates,
    initialState: "initial",
  };
};

/**
 * Pattern for dramatic transitions
 * Creates visually impressive transitions with exaggerated motion
 */
export const createDramaticPattern = (
  states: Record<ComponentState, StateConfig>
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Add dramatic flourishes to transitions
  for (const state of Object.keys(enhancedStates)) {
    if (state !== "initial") {
      // Exaggerate existing values for dramatic effect
      for (const [prop, value] of Object.entries(enhancedStates[state])) {
        if (prop !== "transition" && typeof value === "number" && prop !== "opacity") {
          const currentState = enhancedStates[state];
          (currentState as Record<string, unknown>)[prop] = value * 1.5; // Exaggerate numeric values
        }
      }

      // Add dramatic transition timing
      enhancedStates[state].transition = {
        ...enhancedStates[state].transition,
        type: "spring",
        stiffness: 200,
        damping: 10,
        mass: 1.5,
      };
    }
  }

  return {
    states: enhancedStates,
    initialState: "initial",
  };
};

/**
 * Pattern for staged transitions
 * Creates multi-stage transitions that happen in discrete steps
 */
export const createStagedPattern = (
  states: Record<ComponentState, StateConfig>,
  stages: ComponentState[] = ["initial", "loading", "success"],
  durationPerStage: number = 0.5,
  pausePerStage: number = 0.3
): StateTransitionConfig => {
  const enhancedStates = { ...states };

  // Configure each stage with appropriate timing
  for (let index = 1; index < stages.length; index++) {
    const stage = stages[index];

    // Initialize the state if it doesn't exist
    if (!enhancedStates[stage]) {
      enhancedStates[stage] = {};
    }

    enhancedStates[stage] = {
      ...enhancedStates[stage],
      transition: {
        ...enhancedStates[stage].transition,
        duration: durationPerStage,
        delay: index * pausePerStage,
      },
    };
  }

  return {
    states: enhancedStates,
    initialState: stages[0],
  };
};
