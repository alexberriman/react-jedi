import { useMemo } from "react";
import { AnimationProps, HTMLMotionProps, Variants } from "framer-motion";
import { useAnimation } from "./animation-provider";

export type AnimationVariant = "fadeIn" | "slideIn" | "scaleIn" | "rotateIn" | "custom";
export type AnimationDirection = "up" | "down" | "left" | "right";

export interface UseAnimationProps {
  variant?: AnimationVariant;
  direction?: AnimationDirection;
  delay?: number;
  duration?: "fast" | "normal" | "slow" | number;
  custom?: Variants;
  disabled?: boolean;
}

export const useAnimationVariants = ({
  variant = "fadeIn",
  direction = "up",
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

      case "scaleIn": {
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 0, scale: 0.8 },
        };
      }

      case "rotateIn": {
        return {
          initial: { opacity: 0, rotate: -10 },
          animate: {
            opacity: 1,
            rotate: 0,
            transition: { duration: durationValue, delay, ...config.transition },
          },
          exit: { opacity: 0, rotate: 10 },
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
  }, [variant, direction, delay, durationValue, config, disabled, custom]);

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

export const useHoverAnimation = (scale: number = 1.05) => {
  const config = useAnimation();

  if (config.reducedMotion) {
    return {};
  }

  return {
    whileHover: { scale },
    whileTap: { scale: scale * 0.95 },
    transition: { duration: config.duration.fast, ...config.transition },
  };
};

export const useFocusAnimation = () => {
  const config = useAnimation();

  if (config.reducedMotion) {
    return {};
  }

  return {
    whileFocus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px var(--ring)",
    },
    transition: { duration: config.duration.fast, ...config.transition },
  };
};
