export { AnimationProvider, useAnimation } from "./animation-provider";
export type { AnimationConfig, AnimationProviderProps } from "./animation-provider";

export {
  useAnimationVariants,
  useStaggerAnimation,
  useHoverAnimation,
  useFocusAnimation,
  useClickAnimation,
  useClickPreset,
  clickPresets,
} from "./animation-hooks";
export type {
  AnimationVariant,
  AnimationDirection,
  UseAnimationProps,
  ClickAnimationConfig,
  ClickPreset,
} from "./animation-hooks";

export { FadeIn, FadeOut, FadeTransition } from "./fade";
export type { FadeProps } from "./fade";

export { SlideIn, SlideOut, SlideTransition } from "./slide";
export type { SlideProps } from "./slide";

export { Click, ClickButton, ClickCard, ClickIcon } from "./click";
export type { ClickProps, ClickButtonProps, ClickCardProps, ClickIconProps } from "./click";

export { motion, AnimatePresence } from "framer-motion";
export type { MotionProps, AnimationProps, Variants } from "framer-motion";
