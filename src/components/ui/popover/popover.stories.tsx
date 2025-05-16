import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { Separator } from "../separator";
import { Calendar } from "lucide-react";

const meta = {
  title: "Components/UI/Popover",
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

export const Basic: Story = {
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
};

export const WithFormElements: Story = {
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
};

export const Placement: Story = {
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
};

export const ComplexContent: Story = {
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
};

export const CustomStyling: Story = {
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
};

export const NestedPopovers: Story = {
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
};

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

export const ControlledState: Story = {
  render: () => <ControlledStateDemo />,
};
