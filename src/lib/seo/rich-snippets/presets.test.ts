/**
 * Tests for rich snippet presets
 */

import { describe, it, expect } from "vitest";
import {
  createBlogPostSnippet,
  createEcommerceProductSnippet,
  createCompanySnippet,
  createLocalBusinessSnippet,
  createWebsiteBreadcrumbs,
  createFAQPageSnippet,
  createWebsiteWithSearch,
} from "./presets";

describe("Rich Snippet Presets", () => {
  describe("createBlogPostSnippet", () => {
    it("should create a valid blog post snippet", () => {
      const publishedDate = new Date("2024-01-15");
      const modifiedDate = new Date("2024-01-18");

      const snippet = createBlogPostSnippet({
        title: "Test Blog Post",
        description: "A test blog post description",
        author: "John Doe",
        publishedDate,
        modifiedDate,
        imageUrl: "https://example.com/image.jpg",
        organizationName: "Test Blog",
        organizationLogo: "https://example.com/logo.png",
        url: "https://example.com/blog/test",
      });

      expect(snippet["@type"]).toBe("BlogPosting");
      expect(snippet.headline).toBe("Test Blog Post");
      expect(snippet.author.name).toBe("John Doe");
      expect(snippet.datePublished).toBe(publishedDate.toISOString());
      expect(snippet.dateModified).toBe(modifiedDate.toISOString());
      expect(snippet.publisher.name).toBe("Test Blog");
      expect(snippet.publisher.logo?.url).toBe("https://example.com/logo.png");
    });

    it("should use published date for modified date if not provided", () => {
      const publishedDate = new Date("2024-01-15");

      const snippet = createBlogPostSnippet({
        title: "Test Blog Post",
        description: "A test description",
        author: "John Doe",
        publishedDate,
        organizationName: "Test Blog",
        url: "https://example.com/blog/test",
      });

      expect(snippet.dateModified).toBe(publishedDate.toISOString());
    });
  });

  describe("createEcommerceProductSnippet", () => {
    it("should create a valid e-commerce product snippet", () => {
      const snippet = createEcommerceProductSnippet({
        name: "Test Product",
        description: "A test product",
        price: 99.99,
        currency: "USD",
        availability: "InStock",
        brand: "Test Brand",
        images: ["image1.jpg", "image2.jpg"],
        rating: { value: 4.5, count: 100 },
        sku: "TEST-123",
        url: "https://example.com/product",
      });

      expect(snippet["@type"]).toBe("Product");
      expect(snippet.name).toBe("Test Product");
      expect(snippet.brand?.name).toBe("Test Brand");
      expect(snippet.offers?.price).toBe("99.99");
      expect(snippet.offers?.priceCurrency).toBe("USD");
      expect(snippet.offers?.availability).toBe("https://schema.org/InStock");
      expect(snippet.aggregateRating?.ratingValue).toBe(4.5);
      expect(snippet.aggregateRating?.ratingCount).toBe(100);
      expect(snippet.sku).toBe("TEST-123");
    });
  });

  describe("createCompanySnippet", () => {
    it("should create a valid organization snippet", () => {
      const snippet = createCompanySnippet({
        name: "Test Company",
        url: "https://example.com",
        logo: "https://example.com/logo.png",
        description: "A test company",
        socialProfiles: ["https://twitter.com/test", "https://facebook.com/test"],
        contactInfo: [
          { phone: "+1-555-0123", type: "customer service" },
          { phone: "+1-555-0124", email: "support@example.com", type: "technical support" },
        ],
        address: {
          street: "123 Main St",
          city: "Test City",
          state: "TS",
          postalCode: "12345",
          country: "US",
        },
      });

      expect(snippet["@type"]).toBe("Organization");
      expect(snippet.name).toBe("Test Company");
      expect(snippet.url).toBe("https://example.com");
      expect(snippet.logo).toBe("https://example.com/logo.png");
      expect(snippet.sameAs).toHaveLength(2);
      expect(snippet.contactPoint).toHaveLength(2);
      expect(snippet.contactPoint?.[0].telephone).toBe("+1-555-0123");
      expect(snippet.address?.streetAddress).toBe("123 Main St");
    });
  });

  describe("createLocalBusinessSnippet", () => {
    it("should create a valid local business snippet", () => {
      const snippet = createLocalBusinessSnippet({
        name: "Test Business",
        telephone: "+1-555-0123",
        address: {
          street: "123 Main St",
          city: "Test City",
          state: "TS",
          postalCode: "12345",
          country: "US",
        },
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
        priceRange: "$$",
        images: ["business1.jpg", "business2.jpg"],
        openingHours: [
          {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            days: ["Saturday"],
            opens: "10:00",
            closes: "16:00",
          },
        ],
        rating: { value: 4.8, count: 200 },
        url: "https://example.com",
      });

      expect(snippet["@type"]).toBe("LocalBusiness");
      expect(snippet.name).toBe("Test Business");
      expect(snippet.telephone).toBe("+1-555-0123");
      expect(snippet.address.streetAddress).toBe("123 Main St");
      expect(snippet.geo?.latitude).toBe(37.7749);
      expect(snippet.priceRange).toBe("$$");
      expect(snippet.openingHoursSpecification).toHaveLength(2);
      expect(snippet.aggregateRating?.ratingValue).toBe(4.8);
    });
  });

  describe("createWebsiteBreadcrumbs", () => {
    it("should create valid breadcrumb snippet", () => {
      const snippet = createWebsiteBreadcrumbs([
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" },
        { name: "Category", url: "/products/category" },
        { name: "Item" },
      ]);

      expect(snippet["@type"]).toBe("BreadcrumbList");
      expect(snippet.itemListElement).toHaveLength(4);
      expect(snippet.itemListElement[0].position).toBe(1);
      expect(snippet.itemListElement[0].name).toBe("Home");
      expect(snippet.itemListElement[3].item).toBeUndefined();
    });
  });

  describe("createFAQPageSnippet", () => {
    it("should create valid FAQ snippet", () => {
      const snippet = createFAQPageSnippet([
        { question: "Question 1?", answer: "Answer 1" },
        { question: "Question 2?", answer: "Answer 2" },
      ]);

      expect(snippet["@type"]).toBe("FAQPage");
      expect(snippet.mainEntity).toHaveLength(2);
      expect(snippet.mainEntity[0].name).toBe("Question 1?");
      expect(snippet.mainEntity[0].acceptedAnswer.text).toBe("Answer 1");
    });
  });

  describe("createWebsiteWithSearch", () => {
    it("should create website with search action snippet", () => {
      const snippet = createWebsiteWithSearch({
        name: "Test Website",
        url: "https://example.com",
        searchUrl: "https://example.com/search",
        logo: "https://example.com/logo.png",
      });

      expect(snippet["@type"]).toBe("WebSite");
      expect(snippet.name).toBe("Test Website");
      expect(snippet.url).toBe("https://example.com");
      expect(snippet.potentialAction["@type"]).toBe("SearchAction");
      expect(snippet.potentialAction.target.urlTemplate).toBe(
        "https://example.com/search?q={search_term_string}"
      );
      expect(snippet.publisher?.logo.url).toBe("https://example.com/logo.png");
    });

    it("should work without logo", () => {
      const snippet = createWebsiteWithSearch({
        name: "Test Website",
        url: "https://example.com",
        searchUrl: "https://example.com/search",
      });

      expect(snippet.publisher).toBeUndefined();
    });
  });
});
