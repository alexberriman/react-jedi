import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Calendar } from "./calendar";
import { addDays, isSaturday, isSunday } from "date-fns";
import type { DateRange } from "react-day-picker";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "multiple", "range"],
      description: "The selection mode for the calendar",
      defaultValue: "single",
    },
    showOutsideDays: {
      control: { type: "boolean" },
      description: "Whether to show days outside the current month",
      defaultValue: true,
    },
    fixedWeeks: {
      control: { type: "boolean" },
      description: "Display fixed weeks to avoid layout shifts",
      defaultValue: false,
    },
    numberOfMonths: {
      control: { type: "number", min: 1, max: 12 },
      description: "The number of months to display",
      defaultValue: 1,
    },
    initialFocus: {
      control: { type: "boolean" },
      description: "Whether the calendar should have focus when mounted",
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default single selection calendar
export const Default: Story = {
  args: {
    mode: "single",
    showOutsideDays: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test calendar renders
    const calendar = canvasElement.querySelector('[role="grid"]');
    expect(calendar).toBeInTheDocument();

    // Test month navigation buttons
    const prevButton = canvas.getByRole("button", { name: /previous month/i });
    const nextButton = canvas.getByRole("button", { name: /next month/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Test calendar has days
    const days = canvas.getAllByRole("gridcell");
    expect(days.length).toBeGreaterThan(0);
  },
};

// Interactive single date selection
export const SingleDateSelection: Story = {
  render: () => {
    const SingleDateExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());

      return (
        <div className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} />
          <p className="text-sm text-muted-foreground">
            Selected date: {date?.toDateString() || "None"}
          </p>
        </div>
      );
    };
    return <SingleDateExample />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test initial date selection
    const today = new Date();
    const selectedDate = canvas.getByText(`Selected date: ${today.toDateString()}`);
    expect(selectedDate).toBeInTheDocument();

    // Test clicking a different date
    const days = canvas.getAllByRole("gridcell");
    const availableDay = days.find(
      (day) => !day.hasAttribute("disabled") && day.textContent === "15"
    );
    if (availableDay) {
      await user.click(availableDay);
      // Date should update
    }

    // Test month navigation
    const nextButton = canvas.getByRole("button", { name: /next month/i });
    await user.click(nextButton);
  },
};

// Multiple date selection
export const MultipleDateSelection: Story = {
  render: () => {
    const MultipleDateExample = () => {
      const [dates, setDates] = useState<Date[] | undefined>([]);

      return (
        <div className="flex flex-col gap-4">
          <Calendar mode="multiple" selected={dates} onSelect={setDates} />
          <div className="text-sm text-muted-foreground">
            <p>Selected dates:</p>
            <ul>{dates?.map((date, index) => <li key={index}>{date.toDateString()}</li>)}</ul>
          </div>
        </div>
      );
    };
    return <MultipleDateExample />;
  },
};

// Date range selection
export const DateRangeSelection: Story = {
  render: () => {
    const DateRangeExample = () => {
      const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
      });

      return (
        <div className="flex flex-col gap-4">
          <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
          <div className="text-sm text-muted-foreground">
            <p>
              From: {dateRange?.from?.toDateString() || "Not selected"}
              <br />
              To: {dateRange?.to?.toDateString() || "Not selected"}
            </p>
          </div>
        </div>
      );
    };
    return <DateRangeExample />;
  },
};

// Calendar with disabled dates
export const WithDisabledDates: Story = {
  render: () => {
    const DisabledDatesExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());

      // Disable weekends
      const isWeekend = (date: Date) => {
        return isSaturday(date) || isSunday(date);
      };

      return (
        <div className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} disabled={isWeekend} />
          <p className="text-sm text-muted-foreground">
            Weekends are disabled. Selected: {date?.toDateString() || "None"}
          </p>
        </div>
      );
    };
    return <DisabledDatesExample />;
  },
};

// Calendar with specific disabled dates
export const WithSpecificDisabledDates: Story = {
  render: () => {
    const SpecificDisabledDatesExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());

      const disabledDates = [new Date(), addDays(new Date(), 1), addDays(new Date(), 2)];

      return (
        <div className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} disabled={disabledDates} />
          <p className="text-sm text-muted-foreground">Today and next 2 days are disabled</p>
        </div>
      );
    };
    return <SpecificDisabledDatesExample />;
  },
};

// Multiple months display
export const MultipleMonths: Story = {
  render: () => {
    const MultipleMonthsExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());

      return <Calendar mode="single" selected={date} onSelect={setDate} numberOfMonths={3} />;
    };
    return <MultipleMonthsExample />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test multiple months are displayed
    const grids = canvasElement.querySelectorAll('[role="grid"]');
    expect(grids).toHaveLength(3);

    // Test navigation buttons exist
    const prevButton = canvas.getByRole("button", { name: /previous month/i });
    const nextButton = canvas.getByRole("button", { name: /next month/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  },
};

// Calendar with date constraints
export const WithDateConstraints: Story = {
  render: () => {
    const DateConstraintsExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());
      const fromDate = new Date();
      const toDate = addDays(new Date(), 30);

      return (
        <div className="flex flex-col gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            fromDate={fromDate}
            toDate={toDate}
          />
          <p className="text-sm text-muted-foreground">
            You can only select dates within the next 30 days
          </p>
        </div>
      );
    };
    return <DateConstraintsExample />;
  },
};

// Calendar with year constraints
export const WithYearConstraints: Story = {
  render: () => {
    const YearConstraintsExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());
      const currentYear = new Date().getFullYear();

      return (
        <div className="flex flex-col gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            fromYear={currentYear - 5}
            toYear={currentYear + 5}
          />
          <p className="text-sm text-muted-foreground">
            Years are limited to ±5 years from current year
          </p>
        </div>
      );
    };
    return <YearConstraintsExample />;
  },
};

// Calendar without outside days
export const WithoutOutsideDays: Story = {
  args: {
    mode: "single",
    showOutsideDays: false,
  },
  play: async ({ canvasElement }) => {
    within(canvasElement);

    // Test that outside days are not shown
    const calendar = canvasElement.querySelector('[role="grid"]');
    expect(calendar).toBeInTheDocument();

    // Check for outside days (they should have a specific class when shown)
    const outsideDays = canvasElement.querySelectorAll(
      '[aria-selected="false"][aria-disabled="true"]'
    );
    // With showOutsideDays: false, there should be fewer disabled days
    expect(outsideDays.length).toBeLessThan(10);
  },
};

// Fixed weeks layout
export const FixedWeeksLayout: Story = {
  args: {
    mode: "single",
    fixedWeeks: true,
  },
};

// JSON specification example
export const FromJsonSpecification: Story = {
  render: () => {
    const JsonSpecificationExample = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());

      // Example of how it would work with JSON specification
      const specification = {
        type: "calendar",
        mode: "single",
        selected: date?.toISOString(),
        showOutsideDays: true,
        numberOfMonths: 1,
        onSelect: "handleDateSelect",
      };

      return (
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">JSON Specification:</p>
            <pre className="text-xs">{JSON.stringify(specification, null, 2)}</pre>
          </div>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      );
    };
    return <JsonSpecificationExample />;
  },
};
