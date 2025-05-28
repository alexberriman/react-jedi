import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Define component props interface
interface MockComponentProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

// Mock framer-motion before importing components
vi.mock("framer-motion", () => {
  // Create motion value factory inside the mock
  const mockMotionValue = (initial: number | string) => ({
    get: vi.fn(() => initial),
    set: vi.fn(),
    onChange: vi.fn(),
    isAnimating: vi.fn(() => false),
    stop: vi.fn(),
    destroy: vi.fn(),
  });
  
  // Create ref-forwarding mock components
  const div = React.forwardRef(
    ({ children, ...props }: MockComponentProps, ref: React.Ref<HTMLDivElement>) => 
      React.createElement("div", { "data-testid": "motion-div", ref, ...props }, children)
  );
  div.displayName = "MockedMotionDiv";
  
  const span = React.forwardRef(
    ({ children, ...props }: MockComponentProps, ref: React.Ref<HTMLSpanElement>) => 
      React.createElement("span", { "data-testid": "motion-span", ref, ...props }, children)
  );
  span.displayName = "MockedMotionSpan";
  
  return {
    motion: {
      div,
      span,
    },
    useTransform: vi.fn((value, from, to) => {
      const initial = typeof from[0] === 'string' ? "0%" : 0;
      return mockMotionValue(initial);
    }),
    useMotionValue: vi.fn((initial) => mockMotionValue(initial)),
    MotionValue: Object,
    MotionConfig: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Import components after mocking
import {
  ScrollReveal,
  ScrollParallax,
  ScrollProgress,
  ScrollContainer,
  ScrollScale,
  ScrollTextReveal,
} from "./scroll";
import { AnimationProvider } from "./animation-provider";

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

// Mock matchMedia
beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

// Helper to render components within AnimationProvider
const renderWithAnimation = (ui: React.ReactElement) => {
  return render(<AnimationProvider>{ui}</AnimationProvider>);
};

describe("Scroll", () => {
  describe("ScrollReveal", () => {
    it("renders children", () => {
      renderWithAnimation(
        <ScrollReveal>
          <div>Reveal Content</div>
        </ScrollReveal>
      );
      expect(screen.getByText("Reveal Content")).toBeInTheDocument();
    });

    it("applies className and style props", () => {
      renderWithAnimation(
        <ScrollReveal className="custom-class" style={{ color: "red" }}>
          <div>Reveal Content</div>
        </ScrollReveal>
      );
      const element = screen.getByTestId("motion-div");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("accepts animation preset as string", () => {
      renderWithAnimation(
        <ScrollReveal animation="slideUp">
          <div>Reveal Content</div>
        </ScrollReveal>
      );
      expect(screen.getByText("Reveal Content")).toBeInTheDocument();
    });
  });

  describe("ScrollParallax", () => {
    it("renders children", () => {
      renderWithAnimation(
        <ScrollParallax>
          <div>Parallax Content</div>
        </ScrollParallax>
      );
      expect(screen.getByText("Parallax Content")).toBeInTheDocument();
    });

    it("accepts speed prop", () => {
      renderWithAnimation(
        <ScrollParallax speed={0.8}>
          <div>Parallax Content</div>
        </ScrollParallax>
      );
      expect(screen.getByText("Parallax Content")).toBeInTheDocument();
    });

    it("accepts direction prop", () => {
      renderWithAnimation(
        <ScrollParallax direction="horizontal">
          <div>Parallax Content</div>
        </ScrollParallax>
      );
      expect(screen.getByText("Parallax Content")).toBeInTheDocument();
    });
  });

  describe("ScrollProgress", () => {
    it("renders correctly", () => {
      renderWithAnimation(<ScrollProgress />);
      // Get all motion-divs and select the parent one (with position: fixed)
      const progressBars = screen.getAllByTestId("motion-div");
      const progressBar = progressBars.find(el => el.style.position === "fixed");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle({ position: "fixed", top: "0px", left: "0px" });
    });

    it("accepts custom thickness", () => {
      renderWithAnimation(<ScrollProgress thickness={8} />);
      // Get all motion-divs and select the parent one (with position: fixed)
      const progressBars = screen.getAllByTestId("motion-div");
      const progressBar = progressBars.find(el => el.style.position === "fixed");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle({ height: "8px" });
    });
  });

  describe("ScrollContainer", () => {
    it("renders children", () => {
      renderWithAnimation(
        <ScrollContainer>
          <div>Item 1</div>
          <div>Item 2</div>
        </ScrollContainer>
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("accepts stagger prop", () => {
      renderWithAnimation(
        <ScrollContainer stagger={0.2}>
          <div>Item 1</div>
          <div>Item 2</div>
        </ScrollContainer>
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  describe("ScrollScale", () => {
    it("renders children", () => {
      renderWithAnimation(
        <ScrollScale>
          <div>Scale Content</div>
        </ScrollScale>
      );
      expect(screen.getByText("Scale Content")).toBeInTheDocument();
    });

    it("accepts startScale and endScale props", () => {
      renderWithAnimation(
        <ScrollScale startScale={0.5} endScale={2}>
          <div>Scale Content</div>
        </ScrollScale>
      );
      expect(screen.getByText("Scale Content")).toBeInTheDocument();
    });
  });

  describe("ScrollTextReveal", () => {
    it("renders text content", () => {
      renderWithAnimation(
        <ScrollTextReveal text="Revealing text" />
      );
      // Text is split into words, so check for individual words
      expect(screen.getByText("Revealing")).toBeInTheDocument();
      expect(screen.getByText("text")).toBeInTheDocument();
    });

    it("accepts stagger prop", () => {
      renderWithAnimation(
        <ScrollTextReveal text="Revealing text" stagger={0.1} />
      );
      // Text is split into words, so check for individual words
      expect(screen.getByText("Revealing")).toBeInTheDocument();
      expect(screen.getByText("text")).toBeInTheDocument();
    });
  });
});