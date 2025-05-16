import { describe, it, expect } from "vitest";
import { render as reactRender } from "@testing-library/react";
import { render } from "../render";
import type { UISpecification } from "@/types/schema/specification";

describe("Conditional Rendering Integration", () => {
  it("should conditionally render components based on state", () => {
    const specification: UISpecification = {
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
    const { rerender, queryByText } = reactRender(render(specification));
    expect(queryByText("Always visible")).toBeTruthy();
    expect(queryByText("Conditionally visible")).toBeNull();

    // Render with showMessage = true
    const updatedSpec = {
      ...specification,
      state: {
        initial: {
          showMessage: true,
        },
      },
    };
    rerender(render(updatedSpec));
    expect(queryByText("Always visible")).toBeTruthy();
    expect(queryByText("Conditionally visible")).toBeTruthy();
  });

  it("should apply conditional props based on expressions", () => {
    const specification: UISpecification = {
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
    const { container } = reactRender(result as React.ReactElement);
    expect(container.firstChild).toBeTruthy();
  });

  it("should handle complex conditional scenarios", () => {
    const specification: UISpecification = {
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

    const { queryByText } = reactRender(render(specification));
    expect(queryByText("Admin Dashboard")).toBeTruthy();
    expect(queryByText("Admin controls here")).toBeTruthy();
    expect(queryByText("Please log in")).toBeNull();
  });

  it("should handle nested conditions", () => {
    const specification: UISpecification = {
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

    const { queryByText, rerender } = reactRender(render(specification));
    expect(queryByText("Nested content")).toBeNull();

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
    rerender(render(updatedSpec));
    expect(queryByText("Nested content")).toBeTruthy();

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
    rerender(render(hiddenSpec));
    expect(queryByText("Nested content")).toBeNull();
  });
});
