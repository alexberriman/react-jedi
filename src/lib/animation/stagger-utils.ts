import { Variants } from "framer-motion";
import { staggerPresets, StaggerPreset } from "./stagger";
import { AnimationDirection, ScaleDirection, RotationDirection } from "./animation-hooks";

export interface StaggerOptions {
  staggerDelay?: number;
  delayStart?: number;
  duration?: number;
  direction?: "forwards" | "backwards";
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut";
  orchestration?: "sequence" | "stagger" | "cascade" | "random" | "wave";
  childCount?: number;
  loop?: boolean;
  pattern?: "even" | "odd" | "random" | "alternate" | "custom";
  customIndices?: number[];
}

// Helper type for stagger path options
type PathType = "arc" | "zigzag" | "spiral" | "wave";

// Helper type for filter types
type FilterType = "blur" | "brightness" | "contrast" | "saturation" | "combined";

/**
 * Creates stagger variants for container elements
 */
export function createStaggerContainer(options: StaggerOptions = {}): Variants {
  const { staggerDelay = 0.1, delayStart = 0, orchestration = "stagger", loop = false } = options;

  // Calculate exit stagger based on orchestration
  const exitStagger = orchestration === "sequence" ? staggerDelay / 3 : staggerDelay / 2;

  return {
    initial: {
      transition: { staggerChildren: 0, delayChildren: 0 },
    },
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayStart,
        ...(loop ? { repeatType: "loop" as const, repeat: Infinity } : {}),
      },
    },
    exit: {
      transition: {
        staggerChildren: exitStagger,
        staggerDirection: -1,
        delayChildren: 0,
      },
    },
  };
}

/**
 * Creates custom stagger sequence with specific pattern
 */
export function createStaggerSequence(
  preset: StaggerPreset | Variants,
  options: StaggerOptions = {}
): Variants {
  const {
    staggerDelay = 0.1,
    delayStart = 0,
    orchestration = "stagger",
    childCount = 0,
    pattern = "even",
    customIndices = [],
  } = options;

  const baseVariants = typeof preset === "string" ? staggerPresets[preset] : preset;

  // Helper function to apply pattern-based index mapping
  const applyPatternMapping = (i: number): number => {
    if (pattern === "random" && childCount > 0) {
      // Generate a predictable pseudo-random mapping
      return (i * 17) % childCount;
    }

    if (pattern === "alternate") {
      return i % 2 === 0 ? Math.floor(i / 2) : childCount - 1 - Math.floor(i / 2);
    }

    if (pattern === "even") {
      // Even indices first, then odd
      return i % 2 === 0 ? Math.floor(i / 2) : Math.floor(childCount / 2) + Math.floor(i / 2);
    }

    if (pattern === "odd") {
      // Odd indices first, then even
      return i % 2 === 1 ? Math.floor(i / 2) : Math.floor(childCount / 2) + Math.floor(i / 2);
    }

    if (pattern === "custom" && customIndices.length > 0) {
      // Use custom sequence if provided
      const index = customIndices.indexOf(i);
      return index === -1 ? i : index;
    }

    return i;
  };

  // Helper function to apply orchestration-based timing
  const applyOrchestrationTiming = (effectiveIndex: number, baseDelay: number): number => {
    if (orchestration === "sequence") {
      // Each item waits for the previous to complete
      return baseDelay + effectiveIndex * staggerDelay * 2;
    }

    if (orchestration === "cascade") {
      // Exponential stagger
      return baseDelay + Math.pow(effectiveIndex * 0.5, 1.2) * staggerDelay;
    }

    if (orchestration === "wave") {
      // Sinusoidal wave pattern
      const divisor = childCount > 0 ? childCount : 1;
      const waveFactor = (Math.sin((Math.PI * effectiveIndex) / divisor) + 1) / 2;
      return baseDelay + staggerDelay * (childCount / 2) * waveFactor;
    }

    if (orchestration === "random") {
      // Pseudo-random stagger
      const randomSeed = effectiveIndex * 0.987_654_321;
      return baseDelay + staggerDelay * (0.5 + (randomSeed % 1));
    }

    // Regular stagger
    return baseDelay + effectiveIndex * staggerDelay;
  };

  const calculateDelay = (i: number): number => {
    // Apply pattern mapping first, then orchestration timing
    const effectiveIndex = applyPatternMapping(i);
    return applyOrchestrationTiming(effectiveIndex, delayStart);
  };

  return {
    initial: baseVariants.initial,
    animate: (i) => {
      const delay = calculateDelay(i);

      return {
        ...baseVariants.animate,
        transition: {
          ...baseVariants.transition,
          delay,
        },
      };
    },
    exit: baseVariants.exit || baseVariants.initial,
  };
}

/**
 * Creates stagger animation for items with specific direction
 */
