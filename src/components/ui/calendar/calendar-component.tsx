import React from "react";
import { Calendar } from "./calendar";
import { BaseComponentSpec } from "@/types";
import type {
  SelectSingleEventHandler,
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
} from "react-day-picker";

// Type for parsed selected value - this is a discriminated union
type ParsedSelectedValue =
  | { mode: "single"; value: Date | undefined }
  | { mode: "multiple"; value: Date[] }
  | { mode: "range"; value: { from: Date | undefined; to: Date | undefined } | undefined };

export interface CalendarComponentProps extends BaseComponentSpec {
  type: "calendar";
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from: Date | undefined; to: Date | undefined };
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

  const parseRangeSelect = (
    selected: unknown
  ): { from: Date | undefined; to: Date | undefined } | undefined => {
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

  // Event handlers for calendar - these need to match react-day-picker's exact signatures
  const handleSelectSingle: SelectSingleEventHandler = React.useCallback(
    (date, selectedDay, activeModifiers, e) => {
      if (onSelect) {
        // For now, just log the selection. In a real implementation,
        // this would dispatch an action or call a handler
        console.log("Calendar selected:", date);
      }
    },
    [onSelect]
  );

  const handleSelectMultiple: SelectMultipleEventHandler = React.useCallback(
    (dates, selectedDay, activeModifiers, e) => {
      if (onSelect) {
        console.log("Calendar selected multiple:", dates);
      }
    },
    [onSelect]
  );

  const handleSelectRange: SelectRangeEventHandler = React.useCallback(
    (range, selectedDay, activeModifiers, e) => {
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

  // Common props for all modes
  const commonProps = {
    defaultMonth: parseDate(defaultMonth),
    disabled,
    initialFocus,
    showOutsideDays,
    fixedWeeks,
    numberOfMonths,
    fromYear,
    toYear,
    fromMonth: parseDate(fromMonth),
    toMonth: parseDate(toMonth),
    fromDate: parseDate(fromDate),
    toDate: parseDate(toDate),
    className,
    style,
    onMonthChange: handleMonthChange,
  };

  // Render different Calendar variants based on mode
  if (mode === "single") {
    return (
      <Calendar
        {...commonProps}
        mode="single"
        selected={parsedValue.mode === "single" ? parsedValue.value : undefined}
        onSelect={handleSelectSingle}
      />
    );
  } else if (mode === "multiple") {
    return (
      <Calendar
        {...commonProps}
        mode="multiple"
        selected={parsedValue.mode === "multiple" ? parsedValue.value : undefined}
        onSelect={handleSelectMultiple}
      />
    );
  } else {
    return (
      <Calendar
        {...commonProps}
        mode="range"
        selected={parsedValue.mode === "range" ? parsedValue.value : undefined}
        onSelect={handleSelectRange}
      />
    );
  }
}
