import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { render } from '@/lib/render';

function CollapsibleCode({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-gray-50 text-left font-mono text-sm flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
          <pre className="text-sm">{children}</pre>
        </div>
      )}
    </div>
  );
}

function ShowcaseSection({ 
  id, 
  title, 
  description, 
  jsonSpec, 
  children 
}: { 
  id: string; 
  title: string; 
  description?: string; 
  jsonSpec: string;
  children?: React.ReactNode;
}) {
  const spec = JSON.parse(jsonSpec);
  
  return (
    <section id={id} className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-gray-600 mb-4">{description}</p>}
      </div>
      
      <div className="grid gap-6">
        <div className="p-6 border rounded-lg bg-white">
          <div className="space-y-4">
            {render(spec)}
            {children}
          </div>
        </div>
        
        <CollapsibleCode title="View JSON Specification">
          {JSON.stringify(spec, null, 2)}
        </CollapsibleCode>
      </div>
    </section>
  );
}

export default function TextareaShowcase() {
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'basic-usage', title: 'Basic Usage' },
    { id: 'sizes', title: 'Sizes' },
    { id: 'states', title: 'States' },
    { id: 'variants', title: 'Variants' },
    { id: 'with-labels', title: 'With Labels' },
    { id: 'form-integration', title: 'Form Integration' },
    { id: 'advanced-usage', title: 'Advanced Usage' },
    { id: 'props', title: 'Props & Options' },
    { id: 'examples', title: 'Complete Examples' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/showcase" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Component Showcase
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Textarea Component</h1>
          <p className="text-xl text-gray-600 mt-2">
            Multi-line text input component for forms and user input
          </p>
        </div>

        <div className="flex gap-8">
          {/* Table of Contents */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-8">
              <nav className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Table of Contents</h3>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* Overview */}
            <section id="overview" className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    The Textarea component provides a multi-line text input field for collecting longer text input from users. 
                    It supports various configurations including size control, placeholder text, validation states, and more.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <strong>Key Features:</strong> Responsive sizing, form integration, validation states, 
                          accessibility support, and customizable styling.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Basic Usage */}
            <ShowcaseSection
              id="basic-usage"
              title="Basic Usage"
              description="Simple textarea with placeholder text and default configuration."
              jsonSpec={JSON.stringify({
                type: "Textarea",
                placeholder: "Enter your message here...",
                className: "w-full"
              })}
            />

            {/* Sizes */}
            <ShowcaseSection
              id="sizes"
              title="Sizes"
              description="Control the height of the textarea using the rows property."
              jsonSpec={JSON.stringify({
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Small (2 rows)",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Small textarea...",
                        rows: 2,
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Medium (4 rows - default)",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Medium textarea...",
                        rows: 4,
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Large (8 rows)",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Large textarea...",
                        rows: 8,
                        className: "w-full"
                      }
                    ]
                  }
                ]
              })}
            />

            {/* States */}
            <ShowcaseSection
              id="states"
              title="States"
              description="Different states including disabled, readonly, and required states."
              jsonSpec={JSON.stringify({
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Default State",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Default textarea...",
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Disabled State",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "This textarea is disabled...",
                        disabled: true,
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Readonly State",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        defaultValue: "This textarea is readonly and cannot be edited.",
                        readonly: true,
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Required State",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "This field is required...",
                        required: true,
                        className: "w-full"
                      }
                    ]
                  }
                ]
              })}
            />

            {/* Variants */}
            <ShowcaseSection
              id="variants"
              title="Variants"
              description="Different resize behaviors and text area configurations."
              jsonSpec={JSON.stringify({
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Auto Resize (default)",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Can be resized in any direction...",
                        resize: "auto",
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Vertical Resize Only",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Can only be resized vertically...",
                        resize: "vertical",
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "No Resize",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Cannot be resized...",
                        resize: "none",
                        className: "w-full"
                      }
                    ]
                  }
                ]
              })}
            />

            {/* With Labels */}
            <ShowcaseSection
              id="with-labels"
              title="With Labels"
              description="Textarea components paired with labels for better accessibility and UX."
              jsonSpec={JSON.stringify({
                type: "Stack",
                spacing: "6",
                children: [
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "basic-comment",
                        children: "Basic Comment"
                      },
                      {
                        type: "Textarea",
                        id: "basic-comment",
                        name: "comment",
                        placeholder: "Share your thoughts...",
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "feedback",
                        children: "Feedback"
                      },
                      {
                        type: "Textarea",
                        id: "feedback",
                        name: "feedback",
                        placeholder: "Tell us how we can improve...",
                        rows: 5,
                        maxLength: 500,
                        className: "w-full"
                      },
                      {
                        type: "Text",
                        children: "Maximum 500 characters",
                        variant: "small",
                        className: "text-gray-500"
                      }
                    ]
                  }
                ]
              })}
            />

            {/* Form Integration */}
            <ShowcaseSection
              id="form-integration"
              title="Form Integration"
              description="Textarea components integrated within form layouts with validation."
              jsonSpec={JSON.stringify({
                type: "Stack",
                spacing: "4",
                className: "max-w-md",
                children: [
                  {
                    type: "Heading",
                    level: 3,
                    children: "Contact Form"
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "contact-name",
                        children: "Name *"
                      },
                      {
                        type: "Input",
                        id: "contact-name",
                        name: "name",
                        placeholder: "Your name",
                        required: true
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "contact-message",
                        children: "Message *"
                      },
                      {
                        type: "Textarea",
                        id: "contact-message",
                        name: "message",
                        placeholder: "Your message...",
                        rows: 6,
                        required: true,
                        maxLength: 1000
                      },
                      {
                        type: "Text",
                        children: "Please provide a detailed message (max 1000 characters)",
                        variant: "small",
                        className: "text-gray-500"
                      }
                    ]
                  },
                  {
                    type: "Button",
                    variant: "default",
                    children: "Send Message"
                  }
                ]
              })}
            />

            {/* Advanced Usage */}
            <ShowcaseSection
              id="advanced-usage"
              title="Advanced Usage"
              description="Advanced configurations including auto-focus, spell checking, and word wrapping."
              jsonSpec={JSON.stringify({
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Auto-focus Textarea",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "This textarea will auto-focus when the page loads...",
                        autoFocus: true,
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "With Spell Check Disabled",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Spell checking is disabled for this textarea...",
                        spellCheck: false,
                        className: "w-full"
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        children: "Hard Wrap Mode",
                        variant: "small",
                        weight: "medium"
                      },
                      {
                        type: "Textarea",
                        placeholder: "Text will wrap at the boundary of the control...",
                        wrap: "hard",
                        cols: 50,
                        className: "w-full"
                      }
                    ]
                  }
                ]
              })}
            />

            {/* Props & Options */}
            <section id="props" className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">type</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">"Textarea"</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Component type identifier</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">name</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Form field name</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">placeholder</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Placeholder text when empty</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">defaultValue</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Initial value</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">rows</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Number of visible text lines</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">maxLength</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Maximum number of characters</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">required</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Whether the field is required</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">disabled</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Whether the field is disabled</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">readonly</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Whether the field is read-only</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">autoFocus</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Whether to auto-focus on mount</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">resize</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">"none" | "both" | "horizontal" | "vertical" | "auto"</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">"auto"</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Resize behavior</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">autoComplete</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Browser autocomplete behavior</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">spellCheck</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Enable/disable spell checking</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">wrap</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">"hard" | "soft" | "off"</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Text wrapping behavior</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">className</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Additional CSS classes</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">onChangeAction</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Action to trigger on value change</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">onFocusAction</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Action to trigger on focus</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">onBlurAction</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Action to trigger on blur</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Complete Examples */}
            <ShowcaseSection
              id="examples"
              title="Complete Examples"
              description="Real-world examples demonstrating comprehensive textarea usage."
              jsonSpec={JSON.stringify({
                type: "Stack",
                spacing: "8",
                children: [
                  {
                    type: "Stack",
                    spacing: "4",
                    className: "p-6 border rounded-lg bg-gray-50",
                    children: [
                      {
                        type: "Heading",
                        level: 3,
                        children: "Blog Comment Form"
                      },
                      {
                        type: "Stack",
                        spacing: "4",
                        children: [
                          {
                            type: "Stack",
                            spacing: "2",
                            children: [
                              {
                                type: "Label",
                                htmlFor: "blog-comment",
                                children: "Leave a Comment"
                              },
                              {
                                type: "Textarea",
                                id: "blog-comment",
                                name: "comment",
                                placeholder: "Share your thoughts on this article...",
                                rows: 5,
                                maxLength: 2000,
                                required: true,
                                className: "w-full"
                              },
                              {
                                type: "Text",
                                children: "Your comment will be reviewed before publishing (max 2000 characters)",
                                variant: "small",
                                className: "text-gray-500"
                              }
                            ]
                          },
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            children: [
                              {
                                type: "Text",
                                children: "Comments are moderated and may not appear immediately",
                                variant: "small",
                                className: "text-gray-500"
                              },
                              {
                                type: "Button",
                                variant: "default",
                                children: "Post Comment"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "Stack",
                    spacing: "4",
                    className: "p-6 border rounded-lg bg-blue-50",
                    children: [
                      {
                        type: "Heading",
                        level: 3,
                        children: "Support Ticket"
                      },
                      {
                        type: "SimpleGrid",
                        cols: 2,
                        spacing: "4",
                        children: [
                          {
                            type: "Stack",
                            spacing: "2",
                            children: [
                              {
                                type: "Label",
                                htmlFor: "ticket-category",
                                children: "Category"
                              },
                              {
                                type: "Select",
                                id: "ticket-category",
                                name: "category",
                                placeholder: "Select category...",
                                items: [
                                  { value: "bug", label: "Bug Report" },
                                  { value: "feature", label: "Feature Request" },
                                  { value: "support", label: "Technical Support" }
                                ]
                              }
                            ]
                          },
                          {
                            type: "Stack",
                            spacing: "2",
                            children: [
                              {
                                type: "Label",
                                htmlFor: "ticket-priority",
                                children: "Priority"
                              },
                              {
                                type: "Select",
                                id: "ticket-priority",
                                name: "priority",
                                placeholder: "Select priority...",
                                items: [
                                  { value: "low", label: "Low" },
                                  { value: "medium", label: "Medium" },
                                  { value: "high", label: "High" },
                                  { value: "urgent", label: "Urgent" }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        type: "Stack",
                        spacing: "2",
                        children: [
                          {
                            type: "Label",
                            htmlFor: "ticket-description",
                            children: "Problem Description"
                          },
                          {
                            type: "Textarea",
                            id: "ticket-description",
                            name: "description",
                            placeholder: "Please describe the issue in detail. Include steps to reproduce, expected behavior, and any error messages...",
                            rows: 8,
                            required: true,
                            className: "w-full"
                          }
                        ]
                      },
                      {
                        type: "Button",
                        variant: "default",
                        className: "w-full",
                        children: "Submit Ticket"
                      }
                    ]
                  }
                ]
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}