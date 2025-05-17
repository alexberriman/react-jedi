import { describe, it, expect } from "vitest";
import {
  generateMicrodataAttributes,
  toHtmlAttributes,
  generatePropertyAttributes,
  createBreadcrumbMicrodata,
  createOrganizationMicrodata,
  createArticleMicrodata,
  createProductMicrodata,
  SCHEMA_TYPES,
} from "./microdata";

describe("generateMicrodataAttributes", () => {
  it("should generate basic microdata attributes", () => {
    const schema = {
      type: "Organization",
      properties: {
        name: "Test Company",
      },
    };

    const attributes = generateMicrodataAttributes(schema);

    expect(attributes.itemScope).toBe(true);
    expect(attributes.itemType).toBe(SCHEMA_TYPES.Organization);
  });

  it("should handle custom schema types", () => {
    const schema = {
      type: "https://schema.org/CustomType",
      properties: {},
    };

    const attributes = generateMicrodataAttributes(schema);

    expect(attributes.itemType).toBe("https://schema.org/CustomType");
  });

  it("should include itemId when provided", () => {
    const schema = {
      type: "Person",
      properties: { name: "John Doe" },
      id: "https://example.com/person/john-doe",
    };

    const attributes = generateMicrodataAttributes(schema);

    expect(attributes.itemId).toBe("https://example.com/person/john-doe");
  });

  it("should include itemRef when provided", () => {
    const schema = {
      type: "Article",
      properties: {},
      ref: "author-info",
    };

    const attributes = generateMicrodataAttributes(schema);

    expect(attributes.itemRef).toBe("author-info");
  });
});

describe("toHtmlAttributes", () => {
  it("should convert microdata attributes to HTML attributes", () => {
    const attributes = {
      itemScope: true,
      itemType: "https://schema.org/Product",
      itemProp: "name",
      itemId: "product-123",
      itemRef: "reviews",
    };

    const htmlAttrs = toHtmlAttributes(attributes);

    expect(htmlAttrs.itemscope).toBe(true);
    expect(htmlAttrs.itemtype).toBe("https://schema.org/Product");
    expect(htmlAttrs.itemprop).toBe("name");
    expect(htmlAttrs.itemid).toBe("product-123");
    expect(htmlAttrs.itemref).toBe("reviews");
  });

  it("should omit undefined attributes", () => {
    const attributes = {
      itemScope: true,
      itemType: "https://schema.org/Person",
    };

    const htmlAttrs = toHtmlAttributes(attributes);

    expect(htmlAttrs.itemscope).toBe(true);
    expect(htmlAttrs.itemtype).toBe("https://schema.org/Person");
    expect(htmlAttrs.itemprop).toBeUndefined();
    expect(htmlAttrs.itemid).toBeUndefined();
    expect(htmlAttrs.itemref).toBeUndefined();
  });
});

describe("generatePropertyAttributes", () => {
  it("should generate property attributes", () => {
    const attributes = generatePropertyAttributes("author");

    expect(attributes.itemProp).toBe("author");
    expect(attributes.itemScope).toBeUndefined();
    expect(attributes.itemType).toBeUndefined();
  });
});

describe("createBreadcrumbMicrodata", () => {
  it("should create breadcrumb microdata structure", () => {
    const items = [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Product Name" },
    ];

    const microdata = createBreadcrumbMicrodata(items);

    expect(microdata.type).toBe("BreadcrumbList");
    expect(microdata.properties.itemListElement).toHaveLength(3);

    const firstItem = microdata.properties.itemListElement[0];
    expect(firstItem.type).toBe("ListItem");
    expect(firstItem.properties.position).toBe(1);
    expect(firstItem.properties.item.properties.name).toBe("Home");
    expect(firstItem.properties.item.id).toBe("/");

    const lastItem = microdata.properties.itemListElement[2];
    expect(lastItem.properties.position).toBe(3);
    expect(lastItem.properties.item.properties.name).toBe("Product Name");
    expect(lastItem.properties.item.id).toBeUndefined();
  });
});

