import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Button } from "../button";
import { InfoIcon, Plus, Settings, TrendingUp } from "lucide-react";
import { within, userEvent, waitFor, expect, screen } from "@storybook/test";

const meta = {
  title: "Components/Overlay/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip component that displays helpful information on hover or focus. Based on Radix UI Tooltip.",
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a helpful tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: "Hover me" });
    expect(trigger).toBeInTheDocument();

    await userEvent.hover(trigger);

    await waitFor(
      () => {
        expect(screen.getByText("This is a helpful tooltip")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Learn more about this feature</p>
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button");
    expect(trigger).toBeInTheDocument();

    await userEvent.hover(trigger);

    await waitFor(
      () => {
        expect(screen.getByText("Learn more about this feature")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const MultiplePlacement: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const topButton = canvas.getByRole("button", { name: "Top" });
    expect(topButton).toBeInTheDocument();

    await userEvent.hover(topButton);

    await waitFor(
      () => {
        expect(screen.getByText("Tooltip on top")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Detailed Info</Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-2">
          <p className="font-semibold">Pro Tip</p>
          <p className="text-sm">
            This tooltip can contain multiple lines of content, including rich text, formatting, and
            even small components when needed.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: "Detailed Info" });
    expect(trigger).toBeInTheDocument();

    await userEvent.hover(trigger);

    await waitFor(
      () => {
        expect(screen.getByText("Pro Tip")).toBeInTheDocument();
        expect(screen.getByText(/multiple lines of content/)).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Custom Styled</Button>
      </TooltipTrigger>
      <TooltipContent className="bg-blue-600 text-white">
        <p>Custom colored tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: "Custom Styled" });
    expect(trigger).toBeInTheDocument();

    await userEvent.hover(trigger);

    await waitFor(
      () => {
        expect(screen.getByText("Custom colored tooltip")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const WithAlignment: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start">
          <p>Aligned to start</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          <p>Aligned to center</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Align End</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          <p>Aligned to end</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const startButton = canvas.getByRole("button", { name: "Align Start" });
    expect(startButton).toBeInTheDocument();

    await userEvent.hover(startButton);

    await waitFor(
      () => {
        expect(screen.getByText("Aligned to start")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const WithDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={800}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Wait for it...</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip has a custom delay</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: "Wait for it..." });
    expect(trigger).toBeInTheDocument();

    await userEvent.hover(trigger);

    await waitFor(
      () => {
        expect(screen.getByText("This tooltip has a custom delay")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const Complex: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add new item</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost">
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost">
            <TrendingUp className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">Analytics</p>
            <p className="text-xs text-muted-foreground">View detailed performance metrics</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole("button");
    expect(buttons).toHaveLength(3);

    // Test the first button (Plus icon)
    await userEvent.hover(buttons[0]);

    await waitFor(
      () => {
        expect(screen.getByText("Add new item")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};

export const Accessible: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tooltip is accessible via keyboard. Try tabbing to the button and press focus it.
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Tab to focus me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip appears on focus too!</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: "Tab to focus me" });
    expect(trigger).toBeInTheDocument();

    // Test focus accessibility
    trigger.focus();

    await waitFor(
      () => {
        expect(screen.getByText("This tooltip appears on focus too!")).toBeInTheDocument();
      },
      { timeout: 10_000 }
    );
  },
};
