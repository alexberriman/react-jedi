import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select/select";
import { createComponentBenchmark, createScalingBenchmark } from "./component-benchmark";

// Basic select benchmark
const BasicSelect = (props: { disabled?: boolean; value?: string }) => (
  <Select disabled={props.disabled} value={props.value}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectContent>
  </Select>
);

createComponentBenchmark({
  component: BasicSelect,
  name: "Select",
  initialProps: {},
  updateProps: { disabled: true, value: "option1" },
  timeBudgetMs: 10, // Selects are interactive, allow more time
});

// Test grouped select
const GroupedSelect = () => (
  <Select>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>Vegetables</SelectLabel>
        <SelectItem value="carrot">Carrot</SelectItem>
        <SelectItem value="potato">Potato</SelectItem>
        <SelectItem value="onion">Onion</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

// Create scaling benchmark for select with many options
const ScalingSelect = ({ items }: { items: Array<{ id: string; value: string }> }) => (
  <Select>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder="Select an item" />
    </SelectTrigger>
    <SelectContent>
      {items.map((item) => (
        <SelectItem key={item.id} value={item.id}>
          {item.value}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

createScalingBenchmark(
  ScalingSelect,
  {},
  [5, 25, 50, 100] // Test with different numbers of options
);

// Test different select configurations
describe("Select Configurations Performance", () => {
  bench("Select - empty", () => {
    const { unmount } = render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent />
      </Select>
    );
    cleanup();
    unmount();
  });

  bench("Select - with placeholder", () => {
    const { unmount } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">One</SelectItem>
        </SelectContent>
      </Select>
    );
    cleanup();
    unmount();
  });

  bench("Select - grouped items", () => {
    const { unmount } = render(<GroupedSelect />);
    cleanup();
    unmount();
  });

  bench("Select - disabled items", () => {
    const { unmount } = render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2" disabled>
            Option 2 (disabled)
          </SelectItem>
          <SelectItem value="3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );
    cleanup();
    unmount();
  });
});
