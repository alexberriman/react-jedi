import { userEvent } from "storybook/test";
import type { StoryContext } from "@storybook/react";

export type PlayFunction<TArgs = Record<string, unknown>> = (
  context: StoryContext<TArgs>
) => Promise<void> | void;

async function waitForButtonToBeInteractive(button: HTMLElement): Promise<void> {
  let attempts = 0;
  while (attempts < 10) {
    // Check if the button itself is disabled (not inherited from body)
    if (!button.hasAttribute('disabled') && !button.style.pointerEvents) {
      return;
    }
    if (attempts === 0) {
      console.warn(`Tab button "${button.textContent}" has pointer-events: none or is disabled, waiting...`);
    }
    await new Promise(resolve => globalThis.setTimeout(resolve, 100));
    attempts++;
  }
  
  // Final check - only look at the button's own properties, not computed style
  if (button.hasAttribute('disabled') || button.style.pointerEvents === 'none') {
    throw new Error(`Tab button "${button.textContent}" still has pointer-events: none after waiting`);
  }
}

async function cleanupOverlays(): Promise<void> {
  // Press Escape to close any open overlays
  const user = userEvent.setup();
  await user.keyboard('{Escape}');
  
  // Wait a bit for animations
  await new Promise(resolve => globalThis.setTimeout(resolve, 300));
  
  // Reset body state
  const body = document.body;
  body.style.pointerEvents = '';
  delete body.dataset.scrollLocked;
}

async function clickTab(decoratorContainer: Element, tabText: string): Promise<void> {
  const user = userEvent.setup();
  const buttons = decoratorContainer.querySelectorAll('button');
  
  for (const button of buttons) {
    if (button.textContent?.includes(tabText)) {
      const htmlButton = button as HTMLElement;
      await waitForButtonToBeInteractive(htmlButton);
      
      // Temporarily override body pointer-events if needed
      const body = document.body;
      const originalPointerEvents = body.style.pointerEvents;
      const hasScrollLock = Object.hasOwn(body.dataset, 'scrollLocked');
      
      // Store the original state and temporarily enable pointer events
      if (globalThis.getComputedStyle(body).pointerEvents === 'none') {
        body.style.pointerEvents = 'auto';
      }
      
      try {
        await user.click(htmlButton);
        await new Promise(resolve => globalThis.setTimeout(resolve, 200));
      } finally {
        // Restore original state
        body.style.pointerEvents = originalPointerEvents;
        if (hasScrollLock && !Object.hasOwn(body.dataset, 'scrollLocked')) {
          body.dataset.scrollLocked = '1';
        }
      }
      
      return;
    }
  }
  
  throw new Error(`Tab "${tabText}" not found`);
}

/**
 * Wraps a play function to test both React and SDUI modes automatically
 */
export function createDualPlayFunction<TArgs = Record<string, unknown>>(
  originalPlay: PlayFunction<TArgs>
): PlayFunction<TArgs> {
  return async (context: StoryContext<TArgs>) => {
    const { canvasElement, parameters, step } = context;
    
    // Skip dual testing if not enabled
    if (!parameters?.dualMode?.enabled) {
      return originalPlay(context);
    }
    
    // Wait a bit for the decorator to render
    await new Promise(resolve => globalThis.setTimeout(resolve, 100));
    
    // Find the decorator container
    const decoratorContainer = canvasElement.querySelector('[data-dual-mode-decorator]');
    if (!decoratorContainer) {
      console.warn('⚠️ Dual-mode decorator not found, running tests on default view');
      return originalPlay(context);
    }
    
    // Check if there's an open dialog that might block interaction
    const openDialog = document.querySelector('[data-slot="dialog-content"][data-state="open"]');
    if (openDialog) {
      console.log('⚠️ Found open dialog, closing it before testing tabs...');
      const closeButton = document.querySelector('[data-slot="dialog-content"] button[aria-label*="close" i]') as HTMLElement;
      if (closeButton) {
        await userEvent.click(closeButton);
        // Wait for dialog to close
        await new Promise(resolve => globalThis.setTimeout(resolve, 500));
      }
    }
    
    
    // Test React mode
    await step('Testing React Component mode', async () => {
      console.log('🧪 Testing React Component mode...');
      
      // Make sure we're on React tab
      await clickTab(decoratorContainer, 'React Component');
      
      const reactContainer = decoratorContainer.querySelector('[data-testid="react-render"]');
      if (reactContainer) {
        const reactContext = {
          ...context,
          canvasElement: reactContainer as HTMLElement
        };
        await originalPlay(reactContext);
        console.log('✅ React Component tests passed');
      } else {
        throw new Error('React render container not found');
      }
    });
    
    // Clean up any open overlays before switching to SDUI mode
    await cleanupOverlays();
    
    // Test SDUI mode only if renderSpec is provided
    if (parameters?.dualMode?.renderSpec || parameters?.dualMode?.jsonSpec) {
      await step('Testing SDUI (JSON) mode', async () => {
        console.log('🧪 Testing SDUI (JSON) mode...');
        
        // Switch to SDUI tab
        await clickTab(decoratorContainer, 'SDUI (JSON)');
        
        const sduiContainer = decoratorContainer.querySelector('[data-testid="sdui-render"]');
        if (sduiContainer) {
          // Check if there's actual content (not the fallback message)
          const fallbackMessage = sduiContainer.querySelector('.text-muted-foreground');
          if (fallbackMessage && fallbackMessage.textContent?.includes('SDUI spec not available')) {
            console.log('⚠️ Skipping SDUI tests - no renderSpec provided');
            return;
          }
          
          const sduiContext = {
            ...context,
            canvasElement: sduiContainer as HTMLElement
          };
          await originalPlay(sduiContext);
          console.log('✅ SDUI (JSON) tests passed');
        } else {
          throw new Error('SDUI render container not found');
        }
      });
    } else {
      console.log('ℹ️ Skipping SDUI tests - no renderSpec provided');
    }
    
    console.log('🎉 All dual-mode tests completed successfully');
  };
}

/**
 * Helper to run tests on both modes sequentially with visual feedback
 */
export async function runDualModeTests(
  canvasElement: HTMLElement,
  testFn: (container: HTMLElement) => Promise<void>
) {
  const reactContainer = canvasElement.querySelector('[data-testid="react-render"]');
  const sduiContainer = canvasElement.querySelector('[data-testid="sdui-render"]');
  
  if (reactContainer) {
    await testFn(reactContainer as HTMLElement);
  }
  
  if (sduiContainer) {
    await testFn(sduiContainer as HTMLElement);
  }
}