export function createDirectionalStagger(
  direction: AnimationDirection = "up",
  options: {
    distance?: number;
    staggerDelay?: number;
    delayStart?: number;
    duration?: number;
    ease?: string;
  } = {}
): Variants {
  const {
    distance = 20,
    staggerDelay = 0.1,
    delayStart = 0,
    duration = 0.5,
    ease = "easeOut",
  } = options;

  const getDirectionalProperties = () => {
    // Handle vertical directions (up/down)
    if (direction === "up") {
      return {
        initial: { opacity: 0, y: distance },
        animate: { opacity: 1, y: 0 },
      };
    }

    if (direction === "down") {
      return {
        initial: { opacity: 0, y: -distance },
        animate: { opacity: 1, y: 0 },
      };
    }

    // Handle horizontal directions (left/right)
    if (direction === "left") {
      return {
        initial: { opacity: 0, x: -distance },
        animate: { opacity: 1, x: 0 },
      };
    }

    if (direction === "right") {
      return {
        initial: { opacity: 0, x: distance },
        animate: { opacity: 1, x: 0 },
      };
    }

    // Default to up direction
    return {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 },
    };
  };

  const { initial, animate } = getDirectionalProperties();

  return {
    initial,
    animate: (i) => ({
      ...animate,
      transition: {
        duration,
        ease,
        delay: delayStart + i * staggerDelay,
      },
    }),
    exit: initial,
  };
}

/**
 * Creates scale-based stagger animation
 */
export function createScaleStagger(
  scaleDirection: ScaleDirection = "uniform",
  options: {
    startScale?: number;
    staggerDelay?: number;
    delayStart?: number;
    duration?: number;
    ease?: string;
  } = {}
): Variants {
  const {
    startScale = 0.8,
    staggerDelay = 0.1,
    delayStart = 0,
    duration = 0.5,
    ease = "easeOut",
  } = options;

  const getScaleProperties = () => {
    // Uniform scaling (both dimensions)
    if (scaleDirection === "uniform") {
      return {
        initial: { opacity: 0, scale: startScale },
        animate: { opacity: 1, scale: 1 },
      };
    }

    // Horizontal scaling only
    if (scaleDirection === "horizontal") {
      return {
        initial: { opacity: 0, scaleX: startScale, scaleY: 1 },
        animate: { opacity: 1, scaleX: 1, scaleY: 1 },
      };
    }

    // Vertical scaling only
    if (scaleDirection === "vertical") {
      return {
        initial: { opacity: 0, scaleX: 1, scaleY: startScale },
        animate: { opacity: 1, scaleX: 1, scaleY: 1 },
      };
    }

    // Default to uniform scaling
    return {
      initial: { opacity: 0, scale: startScale },
      animate: { opacity: 1, scale: 1 },
    };
  };

  const { initial, animate } = getScaleProperties();

  return {
    initial,
    animate: (i) => ({
      ...animate,
      transition: {
        duration,
        ease,
        delay: delayStart + i * staggerDelay,
      },
    }),
    exit: initial,
  };
}

/**
 * Creates rotation-based stagger animation
 */
export function createRotateStagger(
  rotationDirection: RotationDirection = "clockwise",
  options: {
    angle?: number;
    staggerDelay?: number;
    delayStart?: number;
    duration?: number;
    ease?: string;
  } = {}
): Variants {
  const {
    angle = 10,
    staggerDelay = 0.1,
    delayStart = 0,
    duration = 0.5,
    ease = "easeOut",
  } = options;

  const getRotationAngles = () => {
    switch (rotationDirection) {
      case "clockwise": {
        return { initial: -angle, animate: 0, exit: angle };
      }
      case "counterclockwise": {
        return { initial: angle, animate: 0, exit: -angle };
      }
      case "full": {
        return { initial: -360, animate: 0, exit: 360 };
      }
      case "halfTurn": {
        return { initial: -180, animate: 0, exit: 180 };
      }
      default: {
        return { initial: -angle, animate: 0, exit: angle };
      }
    }
  };

  const angles = getRotationAngles();

  return {
    initial: { opacity: 0, rotate: angles.initial },
    animate: (i) => ({
      opacity: 1,
      rotate: angles.animate,
      transition: {
        duration,
        ease,
        delay: delayStart + i * staggerDelay,
      },
    }),
    exit: { opacity: 0, rotate: angles.exit },
  };
}

/**
 * Creates stagger variants with path following animation
 */
