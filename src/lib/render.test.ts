import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, createResolver, createRegistryResolver } from "./render";
import type { ComponentSpec, UISpecification } from "@/types/schema/components";

// Mock component for testing
const MockComponent = (props: any) => {
  const { spec, children, ...rest } = props;
  return React.createElement("div", { ...rest }, children);
};

const MockHeading = (props: any) => {
  const { spec, children, ...rest } = props;
  return React.createElement("h1", { ...rest }, children);
};

const MockText = (props: any) => {
  const { spec, children, ...rest } = props;
  return React.createElement("p", { ...rest }, children);
};

const MockButton = (props: any) => {
  const { spec, children, ...rest } = props;
  return React.createElement("button", { ...rest }, children);
};

// Mock resolver that returns our test components
const mockResolver = (type: string) => {
  const components: Record<string, React.ComponentType<any>> = {
    Container: MockComponent,
    Box: MockComponent,
    Heading: MockHeading,
    Text: MockText,
    Button: MockButton,
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
    // Check that props are in the componentProps object
    expect(result.props.spec.a11y.ariaLabel).toBe("Action Button");
    expect(result.props.spec.a11y.role).toBe("button");
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
    // Check that data is in the componentProps object
    expect(result.props.spec.data.test).toBe("value");
  });

  it("should pass test ID to component props", () => {
    const spec: ComponentSpec = {
      type: "Box",
      children: "Test Box",
      testId: "box-test",
    };

    const result = render(spec, { resolver: mockResolver });
    // Check that testId is in the componentProps object
    expect(result.props.spec.testId).toBe("box-test");
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
    const customResolver = (type: string) => {
      if (type === "Custom") {
        return MockComponent;
      }
      return null;
    };

    const combinedResolver = createResolver(customResolver, mockResolver);
    
    // Should resolve from custom resolver
    expect(combinedResolver("Custom")).toBe(MockComponent);
    
    // Should resolve from fallback resolver
    expect(combinedResolver("Box")).toBe(MockComponent);
    
    // Should return null for unknown types
    expect(combinedResolver("Unknown")).toBeNull();
  });

  it("should create a registry resolver", () => {
    const registry = {
      Custom: MockComponent,
      Box: MockComponent,
    };

    const registryResolver = createRegistryResolver(registry);
    
    // Should resolve registered components
    expect(registryResolver("Custom")).toBe(MockComponent);
    expect(registryResolver("Box")).toBe(MockComponent);
    
    // Should return null for unregistered components
    expect(registryResolver("Unknown")).toBeNull();
  });
});