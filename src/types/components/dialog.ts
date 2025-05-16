import type { BaseComponentType } from "./base";

export interface DialogType extends BaseComponentType {
  type: "dialog" | "Dialog";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
}

export interface DialogTriggerType extends BaseComponentType {
  type: "DialogTrigger";
  asChild?: boolean;
}

export interface DialogContentType extends BaseComponentType {
  type: "DialogContent";
  overlay?: boolean;
  showClose?: boolean;
  forceMount?: boolean;
}

export interface DialogHeaderType extends BaseComponentType {
  type: "DialogHeader";
}

export interface DialogFooterType extends BaseComponentType {
  type: "DialogFooter";
}

export interface DialogTitleType extends BaseComponentType {
  type: "DialogTitle";
}

export interface DialogDescriptionType extends BaseComponentType {
  type: "DialogDescription";
}

export interface DialogCloseType extends BaseComponentType {
  type: "DialogClose";
  asChild?: boolean;
}
