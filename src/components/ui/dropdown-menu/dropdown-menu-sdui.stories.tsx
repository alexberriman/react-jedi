import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";
import { Button } from "../button";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";
import * as React from "react";

const meta = {
  title: "Components/DropdownMenu/SDUI Test",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["test"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSDUI: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Open dropdown menu
      const triggerButton = canvas.getByRole("button", { name: /open menu/i });
      await user.click(triggerButton);

      // Wait for menu to appear in the document
      await waitFor(() => {
        expect(within(document.body).getByText("My Account")).toBeInTheDocument();
      });

      // Verify menu items are visible
      expect(within(document.body).getByText("Profile")).toBeInTheDocument();
      expect(within(document.body).getByText("Billing")).toBeInTheDocument();
      expect(within(document.body).getByText("Settings")).toBeInTheDocument();

      // Close menu
      await user.keyboard("{Escape}");
    },
  },
  {
    renderSpec: {
      type: "DropdownMenu",
      children: [
        {
          type: "DropdownMenuTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Open Menu",
          },
        },
        {
          type: "DropdownMenuContent",
          className: "w-56",
          children: [
            {
              type: "DropdownMenuLabel",
              children: "My Account",
            },
            {
              type: "DropdownMenuSeparator",
            },
            {
              type: "DropdownMenuItem",
              children: "Profile",
            },
            {
              type: "DropdownMenuItem",
              children: "Billing",
            },
            {
              type: "DropdownMenuItem",
              children: "Settings",
            },
            {
              type: "DropdownMenuSeparator",
            },
            {
              type: "DropdownMenuItem",
              disabled: true,
              children: "API",
            },
            {
              type: "DropdownMenuSeparator",
            },
            {
              type: "DropdownMenuItem",
              variant: "destructive",
              children: "Log out",
            },
          ],
        },
      ],
    },
  }
);

function WithCheckboxesSDUIExample() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const WithCheckboxesSDUI: Story = {
  render: () => <WithCheckboxesSDUIExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Open dropdown
    const triggerButton = canvas.getByRole("button", { name: /open menu/i });
    await user.click(triggerButton);

    // Wait for menu to appear
    await waitFor(() => {
      expect(within(document.body).getByText("Appearance")).toBeInTheDocument();
    });

    // Verify initial checkbox states
    const statusBarCheckbox = within(document.body).getByRole("menuitemcheckbox", {
      name: /status bar/i,
    });
    expect(statusBarCheckbox).toHaveAttribute("aria-checked", "true");
  },
};

export const SimpleSeparator: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    renderSpec: {
      type: "DropdownMenu",
      children: [
        {
          type: "DropdownMenuTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Menu",
          },
        },
        {
          type: "DropdownMenuContent",
          children: [
            {
              type: "DropdownMenuItem",
              children: "Item 1",
            },
            {
              type: "DropdownMenuSeparator",
            },
            {
              type: "DropdownMenuItem",
              children: "Item 2",
            },
          ],
        },
      ],
    },
  }
);

export const WithGroups: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Grouped Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Group 1</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Group 1 - Item 1</DropdownMenuItem>
            <DropdownMenuItem>Group 1 - Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Group 2</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Group 2 - Item 1</DropdownMenuItem>
            <DropdownMenuItem>Group 2 - Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    renderSpec: {
      type: "DropdownMenu",
      children: [
        {
          type: "DropdownMenuTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Grouped Menu",
          },
        },
        {
          type: "DropdownMenuContent",
          className: "w-56",
          children: [
            {
              type: "DropdownMenuLabel",
              children: "Group 1",
            },
            {
              type: "DropdownMenuGroup",
              children: [
                {
                  type: "DropdownMenuItem",
                  children: "Group 1 - Item 1",
                },
                {
                  type: "DropdownMenuItem",
                  children: "Group 1 - Item 2",
                },
              ],
            },
            {
              type: "DropdownMenuSeparator",
            },
            {
              type: "DropdownMenuLabel",
              children: "Group 2",
            },
            {
              type: "DropdownMenuGroup",
              children: [
                {
                  type: "DropdownMenuItem",
                  children: "Group 2 - Item 1",
                },
                {
                  type: "DropdownMenuItem",
                  children: "Group 2 - Item 2",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithSubmenu: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Submenu Test</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>Regular Item</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>More Options</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sub Item 3</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Another Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    renderSpec: {
      type: "DropdownMenu",
      children: [
        {
          type: "DropdownMenuTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Submenu Test",
          },
        },
        {
          type: "DropdownMenuContent",
          className: "w-56",
          children: [
            {
              type: "DropdownMenuItem",
              children: "Regular Item",
            },
            {
              type: "DropdownMenuSeparator",
            },
            {
              type: "DropdownMenuSub",
              children: [
                {
                  type: "DropdownMenuSubTrigger",
                  children: "More Options",
                },
                {
                  type: "DropdownMenuSubContent",
                  children: [
                    {
                      type: "DropdownMenuItem",
                      children: "Sub Item 1",
                    },
                    {
                      type: "DropdownMenuItem",
                      children: "Sub Item 2",
                    },
                    {
                      type: "DropdownMenuSeparator",
                    },
                    {
                      type: "DropdownMenuItem",
                      children: "Sub Item 3",
                    },
                  ],
                },
              ],
            },
            {
              type: "DropdownMenuSeparator",
            },
            {
              type: "DropdownMenuItem",
              children: "Another Item",
            },
          ],
        },
      ],
    },
  }
);