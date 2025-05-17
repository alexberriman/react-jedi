import React, { useState, useRef } from "react";
import {
  useFocusTrap,
  useFocusOnMount,
  useFocusMonitor,
  useFocusList,
  useSkipLink,
} from "../accessibility/focus-management";

/**
 * Example demonstrating comprehensive focus management features
 */
export function FocusManagementExample() {
  const { skipToContent } = useSkipLink("main-content", { smooth: true });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Skip Link */}
      <button
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Skip to main content
      </button>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Focus Management Demo</h1>
        <nav className="flex gap-4">
          <a href="/" className="text-blue-600 hover:underline">Home</a>
          <a href="/about" className="text-blue-600 hover:underline">About</a>
          <a href="/services" className="text-blue-600 hover:underline">Services</a>
          <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" className="space-y-8">
        <ModalExample />
        <NavigationListExample />
        <FocusMonitorExample />
        <AutoFocusExample />
      </main>
    </div>
  );
}

/**
 * Modal with focus trap
 */
function ModalExample() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isActive } = useFocusTrap(modalRef, {
    enabled: showModal,
    returnFocus: true,
    escapeDeactivates: true,
  });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Modal with Focus Trap</h2>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Modal
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            role="dialog"
            aria-modal="true"
            aria-label="Example Modal"
          >
            <h3 className="text-xl font-bold mb-4">Modal Dialog</h3>
            <p className="mb-4">
              Focus is trapped within this modal. Use Tab to navigate, Escape to close.
            </p>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First input"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Second input"
                className="w-full px-3 py-2 border rounded"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Focus trap is: <strong>{isActive ? "Active" : "Inactive"}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Navigation list with arrow key navigation
 */
function NavigationListExample() {
  const listRef = useRef<HTMLDivElement>(null);
  const { focusedIndex, focusItem } = useFocusList(listRef, {
    orientation: "vertical",
    wrap: true,
  });

  const items = ["Dashboard", "Profile", "Settings", "Notifications", "Logout"];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">List Navigation</h2>
      <p className="mb-4 text-gray-600">
        Use arrow keys to navigate, Home/End to jump to first/last item
      </p>
      
      <div
        ref={listRef}
        role="menu"
        aria-label="Main menu"
        className="max-w-xs border rounded-lg overflow-hidden"
      >
        {items.map((item, index) => (
          <button
            key={item}
            type="button"
            role="menuitem"
            tabIndex={index === 0 ? 0 : -1}
            className={`w-full text-left px-4 py-3 cursor-pointer ${
              focusedIndex === index
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => focusItem(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

/**
 * Focus monitoring example
 */
function FocusMonitorExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isFocused } = useFocusMonitor(inputRef);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Focus Monitor</h2>
      <div className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Focus this input"
          className={`px-3 py-2 border rounded transition-all ${
            isFocused ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
          }`}
        />
        <p className="text-sm">
          Input is: <strong>{isFocused ? "Focused" : "Not focused"}</strong>
        </p>
      </div>
    </section>
  );
}

/**
 * Auto-focus on mount example
 */
function AutoFocusExample() {
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useFocusOnMount(inputRef, {
    enabled: showForm,
    delay: 100,
  });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Auto Focus</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {showForm ? "Hide" : "Show"} Form
      </button>

      {showForm && (
        <div className="mt-4 p-4 border rounded">
          <label className="block mb-2">
            Email (auto-focused):
            <input
              ref={inputRef}
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
            />
          </label>
        </div>
      )}
    </section>
  );
}