import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("ToggleGroup", () => {
  describe("Single Selection", () => {
    it("should render with single selection by default", () => {
      render(
        <ToggleGroup>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByRole("group")).toBeInTheDocument();
      expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("should handle single selection with selectionType prop", () => {
      const onValueChange = vi.fn();
      render(
        <ToggleGroup selectionType="single" onValueChange={onValueChange}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );

      fireEvent.click(screen.getByText("A"));
      expect(onValueChange).toHaveBeenCalledWith("a");
    });

    it("should handle single selection with type prop", () => {
      const onValueChange = vi.fn();
      render(
        <ToggleGroup type="single" onValueChange={onValueChange}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );

      fireEvent.click(screen.getByText("A"));
      expect(onValueChange).toHaveBeenCalledWith("a");
    });

    it("should handle controlled single value", () => {
      render(
        <ToggleGroup type="single" value="b">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText("B")).toHaveAttribute("data-state", "on");
      expect(screen.getByText("A")).toHaveAttribute("data-state", "off");
      expect(screen.getByText("C")).toHaveAttribute("data-state", "off");
    });
  });

  describe("Multiple Selection", () => {
    it("should handle multiple selection with selectionType prop", () => {
      const onValueChange = vi.fn();
      render(
        <ToggleGroup selectionType="multiple" onValueChange={onValueChange}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );

      fireEvent.click(screen.getByText("A"));
      expect(onValueChange).toHaveBeenCalledWith(["a"]);

      fireEvent.click(screen.getByText("B"));
      expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);
    });

    it("should handle multiple selection with type prop", () => {
      const onValueChange = vi.fn();
      render(
        <ToggleGroup type="multiple" onValueChange={onValueChange}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );

      fireEvent.click(screen.getByText("A"));
      expect(onValueChange).toHaveBeenCalledWith(["a"]);
    });

    it("should handle controlled multiple values", () => {
      render(
        <ToggleGroup type="multiple" value={["a", "c"]}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText("A")).toHaveAttribute("data-state", "on");
      expect(screen.getByText("B")).toHaveAttribute("data-state", "off");
      expect(screen.getByText("C")).toHaveAttribute("data-state", "on");
    });

    it("should handle default multiple values", () => {
      render(
        <ToggleGroup selectionType="multiple" defaultValue={["b", "c"]}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );

      expect(screen.getByText("A")).toHaveAttribute("data-state", "off");
      expect(screen.getByText("B")).toHaveAttribute("data-state", "on");
      expect(screen.getByText("C")).toHaveAttribute("data-state", "on");
    });
  });

  describe("Style Variants", () => {
    it("should apply variant classes", () => {
      render(
        <ToggleGroup variant="outline">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
        </ToggleGroup>
      );

      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("data-variant", "outline");
    });

    it("should apply size classes", () => {
      render(
        <ToggleGroup size="sm">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
        </ToggleGroup>
      );

      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("data-size", "sm");
    });

    it("should handle disabled state", () => {
      render(
        <ToggleGroup disabled>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
        </ToggleGroup>
      );

      const buttons = screen.getByRole("group").querySelectorAll("button");
      for (const button of buttons) {
        expect(button).toBeDisabled();
      }
    });
  });
});
