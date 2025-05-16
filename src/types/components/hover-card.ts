import type { BaseComponentSpec } from "../schema/base";
import type { ComponentSpec } from "../schema/components";

export interface HoverCardProps extends BaseComponentSpec {
  type: "hover-card";
  trigger: HoverCardTriggerSpec;
  content: HoverCardContentSpec;
  props?: {
    openDelay?: number;
    closeDelay?: number;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: string;
  };
}

export interface HoverCardTriggerSpec {
  type: "hover-card-trigger";
  asChild?: boolean;
  children: ComponentSpec | ComponentSpec[];
}

export interface HoverCardContentSpec {
  type: "hover-card-content";
  props?: {
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    alignOffset?: number;
    className?: string;
  };
  children: ComponentSpec | ComponentSpec[];
}