describe("createOrganizationMicrodata", () => {
  it("should create basic organization microdata", () => {
    const data = {
      name: "Test Company",
      url: "https://example.com",
    };

    const microdata = createOrganizationMicrodata(data);

    expect(microdata.type).toBe("Organization");
    expect(microdata.properties.name).toBe("Test Company");
    expect(microdata.properties.url).toBe("https://example.com");
  });

  it("should include optional fields when provided", () => {
    const data = {
      name: "Test Company",
      description: "A test company",
      sameAs: ["https://twitter.com/testcompany"],
      contactPoint: {
        telephone: "+1-555-0123",
        contactType: "customer service",
      },
      address: {
        streetAddress: "123 Main St",
        addressLocality: "Anytown",
        addressRegion: "CA",
        postalCode: "90210",
        addressCountry: "US",
      },
    };

    const microdata = createOrganizationMicrodata(data);

    expect(microdata.properties.description).toBe("A test company");
    expect(microdata.properties.sameAs).toEqual(["https://twitter.com/testcompany"]);

    const contactPoint = microdata.properties.contactPoint;
    expect(contactPoint.type).toBe("ContactPoint");
    expect(contactPoint.properties.telephone).toBe("+1-555-0123");

    const address = microdata.properties.address;
    expect(address.type).toBe("PostalAddress");
    expect(address.properties.streetAddress).toBe("123 Main St");
  });
});

describe("createArticleMicrodata", () => {
  it("should create article microdata with string author", () => {
    const data = {
      headline: "Test Article",
      author: "John Doe",
      datePublished: "2024-01-01",
    };

    const microdata = createArticleMicrodata(data);

    expect(microdata.type).toBe("Article");
    expect(microdata.properties.headline).toBe("Test Article");
    expect(microdata.properties.author).toBe("John Doe");
    expect(microdata.properties.datePublished).toBe("2024-01-01");
  });

  it("should create article microdata with person author", () => {
    const data = {
      headline: "Test Article",
      author: { name: "John Doe", url: "https://example.com/johndoe" },
      datePublished: "2024-01-01",
      publisher: {
        name: "Test Publisher",
        logo: "https://example.com/logo.png",
      },
    };

    const microdata = createArticleMicrodata(data);

    const author = microdata.properties.author;
    expect(author.type).toBe("Person");
    expect(author.properties.name).toBe("John Doe");
    expect(author.properties.url).toBe("https://example.com/johndoe");

    const publisher = microdata.properties.publisher;
    expect(publisher.type).toBe("Organization");
    expect(publisher.properties.name).toBe("Test Publisher");
    expect(publisher.properties.logo).toBe("https://example.com/logo.png");
  });
});

describe("createProductMicrodata", () => {
  it("should create basic product microdata", () => {
    const data = {
      name: "Test Product",
      description: "A great product",
    };

    const microdata = createProductMicrodata(data);

    expect(microdata.type).toBe("Product");
    expect(microdata.properties.name).toBe("Test Product");
    expect(microdata.properties.description).toBe("A great product");
  });

  it("should handle brand as string", () => {
    const data = {
      name: "Test Product",
      brand: "Test Brand",
    };

    const microdata = createProductMicrodata(data);

    expect(microdata.properties.brand).toBe("Test Brand");
  });

  it("should handle brand as organization", () => {
    const data = {
      name: "Test Product",
      brand: { name: "Test Brand" },
    };

    const microdata = createProductMicrodata(data);

    const brand = microdata.properties.brand;
    expect(brand.type).toBe("Organization");
    expect(brand.properties.name).toBe("Test Brand");
  });

  it("should include offer and rating information", () => {
    const data = {
      name: "Test Product",
      offers: {
        price: 19.99,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        ratingValue: 4.5,
        reviewCount: 120,
      },
    };

    const microdata = createProductMicrodata(data);

    const offers = microdata.properties.offers;
    expect(offers.type).toBe("Offer");
    expect(offers.properties.price).toBe(19.99);
    expect(offers.properties.priceCurrency).toBe("USD");

    const rating = microdata.properties.aggregateRating;
    expect(rating.type).toBe("AggregateRating");
    expect(rating.properties.ratingValue).toBe(4.5);
    expect(rating.properties.reviewCount).toBe(120);
  });
});
