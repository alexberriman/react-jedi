import { BaseComponentSpec } from "./base";
import { ComponentChildren } from "../schema";

export interface ResizablePanelGroupSpecification extends BaseComponentSpec {
  type: "ResizablePanelGroup";
  children?: ComponentChildren;
  direction?: "horizontal" | "vertical";
  autoSaveId?: string;
  onLayout?: string;
  storage?: unknown;
  persist?: boolean;
  className?: string;
  style?: Record<string, string | number>;
  [key: string]: unknown;
}

export interface ResizablePanelSpecification extends BaseComponentSpec {
  type: "ResizablePanel";
  children?: ComponentChildren;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  order?: number;
  id?: string;
  className?: string;
  style?: Record<string, string | number>;
  [key: string]: unknown;
}

export interface ResizableHandleSpecification extends BaseComponentSpec {
  type: "ResizableHandle";
  disabled?: boolean;
  withHandle?: boolean;
  className?: string;
  style?: Record<string, string | number>;
  [key: string]: unknown;
}
