import { useEffect, useState } from 'react';

export function StyleDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<{
    cssVars: Record<string, string>;
    computedStyles: Record<string, string>;
  }>({ cssVars: {}, computedStyles: {} });

  useEffect(() => {
    // Get CSS custom properties
    const rootStyles = globalThis.getComputedStyle(document.documentElement);
    const cssVars: Record<string, string> = {};
    
    // Check key color variables
    const colorVars = [
      '--primary',
      '--primary-foreground',
      '--secondary',
      '--secondary-foreground',
      '--background',
      '--foreground',
      '--accent',
      '--accent-foreground'
    ];
    
    for (const varName of colorVars) {
      cssVars[varName] = rootStyles.getPropertyValue(varName).trim();
    }

    // Get computed styles of a button
    const button = document.querySelector('[data-slot="button"]');
    const computedStyles: Record<string, string> = {};
    
    if (button) {
      const buttonStyles = globalThis.getComputedStyle(button);
      computedStyles['background-color'] = buttonStyles.backgroundColor;
      computedStyles['color'] = buttonStyles.color;
      computedStyles['computed-background'] = buttonStyles.getPropertyValue('background-color');
      computedStyles['classes'] = button.className;
    }

    setDiagnostics({ cssVars, computedStyles });
  }, []);

  return (
    <div className="p-4 bg-muted rounded-lg space-y-4 text-xs font-mono">
      <div>
        <h3 className="font-semibold mb-2">CSS Variables:</h3>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(diagnostics.cssVars, null, 2)}
        </pre>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Button Computed Styles:</h3>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(diagnostics.computedStyles, null, 2)}
        </pre>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Test Buttons:</h3>
        <div className="flex gap-2 flex-wrap">
          <button 
            className="bg-primary text-primary-foreground px-4 py-2 rounded"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            Direct CSS Var
          </button>
          
          <button 
            className="px-4 py-2 rounded"
            style={{ backgroundColor: 'oklch(0.205 0 0)', color: 'oklch(0.985 0 0)' }}
          >
            Direct oklch
          </button>
          
          <button 
            className="bg-primary text-primary-foreground px-4 py-2 rounded"
          >
            Tailwind Classes
          </button>
        </div>
      </div>
    </div>
  );
}