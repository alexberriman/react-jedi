import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "./sheet";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Sheet>(
  {
    render: () => (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>
              This is a sheet description. Sheets are used for tasks that don&apos;t require the user
              to leave the current page.
            </SheetDescription>
          </SheetHeader>
          <p>Sheet content goes here.</p>
        </SheetContent>
      </Sheet>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Check that the trigger button is rendered
      const trigger = canvas.getByRole("button", { name: "Open Sheet" });
      expect(trigger).toBeInTheDocument();

      // Click to open the sheet
      await user.click(trigger);

      // Wait for sheet to open and check that the sheet content is visible
      // Use screen instead of canvas since sheet renders in a portal
      await waitFor(() => {
        expect(within(document.body).getByText("Sheet Title")).toBeInTheDocument();
      });
      expect(within(document.body).getByText(/This is a sheet description/)).toBeInTheDocument();
      expect(within(document.body).getByText("Sheet content goes here.")).toBeInTheDocument();

      // Check that close button is present
      const closeButton = within(document.body).getByRole("button", { name: "Close" });
      expect(closeButton).toBeInTheDocument();

      // Close the sheet
      await user.click(closeButton);

      // Verify sheet is closed (content no longer visible)
      await waitFor(
        () => {
          expect(within(document.body).queryByText("Sheet Title")).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Small delay to ensure sheet is fully closed
      await new Promise((resolve) => globalThis.setTimeout(resolve, 100));
    },
  },
  {
    renderSpec: {
      type: "Sheet",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Open Sheet",
          },
        },
        {
          type: "SheetContent",
          children: [
            {
              type: "SheetHeader",
              children: [
                {
                  type: "SheetTitle",
                  children: "Sheet Title",
                },
                {
                  type: "SheetDescription",
                  children: "This is a sheet description. Sheets are used for tasks that don't require the user to leave the current page.",
                },
              ],
            },
            {
              type: "Text",
              children: "Sheet content goes here.",
            },
          ],
        },
      ],
    },
  }
);

export const WithForm: Story = enhanceStoryForDualMode<typeof Sheet>(
  {
    render: () => (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Edit Profile</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" defaultValue="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Click to open the sheet
      const trigger = canvas.getByRole("button", { name: "Edit Profile" });
      await user.click(trigger);

      // Wait for sheet to open and check that the form is rendered
      // Use screen since sheet renders in a portal
      await waitFor(() => {
        expect(within(document.body).getByText("Edit profile")).toBeInTheDocument();
      });
      expect(within(document.body).getByLabelText("Name")).toBeInTheDocument();
      expect(within(document.body).getByLabelText("Username")).toBeInTheDocument();

      // Check that inputs have default values
      const nameInput = within(document.body).getByLabelText("Name") as HTMLInputElement;
      const usernameInput = within(document.body).getByLabelText("Username") as HTMLInputElement;
      expect(nameInput.value).toBe("Pedro Duarte");
      expect(usernameInput.value).toBe("@peduarte");

      // Check save button is present
      const saveButton = within(document.body).getByRole("button", { name: "Save changes" });
      expect(saveButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Sheet",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            children: "Edit Profile",
          },
        },
        {
          type: "SheetContent",
          children: [
            {
              type: "SheetHeader",
              children: [
                {
                  type: "SheetTitle",
                  children: "Edit profile",
                },
                {
                  type: "SheetDescription",
                  children: "Make changes to your profile here. Click save when you're done.",
                },
              ],
            },
            {
              type: "Box",
              className: "grid gap-4",
              children: [
                {
                  type: "Box",
                  className: "grid grid-cols-4 items-center gap-4",
                  children: [
                    {
                      type: "Label",
                      htmlFor: "name",
                      className: "text-right",
                      children: "Name",
                    },
                    {
                      type: "Input",
                      id: "name",
                      defaultValue: "Pedro Duarte",
                      className: "col-span-3",
                    },
                  ],
                },
                {
                  type: "Box",
                  className: "grid grid-cols-4 items-center gap-4",
                  children: [
                    {
                      type: "Label",
                      htmlFor: "username",
                      className: "text-right",
                      children: "Username",
                    },
                    {
                      type: "Input",
                      id: "username",
                      defaultValue: "@peduarte",
                      className: "col-span-3",
                    },
                  ],
                },
              ],
            },
            {
              type: "SheetFooter",
              children: {
                type: "SheetClose",
                asChild: true,
                children: {
                  type: "Button",
                  children: "Save changes",
                },
              },
            },
          ],
        },
      ],
    },
  }
);

