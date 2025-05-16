import type { BaseComponentSpec } from "@/types/schema/base";

export interface DialogType extends BaseComponentSpec {
  type: "dialog" | "Dialog";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
}

export interface DialogTriggerType extends BaseComponentSpec {
  type: "DialogTrigger";
  asChild?: boolean;
}

export interface DialogContentType extends BaseComponentSpec {
  type: "DialogContent";
  overlay?: boolean;
  showClose?: boolean;
  forceMount?: boolean;
}

export interface DialogHeaderType extends BaseComponentSpec {
  type: "DialogHeader";
}

export interface DialogFooterType extends BaseComponentSpec {
  type: "DialogFooter";
}

export interface DialogTitleType extends BaseComponentSpec {
  type: "DialogTitle";
}

export interface DialogDescriptionType extends BaseComponentSpec {
  type: "DialogDescription";
}

export interface DialogCloseType extends BaseComponentSpec {
  type: "DialogClose";
  asChild?: boolean;
}
