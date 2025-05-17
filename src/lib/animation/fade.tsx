import React, { ReactNode } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { useAnimationVariants } from "./animation-hooks";

export interface FadeProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  duration?: "fast" | "normal" | "slow" | number;
  delay?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeProps> = ({
  children,
  duration = "normal",
  delay = 0,
  disabled = false,
  className,
  style,
  ...props
}) => {
  const animationProps = useAnimationVariants({
    variant: "fadeIn",
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

export const FadeOut: React.FC<FadeProps> = ({
  children,
  duration = "normal",
  delay = 0,
  disabled = false,
  className,
  style,
  ...props
}) => {
  const animationProps = useAnimationVariants({
    variant: "fadeIn",
    duration,
    delay,
    disabled,
  });

  // Reverse the animation for fade out
  const transition =
    animationProps.variants?.animate &&
    typeof animationProps.variants.animate === "object" &&
    "transition" in animationProps.variants.animate
      ? animationProps.variants.animate.transition
      : undefined;

  const fadeOutProps = {
    ...animationProps,
    variants: {
      initial: { opacity: 1 },
      animate: {
        opacity: 0,
        transition,
      },
      exit: { opacity: 1 },
    },
  };

  return (
    <motion.div className={className} style={style} {...fadeOutProps} {...props}>
      {children}
    </motion.div>
  );
};

interface FadeTransitionProps extends FadeProps {
  isVisible: boolean;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  isVisible,
  duration = "normal",
  delay = 0,
  disabled = false,
  className,
  style,
  ...props
}) => {
  const animationProps = useAnimationVariants({
    variant: "fadeIn",
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
          key="fade-transition"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
