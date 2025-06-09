import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command";
import React from "react";
import {
  Calendar,
  Calculator,
  CreditCard,
  Settings,
  User,
  Folder,
  Search,
  FileText,
  Hash,
  FilePlus,
  FolderOpen,
  Save,
  Copy,
  Clipboard,
  Scissors,
} from "lucide-react";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Components/Command",
  component: Command,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A command palette component for searching and executing commands. Built on cmdk, it provides a highly customizable command interface with search, keyboard navigation, and grouped items.",
      },
    },
  },
  tags: ["autodocs", "test"],
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic shadcn command example
export const Default: Story = enhanceStoryForDualMode<typeof Command>(
  {
    render: () => (
      <div className="w-[350px]">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </CommandItem>
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                Calculator
              </CommandItem>
              <CommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Find search input
      const searchInput = canvas.getByPlaceholderText("Type a command or search...");
      expect(searchInput).toBeInTheDocument();

      // Click to focus the input (since it might not auto-focus)
      await userEvent.click(searchInput);

      // Verify all items are visible initially
      expect(canvas.getByText("Calendar")).toBeInTheDocument();
      expect(canvas.getByText("Calculator")).toBeInTheDocument();
      expect(canvas.getByText("Profile")).toBeInTheDocument();

      // Search for an item
      await userEvent.type(searchInput, "cal");
      await waitFor(() => {
        expect(canvas.getByText("Calendar")).toBeInTheDocument();
        expect(canvas.getByText("Calculator")).toBeInTheDocument();
        expect(canvas.queryByText("Profile")).not.toBeInTheDocument();
      });

      // Clear search
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, "settings");
      await waitFor(() => {
        // Use a more specific selector since "Settings" appears in both group heading and item
        const settingsItem = canvas.getByRole("option", { name: /settings/i });
        expect(settingsItem).toBeInTheDocument();
        expect(canvas.queryByText("Calendar")).not.toBeInTheDocument();
      });

      // Test keyboard navigation - just verify we can clear the search
      await userEvent.clear(searchInput);
      expect(searchInput).toHaveValue("");
    },
  },
  {
    renderSpec: {
      type: "command",
      searchPlaceholder: "Type a command or search...",
      emptyMessage: "No results found.",
      groups: [
        {
          heading: "Suggestions",
          items: [
            { id: "calendar", label: "Calendar", icon: "calendar" },
            { id: "calculator", label: "Calculator", icon: "calculator" },
            { id: "card", label: "Card", icon: "credit-card" },
          ],
        },
        {
          heading: "Settings",
          items: [
            { id: "profile", label: "Profile", icon: "user", shortcut: "⌘P" },
            { id: "settings", label: "Settings", icon: "settings", shortcut: "⌘S" },
          ],
        },
      ],
    },
  }
);

// Basic Command with Items
export const BasicCommand: Story = enhanceStoryForDualMode<typeof Command>(
  {
    render: () => (
      <div className="w-[350px]">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              Calculator
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              Card
            </CommandItem>
          </CommandList>
        </Command>
      </div>
    ),
    parameters: {
      docs: {
        description: {
          story: "Basic command palette with simple ungrouped items.",
        },
      },
    },
  },
  {
    renderSpec: {
      type: "command",
      searchPlaceholder: "Search...",
      emptyMessage: "No items found.",
      items: [
        { id: "1", label: "Calendar", icon: "calendar" },
        { id: "2", label: "Calculator", icon: "calculator" },
        { id: "3", label: "Card", icon: "credit-card" },
      ],
    },
  }
);

// Grouped Command with Shortcuts
export const GroupedCommand: Story = enhanceStoryForDualMode<typeof Command>(
  {
    render: () => (
      <div className="w-[350px]">
        <Command>
          <CommandInput placeholder="Search commands..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem>
                <FilePlus className="mr-2 h-4 w-4" />
                New File
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <FolderOpen className="mr-2 h-4 w-4" />
                Open
                <CommandShortcut>⌘O</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Save className="mr-2 h-4 w-4" />
                Save
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Edit">
              <CommandItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Clipboard className="mr-2 h-4 w-4" />
                Paste
                <CommandShortcut>⌘V</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Scissors className="mr-2 h-4 w-4" />
                Cut
                <CommandShortcut>⌘X</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    ),
    parameters: {
      docs: {
        description: {
          story: "Command palette with grouped items and keyboard shortcuts.",
        },
      },
    },
  },
  {
    renderSpec: {
      type: "command",
      searchPlaceholder: "Search commands...",
      emptyMessage: "No results found.",
      groups: [
        {
          heading: "Actions",
          items: [
            { id: "new", label: "New File", icon: "file-plus", shortcut: "⌘N" },
            { id: "open", label: "Open", icon: "folder-open", shortcut: "⌘O" },
            { id: "save", label: "Save", icon: "save", shortcut: "⌘S" },
          ],
        },
        {
          heading: "Edit",
          items: [
            { id: "copy", label: "Copy", icon: "copy", shortcut: "⌘C" },
            { id: "paste", label: "Paste", icon: "clipboard", shortcut: "⌘V" },
            { id: "cut", label: "Cut", icon: "scissors", shortcut: "⌘X" },
          ],
        },
      ],
    },
  }
);

