import type { StoryObj } from "@storybook/react-vite";
import { DualModeDecorator } from "../decorators/dual-mode-decorator";
import { createDualPlayFunction } from "./dual-play-wrapper";

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
}

/**
 * Enhances a story to support dual-mode rendering (React + SDUI)
 */
export function enhanceStoryForDualMode<T = any>(
  story: StoryObj<T>,
  options: EnhanceStoryOptions = {}
): StoryObj<T> {
  const { enabled = true, autoTest = true, jsonSpec, renderSpec } = options;
  
  return {
    ...story,
    decorators: [
      ...(story.decorators || []),
      DualModeDecorator
    ],
    play: story.play && autoTest ? createDualPlayFunction(story.play) : story.play,
    parameters: {
      ...story.parameters,
      layout: story.parameters?.layout || 'fullscreen',
      dualMode: {
        enabled,
        autoTest,
        jsonSpec,
        renderSpec,
        ...(story.parameters?.dualMode || {})
      }
    }
  };
}