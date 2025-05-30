import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@banja/react-jedi";
import type { ComponentSpec } from "@banja/react-jedi";
import { usePageMetadata } from "../../lib/meta";
import { Heading, Text, spacing } from "../../components/ui";
import { PageHeader } from "../../components/ui/page-header";
import { ChevronDown } from "lucide-react";

type ComponentCategory = {
  id: string;
  title: string;
  description: string;
  components: {
    name: string;
    description: string;
    status: "completed" | "in-progress" | "planned";
    type: "custom" | "shadcn";
  }[];
};

const categories: ComponentCategory[] = [
  {
    id: "layout",
    title: "Layout Components",
    description: "Essential components for creating layouts and structured content.",
    components: [
      {
        name: "Container",
        description: "A centered wrapper component with max-width and padding.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Box",
        description: "A primitive div-like component for general layout.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Grid",
        description: "CSS Grid-based layout system for complex arrangements.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Flex",
        description: "Flexbox-based layout with alignment and distribution options.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Stack",
        description: "Vertical layout component with consistent spacing.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Group",
        description: "Horizontal layout with consistent spacing between items.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Center",
        description: "Centers content both horizontally and vertically.",
        status: "completed",
        type: "custom",
      },
      {
        name: "SimpleGrid",
        description: "Responsive grid with equal-width columns.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Masonry",
        description: "Pinterest-style masonry layout for dynamic content.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Spacer",
        description: "Dynamic spacing component for flexible layouts.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Hero",
        description: "Hero section with multiple variants for landing pages.",
        status: "completed",
        type: "custom",
      },
    ],
  },
  {
    id: "ui",
    title: "UI Components",
    description: "Interactive user interface components.",
    components: [
      {
        name: "Button",
        description: "Clickable button with multiple variants and states.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Input",
        description: "Text input field with various styles and validation.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Label",
        description: "Form label for accessibility and usability.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Textarea",
        description: "Multi-line text input for longer content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Select",
        description: "Dropdown selection component with search capabilities.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Switch",
        description: "Toggle switch for boolean values.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Checkbox",
        description: "Checkable box for multiple selections.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "RadioGroup",
        description: "Radio button group for single selection.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Slider",
        description: "Range slider for numeric values.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Toggle",
        description: "Toggle button with pressed states.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "ToggleGroup",
        description: "Group of toggleable buttons.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Form",
        description: "Form wrapper with validation and submission handling.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Separator",
        description: "Visual separator for content sections.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Badge",
        description: "Small status indicator or label.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "typography",
    title: "Typography Components",
    description: "Text and content components for displaying information.",
    components: [
      {
        name: "Heading",
        description: "Semantic headings with responsive sizes and weights.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Text",
        description: "Text component with size and weight variations.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Blockquote",
        description: "Styled quotation blocks with attribution.",
        status: "completed",
        type: "custom",
      },
    ],
  },
  {
    id: "media",
    title: "Media Components",
    description: "Components for displaying images, videos, and other media.",
    components: [
      {
        name: "Image",
        description: "Responsive image component with loading states.",
        status: "completed",
        type: "custom",
      },
      {
        name: "AspectRatio",
        description: "Maintains aspect ratio for media content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Avatar",
        description: "User avatar with fallback states.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "feedback",
    title: "Feedback Components",
    description: "Components for user feedback and status indication.",
    components: [
      {
        name: "Progress",
        description: "Progress indicator with percentage display.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Skeleton",
        description: "Loading placeholder for content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Alert",
        description: "Alert message with various severity levels.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "AlertDialog",
        description: "Modal dialog for important alerts.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Toast",
        description: "Temporary notification messages.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "disclosure",
    title: "Disclosure Components",
    description: "Components for showing and hiding content.",
    components: [
      {
        name: "Accordion",
        description: "Collapsible sections for organizing content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Collapsible",
        description: "Expandable/collapsible content area.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Tabs",
        description: "Tabbed interface for switching between views.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "data-display",
    title: "Data Display",
    description: "Components for displaying tabular and structured data.",
    components: [
      {
        name: "Table",
        description: "Basic table component for structured data.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "DataTable",
        description: "Advanced table with sorting, filtering, and pagination.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Chart",
        description: "Charts and graphs for data visualization.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Card",
        description: "Content container with header and footer sections.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "specialty",
    title: "Specialty Components",
    description: "Specialized components for specific use cases.",
    components: [
      {
        name: "Carousel",
        description: "Image/content carousel with navigation controls.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "ScrollArea",
        description: "Custom scrollable container with styled scrollbars.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Resizable",
        description: "Resizable panels for flexible layouts.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Testimonial",
        description: "Display customer testimonials with multiple style variants.",
        status: "completed",
        type: "custom",
      },
      {
        name: "TimelineComponent",
        description: "Timeline display for chronological events.",
        status: "completed",
        type: "custom",
      },
      {
        name: "CallToAction",
        description: "Call-to-action sections with various styles.",
        status: "completed",
        type: "custom",
      },
      {
        name: "FeatureCard",
        description: "Feature showcase cards for product highlights.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Footer",
        description: "Website footer with multiple layout options.",
        status: "completed",
        type: "custom",
      },
      {
        name: "PricingTable",
        description: "Pricing tables with multiple tiers and feature comparisons.",
        status: "completed",
        type: "custom",
      },
    ],
  },
  {
    id: "overlays",
    title: "Overlays",
    description: "Overlay components that appear above the main content.",
    components: [
      {
        name: "Dialog",
        description: "Modal dialog for user interactions.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Sheet",
        description: "Side panel that slides in from the edge.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Popover",
        description: "Floating content that appears on interaction.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "HoverCard",
        description: "Card that appears on hover with additional info.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Tooltip",
        description: "Small popup for brief information on hover.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Sonner",
        description: "Toast notification system for alerts and messages.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Drawer",
        description: "Mobile-friendly drawer component.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation Components",
    description: "Navigation elements including menus, breadcrumbs, and toolbars.",
    components: [
      {
        name: "DropdownMenu",
        description: "Dropdown menu with nested items and keyboard navigation.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "ContextMenu",
        description: "Right-click context menu for actions.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Menubar",
        description: "Application menubar with dropdown menus.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "NavigationMenu",
        description: "Horizontal navigation menu with dropdowns.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Breadcrumb",
        description: "Breadcrumb navigation for page hierarchy.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Pagination",
        description: "Page navigation for lists and tables.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Command",
        description: "Command palette for search and actions.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "pickers",
    title: "Pickers",
    description: "Date, time, and value selection components.",
    components: [
      {
        name: "Calendar",
        description: "Calendar component for date selection.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "DatePicker",
        description: "Date picker with calendar dropdown.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Combobox",
        description: "Searchable select input with autocomplete.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "InputOTP",
        description: "One-time password input component.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
];

// Dropdown component for filters
interface FilterDropdownProps {
  readonly label: string;
  readonly value: string;
  readonly options: readonly { readonly label: string; readonly value: string }[];
  readonly onChange: (value: string) => void;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}:</span>
        <span className="text-sm text-gray-900 dark:text-white">{selectedOption?.label || "All"}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
            }}
            role="button"
            tabIndex={0}
            aria-label="Close dropdown"
          />
          <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-40">
            <div className="p-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    value === option.value
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ShowcasePage() {
  usePageMetadata({
    title: "Component Showcase",
    description:
      "Complete component library showcasing all React Jedi components with live examples and JSON specifications",
  });
  const [activeFilter, setActiveFilter] = useState<"all" | "completed" | "in-progress" | "planned">(
    "all"
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<"all" | "custom" | "shadcn">("all");
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);
  const [showJson, setShowJson] = useState<string | null>(null);

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      components: category.components
        .filter((component) => activeFilter === "all" || component.status === activeFilter)
        .filter((component) => activeType === "all" || component.type === activeType),
    }))
    .filter((category) => category.components.length > 0)
    .filter((category) => !activeCategory || category.id === activeCategory);

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in-progress" },
    { label: "Planned", value: "planned" },
  ];

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    ...categories.map((cat) => ({ label: cat.title, value: cat.id })),
  ];

  const typeOptions = [
    { label: "All Types", value: "all" },
    { label: "Custom", value: "custom" },
    { label: "@shadcn/ui", value: "shadcn" },
  ];

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <PageHeader 
        title="Component Showcase"
        description="Explore our comprehensive component library with interactive previews, live examples, and JSON specifications."
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/documentation"
            className="group relative px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <span className="relative z-10">View Documentation</span>
          </Link>
          <Link
            to="/examples"
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
          >
            Browse Examples
          </Link>
        </div>
      </PageHeader>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8">
        <div className={`${spacing.default}`}>
          {/* Filters - Compact Dropdown Design */}
          <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filters:</span>
              <FilterDropdown
                label="Status"
                value={activeFilter}
                options={statusOptions}
                onChange={(value) => setActiveFilter(value as 'all' | 'stable' | 'beta' | 'experimental')}
              />
              <FilterDropdown
                label="Category"
                value={activeCategory || "all"}
                options={categoryOptions}
                onChange={(value) => setActiveCategory(value === "all" ? null : value)}
              />
              <FilterDropdown
                label="Type"
                value={activeType}
                options={typeOptions}
                onChange={(value) => setActiveType(value as 'all' | 'layout' | 'content' | 'interactive' | 'data')}
              />
            </div>
          </div>

          {/* Categories */}
          {filteredCategories.map((category) => (
            <section key={category.id} className="mb-16">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.components.map((component) => (
                  <div
                    key={component.name}
                    className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-800"
                  >
                    {/* Component Preview - Always visible by default */}
                    {component.status === "completed" && componentPreviews[component.name] && (
                      <div
                        className={`bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-700 ${
                          expandedComponent === component.name ? "" : "max-h-64 overflow-hidden"
                        }`}
                      >
                        <div className="rounded-lg overflow-hidden">
                          {render(componentPreviews[component.name])}
                        </div>
                      </div>
                    )}

                    <div className="p-6 relative">
                      {/* Type Badge */}
                      <div className="absolute -top-2 right-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            component.type === "custom"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {component.type === "custom" ? "Custom" : "@shadcn/ui"}
                        </span>
                      </div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            (component.status === "completed" && "bg-green-500") ||
                            (component.status === "in-progress" && "bg-amber-500") ||
                            "bg-gray-500"
                          }`}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          {(component.status === "completed" && "Ready") ||
                            (component.status === "in-progress" && "In Progress") ||
                            "Planned"}
                        </span>
                      </div>

                      <Heading
                        as="h3"
                        size="card"
                        className={`${spacing.xs} flex items-center gap-2`}
                      >
                        {component.name}
                      </Heading>

                      <Text size="base" variant="muted" className={spacing.small}>
                        {component.description}
                      </Text>

                      <div className="flex items-center gap-3 mt-auto pt-2">
                        {component.name === "ScrollArea" ||
                        component.name === "Resizable" ||
                        component.name === "Sheet" ||
                        component.name === "Tabs" ||
                        component.name === "Accordion" ||
                        component.name === "Dialog" ||
                        component.name === "Hero" ||
                        component.name === "Button" ||
                        component.name === "CallToAction" ||
                        component.name === "Card" ||
                        component.name === "Carousel" ||
                        component.name === "Checkbox" ||
                        component.name === "FeatureCard" ||
                        component.name === "Footer" ||
                        component.name === "Form" ||
                        component.name === "Image" ||
                        component.name === "Input" ||
                        component.name === "Label" ||
                        component.name === "NavigationMenu" ||
                        component.name === "Breadcrumb" ||
                        component.name === "Pagination" ||
                        component.name === "Popover" ||
                        component.name === "PricingTable" ||
                        component.name === "Progress" ||
                        component.name === "RadioGroup" ||
                        component.name === "Select" ||
                        component.name === "Slider" ||
                        component.name === "Switch" ||
                        component.name === "Toggle" ||
                        component.name === "ToggleGroup" ||
                        component.name === "Testimonial" ||
                        component.name === "Text" ||
                        component.name === "Textarea" ||
                        component.name === "Toast" ||
                        component.name === "Tooltip" ||
                        component.name === "Container" ||
                        component.name === "Box" ||
                        component.name === "Grid" ||
                        component.name === "Flex" ||
                        component.name === "Stack" ||
                        component.name === "Group" ||
                        component.name === "Center" ||
                        component.name === "HoverCard" ||
                        component.name === "SimpleGrid" ||
                        component.name === "Spacer" ||
                        component.name === "Separator" ||
                        component.name === "Badge" ||
                        component.name === "Blockquote" ||
                        component.name === "Heading" ||
                        component.name === "Masonry" ||
                        component.name === "AspectRatio" ||
                        component.name === "Avatar" ||
                        component.name === "Skeleton" ||
                        component.name === "Alert" ||
                        component.name === "AlertDialog" ||
                        component.name === "Collapsible" ||
                        component.name === "ContextMenu" ||
                        component.name === "Table" ||
                        component.name === "DataTable" ||
                        component.name === "Chart" ||
                        component.name === "Drawer" ||
                        component.name === "DropdownMenu" ||
                        component.name === "Menubar" ||
                        component.name === "Command" ||
                        component.name === "Calendar" ? (
                          <Link
                            to={`/showcase/${component.name.toLowerCase().replaceAll(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}`}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            Full Demo
                          </Link>
                        ) : null}

                        {/* Toggle Preview */}
                        {componentPreviews[component.name] && (
                          <button
                            onClick={() =>
                              setExpandedComponent(
                                expandedComponent === component.name ? null : component.name
                              )
                            }
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            {expandedComponent === component.name ? "Collapse" : "Expand"}
                          </button>
                        )}

                        <button
                          onClick={() =>
                            setShowJson(showJson === component.name ? null : component.name)
                          }
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                          {showJson === component.name ? "Hide JSON" : "See JSON"}
                        </button>
                      </div>

                      {/* JSON Display */}
                      {showJson === component.name && componentPreviews[component.name] && (
                        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                            {JSON.stringify(componentPreviews[component.name], null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}

// Component preview specifications
const componentPreviews: Record<string, ComponentSpec> = {
  Container: {
    type: "Container",
    size: "medium",
    className: "bg-gray-100 dark:bg-gray-800 py-8",
    children: {
      type: "Text",
      children: "I'm contained within a Container component",
      className: "text-center",
    },
  },
  Box: {
    type: "Box",
    className:
      "p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700",
    children: {
      type: "Text",
      children: "A basic Box component for general layout",
    },
  },
  Grid: {
    type: "Grid",
    columns: { base: 1, md: 3 },
    gap: "4",
    children: [
      {
        type: "Box",
        className: "p-4 bg-blue-100 dark:bg-blue-900 rounded",
        children: "Grid Item 1",
      },
      {
        type: "Box",
        className: "p-4 bg-purple-100 dark:bg-purple-900 rounded",
        children: "Grid Item 2",
      },
      {
        type: "Box",
        className: "p-4 bg-green-100 dark:bg-green-900 rounded",
        children: "Grid Item 3",
      },
    ],
  },
  Flex: {
    type: "Flex",
    justify: "space-between",
    align: "center",
    className: "p-4",
    children: [
      { type: "Button", children: "Button 1", variant: "outline" },
      { type: "Button", children: "Button 2", variant: "outline" },
      { type: "Button", children: "Button 3", variant: "outline" },
    ],
  },
  Stack: {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        className: "p-3 bg-gray-100 dark:bg-gray-800 rounded",
        children: "Stack Item 1",
      },
      {
        type: "Box",
        className: "p-3 bg-gray-100 dark:bg-gray-800 rounded",
        children: "Stack Item 2",
      },
      {
        type: "Box",
        className: "p-3 bg-gray-100 dark:bg-gray-800 rounded",
        children: "Stack Item 3",
      },
    ],
  },
  Group: {
    type: "Group",
    spacing: "2",
    children: [
      { type: "Button", children: "First", size: "sm", variant: "outline" },
      { type: "Button", children: "Second", size: "sm", variant: "outline" },
      { type: "Button", children: "Third", size: "sm", variant: "outline" },
    ],
  },
  Center: {
    type: "Center",
    className: "h-32 bg-gray-100 dark:bg-gray-800 rounded",
    children: {
      type: "Text",
      children: "Centered Content",
      className: "font-semibold",
    },
  },
  SimpleGrid: {
    type: "SimpleGrid",
    columns: 3,
    spacing: "4",
    children: Array.from({ length: 6 }).map((_, i) => ({
      type: "Box",
      className: "p-4 bg-gray-200 dark:bg-gray-700 rounded text-center",
      children: `Item ${i + 1}`,
    })),
  },
  Heading: {
    type: "Stack",
    spacing: "2",
    children: [
      { type: "Heading", level: "h1", children: "Heading Level 1" },
      { type: "Heading", level: "h2", children: "Heading Level 2" },
      { type: "Heading", level: "h3", children: "Heading Level 3" },
    ],
  },
  Text: {
    type: "Stack",
    spacing: "3",
    children: [
      { type: "Text", size: "large", weight: "bold", children: "Large Bold Text" },
      { type: "Text", size: "base", children: "Base Regular Text" },
      { type: "Text", size: "small", variant: "muted", children: "Small Muted Text" },
    ],
  },
  Button: {
    type: "Group",
    spacing: "2",
    children: [
      { type: "Button", children: "Default" },
      { type: "Button", variant: "secondary", children: "Secondary" },
      { type: "Button", variant: "outline", children: "Outline" },
      { type: "Button", variant: "ghost", children: "Ghost" },
      { type: "Button", variant: "destructive", children: "Destructive" },
    ],
  },
  Input: {
    type: "Stack",
    spacing: "3",
    children: [
      { type: "Input", placeholder: "Default input" },
      { type: "Input", inputType: "email", placeholder: "Email input" },
      { type: "Input", inputType: "password", placeholder: "Password input" },
      { type: "Input", disabled: true, placeholder: "Disabled input" },
    ],
  },
  Label: {
    type: "Stack",
    spacing: "2",
    children: [
      { type: "Label", children: "Form Label" },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "demo", children: "Email Address" },
          { type: "Input", id: "demo", inputType: "email", placeholder: "Enter email" },
        ],
      },
    ],
  },
  Textarea: {
    type: "Textarea",
    placeholder: "Enter your message here...",
    className: "min-h-[100px]",
  },
  Select: {
    type: "Select",
    children: [
      {
        type: "SelectTrigger",
        className: "w-[200px]",
        children: {
          type: "SelectValue",
          placeholder: "Select option",
        },
      },
      {
        type: "SelectContent",
        children: [
          { type: "SelectItem", value: "option1", children: "Option 1" },
          { type: "SelectItem", value: "option2", children: "Option 2" },
          { type: "SelectItem", value: "option3", children: "Option 3" },
        ],
      },
    ],
  },
  Switch: {
    type: "Flex",
    align: "center",
    gap: "3",
    children: [
      { type: "Switch", id: "demo-switch" },
      { type: "Label", htmlFor: "demo-switch", children: "Enable notifications" },
    ],
  },
  Checkbox: {
    type: "Flex",
    align: "center",
    gap: "2",
    children: [
      { type: "Checkbox", id: "demo-check" },
      { type: "Label", htmlFor: "demo-check", children: "I agree to the terms" },
    ],
  },
  RadioGroup: {
    type: "RadioGroup",
    defaultValue: "option1",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option1", id: "r1" },
          { type: "Label", htmlFor: "r1", children: "Option 1" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option2", id: "r2" },
          { type: "Label", htmlFor: "r2", children: "Option 2" },
        ],
      },
    ],
  },
  Slider: {
    type: "Box",
    className: "py-4",
    children: {
      type: "Slider",
      defaultValue: [50],
      max: 100,
      step: 1,
      className: "w-full",
    },
  },
  Badge: {
    type: "Group",
    spacing: "2",
    children: [
      { type: "Badge", children: "Default" },
      { type: "Badge", variant: "secondary", children: "Secondary" },
      { type: "Badge", variant: "outline", children: "Outline" },
      { type: "Badge", variant: "destructive", children: "Destructive" },
    ],
  },
  Toggle: {
    type: "Group",
    spacing: "2",
    children: [
      { type: "Toggle", children: "Toggle" },
      { type: "Toggle", pressed: true, children: "Pressed" },
      { type: "Toggle", disabled: true, children: "Disabled" },
    ],
  },
  Separator: {
    type: "Stack",
    spacing: "4",
    children: [
      { type: "Text", children: "Above Separator" },
      { type: "Separator" },
      { type: "Text", children: "Below Separator" },
    ],
  },
  Blockquote: {
    type: "Blockquote",
    children: "This is a blockquote component with styled text and spacing.",
  },
  Image: {
    type: "Image",
    src: "https://via.placeholder.com/300x200",
    alt: "Placeholder image",
    className: "rounded-lg",
  },
  AspectRatio: {
    type: "AspectRatio",
    ratio: 16 / 9,
    children: {
      type: "Image",
      src: "https://via.placeholder.com/800x450",
      alt: "16:9 aspect ratio",
      className: "rounded-lg object-cover w-full h-full",
    },
  },
  Avatar: {
    type: "Group",
    spacing: "3",
    children: [
      {
        type: "Avatar",
        children: [
          {
            type: "AvatarImage",
            src: "https://github.com/shadcn.png",
            alt: "@shadcn",
          },
          { type: "AvatarFallback", children: "CN" },
        ],
      },
      {
        type: "Avatar",
        children: [{ type: "AvatarFallback", children: "JD" }],
      },
    ],
  },
  Card: {
    type: "Card",
    className: "w-full max-w-sm",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Card Title" },
          {
            type: "CardDescription",
            children: "Card description that explains the content",
          },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Text",
          children: "This is the main content area of the card component.",
        },
      },
      {
        type: "CardFooter",
        children: [
          { type: "Button", variant: "outline", children: "Cancel" },
          { type: "Button", className: "ml-auto", children: "Save" },
        ],
      },
    ],
  },
  Skeleton: {
    type: "Stack",
    spacing: "3",
    children: [
      { type: "Skeleton", className: "h-4 w-[250px]" },
      { type: "Skeleton", className: "h-4 w-[200px]" },
      { type: "Skeleton", className: "h-4 w-[150px]" },
    ],
  },
  Tooltip: {
    type: "Tooltip",
    children: [
      {
        type: "TooltipTrigger",
        children: [
          {
            type: "Button",
            variant: "outline",
            children: "Hover me",
          },
        ],
      },
      {
        type: "TooltipContent",
        children: [
          {
            type: "Text",
            children: "This is a tooltip!",
          },
        ],
      },
    ],
  },
  Popover: {
    type: "Popover",
    children: [
      {
        type: "PopoverTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Open popover",
        },
      },
      {
        type: "PopoverContent",
        className: "w-80",
        children: [
          { type: "Text", className: "font-semibold", children: "Popover Content" },
          {
            type: "Text",
            className: "text-sm text-gray-600 dark:text-gray-400",
            children: "This is a popover with some content inside.",
          },
        ],
      },
    ],
  },
  Carousel: {
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
  },
  Sheet: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Sheet component - View full demo →",
    },
  },
  Tabs: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Tabs component - View full demo →",
    },
  },
  Accordion: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Accordion component - View full demo →",
    },
  },
  Dialog: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Dialog component - View full demo →",
    },
  },
  ScrollArea: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "ScrollArea component - View full demo →",
    },
  },
  Resizable: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Resizable component - View full demo →",
    },
  },
  CallToAction: {
    type: "Box",
    className: "p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center",
    children: [
      {
        type: "Heading",
        level: "h3",
        className: "mb-4 text-white",
        children: "Ready to Get Started?",
      },
      {
        type: "Text",
        className: "mb-6 text-gray-100",
        children: "Join thousands of developers building with React Jedi",
      },
      {
        type: "Flex",
        justify: "center",
        gap: "4",
        children: [
          {
            type: "Button",
            size: "lg",
            children: "Start Building",
          },
          {
            type: "Button",
            variant: "outline",
            size: "lg",
            className: "text-white border-white hover:bg-white hover:text-blue-600",
            children: "Learn More",
          },
        ],
      },
    ],
  },
  FeatureCard: {
    type: "Card",
    className: "p-6",
    children: [
      {
        type: "Box",
        className: "mb-4 h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center",
        children: {
          type: "Text",
          className: "text-blue-600 dark:text-blue-400 text-xl",
          children: "✨",
        },
      },
      {
        type: "Heading",
        level: "h4",
        className: "mb-2",
        children: "Feature Title",
      },
      {
        type: "Text",
        className: "text-gray-600 dark:text-gray-400",
        children: "This is a feature card component for showcasing product features with icons.",
      },
    ],
  },
  Footer: {
    type: "Box",
    className: "border-t border-gray-200 dark:border-gray-800 pt-8",
    children: [
      {
        type: "Grid",
        columns: { base: 1, md: 4 },
        gap: "8",
        className: "mb-8",
        children: [
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: "h5",
                className: "mb-4",
                children: "Company",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "About",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Team",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Careers",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: "h5",
                className: "mb-4",
                children: "Product",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Features",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Pricing",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Docs",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: "h5",
                className: "mb-4",
                children: "Resources",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Community",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Support",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Blog",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: "h5",
                className: "mb-4",
                children: "Legal",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Privacy",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Terms",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "License",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Text",
        className: "text-center text-sm text-gray-600 dark:text-gray-400",
        children: "© 2024 React Jedi. All rights reserved.",
      },
    ],
  },
  Collapsible: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Collapsible component - Expandable content area",
    },
  },
  Toast: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Toast notifications - View demo",
    },
  },
  Calendar: {
    type: "calendar",
    defaultMonth: new Date().toISOString().split('T')[0],
    mode: "single",
  },
  DatePicker: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Date Picker - Select date with calendar",
    },
  },
  Combobox: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Combobox - Searchable select input",
    },
  },
  InputOTP: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Input OTP - One-time password input",
    },
  },
  Table: {
    type: "Table",
    head: {
      rows: [
        {
          cells: [
            { content: "Name" },
            { content: "Role", align: "center" },
            { content: "Status", align: "right" },
          ],
        },
      ],
    },
    body: {
      rows: [
        {
          cells: [
            { content: "John Doe" },
            { content: "Developer", align: "center" },
            { content: "Active", align: "right" },
          ],
        },
        {
          cells: [
            { content: "Jane Smith" },
            { content: "Designer", align: "center" },
            { content: "Active", align: "right" },
          ],
        },
        {
          cells: [
            { content: "Bob Wilson" },
            { content: "Manager", align: "center" },
            { content: "Inactive", align: "right" },
          ],
        },
      ],
    },
  },
  Testimonial: {
    type: "Testimonial",
    variant: "card",
    content: "React Jedi has transformed how we build our UI. The server-driven approach gives us incredible flexibility.",
    author: {
      name: "Sarah Chen",
      role: "Frontend Lead",
      company: "TechCorp",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    rating: 5
  },
  DataTable: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Data Table - Advanced sortable table",
    },
  },
  Chart: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Chart - Data visualization component",
    },
  },
  Progress: {
    type: "Box",
    className: "space-y-3",
    children: [
      { type: "Progress", value: 33, className: "h-2" },
      {
        type: "Text",
        className: "text-sm text-gray-600 dark:text-gray-400",
        children: "33% Complete",
      },
    ],
  },
  HoverCard: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Hover Card - Content on hover",
    },
  },
  Alert: {
    type: "Alert",
    className: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    children: [
      {
        type: "Text",
        className: "font-semibold",
        children: "Success!",
      },
      {
        type: "Text",
        className: "text-sm",
        children: "Your operation completed successfully.",
      },
    ],
  },
  AlertDialog: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Alert Dialog - Confirmation dialog",
    },
  },
  Form: {
    type: "Form",
    defaultValues: {
      name: "",
      email: "",
    },
    validation: {
      name: {
        required: "Name is required",
      },
      email: {
        required: "Email is required",
        email: "Please enter a valid email",
      },
    },
    children: [
      {
        type: "FormField",
        name: "name",
        children: [
          {
            type: "FormItem",
            children: [
              { type: "FormLabel", children: "Name" },
              {
                type: "FormControl",
                children: [{ type: "Input", placeholder: "Your name" }],
              },
              { type: "FormMessage" },
            ],
          },
        ],
      },
      {
        type: "FormField",
        name: "email",
        children: [
          {
            type: "FormItem",
            children: [
              { type: "FormLabel", children: "Email" },
              {
                type: "FormControl",
                children: [{ type: "Input", inputType: "email", placeholder: "your@email.com" }],
              },
              { type: "FormMessage" },
            ],
          },
        ],
      },
      {
        type: "Box",
        className: "pt-2",
        children: [{ type: "Button", children: "Submit", variant: "primary" }],
      },
    ],
  },
  DropdownMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Dropdown Menu - Navigation menu",
    },
  },
  ContextMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Context Menu - Right-click menu",
    },
  },
  Menubar: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Menubar - Application menu bar",
    },
  },
  NavigationMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Navigation Menu - Horizontal navigation",
    },
  },
  Breadcrumb: {
    type: "breadcrumb",
    items: [
      { label: "Home", href: "/" },
      { label: "Components", href: "/showcase" },
      { label: "Breadcrumb", isCurrentPage: true },
    ],
  },
  Pagination: {
    type: "pagination",
    totalPages: 10,
    currentPage: 5,
    showPrevNext: true,
    showFirstLast: true,
    siblingCount: 1,
    boundaryCount: 1,
  },
  Command: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Command - Command palette",
    },
  },
  ToggleGroup: {
    type: "ToggleGroup",
    defaultValue: "left",
    children: [
      { type: "ToggleGroupItem", value: "left", children: "Left" },
      { type: "ToggleGroupItem", value: "center", children: "Center" },
      { type: "ToggleGroupItem", value: "right", children: "Right" },
    ],
  },
  Spacer: {
    type: "Stack",
    className: "bg-gray-100 dark:bg-gray-800 p-4 rounded",
    children: [
      { type: "Text", children: "Before spacer" },
      { type: "Spacer", size: "large" },
      { type: "Text", children: "After spacer" },
    ],
  },
  Masonry: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Masonry - Pinterest-style grid layout",
    },
  },
  Hero: {
    type: "Hero",
    variant: "centered",
    title: "Welcome to React Jedi",
    subtitle: "Server-Driven UI",
    description: "Build modern applications with JSON-powered components",
    primaryAction: {
      text: "Get Started",
      variant: "default",
    },
    secondaryAction: {
      text: "Learn More",
      variant: "outline",
    },
    className: "min-h-[300px]",
  },
  PricingTable: {
    type: "PricingTable",
    columns: 2,
    tiers: [
      {
        name: "Basic",
        price: 9,
        currency: "$",
        period: "month",
        features: [
          { text: "Up to 10 projects", included: true },
          { text: "5GB storage", included: true },
          { text: "Basic support", included: true },
          { text: "Advanced features", included: false },
        ],
        cta: {
          text: "Get Started",
          variant: "outline",
        },
      },
      {
        name: "Pro",
        price: 29,
        currency: "$",
        period: "month",
        badge: "Popular",
        highlighted: true,
        features: [
          { text: "Unlimited projects", included: true },
          { text: "50GB storage", included: true },
          { text: "Priority support", included: true },
          { text: "Advanced features", included: true },
        ],
        cta: {
          text: "Start Free Trial",
          variant: "default",
        },
      },
    ],
  },
  ToastDemo: {
    type: "Box",
    children: {
      type: "Button",
      variant: "outline",
      children: "Show Toast",
      onClick: () => {
        // Toast would be triggered here in actual implementation
        console.log("Toast triggered");
      },
    },
  },
  ChartLine: {
    type: "Chart",
    chartType: "line",
    data: [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 300 },
      { name: "Mar", value: 600 },
      { name: "Apr", value: 800 },
      { name: "May", value: 500 },
    ],
    config: {
      value: { label: "Value", color: "#8884d8" },
    },
    dataKey: "value",
    height: 200,
    showGrid: true,
    showTooltip: true,
    colors: ["#8884d8"],
  },
};