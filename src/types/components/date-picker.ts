import type { BaseComponentSpec } from "../schema/base";

export interface DatePickerComponentProps extends BaseComponentSpec {
  type: "DatePicker";
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: string;
  format?: string;
  minDate?: string;
  maxDate?: string;
}
