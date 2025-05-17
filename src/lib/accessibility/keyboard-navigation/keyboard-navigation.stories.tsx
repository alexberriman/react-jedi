import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  useFocusTrap,
  useRovingTabIndex,
  useEscapeKey,
  useKeyboardShortcuts,
  useTypeahead,
  createNavigableList,
} from "./index";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const meta: Meta = {
  title: "Accessibility/Keyboard Navigation",
  tags: ["autodocs"],
};

export default meta;

function FocusTrapDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { deactivate } = useFocusTrap(containerRef, {
    escapeDeactivates: true,
    clickOutsideDeactivates: true,
  });

  useEscapeKey(
    () => {
      setIsOpen(false);
      deactivate();
    },
    { enabled: isOpen }
  );

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsOpen(true)}>Open Focus Trap</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card ref={containerRef} className="w-96">
            <CardHeader>
              <CardTitle>Focus Trap Demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Tab through these elements - focus is trapped!</p>
              <Input placeholder="First input" />
              <Input placeholder="Second input" />
              <div className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    deactivate();
                  }}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export const FocusTrap: StoryObj = {
  render: () => <FocusTrapDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates focus trapping within a modal-like component. Press Tab to navigate, Escape to close.",
      },
    },
  },
};

function RovingTabIndexDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { focusedIndex } = useRovingTabIndex(containerRef);

  const items = ["Dashboard", "Profile", "Settings", "Messages", "Notifications"];

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Roving TabIndex Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="space-y-2" role="menu">
          {items.map((item, index) => (
            <div
              key={item}
              role="menuitem"
              data-roving-tabindex
              className={`
                px-4 py-2 rounded cursor-pointer transition-colors
                ${
                  focusedIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }
              `}
            >
              {item}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Use arrow keys to navigate, Home/End to jump
        </p>
      </CardContent>
    </Card>
  );
}

export const RovingTabIndex: StoryObj = {
  render: () => <RovingTabIndexDemo />,
  parameters: {
    docs: {
      description: {
        story: "Demonstrates roving tabindex pattern for list navigation using arrow keys.",
      },
    },
  },
};

function KeyboardShortcutsDemo() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const shortcuts = [
    {
      key: "s",
      modifiers: ["ctrl"] as const,
      handler: () => setMessage("Saved!"),
      preventDefault: true,
    },
    {
      key: "n",
      modifiers: ["ctrl"] as const,
      handler: () => setMessage("New item created"),
      preventDefault: true,
    },
    {
      key: "+",
      handler: () => setCount((c) => c + 1),
    },
    {
      key: "-",
      handler: () => setCount((c) => c - 1),
    },
  ];

  useKeyboardShortcuts(shortcuts);

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Keyboard Shortcuts Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Badge variant="secondary">Ctrl+S - Save</Badge>
          <Badge variant="secondary">Ctrl+N - New</Badge>
          <Badge variant="secondary">+ - Increment</Badge>
          <Badge variant="secondary">- - Decrement</Badge>
        </div>

        <div className="p-4 bg-muted rounded">
          <p>Count: {count}</p>
          {message && <p className="text-green-600">{message}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export const KeyboardShortcuts: StoryObj = {
  render: () => <KeyboardShortcutsDemo />,
  parameters: {
    docs: {
      description: {
        story: "Demonstrates custom keyboard shortcuts with modifiers.",
      },
    },
  },
};

function TypeaheadDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"];

  useTypeahead(containerRef, {
    onMatch: (search) => {
      setSearchText(search);
      const match = items.find((item) => item.toLowerCase().startsWith(search.toLowerCase()));
      if (match) {
        setSelectedItem(match);
      }
    },
  });

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Typeahead Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="space-y-2" role="listbox" tabIndex={0}>
          {items.map((item) => (
            <div
              key={item}
              role="option"
              aria-selected={selectedItem === item}
              tabIndex={-1}
              className={`
                px-4 py-2 rounded cursor-pointer transition-colors
                ${
                  selectedItem === item
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }
              `}
              onClick={() => setSelectedItem(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedItem(item);
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Type to search: {searchText || "..."}</p>
      </CardContent>
    </Card>
  );
}

export const Typeahead: StoryObj = {
  render: () => <TypeaheadDemo />,
  parameters: {
    docs: {
      description: {
        story: "Demonstrates typeahead search functionality - start typing to jump to items.",
      },
    },
  },
};

function NavigableListDemo() {
  const listRef = useRef<HTMLUListElement>(null);
  const [navigation, setNavigation] = useState<ReturnType<typeof createNavigableList> | null>(null);

  React.useEffect(() => {
    if (listRef.current) {
      const nav = createNavigableList(listRef, {
        orientation: "vertical",
        loop: true,
      });
      nav.initialize();
      setNavigation(nav);

      return () => nav.cleanup();
    }
  }, []);

  const items = ["First", "Second", "Third", "Fourth", "Fifth"];

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Navigable List Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <ul ref={listRef} className="space-y-2">
          {items.map((item, index) => (
            <li
              key={item}
              role="option"
              aria-selected={false}
              className="px-4 py-2 rounded bg-muted hover:bg-muted/80 focus:bg-primary focus:text-primary-foreground focus:outline-none"
            >
              {item} item
            </li>
          ))}
        </ul>

        <div className="mt-4 space-x-2">
          <Button size="sm" variant="outline" onClick={() => navigation?.focusFirst()}>
            First
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigation?.focusPrevious()}>
            Previous
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigation?.focusNext()}>
            Next
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigation?.focusLast()}>
            Last
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export const NavigableList: StoryObj = {
  render: () => <NavigableListDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates a fully navigable list with keyboard support and programmatic control.",
      },
    },
  },
};
