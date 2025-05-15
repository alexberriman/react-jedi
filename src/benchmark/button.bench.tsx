import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Button } from "@/components/ui/button/button";
import { 
  createComponentBenchmark
} from "./component-benchmark";

// Basic button benchmark
createComponentBenchmark({
  component: Button,
  name: "Button",
  initialProps: { children: "Click me" },
  updateProps: { children: "Click me", disabled: true },
  timeBudgetMs: 5, // Buttons should render quickly
});

// Test different button variants
describe("Button Variants Performance Comparison", () => {
  bench("Button - default variant", () => {
    const { unmount } = render(<Button variant="default">Default</Button>);
    cleanup();
    unmount();
  });

  bench("Button - destructive variant", () => {
    const { unmount } = render(<Button variant="destructive">Destructive</Button>);
    cleanup();
    unmount();
  });

  bench("Button - outline variant", () => {
    const { unmount } = render(<Button variant="outline">Outline</Button>);
    cleanup();
    unmount();
  });

  bench("Button - secondary variant", () => {
    const { unmount } = render(<Button variant="secondary">Secondary</Button>);
    cleanup();
    unmount();
  });

  bench("Button - ghost variant", () => {
    const { unmount } = render(<Button variant="ghost">Ghost</Button>);
    cleanup();
    unmount();
  });

  bench("Button - link variant", () => {
    const { unmount } = render(<Button variant="link">Link</Button>);
    cleanup();
    unmount();
  });
});

// Test different button sizes
describe("Button Sizes Performance Comparison", () => {
  bench("Button - default size", () => {
    const { unmount } = render(<Button size="default">Default</Button>);
    cleanup();
    unmount();
  });

  bench("Button - sm size", () => {
    const { unmount } = render(<Button size="sm">Small</Button>);
    cleanup();
    unmount();
  });

  bench("Button - lg size", () => {
    const { unmount } = render(<Button size="lg">Large</Button>);
    cleanup();
    unmount();
  });

  bench("Button - icon size", () => {
    const { unmount } = render(<Button size="icon">⚡</Button>);
    cleanup();
    unmount();
  });
});

// Test with and without asChild
describe("Button asChild Performance", () => {
  bench("Button - without asChild", () => {
    const { unmount } = render(<Button>Standard</Button>);
    cleanup();
    unmount();
  });

  bench("Button - with asChild", () => {
    const { unmount } = render(<Button asChild><a href="https://example.com">Link Button</a></Button>);
    cleanup();
    unmount();
  });
});

// Test rendering many buttons
describe("Button Scaling Performance", () => {
  bench("Render 10 buttons", () => {
    const { unmount } = render(
      <div>
        {Array.from({ length: 10 }, (_, i) => (
          <Button key={i}>Button {i}</Button>
        ))}
      </div>
    );
    cleanup();
    unmount();
  });

  bench("Render 50 buttons", () => {
    const { unmount } = render(
      <div>
        {Array.from({ length: 50 }, (_, i) => (
          <Button key={i}>Button {i}</Button>
        ))}
      </div>
    );
    cleanup();
    unmount();
  });

  bench("Render 100 buttons", () => {
    const { unmount } = render(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Button key={i}>Button {i}</Button>
        ))}
      </div>
    );
    cleanup();
    unmount();
  });
});