import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function CarouselShowcase() {
  usePageMetadata({
    title: "Carousel Component",
    description:
      "A comprehensive showcase of the React Jedi Carousel component with all variants, options, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Carousel" },
    { id: "with-arrows", label: "With Navigation Arrows" },
    { id: "with-dots", label: "With Pagination Dots" },
    { id: "autoplay", label: "Autoplay Carousel" },
    { id: "vertical", label: "Vertical Carousel" },
    { id: "multiple-slides", label: "Multiple Slides" },
    { id: "loop", label: "Infinite Loop" },
    { id: "drag-free", label: "Free Drag" },
    { id: "alignment", label: "Slide Alignment" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic carousel specification
  const basicSpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-sm",
    children: {
      type: "CarouselContent",
      children: Array.from({ length: 5 }).map((_, i) => ({
        type: "CarouselItem",
        children: {
          type: "Box",
          className: "p-1",
          children: {
            type: "Card",
            children: {
              type: "CardContent",
              className: "flex items-center justify-center p-6",
              children: {
                type: "Text",
                className: "text-4xl font-semibold",
                children: `${i + 1}`,
              },
            },
          },
        },
      })),
    },
  };

  // Carousel with arrows specification
  const withArrowsSpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-sm",
    showArrows: true,
    children: [
      {
        type: "CarouselContent",
        children: Array.from({ length: 5 }).map((_, i) => ({
          type: "CarouselItem",
          children: {
            type: "Box",
            className: "p-1",
            children: {
              type: "Card",
              children: {
                type: "CardContent",
                className: "flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900",
                children: {
                  type: "Text",
                  className: "text-2xl font-bold text-blue-600 dark:text-blue-400",
                  children: `Slide ${i + 1}`,
                },
              },
            },
          },
        })),
      },
      {
        type: "CarouselPrevious",
      },
      {
        type: "CarouselNext",
      },
    ],
  };

  // Carousel with dots specification
  const withDotsSpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-sm",
    showDots: true,
    children: {
      type: "CarouselContent",
      children: Array.from({ length: 4 }).map((_, i) => {
        const colors = ["purple", "green", "orange", "pink"];
        const color = colors[i];
        return {
          type: "CarouselItem",
          children: {
            type: "Box",
            className: "p-1",
            children: {
              type: "Card",
              children: {
                type: "CardContent",
                className: `flex items-center justify-center p-8 bg-gradient-to-br from-${color}-50 to-${color}-100 dark:from-${color}-950 dark:to-${color}-900`,
                children: [
                  {
                    type: "Text",
                    className: `text-3xl mb-2 text-${color}-600 dark:text-${color}-400`,
                    children: ["🎨", "🚀", "⭐", "🎯"][i],
                  },
                  {
                    type: "Text",
                    className: `text-lg font-semibold text-${color}-700 dark:text-${color}-300`,
                    children: ["Design", "Performance", "Quality", "Success"][i],
                  },
                ],
              },
            },
          },
        };
      }),
    },
  };

  // Autoplay carousel specification
  const autoplaySpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-sm",
    showArrows: true,
    autoplay: {
      enabled: true,
      delay: 3000,
      stopOnInteraction: true,
    },
    children: [
      {
        type: "CarouselContent",
        children: Array.from({ length: 4 }).map((_, i) => ({
          type: "CarouselItem",
          children: {
            type: "Box",
            className: "p-1",
            children: {
              type: "Card",
              children: {
                type: "CardContent",
                className: "flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950 dark:to-yellow-900",
                children: [
                  {
                    type: "Text",
                    className: "text-2xl mb-2",
                    children: "⏰",
                  },
                  {
                    type: "Text",
                    className: "text-lg font-semibold text-amber-700 dark:text-amber-300",
                    children: `Auto ${i + 1}`,
                  },
                  {
                    type: "Text",
                    className: "text-sm text-amber-600 dark:text-amber-400",
                    children: "3s delay",
                  },
                ],
              },
            },
          },
        })),
      },
      {
        type: "CarouselPrevious",
      },
      {
        type: "CarouselNext",
      },
    ],
  };

  // Vertical carousel specification
  const verticalSpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-xs",
    orientation: "vertical",
    showArrows: true,
    children: [
      {
        type: "CarouselContent",
        className: "h-60",
        children: Array.from({ length: 3 }).map((_, i) => ({
          type: "CarouselItem",
          className: "pt-1 md:basis-1/2",
          children: {
            type: "Box",
            className: "p-1",
            children: {
              type: "Card",
              children: {
                type: "CardContent",
                className: "flex items-center justify-center p-6",
                children: {
                  type: "Text",
                  className: "text-xl font-semibold",
                  children: `Vertical ${i + 1}`,
                },
              },
            },
          },
        })),
      },
      {
        type: "CarouselPrevious",
      },
      {
        type: "CarouselNext",
      },
    ],
  };

  // Multiple slides specification
  const multipleSlidesSpec: UISpecification = {
    type: "Carousel",
    className: "w-full",
    showArrows: true,
    options: {
      align: "start",
    },
    children: [
      {
        type: "CarouselContent",
        children: Array.from({ length: 8 }).map((_, i) => ({
          type: "CarouselItem",
          className: "md:basis-1/2 lg:basis-1/3",
          children: {
            type: "Box",
            className: "p-1",
            children: {
              type: "Card",
              children: {
                type: "CardContent",
                className: "flex items-center justify-center p-4",
                children: {
                  type: "Text",
                  className: "text-lg font-semibold",
                  children: `Item ${i + 1}`,
                },
              },
            },
          },
        })),
      },
      {
        type: "CarouselPrevious",
      },
      {
        type: "CarouselNext",
      },
    ],
  };

  // Infinite loop specification
  const loopSpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-sm",
    showArrows: true,
    options: {
      loop: true,
    },
    children: [
      {
        type: "CarouselContent",
        children: Array.from({ length: 3 }).map((_, i) => ({
          type: "CarouselItem",
          children: {
            type: "Box",
            className: "p-1",
            children: {
              type: "Card",
              children: {
                type: "CardContent",
                className: "flex flex-col items-center justify-center p-6 bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-950 dark:to-cyan-900",
                children: [
                  {
                    type: "Text",
                    className: "text-2xl mb-2",
                    children: "🔄",
                  },
                  {
                    type: "Text",
                    className: "text-lg font-semibold text-teal-700 dark:text-teal-300",
                    children: `Loop ${i + 1}`,
                  },
                ],
              },
            },
          },
        })),
      },
      {
        type: "CarouselPrevious",
      },
      {
        type: "CarouselNext",
      },
    ],
  };

  // Free drag specification
  const dragFreeSpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-sm",
    showArrows: true,
    options: {
      dragFree: true,
      containScroll: "trimSnaps",
    },
    children: [
      {
        type: "CarouselContent",
        children: Array.from({ length: 6 }).map((_, i) => ({
          type: "CarouselItem",
          className: "basis-1/3",
          children: {
            type: "Box",
            className: "p-1",
            children: {
              type: "Card",
              children: {
                type: "CardContent",
                className: "flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950 dark:to-pink-900",
                children: {
                  type: "Text",
                  className: "text-sm font-semibold text-rose-700 dark:text-rose-300",
                  children: `${i + 1}`,
                },
              },
            },
          },
        })),
      },
      {
        type: "CarouselPrevious",
      },
      {
        type: "CarouselNext",
      },
    ],
  };

  // Alignment examples specification
  const alignmentSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2 text-gray-600 dark:text-gray-400",
            children: "Start Alignment",
          },
          {
            type: "Carousel",
            className: "w-full max-w-sm",
            options: {
              align: "start",
            },
            children: {
              type: "CarouselContent",
              children: Array.from({ length: 3 }).map((_, i) => ({
                type: "CarouselItem",
                className: "basis-3/4",
                children: {
                  type: "Box",
                  className: "p-1",
                  children: {
                    type: "Card",
                    children: {
                      type: "CardContent",
                      className: "flex items-center justify-center p-4",
                      children: {
                        type: "Text",
                        className: "text-sm font-semibold",
                        children: `Start ${i + 1}`,
                      },
                    },
                  },
                },
              })),
            },
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2 text-gray-600 dark:text-gray-400",
            children: "Center Alignment",
          },
          {
            type: "Carousel",
            className: "w-full max-w-sm",
            options: {
              align: "center",
            },
            children: {
              type: "CarouselContent",
              children: Array.from({ length: 3 }).map((_, i) => ({
                type: "CarouselItem",
                className: "basis-3/4",
                children: {
                  type: "Box",
                  className: "p-1",
                  children: {
                    type: "Card",
                    children: {
                      type: "CardContent",
                      className: "flex items-center justify-center p-4",
                      children: {
                        type: "Text",
                        className: "text-sm font-semibold",
                        children: `Center ${i + 1}`,
                      },
                    },
                  },
                },
              })),
            },
          },
        ],
      },
    ],
  };

  // Product showcase example
  const productShowcaseSpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-2xl",
    showArrows: true,
    showDots: true,
    children: [
      {
        type: "CarouselContent",
        children: [
          {
            type: "CarouselItem",
            children: {
              type: "Card",
              className: "border-0",
              children: {
                type: "CardContent",
                className: "p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900",
                children: [
                  {
                    type: "Text",
                    className: "text-6xl mb-4",
                    children: "📱",
                  },
                  {
                    type: "Heading",
                    level: "h3",
                    className: "mb-2 text-2xl font-bold text-gray-900 dark:text-white",
                    children: "Mobile First",
                  },
                  {
                    type: "Text",
                    className: "text-gray-600 dark:text-gray-400",
                    children: "Responsive design that works on all devices",
                  },
                ],
              },
            },
          },
          {
            type: "CarouselItem",
            children: {
              type: "Card",
              className: "border-0",
              children: {
                type: "CardContent",
                className: "p-8 text-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900",
                children: [
                  {
                    type: "Text",
                    className: "text-6xl mb-4",
                    children: "⚡",
                  },
                  {
                    type: "Heading",
                    level: "h3",
                    className: "mb-2 text-2xl font-bold text-gray-900 dark:text-white",
                    children: "Lightning Fast",
                  },
                  {
                    type: "Text",
                    className: "text-gray-600 dark:text-gray-400",
                    children: "Optimized performance for the best user experience",
                  },
                ],
              },
            },
          },
          {
            type: "CarouselItem",
            children: {
              type: "Card",
              className: "border-0",
              children: {
                type: "CardContent",
                className: "p-8 text-center bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900",
                children: [
                  {
                    type: "Text",
                    className: "text-6xl mb-4",
                    children: "🎨",
                  },
                  {
                    type: "Heading",
                    level: "h3",
                    className: "mb-2 text-2xl font-bold text-gray-900 dark:text-white",
                    children: "Beautiful Design",
                  },
                  {
                    type: "Text",
                    className: "text-gray-600 dark:text-gray-400",
                    children: "Stunning visuals that engage your users",
                  },
                ],
              },
            },
          },
        ],
      },
      {
        type: "CarouselPrevious",
      },
      {
        type: "CarouselNext",
      },
    ],
  };

  // Image gallery example
  const imageGallerySpec: UISpecification = {
    type: "Carousel",
    className: "w-full max-w-lg",
    showArrows: true,
    options: {
      loop: true,
    },
    children: [
      {
        type: "CarouselContent",
        children: Array.from({ length: 4 }).map((_, i) => ({
          type: "CarouselItem",
          children: {
            type: "Box",
            className: "p-1",
            children: {
              type: "Card",
              className: "border-0",
              children: {
                type: "CardContent",
                className: "p-0",
                children: {
                  type: "AspectRatio",
                  ratio: 16 / 9,
                  children: {
                    type: "Box",
                    className: `bg-gradient-to-br ${
                      [
                        "from-red-200 to-red-400",
                        "from-blue-200 to-blue-400",
                        "from-green-200 to-green-400",
                        "from-yellow-200 to-yellow-400",
                      ][i]
                    } rounded-lg flex items-center justify-center`,
                    children: {
                      type: "Text",
                      className: "text-2xl font-bold text-white",
                      children: `Image ${i + 1}`,
                    },
                  },
                },
              },
            },
          },
        })),
      },
      {
        type: "CarouselPrevious",
      },
      {
        type: "CarouselNext",
      },
    ],
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex">
      {/* Table of Contents - Fixed Sidebar */}
      <aside className="w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 p-6">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">On this page</h3>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/showcase"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
          >
            ← Back to Showcase
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Carousel Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A flexible carousel component for displaying multiple items with smooth navigation, autoplay support, and full customization options.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Carousel component is built on top of Embla Carousel, providing a powerful and accessible way to display sequences of content. It supports both horizontal and vertical orientations, with options for navigation arrows, pagination dots, autoplay, and various alignment modes.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Horizontal and vertical orientations</li>
                <li>Navigation arrows and pagination dots</li>
                <li>Autoplay with customizable delays</li>
                <li>Infinite loop support</li>
                <li>Free drag and smooth scrolling</li>
                <li>Multiple alignment options (start, center, end)</li>
                <li>Responsive design with multiple slides per view</li>
                <li>Full keyboard navigation support</li>
                <li>Touch and mouse wheel support</li>
              </ul>
            </div>
          </section>

          {/* Basic Carousel Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Carousel</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple carousel with default settings. Swipe or drag to navigate between slides.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* With Arrows Section */}
          <section id="with-arrows" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Navigation Arrows</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add navigation arrows for easy slide control. The arrows automatically disable when reaching the first or last slide.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(withArrowsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(withArrowsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* With Dots Section */}
          <section id="with-dots" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Pagination Dots</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enable pagination dots to show the current slide position and allow direct navigation to any slide.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(withDotsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(withDotsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Autoplay Section */}
          <section id="autoplay" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Autoplay Carousel</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enable autoplay to automatically advance slides. Autoplay stops when users interact with the carousel.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(autoplaySpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(autoplaySpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Vertical Section */}
          <section id="vertical" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Vertical Carousel</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Change the orientation to vertical for space-efficient layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 flex justify-center">
              {render(verticalSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(verticalSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Multiple Slides Section */}
          <section id="multiple-slides" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Multiple Slides</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Display multiple slides at once with responsive breakpoints.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(multipleSlidesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(multipleSlidesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Loop Section */}
          <section id="loop" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Infinite Loop</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enable infinite loop to allow continuous navigation in either direction.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(loopSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(loopSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Free Drag Section */}
          <section id="drag-free" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Free Drag</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enable free drag mode for smooth, physics-based scrolling without snap points.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(dragFreeSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(dragFreeSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Alignment Section */}
          <section id="alignment" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Slide Alignment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control how slides are aligned within the carousel container.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(alignmentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(alignmentSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium">Prop</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Default</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">type</td>
                    <td className="py-3 px-4 font-mono">&quot;Carousel&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec | ComponentSpec[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Carousel content and controls</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">orientation</td>
                    <td className="py-3 px-4 font-mono">"horizontal" | &quot;vertical&quot;</td>
                    <td className="py-3 px-4">&quot;horizontal&quot;</td>
                    <td className="py-3 px-4">Carousel scroll direction</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showArrows</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show navigation arrows</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showDots</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Show pagination dots</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">autoplay</td>
                    <td className="py-3 px-4 font-mono">AutoplayOptions</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Autoplay configuration object</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">autoplay.enabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Enable autoplay</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">autoplay.delay</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">4000</td>
                    <td className="py-3 px-4">Delay between slides (ms)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">autoplay.stopOnInteraction</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Stop autoplay on user interaction</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">options</td>
                    <td className="py-3 px-4 font-mono">CarouselOptions</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Embla carousel options</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">options.loop</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Enable infinite loop</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">options.align</td>
                    <td className="py-3 px-4 font-mono">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</td>
                    <td className="py-3 px-4">&quot;center&quot;</td>
                    <td className="py-3 px-4">Slide alignment</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">options.dragFree</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Enable free drag scrolling</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">options.slidesToScroll</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Number of slides to scroll</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world carousel implementations for common use cases.
            </p>
            
            <div className="space-y-8">
              {/* Product Showcase Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Product Feature Showcase</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(productShowcaseSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(productShowcaseSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Image Gallery Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Image Gallery</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(imageGallerySpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(imageGallerySpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <Link
                to="/showcase"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                ← Back to Component Showcase
              </Link>
              <Link
                to="/documentation/ui-components"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                View Documentation →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}