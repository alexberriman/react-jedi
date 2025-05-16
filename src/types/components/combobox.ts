import type { ComboboxOption } from "@/components/ui/combobox";
import type { BaseComponentSpec } from "@/types/schema/base";

export interface ComboboxDef extends BaseComponentSpec {
  type: "combobox";
  props?: {
    value?: string;
    onValueChange?: {
      type: "action";
      action: string;
    };
    options?: ComboboxOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    className?: string;
  };
}
