import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style of the badge",
    },
    asChild: {
      control: "boolean",
      description: "Whether to render the badge as a child component",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
    children: {
      control: "text",
      description: "The content of the badge",
    },
  },
  args: {
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        Verified
      </>
    ),
  },
};

export const BadgeGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const InteractiveBadge: Story = {
  render: () => (
    <a href="/example-page">
      <Badge variant="default">Interactive Badge</Badge>
    </a>
  ),
};

export const CounterBadge: Story = {
  args: {
    variant: "secondary",
    children: "99+",
    className: "rounded-full",
  },
};

export const StatusBadge: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
        <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
        Online
      </Badge>
      <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
        <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
        Away
      </Badge>
      <Badge variant="default" className="bg-red-500 hover:bg-red-600">
        <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
        Offline
      </Badge>
    </div>
  ),
};

export const CustomColoredBadge: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-500 text-white hover:bg-blue-600 border-transparent">Blue</Badge>
      <Badge className="bg-purple-500 text-white hover:bg-purple-600 border-transparent">
        Purple
      </Badge>
      <Badge className="bg-pink-500 text-white hover:bg-pink-600 border-transparent">Pink</Badge>
      <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-transparent">Amber</Badge>
      <Badge className="bg-teal-500 text-white hover:bg-teal-600 border-transparent">Teal</Badge>
    </div>
  ),
};
