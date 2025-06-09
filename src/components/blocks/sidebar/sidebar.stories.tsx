import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import {
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  Folder as FolderIcon,
  File as FileIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
  User as UserIcon,
  Bell as BellIcon,
  Bookmark as BookmarkIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarGroupAction,
  SidebarInput,
} from "./sidebar";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { enhanceStoryForDualMode } from "../../../../.storybook/utils/enhance-story";

const meta = {
  title: "Blocks/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <SidebarProvider>
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },

  tags: ["autodocs", "ui-sidebar"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic sidebar with navigation
export const Default: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/#">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FolderIcon />
                        <span>Projects</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FileIcon />
                        <span>Documents</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <SettingsIcon />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <span>User Name</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-semibold">Dashboard</h1>
          </header>
          <main className="p-4">
            <p>Main content area</p>
          </main>
        </SidebarInset>
      </>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test sidebar elements render - use getAllByText since there might be multiple
      const dashboardElements = canvas.getAllByText("Dashboard");
      expect(dashboardElements.length).toBeGreaterThan(0);
      expect(canvas.getByText("Main Menu")).toBeInTheDocument();
      expect(canvas.getByText("Projects")).toBeInTheDocument();
      expect(canvas.getByText("Documents")).toBeInTheDocument();
      expect(canvas.getByText("Settings")).toBeInTheDocument();

      // Test sidebar trigger - there might be multiple, get the visible one
      const triggers = canvas.getAllByRole("button", { name: "Toggle Sidebar" });
      const trigger = triggers.find((t) => t.offsetParent !== null) || triggers[0];
      expect(trigger).toBeTruthy();

      // Click trigger to toggle sidebar
      await user.click(trigger);

      // Click trigger again to open
      await user.click(trigger);

      // Test navigation links
      const projectsLink = canvas.getByRole("link", { name: /Projects/i });
      expect(projectsLink).toHaveAttribute("href", "/#");

      // Test dropdown menu
      const userMenuButton = canvas.getByRole("button", { name: /User Name/i });
      await user.click(userMenuButton);

      // Check dropdown items are visible (use within document since dropdown is in portal)
      await waitFor(() => {
        const profileItem = within(canvasElement.ownerDocument.body).getByText("Profile");
        expect(profileItem).toBeInTheDocument();
      });
      const logoutItem = within(canvasElement.ownerDocument.body).getByText("Logout");
      expect(logoutItem).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Sidebar",
      header: {
        children: [
          {
            items: [
              {
                label: "Dashboard",
                icon: "home",
                href: "/#"
              }
            ]
          }
        ]
      },
      content: {
        groups: [
          {
            label: "Main Menu",
            items: [
              {
                label: "Projects",
                icon: "folder",
                href: "/#"
              },
              {
                label: "Documents",
                icon: "file",
                href: "/#"
              },
              {
                label: "Settings",
                icon: "settings",
                href: "/#"
              }
            ]
          }
        ]
      },
      footer: {
        children: [
          {
            items: [
              {
                label: "User Name",
                // Note: For SDUI, we'll simplify the dropdown to just a menu item
                href: "/#"
              }
            ]
          }
        ]
      }
    }
  }
);

// Collapsible icon sidebar
export const CollapsibleIcon: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/#">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Projects">
                      <a href="/#">
                        <FolderIcon />
                        <span>Projects</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Documents">
                      <a href="/#">
                        <FileIcon />
                        <span>Documents</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <a href="/#">
                        <SettingsIcon />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-semibold">Dashboard</h1>
          </header>
          <main className="p-4">
            <p>Main content area with icon-collapsible sidebar</p>
          </main>
        </SidebarInset>
      </>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test sidebar trigger to collapse - get all and use the visible one
      const triggers = canvas.getAllByRole("button", { name: "Toggle Sidebar" });
      const trigger = triggers.find((t) => t.offsetParent !== null) || triggers[0];
      await user.click(trigger);

      // Test hover for tooltips in collapsed state - wait for collapse animation
      await new Promise((resolve) => {
        const timeoutId = globalThis.setTimeout(resolve, 300);
        return timeoutId;
      });

      // Hover over a menu item to see tooltip
      const projectsIcon = canvas.getAllByRole("link")[1]; // Skip dashboard link
      await user.hover(projectsIcon);

      // Click trigger to expand again
      await user.click(trigger);

      // Test rail is present
      const rail = canvasElement.querySelector('[data-sidebar="rail"]');
      expect(rail).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Sidebar",
      collapsible: "icon",
      header: {
        children: [
          {
            items: [
              {
                label: "Dashboard",
                icon: "home",
                href: "/#"
              }
            ]
          }
        ]
      },
      content: {
        groups: [
          {
            label: "Main Menu",
            items: [
              {
                label: "Projects",
                icon: "folder",
                href: "/#",
                tooltip: "Projects"
              },
              {
                label: "Documents",
                icon: "file",
                href: "/#",
                tooltip: "Documents"
              },
              {
                label: "Settings",
                icon: "settings",
                href: "/#",
                tooltip: "Settings"
              }
            ]
          }
        ]
      }
    }
  }
);

