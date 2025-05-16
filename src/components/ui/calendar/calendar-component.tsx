import React from "react";
import { Calendar } from "./calendar";
import { BaseComponentSpec } from "@/types";

// Type for parsed selected value - this is a discriminated union
type ParsedSelectedValue =
  | { mode: "single"; value: Date | undefined }
  | { mode: "multiple"; value: Date[] }
  | { mode: "range"; value: { from?: Date; to?: Date } | undefined };

export interface CalendarComponentProps extends BaseComponentSpec {
  type: "calendar";
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from?: Date; to?: Date };
  defaultMonth?: Date;
  disabled?: Date[] | ((date: Date) => boolean);
  initialFocus?: boolean;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  numberOfMonths?: number;
  fromYear?: number;
  toYear?: number;
  fromMonth?: Date;
  toMonth?: Date;
  fromDate?: Date;
  toDate?: Date;
  onSelect?: string;
  onMonthChange?: string;
  style?: React.CSSProperties;
  className?: string;
}

// Handle date parsing from JSON specification
const parseDate = (date: unknown): Date | undefined => {
  if (!date) return undefined;
  if (date instanceof Date) return date;
  if (typeof date === "string") return new Date(date);
  return undefined;
};

export function CalendarComponent({
  mode = "single",
  selected,
  defaultMonth,
  disabled,
  initialFocus,
  showOutsideDays = true,
  fixedWeeks,
  numberOfMonths,
  fromYear,
  toYear,
  fromMonth,
  toMonth,
  fromDate,
  toDate,
  onSelect,
  onMonthChange,
  style = {},
  className = "",
  $state = {},
  dataContext = {},
  ...props
}: CalendarComponentProps & {
  style?: React.CSSProperties;
  className?: string;
  $state?: Record<string, unknown>;
  dataContext?: Record<string, unknown>;
}) {
  // Helper functions for parsing different selection types
  const parseSingleSelect = (selected: unknown): Date | undefined => {
    return parseDate(selected);
  };

  const parseMultipleSelect = (selected: unknown): Date[] => {
    if (Array.isArray(selected)) {
      return selected.map((date) => parseDate(date)).filter(Boolean) as Date[];
    }
    return [];
  };

  const parseRangeSelect = (selected: unknown): { from?: Date; to?: Date } | undefined => {
    if (typeof selected === "object" && !Array.isArray(selected)) {
      const range = selected as { from?: Date | string; to?: Date | string };
      const fromDate = parseDate(range.from);
      const toDate = parseDate(range.to);
      return {
        from: fromDate,
        to: toDate,
      };
    }
    return undefined;
  };

  // Parse dates from JSON specification
  const parsedValue = React.useMemo((): ParsedSelectedValue => {
    switch (mode) {
      case "single": {
        return { mode: "single", value: parseSingleSelect(selected) };
      }
      case "multiple": {
        return { mode: "multiple", value: parseMultipleSelect(selected) };
      }
      case "range": {
        return { mode: "range", value: parseRangeSelect(selected) };
      }
      default: {
        // This should never happen due to TypeScript narrowing
        return { mode: "single", value: undefined };
      }
    }
  }, [selected, mode]);

  // Extract the actual selected value for the calendar
  const parsedSelected = parsedValue.value;

  // Event handlers for calendar
  const handleSelectSingle = React.useCallback(
    (date: Date | undefined) => {
      if (onSelect) {
        // For now, just log the selection. In a real implementation,
        // this would dispatch an action or call a handler
        console.log("Calendar selected:", date);
      }
    },
    [onSelect]
  );

  const handleSelectMultiple = React.useCallback(
    (dates: Date[] | undefined) => {
      if (onSelect) {
        console.log("Calendar selected multiple:", dates);
      }
    },
    [onSelect]
  );

  const handleSelectRange = React.useCallback(
    (range: { from?: Date; to?: Date } | undefined) => {
      if (onSelect) {
        console.log("Calendar selected range:", range);
      }
    },
    [onSelect]
  );

  const handleMonthChange = React.useCallback(
    (month: Date) => {
      if (onMonthChange) {
        console.log("Calendar month changed:", month);
      }
    },
    [onMonthChange]
  );

  // Select the appropriate handler based on mode
  let selectHandler: ((value: unknown) => void) | undefined;

  if (mode === "single") {
    selectHandler = handleSelectSingle;
  } else if (mode === "multiple") {
    selectHandler = handleSelectMultiple;
  } else {
    selectHandler = handleSelectRange;
  }

  return (
    <Calendar
      mode={mode}
      selected={parsedSelected}
      defaultMonth={parseDate(defaultMonth)}
      disabled={disabled}
      initialFocus={initialFocus}
      showOutsideDays={showOutsideDays}
      fixedWeeks={fixedWeeks}
      numberOfMonths={numberOfMonths}
      fromYear={fromYear}
      toYear={toYear}
      fromMonth={parseDate(fromMonth)}
      toMonth={parseDate(toMonth)}
      fromDate={parseDate(fromDate)}
      toDate={parseDate(toDate)}
      className={className}
      style={style}
      onSelect={selectHandler as unknown}
      onMonthChange={handleMonthChange}
    />
  );
}
