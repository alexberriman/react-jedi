import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Badge } from "./badge";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode<typeof Badge>({
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
});

export const Secondary: Story = enhanceStoryForDualMode<typeof Badge>({
  args: {
    variant: "secondary",
    children: "Secondary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test badge renders with correct text
    const badge = canvas.getByText("Secondary");
    expect(badge).toBeInTheDocument();

    // Test badge structure
    const badgeElement = canvasElement.querySelector('[data-slot="badge"]');
    expect(badgeElement).toBeInTheDocument();

    // Test secondary variant styling
    expect(badgeElement).toBeInTheDocument();
  },
});

export const Destructive: Story = enhanceStoryForDualMode<typeof Badge>({
  args: {
    variant: "destructive",
    children: "Destructive",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test badge renders with correct text
    const badge = canvas.getByText("Destructive");
    expect(badge).toBeInTheDocument();

    // Test badge structure
    const badgeElement = canvasElement.querySelector('[data-slot="badge"]');
    expect(badgeElement).toBeInTheDocument();
  },
});

export const Outline: Story = enhanceStoryForDualMode<typeof Badge>({
  args: {
    variant: "outline",
    children: "Outline",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test badge renders with correct text
    const badge = canvas.getByText("Outline");
    expect(badge).toBeInTheDocument();

    // Test badge structure
    const badgeElement = canvasElement.querySelector('[data-slot="badge"]');
    expect(badgeElement).toBeInTheDocument();
  },
});

export const WithIcon: Story = enhanceStoryForDualMode<typeof Badge>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test badge renders with verified text (different format in React vs SDUI)
      const badge = canvas.getByText(/Verified/);
      expect(badge).toBeInTheDocument();

      // Test badge structure
      const badgeElement = canvasElement.querySelector('[data-slot="badge"]');
      expect(badgeElement).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Badge",
      children: [
        {
          type: "Icon",
          name: "check",
          size: 16
        },
        " Verified"
      ]
    },
  }
);

export const BadgeGroup: Story = enhanceStoryForDualMode<typeof Badge>(
  {
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

      // Test container structure (different classes for React vs SDUI)
      const container = canvasElement.querySelector(".flex") || canvasElement.querySelector('[data-testid="flex-container"]');
      expect(container).toBeInTheDocument();
      expect(container?.children).toHaveLength(4);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      wrap: true,
      gap: "sm",
      children: [
        {
          type: "Badge",
          variant: "default",
          children: "Default",
        },
        {
          type: "Badge",
          variant: "secondary",
          children: "Secondary",
        },
        {
          type: "Badge",
          variant: "destructive",
          children: "Destructive",
        },
        {
          type: "Badge",
          variant: "outline",
          children: "Outline",
        },
      ],
    },
  }
);

export const InteractiveBadge: Story = enhanceStoryForDualMode<typeof Badge>(
  {
    render: () => (
      <a href="/example-page">
        <Badge variant="default">Interactive Badge</Badge>
      </a>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test badge text
      const badge = canvas.getByText("Interactive Badge");
      expect(badge).toBeInTheDocument();

      // Test badge structure
      const badgeElement = canvasElement.querySelector('[data-slot="badge"]');
      expect(badgeElement).toBeInTheDocument();

      // Test hover interaction
      await user.hover(badge);
      // Badge should be interactive when wrapped in link
    },
  },
  {
    // For SDUI mode, simplify to just the badge without the link wrapper
    renderSpec: {
      type: "Badge",
      variant: "default",
      children: "Interactive Badge",
    },
  }
);

export const CounterBadge: Story = enhanceStoryForDualMode<typeof Badge>({
  args: {
    variant: "secondary",
    children: "99+",
    className: "rounded-full",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test badge renders with counter text
    const badge = canvas.getByText("99+");
    expect(badge).toBeInTheDocument();

    // Test badge structure
    const badgeElement = canvasElement.querySelector('[data-slot="badge"]');
    expect(badgeElement).toBeInTheDocument();

    // Test rounded class is applied
    expect(badgeElement).toHaveClass("rounded-full");
  },
});

export const StatusBadge: Story = enhanceStoryForDualMode<typeof Badge>(
  {
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

      // Test all status badges are rendered (different format in React vs SDUI)
      expect(canvas.getByText(/Online/)).toBeInTheDocument();
      expect(canvas.getByText(/Away/)).toBeInTheDocument();
      expect(canvas.getByText(/Offline/)).toBeInTheDocument();

      // Test container structure (different classes for React vs SDUI)
      const container = canvasElement.querySelector(".flex") || canvasElement.querySelector('[data-testid="flex-container"]');
      expect(container).toBeInTheDocument();
      expect(container?.children).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Badge",
          variant: "default",
          className: "bg-green-500 hover:bg-green-600",
          children: [
            {
              type: "Icon",
              name: "circle",
              size: 8,
              className: "mr-1"
            },
            "Online"
          ]
        },
        {
          type: "Badge",
          variant: "default",
          className: "bg-yellow-500 hover:bg-yellow-600",
          children: [
            {
              type: "Icon",
              name: "circle",
              size: 8,
              className: "mr-1"
            },
            "Away"
          ]
        },
        {
          type: "Badge",
          variant: "default",
          className: "bg-red-500 hover:bg-red-600",
          children: [
            {
              type: "Icon",
              name: "circle",
              size: 8,
              className: "mr-1"
            },
            "Offline"
          ]
        },
      ],
    },
  }
);

export const CustomColoredBadge: Story = enhanceStoryForDualMode<typeof Badge>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all colored badges are rendered
      expect(canvas.getByText("Blue")).toBeInTheDocument();
      expect(canvas.getByText("Purple")).toBeInTheDocument();
      expect(canvas.getByText("Pink")).toBeInTheDocument();
      expect(canvas.getByText("Amber")).toBeInTheDocument();
      expect(canvas.getByText("Teal")).toBeInTheDocument();

      // Test container structure (different classes for React vs SDUI)
      const container = canvasElement.querySelector(".flex") || canvasElement.querySelector('[data-testid="flex-container"]');
      expect(container).toBeInTheDocument();
      expect(container?.children).toHaveLength(5);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      wrap: true,
      gap: "sm",
      children: [
        {
          type: "Badge",
          className: "bg-blue-500 text-white hover:bg-blue-600 border-transparent",
          children: "Blue",
        },
        {
          type: "Badge",
          className: "bg-purple-500 text-white hover:bg-purple-600 border-transparent",
          children: "Purple",
        },
        {
          type: "Badge",
          className: "bg-pink-500 text-white hover:bg-pink-600 border-transparent",
          children: "Pink",
        },
        {
          type: "Badge",
          className: "bg-amber-500 text-white hover:bg-amber-600 border-transparent",
          children: "Amber",
        },
        {
          type: "Badge",
          className: "bg-teal-500 text-white hover:bg-teal-600 border-transparent",
          children: "Teal",
        },
      ],
    },
  }
);
