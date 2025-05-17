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
export type { ScrollAnimationOptions, ScrollPreset } from "./scroll-hooks";

// New stagger animation exports
export { Stagger, StaggerItem, StaggerList, StaggerContainer, staggerPresets } from "./stagger";
export type {
  StaggerComponentProps,
  StaggerItemProps,
  StaggerListProps,
  StaggerContainerProps,
  StaggerConfig,
  StaggerPreset,
} from "./stagger";

export {
  createStaggerContainer,
  createStaggerSequence,
  createDirectionalStagger,
  createScaleStagger,
  createRotateStagger,
  createPathStagger,
  createFilterStagger,
  createComplexStagger,
} from "./stagger-utils";
export type { StaggerOptions } from "./stagger-utils";

// State transitions
export {
  StateTransition,
  InteractiveStateTransition,
  TransitionSequence,
} from "./state-transition";
export type {
  StateTransitionProps,
  InteractiveStateTransitionProps,
  TransitionSequenceProps,
} from "./state-transition";

export {
  useStateTransition,
  useComponentState,
  createStateTransition,
  useStatePreset,
  statePresets,
  createTransitionSequence,
} from "./state-transitions";
export type {
  ComponentState,
  StateConfig,
  StateTransitionConfig,
  StatePreset,
} from "./state-transitions";

// Transition patterns
export {
  createFlowPattern,
  createElasticPattern,
  createStaggeredPattern,
  createLoopPattern,
  createOrchestratedPattern,
  createProgressivePattern,
  createMicroPattern,
  createDramaticPattern,
  createStagedPattern,
} from "./transition-patterns";

// Transition timing
export {
  createTween,
  createSpring,
  createInertia,
  createStaggerTransition,
  createTransitionFromConfig,
  createStateTransition as createTimedStateTransition,
  createPropertyTransitions,
  easingPresets,
  durationPresets,
  springPresets,
  inertiaPresets,
} from "./transition-timing";
export type {
  TransitionType,
  DurationPreset,
  SpringConfig,
  SpringPreset,
  InertiaConfig,
  InertiaPreset,
} from "./transition-timing";

// Animation sequence
export {
  AnimationSequence,
  createAnimationSequence,
  createComplexSequence,
  useAnimationSequence,
} from "./animation-sequence";
export type {
  AnimationStep,
  AnimationSequenceConfig,
  AnimationSequenceProps,
  AnimationSequenceControls,
} from "./animation-sequence";

export { motion, AnimatePresence } from "framer-motion";
export type { MotionProps, AnimationProps, Variants, Transition } from "framer-motion";
