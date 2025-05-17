export { AnimationProvider, useAnimation } from "./animation-provider";
export type { AnimationConfig, AnimationProviderProps } from "./animation-provider";

export {
  useAnimationVariants,
  useStaggerAnimation,
  useHoverAnimation,
  useFocusAnimation,
} from "./animation-hooks";
export type { AnimationVariant, AnimationDirection, UseAnimationProps } from "./animation-hooks";

export { FadeIn, FadeOut, FadeTransition } from "./fade";
export type { FadeProps } from "./fade";

export { SlideIn, SlideOut, SlideTransition } from "./slide";
export type { SlideProps } from "./slide";

export { motion, AnimatePresence } from "framer-motion";
export type { MotionProps, AnimationProps, Variants } from "framer-motion";
