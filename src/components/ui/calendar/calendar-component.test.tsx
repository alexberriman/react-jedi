import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render as testRender } from "@testing-library/react";
import { CalendarComponent, type CalendarSpec } from "./calendar-component";

describe("CalendarComponent", () => {
  it("renders in single mode with date string", () => {
    const mockHandlers = {
      handleDateSelect: vi.fn(),
    };

    const spec: CalendarSpec = {
      type: "calendar",
      mode: "single",
      selected: "2024-01-15T00:00:00.000Z",
      defaultMonth: "2024-01-01T00:00:00.000Z",
      showOutsideDays: true,
      onSelect: "handleDateSelect",
    };

    const props = {
      spec,
      children: null,
      theme: undefined,
      state: undefined,
      parentContext: {
        handlers: mockHandlers,
      },
    };

    const { container } = testRender(<CalendarComponent {...props} />);
    
    // Check that the calendar is rendered by looking for the DayPicker root element
    const dayPicker = container.querySelector('.rdp');
    expect(dayPicker).toBeInTheDocument();
  });

  it("renders in multiple mode with array of date strings", () => {
    const spec: CalendarSpec = {
      type: "calendar",
      mode: "multiple",
      selected: ["2024-01-15T00:00:00.000Z", "2024-01-20T00:00:00.000Z"],
      defaultMonth: "2024-01-01T00:00:00.000Z",
      showOutsideDays: true,
    };

    const props = {
      spec,
      children: null,
      theme: undefined,
      state: undefined,
      parentContext: {},
    };

    const { container } = testRender(<CalendarComponent {...props} />);
    
    // Check that the calendar is rendered by looking for the DayPicker root element
    const dayPicker = container.querySelector('.rdp');
    expect(dayPicker).toBeInTheDocument();
  });

  it("renders in range mode with date range strings", () => {
    const spec: CalendarSpec = {
      type: "calendar",
      mode: "range",
      selected: {
        from: "2024-01-15T00:00:00.000Z",
        to: "2024-01-20T00:00:00.000Z",
      },
      defaultMonth: "2024-01-01T00:00:00.000Z",
      numberOfMonths: 2,
    };

    const props = {
      spec,
      children: null,
      theme: undefined,
      state: undefined,
      parentContext: {},
    };

    const { container } = testRender(<CalendarComponent {...props} />);
    
    // Check that the calendar is rendered and has multiple months class
    const dayPicker = container.querySelector('.rdp-multiple_months');
    expect(dayPicker).toBeInTheDocument();
  });

  it("handles weekends disabled", () => {
    const spec: CalendarSpec = {
      type: "calendar",
      mode: "single",
      disabled: "weekends",
      defaultMonth: "2024-01-01T00:00:00.000Z",
    };

    const props = {
      spec,
      children: null,
      theme: undefined,
      state: undefined,
      parentContext: {},
    };

    const { container } = testRender(<CalendarComponent {...props} />);
    
    // Check that the calendar is rendered
    const dayPicker = container.querySelector('.rdp');
    expect(dayPicker).toBeInTheDocument();
  });

  it("handles disabled dates array", () => {
    const spec: CalendarSpec = {
      type: "calendar",
      mode: "single",
      disabled: ["2024-01-15T00:00:00.000Z", "2024-01-16T00:00:00.000Z"],
      defaultMonth: "2024-01-01T00:00:00.000Z",
    };

    const props = {
      spec,
      children: null,
      theme: undefined,
      state: undefined,
      parentContext: {},
    };

    const { container } = testRender(<CalendarComponent {...props} />);
    
    // Check that the calendar is rendered
    const dayPicker = container.querySelector('.rdp');
    expect(dayPicker).toBeInTheDocument();
  });

  it("parses date constraints from strings", () => {
    const spec: CalendarSpec = {
      type: "calendar",
      mode: "single",
      fromDate: "2024-01-01T00:00:00.000Z",
      toDate: "2024-12-31T00:00:00.000Z",
      fromYear: 2020,
      toYear: 2030,
      defaultMonth: "2024-06-01T00:00:00.000Z",
    };

    const props = {
      spec,
      children: null,
      theme: undefined,
      state: undefined,
      parentContext: {},
    };

    const { container } = testRender(<CalendarComponent {...props} />);
    
    // Check that the calendar is rendered
    const dayPicker = container.querySelector('.rdp');
    expect(dayPicker).toBeInTheDocument();
  });
});