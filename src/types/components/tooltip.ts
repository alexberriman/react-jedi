/**
 * Tooltip Component Type Definitions
 *
 * This file defines the TypeScript types for the Tooltip component
 * that displays helpful information on hover or focus.
 */

import type { BaseComponentSpec, ComponentChildren } from "@/types/schema/base";

/**
 * The main Tooltip component specification.
 */
export interface TooltipSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "Tooltip" for this component.
   */
  type: "Tooltip";

  /**
   * Delay in milliseconds before tooltip appears.
   * @default 0
   */
  delayDuration?: number;

  /**
   * Duration from when the mouse enters a trigger until the tooltip opens (when reopening).
   * @default 300
   */
  skipDelayDuration?: number;

  /**
   * Whether hovering the content keeps the tooltip open.
   * @default false
   */
  disableHoverableContent?: boolean;

  /**
   * The open state of the tooltip when it is initially rendered.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Custom CSS class name for the tooltip.
   */
  className?: string;

  /**
   * Child components (TooltipTrigger and TooltipContent).
   */
  children?: ComponentChildren;
}

/**
 * The TooltipTrigger component that activates the tooltip.
 */
export interface TooltipTriggerSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "TooltipTrigger" for this component.
   */
  type: "TooltipTrigger";

  /**
   * Whether to render as child element (passes props to child).
   * @default true
   */
  asChild?: boolean;

  /**
   * Custom CSS class name for the trigger.
   */
  className?: string;

  /**
   * The trigger element (button, icon, etc.).
   */
  children?: ComponentChildren;
}

/**
 * The TooltipContent component that contains the tooltip text.
 */
export interface TooltipContentSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "TooltipContent" for this component.
   */
  type: "TooltipContent";

  /**
   * The preferred side of the trigger to render against.
   * @default "top"
   */
  side?: "top" | "right" | "bottom" | "left";

  /**
   * The distance in pixels from the trigger.
   * @default 0
   */
  sideOffset?: number;

  /**
   * The preferred alignment against the trigger.
   * @default "center"
   */
  align?: "start" | "center" | "end";

  /**
   * An offset in pixels from the start or end alignment options.
   * @default 0
   */
  alignOffset?: number;

  /**
   * Whether to avoid viewport collisions.
   * @default true
   */
  avoidCollisions?: boolean;

  /**
   * Custom boundary element(s) for collision detection.
   */
  collisionBoundary?: Element | null | (Element | null)[];

  /**
   * Distance from collision boundaries.
   * @default 0
   */
  collisionPadding?: number | Partial<Record<"top" | "right" | "bottom" | "left", number>>;

  /**
   * Distance from arrow to edges.
   * @default 0
   */
  arrowPadding?: number;

  /**
   * Sticky behavior on scroll.
   * @default "partial"
   */
  sticky?: "partial" | "always";

  /**
   * Hide tooltip when trigger is fully occluded.
   * @default false
   */
  hideWhenDetached?: boolean;

  /**
   * Custom CSS class name for the tooltip content.
   */
  className?: string;

  /**
   * The content of the tooltip.
   */
  children?: ComponentChildren;
}

/**
 * The TooltipProvider component that provides tooltip context.
 */
export interface TooltipProviderSpec extends BaseComponentSpec {
  /**
   * The type of the component.
   * Must be "TooltipProvider" for this component.
   */
  type: "TooltipProvider";

  /**
   * Delay in milliseconds before tooltip appears.
   * @default 0
   */
  delayDuration?: number;

  /**
   * Duration from when the mouse enters a trigger until the tooltip opens (when reopening).
   * @default 300
   */
  skipDelayDuration?: number;

  /**
   * Whether hovering the content keeps the tooltip open.
   * @default false
   */
  disableHoverableContent?: boolean;

  /**
   * Child components to be wrapped with TooltipProvider.
   */
  children?: ComponentChildren;
}

/**
 * Type alias for all Tooltip-related component specifications.
 */
export type TooltipComponent =
  | TooltipSpec
  | TooltipTriggerSpec
  | TooltipContentSpec
  | TooltipProviderSpec;
