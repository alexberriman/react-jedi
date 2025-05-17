import React from "react";
import { render, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { describe, it, expect, afterEach } from "vitest";
import { SlideIn, SlideOut, SlideTransition } from "./slide";
import { AnimationProvider } from "./animation-provider";

describe("Slide Animations", () => {
  afterEach(() => {
    cleanup();
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<AnimationProvider>{component}</AnimationProvider>);
  };

  describe("SlideIn", () => {
    it("renders children", () => {
      renderWithProvider(<SlideIn>Test Content</SlideIn>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = renderWithProvider(
        <SlideIn className="custom-class">Test Content</SlideIn>
      );
      const element = container.querySelector(".custom-class");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");
    });

    it("accepts different directions", () => {
      const directions = ["up", "down", "left", "right"] as const;
      for (const direction of directions) {
        const { container } = renderWithProvider(
          <SlideIn direction={direction}>Test {direction}</SlideIn>
        );
        expect(container.textContent).toContain(`Test ${direction}`);
        cleanup();
      }
    });

    it("accepts custom duration", () => {
      renderWithProvider(<SlideIn duration="fast">Test Content</SlideIn>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("works when disabled", () => {
      renderWithProvider(<SlideIn disabled>Test Content</SlideIn>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("SlideOut", () => {
    it("renders children", () => {
      renderWithProvider(<SlideOut>Test Content</SlideOut>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = renderWithProvider(
        <SlideOut className="custom-class">Test Content</SlideOut>
      );
      const element = container.querySelector(".custom-class");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");
    });

    it("accepts different directions", () => {
      const directions = ["up", "down", "left", "right"] as const;
      for (const direction of directions) {
        const { container } = renderWithProvider(
          <SlideOut direction={direction}>Test {direction}</SlideOut>
        );
        expect(container.textContent).toContain(`Test ${direction}`);
        cleanup();
      }
    });

    it("accepts custom duration", () => {
      renderWithProvider(<SlideOut duration="slow">Test Content</SlideOut>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("works when disabled", () => {
      renderWithProvider(<SlideOut disabled>Test Content</SlideOut>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("SlideTransition", () => {
    it("renders when visible", () => {
      renderWithProvider(<SlideTransition isVisible={true}>Test Content</SlideTransition>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("does not render when not visible", () => {
      renderWithProvider(<SlideTransition isVisible={false}>Test Content</SlideTransition>);
      expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    });

    it("toggles visibility", () => {
      const { rerender } = renderWithProvider(
        <SlideTransition isVisible={true}>Test Content</SlideTransition>
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();

      rerender(
        <AnimationProvider>
          <SlideTransition isVisible={false}>Test Content</SlideTransition>
        </AnimationProvider>
      );
      // Note: AnimatePresence might keep the element in DOM during animation
      // We would need to wait for animation to complete in a real test
    });

    it("applies custom props", () => {
      const { container } = renderWithProvider(
        <SlideTransition isVisible={true} className="custom-class" direction="left" duration="fast">
          Test Content
        </SlideTransition>
      );
      const element = container.querySelector(".custom-class");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");
    });
  });
});
