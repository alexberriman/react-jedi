import React from "react";
import { Calendar } from "./calendar";
import { BaseComponentSpec } from "@/types";
import type { ComponentProps } from "@/types/schema/components";
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

export interface CalendarSpec extends BaseComponentSpec {
  type: "calendar";
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from: Date | undefined; to: Date | undefined } | string | string[] | { from?: string; to?: string };
  defaultMonth?: Date | string;
  disabled?: boolean | Date[] | "weekends" | string[];
  initialFocus?: boolean;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  numberOfMonths?: number;
  fromYear?: number;
  toYear?: number;
  fromMonth?: Date | string;
  toMonth?: Date | string;
  fromDate?: Date | string;
  toDate?: Date | string;
  onSelect?: string; // Handler name
  onMonthChange?: string; // Handler name
  // style and className are inherited from BaseComponentSpec
}

interface CalendarComponentProps extends ComponentProps {
  readonly spec: CalendarSpec;
  readonly children?: React.ReactNode;
}

// Handle date parsing from JSON specification
const parseDate = (date: unknown): Date | undefined => {
  if (!date) return undefined;
  if (date instanceof Date) return date;
  if (typeof date === "string") return new Date(date);
  return undefined;
};

export function CalendarComponent({ spec, parentContext }: CalendarComponentProps) {
  // Extract spec properties with defaults early for hooks
  const {
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
    style: specStyle = {},
    className: specClassName = "",
  } = spec || {};
  
  // Use styles and classes from spec
  const style = specStyle;
  const className = specClassName;

  // Get handlers from parent context
  const handlers = parentContext?.handlers as Record<string, (...args: unknown[]) => unknown> | undefined;
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

  // Parse disabled dates
  const parsedDisabled = React.useMemo(() => {
    if (disabled === "weekends") {
      return (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6; // Sunday = 0, Saturday = 6
      };
    }
    if (Array.isArray(disabled)) {
      return disabled.map((d) => parseDate(d)).filter(Boolean) as Date[];
    }
    return disabled;
  }, [disabled]);

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
      if (onSelect && handlers && handlers[onSelect]) {
        handlers[onSelect](date);
      }
    },
    [onSelect, handlers]
  );

  const handleSelectMultiple: SelectMultipleEventHandler = React.useCallback(
    (dates, selectedDay, activeModifiers, e) => {
      if (onSelect && handlers && handlers[onSelect]) {
        handlers[onSelect](dates);
      }
    },
    [onSelect, handlers]
  );

  const handleSelectRange: SelectRangeEventHandler = React.useCallback(
    (range, selectedDay, activeModifiers, e) => {
      if (onSelect && handlers && handlers[onSelect]) {
        handlers[onSelect](range);
      }
    },
    [onSelect, handlers]
  );

  const handleMonthChange = React.useCallback(
    (month: Date) => {
      if (onMonthChange && handlers && handlers[onMonthChange]) {
        handlers[onMonthChange](month);
      }
    },
    [onMonthChange, handlers]
  );

  // Common props for all modes
  const parsedDefaultMonth = parseDate(defaultMonth) || new Date();
  const commonProps = {
    defaultMonth: parsedDefaultMonth,
    disabled: parsedDisabled,
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

  // Add defensive check for spec after hooks
  if (!spec) {
    console.error("CalendarComponent: spec is undefined");
    return null;
  }

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