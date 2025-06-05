import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Toggle } from "./toggle";
import { Bold, Italic, Underline, Code, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const meta = {
  title: "Form Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    pressed: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test toggle renders
    const toggle = canvas.getByRole("button", { name: "Toggle" });
    expect(toggle).toBeInTheDocument();

    // Test initial unpressed state
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    // Test clicking to toggle on
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    // Test clicking again to toggle off
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Toggle",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Toggle",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Toggle",
  },
};

export const WithIcon: Story = {
  args: {
    children: <Bold size={16} />,
    "aria-label": "Toggle bold",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test icon toggle renders
    const toggle = canvas.getByRole("button", { name: "Toggle bold" });
    expect(toggle).toBeInTheDocument();

    // Test aria-label is present
    expect(toggle).toHaveAttribute("aria-label", "Toggle bold");

    // Test initial state
    expect(toggle).toHaveAttribute("data-state", "off");

    // Test clicking icon toggle
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");

    // Test icon is present (check for SVG)
    const icon = toggle.querySelector("svg");
    expect(icon).toBeInTheDocument();
  },
};

export const WithIconAndText: Story = {
  args: {
    children: (
      <>
        <Bold size={16} />
        Bold
      </>
    ),
  },
};

export const Pressed: Story = {
  args: {
    pressed: true,
    children: "Pressed Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test toggle renders in pressed state
    const toggle = canvas.getByRole("button", { name: "Pressed Toggle" });
    expect(toggle).toBeInTheDocument();

    // Test initial pressed state (controlled component with pressed={true})
    expect(toggle).toHaveAttribute("data-state", "on");
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    // Note: Since this is a controlled component with pressed={true},
    // clicking won't change the state without an onPressedChange handler
    // So we just verify the initial state is correct
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test disabled toggle
    const toggle = canvas.getByRole("button", { name: "Disabled Toggle" });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toBeDisabled();

    // Test disabled attribute
    expect(toggle).toHaveAttribute("disabled");

    // Test initial state
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};

export const ToolbarExample: Story = {
  render: () => (
    <div className="flex gap-1">
      <Toggle variant="outline" aria-label="Toggle bold">
        <Bold size={16} />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic size={16} />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <Underline size={16} />
      </Toggle>
      <div className="mx-1 h-8 w-px bg-border" />
      <Toggle variant="outline" aria-label="Toggle code">
        <Code size={16} />
      </Toggle>
    </div>
  ),
};

export const AlignmentGroup: Story = {
  render: () => (
    <div className="flex gap-1">
      <Toggle variant="outline" pressed aria-label="Align left">
        <AlignLeft size={16} />
      </Toggle>
      <Toggle variant="outline" aria-label="Align center">
        <AlignCenter size={16} />
      </Toggle>
      <Toggle variant="outline" aria-label="Align right">
        <AlignRight size={16} />
      </Toggle>
    </div>
  ),
};

export const VariantsShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Toggle>Default</Toggle>
        <Toggle variant="outline">Outline</Toggle>
      </div>
      <div className="flex gap-2">
        <Toggle size="sm">Small</Toggle>
        <Toggle size="default">Default</Toggle>
        <Toggle size="lg">Large</Toggle>
      </div>
      <div className="flex gap-2">
        <Toggle pressed>Pressed</Toggle>
        <Toggle disabled>Disabled</Toggle>
      </div>
    </div>
  ),
};
