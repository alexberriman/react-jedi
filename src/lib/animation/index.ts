export { AnimationProvider, useAnimation } from "./animation-provider";
export type { AnimationConfig, AnimationProviderProps } from "./animation-provider";

export {
  useAnimationVariants,
  useStaggerAnimation,
  useHoverAnimation,
  useFocusAnimation,
  useClickAnimation,
  useClickPreset,
  useFocusPreset,
  useDragAnimation,
  useDragPreset,
  clickPresets,
  focusPresets,
  dragPresets,
} from "./animation-hooks";
export type {
  AnimationVariant,
  AnimationDirection,
  UseAnimationProps,
  FocusAnimationConfig,
  FocusPreset,
  ClickAnimationConfig,
  ClickPreset,
  DragAnimationConfig,
  DragPreset,
} from "./animation-hooks";

export { FadeIn, FadeOut, FadeTransition } from "./fade";
export type { FadeProps } from "./fade";

export { SlideIn, SlideOut, SlideTransition } from "./slide";
export type { SlideProps } from "./slide";

export { Click, ClickButton, ClickCard, ClickIcon } from "./click";
export type { ClickProps, ClickButtonProps, ClickCardProps, ClickIconProps } from "./click";

export { Focus, FocusButton, FocusInput, FocusTextarea, FocusCard, FocusLink } from "./focus";
export type {
  FocusProps,
  FocusButtonProps,
  FocusInputProps,
  FocusTextareaProps,
  FocusCardProps,
  FocusLinkProps,
} from "./focus";

export { Drag, DragCard, DragHandle, DragListItem } from "./drag";
export type { DragProps, DragCardProps, DragHandleProps, DragListItemProps } from "./drag";

export {
  ScrollReveal,
  ScrollParallax,
  ScrollProgress,
  ScrollContainer,
  ScrollScale,
  ScrollTextReveal,
} from "./scroll";
export type {
  ScrollRevealProps,
  ScrollParallaxProps,
  ScrollProgressProps,
  ScrollContainerProps,
  ScrollScaleProps,
  ScrollTextRevealProps,
} from "./scroll";

export {
  useScrollAnimation,
  useScrollProgress,
  useParallax,
  useScrollReveal,
  useScrollPreset,
  scrollPresets,
} from "./scroll-hooks";
export type {
  ScrollAnimationOptions,
  ScrollPreset,
} from "./scroll-hooks";

export { motion, AnimatePresence } from "framer-motion";
export type { MotionProps, AnimationProps, Variants } from "framer-motion";
