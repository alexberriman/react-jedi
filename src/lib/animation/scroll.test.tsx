import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import {
  ScrollReveal,
  ScrollParallax,
  ScrollProgress,
  ScrollContainer,
  ScrollScale,
  ScrollTextReveal,
} from "./scroll";
import { AnimationProvider } from "./animation-provider";
import { describe, it, expect, vi } from "vitest";

// Mock framer-motion
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  
  // Create ref-forwarding mock components
  const div = React.forwardRef<HTMLDivElement, Record<string, unknown>>(
    ({ children, ...props }, ref) => (
      <div data-testid="motion-div" ref={ref} {...props}>
        {children as React.ReactNode}
      </div>
    )
  );
  div.displayName = "MockedMotionDiv";
  
  const span = React.forwardRef<HTMLSpanElement, Record<string, unknown>>(
    ({ children, ...props }, ref) => (
      <span data-testid="motion-span" ref={ref} {...props}>
        {children as React.ReactNode}
      </span>
    )
  );
  span.displayName = "MockedMotionSpan";
  
  return {
    ...actual,
    motion: {
      div,
      span,
    },
    useTransform: vi.fn().mockImplementation((value, from, to) => {
      return { value, from, to };
    }),
    useMotionValue: vi.fn().mockImplementation((initial) => ({
      get: () => initial,
      set: vi.fn(),
      onChange: vi.fn(),
    })),
    MotionValue: Object,
    MotionConfig: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // Cast Document to Element if present, otherwise use null
    let root = null;
    if (options?.root) {
      root = options.root instanceof Element ? options.root : null;
    }
    this.root = root;
    this.rootMargin = options?.rootMargin || "0px";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold || 0];
  }

  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window and intersectionObserver
globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Test cases
describe("Scroll", () => {
  // Helper component wrapper with proper typing
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<AnimationProvider>{ui}</AnimationProvider>);
  };

  // Import screen implicitly via render result destructuring

  describe("ScrollReveal", () => {
    it("renders children", () => {
      renderWithProvider(
        <ScrollReveal>
          <div>Test Content</div>
        </ScrollReveal>
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies className and style props", () => {
      const { container } = renderWithProvider(
        <ScrollReveal className="test-class" style={{ color: "red" }}>
          <div>Test Content</div>
        </ScrollReveal>
      );
      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      expect(motionDiv).toHaveClass("test-class");
    });

    it("accepts animation preset as string", () => {
      const { container } = renderWithProvider(
        <ScrollReveal animation="fadeIn">
          <div>Test Content</div>
        </ScrollReveal>
      );
      expect(container).toContainHTML("Test Content");
    });
  });

  describe("ScrollParallax", () => {
    it("renders children", () => {
      renderWithProvider(
        <ScrollParallax>
          <div>Parallax Content</div>
        </ScrollParallax>
      );
      expect(screen.getByText("Parallax Content")).toBeInTheDocument();
    });

    it("accepts speed prop", () => {
      const { container } = renderWithProvider(
        <ScrollParallax speed={0.8}>
          <div>Parallax Content</div>
        </ScrollParallax>
      );
      expect(container).toContainHTML("Parallax Content");
    });

    it("accepts direction prop", () => {
      const { container } = renderWithProvider(
        <ScrollParallax direction="horizontal">
          <div>Parallax Content</div>
        </ScrollParallax>
      );
      expect(container).toContainHTML("Parallax Content");
    });
  });

  describe("ScrollProgress", () => {
    it("renders correctly", () => {
      const { container } = renderWithProvider(
        <ScrollProgress height="100vh" color="#7c3aed" position="top" />
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("accepts custom thickness", () => {
      const { container } = renderWithProvider(<ScrollProgress thickness={8} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("ScrollContainer", () => {
    it("renders children", () => {
      renderWithProvider(
        <ScrollContainer>
          <div>Item 1</div>
          <div>Item 2</div>
        </ScrollContainer>
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("accepts stagger prop", () => {
      const { container } = renderWithProvider(
        <ScrollContainer stagger={0.2}>
          <div>Item 1</div>
          <div>Item 2</div>
        </ScrollContainer>
      );
      expect(container).toContainHTML("Item 1");
      expect(container).toContainHTML("Item 2");
    });
  });

  describe("ScrollScale", () => {
    it("renders children", () => {
      renderWithProvider(
        <ScrollScale>
          <div>Scale Content</div>
        </ScrollScale>
      );
      expect(screen.getByText("Scale Content")).toBeInTheDocument();
    });

    it("accepts startScale and endScale props", () => {
      const { container } = renderWithProvider(
        <ScrollScale startScale={0.5} endScale={1.5}>
          <div>Scale Content</div>
        </ScrollScale>
      );
      expect(container).toContainHTML("Scale Content");
    });
  });

  describe("ScrollTextReveal", () => {
    it("renders text content", () => {
      const { container } = renderWithProvider(<ScrollTextReveal text="Hello World" />);
      expect(container).toContainHTML("Hello");
      expect(container).toContainHTML("World");
    });

    it("accepts stagger prop", () => {
      const { container } = renderWithProvider(
        <ScrollTextReveal text="Hello World" stagger={0.03} />
      );
      expect(container).toContainHTML("Hello");
      expect(container).toContainHTML("World");
    });
  });
});
