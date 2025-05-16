import type { BaseComponentSpec } from "../schema/base";

export interface AlertDialogTrigger {
  component: "Button" | "Toggle" | "Text";
  properties: Record<string, unknown>;
}

export interface AlertDialogAction {
  component: "Button";
  properties: {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    text: string;
    action: "close" | "confirm";
    disabled?: boolean;
  };
}

export interface AlertDialogContent {
  title: string;
  description?: string;
  actions?: AlertDialogAction[];
}

export interface AlertDialogProperties {
  trigger: AlertDialogTrigger;
  content: AlertDialogContent;
  defaultOpen?: boolean;
  open?: boolean | string;
  onClose?: string;
  onConfirm?: string;
}

export interface AlertDialogDefinition extends BaseComponentSpec {
  type: "alertDialog";
  properties: AlertDialogProperties;
}
