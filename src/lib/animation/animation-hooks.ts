import { useMemo } from "react";
import { AnimationProps, HTMLMotionProps, Variants, TargetAndTransition } from "framer-motion";
import { useAnimation } from "./animation-provider";

export type AnimationVariant =
  | "fadeIn"
  | "fadeOut"
  | "slideIn"
  | "slideOut"
  | "scaleIn"
  | "scaleOut"
  | "rotateIn"
  | "rotateOut"
  | "custom";
export type AnimationDirection = "up" | "down" | "left" | "right";
export type ScaleDirection = "uniform" | "horizontal" | "vertical";
export type RotationDirection = "clockwise" | "counterclockwise" | "full" | "halfTurn";

export interface UseAnimationProps {
  variant?: AnimationVariant;
  direction?: AnimationDirection;
  scaleDirection?: ScaleDirection;
  rotationDirection?: RotationDirection;
  delay?: number;
  duration?: "fast" | "normal" | "slow" | number;
  custom?: Variants;
  disabled?: boolean;
}

export const useAnimationVariants = ({
  variant = "fadeIn",
  direction = "up",
  scaleDirection = "uniform",
  rotationDirection = "clockwise",
  delay = 0,
  duration = "normal",
  custom,
  disabled = false,
}: UseAnimationProps = {}): HTMLMotionProps<"div"> => {
  const config = useAnimation();

  const durationValue = typeof duration === "number" ? duration : config.duration[duration];

  const variants: Variants = useMemo(() => {
    if (disabled || config.reducedMotion) {
      return {
        initial: {},
        animate: {},
        exit: {},
      };
    }

    if (custom) {
      return custom;
    }

    switch (variant) {
      case "fadeIn": {
        return {
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 0 },
        };
      }

      case "fadeOut": {
        return {
          initial: { opacity: 1 },
          animate: {
            opacity: 0,
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 1 },
        };
      }

      case "slideIn": {
        const slideOffsets = {
          up: { y: 20 },
          down: { y: -20 },
          left: { x: 20 },
          right: { x: -20 },
        };
        return {
          initial: { opacity: 0, ...slideOffsets[direction] },
          animate: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 0, ...slideOffsets[direction] },
        };
      }

      case "slideOut": {
        const slideOffsets = {
          up: { y: -20 },
          down: { y: 20 },
          left: { x: -20 },
          right: { x: 20 },
        };
        return {
          initial: { opacity: 1, x: 0, y: 0 },
          animate: {
            opacity: 0,
            ...slideOffsets[direction],
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 1, x: 0, y: 0 },
        };
      }

      case "scaleIn": {
        const scaleValues = {
          uniform: { scale: 0.8 },
          horizontal: { scaleX: 0.8, scaleY: 1 },
          vertical: { scaleX: 1, scaleY: 0.8 },
        };
        const resetScale = {
          uniform: { scale: 1 },
          horizontal: { scaleX: 1 },
          vertical: { scaleY: 1 },
        };
        return {
          initial: { opacity: 0, ...scaleValues[scaleDirection] },
          animate: {
            opacity: 1,
            ...resetScale[scaleDirection],
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 0, ...scaleValues[scaleDirection] },
        };
      }

      case "scaleOut": {
        const scaleValues = {
          uniform: { scale: 1.2 },
          horizontal: { scaleX: 1.2, scaleY: 1 },
          vertical: { scaleX: 1, scaleY: 1.2 },
        };
        const resetScale = {
          uniform: { scale: 1 },
          horizontal: { scaleX: 1 },
          vertical: { scaleY: 1 },
        };
        return {
          initial: { opacity: 0, ...scaleValues[scaleDirection] },
          animate: {
            opacity: 1,
            ...resetScale[scaleDirection],
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 0, ...scaleValues[scaleDirection] },
        };
      }

      case "rotateIn": {
        const rotationAngles = {
          clockwise: { initial: -45, animate: 0, exit: 45 },
          counterclockwise: { initial: 45, animate: 0, exit: -45 },
          full: { initial: -360, animate: 0, exit: 360 },
          halfTurn: { initial: -180, animate: 0, exit: 180 },
        };
        const angles = rotationAngles[rotationDirection];
        return {
          initial: { opacity: 0, rotate: angles.initial },
          animate: {
            opacity: 1,
            rotate: angles.animate,
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 0, rotate: angles.exit },
        };
      }

      case "rotateOut": {
        const rotationAngles = {
          clockwise: { initial: 0, animate: 45, exit: 0 },
          counterclockwise: { initial: 0, animate: -45, exit: 0 },
          full: { initial: 0, animate: 360, exit: 0 },
          halfTurn: { initial: 0, animate: 180, exit: 0 },
        };
        const angles = rotationAngles[rotationDirection];
        return {
          initial: { opacity: 1, rotate: angles.initial },
          animate: {
            opacity: 0,
            rotate: angles.animate,
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 1, rotate: angles.exit },
        };
      }

      default: {
        return {
          initial: {},
          animate: {},
          exit: {},
        };
      }
    }
  }, [
    variant,
    direction,
    scaleDirection,
    rotationDirection,
    delay,
    durationValue,
    config,
    disabled,
    custom,
  ]);

  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

