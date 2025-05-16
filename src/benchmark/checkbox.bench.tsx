import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { createComponentBenchmark } from "./component-benchmark";

// Basic checkbox benchmark
createComponentBenchmark({
  component: Checkbox,
  name: "Checkbox",
  initialProps: { id: "checkbox1", defaultChecked: false },
  updateProps: { id: "checkbox1", defaultChecked: true, disabled: true },
  timeBudgetMs: 5, // Checkboxes should render very quickly
});

// Test different checkbox states
describe("Checkbox States Performance", () => {
  bench("Checkbox - unchecked", () => {
    const { unmount } = render(<Checkbox />);
    cleanup();
    unmount();
  });

  bench("Checkbox - checked", () => {
    const { unmount } = render(<Checkbox defaultChecked />);
    cleanup();
    unmount();
  });

  bench("Checkbox - indeterminate", () => {
    const { unmount } = render(<Checkbox checked="indeterminate" />);
    cleanup();
    unmount();
  });

  bench("Checkbox - disabled", () => {
    const { unmount } = render(<Checkbox disabled />);
    cleanup();
    unmount();
  });

  bench("Checkbox - disabled + checked", () => {
    const { unmount } = render(<Checkbox disabled defaultChecked />);
    cleanup();
    unmount();
  });
});

// Test checkbox with labels and handlers
describe("Checkbox Complex Usage Performance", () => {
  bench("Checkbox - with onChange", () => {
    const { unmount } = render(<Checkbox onCheckedChange={() => {}} />);
    cleanup();
    unmount();
  });

  bench("Checkbox - with all props", () => {
    const { unmount } = render(
      <Checkbox
        id="terms"
        name="terms"
        defaultChecked={false}
        disabled={false}
        onCheckedChange={() => {}}
        className="custom-checkbox"
        aria-label="Accept terms and conditions"
      />
    );
    cleanup();
    unmount();
  });
});

// Test multiple checkboxes rendering
describe("Multiple Checkboxes Performance", () => {
  bench("Render 5 checkboxes", () => {
    const { unmount } = render(
      <div>
        <Checkbox id="check1" />
        <Checkbox id="check2" />
        <Checkbox id="check3" />
        <Checkbox id="check4" />
        <Checkbox id="check5" />
      </div>
    );
    cleanup();
    unmount();
  });

  bench("Render 10 checkboxes", () => {
    const checkboxes = Array.from({ length: 10 }, (_, i) => <Checkbox key={i} id={`check${i}`} />);
    const { unmount } = render(<div>{checkboxes}</div>);
    cleanup();
    unmount();
  });
});
