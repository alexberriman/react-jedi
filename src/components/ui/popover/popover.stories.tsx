import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { Separator } from "../separator";
import { Calendar } from "lucide-react";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A floating container component that displays content on top of the main page content.
Perfect for tooltips, dropdowns, or any content that should appear contextually.

Features:
- Multiple position placements
- Focus management
- Keyboard navigation support
- Customizable styling
- Smooth animations
        `,
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm">This is a basic popover with some content.</p>
        </PopoverContent>
      </Popover>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test trigger button is rendered
      const triggerButton = canvas.getByRole("button", { name: "Open Popover" });
      expect(triggerButton).toBeInTheDocument();

      // Test clicking opens popover
      await user.click(triggerButton);

      // Wait for popover content to appear (it might be in a portal)
      await waitFor(() => {
        const popoverContent = document.body.querySelector('[role="dialog"]');
        expect(popoverContent).toBeInTheDocument();
        expect(popoverContent).toHaveTextContent("This is a basic popover with some content.");
      });

      // Test Escape key closes popover
      await user.keyboard("{Escape}");
      await waitFor(
        () => {
          const popoverContent = document.body.querySelector('[role="dialog"]');
          expect(popoverContent).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Popover",
      children: [
        {
          type: "PopoverTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Open Popover",
          },
        },
        {
          type: "PopoverContent",
          children: {
            type: "Text",
            className: "text-sm",
            children: "This is a basic popover with some content.",
          },
        },
      ],
    },
  }
);

export const WithFormElements: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Update dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test trigger button
      const triggerButton = canvas.getByRole("button", { name: "Update dimensions" });
      expect(triggerButton).toBeInTheDocument();

      // Open popover
      await user.click(triggerButton);

      // Wait for popover to appear
      await waitFor(() => {
        const popoverContent = document.body.querySelector('[role="dialog"]');
        expect(popoverContent).toBeInTheDocument();
      });

      // Find form elements in the popover
      const popoverContent = document.body.querySelector('[role="dialog"]');
      const popoverWithin = within(popoverContent as HTMLElement);

      const widthInput = popoverWithin.getByLabelText("Width");
      const maxWidthInput = popoverWithin.getByLabelText("Max. width");
      const heightInput = popoverWithin.getByLabelText("Height");
      const maxHeightInput = popoverWithin.getByLabelText("Max. height");

      expect(widthInput).toBeInTheDocument();
      expect(maxWidthInput).toBeInTheDocument();
      expect(heightInput).toBeInTheDocument();
      expect(maxHeightInput).toBeInTheDocument();

      // Test default values
      expect(widthInput).toHaveValue("100%");
      expect(maxWidthInput).toHaveValue("300px");
      expect(heightInput).toHaveValue("25px");
      expect(maxHeightInput).toHaveValue("none");

      // Test typing in input
      await user.clear(widthInput);
      await user.type(widthInput, "200px");
      expect(widthInput).toHaveValue("200px");
    },
  },
  {
    renderSpec: {
      type: "Popover",
      children: [
        {
          type: "PopoverTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "secondary",
            children: "Update dimensions",
          },
        },
        {
          type: "PopoverContent",
          className: "w-80",
          children: {
            type: "Grid",
            gap: "md",
            children: [
              {
                type: "Flex",
                direction: "column",
                gap: "sm",
                children: [
                  {
                    type: "Heading",
                    level: "h4",
                    className: "font-medium leading-none",
                    children: "Dimensions",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-muted-foreground",
                    children: "Set the dimensions for the layer.",
                  },
                ],
              },
              {
                type: "Grid",
                gap: "sm",
                children: [
                  {
                    type: "Grid",
                    className: "grid-cols-3 items-center gap-4",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "width",
                        children: "Width",
                      },
                      {
                        type: "Input",
                        id: "width",
                        defaultValue: "100%",
                        className: "col-span-2 h-8",
                      },
                    ],
                  },
                  {
                    type: "Grid",
                    className: "grid-cols-3 items-center gap-4",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "maxWidth",
                        children: "Max. width",
                      },
                      {
                        type: "Input",
                        id: "maxWidth",
                        defaultValue: "300px",
                        className: "col-span-2 h-8",
                      },
                    ],
                  },
                  {
                    type: "Grid",
                    className: "grid-cols-3 items-center gap-4",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "height",
                        children: "Height",
                      },
                      {
                        type: "Input",
                        id: "height",
                        defaultValue: "25px",
                        className: "col-span-2 h-8",
                      },
                    ],
                  },
                  {
                    type: "Grid",
                    className: "grid-cols-3 items-center gap-4",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "maxHeight",
                        children: "Max. height",
                      },
                      {
                        type: "Input",
                        id: "maxHeight",
                        defaultValue: "none",
                        className: "col-span-2 h-8",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  }
);

export const Placement: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <div className="grid grid-cols-3 gap-4 w-96">
        <div />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Top
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <p className="text-sm">Top placement</p>
          </PopoverContent>
        </Popover>
        <div />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Left
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left">
            <p className="text-sm">Left placement</p>
          </PopoverContent>
        </Popover>
        <div />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Right
            </Button>
          </PopoverTrigger>
          <PopoverContent side="right">
            <p className="text-sm">Right placement</p>
          </PopoverContent>
        </Popover>

        <div />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Bottom
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom">
            <p className="text-sm">Bottom placement</p>
          </PopoverContent>
        </Popover>
        <div />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all placement buttons are rendered
      expect(canvas.getByRole("button", { name: "Top" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Left" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Right" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Bottom" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Grid",
      className: "grid-cols-3 gap-4 w-96",
      children: [
        { type: "Box", children: [] },
        {
          type: "Popover",
          children: [
            {
              type: "PopoverTrigger",
              asChild: true,
              children: {
                type: "Button",
                variant: "outline",
                size: "sm",
                children: "Top",
              },
            },
            {
              type: "PopoverContent",
              side: "top",
              children: {
                type: "Text",
                className: "text-sm",
                children: "Top placement",
              },
            },
          ],
        },
        { type: "Box", children: [] },
        {
          type: "Popover",
          children: [
            {
              type: "PopoverTrigger",
              asChild: true,
              children: {
                type: "Button",
                variant: "outline",
                size: "sm",
                children: "Left",
              },
            },
            {
              type: "PopoverContent",
              side: "left",
              children: {
                type: "Text",
                className: "text-sm",
                children: "Left placement",
              },
            },
          ],
        },
        { type: "Box", children: [] },
        {
          type: "Popover",
          children: [
            {
              type: "PopoverTrigger",
              asChild: true,
              children: {
                type: "Button",
                variant: "outline",
                size: "sm",
                children: "Right",
              },
            },
            {
              type: "PopoverContent",
              side: "right",
              children: {
                type: "Text",
                className: "text-sm",
                children: "Right placement",
              },
            },
          ],
        },
        { type: "Box", children: [] },
        {
          type: "Popover",
          children: [
            {
              type: "PopoverTrigger",
              asChild: true,
              children: {
                type: "Button",
                variant: "outline",
                size: "sm",
                children: "Bottom",
              },
            },
            {
              type: "PopoverContent",
              side: "bottom",
              children: {
                type: "Text",
                className: "text-sm",
                children: "Bottom placement",
              },
            },
          ],
        },
        { type: "Box", children: [] },
      ],
    },
  }
);

export const ComplexContent: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="default">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Event
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Schedule a Meeting</h3>
              <p className="text-sm text-muted-foreground">Choose a time that works best for you</p>
            </div>
            <Separator />
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <span className="text-muted-foreground mr-2">⏰</span>
                9:00 AM - 10:00 AM
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span className="text-muted-foreground mr-2">⏰</span>
                2:00 PM - 3:00 PM
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span className="text-muted-foreground mr-2">⏰</span>
                4:00 PM - 5:00 PM
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input id="notes" placeholder="Any special requirements?" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
              <Button size="sm">Confirm</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test trigger button is rendered
      const triggerButton = canvas.getByRole("button", { name: /Schedule Event/i });
      expect(triggerButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Popover",
      children: [
        {
          type: "PopoverTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "default",
            children: "📅 Schedule Event",
          },
        },
        {
          type: "PopoverContent",
          className: "w-96",
          children: {
            type: "Flex",
            direction: "column",
            gap: "md",
            children: [
              {
                type: "Flex",
                direction: "column",
                children: [
                  {
                    type: "Heading",
                    level: "h3",
                    className: "text-lg font-semibold",
                    children: "Schedule a Meeting",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-muted-foreground",
                    children: "Choose a time that works best for you",
                  },
                ],
              },
              {
                type: "Separator",
              },
              {
                type: "Flex",
                direction: "column",
                gap: "sm",
                children: [
                  {
                    type: "Button",
                    variant: "outline",
                    className: "w-full justify-start",
                    children: "⏰ 9:00 AM - 10:00 AM",
                  },
                  {
                    type: "Button",
                    variant: "outline",
                    className: "w-full justify-start",
                    children: "⏰ 2:00 PM - 3:00 PM",
                  },
                  {
                    type: "Button",
                    variant: "outline",
                    className: "w-full justify-start",
                    children: "⏰ 4:00 PM - 5:00 PM",
                  },
                ],
              },
              {
                type: "Separator",
              },
              {
                type: "Flex",
                direction: "column",
                gap: "sm",
                children: [
                  {
                    type: "Label",
                    htmlFor: "notes",
                    children: "Additional Notes",
                  },
                  {
                    type: "Input",
                    id: "notes",
                    placeholder: "Any special requirements?",
                  },
                ],
              },
              {
                type: "Flex",
                justify: "end",
                gap: "sm",
                children: [
                  {
                    type: "Button",
                    variant: "ghost",
                    size: "sm",
                    children: "Cancel",
                  },
                  {
                    type: "Button",
                    size: "sm",
                    children: "Confirm",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  }
);

export const CustomStyling: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Styled Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="space-y-2">
            <h4 className="font-medium text-purple-900">Custom Styled Popover</h4>
            <p className="text-sm text-purple-700">
              This popover has custom styling applied using Tailwind CSS classes.
            </p>
            <div className="pt-2">
              <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Action Button
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test trigger button is rendered
      const triggerButton = canvas.getByRole("button", { name: "Styled Popover" });
      expect(triggerButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Popover",
      children: [
        {
          type: "PopoverTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "ghost",
            className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
            children: "Styled Popover",
          },
        },
        {
          type: "PopoverContent",
          className: "w-80 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200",
          children: {
            type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              {
                type: "Heading",
                level: "h4",
                className: "font-medium text-purple-900",
                children: "Custom Styled Popover",
              },
              {
                type: "Text",
                className: "text-sm text-purple-700",
                children: "This popover has custom styling applied using Tailwind CSS classes.",
              },
              {
                type: "Box",
                className: "pt-2",
                children: {
                  type: "Button",
                  size: "sm",
                  className: "w-full bg-gradient-to-r from-purple-500 to-pink-500",
                  children: "Action Button",
                },
              },
            ],
          },
        },
      ],
    },
  }
);

export const NestedPopovers: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open First Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <p className="text-sm">This is the first popover</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="secondary">
                  Open Nested
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right">
                <p className="text-sm">This is a nested popover!</p>
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Popover>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test trigger button is rendered
      const triggerButton = canvas.getByRole("button", { name: "Open First Popover" });
      expect(triggerButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Popover",
      children: [
        {
          type: "PopoverTrigger",
          asChild: true,
          children: {
            type: "Button",
            children: "Open First Popover",
          },
        },
        {
          type: "PopoverContent",
          children: {
            type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              {
                type: "Text",
                className: "text-sm",
                children: "This is the first popover",
              },
              {
                type: "Popover",
                children: [
                  {
                    type: "PopoverTrigger",
                    asChild: true,
                    children: {
                      type: "Button",
                      size: "sm",
                      variant: "secondary",
                      children: "Open Nested",
                    },
                  },
                  {
                    type: "PopoverContent",
                    side: "right",
                    children: {
                      type: "Text",
                      className: "text-sm",
                      children: "This is a nested popover!",
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  }
);

// Create a component for the controlled state story
function ControlledStateDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button onClick={() => setOpen(true)} variant="outline">
          Open Popover
        </Button>
        <Button onClick={() => setOpen(false)} variant="outline">
          Close Popover
        </Button>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button>Controlled Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <p className="text-sm">This popover is controlled by state.</p>
            <p className="text-sm text-muted-foreground">Open: {open ? "Yes" : "No"}</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Note: This story uses React hooks and controlled state which cannot be directly
// translated to SDUI JSON specifications. Similar to DropdownMenu and ContextMenu,
// this story is incompatible with dual-mode testing.
export const ControlledState: Story = {
  render: () => <ControlledStateDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test control buttons
    const openButton = canvas.getByRole("button", { name: "Open Popover" });
    const closeButton = canvas.getByRole("button", { name: "Close Popover" });
    const triggerButton = canvas.getByRole("button", { name: "Controlled Popover" });

    expect(openButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(triggerButton).toBeInTheDocument();

    // Test opening via control button
    await user.click(openButton);
    await waitFor(() => {
      const popoverContent = document.body.querySelector('[role="dialog"]');
      expect(popoverContent).toBeInTheDocument();
      expect(popoverContent).toHaveTextContent("Open: Yes");
    });

    // Test closing via control button
    await user.click(closeButton);
    await waitFor(
      () => {
        const popoverContent = document.body.querySelector('[role="dialog"]');
        expect(popoverContent).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Small delay to ensure popover is fully closed
    await new Promise((resolve) => globalThis.setTimeout(resolve, 100));

    // Test opening via trigger
    await user.click(triggerButton);
    await waitFor(() => {
      const popoverContent = document.body.querySelector('[role="dialog"]');
      expect(popoverContent).toBeInTheDocument();
      expect(popoverContent).toHaveTextContent("Open: Yes");
    });
  },
};