export const useStaggerAnimation = (
  staggerDelay: number = 0.1,
  props?: UseAnimationProps
): AnimationProps => {
  const config = useAnimation();

  if (config.reducedMotion) {
    return {};
  }

  // Remove the conditional hook call as it violates React hooks rules
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    transition: {
      staggerChildren: staggerDelay,
    },
  };
};

export interface HoverAnimationConfig {
  scale?: number;
  rotate?: number;
  brightness?: number;
  blur?: number;
  shadow?: string;
  color?: string;
  backgroundColor?: string;
  translateY?: number;
  translateX?: number;
  borderColor?: string;
}

export const useHoverAnimation = (config: HoverAnimationConfig | number = {}) => {
  const animationConfig = useAnimation();

  if (animationConfig.reducedMotion) {
    return {};
  }

  // Support legacy API
  const hoverConfig = typeof config === "number" ? { scale: config } : config;

  const {
    scale = 1.05,
    rotate = 0,
    brightness,
    blur,
    shadow,
    color,
    backgroundColor,
    translateY = 0,
    translateX = 0,
    borderColor,
  } = hoverConfig;

  const whileHover: TargetAndTransition = {
    scale,
    rotate,
    y: translateY,
    x: translateX,
  };

  const whileTap: TargetAndTransition = {
    scale: scale * 0.95,
    rotate: rotate === 0 ? 0 : rotate * -0.5,
    y: translateY === 0 ? 0 : translateY * 0.5,
    x: translateX === 0 ? 0 : translateX * 0.5,
  };

  // Add filter effects if specified
  const filters: string[] = [];
  if (brightness !== undefined) {
    filters.push(`brightness(${brightness})`);
  }
  if (blur !== undefined) {
    filters.push(`blur(${blur}px)`);
  }
  if (filters.length > 0) {
    whileHover.filter = filters.join(" ");
    whileTap.filter = filters
      .map((f) => {
        // Simple regex for extracting value from filter function
        const startIndex = f.indexOf("(");
        const endIndex = f.indexOf(")");
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          const value = Number.parseFloat(f.slice(startIndex + 1, endIndex));
          return f.slice(0, startIndex + 1) + value * 0.8 + f.slice(endIndex);
        }
        return f;
      })
      .join(" ");
  }

  // Add color effects
  if (shadow) whileHover.boxShadow = shadow;
  if (color) whileHover.color = color;
  if (backgroundColor) whileHover.backgroundColor = backgroundColor;
  if (borderColor) whileHover.borderColor = borderColor;

  return {
    whileHover,
    whileTap,
    transition: {
      duration: animationConfig.duration.fast,
      ...animationConfig.transition,
    },
  };
};

// Preset hover effects
export const hoverPresets = {
  lift: {
    translateY: -6,
    shadow: "0 16px 32px rgba(0,0,0,0.15)",
  },
  glow: {
    brightness: 1.1,
    shadow: "0 0 30px rgba(124, 58, 237, 0.4)",
  },
  subtle: {
    scale: 1.02,
    brightness: 1.05,
  },
  bounce: {
    scale: 1.1,
    rotate: 5,
    translateY: -4,
  },
  press: {
    scale: 0.95,
    brightness: 0.9,
  },
  shine: {
    brightness: 1.2,
    shadow: "0 0 20px rgba(255,255,255,0.5)",
  },
  depth: {
    translateY: -8,
    shadow: "0 20px 40px rgba(0,0,0,0.2)",
    brightness: 1.05,
  },
  float: {
    translateY: -10,
    scale: 1.05,
    shadow: "0 20px 35px rgba(0,0,0,0.1)",
  },
} as const;

export type HoverPreset = keyof typeof hoverPresets;

export const useHoverPreset = (preset: HoverPreset) => {
  return useHoverAnimation(hoverPresets[preset]);
};

