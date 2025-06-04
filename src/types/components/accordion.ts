import type { BaseComponentSpec } from "@/types/schema/base";

export interface AccordionItem {
  value: string;
  trigger: string;
  content: string;
  disabled?: boolean;
}

export interface AccordionType extends BaseComponentSpec {
  type: "accordion";
  accordionType?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
  disabled?: boolean;
  animated?: boolean;
  items: AccordionItem[];
}
