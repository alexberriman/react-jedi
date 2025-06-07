import type { Meta, StoryObj } from "@storybook/react-vite";
import { render } from "../../../lib/render";
import type { KeyboardNavigationMenuSpec } from "../../../types/components/keyboard-navigation-menu";
import { within, userEvent, expect, waitFor } from "storybook/test";

const meta: Meta = {
  title: "SDUI/KeyboardNavigationMenu",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
};

export default meta;
type Story = StoryObj;

// Helper to create a wrapper component for SDUI rendering
interface SDUIComponentProps {
  spec: KeyboardNavigationMenuSpec | Record<string, unknown>;
  handlers?: Record<string, (...args: unknown[]) => void>;
}

const SDUIComponent = ({ spec, handlers }: SDUIComponentProps) => {
  const options = handlers ? { handlers } : {};
  return <>{render(spec as KeyboardNavigationMenuSpec, options)}</>;
};

export const BasicVerticalMenu: Story = {
  render: () => {
    const spec: KeyboardNavigationMenuSpec = {
      type: "KeyboardNavigationMenu",
      items: [
        {
          id: "home",
          label: "Home",
          icon: "home",
          shortcut: "Ctrl+H",
          action: "handleHomeClick",
        },
        {
          id: "profile",
          label: "Profile",
          icon: "user",
          action: "handleProfileClick",
        },
        {
          id: "settings",
          label: "Settings",
          icon: "settings",
          shortcut: "Ctrl+,",
          action: "handleSettingsClick",
        },
        {
          id: "help",
          label: "Help",
          icon: "help-circle",
          shortcut: "F1",
          disabled: true,
        },
      ],
      showShortcuts: true,
      orientation: "vertical",
      onSelectAction: "handleMenuSelect",
    };

    const handlers = {
      handleHomeClick: () => console.log("Home clicked"),
      handleProfileClick: () => console.log("Profile clicked"),
      handleSettingsClick: () => console.log("Settings clicked"),
      handleMenuSelect: (...args: unknown[]) => {
        const item = args[0] as { label: string };
        console.log("Menu selected:", item.label);
      },
    };

    return <SDUIComponent spec={spec} handlers={handlers} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Basic vertical menu with keyboard navigation rendered via SDUI.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Wait for menu to render
    const menu = await waitFor(
      () => canvas.getByRole("menu"),
      { timeout: 5000 }
    );
    expect(menu).toBeInTheDocument();

    // Verify menu items are rendered
    expect(canvas.getByText("Home")).toBeInTheDocument();
    expect(canvas.getByText("Profile")).toBeInTheDocument();
    expect(canvas.getByText("Settings")).toBeInTheDocument();
    expect(canvas.getByText("Help")).toBeInTheDocument();

    // Verify shortcuts are displayed
    expect(canvas.getByText("Ctrl+H")).toBeInTheDocument();
    expect(canvas.getByText("Ctrl+,")).toBeInTheDocument();
    expect(canvas.getByText("F1")).toBeInTheDocument();

    // Test keyboard navigation
    await user.click(menu);
    await user.keyboard("{arrowdown}");
    await user.keyboard("{enter}");
  },
};

export const HorizontalMenu: Story = {
  render: () => {
    const spec: KeyboardNavigationMenuSpec = {
      type: "KeyboardNavigationMenu",
      items: [
        {
          id: "file",
          label: "File",
          icon: "file",
        },
        {
          id: "edit",
          label: "Edit",
          icon: "edit",
        },
        {
          id: "view",
          label: "View",
          icon: "eye",
        },
        {
          id: "tools",
          label: "Tools",
          icon: "wrench",
        },
      ],
      orientation: "horizontal",
      role: "navigation",
    };

    return <SDUIComponent spec={spec} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal menu layout suitable for navigation bars.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Wait for navigation to render
    const nav = await waitFor(
      () => canvas.getByRole("navigation"),
      { timeout: 5000 }
    );
    expect(nav).toBeInTheDocument();

    // Test horizontal navigation
    await user.click(nav);
    await user.keyboard("{arrowright}");
    await user.keyboard("{arrowleft}");
  },
};

