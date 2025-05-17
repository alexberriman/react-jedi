import React from "react";
import { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";

const dataDisplaySpec: UISpecification = {
  version: "1.0.0",
  metadata: {
    title: "Data Display Components",
    description: "Tables, charts, and data visualization with 2025 design aesthetics",
  },
  theme: {
    dark: {
      background: "#0a0a0b",
      foreground: "#ffffff",
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#10b981",
      muted: "#18181b",
      mutedForeground: "#a1a1aa",
      border: "#27272a",
    },
    radius: "medium",
    borderWidth: "1",
    shadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    },
  },
  root: {
    type: "Container",
    className:
      "bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black min-h-screen",
    children: [
      // Hero Section
      {
        type: "Box",
        className: "relative mb-16 pt-12",
        children: [
          // Animated gradient background
          {
            type: "Box",
            className:
              "absolute inset-0 bg-gradient-to-r from-purple-500/10 via-emerald-500/10 to-blue-500/10 blur-3xl animate-pulse",
          },
          {
            type: "Box",
            className: "relative z-10",
            children: [
              {
                type: "Heading",
                level: 1,
                children: ["📊 Data Display"],
                className:
                  "text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-gradient",
              },
              {
                type: "Text",
                children: [
                  "Beautiful tables, charts, and data visualizations for modern applications",
                ],
                className: "text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light",
              },
              // Feature stats
              {
                type: "Flex",
                justify: "center",
                gap: 6,
                wrap: true,
                children: [
                  {
                    type: "Box",
                    className:
                      "bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl p-4 px-6 border border-white/20 dark:border-gray-700/50 shadow-2xl",
                    children: [
                      {
                        type: "Text",
                        children: ["10+ Table Styles"],
                        className: "text-lg font-semibold text-purple-600 dark:text-purple-400",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className:
                      "bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl p-4 px-6 border border-white/20 dark:border-gray-700/50 shadow-2xl",
                    children: [
                      {
                        type: "Text",
                        children: ["5+ Chart Types"],
                        className: "text-lg font-semibold text-emerald-600 dark:text-emerald-400",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className:
                      "bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl p-4 px-6 border border-white/20 dark:border-gray-700/50 shadow-2xl",
                    children: [
                      {
                        type: "Text",
                        children: ["Real-time Updates"],
                        className: "text-lg font-semibold text-blue-600 dark:text-blue-400",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Data Statistics Cards Section
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["📈 Data Statistics Cards"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Grid",
            columns: 4,
            gap: 6,
            children: [
              // Revenue Card
              {
                type: "Box",
                className: "relative overflow-hidden",
                children: [
                  {
                    type: "Box",
                    className:
                      "absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl",
                  },
                  {
                    type: "Card",
                    className:
                      "relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30",
                    children: [
                      {
                        type: "Box",
                        className: "p-6",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            className: "mb-4",
                            children: [
                              {
                                type: "Text",
                                children: ["Total Revenue"],
                                className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                              },
                              {
                                type: "Text",
                                children: ["💰"],
                                className: "text-2xl",
                              },
                            ],
                          },
                          {
                            type: "Text",
                            children: ["$45,231.89"],
                            className: "text-2xl font-bold",
                          },
                          {
                            type: "Text",
                            children: ["+20.1% from last month"],
                            className: "text-sm text-green-600 dark:text-green-400 mt-2",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // Users Card
              {
                type: "Box",
                className: "relative overflow-hidden",
                children: [
                  {
                    type: "Box",
                    className:
                      "absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl",
                  },
                  {
                    type: "Card",
                    className:
                      "relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30",
                    children: [
                      {
                        type: "Box",
                        className: "p-6",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            className: "mb-4",
                            children: [
                              {
                                type: "Text",
                                children: ["Active Users"],
                                className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                              },
                              {
                                type: "Text",
                                children: ["👥"],
                                className: "text-2xl",
                              },
                            ],
                          },
                          {
                            type: "Text",
                            children: ["2,350"],
                            className: "text-2xl font-bold",
                          },
                          {
                            type: "Text",
                            children: ["+180.1% from last month"],
                            className: "text-sm text-green-600 dark:text-green-400 mt-2",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // Orders Card
              {
                type: "Box",
                className: "relative overflow-hidden",
                children: [
                  {
                    type: "Box",
                    className:
                      "absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 blur-2xl",
                  },
                  {
                    type: "Card",
                    className:
                      "relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30",
                    children: [
                      {
                        type: "Box",
                        className: "p-6",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            className: "mb-4",
                            children: [
                              {
                                type: "Text",
                                children: ["Total Orders"],
                                className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                              },
                              {
                                type: "Text",
                                children: ["📦"],
                                className: "text-2xl",
                              },
                            ],
                          },
                          {
                            type: "Text",
                            children: ["12,234"],
                            className: "text-2xl font-bold",
                          },
                          {
                            type: "Text",
                            children: ["+19% from last month"],
                            className: "text-sm text-green-600 dark:text-green-400 mt-2",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // Performance Card
              {
                type: "Box",
                className: "relative overflow-hidden",
                children: [
                  {
                    type: "Box",
                    className:
                      "absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-2xl",
                  },
                  {
                    type: "Card",
                    className:
                      "relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30",
                    children: [
                      {
                        type: "Box",
                        className: "p-6",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            className: "mb-4",
                            children: [
                              {
                                type: "Text",
                                children: ["Performance"],
                                className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                              },
                              {
                                type: "Text",
                                children: ["⚡"],
                                className: "text-2xl",
                              },
                            ],
                          },
                          {
                            type: "Text",
                            children: ["98.5%"],
                            className: "text-2xl font-bold",
                          },
                          {
                            type: "Progress",
                            value: 98.5,
                            className: "mt-3",
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
      },

      // Tables Section
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["📋 Tables"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Grid",
            columns: 1,
            gap: 8,
            children: [
              // Basic Table
              {
                type: "Box",
                className: "relative",
                children: [
                  {
                    type: "Box",
                    className:
                      "absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl rounded-3xl",
                  },
                  {
                    type: "Card",
                    className:
                      "relative overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl",
                    children: [
                      {
                        type: "Box",
                        className: "p-8",
                        children: [
                          {
                            type: "Heading",
                            level: 3,
                            children: ["Basic Table"],
                            className: "text-2xl font-bold mb-6",
                          },
                          {
                            type: "Table",
                            headers: ["Name", "Email", "Role", "Status"],
                            rows: [
                              [
                                "John Doe",
                                "john@example.com",
                                "Admin",
                                { type: "Badge", children: ["Active"], variant: "default" },
                              ],
                              [
                                "Jane Smith",
                                "jane@example.com",
                                "User",
                                { type: "Badge", children: ["Active"], variant: "default" },
                              ],
                              [
                                "Bob Johnson",
                                "bob@example.com",
                                "Editor",
                                { type: "Badge", children: ["Inactive"], variant: "secondary" },
                              ],
                              [
                                "Alice Brown",
                                "alice@example.com",
                                "User",
                                { type: "Badge", children: ["Active"], variant: "default" },
                              ],
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Striped Table
              {
                type: "Box",
                className: "relative",
                children: [
                  {
                    type: "Box",
                    className:
                      "absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl rounded-3xl",
                  },
                  {
                    type: "Card",
                    className:
                      "relative overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl",
                    children: [
                      {
                        type: "Box",
                        className: "p-8",
                        children: [
                          {
                            type: "Heading",
                            level: 3,
                            children: ["Striped Table"],
                            className: "text-2xl font-bold mb-6",
                          },
                          {
                            type: "Table",
                            className:
                              "[&>tbody>tr:nth-child(odd)]:bg-gray-50 dark:[&>tbody>tr:nth-child(odd)]:bg-gray-800/50",
                            headers: ["Invoice", "Client", "Amount", "Due Date", "Status"],
                            rows: [
                              [
                                "INV-001",
                                "Acme Corp",
                                "$5,000",
                                "2024-03-15",
                                { type: "Badge", children: ["Paid"], variant: "success" },
                              ],
                              [
                                "INV-002",
                                "Globex Ltd",
                                "$3,500",
                                "2024-03-20",
                                { type: "Badge", children: ["Pending"], variant: "warning" },
                              ],
                              [
                                "INV-003",
                                "Wayne Ent",
                                "$12,000",
                                "2024-03-10",
                                { type: "Badge", children: ["Overdue"], variant: "destructive" },
                              ],
                              [
                                "INV-004",
                                "Stark Ind",
                                "$8,750",
                                "2024-03-25",
                                { type: "Badge", children: ["Draft"], variant: "secondary" },
                              ],
                              [
                                "INV-005",
                                "Daily Planet",
                                "$2,250",
                                "2024-03-18",
                                { type: "Badge", children: ["Paid"], variant: "success" },
                              ],
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Table with Actions
              {
                type: "Box",
                className: "relative",
                children: [
                  {
                    type: "Box",
                    className:
                      "absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 blur-2xl rounded-3xl",
                  },
                  {
                    type: "Card",
                    className:
                      "relative overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl",
                    children: [
                      {
                        type: "Box",
                        className: "p-8",
                        children: [
                          {
                            type: "Heading",
                            level: 3,
                            children: ["Table with Actions"],
                            className: "text-2xl font-bold mb-6",
                          },
                          {
                            type: "Table",
                            headers: ["Product", "Category", "Price", "Stock", "Actions"],
                            rows: [
                              [
                                "MacBook Pro",
                                "Electronics",
                                "$2,499",
                                "15",
                                {
                                  type: "Flex",
                                  gap: 2,
                                  children: [
                                    {
                                      type: "Button",
                                      size: "sm",
                                      variant: "outline",
                                      children: ["Edit"],
                                    },
                                    {
                                      type: "Button",
                                      size: "sm",
                                      variant: "destructive",
                                      children: ["Delete"],
                                    },
                                  ],
                                },
                              ],
                              [
                                "iPhone 15",
                                "Electronics",
                                "$999",
                                "45",
                                {
                                  type: "Flex",
                                  gap: 2,
                                  children: [
                                    {
                                      type: "Button",
                                      size: "sm",
                                      variant: "outline",
                                      children: ["Edit"],
                                    },
                                    {
                                      type: "Button",
                                      size: "sm",
                                      variant: "destructive",
                                      children: ["Delete"],
                                    },
                                  ],
                                },
                              ],
                              [
                                "AirPods Pro",
                                "Accessories",
                                "$249",
                                "120",
                                {
                                  type: "Flex",
                                  gap: 2,
                                  children: [
                                    {
                                      type: "Button",
                                      size: "sm",
                                      variant: "outline",
                                      children: ["Edit"],
                                    },
                                    {
                                      type: "Button",
                                      size: "sm",
                                      variant: "destructive",
                                      children: ["Delete"],
                                    },
                                  ],
                                },
                              ],
                            ],
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
      },

      // Charts Section
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["📊 Charts & Visualizations"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Grid",
            columns: 2,
            gap: 8,
            children: [
              // Line Chart
              {
                type: "Card",
                className:
                  "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6",
                children: [
                  {
                    type: "Heading",
                    level: 3,
                    children: ["Revenue Trend"],
                    className: "text-xl font-bold mb-4",
                  },
                  {
                    type: "Chart",
                    chartType: "line",
                    data: {
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      datasets: [
                        {
                          label: "Revenue",
                          data: [65, 59, 80, 81, 56, 95],
                          borderColor: "rgb(139, 92, 246)",
                          backgroundColor: "rgba(139, 92, 246, 0.1)",
                          tension: 0.4,
                        },
                      ],
                    },
                    options: {
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    },
                  },
                ],
              },

              // Bar Chart
              {
                type: "Card",
                className:
                  "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6",
                children: [
                  {
                    type: "Heading",
                    level: 3,
                    children: ["Sales by Category"],
                    className: "text-xl font-bold mb-4",
                  },
                  {
                    type: "Chart",
                    chartType: "bar",
                    data: {
                      labels: ["Electronics", "Clothing", "Books", "Home", "Sports"],
                      datasets: [
                        {
                          label: "Sales",
                          data: [120, 90, 60, 100, 75],
                          backgroundColor: [
                            "rgba(139, 92, 246, 0.8)",
                            "rgba(236, 72, 153, 0.8)",
                            "rgba(59, 130, 246, 0.8)",
                            "rgba(16, 185, 129, 0.8)",
                            "rgba(251, 146, 60, 0.8)",
                          ],
                        },
                      ],
                    },
                    options: {
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    },
                  },
                ],
              },

              // Pie Chart
              {
                type: "Card",
                className:
                  "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6",
                children: [
                  {
                    type: "Heading",
                    level: 3,
                    children: ["Market Share"],
                    className: "text-xl font-bold mb-4",
                  },
                  {
                    type: "Chart",
                    chartType: "pie",
                    data: {
                      labels: ["Product A", "Product B", "Product C", "Product D"],
                      datasets: [
                        {
                          data: [30, 25, 20, 25],
                          backgroundColor: [
                            "rgba(139, 92, 246, 0.8)",
                            "rgba(236, 72, 153, 0.8)",
                            "rgba(59, 130, 246, 0.8)",
                            "rgba(16, 185, 129, 0.8)",
                          ],
                        },
                      ],
                    },
                    options: {
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  },
                ],
              },

              // Area Chart
              {
                type: "Card",
                className:
                  "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6",
                children: [
                  {
                    type: "Heading",
                    level: 3,
                    children: ["User Growth"],
                    className: "text-xl font-bold mb-4",
                  },
                  {
                    type: "Chart",
                    chartType: "line",
                    data: {
                      labels: ["Q1", "Q2", "Q3", "Q4"],
                      datasets: [
                        {
                          label: "Active Users",
                          data: [1200, 1900, 3000, 5000],
                          borderColor: "rgb(16, 185, 129)",
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                          fill: true,
                          tension: 0.4,
                        },
                      ],
                    },
                    options: {
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },

      // DataTable Section
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["🔍 Advanced DataTable"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Box",
            className: "relative",
            children: [
              {
                type: "Box",
                className:
                  "absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-2xl rounded-3xl",
              },
              {
                type: "Card",
                className:
                  "relative overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl",
                children: [
                  {
                    type: "Box",
                    className: "p-8",
                    children: [
                      {
                        type: "Heading",
                        level: 3,
                        children: ["Customer Data Table"],
                        className: "text-2xl font-bold mb-6",
                      },
                      {
                        type: "DataTable",
                        columns: [
                          { key: "id", header: "ID", sortable: true },
                          { key: "name", header: "Name", sortable: true },
                          { key: "email", header: "Email", sortable: true },
                          { key: "company", header: "Company", sortable: true },
                          { key: "status", header: "Status", sortable: true },
                          { key: "actions", header: "Actions" },
                        ],
                        data: [
                          {
                            id: "001",
                            name: "Alice Johnson",
                            email: "alice@example.com",
                            company: "Tech Corp",
                            status: { type: "Badge", children: ["Active"], variant: "success" },
                            actions: {
                              type: "DropdownMenu",
                              trigger: {
                                type: "Button",
                                variant: "ghost",
                                size: "sm",
                                children: ["•••"],
                              },
                              items: [
                                { label: "View Details" },
                                { label: "Edit" },
                                { type: "separator" },
                                { label: "Delete", className: "text-red-600" },
                              ],
                            },
                          },
                          {
                            id: "002",
                            name: "Bob Smith",
                            email: "bob@example.com",
                            company: "Design Studio",
                            status: { type: "Badge", children: ["Inactive"], variant: "secondary" },
                            actions: {
                              type: "DropdownMenu",
                              trigger: {
                                type: "Button",
                                variant: "ghost",
                                size: "sm",
                                children: ["•••"],
                              },
                              items: [
                                { label: "View Details" },
                                { label: "Edit" },
                                { type: "separator" },
                                { label: "Delete", className: "text-red-600" },
                              ],
                            },
                          },
                          {
                            id: "003",
                            name: "Carol White",
                            email: "carol@example.com",
                            company: "Marketing Inc",
                            status: { type: "Badge", children: ["Active"], variant: "success" },
                            actions: {
                              type: "DropdownMenu",
                              trigger: {
                                type: "Button",
                                variant: "ghost",
                                size: "sm",
                                children: ["•••"],
                              },
                              items: [
                                { label: "View Details" },
                                { label: "Edit" },
                                { type: "separator" },
                                { label: "Delete", className: "text-red-600" },
                              ],
                            },
                          },
                          {
                            id: "004",
                            name: "David Brown",
                            email: "david@example.com",
                            company: "Finance Co",
                            status: { type: "Badge", children: ["Pending"], variant: "warning" },
                            actions: {
                              type: "DropdownMenu",
                              trigger: {
                                type: "Button",
                                variant: "ghost",
                                size: "sm",
                                children: ["•••"],
                              },
                              items: [
                                { label: "View Details" },
                                { label: "Edit" },
                                { type: "separator" },
                                { label: "Delete", className: "text-red-600" },
                              ],
                            },
                          },
                        ],
                        pageSize: 5,
                        enableSearch: true,
                        enablePagination: true,
                        enableSorting: true,
                        enableRowSelection: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Progress & Loading Section
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["⏳ Progress & Loading"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Grid",
            columns: 3,
            gap: 6,
            children: [
              {
                type: "Card",
                className:
                  "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6",
                children: [
                  {
                    type: "Text",
                    children: ["Basic Progress"],
                    className: "font-semibold mb-4",
                  },
                  {
                    type: "Stack",
                    spacing: 4,
                    children: [
                      {
                        type: "Progress",
                        value: 25,
                      },
                      {
                        type: "Progress",
                        value: 50,
                        className: "bg-purple-200 dark:bg-purple-900 [&>div]:bg-purple-600",
                      },
                      {
                        type: "Progress",
                        value: 75,
                        className: "bg-emerald-200 dark:bg-emerald-900 [&>div]:bg-emerald-600",
                      },
                      {
                        type: "Progress",
                        value: 100,
                        className: "bg-orange-200 dark:bg-orange-900 [&>div]:bg-orange-600",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                className:
                  "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6",
                children: [
                  {
                    type: "Text",
                    children: ["Progress with Labels"],
                    className: "font-semibold mb-4",
                  },
                  {
                    type: "Stack",
                    spacing: 6,
                    children: [
                      {
                        type: "Box",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            className: "mb-2",
                            children: [
                              {
                                type: "Text",
                                children: ["Upload Progress"],
                                className: "text-sm",
                              },
                              {
                                type: "Text",
                                children: ["65%"],
                                className: "text-sm font-semibold",
                              },
                            ],
                          },
                          {
                            type: "Progress",
                            value: 65,
                          },
                        ],
                      },
                      {
                        type: "Box",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            className: "mb-2",
                            children: [
                              {
                                type: "Text",
                                children: ["Download Progress"],
                                className: "text-sm",
                              },
                              {
                                type: "Text",
                                children: ["90%"],
                                className: "text-sm font-semibold",
                              },
                            ],
                          },
                          {
                            type: "Progress",
                            value: 90,
                            className: "[&>div]:bg-green-600",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                className:
                  "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6",
                children: [
                  {
                    type: "Text",
                    children: ["Loading Skeletons"],
                    className: "font-semibold mb-4",
                  },
                  {
                    type: "Stack",
                    spacing: 4,
                    children: [
                      {
                        type: "Skeleton",
                        className: "h-4 w-full",
                      },
                      {
                        type: "Skeleton",
                        className: "h-4 w-3/4",
                      },
                      {
                        type: "Skeleton",
                        className: "h-20 w-full rounded-lg",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Final CTA Section
      {
        type: "Box",
        className: "mb-16",
        children: [
          {
            type: "Box",
            className:
              "text-center py-20 px-8 bg-gradient-to-r from-purple-100 to-emerald-100 dark:from-purple-900/20 dark:to-emerald-900/20 rounded-3xl",
            children: [
              {
                type: "Heading",
                level: 2,
                children: ["🚀 Ready to Visualize Your Data?"],
                className:
                  "text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent",
              },
              {
                type: "Text",
                children: ["Create stunning data displays with React Jedi's modern components"],
                className: "text-xl text-gray-600 dark:text-gray-300 mb-8",
              },
              {
                type: "Flex",
                justify: "center",
                gap: 4,
                children: [
                  {
                    type: "Button",
                    size: "lg",
                    className:
                      "bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white",
                    children: ["Get Started"],
                  },
                  {
                    type: "Button",
                    size: "lg",
                    variant: "outline",
                    children: ["View Documentation"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export function DataDisplayPage() {
  return render(dataDisplaySpec);
}
