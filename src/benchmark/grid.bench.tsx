import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Grid } from "@/components/ui/grid/grid";
import { createComponentBenchmark, createScalingBenchmark } from "./component-benchmark";

// Basic grid benchmark
const BasicGrid = (props: { columns?: number }) => (
  <Grid columns={props.columns || 3} gap="md">
    <div>Cell 1</div>
    <div>Cell 2</div>
    <div>Cell 3</div>
    <div>Cell 4</div>
    <div>Cell 5</div>
    <div>Cell 6</div>
  </Grid>
);

createComponentBenchmark({
  component: BasicGrid,
  name: "Grid",
  initialProps: { columns: 3 },
  updateProps: { columns: 4 },
  timeBudgetMs: 8, // Grids can be complex with many children
});

// Test grid with scaling content
const ScalingGrid = ({ items }: { items: Array<{ id: string; value: string }> }) => (
  <Grid columns={4} gap="lg">
    {items.map((item) => (
      <div key={item.id} className="p-4 bg-secondary rounded">
        {item.value}
      </div>
    ))}
  </Grid>
);

createScalingBenchmark(
  ScalingGrid,
  {},
  [8, 16, 32, 64] // Test with different numbers of grid items
);

// Test different grid configurations
describe("Grid Configurations Performance", () => {
  bench("Grid - 2 columns", () => {
    const { unmount } = render(
      <Grid columns={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Grid>
    );
    cleanup();
    unmount();
  });

  bench("Grid - 3 columns", () => {
    const { unmount } = render(
      <Grid columns={3}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
        <div>Item 6</div>
      </Grid>
    );
    cleanup();
    unmount();
  });

  bench("Grid - 4 columns", () => {
    const { unmount } = render(
      <Grid columns={4}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
        <div>Item 6</div>
        <div>Item 7</div>
        <div>Item 8</div>
      </Grid>
    );
    cleanup();
    unmount();
  });

  bench("Grid - responsive columns", () => {
    const { unmount } = render(
      <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Grid>
    );
    cleanup();
    unmount();
  });
});

// Test gap variations
describe("Grid Gap Performance", () => {
  bench("Grid - no gap", () => {
    const { unmount } = render(
      <Grid columns={3} gap="none">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Grid>
    );
    cleanup();
    unmount();
  });

  bench("Grid - small gap", () => {
    const { unmount } = render(
      <Grid columns={3} gap="sm">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Grid>
    );
    cleanup();
    unmount();
  });

  bench("Grid - medium gap", () => {
    const { unmount } = render(
      <Grid columns={3} gap="md">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Grid>
    );
    cleanup();
    unmount();
  });

  bench("Grid - large gap", () => {
    const { unmount } = render(
      <Grid columns={3} gap="lg">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Grid>
    );
    cleanup();
    unmount();
  });
});
