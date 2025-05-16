import type { BaseComponentSpec } from "../schema/base";

export interface ResizablePanelGroupSpecification extends Omit<BaseComponentSpec, "direction"> {
  type: "ResizablePanelGroup";
  direction?: "horizontal" | "vertical";
  autoSaveId?: string;
  onLayout?: string;
  storage?: unknown;
  persist?: boolean;
}

export interface ResizablePanelSpecification extends BaseComponentSpec {
  type: "ResizablePanel";
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  order?: number;
}

export interface ResizableHandleSpecification extends BaseComponentSpec {
  type: "ResizableHandle";
  disabled?: boolean;
  withHandle?: boolean;
}
