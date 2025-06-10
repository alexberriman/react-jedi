import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { DatePicker } from "./date-picker";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

/**
 * NOTE: This component may produce act() warnings during tests.
 * These warnings come from Radix UI's Presence component used within the Popover
 * and are false positives related to internal animation state updates.
 * The warnings occur when the popover opens/closes due to animation transitions.
 * All tests pass successfully despite these warnings.
 */

const meta = {
  title: "Components/DatePicker",
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
export const Default: Story = enhanceStoryForDualMode<typeof DatePicker>({
  args: {
    placeholder: "Pick a date",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Find and verify the date picker button exists
    const dateButton = canvas.getByRole("button", { name: /pick a date/i });
    expect(dateButton).toBeInTheDocument();
    expect(dateButton).not.toBeDisabled();

    // Click to open the date picker
    await userEvent.click(dateButton);

    // Verify calendar opens
    await waitFor(() => {
      const calendarElement = document.querySelector(".rdp");
      expect(calendarElement).toBeInTheDocument();
    }, { timeout: 3000 });
  },
});

/**
 * Date picker with a pre-selected date.
 */
export const WithSelectedDate: Story = enhanceStoryForDualMode<typeof DatePicker>({
  args: {
    date: new Date(),
    placeholder: "Pick a date",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Verify selected date is displayed
    const dateButton = canvas.getByRole("button");
    const dateText = dateButton.textContent || "";
    expect(dateText).not.toBe("Pick a date");

    // Click to open calendar
    await userEvent.click(dateButton);

    // Wait for calendar to be fully rendered
    await waitFor(() => {
      const calendarElement = document.querySelector(".rdp");
      expect(calendarElement).toBeInTheDocument();
    }, { timeout: 3000 });

    // Close the calendar by clicking outside
    await userEvent.click(document.body);

    // Wait for calendar to close completely
    await waitFor(() => {
      const calendarElement = document.querySelector(".rdp");
      expect(calendarElement).not.toBeInTheDocument();
    }, { timeout: 3000 });
  },
});

/**
 * Date picker with custom placeholder text.
 */
export const CustomPlaceholder: Story = enhanceStoryForDualMode<typeof DatePicker>({
  args: {
    placeholder: "Select your birthday",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Verify custom placeholder is displayed
    const dateButton = canvas.getByRole("button", { name: /select your birthday/i });
    expect(dateButton).toBeInTheDocument();

    // Click to open calendar
    await userEvent.click(dateButton);

    // Verify calendar opens
    await waitFor(() => {
      const calendarElement =
        document.querySelector(".rdp") ||
        canvas.getByText(
          /january|february|march|april|may|june|july|august|september|october|november|december/i
        );
      expect(calendarElement).toBeInTheDocument();
    }, { timeout: 3000 });

    // Close calendar by clicking outside
    await userEvent.click(document.body);
  },
});

/**
 * Disabled date picker that cannot be interacted with.
 */
export const Disabled: Story = enhanceStoryForDualMode<typeof DatePicker>({
  args: {
    placeholder: "Pick a date",
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Find the disabled button
    const dateButton = canvas.getByRole("button", { name: /pick a date/i });

    // Verify it's disabled
    expect(dateButton).toBeDisabled();

    // Verify calendar doesn't open (since button is disabled)
    expect(document.querySelector(".rdp")).not.toBeInTheDocument();
  },
});

/**
 * Date picker with a disabled state and selected date.
 */
export const DisabledWithDate: Story = enhanceStoryForDualMode<typeof DatePicker>({
  args: {
    date: new Date(),
    placeholder: "Pick a date",
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Find the disabled button
    const dateButton = canvas.getByRole("button");

    // Verify it's disabled
    expect(dateButton).toBeDisabled();

    // Verify date is still displayed
    const dateText = dateButton.textContent || "";
    expect(dateText).not.toBe("Pick a date");

    // Verify calendar doesn't open (since button is disabled)
    expect(document.querySelector(".rdp")).not.toBeInTheDocument();
  },
});

/**
 * Date picker with controlled state.
 */
export const Controlled: Story = enhanceStoryForDualMode<typeof DatePicker>(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Check if we're in SDUI mode by looking for specific SDUI attributes
      const isSduiMode = Object.hasOwn(canvasElement.dataset, 'testid') && 
                         canvasElement.dataset.testid === 'sdui-render';

      // Verify initial state
      expect(canvas.getByText("Selected date: None")).toBeInTheDocument();

      // Open date picker
      const dateButton = canvas.getByRole("button", { name: /select a date/i });
      await userEvent.click(dateButton);

      // Wait for calendar
      await waitFor(() => {
        const calendarElement =
          document.querySelector(".rdp") ||
          canvas.getByText(
            /january|february|march|april|may|june|july|august|september|october|november|december/i
          );
        expect(calendarElement).toBeInTheDocument();
      }, { timeout: 3000 });

      // Select a date (15th is always visible)
      await waitFor(() => {
        // Calendar might be in a portal, use screen
        const fifteenthButton = within(document.body).getByText("15");
        expect(fifteenthButton).toBeInTheDocument();
      }, { timeout: 3000 });
      const fifteenthButton = within(document.body).getByText("15");
      await userEvent.click(fifteenthButton);

      // In SDUI mode, the state won't update, so skip this check
      await (isSduiMode
        ? // In SDUI mode, just verify the calendar closes
          waitFor(() => {
            const calendarElement = document.querySelector(".rdp");
            expect(calendarElement).not.toBeInTheDocument();
          }, { timeout: 3000 })
        : // Verify date is displayed (only in React mode)
          waitFor(() => {
            expect(canvas.getByText(/Selected date:.*\d{4}/)).toBeInTheDocument();
          }, { timeout: 3000 }));
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "DatePicker",
          placeholder: "Select a date",
        },
        {
          type: "Text",
          className: "text-sm text-muted-foreground",
          children: "Selected date: None",
        },
      ],
    },
  }
);

