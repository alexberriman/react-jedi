import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Input } from "@/components/ui/input/input";
import { createComponentBenchmark } from "./component-benchmark";

// Basic input benchmark
createComponentBenchmark({
  component: Input,
  name: "Input",
  initialProps: { placeholder: "Enter text", defaultValue: "" },
  updateProps: { placeholder: "Enter text", defaultValue: "Updated", disabled: true },
  timeBudgetMs: 5, // Inputs should render very quickly
});

// Test different input types
describe("Input Types Performance Comparison", () => {
  bench("Input - text type", () => {
    const { unmount } = render(<Input type="text" placeholder="Text input" />);
    cleanup();
    unmount();
  });

  bench("Input - email type", () => {
    const { unmount } = render(<Input type="email" placeholder="Email input" />);
    cleanup();
    unmount();
  });

  bench("Input - password type", () => {
    const { unmount } = render(<Input type="password" placeholder="Password input" />);
    cleanup();
    unmount();
  });

  bench("Input - number type", () => {
    const { unmount } = render(<Input type="number" placeholder="Number input" />);
    cleanup();
    unmount();
  });

  bench("Input - search type", () => {
    const { unmount } = render(<Input type="search" placeholder="Search input" />);
    cleanup();
    unmount();
  });
});

// Test input states
describe("Input States Performance", () => {
  bench("Input - empty state", () => {
    const { unmount } = render(<Input />);
    cleanup();
    unmount();
  });

  bench("Input - with defaultValue", () => {
    const { unmount } = render(<Input defaultValue="Default text" />);
    cleanup();
    unmount();
  });

  bench("Input - disabled state", () => {
    const { unmount } = render(<Input disabled />);
    cleanup();
    unmount();
  });

  bench("Input - with className", () => {
    const { unmount } = render(<Input className="custom-class extra-class" />);
    cleanup();
    unmount();
  });

  bench("Input - with all props", () => {
    const { unmount } = render(
      <Input
        type="text"
        placeholder="Full props"
        defaultValue="Value"
        disabled={false}
        className="custom-class"
        id="input-id"
        name="input-name"
      />
    );
    cleanup();
    unmount();
  });
});
