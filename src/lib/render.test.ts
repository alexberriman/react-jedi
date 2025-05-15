import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, createResolver, createRegistryResolver } from "./render";
import type { ComponentSpec, ComponentProps, UISpecification } from "@/types/schema/components";

// Type definition for components in our tests
// Use the same ComponentProps interface that's used in the main code
type ComponentType = React.ComponentType<ComponentProps>;

// Helper function to safely cast components to accept ComponentProps
const asComponent = <T extends React.ComponentType<Partial<ComponentProps> & Record<string, unknown>>>(
  component: T
): ComponentType => {
  return component as unknown as ComponentType;
};

// Define props for mock components with index signature for unknown props
interface MockProps extends Omit<ComponentProps, 'spec'> {
  // Make spec optional for testing purposes
  spec?: ComponentSpec;
  // Add test-specific prop to avoid empty interface error
  testOnly?: boolean;
  [key: string]: unknown;
}

// Mock component for testing
const MockComponent = (props: MockProps) => {
  const { spec, children, theme, state, parentContext, ...rest } = props;
  return React.createElement("div", { ...rest, spec }, children);
};

const MockHeading = (props: MockProps) => {
  const { spec, children, theme, state, parentContext, ...rest } = props;
  return React.createElement("h1", { ...rest, spec }, children);
};

const MockText = (props: MockProps) => {
  const { spec, children, theme, state, parentContext, ...rest } = props;
  return React.createElement("p", { ...rest, spec }, children);
};

const MockButton = (props: MockProps) => {
  const { spec, children, theme, state, parentContext, ...rest } = props;
  return React.createElement("button", { ...rest, spec }, children);
};

// Mock resolver that returns our test components
const mockResolver = (type: string) => {
  const components: Record<string, ComponentType> = {
    Container: asComponent(MockComponent),
    Box: asComponent(MockComponent),
    Heading: asComponent(MockHeading),
    Text: asComponent(MockText),
    Button: asComponent(MockButton),
  };
  return components[type] || null;
};

describe("render function", () => {
  it("should render a simple component spec", () => {
    const spec: ComponentSpec = {
      type: "Box",
      children: "Hello World",
    };

    const result = render(spec, { resolver: mockResolver });
    expect(result).toBeDefined();
  });

  it("should render a UI specification", () => {
    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Container",
        children: [
          {
            type: "Heading",
            children: "Title",
          },
          {
            type: "Text",
            children: "Description",
          },
        ],
      },
    };

    const result = render(spec, { resolver: mockResolver });
    expect(result).toBeDefined();
  });

  it("should pass accessibility attributes to component props", () => {
    const spec: ComponentSpec = {
      type: "Button",
      children: "Click Me",
      a11y: {
        ariaLabel: "Action Button",
        role: "button",
      },
    };

    const result = render(spec, { resolver: mockResolver });
    // Ensure result is not null before checking props
    expect(result).not.toBeNull();
    if (result) {
      // The rendered component has an ErrorBoundary wrapper, so we need to look at result.props.children
      const component = result.props.children;
      
      // Check that the accessibility attributes are correctly passed to the component
      expect(component.props["aria-label"]).toBe("Action Button");
      expect(component.props.role).toBe("button");
      
      // Also verify the original spec is properly passed through
      expect(component.props.spec.a11y).toEqual(spec.a11y);
    }
  });

  it("should pass data attributes to component props", () => {
    const spec: ComponentSpec = {
      type: "Box",
      children: "Data Box",
      data: {
        test: "value",
      },
    };

    const result = render(spec, { resolver: mockResolver });
    // Ensure result is not null before checking props
    expect(result).not.toBeNull();
    if (result) {
      // The rendered component has an ErrorBoundary wrapper, so we need to look at result.props.children
      const component = result.props.children;
      
      // Check that the data attributes are correctly passed to the component
      expect(component.props["data-test"]).toBe("value");
      
      // Also verify the original spec is properly passed through
      expect(component.props.spec.data).toEqual(spec.data);
    }
  });

  it("should pass test ID to component props", () => {
    const spec: ComponentSpec = {
      type: "Box",
      children: "Test Box",
      testId: "box-test",
    };

    const result = render(spec, { resolver: mockResolver });
    // Ensure result is not null before checking props
    expect(result).not.toBeNull();
    if (result) {
      // The rendered component has an ErrorBoundary wrapper, so we need to look at result.props.children
      const component = result.props.children;
      
      // Check that the testId is correctly passed to the component as data-testid
      expect(component.props["data-testid"]).toBe("box-test");
      
      // Also verify the original spec is properly passed through
      expect(component.props.spec.testId).toBe("box-test");
    }
  });

  it("should handle unknown component types", () => {
    const spec: ComponentSpec = {
      type: "UnknownComponent",
      children: "Hello World",
    };

    // In development mode, it should render a placeholder
    const devResult = render(spec, { resolver: mockResolver, development: true });
    expect(devResult).toBeDefined();

    // In production mode, it should return null
    const prodResult = render(spec, { resolver: mockResolver, development: false });
    expect(prodResult).toBeNull();
  });

  it("should create a combined resolver", () => {
    // Create a combined resolver with a simpler approach
    const combinedResolver = createResolver(
      (type: string) => type === "Custom" ? asComponent(MockComponent) : null,
      mockResolver
    );
    
    // Should resolve from custom resolver
    expect(combinedResolver("Custom")).toBeDefined();
    
    // Should resolve from fallback resolver
    expect(combinedResolver("Box")).toBeDefined();
    
    // Should return null for unknown types
    expect(combinedResolver("Unknown")).toBeNull();
  });

  it("should create a registry resolver", () => {
    const registry = {
      Custom: asComponent(MockComponent),
      Box: asComponent(MockComponent),
    };

    const registryResolver = createRegistryResolver(registry);
    
    // Should resolve registered components
    expect(registryResolver("Custom")).toBeDefined();
    expect(registryResolver("Box")).toBeDefined();
    
    // Should return null for unregistered components
    expect(registryResolver("Unknown")).toBeNull();
  });
});