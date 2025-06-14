import type { Meta, StoryObj } from "@storybook/react-vite";
import { KeyboardNavigationMenu, MenuItem } from "./keyboard-navigation-menu";
import { Home, User, Settings, Mail, Calendar, Bell, HelpCircle, LogOut } from "lucide-react";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta: Meta<typeof KeyboardNavigationMenu> = {
  title: "Components/KeyboardNavigationMenu",
  component: KeyboardNavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
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

// Convert menuItems to SDUI-compatible format (without React components)
const sduiMenuItems = [
  {
    id: "home",
    label: "Home",
    icon: "Home",
    shortcut: "Ctrl+H",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "User",
    submenu: [
      {
        id: "view-profile",
        label: "View Profile",
        shortcut: "Ctrl+P",
      },
      {
        id: "edit-profile",
        label: "Edit Profile",
      },
      {
        id: "privacy",
        label: "Privacy Settings",
        submenu: [
          {
            id: "data-privacy",
            label: "Data Privacy",
          },
          {
            id: "visibility",
            label: "Profile Visibility",
          },
        ],
      },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: "Mail",
    shortcut: "Ctrl+M",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: "Calendar",
    shortcut: "Ctrl+K",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "Bell",
    disabled: true,
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    shortcut: "Ctrl+,",
    submenu: [
      {
        id: "general",
        label: "General",
      },
      {
        id: "appearance",
        label: "Appearance",
      },
      {
        id: "integrations",
        label: "Integrations",
      },
    ],
  },
  {
    id: "help",
    label: "Help",
    icon: "HelpCircle",
    shortcut: "F1",
  },
  {
    id: "logout",
    label: "Logout",
    icon: "LogOut",
    shortcut: "Ctrl+Q",
  },
];

export const Vertical = enhanceStoryForDualMode<typeof KeyboardNavigationMenu>({
  args: {
    items: menuItems,
    orientation: "vertical",
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
    role: "navigation" as const,
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
    const user = userEvent.setup();

    // Wait for the navigation menu to be rendered
    const menu = await waitFor(
      async () => {
        return canvas.getByRole("navigation");
      },
      { timeout: 5000 }
    );
    expect(menu).toBeInTheDocument();

    // Test keyboard navigation with arrow down
    await user.click(menu);
    await user.keyboard("{arrowdown}");

    // Test selecting an item with Enter
    await user.keyboard("{enter}");

    // Test type-ahead search
    await user.keyboard("m");

    // Test escape to clear
    await user.keyboard("{escape}");
  },
}, {
  renderSpec: {
    type: "KeyboardNavigationMenu",
    items: sduiMenuItems,
    orientation: "vertical",
    role: "navigation",
  }
}) as Story;

export const Horizontal = enhanceStoryForDualMode<typeof KeyboardNavigationMenu>({
  args: {
    items: menuItems.slice(0, 5), // Fewer items for horizontal layout
    orientation: "horizontal",
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
    role: "navigation" as const,
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
    const user = userEvent.setup();

    // Wait for the navigation menu to be rendered
    const menu = await waitFor(
      async () => {
        return canvas.getByRole("navigation");
      },
      { timeout: 5000 }
    );
    expect(menu).toBeInTheDocument();

    // Test horizontal navigation with arrow keys
    await user.click(menu);
    await user.keyboard("{arrowright}");
    await user.keyboard("{arrowleft}");

    // Test selection
    await user.keyboard("{space}");
  },
}, {
  renderSpec: {
    type: "KeyboardNavigationMenu",
    items: sduiMenuItems.slice(0, 5),
    orientation: "horizontal",
    role: "navigation",
  }
}) as Story;

export const WithoutShortcuts = enhanceStoryForDualMode<typeof KeyboardNavigationMenu>({
  args: {
    items: menuItems,
    showShortcuts: false,
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
    role: "navigation" as const,
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

    // Wait for menu to render without shortcuts
    const menu = await waitFor(
      async () => {
        return canvas.getByRole("navigation");
      },
      { timeout: 5000 }
    );
    expect(menu).toBeInTheDocument();

    // Verify shortcuts are not displayed
    const shortcuts = canvas.queryAllByText(/Ctrl\+/);
    expect(shortcuts).toHaveLength(0);
  },
}, {
  renderSpec: {
    type: "KeyboardNavigationMenu",
    items: sduiMenuItems,
    showShortcuts: false,
    role: "navigation",
  }
}) as Story;

const nestedMenuItems = [
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
];

export const NestedMenus = enhanceStoryForDualMode<typeof KeyboardNavigationMenu>({
  args: {
    items: nestedMenuItems,
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
    role: "navigation" as const,
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
    const user = userEvent.setup();

    // Wait for the navigation menu to be rendered
    const menu = await waitFor(
      async () => {
        return canvas.getByRole("navigation");
      },
      { timeout: 5000 }
    );
    expect(menu).toBeInTheDocument();

    // Test navigating through nested menus
    await user.click(menu);
    await user.keyboard("{arrowdown}"); // Navigate to File
    await user.keyboard("{arrowright}"); // Expand File submenu
    await user.keyboard("{arrowdown}"); // Navigate to New
    await user.keyboard("{arrowright}"); // Expand New submenu

    // Test collapsing with left arrow
    await user.keyboard("{arrowleft}");
    await user.keyboard("{arrowleft}");

    // Test Home and End keys
    await user.keyboard("{home}");
    await user.keyboard("{end}");
  },
}, {
  renderSpec: {
    type: "KeyboardNavigationMenu",
    items: nestedMenuItems,
    role: "navigation",
  }
}) as Story;

export const AccessibilityDemo = enhanceStoryForDualMode<typeof KeyboardNavigationMenu>({
  args: {
    items: menuItems,
    onSelect: (item: MenuItem) => console.log("Selected:", item.label),
    role: "navigation" as const,
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
      <KeyboardNavigationMenu
        items={args.items || menuItems}
        onSelect={args.onSelect}
        showShortcuts={args.showShortcuts}
        orientation={args.orientation}
        role={args.role}
      />
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
    const user = userEvent.setup();

    // Check if we're in React mode (has instructions) or SDUI mode (no instructions)
    const isReactMode = canvasElement.querySelector('[data-testid="react-render"]');
    
    if (isReactMode) {
      // Only verify instructions in React mode
      const instructions = await canvas.findByText("Keyboard Navigation Tips:");
      expect(instructions).toBeInTheDocument();
    }

    // Wait for the navigation menu to be rendered
    const menu = await waitFor(
      async () => {
        return canvas.getByRole("navigation");
      },
      { timeout: 5000 }
    );
    expect(menu).toBeInTheDocument();

    // Test comprehensive keyboard navigation
    await user.click(menu);

    // Test arrow navigation
    await user.keyboard("{arrowdown}");
    await user.keyboard("{arrowup}");

    // Test expand/collapse submenu
    await user.keyboard("{arrowdown}"); // Navigate to Profile

    // Find Profile menu item
    const profileItem = canvas.getByText("Profile").closest('[role="menuitem"]');
    expect(profileItem).toBeTruthy();

    // Expand submenu with right arrow or click
    await user.click(profileItem!);

    // Give time for submenu to expand
    await new Promise((resolve) => globalThis.setTimeout(resolve, 1000));

    // Check if submenu is rendered - it should be visible after expanding
    const viewProfileElements = canvas.queryAllByText("View Profile");
    expect(viewProfileElements.length).toBeGreaterThan(0);

    // Test typeahead search
    await user.keyboard("h"); // Should jump to Help

    // Test Home and End keys
    await user.keyboard("{home}");
    await user.keyboard("{end}");

    // Test escape
    await user.keyboard("{escape}");
  },
}, {
  renderSpec: {
    type: "KeyboardNavigationMenu",
    items: sduiMenuItems,
    role: "navigation",
    // Note: The instructions wrapper is not included in SDUI mode
  }
}) as Story;
