import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./select";

const meta: Meta<typeof Select> = {
  title: "Form Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    value: {
      control: "select",
      options: ["apple", "banana", "cherry", "date", "elderberry"],
      description: "The controlled value of the select",
    },
    defaultValue: {
      control: "select",
      options: ["apple", "banana", "cherry", "date", "elderberry"],
      description: "The default value of the select",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    onValueChange: {
      action: "value changed",
      description: "Called when the selected value changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="date">Date</SelectItem>
        <SelectItem value="elderberry">Elderberry</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check that the select trigger is rendered
    const trigger = canvas.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    
    // Check placeholder is visible
    expect(canvas.getByText('Select a fruit')).toBeInTheDocument();
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="date">Date</SelectItem>
        <SelectItem value="elderberry">Elderberry</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check that the select trigger is rendered
    const trigger = canvas.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    
    // Check that default value is displayed
    expect(canvas.getByText('Banana')).toBeInTheDocument();
    
    // Verify the trigger has the correct value
    expect(trigger).toHaveTextContent('Banana');
  },
};

export const Disabled: Story = {
  render: () => (
    <Select disabled defaultValue="banana">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="date">Date</SelectItem>
        <SelectItem value="elderberry">Elderberry</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check that the select trigger is rendered
    const trigger = canvas.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    
    // Check that it's disabled
    expect(trigger).toBeDisabled();
    
    // Check that default value is still displayed
    expect(canvas.getByText('Banana')).toBeInTheDocument();
    
    // Try to click (should not open)
    await userEvent.click(trigger);
    
    // Verify it remains closed
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const WithDisabledItem: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry" disabled>
          Cherry (Out of stock)
        </SelectItem>
        <SelectItem value="date">Date</SelectItem>
        <SelectItem value="elderberry">Elderberry</SelectItem>
      </SelectContent>
    </Select>
  ),
};

const ControlledSelect = () => {
  const [value, setValue] = React.useState("apple");

  return (
    <div className="space-y-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="elderberry">Elderberry</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">Selected value: {value}</p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSelect />,
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="cucumber">Cucumber</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Meats</SelectLabel>
          <SelectItem value="chicken">Chicken</SelectItem>
          <SelectItem value="beef">Beef</SelectItem>
          <SelectItem value="pork">Pork</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check that the select trigger is rendered
    const trigger = canvas.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    
    // Check placeholder is visible
    expect(canvas.getByText('Select a food')).toBeInTheDocument();
  },
};

export const WithLongContent: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="very-long-option-1">
          This is a very long option that might overflow
        </SelectItem>
        <SelectItem value="very-long-option-2">
          Another extremely long option with lots of text
        </SelectItem>
        <SelectItem value="very-long-option-3">
          Yet another long option to demonstrate scrolling
        </SelectItem>
        <SelectItem value="short">Short option</SelectItem>
        <SelectItem value="very-long-option-4">
          A fourth very long option with descriptive text
        </SelectItem>
        <SelectItem value="very-long-option-5">
          Fifth option with unnecessary amount of text
        </SelectItem>
        <SelectItem value="very-long-option-6">
          Sixth option continuing the pattern of long text
        </SelectItem>
        <SelectItem value="very-long-option-7">
          Seventh option to ensure scrolling is needed
        </SelectItem>
        <SelectItem value="very-long-option-8">
          Eighth option for good measure and testing
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium w-20">Default:</span>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium w-20">Small:</span>
        <Select>
          <SelectTrigger className="w-[180px]" size="sm">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px] border-blue-500 focus:ring-blue-500">
        <SelectValue placeholder="Custom styled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1" className="text-blue-600">
          Blue Option
        </SelectItem>
        <SelectItem value="option2" className="text-green-600">
          Green Option
        </SelectItem>
        <SelectItem value="option3" className="text-red-600">
          Red Option
        </SelectItem>
        <SelectItem value="option4" className="text-purple-600">
          Purple Option
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">
          <span className="flex items-center">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            Active
          </span>
        </SelectItem>
        <SelectItem value="pending">
          <span className="flex items-center">
            <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
            Pending
          </span>
        </SelectItem>
        <SelectItem value="inactive">
          <span className="flex items-center">
            <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />
            Inactive
          </span>
        </SelectItem>
        <SelectItem value="archived">
          <span className="flex items-center">
            <span className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
            Archived
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};