export const Positions: Story = enhanceStoryForDualMode<typeof Sheet>(
  {
    render: () => (
      <div className="grid grid-cols-2 gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open from Left</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Left Sheet</SheetTitle>
              <SheetDescription>This sheet slides in from the left.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open from Right</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Right Sheet</SheetTitle>
              <SheetDescription>This sheet slides in from the right (default).</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open from Top</Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Top Sheet</SheetTitle>
              <SheetDescription>This sheet slides in from the top.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open from Bottom</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Bottom Sheet</SheetTitle>
              <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all position buttons render
      const leftButton = canvas.getByRole("button", { name: "Open from Left" });
      const rightButton = canvas.getByRole("button", { name: "Open from Right" });
      const topButton = canvas.getByRole("button", { name: "Open from Top" });
      const bottomButton = canvas.getByRole("button", { name: "Open from Bottom" });

      expect(leftButton).toBeInTheDocument();
      expect(rightButton).toBeInTheDocument();
      expect(topButton).toBeInTheDocument();
      expect(bottomButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Grid",
      columns: 2,
      gap: "md",
      children: [
        {
          type: "Sheet",
          children: [
            {
              type: "SheetTrigger",
              asChild: true,
              children: {
                type: "Button",
                variant: "outline",
                children: "Open from Left",
              },
            },
            {
              type: "SheetContent",
              side: "left",
              children: {
                type: "SheetHeader",
                children: [
                  {
                    type: "SheetTitle",
                    children: "Left Sheet",
                  },
                  {
                    type: "SheetDescription",
                    children: "This sheet slides in from the left.",
                  },
                ],
              },
            },
          ],
        },
        {
          type: "Sheet",
          children: [
            {
              type: "SheetTrigger",
              asChild: true,
              children: {
                type: "Button",
                variant: "outline",
                children: "Open from Right",
              },
            },
            {
              type: "SheetContent",
              side: "right",
              children: {
                type: "SheetHeader",
                children: [
                  {
                    type: "SheetTitle",
                    children: "Right Sheet",
                  },
                  {
                    type: "SheetDescription",
                    children: "This sheet slides in from the right (default).",
                  },
                ],
              },
            },
          ],
        },
        {
          type: "Sheet",
          children: [
            {
              type: "SheetTrigger",
              asChild: true,
              children: {
                type: "Button",
                variant: "outline",
                children: "Open from Top",
              },
            },
            {
              type: "SheetContent",
              side: "top",
              children: {
                type: "SheetHeader",
                children: [
                  {
                    type: "SheetTitle",
                    children: "Top Sheet",
                  },
                  {
                    type: "SheetDescription",
                    children: "This sheet slides in from the top.",
                  },
                ],
              },
            },
          ],
        },
        {
          type: "Sheet",
          children: [
            {
              type: "SheetTrigger",
              asChild: true,
              children: {
                type: "Button",
                variant: "outline",
                children: "Open from Bottom",
              },
            },
            {
              type: "SheetContent",
              side: "bottom",
              children: {
                type: "SheetHeader",
                children: [
                  {
                    type: "SheetTitle",
                    children: "Bottom Sheet",
                  },
                  {
                    type: "SheetDescription",
                    children: "This sheet slides in from the bottom.",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  }
);

export const NestedSheets: Story = enhanceStoryForDualMode<typeof Sheet>(
  {
    render: () => (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open First Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>First Sheet</SheetTitle>
            <SheetDescription>This is the first sheet. You can open another one.</SheetDescription>
          </SheetHeader>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Open Nested Sheet</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Nested Sheet</SheetTitle>
                <SheetDescription>
                  This is a nested sheet that appears from the opposite side.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </SheetContent>
      </Sheet>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Open the first sheet
      const firstTrigger = canvas.getByRole("button", { name: "Open First Sheet" });
      await user.click(firstTrigger);

      // Check that first sheet is open
      await waitFor(() => {
        expect(within(document.body).getByText("First Sheet")).toBeInTheDocument();
      });
      expect(
        within(document.body).getByText("This is the first sheet. You can open another one.")
      ).toBeInTheDocument();

      // Check that nested sheet trigger is available
      const nestedTrigger = within(document.body).getByRole("button", { name: "Open Nested Sheet" });
      expect(nestedTrigger).toBeInTheDocument();

      // Open the nested sheet
      await user.click(nestedTrigger);

      // Check that both sheets are open
      await waitFor(() => {
        expect(within(document.body).getByText("Nested Sheet")).toBeInTheDocument();
      });
      expect(within(document.body).getByText("First Sheet")).toBeInTheDocument();
      expect(
        within(document.body).getByText("This is a nested sheet that appears from the opposite side.")
      ).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Sheet",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            children: "Open First Sheet",
          },
        },
        {
          type: "SheetContent",
          children: [
            {
              type: "SheetHeader",
              children: [
                {
                  type: "SheetTitle",
                  children: "First Sheet",
                },
                {
                  type: "SheetDescription",
                  children: "This is the first sheet. You can open another one.",
                },
              ],
            },
            {
              type: "Sheet",
              children: [
                {
                  type: "SheetTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    children: "Open Nested Sheet",
                  },
                },
                {
                  type: "SheetContent",
                  side: "left",
                  children: {
                    type: "SheetHeader",
                    children: [
                      {
                        type: "SheetTitle",
                        children: "Nested Sheet",
                      },
                      {
                        type: "SheetDescription",
                        children: "This is a nested sheet that appears from the opposite side.",
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const LongContent: Story = enhanceStoryForDualMode<typeof Sheet>(
  {
    render: () => (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Long Content</Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Terms of Service</SheetTitle>
            <SheetDescription>Please read our terms of service carefully.</SheetDescription>
          </SheetHeader>
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i}>
                <h3 className="font-medium">Section {i + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris.
                </p>
              </div>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Decline</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button>Accept</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Check that the trigger button is rendered
      const trigger = canvas.getByRole("button", { name: "Open Long Content" });
      expect(trigger).toBeInTheDocument();

      // Click to open the sheet
      await user.click(trigger);

      // Wait for sheet to open and check that the sheet content is visible
      await waitFor(() => {
        expect(within(document.body).getByText("Terms of Service")).toBeInTheDocument();
      });
      expect(within(document.body).getByText("Please read our terms of service carefully.")).toBeInTheDocument();
      
      // Check that some sections are rendered
      expect(within(document.body).getByText("Section 1")).toBeInTheDocument();
      expect(within(document.body).getByText("Section 20")).toBeInTheDocument();
      
      // Check footer buttons
      const declineButton = within(document.body).getByRole("button", { name: "Decline" });
      const acceptButton = within(document.body).getByRole("button", { name: "Accept" });
      expect(declineButton).toBeInTheDocument();
      expect(acceptButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Sheet",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            children: "Open Long Content",
          },
        },
        {
          type: "SheetContent",
          className: "overflow-y-auto",
          children: [
            {
              type: "SheetHeader",
              children: [
                {
                  type: "SheetTitle",
                  children: "Terms of Service",
                },
                {
                  type: "SheetDescription",
                  children: "Please read our terms of service carefully.",
                },
              ],
            },
            {
              type: "Box",
              className: "space-y-4",
              children: Array.from({ length: 20 }, (_, i) => ({
                type: "Box",
                children: [
                  {
                    type: "Heading",
                    level: 3,
                    className: "font-medium",
                    children: `Section ${i + 1}`,
                  },
                  {
                    type: "Text",
                    className: "text-sm text-muted-foreground",
                    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                  },
                ],
              })),
            },
            {
              type: "SheetFooter",
              children: [
                {
                  type: "SheetClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "Decline",
                  },
                },
                {
                  type: "SheetClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    children: "Accept",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const CustomStyling: Story = enhanceStoryForDualMode<typeof Sheet>(
  {
    render: () => (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">Open Custom Sheet</Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Premium Features
            </SheetTitle>
            <SheetDescription className="text-purple-700 dark:text-purple-300">
              Unlock exclusive features with our premium plan.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                🚀 Unlimited Projects
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Create as many projects as you need.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                ⚡ Priority Support
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Get help when you need it most.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                🎨 Advanced Themes
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Access exclusive design options.
              </p>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Maybe Later</Button>
            </SheetClose>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Upgrade Now
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Check that the trigger button is rendered
      const trigger = canvas.getByRole("button", { name: "Open Custom Sheet" });
      expect(trigger).toBeInTheDocument();

      // Click to open the sheet
      await user.click(trigger);

      // Wait for sheet to open and check that the custom content is visible
      await waitFor(() => {
        expect(within(document.body).getByText("Premium Features")).toBeInTheDocument();
      });
      expect(within(document.body).getByText("Unlock exclusive features with our premium plan.")).toBeInTheDocument();
      
      // Check feature cards
      expect(within(document.body).getByText("🚀 Unlimited Projects")).toBeInTheDocument();
      expect(within(document.body).getByText("⚡ Priority Support")).toBeInTheDocument();
      expect(within(document.body).getByText("🎨 Advanced Themes")).toBeInTheDocument();
      
      // Check buttons
      const maybeLaterButton = within(document.body).getByRole("button", { name: "Maybe Later" });
      const upgradeButton = within(document.body).getByRole("button", { name: "Upgrade Now" });
      expect(maybeLaterButton).toBeInTheDocument();
      expect(upgradeButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Sheet",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "secondary",
            children: "Open Custom Sheet",
          },
        },
        {
          type: "SheetContent",
          className: "w-[400px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
          children: [
            {
              type: "SheetHeader",
              children: [
                {
                  type: "SheetTitle",
                  className: "text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                  children: "Premium Features",
                },
                {
                  type: "SheetDescription",
                  className: "text-purple-700 dark:text-purple-300",
                  children: "Unlock exclusive features with our premium plan.",
                },
              ],
            },
            {
              type: "Flex",
              direction: "column",
              gap: "md",
              children: [
                {
                  type: "Box",
                  className: "p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur",
                  children: [
                    {
                      type: "Heading",
                      level: 4,
                      className: "font-semibold text-purple-900 dark:text-purple-100",
                      children: "🚀 Unlimited Projects",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-purple-700 dark:text-purple-300",
                      children: "Create as many projects as you need.",
                    },
                  ],
                },
                {
                  type: "Box",
                  className: "p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur",
                  children: [
                    {
                      type: "Heading",
                      level: 4,
                      className: "font-semibold text-purple-900 dark:text-purple-100",
                      children: "⚡ Priority Support",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-purple-700 dark:text-purple-300",
                      children: "Get help when you need it most.",
                    },
                  ],
                },
                {
                  type: "Box",
                  className: "p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur",
                  children: [
                    {
                      type: "Heading",
                      level: 4,
                      className: "font-semibold text-purple-900 dark:text-purple-100",
                      children: "🎨 Advanced Themes",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-purple-700 dark:text-purple-300",
                      children: "Access exclusive design options.",
                    },
                  ],
                },
              ],
            },
            {
              type: "SheetFooter",
              children: [
                {
                  type: "SheetClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "Maybe Later",
                  },
                },
                {
                  type: "Button",
                  className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
                  children: "Upgrade Now",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithoutModal: Story = enhanceStoryForDualMode<typeof Sheet>(
  {
    render: () => (
      <div className="relative h-[400px] w-full border rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Page Content</h2>
          <p className="mb-4">
            This sheet doesn&apos;t use modal behavior, so you can still interact with the page
            content behind it.
          </p>
          <Sheet modal={false}>
            <SheetTrigger asChild>
              <Button>Open Non-Modal Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Non-Modal Sheet</SheetTitle>
                <SheetDescription>
                  You can still interact with the content behind this sheet.
                </SheetDescription>
              </SheetHeader>
              <p>Try clicking on the buttons in the background!</p>
            </SheetContent>
          </Sheet>
        </div>
        <div className="absolute bottom-4 left-4 space-x-2">
          <Button variant="secondary" onClick={() => alert("Background button clicked!")}>
            Background Button 1
          </Button>
          <Button variant="secondary" onClick={() => alert("Background button clicked!")}>
            Background Button 2
          </Button>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the main content renders
      expect(canvas.getByText("Page Content")).toBeInTheDocument();
      expect(canvas.getByText(/This sheet doesn't use modal behavior/)).toBeInTheDocument();
      
      // Check that all buttons are rendered
      const nonModalButton = canvas.getByRole("button", { name: "Open Non-Modal Sheet" });
      const bgButton1 = canvas.getByRole("button", { name: "Background Button 1" });
      const bgButton2 = canvas.getByRole("button", { name: "Background Button 2" });
      
      expect(nonModalButton).toBeInTheDocument();
      expect(bgButton1).toBeInTheDocument();
      expect(bgButton2).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "relative h-[400px] w-full border rounded-lg overflow-hidden",
      children: [
        {
          type: "Box",
          className: "p-4",
          children: [
            {
              type: "Heading",
              level: 2,
              className: "text-lg font-semibold mb-2",
              children: "Page Content",
            },
            {
              type: "Text",
              className: "mb-4",
              children: "This sheet doesn't use modal behavior, so you can still interact with the page content behind it.",
            },
            {
              type: "Sheet",
              modal: false,
              children: [
                {
                  type: "SheetTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    children: "Open Non-Modal Sheet",
                  },
                },
                {
                  type: "SheetContent",
                  children: [
                    {
                      type: "SheetHeader",
                      children: [
                        {
                          type: "SheetTitle",
                          children: "Non-Modal Sheet",
                        },
                        {
                          type: "SheetDescription",
                          children: "You can still interact with the content behind this sheet.",
                        },
                      ],
                    },
                    {
                      type: "Text",
                      children: "Try clicking on the buttons in the background!",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Flex",
          className: "absolute bottom-4 left-4 space-x-2",
          children: [
            {
              type: "Button",
              variant: "secondary",
              onClick: "alert('Background button clicked!')",
              children: "Background Button 1",
            },
            {
              type: "Button",
              variant: "secondary",
              onClick: "alert('Background button clicked!')",
              children: "Background Button 2",
            },
          ],
        },
      ],
    },
  }
);

function AnimationToggleComponent() {
  const [animated, setAnimated] = React.useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="animation-toggle"
          checked={animated}
          onChange={(e) => setAnimated(e.target.checked)}
          className="size-4"
        />
        <Label htmlFor="animation-toggle">Enable animations</Label>
      </div>

      <div className="flex gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">From Right</Button>
          </SheetTrigger>
          <SheetContent side="right" animated={animated}>
            <SheetHeader>
              <SheetTitle>Animated Sheet</SheetTitle>
              <SheetDescription>
                This sheet {animated ? "slides in smoothly" : "appears instantly"}.
              </SheetDescription>
            </SheetHeader>
            <p>Animation is currently {animated ? "enabled" : "disabled"}.</p>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">From Left</Button>
          </SheetTrigger>
          <SheetContent side="left" animated={animated}>
            <SheetHeader>
              <SheetTitle>Left Sheet</SheetTitle>
              <SheetDescription>
                This sheet {animated ? "slides in from the left" : "appears instantly"}.
              </SheetDescription>
            </SheetHeader>
            <p>Try toggling the animation setting!</p>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">From Top</Button>
          </SheetTrigger>
          <SheetContent side="top" animated={animated}>
            <SheetHeader>
              <SheetTitle>Top Sheet</SheetTitle>
              <SheetDescription>
                This sheet {animated ? "slides down from the top" : "appears instantly"}.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">From Bottom</Button>
          </SheetTrigger>
          <SheetContent side="bottom" animated={animated}>
            <SheetHeader>
              <SheetTitle>Bottom Sheet</SheetTitle>
              <SheetDescription>
                This sheet {animated ? "slides up from the bottom" : "appears instantly"}.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export const SDUIDebugTest: Story = {
  render: () => {
    // Dynamic import to avoid circular dependencies
    const [Component, setComponent] = React.useState<React.ComponentType | null>(null);
    
    React.useEffect(() => {
      import("./sheet-sdui-test").then((module) => {
        setComponent(() => module.SheetSDUITest);
      });
    }, []);
    
    if (!Component) {
      return <div>Loading...</div>;
    }
    
    return <Component />;
  },
  parameters: {
    layout: "padded"
  }
};

export const AnimationToggle: Story = enhanceStoryForDualMode<typeof Sheet>(
  {
    render: AnimationToggleComponent,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that animation toggle checkbox is rendered
      const toggleCheckbox = canvas.getByLabelText("Enable animations");
      expect(toggleCheckbox).toBeInTheDocument();
      expect(toggleCheckbox).toBeChecked();

      // Check that all directional buttons are rendered
      const rightButton = canvas.getByRole("button", { name: "From Right" });
      const leftButton = canvas.getByRole("button", { name: "From Left" });
      const topButton = canvas.getByRole("button", { name: "From Top" });
      const bottomButton = canvas.getByRole("button", { name: "From Bottom" });

      expect(rightButton).toBeInTheDocument();
      expect(leftButton).toBeInTheDocument();
      expect(topButton).toBeInTheDocument();
      expect(bottomButton).toBeInTheDocument();
    },
  },
  {
    // Note: This story uses a custom component with state, which cannot be fully represented in JSON
    // The animation toggle behavior requires React state management
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "Input",
              id: "animation-toggle",
              defaultChecked: true,
              className: "size-4",
            },
            {
              type: "Label",
              htmlFor: "animation-toggle",
              children: "Enable animations",
            },
          ],
        },
        {
          type: "Flex",
          gap: "md",
          children: [
            {
              type: "Sheet",
              children: [
                {
                  type: "SheetTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "From Right",
                  },
                },
                {
                  type: "SheetContent",
                  side: "right",
                  animated: true,
                  children: [
                    {
                      type: "SheetHeader",
                      children: [
                        {
                          type: "SheetTitle",
                          children: "Animated Sheet",
                        },
                        {
                          type: "SheetDescription",
                          children: "This sheet slides in smoothly.",
                        },
                      ],
                    },
                    {
                      type: "Text",
                      children: "Animation is currently enabled.",
                    },
                  ],
                },
              ],
            },
            {
              type: "Sheet",
              children: [
                {
                  type: "SheetTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "From Left",
                  },
                },
                {
                  type: "SheetContent",
                  side: "left",
                  animated: true,
                  children: [
                    {
                      type: "SheetHeader",
                      children: [
                        {
                          type: "SheetTitle",
                          children: "Left Sheet",
                        },
                        {
                          type: "SheetDescription",
                          children: "This sheet slides in from the left.",
                        },
                      ],
                    },
                    {
                      type: "Text",
                      children: "Try toggling the animation setting!",
                    },
                  ],
                },
              ],
            },
            {
              type: "Sheet",
              children: [
                {
                  type: "SheetTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "From Top",
                  },
                },
                {
                  type: "SheetContent",
                  side: "top",
                  animated: true,
                  children: [
                    {
                      type: "SheetHeader",
                      children: [
                        {
                          type: "SheetTitle",
                          children: "Top Sheet",
                        },
                        {
                          type: "SheetDescription",
                          children: "This sheet slides down from the top.",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Sheet",
              children: [
                {
                  type: "SheetTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "From Bottom",
                  },
                },
                {
                  type: "SheetContent",
                  side: "bottom",
                  animated: true,
                  children: [
                    {
                      type: "SheetHeader",
                      children: [
                        {
                          type: "SheetTitle",
                          children: "Bottom Sheet",
                        },
                        {
                          type: "SheetDescription",
                          children: "This sheet slides up from the bottom.",
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
