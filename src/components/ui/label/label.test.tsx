import { render as testingLibraryRender } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "./label";
import { render } from "../../../lib/render";

describe("Label Component", () => {
  describe("Direct Usage", () => {
    it("should render with htmlFor attribute", () => {
      const { container } = testingLibraryRender(
        <Label htmlFor="test-input">Test Label</Label>
      );
      
      const label = container.querySelector('label');
      expect(label).toHaveAttribute('for', 'test-input');
      expect(label).toHaveTextContent('Test Label');
    });
  });

  describe("SDUI Mode", () => {
    it("should render with htmlFor attribute when using SDUI render", () => {
      const spec = {
        type: "Label",
        htmlFor: "sdui-input",
        children: "SDUI Label"
      };
      
      const { container } = testingLibraryRender(<>{render(spec)}</>);
      
      const label = container.querySelector('label');
      expect(label).toHaveAttribute('for', 'sdui-input');
      expect(label).toHaveTextContent('SDUI Label');
    });

    it("should work with Label and Input together in SDUI mode", () => {
      const spec = {
        type: "Flex",
        direction: "column" as const,
        gap: "sm",
        children: [
          {
            type: "Label",
            htmlFor: "email-input",
            children: "Email Address"
          },
          {
            type: "Input",
            id: "email-input",
            inputType: "email",
            placeholder: "Enter email"
          }
        ]
      };
      
      const { container } = testingLibraryRender(<>{render(spec)}</>);
      
      const label = container.querySelector('label');
      const input = container.querySelector('input');
      
      // Debug output
      if (!input?.getAttribute('id')) {
        console.log('Container HTML:', container.innerHTML);
        console.log('Input attributes:', input?.getAttributeNames().map(name => `${name}="${input.getAttribute(name)}"`).join(' '));
      }
      
      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
      expect(input).toHaveAttribute('type', 'email');
    });
  });
});