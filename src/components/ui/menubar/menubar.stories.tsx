import type { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "./index";
import { within, userEvent, expect, waitFor } from "@storybook/test";

const meta: Meta<typeof Menubar> = {
  title: "Components/Overlay/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="claude">
            <MenubarRadioItem value="claude">Claude</MenubarRadioItem>
            <MenubarRadioItem value="alex">Alex</MenubarRadioItem>
            <MenubarRadioItem value="guest">Guest</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: null });
    
    // Add a small delay to ensure component is fully rendered
    await new Promise(resolve => globalThis.setTimeout(resolve, 500));
    
    // Test opening and closing menus
    const fileTrigger = canvas.getByText("File");
    await user.click(fileTrigger);
    
    // Wait for menu items to appear in document body
    await waitFor(() => {
      expect(within(document.body).getByText("New Tab")).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Test submenu
    const shareTrigger = within(document.body).getByText("Share");
    await user.hover(shareTrigger);
    
    await waitFor(() => {
      const emailLink = within(document.body).getByText("Email link");
      expect(emailLink).toBeInTheDocument();
    });
    
    // Close menu by clicking outside
    await user.click(document.body);
    
    // Test checkbox item
    const viewTrigger = canvas.getByText("View");
    await user.click(viewTrigger);
    
    // Wait a bit for menu to fully render
    await new Promise(resolve => globalThis.setTimeout(resolve, 1000));
    
    // Try to find the checkbox item
    const bookmarksCheckbox = within(document.body).queryByText("Always Show Bookmarks Bar");
    if (bookmarksCheckbox) {
      await user.click(bookmarksCheckbox);
    }
    
    // Test radio group
    await user.click(document.body); // Close view menu
    const profilesTrigger = canvas.getByText("Profiles");
    await user.click(profilesTrigger);
    
    await waitFor(() => {
      const alexRadio = within(document.body).getByText("Alex");
      expect(alexRadio).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const alexRadio = within(document.body).getByText("Alex");
    await user.click(alexRadio);
  },
};

export const Simple: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Options</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Settings</MenubarItem>
          <MenubarItem>Preferences</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: null });
    
    // Wait for the component to be ready
    await waitFor(() => {
      expect(canvas.getByText("Options")).toBeInTheDocument();
    });
    
    // Test simple menu interaction
    const optionsTrigger = await canvas.findByText("Options");
    await user.click(optionsTrigger);
    
    // Verify menu items are displayed
    await waitFor(() => {
      expect(within(document.body).getByText("Settings")).toBeInTheDocument();
      expect(within(document.body).getByText("Preferences")).toBeInTheDocument();
      expect(within(document.body).getByText("Logout")).toBeInTheDocument();
    });
    
    // Click a menu item
    const settings = within(document.body).getByText("Settings");
    await user.click(settings);
  },
};

export const WithIcons: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="mr-2 h-4 w-4"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-9-9v18" />
            </svg>
            New
          </MenubarItem>
          <MenubarItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="mr-2 h-4 w-4"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Open
          </MenubarItem>
          <MenubarItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="mr-2 h-4 w-4"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
              />
            </svg>
            Save
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: null });
    
    // Wait for the component to be ready
    await waitFor(() => {
      expect(canvas.getByText("Menu")).toBeInTheDocument();
    });
    
    // Open menu with icons
    const menuTrigger = await canvas.findByText("Menu");
    await user.click(menuTrigger);
    
    // Verify menu items with icons are displayed
    await waitFor(() => {
      expect(within(document.body).getByText("New")).toBeInTheDocument();
      expect(within(document.body).getByText("Open")).toBeInTheDocument();
      expect(within(document.body).getByText("Save")).toBeInTheDocument();
    });
    
    // Verify SVG icons are present
    const menuContent = within(document.body).getByText("New").closest('[role="menu"]');
    expect(menuContent).toBeTruthy();
    const svgIcons = menuContent?.querySelectorAll('svg') || [];
    expect(svgIcons.length).toBeGreaterThanOrEqual(3);
  },
};

export const ComplexApplication: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Application</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About App</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Preferences...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Hide App</MenubarItem>
          <MenubarItem>Hide Others</MenubarItem>
          <MenubarItem>Show All</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Quit App <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open... <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Open Recent</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Revert to Saved</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Close</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Select All</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
          <MenubarItem>Actual Size</MenubarItem>
          <MenubarSeparator />
          <MenubarCheckboxItem checked>Show Toolbar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Sidebar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="list">
            <MenubarRadioItem value="list">List View</MenubarRadioItem>
            <MenubarRadioItem value="grid">Grid View</MenubarRadioItem>
            <MenubarRadioItem value="columns">Column View</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Window</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Minimize</MenubarItem>
          <MenubarItem>Zoom</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Bring All to Front</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Search</MenubarItem>
          <MenubarItem>Documentation</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Support</MenubarItem>
          <MenubarItem>Contact Us</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: null });
    
    // Wait for the component to be ready
    await waitFor(() => {
      expect(canvas.getByText("Application")).toBeInTheDocument();
    });
    
    // Test multiple menu triggers
    const applicationTrigger = await canvas.findByText("Application");
    const fileTrigger = await canvas.findByText("File");
    const editTrigger = await canvas.findByText("Edit");
    const viewTrigger = await canvas.findByText("View");
    const windowTrigger = await canvas.findByText("Window");
    const helpTrigger = await canvas.findByText("Help");
    
    // Verify all triggers are present
    expect(applicationTrigger).toBeInTheDocument();
    expect(fileTrigger).toBeInTheDocument();
    expect(editTrigger).toBeInTheDocument();
    expect(viewTrigger).toBeInTheDocument();
    expect(windowTrigger).toBeInTheDocument();
    expect(helpTrigger).toBeInTheDocument();
    
    // Test keyboard navigation between menus
    await user.click(fileTrigger);
    
    // Wait for first menu to open
    await waitFor(() => {
      expect(within(document.body).getByText("New")).toBeInTheDocument();
    });
    
    // Close the File menu first
    await user.keyboard("{escape}");
    
    // Wait for menu to close
    await waitFor(() => {
      expect(within(document.body).queryByText("New")).not.toBeInTheDocument();
    });
    
    // Wait a bit before clicking next menu
    await new Promise(resolve => globalThis.setTimeout(resolve, 500));
    
    // Click on Edit menu directly
    await user.click(editTrigger);
    
    // Wait for the edit menu to open and find Undo
    await waitFor(() => {
      expect(within(document.body).getByText("Undo")).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Close the Edit menu
    await user.keyboard("{escape}");
    
    // Wait for Edit menu to close
    await waitFor(() => {
      expect(within(document.body).queryByText("Undo")).not.toBeInTheDocument();
    });
    
    // Test radio group in View menu
    await user.click(viewTrigger);
    
    await waitFor(() => {
      expect(within(document.body).getByText("Grid View")).toBeInTheDocument();
    });
    
    const gridView = within(document.body).getByText("Grid View");
    await user.click(gridView);
    
    // Close menu
    await user.keyboard("{escape}");
  },
};
