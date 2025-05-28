import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardNavigationMenu, MenuItem } from "./keyboard-navigation-menu";
import { Home, User, Settings, Mail, Calendar, Bell, HelpCircle, LogOut } from "lucide-react";
import { within, userEvent, expect, waitFor } from "@storybook/test";

const meta: Meta<typeof KeyboardNavigationMenu> = {
  title: "Components/UI/KeyboardNavigationMenu",
  component: KeyboardNavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home size={16} />,
    shortcut: "Ctrl+H",
    action: () => console.log("Home clicked"),
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User size={16} />,
    submenu: [
      {
        id: "view-profile",
        label: "View Profile",
        shortcut: "Ctrl+P",
        action: () => console.log("View Profile clicked"),
      },
      {
        id: "edit-profile",
        label: "Edit Profile",
        action: () => console.log("Edit Profile clicked"),
      },
      {
        id: "privacy",
        label: "Privacy Settings",
        submenu: [
          {
            id: "data-privacy",
            label: "Data Privacy",
            action: () => console.log("Data Privacy clicked"),
          },
          {
            id: "visibility",
            label: "Profile Visibility",
            action: () => console.log("Profile Visibility clicked"),
          },
        ],
      },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail size={16} />,
    shortcut: "Ctrl+M",
    action: () => console.log("Messages clicked"),
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: <Calendar size={16} />,
    shortcut: "Ctrl+K",
    action: () => console.log("Calendar clicked"),
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell size={16} />,
    disabled: true,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={16} />,
    shortcut: "Ctrl+,",
    submenu: [
      {
        id: "general",
        label: "General",
        action: () => console.log("General settings clicked"),
      },
      {
        id: "appearance",
        label: "Appearance",
        action: () => console.log("Appearance clicked"),
      },
      {
        id: "integrations",
        label: "Integrations",
        action: () => console.log("Integrations clicked"),
      },
    ],
  },
  {
    id: "help",
    label: "Help",
    icon: <HelpCircle size={16} />,
    shortcut: "F1",
    action: () => console.log("Help clicked"),
  },
  {
    id: "logout",
    label: "Logout",
    icon: <LogOut size={16} />,
    shortcut: "Ctrl+Q",
    action: () => console.log("Logout clicked"),
  },
];

export const Vertical: Story = {
  args: {
    items: menuItems,
    orientation: "vertical",
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A vertical menu with keyboard navigation. Use arrow keys to navigate, Enter to select, and type to search.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the navigation menu
    const menu = await canvas.findByRole("navigation");
    expect(menu).toBeInTheDocument();
    
    // Test keyboard navigation with arrow down
    await userEvent.click(menu);
    await userEvent.keyboard("{arrowdown}");
    
    // Test selecting an item with Enter
    await userEvent.keyboard("{enter}");
    
    // Test type-ahead search
    await userEvent.keyboard("m");
    
    // Test escape to clear
    await userEvent.keyboard("{escape}");
  },
};

