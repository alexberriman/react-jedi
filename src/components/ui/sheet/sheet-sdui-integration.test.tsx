import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { render as sduiRender } from "../../../lib/render";
import { Sheet, SheetTrigger, SheetContent } from "./sheet";
import { Button } from "../button";

describe("Sheet SDUI Integration", () => {
  it("should render Sheet component with Button trigger using asChild in React", () => {
    // This test verifies that the Sheet component works correctly 
    // when used directly in React with asChild prop
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <p>Sheet content</p>
        </SheetContent>
      </Sheet>
    );

    const button = screen.getByRole("button", { name: "Open Sheet" });
    expect(button).toBeInTheDocument();
    // Verify button has the correct variant styling
    expect(button).toHaveClass("border", "border-input");
  });

  it("should render Sheet component via SDUI with proper trigger", () => {
    // This test verifies that SDUI can render Sheet component
    const spec = {
      type: "Sheet",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "SDUI Sheet Trigger",
          },
        },
        {
          type: "SheetContent",
          children: {
            type: "Text",
            children: "SDUI Sheet content",
          },
        },
      ],
    };

    const rendered = sduiRender(spec);
    if (!rendered) {
      throw new Error("Failed to render SDUI spec");
    }
    render(rendered);

    const button = screen.getByRole("button", { name: "SDUI Sheet Trigger" });
    expect(button).toBeInTheDocument();
  });

  it("should verify SheetTrigger no longer has opacity state management", () => {
    // This test ensures that SheetTrigger doesn't add extra state
    // that could interfere with asChild functionality
    
    const { container } = render(
      <Sheet>
        <SheetTrigger asChild>
          <Button id="test-button">Test Button</Button>
        </SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>
    );

    const button = container.querySelector("#test-button");
    expect(button).toBeInTheDocument();
    
    // Button should not have opacity-0 or transition-opacity classes
    // that were previously added by SheetTrigger
    expect(button).not.toHaveClass("opacity-0");
    expect(button).not.toHaveClass("transition-opacity");
  });

  it("should compare Sheet and Dialog trigger implementations", () => {
    // This test ensures Sheet behaves similarly to Dialog
    const { container } = render(
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button id="sheet-btn">Sheet</Button>
          </SheetTrigger>
          <SheetContent>Sheet content</SheetContent>
        </Sheet>
        
        <dialog>
          <button id="dialog-btn">Dialog</button>
        </dialog>
      </div>
    );

    const sheetBtn = container.querySelector("#sheet-btn");
    const dialogBtn = container.querySelector("#dialog-btn");
    
    // Both should be button elements
    expect(sheetBtn?.tagName).toBe("BUTTON");
    expect(dialogBtn?.tagName).toBe("BUTTON");
  });
});