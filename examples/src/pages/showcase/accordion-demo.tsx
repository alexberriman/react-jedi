import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../lib/meta";

export function AccordionDemo() {
  usePageMetadata({
    title: "Accordion Demo",
    description:
      "React Jedi Accordion component demo with expandable sections and collapsible panels.",
  });
  // Single accordion example
  const singleAccordionSpec: UISpecification = {
    type: "Accordion",
    accordionType: "single",
    collapsible: true,
    className: "w-[400px]",
    animated: true,
    children: [
      {
        type: "AccordionItem",
        value: "item-1",
        children: [
          {
            type: "AccordionTrigger",
            children: "Is it accessible?",
          },
          {
            type: "AccordionContent",
            children: "Yes. It adheres to the WAI-ARIA design pattern with full keyboard navigation and screen reader support.",
          },
        ],
      },
      {
        type: "AccordionItem",
        value: "item-2",
        children: [
          {
            type: "AccordionTrigger",
            children: "Is it styled?",
          },
          {
            type: "AccordionContent",
            children:
              "Yes. It comes with modern, clean styles that match the other components' aesthetic. The hover states are subtle and the transitions are smooth.",
          },
        ],
      },
      {
        type: "AccordionItem",
        value: "item-3",
        children: [
          {
            type: "AccordionTrigger",
            children: "Is it animated?",
          },
          {
            type: "AccordionContent",
            children: "Yes. It's animated by default with Framer Motion, but you can disable animations by setting the animated prop to false.",
          },
        ],
      },
    ],
  };

  // Multiple accordion example
  const multipleAccordionSpec: UISpecification = {
    type: "Accordion",
    accordionType: "multiple",
    defaultValue: ["item-1", "item-3"],
    className: "w-[400px]",
    children: [
      {
        type: "AccordionItem",
        value: "item-1",
        children: [
          {
            type: "AccordionTrigger",
            children: "Section 1",
          },
          {
            type: "AccordionContent",
            children: "Content for section 1. Multiple sections can be expanded at the same time.",
          },
        ],
      },
      {
        type: "AccordionItem",
        value: "item-2",
        children: [
          {
            type: "AccordionTrigger",
            children: "Section 2",
          },
          {
            type: "AccordionContent",
            children: "Content for section 2. Try expanding multiple sections!",
          },
        ],
      },
      {
        type: "AccordionItem",
        value: "item-3",
        children: [
          {
            type: "AccordionTrigger",
            children: "Section 3",
          },
          {
            type: "AccordionContent",
            children: "Content for section 3. This section starts expanded by default.",
          },
        ],
      },
    ],
  };

  // No animation example
  const noAnimationSpec: UISpecification = {
    type: "Accordion",
    accordionType: "single",
    collapsible: true,
    animated: false,
    className: "w-[400px]",
    children: [
      {
        type: "AccordionItem",
        value: "item-1",
        children: [
          {
            type: "AccordionTrigger",
            children: "No animations here",
          },
          {
            type: "AccordionContent",
            children: "This accordion has animations disabled. The content appears and disappears instantly without any transition effects.",
          },
        ],
      },
      {
        type: "AccordionItem",
        value: "item-2",
        children: [
          {
            type: "AccordionTrigger",
            children: "Instant feedback",
          },
          {
            type: "AccordionContent",
            children: "Sometimes you want immediate response without animations, especially for performance-critical applications.",
          },
        ],
      },
    ],
  };

  // JSON Examples
  const singleJsonExample = `{
  "type": "Accordion",
  "accordionType": "single",
  "collapsible": true,
  "animated": true,
  "className": "w-[400px]",
  "children": [
    {
      "type": "AccordionItem",
      "value": "item-1",
      "children": [
        {
          "type": "AccordionTrigger",
          "children": "Is it accessible?"
        },
        {
          "type": "AccordionContent",
          "children": "Yes. It adheres to the WAI-ARIA design pattern."
        }
      ]
    },
    {
      "type": "AccordionItem",
      "value": "item-2",
      "children": [
        {
          "type": "AccordionTrigger",
          "children": "Is it styled?"
        },
        {
          "type": "AccordionContent",
          "children": "Yes. It comes with default styles that match the other components' aesthetic."
        }
      ]
    }
  ]
}`;

  const multipleJsonExample = `{
  "type": "Accordion",
  "accordionType": "multiple",
  "defaultValue": ["item-1", "item-3"],
  "className": "w-[400px]",
  "children": [
    {
      "type": "AccordionItem",
      "value": "item-1",
      "children": [
        {
          "type": "AccordionTrigger",
          "children": "Section 1"
        },
        {
          "type": "AccordionContent",
          "children": "Content for section 1. Multiple sections can be expanded at the same time."
        }
      ]
    },
    {
      "type": "AccordionItem",
      "value": "item-2",
      "children": [
        {
          "type": "AccordionTrigger",
          "children": "Section 2"
        },
        {
          "type": "AccordionContent",
          "children": "Content for section 2. Try expanding multiple sections!"
        }
      ]
    }
  ]
}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Component Overview */}
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
            Accordion Component
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            A vertically stacked set of interactive headings that each reveal a section of content.
          </p>
        </section>

        {/* Single Accordion Example */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-zinc-100">Single Accordion</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Only one item can be expanded at a time.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
            {render(singleAccordionSpec)}
          </div>

          <div className="bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-2">
              JSON Specification:
            </h3>
            <pre className="text-xs text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-pre">
              {singleJsonExample}
            </pre>
          </div>
        </section>

        {/* Multiple Accordion Example */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-zinc-100">Multiple Accordion</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Multiple items can be expanded at the same time.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
            {render(multipleAccordionSpec)}
          </div>

          <div className="bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-2">
              JSON Specification:
            </h3>
            <pre className="text-xs text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-pre">
              {multipleJsonExample}
            </pre>
          </div>
        </section>

        {/* No Animation Example */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-zinc-100">Without Animation</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Accordion with animations disabled for instant feedback.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
            {render(noAnimationSpec)}
          </div>
        </section>

        {/* Schema Documentation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Schema Properties</h2>

          <div className="space-y-4">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Accordion Properties
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">type</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Must be &quot;Accordion&quot;
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    accordionType
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    &quot;single&quot; | &quot;multiple&quot; - Whether one or multiple items can be
                    expanded at once (default: &quot;single&quot;)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    defaultValue
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    string | string[] - The default expanded item(s)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    collapsible
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    boolean - Whether all items can be collapsed when using single type (default:
                    true)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">disabled</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    boolean - Whether the accordion is disabled (default: false)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">animated</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    boolean - Whether to animate accordion transitions (default: true)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">children</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    AccordionItem[] - Array of accordion items
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                AccordionItem Properties
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">type</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Must be &quot;AccordionItem&quot;
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">value</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    string - Unique value for the accordion item (required)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">disabled</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    boolean - Whether this specific item is disabled (default: false)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">children</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    [AccordionTrigger, AccordionContent] - Must contain trigger and content
                    components
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Component Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Accessibility
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>✓ Full keyboard navigation support</li>
                <li>✓ WAI-ARIA compliant</li>
                <li>✓ Screen reader friendly</li>
                <li>✓ Proper focus management</li>
              </ul>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Customization
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>✓ Single or multiple selection</li>
                <li>✓ Collapsible option</li>
                <li>✓ Default expanded items</li>
                <li>✓ Individual item disable state</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href="/showcase"
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:text-emerald-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Showcase
          </a>

          <a
            href="/documentation"
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:text-emerald-300 transition-colors"
          >
            View Documentation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