export const NestedSubmenus: Story = {
  render: () => {
    const spec: KeyboardNavigationMenuSpec = {
      type: "KeyboardNavigationMenu",
      items: [
        {
          id: "file",
          label: "File",
          icon: "file",
          submenu: [
            {
              id: "new",
              label: "New",
              icon: "file-plus",
              submenu: [
                { id: "new-file", label: "New File", shortcut: "Ctrl+N" },
                { id: "new-folder", label: "New Folder" },
                { id: "new-project", label: "New Project", shortcut: "Ctrl+Shift+N" },
              ],
            },
            { id: "open", label: "Open", shortcut: "Ctrl+O", icon: "folder-open" },
            { id: "save", label: "Save", shortcut: "Ctrl+S", icon: "save" },
            { id: "save-as", label: "Save As...", shortcut: "Ctrl+Shift+S" },
          ],
        },
        {
          id: "edit",
          label: "Edit",
          icon: "edit-2",
          submenu: [
            { id: "undo", label: "Undo", shortcut: "Ctrl+Z", icon: "undo" },
            { id: "redo", label: "Redo", shortcut: "Ctrl+Y", icon: "redo" },
            { id: "cut", label: "Cut", shortcut: "Ctrl+X", icon: "scissors" },
            { id: "copy", label: "Copy", shortcut: "Ctrl+C", icon: "copy" },
            { id: "paste", label: "Paste", shortcut: "Ctrl+V", icon: "clipboard" },
          ],
        },
        {
          id: "view",
          label: "View",
          icon: "eye",
          submenu: [
            { id: "zoom-in", label: "Zoom In", shortcut: "Ctrl++" },
            { id: "zoom-out", label: "Zoom Out", shortcut: "Ctrl+-" },
            { id: "reset-zoom", label: "Reset Zoom", shortcut: "Ctrl+0" },
            { id: "fullscreen", label: "Fullscreen", shortcut: "F11", icon: "maximize" },
          ],
        },
      ],
      onSelectAction: "handleMenuAction",
    };

    const handlers = {
      handleMenuAction: (...args: unknown[]) => {
        const item = args[0] as { label: string };
        console.log("Menu action:", item.label);
      },
    };

    return <SDUIComponent spec={spec} handlers={handlers} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Complex menu structure with multiple levels of nested submenus.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Wait for menu to render
    const menu = await waitFor(
      () => canvas.getByRole("menu"),
      { timeout: 5000 }
    );
    expect(menu).toBeInTheDocument();

    // Test expanding submenus
    await user.click(menu);
    const fileItem = canvas.getByText("File").closest('[role="menuitem"]');
    expect(fileItem).toBeTruthy();
    await user.click(fileItem!);

    // Wait for submenu to expand
    await waitFor(() => {
      const newItem = canvas.queryByText("New");
      expect(newItem).toBeInTheDocument();
    });
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    const spec: KeyboardNavigationMenuSpec = {
      type: "KeyboardNavigationMenu",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: "layout-dashboard",
          action: "navigateToDashboard",
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: "bar-chart",
          submenu: [
            { id: "reports", label: "Reports", icon: "file-text" },
            { id: "metrics", label: "Metrics", icon: "trending-up" },
            { id: "insights", label: "Insights", icon: "lightbulb" },
          ],
        },
        {
          id: "users",
          label: "Users",
          icon: "users",
          action: "navigateToUsers",
        },
        {
          id: "settings",
          label: "Settings",
          icon: "settings",
          action: "navigateToSettings",
        },
      ],
      className: "bg-slate-50 border border-slate-200 rounded-lg shadow-sm p-2",
      showShortcuts: false,
    };

    const handlers = {
      navigateToDashboard: () => console.log("Navigate to Dashboard"),
      navigateToUsers: () => console.log("Navigate to Users"),
      navigateToSettings: () => console.log("Navigate to Settings"),
    };

    return <SDUIComponent spec={spec} handlers={handlers} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Menu with custom styling applied through className prop.",
      },
    },
  },
};

