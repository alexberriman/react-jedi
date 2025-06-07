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
    
    // Helper to click a tab
    const user = userEvent.setup();
    const clickTab = async (tabText: string) => {
      // Search by text content
      const buttons = decoratorContainer.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent?.includes(tabText)) {
          await user.click(button as HTMLElement);
          await new Promise(resolve => globalThis.setTimeout(resolve, 200)); // Wait for tab switch animation
          return;
        }
      }
      throw new Error(`Tab "${tabText}" not found`);
    };
    
    // Test React mode
    await step('Testing React Component mode', async () => {
      console.log('🧪 Testing React Component mode...');
      
      // Make sure we're on React tab
      await clickTab('React Component');
      
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
    
    // Test SDUI mode
    await step('Testing SDUI (JSON) mode', async () => {
      console.log('🧪 Testing SDUI (JSON) mode...');
      
      // Switch to SDUI tab
      await clickTab('SDUI (JSON)');
      
      const sduiContainer = decoratorContainer.querySelector('[data-testid="sdui-render"]');
      if (sduiContainer) {
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