import React from "react";
import { ExtendedHeadManager } from "@alexberriman/react-jedi";
import { CodeBlock } from "@/components/ui/code-block";
import type { OrganizationSchema, ArticleSchema, FAQSchema } from "@alexberriman/react-jedi";

export function StructuredDataDemo() {
  const organizationSchema: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "React Jedi",
    url: "https://reactjedi.com",
    logo: "https://reactjedi.com/logo.png",
    description: "A revolutionary Server-Driven UI library for React",
    sameAs: ["https://github.com/alexberriman/react-jedi", "https://twitter.com/reactjedi"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-0123",
      contactType: "technical support",
      availableLanguage: "English",
    },
  };

  const articleSchema: ArticleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Building Websites at Light Speed with React Jedi",
    author: {
      "@type": "Person",
      name: "John Developer",
      url: "https://johndeveloper.com",
    },
    datePublished: "2024-01-20",
    description: "Learn how React Jedi's Server-Driven UI approach revolutionizes web development",
    image: "https://reactjedi.com/blog/speed-article.jpg",
    publisher: {
      "@type": "Organization",
      name: "React Jedi Blog",
      logo: "https://reactjedi.com/logo.png",
    },
  };

  const faqSchema: FAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is React Jedi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "React Jedi is a cutting-edge Server-Driven UI library that allows you to build beautiful websites using JSON specifications.",
        },
      },
      {
        "@type": "Question",
        name: "How does structured data improve SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Structured data helps search engines understand your content better, potentially leading to rich snippets and improved search visibility.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <ExtendedHeadManager
        metadata={{
          title: "Structured Data Demo - React Jedi",
          description: "See how React Jedi implements structured data for better SEO",
          ogTitle: "React Jedi Structured Data",
          ogDescription: "Advanced SEO with JSON-LD structured data",
        }}
        structuredData={[organizationSchema, articleSchema, faqSchema]}
      />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Structured Data & SEO
          </h1>

          <p className="text-xl text-gray-700 mb-12 leading-relaxed">
            React Jedi includes built-in support for structured data using JSON-LD, helping search
            engines understand your content better and potentially improving your search visibility
            with rich snippets.
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Multiple Schemas on One Page
              </h2>
              <p className="text-gray-600 mb-6">
                This page includes Organization, Article, and FAQ structured data schemas. Check the
                page source or use Google&apos;s Rich Results Test to see them in action.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Active Schemas:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                    Organization Schema (React Jedi)
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    BlogPosting Schema (Article)
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    FAQPage Schema (Q&A)
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  The <code className="text-purple-600">ExtendedHeadManager</code> component accepts
                  structured data schemas and automatically injects them as JSON-LD scripts in the
                  document head.
                </p>
                <CodeBlock language="javascript">
                  {`<ExtendedHeadManager
  metadata={{
    title: "Your Page Title",
    description: "Page description"
  }}
  structuredData={[
    organizationSchema,
    articleSchema,
    faqSchema
  ]}
/>`}
                </CodeBlock>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Benefits of Structured Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">🌟 Rich Snippets</h3>
                  <p className="text-white/90">
                    Enhanced search results with ratings, images, and additional information
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">🔍 Better Understanding</h3>
                  <p className="text-white/90">
                    Help search engines understand your content context and relationships
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">📈 Improved CTR</h3>
                  <p className="text-white/90">
                    More attractive search results can lead to higher click-through rates
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">🎯 Voice Search</h3>
                  <p className="text-white/90">
                    Structured data helps with voice search queries and smart assistants
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Testing Your Structured Data
              </h2>
              <p className="text-gray-600 mb-6">
                Use these tools to validate your structured data implementation:
              </p>
              <div className="space-y-4">
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <h3 className="font-semibold text-blue-800">Google Rich Results Test</h3>
                  <p className="text-blue-600">
                    Test how your page appears in Google search results
                  </p>
                </a>
                <a
                  href="https://validator.schema.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <h3 className="font-semibold text-green-800">Schema.org Validator</h3>
                  <p className="text-green-600">Validate your structured data markup</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
