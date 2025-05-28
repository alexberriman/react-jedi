import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor, screen } from "@storybook/test";
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
    
    // Wait for drawer to appear (drawer renders in a portal)
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
    
    // Interact with form fields - be more specific with the selector
    const nameInput = screen.getByRole('textbox', { name: /^name$/i });
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'John Doe');
    
    const bioTextarea = screen.getByLabelText(/bio/i);
    await userEvent.type(bioTextarea, 'This is my bio');
    
    // Click Cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);
    
    // Verify drawer closes - wait a bit longer for animation
    await waitFor(() => {
      expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
    }, { timeout: 5000 });
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
      expect(screen.getByText('Navigation Menu')).toBeInTheDocument();
    });
    
    // Verify drawer is on the right (has data attribute)
    const drawerContent = screen.getByText('Navigation Menu').closest('[data-vaul-drawer-direction]');
    expect(drawerContent).toHaveAttribute('data-vaul-drawer-direction', 'right');
    
    // Click a navigation button
    await userEvent.click(screen.getByRole('button', { name: /dashboard/i }));
    
    // Close drawer
    const closeButton = screen.getByRole('button', { name: /^close$/i });
    await userEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Navigation Menu')).not.toBeInTheDocument();
    }, { timeout: 5000 });
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
          <DrawerClose asChild>
            <Button variant="default">Save Preferences</Button>
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
    
    // Open left side drawer
    const triggerButton = canvas.getByRole('button', { name: /left side drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
    
    // Verify drawer is on the left
    const drawerContent = screen.getByText('Settings').closest('[data-vaul-drawer-direction]');
    expect(drawerContent).toHaveAttribute('data-vaul-drawer-direction', 'left');
    
    // Toggle a checkbox
    const darkModeCheckbox = screen.getByLabelText(/dark mode/i);
    await userEvent.click(darkModeCheckbox);
    
    // Save preferences
    await userEvent.click(screen.getByRole('button', { name: /save preferences/i }));
    
    await waitFor(() => {
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    }, { timeout: 5000 });
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
    const triggerButton = canvas.getByRole('button', { name: /top drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(screen.getByText('Search Everything')).toBeInTheDocument();
    });
    
    // Verify drawer is on top
    const drawerContent = screen.getByText('Search Everything').closest('[data-vaul-drawer-direction]');
    expect(drawerContent).toHaveAttribute('data-vaul-drawer-direction', 'top');
    
    // Type in search
    const searchInput = screen.getByPlaceholderText(/type to search/i);
    await userEvent.type(searchInput, 'test search');
    
    // Click a recent search
    await userEvent.click(screen.getByRole('button', { name: /dashboard metrics/i }));
    
    await waitFor(() => {
      expect(screen.queryByText('Search Everything')).not.toBeInTheDocument();
    }, { timeout: 5000 });
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
      expect(screen.getByText('Main Drawer')).toBeInTheDocument();
    });
    
    // Open nested drawer
    const nestedTrigger = screen.getByRole('button', { name: /open nested drawer/i });
    await userEvent.click(nestedTrigger);
    
    // Wait for nested drawer
    await waitFor(() => {
      expect(screen.getByText('Nested Drawer')).toBeInTheDocument();
    });
    
    // Close nested drawer
    await userEvent.click(screen.getByRole('button', { name: /close nested/i }));
    
    await waitFor(() => {
      expect(screen.queryByText('Nested Drawer')).not.toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Main drawer should still be open
    expect(screen.getByText('Main Drawer')).toBeInTheDocument();
    
    // Close main drawer
    await userEvent.click(screen.getByRole('button', { name: /close main/i }));
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
    const triggerButton = canvas.getByRole('button', { name: /long content drawer/i });
    await userEvent.click(triggerButton);
    
    // Wait for drawer
    await waitFor(() => {
      expect(screen.getByText('Long Content')).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Verify multiple items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 20')).toBeInTheDocument();
    
    // Verify sticky header and footer
    const header = screen.getByText('Long Content').closest('[class*="sticky"]');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('sticky');
    
    // Click confirm action
    await userEvent.click(screen.getByRole('button', { name: /confirm action/i }));
    
    await waitFor(() => {
      expect(screen.queryByText('Long Content')).not.toBeInTheDocument();
    }, { timeout: 5000 });
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
    
    // Wait for drawer (might be in a portal)
    await waitFor(() => {
      expect(screen.getByText('Delete Account')).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Verify custom styling is applied
    const drawerContent = screen.getByText('Delete Account').closest('[role="dialog"]');
    expect(drawerContent).toHaveClass('bg-gradient-to-b');
    
    // Type in confirmation field
    const confirmInput = screen.getByPlaceholderText(/type DELETE to confirm/i);
    await userEvent.type(confirmInput, 'DEL');
    
    // Delete button should still be disabled (wrong text)
    const deleteButton = screen.getByRole('button', { name: /delete account forever/i });
    expect(deleteButton).toBeDisabled();
    
    // Click cancel
    await userEvent.click(screen.getByRole('button', { name: /i changed my mind/i }));
    
    await waitFor(() => {
      expect(screen.queryByText('Delete Account')).not.toBeInTheDocument();
    }, { timeout: 5000 });
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
      expect(screen.getByText('Mobile Optimized')).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Click primary action
    await userEvent.click(screen.getByRole('button', { name: /primary action/i }));
    
    // Drawer should stay open since Primary Action doesn't close it
    expect(screen.getByText('Mobile Optimized')).toBeInTheDocument();
    
    // Click close button to close drawer
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    
    // Drawer should close
    await waitFor(() => {
      expect(screen.queryByText('Mobile Optimized')).not.toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Open again to test close button
    await userEvent.click(triggerButton);
    
    await waitFor(() => {
      expect(screen.getByText('Mobile Optimized')).toBeInTheDocument();
    });
    
    // Close with close button
    await userEvent.click(screen.getByRole('button', { name: /^close$/i }));
  },
};
