import type { BaseComponentSpec, ComponentChildren } from "../schema/base";

export interface PopoverSpec extends BaseComponentSpec {
  type: "Popover";
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  onOpenChange?: string;
  children?: ComponentChildren;
}

export interface PopoverTriggerSpec extends BaseComponentSpec {
  type: "PopoverTrigger";
  asChild?: boolean;
  children?: ComponentChildren;
}

export interface PopoverContentSpec extends BaseComponentSpec {
  type: "PopoverContent";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: unknown[];
  collisionPadding?: number | Record<string, number>;
  arrowPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  updatePositionStrategy?: "optimized" | "always";
  forceMount?: boolean;
  children?: ComponentChildren;
}

export interface PopoverAnchorSpec extends BaseComponentSpec {
  type: "PopoverAnchor";
  asChild?: boolean;
  children?: ComponentChildren;
}
