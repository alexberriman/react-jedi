import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function AvatarShowcase() {
  usePageMetadata({
    title: "Avatar Component",
    description:
      "A comprehensive showcase of the React Jedi Avatar component with all sizes, variations, fallback states, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Avatar" },
    { id: "sizes", label: "Avatar Sizes" },
    { id: "fallback", label: "Fallback States" },
    { id: "initials", label: "With Initials" },
    { id: "colors", label: "Color Variations" },
    { id: "groups", label: "Avatar Groups" },
    { id: "status", label: "With Status Indicator" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic avatar specification
  const basicAvatarSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarImage",
            src: "https://placehold.co/100x100/EEE/31343C",
            alt: "User avatar",
          },
          {
            type: "AvatarFallback",
            children: "CN",
          },
        ],
      },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Avatar with image and fallback",
      },
    ],
  };

  // Avatar sizes specification
  const sizesSpec: UISpecification = {
    type: "Flex",
    align: "center",
    gap: "6",
    children: [
      {
        type: "Box",
        className: "text-center space-y-2",
        children: [
          {
            type: "Avatar",
            className: "size-6",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/100x100/EEE/31343C",
                alt: "Extra small avatar",
              },
              {
                type: "AvatarFallback",
                children: "XS",
              },
            ],
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "XS",
          },
        ],
      },
      {
        type: "Box",
        className: "text-center space-y-2",
        children: [
          {
            type: "Avatar",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/100x100/EEE/31343C",
                alt: "Small avatar",
              },
              {
                type: "AvatarFallback",
                children: "SM",
              },
            ],
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "SM",
          },
        ],
      },
      {
        type: "Box",
        className: "text-center space-y-2",
        children: [
          {
            type: "Avatar",
            className: "size-12",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/100x100/EEE/31343C",
                alt: "Medium avatar",
              },
              {
                type: "AvatarFallback",
                children: "MD",
              },
            ],
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "MD",
          },
        ],
      },
      {
        type: "Box",
        className: "text-center space-y-2",
        children: [
          {
            type: "Avatar",
            className: "size-16",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/100x100/EEE/31343C",
                alt: "Large avatar",
              },
              {
                type: "AvatarFallback",
                children: "LG",
              },
            ],
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "LG",
          },
        ],
      },
      {
        type: "Box",
        className: "text-center space-y-2",
        children: [
          {
            type: "Avatar",
            className: "size-20",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/100x100/EEE/31343C",
                alt: "Extra large avatar",
              },
              {
                type: "AvatarFallback",
                children: "XL",
              },
            ],
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "XL",
          },
        ],
      },
    ],
  };

  // Fallback states specification
  const fallbackSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarImage",
            src: "https://invalid-url-to-trigger-fallback.com/image.jpg",
            alt: "User avatar",
          },
          {
            type: "AvatarFallback",
            children: "JD",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarImage",
            src: "https://invalid-url-to-trigger-fallback.com/image.jpg",
            alt: "User avatar",
          },
          {
            type: "AvatarFallback",
            children: "👤",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarImage",
            src: "https://invalid-url-to-trigger-fallback.com/image.jpg",
            alt: "User avatar",
          },
          {
            type: "AvatarFallback",
            className: "bg-blue-500 text-white",
            children: "AB",
          },
        ],
      },
    ],
  };

  // Initials variations
  const initialsSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            children: "JD",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            children: "AB",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            children: "MK",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            children: "TW",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            children: "RJ",
          },
        ],
      },
    ],
  };

  // Color variations
  const colorsSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            className: "bg-red-500 text-white",
            children: "RD",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            className: "bg-green-500 text-white",
            children: "GN",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            className: "bg-blue-500 text-white",
            children: "BL",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            className: "bg-purple-500 text-white",
            children: "PL",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            className: "bg-yellow-500 text-white",
            children: "YL",
          },
        ],
      },
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarFallback",
            className: "bg-gradient-to-br from-pink-500 to-purple-600 text-white",
            children: "GR",
          },
        ],
      },
    ],
  };

  // Avatar groups
  const groupsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "font-medium mb-3",
            children: "Stacked avatars",
          },
          {
            type: "Flex",
            className: "-space-x-3",
            children: [
              {
                type: "Avatar",
                className: "ring-2 ring-white dark:ring-gray-900",
                children: [
                  {
                    type: "AvatarImage",
                    src: "https://placehold.co/150x150/EEE/31343C",
                    alt: "User 1",
                  },
                  {
                    type: "AvatarFallback",
                    children: "U1",
                  },
                ],
              },
              {
                type: "Avatar",
                className: "ring-2 ring-white dark:ring-gray-900",
                children: [
                  {
                    type: "AvatarImage",
                    src: "https://placehold.co/150x150/EEE/31343C",
                    alt: "User 2",
                  },
                  {
                    type: "AvatarFallback",
                    children: "U2",
                  },
                ],
              },
              {
                type: "Avatar",
                className: "ring-2 ring-white dark:ring-gray-900",
                children: [
                  {
                    type: "AvatarImage",
                    src: "https://placehold.co/150x150/EEE/31343C",
                    alt: "User 3",
                  },
                  {
                    type: "AvatarFallback",
                    children: "U3",
                  },
                ],
              },
              {
                type: "Avatar",
                className: "ring-2 ring-white dark:ring-gray-900",
                children: [
                  {
                    type: "AvatarFallback",
                    className: "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
                    children: "+5",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "font-medium mb-3",
            children: "Spaced avatars",
          },
          {
            type: "Group",
            spacing: "2",
            children: [
              {
                type: "Avatar",
                children: [
                  {
                    type: "AvatarImage",
                    src: "https://placehold.co/150x150/EEE/31343C",
                    alt: "User 4",
                  },
                  {
                    type: "AvatarFallback",
                    children: "U4",
                  },
                ],
              },
              {
                type: "Avatar",
                children: [
                  {
                    type: "AvatarImage",
                    src: "https://placehold.co/150x150/EEE/31343C",
                    alt: "User 5",
                  },
                  {
                    type: "AvatarFallback",
                    children: "U5",
                  },
                ],
              },
              {
                type: "Avatar",
                children: [
                  {
                    type: "AvatarImage",
                    src: "https://placehold.co/150x150/EEE/31343C",
                    alt: "User 6",
                  },
                  {
                    type: "AvatarFallback",
                    children: "U6",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Avatar with status indicator
  const statusSpec: UISpecification = {
    type: "Group",
    spacing: "6",
    children: [
      {
        type: "Box",
        className: "relative",
        children: [
          {
            type: "Avatar",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/150x150/EEE/31343C",
                alt: "Online user",
              },
              {
                type: "AvatarFallback",
                children: "ON",
              },
            ],
          },
          {
            type: "Box",
            className: "absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900",
            children: [],
          },
        ],
      },
      {
        type: "Box",
        className: "relative",
        children: [
          {
            type: "Avatar",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/150x150/EEE/31343C",
                alt: "Away user",
              },
              {
                type: "AvatarFallback",
                children: "AW",
              },
            ],
          },
          {
            type: "Box",
            className: "absolute bottom-0 right-0 size-3 bg-yellow-500 rounded-full ring-2 ring-white dark:ring-gray-900",
            children: [],
          },
        ],
      },
      {
        type: "Box",
        className: "relative",
        children: [
          {
            type: "Avatar",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/150x150/EEE/31343C",
                alt: "Busy user",
              },
              {
                type: "AvatarFallback",
                children: "BS",
              },
            ],
          },
          {
            type: "Box",
            className: "absolute bottom-0 right-0 size-3 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900",
            children: [],
          },
        ],
      },
      {
        type: "Box",
        className: "relative",
        children: [
          {
            type: "Avatar",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/150x150/EEE/31343C",
                alt: "Offline user",
              },
              {
                type: "AvatarFallback",
                children: "OF",
              },
            ],
          },
          {
            type: "Box",
            className: "absolute bottom-0 right-0 size-3 bg-gray-400 rounded-full ring-2 ring-white dark:ring-gray-900",
            children: [],
          },
        ],
      },
    ],
  };

  // User profile card example
  const profileCardSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-sm",
    children: [
      {
        type: "CardContent",
        className: "pt-6",
        children: {
          type: "Stack",
          spacing: "4",
          align: "center",
          children: [
            {
              type: "Avatar",
              className: "size-24",
              children: [
                {
                  type: "AvatarImage",
                  src: "https://placehold.co/150x150/EEE/31343C",
                  alt: "Sarah Johnson",
                },
                {
                  type: "AvatarFallback",
                  children: "SJ",
                },
              ],
            },
            {
              type: "Box",
              className: "text-center",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "font-semibold",
                  children: "Sarah Johnson",
                },
                {
                  type: "Text",
                  variant: "muted",
                  children: "Product Designer",
                },
              ],
            },
            {
              type: "Text",
              className: "text-center text-sm",
              children: "Creating beautiful user experiences with a focus on accessibility and performance.",
            },
            {
              type: "Group",
              spacing: "2",
              className: "w-full",
              children: [
                {
                  type: "Button",
                  variant: "default",
                  className: "w-full",
                  children: "Follow",
                },
                {
                  type: "Button",
                  variant: "outline",
                  className: "w-full",
                  children: "Message",
                },
              ],
            },
          ],
        },
      },
    ],
  };

  // Comment thread example
  const commentThreadSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-2xl",
    children: [
      {
        type: "Box",
        className: "flex gap-3",
        children: [
          {
            type: "Avatar",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/150x150/EEE/31343C",
                alt: "Alex Chen",
              },
              {
                type: "AvatarFallback",
                children: "AC",
              },
            ],
          },
          {
            type: "Box",
            className: "flex-1",
            children: [
              {
                type: "Box",
                className: "bg-gray-100 dark:bg-gray-800 rounded-lg p-3",
                children: [
                  {
                    type: "Flex",
                    align: "center",
                    gap: "2",
                    className: "mb-1",
                    children: [
                      {
                        type: "Text",
                        className: "font-semibold text-sm",
                        children: "Alex Chen",
                      },
                      {
                        type: "Text",
                        size: "small",
                        variant: "muted",
                        children: "2 hours ago",
                      },
                    ],
                  },
                  {
                    type: "Text",
                    className: "text-sm",
                    children: "Great work on the new avatar component! The fallback states are particularly well implemented.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        className: "flex gap-3 ml-12",
        children: [
          {
            type: "Avatar",
            className: "size-8",
            children: [
              {
                type: "AvatarImage",
                src: "https://placehold.co/150x150/EEE/31343C",
                alt: "Emma Wilson",
              },
              {
                type: "AvatarFallback",
                children: "EW",
              },
            ],
          },
          {
            type: "Box",
            className: "flex-1",
            children: [
              {
                type: "Box",
                className: "bg-gray-100 dark:bg-gray-800 rounded-lg p-3",
                children: [
                  {
                    type: "Flex",
                    align: "center",
                    gap: "2",
                    className: "mb-1",
                    children: [
                      {
                        type: "Text",
                        className: "font-semibold text-sm",
                        children: "Emma Wilson",
                      },
                      {
                        type: "Text",
                        size: "small",
                        variant: "muted",
                        children: "1 hour ago",
                      },
                    ],
                  },
                  {
                    type: "Text",
                    className: "text-sm",
                    children: "Thanks! I&apos;m glad you like it. The color variations add a nice touch too.",
                  },
                ],
              },
            ],
          },
        ],
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Avatar Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile avatar component that displays user profile images with customizable fallback states, sizes, and styling options.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Avatar component provides a consistent way to display user profile images throughout your application. It includes automatic fallback handling when images fail to load, support for displaying initials, and various customization options.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Automatic image loading with fallback support</li>
                <li>Customizable sizes from extra small to extra large</li>
                <li>Support for initials, icons, or custom fallback content</li>
                <li>Flexible styling with className prop</li>
                <li>Status indicators for online presence</li>
                <li>Grouping support for team displays</li>
                <li>Accessible by default with proper alt text support</li>
              </ul>
            </div>
          </section>

          {/* Basic Avatar Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Avatar</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple avatar with an image and fallback text.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicAvatarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicAvatarSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Sizes Section */}
          <section id="sizes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Avatar Sizes</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Avatars can be sized using the className prop with Tailwind size utilities.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(sizesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(sizesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Fallback States Section */}
          <section id="fallback" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Fallback States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              When images fail to load, the avatar displays the fallback content.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(fallbackSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(fallbackSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Initials Section */}
          <section id="initials" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Initials</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Display user initials when no image is available.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(initialsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(initialsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Color Variations Section */}
          <section id="colors" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Color Variations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize avatar fallback colors using className.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(colorsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(colorsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Avatar Groups Section */}
          <section id="groups" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Avatar Groups</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Display multiple avatars together for team or group representations.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(groupsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(groupsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Status Indicator Section */}
          <section id="status" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Status Indicator</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add status indicators to show user availability.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(statusSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(statusSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="space-y-6">
              {/* Avatar Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">Avatar Component</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;Avatar&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                        <td className="py-3 px-4 font-mono">ComponentSpec[]</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">AvatarImage and AvatarFallback components</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Additional CSS classes (e.g., for sizing)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">asChild</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Treat as child slot element</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">ariaLabel</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">ARIA label for accessibility</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AvatarImage Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">AvatarImage Component</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;AvatarImage&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">src</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Image source URL</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">alt</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Alternative text for the image</td>
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
              </div>

              {/* AvatarFallback Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">AvatarFallback Component</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;AvatarFallback&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                        <td className="py-3 px-4 font-mono">string | ComponentSpec</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Fallback content (initials, icon, etc.)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Additional CSS classes</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">delayMs</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">600</td>
                        <td className="py-3 px-4">Delay before showing fallback</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how avatars work in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Profile Card Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">User Profile Card</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 flex justify-center">
                  {render(profileCardSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(profileCardSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Comment Thread Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Comment Thread</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(commentThreadSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(commentThreadSpec, null, 2)}
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