import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { render as sduiRender } from "@/lib/render";
import type { UISpecification } from "@/types/schema/specification";
import { defaultMemoizationOptions } from "@/lib/performance/memoization";

// Simple component spec for testing
const createButtonSpec = (id: string, disabled = false): UISpecification => ({
  version: "1.0.0",
  root: {
    type: "Button",
    id,
    children: `Button ${id}`,
    props: {
      variant: "default",
      disabled,
    },
  },
});

// Complex component tree for testing nested memoization
const createComplexSpec = (count: number): UISpecification => ({
  version: "1.0.0",
  root: {
    type: "Flex",
    id: "root",
    props: {
      direction: "column",
      gap: "4",
    },
    children: Array.from({ length: count }, (_, i) => ({
      type: "Card",
      id: `card-${i}`,
      children: [
        {
          type: "Heading",
          id: `heading-${i}`,
          children: `Card ${i}`,
          props: { level: 3 },
        },
        {
          type: "Text",
          id: `text-${i}`,
          children: `Description for card ${i}`,
        },
        {
          type: "Button",
          id: `button-${i}`,
          children: `Action ${i}`,
          props: { variant: "outline" },
        },
      ],
    })),
  },
});

describe("Memoization Performance", () => {
  bench("Render without memoization - simple", () => {
    const spec = createButtonSpec("test");
    const { unmount } = render(
      sduiRender(spec, {
        memoization: { enabled: false },
      })!
    );
    cleanup();
    unmount();
  });

  bench("Render with memoization - simple", () => {
    const spec = createButtonSpec("test");
    const { unmount } = render(
      sduiRender(spec, {
        memoization: { enabled: true },
      })!
    );
    cleanup();
    unmount();
  });

  bench("Render without memoization - complex (10 items)", () => {
    const spec = createComplexSpec(10);
    const { unmount } = render(
      sduiRender(spec, {
        memoization: { enabled: false },
      })!
    );
    cleanup();
    unmount();
  });

  bench("Render with memoization - complex (10 items)", () => {
    const spec = createComplexSpec(10);
    const { unmount } = render(
      sduiRender(spec, {
        memoization: { enabled: true },
      })!
    );
    cleanup();
    unmount();
  });

  bench("Render without memoization - complex (50 items)", () => {
    const spec = createComplexSpec(50);
    const { unmount } = render(
      sduiRender(spec, {
        memoization: { enabled: false },
      })!
    );
    cleanup();
    unmount();
  });

  bench("Render with memoization - complex (50 items)", () => {
    const spec = createComplexSpec(50);
    const { unmount } = render(
      sduiRender(spec, {
        memoization: { enabled: true },
      })!
    );
    cleanup();
    unmount();
  });
});

// Test component for re-render benchmarks
const StateChangeComponent = ({ memoizationEnabled }: { memoizationEnabled: boolean }) => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    // Simulate state changes
    setCount(1);
    setCount(2);
    setCount(3);
  }, []);
  
  return sduiRender(createButtonSpec("test", count > 1), {
    memoization: { enabled: memoizationEnabled },
  });
};

// Test wrapper for props change benchmarks - using inline render to avoid scope warning
function createPropsChangeWrapper(memoizationEnabled: boolean) {
  return () => {
    const [value, setValue] = React.useState(0);
    
    React.useEffect(() => {
      // Simulate props changes
      setValue(1);
      setValue(2);
      setValue(3);
    }, []);
    
    return sduiRender(createButtonSpec(`test-${value}`), {
      memoization: { enabled: memoizationEnabled },
      initialState: { value },
    });
  };
}

describe("Memoization Re-render Performance", () => {
  bench("Re-render without memoization - state change", () => {
    const { unmount } = render(<StateChangeComponent memoizationEnabled={false} />);
    cleanup();
    unmount();
  });

  bench("Re-render with memoization - state change", () => {
    const { unmount } = render(<StateChangeComponent memoizationEnabled={true} />);
    cleanup();
    unmount();
  });

  bench("Re-render without memoization - props change", () => {
    const PropsChangeWrapper = createPropsChangeWrapper(false);
    const { unmount } = render(<PropsChangeWrapper />);
    cleanup();
    unmount();
  });

  bench("Re-render with memoization - props change", () => {
    const PropsChangeWrapper = createPropsChangeWrapper(true);
    const { unmount } = render(<PropsChangeWrapper />);
    cleanup();
    unmount();
  });
});

describe("Memoization with Different Component Types", () => {
  bench("Interactive components with memoization", () => {
    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Form",
        id: "form",
        children: [
          {
            type: "Input",
            id: "input1",
            props: { placeholder: "Name" },
          },
          {
            type: "Select",
            id: "select1",
            props: { placeholder: "Choose option" },
          },
          {
            type: "Switch",
            id: "switch1",
            props: { label: "Enable feature" },
          },
          {
            type: "Button",
            id: "submit",
            children: "Submit",
            props: { variant: "primary" },
          },
        ],
      },
    };
    
    const { unmount } = render(
      sduiRender(spec, {
        memoization: {
          ...defaultMemoizationOptions,
          enabled: true,
        },
      })!
    );
    cleanup();
    unmount();
  });

  bench("Layout components with memoization", () => {
    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Container",
        id: "container",
        children: [
          {
            type: "Grid",
            id: "grid",
            props: { columns: 3, gap: 4 },
            children: Array.from({ length: 9 }, (_, i) => ({
              type: "Box",
              id: `box-${i}`,
              children: `Box ${i}`,
            })),
          },
        ],
      },
    };
    
    const { unmount } = render(
      sduiRender(spec, {
        memoization: {
          ...defaultMemoizationOptions,
          enabled: true,
        },
      })!
    );
    cleanup();
    unmount();
  });

  bench("Typography components with memoization", () => {
    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Container",
        id: "container",
        children: Array.from({ length: 50 }, (_, i) => ({
          type: i % 2 === 0 ? "Text" : "Heading",
          id: `text-${i}`,
          children: `${i % 2 === 0 ? "Text" : "Heading"} ${i}`,
          props: i % 2 === 0 ? {} : { level: (i % 6) + 1 },
        })),
      },
    };
    
    const { unmount } = render(
      sduiRender(spec, {
        memoization: {
          ...defaultMemoizationOptions,
          enabled: true,
          neverMemoize: ["Text"], // Test neverMemoize option
        },
      })!
    );
    cleanup();
    unmount();
  });
});

describe("Memoization with Performance Tracking", () => {
  bench("Render with performance tracking disabled", () => {
    const spec = createComplexSpec(20);
    const { unmount } = render(
      sduiRender(spec, {
        memoization: {
          ...defaultMemoizationOptions,
          enabled: true,
          trackPerformance: false,
        },
      })!
    );
    cleanup();
    unmount();
  });

  bench("Render with performance tracking enabled", () => {
    const spec = createComplexSpec(20);
    const { unmount } = render(
      sduiRender(spec, {
        memoization: {
          ...defaultMemoizationOptions,
          enabled: true,
          trackPerformance: true,
        },
      })!
    );
    cleanup();
    unmount();
  });
});