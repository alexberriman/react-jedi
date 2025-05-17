import React from "react";
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/pure";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Click, ClickButton, ClickCard, ClickIcon } from "./click";
import { AnimationProvider } from "./animation-provider";

interface MockMotionProps {
  children: React.ReactNode;
  whileTap?: object;
  whileHover?: object;
  whileFocus?: object;
  transition?: object;
  [key: string]: unknown;
}

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      whileTap,
      whileHover,
      whileFocus,
      transition,
      ...props
    }: MockMotionProps) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  MotionConfig: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

beforeEach(() => {
  // Clear the DOM
  document.body.innerHTML = "";
});

describe("Click Components", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AnimationProvider>{children}</AnimationProvider>
  );

  describe("Click", () => {
    beforeEach(() => {
      // Clear the testing library DOM between tests
      const testingContainer = document.querySelector("#__testing-library");
      if (testingContainer) {
        testingContainer.innerHTML = "";
      }
    });

    it("renders children correctly", () => {
      const { container } = render(<Click>Click me!</Click>, { wrapper });

      expect(container.textContent).toContain("Click me!");
    });

    it("handles onClick event", () => {
      const handleClick = vi.fn();
      const { container } = render(<Click onClick={handleClick}>Click me!</Click>, { wrapper });

      const element = container.querySelector("div");
      if (element) {
        fireEvent.click(element);
      }
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("applies custom className", () => {
      const { container } = render(<Click className="custom-class">Click me!</Click>, { wrapper });

      const element = container.querySelector(".custom-class");
      expect(element).toBeInTheDocument();
    });

    it("doesn't trigger onClick when disabled", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Click disabled onClick={handleClick}>
          Click me!
        </Click>,
        { wrapper }
      );

      const element = container.querySelector("div");
      if (element) {
        fireEvent.click(element);
      }
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("ClickButton", () => {
    it("renders with default variant and size", () => {
      const { container } = render(<ClickButton>Button</ClickButton>, { wrapper });

      const button = container.querySelector("div");
      expect(button).toHaveClass("bg-blue-500");
      expect(button).toHaveClass("px-4");
      expect(button).toHaveClass("py-2");
    });

    it("renders with secondary variant", () => {
      const { container } = render(<ClickButton variant="secondary">Button</ClickButton>, {
        wrapper,
      });

      const button = container.querySelector("div");
      expect(button).toHaveClass("bg-gray-200");
    });

    it("renders with large size", () => {
      const { container } = render(<ClickButton size="lg">Button</ClickButton>, { wrapper });

      const button = container.querySelector("div");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("py-3");
    });

    it("renders with disabled state", () => {
      const { container } = render(<ClickButton disabled>Button</ClickButton>, { wrapper });

      const button = container.querySelector("div");
      expect(button).toHaveClass("opacity-50");
      expect(button).toHaveClass("cursor-not-allowed");
    });
  });

  describe("ClickCard", () => {
    it("renders children with header and footer", () => {
      const { container } = render(
        <ClickCard header={<h3>Card Header</h3>} footer={<p>Card Footer</p>}>
          Card Content
        </ClickCard>,
        { wrapper }
      );

      expect(container.textContent).toContain("Card Header");
      expect(container.textContent).toContain("Card Content");
      expect(container.textContent).toContain("Card Footer");
    });

    it("renders without header and footer", () => {
      const { container } = render(<ClickCard>Card Content</ClickCard>, { wrapper });

      expect(container.textContent).toContain("Card Content");
    });

    it("handles onClick event", () => {
      const handleClick = vi.fn();
      const { container } = render(<ClickCard onClick={handleClick}>Card</ClickCard>, { wrapper });

      const element = container.querySelector("div");
      if (element) {
        fireEvent.click(element);
      }
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("ClickIcon", () => {
    const TestIcon = () => <svg data-testid="test-icon" />;

    it("renders icon correctly", () => {
      const { container } = render(<ClickIcon icon={<TestIcon />}>{null}</ClickIcon>, { wrapper });

      expect(container.querySelector('[data-testid="test-icon"]')).toBeInTheDocument();
    });

    it("renders with different sizes", () => {
      const { container, rerender } = render(
        <ClickIcon icon={<TestIcon />} size="sm">
          {null}
        </ClickIcon>,
        {
          wrapper,
        }
      );

      let icon = container.querySelector("div");
      expect(icon).toHaveClass("w-8");
      expect(icon).toHaveClass("h-8");

      rerender(
        <AnimationProvider>
          <ClickIcon icon={<TestIcon />} size="lg">
            {null}
          </ClickIcon>
        </AnimationProvider>
      );

      icon = container.querySelector("div");
      expect(icon).toHaveClass("w-12");
      expect(icon).toHaveClass("h-12");
    });

    it("handles onClick event", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <ClickIcon icon={<TestIcon />} onClick={handleClick}>
          {null}
        </ClickIcon>,
        {
          wrapper,
        }
      );

      const element = container.querySelector("div");
      if (element) {
        fireEvent.click(element);
      }
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
