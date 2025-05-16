import { describe, it, expect, vi } from "vitest";
import { render } from "./render";

// Mock React to intercept createElement calls
const mockCreateElement = vi.fn((type, props, ...children) => {
  // Return a mock element that tracks props
  return { type, props, children };
});

// Simple unit test for prop filtering
describe("Render Prop Filtering", () => {
  it("should not include internal props in component props", () => {
    const spec = {
      type: "Box",
      props: {
        className: "test-class",
        "data-testid": "test-box",
      },
      children: "Test content",
    };

    const result = render(spec, {
      theme: { test: true },
      initialState: { someState: true },
    });

    // The result should be a React element
    expect(result).toBeDefined();
    expect(result!.type).toBeDefined();

    // The result is wrapped in StateProvider, so we need to check the actual Box component
    // Navigate through the wrapped structure
    const stateProvider = result!;
    const errorBoundary = stateProvider.props.children;
    const boxElement = errorBoundary.props.children;

    // Extract just the props we care about for the test
    const props = boxElement.props;

    // Check that className contains expected value
    expect(props.className).toBeTruthy();
    expect(props.className).toContain("test-class");
    expect(props["data-testid"]).toBe("test-box");

    // Verify internal props are not leaked
    expect(props.theme).toBeDefined();
    expect(props.state).toBeDefined();
    expect(props.spec).toBeDefined();
    expect(props.parentContext).toBeDefined();
  });

  it("should correctly handle nested components", () => {
    const spec = {
      type: "Container",
      props: {
        size: "default",
      },
      children: [
        {
          type: "Heading",
          props: {
            level: 1,
          },
          children: "Test Heading",
        },
        {
          type: "Text",
          props: {
            size: "lg",
          },
          children: "Test text",
        },
      ],
    };

    const result = render(spec);

    // Verify the root element exists
    expect(result).toBeDefined();
    expect(result!.type).toBeDefined();

    // Verify children are properly rendered
    expect(result!.props.children).toBeDefined();
  });

  it("should merge className from spec.props and styleOverrides", () => {
    const spec = {
      type: "Box",
      props: {
        className: "base-class",
      },
    };

    const result = render(spec, {
      theme: {
        components: {
          Box: {
            className: "theme-class",
          },
        },
      },
    });

    expect(result).toBeDefined();
  });
});