// Sidebar with nested menu
export const NestedMenu: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/#">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FolderIcon />
                      <span>Projects</span>
                      <ChevronRightIcon className="ml-auto h-3 w-3" />
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="/#">Project Alpha</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="/#">Project Beta</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="/#">Project Gamma</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FileIcon />
                        <span>Documents</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-semibold">Dashboard</h1>
          </header>
          <main className="p-4">
            <p>Main content area with nested menu</p>
          </main>
        </SidebarInset>
      </>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test expandable menu
      const projectsButton = canvas.getByRole("button", { name: /Projects/i });
      expect(projectsButton).toBeInTheDocument();

      // Click to expand nested menu
      await user.click(projectsButton);

      // Check nested items are visible
      expect(canvas.getByText("Project Alpha")).toBeInTheDocument();
      expect(canvas.getByText("Project Beta")).toBeInTheDocument();
      expect(canvas.getByText("Project Gamma")).toBeInTheDocument();

      // Test clicking a nested item
      const alphaLink = canvas.getByRole("link", { name: "Project Alpha" });
      expect(alphaLink).toHaveAttribute("href", "/#");

      // Click to collapse
      await user.click(projectsButton);
    },
  },
  {
    renderSpec: {
      type: "Sidebar",
      header: {
        children: [
          {
            items: [
              {
                label: "Dashboard",
                icon: "home",
                href: "/#"
              }
            ]
          }
        ]
      },
      content: {
        groups: [
          {
            label: "Main Menu",
            items: [
              {
                label: "Projects",
                icon: "folder",
                subItems: [
                  {
                    label: "Project Alpha",
                    href: "/#"
                  },
                  {
                    label: "Project Beta",
                    href: "/#"
                  },
                  {
                    label: "Project Gamma",
                    href: "/#"
                  }
                ]
              },
              {
                label: "Documents",
                icon: "file",
                href: "/#"
              }
            ]
          }
        ]
      }
    }
  }
);

// Sidebar with badges and actions
export const WithBadgesAndActions: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/#">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupAction asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <ShareIcon className="h-3 w-3" />
                </Button>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FolderIcon />
                        <span>Projects</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <BellIcon />
                        <span>Notifications</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                    <SidebarMenuAction showOnHover asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <SettingsIcon className="h-3 w-3" />
                      </Button>
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <BookmarkIcon />
                        <span>Bookmarks</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <ShareIcon className="h-3 w-3" />
                      </Button>
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-semibold">Dashboard</h1>
          </header>
          <main className="p-4">
            <p>Main content area with badges and actions</p>
          </main>
        </SidebarInset>
      </>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test badges are rendered
      expect(canvas.getByText("12")).toBeInTheDocument();
      expect(canvas.getByText("3")).toBeInTheDocument();

      // Test group action button
      const groupActionButtons = canvas.getAllByRole("button");
      const shareButton = groupActionButtons.find((btn) => btn.querySelector('svg[class*="h-3"]'));
      expect(shareButton).toBeInTheDocument();

      // Hover over notifications to reveal action
      const notificationsItem = canvas.getByText("Notifications").closest("li");
      await user.hover(notificationsItem!);

      // Test action buttons are visible
      const actionButtons = canvasElement.querySelectorAll('[data-sidebar="menu-action"]');
      expect(actionButtons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Sidebar",
      header: {
        children: [
          {
            items: [
              {
                label: "Dashboard",
                icon: "home",
                href: "/#"
              }
            ]
          }
        ]
      },
      content: {
        groups: [
          {
            label: "Main Menu",
            action: {
              icon: "share",
              onClick: "handleGroupAction"
            },
            items: [
              {
                label: "Projects",
                icon: "folder",
                href: "/#",
                badge: "12"
              },
              {
                label: "Notifications",
                icon: "bell",
                href: "/#",
                badge: "3",
                action: {
                  icon: "settings",
                  onClick: "handleMenuAction",
                  showOnHover: true
                }
              },
              {
                label: "Bookmarks",
                icon: "bookmark",
                href: "/#",
                action: {
                  icon: "share",
                  onClick: "handleMenuAction"
                }
              }
            ]
          }
        ]
      }
    }
  }
);

// Floating variant
export const FloatingVariant: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <>
        <Sidebar variant="floating">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/#">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FolderIcon />
                        <span>Projects</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FileIcon />
                        <span>Documents</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-semibold">Dashboard</h1>
          </header>
          <main className="p-4">
            <p>Main content area with floating sidebar</p>
          </main>
        </SidebarInset>
      </>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test floating variant styling
      const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
      expect(sidebar).toBeTruthy();
      if (sidebar) {
        expect(sidebar).toHaveAttribute("data-variant", "floating");
      }

      // Test content renders
      const dashboards = canvas.getAllByText("Dashboard");
      expect(dashboards.length).toBeGreaterThan(0);
      expect(canvas.getByText("Main content area with floating sidebar")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Sidebar",
      variant: "floating",
      header: {
        children: [
          {
            items: [
              {
                label: "Dashboard",
                icon: "home",
                href: "/#"
              }
            ]
          }
        ]
      },
      content: {
        groups: [
          {
            label: "Main Menu",
            items: [
              {
                label: "Projects",
                icon: "folder",
                href: "/#"
              },
              {
                label: "Documents",
                icon: "file",
                href: "/#"
              }
            ]
          }
        ]
      }
    }
  }
);

