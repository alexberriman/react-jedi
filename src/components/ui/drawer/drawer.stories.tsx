import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { within, userEvent, expect, waitFor } from "storybook/test";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerSection,
} from "./drawer";
import { Button } from "../button";
import { Label } from "../label";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = enhanceStoryForDualMode(
  {
    args: {},
    render: () => {
      const [open, setOpen] = React.useState(false);
      
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerSection>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Shadcn" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="@shadcn" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself" />
                </div>
              </div>
            </DrawerSection>
            <DrawerFooter>
              <Button type="submit">Save changes</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Open drawer
      const triggerButton = canvas.getByRole("button", { name: /open drawer/i });
      await userEvent.click(triggerButton);
      
      // Add a small delay for drawer animation
      await new Promise(resolve => globalThis.setTimeout(resolve, 500));

      // Wait for drawer to appear (drawer renders in a portal)
      await waitFor(() => {
        const drawerContent = document.querySelector('[data-vaul-drawer]');
        if (!drawerContent) {
          throw new Error('Drawer content not found');
        }
        expect(within(drawerContent as HTMLElement).getByText("Edit Profile")).toBeInTheDocument();
      }, { timeout: 10_000 });

      // Interact with form fields - be more specific with the selector
      const drawerContent = document.querySelector('[data-vaul-drawer]') as HTMLElement;
      const drawerScreen = within(drawerContent);
      
      const nameInput = drawerScreen.getByRole("textbox", { name: /^name$/i });
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, "John Doe");

      const bioTextarea = drawerScreen.getByLabelText(/bio/i);
      await userEvent.type(bioTextarea, "This is my bio");

      // Click Cancel button
      const cancelButton = drawerScreen.getByRole("button", { name: /cancel/i });
      await userEvent.click(cancelButton);

      // Verify drawer closes - wait a bit longer for animation
      await waitFor(
        () => {
          expect(document.querySelector('[data-vaul-drawer]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Drawer",
      children: [
        {
          type: "DrawerTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Open Drawer",
          },
        },
        {
          type: "DrawerContent",
          children: [
            {
              type: "DrawerHeader",
              children: [
                {
                  type: "DrawerTitle",
                  children: "Edit Profile",
                },
                {
                  type: "DrawerDescription",
                  children: "Make changes to your profile here. Click save when you're done.",
                },
              ],
            },
            {
              type: "DrawerSection",
              children: {
                type: "Box",
                className: "grid gap-4",
                children: [
                  {
                    type: "Box",
                    className: "grid gap-2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "name",
                        children: "Name",
                      },
                      {
                        type: "Input",
                        id: "name",
                        placeholder: "Shadcn",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "grid gap-2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "username",
                        children: "Username",
                      },
                      {
                        type: "Input",
                        id: "username",
                        placeholder: "@shadcn",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "grid gap-2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "bio",
                        children: "Bio",
                      },
                      {
                        type: "Textarea",
                        id: "bio",
                        placeholder: "Tell us about yourself",
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: "DrawerFooter",
              children: [
                {
                  type: "Button",
                  buttonType: "submit",
                  children: "Save changes",
                },
                {
                  type: "Button",
                  variant: "outline",
                  onClickAction: "closeDrawer",
                  children: "Cancel",
                },
              ],
            },
          ],
        },
      ],
    },
    handlers: {
      openDrawer: () => {
        // This will be dynamically set by the Drawer component
        console.log("Opening drawer");
      },
      closeDrawer: () => {
        // This will be dynamically set by the Drawer component
        console.log("Closing drawer");
      },
    },
  }
);

export const RightSide = enhanceStoryForDualMode(
  {
    args: {},
    render: () => {
      const [open, setOpen] = React.useState(false);
      
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="default">Right Side Drawer</Button>
          </DrawerTrigger>
          <DrawerContent data-vaul-drawer-direction="right">
            <DrawerHeader>
              <DrawerTitle>Navigation Menu</DrawerTitle>
              <DrawerDescription>Quick access to all features and settings.</DrawerDescription>
            </DrawerHeader>
            <DrawerSection>
              <nav className="grid gap-2">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Support
                </Button>
              </nav>
            </DrawerSection>
            <DrawerFooter>
              <Button variant="default" className="w-full">
                Upgrade to Pro
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Open right side drawer
      const triggerButton = canvas.getByRole("button", { name: /right side drawer/i });
      await userEvent.click(triggerButton);
      
      // Add a small delay for drawer animation
      await new Promise(resolve => globalThis.setTimeout(resolve, 500));

      // Wait for drawer - check multiple possible locations
      await waitFor(() => {
        // Try multiple selectors for drawer content
        const drawerContent = document.querySelector('[data-slot="drawer-content"]') || 
                             document.querySelector('[data-vaul-drawer]') ||
                             document.querySelector('[role="dialog"]');
        
        if (!drawerContent) {
          // Log what we can find for debugging
          const allElements = document.querySelectorAll('[data-slot], [data-vaul-drawer], [role="dialog"]');
          console.log('Found elements:', allElements.length);
          for (const el of allElements) console.log('Element:', el.tagName, (el as HTMLElement).dataset?.slot, el.getAttribute('role'));
          throw new Error('Drawer content not found');
        }
        
        // Check if it's visible
        const isVisible = drawerContent.checkVisibility?.() ?? true;
        if (!isVisible) {
          throw new Error('Drawer found but not visible');
        }
        
        const drawerScreen = within(drawerContent as HTMLElement);
        expect(drawerScreen.getByText("Navigation Menu")).toBeInTheDocument();
      }, { timeout: 10_000 });

      // Verify drawer is on the right (has data attribute)
      const drawer = document.querySelector('[data-slot="drawer-content"]') || 
                    document.querySelector('[data-vaul-drawer]') ||
                    document.querySelector('[role="dialog"]');
      
      if (drawer?.hasAttribute("data-vaul-drawer-direction")) {
        expect(drawer).toHaveAttribute("data-vaul-drawer-direction", "right");
      }

      // Click a navigation button
      const drawerScreen = within(drawer as HTMLElement);
      await userEvent.click(drawerScreen.getByRole("button", { name: /dashboard/i }));

      // Close drawer
      const closeButton = drawerScreen.getByRole("button", { name: /^close$/i });
      await userEvent.click(closeButton);

      await waitFor(
        () => {
          const drawerElement = document.querySelector('[data-slot="drawer-content"]') || 
                               document.querySelector('[data-vaul-drawer]') ||
                               document.querySelector('[role="dialog"]');
          expect(drawerElement).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Drawer",
      children: [
        {
          type: "Button",
          variant: "default",
          onClickAction: "openDrawer",
          children: "Right Side Drawer",
        },
        {
          type: "DrawerContent",
          "data-vaul-drawer-direction": "right",
          children: [
            {
              type: "DrawerHeader",
              children: [
                {
                  type: "DrawerTitle",
                  children: "Navigation Menu",
                },
                {
                  type: "DrawerDescription",
                  children: "Quick access to all features and settings.",
                },
              ],
            },
            {
              type: "DrawerSection",
              children: {
                type: "Box",
                element: "nav",
                className: "grid gap-2",
                children: [
                  {
                    type: "Button",
                    variant: "ghost",
                    className: "w-full justify-start",
                    children: "Dashboard",
                  },
                  {
                    type: "Button",
                    variant: "ghost",
                    className: "w-full justify-start",
                    children: "Profile",
                  },
                  {
                    type: "Button",
                    variant: "ghost",
                    className: "w-full justify-start",
                    children: "Settings",
                  },
                  {
                    type: "Button",
                    variant: "ghost",
                    className: "w-full justify-start",
                    children: "Support",
                  },
                ],
              },
            },
            {
              type: "DrawerFooter",
              children: [
                {
                  type: "Button",
                  variant: "default",
                  className: "w-full",
                  children: "Upgrade to Pro",
                },
                {
                  type: "Button",
                  variant: "ghost",
                  className: "w-full",
                  onClickAction: "closeDrawer",
                  children: "Close",
                },
              ],
            },
          ],
        },
      ],
    },
    handlers: {
      openDrawer: () => {
        console.log("Opening right side drawer");
      },
      closeDrawer: () => {
        console.log("Closing right side drawer");
      },
    },
  }
);

export const LeftSide = enhanceStoryForDualMode(
  {
    args: {},
    render: () => {
      const [open, setOpen] = React.useState(false);
      
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="secondary">Left Side Drawer</Button>
          </DrawerTrigger>
          <DrawerContent data-vaul-drawer-direction="left">
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Customize your application experience.</DrawerDescription>
            </DrawerHeader>
            <DrawerSection>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <input type="checkbox" id="dark-mode" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notifications</Label>
                  <input type="checkbox" id="notifications" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics">Analytics</Label>
                  <input type="checkbox" id="analytics" className="toggle" />
                </div>
              </div>
            </DrawerSection>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="default">Save Preferences</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Open left side drawer
      const triggerButton = canvas.getByRole("button", { name: /left side drawer/i });
      await userEvent.click(triggerButton);
      
      // Add a small delay for drawer animation
      await new Promise(resolve => globalThis.setTimeout(resolve, 500));

      // Wait for drawer - check multiple possible locations
      await waitFor(() => {
        const drawerInBody = document.body.querySelector('[data-slot="drawer-content"]');
        const drawerInCanvas = canvasElement.querySelector('[data-slot="drawer-content"]');
        const drawer = drawerInBody || drawerInCanvas;
        
        if (!drawer) {
          throw new Error('Drawer not found in body or canvas');
        }
        
        const drawerScreen = within(drawer as HTMLElement);
        expect(drawerScreen.getByText("Settings")).toBeInTheDocument();
      }, { timeout: 10_000 });

      // Verify drawer is on the left
      const drawer = document.body.querySelector('[data-slot="drawer-content"]') || canvasElement.querySelector('[data-slot="drawer-content"]');
      expect(drawer).toHaveAttribute("data-vaul-drawer-direction", "left");

      // Toggle a checkbox
      const drawerScreen = within(drawer as HTMLElement);
      const darkModeCheckbox = drawerScreen.getByLabelText(/dark mode/i);
      await userEvent.click(darkModeCheckbox);

      // Save preferences
      await userEvent.click(drawerScreen.getByRole("button", { name: /save preferences/i }));

      await waitFor(
        () => {
          const drawerElement = document.body.querySelector('[data-slot="drawer-content"]') || canvasElement.querySelector('[data-slot="drawer-content"]');
          expect(drawerElement).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Drawer",
      children: [
        {
          type: "Button",
          variant: "secondary",
          onClickAction: "openDrawer",
          children: "Left Side Drawer",
        },
        {
          type: "DrawerContent",
          "data-vaul-drawer-direction": "left",
          children: [
            {
              type: "DrawerHeader",
              children: [
                {
                  type: "DrawerTitle",
                  children: "Settings",
                },
                {
                  type: "DrawerDescription",
                  children: "Customize your application experience.",
                },
              ],
            },
            {
              type: "DrawerSection",
              children: {
                type: "Flex",
                direction: "column",
                gap: "md",
                children: [
                  {
                    type: "Flex",
                    align: "center",
                    justify: "between",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "dark-mode",
                        children: "Dark Mode",
                      },
                      {
                        type: "Box",
                        element: "input",
                        id: "dark-mode",
                        className: "toggle",
                        inputType: "checkbox",
                      },
                    ],
                  },
                  {
                    type: "Flex",
                    align: "center",
                    justify: "between",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "notifications",
                        children: "Notifications",
                      },
                      {
                        type: "Box",
                        element: "input",
                        id: "notifications",
                        className: "toggle",
                        inputType: "checkbox",
                      },
                    ],
                  },
                  {
                    type: "Flex",
                    align: "center",
                    justify: "between",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "analytics",
                        children: "Analytics",
                      },
                      {
                        type: "Box",
                        element: "input",
                        id: "analytics",
                        className: "toggle",
                        inputType: "checkbox",
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: "DrawerFooter",
              children: [
                {
                  type: "Button",
                  variant: "default",
                  onClickAction: "closeDrawer",
                  children: "Save Preferences",
                },
                {
                  type: "Button",
                  variant: "outline",
                  onClickAction: "closeDrawer",
                  children: "Cancel",
                },
              ],
            },
          ],
        },
      ],
    },
    handlers: {
      openDrawer: () => {
        console.log("Opening left side drawer");
      },
      closeDrawer: () => {
        console.log("Closing left side drawer");
      },
    },
  }
);

export const TopDrawer = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Top Drawer</Button>
        </DrawerTrigger>
        <DrawerContent data-vaul-drawer-direction="top">
          <DrawerHeader>
            <DrawerTitle>Search Everything</DrawerTitle>
            <DrawerDescription>Press Cmd+K to open this search anytime.</DrawerDescription>
          </DrawerHeader>
          <DrawerSection>
            <Input placeholder="Type to search..." className="text-lg" />
            <div className="mt-4 space-y-2">
              <div className="text-sm text-muted-foreground">Recent searches</div>
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard metrics
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full justify-start">
                  User settings
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full justify-start">
                  API documentation
                </Button>
              </DrawerClose>
            </div>
          </DrawerSection>
        </DrawerContent>
      </Drawer>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Open top drawer
      const triggerButton = canvas.getByRole("button", { name: /top drawer/i });
      await userEvent.click(triggerButton);

      // Wait for drawer
      await waitFor(() => {
        expect(within(document.body).getByText("Search Everything")).toBeInTheDocument();
      });

      // Verify drawer is on top
      const drawerContent = within(document.body)
        .getByText("Search Everything")
        .closest("[data-vaul-drawer-direction]");
      expect(drawerContent).toHaveAttribute("data-vaul-drawer-direction", "top");

      // Type in search
      const searchInput = within(document.body).getByPlaceholderText(/type to search/i);
      await userEvent.type(searchInput, "test search");

      // Click a recent search
      await userEvent.click(
        within(document.body).getByRole("button", { name: /dashboard metrics/i })
      );

      await waitFor(
        () => {
          expect(within(document.body).queryByText("Search Everything")).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Drawer",
      children: [
        {
          type: "DrawerTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Top Drawer",
          },
        },
        {
          type: "DrawerContent",
          "data-vaul-drawer-direction": "top",
          children: [
            {
              type: "DrawerHeader",
              children: [
                {
                  type: "DrawerTitle",
                  children: "Search Everything",
                },
                {
                  type: "DrawerDescription",
                  children: "Press Cmd+K to open this search anytime.",
                },
              ],
            },
            {
              type: "DrawerSection",
              children: [
                {
                  type: "Input",
                  placeholder: "Type to search...",
                  className: "text-lg",
                },
                {
                  type: "Box",
                  className: "mt-4 space-y-2",
                  children: [
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "Recent searches",
                    },
                    {
                      type: "DrawerClose",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "ghost",
                        className: "w-full justify-start",
                        children: "Dashboard metrics",
                      },
                    },
                    {
                      type: "DrawerClose",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "ghost",
                        className: "w-full justify-start",
                        children: "User settings",
                      },
                    },
                    {
                      type: "DrawerClose",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "ghost",
                        className: "w-full justify-start",
                        children: "API documentation",
                      },
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

export const NestedDrawers = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open Main Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Main Drawer</DrawerTitle>
            <DrawerDescription>This drawer contains another drawer inside.</DrawerDescription>
          </DrawerHeader>
          <DrawerSection>
            <p className="text-sm text-muted-foreground mb-4">
              You can open nested drawers for complex interactions.
            </p>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="secondary">Open Nested Drawer</Button>
              </DrawerTrigger>
              <DrawerContent data-vaul-drawer-direction="right">
                <DrawerHeader>
                  <DrawerTitle>Nested Drawer</DrawerTitle>
                  <DrawerDescription>This is a drawer inside another drawer!</DrawerDescription>
                </DrawerHeader>
                <DrawerSection>
                  <p className="text-sm">Nested drawer content goes here.</p>
                </DrawerSection>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close Nested</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </DrawerSection>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close Main</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Open main drawer
      const mainTrigger = canvas.getByRole("button", { name: /open main drawer/i });
      await userEvent.click(mainTrigger);

      // Wait for main drawer
      await waitFor(() => {
        expect(within(document.body).getByText("Main Drawer")).toBeInTheDocument();
      });

      // Open nested drawer
      const nestedTrigger = within(document.body).getByRole("button", {
        name: /open nested drawer/i,
      });
      await userEvent.click(nestedTrigger);

      // Wait for nested drawer
      await waitFor(() => {
        expect(within(document.body).getByText("Nested Drawer")).toBeInTheDocument();
      });

      // Close nested drawer
      await userEvent.click(within(document.body).getByRole("button", { name: /close nested/i }));

      await waitFor(
        () => {
          expect(within(document.body).queryByText("Nested Drawer")).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Main drawer should still be open
      expect(within(document.body).getByText("Main Drawer")).toBeInTheDocument();

      // Close main drawer
      await userEvent.click(within(document.body).getByRole("button", { name: /close main/i }));
    },
  },
  {
    renderSpec: {
      type: "Drawer",
      children: [
        {
          type: "DrawerTrigger",
          asChild: true,
          children: {
            type: "Button",
            children: "Open Main Drawer",
          },
        },
        {
          type: "DrawerContent",
          children: [
            {
              type: "DrawerHeader",
              children: [
                {
                  type: "DrawerTitle",
                  children: "Main Drawer",
                },
                {
                  type: "DrawerDescription",
                  children: "This drawer contains another drawer inside.",
                },
              ],
            },
            {
              type: "DrawerSection",
              children: [
                {
                  type: "Text",
                  element: "p",
                  className: "text-sm text-muted-foreground mb-4",
                  children: "You can open nested drawers for complex interactions.",
                },
                {
                  type: "Drawer",
                  children: [
                    {
                      type: "DrawerTrigger",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "secondary",
                        children: "Open Nested Drawer",
                      },
                    },
                    {
                      type: "DrawerContent",
                      "data-vaul-drawer-direction": "right",
                      children: [
                        {
                          type: "DrawerHeader",
                          children: [
                            {
                              type: "DrawerTitle",
                              children: "Nested Drawer",
                            },
                            {
                              type: "DrawerDescription",
                              children: "This is a drawer inside another drawer!",
                            },
                          ],
                        },
                        {
                          type: "DrawerSection",
                          children: {
                            type: "Text",
                            element: "p",
                            className: "text-sm",
                            children: "Nested drawer content goes here.",
                          },
                        },
                        {
                          type: "DrawerFooter",
                          children: {
                            type: "DrawerClose",
                            asChild: true,
                            children: {
                              type: "Button",
                              variant: "outline",
                              children: "Close Nested",
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "DrawerFooter",
              children: {
                type: "DrawerClose",
                asChild: true,
                children: {
                  type: "Button",
                  variant: "outline",
                  children: "Close Main",
                },
              },
            },
          ],
        },
      ],
    },
  }
);

export const StickyHeaderFooter = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="default">Long Content Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <DrawerTitle>Long Content</DrawerTitle>
            <DrawerDescription>
              This drawer has a sticky header and footer with scrollable content.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerSection>
            <div className="space-y-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <h3 className="font-medium">Item {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a content block that makes the drawer scrollable.
                  </p>
                </div>
              ))}
            </div>
          </DrawerSection>
          <DrawerFooter className="sticky bottom-0 bg-background/95 backdrop-blur-sm z-10">
            <DrawerClose asChild>
              <Button variant="default">Confirm Action</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Open drawer with long content
      const triggerButton = canvas.getByRole("button", { name: /long content drawer/i });
      await userEvent.click(triggerButton);

      // Wait for drawer
      await waitFor(
        () => {
          expect(within(document.body).getByText("Long Content")).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Verify multiple items are rendered
      expect(within(document.body).getByText("Item 1")).toBeInTheDocument();
      expect(within(document.body).getByText("Item 20")).toBeInTheDocument();

      // Verify sticky header and footer
      const header = within(document.body).getByText("Long Content").closest('[class*="sticky"]');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("sticky");

      // Click confirm action
      await userEvent.click(within(document.body).getByRole("button", { name: /confirm action/i }));

      await waitFor(
        () => {
          expect(within(document.body).queryByText("Long Content")).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Drawer",
      children: [
        {
          type: "DrawerTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "default",
            children: "Long Content Drawer",
          },
        },
        {
          type: "DrawerContent",
          children: [
            {
              type: "DrawerHeader",
              className: "sticky top-0 bg-background/95 backdrop-blur-sm z-10",
              children: [
                {
                  type: "DrawerTitle",
                  children: "Long Content",
                },
                {
                  type: "DrawerDescription",
                  children: "This drawer has a sticky header and footer with scrollable content.",
                },
              ],
            },
            {
              type: "DrawerSection",
              children: {
                type: "Flex",
                direction: "column",
                gap: "md",
                children: Array.from({ length: 20 }, (_, i) => ({
                  type: "Box",
                  className: "p-4 border rounded-lg",
                  children: [
                    {
                      type: "Heading",
                      element: "h3",
                      className: "font-medium",
                      children: `Item ${i + 1}`,
                    },
                    {
                      type: "Text",
                      element: "p",
                      className: "text-sm text-muted-foreground",
                      children: "This is a content block that makes the drawer scrollable.",
                    },
                  ],
                })),
              },
            },
            {
              type: "DrawerFooter",
              className: "sticky bottom-0 bg-background/95 backdrop-blur-sm z-10",
              children: [
                {
                  type: "DrawerClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "default",
                    children: "Confirm Action",
                  },
                },
                {
                  type: "DrawerClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "Cancel",
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

export const CustomStyling = enhanceStoryForDualMode(
  {
    args: {},
    render: () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="destructive">Danger Zone</Button>
        </DrawerTrigger>
        <DrawerContent className="bg-gradient-to-b from-destructive/10 to-background">
          <DrawerHeader>
            <DrawerTitle className="text-destructive">Delete Account</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your account and remove your
              data from our servers.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerSection>
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <p className="text-sm">
                To confirm deletion, please type{" "}
                <span className="font-mono font-semibold">DELETE</span> below:
              </p>
              <Input className="mt-2" placeholder="Type DELETE to confirm" />
            </div>
          </DrawerSection>
          <DrawerFooter>
            <Button variant="destructive" disabled>
              Delete Account Forever
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">I changed my mind</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Open danger drawer
      const triggerButton = canvas.getByRole("button", { name: /danger zone/i });
      await userEvent.click(triggerButton);

      // Wait for drawer (might be in a portal)
      await waitFor(
        () => {
          expect(within(document.body).getByText("Delete Account")).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Verify custom styling is applied
      const drawerContent = within(document.body)
        .getByText("Delete Account")
        .closest('[role="dialog"]');
      expect(drawerContent).toHaveClass("bg-gradient-to-b");

      // Type in confirmation field
      const confirmInput = within(document.body).getByPlaceholderText(/type DELETE to confirm/i);
      await userEvent.type(confirmInput, "DEL");

      // Delete button should still be disabled (wrong text)
      const deleteButton = within(document.body).getByRole("button", {
        name: /delete account forever/i,
      });
      expect(deleteButton).toBeDisabled();

      // Click cancel
      await userEvent.click(
        within(document.body).getByRole("button", { name: /i changed my mind/i })
      );

      await waitFor(
        () => {
          expect(within(document.body).queryByText("Delete Account")).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Drawer",
      children: [
        {
          type: "DrawerTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "destructive",
            children: "Danger Zone",
          },
        },
        {
          type: "DrawerContent",
          className: "bg-gradient-to-b from-destructive/10 to-background",
          children: [
            {
              type: "DrawerHeader",
              children: [
                {
                  type: "DrawerTitle",
                  className: "text-destructive",
                  children: "Delete Account",
                },
                {
                  type: "DrawerDescription",
                  children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
                },
              ],
            },
            {
              type: "DrawerSection",
              children: {
                type: "Box",
                className: "p-4 bg-destructive/5 border border-destructive/20 rounded-lg",
                children: [
                  {
                    type: "Text",
                    element: "p",
                    className: "text-sm",
                    children: [
                      "To confirm deletion, please type ",
                      {
                        type: "Text",
                        element: "span",
                        className: "font-mono font-semibold",
                        children: "DELETE",
                      },
                      " below:",
                    ],
                  },
                  {
                    type: "Input",
                    className: "mt-2",
                    placeholder: "Type DELETE to confirm",
                  },
                ],
              },
            },
            {
              type: "DrawerFooter",
              children: [
                {
                  type: "Button",
                  variant: "destructive",
                  disabled: true,
                  children: "Delete Account Forever",
                },
                {
                  type: "DrawerClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "I changed my mind",
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

export const MobileOptimized = enhanceStoryForDualMode(
  {
    args: {},
    parameters: {
      viewport: {
        defaultViewport: "mobile1",
      },
    },
    render: () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full">Mobile Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Mobile Optimized</DrawerTitle>
            <DrawerDescription>
              This drawer is optimized for mobile devices with touch gestures.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerSection>
            <div className="space-y-4">
              <Button variant="default" className="w-full">
                Primary Action
              </Button>
              <Button variant="secondary" className="w-full">
                Secondary Action
              </Button>
              <Button variant="outline" className="w-full">
                Tertiary Action
              </Button>
            </div>
          </DrawerSection>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Open mobile drawer
      const triggerButton = canvas.getByRole("button", { name: /mobile drawer/i });
      await userEvent.click(triggerButton);

      // Wait for drawer
      await waitFor(
        () => {
          expect(within(document.body).getByText("Mobile Optimized")).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Click primary action
      await userEvent.click(within(document.body).getByRole("button", { name: /primary action/i }));

      // Drawer should stay open since Primary Action doesn't close it
      expect(within(document.body).getByText("Mobile Optimized")).toBeInTheDocument();

      // Click close button to close drawer
      await userEvent.click(within(document.body).getByRole("button", { name: /close/i }));

      // Drawer should close
      await waitFor(
        () => {
          expect(within(document.body).queryByText("Mobile Optimized")).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Small delay to ensure drawer is fully closed before reopening
      await new Promise((resolve) => globalThis.setTimeout(resolve, 100));

      // Open again to test close button
      await userEvent.click(triggerButton);

      await waitFor(
        () => {
          expect(within(document.body).getByText("Mobile Optimized")).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Close with close button
      const closeButton = within(document.body).getByRole("button", { name: /^close$/i });
      await userEvent.click(closeButton);

      // Wait for drawer to close completely
      await waitFor(
        () => {
          expect(within(document.body).queryByText("Mobile Optimized")).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Drawer",
      children: [
        {
          type: "DrawerTrigger",
          asChild: true,
          children: {
            type: "Button",
            className: "w-full",
            children: "Mobile Drawer",
          },
        },
        {
          type: "DrawerContent",
          children: [
            {
              type: "DrawerHeader",
              children: [
                {
                  type: "DrawerTitle",
                  children: "Mobile Optimized",
                },
                {
                  type: "DrawerDescription",
                  children: "This drawer is optimized for mobile devices with touch gestures.",
                },
              ],
            },
            {
              type: "DrawerSection",
              children: {
                type: "Flex",
                direction: "column",
                gap: "md",
                children: [
                  {
                    type: "Button",
                    variant: "default",
                    className: "w-full",
                    children: "Primary Action",
                  },
                  {
                    type: "Button",
                    variant: "secondary",
                    className: "w-full",
                    children: "Secondary Action",
                  },
                  {
                    type: "Button",
                    variant: "outline",
                    className: "w-full",
                    children: "Tertiary Action",
                  },
                ],
              },
            },
            {
              type: "DrawerFooter",
              children: {
                type: "DrawerClose",
                asChild: true,
                children: {
                  type: "Button",
                  variant: "ghost",
                  className: "w-full",
                  children: "Close",
                },
              },
            },
          ],
        },
      ],
    },
  }
);

