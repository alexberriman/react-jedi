import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./toggle";
import { Bold, Italic, Underline, Code, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const meta = {
  title: "Components/Form/Toggle",
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
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Toggle",
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
