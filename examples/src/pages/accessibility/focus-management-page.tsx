import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useFocusTrap,
  useFocusReturn,
  useFocusOnMount,
  useFocusMonitor,
  useFocusList,
  useSkipLink,
} from "../../../../src/lib/accessibility/focus-management";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export function FocusManagementPage() {
  const { skipToContent } = useSkipLink("main-content", { smooth: true });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Skip to main content link */}
      <button
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </button>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Focus Management Demo
            </h1>
            <nav>
              <Link 
                to="/"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Back to Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page demonstrates various focus management techniques for building accessible React applications.
          </p>
        </div>

        <div className="grid gap-8">
          <FocusTrapDemo />
          <FocusListDemo />
          <FocusMonitorDemo />
          <FocusReturnDemo />
          <AutoFocusDemo />
        </div>
      </main>
    </div>
  );
}

// Focus Trap Demo Component
function FocusTrapDemo() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isActive } = useFocusTrap(modalRef, {
    enabled: showModal,
    returnFocus: true,
    escapeDeactivates: true,
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Focus Trap Demo</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Click the button to open a modal with focus trap. Tab navigation will be contained within the modal.
      </p>
      
      <Button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Open Modal with Focus Trap
      </Button>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
            role="dialog"
            aria-modal="true"
            aria-label="Example Modal"
          >
            <h3 className="text-lg font-bold mb-4">Modal with Focus Trap</h3>
            <Badge className="mb-4" variant={isActive ? "success" : "default"}>
              Focus Trap: {isActive ? "Active" : "Inactive"}
            </Badge>
            
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Focus is trapped within this modal. Press Tab to navigate through elements, or press Escape to close.
            </p>
            
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="First input field"
                className="w-full"
              />
              <Input
                type="email"
                placeholder="Email input field"
                className="w-full"
              />
              <textarea
                placeholder="Text area field"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Card>
  );
}

// Focus List Demo Component
function FocusListDemo() {
  const listRef = useRef<HTMLDivElement>(null);
  const { focusedIndex, focusItem } = useFocusList(listRef, {
    orientation: "vertical",
    wrap: true,
  });

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "help", label: "Help & Support", icon: "❓" },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Focus List Navigation</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Use arrow keys to navigate through the menu. Home/End keys jump to first/last items.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Navigation Menu</h3>
          <div
            ref={listRef}
            role="menu"
            aria-label="Main navigation"
            className="border rounded-lg overflow-hidden"
          >
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                tabIndex={index === 0 ? 0 : -1}
                className={`w-full text-left px-4 py-3 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                  focusedIndex === index
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                } focus:outline-none`}
                onClick={() => focusItem(index)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Keyboard Instructions</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">↑</kbd> / {" "}
              <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">↓</kbd> - Navigate items
            </li>
            <li>
              <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">Home</kbd> - Jump to first item
            </li>
            <li>
              <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">End</kbd> - Jump to last item
            </li>
            <li>
              <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">Tab</kbd> - Exit the menu
            </li>
          </ul>
          <div className="mt-4 p-2 bg-blue-100 dark:bg-blue-900 rounded">
            <p className="text-sm">
              Current focus: <strong>{menuItems[focusedIndex]?.label || "None"}</strong>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Focus Monitor Demo Component
function FocusMonitorDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isFocused: inputFocused } = useFocusMonitor(inputRef);
  const { isFocused: buttonFocused } = useFocusMonitor(buttonRef);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Focus Monitor</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Focus monitoring helps track which elements are currently focused, useful for showing visual feedback.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="monitored-input" className="block mb-2 font-medium">Monitored Input</label>
            <Input
              ref={inputRef}
              id="monitored-input"
              type="text"
              placeholder="Focus this input"
              className={`transition-all duration-200 ${
                inputFocused ? "ring-4 ring-blue-400" : ""
              }`}
            />
          </div>
          
          <div>
            <Button
              ref={buttonRef}
              className={`transition-all duration-200 ${
                buttonFocused 
                  ? "bg-green-600 hover:bg-green-700 scale-105" 
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {buttonFocused ? "Focused!" : "Click to Focus"}
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Focus Status</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${inputFocused ? "bg-green-500" : "bg-gray-400"}`} />
              <span>Input: {inputFocused ? "Focused" : "Not Focused"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${buttonFocused ? "bg-green-500" : "bg-gray-400"}`} />
              <span>Button: {buttonFocused ? "Focused" : "Not Focused"}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Focus Return Demo Component
function FocusReturnDemo() {
  const [showPanel, setShowPanel] = useState(false);
  const { saveFocus, restoreFocus } = useFocusReturn();

  const handleShowPanel = () => {
    saveFocus();
    setShowPanel(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    restoreFocus();
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Focus Return</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Focus return ensures that focus is restored to the previously focused element after an interaction.
      </p>
      
      <div className="flex gap-4 mb-4">
        <Button variant="secondary">Button 1</Button>
        <Button 
          onClick={handleShowPanel}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Open Details Panel
        </Button>
        <Button variant="secondary">Button 3</Button>
      </div>

      {showPanel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-4 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <h3 className="font-bold mb-2">Details Panel</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            When you close this panel, focus will automatically return to the button that opened it.
          </p>
          <Button
            onClick={handleClosePanel}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Close Panel
          </Button>
        </motion.div>
      )}
    </Card>
  );
}

// Auto Focus Demo Component
function AutoFocusDemo() {
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useFocusOnMount(inputRef, {
    enabled: showForm,
    delay: 200,
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Auto Focus on Mount</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Automatically focus elements when they appear, improving user experience for form interactions.
      </p>
      
      <Button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 hover:bg-green-700 text-white mb-4"
      >
        {showForm ? "Hide" : "Show"} Search Form
      </Button>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="search-input" className="block mb-2 font-medium">
              Search (auto-focused after 200ms)
            </label>
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                id="search-input"
                type="search"
                placeholder="Type to search..."
                className="flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded">
            <p className="text-sm text-green-800 dark:text-green-200">
              ✨ The search input was automatically focused when it appeared!
            </p>
          </div>
        </motion.div>
      )}
    </Card>
  );
}