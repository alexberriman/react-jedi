import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Slider } from "@/components/ui/slider/slider";
import { createComponentBenchmark } from "./component-benchmark";

// Basic slider benchmark
createComponentBenchmark({
  component: Slider,
  name: "Slider",
  initialProps: { defaultValue: [50], max: 100 },
  updateProps: { defaultValue: [75], max: 100, disabled: true },
  timeBudgetMs: 8, // Sliders are interactive, allow more time
});

// Test different slider configurations
describe("Slider Configurations Performance", () => {
  bench("Slider - default", () => {
    const { unmount } = render(<Slider />);
    cleanup();
    unmount();
  });

  bench("Slider - with value", () => {
    const { unmount } = render(<Slider defaultValue={[25]} />);
    cleanup();
    unmount();
  });

  bench("Slider - range (two handles)", () => {
    const { unmount } = render(<Slider defaultValue={[25, 75]} />);
    cleanup();
    unmount();
  });

  bench("Slider - with step", () => {
    const { unmount } = render(<Slider defaultValue={[50]} step={10} />);
    cleanup();
    unmount();
  });

  bench("Slider - disabled", () => {
    const { unmount } = render(<Slider defaultValue={[50]} disabled />);
    cleanup();
    unmount();
  });
});

// Test slider with different ranges
describe("Slider Range Performance", () => {
  bench("Slider - 0-100", () => {
    const { unmount } = render(<Slider min={0} max={100} defaultValue={[50]} />);
    cleanup();
    unmount();
  });

  bench("Slider - 0-1000", () => {
    const { unmount } = render(<Slider min={0} max={1000} defaultValue={[500]} />);
    cleanup();
    unmount();
  });

  bench("Slider - negative range", () => {
    const { unmount } = render(<Slider min={-100} max={100} defaultValue={[0]} />);
    cleanup();
    unmount();
  });

  bench("Slider - decimal range", () => {
    const { unmount } = render(<Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />);
    cleanup();
    unmount();
  });
});

// Test complex slider usage
describe("Slider Complex Usage Performance", () => {
  bench("Slider - with onChange", () => {
    const { unmount } = render(<Slider defaultValue={[50]} onValueChange={() => {}} />);
    cleanup();
    unmount();
  });

  bench("Slider - multiple handles", () => {
    const { unmount } = render(<Slider defaultValue={[20, 40, 60, 80]} min={0} max={100} />);
    cleanup();
    unmount();
  });

  bench("Slider - with all props", () => {
    const { unmount } = render(
      <Slider
        defaultValue={[50]}
        min={0}
        max={100}
        step={5}
        disabled={false}
        onValueChange={() => {}}
        className="custom-slider"
        id="volume-slider"
      />
    );
    cleanup();
    unmount();
  });
});
