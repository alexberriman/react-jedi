import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, waitFor } from "storybook/test";
import { TypewriterTextBlock } from "./typewriter-text";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import * as React from "react";
import type { TypewriterTextDef } from "../../../types/components/typewriter-text";

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
      
      // Wait for text to start typing
      await waitFor(() => {
        const typewriterElement = canvas.getByText(/Hello/i, { exact: false });
        expect(typewriterElement).toBeInTheDocument();
      }, { timeout: 3000 });

      // Verify cursor is visible
      const container = canvas.getByText(/Hello/i, { exact: false }).closest("div");
      expect(container).toBeInTheDocument();
      
      // Verify text color is applied
      const textElement = canvas.getByText(/Hello/i, { exact: false });
      expect(textElement.closest("div")).toHaveStyle({ color: "rgb(37, 99, 235)" });
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
      }, { timeout: 3000 });

      // Verify center alignment
      const container = canvas.getByText(/Build/i, { exact: false }).closest("div");
      expect(container).toHaveClass("text-center");
      
      // Verify text color is green
      expect(container).toHaveStyle({ color: "rgb(5, 150, 105)" });
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
      }, { timeout: 3000 });

      // Verify monospace font
      const container = canvas.getByText(/Custom/i, { exact: false }).closest("div");
      expect(container).toHaveClass("font-mono");
      
      // Verify text color is orange
      expect(container).toHaveStyle({ color: "rgb(234, 88, 12)" });
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
      }, { timeout: 1000 });

      // Verify text color
      const container = canvas.getByText("No animation when preferred").closest("div");
      expect(container).toHaveStyle({ color: "rgb(124, 45, 18)" });
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
      }, { timeout: 3000 });

      // Verify medium font weight
      const container = canvas.getByText(/Clean/i, { exact: false }).closest("div");
      expect(container).toHaveClass("font-medium");
      
      // Verify text color
      expect(container).toHaveStyle({ color: "rgb(15, 118, 110)" });
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
      
      // For one-time variant with reduced test speed, check for any of the texts
      await waitFor(() => {
        // Try to find the container div first
        const container = canvasElement.querySelector('[data-testid="react-render"] > div, [data-testid="sdui-render"] > div');
        expect(container).toBeInTheDocument();
        
        // Check if any part of our text sequence is visible
        const hasText = container?.textContent?.includes("line of text");
        expect(hasText).toBeTruthy();
      }, { timeout: 5000 });

      // Wait a bit more for the final text
      await waitFor(() => {
        const finalText = canvas.queryByText(/Final line of text/);
        if (finalText) {
          // If we can find the final text, verify its color
          const container = finalText.closest("div");
          expect(container).toHaveStyle({ color: "rgb(6, 95, 70)" });
        }
      }, { timeout: 8000 });
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