export function createPathStagger(
  options: {
    path?: PathType;
    intensity?: number;
    staggerDelay?: number;
    delayStart?: number;
    duration?: number;
    ease?: string;
    childCount?: number;
  } = {}
): Variants {
  const {
    path = "arc",
    intensity = 20,
    staggerDelay = 0.1,
    delayStart = 0,
    duration = 0.7,
    ease = "easeOut",
    childCount = 1,
  } = options;

  const calculatePathPosition = (i: number, total: number) => {
    const progress = total > 1 ? i / (total - 1) : 0;

    // Arc path
    if (path === "arc") {
      return {
        x: intensity * Math.sin(progress * Math.PI),
        y: intensity * (1 - Math.cos(progress * Math.PI)),
      };
    }

    // Zigzag pattern
    if (path === "zigzag") {
      return {
        x: intensity * (progress * 2 - 1) * (i % 2 === 0 ? 1 : -1),
        y: intensity * progress,
      };
    }

    // Spiral pattern
    if (path === "spiral") {
      const angle = progress * Math.PI * 4;
      const radius = intensity * progress;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    }

    // Wave pattern
    if (path === "wave") {
      return {
        x: intensity * progress,
        y: intensity * Math.sin(progress * Math.PI * 3),
      };
    }

    // Default case
    return { x: 0, y: 0 };
  };

  return {
    initial: (i) => {
      const position = calculatePathPosition(i, childCount);
      return {
        opacity: 0,
        x: position.x,
        y: position.y,
      };
    },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease,
        delay: delayStart + i * staggerDelay,
      },
    }),
    exit: (i) => {
      const position = calculatePathPosition(i, childCount);
      return {
        opacity: 0,
        x: position.x * -0.5,
        y: position.y * -0.5,
      };
    },
  };
}

/**
 * Creates stagger animation with filter effects
 */
export function createFilterStagger(
  options: {
    filter?: FilterType;
    intensity?: number;
    staggerDelay?: number;
    delayStart?: number;
    duration?: number;
    ease?: string;
  } = {}
): Variants {
  const {
    filter = "blur",
    intensity = 10,
    staggerDelay = 0.1,
    delayStart = 0,
    duration = 0.6,
    ease = "easeOut",
  } = options;

  // Helper function to get filter values
  const createFilterValue = (filterType: FilterType) => {
    if (filterType === "blur") {
      return { initial: `blur(${intensity}px)`, animate: "blur(0px)" };
    }

    if (filterType === "brightness") {
      return { initial: `brightness(${1 + intensity / 10})`, animate: "brightness(1)" };
    }

    if (filterType === "contrast") {
      return { initial: `contrast(${1 + intensity / 10})`, animate: "contrast(1)" };
    }

    if (filterType === "saturation") {
      return { initial: `saturate(${1 + intensity / 5})`, animate: "saturate(1)" };
    }

    if (filterType === "combined") {
      return {
        initial: `blur(${intensity / 2}px) brightness(${1 + intensity / 20}) contrast(${1 + intensity / 20})`,
        animate: "blur(0px) brightness(1) contrast(1)",
      };
    }

    // Default to blur if not specified
    return { initial: `blur(${intensity}px)`, animate: "blur(0px)" };
  };

  const getFilterValue = () => createFilterValue(filter);

  const { initial, animate } = getFilterValue();

  return {
    initial: { opacity: 0, filter: initial },
    animate: (i) => ({
      opacity: 1,
      filter: animate,
      transition: {
        duration,
        ease,
        delay: delayStart + i * staggerDelay,
      },
    }),
    exit: { opacity: 0, filter: initial },
  };
}

// Define the possible effects for complex stagger animations
type StaggerEffect = "fade" | "slide" | "scale" | "rotate" | "blur";

/**
 * Creates complex multi-property stagger animation
 */
export function createComplexStagger(
  options: {
    effects?: Array<StaggerEffect>;
    direction?: AnimationDirection;
    staggerDelay?: number;
    delayStart?: number;
    duration?: number;
    ease?: string;
    intensity?: number;
  } = {}
): Variants {
  const {
    effects = ["fade", "slide"],
    direction = "up",
    staggerDelay = 0.1,
    delayStart = 0,
    duration = 0.7,
    ease = "easeOut",
    intensity = 20,
  } = options;

  // Build initial and animate states based on requested effects
  const initial: Record<string, unknown> = {};
  const animate: Record<string, unknown> = {};

  // Add effects
  if (effects.includes("fade")) {
    initial.opacity = 0;
    animate.opacity = 1;
  }

  if (effects.includes("slide")) {
    switch (direction) {
      case "up": {
        initial.y = intensity;
        animate.y = 0;

        break;
      }
      case "down": {
        initial.y = -intensity;
        animate.y = 0;

        break;
      }
      case "left": {
        initial.x = intensity;
        animate.x = 0;

        break;
      }
      case "right": {
        initial.x = -intensity;
        animate.x = 0;

        break;
      }
      // No default
    }
  }

  if (effects.includes("scale")) {
    initial.scale = 0.8;
    animate.scale = 1;
  }

  if (effects.includes("rotate")) {
    initial.rotate = direction === "left" || direction === "up" ? -15 : 15;
    animate.rotate = 0;
  }

  if (effects.includes("blur")) {
    initial.filter = `blur(${intensity / 2}px)`;
    animate.filter = "blur(0px)";
  }

  return {
    initial,
    animate: (i) => ({
      ...animate,
      transition: {
        duration,
        ease,
        delay: delayStart + i * staggerDelay,
      },
    }),
    exit: initial,
  };
}
