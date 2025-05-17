import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useAnimation } from "./animation-provider";
import { scrollPresets, ScrollPreset } from "./scroll-hooks";

// Types for staggered animation configurations
export interface StaggerConfig {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

export interface StaggerComponentProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayStart?: number;
  animation?: ScrollPreset | StaggerConfig;
  className?: string;
  style?: React.CSSProperties;
  direction?: "up" | "down" | "forwards" | "backwards";
  as?: React.ElementType;
  childClassName?: string;
  childStyle?: React.CSSProperties;
  childAs?: React.ElementType;
  autoStart?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  orchestration?: "sequence" | "stagger" | "cascade";
  staggerVariants?: Variants;
}

// Main Stagger component for list animations
export const Stagger: React.FC<StaggerComponentProps> = ({
  children,
  staggerDelay = 0.1,
  delayStart = 0,
  animation = "slideUp",
  className,
  style,
  direction = "forwards",
  as = "div",
  childClassName,
  childStyle,
  childAs = "div",
  autoStart = true,
  onAnimationComplete,
  onAnimationStart,
  orchestration = "stagger",
  staggerVariants,
}) => {
  const config = useAnimation();
  const [isAnimating] = useState(autoStart);
  const MotionComponent = motion[as as keyof typeof motion] || motion.div;
  const ChildMotionComponent = motion[childAs as keyof typeof motion] || motion.div;

  // Get animation config
  const animationConfig = typeof animation === "string" ? scrollPresets[animation] : animation;

  // Get child count to properly calculate stagger delays
  const childCount = React.Children.count(children);

  useEffect(() => {
    if (autoStart && onAnimationStart) {
      onAnimationStart();
    }
  }, [autoStart, onAnimationStart]);

  // Build stagger variants object
  const variants: Variants = staggerVariants || {
    hidden: {
      ...animationConfig.initial,
    },
    visible: (i) => {
      let delay = delayStart;

      // Calculate item-specific delay based on orchestration
      if (orchestration === "sequence") {
        // Each item waits for the previous to complete
        delay += i * staggerDelay * 2; // Double the delay for sequence
      } else if (orchestration === "cascade") {
        // Exponential stagger
        delay += Math.pow(i * 0.5, 1.2) * staggerDelay;
      } else {
        // Regular stagger
        delay += i * staggerDelay;
      }

      return {
        ...animationConfig.animate,
        transition: {
          ...animationConfig.transition,
          delay,
        },
      };
    },
    exit: {
      ...(animationConfig.exit || animationConfig.initial),
    },
  };

  // Animation state is managed internally

  // Handle animation completion
  const handleAnimationComplete = () => {
    if (onAnimationComplete) onAnimationComplete();
  };

  // Map children to apply custom indexes based on direction
  const mappedChildren = React.Children.map(children, (child, index) => {
    // Determine item index based on direction
    const itemIndex =
      direction === "backwards" || direction === "up" ? childCount - 1 - index : index;

    return (
      <ChildMotionComponent
        custom={itemIndex}
        variants={variants}
        initial="hidden"
        animate={isAnimating ? "visible" : "hidden"}
        exit="exit"
        className={childClassName}
        style={childStyle}
      >
        {child}
      </ChildMotionComponent>
    );
  });

  // If reduced motion is enabled, skip the animation
  if (config.reducedMotion) {
    return (
      <div className={className} style={style}>
        {React.Children.map(children, (child) => (
          <div className={childClassName} style={childStyle}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <MotionComponent
      className={className}
      style={style}
      onAnimationComplete={handleAnimationComplete}
    >
      <AnimatePresence>{mappedChildren}</AnimatePresence>
    </MotionComponent>
  );
};

// StaggerItem component for use with container-based staggering
export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
  as?: React.ElementType;
  variants?: Variants;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
  style,
  index,
  as = "div",
  variants,
}) => {
  const MotionComponent = motion[as as keyof typeof motion] || motion.div;

  return (
    <MotionComponent custom={index} variants={variants} className={className} style={style}>
      {children}
    </MotionComponent>
  );
};

// StaggerList component for common list patterns
export interface StaggerListProps<T = unknown> extends StaggerComponentProps {
  readonly items: readonly T[];
  readonly renderItem: (item: T, index: number) => React.ReactNode;
  readonly keyExtractor?: (item: T, index: number) => string | number;
  readonly listType?: "ul" | "ol" | "div";
  readonly listProps?: React.HTMLAttributes<HTMLElement>;
  readonly itemProps?: React.HTMLAttributes<HTMLElement>;
}

export function StaggerList<T>({
  items,
  renderItem,
  keyExtractor = (_, index) => index,
  listType = "ul",
  staggerDelay = 0.1,
  delayStart = 0,
  animation = "slideUp",
  direction = "forwards",
  listProps = {},
  itemProps = {},
  className,
  style,
  childClassName,
  childStyle,
  autoStart = true,
  onAnimationComplete,
  onAnimationStart,
  orchestration = "stagger",
  staggerVariants,
}: StaggerListProps<T>): React.ReactElement {
  return (
    <Stagger
      staggerDelay={staggerDelay}
      delayStart={delayStart}
      animation={animation}
      className={className}
      style={style}
      as={listType}
      childClassName={childClassName}
      childStyle={childStyle}
      childAs={listType === "ul" || listType === "ol" ? "li" : "div"}
      direction={direction}
      autoStart={autoStart}
      onAnimationComplete={onAnimationComplete}
      onAnimationStart={onAnimationStart}
      orchestration={orchestration}
      staggerVariants={staggerVariants}
      {...listProps}
    >
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)} {...itemProps}>
          {renderItem(item, index)}
        </div>
      ))}
    </Stagger>
  );
}

