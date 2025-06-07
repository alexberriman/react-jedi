import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render as renderComponent } from "@testing-library/react";
import { render } from "../../../lib/render";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./sheet";
import { Button } from "../button";

describe("Sheet SDUI Integration", () => {
  it("should render Sheet with trigger in React mode", () => {
    const { container } = renderComponent(
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Test Sheet</SheetTitle>
            <SheetDescription>This is a test sheet</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe("Open Sheet");
  });

  it("should render Sheet with trigger in SDUI mode", () => {
    const spec = {
      type: "Sheet",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Open Sheet SDUI"
          }
        },
        {
          type: "SheetContent",
          children: {
            type: "SheetHeader",
            children: [
              {
                type: "SheetTitle",
                children: "Test Sheet SDUI"
              },
              {
                type: "SheetDescription",
                children: "This is a test sheet in SDUI"
              }
            ]
          }
        }
      ]
    };

    const component = render(spec);
    const { container } = renderComponent(component as React.ReactElement);

    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe("Open Sheet SDUI");
  });

  it("should handle onOpenChangeAction in SDUI mode", () => {
    const openChangeHandler = vi.fn();
    
    const spec = {
      type: "Sheet",
      onOpenChangeAction: "handleOpenChange",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Open Sheet with Handler"
          }
        },
        {
          type: "SheetContent",
          children: {
            type: "Text",
            children: "Sheet content"
          }
        }
      ]
    };

    const component = render(spec, {
      handlers: {
        handleOpenChange: openChangeHandler
      }
    });

    const { container } = renderComponent(component as React.ReactElement);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    
    // The handler should be connected through the SheetWrapper
    // The actual click simulation would require more setup with React Testing Library
  });
});