import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Text } from "./text";

describe("Text", () => {
  it("should not pass conditionalProps to DOM element", () => {
    const { container } = render(
      <Text 
        conditionalProps={{ test: "value" }}
        parentContext={{ handlers: {} }}
        spec={{ type: "Text" } as import("@/types/schema/components").ComponentSpec}
        theme={{}}
        state={{}}
      >
        Test content
      </Text>
    );
    
    const element = container.querySelector('[data-slot="text"]');
    expect(element).toBeTruthy();
    // Check that conditionalProps is not present on the DOM element
    expect(element?.getAttribute("conditionalProps")).toBeNull();
  });
});