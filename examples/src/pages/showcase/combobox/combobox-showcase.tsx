import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ComboboxShowcase() {
  usePageMetadata({
    title: "Combobox Component",
    description:
      "A comprehensive showcase of the React Jedi Combobox component with search functionality, multiple examples, and customization options.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "searchable", label: "Searchable Combobox" },
    { id: "states", label: "States" },
    { id: "custom-placeholder", label: "Custom Placeholders" },
    { id: "empty-state", label: "Empty State" },
    { id: "long-lists", label: "Long Option Lists" },
    { id: "integration", label: "Form Integration" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic combobox specification
  const basicSpec: UISpecification = {
    type: "Box",
    className: "space-y-2",
    children: [
      {
        type: "Label",
        htmlFor: "framework",
        children: "Select Framework"
      },
      {
        type: "Combobox",
        id: "framework",
        placeholder: "Select a framework...",
        options: [
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "angular", label: "Angular" },
          { value: "svelte", label: "Svelte" },
          { value: "solid", label: "Solid" }
        ]
      }
    ]
  };

  // Searchable combobox with many options
  const searchableSpec: UISpecification = {
    type: "Box",
    className: "space-y-2",
    children: [
      {
        type: "Label",
        htmlFor: "country",
        children: "Select Country"
      },
      {
        type: "Combobox",
        id: "country",
        placeholder: "Select a country...",
        searchPlaceholder: "Search countries...",
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "mx", label: "Mexico" },
          { value: "uk", label: "United Kingdom" },
          { value: "de", label: "Germany" },
          { value: "fr", label: "France" },
          { value: "it", label: "Italy" },
          { value: "es", label: "Spain" },
          { value: "jp", label: "Japan" },
          { value: "cn", label: "China" },
          { value: "in", label: "India" },
          { value: "br", label: "Brazil" },
          { value: "au", label: "Australia" },
          { value: "nz", label: "New Zealand" }
        ]
      }
    ]
  };

  // States specification
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        className: "space-y-2",
        children: [
          {
            type: "Label",
            htmlFor: "normal",
            children: "Normal State"
          },
          {
            type: "Combobox",
            id: "normal",
            placeholder: "Select an option...",
            options: [
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2" },
              { value: "opt3", label: "Option 3" }
            ]
          }
        ]
      },
      {
        type: "Box",
        className: "space-y-2",
        children: [
          {
            type: "Label",
            htmlFor: "disabled",
            children: "Disabled State"
          },
          {
            type: "Combobox",
            id: "disabled",
            placeholder: "Disabled combobox",
            disabled: true,
            options: [
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2" },
              { value: "opt3", label: "Option 3" }
            ]
          }
        ]
      },
      {
        type: "Box",
        className: "space-y-2",
        children: [
          {
            type: "Label",
            htmlFor: "preselected",
            children: "Pre-selected Value"
          },
          {
            type: "Combobox",
            id: "preselected",
            placeholder: "Select an option...",
            value: "opt2",
            options: [
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2 (Selected)" },
              { value: "opt3", label: "Option 3" }
            ]
          }
        ]
      }
    ]
  };

  // Custom placeholders
  const placeholderSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        className: "space-y-2",
        children: [
          {
            type: "Label",
            htmlFor: "custom-placeholder",
            children: "Custom Placeholder Text"
          },
          {
            type: "Combobox",
            id: "custom-placeholder",
            placeholder: "Pick your favorite color...",
            searchPlaceholder: "Type to filter colors...",
            options: [
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
              { value: "yellow", label: "Yellow" },
              { value: "purple", label: "Purple" },
              { value: "orange", label: "Orange" }
            ]
          }
        ]
      }
    ]
  };

  // Empty state
  const emptyStateSpec: UISpecification = {
    type: "Box",
    className: "space-y-2",
    children: [
      {
        type: "Label",
        htmlFor: "empty",
        children: "Search with No Results"
      },
      {
        type: "Combobox",
        id: "empty",
        placeholder: "Try searching...",
        searchPlaceholder: "Search for items...",
        emptyText: "No items found. Try a different search term.",
        options: [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" }
        ]
      }
    ]
  };

  // Long list example
  const longListSpec: UISpecification = {
    type: "Box",
    className: "space-y-2",
    children: [
      {
        type: "Label",
        htmlFor: "timezone",
        children: "Select Timezone"
      },
      {
        type: "Combobox",
        id: "timezone",
        placeholder: "Select your timezone...",
        searchPlaceholder: "Search timezones...",
        options: [
          { value: "utc-12", label: "UTC-12:00 Baker Island" },
          { value: "utc-11", label: "UTC-11:00 American Samoa" },
          { value: "utc-10", label: "UTC-10:00 Hawaii" },
          { value: "utc-9", label: "UTC-09:00 Alaska" },
          { value: "utc-8", label: "UTC-08:00 Pacific Time (US & Canada)" },
          { value: "utc-7", label: "UTC-07:00 Mountain Time (US & Canada)" },
          { value: "utc-6", label: "UTC-06:00 Central Time (US & Canada)" },
          { value: "utc-5", label: "UTC-05:00 Eastern Time (US & Canada)" },
          { value: "utc-4", label: "UTC-04:00 Atlantic Time (Canada)" },
          { value: "utc-3", label: "UTC-03:00 Buenos Aires" },
          { value: "utc-2", label: "UTC-02:00 Mid-Atlantic" },
          { value: "utc-1", label: "UTC-01:00 Azores" },
          { value: "utc+0", label: "UTC+00:00 London, Dublin" },
          { value: "utc+1", label: "UTC+01:00 Berlin, Paris" },
          { value: "utc+2", label: "UTC+02:00 Cairo, Athens" },
          { value: "utc+3", label: "UTC+03:00 Moscow, Istanbul" },
          { value: "utc+4", label: "UTC+04:00 Dubai" },
          { value: "utc+5", label: "UTC+05:00 Karachi" },
          { value: "utc+5.5", label: "UTC+05:30 Mumbai, Delhi" },
          { value: "utc+6", label: "UTC+06:00 Dhaka" },
          { value: "utc+7", label: "UTC+07:00 Bangkok, Jakarta" },
          { value: "utc+8", label: "UTC+08:00 Beijing, Singapore" },
          { value: "utc+9", label: "UTC+09:00 Tokyo, Seoul" },
          { value: "utc+10", label: "UTC+10:00 Sydney, Melbourne" },
          { value: "utc+11", label: "UTC+11:00 Solomon Islands" },
          { value: "utc+12", label: "UTC+12:00 Auckland, Fiji" }
        ]
      }
    ]
  };

  // Form integration example
  const formExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "User Preferences" },
          { type: "CardDescription", children: "Set your preferences for the application" }
        ]
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Box",
              className: "space-y-2",
              children: [
                { type: "Label", htmlFor: "name", children: "Full Name" },
                { type: "Input", id: "name", placeholder: "John Doe" }
              ]
            },
            {
              type: "Box",
              className: "space-y-2",
              children: [
                { type: "Label", htmlFor: "language", children: "Preferred Language" },
                {
                  type: "Combobox",
                  id: "language",
                  placeholder: "Select a language...",
                  options: [
                    { value: "en", label: "English" },
                    { value: "es", label: "Spanish" },
                    { value: "fr", label: "French" },
                    { value: "de", label: "German" },
                    { value: "it", label: "Italian" },
                    { value: "pt", label: "Portuguese" },
                    { value: "ru", label: "Russian" },
                    { value: "ja", label: "Japanese" },
                    { value: "ko", label: "Korean" },
                    { value: "zh", label: "Chinese" }
                  ]
                }
              ]
            },
            {
              type: "Box",
              className: "space-y-2",
              children: [
                { type: "Label", htmlFor: "theme", children: "Theme" },
                {
                  type: "Combobox",
                  id: "theme",
                  placeholder: "Select theme...",
                  value: "light",
                  options: [
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                    { value: "system", label: "System Default" }
                  ]
                }
              ]
            },
            {
              type: "Box",
              className: "space-y-2",
              children: [
                { type: "Label", htmlFor: "notifications", children: "Notification Frequency" },
                {
                  type: "Combobox",
                  id: "notifications",
                  placeholder: "Select frequency...",
                  options: [
                    { value: "realtime", label: "Real-time" },
                    { value: "hourly", label: "Hourly" },
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                    { value: "never", label: "Never" }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        type: "CardFooter",
        className: "flex gap-3",
        children: [
          { type: "Button", variant: "outline", children: "Cancel" },
          { type: "Button", variant: "primary", children: "Save Preferences" }
        ]
      }
    ]
  };

  // Advanced search example
  const advancedSearchSpec: UISpecification = {
    type: "Alert",
    className: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    children: [
      {
        type: "Stack",
        spacing: "4",
        children: [
          {
            type: "Text",
            className: "font-semibold",
            children: "Job Search Filters"
          },
          {
            type: "Grid",
            columns: { _: 1, md: 2 },
            gap: "4",
            children: [
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", htmlFor: "department", children: "Department" },
                  {
                    type: "Combobox",
                    id: "department",
                    placeholder: "All departments...",
                    options: [
                      { value: "engineering", label: "Engineering" },
                      { value: "design", label: "Design" },
                      { value: "product", label: "Product" },
                      { value: "marketing", label: "Marketing" },
                      { value: "sales", label: "Sales" },
                      { value: "hr", label: "Human Resources" },
                      { value: "finance", label: "Finance" },
                      { value: "operations", label: "Operations" }
                    ]
                  }
                ]
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", htmlFor: "location", children: "Location" },
                  {
                    type: "Combobox",
                    id: "location",
                    placeholder: "Any location...",
                    searchPlaceholder: "Search locations...",
                    options: [
                      { value: "remote", label: "Remote" },
                      { value: "sf", label: "San Francisco, CA" },
                      { value: "ny", label: "New York, NY" },
                      { value: "la", label: "Los Angeles, CA" },
                      { value: "chicago", label: "Chicago, IL" },
                      { value: "boston", label: "Boston, MA" },
                      { value: "seattle", label: "Seattle, WA" },
                      { value: "austin", label: "Austin, TX" },
                      { value: "denver", label: "Denver, CO" }
                    ]
                  }
                ]
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", htmlFor: "experience", children: "Experience Level" },
                  {
                    type: "Combobox",
                    id: "experience",
                    placeholder: "Select level...",
                    options: [
                      { value: "intern", label: "Internship" },
                      { value: "entry", label: "Entry Level" },
                      { value: "mid", label: "Mid Level" },
                      { value: "senior", label: "Senior Level" },
                      { value: "lead", label: "Lead / Principal" },
                      { value: "executive", label: "Executive" }
                    ]
                  }
                ]
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", htmlFor: "type", children: "Employment Type" },
                  {
                    type: "Combobox",
                    id: "type",
                    placeholder: "All types...",
                    options: [
                      { value: "full-time", label: "Full-time" },
                      { value: "part-time", label: "Part-time" },
                      { value: "contract", label: "Contract" },
                      { value: "freelance", label: "Freelance" },
                      { value: "temporary", label: "Temporary" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "Flex",
            justify: "end",
            gap: "3",
            children: [
              { type: "Button", variant: "outline", size: "sm", children: "Clear Filters" },
              { type: "Button", variant: "primary", size: "sm", children: "Search Jobs" }
            ]
          }
        ]
      }
    ]
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Combobox Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              An autocomplete input with search functionality that allows users to select from a predefined list of options or filter through large datasets efficiently.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Combobox component combines the functionality of a select dropdown with a search input, providing users with a powerful way to find and select options from potentially large lists.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Built-in search functionality to filter options</li>
                <li>Keyboard navigation support (arrow keys, enter, escape)</li>
                <li>Customizable placeholder and search placeholder text</li>
                <li>Empty state message when no options match the search</li>
                <li>Disabled state support</li>
                <li>Controlled component with value and onChange props</li>
                <li>Accessible by default with proper ARIA attributes</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple combobox with a few options to choose from.
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

          {/* Searchable Section */}
          <section id="searchable" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Searchable Combobox</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              With many options, the search functionality helps users find what they need quickly.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(searchableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(searchableSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* States Section */}
          <section id="states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Combobox components can be in different states including disabled and pre-selected.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(statesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(statesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Custom Placeholder Section */}
          <section id="custom-placeholder" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Placeholders</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize both the button placeholder and search input placeholder text.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(placeholderSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(placeholderSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Empty State Section */}
          <section id="empty-state" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Empty State</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure a custom message when no options match the search query.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(emptyStateSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(emptyStateSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Long Lists Section */}
          <section id="long-lists" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Long Option Lists</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The combobox handles long lists efficiently with scrollable dropdown and search functionality.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(longListSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(longListSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Form Integration Section */}
          <section id="integration" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form Integration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Combobox components work seamlessly within forms alongside other input components.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(formExampleSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(formExampleSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Combobox&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">options</td>
                    <td className="py-3 px-4 font-mono">Array&lt;{`{value: string, label: string}`}&gt;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Array of options to display</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">The controlled value of the combobox</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onValueChange</td>
                    <td className="py-3 px-4 font-mono">ActionSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Action to execute when value changes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">placeholder</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;Select...&quot;</td>
                    <td className="py-3 px-4">Placeholder text when no value is selected</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">searchPlaceholder</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;Search...&quot;</td>
                    <td className="py-3 px-4">Placeholder text for the search input</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">emptyText</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;No options found.&quot;</td>
                    <td className="py-3 px-4">Text to display when no options match the search</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the combobox is disabled</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">id</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">HTML id attribute for form association</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how the Combobox component works in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Advanced Search Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Advanced Search Filters</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(advancedSearchSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(advancedSearchSpec, null, 2)}
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