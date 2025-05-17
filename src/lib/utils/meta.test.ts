import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { setPageMetadata } from "./meta";

describe("setPageMetadata", () => {
  // Store original values
  let originalTitle: string;
  let originalMeta: Record<string, string>;

  beforeEach(() => {
    // Save original values
    originalTitle = document.title;
    originalMeta = {};

    // Save original meta content
    const metaTags = document.querySelectorAll("meta");
    for (const tag of metaTags) {
      const name = tag.getAttribute("name") || tag.getAttribute("property");
      if (name) {
        originalMeta[name] = tag.content;
      }
    }

    // Clean up document head for testing
    document.head.innerHTML = "";
  });

  afterEach(() => {
    // Restore original state
    document.title = originalTitle;
    document.head.innerHTML = "";
  });

  it("should set the document title", () => {
    setPageMetadata({ title: "Test Page" });
    expect(document.title).toBe("Test Page");
  });

  it("should append suffix to title when provided", () => {
    setPageMetadata({ title: "Test Page" }, { titleSuffix: " - My App" });
    expect(document.title).toBe("Test Page - My App");
  });

  it("should use default title when title is empty", () => {
    setPageMetadata({ title: "" }, { defaultTitle: "Default App" });
    expect(document.title).toBe("Default App");
  });

  it("should set meta description", () => {
    setPageMetadata({ title: "Test", description: "Test description" });
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe("Test description");
  });

  it("should set meta keywords", () => {
    setPageMetadata({
      title: "Test",
      keywords: ["react", "typescript", "testing"],
    });
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords?.getAttribute("content")).toBe("react, typescript, testing");
  });

  it("should set meta author", () => {
    setPageMetadata({ title: "Test", author: "John Doe" });
    const metaAuthor = document.querySelector('meta[name="author"]');
    expect(metaAuthor?.getAttribute("content")).toBe("John Doe");
  });

  it("should set Open Graph meta tags", () => {
    setPageMetadata({
      title: "Test",
      ogTitle: "OG Title",
      ogDescription: "OG Description",
      ogImage: "https://example.com/image.jpg",
    });

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');

    expect(ogTitle?.getAttribute("content")).toBe("OG Title");
    expect(ogDescription?.getAttribute("content")).toBe("OG Description");
    expect(ogImage?.getAttribute("content")).toBe("https://example.com/image.jpg");
  });

  it("should set Twitter Card meta tags", () => {
    setPageMetadata({
      title: "Test",
      twitterCard: "summary_large_image",
      twitterTitle: "Twitter Title",
      twitterDescription: "Twitter Description",
      twitterImage: "https://example.com/twitter.jpg",
    });

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');

    expect(twitterCard?.getAttribute("content")).toBe("summary_large_image");
    expect(twitterTitle?.getAttribute("content")).toBe("Twitter Title");
    expect(twitterDescription?.getAttribute("content")).toBe("Twitter Description");
    expect(twitterImage?.getAttribute("content")).toBe("https://example.com/twitter.jpg");
  });

  it("should set canonical URL", () => {
    setPageMetadata({
      title: "Test",
      canonicalUrl: "https://example.com/page",
    });

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink?.getAttribute("href")).toBe("https://example.com/page");
  });

  it("should update existing meta tags", () => {
    // Create initial meta tag
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Initial description";
    document.head.append(metaDescription);

    // Update it
    setPageMetadata({
      title: "Test",
      description: "Updated description",
    });

    const updatedMeta = document.querySelector('meta[name="description"]');
    expect(updatedMeta?.getAttribute("content")).toBe("Updated description");
  });

  it("should handle minimal metadata object", () => {
    setPageMetadata({ title: "" });
    expect(document.title).toBe("React Application");
  });

  it("should handle partial metadata", () => {
    setPageMetadata({
      title: "Partial Test",
      description: "Only title and description",
    });

    expect(document.title).toBe("Partial Test");
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe("Only title and description");

    // Check that other meta tags weren't created
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaAuthor = document.querySelector('meta[name="author"]');
    expect(metaKeywords).toBeNull();
    expect(metaAuthor).toBeNull();
  });

  it("should set simple favicon", () => {
    setPageMetadata({
      title: "Test",
      favicon: "/favicon.ico",
    });

    const faviconLink = document.querySelector('link[rel="icon"]');
    expect(faviconLink?.getAttribute("href")).toBe("/favicon.ico");
  });

  it("should set favicon set", () => {
    setPageMetadata({
      title: "Test",
      favicon: {
        default: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        icon16: "/favicon-16x16.png",
        icon32: "/favicon-32x32.png",
        manifest: "/site.webmanifest",
      },
    });

    // Get all favicon elements using attribute selectors
    const defaultFavicon = document.querySelector('link[rel="icon"]:not([sizes])');
    const appleFavicon = document.querySelector('link[rel="apple-touch-icon"]');
    const icon16 = document.querySelector('link[rel="icon"][sizes="16x16"]');
    const icon32 = document.querySelector('link[rel="icon"][sizes="32x32"]');
    const manifest = document.querySelector('link[rel="manifest"]');

    expect(defaultFavicon?.getAttribute("href")).toBe("/favicon.ico");
    expect(appleFavicon?.getAttribute("href")).toBe("/apple-touch-icon.png");
    expect(icon16?.getAttribute("href")).toBe("/favicon-16x16.png");
    expect(icon32?.getAttribute("href")).toBe("/favicon-32x32.png");
    expect(manifest?.getAttribute("href")).toBe("/site.webmanifest");
  });

  it("should update existing favicon", () => {
    // Create initial favicon
    const initialFavicon = document.createElement("link");
    initialFavicon.rel = "icon";
    initialFavicon.href = "/old-favicon.ico";
    document.head.append(initialFavicon);

    // Update it
    setPageMetadata({
      title: "Test",
      favicon: "/new-favicon.ico",
    });

    const updatedFavicon = document.querySelector('link[rel="icon"]');
    expect(updatedFavicon?.getAttribute("href")).toBe("/new-favicon.ico");
  });
});
