import type { BaseComponentSpec } from "@/types/schema/base";

// Omit direction from BaseComponentSpec to avoid conflict
export interface DrawerType extends Omit<BaseComponentSpec, "direction"> {
  type: "drawer" | "Drawer";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  direction?: "top" | "right" | "bottom" | "left";
  dismissible?: boolean;
}

export interface DrawerTriggerType extends BaseComponentSpec {
  type: "DrawerTrigger";
  asChild?: boolean;
}

export interface DrawerPortalType extends BaseComponentSpec {
  type: "DrawerPortal";
}

// Omit direction from BaseComponentSpec to avoid conflict
export interface DrawerContentType extends Omit<BaseComponentSpec, "direction"> {
  type: "DrawerContent";
  showHandle?: boolean;
  direction?: "top" | "right" | "bottom" | "left";
}

export interface DrawerOverlayType extends BaseComponentSpec {
  type: "DrawerOverlay";
}

export interface DrawerHeaderType extends BaseComponentSpec {
  type: "DrawerHeader";
  sticky?: boolean;
}

export interface DrawerFooterType extends BaseComponentSpec {
  type: "DrawerFooter";
  sticky?: boolean;
}

export interface DrawerTitleType extends BaseComponentSpec {
  type: "DrawerTitle";
}

export interface DrawerDescriptionType extends BaseComponentSpec {
  type: "DrawerDescription";
}

export interface DrawerCloseType extends BaseComponentSpec {
  type: "DrawerClose";
  asChild?: boolean;
}

export interface DrawerSectionType extends BaseComponentSpec {
  type: "DrawerSection";
  sticky?: boolean;
}

export interface DrawerHandleType extends BaseComponentSpec {
  type: "DrawerHandle";
  orientation?: "horizontal" | "vertical";
}
