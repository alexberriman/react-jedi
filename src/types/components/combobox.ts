import type { ComboboxOption } from "@/components/ui/combobox";

export interface ComboboxDef {
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
