import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-jedi';

function ContainerShowcase() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= top && scrollPosition < top + height && id) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'sizes', label: 'Container Sizes' },
    { id: 'padding', label: 'Padding Variations' },
    { id: 'alignment', label: 'Content Alignment' },
    { id: 'semantic-elements', label: 'Semantic Elements' },
    { id: 'complete-example', label: 'Complete Examples' },
    { id: 'props', label: 'Props Reference' },
  ];

  const basicUsageSpec = {
    type: 'Container',
    children: [
      {
        type: 'Text',
        properties: {
          variant: 'h3',
          children: 'Container Component',
        },
      },
      {
        type: 'Text',
        properties: {
          children: 'The Container component provides a centered wrapper with consistent max-width and responsive padding. It\'s the foundation for creating well-structured, responsive layouts.',
        },
      },
    ],
  };

  const sizeExamples = {
    sm: {
      type: 'Container',
      properties: {
        size: 'sm',
        className: 'bg-blue-50 dark:bg-blue-950 rounded-lg mb-4',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Small Container (max-w-3xl)',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Perfect for narrow content like forms or focused reading experiences.',
          },
        },
      ],
    },
    md: {
      type: 'Container',
      properties: {
        size: 'md',
        className: 'bg-green-50 dark:bg-green-950 rounded-lg mb-4',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Medium Container (max-w-5xl)',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Ideal for blog posts, articles, and standard content layouts.',
          },
        },
      ],
    },
    lg: {
      type: 'Container',
      properties: {
        size: 'lg',
        className: 'bg-purple-50 dark:bg-purple-950 rounded-lg mb-4',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Large Container (max-w-7xl)',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'The default size. Great for main content areas and general page layouts.',
          },
        },
      ],
    },
    xl: {
      type: 'Container',
      properties: {
        size: 'xl',
        className: 'bg-orange-50 dark:bg-orange-950 rounded-lg mb-4',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Extra Large Container (max-w-[90rem])',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Suitable for dashboards, wide tables, and content that needs more horizontal space.',
          },
        },
      ],
    },
    full: {
      type: 'Container',
      properties: {
        size: 'full',
        className: 'bg-red-50 dark:bg-red-950 rounded-lg',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Full Width Container (max-w-full)',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Spans the entire width while maintaining responsive padding.',
          },
        },
      ],
    },
  };

  const paddingExamples = {
    none: {
      type: 'Container',
      properties: {
        padding: 'none',
        className: 'bg-gray-100 dark:bg-gray-900 rounded-lg mb-4',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'No Padding',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Container with no vertical padding (py-0).',
          },
        },
      ],
    },
    sm: {
      type: 'Container',
      properties: {
        padding: 'sm',
        className: 'bg-gray-100 dark:bg-gray-900 rounded-lg mb-4',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Small Padding',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Reduced vertical padding (py-4 md:py-6).',
          },
        },
      ],
    },
    default: {
      type: 'Container',
      properties: {
        padding: 'default',
        className: 'bg-gray-100 dark:bg-gray-900 rounded-lg mb-4',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Default Padding',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Standard vertical padding (py-8 md:py-12).',
          },
        },
      ],
    },
    lg: {
      type: 'Container',
      properties: {
        padding: 'lg',
        className: 'bg-gray-100 dark:bg-gray-900 rounded-lg mb-4',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Large Padding',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Increased vertical padding (py-12 md:py-16).',
          },
        },
      ],
    },
    xl: {
      type: 'Container',
      properties: {
        padding: 'xl',
        className: 'bg-gray-100 dark:bg-gray-900 rounded-lg',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Extra Large Padding',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Maximum vertical padding (py-16 md:py-24).',
          },
        },
      ],
    },
  };

  const alignmentExamples = {
    start: {
      type: 'Container',
      properties: {
        align: 'default',
        className: 'bg-indigo-50 dark:bg-indigo-950 rounded-lg mb-4 min-h-[150px]',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Start Alignment (Default)',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Content aligned to the start of the container.',
          },
        },
      ],
    },
    center: {
      type: 'Container',
      properties: {
        align: 'center',
        className: 'bg-indigo-50 dark:bg-indigo-950 rounded-lg mb-4 min-h-[150px]',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'Center Alignment',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Content vertically centered in the container.',
          },
        },
      ],
    },
    end: {
      type: 'Container',
      properties: {
        align: 'end',
        className: 'bg-indigo-50 dark:bg-indigo-950 rounded-lg mb-4 min-h-[150px]',
      },
      children: [
        {
          type: 'Text',
          properties: {
            variant: 'h4',
            children: 'End Alignment',
          },
        },
        {
          type: 'Text',
          properties: {
            children: 'Content aligned to the end of the container.',
          },
        },
      ],
    },
  };

  const semanticExample = {
    type: 'Container',
    properties: {
      as: 'section',
      className: 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg',
    },
    children: [
      {
        type: 'Text',
        properties: {
          variant: 'h3',
          children: 'Semantic HTML Section',
        },
      },
      {
        type: 'Text',
        properties: {
          children: 'This Container is rendered as a <section> element for better semantic HTML structure.',
        },
      },
    ],
  };

  const completeExample = {
    type: 'Container',
    properties: {
      size: 'md',
      padding: 'lg',
      as: 'article',
    },
    children: [
      {
        type: 'Text',
        properties: {
          variant: 'h2',
          className: 'mb-4',
          children: 'Article Container',
        },
      },
      {
        type: 'Text',
        properties: {
          variant: 'lead',
          className: 'mb-6',
          children: 'This example demonstrates a complete article layout using the Container component with medium size and large padding.',
        },
      },
      {
        type: 'Text',
        properties: {
          className: 'mb-4',
          children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        },
      },
      {
        type: 'Button',
        properties: {
          variant: 'default',
          children: 'Read More',
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Table of Contents */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-6 sticky top-0 h-screen overflow-y-auto">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Table of Contents</h3>
        <nav className="space-y-2">
          {tableOfContents.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/showcase"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center"
          >
            ← Back to Showcase
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-12 max-w-5xl mx-auto">
        <section id="introduction" className="mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Container Component</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            A responsive wrapper component that provides consistent max-width constraints and padding for your content.
          </p>
        </section>

        <section id="basic-usage" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Basic Usage</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The Container component creates a centered wrapper with responsive padding and max-width constraints.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-4">
            {render(basicUsageSpec)}
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              View JSON Specification
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto text-sm">
              <code>{JSON.stringify(basicUsageSpec, null, 2)}</code>
            </pre>
          </details>
        </section>

        <section id="sizes" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Container Sizes</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Containers come in different sizes to accommodate various content needs.
          </p>

          {Object.entries(sizeExamples).map(([size, spec]) => (
            <div key={size} className="mb-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                {render(spec)}
              </div>

              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  View JSON Specification
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(spec, null, 2)}</code>
                </pre>
              </details>
            </div>
          ))}
        </section>

        <section id="padding" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Padding Variations</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Control the vertical spacing of your container with different padding options.
          </p>

          {Object.entries(paddingExamples).map(([padding, spec]) => (
            <div key={padding} className="mb-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                {render(spec)}
              </div>

              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  View JSON Specification
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(spec, null, 2)}</code>
                </pre>
              </details>
            </div>
          ))}
        </section>

        <section id="alignment" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Content Alignment</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Align content vertically within the container using the align prop.
          </p>

          {Object.entries(alignmentExamples).map(([align, spec]) => (
            <div key={align} className="mb-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                {render(spec)}
              </div>

              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  View JSON Specification
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(spec, null, 2)}</code>
                </pre>
              </details>
            </div>
          ))}
        </section>

        <section id="semantic-elements" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Semantic Elements</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Use the "as" prop to render the container as different HTML elements for better semantic structure.
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-4">
            {render(semanticExample)}
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              View JSON Specification
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto text-sm">
              <code>{JSON.stringify(semanticExample, null, 2)}</code>
            </pre>
          </details>
        </section>

        <section id="complete-example" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Complete Examples</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A real-world example showing how to combine Container properties for an article layout.
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-4">
            {render(completeExample)}
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              View JSON Specification
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto text-sm">
              <code>{JSON.stringify(completeExample, null, 2)}</code>
            </pre>
          </details>
        </section>

        <section id="props" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Props Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Default</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">size</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">"default" | "sm" | "md" | "lg" | "xl" | "full"</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">"default"</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Controls the max-width of the container</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">padding</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">"default" | "none" | "sm" | "lg" | "xl"</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">"default"</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Controls the vertical padding</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">align</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">"default" | "center" | "end" | "stretch"</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">"default"</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Controls content alignment within the container</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">as</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">"div"</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">The HTML element to render as</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">className</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">-</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Additional CSS classes</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">children</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">React.ReactNode</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">-</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Content to be wrapped by the container</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between">
          <Link
            to="/showcase"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ← Back to Showcase
          </Link>
          <Link
            to="/showcase/box"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Box Component →
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ContainerShowcase;