// Animation presets specifically designed for staggered lists
export const staggerPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  scaleDown: {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  rotate: {
    initial: { opacity: 0, rotate: -10, scale: 0.9 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  flipX: {
    initial: { opacity: 0, rotateX: 90 },
    animate: { opacity: 1, rotateX: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  flipY: {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  bounce: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  },
  elastic: {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 7,
      },
    },
  },
  expandOut: {
    initial: { opacity: 0, scale: 0, rotate: -20 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 12,
      },
    },
  },
  flash: {
    initial: { opacity: 0, scale: 0.95, filter: "brightness(1.2)" },
    animate: {
      opacity: [0, 1, 0.8, 1],
      scale: [0.95, 1.02, 0.99, 1],
      filter: ["brightness(1.2)", "brightness(1.5)", "brightness(1.2)", "brightness(1)"],
      transition: { duration: 0.7, times: [0, 0.3, 0.5, 1] },
    },
  },
  subtle: {
    initial: { opacity: 0.8, y: 5 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: { duration: 0.6 },
  },
};

export type StaggerPreset = keyof typeof staggerPresets;

// Function to create stagger container variants
export const useStaggerContainerVariants = (staggerDelay = 0.1): Variants => ({
  initial: {
    transition: { staggerChildren: 0 },
  },
  animate: {
    transition: { staggerChildren: staggerDelay, delayChildren: 0.3 },
  },
  exit: {
    transition: { staggerChildren: staggerDelay / 2, staggerDirection: -1 },
  },
});

// Main container to wrap staggered items with coordinated staggering
export interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayStart?: number;
  className?: string;
  style?: React.CSSProperties;
  direction?: "forwards" | "backwards";
  as?: React.ElementType;
  autoPlay?: boolean;
  variants?: Variants;
  onAnimationComplete?: () => void;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  delayStart = 0,
  className,
  style,
  direction = "forwards",
  as = "div",
  autoPlay = true,
  variants,
  onAnimationComplete,
}) => {
  // Get stagger container variants
  const staggerVariantsConfig = variants || {
    initial: {
      transition: { staggerChildren: 0 },
    },
    animate: {
      transition: { staggerChildren: staggerDelay, delayChildren: 0.3 },
    },
    exit: {
      transition: { staggerChildren: staggerDelay / 2, staggerDirection: -1 },
    },
  };
  const MotionComponent = motion[as as keyof typeof motion] || motion.div;

  return (
    <MotionComponent
      initial="initial"
      animate={autoPlay ? "animate" : "initial"}
      exit="exit"
      variants={staggerVariantsConfig}
      className={className}
      style={style}
      onAnimationComplete={onAnimationComplete}
    >
      {React.Children.toArray(children).map((child, index) => {
        // Apply custom index based on direction
        const finalIndex =
          direction === "backwards" ? React.Children.count(children) - 1 - index : index;

        // Only process valid elements with new props
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            index: finalIndex,
            variants: child.props.variants,
          });
        }

        // For non-element children, return null (shouldn't happen in practice)
        return null;
      })}
    </MotionComponent>
  );
};
