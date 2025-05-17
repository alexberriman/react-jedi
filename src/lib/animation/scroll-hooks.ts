import { useEffect, useState, useRef } from "react";
import { useMotionValue, useTransform } from "framer-motion";
import { useAnimation } from "./animation-provider";

export interface ScrollAnimationOptions {
  triggerOnce?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
  offset?: { start?: number; end?: number };
  disabled?: boolean;
}

// Hook to track element's visibility on scroll
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { triggerOnce = false, rootMargin = "0px", threshold = 0.1, disabled = false } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const config = useAnimation();

  useEffect(() => {
    if (disabled || config.reducedMotion || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;

        if (inView) {
          if (!hasTriggered || !triggerOnce) {
            setIsInView(true);
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [disabled, config.reducedMotion, rootMargin, threshold, triggerOnce, hasTriggered]);

  return { ref, isInView, hasTriggered };
};

// Hook to track scroll progress of an element
export const useScrollProgress = (options: { offset?: { start?: number; end?: number } } = {}) => {
  const { offset = { start: 0, end: 0 } } = options;
  const scrollYProgress = useMotionValue(0);
  const ref = useRef<HTMLElement>(null);
  const config = useAnimation();

  useEffect(() => {
    if (config.reducedMotion || !ref.current) return;

    const element = ref.current;
    const updateProgress = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = globalThis.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate progress based on element position in viewport
      const start = -elementHeight + (offset.start || 0);
      const end = windowHeight + (offset.end || 0);
      const progress = 1 - (elementTop - end) / (start - end);

      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, progress));
      scrollYProgress.set(clampedProgress);
    };

    updateProgress();
    globalThis.addEventListener("scroll", updateProgress, { passive: true });
    globalThis.addEventListener("resize", updateProgress);

    return () => {
      globalThis.removeEventListener("scroll", updateProgress);
      globalThis.removeEventListener("resize", updateProgress);
    };
  }, [config.reducedMotion, offset.start, offset.end, scrollYProgress]);

  return { ref, scrollYProgress };
};

// Hook for parallax effects
export const useParallax = (
  speed: number = 0.5,
  options: { offset?: { start?: number; end?: number } } = {}
) => {
  const { scrollYProgress, ref } = useScrollProgress(options);
  const config = useAnimation();

  // Transform scroll progress to parallax offset
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    config.reducedMotion ? ["0%", "0%"] : [`${speed * 100}%`, `${-speed * 100}%`]
  );

  const xOffset = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return { ref, yOffset, xOffset, scrollYProgress };
};

// Hook for progressive reveal animations
export const useScrollReveal = (
  options: ScrollAnimationOptions & {
    delay?: number;
    stagger?: number;
    children?: number;
  } = {}
) => {
  const { delay = 0, stagger = 0.1, children = 1, ...scrollOptions } = options;
  const { ref, isInView, hasTriggered } = useScrollAnimation(scrollOptions);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const config = useAnimation();

  useEffect(() => {
    if (isInView && !config.reducedMotion) {
      // Reveal items with stagger
      const timeouts: number[] = [];

      for (let i = 0; i < children; i++) {
        const timeout = globalThis.setTimeout(
          () => {
            setVisibleItems((prev) => [...prev, i]);
          },
          delay + i * stagger * 1000
        );

        timeouts.push(timeout as unknown as number);
      }

      return () => {
        for (const timeout of timeouts) {
          globalThis.clearTimeout(timeout);
        }
      };
    } else if (!isInView && !scrollOptions.triggerOnce) {
      setVisibleItems([]);
    }
  }, [isInView, delay, stagger, children, config.reducedMotion, scrollOptions.triggerOnce]);

  return { ref, isInView, hasTriggered, visibleItems };
};

// Scroll-triggered animation presets
export const scrollPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
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
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: { duration: 0.7, ease: "easeOut" },
  },
} as const;

export type ScrollPreset = keyof typeof scrollPresets;

export const useScrollPreset = (preset: ScrollPreset) => {
  return scrollPresets[preset];
};
