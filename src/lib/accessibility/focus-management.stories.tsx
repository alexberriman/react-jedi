import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  useFocusTrap,
  useFocusReturn,
  useFocusOnMount,
  useFocusMonitor,
  useLastFocused,
  useFocusList,
  useSkipLink,
} from "./focus-management";

const meta = {
  title: "Accessibility/Focus Management",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Focus Management system provides a comprehensive set of utilities and hooks for managing keyboard focus in accessible React applications. This system helps ensure proper keyboard navigation and focus management for users who rely on keyboard navigation or assistive technologies.

## Features

- **Focus Trap**: Keep focus within specific regions (modals, dialogs)
- **Focus Return**: Restore focus to previous elements
- **Focus Monitoring**: Track focus state of elements
- **Focus Lists**: Navigate lists with arrow keys
- **Skip Links**: Jump to main content areas
- **Auto-focus**: Focus elements on mount
- **Last Focused**: Track and restore last focused element

## Accessibility Benefits

- **WCAG Compliance**: Helps meet WCAG 2.1 success criteria
- **Keyboard Navigation**: Ensures all interactive elements are keyboard accessible
- **Screen Reader Support**: Proper focus management improves screen reader experience
- **Improved UX**: Logical focus flow enhances usability for all users
        `,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Focus Trap Story
const FocusTrapDemo = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isActive } = useFocusTrap(modalRef, {
    enabled: showModal,
    returnFocus: true,
    escapeDeactivates: true,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Focus Trap Demo</h2>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open Modal
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
            role="dialog"
            aria-modal="true"
            aria-label="Example Modal"
          >
            <h3 className="text-lg font-bold mb-4">Modal with Focus Trap</h3>
            <p className="mb-4">
              Tab through the elements below. Focus will be trapped within this modal.
              Press Escape to close.
            </p>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First input"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Second input"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Focus trap is: <strong>{isActive ? "Active" : "Inactive"}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const FocusTrap: Story = {
  render: () => <FocusTrapDemo />,
};

// Focus Return Story
const FocusReturnDemo = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { saveFocus, restoreFocus } = useFocusReturn();

  const handleShowDetails = () => {
    saveFocus();
    setShowDetails(true);
  };

  const handleHideDetails = () => {
    setShowDetails(false);
    restoreFocus();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Focus Return Demo</h2>
      <div className="space-x-2">
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Button 1
        </button>
        <button
          onClick={handleShowDetails}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Show Details
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Button 3
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Details Panel</h3>
          <p className="mb-4">
            Focus will return to the {'"'}Show Details{'"'} button when this panel is closed.
          </p>
          <button
            onClick={handleHideDetails}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};

export const FocusReturn: Story = {
  render: () => <FocusReturnDemo />,
};

// Focus on Mount Story
const FocusOnMountDemo = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useFocusOnMount(inputRef, {
    enabled: showInput,
    delay: 100,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Focus on Mount Demo</h2>
      <button
        onClick={() => setShowInput(!showInput)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {showInput ? "Hide" : "Show"} Input
      </button>

      {showInput && (
        <div className="mt-4">
          <label htmlFor="auto-focused-input" className="block mb-2 font-semibold">
            This input will be focused automatically:
          </label>
          <input
            id="auto-focused-input"
            ref={inputRef}
            type="text"
            placeholder="Auto-focused input"
            className="w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export const FocusOnMount: Story = {
  render: () => <FocusOnMountDemo />,
};

// Focus Monitor Story
const FocusMonitorDemo = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isFocused } = useFocusMonitor(buttonRef, {
    onFocus: () => console.log("Button focused"),
    onBlur: () => console.log("Button blurred"),
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Focus Monitor Demo</h2>
      <p className="mb-4">
        The button below is being monitored for focus state. Check the console for focus/blur events.
      </p>
      
      <button
        ref={buttonRef}
        className={`px-4 py-2 rounded transition-all ${
          isFocused
            ? "bg-green-500 text-white scale-110"
            : "bg-gray-300 hover:bg-gray-400"
        } focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        {isFocused ? "Focused!" : "Click to Focus"}
      </button>
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Focus State: <strong>{isFocused ? "Focused" : "Not Focused"}</strong></p>
      </div>
    </div>
  );
};

export const FocusMonitor: Story = {
  render: () => <FocusMonitorDemo />,
};

// Focus List Story
const FocusListDemo = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { focusedIndex, focusItem } = useFocusList(listRef, {
    orientation: "vertical",
    wrap: true,
    onItemFocus: (index) => console.log(`Focused item ${index}`),
  });

  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Focus List Demo</h2>
      <p className="mb-4">
        Use arrow keys to navigate through the list. Home/End keys jump to first/last items.
      </p>
      
      <div
        ref={listRef}
        role="listbox"
        aria-label="Fruit list"
        className="max-w-md border rounded-lg overflow-hidden"
      >
        {items.map((item, index) => (
          <button
            key={item}
            type="button"
            role="option"
            aria-selected={focusedIndex === index}
            tabIndex={index === 0 ? 0 : -1}
            className={`w-full text-left px-4 py-3 cursor-pointer transition-colors ${
              focusedIndex === index
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            } focus:outline-none`}
            onClick={() => focusItem(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export const FocusList: Story = {
  render: () => <FocusListDemo />,
};

// Skip Link Story
const SkipLinkDemo = () => {
  const { skipToContent } = useSkipLink("main-content", { smooth: true });

  return (
    <div className="min-h-screen">
      <button
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </button>

      <nav className="bg-gray-800 text-white p-4 mb-8">
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/services" className="hover:underline">Services</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>

      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Page Header</h1>
          <p className="text-gray-600">
            Tab to reveal the skip link, then activate it to jump to main content.
          </p>
        </div>

        <aside className="mb-8 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Sidebar</h2>
          <p>Some sidebar content here...</p>
        </aside>

        <main id="main-content" className="p-4 border-2 border-blue-500 rounded">
          <h2 className="text-xl font-bold mb-4">Main Content</h2>
          <p>
            This is the main content area. The skip link will focus this section
            and scroll it into view.
          </p>
        </main>
      </div>
    </div>
  );
};

export const SkipLink: Story = {
  render: () => <SkipLinkDemo />,
};

// Last Focused Story
const LastFocusedDemo = () => {
  const { getLastFocused, focusLastFocused } = useLastFocused();
  const [lastFocusedId, setLastFocusedId] = useState<string>("");

  const handleShowLastFocused = () => {
    const element = getLastFocused();
    setLastFocusedId(element?.id || "none");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Last Focused Demo</h2>
      <p className="mb-4">
        Focus different elements below, then use the buttons to track or restore focus.
      </p>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <button
          id="btn-1"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Button 1
        </button>
        <button
          id="btn-2"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Button 2
        </button>
        <button
          id="btn-3"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Button 3
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleShowLastFocused}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Show Last Focused
        </button>
        <button
          onClick={focusLastFocused}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Focus Last Element
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Last Focused Element ID: <strong>{lastFocusedId || "Not set"}</strong></p>
      </div>
    </div>
  );
};

export const LastFocused: Story = {
  render: () => <LastFocusedDemo />,
};