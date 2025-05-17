import { describe, it, expect, afterEach } from "vitest";
import {
  generateJsonLd,
  addJsonLdToDocument,
  removeJsonLdFromDocument,
  updateJsonLdInDocument,
  type OrganizationSchema,
  type ArticleSchema,
  type ProductSchema,
  type BreadcrumbSchema,
  type FAQSchema,
} from "./structured-data";

describe("structured-data", () => {
  afterEach(() => {
    // Clean up any scripts added during tests
    removeJsonLdFromDocument();
  });

  describe("generateJsonLd", () => {
    it("should generate JSON-LD for Organization schema", () => {
      const schema: OrganizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Company",
        url: "https://example.com",
        logo: "https://example.com/logo.png",
        sameAs: ["https://twitter.com/example", "https://facebook.com/example"],
      };

      const jsonLd = generateJsonLd(schema);
      const parsed = JSON.parse(jsonLd);

      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"]).toBe("Organization");
      expect(parsed.name).toBe("Test Company");
      expect(parsed.url).toBe("https://example.com");
      expect(parsed.sameAs).toEqual([
        "https://twitter.com/example",
        "https://facebook.com/example",
      ]);
    });

    it("should generate JSON-LD for Article schema", () => {
      const schema: ArticleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Test Article",
        author: "John Doe",
        datePublished: "2024-01-01",
        description: "This is a test article",
      };

      const jsonLd = generateJsonLd(schema);
      const parsed = JSON.parse(jsonLd);

      expect(parsed["@type"]).toBe("Article");
      expect(parsed.headline).toBe("Test Article");
      expect(parsed.author).toBe("John Doe");
      expect(parsed.datePublished).toBe("2024-01-01");
    });

    it("should generate JSON-LD for Product schema", () => {
      const schema: ProductSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Test Product",
        description: "A great product",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: 29.99,
          availability: "https://schema.org/InStock",
        },
      };

      const jsonLd = generateJsonLd(schema);
      const parsed = JSON.parse(jsonLd);

      expect(parsed["@type"]).toBe("Product");
      expect(parsed.name).toBe("Test Product");
      expect(parsed.offers.price).toBe(29.99);
      expect(parsed.offers.priceCurrency).toBe("USD");
    });

    it("should generate JSON-LD for BreadcrumbList schema", () => {
      const schema: BreadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://example.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: "https://example.com/products",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Product Name",
          },
        ],
      };

      const jsonLd = generateJsonLd(schema);
      const parsed = JSON.parse(jsonLd);

      expect(parsed["@type"]).toBe("BreadcrumbList");
      expect(parsed.itemListElement).toHaveLength(3);
      expect(parsed.itemListElement[0].position).toBe(1);
      expect(parsed.itemListElement[2].name).toBe("Product Name");
    });

    it("should generate JSON-LD for FAQ schema", () => {
      const schema: FAQSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is structured data?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Structured data is a standardized format for providing information about a page.",
            },
          },
          {
            "@type": "Question",
            name: "Why use JSON-LD?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JSON-LD is recommended by Google and is easy to implement.",
            },
          },
        ],
      };

      const jsonLd = generateJsonLd(schema);
      const parsed = JSON.parse(jsonLd);

      expect(parsed["@type"]).toBe("FAQPage");
      expect(parsed.mainEntity).toHaveLength(2);
      expect(parsed.mainEntity[0]["@type"]).toBe("Question");
      expect(parsed.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    });
  });

  describe("DOM manipulation", () => {
    it("should add JSON-LD script to document head", () => {
      const schema: OrganizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Company",
      };

      addJsonLdToDocument(schema);

      const script = document.querySelector('script[data-structured-data="true"]');
      expect(script).toBeTruthy();
      expect(script?.getAttribute("type")).toBe("application/ld+json");

      const content = script?.textContent;
      expect(content).toBeTruthy();
      const parsed = JSON.parse(content!);
      expect(parsed.name).toBe("Test Company");
    });

    it("should remove JSON-LD scripts from document", () => {
      const schema: OrganizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Company",
      };

      addJsonLdToDocument(schema);
      expect(document.querySelector('script[data-structured-data="true"]')).toBeTruthy();

      removeJsonLdFromDocument();
      expect(document.querySelector('script[data-structured-data="true"]')).toBeNull();
    });

    it("should update JSON-LD in document", () => {
      const schema1: OrganizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Company 1",
      };

      const schema2: OrganizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Company 2",
      };

      addJsonLdToDocument(schema1);
      let script = document.querySelector('script[data-structured-data="true"]');
      let parsed = JSON.parse(script!.textContent!);
      expect(parsed.name).toBe("Company 1");

      updateJsonLdInDocument(schema2);
      script = document.querySelector('script[data-structured-data="true"]');
      parsed = JSON.parse(script!.textContent!);
      expect(parsed.name).toBe("Company 2");

      // Should only have one script
      const scripts = document.querySelectorAll('script[data-structured-data="true"]');
      expect(scripts).toHaveLength(1);
    });

    it("should handle multiple schemas", () => {
      const schema1: OrganizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Company",
      };

      const schema2: ArticleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Test Article",
        author: "John Doe",
        datePublished: "2024-01-01",
      };

      addJsonLdToDocument(schema1);
      addJsonLdToDocument(schema2);

      const scripts = document.querySelectorAll('script[data-structured-data="true"]');
      expect(scripts).toHaveLength(2);

      const contents = [...scripts].map((s) => JSON.parse(s.textContent!));
      expect(contents.some((c) => c["@type"] === "Organization")).toBe(true);
      expect(contents.some((c) => c["@type"] === "Article")).toBe(true);
    });
  });
});