export const ComplexInteractiveExample: Story = {
  render: () => {
    const spec = {
      type: "Container",
      className: "max-w-2xl mx-auto p-6 space-y-4",
      children: [
        {
          type: "Heading",
          level: 3,
          children: "Application Menu",
        },
        {
          type: "Text",
          children: "Navigate using keyboard: ↑↓ to move, → to expand, ← to collapse, Enter to select",
          className: "text-sm text-muted-foreground mb-4",
        },
        {
          type: "KeyboardNavigationMenu",
          items: [
            {
              id: "profile",
              label: "Profile",
              icon: "user",
              submenu: [
                {
                  id: "view-profile",
                  label: "View Profile",
                  icon: "eye",
                  shortcut: "Ctrl+P",
                  action: "viewProfile",
                },
                {
                  id: "edit-profile",
                  label: "Edit Profile",
                  icon: "edit",
                  action: "editProfile",
                },
                {
                  id: "account-settings",
                  label: "Account Settings",
                  icon: "user-cog",
                  submenu: [
                    {
                      id: "privacy",
                      label: "Privacy",
                      icon: "shield",
                      action: "openPrivacy",
                    },
                    {
                      id: "security",
                      label: "Security",
                      icon: "lock",
                      action: "openSecurity",
                    },
                    {
                      id: "notifications",
                      label: "Notifications",
                      icon: "bell",
                      action: "openNotifications",
                    },
                  ],
                },
              ],
            },
            {
              id: "workspace",
              label: "Workspace",
              icon: "briefcase",
              submenu: [
                {
                  id: "projects",
                  label: "Projects",
                  icon: "folder",
                  shortcut: "Ctrl+Shift+P",
                  action: "openProjects",
                },
                {
                  id: "tasks",
                  label: "Tasks",
                  icon: "check-square",
                  shortcut: "Ctrl+T",
                  action: "openTasks",
                },
                {
                  id: "calendar",
                  label: "Calendar",
                  icon: "calendar",
                  shortcut: "Ctrl+K",
                  action: "openCalendar",
                },
              ],
            },
            {
              id: "tools",
              label: "Tools",
              icon: "wrench",
              submenu: [
                {
                  id: "api-keys",
                  label: "API Keys",
                  icon: "key",
                  action: "manageApiKeys",
                },
                {
                  id: "integrations",
                  label: "Integrations",
                  icon: "plug",
                  action: "manageIntegrations",
                },
                {
                  id: "webhooks",
                  label: "Webhooks",
                  icon: "link",
                  action: "manageWebhooks",
                },
              ],
            },
            {
              id: "help",
              label: "Help & Support",
              icon: "help-circle",
              submenu: [
                {
                  id: "docs",
                  label: "Documentation",
                  icon: "book-open",
                  shortcut: "F1",
                  action: "openDocs",
                },
                {
                  id: "tutorials",
                  label: "Tutorials",
                  icon: "video",
                  action: "openTutorials",
                },
                {
                  id: "contact",
                  label: "Contact Support",
                  icon: "message-circle",
                  action: "contactSupport",
                },
              ],
            },
            {
              id: "logout",
              label: "Logout",
              icon: "log-out",
              shortcut: "Ctrl+Q",
              action: "handleLogout",
            },
          ],
          onSelectAction: "handleGlobalSelect",
        },
      ],
    };

    const handlers = {
      viewProfile: () => console.log("View Profile"),
      editProfile: () => console.log("Edit Profile"),
      openPrivacy: () => console.log("Open Privacy Settings"),
      openSecurity: () => console.log("Open Security Settings"),
      openNotifications: () => console.log("Open Notification Settings"),
      openProjects: () => console.log("Open Projects"),
      openTasks: () => console.log("Open Tasks"),
      openCalendar: () => console.log("Open Calendar"),
      manageApiKeys: () => console.log("Manage API Keys"),
      manageIntegrations: () => console.log("Manage Integrations"),
      manageWebhooks: () => console.log("Manage Webhooks"),
      openDocs: () => console.log("Open Documentation"),
      openTutorials: () => console.log("Open Tutorials"),
      contactSupport: () => console.log("Contact Support"),
      handleLogout: () => console.log("Logout"),
      handleGlobalSelect: (...args: unknown[]) => {
        const item = args[0] as { label: string };
        console.log("Global select:", item);
      },
    };

    return <SDUIComponent spec={spec} handlers={handlers} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Complex interactive example showing a full application menu with multiple levels and actions.",
      },
    },
  },
};

export const MixedContentMenu: Story = {
  render: () => {
    const spec: KeyboardNavigationMenuSpec = {
      type: "KeyboardNavigationMenu",
      items: [
        {
          id: "recent",
          label: "Recent Files",
          icon: "clock",
          submenu: [
            { id: "file1", label: "document.pdf", icon: "file-text" },
            { id: "file2", label: "presentation.pptx", icon: "file" },
            { id: "file3", label: "spreadsheet.xlsx", icon: "table" },
          ],
        },
        {
          id: "favorites",
          label: "Favorites",
          icon: "star",
          submenu: [
            { id: "fav1", label: "Important Project", icon: "folder-star" },
            { id: "fav2", label: "Team Resources", icon: "users" },
          ],
        },
        {
          id: "shared",
          label: "Shared with Me",
          icon: "share-2",
          disabled: true,
        },
        {
          id: "trash",
          label: "Trash",
          icon: "trash",
          action: "openTrash",
        },
      ],
      showShortcuts: false,
      className: "w-64",
    };

    const handlers = {
      openTrash: () => console.log("Open Trash"),
    };

    return <SDUIComponent spec={spec} handlers={handlers} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Menu with mixed content including disabled items and various icon types.",
      },
    },
  },
};