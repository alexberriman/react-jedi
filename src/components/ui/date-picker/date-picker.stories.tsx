import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./date-picker";

const meta = {
  title: "Components/UI/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    date: {
      control: { type: "date" },
      description: "Currently selected date",
    },
    onDateChange: {
      action: "date changed",
      description: "Callback when date changes",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when no date is selected",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the date picker is disabled",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default date picker with no initial value.
 */
export const Default: Story = {
  args: {
    placeholder: "Pick a date",
  },
};

/**
 * Date picker with a pre-selected date.
 */
export const WithSelectedDate: Story = {
  args: {
    date: new Date(),
    placeholder: "Pick a date",
  },
};

/**
 * Date picker with custom placeholder text.
 */
export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Select your birthday",
  },
};

/**
 * Disabled date picker that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    placeholder: "Pick a date",
    disabled: true,
  },
};

/**
 * Date picker with a disabled state and selected date.
 */
export const DisabledWithDate: Story = {
  args: {
    date: new Date(),
    placeholder: "Pick a date",
    disabled: true,
  },
};

/**
 * Date picker with controlled state.
 */
export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
      <div className="space-y-4">
        <DatePicker date={date} onDateChange={setDate} placeholder="Select a date" />
        <div className="text-sm text-muted-foreground">
          Selected date: {date ? date.toISOString() : "None"}
        </div>
      </div>
    );
  },
};

/**
 * Multiple date pickers demonstrating different states.
 */
export const Multiple: Story = {
  render: function MultipleDatePickers() {
    const [date1, setDate1] = React.useState<Date | undefined>(undefined);
    const [date2, setDate2] = React.useState<Date | undefined>(new Date());
    const [date3, setDate3] = React.useState<Date | undefined>(undefined);

    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="start-date" className="text-sm font-medium mb-2 block">
            Start Date
          </label>
          <div id="start-date">
            <DatePicker date={date1} onDateChange={setDate1} placeholder="Select start date" />
          </div>
        </div>
        <div>
          <label htmlFor="end-date" className="text-sm font-medium mb-2 block">
            End Date
          </label>
          <div id="end-date">
            <DatePicker date={date2} onDateChange={setDate2} placeholder="Select end date" />
          </div>
        </div>
        <div>
          <label htmlFor="disabled-date" className="text-sm font-medium mb-2 block">
            Disabled Date
          </label>
          <div id="disabled-date">
            <DatePicker date={date3} onDateChange={setDate3} placeholder="Cannot select" disabled />
          </div>
        </div>
      </div>
    );
  },
};

import React from "react";
