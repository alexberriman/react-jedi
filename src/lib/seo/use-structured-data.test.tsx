import { describe, it, expect, afterEach } from "vitest";
import { renderHook } from "@testing-library/react/pure";
import { useStructuredData } from "./use-structured-data";
import { removeJsonLdFromDocument } from "./structured-data";
import type { OrganizationSchema, ArticleSchema } from "./structured-data";

describe("useStructuredData", () => {
  afterEach(() => {
    removeJsonLdFromDocument();
  });

  it("should add structured data to document on mount", () => {
    const schema: OrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Test Company",
    };

    renderHook(() => useStructuredData(schema));

    const script = document.querySelector('script[data-structured-data="true"]');
    expect(script).toBeTruthy();
    expect(script?.getAttribute("type")).toBe("application/ld+json");

    const content = JSON.parse(script!.textContent!);
    expect(content.name).toBe("Test Company");
  });

  it("should remove structured data from document on unmount", () => {
    const schema: OrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Test Company",
    };

    const { unmount } = renderHook(() => useStructuredData(schema));

    expect(document.querySelector('script[data-structured-data="true"]')).toBeTruthy();

    unmount();

    expect(document.querySelector('script[data-structured-data="true"]')).toBeNull();
  });

  it("should handle multiple schemas", () => {
    const schemas: [OrganizationSchema, ArticleSchema] = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Company",
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Test Article",
        author: "John Doe",
        datePublished: "2024-01-01",
      },
    ];

    renderHook(() => useStructuredData(schemas));

    const scripts = document.querySelectorAll('script[data-structured-data="true"]');
    expect(scripts).toHaveLength(2);

    const contents = [...scripts].map((s) => JSON.parse(s.textContent!));
    expect(contents.some((c) => c["@type"] === "Organization")).toBe(true);
    expect(contents.some((c) => c["@type"] === "Article")).toBe(true);
  });

  it("should handle undefined schema", () => {
    renderHook(() => useStructuredData(undefined));

    const scripts = document.querySelectorAll('script[data-structured-data="true"]');
    expect(scripts).toHaveLength(0);
  });

  it("should update schema when it changes", () => {
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

    const { rerender } = renderHook(
      ({ schema }: { schema: OrganizationSchema }) => useStructuredData(schema),
      {
        initialProps: { schema: schema1 },
      }
    );

    let scripts = document.querySelectorAll('script[data-structured-data="true"]');
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0]!.textContent!).name).toBe("Company 1");

    rerender({ schema: schema2 });

    scripts = document.querySelectorAll('script[data-structured-data="true"]');
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0]!.textContent!).name).toBe("Company 2");
  });
});
