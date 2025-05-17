/**
 * Tests for rich snippet generators
 */

import { describe, it, expect } from "vitest";
import {
  generateProductSnippet,
  generateArticleSnippet,
  generateFAQSnippet,
  createBreadcrumbItems,
  createFAQItems,
  createHowToSteps,
  formatDuration,
  validateAvailability,
  toScriptTag,
  mergeSnippets,
} from "./generators";

describe("Rich Snippet Generators", () => {
  describe("generateProductSnippet", () => {
    it("should generate a valid product snippet", () => {
      const product = generateProductSnippet({
        name: "Test Product",
        description: "A test product description",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: 99.99,
          availability: "https://schema.org/InStock",
        },
      });

      expect(product["@context"]).toBe("https://schema.org");
      expect(product["@type"]).toBe("Product");
      expect(product.name).toBe("Test Product");
      expect(product.offers?.price).toBe(99.99);
    });

    it("should include optional fields when provided", () => {
      const product = generateProductSnippet({
        name: "Premium Product",
        brand: {
          "@type": "Brand",
          name: "Test Brand",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.5,
          ratingCount: 100,
        },
      });

      expect(product.brand?.name).toBe("Test Brand");
      expect(product.aggregateRating?.ratingValue).toBe(4.5);
    });
  });

  describe("generateArticleSnippet", () => {
    it("should generate a valid article snippet", () => {
      const article = generateArticleSnippet({
        headline: "Test Article",
        datePublished: "2024-01-01",
        author: {
          "@type": "Person",
          name: "John Doe",
        },
        publisher: {
          "@type": "Organization",
          name: "Test Publisher",
        },
      });

      expect(article["@type"]).toBe("Article");
      expect(article.headline).toBe("Test Article");
      expect(article.author.name).toBe("John Doe");
    });

    it("should allow different article types", () => {
      const newsArticle = generateArticleSnippet(
        {
          headline: "Breaking News",
          datePublished: "2024-01-01",
          author: { "@type": "Person", name: "Reporter" },
          publisher: { "@type": "Organization", name: "News Corp" },
        },
        "NewsArticle"
      );

      expect(newsArticle["@type"]).toBe("NewsArticle");
    });
  });

  describe("generateFAQSnippet", () => {
    it("should generate a valid FAQ snippet", () => {
      const faq = generateFAQSnippet({
        mainEntity: [
          {
            "@type": "Question",
            name: "What is this?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This is a test",
            },
          },
        ],
      });

      expect(faq["@type"]).toBe("FAQPage");
      expect(faq.mainEntity[0].name).toBe("What is this?");
      expect(faq.mainEntity[0].acceptedAnswer.text).toBe("This is a test");
    });
  });

  describe("Helper Functions", () => {
    it("createBreadcrumbItems should create valid breadcrumb items", () => {
      const items = createBreadcrumbItems([
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" },
        { name: "Item" },
      ]);

      expect(items).toHaveLength(3);
      expect(items[0].position).toBe(1);
      expect(items[0].item).toBe("/");
      expect(items[2].item).toBeUndefined(); // Last item shouldn't have URL
    });

    it("createFAQItems should create valid FAQ items", () => {
      const faqs = createFAQItems([
        { question: "Q1?", answer: "A1" },
        { question: "Q2?", answer: "A2" },
      ]);

      expect(faqs).toHaveLength(2);
      expect(faqs[0].name).toBe("Q1?");
      expect(faqs[0].acceptedAnswer.text).toBe("A1");
    });

    it("createHowToSteps should create valid HowTo steps", () => {
      const steps = createHowToSteps([
        { name: "Step 1", text: "Do this" },
        { name: "Step 2", text: "Do that", image: "step2.jpg" },
      ]);

      expect(steps).toHaveLength(2);
      expect(steps[0].name).toBe("Step 1");
      expect(steps[1].image).toBe("step2.jpg");
    });

    it("formatDuration should format minutes correctly", () => {
      expect(formatDuration(30)).toBe("PT30M");
      expect(formatDuration(90)).toBe("PT1H30M");
      expect(formatDuration(120)).toBe("PT2H");
    });

    it("validateAvailability should format valid values", () => {
      expect(validateAvailability("InStock")).toBe("https://schema.org/InStock");
      expect(validateAvailability("OutOfStock")).toBe("https://schema.org/OutOfStock");
      expect(validateAvailability("custom")).toBe("custom");
    });
  });

  describe("Output Functions", () => {
    it("toScriptTag should generate valid script tag", () => {
      const snippet = { "@type": "Product", name: "Test" };
      const script = toScriptTag(snippet);

      expect(script).toContain('<script type="application/ld+json">');
      expect(script).toContain('"@type": "Product"');
      expect(script).toContain("</script>");
    });

    it("mergeSnippets should handle single snippet", () => {
      const snippet = { "@type": "Product", name: "Test" };
      const merged = mergeSnippets(snippet);

      expect(merged).toContain('"@type": "Product"');
    });

    it("mergeSnippets should handle multiple snippets", () => {
      const snippet1 = { "@type": "Product", name: "Product1" };
      const snippet2 = { "@type": "Organization", name: "Org1" };
      const merged = mergeSnippets(snippet1, snippet2);

      expect(merged).toContain("@graph");
      expect(merged).toContain("Product1");
      expect(merged).toContain("Org1");
    });
  });
});