// Command Dialog Example
function CommandDialogExample() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                console.log("Calendar selected");
                setOpen(false);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log("Search Emoji selected");
                setOpen(false);
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log("Calculator selected");
                setOpen(false);
              }}
            >
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() => {
                console.log("Profile selected");
                setOpen(false);
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log("Settings selected");
                setOpen(false);
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export const DialogExample: Story = {
  render: CommandDialogExample,
  parameters: {
    docs: {
      description: {
        story: "Command dialog with keyboard shortcut (⌘K) to open/close.",
      },
    },
  },
};


// Complex Navigation Example
export const NavigationExample: Story = enhanceStoryForDualMode<typeof Command>(
  {
    render: () => (
      <div className="w-[400px]">
        <Command>
          <CommandInput placeholder="Navigate to..." />
          <CommandList>
            <CommandEmpty>No pages found.</CommandEmpty>
            <CommandGroup heading="Main">
              <CommandItem>
                <Folder className="mr-2 h-4 w-4" />
                Projects
              </CommandItem>
              <CommandItem>
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </CommandItem>
              <CommandItem>
                <Hash className="mr-2 h-4 w-4" />
                Channels
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              <CommandItem>Website Redesign</CommandItem>
              <CommandItem>Mobile App</CommandItem>
              <CommandItem>Marketing Campaign</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Recent">
              <CommandItem>Homepage.tsx</CommandItem>
              <CommandItem>styles.css</CommandItem>
              <CommandItem>package.json</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    ),
    parameters: {
      docs: {
        description: {
          story: "Command palette for navigation with multiple sections.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Find search input
      const searchInput = canvas.getByPlaceholderText("Navigate to...");
      expect(searchInput).toBeInTheDocument();

      // Click to focus
      await userEvent.click(searchInput);

      // Verify all groups are visible
      expect(canvas.getByText("Main")).toBeInTheDocument();
      expect(canvas.getByText("Projects", { selector: "[cmdk-group-heading]" })).toBeInTheDocument();
      expect(canvas.getByText("Recent")).toBeInTheDocument();

      // Search for projects
      await userEvent.type(searchInput, "project");
      await waitFor(() => {
        expect(canvas.getByText("Projects", { selector: "[cmdk-item]" })).toBeInTheDocument();
        expect(canvas.queryByText("Homepage.tsx")).not.toBeInTheDocument();
      });

      // Clear and search for files
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, "home");
      await waitFor(() => {
        expect(canvas.getByText("Homepage.tsx")).toBeInTheDocument();
        expect(canvas.queryByText("styles.css")).not.toBeInTheDocument();
      });
    },
  },
  {
    renderSpec: {
      type: "command",
      searchPlaceholder: "Navigate to...",
      emptyMessage: "No pages found.",
      groups: [
        {
          heading: "Main",
          items: [
            { id: "projects", label: "Projects", icon: "folder" },
            { id: "documents", label: "Documents", icon: "file-text" },
            { id: "channels", label: "Channels", icon: "hash" },
          ],
        },
        {
          heading: "Projects",
          items: [
            { id: "website-redesign", label: "Website Redesign" },
            { id: "mobile-app", label: "Mobile App" },
            { id: "marketing-campaign", label: "Marketing Campaign" },
          ],
        },
        {
          heading: "Recent",
          items: [
            { id: "homepage", label: "Homepage.tsx" },
            { id: "styles", label: "styles.css" },
            { id: "package", label: "package.json" },
          ],
        },
      ],
    },
  }
);

// Interactive Dialog Demo
function InteractiveDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Open Command Dialog
        </button>
        {selectedValue && (
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium">{selectedValue}</span>
          </p>
        )}
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setSelectedValue("New File");
                setOpen(false);
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              New File
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setSelectedValue("Open File");
                setOpen(false);
              }}
            >
              <Folder className="mr-2 h-4 w-4" />
              Open File
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setSelectedValue("Save");
                setOpen(false);
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              Save
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tools">
            <CommandItem
              onSelect={() => {
                setSelectedValue("Calculator");
                setOpen(false);
              }}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculator
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setSelectedValue("Calendar");
                setOpen(false);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export const InteractiveDialog: Story = {
  render: InteractiveDialogDemo,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive command dialog that shows selected values and proper open/close behavior.",
      },
    },
  },
};
