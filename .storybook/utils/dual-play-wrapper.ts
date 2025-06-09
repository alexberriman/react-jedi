import { userEvent } from "storybook/test";
import type { StoryContext } from "@storybook/react";

export type PlayFunction<TArgs = Record<string, unknown>> = (
  context: StoryContext<TArgs>
) => Promise<void> | void;

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
    
    // If there's an initially open dialog/sheet, we need to handle pointer-events before we start
    const body = document.body;
    const hasInitialPointerEventsNone = body.style.pointerEvents === 'none';
    const hasInitialScrollLock = body.hasAttribute('data-scroll-locked');
    
    if (hasInitialPointerEventsNone || hasInitialScrollLock) {
      console.log('⚠️ Detected initially open overlay component, temporarily restoring pointer events');
      body.style.pointerEvents = '';
      if (hasInitialScrollLock) {
        body.removeAttribute('data-scroll-locked');
      }
    }
    
    
    // Helper to click a tab
    const user = userEvent.setup();
    const clickTab = async (tabText: string) => {
      // Search by text content
      const buttons = decoratorContainer.querySelectorAll('button');
      let targetButton: HTMLElement | null = null;
      
      for (const button of buttons) {
        if (button.textContent?.includes(tabText)) {
          targetButton = button as HTMLElement;
          break;
        }
      }
      
      if (!targetButton) {
        throw new Error(`Tab "${tabText}" not found`);
      }
      
      // Wait for button to be interactable
      let attempts = 0;
      while (targetButton.style.pointerEvents === 'none' || targetButton.disabled) {
        if (attempts++ > 50) { // 5 seconds timeout
          console.warn(`Tab button "${tabText}" has pointer-events: none or is disabled, waiting...`);
          break;
        }
        await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      }
      
      // For overlay components (Dialog, Sheet), we need to temporarily remove pointer-events
      const body = document.body;
      const originalPointerEvents = body.style.pointerEvents;
      const hasScrollLock = body.hasAttribute('data-scroll-locked');
      
      // Temporarily restore pointer events to allow tab clicking
      body.style.pointerEvents = '';
      if (hasScrollLock) {
        body.removeAttribute('data-scroll-locked');
      }
      
      try {
        // Click the tab button
        await user.click(targetButton);
        await new Promise(resolve => globalThis.setTimeout(resolve, 200)); // Wait for tab switch animation
      } finally {
        // Restore original pointer events state
        body.style.pointerEvents = originalPointerEvents;
        if (hasScrollLock) {
          body.setAttribute('data-scroll-locked', '1');
        }
      }
    };
    
    // Test React mode
    await step('Testing React Component mode', async () => {
      console.log('🧪 Testing React Component mode...');
      
      // Make sure we're on React tab
      await clickTab('React Component');
      
      const reactContainer = decoratorContainer.querySelector('[data-testid="react-render"]');
      if (reactContainer) {
        // Wait for images to start loading
        await new Promise(resolve => globalThis.setTimeout(resolve, 300));
        
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
    
    // Test SDUI mode only if renderSpec is provided
    if (parameters?.dualMode?.renderSpec || parameters?.dualMode?.jsonSpec) {
      await step('Testing SDUI (JSON) mode', async () => {
        console.log('🧪 Testing SDUI (JSON) mode...');
        
        // Switch to SDUI tab
        await clickTab('SDUI (JSON)');
        
        const sduiContainer = decoratorContainer.querySelector('[data-testid="sdui-render"]');
        if (sduiContainer) {
          // Check if there's actual content (not the fallback message)
          const fallbackMessage = sduiContainer.querySelector('.text-muted-foreground');
          if (fallbackMessage && fallbackMessage.textContent?.includes('SDUI spec not available')) {
            console.log('⚠️ Skipping SDUI tests - no renderSpec provided');
            return;
          }
          
          // Wait for images to start loading
          await new Promise(resolve => globalThis.setTimeout(resolve, 300));
          
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
    
    // Restore initial overlay state if needed
    if (hasInitialPointerEventsNone) {
      body.style.pointerEvents = 'none';
    }
    if (hasInitialScrollLock) {
      body.setAttribute('data-scroll-locked', '1');
    }
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