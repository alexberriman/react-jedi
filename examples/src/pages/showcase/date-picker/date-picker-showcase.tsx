import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function DatePickerShowcase() {
  usePageMetadata({
    title: "DatePicker Component",
    description:
      "A comprehensive showcase of the React Jedi DatePicker component with all variants, configurations, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "controlled", label: "Controlled DatePicker" },
    { id: "formats", label: "Date Formats" },
    { id: "constraints", label: "Date Constraints" },
    { id: "states", label: "States & Validation" },
    { id: "styling", label: "Custom Styling" },
    { id: "advanced", label: "Advanced Examples" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic usage
  const basicSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "DatePicker",
        placeholder: "Pick a date",
      },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Simple date picker with default settings",
      },
    ],
  };

  // Controlled date picker with initial value
  const controlledSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "DatePicker",
        value: "2024-12-25T00:00:00.000Z",
        placeholder: "Select date",
        onChange: "selectedDate",
      },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Date picker with initial value (Christmas 2024)",
      },
    ],
  };

  // Different date formats
  const formatsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Default format (PPP)",
            format: "PPP",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Format: PPP (e.g., April 29, 2023)",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Short format",
            format: "P",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Format: P (e.g., 04/29/2023)",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Custom format",
            format: "dd/MM/yyyy",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Format: dd/MM/yyyy (e.g., 29/04/2023)",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Long format",
            format: "PPPP",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Format: PPPP (e.g., Saturday, April 29th, 2023)",
          },
        ],
      },
    ],
  };

  // Date constraints (min/max dates)
  const constraintsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Future dates only",
            minDate: new Date().toISOString(),
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Can only select dates from today onwards",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Past dates only",
            maxDate: new Date().toISOString(),
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Can only select dates up to today",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Date range (2024 only)",
            minDate: "2024-01-01T00:00:00.000Z",
            maxDate: "2024-12-31T23:59:59.999Z",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Limited to year 2024",
          },
        ],
      },
    ],
  };

  // States and validation
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Normal state",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Default interactive state",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Disabled date picker",
            disabled: true,
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Disabled state - not interactive",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "With value (disabled)",
            value: "2024-07-04T00:00:00.000Z",
            disabled: true,
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Disabled with a selected date",
          },
        ],
      },
    ],
  };

  // Custom styling
  const stylingSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Custom width",
            className: "w-64",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Fixed width date picker",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Full width",
            className: "w-full",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Full width date picker",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "DatePicker",
            placeholder: "Custom styling",
            className: "border-2 border-blue-500 hover:border-blue-600",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            children: "Custom border styling",
          },
        ],
      },
    ],
  };

  // Advanced examples
  const advancedSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      // Birth date selector
      {
        type: "Card",
        className: "p-6",
        children: [
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Heading",
                level: 3,
                children: "Birth Date Registration",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Label",
                    htmlFor: "birthdate",
                    children: "Date of Birth",
                  },
                  {
                    type: "DatePicker",
                    placeholder: "Select your birth date",
                    maxDate: new Date().toISOString(),
                    format: "PP",
                    onChange: "birthDate",
                  },
                  {
                    type: "Text",
                    size: "small",
                    variant: "muted",
                    children: "Must be 18 years or older",
                  },
                ],
              },
            ],
          },
        ],
      },
      // Event scheduler
      {
        type: "Card",
        className: "p-6",
        children: [
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Heading",
                level: 3,
                children: "Event Scheduler",
              },
              {
                type: "Grid",
                columns: 2,
                gap: "4",
                children: [
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "start-date",
                        children: "Start Date",
                      },
                      {
                        type: "DatePicker",
                        placeholder: "Event start",
                        minDate: new Date().toISOString(),
                        onChange: "startDate",
                      },
                    ],
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "end-date",
                        children: "End Date",
                      },
                      {
                        type: "DatePicker",
                        placeholder: "Event end",
                        minDate: new Date().toISOString(),
                        onChange: "endDate",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Complete form example
  const completeExampleSpec: UISpecification = {
    type: "Card",
    className: "p-8",
    children: [
      {
        type: "Stack",
        spacing: "6",
        children: [
          {
            type: "Heading",
            level: 2,
            children: "Travel Booking Form",
          },
          {
            type: "Text",
            variant: "muted",
            children: "Book your next adventure with us",
          },
          {
            type: "Separator",
          },
          {
            type: "Form",
            onSubmit: "bookTravel",
            children: [
              {
                type: "Stack",
                spacing: "6",
                children: [
                  {
                    type: "Grid",
                    columns: 2,
                    gap: "6",
                    children: [
                      {
                        type: "Stack",
                        spacing: "2",
                        children: [
                          {
                            type: "Label",
                            htmlFor: "destination",
                            children: "Destination",
                          },
                          {
                            type: "Input",
                            placeholder: "Where to?",
                            onChange: "destination",
                          },
                        ],
                      },
                      {
                        type: "Stack",
                        spacing: "2",
                        children: [
                          {
                            type: "Label",
                            htmlFor: "travelers",
                            children: "Number of Travelers",
                          },
                          {
                            type: "Select",
                            placeholder: "Select",
                            options: [
                              { label: "1 Adult", value: "1" },
                              { label: "2 Adults", value: "2" },
                              { label: "3 Adults", value: "3" },
                              { label: "4+ Adults", value: "4+" },
                            ],
                            onChange: "travelers",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Grid",
                    columns: 2,
                    gap: "6",
                    children: [
                      {
                        type: "Stack",
                        spacing: "2",
                        children: [
                          {
                            type: "Label",
                            htmlFor: "departure",
                            children: "Departure Date",
                          },
                          {
                            type: "DatePicker",
                            placeholder: "Select departure",
                            minDate: new Date().toISOString(),
                            format: "PPP",
                            onChange: "departureDate",
                          },
                        ],
                      },
                      {
                        type: "Stack",
                        spacing: "2",
                        children: [
                          {
                            type: "Label",
                            htmlFor: "return",
                            children: "Return Date",
                          },
                          {
                            type: "DatePicker",
                            placeholder: "Select return",
                            minDate: new Date().toISOString(),
                            format: "PPP",
                            onChange: "returnDate",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Flex",
                    justify: "end",
                    gap: "3",
                    children: [
                      {
                        type: "Button",
                        variant: "outline",
                        children: "Cancel",
                      },
                      {
                        type: "Button",
                        variant: "primary",
                        children: "Search Flights",
                      },
                    ],
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">DatePicker Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful and flexible date selection component with support for date formats, constraints, and validation. Perfect for forms, scheduling, and date-based filtering.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The DatePicker component provides an intuitive interface for selecting dates. It features a calendar popup, keyboard navigation, and comprehensive date formatting options.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Interactive calendar with month/year navigation</li>
                <li>Customizable date formats</li>
                <li>Min/max date constraints</li>
                <li>Keyboard navigation support</li>
                <li>Disabled state support</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Full accessibility with ARIA labels</li>
                <li>Responsive design</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                The simplest way to use the DatePicker component with default settings.
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                {render(basicSpec)}
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  View JSON Specification
                </summary>
                <pre className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(basicSpec, null, 2)}</code>
                </pre>
              </details>
            </div>
          </section>

          {/* Controlled DatePicker */}
          <section id="controlled" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Controlled DatePicker</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Control the DatePicker value with state management and handle changes.
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                {render(controlledSpec)}
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  View JSON Specification
                </summary>
                <pre className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(controlledSpec, null, 2)}</code>
                </pre>
              </details>
            </div>
          </section>

          {/* Date Formats */}
          <section id="formats" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Date Formats</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Customize how dates are displayed using various format patterns.
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                {render(formatsSpec)}
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  View JSON Specification
                </summary>
                <pre className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(formatsSpec, null, 2)}</code>
                </pre>
              </details>
            </div>
          </section>

          {/* Date Constraints */}
          <section id="constraints" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Date Constraints</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Limit selectable dates using min and max date constraints.
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                {render(constraintsSpec)}
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  View JSON Specification
                </summary>
                <pre className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(constraintsSpec, null, 2)}</code>
                </pre>
              </details>
            </div>
          </section>

          {/* States & Validation */}
          <section id="states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">States & Validation</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Different states of the DatePicker component including disabled state.
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                {render(statesSpec)}
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  View JSON Specification
                </summary>
                <pre className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(statesSpec, null, 2)}</code>
                </pre>
              </details>
            </div>
          </section>

          {/* Custom Styling */}
          <section id="styling" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Apply custom styles and classes to the DatePicker component.
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                {render(stylingSpec)}
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  View JSON Specification
                </summary>
                <pre className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(stylingSpec, null, 2)}</code>
                </pre>
              </details>
            </div>
          </section>

          {/* Advanced Examples */}
          <section id="advanced" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Advanced Examples</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Real-world examples showcasing DatePicker in different contexts.
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                {render(advancedSpec)}
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  View JSON Specification
                </summary>
                <pre className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(advancedSpec, null, 2)}</code>
                </pre>
              </details>
            </div>
          </section>

          {/* Props & Options */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 dark:border-gray-800">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-left font-medium">
                      Property
                    </th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-left font-medium">
                      Type
                    </th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-left font-medium">
                      Default
                    </th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-left font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      type
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      "DatePicker"
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      required
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Specifies the DatePicker component
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      value
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      string
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      undefined
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Initial date value in ISO 8601 format
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      placeholder
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      string
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      "Pick a date"
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Placeholder text when no date is selected
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      disabled
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      boolean
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      false
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Whether the date picker is disabled
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      onChange
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      string
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      undefined
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      State key or action to trigger when date changes
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      format
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      string
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      "PPP"
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Date format pattern for display
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      minDate
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      string
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      undefined
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Minimum selectable date in ISO 8601 format
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      maxDate
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      string
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      undefined
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Maximum selectable date in ISO 8601 format
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      className
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      string
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      undefined
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Custom CSS classes for styling
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      styles
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 font-mono text-sm">
                      object
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-500">
                      undefined
                    </td>
                    <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm">
                      Custom inline styles object
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                A comprehensive travel booking form example using DatePicker components.
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                {render(completeExampleSpec)}
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  View JSON Specification
                </summary>
                <pre className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto text-sm">
                  <code>{JSON.stringify(completeExampleSpec, null, 2)}</code>
                </pre>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between">
            <Link
              to="/showcase/calendar"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              ← Calendar Component
            </Link>
            <Link
              to="/showcase/combobox"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Combobox Component →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}