import React from "react";
import {
  MicrodataElement,
  MicrodataProperty,
  BreadcrumbMicrodata,
  FAQMicrodata,
  createOrganizationMicrodata,
  createProductMicrodata,
  useMicrodata,
  useValidateMicrodata,
} from "@alexberriman/react-jedi";

export function MicrodataDemo() {
  // Example microdata schemas
  const organizationSchema = createOrganizationMicrodata({
    name: "Banja Software",
    url: "https://banja.dev",
    description: "Cutting-edge web solutions",
    logo: "https://banja.dev/logo.png",
    sameAs: ["https://github.com/banja", "https://twitter.com/banja"],
    contactPoint: {
      telephone: "+1-555-0123",
      contactType: "Customer Support",
    },
    address: {
      streetAddress: "123 Tech Boulevard",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94105",
      addressCountry: "US",
    },
  });

  const productSchema = createProductMicrodata({
    name: "React Jedi Library",
    description: "Server-driven UI library for React",
    image: ["https://banja.dev/react-jedi-hero.png"],
    brand: { name: "Banja" },
    offers: {
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 42,
    },
  });

  // Track microdata for debugging
  useMicrodata([organizationSchema, productSchema]);
  useValidateMicrodata();

  return (
    <div className="space-y-12 p-8">
      <section>
        <h1 className="text-3xl font-bold mb-8">Microdata Examples</h1>

        {/* Breadcrumb Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Breadcrumb Navigation</h2>
          <BreadcrumbMicrodata
            items={[
              { name: "Home", url: "/" },
              { name: "Examples", url: "/examples" },
              { name: "SEO Microdata" },
            ]}
            className="flex space-x-2 text-sm text-gray-600"
          />
        </div>

        {/* Organization Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Organization Information</h2>
          <MicrodataElement schema={organizationSchema} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold">
              <MicrodataProperty name="name">Banja Software</MicrodataProperty>
            </h3>
            <p>
              <MicrodataProperty name="description">Cutting-edge web solutions</MicrodataProperty>
            </p>
            <MicrodataProperty name="url" content="https://banja.dev" />
          </MicrodataElement>
        </div>

        {/* Product Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Product with Reviews</h2>
          <MicrodataElement
            schema={productSchema}
            as="article"
            className="p-4 bg-blue-50 rounded-lg"
          >
            <h3 className="font-bold text-xl">
              <MicrodataProperty name="name">React Jedi Library</MicrodataProperty>
            </h3>
            <p className="text-gray-700">
              <MicrodataProperty name="description">
                Server-driven UI library for React
              </MicrodataProperty>
            </p>
          </MicrodataElement>
        </div>

        {/* FAQ Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <FAQMicrodata
            questions={[
              {
                question: "What is microdata?",
                answer:
                  "Microdata is a way to embed structured data directly into HTML elements using special attributes.",
              },
              {
                question: "When should I use microdata vs JSON-LD?",
                answer:
                  "JSON-LD is generally preferred for React apps as it's cleaner and easier to manage. Use microdata when you need the data to be part of the visible HTML.",
              },
              {
                question: "Does Google support microdata?",
                answer:
                  "Yes, Google supports both microdata and JSON-LD formats for structured data.",
              },
            ]}
            className="space-y-4"
          />
        </div>

        {/* Article Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article with Author</h2>
          <article
            itemScope
            itemType="https://schema.org/Article"
            className="p-4 bg-green-50 rounded-lg"
          >
            <h3 itemProp="headline" className="font-bold text-xl">
              Introduction to Server-Driven UI
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>By</span>
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">Alex Thompson</span>
              </span>
              <span>•</span>
              <time itemProp="datePublished" dateTime="2024-05-18">
                May 18, 2024
              </time>
            </div>
            <p itemProp="description" className="mt-2">
              Learn how server-driven UI can revolutionize your React applications with dynamic,
              flexible interfaces that adapt to your needs.
            </p>
            <meta itemProp="image" content="https://banja.dev/sdui-article.jpg" />
          </article>
        </div>

        {/* Event Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Event Information</h2>
          <div
            itemScope
            itemType="https://schema.org/Event"
            className="p-4 bg-purple-50 rounded-lg"
          >
            <h3 itemProp="name" className="font-bold text-xl">
              React Jedi Workshop
            </h3>
            <p itemProp="description">
              Master server-driven UI with React Jedi in this hands-on workshop
            </p>
            <div className="mt-2 text-sm">
              <time itemProp="startDate" dateTime="2024-06-15T14:00">
                June 15, 2024 at 2:00 PM
              </time>
            </div>
            <div itemProp="location" itemScope itemType="https://schema.org/Place" className="mt-2">
              <span itemProp="name">Tech Hub Conference Center</span>
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">456 Innovation Drive</span>,
                <span itemProp="addressLocality">San Francisco</span>,
                <span itemProp="addressRegion">CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Example for completeness */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recipe Example</h2>
          <div
            itemScope
            itemType="https://schema.org/Recipe"
            className="p-4 bg-yellow-50 rounded-lg"
          >
            <h3 itemProp="name" className="font-bold text-xl">
              Server-Driven UI Recipe
            </h3>
            <p itemProp="description">The perfect recipe for building dynamic React applications</p>
            <div className="mt-2">
              <span className="font-semibold">Prep Time:</span>
              <time itemProp="prepTime" dateTime="PT15M">
                {" "}
                15 minutes
              </time>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Ingredients:</span>
              <ul className="list-disc list-inside">
                <li itemProp="recipeIngredient">React 19</li>
                <li itemProp="recipeIngredient">React Jedi library</li>
                <li itemProp="recipeIngredient">JSON specifications</li>
                <li itemProp="recipeIngredient">TypeScript for type safety</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
