import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function CalendarShowcase() {
  usePageMetadata({
    title: "Calendar Component",
    description:
      "A comprehensive showcase of the React Jedi Calendar component with date selection modes, styling options, and advanced features.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Calendar" },
    { id: "modes", label: "Selection Modes" },
    { id: "multi-month", label: "Multiple Months" },
    { id: "disabled-dates", label: "Disabled Dates" },
    { id: "date-ranges", label: "Date Ranges" },
    { id: "styling", label: "Custom Styling" },
    { id: "events", label: "Event Handling" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic calendar
  const basicCalendarSpec: UISpecification = {
    type: "calendar",
    defaultMonth: new Date().toISOString().split('T')[0],
  };

  // Single selection mode
  const singleSelectionSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        children: "Single Date Selection (Default)",
        className: "font-medium",
      },
      {
        type: "calendar",
        mode: "single",
        selected: "2024-03-15",
      },
    ],
  };

  // Multiple selection mode
  const multipleSelectionSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        children: "Multiple Date Selection",
        className: "font-medium",
      },
      {
        type: "calendar",
        mode: "multiple",
        selected: ["2024-03-10", "2024-03-15", "2024-03-20"],
      },
    ],
  };

  // Range selection mode
  const rangeSelectionSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        children: "Date Range Selection",
        className: "font-medium",
      },
      {
        type: "calendar",
        mode: "range",
        selected: {
          from: "2024-03-10",
          to: "2024-03-20",
        },
      },
    ],
  };

  // Multiple months display
  const multiMonthSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        children: "Display Multiple Months",
        className: "font-medium",
      },
      {
        type: "calendar",
        numberOfMonths: 2,
        showOutsideDays: true,
      },
    ],
  };

  // Disabled dates example
  const disabledDatesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        children: "Calendar with Disabled Dates",
        className: "font-medium",
      },
      {
        type: "calendar",
        disabled: [
          "2024-03-10",
          "2024-03-15",
          "2024-03-20",
          { year: 2024, month: 3, day: 25 },
        ],
        defaultMonth: "2024-03-01",
      },
    ],
  };

  // Date range restrictions
  const dateRangeSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Group",
        spacing: "8",
        children: [
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "From/To Date Restrictions",
                className: "font-medium",
              },
              {
                type: "calendar",
                fromDate: "2024-03-10",
                toDate: "2024-03-25",
                defaultMonth: "2024-03-01",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "Year Range Restrictions",
                className: "font-medium",
              },
              {
                type: "calendar",
                fromYear: 2020,
                toYear: 2025,
                defaultMonth: "2023-06-01",
              },
            ],
          },
        ],
      },
    ],
  };

  // Custom styling example
  const styledCalendarSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Group",
        spacing: "8",
        children: [
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "Custom Styled Calendar",
                className: "font-medium",
              },
              {
                type: "calendar",
                className: "rounded-xl border-2 border-blue-500 p-4",
                showOutsideDays: false,
                fixedWeeks: true,
              },
            ],
          },
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "Compact Calendar",
                className: "font-medium",
              },
              {
                type: "calendar",
                className: "scale-90 origin-top-left",
                numberOfMonths: 1,
              },
            ],
          },
        ],
      },
    ],
  };

  // Event handling example (simulated)
  const eventHandlingSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        children: "Calendar with Event Handlers",
        className: "font-medium",
      },
      {
        type: "Alert",
        children: [
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                className: "font-medium",
                children: "Interactive Calendar",
              },
              {
                type: "Text",
                className: "text-sm text-gray-600 dark:text-gray-400",
                children: "Select dates to trigger onSelect event. Change months to trigger onMonthChange event.",
              },
            ],
          },
        ],
      },
      {
        type: "calendar",
        onSelect: "handleDateSelect",
        onMonthChange: "handleMonthChange",
      },
    ],
  };

  // Complete example: Date picker in a form
  const formExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Book Appointment" },
          { type: "CardDescription", children: "Select your preferred date for the appointment" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "name", children: "Full Name" },
                { type: "Input", id: "name", placeholder: "John Doe" },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", children: "Select Date" },
                {
                  type: "calendar",
                  mode: "single",
                  fromDate: new Date().toISOString().split('T')[0],
                  disabled: [
                    new Date(Date.now() + 86_400_000).toISOString().split('T')[0], // Tomorrow
                    new Date(Date.now() + 172_800_000).toISOString().split('T')[0], // Day after tomorrow
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        className: "flex gap-3",
        children: [
          { type: "Button", variant: "outline", children: "Cancel" },
          { type: "Button", variant: "primary", children: "Book Appointment" },
        ],
      },
    ],
  };

  // Travel booking example
  const travelExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-2xl",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Travel Dates" },
          { type: "CardDescription", children: "Select your check-in and check-out dates" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "6",
          children: [
            {
              type: "Box",
              children: [
                { type: "Label", children: "Select Travel Dates" },
                {
                  type: "calendar",
                  mode: "range",
                  numberOfMonths: 2,
                  fromDate: new Date().toISOString().split('T')[0],
                  showOutsideDays: true,
                },
              ],
            },
            {
              type: "Alert",
              className: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
              children: [
                {
                  type: "Flex",
                  align: "center",
                  gap: "2",
                  children: [
                    {
                      type: "Text",
                      children: "ℹ️",
                      className: "text-xl",
                    },
                    {
                      type: "Text",
                      className: "text-sm",
                      children: "Minimum stay is 2 nights. Weekend rates may apply.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        className: "flex justify-between",
        children: [
          {
            type: "Text",
            className: "text-sm text-gray-600 dark:text-gray-400",
            children: "Prices from $120/night",
          },
          {
            type: "Group",
            spacing: "3",
            children: [
              { type: "Button", variant: "outline", children: "Clear Dates" },
              { type: "Button", variant: "primary", children: "Search Availability" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Calendar Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful date selection component that supports single dates, multiple dates, and date ranges. Perfect for booking systems, event planning, and date-based filtering.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Calendar component provides an intuitive interface for date selection with support for various selection modes, date restrictions, and customization options. It&apos;s built with accessibility in mind and supports keyboard navigation.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Three selection modes: single date, multiple dates, and date ranges</li>
                <li>Support for displaying multiple months</li>
                <li>Date restrictions with min/max dates and disabled dates</li>
                <li>Customizable appearance with className and style props</li>
                <li>Full keyboard navigation and screen reader support</li>
                <li>Event handlers for date selection and month changes</li>
                <li>Localization support (through browser settings)</li>
              </ul>
            </div>
          </section>

          {/* Basic Calendar Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Calendar</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple calendar with default settings, displaying the current month.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicCalendarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicCalendarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Selection Modes Section */}
          <section id="modes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Selection Modes</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose between single date, multiple dates, or date range selection modes.
            </p>
            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(singleSelectionSpec)}
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(multipleSelectionSpec)}
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(rangeSelectionSpec)}
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specifications
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify({ single: singleSelectionSpec, multiple: multipleSelectionSpec, range: rangeSelectionSpec }, null, 2)}
              </pre>
            </details>
          </section>

          {/* Multiple Months Section */}
          <section id="multi-month" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Multiple Months</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Display multiple months side by side for easier date range selection.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 overflow-x-auto">
              {render(multiMonthSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(multiMonthSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Disabled Dates Section */}
          <section id="disabled-dates" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Disabled Dates</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Disable specific dates to prevent selection of unavailable dates.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(disabledDatesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(disabledDatesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Date Ranges Section */}
          <section id="date-ranges" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Date Range Restrictions</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Limit selectable dates using from/to restrictions for dates, months, or years.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(dateRangeSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(dateRangeSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Styling Section */}
          <section id="styling" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the calendar appearance using className and style props.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(styledCalendarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(styledCalendarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Event Handling Section */}
          <section id="events" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Event Handling</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Handle date selection and month navigation events.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(eventHandlingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(eventHandlingSpec, null, 2)}
              </CodeBlock>
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
                    <td className="py-3 px-4 font-mono">&quot;calendar&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">mode</td>
                    <td className="py-3 px-4 font-mono">&quot;single&quot; | &quot;multiple&quot; | &quot;range&quot;</td>
                    <td className="py-3 px-4">&quot;single&quot;</td>
                    <td className="py-3 px-4">Selection mode for the calendar</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">selected</td>
                    <td className="py-3 px-4 font-mono">string | string[] | {`{from, to}`}</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Selected date(s) based on mode</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultMonth</td>
                    <td className="py-3 px-4 font-mono">string (date)</td>
                    <td className="py-3 px-4">current month</td>
                    <td className="py-3 px-4">Initial month to display</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">Array&lt;string | {`{year, month, day}`}&gt;</td>
                    <td className="py-3 px-4">[]</td>
                    <td className="py-3 px-4">Dates that cannot be selected</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">numberOfMonths</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Number of months to display</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showOutsideDays</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show days from adjacent months</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">fixedWeeks</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Always show 6 weeks to avoid layout shifts</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">fromDate</td>
                    <td className="py-3 px-4 font-mono">string (date)</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Earliest selectable date</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">toDate</td>
                    <td className="py-3 px-4 font-mono">string (date)</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Latest selectable date</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onSelect</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler for date selection</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onMonthChange</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler for month navigation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how the Calendar component works in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Appointment Booking Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Appointment Booking Form</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(formExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(formExampleSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Travel Booking Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Travel Date Selection</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(travelExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(travelExampleSpec, null, 2)}
              </CodeBlock>
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