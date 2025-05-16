import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Flex } from "@/components/ui/flex/flex";
import { createComponentBenchmark, createScalingBenchmark } from "./component-benchmark";

// Basic flex benchmark
const BasicFlex = (props: {
  direction?: "row" | "column";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
}) => (
  <Flex direction={props.direction} justify={props.justify} gap="md">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Flex>
);

createComponentBenchmark({
  component: BasicFlex,
  name: "Flex",
  initialProps: { direction: "row", justify: "start" },
  updateProps: { direction: "column", justify: "center" },
  timeBudgetMs: 6, // Flex should render quickly
});

// Test flex with scaling content
const ScalingFlex = ({ items }: { items: Array<{ id: string; value: string }> }) => (
  <Flex direction="row" gap="sm" wrap="wrap">
    {items.map((item) => (
      <div key={item.id} className="p-2 bg-secondary rounded">
        {item.value}
      </div>
    ))}
  </Flex>
);

createScalingBenchmark(
  ScalingFlex,
  {},
  [5, 10, 20, 40] // Test with different numbers of flex items
);

// Test different flex configurations
describe("Flex Configurations Performance", () => {
  bench("Flex - row direction", () => {
    const { unmount } = render(
      <Flex direction="row">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });

  bench("Flex - column direction", () => {
    const { unmount } = render(
      <Flex direction="column">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });

  bench("Flex - with justify", () => {
    const { unmount } = render(
      <Flex justify="between">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });

  bench("Flex - with align", () => {
    const { unmount } = render(
      <Flex align="center">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });

  bench("Flex - with wrap", () => {
    const { unmount } = render(
      <Flex wrap="wrap">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </Flex>
    );
    cleanup();
    unmount();
  });
});

// Test gap variations
describe("Flex Gap Performance", () => {
  bench("Flex - no gap", () => {
    const { unmount } = render(
      <Flex gap="none">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });

  bench("Flex - small gap", () => {
    const { unmount } = render(
      <Flex gap="sm">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });

  bench("Flex - medium gap", () => {
    const { unmount } = render(
      <Flex gap="md">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });

  bench("Flex - large gap", () => {
    const { unmount } = render(
      <Flex gap="lg">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });
});

// Test complex flex layouts
describe("Flex Complex Layouts Performance", () => {
  bench("Flex - nested flex", () => {
    const { unmount } = render(
      <Flex direction="column" gap="md">
        <Flex direction="row" gap="sm">
          <div>1-1</div>
          <div>1-2</div>
        </Flex>
        <Flex direction="row" gap="sm">
          <div>2-1</div>
          <div>2-2</div>
        </Flex>
      </Flex>
    );
    cleanup();
    unmount();
  });

  bench("Flex - with all props", () => {
    const { unmount } = render(
      <Flex
        direction="row"
        justify="between"
        align="center"
        gap="md"
        wrap="wrap"
        className="custom-class"
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );
    cleanup();
    unmount();
  });
});
