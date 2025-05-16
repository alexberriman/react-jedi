import type { BaseComponentProps } from "./base";

export interface DatePickerComponentProps extends BaseComponentProps {
  type: "DatePicker";
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: string;
  format?: string;
  minDate?: string;
  maxDate?: string;
}
