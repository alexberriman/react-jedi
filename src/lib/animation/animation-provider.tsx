import React, { createContext, useContext, ReactNode } from "react";
import { MotionConfig } from "framer-motion";

export interface AnimationConfig {
  reducedMotion: boolean;
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
  transition: {
    type: "spring" | "tween" | "inertia";
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const defaultConfig: AnimationConfig = {
  reducedMotion: false,
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
};

const AnimationContext = createContext<AnimationConfig | undefined>(undefined);

export interface AnimationProviderProps {
  children?: ReactNode;
  config?: Partial<AnimationConfig>;
  reducedMotion?: boolean;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
  config,
  reducedMotion,
}) => {
  // Detect system preference for reduced motion
  const systemPrefersReducedMotion = globalThis.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const animationConfig: AnimationConfig = {
    ...defaultConfig,
    ...config,
    reducedMotion: reducedMotion ?? systemPrefersReducedMotion,
  };

  return (
    <AnimationContext.Provider value={animationConfig}>
      <MotionConfig
        reducedMotion={animationConfig.reducedMotion ? "always" : "never"}
        transition={animationConfig.transition}
      >
        {children}
      </MotionConfig>
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
