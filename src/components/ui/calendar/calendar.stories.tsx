import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Calendar } from "./calendar";
import { addDays, isSaturday, isSunday } from "date-fns";
import type { DateRange } from "react-day-picker";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

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
export const Default = enhanceStoryForDualMode({
  args: {
    mode: "single",
    showOutsideDays: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
});

// Interactive single date selection
export const SingleDateSelection = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Calendar",
          mode: "single",
          selected: new Date().toISOString(),
          onSelect: "handleDateSelect",
        },
        {
          type: "Text",
          size: "sm",
          variant: "muted",
          children: `Selected date: ${new Date().toDateString()}`,
        },
      ],
    },
  }
);

// Multiple date selection
export const MultipleDateSelection = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test calendar renders in multiple mode
      const calendar = canvasElement.querySelector('[role="grid"]');
      expect(calendar).toBeInTheDocument();

      // Test "Selected dates:" text appears
      const selectedDatesText = canvas.getByText("Selected dates:");
      expect(selectedDatesText).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Calendar",
          mode: "multiple",
          selected: [],
          onSelect: "handleDatesSelect",
        },
        {
          type: "Box",
          className: "text-sm text-muted-foreground",
          children: [
            {
              type: "Text",
              children: "Selected dates:",
            },
            {
              type: "Box",
              element: "ul",
              children: [],
            },
          ],
        },
      ],
    },
  }
);

// Date range selection
export const DateRangeSelection = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test calendar renders in range mode with 2 months
      const grids = canvasElement.querySelectorAll('[role="grid"]');
      expect(grids).toHaveLength(2);

      // Test range display text appears
      const fromText = canvas.getByText(/From:/);
      expect(fromText).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Calendar",
          mode: "range",
          selected: {
            from: new Date().toISOString(),
            to: addDays(new Date(), 7).toISOString(),
          },
          onSelect: "handleRangeSelect",
          numberOfMonths: 2,
        },
        {
          type: "Box",
          className: "text-sm text-muted-foreground",
          children: {
            type: "Text",
            element: "p",
            children: `From: ${new Date().toDateString()}\nTo: ${addDays(new Date(), 7).toDateString()}`,
          },
        },
      ],
    },
  }
);

// Calendar with disabled dates
export const WithDisabledDates = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test calendar renders
      const calendar = canvasElement.querySelector('[role="grid"]');
      expect(calendar).toBeInTheDocument();

      // Test info text appears
      const infoText = canvas.getByText(/Weekends are disabled/);
      expect(infoText).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Calendar",
          mode: "single",
          selected: new Date().toISOString(),
          onSelect: "handleDateSelect",
          disabled: "weekends",
        },
        {
          type: "Text",
          size: "sm",
          variant: "muted",
          children: `Weekends are disabled. Selected: ${new Date().toDateString()}`,
        },
      ],
    },
  }
);

// Calendar with specific disabled dates
export const WithSpecificDisabledDates = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test calendar renders
      const calendar = canvasElement.querySelector('[role="grid"]');
      expect(calendar).toBeInTheDocument();

      // Test info text appears
      const infoText = canvas.getByText("Today and next 2 days are disabled");
      expect(infoText).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Calendar",
          mode: "single",
          selected: new Date().toISOString(),
          onSelect: "handleDateSelect",
          disabled: [
            new Date().toISOString(),
            addDays(new Date(), 1).toISOString(),
            addDays(new Date(), 2).toISOString(),
          ],
        },
        {
          type: "Text",
          size: "sm",
          variant: "muted",
          children: "Today and next 2 days are disabled",
        },
      ],
    },
  }
);

// Multiple months display
export const MultipleMonths = enhanceStoryForDualMode(
  {
    render: () => {
      const MultipleMonthsExample = () => {
        const [date, setDate] = useState<Date | undefined>(new Date());

        return <Calendar mode="single" selected={date} onSelect={setDate} numberOfMonths={3} />;
      };
      return <MultipleMonthsExample />;
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
  },
  {
    renderSpec: {
      type: "Calendar",
      mode: "single",
      selected: new Date().toISOString(),
      onSelect: "handleDateSelect",
      numberOfMonths: 3,
    },
  }
);

// Calendar with date constraints
export const WithDateConstraints = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test calendar renders
      const calendar = canvasElement.querySelector('[role="grid"]');
      expect(calendar).toBeInTheDocument();

      // Test constraint text appears
      const constraintText = canvas.getByText("You can only select dates within the next 30 days");
      expect(constraintText).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Calendar",
          mode: "single",
          selected: new Date().toISOString(),
          onSelect: "handleDateSelect",
          fromDate: new Date().toISOString(),
          toDate: addDays(new Date(), 30).toISOString(),
        },
        {
          type: "Text",
          size: "sm",
          variant: "muted",
          children: "You can only select dates within the next 30 days",
        },
      ],
    },
  }
);

// Calendar with year constraints
export const WithYearConstraints = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test calendar renders
      const calendar = canvasElement.querySelector('[role="grid"]');
      expect(calendar).toBeInTheDocument();

      // Test year constraint text appears
      const constraintText = canvas.getByText("Years are limited to ±5 years from current year");
      expect(constraintText).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Calendar",
          mode: "single",
          selected: new Date().toISOString(),
          onSelect: "handleDateSelect",
          fromYear: new Date().getFullYear() - 5,
          toYear: new Date().getFullYear() + 5,
        },
        {
          type: "Text",
          size: "sm",
          variant: "muted",
          children: "Years are limited to ±5 years from current year",
        },
      ],
    },
  }
);

// Calendar without outside days
export const WithoutOutsideDays = enhanceStoryForDualMode({
  args: {
    mode: "single",
    showOutsideDays: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
});

// Fixed weeks layout
export const FixedWeeksLayout = enhanceStoryForDualMode({
  args: {
    mode: "single",
    fixedWeeks: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Test calendar renders with fixed weeks
    const calendar = canvasElement.querySelector('[role="grid"]');
    expect(calendar).toBeInTheDocument();

    // Test navigation buttons exist
    const prevButton = canvas.getByRole("button", { name: /previous month/i });
    const nextButton = canvas.getByRole("button", { name: /next month/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Test calendar has days (fixed weeks should always show 6 weeks)
    const days = canvas.getAllByRole("gridcell");
    expect(days.length).toBeGreaterThan(0);
  },
});

// JSON specification example
export const FromJsonSpecification = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test calendar renders
      const calendar = canvasElement.querySelector('[role="grid"]');
      expect(calendar).toBeInTheDocument();

      // Test JSON spec display appears
      const specTitle = canvas.getByText("JSON Specification:");
      expect(specTitle).toBeInTheDocument();

      // Test pre element exists with specification
      const preElement = canvasElement.querySelector("pre");
      expect(preElement).toBeInTheDocument();
      expect(preElement?.textContent).toContain('"type": "calendar"');
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Box",
          className: "p-4 bg-muted rounded-lg",
          children: [
            {
              type: "Text",
              size: "sm",
              weight: "medium",
              className: "mb-2",
              children: "JSON Specification:",
            },
            {
              type: "Text",
              element: "pre",
              size: "xs",
              children: JSON.stringify(
                {
                  type: "calendar",
                  mode: "single",
                  selected: new Date().toISOString(),
                  showOutsideDays: true,
                  numberOfMonths: 1,
                  onSelect: "handleDateSelect",
                },
                null,
                2
              ),
            },
          ],
        },
        {
          type: "Calendar",
          mode: "single",
          selected: new Date().toISOString(),
          onSelect: "handleDateSelect",
        },
      ],
    },
  }
);
