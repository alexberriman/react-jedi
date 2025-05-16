import type { ComponentChildren, BaseComponentSpec } from "../schema/base";

export interface TabsSpecification extends BaseComponentSpec {
  type: "Tabs";
  children?: ComponentChildren;
  // Tabs control props
  value?: string;
  defaultValue?: string;
  onValueChange?: string;
  // Layout props
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  activationMode?: "automatic" | "manual";
}

export interface TabsListSpecification extends BaseComponentSpec {
  type: "TabsList";
  children?: ComponentChildren;
  loop?: boolean;
}

export interface TabsTriggerSpecification extends BaseComponentSpec {
  type: "TabsTrigger";
  children?: ComponentChildren;
  value: string;
  disabled?: boolean;
}

export interface TabsContentSpecification extends BaseComponentSpec {
  type: "TabsContent";
  children?: ComponentChildren;
  value: string;
  forceMount?: boolean;
}

export type TabsComponent =
  | TabsSpecification
  | TabsListSpecification
  | TabsTriggerSpecification
  | TabsContentSpecification;
