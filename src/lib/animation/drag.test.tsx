import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { Drag, DragCard, DragHandle, DragListItem } from "./drag";
import { AnimationProvider } from "./animation-provider";
import { describe, it, expect } from "vitest";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AnimationProvider>{children}</AnimationProvider>
);

describe("Drag", () => {
  it("renders children", () => {
    render(
      <TestWrapper>
        <Drag>
          <div data-testid="drag-content">Test Content</div>
        </Drag>
      </TestWrapper>
    );

    expect(screen.getByTestId("drag-content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <TestWrapper>
        <Drag className="custom-class">
          <div>Content</div>
        </Drag>
      </TestWrapper>
    );

    const dragElement = screen.getByText("Content").parentElement;
    expect(dragElement).toHaveClass("custom-class");
  });

  it("applies grab cursor when not disabled", () => {
    render(
      <TestWrapper>
        <Drag>
          <div>Draggable</div>
        </Drag>
      </TestWrapper>
    );

    const dragElement = screen.getByText("Draggable").parentElement;
    expect(dragElement).toHaveStyle({ cursor: "grab" });
  });

  it("does not apply grab cursor when disabled", () => {
    render(
      <TestWrapper>
        <Drag disabled>
          <div>Not Draggable</div>
        </Drag>
      </TestWrapper>
    );

    const dragElement = screen.getByText("Not Draggable").parentElement;
    expect(dragElement).not.toHaveStyle({ cursor: "grab" });
  });

  it("applies preset animations", () => {
    render(
      <TestWrapper>
        <Drag preset="smooth">
          <div>Smooth Drag</div>
        </Drag>
      </TestWrapper>
    );

    expect(screen.getByText("Smooth Drag")).toBeInTheDocument();
  });

  it("applies custom animations", () => {
    const customAnimation = {
      scale: 1.5,
      rotate: 45,
    };

    render(
      <TestWrapper>
        <Drag animation={customAnimation}>
          <div>Custom Animation</div>
        </Drag>
      </TestWrapper>
    );

    expect(screen.getByText("Custom Animation")).toBeInTheDocument();
  });
});

describe("DragCard", () => {
  it("renders children", () => {
    render(
      <TestWrapper>
        <DragCard>
          <div data-testid="card-content">Card Content</div>
        </DragCard>
      </TestWrapper>
    );

    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(
      <TestWrapper>
        <DragCard variant="elevated">
          <div>Elevated Card</div>
        </DragCard>
      </TestWrapper>
    );

    const card = screen.getByText("Elevated Card").parentElement;
    expect(card).toHaveClass("shadow-lg");
  });

  it("applies size classes", () => {
    render(
      <TestWrapper>
        <DragCard size="lg">
          <div>Large Card</div>
        </DragCard>
      </TestWrapper>
    );

    const card = screen.getByText("Large Card").parentElement;
    expect(card).toHaveClass("p-6");
  });

  it("applies disabled styles", () => {
    render(
      <TestWrapper>
        <DragCard disabled>
          <div>Disabled Card</div>
        </DragCard>
      </TestWrapper>
    );

    const card = screen.getByText("Disabled Card").parentElement;
    expect(card).toHaveClass("opacity-50");
    expect(card).toHaveClass("cursor-not-allowed");
  });
});

describe("DragHandle", () => {
  it("renders custom children", () => {
    render(
      <DragHandle>
        <span data-testid="custom-handle">Custom Handle</span>
      </DragHandle>
    );

    expect(screen.getByTestId("custom-handle")).toBeInTheDocument();
  });

  it("renders default handle icon when no children provided", () => {
    const { container } = render(<DragHandle />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<DragHandle className="custom-handle" />);
    const handle = container.firstChild;
    expect(handle).toHaveClass("custom-handle");
  });

  it("applies grab cursor styles", () => {
    const { container } = render(<DragHandle />);
    const handle = container.firstChild;
    expect(handle).toHaveClass("cursor-grab");
    expect(handle).toHaveClass("active:cursor-grabbing");
  });
});

describe("DragListItem", () => {
  it("renders children", () => {
    render(
      <TestWrapper>
        <DragListItem>
          <div data-testid="list-content">List Item Content</div>
        </DragListItem>
      </TestWrapper>
    );

    expect(screen.getByTestId("list-content")).toBeInTheDocument();
  });

  it("renders with handle when handle prop is true", () => {
    const { container } = render(
      <TestWrapper>
        <DragListItem handle>
          <div>Item with Handle</div>
        </DragListItem>
      </TestWrapper>
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies base list item styles", () => {
    render(
      <TestWrapper>
        <DragListItem>
          <div>Styled Item</div>
        </DragListItem>
      </TestWrapper>
    );

    const item = screen.getByText("Styled Item").parentElement;
    expect(item).toHaveClass("bg-white");
    expect(item).toHaveClass("p-4");
    expect(item).toHaveClass("rounded-md");
    expect(item).toHaveClass("shadow-sm");
  });

  it("passes through dragConstraints prop", () => {
    render(
      <TestWrapper>
        <DragListItem dragConstraints={false}>
          <div>Unconstrained Item</div>
        </DragListItem>
      </TestWrapper>
    );

    expect(screen.getByText("Unconstrained Item")).toBeInTheDocument();
  });
});
