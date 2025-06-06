import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "./render";
import { render as rtlRender } from "@testing-library/react";
import type { ComponentSpec } from "../types/schema/components";

describe("render - mixed children arrays", () => {
  it("should render mixed arrays of strings and components", () => {
    const spec: ComponentSpec = {
      type: "Text",
      element: "p",
      children: [
        "Hello ",
        {
          type: "Text",
          element: "strong",
          children: "world",
        },
        "!",
      ],
    };

    const result = render(spec);
    const { container } = rtlRender(result as React.ReactElement);
    
    expect(container.textContent).toBe("Hello world!");
    expect(container.querySelector("p")).toBeInTheDocument();
    expect(container.querySelector("strong")).toBeInTheDocument();
    expect(container.querySelector("strong")?.textContent).toBe("world");
  });

  it("should render complex mixed content with nested components", () => {
    const spec: ComponentSpec = {
      type: "Box",
      className: "container",
      children: {
        type: "Text",
        element: "p",
        children: [
          "React is maintained by ",
          {
            type: "HoverCard",
            children: [
              {
                type: "HoverCardTrigger",
                asChild: true,
                children: {
                  type: "Text",
                  element: "span",
                  className: "underline",
                  children: "Meta",
                },
              },
              {
                type: "HoverCardContent",
                children: "Meta Platforms, Inc.",
              },
            ],
          },
          " and the community.",
        ],
      },
    };

    const result = render(spec);
    const { container } = rtlRender(result as React.ReactElement);
    
    expect(container.querySelector(".container")).toBeInTheDocument();
    expect(container.querySelector("p")).toBeInTheDocument();
    expect(container.querySelector(".underline")).toBeInTheDocument();
    expect(container.querySelector(".underline")?.textContent).toBe("Meta");
    // The text content should include all parts
    expect(container.textContent).toContain("React is maintained by");
    expect(container.textContent).toContain("Meta");
    expect(container.textContent).toContain("and the community.");
  });

  it("should handle empty strings in mixed arrays", () => {
    const spec: ComponentSpec = {
      type: "Text",
      children: [
        "",
        "Hello",
        "",
        {
          type: "Text",
          element: "span",
          children: "world",
        },
        "",
      ],
    };

    const result = render(spec);
    const { container } = rtlRender(result as React.ReactElement);
    
    expect(container.textContent).toBe("Helloworld");
  });

  it("should handle arrays with only strings", () => {
    const spec: ComponentSpec = {
      type: "Text",
      children: ["Hello", " ", "world", "!"],
    };

    const result = render(spec);
    const { container } = rtlRender(result as React.ReactElement);
    
    expect(container.textContent).toBe("Hello world!");
  });

  it("should handle arrays with only components", () => {
    const spec: ComponentSpec = {
      type: "Box",
      children: [
        {
          type: "Text",
          children: "First",
        },
        {
          type: "Text",  
          children: "Second",
        },
      ],
    };

    const result = render(spec);
    const { container } = rtlRender(result as React.ReactElement);
    
    expect(container.textContent).toBe("FirstSecond");
  });
});