/**
 * Multiple date pickers demonstrating different states.
 */
export const Multiple: Story = enhanceStoryForDualMode<typeof DatePicker>(
  {
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
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Find all date pickers
      const dateButtons = canvas.getAllByRole("button");

      // Test Start Date picker
      await userEvent.click(dateButtons[0]);
      await waitFor(() => {
        const calendarElement =
          document.querySelector(".rdp") ||
          canvas.getByText(
            /january|february|march|april|may|june|july|august|september|october|november|december/i
          );
        expect(calendarElement).toBeInTheDocument();
      }, { timeout: 3000 });
      await userEvent.click(document.body); // Close calendar

      // Test End Date picker (should have a pre-selected date)
      const endDateText = dateButtons[1].textContent || "";
      expect(endDateText).not.toBe("Select end date");

      await userEvent.click(dateButtons[1]);
      await waitFor(() => {
        const calendarElement =
          document.querySelector(".rdp") ||
          canvas.getByText(
            /january|february|march|april|may|june|july|august|september|october|november|december/i
          );
        expect(calendarElement).toBeInTheDocument();
      }, { timeout: 3000 });
      await userEvent.click(document.body); // Close calendar

      // Test Disabled Date picker
      expect(dateButtons[2]).toBeDisabled();
      expect(dateButtons[2]).toHaveTextContent("Cannot select");
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
          children: [
            {
              type: "Label",
              htmlFor: "start-date",
              className: "text-sm font-medium mb-2 block",
              children: "Start Date",
            },
            {
              type: "Box",
              id: "start-date",
              children: {
                type: "DatePicker",
                placeholder: "Select start date",
              },
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Label",
              htmlFor: "end-date",
              className: "text-sm font-medium mb-2 block",
              children: "End Date",
            },
            {
              type: "Box",
              id: "end-date",
              children: {
                type: "DatePicker",
                date: new Date(),
                placeholder: "Select end date",
              },
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Label",
              htmlFor: "disabled-date",
              className: "text-sm font-medium mb-2 block",
              children: "Disabled Date",
            },
            {
              type: "Box",
              id: "disabled-date",
              children: {
                type: "DatePicker",
                placeholder: "Cannot select",
                disabled: true,
              },
            },
          ],
        },
      ],
    },
  }
);