export interface FocusAnimationConfig {
  scale?: number;
  boxShadow?: string;
  outline?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export const useFocusAnimation = (config: FocusAnimationConfig = {}) => {
  const animationConfig = useAnimation();

  if (animationConfig.reducedMotion) {
    return {};
  }

  const {
    scale = 1.02,
    boxShadow = "0 0 0 3px var(--ring)",
    outline,
    borderColor,
    backgroundColor,
  } = config;

  const whileFocus: TargetAndTransition = {
    scale,
    boxShadow,
  };

  if (outline) whileFocus.outline = outline;
  if (borderColor) whileFocus.borderColor = borderColor;
  if (backgroundColor) whileFocus.backgroundColor = backgroundColor;

  return {
    whileFocus,
    transition: {
      duration: animationConfig.duration.fast,
      ...animationConfig.transition,
    },
  };
};

export interface ClickAnimationConfig {
  scale?: number;
  rotate?: number;
  opacity?: number;
  brightness?: number;
  shadow?: string;
  backgroundColor?: string;
  translateY?: number;
  translateX?: number;
  borderColor?: string;
  outline?: string;
}

export const useClickAnimation = (config: ClickAnimationConfig | number = {}) => {
  const animationConfig = useAnimation();

  if (animationConfig.reducedMotion) {
    return {};
  }

  // Support legacy API
  const clickConfig = typeof config === "number" ? { scale: config } : config;

  const {
    scale = 0.95,
    rotate = 0,
    opacity = 1,
    brightness = 0.9,
    shadow,
    backgroundColor,
    translateY = 1,
    translateX = 0,
    borderColor,
    outline,
  } = clickConfig;

  const whileTap: TargetAndTransition = {
    scale,
    rotate,
    opacity,
    y: translateY,
    x: translateX,
  };

  // Add filter effects if specified
  const filters: string[] = [];
  if (brightness) {
    filters.push(`brightness(${brightness})`);
  }
  if (filters.length > 0) {
    whileTap.filter = filters.join(" ");
  }

  // Add other style effects
  if (shadow) whileTap.boxShadow = shadow;
  if (backgroundColor) whileTap.backgroundColor = backgroundColor;
  if (borderColor) whileTap.borderColor = borderColor;
  if (outline) whileTap.outline = outline;

  return {
    whileTap,
    transition: {
      duration: animationConfig.duration.fast,
      ...animationConfig.transition,
    },
  };
};

// Preset click effects
export const clickPresets = {
  bounce: {
    scale: 0.9,
    translateY: 3,
  },
  press: {
    scale: 0.95,
    brightness: 0.85,
    shadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
  },
  ripple: {
    scale: 0.98,
    opacity: 0.8,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  jelly: {
    scale: 0.9,
    rotate: -3,
  },
  shrink: {
    scale: 0.85,
    brightness: 0.95,
  },
  pop: {
    scale: 1.05,
    brightness: 1.1,
    shadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  pulse: {
    scale: 0.92,
    opacity: 0.85,
    shadow: "0 0 10px rgba(124, 58, 237, 0.3)",
  },
  squeeze: {
    scale: 0.88,
    translateY: 2,
    brightness: 0.88,
  },
} as const;

export type ClickPreset = keyof typeof clickPresets;

export const useClickPreset = (preset: ClickPreset) => {
  return useClickAnimation(clickPresets[preset]);
};

// Preset focus effects
export const focusPresets = {
  ring: {
    scale: 1.02,
    boxShadow: "0 0 0 2px var(--primary)",
    outline: "none",
  },
  glow: {
    scale: 1.01,
    boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.3)",
    outline: "none",
  },
  highlight: {
    scale: 1.02,
    borderColor: "var(--primary)",
    backgroundColor: "var(--primary-50)",
  },
  lift: {
    scale: 1.05,
    boxShadow: "0 0 0 3px var(--ring), 0 10px 20px rgba(0,0,0,0.15)",
  },
  underline: {
    outline: "none",
    boxShadow: "inset 0 -3px 0 0 var(--primary)",
  },
  border: {
    outline: "none",
    borderColor: "var(--primary)",
    boxShadow: "0 0 0 2px var(--primary)",
  },
  subtle: {
    scale: 1.01,
    outline: "none",
    boxShadow: "0 0 0 1px var(--primary-200)",
  },
  intense: {
    scale: 1.03,
    boxShadow: "0 0 0 3px var(--primary), 0 0 20px rgba(124, 58, 237, 0.4)",
    outline: "none",
  },
} as const;

export type FocusPreset = keyof typeof focusPresets;

export const useFocusPreset = (preset: FocusPreset) => {
  return useFocusAnimation(focusPresets[preset]);
};
