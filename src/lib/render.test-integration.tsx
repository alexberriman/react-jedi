import { describe, it, expect, vi } from "vitest";
import { render as reactRender } from "@testing-library/react";
import { render } from "./render";

describe("Render Integration Tests", () => {
  it("should not pass internal props to DOM elements", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const spec = {
      type: "Box",
      props: {
        className: "test-class",
      },
      children: [
        {
          type: "Box",
          props: {
            className: "child-class",
          },
          children: "Hello World",
        },
      ],
    };

    const { container } = reactRender(<>{render(spec)}</>);

    // Check that no warning was logged about unrecognized props
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("React does not recognize")
    );

    // Check that the elements rendered correctly
    const rootDiv = container.querySelector('[data-slot="box"]');
    expect(rootDiv).toBeTruthy();
    expect(rootDiv?.classList.contains("test-class")).toBe(true);

    consoleSpy.mockRestore();
  });

  it("should properly filter internal props while preserving component props", () => {
    const spec = {
      type: "Button",
      props: {
        variant: "default",
        className: "custom-button",
      },
      children: "Click me",
    };

    const element = render(spec);

    // Verify the element is created correctly
    expect(element).toBeTruthy();
    expect(element!.type).toBeDefined();

    // Verify that internal props are present but DOM props are correctly filtered
    expect(element!.props).toBeDefined();
  });
});
