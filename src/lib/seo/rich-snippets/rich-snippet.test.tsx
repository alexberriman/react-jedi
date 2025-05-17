/**
 * Tests for RichSnippet React component
 */

import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RichSnippet, withRichSnippet, useRichSnippet } from "./rich-snippet";
import { ProductSnippet, RichSnippet as RichSnippetType } from "./types";

describe("RichSnippet Component", () => {
  const mockProduct: ProductSnippet = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Test Product",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: 99.99,
    },
  };

  it("should render a script tag with JSON-LD", () => {
    const { container } = render(<RichSnippet snippet={mockProduct} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeTruthy();
    expect(script?.innerHTML).toContain('"@type":"Product"');
    expect(script?.innerHTML).toContain('"name":"Test Product"');
  });

  it("should handle array of snippets", () => {
    const snippets: RichSnippetType[] = [
      mockProduct,
      {
        "@context": "https://schema.org",
        "@type": "Organization" as const,
        name: "Test Org",
        url: "https://example.com",
      },
    ];

    const { container } = render(<RichSnippet snippet={snippets} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.innerHTML).toContain("@graph");
    expect(script?.innerHTML).toContain("Product");
    expect(script?.innerHTML).toContain("Organization");
  });

  it("should accept an id prop", () => {
    const { container } = render(<RichSnippet snippet={mockProduct} id="product-snippet" />);
    const script = container.querySelector("#product-snippet");

    expect(script).toBeTruthy();
  });
});

describe("useRichSnippet Hook", () => {
  const TestComponent: React.FC<{ snippet: RichSnippetType | RichSnippetType[] }> = ({
    snippet,
  }) => {
    const scriptContent = useRichSnippet(snippet);
    return <div data-testid="content">{scriptContent}</div>;
  };

  it("should generate JSON string from snippet", () => {
    const { container } = render(
      <TestComponent
        snippet={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Test Product",
        }}
      />
    );

    const element = container.querySelector('[data-testid="content"]');
    const content = element?.textContent;
    expect(content).toContain("Product");
    expect(content).toContain("Test Product");
  });

  it("should handle array of snippets", () => {
    const snippets: RichSnippetType[] = [
      { "@context": "https://schema.org", "@type": "Product", name: "Product1" },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Org1",
        url: "https://example.com",
      },
    ];

    const { container } = render(<TestComponent snippet={snippets} />);
    const element = container.querySelector('[data-testid="content"]');
    const content = element?.textContent;

    expect(content).toContain("@graph");
    expect(content).toContain("Product1");
    expect(content).toContain("Org1");
  });
});

describe("withRichSnippet HOC", () => {
  const BaseComponent: React.FC<{ title: string }> = ({ title }) => <div>{title}</div>;

  it("should inject rich snippet before component", () => {
    const EnhancedComponent = withRichSnippet(BaseComponent, (props: { title: string }) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: props.title,
    }));

    const { container } = render(<EnhancedComponent title="Test Product" />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeTruthy();
    expect(script?.innerHTML).toContain("Test Product");
    expect(container.textContent).toContain("Test Product");
  });

  it("should not render snippet if generator returns null", () => {
    const EnhancedComponent = withRichSnippet(BaseComponent, () => null);

    const { container } = render(<EnhancedComponent title="Test" />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeFalsy();
    expect(container.textContent).toContain("Test");
  });
});
