import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui';

export function CssDiagnosticsPage() {
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});
  const [computedStyles, setComputedStyles] = useState<{
    primary: CSSStyleDeclaration | null;
    hardcoded: CSSStyleDeclaration | null;
  }>({
    primary: null,
    hardcoded: null,
  });

  useEffect(() => {
    // Get all CSS variables from :root
    const root = document.documentElement;
    const rootStyles = globalThis.getComputedStyle(root);
    const variables: Record<string, string> = {};

    // Get all CSS custom properties
    for (const prop of rootStyles) {
      if (prop.startsWith('--')) {
        variables[prop] = rootStyles.getPropertyValue(prop);
      }
    }

    setCssVariables(variables);

    // Get computed styles for buttons after they render
    globalThis.setTimeout(() => {
      const primaryButton = document.querySelector('#primary-button');
      const hardcodedButton = document.querySelector('#hardcoded-button');

      if (primaryButton) {
        setComputedStyles((prev) => ({
          ...prev,
          primary: globalThis.getComputedStyle(primaryButton),
        }));
      }

      if (hardcodedButton) {
        setComputedStyles((prev) => ({
          ...prev,
          hardcoded: globalThis.getComputedStyle(hardcodedButton),
        }));
      }
    }, 100);
  }, []);

  const getButtonColors = (styles: CSSStyleDeclaration | null) => {
    if (!styles) return {};
    return {
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      borderColor: styles.borderColor,
    };
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">CSS Diagnostics</h1>

      {/* Test Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Test Buttons</h2>
        <div className="space-y-4">
          <div className="space-x-4">
            <Button id="primary-button" variant="default">
              Primary Button (Using CSS Variables)
            </Button>
            <Button
              id="hardcoded-button"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Hardcoded Blue Button
            </Button>
          </div>

          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              Native button with primary classes
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Native button with hardcoded blue
            </button>
          </div>
        </div>
      </section>

      {/* CSS Variables */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">CSS Variables</h2>
        <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          <pre className="text-sm">
            {Object.entries(cssVariables)
              .filter(([key]) => key.includes('primary') || key.includes('background') || key.includes('foreground'))
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([key, value]) => (
                <div key={key}>
                  <span className="text-blue-600">{key}</span>: <span className="text-green-600">{value}</span>
                </div>
              ))}
          </pre>
        </div>
      </section>

      {/* Computed Styles */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Computed Styles</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Primary Button</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm">
              {JSON.stringify(getButtonColors(computedStyles.primary), null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hardcoded Button</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm">
              {JSON.stringify(getButtonColors(computedStyles.hardcoded), null, 2)}
            </pre>
          </div>
        </div>
      </section>

      {/* Color Test Blocks */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Color Test Blocks</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-20 bg-primary rounded"></div>
            <p className="text-sm text-center">bg-primary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-20 bg-blue-500 rounded"></div>
            <p className="text-sm text-center">bg-blue-500</p>
          </div>
          <div className="space-y-2">
            <div
              className="w-full h-20 rounded"
              style={{ backgroundColor: 'oklch(var(--primary))' }}
            ></div>
            <p className="text-sm text-center">oklch(var(--primary))</p>
          </div>
          <div className="space-y-2">
            <div
              className="w-full h-20 rounded"
              style={{ backgroundColor: 'oklch(59.18% 0.2132 263.83)' }}
            ></div>
            <p className="text-sm text-center">Direct oklch value</p>
          </div>
        </div>
      </section>

      {/* Tailwind Config Check */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Tailwind Classes Test</h2>
        <div className="space-y-2">
          <p className="text-primary">This text should be primary color</p>
          <p className="text-primary-foreground bg-primary p-2 rounded">
            This should be primary foreground on primary background
          </p>
          <p className="text-blue-500">This text should be blue-500</p>
        </div>
      </section>
    </div>
  );
}