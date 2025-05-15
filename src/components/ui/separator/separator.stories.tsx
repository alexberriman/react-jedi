import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
    decorative: {
      control: { type: "boolean" },
      description: "Whether the separator is decorative or semantic",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  render: (args) => (
    <div className="w-[300px]">
      <div className="text-lg font-medium">Content Above</div>
      <Separator {...args} className="my-4" />
      <div className="text-lg font-medium">Content Below</div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    decorative: true,
  },
  render: (args) => (
    <div className="flex h-32 items-center">
      <div className="text-lg font-medium">Left</div>
      <Separator {...args} className="mx-4 h-full" />
      <div className="text-lg font-medium">Right</div>
    </div>
  ),
};

export const CustomStyle: Story = {
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  render: (args) => (
    <div className="w-[300px]">
      <div className="text-lg font-medium">Gradient Separator</div>
      <Separator
        {...args}
        className="my-4 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      />
      <div className="text-lg font-medium">Content Below</div>
    </div>
  ),
};

export const Dotted: Story = {
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  render: (args) => (
    <div className="w-[300px]">
      <div className="text-lg font-medium">Dotted Separator</div>
      <Separator
        {...args}
        className="my-4 border-t-2 border-dotted border-gray-300 bg-transparent"
      />
      <div className="text-lg font-medium">Content Below</div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <div className="flex items-center gap-2">
        <Separator {...args} className="flex-1" />
        <span className="text-sm font-medium text-gray-500">OR</span>
        <Separator {...args} className="flex-1" />
      </div>
    </div>
  ),
};
