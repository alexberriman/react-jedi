import { describe, it, expect, beforeEach, vi } from "vitest";
import { render as reactRender } from "@testing-library/react";
import { render } from "../../../lib/render";
import type { CarouselDef } from "../../../types/components/carousel";

// Mock IntersectionObserver and ResizeObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

describe("CarouselComponent", () => {
  beforeEach(() => {
    // Setup observer mocks
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
  });
  it("should render carousel items with proper keys when children are arrays", () => {
    const spec: CarouselDef = {
      type: "Carousel",
      showArrows: false, // Disable arrows to simplify the test
      children: {
        type: "CarouselContent",
        children: [
          {
            type: "CarouselItem",
            children: [
              {
                type: "Box",
                children: "Item 1",
              },
              {
                type: "Box",
                children: "Item 2",
              },
            ],
          },
          {
            type: "CarouselItem",
            children: {
              type: "Box",
              children: "Single Item",
            },
          },
        ],
      },
    };

    // This should not throw a warning about missing keys
    const rendered = render(spec);
    if (!rendered) {
      throw new Error("Failed to render carousel");
    }
    const { container } = reactRender(rendered);
    
    // Verify carousel structure is rendered
    const carousel = container.querySelector('[data-slot="carousel"]');
    expect(carousel).toBeTruthy();
    
    // Find carousel items within the carousel content
    const carouselItems = carousel?.querySelectorAll('[data-slot="carousel-item"]');
    
    // Debug: log the actual HTML to see what's being rendered
    if (carouselItems && carouselItems.length !== 2) {
      console.log('Actual carousel items:', carouselItems.length);
      for (const [index, item] of carouselItems.entries()) {
        console.log(`Item ${index}:`, item.textContent);
      }
    }
    
    expect(carouselItems).toHaveLength(2);
  });

  it("should handle dynamic arrays of carousel items", () => {
    const items = Array.from({ length: 3 }).map((_, i) => ({
      type: "CarouselItem" as const,
      children: {
        type: "Box" as const,
        children: `Item ${i + 1}`,
      },
    }));

    const spec: CarouselDef = {
      type: "Carousel",
      showArrows: false,
      children: {
        type: "CarouselContent",
        children: items,
      },
    };

    const rendered = render(spec);
    if (!rendered) {
      throw new Error("Failed to render carousel");
    }
    const { container } = reactRender(rendered);
    
    // Verify all items are rendered
    const carousel = container.querySelector('[data-slot="carousel"]');
    const carouselItems = carousel?.querySelectorAll('[data-slot="carousel-item"]');
    expect(carouselItems).toHaveLength(3);
  });

  it("should handle mixed content types in carousel items", () => {
    const spec: CarouselDef = {
      type: "Carousel",
      showArrows: false,
      children: {
        type: "CarouselContent",
        children: [
          {
            type: "CarouselItem",
            children: "String content",
          },
          {
            type: "CarouselItem",
            children: {
              type: "Text",
              children: "Component content",
            },
          },
          {
            type: "CarouselItem",
            children: [
              {
                type: "Text",
                children: "Array item 1",
              },
              {
                type: "Text",
                children: "Array item 2",
              },
            ],
          },
        ],
      },
    };

    const rendered = render(spec);
    if (!rendered) {
      throw new Error("Failed to render carousel");
    }
    const { container } = reactRender(rendered);
    
    // Verify all carousel items are rendered
    const carousel = container.querySelector('[data-slot="carousel"]');
    const carouselItems = carousel?.querySelectorAll('[data-slot="carousel-item"]');
    expect(carouselItems).toHaveLength(3);
    
    // Verify content is rendered correctly
    expect(container.textContent).toContain("String content");
    expect(container.textContent).toContain("Component content");
    expect(container.textContent).toContain("Array item 1");
    expect(container.textContent).toContain("Array item 2");
  });
});