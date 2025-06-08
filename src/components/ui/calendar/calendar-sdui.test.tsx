import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { render as sduiRender } from "../../../lib/render";

describe("Calendar SDUI Rendering", () => {

  it("renders a basic calendar in SDUI mode", () => {
    const today = new Date();
    const spec = {
      type: "Calendar",
      mode: "single",
      selected: today.toISOString(),
      defaultMonth: today.toISOString(),
      showOutsideDays: true,
    };

    const component = sduiRender(spec);
    const { container } = render(component!);
    
    // Check if calendar grid is rendered
    const calendar = container.querySelector('[role="grid"]');
    expect(calendar).toBeInTheDocument();
  });

  it("renders a calendar with date selection handler", () => {
    const handleDateSelect = vi.fn();
    
    const spec = {
      type: "Calendar",
      mode: "single",
      selected: new Date().toISOString(),
      onSelect: "handleDateSelect",
    };

    const component = sduiRender(spec, {
      handlers: {
        handleDateSelect,
      },
    });
    const { container } = render(component!);
    
    const calendar = container.querySelector('[role="grid"]');
    expect(calendar).toBeInTheDocument();
  });

  it("renders a calendar with multiple mode", () => {
    const spec = {
      type: "Calendar",
      mode: "multiple",
      selected: [],
      showOutsideDays: true,
    };

    const component = sduiRender(spec);
    const { container } = render(component!);
    
    const calendar = container.querySelector('[role="grid"]');
    expect(calendar).toBeInTheDocument();
  });

  it("renders a calendar with range mode", () => {
    const spec = {
      type: "Calendar",
      mode: "range",
      selected: {
        from: new Date().toISOString(),
        to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      numberOfMonths: 2,
    };

    const component = sduiRender(spec);
    const { container } = render(component!);
    
    // Should render 2 calendar grids for 2 months
    const calendars = container.querySelectorAll('[role="grid"]');
    expect(calendars).toHaveLength(2);
  });

  it("renders a calendar with disabled weekends", () => {
    const spec = {
      type: "Calendar",
      mode: "single",
      selected: new Date().toISOString(),
      disabled: "weekends",
    };

    const component = sduiRender(spec);
    const { container } = render(component!);
    
    const calendar = container.querySelector('[role="grid"]');
    expect(calendar).toBeInTheDocument();
  });
});