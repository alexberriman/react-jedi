import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Button } from "../button";
import { InfoIcon, Plus, Settings, TrendingUp } from "lucide-react";
import { within, userEvent, waitFor, expect } from "storybook/test";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Components/Tooltip",
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
      <TooltipProvider delayDuration={0}>
        <Story />
      </TooltipProvider>
    ),
  ],

  tags: ["autodocs", "ui-tooltip"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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
          const tooltips = within(document.body).queryAllByText("This is a helpful tooltip");
          expect(tooltips.length).toBeGreaterThan(0);
          expect(tooltips[0]).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "TooltipProvider",
      props: { delayDuration: 0 },
      children: [
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "outline",
                  children: "Hover me",
                },
              ],
            },
            {
              type: "TooltipContent",
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "This is a helpful tooltip",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithIcon: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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
          const tooltips = within(document.body).queryAllByText("Learn more about this feature");
          expect(tooltips.length).toBeGreaterThan(0);
          expect(tooltips[0]).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "TooltipProvider",
      props: { delayDuration: 0 },
      children: [
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "ghost",
                  size: "icon",
                  children: "ℹ️",
                },
              ],
            },
            {
              type: "TooltipContent",
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Learn more about this feature",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const MultiplePlacement: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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
          const tooltips = within(document.body).queryAllByText("Tooltip on top");
          expect(tooltips.length).toBeGreaterThan(0);
          expect(tooltips[0]).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Grid",
      cols: 3,
      gap: "xl",
      className: "p-8",
      children: [
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "outline",
                  children: "Top",
                },
              ],
            },
            {
              type: "TooltipContent",
              props: { side: "top" },
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Tooltip on top",
                },
              ],
            },
          ],
        },
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "outline",
                  children: "Right",
                },
              ],
            },
            {
              type: "TooltipContent",
              props: { side: "right" },
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Tooltip on right",
                },
              ],
            },
          ],
        },
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "outline",
                  children: "Bottom",
                },
              ],
            },
            {
              type: "TooltipContent",
              props: { side: "bottom" },
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Tooltip on bottom",
                },
              ],
            },
          ],
        },
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "outline",
                  children: "Left",
                },
              ],
            },
            {
              type: "TooltipContent",
              props: { side: "left" },
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Tooltip on left",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const LongContent: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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
          const proTipTooltips = within(document.body).queryAllByText("Pro Tip");
          expect(proTipTooltips.length).toBeGreaterThan(0);
          expect(proTipTooltips[0]).toBeInTheDocument();
          const contentTooltips = within(document.body).queryAllByText(/multiple lines of content/);
          expect(contentTooltips.length).toBeGreaterThan(0);
          expect(contentTooltips[0]).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "TooltipProvider",
      props: { delayDuration: 0 },
      children: [
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  children: "Detailed Info",
                },
              ],
            },
            {
              type: "TooltipContent",
              children: [
                {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Text",
                      element: "p",
                      weight: "semibold",
                      children: "Pro Tip",
                    },
                    {
                      type: "Text",
                      element: "p",
                      size: "sm",
                      children:
                        "This tooltip can contain multiple lines of content, including rich text, formatting, and even small components when needed.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const CustomStyling: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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
          const tooltips = within(document.body).queryAllByText("Custom colored tooltip");
          expect(tooltips.length).toBeGreaterThan(0);
          expect(tooltips[0]).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "TooltipProvider",
      props: { delayDuration: 0 },
      children: [
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "secondary",
                  children: "Custom Styled",
                },
              ],
            },
            {
              type: "TooltipContent",
              props: { className: "bg-blue-600 text-white" },
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Custom colored tooltip",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithAlignment: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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
          const tooltips = within(document.body).queryAllByText("Aligned to start");
          expect(tooltips.length).toBeGreaterThan(0);
          expect(tooltips[0]).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "TooltipProvider",
      props: { delayDuration: 0 },
      children: [
        {
          type: "Grid",
          cols: 3,
          gap: "xl",
          className: "p-8",
          children: [
            {
              type: "Tooltip",
              children: [
                {
                  type: "TooltipTrigger",
                  props: { asChild: true },
                  children: [
                    {
                      type: "Button",
                      variant: "outline",
                      children: "Align Start",
                },
              ],
            },
            {
              type: "TooltipContent",
              props: { side: "bottom", align: "start" },
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Aligned to start",
                },
              ],
            },
          ],
        },
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "outline",
                  children: "Align Center",
                },
              ],
            },
            {
              type: "TooltipContent",
              props: { side: "bottom", align: "center" },
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Aligned to center",
                },
              ],
            },
          ],
        },
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "outline",
                  children: "Align End",
                },
              ],
            },
            {
              type: "TooltipContent",
              props: { side: "bottom", align: "end" },
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Aligned to end",
                },
              ],
            },
          ],
        },
      ],
    },
      ],
    },
  }
);

