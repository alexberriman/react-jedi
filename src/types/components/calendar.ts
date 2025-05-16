import type { BaseComponentSpec } from "../schema/base";

export interface CalendarDateSpec {
  year: number;
  month: number;
  day: number;
}

export interface CalendarRangeSpec {
  from?: string | CalendarDateSpec;
  to?: string | CalendarDateSpec;
}

export interface CalendarComponentProps extends BaseComponentSpec {
  type: "calendar";
  // Calendar mode configuration
  mode?: "single" | "multiple" | "range";

  // Selected values
  selected?: string | string[] | CalendarRangeSpec;
  defaultMonth?: string | CalendarDateSpec;

  // Disabled dates
  disabled?: string[] | CalendarDateSpec[];

  // Calendar options
  initialFocus?: boolean;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  numberOfMonths?: number;

  // Year/month constraints
  fromYear?: number;
  toYear?: number;
  fromMonth?: string | CalendarDateSpec;
  toMonth?: string | CalendarDateSpec;
  fromDate?: string | CalendarDateSpec;
  toDate?: string | CalendarDateSpec;

  // Event handlers
  onSelect?: string;
  onMonthChange?: string;

  // The styling properties are inherited from BaseComponentSpec
}
