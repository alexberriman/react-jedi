import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test badge renders with correct text
    const badge = canvas.getByText("Default");
    expect(badge).toBeInTheDocument();

    // Test badge structure
    const badgeElement = canvasElement.querySelector('[data-slot="badge"]');
    expect(badgeElement).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all badge variants are rendered
    expect(canvas.getByText("Default")).toBeInTheDocument();
    expect(canvas.getByText("Secondary")).toBeInTheDocument();
    expect(canvas.getByText("Destructive")).toBeInTheDocument();
    expect(canvas.getByText("Outline")).toBeInTheDocument();

    // Test badges are in a flex container
    const container = canvasElement.querySelector(".flex.flex-wrap.gap-2");
    expect(container).toBeInTheDocument();
    expect(container?.children).toHaveLength(4);
  },
};

export const InteractiveBadge: Story = {
  render: () => (
    <a href="/example-page">
      <Badge variant="default">Interactive Badge</Badge>
    </a>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test badge is wrapped in a link
    const link = canvasElement.querySelector('a[href="/example-page"]');
    expect(link).toBeInTheDocument();

    // Test badge text
    const badge = canvas.getByText("Interactive Badge");
    expect(badge).toBeInTheDocument();

    // Test hover interaction
    await user.hover(badge);
    // Badge should be interactive when wrapped in link
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all status badges are rendered
    expect(canvas.getByText("Online")).toBeInTheDocument();
    expect(canvas.getByText("Away")).toBeInTheDocument();
    expect(canvas.getByText("Offline")).toBeInTheDocument();

    // Test status indicators (dots) exist
    const statusDots = canvasElement.querySelectorAll(".h-2.w-2.rounded-full.bg-white");
    expect(statusDots).toHaveLength(3);

    // Test custom colors are applied
    const onlineBadge = canvas.getByText("Online").closest('[data-slot="badge"]');
    expect(onlineBadge).toHaveClass("bg-green-500");
  },
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
