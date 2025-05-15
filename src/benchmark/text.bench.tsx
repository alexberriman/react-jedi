import React from "react";
import { describe, bench, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Text } from "@/components/ui/text/text";
import { 
  createComponentBenchmark, 
  createComponentComparisonBenchmark 
} from "./component-benchmark";

// Basic text component benchmark
createComponentBenchmark({
  component: Text,
  name: "Text",
  initialProps: { children: "Hello World" },
  updateProps: { children: "Updated Text" },
});

// Test different text variants
describe("Text Variants Performance Comparison", () => {
  bench("Text - default variant", () => {
    const { unmount } = render(<Text variant="default">Default Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - primary variant", () => {
    const { unmount } = render(<Text variant="primary">Primary Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - secondary variant", () => {
    const { unmount } = render(<Text variant="secondary">Secondary Text</Text>);
    cleanup();
    unmount();
  });

  bench("Text - accent variant", () => {
    const { unmount } = render(<Text variant="accent">Accent Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - muted variant", () => {
    const { unmount } = render(<Text variant="muted">Muted Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - destructive variant", () => {
    const { unmount } = render(<Text variant="destructive">Destructive Text</Text>);
    cleanup();
    unmount();
  });
});

// Test different text sizes
describe("Text Sizes Performance Comparison", () => {
  bench("Text - xs size", () => {
    const { unmount } = render(<Text size="xs">Extra Small Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - sm size", () => {
    const { unmount } = render(<Text size="sm">Small Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - base size", () => {
    const { unmount } = render(<Text size="base">Base Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - lg size", () => {
    const { unmount } = render(<Text size="lg">Large Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - xl size", () => {
    const { unmount } = render(<Text size="xl">Extra Large Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - 2xl size", () => {
    const { unmount } = render(<Text size="2xl">2XL Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - 3xl size", () => {
    const { unmount } = render(<Text size="3xl">3XL Text</Text>);
    cleanup();
    unmount();
  });
});

// Test text with gradients
describe("Text Gradient Performance Comparison", () => {
  bench("Text - no gradient", () => {
    const { unmount } = render(<Text gradient="none">No Gradient</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - primary gradient", () => {
    const { unmount } = render(<Text gradient="primary">Primary Gradient</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - rainbow gradient", () => {
    const { unmount } = render(<Text gradient="rainbow">Rainbow Gradient</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - sunset gradient", () => {
    const { unmount } = render(<Text gradient="sunset">Sunset Gradient</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - ocean gradient", () => {
    const { unmount } = render(<Text gradient="ocean">Ocean Gradient</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - neon gradient", () => {
    const { unmount } = render(<Text gradient="neon">Neon Gradient</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - golden gradient", () => {
    const { unmount } = render(<Text gradient="golden">Golden Gradient</Text>);
    cleanup();
    unmount();
  });
});

// Test different HTML elements
describe("Text Element Performance Comparison", () => {
  bench("Text - p element", () => {
    const { unmount } = render(<Text element="p">Paragraph</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - span element", () => {
    const { unmount } = render(<Text element="span">Span</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - div element", () => {
    const { unmount } = render(<Text element="div">Div</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - blockquote element", () => {
    const { unmount } = render(<Text element="blockquote">Blockquote</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - code element", () => {
    const { unmount } = render(<Text element="code">Code</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - strong element", () => {
    const { unmount } = render(<Text element="strong">Strong</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - em element", () => {
    const { unmount } = render(<Text element="em">Emphasized</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - small element", () => {
    const { unmount } = render(<Text element="small">Small</Text>);
    cleanup();
    unmount();
  });
});

// Test fully styled complex text
describe("Text Complex Styling Performance", () => {
  bench("Text - simple", () => {
    const { unmount } = render(<Text>Simple Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - moderate styling", () => {
    const { unmount } = render(
      <Text 
        variant="primary"
        size="lg"
        weight="bold"
        align="center"
      >
        Moderately Styled Text
      </Text>
    );
    cleanup();
    unmount();
  });
  
  bench("Text - heavy styling", () => {
    const { unmount } = render(
      <Text 
        variant="primary"
        size="xl"
        weight="bold"
        align="center"
        transform="uppercase"
        shadow="lg"
        tracking="wide"
        decoration="underline"
        italic={true}
      >
        Heavily Styled Text
      </Text>
    );
    cleanup();
    unmount();
  });
  
  bench("Text - maximum styling", () => {
    const { unmount } = render(
      <Text 
        variant="primary"
        size="3xl"
        weight="extrabold"
        align="center"
        transform="uppercase"
        decoration="underline"
        italic={true}
        gradient="rainbow"
        shadow="2xl"
        animation="pulse"
        truncate="multiline"
        wrap="pre"
        lineHeight="loose"
        tracking="widest"
        element="blockquote"
      >
        Maximum Styled Text with Many Properties Applied
      </Text>
    );
    cleanup();
    unmount();
  });
});

// Test with animations
describe("Text Animation Performance", () => {
  bench("Text - no animation", () => {
    const { unmount } = render(<Text animation="none">No Animation</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - glow animation", () => {
    const { unmount } = render(<Text animation="glow">Glowing Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - pulse animation", () => {
    const { unmount } = render(<Text animation="pulse">Pulsing Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - bounce animation", () => {
    const { unmount } = render(<Text animation="bounce">Bouncing Text</Text>);
    cleanup();
    unmount();
  });
  
  bench("Text - shimmer animation", () => {
    const { unmount } = render(<Text animation="shimmer">Shimmering Text</Text>);
    cleanup();
    unmount();
  });
});