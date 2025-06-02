import { describe, it, expect, vi } from "vitest";
import { render as testRender, screen, fireEvent } from "@testing-library/react";
import { render } from "../../../lib/render";
import type { ComponentSpec } from "../../../types/schema/components";

describe("ToggleGroup JSON Rendering Integration", () => {
  it("should render single selection toggle group from JSON spec", () => {
    const spec: ComponentSpec = {
      type: "ToggleGroup",
      selectionType: "single",
      variant: "outline",
      defaultValue: "center",
      children: [
        { type: "ToggleGroupItem", value: "left", children: "Left" },
        { type: "ToggleGroupItem", value: "center", children: "Center" },
        { type: "ToggleGroupItem", value: "right", children: "Right" }
      ]
    };

    const { container } = testRender(<>{render(spec)}</>);
    
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByText("Center")).toHaveAttribute("data-state", "on");
    expect(container.querySelector('[data-variant="outline"]')).toBeInTheDocument();
  });

  it("should render multiple selection toggle group from JSON spec", () => {
    const spec: ComponentSpec = {
      type: "ToggleGroup",
      selectionType: "multiple",
      defaultValue: ["bold", "italic"],
      children: [
        { type: "ToggleGroupItem", value: "bold", children: "Bold" },
        { type: "ToggleGroupItem", value: "italic", children: "Italic" },
        { type: "ToggleGroupItem", value: "underline", children: "Underline" }
      ]
    };

    const { container } = testRender(<>{render(spec)}</>);
    
    expect(screen.getByRole("group")).toBeInTheDocument();
    // In multiple mode, items are still buttons but without role="radio"
    const buttons = container.querySelectorAll('button[type="button"]');
    expect(buttons).toHaveLength(3);
    expect(screen.getByText("Bold")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Italic")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Underline")).toHaveAttribute("data-state", "off");
  });

  it("should handle controlled value changes via event handlers", () => {
    const onValueChange = vi.fn();
    
    const spec: ComponentSpec = {
      type: "ToggleGroup",
      selectionType: "single",
      value: "left",
      onValueChangeAction: "handleValueChange",
      children: [
        { type: "ToggleGroupItem", value: "left", children: "Left" },
        { type: "ToggleGroupItem", value: "center", children: "Center" },
        { type: "ToggleGroupItem", value: "right", children: "Right" }
      ]
    };

    const handlers = {
      handleValueChange: onValueChange
    };

    testRender(<>{render(spec, { handlers })}</>);
    
    fireEvent.click(screen.getByText("Center"));
    expect(onValueChange).toHaveBeenCalledWith("center");
  });

  it("should handle disabled states from JSON spec", () => {
    const spec: ComponentSpec = {
      type: "ToggleGroup",
      selectionType: "single",
      children: [
        { type: "ToggleGroupItem", value: "a", children: "Enabled" },
        { type: "ToggleGroupItem", value: "b", children: "Disabled", disabled: true },
        { type: "ToggleGroupItem", value: "c", children: "Also Enabled" }
      ]
    };

    const { container } = testRender(<>{render(spec)}</>);
    
    const buttons = container.querySelectorAll('button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
    expect(buttons[2]).not.toBeDisabled();
  });

  it("should apply sizes from JSON spec", () => {
    const spec: ComponentSpec = {
      type: "ToggleGroup",
      selectionType: "single",
      size: "sm",
      children: [
        { type: "ToggleGroupItem", value: "a", children: "A" },
        { type: "ToggleGroupItem", value: "b", children: "B" }
      ]
    };

    const { container } = testRender(<>{render(spec)}</>);
    
    expect(container.querySelector('[data-size="sm"]')).toBeInTheDocument();
  });

  it("should handle both type and selectionType props", () => {
    // Using 'selectionType' prop
    const specWithSelectionType: ComponentSpec = {
      type: "ToggleGroup",
      selectionType: "multiple",
      defaultValue: ["a"],
      children: [
        { type: "ToggleGroupItem", value: "a", children: "A" },
        { type: "ToggleGroupItem", value: "b", children: "B" }
      ]
    };

    const { container } = testRender(<>{render(specWithSelectionType)}</>);
    const buttons = container.querySelectorAll('button[type="button"]');
    expect(buttons).toHaveLength(2);
    expect(screen.getByText("A")).toHaveAttribute("data-state", "on");
  });
});