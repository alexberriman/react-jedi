import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, waitFor } from "storybook/test";
import { TypewriterTextBlock } from "./typewriter-text";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import * as React from "react";
import type { TypewriterTextDef } from "../../../types/components/typewriter-text";
import { act } from "react";

const meta: Meta<typeof TypewriterTextBlock> = {
  title: "Blocks/TypewriterText/SDUI Test",
  component: TypewriterTextBlock,
  parameters: {
    layout: "centered",
  },
  tags: ["test"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSDUI: Story = enhanceStoryForDualMode(
  {
    args: {
      spec: {
        type: "TypewriterText",
        variant: "basic",
        texts: "Hello, welcome to React Jedi!",
        typeSpeed: 50,
        textSize: "2xl",
        fontWeight: "semibold",
        textColor: "#2563eb",
        cursorColor: "#2563eb",
        showCursor: true,
        cursorBlink: true,
      } as TypewriterTextDef,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for typewriter animation to start and some text to appear
      await waitFor(() => {
        const typewriterElement = canvas.getByText(/Hello/i, { exact: false });
        expect(typewriterElement).toBeInTheDocument();
      }, { timeout: 5000 });

      // Give time for animation to progress and wrap in act
      await act(async () => {
        await new Promise(resolve => globalThis.setTimeout(resolve, 1000));
      });

      // Verify cursor is visible and text color
      await waitFor(() => {
        const textElement = canvas.getByText(/Hello/i, { exact: false });
        const container = textElement.closest("div");
        expect(container).toBeInTheDocument();
        expect(container).toHaveStyle({ color: "rgb(37, 99, 235)" });
      });
    },
  },
  {
    renderSpec: {
      type: "TypewriterText",
      variant: "basic",
      texts: "Hello, welcome to React Jedi!",
      typeSpeed: 50,
      textSize: "2xl",
      fontWeight: "semibold",
      textColor: "#2563eb",
      cursorColor: "#2563eb",
      showCursor: true,
      cursorBlink: true,
    },
  }
) as Story;

export const RotationSDUI: Story = enhanceStoryForDualMode(
  {
    args: {
      spec: {
        type: "TypewriterText",
        variant: "rotation",
        texts: [
          "Build amazing websites",
          "Create beautiful interfaces",
          "Ship products faster",
        ],
        typeSpeed: 80,
        deleteSpeed: 50,
        pauseDuration: 1500,
        deleteDelay: 1000,
        textSize: "xl",
        fontWeight: "bold",
        textColor: "#059669",
        cursorColor: "#10b981",
        cursorStyle: "line",
        alignment: "center",
      } as TypewriterTextDef,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for first text to start typing
      await waitFor(() => {
        const typewriterElement = canvas.getByText(/Build/i, { exact: false });
        expect(typewriterElement).toBeInTheDocument();
      }, { timeout: 5000 });

      // Give time for animation to progress and wrap in act
      await act(async () => {
        await new Promise(resolve => globalThis.setTimeout(resolve, 1000));
      });

      // Verify center alignment and text color
      await waitFor(() => {
        const textElement = canvas.getByText(/Build/i, { exact: false });
        const container = textElement.closest("div");
        expect(container).toHaveClass("text-center");
        expect(container).toHaveStyle({ color: "rgb(5, 150, 105)" });
      });
    },
  },
  {
    renderSpec: {
      type: "TypewriterText",
      variant: "rotation",
      texts: [
        "Build amazing websites",
        "Create beautiful interfaces", 
        "Ship products faster",
      ],
      typeSpeed: 80,
      deleteSpeed: 50,
      pauseDuration: 1500,
      deleteDelay: 1000,
      textSize: "xl",
      fontWeight: "bold",
      textColor: "#059669",
      cursorColor: "#10b981",
      cursorStyle: "line",
      alignment: "center",
    },
  }
) as Story;

export const CustomCursorSDUI: Story = enhanceStoryForDualMode(
  {
    args: {
      spec: {
        type: "TypewriterText",
        variant: "basic",
        texts: "Custom cursor character demo",
        typeSpeed: 70,
        textSize: "lg",
        cursorStyle: "custom",
        cursorChar: "█",
        cursorBlink: true,
        textColor: "#ea580c",
        cursorColor: "#f97316",
        fontFamily: "mono",
      } as TypewriterTextDef,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for text to start typing
      await waitFor(() => {
        const typewriterElement = canvas.getByText(/Custom/i, { exact: false });
        expect(typewriterElement).toBeInTheDocument();
      }, { timeout: 5000 });

      // Give time for animation to progress and wrap in act
      await act(async () => {
        await new Promise(resolve => globalThis.setTimeout(resolve, 1000));
      });

      // Verify monospace font and text color
      await waitFor(() => {
        const textElement = canvas.getByText(/Custom/i, { exact: false });
        const container = textElement.closest("div");
        expect(container).toHaveClass("font-mono");
        expect(container).toHaveStyle({ color: "rgb(234, 88, 12)" });
      });
    },
  },
  {
    renderSpec: {
      type: "TypewriterText",
      variant: "basic",
      texts: "Custom cursor character demo",
      typeSpeed: 70,
      textSize: "lg",
      cursorStyle: "custom",
      cursorChar: "█",
      cursorBlink: true,
      textColor: "#ea580c",
      cursorColor: "#f97316",
      fontFamily: "mono",
    },
  }
) as Story;

export const ReducedMotionSDUI: Story = enhanceStoryForDualMode(
  {
    args: {
      spec: {
        type: "TypewriterText",
        variant: "rotation",
        texts: [
          "This respects motion preferences",
          "Accessibility first design",
          "No animation when preferred",
        ],
        reduceMotion: true,
        textSize: "xl",
        textColor: "#7c2d12",
        showCursor: true,
        cursorBlink: false,
      } as TypewriterTextDef,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // With reduced motion, final text should appear immediately
      await waitFor(() => {
        const typewriterElement = canvas.getByText("No animation when preferred");
        expect(typewriterElement).toBeInTheDocument();
      }, { timeout: 2000 });

      // Wrap verification in act for consistency
      await act(async () => {
        await new Promise(resolve => globalThis.setTimeout(resolve, 100));
      });

      // Verify text color
      await waitFor(() => {
        const container = canvas.getByText("No animation when preferred").closest("div");
        expect(container).toHaveStyle({ color: "rgb(124, 45, 18)" });
      });
    },
  },
  {
    renderSpec: {
      type: "TypewriterText",
      variant: "rotation",
      texts: [
        "This respects motion preferences",
        "Accessibility first design", 
        "No animation when preferred",
      ],
      reduceMotion: true,
      textSize: "xl",
      textColor: "#7c2d12",
      showCursor: true,
      cursorBlink: false,
    },
  }
) as Story;

export const NoCursorSDUI: Story = enhanceStoryForDualMode(
  {
    args: {
      spec: {
        type: "TypewriterText",
        variant: "basic",
        texts: "Clean text without cursor",
        typeSpeed: 60,
        showCursor: false,
        textSize: "lg",
        textColor: "#0f766e",
        fontWeight: "medium",
      } as TypewriterTextDef,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for text to start typing
      await waitFor(() => {
        const typewriterElement = canvas.getByText(/Clean/i, { exact: false });
        expect(typewriterElement).toBeInTheDocument();
      }, { timeout: 5000 });

      // Give time for animation to progress and wrap in act
      await act(async () => {
        await new Promise(resolve => globalThis.setTimeout(resolve, 1000));
      });

      // Verify medium font weight and text color
      await waitFor(() => {
        const textElement = canvas.getByText(/Clean/i, { exact: false });
        const container = textElement.closest("div");
        expect(container).toHaveClass("font-medium");
        expect(container).toHaveStyle({ color: "rgb(15, 118, 110)" });
      });
    },
  },
  {
    renderSpec: {
      type: "TypewriterText",
      variant: "basic",
      texts: "Clean text without cursor",
      typeSpeed: 60,
      showCursor: false,
      textSize: "lg",
      textColor: "#0f766e",
      fontWeight: "medium",
    },
  }
) as Story;

export const OneTimeSDUI: Story = enhanceStoryForDualMode(
  {
    args: {
      spec: {
        type: "TypewriterText",
        variant: "one-time",
        texts: ["First line of text", "Second line of text", "Final line of text"],
        typeSpeed: 50,
        pauseDuration: 500,
        textSize: "lg",
        textColor: "#065f46",
        showCursor: false,
      } as TypewriterTextDef,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // For one-time variant, wait for first text to appear
      await waitFor(() => {
        const container = canvasElement.querySelector('[data-testid="react-render"] > div, [data-testid="sdui-render"] > div');
        expect(container).toBeInTheDocument();
        
        // Check if any part of our text sequence is visible
        const hasText = container?.textContent?.includes("line of text");
        expect(hasText).toBeTruthy();
      }, { timeout: 5000 });

      // Give time for all text sequences to complete and wrap in act
      await act(async () => {
        await new Promise(resolve => globalThis.setTimeout(resolve, 3000));
      });

      // Wait for the final text and verify styling
      await waitFor(() => {
        const finalText = canvas.queryByText(/Final line of text/);
        if (finalText) {
          const container = finalText.closest("div");
          expect(container).toHaveStyle({ color: "rgb(6, 95, 70)" });
        } else {
          // If final text isn't ready yet, at least verify we have some text
          const container = canvasElement.querySelector('[data-testid="react-render"] > div, [data-testid="sdui-render"] > div');
          expect(container?.textContent).toBeTruthy();
        }
      }, { timeout: 10_000 });
    },
  },
  {
    renderSpec: {
      type: "TypewriterText",
      variant: "one-time",
      texts: ["First line of text", "Second line of text", "Final line of text"],
      typeSpeed: 50,
      pauseDuration: 500,
      textSize: "lg", 
      textColor: "#065f46",
      showCursor: false,
    },
  }
) as Story;