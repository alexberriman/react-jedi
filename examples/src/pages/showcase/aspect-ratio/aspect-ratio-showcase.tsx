import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function AspectRatioShowcase() {
  usePageMetadata({
    title: "AspectRatio Component",
    description:
      "A comprehensive showcase of the React Jedi AspectRatio component for maintaining consistent aspect ratios for images, videos, and custom content.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "ratios", label: "Common Ratios" },
    { id: "images", label: "With Images" },
    { id: "videos", label: "With Videos" },
    { id: "custom", label: "Custom Content" },
    { id: "responsive", label: "Responsive Sizing" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Real-world Examples" },
  ];

  // Basic aspect ratio specification
  const basicAspectRatioSpec: UISpecification = {
    type: "aspect-ratio",
    ratio: 16 / 9,
    className: "w-full md:w-[600px] mx-auto overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800",
    children: [
      {
        type: "Center",
        className: "w-full h-full",
        children: [
          { 
            type: "Text", 
            children: "16:9 Aspect Ratio",
            size: "large",
            weight: "semibold"
          }
        ]
      }
    ]
  };

  // Common ratios
  const commonRatiosSpec: UISpecification = {
    type: "Grid",
    columns: { base: 1, sm: 2, md: 3 },
    gap: "6",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "aspect-ratio",
            ratio: 1,
            className: "overflow-hidden rounded-lg bg-purple-100 dark:bg-purple-900",
            children: [
              {
                type: "Center",
                className: "w-full h-full",
                children: [{ type: "Text", children: "1:1 Square", weight: "semibold" }]
              }
            ]
          },
          { type: "Text", children: "Perfect for avatars and thumbnails", size: "small", variant: "muted" }
        ]
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "aspect-ratio",
            ratio: 16 / 9,
            className: "overflow-hidden rounded-lg bg-blue-100 dark:bg-blue-900",
            children: [
              {
                type: "Center",
                className: "w-full h-full",
                children: [{ type: "Text", children: "16:9 Wide", weight: "semibold" }]
              }
            ]
          },
          { type: "Text", children: "Standard video and modern displays", size: "small", variant: "muted" }
        ]
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "aspect-ratio",
            ratio: 4 / 3,
            className: "overflow-hidden rounded-lg bg-green-100 dark:bg-green-900",
            children: [
              {
                type: "Center",
                className: "w-full h-full",
                children: [{ type: "Text", children: "4:3 Standard", weight: "semibold" }]
              }
            ]
          },
          { type: "Text", children: "Traditional displays and presentations", size: "small", variant: "muted" }
        ]
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "aspect-ratio",
            ratio: 21 / 9,
            className: "overflow-hidden rounded-lg bg-orange-100 dark:bg-orange-900",
            children: [
              {
                type: "Center",
                className: "w-full h-full",
                children: [{ type: "Text", children: "21:9 Ultra-wide", weight: "semibold" }]
              }
            ]
          },
          { type: "Text", children: "Cinematic and ultra-wide displays", size: "small", variant: "muted" }
        ]
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "aspect-ratio",
            ratio: 9 / 16,
            className: "overflow-hidden rounded-lg bg-pink-100 dark:bg-pink-900",
            children: [
              {
                type: "Center",
                className: "w-full h-full",
                children: [{ type: "Text", children: "9:16 Portrait", weight: "semibold" }]
              }
            ]
          },
          { type: "Text", children: "Mobile stories and vertical video", size: "small", variant: "muted" }
        ]
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "aspect-ratio",
            ratio: 2 / 1,
            className: "overflow-hidden rounded-lg bg-teal-100 dark:bg-teal-900",
            children: [
              {
                type: "Center",
                className: "w-full h-full",
                children: [{ type: "Text", children: "2:1 Panoramic", weight: "semibold" }]
              }
            ]
          },
          { type: "Text", children: "Wide banners and headers", size: "small", variant: "muted" }
        ]
      }
    ]
  };

  // With images
  const imagesSpec: UISpecification = {
    type: "Grid",
    columns: { base: 1, md: 2 },
    gap: "6",
    children: [
      {
        type: "Stack",
        spacing: "3",
        children: [
          {
            type: "aspect-ratio",
            ratio: 16 / 9,
            className: "overflow-hidden rounded-lg",
            children: [
              {
                type: "Image",
                src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80",
                alt: "Mountain landscape",
                objectFit: "cover",
                className: "w-full h-full"
              }
            ]
          },
          { type: "Text", children: "Landscape image in 16:9", weight: "medium" }
        ]
      },
      {
        type: "Stack",
        spacing: "3",
        children: [
          {
            type: "aspect-ratio",
            ratio: 1,
            className: "overflow-hidden rounded-lg",
            children: [
              {
                type: "Image",
                src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&dpr=2&q=80",
                alt: "Cute dog portrait",
                objectFit: "cover",
                className: "w-full h-full"
              }
            ]
          },
          { type: "Text", children: "Square image 1:1", weight: "medium" }
        ]
      }
    ]
  };

  // With videos
  const videosSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "aspect-ratio",
        ratio: 16 / 9,
        className: "w-full max-w-2xl mx-auto overflow-hidden rounded-lg bg-black",
        children: [
          {
            type: "Center",
            className: "w-full h-full",
            children: [
              {
                type: "Stack",
                spacing: "4",
                align: "center",
                children: [
                  {
                    type: "Text",
                    children: "▶️",
                    className: "text-6xl"
                  },
                  {
                    type: "Text",
                    children: "Video Player Placeholder",
                    className: "text-white",
                    weight: "medium"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "Text",
        children: "AspectRatio ensures video players maintain correct dimensions",
        variant: "muted",
        className: "text-center"
      }
    ]
  };

  // Custom content
  const customContentSpec: UISpecification = {
    type: "Grid",
    columns: { base: 1, md: 2 },
    gap: "6",
    children: [
      {
        type: "aspect-ratio",
        ratio: 4 / 3,
        className: "overflow-hidden rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700",
        children: [
          {
            type: "Stack",
            spacing: "4",
            className: "w-full h-full p-6",
            align: "center",
            justify: "center",
            children: [
              {
                type: "Heading",
                level: 3,
                children: "Custom Content"
              },
              {
                type: "Text",
                children: "Any content can be placed inside AspectRatio",
                variant: "muted"
              },
              {
                type: "Button",
                children: "Click Me",
                variant: "outline",
                size: "sm"
              }
            ]
          }
        ]
      },
      {
        type: "aspect-ratio",
        ratio: 16 / 10,
        className: "overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500",
        children: [
          {
            type: "Center",
            className: "w-full h-full text-white",
            children: [
              {
                type: "Stack",
                spacing: "2",
                align: "center",
                children: [
                  {
                    type: "Text",
                    children: "🎨",
                    className: "text-5xl"
                  },
                  {
                    type: "Text",
                    children: "Gradient Background",
                    weight: "bold",
                    size: "large"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  // Responsive sizing
  const responsiveSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "aspect-ratio",
        ratio: 16 / 9,
        className: "w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800",
        children: [
          {
            type: "Center",
            className: "w-full h-full",
            children: [
              {
                type: "Text",
                children: "Responsive Width",
                weight: "medium"
              }
            ]
          }
        ]
      },
      {
        type: "Text",
        children: "Resize your browser to see the responsive behavior",
        variant: "muted",
        className: "text-center"
      }
    ]
  };

  // Real-world examples
  const examplesSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      // Product card example
      {
        type: "Card",
        className: "w-full max-w-sm mx-auto",
        children: [
          {
            type: "aspect-ratio",
            ratio: 4 / 3,
            children: [
              {
                type: "Image",
                src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&dpr=2&q=80",
                alt: "Premium watch",
                objectFit: "cover",
                className: "w-full h-full"
              }
            ]
          },
          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: "Premium Watch" },
              { type: "CardDescription", children: "$599.00" }
            ]
          },
          {
            type: "CardContent",
            children: [
              { type: "Text", children: "Elegant timepiece with leather strap", size: "small" }
            ]
          },
          {
            type: "CardFooter",
            children: [
              { type: "Button", children: "Add to Cart", className: "w-full" }
            ]
          }
        ]
      },
      // Gallery example
      {
        type: "Stack",
        spacing: "4",
        children: [
          { type: "Heading", level: 3, children: "Photo Gallery" },
          {
            type: "Grid",
            columns: { base: 2, md: 3 },
            gap: "4",
            children: [
              {
                type: "aspect-ratio",
                ratio: 1,
                className: "overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
                children: [
                  {
                    type: "Image",
                    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&dpr=2&q=80",
                    alt: "Nature photo 1",
                    objectFit: "cover",
                    className: "w-full h-full"
                  }
                ]
              },
              {
                type: "aspect-ratio",
                ratio: 1,
                className: "overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
                children: [
                  {
                    type: "Image",
                    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&dpr=2&q=80",
                    alt: "Nature photo 2",
                    objectFit: "cover",
                    className: "w-full h-full"
                  }
                ]
              },
              {
                type: "aspect-ratio",
                ratio: 1,
                className: "overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
                children: [
                  {
                    type: "Image",
                    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&dpr=2&q=80",
                    alt: "Nature photo 3",
                    objectFit: "cover",
                    className: "w-full h-full"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className="flex">
      {/* Sidebar Table of Contents */}
      <aside className="w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 p-6">
        <nav>
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
            On This Page
          </h3>
          <ul className="space-y-1">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.id);
                    document.querySelector(`#${item.id}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block py-1 px-2 text-sm rounded transition-colors ${
                    activeSection === item.id
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Links */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-3">Quick Links</h4>
          <div className="space-y-2">
            <Link
              to="/showcase"
              className="block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              ← Back to Showcase
            </Link>
            <Link
              to="/documentation"
              className="block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl">
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-20">
          <h1 className="text-4xl font-bold mb-4">AspectRatio Component</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            A container that maintains a specific aspect ratio for its content, perfect for images, videos, and responsive layouts.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The AspectRatio component ensures consistent dimensions across different screen sizes and content types. It&apos;s essential for maintaining visual harmony in responsive designs, preventing layout shifts, and creating predictable spaces for media content.
          </p>
        </section>

        {/* Basic Usage Section */}
        <section id="basic" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Wrap any content in an AspectRatio component and specify the desired ratio as a number or fraction.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(basicAspectRatioSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(basicAspectRatioSpec, null, 2)}
            </pre>
          </details>
        </section>

        {/* Common Ratios Section */}
        <section id="ratios" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Common Aspect Ratios</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Different aspect ratios serve different purposes. Here are the most commonly used ratios in modern web design.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(commonRatiosSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(commonRatiosSpec, null, 2)}
            </pre>
          </details>
        </section>

        {/* With Images Section */}
        <section id="images" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">With Images</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            AspectRatio is perfect for ensuring images maintain their dimensions regardless of their natural size. Use with <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">objectFit: "cover"</code> for best results.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(imagesSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(imagesSpec, null, 2)}
            </pre>
          </details>
        </section>

        {/* With Videos Section */}
        <section id="videos" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">With Videos</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Maintain consistent video player dimensions across different devices and screen sizes.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(videosSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(videosSpec, null, 2)}
            </pre>
          </details>
        </section>

        {/* Custom Content Section */}
        <section id="custom" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Custom Content</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            AspectRatio can contain any type of content, not just media. Use it to create consistent card layouts, placeholders, or decorative elements.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(customContentSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(customContentSpec, null, 2)}
            </pre>
          </details>
        </section>

        {/* Responsive Sizing Section */}
        <section id="responsive" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Responsive Sizing</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Control the width of the AspectRatio container using responsive utility classes. The aspect ratio will be maintained at all sizes.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(responsiveSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(responsiveSpec, null, 2)}
            </pre>
          </details>
        </section>

        {/* Props Section */}
        <section id="props" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            AspectRatio component accepts the following properties:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 dark:border-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">
                    Prop
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">
                    Type
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">
                    Default
                  </th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="p-3 font-mono text-sm">ratio</td>
                  <td className="p-3 text-sm">number</td>
                  <td className="p-3 text-sm">1</td>
                  <td className="p-3 text-sm">The aspect ratio as a decimal (e.g., 16/9 or 1.777)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">className</td>
                  <td className="p-3 text-sm">string</td>
                  <td className="p-3 text-sm">undefined</td>
                  <td className="p-3 text-sm">Additional CSS classes for styling the container</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">children</td>
                  <td className="p-3 text-sm">React.ReactNode</td>
                  <td className="p-3 text-sm">undefined</td>
                  <td className="p-3 text-sm">Content to display within the aspect ratio container</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Real-world Examples Section */}
        <section id="examples" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Real-world Examples</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            See how AspectRatio enhances common UI patterns in production applications.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(examplesSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(examplesSpec, null, 2)}
            </pre>
          </details>
        </section>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <Link
              to="/showcase"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              ← Back to Component Showcase
            </Link>
            <Link
              to="/documentation"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              View Full Documentation →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}