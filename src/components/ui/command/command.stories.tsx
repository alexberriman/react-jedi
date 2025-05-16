import type { Meta, StoryObj } from "@storybook/react";
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
import { CommandComponent, CommandDialogComponent } from "./command-component";
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
} from "lucide-react";

const meta = {
  title: "Components/Overlay/Command",
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
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic shadcn command example
export const Default: Story = {
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
};

// JSON Specification Examples
export const JsonBasicCommand: Story = {
  name: "JSON: Basic Command",
  render: () => (
    <div className="w-[350px]">
      <CommandComponent
        type="command"
        searchPlaceholder="Search..."
        emptyMessage="No items found."
        items={[
          { id: "1", label: "Calendar", icon: "📅" },
          { id: "2", label: "Calculator", icon: "🧮" },
          { id: "3", label: "Card", icon: "💳" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "command",
  "searchPlaceholder": "Search...",
  "emptyMessage": "No items found.",
  "items": [
    { "id": "1", "label": "Calendar", "icon": "📅" },
    { "id": "2", "label": "Calculator", "icon": "🧮" },
    { "id": "3", "label": "Card", "icon": "💳" }
  ]
}`,
        language: "json",
      },
    },
  },
};

export const JsonGroupedCommand: Story = {
  name: "JSON: Grouped Command",
  render: () => (
    <div className="w-[350px]">
      <CommandComponent
        type="command"
        searchPlaceholder="Search commands..."
        groups={[
          {
            heading: "Actions",
            items: [
              { id: "new", label: "New File", icon: "➕", shortcut: "⌘N" },
              { id: "open", label: "Open", icon: "📁", shortcut: "⌘O" },
              { id: "save", label: "Save", icon: "💾", shortcut: "⌘S" },
            ],
          },
          {
            heading: "Edit",
            items: [
              { id: "copy", label: "Copy", icon: "📋", shortcut: "⌘C" },
              { id: "paste", label: "Paste", icon: "📄", shortcut: "⌘V" },
              { id: "cut", label: "Cut", icon: "✂️", shortcut: "⌘X" },
            ],
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "command",
  "searchPlaceholder": "Search commands...",
  "groups": [
    {
      "heading": "Actions",
      "items": [
        { "id": "new", "label": "New File", "icon": "➕", "shortcut": "⌘N" },
        { "id": "open", "label": "Open", "icon": "📁", "shortcut": "⌘O" },
        { "id": "save", "label": "Save", "icon": "💾", "shortcut": "⌘S" }
      ]
    },
    {
      "heading": "Edit",
      "items": [
        { "id": "copy", "label": "Copy", "icon": "📋", "shortcut": "⌘C" },
        { "id": "paste", "label": "Paste", "icon": "📄", "shortcut": "⌘V" },
        { "id": "cut", "label": "Cut", "icon": "✂️", "shortcut": "⌘X" }
      ]
    }
  ]
}`,
        language: "json",
      },
    },
  },
};

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

function JsonCommandDialogExample() {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Open Command Palette
      </button>
      <CommandDialogComponent
        type="commandDialog"
        open={open}
        title="Command Menu"
        description="Choose an action to perform"
        searchPlaceholder="Type to search..."
        emptyMessage="Nothing found."
        groups={[
          {
            heading: "Recent",
            items: [
              { id: "doc1", label: "Product Requirements", icon: "📄" },
              { id: "doc2", label: "Design System", icon: "🎨" },
              { id: "doc3", label: "API Documentation", icon: "📚" },
            ],
          },
          {
            heading: "Quick Actions",
            items: [
              { id: "create", label: "Create New", icon: "➕", shortcut: "⌘N" },
              { id: "search", label: "Search", icon: "🔍", shortcut: "⌘F" },
              { id: "share", label: "Share", icon: "📤", shortcut: "⌘S" },
            ],
          },
        ]}
        onOpenChange={open ? "close" : "open"}
      />
    </div>
  );
}

export const JsonCommandDialog: Story = {
  name: "JSON: Command Dialog",
  render: JsonCommandDialogExample,
  parameters: {
    docs: {
      source: {
        code: `{
  "type": "commandDialog",
  "open": true,
  "title": "Command Menu",
  "description": "Choose an action to perform",
  "searchPlaceholder": "Type to search...",
  "emptyMessage": "Nothing found.",
  "groups": [
    {
      "heading": "Recent",
      "items": [
        { "id": "doc1", "label": "Product Requirements", "icon": "📄" },
        { "id": "doc2", "label": "Design System", "icon": "🎨" },
        { "id": "doc3", "label": "API Documentation", "icon": "📚" }
      ]
    },
    {
      "heading": "Quick Actions",
      "items": [
        { "id": "create", "label": "Create New", "icon": "➕", "shortcut": "⌘N" },
        { "id": "search", "label": "Search", "icon": "🔍", "shortcut": "⌘F" },
        { "id": "share", "label": "Share", "icon": "📤", "shortcut": "⌘S" }
      ]
    }
  ]
}`,
        language: "json",
      },
    },
  },
};

// Complex Navigation Example
export const NavigationExample: Story = {
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
};
