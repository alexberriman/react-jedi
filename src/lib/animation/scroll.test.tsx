import React from "react";
import { render } from "@testing-library/react";
import {
  ScrollReveal,
  ScrollParallax,
  ScrollProgress,
  ScrollContainer,
  ScrollScale,
  ScrollTextReveal
} from "./scroll";
import { AnimationProvider } from "./animation-provider";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div data-testid="motion-div" {...props}>{children}</div>,
  },
  useTransform: jest.fn().mockImplementation((value, from, to) => {
    return { value, from, to };
  }),
  useMotionValue: jest.fn().mockImplementation((initial) => ({
    get: () => initial,
    set: jest.fn(),
    onChange: jest.fn(),
  })),
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.root = options?.root || null;
    this.rootMargin = options?.rootMargin || "0px";
    this.thresholds = Array.isArray(options?.threshold) 
      ? options.threshold : [options?.threshold || 0];
  }
  
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window and intersectionObserver
global.IntersectionObserver = MockIntersectionObserver as any;

// Test cases
describe("Scroll", () => {
  
  // Helper component wrapper
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<AnimationProvider>{ui}</AnimationProvider>);
  };
  
  describe("ScrollReveal", () => {
    it("renders children", () => {
      const { getByText } = renderWithProvider(
        <ScrollReveal>
          <div>Test Content</div>
        </ScrollReveal>
      );
      expect(getByText("Test Content")).toBeInTheDocument();
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
      const { getByText } = renderWithProvider(
        <ScrollParallax>
          <div>Parallax Content</div>
        </ScrollParallax>
      );
      expect(getByText("Parallax Content")).toBeInTheDocument();
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
      const { container } = renderWithProvider(
        <ScrollProgress thickness={8} />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
  
  describe("ScrollContainer", () => {
    it("renders children", () => {
      const { getByText } = renderWithProvider(
        <ScrollContainer>
          <div>Item 1</div>
          <div>Item 2</div>
        </ScrollContainer>
      );
      expect(getByText("Item 1")).toBeInTheDocument();
      expect(getByText("Item 2")).toBeInTheDocument();
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
      const { getByText } = renderWithProvider(
        <ScrollScale>
          <div>Scale Content</div>
        </ScrollScale>
      );
      expect(getByText("Scale Content")).toBeInTheDocument();
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
      const { container } = renderWithProvider(
        <ScrollTextReveal text="Hello World" />
      );
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