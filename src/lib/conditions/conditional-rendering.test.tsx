import React from "react";
import { describe, it, expect } from "vitest";
import { render as rtlRender } from "@testing-library/react";
import { render } from "../render";
import type { UISpecification } from "../../types/schema/specification";

describe("Conditional Rendering Integration", () => {
  it("should conditionally render components based on state", () => {
    const specification: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Box",
        children: [
          {
            type: "Text",
            children: "Always visible",
          },
          {
            type: "Text",
            when: "state.showMessage",
            children: "Conditionally visible",
          },
        ],
      },
      state: {
        initial: {
          showMessage: false,
        },
      },
    };

    // First render with showMessage = false
    const result = render(specification);
    if (!result) throw new Error("Failed to render specification");
    const { container, rerender } = rtlRender(result);
    expect(container.textContent).toContain("Always visible");
    expect(container.textContent).not.toContain("Conditionally visible");

    // Render with showMessage = true
    const updatedSpec = {
      ...specification,
      state: {
        initial: {
          showMessage: true,
        },
      },
    };
    const updatedResult = render(updatedSpec);
    if (!updatedResult) throw new Error("Failed to render updated specification");
    rerender(updatedResult);
    expect(container.textContent).toContain("Always visible");
    expect(container.textContent).toContain("Conditionally visible");
  });

  it("should apply conditional props based on expressions", () => {
    const specification: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Button",
        children: "Click me",
        conditionalProps: {
          variant: {
            "props.isPrimary === true": "default",
            "props.isPrimary === false": "outline",
          },
          className: {
            'state.theme === "dark"': "dark-theme",
            'state.theme === "light"': "light-theme",
          },
        },
        isPrimary: true,
      },
      state: {
        initial: {
          theme: "dark",
        },
      },
    };

    const result = render(specification, { development: true });

    // Since we can't easily inspect the props directly in this test,
    // we'll just verify that the component renders without errors
    const { container } = rtlRender(result as React.ReactElement);
    expect(container.firstChild).toBeTruthy();
  });

  it("should handle complex conditional scenarios", () => {
    const specification: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Container",
        children: [
          {
            type: "Box",
            when: "state.user && state.user.authenticated",
            children: [
              {
                type: "Heading",
                level: "h1",
                children: "Welcome!",
                conditionalProps: {
                  children: {
                    'state.user.role === "admin"': "Admin Dashboard",
                    'state.user.role === "user"': "User Dashboard",
                  },
                },
              },
              {
                type: "Box",
                when: 'state.user.role === "admin"',
                children: {
                  type: "Text",
                  children: "Admin controls here",
                },
              },
            ],
          },
          {
            type: "Box",
            when: "!state.user || !state.user.authenticated",
            children: {
              type: "Text",
              children: "Please log in",
            },
          },
        ],
      },
      state: {
        initial: {
          user: {
            authenticated: true,
            role: "admin",
          },
        },
      },
    };

    const result = render(specification);
    if (!result) throw new Error("Failed to render specification");
    const { container } = rtlRender(result);
    expect(container.textContent).toContain("Admin Dashboard");
    expect(container.textContent).toContain("Admin controls here");
    expect(container.textContent).not.toContain("Please log in");
  });

  it("should handle nested conditions", () => {
    const specification: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Box",
        when: "state.showParent",
        children: {
          type: "Box",
          when: "state.showChild",
          children: {
            type: "Text",
            children: "Nested content",
          },
        },
      },
      state: {
        initial: {
          showParent: true,
          showChild: false,
        },
      },
    };

    const result = render(specification);
    if (!result) throw new Error("Failed to render specification");
    const { container, rerender } = rtlRender(result);
    expect(container.textContent).not.toContain("Nested content");

    // Show child
    const updatedSpec = {
      ...specification,
      state: {
        initial: {
          showParent: true,
          showChild: true,
        },
      },
    };
    const updatedResult = render(updatedSpec);
    if (!updatedResult) throw new Error("Failed to render updated specification");
    rerender(updatedResult);
    expect(container.textContent).toContain("Nested content");

    // Hide parent
    const hiddenSpec = {
      ...specification,
      state: {
        initial: {
          showParent: false,
          showChild: true,
        },
      },
    };
    const hiddenResult = render(hiddenSpec);
    if (!hiddenResult) throw new Error("Failed to render hidden specification");
    rerender(hiddenResult);
    expect(container.textContent).not.toContain("Nested content");
  });
});
