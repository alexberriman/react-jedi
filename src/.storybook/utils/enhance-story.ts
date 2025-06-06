import type { StoryObj } from "@storybook/react-vite";
import { DualModeDecorator } from "../decorators/dual-mode-decorator";
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
   * Whether to enable dual mode for this story (default: true)
   */
  enabled?: boolean;
  
  /**
   * Whether to automatically test both modes (default: true)
   */
  autoTest?: boolean;
  
  /**
   * Event handlers for SDUI mode
   */
  handlers?: Record<string, (...args: unknown[]) => void>;
}

/**
 * Enhances a story to support dual-mode rendering (React + SDUI)
 */
export function enhanceStoryForDualMode<T = unknown>(
  story: StoryObj<T>,
  options: EnhanceStoryOptions = {}
): StoryObj<T> {
  const { enabled = true, autoTest = true, jsonSpec, renderSpec, handlers } = options;
  
  return {
    ...story,
    decorators: [
      ...((story.decorators || []) as Array<(story: unknown, context: unknown) => React.ReactElement>),
      DualModeDecorator as unknown as (story: unknown, context: unknown) => React.ReactElement
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