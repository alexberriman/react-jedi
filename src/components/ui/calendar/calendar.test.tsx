import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("renders with the calendar grid", () => {
    render(<Calendar mode="single" />);
    
    // Check if the calendar grid is rendered
    const calendar = screen.getByRole("grid");
    expect(calendar).toBeInTheDocument();
    
    // Check if navigation buttons are rendered
    const prevButton = screen.getByRole("button", { name: /previous month/i });
    const nextButton = screen.getByRole("button", { name: /next month/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    
    // Check if day cells are rendered
    const days = screen.getAllByRole("gridcell");
    expect(days.length).toBeGreaterThan(0);
  });
  
  it("renders multiple months when numberOfMonths is set", () => {
    render(<Calendar mode="single" numberOfMonths={2} />);
    
    // Should render 2 calendar grids
    const grids = screen.getAllByRole("grid");
    expect(grids).toHaveLength(2);
  });
  
  it("applies custom className", () => {
    render(<Calendar mode="single" className="custom-calendar" />);
    
    // The calendar container should have the custom class along with the default classes
    const calendarContainer = document.querySelector(".custom-calendar");
    expect(calendarContainer).toBeInTheDocument();
  });
});