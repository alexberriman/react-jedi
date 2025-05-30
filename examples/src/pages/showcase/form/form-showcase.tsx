import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function FormShowcase() {
  usePageMetadata({
    title: "Form Component",
    description:
      "A comprehensive showcase of the React Jedi Form component with validation, field types, layouts, and complete examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-form", label: "Basic Form" },
    { id: "validation", label: "Form Validation" },
    { id: "field-types", label: "Different Field Types" },
    { id: "form-layouts", label: "Form Layouts" },
    { id: "form-states", label: "Form States" },
    { id: "nested-objects", label: "Nested Objects" },
    { id: "conditional-fields", label: "Conditional Fields" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic form specification
  const basicFormSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Basic Form" },
          { type: "CardDescription", children: "A simple form without validation" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Form",
          defaultValues: {
            name: "",
            email: "",
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
                      children: [{ type: "Input", placeholder: "Enter your name" }],
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
                      children: [{ type: "Input", inputType: "email", placeholder: "Enter your email" }],
                    },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "Box",
              className: "pt-4",
              children: [{ type: "Button", children: "Submit", variant: "default" }],
            },
          ],
        },
      },
    ],
  };

  // Form with validation
  const validationFormSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Form with Validation" },
          { type: "CardDescription", children: "Form with built-in validation rules" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Form",
          validation: {
            name: {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            },
            email: {
              required: "Email is required",
              email: "Please enter a valid email address",
            },
            age: {
              required: "Age is required",
              min: {
                value: 1,
                message: "Age must be at least 1",
              },
              max: {
                value: 120,
                message: "Age must be less than 120",
              },
            },
          },
          defaultValues: {
            name: "",
            email: "",
            age: "",
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
                      children: [{ type: "Input", placeholder: "Enter your name" }],
                    },
                    { type: "FormDescription", children: "Your full name" },
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
                      children: [{ type: "Input", inputType: "email", placeholder: "Enter your email" }],
                    },
                    { type: "FormDescription", children: "We'll never share your email" },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "FormField",
              name: "age",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Age" },
                    {
                      type: "FormControl",
                      children: [{ type: "Input", inputType: "number", placeholder: "Enter your age" }],
                    },
                    { type: "FormDescription", children: "Your age in years" },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "Box",
              className: "pt-4",
              children: [{ type: "Button", children: "Submit", variant: "primary" }],
            },
          ],
        },
      },
    ],
  };

  // Different field types
  const fieldTypesSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Different Field Types" },
          { type: "CardDescription", children: "Various input types supported in forms" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Form",
          defaultValues: {
            username: "",
            password: "",
            country: "",
            newsletter: false,
            theme: "",
            bio: "",
          },
          children: [
            {
              type: "FormField",
              name: "username",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Username" },
                    {
                      type: "FormControl",
                      children: [{ type: "Input", placeholder: "Enter username" }],
                    },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "FormField",
              name: "password",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Password" },
                    {
                      type: "FormControl",
                      children: [{ type: "Input", inputType: "password", placeholder: "Enter password" }],
                    },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "FormField",
              name: "country",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Country" },
                    {
                      type: "FormControl",
                      children: [
                        {
                          type: "Select",
                          placeholder: "Select country",
                          options: [
                            { value: "us", label: "United States" },
                            { value: "ca", label: "Canada" },
                            { value: "uk", label: "United Kingdom" },
                            { value: "au", label: "Australia" },
                          ],
                        },
                      ],
                    },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "FormField",
              name: "newsletter",
              children: [
                {
                  type: "FormItem",
                  className: "flex flex-row items-start space-x-3 space-y-0",
                  children: [
                    {
                      type: "FormControl",
                      children: [{ type: "Checkbox" }],
                    },
                    {
                      type: "Box",
                      className: "space-y-1 leading-none",
                      children: [
                        { type: "FormLabel", children: "Subscribe to newsletter" },
                        { type: "FormDescription", children: "Get updates on new features and releases" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "FormField",
              name: "theme",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Theme Preference" },
                    {
                      type: "FormControl",
                      children: [
                        {
                          type: "RadioGroup",
                          className: "flex flex-col space-y-1",
                          options: [
                            { value: "light", label: "Light" },
                            { value: "dark", label: "Dark" },
                            { value: "system", label: "System" },
                          ],
                        },
                      ],
                    },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "FormField",
              name: "bio",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Bio" },
                    {
                      type: "FormControl",
                      children: [{ type: "Textarea", placeholder: "Tell us about yourself", rows: 3 }],
                    },
                    { type: "FormDescription", children: "A brief description about yourself" },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "Box",
              className: "pt-4",
              children: [{ type: "Button", children: "Save Profile", variant: "primary" }],
            },
          ],
        },
      },
    ],
  };

  // Form layouts
  const formLayoutSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-2xl",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Form Layout Options" },
          { type: "CardDescription", children: "Different ways to organize form fields" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Form",
          defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
          },
          children: [
            {
              type: "Text",
              className: "font-medium mb-4",
              children: "Personal Information",
            },
            {
              type: "Grid",
              cols: 2,
              gap: "4",
              className: "mb-6",
              children: [
                {
                  type: "FormField",
                  name: "firstName",
                  children: [
                    {
                      type: "FormItem",
                      children: [
                        { type: "FormLabel", children: "First Name" },
                        {
                          type: "FormControl",
                          children: [{ type: "Input", placeholder: "John" }],
                        },
                        { type: "FormMessage" },
                      ],
                    },
                  ],
                },
                {
                  type: "FormField",
                  name: "lastName",
                  children: [
                    {
                      type: "FormItem",
                      children: [
                        { type: "FormLabel", children: "Last Name" },
                        {
                          type: "FormControl",
                          children: [{ type: "Input", placeholder: "Doe" }],
                        },
                        { type: "FormMessage" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Grid",
              cols: 2,
              gap: "4",
              className: "mb-6",
              children: [
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
                          children: [{ type: "Input", inputType: "email", placeholder: "john@example.com" }],
                        },
                        { type: "FormMessage" },
                      ],
                    },
                  ],
                },
                {
                  type: "FormField",
                  name: "phone",
                  children: [
                    {
                      type: "FormItem",
                      children: [
                        { type: "FormLabel", children: "Phone" },
                        {
                          type: "FormControl",
                          children: [{ type: "Input", inputType: "tel", placeholder: "+1 (555) 123-4567" }],
                        },
                        { type: "FormMessage" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Text",
              className: "font-medium mb-4",
              children: "Address Information",
            },
            {
              type: "FormField",
              name: "address",
              children: [
                {
                  type: "FormItem",
                  className: "mb-4",
                  children: [
                    { type: "FormLabel", children: "Street Address" },
                    {
                      type: "FormControl",
                      children: [{ type: "Input", placeholder: "123 Main St" }],
                    },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "Grid",
              cols: 3,
              gap: "4",
              className: "mb-6",
              children: [
                {
                  type: "FormField",
                  name: "city",
                  children: [
                    {
                      type: "FormItem",
                      children: [
                        { type: "FormLabel", children: "City" },
                        {
                          type: "FormControl",
                          children: [{ type: "Input", placeholder: "New York" }],
                        },
                        { type: "FormMessage" },
                      ],
                    },
                  ],
                },
                {
                  type: "FormField",
                  name: "state",
                  children: [
                    {
                      type: "FormItem",
                      children: [
                        { type: "FormLabel", children: "State" },
                        {
                          type: "FormControl",
                          children: [{ type: "Input", placeholder: "NY" }],
                        },
                        { type: "FormMessage" },
                      ],
                    },
                  ],
                },
                {
                  type: "FormField",
                  name: "zip",
                  children: [
                    {
                      type: "FormItem",
                      children: [
                        { type: "FormLabel", children: "ZIP Code" },
                        {
                          type: "FormControl",
                          children: [{ type: "Input", placeholder: "10001" }],
                        },
                        { type: "FormMessage" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Group",
              spacing: "3",
              children: [
                { type: "Button", children: "Save", variant: "primary" },
                { type: "Button", children: "Cancel", variant: "outline" },
              ],
            },
          ],
        },
      },
    ],
  };

  // Registration form example
  const registrationFormSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Create Account" },
          { type: "CardDescription", children: "Sign up for a new account" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Form",
          validation: {
            username: {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              pattern: {
                value: "^[a-zA-Z0-9_]+$",
                message: "Username can only contain letters, numbers, and underscores",
              },
            },
            email: {
              required: "Email is required",
              email: "Please enter a valid email address",
            },
            password: {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            },
            confirmPassword: {
              required: "Please confirm your password",
            },
            terms: {
              required: "You must accept the terms and conditions",
            },
          },
          defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
          },
          children: [
            {
              type: "FormField",
              name: "username",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Username" },
                    {
                      type: "FormControl",
                      children: [{ type: "Input", placeholder: "Choose a username" }],
                    },
                    { type: "FormDescription", children: "This will be your public display name" },
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
              type: "FormField",
              name: "password",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Password" },
                    {
                      type: "FormControl",
                      children: [{ type: "Input", inputType: "password", placeholder: "Create a password" }],
                    },
                    { type: "FormDescription", children: "Must be at least 8 characters" },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "FormField",
              name: "confirmPassword",
              children: [
                {
                  type: "FormItem",
                  children: [
                    { type: "FormLabel", children: "Confirm Password" },
                    {
                      type: "FormControl",
                      children: [{ type: "Input", inputType: "password", placeholder: "Confirm your password" }],
                    },
                    { type: "FormMessage" },
                  ],
                },
              ],
            },
            {
              type: "FormField",
              name: "terms",
              children: [
                {
                  type: "FormItem",
                  className: "flex flex-row items-start space-x-3 space-y-0",
                  children: [
                    {
                      type: "FormControl",
                      children: [{ type: "Checkbox" }],
                    },
                    {
                      type: "Box",
                      className: "space-y-1 leading-none",
                      children: [
                        {
                          type: "FormLabel",
                          children: "I agree to the terms and conditions",
                        },
                        {
                          type: "FormDescription",
                          children: "By signing up, you agree to our Terms of Service and Privacy Policy",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Box",
              className: "pt-4",
              children: [{ type: "Button", children: "Create Account", variant: "primary", className: "w-full" }],
            },
          ],
        },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Form Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful form component built on react-hook-form that provides validation, accessibility, and a clean API for building complex forms with React Jedi.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Form component is a comprehensive form solution that combines the power of react-hook-form with React Jedi&apos;s declarative approach. It provides built-in validation, accessibility features, and supports all standard HTML input types.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Built-in validation with custom error messages</li>
                <li>Support for all HTML input types (text, email, password, number, etc.)</li>
                <li>Accessibility-first design with proper ARIA attributes</li>
                <li>Integration with other React Jedi components (Select, Checkbox, RadioGroup, etc.)</li>
                <li>Flexible layout options with Grid, Stack, and Group components</li>
                <li>TypeScript support with full type safety</li>
                <li>Customizable styling and responsive design</li>
              </ul>
            </div>
          </section>

          {/* Basic Form Section */}
          <section id="basic-form" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Form</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple form with basic fields and no validation.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicFormSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicFormSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Validation Section */}
          <section id="validation" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form Validation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add validation rules to ensure data quality and provide helpful error messages.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(validationFormSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(validationFormSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Field Types Section */}
          <section id="field-types" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Different Field Types</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Forms support various input types including text, password, select, checkbox, radio, and textarea.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(fieldTypesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(fieldTypesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Form Layouts Section */}
          <section id="form-layouts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form Layouts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use Grid and layout components to create sophisticated form layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(formLayoutSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(formLayoutSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Form States Section */}
          <section id="form-states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form States</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>Forms automatically handle various states:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Default State:</strong> Clean form with no validation errors</li>
                <li><strong>Error State:</strong> Shows validation errors below fields</li>
                <li><strong>Loading State:</strong> Can be combined with loading buttons</li>
                <li><strong>Disabled State:</strong> Individual fields can be disabled</li>
              </ul>
            </div>
          </section>

          {/* Nested Objects Section */}
          <section id="nested-objects" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Nested Objects</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>Forms support nested object structures using dot notation in field names:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm">
{`{
  "type": "FormField",
  "name": "address.street",
  "children": [...]
}`}
              </pre>
              <p>This creates a nested structure like <code>{`{ address: { street: "value" } }`}</code> in the form data.</p>
            </div>
          </section>

          {/* Conditional Fields Section */}
          <section id="conditional-fields" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Conditional Fields</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>Use conditional rendering to show/hide fields based on other field values:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm">
{`{
  "type": "FormField",
  "name": "otherField",
  "condition": {
    "field": "mainField",
    "operator": "equals",
    "value": "showOther"
  },
  "children": [...]
}`}
              </pre>
            </div>
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
                    <td className="py-3 px-4 font-mono">{`"Form"`}</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Form fields and other components</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultValues</td>
                    <td className="py-3 px-4 font-mono">object</td>
                    <td className="py-3 px-4">{}</td>
                    <td className="py-3 px-4">Initial form values</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">validation</td>
                    <td className="py-3 px-4 font-mono">ValidationRules</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Validation rules for form fields</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onSubmit</td>
                    <td className="py-3 px-4 font-mono">ActionSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Form submission handler</td>
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
            
            <h3 className="text-lg font-medium mt-6 mb-3">Form Field Components</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium">Component</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                    <th className="text-left py-3 px-4 font-medium">Usage</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">FormField</td>
                    <td className="py-3 px-4">Wrapper for individual form fields</td>
                    <td className="py-3 px-4">Contains FormItem and connects to form state</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">FormItem</td>
                    <td className="py-3 px-4">Container for field components</td>
                    <td className="py-3 px-4">Groups label, control, description, and messages</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">FormLabel</td>
                    <td className="py-3 px-4">Accessible label for form fields</td>
                    <td className="py-3 px-4">Automatically links to form control</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">FormControl</td>
                    <td className="py-3 px-4">Wrapper for the actual input component</td>
                    <td className="py-3 px-4">Contains Input, Select, Checkbox, etc.</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">FormDescription</td>
                    <td className="py-3 px-4">Helper text for form fields</td>
                    <td className="py-3 px-4">Provides additional context or instructions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">FormMessage</td>
                    <td className="py-3 px-4">Error message display</td>
                    <td className="py-3 px-4">Shows validation errors automatically</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world form examples with comprehensive validation and user experience patterns.
            </p>
            
            <div className="space-y-8">
              {/* Registration Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">User Registration Form</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(registrationFormSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(registrationFormSpec, null, 2)}
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