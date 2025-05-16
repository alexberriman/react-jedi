import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible/collapsible";
import { createComponentBenchmark } from "./component-benchmark";

// Basic collapsible benchmark
const BasicCollapsible = (props: { open?: boolean }) => (
  <Collapsible open={props.open}>
    <CollapsibleTrigger>
      <button>Toggle</button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div>
        <p>This is the collapsible content.</p>
        <p>It can contain any React elements.</p>
      </div>
    </CollapsibleContent>
  </Collapsible>
);

createComponentBenchmark({
  component: BasicCollapsible,
  name: "Collapsible",
  initialProps: { open: false },
  updateProps: { open: true },
  timeBudgetMs: 8, // Collapsibles have transitions, allow more time
});

// Test different collapsible states
describe("Collapsible States Performance", () => {
  bench("Collapsible - closed", () => {
    const { unmount } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    cleanup();
    unmount();
  });

  bench("Collapsible - open", () => {
    const { unmount } = render(
      <Collapsible open>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    cleanup();
    unmount();
  });

  bench("Collapsible - disabled", () => {
    const { unmount } = render(
      <Collapsible disabled>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    cleanup();
    unmount();
  });
});

// Test collapsible with complex content
describe("Collapsible Content Performance", () => {
  bench("Collapsible - minimal content", () => {
    const { unmount } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Simple text</p>
        </CollapsibleContent>
      </Collapsible>
    );
    cleanup();
    unmount();
  });

  bench("Collapsible - complex content", () => {
    const { unmount } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>
            <h3>Section Title</h3>
            <p>First paragraph of content.</p>
            <p>Second paragraph of content.</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
              <li>List item 3</li>
            </ul>
            <button>Action Button</button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
    cleanup();
    unmount();
  });

  bench("Collapsible - nested components", () => {
    const { unmount } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle Parent</CollapsibleTrigger>
        <CollapsibleContent>
          <div>
            <p>Parent content</p>
            <Collapsible>
              <CollapsibleTrigger>Toggle Child</CollapsibleTrigger>
              <CollapsibleContent>
                <p>Nested collapsible content</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
    cleanup();
    unmount();
  });
});

// Test multiple collapsibles
describe("Multiple Collapsibles Performance", () => {
  bench("Render 3 collapsibles", () => {
    const { unmount } = render(
      <div>
        <Collapsible>
          <CollapsibleTrigger>Section 1</CollapsibleTrigger>
          <CollapsibleContent>Content 1</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>Section 2</CollapsibleTrigger>
          <CollapsibleContent>Content 2</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>Section 3</CollapsibleTrigger>
          <CollapsibleContent>Content 3</CollapsibleContent>
        </Collapsible>
      </div>
    );
    cleanup();
    unmount();
  });
});
