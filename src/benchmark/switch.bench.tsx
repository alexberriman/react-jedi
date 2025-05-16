import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Switch } from "@/components/ui/switch/switch";
import { createComponentBenchmark } from "./component-benchmark";

// Basic switch benchmark
createComponentBenchmark({
  component: Switch,
  name: "Switch",
  initialProps: { id: "switch1", defaultChecked: false },
  updateProps: { id: "switch1", defaultChecked: true, disabled: true },
  timeBudgetMs: 5, // Switches should render very quickly
});

// Test different switch states
describe("Switch States Performance", () => {
  bench("Switch - unchecked", () => {
    const { unmount } = render(<Switch />);
    cleanup();
    unmount();
  });

  bench("Switch - checked", () => {
    const { unmount } = render(<Switch defaultChecked />);
    cleanup();
    unmount();
  });

  bench("Switch - disabled", () => {
    const { unmount } = render(<Switch disabled />);
    cleanup();
    unmount();
  });

  bench("Switch - disabled + checked", () => {
    const { unmount } = render(<Switch disabled defaultChecked />);
    cleanup();
    unmount();
  });
});

// Test switch with labels and handlers
describe("Switch Complex Usage Performance", () => {
  bench("Switch - with onChange", () => {
    const { unmount } = render(<Switch onCheckedChange={() => {}} />);
    cleanup();
    unmount();
  });

  bench("Switch - with all props", () => {
    const { unmount } = render(
      <Switch
        id="notifications"
        name="notifications"
        defaultChecked={false}
        disabled={false}
        onCheckedChange={() => {}}
        className="custom-switch"
        aria-label="Enable notifications"
      />
    );
    cleanup();
    unmount();
  });
});

// Test multiple switches rendering
describe("Multiple Switches Performance", () => {
  bench("Render 5 switches", () => {
    const { unmount } = render(
      <div>
        <Switch id="switch1" />
        <Switch id="switch2" />
        <Switch id="switch3" />
        <Switch id="switch4" />
        <Switch id="switch5" />
      </div>
    );
    cleanup();
    unmount();
  });

  bench("Render 10 switches", () => {
    const switches = Array.from({ length: 10 }, (_, i) => <Switch key={i} id={`switch${i}`} />);
    const { unmount } = render(<div>{switches}</div>);
    cleanup();
    unmount();
  });
});
