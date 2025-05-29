import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";
import { Button } from "../button";
import { useState } from "react";
import {
  Cloud,
  CreditCard,
  Code2,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

const meta = {
  title: "Components/Overlay/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },

  tags: ['ui-dropdown-menu'],} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Keyboard className="mr-2 h-4 w-4" />
          <span>Keyboard shortcuts</span>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Code2 className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Open dropdown menu
    const triggerButton = canvas.getByRole('button', { name: /open menu/i });
    await userEvent.click(triggerButton);
    
    // Wait for menu to appear in the document
    await waitFor(() => {
      expect(within(document.body).getByText('My Account')).toBeInTheDocument();
    });
    
    // Verify menu items are visible
    expect(within(document.body).getByText('Profile')).toBeInTheDocument();
    expect(within(document.body).getByText('Billing')).toBeInTheDocument();
    expect(within(document.body).getByText('Settings')).toBeInTheDocument();
    
    // Verify disabled item
    const apiItem = within(document.body).getByText('API').closest('[role="menuitem"]');
    expect(apiItem).toHaveAttribute('aria-disabled', 'true');
    
    // Click on a menu item
    const profileItem = within(document.body).getByText('Profile').closest('[role="menuitem"]');
    await userEvent.click(profileItem!);
    
    // Menu should close after clicking an item
    await waitFor(() => {
      expect(within(document.body).queryByText('My Account')).not.toBeInTheDocument();
    });
  },
};

function WithCheckboxesExample() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

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

export const WithCheckboxes: Story = {
  render: () => <WithCheckboxesExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Open dropdown
    const triggerButton = canvas.getByRole('button', { name: /open menu/i });
    await userEvent.click(triggerButton);
    
    // Wait for menu to appear
    await waitFor(() => {
      expect(within(document.body).getByText('Appearance')).toBeInTheDocument();
    });
    
    // Verify initial checkbox states
    const statusBarCheckbox = within(document.body).getByRole('menuitemcheckbox', { name: /status bar/i });
    const activityBarCheckbox = within(document.body).getByRole('menuitemcheckbox', { name: /activity bar/i });
    const panelCheckbox = within(document.body).getByRole('menuitemcheckbox', { name: /panel/i });
    
    expect(statusBarCheckbox).toHaveAttribute('aria-checked', 'true');
    expect(activityBarCheckbox).toHaveAttribute('aria-checked', 'false');
    expect(activityBarCheckbox).toHaveAttribute('aria-disabled', 'true');
    expect(panelCheckbox).toHaveAttribute('aria-checked', 'false');
    
    // Click on Status Bar checkbox to uncheck it
    await userEvent.click(statusBarCheckbox);
    
    // Verify it toggled
    expect(statusBarCheckbox).toHaveAttribute('aria-checked', 'false');
    
    // Click on Panel checkbox to check it
    await userEvent.click(panelCheckbox);
    
    // Verify it toggled
    expect(panelCheckbox).toHaveAttribute('aria-checked', 'true');
    
    // Verify disabled checkbox cannot be clicked (it has aria-disabled)
    expect(activityBarCheckbox).toHaveAttribute('aria-disabled', 'true');
    expect(activityBarCheckbox).toHaveAttribute('aria-checked', 'false');
    
    // Close menu by clicking outside
    await userEvent.click(document.body);
    
    // Menu should close
    await waitFor(() => {
      expect(within(document.body).queryByText('Appearance')).not.toBeInTheDocument();
    });
  },
};

function WithRadioGroupExample() {
  const [position, setPosition] = useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const WithRadioGroup: Story = {
  render: () => <WithRadioGroupExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Open dropdown
    const triggerButton = canvas.getByRole('button', { name: /open menu/i });
    await userEvent.click(triggerButton);
    
    // Wait for menu to appear
    await waitFor(() => {
      expect(within(document.body).getByText('Panel Position')).toBeInTheDocument();
    });
    
    // Verify initial radio selection (bottom is selected by default)
    const topRadio = within(document.body).getByRole('menuitemradio', { name: /top/i });
    const bottomRadio = within(document.body).getByRole('menuitemradio', { name: /bottom/i });
    const rightRadio = within(document.body).getByRole('menuitemradio', { name: /right/i });
    
    expect(topRadio).toHaveAttribute('aria-checked', 'false');
    expect(bottomRadio).toHaveAttribute('aria-checked', 'true');
    expect(rightRadio).toHaveAttribute('aria-checked', 'false');
    
    // Click on Top radio
    await userEvent.click(topRadio);
    
    // Verify selection changed
    expect(topRadio).toHaveAttribute('aria-checked', 'true');
    expect(bottomRadio).toHaveAttribute('aria-checked', 'false');
    expect(rightRadio).toHaveAttribute('aria-checked', 'false');
    
    // Click on Right radio
    await userEvent.click(rightRadio);
    
    // Verify selection changed again
    expect(topRadio).toHaveAttribute('aria-checked', 'false');
    expect(bottomRadio).toHaveAttribute('aria-checked', 'false');
    expect(rightRadio).toHaveAttribute('aria-checked', 'true');
    
    // Close menu
    await userEvent.keyboard('{Escape}');
    
    // Menu should close
    await waitFor(() => {
      expect(within(document.body).queryByText('Panel Position')).not.toBeInTheDocument();
    });
  },
};

export const WithSubMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Team</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Code2 className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function ComplexExampleComponent() {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState("pedro");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Complex Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Preferences</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            Show Bookmarks
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked} disabled>
            Show Full URLs
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Team Members</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={person} onValueChange={setPerson}>
          <DropdownMenuRadioItem value="pedro">
            <User className="mr-2 h-4 w-4" />
            Pedro Duarte
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="colm">
            <User className="mr-2 h-4 w-4" />
            Colm Tuite
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            <span>Teams</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <span>Design Team</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Engineering Team</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>More Teams</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>Marketing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sales</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const ComplexExample: Story = {
  render: () => <ComplexExampleComponent />,
};

export const WithCustomTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
          <span className="sr-only">Open menu</span>
          JD
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>John Doe</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Find custom trigger button (avatar button with JD initials)
    const triggerButton = canvas.getByText('JD');
    await userEvent.click(triggerButton);
    
    // Wait for menu to appear
    await waitFor(() => {
      expect(within(document.body).getByText('John Doe')).toBeInTheDocument();
    });
    
    // Verify menu items
    expect(within(document.body).getByText('Profile')).toBeInTheDocument();
    expect(within(document.body).getByText('Settings')).toBeInTheDocument();
    expect(within(document.body).getByText('Log out')).toBeInTheDocument();
    
    // Click Settings
    const settingsItem = within(document.body).getByText('Settings').closest('[role="menuitem"]');
    await userEvent.click(settingsItem!);
    
    // Menu should close
    await waitFor(() => {
      expect(within(document.body).queryByText('John Doe')).not.toBeInTheDocument();
    });
  },
};
