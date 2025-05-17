import React from "react";
import { motion, MotionValue } from "framer-motion";
import {
  useScrollAnimation,
  useScrollProgress,
  useParallax,
  useScrollReveal,
  ScrollAnimationOptions,
  ScrollPreset,
  scrollPresets,
} from "./scroll-hooks";

export interface ScrollRevealProps extends ScrollAnimationOptions {
  children: React.ReactNode;
  animation?: ScrollPreset | (typeof scrollPresets)[ScrollPreset];
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = "fadeIn",
  delay = 0,
  className,
  style,
  ...scrollOptions
}) => {
  const { ref, isInView } = useScrollAnimation(scrollOptions);

  const animationConfig = typeof animation === "string" ? scrollPresets[animation] : animation;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={animationConfig.initial}
      animate={isInView ? animationConfig.animate : animationConfig.initial}
      transition={{
        ...animationConfig.transition,
        delay,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number;
  offset?: { start?: number; end?: number };
  className?: string;
  style?: React.CSSProperties;
  direction?: "vertical" | "horizontal";
}

export const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  children,
  speed = 0.5,
  offset,
  className,
  style,
  direction = "vertical",
}) => {
  const { ref, yOffset, xOffset } = useParallax(speed, { offset });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        [direction === "vertical" ? "y" : "x"]: direction === "vertical" ? yOffset : xOffset,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollProgressProps {
  height?: string | number;
  color?: string;
  backgroundColor?: string;
  position?: "top" | "bottom" | "left" | "right";
  thickness?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  height = "100vh",
  color = "#7c3aed",
  backgroundColor = "transparent",
  position = "top",
  thickness = 4,
  className,
  style,
}) => {
  const { ref, scrollYProgress } = useScrollProgress();

  const isHorizontal = position === "top" || position === "bottom";
  const positionStyles = {
    top: { top: 0, left: 0, right: 0 },
    bottom: { bottom: 0, left: 0, right: 0 },
    left: { top: 0, left: 0, bottom: 0 },
    right: { top: 0, right: 0, bottom: 0 },
  };

  return (
    <>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          height,
          ...style,
        }}
        className={className}
      />
      <motion.div
        style={{
          position: "fixed",
          ...positionStyles[position],
          [isHorizontal ? "height" : "width"]: thickness,
          backgroundColor,
          zIndex: 50,
        }}
      >
        <motion.div
          style={{
            [isHorizontal ? "width" : "height"]: "100%",
            [isHorizontal ? "height" : "width"]: "100%",
            backgroundColor: color,
            transformOrigin: isHorizontal ? "left" : "top",
            scaleX: isHorizontal ? scrollYProgress : 1,
            scaleY: isHorizontal ? 1 : scrollYProgress,
          }}
        />
      </motion.div>
    </>
  );
};

export interface ScrollContainerProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  animation?: ScrollPreset;
  className?: string;
  style?: React.CSSProperties;
  triggerOnce?: boolean;
}

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  stagger = 0.1,
  delay = 0,
  animation = "slideUp",
  className,
  style,
  triggerOnce = true,
}) => {
  const childCount = React.Children.count(children);
  const { ref, visibleItems } = useScrollReveal({
    triggerOnce,
    delay,
    stagger,
    children: childCount,
  });

  const animationConfig = scrollPresets[animation];

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={style}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={animationConfig.initial}
          animate={visibleItems.includes(index) ? animationConfig.animate : animationConfig.initial}
          transition={animationConfig.transition}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export interface ScrollScaleProps {
  children: React.ReactNode;
  startScale?: number;
  endScale?: number;
  offset?: { start?: number; end?: number };
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollScale: React.FC<ScrollScaleProps> = ({
  children,
  startScale = 0.8,
  endScale = 1,
  offset,
  className,
  style,
}) => {
  const { ref, scrollYProgress } = useScrollProgress({ offset });
  const scale = scrollYProgress as MotionValue<number>;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        scale: scale,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollTextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  triggerOnce?: boolean;
  stagger?: number;
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  text,
  className,
  style,
  triggerOnce = true,
  stagger = 0.02,
}) => {
  const words = text.split(" ");
  const { ref, visibleItems } = useScrollReveal({
    triggerOnce,
    stagger,
    children: words.length,
  });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={style}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};
