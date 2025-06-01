import React from 'react';
import { render } from '@alexberriman/react-jedi';
import { Button } from '../../../components/ui/button';
import { usePageMetadata } from '../../../lib/meta';
import { Link } from 'react-router-dom';
import type { ToastSpecification } from '@alexberriman/react-jedi';

function ToastShowcasePage() {
  usePageMetadata({
    title: 'Toast Component - React Jedi Showcase',
    description: 'Interactive examples of the Toast component in React Jedi'
  });

  // Basic toast specification
  const basicToastSpec: ToastSpecification = {
    type: 'toast',
    position: 'bottom-right',
    theme: 'system',
    richColors: true,
    closeButton: false,
    expand: false,
    duration: 4000,
    gap: 14,
    visibleToasts: 3
  };

  // Toast with custom styling
  const styledToastSpec: ToastSpecification = {
    type: 'toast',
    position: 'top-center',
    theme: 'light',
    richColors: true,
    closeButton: true,
    expand: true,
    duration: 6000,
    gap: 20,
    offset: '20px',
    toastOptions: {
      className: 'my-custom-toast',
      classNames: {
        toast: 'bg-gradient-to-r from-purple-500 to-pink-500',
        title: 'text-white font-bold',
        description: 'text-gray-100'
      }
    }
  };

  // Multi-position toast example
  const multiPositionSpec: ToastSpecification = {
    type: 'toast',
    position: 'top-right',
    theme: 'dark',
    richColors: true,
    closeButton: true,
    duration: 5000
  };

  const handleBasicToast = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('Basic toast message');
    }
  };

  const handleSuccessToast = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('Operation completed successfully!', {
        type: 'success',
        description: 'Your changes have been saved.'
      });
    }
  };

  const handleErrorToast = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('Something went wrong!', {
        type: 'error',
        description: 'Please try again later.'
      });
    }
  };

  const handleWarningToast = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('Warning: Low disk space', {
        type: 'warning',
        description: 'You have less than 10GB remaining.'
      });
    }
  };

  const handleInfoToast = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('New update available', {
        type: 'info',
        description: 'Version 2.0 is now available for download.'
      });
    }
  };

  const handleLoadingToast = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('Processing your request...', {
        type: 'loading',
        duration: 10_000
      });
    }
  };

  const handleActionToast = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('New message received', {
        description: 'John Doe sent you a message',
        action: {
          label: 'View',
          onClick: () => console.log('View clicked')
        },
        cancel: {
          label: 'Dismiss',
          onClick: () => console.log('Dismissed')
        }
      });
    }
  };

  const handlePromiseToast = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'promise' in toastComponent) {
      const promise = new Promise((resolve) => {
        globalThis.setTimeout(() => resolve('Data loaded successfully!'), 3000);
      });

      toastComponent.promise(promise, {
        loading: 'Loading data...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data'
      });
    }
  };

  const handleStyledToast = () => {
    const toastComponent = render(styledToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('Custom styled toast', {
        description: 'This toast has custom styling applied'
      });
    }
  };

  const handleMultipleToasts = () => {
    const toastComponent = render(basicToastSpec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show('First toast message');
      globalThis.setTimeout(() => toastComponent.show('Second toast message'), 500);
      globalThis.setTimeout(() => toastComponent.show('Third toast message'), 1000);
      globalThis.setTimeout(() => toastComponent.show('Fourth toast message'), 1500);
    }
  };

  const positions = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ] as const;

  const handlePositionToast = (position: typeof positions[number]) => {
    const spec: ToastSpecification = {
      ...multiPositionSpec,
      position
    };
    const toastComponent = render(spec);
    if (toastComponent && 'show' in toastComponent) {
      toastComponent.show(`Toast at ${position}`);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-emerald-600 mb-4">Toast Component</h1>
          <p className="text-lg text-zinc-400 max-w-3xl">
            The Toast component provides non-intrusive notifications that appear temporarily to inform users about 
            actions, events, or important information. It supports multiple positions, themes, and toast types.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="mb-16 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-emerald-600">Table of Contents</h2>
          <nav className="space-y-2">
            <a href="#basic-usage" className="block text-zinc-400 hover:text-emerald-600 transition-colors">
              1. Basic Usage
            </a>
            <a href="#toast-types" className="block text-zinc-400 hover:text-emerald-600 transition-colors">
              2. Toast Types
            </a>
            <a href="#toast-actions" className="block text-zinc-400 hover:text-emerald-600 transition-colors">
              3. Toast with Actions
            </a>
            <a href="#promise-toast" className="block text-zinc-400 hover:text-emerald-600 transition-colors">
              4. Promise Toast
            </a>
            <a href="#positioning" className="block text-zinc-400 hover:text-emerald-600 transition-colors">
              5. Toast Positioning
            </a>
            <a href="#custom-styling" className="block text-zinc-400 hover:text-emerald-600 transition-colors">
              6. Custom Styling
            </a>
            <a href="#multiple-toasts" className="block text-zinc-400 hover:text-emerald-600 transition-colors">
              7. Multiple Toasts
            </a>
            <a href="#properties" className="block text-zinc-400 hover:text-emerald-600 transition-colors">
              8. Properties Reference
            </a>
          </nav>
        </div>

        {/* Basic Usage */}
        <section id="basic-usage" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Basic Usage</h2>
          <p className="text-zinc-400 mb-8">
            The simplest way to use the Toast component is to create a toast instance and call the show method.
          </p>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 mb-4">
            <Button onClick={handleBasicToast} className="mb-4">
              Show Basic Toast
            </Button>
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-300">
{`{
  "type": "toast",
  "position": "bottom-right",
  "theme": "system",
  "richColors": true,
  "closeButton": false,
  "expand": false,
  "duration": 4000,
  "gap": 14,
  "visibleToasts": 3
}`}
            </code>
          </pre>
        </section>

        {/* Toast Types */}
        <section id="toast-types" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Toast Types</h2>
          <p className="text-zinc-400 mb-8">
            React Jedi&apos;s Toast component supports multiple types for different scenarios.
          </p>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button onClick={handleSuccessToast} className="bg-green-600 hover:bg-green-700">
                Success Toast
              </Button>
              <Button onClick={handleErrorToast} className="bg-red-600 hover:bg-red-700">
                Error Toast
              </Button>
              <Button onClick={handleWarningToast} className="bg-yellow-600 hover:bg-yellow-700">
                Warning Toast
              </Button>
              <Button onClick={handleInfoToast} className="bg-blue-600 hover:bg-blue-700">
                Info Toast
              </Button>
              <Button onClick={handleLoadingToast} className="bg-purple-600 hover:bg-purple-700">
                Loading Toast
              </Button>
            </div>
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-300">
{`// Success Toast
toastComponent.show('Operation completed!', {
  type: 'success',
  description: 'Your changes have been saved.'
});

// Error Toast
toastComponent.show('Something went wrong!', {
  type: 'error',
  description: 'Please try again later.&apos;
});`}
            </code>
          </pre>
        </section>

        {/* Toast with Actions */}
        <section id="toast-actions" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Toast with Actions</h2>
          <p className="text-zinc-400 mb-8">
            Add interactive buttons to your toasts for user actions.
          </p>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 mb-4">
            <Button onClick={handleActionToast}>
              Show Toast with Actions
            </Button>
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-300">
{`toastComponent.show('New message received', {
  description: 'John Doe sent you a message',
  action: {
    label: 'View',
    onClick: () => console.log('View clicked')
  },
  cancel: {
    label: 'Dismiss',
    onClick: () => console.log('Dismissed&apos;)
  }
});`}
            </code>
          </pre>
        </section>

        {/* Promise Toast */}
        <section id="promise-toast" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Promise Toast</h2>
          <p className="text-zinc-400 mb-8">
            Track asynchronous operations with promise toasts that update based on promise state.
          </p>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 mb-4">
            <Button onClick={handlePromiseToast}>
              Show Promise Toast
            </Button>
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-300">
{`const promise = new Promise((resolve) => {
  window.setTimeout(() => resolve('Data loaded!'), 3000);
});

toastComponent.promise(promise, {
  loading: 'Loading data...',
  success: 'Data loaded successfully!',
  error: 'Failed to load data&apos;
});`}
            </code>
          </pre>
        </section>

        {/* Positioning */}
        <section id="positioning" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Toast Positioning</h2>
          <p className="text-zinc-400 mb-8">
            Position toasts anywhere on the screen with the position property.
          </p>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {positions.map((position) => (
                <Button
                  key={position}
                  onClick={() => handlePositionToast(position)}
                  variant="outline"
                  className="text-sm"
                >
                  {position}
                </Button>
              ))}
            </div>
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-300">
{`{
  "type": "toast",
  "position": "top-right", // or any position
  "theme": "dark",
  "richColors": true,
  "closeButton": true,
  "duration": 5000
}`}
            </code>
          </pre>
        </section>

        {/* Custom Styling */}
        <section id="custom-styling" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Custom Styling</h2>
          <p className="text-zinc-400 mb-8">
            Customize the appearance of toasts with custom classes and styles.
          </p>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 mb-4">
            <Button onClick={handleStyledToast}>
              Show Custom Styled Toast
            </Button>
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-300">
{`{
  "type": "toast",
  "position": "top-center",
  "theme": "light",
  "richColors": true,
  "closeButton": true,
  "expand": true,
  "duration": 6000,
  "toastOptions": {
    "className": "my-custom-toast",
    "classNames": {
      "toast": "bg-gradient-to-r from-purple-500 to-pink-500",
      "title": "text-white font-bold",
      "description": "text-gray-100"
    }
  }
}`}
            </code>
          </pre>
        </section>

        {/* Multiple Toasts */}
        <section id="multiple-toasts" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Multiple Toasts</h2>
          <p className="text-zinc-400 mb-8">
            Display multiple toasts simultaneously with automatic stacking and visibility limits.
          </p>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 mb-4">
            <Button onClick={handleMultipleToasts}>
              Show Multiple Toasts
            </Button>
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-300">
{`// The visibleToasts property limits how many toasts are shown
{
  "type": "toast",
  "visibleToasts": 3, // Only 3 toasts visible at once
  "gap": 14 // Gap between toasts in pixels
}`}
            </code>
          </pre>
        </section>

        {/* Properties Reference */}
        <section id="properties" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Properties Reference</h2>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="pb-4 text-emerald-600 font-semibold">Property</th>
                    <th className="pb-4 text-emerald-600 font-semibold">Type</th>
                    <th className="pb-4 text-emerald-600 font-semibold">Default</th>
                    <th className="pb-4 text-emerald-600 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">position</td>
                    <td className="py-3">string</td>
                    <td className="py-3">&apos;bottom-right&apos;</td>
                    <td className="py-3">Toast position on screen</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">theme</td>
                    <td className="py-3">string</td>
                    <td className="py-3">&apos;system&apos;</td>
                    <td className="py-3">Color theme (light/dark/system)</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">richColors</td>
                    <td className="py-3">boolean</td>
                    <td className="py-3">true</td>
                    <td className="py-3">Use colored backgrounds for toast types</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">closeButton</td>
                    <td className="py-3">boolean</td>
                    <td className="py-3">false</td>
                    <td className="py-3">Show close button</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">expand</td>
                    <td className="py-3">boolean</td>
                    <td className="py-3">false</td>
                    <td className="py-3">Expand toasts by default</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">duration</td>
                    <td className="py-3">number</td>
                    <td className="py-3">4000</td>
                    <td className="py-3">Auto-dismiss duration in ms</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">gap</td>
                    <td className="py-3">number</td>
                    <td className="py-3">14</td>
                    <td className="py-3">Gap between toasts in pixels</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">visibleToasts</td>
                    <td className="py-3">number</td>
                    <td className="py-3">3</td>
                    <td className="py-3">Maximum visible toasts</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">offset</td>
                    <td className="py-3">string</td>
                    <td className="py-3">-</td>
                    <td className="py-3">Distance from screen edge</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">direction</td>
                    <td className="py-3">string</td>
                    <td className="py-3">&apos;auto&apos;</td>
                    <td className="py-3">Text direction (ltr/rtl/auto)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-zinc-100">Show Method Options</h3>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="pb-4 text-emerald-600 font-semibold">Option</th>
                    <th className="pb-4 text-emerald-600 font-semibold">Type</th>
                    <th className="pb-4 text-emerald-600 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">type</td>
                    <td className="py-3">string</td>
                    <td className="py-3">Toast type (default/success/error/warning/info/loading)</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">description</td>
                    <td className="py-3">string</td>
                    <td className="py-3">Additional description text</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">duration</td>
                    <td className="py-3">number</td>
                    <td className="py-3">Override default duration</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">action</td>
                    <td className="py-3">object</td>
                    <td className="py-3">Primary action button (label, onClick)</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-mono text-sm">cancel</td>
                    <td className="py-3">object</td>
                    <td className="py-3">Cancel action button (label, onClick)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-zinc-100">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold mb-2 text-emerald-600">🎨 Rich Visuals</h3>
              <p className="text-zinc-400">
                Beautiful, customizable toasts with support for themes, colors, and custom styling.
              </p>
            </div>
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold mb-2 text-emerald-600">♿ Accessible</h3>
              <p className="text-zinc-400">
                Built with accessibility in mind, including proper ARIA attributes and keyboard support.
              </p>
            </div>
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold mb-2 text-emerald-600">⚡ Performant</h3>
              <p className="text-zinc-400">
                Lightweight and optimized for performance with automatic cleanup and memory management.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-zinc-800">
          <Link
            to="/showcase"
            className="text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            ← Back to Showcase
          </Link>
          <Link
            to="/documentation"
            className="text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            View Documentation →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ToastShowcasePage;
