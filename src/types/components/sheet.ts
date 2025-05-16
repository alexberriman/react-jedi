import type { BaseComponentSpec } from "../schema/base";
import { ComponentChildren } from "../schema";

export interface SheetSpecification extends BaseComponentSpec {
  type: "Sheet";
  open?: boolean;
  onOpenChange?: string;
  modal?: boolean;
  defaultOpen?: boolean;
  children?: ComponentChildren;
  [key: string]: unknown;
}

export interface SheetTriggerSpecification extends BaseComponentSpec {
  type: "SheetTrigger";
  asChild?: boolean;
  children?: ComponentChildren;
  className?: string;
  [key: string]: unknown;
}

export interface SheetContentSpecification extends BaseComponentSpec {
  type: "SheetContent";
  side?: "top" | "right" | "bottom" | "left";
  children?: ComponentChildren;
  className?: string;
  onEscapeKeyDown?: string;
  onPointerDownOutside?: string;
  onInteractOutside?: string;
  [key: string]: unknown;
}

export interface SheetHeaderSpecification extends BaseComponentSpec {
  type: "SheetHeader";
  children?: ComponentChildren;
  className?: string;
  [key: string]: unknown;
}

export interface SheetFooterSpecification extends BaseComponentSpec {
  type: "SheetFooter";
  children?: ComponentChildren;
  className?: string;
  [key: string]: unknown;
}

export interface SheetTitleSpecification extends BaseComponentSpec {
  type: "SheetTitle";
  children?: ComponentChildren;
  className?: string;
  [key: string]: unknown;
}

export interface SheetDescriptionSpecification extends BaseComponentSpec {
  type: "SheetDescription";
  children?: ComponentChildren;
  className?: string;
  [key: string]: unknown;
}

export interface SheetCloseSpecification extends BaseComponentSpec {
  type: "SheetClose";
  asChild?: boolean;
  children?: ComponentChildren;
  className?: string;
  [key: string]: unknown;
}
