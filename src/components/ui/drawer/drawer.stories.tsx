import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
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

const meta = {
  title: "Components/Overlay/Drawer",
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

export const Default: Story = {
  args: {},
  render: () => (
    <Drawer>
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
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Open drawer
    const triggerButton = canvas.getByRole('button', { name: /open drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer to appear
    await waitFor(() => {
      expect(canvas.getByText('Edit Profile')).toBeInTheDocument();
    });
    
    // Interact with form fields
    const nameInput = canvas.getByLabelText(/name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'John Doe');
    
    const bioTextarea = canvas.getByLabelText(/bio/i);
    await userEvent.type(bioTextarea, 'This is my bio');
    
    // Click Cancel button
    const cancelButton = canvas.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);
    
    // Verify drawer closes
    await waitFor(() => {
      expect(canvas.queryByText('Edit Profile')).not.toBeInTheDocument();
    });
  },
};

export const RightSide: Story = {
  args: {},
  render: () => (
    <Drawer>
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
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Open right side drawer
    const triggerButton = canvas.getByRole('button', { name: /right side drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(canvas.getByText('Navigation Menu')).toBeInTheDocument();
    });
    
    // Verify drawer is on the right (has data attribute)
    const drawerContent = canvas.getByText('Navigation Menu').closest('[data-vaul-drawer-direction]');
    expect(drawerContent).toHaveAttribute('data-vaul-drawer-direction', 'right');
    
    // Click a navigation button
    await userEvent.click(canvas.getByRole('button', { name: /dashboard/i }));
    
    // Close drawer
    const closeButton = canvas.getByRole('button', { name: /^close$/i });
    await userEvent.click(closeButton);
    
    await waitFor(() => {
      expect(canvas.queryByText('Navigation Menu')).not.toBeInTheDocument();
    });
  },
};

export const LeftSide: Story = {
  args: {},
  render: () => (
    <Drawer>
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
          <Button variant="default">Save Preferences</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Open left side drawer
    const triggerButton = canvas.getByRole('button', { name: /left side drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(canvas.getByText('Settings')).toBeInTheDocument();
    });
    
    // Verify drawer is on the left
    const drawerContent = canvas.getByText('Settings').closest('[data-vaul-drawer-direction]');
    expect(drawerContent).toHaveAttribute('data-vaul-drawer-direction', 'left');
    
    // Toggle a checkbox
    const darkModeCheckbox = canvas.getByLabelText(/dark mode/i);
    await userEvent.click(darkModeCheckbox);
    
    // Save preferences
    await userEvent.click(canvas.getByRole('button', { name: /save preferences/i }));
    
    await waitFor(() => {
      expect(canvas.queryByText('Settings')).not.toBeInTheDocument();
    });
  },
};

export const TopDrawer: Story = {
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
            <Button variant="ghost" className="w-full justify-start">
              Dashboard metrics
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              User settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              API documentation
            </Button>
          </div>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Open top drawer
    const triggerButton = canvas.getByRole('button', { name: /top drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(canvas.getByText('Search Everything')).toBeInTheDocument();
    });
    
    // Verify drawer is on top
    const drawerContent = canvas.getByText('Search Everything').closest('[data-vaul-drawer-direction]');
    expect(drawerContent).toHaveAttribute('data-vaul-drawer-direction', 'top');
    
    // Type in search
    const searchInput = canvas.getByPlaceholderText(/type to search/i);
    await userEvent.type(searchInput, 'test search');
    
    // Click a recent search
    await userEvent.click(canvas.getByRole('button', { name: /dashboard metrics/i }));
    
    await waitFor(() => {
      expect(canvas.queryByText('Search Everything')).not.toBeInTheDocument();
    });
  },
};

export const NestedDrawers: Story = {
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
    const mainTrigger = canvas.getByRole('button', { name: /open main drawer/i });
    await userEvent.click(mainTrigger);
    
    // Wait for main drawer
    await waitFor(() => {
      expect(canvas.getByText('Main Drawer')).toBeInTheDocument();
    });
    
    // Open nested drawer
    const nestedTrigger = canvas.getByRole('button', { name: /open nested drawer/i });
    await userEvent.click(nestedTrigger);
    
    // Wait for nested drawer
    await waitFor(() => {
      expect(canvas.getByText('Nested Drawer')).toBeInTheDocument();
    });
    
    // Close nested drawer
    await userEvent.click(canvas.getByRole('button', { name: /close nested/i }));
    
    await waitFor(() => {
      expect(canvas.queryByText('Nested Drawer')).not.toBeInTheDocument();
    });
    
    // Main drawer should still be open
    expect(canvas.getByText('Main Drawer')).toBeInTheDocument();
    
    // Close main drawer
    await userEvent.click(canvas.getByRole('button', { name: /close main/i }));
  },
};

export const StickyHeaderFooter: Story = {
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
          <Button variant="default">Confirm Action</Button>
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
    const triggerButton = canvas.getByRole('button', { name: /long content drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(canvas.getByText('Long Content')).toBeInTheDocument();
    });
    
    // Verify multiple items are rendered
    expect(canvas.getByText('Item 1')).toBeInTheDocument();
    expect(canvas.getByText('Item 20')).toBeInTheDocument();
    
    // Verify sticky header and footer
    const header = canvas.getByText('Long Content').parentElement?.parentElement;
    expect(header).toHaveClass('sticky');
    
    // Click confirm action
    await userEvent.click(canvas.getByRole('button', { name: /confirm action/i }));
    
    await waitFor(() => {
      expect(canvas.queryByText('Long Content')).not.toBeInTheDocument();
    });
  },
};

export const CustomStyling: Story = {
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
    const triggerButton = canvas.getByRole('button', { name: /danger zone/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(canvas.getByText('Delete Account')).toBeInTheDocument();
    });
    
    // Verify custom styling is applied
    const drawerContent = canvas.getByText('Delete Account').closest('[role="dialog"]');
    expect(drawerContent).toHaveClass('bg-gradient-to-b');
    
    // Type in confirmation field
    const confirmInput = canvas.getByPlaceholderText(/type DELETE to confirm/i);
    await userEvent.type(confirmInput, 'DEL');
    
    // Delete button should still be disabled (wrong text)
    const deleteButton = canvas.getByRole('button', { name: /delete account forever/i });
    expect(deleteButton).toBeDisabled();
    
    // Click cancel
    await userEvent.click(canvas.getByRole('button', { name: /i changed my mind/i }));
    
    await waitFor(() => {
      expect(canvas.queryByText('Delete Account')).not.toBeInTheDocument();
    });
  },
};

export const MobileOptimized: Story = {
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
    const triggerButton = canvas.getByRole('button', { name: /mobile drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(canvas.getByText('Mobile Optimized')).toBeInTheDocument();
    });
    
    // Click primary action
    await userEvent.click(canvas.getByRole('button', { name: /primary action/i }));
    
    // Drawer should close
    await waitFor(() => {
      expect(canvas.queryByText('Mobile Optimized')).not.toBeInTheDocument();
    });
    
    // Open again to test close button
    await userEvent.click(triggerButton);
    
    await waitFor(() => {
      expect(canvas.getByText('Mobile Optimized')).toBeInTheDocument();
    });
    
    // Close with close button
    await userEvent.click(canvas.getByRole('button', { name: /^close$/i }));
  },
};
