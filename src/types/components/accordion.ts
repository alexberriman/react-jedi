import type { BaseComponentType } from "./base";

export interface AccordionItem {
  value: string;
  trigger: string;
  content: string;
  disabled?: boolean;
}

export interface AccordionType extends BaseComponentType {
  type: "accordion";
  accordionType?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
  disabled?: boolean;
  items: AccordionItem[];
}
