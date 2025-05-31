import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function DataTableShowcase() {
  usePageMetadata({
    title: "DataTable Component",
    description:
      "A comprehensive showcase of the React Jedi DataTable component with sorting, filtering, pagination, row selection, and actions.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-table", label: "Basic DataTable" },
    { id: "with-sorting", label: "Sortable Columns" },
    { id: "with-filtering", label: "Column Filtering" },
    { id: "with-pagination", label: "Pagination" },
    { id: "with-actions", label: "Row Actions" },
    { id: "row-selection", label: "Row Selection" },
    { id: "column-types", label: "Column Types" },
    { id: "minimal-features", label: "Minimal Features" },
    { id: "custom-styling", label: "Custom Styling" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Sample data for demonstrations
  const paymentsData = [
    {
      id: "1",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
      createdAt: "2024-01-13",
    },
    {
      id: "4",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
      createdAt: "2024-01-12",
    },
    {
      id: "5",
      amount: 721,
      status: "failed",
      email: "Gwendolyn71@yahoo.com",
      createdAt: "2024-01-11",
    },
  ];

  const usersData = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-20",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "active",
      lastLogin: "2024-01-19",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "User",
      status: "inactive",
      lastLogin: "2024-01-10",
    },
    {
      id: "4",
      name: "Alice Williams",
      email: "alice.williams@example.com",
      role: "Moderator",
      status: "active",
      lastLogin: "2024-01-20",
    },
  ];

  // Basic DataTable specification
  const basicDataTableSpec: UISpecification = {
    type: "DataTable",
    columns: [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        type: "currency",
        format: {
          currency: "USD",
          locale: "en-US",
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        type: "badge",
      },
    ],
    data: paymentsData,
    features: {
      columnFilter: false,
      viewOptions: false,
      selectable: false,
      sortable: false,
    },
    pagination: {
      enabled: false,
    },
  };

  // Sortable DataTable specification
  const sortableDataTableSpec: UISpecification = {
    type: "DataTable",
    columns: [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        enableSorting: true,
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        enableSorting: true,
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        type: "currency",
        format: {
          currency: "USD",
          locale: "en-US",
        },
        enableSorting: true,
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        type: "badge",
        enableSorting: true,
      },
      {
        id: "createdAt",
        header: "Date",
        accessorKey: "createdAt",
        type: "date",
        enableSorting: true,
      },
    ],
    data: paymentsData,
    features: {
      columnFilter: false,
      viewOptions: false,
      selectable: false,
      sortable: true,
    },
    pagination: {
      enabled: false,
    },
  };

  // DataTable with filtering
  const filteringDataTableSpec: UISpecification = {
    type: "DataTable",
    columns: [
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        enableSorting: true,
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        type: "currency",
        format: {
          currency: "USD",
          locale: "en-US",
        },
        enableSorting: true,
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        type: "badge",
        enableSorting: true,
      },
    ],
    data: paymentsData,
    filterColumn: "email",
    filterPlaceholder: "Filter by email...",
    features: {
      columnFilter: true,
      viewOptions: true,
      selectable: false,
      sortable: true,
    },
    pagination: {
      enabled: false,
    },
  };

  // DataTable with pagination
  const paginatedDataTableSpec: UISpecification = {
    type: "DataTable",
    columns: [
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        enableSorting: true,
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        type: "currency",
        format: {
          currency: "USD",
          locale: "en-US",
        },
        enableSorting: true,
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        type: "badge",
        enableSorting: true,
      },
    ],
    data: paymentsData,
    filterColumn: "email",
    filterPlaceholder: "Filter by email...",
    features: {
      columnFilter: true,
      viewOptions: true,
      selectable: false,
      sortable: true,
    },
    pagination: {
      enabled: true,
      pageSize: 3,
    },
  };

  // DataTable with actions
  const actionsDataTableSpec: UISpecification = {
    type: "DataTable",
    columns: [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        enableSorting: true,
      },
      {
        id: "role",
        header: "Role",
        accessorKey: "role",
        type: "badge",
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        type: "badge",
      },
    ],
    data: usersData,
    filterColumn: "name",
    filterPlaceholder: "Filter by name...",
    actions: [
      {
        label: "Edit User",
        handler: "editUser",
        icon: "edit",
      },
      {
        label: "View Profile",
        handler: "viewProfile",
        icon: "view",
      },
      {
        label: "Delete User",
        handler: "deleteUser",
        icon: "trash",
      },
    ],
    features: {
      columnFilter: true,
      viewOptions: true,
      selectable: false,
      sortable: true,
    },
    pagination: {
      enabled: false,
    },
  };

  // DataTable with row selection
  const selectionDataTableSpec: UISpecification = {
    type: "DataTable",
    columns: [
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        enableSorting: true,
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        type: "currency",
        format: {
          currency: "USD",
          locale: "en-US",
        },
        enableSorting: true,
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        type: "badge",
        enableSorting: true,
      },
    ],
    data: paymentsData,
    filterColumn: "email",
    filterPlaceholder: "Filter by email...",
    features: {
      columnFilter: true,
      viewOptions: true,
      selectable: true,
      sortable: true,
    },
    pagination: {
      enabled: true,
      pageSize: 4,
    },
    onSelectionChange: "handleSelectionChange",
  };

  // Column types demonstration
  const columnTypesSpec: UISpecification = {
    type: "DataTable",
    columns: [
      {
        id: "name",
        header: "Name (Text)",
        accessorKey: "name",
        type: "text",
        enableSorting: true,
      },
      {
        id: "price",
        header: "Price (Currency)",
        accessorKey: "price",
        type: "currency",
        format: {
          currency: "USD",
          locale: "en-US",
        },
        enableSorting: true,
      },
      {
        id: "count",
        header: "Count (Number)",
        accessorKey: "count",
        type: "number",
        enableSorting: true,
      },
      {
        id: "date",
        header: "Date",
        accessorKey: "date",
        type: "date",
        enableSorting: true,
      },
      {
        id: "category",
        header: "Category (Badge)",
        accessorKey: "category",
        type: "badge",
      },
    ],
    data: [
      {
        name: "MacBook Pro",
        price: 1999,
        count: 25,
        date: "2024-01-15",
        category: "electronics",
      },
      {
        name: "Office Chair",
        price: 299,
        count: 50,
        date: "2024-01-14",
        category: "furniture",
      },
      {
        name: "Notebook",
        price: 12.99,
        count: 100,
        date: "2024-01-13",
        category: "supplies",
      },
    ],
    features: {
      columnFilter: false,
      viewOptions: false,
      selectable: false,
      sortable: true,
    },
    pagination: {
      enabled: false,
    },
  };

  // Minimal features DataTable
  const minimalDataTableSpec: UISpecification = {
    type: "DataTable",
    columns: [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        enableSorting: true,
      },
      {
        id: "role",
        header: "Role",
        accessorKey: "role",
      },
    ],
    data: usersData,
    features: {
      columnFilter: false,
      viewOptions: false,
      selectable: false,
      sortable: true,
    },
    pagination: {
      enabled: false,
    },
  };

  // Custom styled DataTable
  const customStyledSpec: UISpecification = {
    type: "DataTable",
    className: "shadow-lg rounded-lg border-2 border-blue-200 dark:border-blue-800",
    columns: [
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        enableSorting: true,
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        type: "currency",
        format: {
          currency: "USD",
          locale: "en-US",
        },
        enableSorting: true,
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        type: "badge",
        enableSorting: true,
      },
    ],
    data: paymentsData.slice(0, 3),
    filterColumn: "email",
    filterPlaceholder: "Search emails...",
    features: {
      columnFilter: true,
      viewOptions: true,
      selectable: false,
      sortable: true,
    },
    pagination: {
      enabled: false,
    },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">DataTable Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful and flexible data table component built on TanStack Table. Features sorting, filtering, pagination, row selection, column visibility controls, and customizable row actions. Perfect for displaying and managing structured data.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The DataTable component provides a complete solution for displaying and interacting with tabular data in React Jedi. Built on TanStack Table, it offers enterprise-grade functionality with a clean, accessible interface that works seamlessly in any application.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multi-column sorting with visual indicators</li>
                <li>Global column filtering with search highlighting</li>
                <li>Customizable pagination with page size options</li>
                <li>Row selection with callbacks for bulk operations</li>
                <li>Column visibility toggles for responsive design</li>
                <li>Row action menus with customizable actions</li>
                <li>Multiple column types (text, number, date, currency, badge)</li>
                <li>Responsive design with horizontal scrolling</li>
                <li>Full accessibility support with ARIA attributes</li>
                <li>Custom styling with className support</li>
              </ul>
            </div>
          </section>

          {/* Basic DataTable Section */}
          <section id="basic-table" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic DataTable</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple data table with columns and data. All advanced features are disabled for a clean, minimal display.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicDataTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicDataTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Sortable Columns Section */}
          <section id="with-sorting" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Sortable Columns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enable sorting on individual columns. Click column headers to sort ascending/descending or clear sorting.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(sortableDataTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(sortableDataTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Column Filtering Section */}
          <section id="with-filtering" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Column Filtering</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add a global filter input to search across a specific column. Also includes column visibility controls.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(filteringDataTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(filteringDataTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Pagination Section */}
          <section id="with-pagination" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Pagination</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Handle large datasets with built-in pagination controls. Configure page size and navigation.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(paginatedDataTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(paginatedDataTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Row Actions Section */}
          <section id="with-actions" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Row Actions</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add contextual actions to each row with a dropdown menu. Perfect for edit, delete, and view operations.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(actionsDataTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(actionsDataTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Row Selection Section */}
          <section id="row-selection" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Row Selection</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enable row selection with checkboxes for bulk operations. Includes select all functionality.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(selectionDataTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(selectionDataTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Column Types Section */}
          <section id="column-types" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Column Types</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Different column types with automatic formatting: text, number, currency, date, and badge.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(columnTypesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(columnTypesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Minimal Features Section */}
          <section id="minimal-features" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Minimal Features</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A clean, minimal table with only basic sorting enabled. Perfect for simple data display.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(minimalDataTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(minimalDataTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Custom Styling Section */}
          <section id="custom-styling" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Apply custom CSS classes to style the data table container. This example shows custom border and shadow styling.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(customStyledSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(customStyledSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;DataTable&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">columns</td>
                    <td className="py-3 px-4 font-mono">DataTableColumn[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Array of column definitions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">data</td>
                    <td className="py-3 px-4 font-mono">object[] | string</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Data array or data source reference</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">filterColumn</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Column ID to use for global filtering</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">filterPlaceholder</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;Filter...&quot;</td>
                    <td className="py-3 px-4">Placeholder text for filter input</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">actions</td>
                    <td className="py-3 px-4 font-mono">DataTableAction[]</td>
                    <td className="py-3 px-4">[]</td>
                    <td className="py-3 px-4">Array of row action definitions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">pagination</td>
                    <td className="py-3 px-4 font-mono">PaginationConfig</td>
                    <td className="py-3 px-4">{`{ enabled: true, pageSize: 10 }`}</td>
                    <td className="py-3 px-4">Pagination configuration</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">features</td>
                    <td className="py-3 px-4 font-mono">FeatureConfig</td>
                    <td className="py-3 px-4">All enabled</td>
                    <td className="py-3 px-4">Feature toggles for table functionality</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onSelectionChange</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler for row selection changes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onAction</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler for row actions</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-4">Column Properties</h3>
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
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">id</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Unique identifier for the column</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">header</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Display text for column header</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">accessorKey</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Property key to access from data object</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">type</td>
                    <td className="py-3 px-4 font-mono">&quot;text&quot; | &quot;number&quot; | &quot;date&quot; | &quot;currency&quot; | &quot;badge&quot; | &quot;custom&quot;</td>
                    <td className="py-3 px-4">&quot;text&quot;</td>
                    <td className="py-3 px-4">Column data type for formatting</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">enableSorting</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether this column is sortable</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">enableHiding</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Whether column can be hidden</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">format</td>
                    <td className="py-3 px-4 font-mono">FormatConfig</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Formatting options for specific types</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes for column cells</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing DataTable usage in different scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Dashboard Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Sales Dashboard</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render({
                    type: "Card",
                    className: "w-full",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          { type: "CardTitle", children: "Recent Transactions" },
                          { type: "CardDescription", children: "Latest payment transactions with status tracking" },
                        ],
                      },
                      {
                        type: "CardContent",
                        children: {
                          type: "DataTable",
                          columns: [
                            {
                              id: "id",
                              header: "Transaction ID",
                              accessorKey: "id",
                              enableSorting: true,
                            },
                            {
                              id: "email",
                              header: "Customer Email",
                              accessorKey: "email",
                              enableSorting: true,
                            },
                            {
                              id: "amount",
                              header: "Amount",
                              accessorKey: "amount",
                              type: "currency",
                              format: {
                                currency: "USD",
                                locale: "en-US",
                              },
                              enableSorting: true,
                            },
                            {
                              id: "status",
                              header: "Status",
                              accessorKey: "status",
                              type: "badge",
                              enableSorting: true,
                            },
                            {
                              id: "createdAt",
                              header: "Date",
                              accessorKey: "createdAt",
                              type: "date",
                              enableSorting: true,
                            },
                          ],
                          data: paymentsData,
                          filterColumn: "email",
                          filterPlaceholder: "Search by email...",
                          actions: [
                            {
                              label: "View Details",
                              handler: "viewTransaction",
                              icon: "view",
                            },
                            {
                              label: "Refund",
                              handler: "refundTransaction",
                              icon: "refund",
                            },
                          ],
                          features: {
                            columnFilter: true,
                            viewOptions: true,
                            selectable: true,
                            sortable: true,
                          },
                          pagination: {
                            enabled: true,
                            pageSize: 4,
                          },
                          onSelectionChange: "handleBulkActions",
                          onAction: "handleTransactionAction",
                        },
                      },
                    ],
                  })}
                </div>
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