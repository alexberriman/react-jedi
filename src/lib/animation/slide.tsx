import React, { ReactNode } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { useAnimationVariants, AnimationDirection } from "./animation-hooks";

export interface SlideProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  direction?: AnimationDirection;
  duration?: "fast" | "normal" | "slow" | number;
  delay?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SlideIn: React.FC<SlideProps> = ({
  children,
  direction = "up",
  duration = "normal",
  delay = 0,
  disabled = false,
  className,
  style,
  ...props
}) => {
  const animationProps = useAnimationVariants({
    variant: "slideIn",
    direction,
    duration,
    delay,
    disabled,
  });

  return (
    <motion.div className={className} style={style} {...animationProps} {...props}>
      {children}
    </motion.div>
  );
};

export const SlideOut: React.FC<SlideProps> = ({
  children,
  direction = "up",
  duration = "normal",
  delay = 0,
  disabled = false,
  className,
  style,
  ...props
}) => {
  const animationProps = useAnimationVariants({
    variant: "slideIn",
    direction,
    duration,
    delay,
    disabled,
  });

  // Reverse the animation for slide out
  const slideOffsets = {
    up: { y: -20 },
    down: { y: 20 },
    left: { x: -20 },
    right: { x: 20 },
  };

  const transition =
    animationProps.variants?.animate &&
    typeof animationProps.variants.animate === "object" &&
    "transition" in animationProps.variants.animate
      ? animationProps.variants.animate.transition
      : undefined;

  const slideOutProps = {
    ...animationProps,
    variants: {
      initial: { opacity: 1, x: 0, y: 0 },
      animate: {
        opacity: 0,
        ...slideOffsets[direction],
        transition,
      },
      exit: { opacity: 1, x: 0, y: 0 },
    },
  };

  return (
    <motion.div className={className} style={style} {...slideOutProps} {...props}>
      {children}
    </motion.div>
  );
};

interface SlideTransitionProps extends SlideProps {
  isVisible: boolean;
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  isVisible,
  direction = "up",
  duration = "normal",
  delay = 0,
  disabled = false,
  className,
  style,
  ...props
}) => {
  const animationProps = useAnimationVariants({
    variant: "slideIn",
    direction,
    duration,
    delay,
    disabled,
  });

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={className}
          style={style}
          {...animationProps}
          {...props}
          key="slide-transition"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