export const Horizontal: Story = {
  args: {
    items: menuItems.slice(0, 5), // Fewer items for horizontal layout
    orientation: "horizontal",
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
  },
  parameters: {
    docs: {
      description: {
        story: "A horizontal menu with keyboard navigation. Use left/right arrow keys to navigate.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the navigation menu
    const menu = await canvas.findByRole("navigation");
    expect(menu).toBeInTheDocument();
    
    // Test horizontal navigation with arrow keys
    await userEvent.click(menu);
    await userEvent.keyboard("{arrowright}");
    await userEvent.keyboard("{arrowleft}");
    
    // Test selection
    await userEvent.keyboard("{space}");
  },
};

export const WithoutShortcuts: Story = {
  args: {
    items: menuItems,
    showShortcuts: false,
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
  },
  parameters: {
    docs: {
      description: {
        story: "Menu without showing keyboard shortcuts.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify menu renders without shortcuts
    const menu = await canvas.findByRole("navigation");
    expect(menu).toBeInTheDocument();
    
    // Verify shortcuts are not displayed
    const shortcuts = canvas.queryAllByText(/Ctrl\+/);
    expect(shortcuts).toHaveLength(0);
  },
};

export const NestedMenus: Story = {
  args: {
    items: [
      {
        id: "file",
        label: "File",
        submenu: [
          {
            id: "new",
            label: "New",
            submenu: [
              { id: "new-file", label: "New File", shortcut: "Ctrl+N" },
              { id: "new-folder", label: "New Folder" },
              { id: "new-project", label: "New Project", shortcut: "Ctrl+Shift+N" },
            ],
          },
          { id: "open", label: "Open", shortcut: "Ctrl+O" },
          { id: "save", label: "Save", shortcut: "Ctrl+S" },
          { id: "save-as", label: "Save As...", shortcut: "Ctrl+Shift+S" },
        ],
      },
      {
        id: "edit",
        label: "Edit",
        submenu: [
          { id: "undo", label: "Undo", shortcut: "Ctrl+Z" },
          { id: "redo", label: "Redo", shortcut: "Ctrl+Y" },
          { id: "cut", label: "Cut", shortcut: "Ctrl+X" },
          { id: "copy", label: "Copy", shortcut: "Ctrl+C" },
          { id: "paste", label: "Paste", shortcut: "Ctrl+V" },
        ],
      },
      {
        id: "view",
        label: "View",
        submenu: [
          { id: "zoom-in", label: "Zoom In", shortcut: "Ctrl++" },
          { id: "zoom-out", label: "Zoom Out", shortcut: "Ctrl+-" },
          { id: "reset-zoom", label: "Reset Zoom", shortcut: "Ctrl+0" },
          { id: "fullscreen", label: "Fullscreen", shortcut: "F11" },
        ],
      },
    ],
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
  },
  parameters: {
    docs: {
      description: {
        story: "Deeply nested menu structure with multiple levels of submenus.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the navigation menu
    const menu = await canvas.findByRole("navigation");
    expect(menu).toBeInTheDocument();
    
    // Test navigating through nested menus
    await userEvent.click(menu);
    await userEvent.keyboard("{arrowdown}"); // Navigate to File
    await userEvent.keyboard("{arrowright}"); // Expand File submenu
    await userEvent.keyboard("{arrowdown}"); // Navigate to New
    await userEvent.keyboard("{arrowright}"); // Expand New submenu
    
    // Test collapsing with left arrow
    await userEvent.keyboard("{arrowleft}");
    await userEvent.keyboard("{arrowleft}");
    
    // Test Home and End keys
    await userEvent.keyboard("{home}");
    await userEvent.keyboard("{end}");
  },
};

export const AccessibilityDemo: Story = {
  args: {
    items: menuItems,
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded">
        <h3 className="font-semibold mb-2">Keyboard Navigation Tips:</h3>
        <ul className="text-sm space-y-1">
          <li>
            • Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate vertically
          </li>
          <li>
            • Use <kbd>→</kbd> to expand submenus
          </li>
          <li>
            • Use <kbd>←</kbd> to collapse submenus
          </li>
          <li>
            • Press <kbd>Enter</kbd> or <kbd>Space</kbd> to select
          </li>
          <li>• Type to search for items (typeahead)</li>
          <li>
            • Press <kbd>Home</kbd> to go to first item
          </li>
          <li>
            • Press <kbd>End</kbd> to go to last item
          </li>
          <li>
            • Press <kbd>Escape</kbd> to clear selection
          </li>
        </ul>
      </div>
      <KeyboardNavigationMenu items={args.items || menuItems} onSelect={args.onSelect} showShortcuts={args.showShortcuts} orientation={args.orientation} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full demonstration of keyboard navigation features with instructions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify instructions are displayed
    const instructions = await canvas.findByText("Keyboard Navigation Tips:");
    expect(instructions).toBeInTheDocument();
    
    // Find the navigation menu
    const menu = await canvas.findByRole("navigation");
    expect(menu).toBeInTheDocument();
    
    // Test comprehensive keyboard navigation
    await userEvent.click(menu);
    
    // Test arrow navigation
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{arrowup}");
    
    // Test expand/collapse submenu
    await userEvent.keyboard("{arrowdown}"); // Navigate to Profile
    await userEvent.keyboard("{arrowright}"); // Expand submenu
    await waitFor(() => {
      const submenuItem = canvas.queryByText("View Profile");
      expect(submenuItem).toBeInTheDocument();
    });
    
    // Test typeahead search
    await userEvent.keyboard("h"); // Should jump to Help
    
    // Test Home and End keys
    await userEvent.keyboard("{home}");
    await userEvent.keyboard("{end}");
    
    // Test escape
    await userEvent.keyboard("{escape}");
  },
};
