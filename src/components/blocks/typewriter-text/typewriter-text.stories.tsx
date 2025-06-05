import type { Meta, StoryObj } from "@storybook/react-vite";
import { TypewriterText } from "./typewriter-text";

const meta: Meta<typeof TypewriterText> = {
  title: "Blocks/TypewriterText",
  component: TypewriterText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A dynamic text animation component that creates typewriter effects with various customization options.

## Features
- Basic typing animation with customizable speed
- Delete and retype functionality
- Multiple text phrases with rotation
- Cursor blinking animation with different styles
- Speed variations and pause controls
- Color transitions during typing
- Responsive text sizing
- Accessibility support for reduced motion
- Loop control and completion callbacks

## Variants
- **basic**: Simple typing animation, no deletion
- **delete-retype**: Types and deletes the same text repeatedly
- **rotation**: Cycles through multiple text phrases
- **infinite**: Continuous cycling with custom loop behavior
- **one-time**: Types all texts once without looping
        `,
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    spec: {
      description: "TypewriterText specification object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TypewriterText>;

// Basic typing animation
export const Basic: Story = {
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
    },
  },
};

// Delete and retype animation
export const DeleteRetype: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "delete-retype",
      texts: "This text types and deletes itself",
      typeSpeed: 60,
      deleteSpeed: 40,
      pauseDuration: 2000,
      deleteDelay: 1500,
      textSize: "xl",
      fontWeight: "medium",
      textColor: "#dc2626",
      cursorStyle: "block",
      cursorBlink: true,
    },
  },
};

// Multiple text rotation
export const Rotation: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "rotation",
      texts: [
        "Build amazing websites",
        "Create beautiful interfaces",
        "Ship products faster",
        "Scale with confidence",
      ],
      typeSpeed: 80,
      deleteSpeed: 50,
      pauseDuration: 1500,
      deleteDelay: 1000,
      textSize: "3xl",
      fontWeight: "bold",
      textColor: "#059669",
      cursorColor: "#10b981",
      cursorStyle: "line",
      alignment: "center",
    },
  },
};

// Different cursor styles
export const CursorStyles: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "basic",
      texts: "Check out this cursor style",
      typeSpeed: 60,
      textSize: "lg",
      cursorStyle: "underscore",
      cursorBlink: true,
      cursorBlinkSpeed: 800,
      textColor: "#7c3aed",
      cursorColor: "#8b5cf6",
    },
  },
};

// Custom cursor character
export const CustomCursor: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "basic",
      texts: "Custom cursor character demo",
      typeSpeed: 70,
      textSize: "xl",
      cursorStyle: "custom",
      cursorChar: "█",
      cursorBlink: true,
      textColor: "#ea580c",
      cursorColor: "#f97316",
      fontFamily: "mono",
    },
  },
};

// Speed variations
export const SpeedVariations: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "delete-retype",
      texts: "Fast typing, slow deletion",
      typeSpeed: 30,
      deleteSpeed: 100,
      pauseDuration: 1000,
      deleteDelay: 500,
      textSize: "lg",
      textColor: "#be185d",
      cursorStyle: "block",
    },
  },
};

// Large hero text
export const HeroText: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "rotation",
      texts: ["We build the future", "One component at a time", "With React Jedi"],
      typeSpeed: 100,
      deleteSpeed: 60,
      pauseDuration: 2500,
      deleteDelay: 1500,
      textSize: "6xl",
      fontWeight: "bold",
      alignment: "center",
      textColor: "#1f2937",
      cursorColor: "#3b82f6",
      cursorStyle: "line",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

// Infinite loop demo
export const InfiniteLoop: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "infinite",
      texts: ["React", "TypeScript", "TailwindCSS", "Storybook", "Framer Motion"],
      typeSpeed: 120,
      deleteSpeed: 80,
      pauseDuration: 800,
      deleteDelay: 600,
      loop: true,
      textSize: "2xl",
      fontWeight: "semibold",
      textColor: "#374151",
      cursorColor: "#6b7280",
    },
  },
};

// One-time typing
export const OneTime: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "one-time",
      texts: ["First line of text", "Second line of text", "Final line of text"],
      typeSpeed: 80,
      pauseDuration: 1000,
      textSize: "lg",
      textColor: "#065f46",
      showCursor: false,
    },
  },
};

// Reduced motion (accessibility)
export const ReducedMotion: Story = {
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
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "When reduceMotion is true or user prefers reduced motion, the final text appears immediately without animation.",
      },
    },
  },
};

// Monospace font family
export const MonospaceFont: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "basic",
      texts: "console.log('Hello, World!');",
      typeSpeed: 40,
      textSize: "lg",
      fontFamily: "mono",
      textColor: "#22c55e",
      cursorColor: "#16a34a",
      cursorStyle: "block",
      cursorBlink: true,
    },
  },
};

// Serif font family
export const SerifFont: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "basic",
      texts: "Elegant typography with serif fonts",
      typeSpeed: 60,
      textSize: "2xl",
      fontFamily: "serif",
      fontWeight: "medium",
      textColor: "#92400e",
      cursorColor: "#d97706",
      cursorStyle: "line",
      alignment: "center",
    },
  },
};

// Delayed start
export const DelayedStart: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "basic",
      texts: "This text starts typing after 2 seconds",
      startDelay: 2000,
      typeSpeed: 50,
      textSize: "lg",
      textColor: "#5b21b6",
      cursorColor: "#7c3aed",
    },
  },
};

// Right aligned
export const RightAligned: Story = {
  args: {
    spec: {
      type: "TypewriterText",
      variant: "rotation",
      texts: ["Right aligned text", "Perfect for RTL layouts", "Or special designs"],
      typeSpeed: 70,
      deleteSpeed: 50,
      pauseDuration: 1200,
      deleteDelay: 800,
      textSize: "xl",
      alignment: "right",
      textColor: "#be123c",
      cursorColor: "#e11d48",
    },
  },
};

// No cursor
export const NoCursor: Story = {
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
    },
  },
};