// Inset variant
export const InsetVariant: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <>
        <Sidebar variant="inset">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/#">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FolderIcon />
                        <span>Projects</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FileIcon />
                        <span>Documents</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-semibold">Dashboard</h1>
          </header>
          <main className="p-4">
            <p>Main content area with inset sidebar</p>
          </main>
        </SidebarInset>
      </>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test inset variant styling
      const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
      expect(sidebar).toBeTruthy();
      if (sidebar) {
        expect(sidebar).toHaveAttribute("data-variant", "inset");
      }

      // Test content renders
      const dashboards = canvas.getAllByText("Dashboard");
      expect(dashboards.length).toBeGreaterThan(0);
      expect(canvas.getByText("Main content area with inset sidebar")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Sidebar",
      variant: "inset",
      header: {
        children: [
          {
            items: [
              {
                label: "Dashboard",
                icon: "home",
                href: "/#"
              }
            ]
          }
        ]
      },
      content: {
        groups: [
          {
            label: "Main Menu",
            items: [
              {
                label: "Projects",
                icon: "folder",
                href: "/#"
              },
              {
                label: "Documents",
                icon: "file",
                href: "/#"
              }
            ]
          }
        ]
      }
    }
  }
);

// Right-aligned sidebar
export const RightSidebar: Story = {
  render: () => (
    <>
      <SidebarInset>
        <header className="flex items-center gap-2 p-4 border-b">
          <h1 className="font-semibold">Dashboard</h1>
          <div className="ml-auto">
            <SidebarTrigger />
          </div>
        </header>
        <main className="p-4">
          <p>Main content area with right-aligned sidebar</p>
        </main>
      </SidebarInset>
      <Sidebar side="right">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/#">
                  <HomeIcon />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/#">
                      <FolderIcon />
                      <span>Projects</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/#">
                      <FileIcon />
                      <span>Documents</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test right-aligned sidebar
    const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
    expect(sidebar).toBeTruthy();
    if (sidebar) {
      expect(sidebar).toHaveAttribute("data-side", "right");
    }

    // Test trigger is on the right
    const trigger = canvas.getByRole("button", { name: "Toggle Sidebar" });
    const triggerContainer = trigger.closest(".ml-auto");
    expect(triggerContainer).toBeTruthy();

    // Toggle sidebar
    await user.click(trigger);
    await user.click(trigger);

    // Test content
    expect(canvas.getByText("Main content area with right-aligned sidebar")).toBeInTheDocument();
  },
};

// With search input
export const WithSearch: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <>
        <Sidebar>
          <SidebarHeader>
            <SidebarInput placeholder="Search..." />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FolderIcon />
                        <span>Projects</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <FileIcon />
                        <span>Documents</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <UserIcon />
                        <span>Profile</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/#">
                        <SettingsIcon />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-semibold">Dashboard</h1>
          </header>
          <main className="p-4">
            <p>Main content area with search input</p>
          </main>
        </SidebarInset>
      </>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test search input
      const searchInput = canvas.getByPlaceholderText("Search...");
      expect(searchInput).toBeInTheDocument();

      // Type in search
      await user.type(searchInput, "test search");
      expect(searchInput).toHaveValue("test search");

      // Test separator is rendered
      const separator = canvasElement.querySelector('[data-sidebar="separator"]');
      expect(separator).toBeTruthy();

      // Test multiple groups
      expect(canvas.getByText("Main Menu")).toBeInTheDocument();

      // Find Settings label within the data attribute
      await waitFor(() => {
        const settingsLabels = canvas.getAllByText("Settings");
        // Should have at least one Settings label
        expect(settingsLabels.length).toBeGreaterThan(0);
        // Find the one that's a group label
        const groupLabel = settingsLabels.find((el) => el.closest('[data-sidebar="group-label"]'));
        expect(groupLabel).toBeTruthy();
      });
    },
  },
  {
    renderSpec: {
      type: "Sidebar",
      header: {
        children: [
          {
            type: "search",
            placeholder: "Search..."
          }
        ]
      },
      content: {
        groups: [
          {
            label: "Main Menu",
            items: [
              {
                label: "Projects",
                icon: "folder",
                href: "/#"
              },
              {
                label: "Documents",
                icon: "file",
                href: "/#"
              }
            ]
          },
          {
            label: "Settings",
            items: [
              {
                label: "Profile",
                icon: "user",
                href: "/#"
              },
              {
                label: "Settings",
                icon: "settings",
                href: "/#"
              }
            ]
          }
        ]
      }
    }
  }
);
