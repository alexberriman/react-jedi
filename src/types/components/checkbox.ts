import type { BaseComponentSpec } from "../schema/base";

export interface CheckboxSpecification extends BaseComponentSpec {
  type: "Checkbox";
  props?: {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    name?: string;
    value?: string;
    onCheckedChange?: string; // Event handler name
    className?: string;
    id?: string;
    required?: boolean;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
  };
}