export const WithDelay: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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
          const tooltips = within(document.body).queryAllByText("This tooltip has a custom delay");
          expect(tooltips.length).toBeGreaterThan(0);
          expect(tooltips[0]).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );
    },
  },
  {
    renderSpec: {
      type: "TooltipProvider",
      props: { delayDuration: 800 },
      children: [
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  variant: "outline",
                  children: "Wait for it...",
                },
              ],
            },
            {
              type: "TooltipContent",
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "This tooltip has a custom delay",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const Complex: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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

      // Wait a bit for tooltip to appear
      await new Promise((resolve) => globalThis.setTimeout(resolve, 200));

      await waitFor(
        () => {
          const tooltips = within(document.body).queryAllByText("Add new item");
          expect(tooltips.length).toBeGreaterThan(0);
          expect(tooltips[0]).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "TooltipProvider",
      props: { delayDuration: 0 },
      children: [
        {
          type: "Flex",
          gap: "md",
          children: [
            {
              type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  size: "icon",
                  variant: "ghost",
                  children: "➕",
                },
              ],
            },
            {
              type: "TooltipContent",
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Add new item",
                },
              ],
            },
          ],
        },
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  size: "icon",
                  variant: "ghost",
                  children: "⚙️",
                },
              ],
            },
            {
              type: "TooltipContent",
              children: [
                {
                  type: "Text",
                  element: "p",
                  children: "Settings",
                },
              ],
            },
          ],
        },
        {
          type: "Tooltip",
          children: [
            {
              type: "TooltipTrigger",
              props: { asChild: true },
              children: [
                {
                  type: "Button",
                  size: "icon",
                  variant: "ghost",
                  children: "📈",
                },
              ],
            },
            {
              type: "TooltipContent",
              children: [
                {
                  type: "Flex",
                  direction: "column",
                  gap: "xs",
                  children: [
                    {
                      type: "Text",
                      element: "p",
                      weight: "semibold",
                      children: "Analytics",
                    },
                    {
                      type: "Text",
                      element: "p",
                      size: "xs",
                      variant: "muted",
                      children: "View detailed performance metrics",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
      ],
    },
  }
);

export const Accessible: Story = enhanceStoryForDualMode<typeof Tooltip>(
  {
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
      await userEvent.tab();

      // Wait a bit for tooltip to appear
      await new Promise((resolve) => globalThis.setTimeout(resolve, 100));

      await waitFor(
        () => {
          const tooltips = within(document.body).queryAllByText("This tooltip appears on focus too!");
          expect(tooltips.length).toBeGreaterThan(0);
          expect(tooltips[0]).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "TooltipProvider",
      props: { delayDuration: 0 },
      children: [
        {
          type: "Flex",
          direction: "column",
          gap: "md",
          children: [
            {
              type: "Text",
              element: "p",
              size: "sm",
              variant: "muted",
              children: "Tooltip is accessible via keyboard. Try tabbing to the button and press focus it.",
            },
            {
              type: "Tooltip",
              children: [
                {
                  type: "TooltipTrigger",
                  props: { asChild: true },
                  children: [
                    {
                      type: "Button",
                      children: "Tab to focus me",
                    },
                  ],
                },
                {
                  type: "TooltipContent",
                  children: [
                    {
                      type: "Text",
                      element: "p",
                      children: "This tooltip appears on focus too!",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
);
