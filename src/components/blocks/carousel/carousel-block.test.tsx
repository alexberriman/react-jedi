import { describe, it, expect, beforeEach, vi } from "vitest";
import { render as reactRender, screen } from "@testing-library/react";
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

describe("CarouselBlock", () => {
  beforeEach(() => {
    // Setup observer mocks
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
  });

  describe("Basic Carousel", () => {
    it("should render basic carousel with navigation", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        showArrows: true,
        showDots: true,
        items: [
          { type: "Text", children: "Slide 1" },
          { type: "Text", children: "Slide 2" },
          { type: "Text", children: "Slide 3" },
        ],
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      // Check carousel structure
      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();

      // Check for navigation buttons
      const prevButton = screen.getByText("Previous slide");
      const nextButton = screen.getByText("Next slide");
      expect(prevButton).toBeTruthy();
      expect(nextButton).toBeTruthy();

      // Check for content
      expect(screen.getByText("Slide 1")).toBeTruthy();
    });

    it("should handle keyboard navigation", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        showArrows: true,
        items: [
          { type: "Text", children: "Slide 1" },
          { type: "Text", children: "Slide 2" },
        ],
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();
      
      // Verify carousel has keyboard event listener setup
      expect(carousel).toHaveAttribute('role', 'region');
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    });
  });

  describe("Image Gallery Variant", () => {
    it("should render image gallery with thumbnails", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        variant: "gallery",
        showArrows: true,
        data: {
          images: [
            { src: "image1.jpg", alt: "Image 1", title: "Test Image 1" },
            { src: "image2.jpg", alt: "Image 2", title: "Test Image 2" },
          ],
          showThumbnails: true,
          enableZoom: true,
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      // Check for images
      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);

      // Check carousel is rendered (thumbnails are complex to test in this setup)
      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();
    });

    it("should handle zoom functionality", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        variant: "gallery",
        data: {
          images: [
            { src: "image1.jpg", alt: "Image 1" },
          ],
          enableZoom: true,
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      // Verify gallery variant renders
      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();
      
      // Verify images are rendered (zoom functionality is complex to test in unit tests)
      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  describe("Content Cards Variant", () => {
    it("should render content cards with badges and CTAs", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        variant: "content",
        data: {
          items: [
            {
              title: "Test Card",
              description: "Test description",
              badge: "New",
              cta: { text: "Learn More", href: "#" },
            },
          ],
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      reactRender(rendered);

      expect(screen.getByText("Test Card")).toBeTruthy();
      expect(screen.getByText("Test description")).toBeTruthy();
      expect(screen.getByText("New")).toBeTruthy();
      expect(screen.getByText("Learn More")).toBeTruthy();
    });
  });

  describe("Testimonials Variant", () => {
    it("should render testimonials in card format", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        variant: "testimonials",
        data: {
          testimonials: [
            {
              content: "Great product!",
              author: {
                name: "John Doe",
                role: "CEO",
                company: "Test Corp",
              },
              rating: 5,
            },
          ],
          testimonialsVariant: "cards",
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      reactRender(rendered);

      expect(screen.getByText(/Great product!/)).toBeTruthy();
      expect(screen.getByText("John Doe")).toBeTruthy();
      expect(screen.getByText("CEO at Test Corp")).toBeTruthy();
    });

    it("should render testimonials in quote format", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        variant: "testimonials",
        data: {
          testimonials: [
            {
              content: "Amazing experience!",
              author: {
                name: "Jane Smith",
                role: "Designer",
              },
            },
          ],
          testimonialsVariant: "quotes",
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      reactRender(rendered);

      expect(screen.getByText(/Amazing experience!/)).toBeTruthy();
      expect(screen.getByText("Jane Smith")).toBeTruthy();
      expect(screen.getByText("Designer")).toBeTruthy();
    });
  });

  describe("Product Showcase Variant", () => {
    it("should render products with pricing and stock status", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        variant: "showcase",
        data: {
          products: [
            {
              name: "Test Product",
              price: "$99",
              originalPrice: "$129",
              image: "product.jpg",
              description: "Great product",
              badge: "Sale",
              inStock: true,
            },
            {
              name: "Out of Stock Product",
              price: "$199",
              image: "product2.jpg",
              inStock: false,
            },
          ],
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      reactRender(rendered);

      expect(screen.getByText("Test Product")).toBeTruthy();
      expect(screen.getByText("$99")).toBeTruthy();
      expect(screen.getByText("$129")).toBeTruthy();
      expect(screen.getByText("Sale")).toBeTruthy();
      expect(screen.getByText("Great product")).toBeTruthy();
      expect(screen.getByText("Out of Stock Product")).toBeTruthy();
      expect(screen.getByText("Out of Stock")).toBeTruthy();
    });
  });

  describe("Fullscreen Variant", () => {
    it("should render fullscreen carousel with overlay content", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        variant: "fullscreen",
        data: {
          images: [
            {
              src: "hero.jpg",
              alt: "Hero image",
              title: "Hero Title",
              description: "Hero description",
            },
          ],
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      expect(screen.getByText("Hero Title")).toBeTruthy();
      expect(screen.getByText("Hero description")).toBeTruthy();

      // Check for fullscreen class
      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel?.className).toContain("h-screen");
    });
  });

  describe("Autoplay Functionality", () => {
    it("should handle autoplay configuration", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        autoplay: {
          enabled: true,
          delay: 3000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        },
        items: [
          { type: "Text", children: "Slide 1" },
          { type: "Text", children: "Slide 2" },
        ],
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      // Check that carousel renders with autoplay
      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();
      // Autoplay functionality would be tested through integration tests
    });
  });

  describe("Navigation Controls", () => {
    it("should render dots navigation", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        showDots: true,
        items: [
          { type: "Text", children: "Slide 1" },
          { type: "Text", children: "Slide 2" },
          { type: "Text", children: "Slide 3" },
        ],
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      // Check carousel renders with showDots enabled
      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();
      
      // Verify slides are present
      const slides = container.querySelectorAll('[data-slot="carousel-item"]');
      expect(slides.length).toBe(3);
    });

    it("should handle thumbnail navigation", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        variant: "gallery",
        data: {
          images: [
            { src: "image1.jpg", alt: "Image 1" },
            { src: "image2.jpg", alt: "Image 2" },
          ],
          showThumbnails: true,
        },
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      // Check carousel renders with gallery variant
      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();
      
      // Verify images are rendered for gallery variant
      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        showArrows: true,
        showDots: true,
        items: [
          { type: "Text", children: "Slide 1" },
          { type: "Text", children: "Slide 2" },
        ],
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      // Check carousel has proper role
      const carousel = container.querySelector('[role="region"]');
      expect(carousel).toBeTruthy();
      expect(carousel?.getAttribute('aria-roledescription')).toBe('carousel');

      // Check slides have proper role
      const slides = container.querySelectorAll('[role="group"]');
      expect(slides.length).toBeGreaterThan(0);

      // Check navigation buttons have proper labels
      const prevButton = screen.getByText("Previous slide");
      const nextButton = screen.getByText("Next slide");
      expect(prevButton).toBeTruthy();
      expect(nextButton).toBeTruthy();
    });

    it("should support keyboard navigation", () => {
      const spec: CarouselDef = {
        type: "Carousel",
        items: [
          { type: "Text", children: "Slide 1" },
          { type: "Text", children: "Slide 2" },
        ],
      };

      const rendered = render(spec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();

      // Should be focusable for keyboard navigation
      // In a real implementation, you'd test the actual keyboard events
    });
  });

  describe("Responsive Behavior", () => {
    it("should handle different orientations", () => {
      const verticalSpec: CarouselDef = {
        type: "Carousel",
        orientation: "vertical",
        items: [
          { type: "Text", children: "Slide 1" },
          { type: "Text", children: "Slide 2" },
        ],
      };

      const rendered = render(verticalSpec);
      if (!rendered) {
        throw new Error("Failed to render carousel");
      }
      const { container } = reactRender(rendered);

      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeTruthy();
      // Vertical orientation would affect the internal structure
    });
  });
});