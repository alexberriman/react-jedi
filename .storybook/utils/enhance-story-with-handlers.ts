import type { StoryObj } from "@storybook/react-vite";
import { DualModeDecoratorEnhanced } from "../decorators/dual-mode-decorator-enhanced";
import { createDualPlayFunction, type PlayFunction } from "./dual-play-wrapper";

interface EnhanceStoryOptions {
  /**
   * Custom JSON spec for the SDUI view. If not provided, will be auto-generated from args.
   */
  jsonSpec?: unknown;
  
  /**
   * For stories with custom render functions, provide the spec here
   */
  renderSpec?: unknown;
  
  /**
   * Event handlers for SDUI mode
   */
  handlers?: Record<string, (...args: unknown[]) => void>;
  
  /**
   * Whether to enable dual mode for this story (default: true)
   */
  enabled?: boolean;
  
  /**
   * Whether to automatically test both modes (default: true)
   */
  autoTest?: boolean;
}

/**
 * Enhanced version of enhanceStoryForDualMode that properly handles event handlers
 * 
 * This function enhances a story to support dual-mode rendering (React + SDUI)
 * with proper event handler support for components like Dialog that need callbacks.
 * 
 * Usage example:
 * ```typescript
 * export const MyDialogStory = enhanceStoryWithHandlers(
 *   {
 *     render: (args) => <Dialog {...args}>...</Dialog>,
 *     play: async ({ canvasElement }) => { ... }
 *   },
 *   {
 *     renderSpec: {
 *       type: "Dialog",
 *       onOpenChangeAction: "handleDialogOpenChange",
 *       children: [...]
 *     },
 *     handlers: {
 *       handleDialogOpenChange: (open) => console.log('Dialog open:', open)
 *     }
 *   }
 * );
 * ```
 */
export function enhanceStoryWithHandlers<T = unknown>(
  story: StoryObj<T>,
  options: EnhanceStoryOptions = {}
): StoryObj<T> {
  const { enabled = true, autoTest = true, jsonSpec, renderSpec, handlers = {} } = options;
  
  return {
    ...story,
    decorators: [
      ...((story.decorators || []) as Array<(story: unknown, context: unknown) => React.ReactElement>),
      DualModeDecoratorEnhanced as unknown as (story: unknown, context: unknown) => React.ReactElement
    ],
    play: story.play && autoTest ? createDualPlayFunction(story.play as unknown as PlayFunction<T>) : story.play,
    parameters: {
      ...story.parameters,
      layout: story.parameters?.layout || 'fullscreen',
      dualMode: {
        enabled,
        autoTest,
        jsonSpec,
        renderSpec,
        handlers,
        ...story.parameters?.dualMode
      }
    }
  };
}

/**
 * Helper to create dialog handlers for stories
 * 
 * This creates a standard set of handlers for dialog components that manage
 * open/close state and common actions.
 * 
 * @param options Configuration for the dialog handlers
 * @returns Object with dialog event handlers
 */
export function createDialogHandlers(options: {
  onOpenChange?: (open: boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
} = {}) {
  const handlers: Record<string, (...args: unknown[]) => void> = {};
  
  // Dialog open/close handler
  handlers.handleDialogOpenChange = (...args: unknown[]) => {
    const open = args[0] as boolean;
    console.log('Dialog open state:', open);
    options.onOpenChange?.(open);
  };
  
  // Common action handlers
  if (options.onSave) {
    handlers.handleSave = () => {
      console.log('Save clicked');
      options.onSave?.();
    };
  }
  
  if (options.onCancel) {
    handlers.handleCancel = () => {
      console.log('Cancel clicked');
      options.onCancel?.();
    };
  }
  
  if (options.onConfirm) {
    handlers.handleConfirm = () => {
      console.log('Confirm clicked');
      options.onConfirm?.();
    };
  }
  
  return handlers;
}

/**
 * Helper to create button click handlers for stories
 * 
 * @param handlers Map of handler names to functions
 * @returns Object with click handlers
 */
export function createClickHandlers(
  handlers: Record<string, () => void>
): Record<string, () => void> {
  const result: Record<string, () => void> = {};
  
  for (const [name, handler] of Object.entries(handlers)) {
    result[name] = () => {
      console.log(`Click handler '${name}' triggered`);
      handler();
    };
  }
  
  return result;
}