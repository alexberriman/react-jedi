import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card/card";
import { createComponentBenchmark } from "./component-benchmark";

// Basic card benchmark
const BasicCard = (props: { loading?: boolean }) => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description goes here</CardDescription>
    </CardHeader>
    <CardContent>
      {props.loading ? <div>Loading...</div> : <p>This is the card content area with some text.</p>}
    </CardContent>
    <CardFooter>
      <button>Action</button>
    </CardFooter>
  </Card>
);

createComponentBenchmark({
  component: BasicCard,
  name: "Card",
  initialProps: {},
  updateProps: { loading: true },
  timeBudgetMs: 8, // Cards can be complex, allow more time
});

// Test individual card components
describe("Card Components Performance", () => {
  bench("Card container", () => {
    const { unmount } = render(<Card>Content</Card>);
    cleanup();
    unmount();
  });

  bench("CardHeader", () => {
    const { unmount } = render(
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
    );
    cleanup();
    unmount();
  });

  bench("CardContent", () => {
    const { unmount } = render(
      <CardContent>
        <p>Content paragraph</p>
        <p>Another paragraph</p>
      </CardContent>
    );
    cleanup();
    unmount();
  });

  bench("CardFooter", () => {
    const { unmount } = render(
      <CardFooter>
        <button>Button 1</button>
        <button>Button 2</button>
      </CardFooter>
    );
    cleanup();
    unmount();
  });
});

// Test card complexity
describe("Card Complexity Performance", () => {
  bench("Simple card", () => {
    const { unmount } = render(
      <Card>
        <CardContent>Simple content</CardContent>
      </Card>
    );
    cleanup();
    unmount();
  });

  bench("Medium card", () => {
    const { unmount } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content with some text</p>
        </CardContent>
      </Card>
    );
    cleanup();
    unmount();
  });

  bench("Complex card", () => {
    const { unmount } = render(
      <Card>
        <CardHeader>
          <CardTitle>Complex Card</CardTitle>
          <CardDescription>With all sections used</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h3>Subsection</h3>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <button>Primary Action</button>
          <button>Secondary Action</button>
        </CardFooter>
      </Card>
    );
    cleanup();
    unmount();
  });
});
