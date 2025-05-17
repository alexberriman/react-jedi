import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  MicrodataElement,
  MicrodataProperty,
  BreadcrumbMicrodata,
  FAQMicrodata,
} from "./microdata-element";
import type { MicrodataSchema } from "./microdata";

describe("MicrodataElement", () => {
  it("should render basic microdata element", () => {
    const schema: MicrodataSchema = {
      type: "Person",
      properties: {
        name: "John Doe",
      },
    };

    const { container } = render(<MicrodataElement schema={schema} />);

    const element = container.firstChild as HTMLElement;
    expect(element.hasAttribute("itemscope")).toBe(true);
    expect(element.getAttribute("itemtype")).toBe("https://schema.org/Person");
  });

  it("should render with custom element type", () => {
    const schema: MicrodataSchema = {
      type: "Article",
      properties: {},
    };

    const { container } = render(<MicrodataElement schema={schema} as="article" />);

    const element = container.firstChild as HTMLElement;
    expect(element.tagName.toLowerCase()).toBe("article");
  });

  it("should apply className and style", () => {
    const schema: MicrodataSchema = {
      type: "Product",
      properties: {},
    };

    const { container } = render(
      <MicrodataElement schema={schema} className="product-item" style={{ color: "red" }} />
    );

    const element = container.firstChild as HTMLElement;
    expect(element.className).toBe("product-item");
    expect(element.style.color).toBe("red");
  });

  it("should render nested microdata properties", () => {
    const schema: MicrodataSchema = {
      type: "Organization",
      properties: {
        name: "Test Company",
        address: {
          type: "PostalAddress",
          properties: {
            streetAddress: "123 Main St",
            addressLocality: "Anytown",
          },
        },
      },
    };

    const { container } = render(<MicrodataElement schema={schema} />);

    const nameElement = container.querySelector('[itemprop="name"]');
    expect(nameElement?.textContent).toBe("Test Company");

    const addressElement = container.querySelector('[itemtype="https://schema.org/PostalAddress"]');
    expect(addressElement).toBeTruthy();

    const streetElement = container.querySelector('[itemprop="streetAddress"]');
    expect(streetElement?.textContent).toBe("123 Main St");
  });

  it("should render array properties", () => {
    const schema: MicrodataSchema = {
      type: "Article",
      properties: {
        keywords: ["react", "microdata", "seo"],
      },
    };

    const { container } = render(<MicrodataElement schema={schema} />);

    const keywordElements = container.querySelectorAll('[itemprop="keywords"]');
    expect(keywordElements).toHaveLength(3);
    expect(keywordElements[0].textContent).toBe("react");
    expect(keywordElements[1].textContent).toBe("microdata");
    expect(keywordElements[2].textContent).toBe("seo");
  });
});

describe("MicrodataProperty", () => {
  it("should render property with text content", () => {
    const { container } = render(<MicrodataProperty name="author">John Doe</MicrodataProperty>);

    const element = container.firstChild as HTMLElement;
    expect(element.getAttribute("itemprop")).toBe("author");
    expect(element.textContent).toBe("John Doe");
  });

  it("should render as meta tag when content is provided", () => {
    const { container } = render(<MicrodataProperty name="datePublished" content="2024-01-01" />);

    const element = container.firstChild as HTMLElement;
    expect(element.tagName.toLowerCase()).toBe("meta");
    expect(element.getAttribute("itemprop")).toBe("datePublished");
    expect(element.getAttribute("content")).toBe("2024-01-01");
  });

  it("should use custom element type", () => {
    const { container } = render(
      <MicrodataProperty name="headline" as="h1">
        Test Headline
      </MicrodataProperty>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.tagName.toLowerCase()).toBe("h1");
    expect(element.getAttribute("itemprop")).toBe("headline");
  });
});

describe("BreadcrumbMicrodata", () => {
  it("should render breadcrumb microdata", () => {
    const items = [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Product Name" },
    ];

    const { container } = render(<BreadcrumbMicrodata items={items} />);

    const list = container.firstChild as HTMLElement;
    expect(list.tagName.toLowerCase()).toBe("ol");
    expect(list.hasAttribute("itemscope")).toBe(true);
    expect(list.getAttribute("itemtype")).toBe("https://schema.org/BreadcrumbList");

    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(3);

    // Check first item with link
    const firstItem = listItems[0];
    expect(firstItem.getAttribute("itemprop")).toBe("itemListElement");
    expect(firstItem.getAttribute("itemtype")).toBe("https://schema.org/ListItem");

    const firstLink = firstItem.querySelector("a");
    expect(firstLink?.getAttribute("itemid")).toBe("/");
    expect(firstLink?.getAttribute("href")).toBe("/");
    expect(firstLink?.querySelector('[itemprop="name"]')?.textContent).toBe("Home");

    const firstPosition = firstItem.querySelector('meta[itemprop="position"]');
    expect(firstPosition?.getAttribute("content")).toBe("1");

    // Check last item without link
    const lastItem = listItems[2];
    const lastName = lastItem.querySelector('[itemprop="name"]');
    expect(lastName?.textContent).toBe("Product Name");
    expect(lastItem.querySelector("a")).toBeNull();
  });

  it("should apply custom className", () => {
    const items = [{ name: "Home", url: "/" }];

    const { container } = render(<BreadcrumbMicrodata items={items} className="breadcrumb-nav" />);

    const list = container.firstChild as HTMLElement;
    expect(list.className).toBe("breadcrumb-nav");
  });
});

describe("FAQMicrodata", () => {
  it("should render FAQ microdata", () => {
    const questions = [
      { question: "What is React?", answer: "A JavaScript library for building UIs" },
      { question: "What is microdata?", answer: "A way to embed metadata in HTML" },
    ];

    const { container } = render(<FAQMicrodata questions={questions} />);

    const faqElement = container.firstChild as HTMLElement;
    expect(faqElement.hasAttribute("itemscope")).toBe(true);
    expect(faqElement.getAttribute("itemtype")).toBe("https://schema.org/FAQPage");

    const questionElements = container.querySelectorAll('[itemtype="https://schema.org/Question"]');
    expect(questionElements).toHaveLength(2);

    // Check first question
    const firstQuestion = questionElements[0];
    expect(firstQuestion.getAttribute("itemprop")).toBe("mainEntity");

    const firstQuestionText = firstQuestion.querySelector('[itemprop="name"]');
    expect(firstQuestionText?.textContent).toBe("What is React?");

    const firstAnswer = firstQuestion.querySelector('[itemtype="https://schema.org/Answer"]');
    expect(firstAnswer?.getAttribute("itemprop")).toBe("acceptedAnswer");

    const firstAnswerText = firstAnswer?.querySelector('[itemprop="text"]');
    expect(firstAnswerText?.textContent).toBe("A JavaScript library for building UIs");
  });

  it("should apply custom className", () => {
    const questions = [{ question: "Q1", answer: "A1" }];

    const { container } = render(<FAQMicrodata questions={questions} className="faq-section" />);

    const faqElement = container.firstChild as HTMLElement;
    expect(faqElement.className).toBe("faq-section");
  });
});
