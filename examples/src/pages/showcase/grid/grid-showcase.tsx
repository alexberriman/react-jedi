import React, { useState } from "react";
import { Link } from "react-router-dom";
import { render } from "@alexberriman/react-jedi";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ChevronDown, ChevronUp, Grid, Menu } from "lucide-react";
import { usePageMetadata } from "../../../lib/meta";

export function GridShowcase() {
  usePageMetadata({
    title: "Grid Component - React Jedi Showcase",
    description:
      "Explore the Grid component with responsive layouts, gap spacing, auto-fit mode, and more.",
  });

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "responsive-columns", label: "Responsive Columns" },
    { id: "gap-spacing", label: "Gap Spacing" },
    { id: "auto-fit", label: "Auto-Fit Mode" },
    { id: "grid-areas", label: "Grid Areas" },
    { id: "flow-direction", label: "Flow Direction" },
    { id: "complete-examples", label: "Complete Examples" },
    { id: "props", label: "Props Reference" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-20 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform overflow-y-auto border-r bg-background p-6 transition-transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav>
          <h3 className="mb-4 text-sm font-semibold">On This Page</h3>
          <ul className="space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="block w-full text-left text-muted-foreground transition-colors hover:text-foreground"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="lg:ml-64">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/showcase"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Showcase
            </Link>
            <Link
              to="/documentation"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View Docs →
            </Link>
          </div>

          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Grid className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">Grid Component</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A powerful and flexible grid layout system with responsive
              columns, gap control, and advanced features like auto-fit and
              template areas.
            </p>
          </div>

          <section id="introduction" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Introduction</h2>
            <Card className="p-6">
              <p className="mb-4 leading-relaxed">
                The Grid component provides a CSS Grid-based layout system that
                makes it easy to create responsive, structured layouts. It
                supports responsive column definitions, customizable gaps,
                auto-fit mode, and even CSS Grid template areas for complex
                layouts.
              </p>
              <p className="leading-relaxed">
                Unlike traditional grid systems, this component leverages the
                full power of CSS Grid while providing a simple, declarative API
                through JSON specifications.
              </p>
            </Card>
          </section>

          <section id="basic-usage" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Basic Usage</h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-medium">Simple 3-Column Grid</h3>
                <Card className="overflow-hidden">
                  <div className="bg-muted/50 p-6">
                    {render({
                      component: "Grid",
                      properties: {
                        columns: 3,
                        gap: "md",
                        children: [
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-primary/10 rounded-lg text-center",
                              children: "Item 1",
                            },
                          },
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-primary/10 rounded-lg text-center",
                              children: "Item 2",
                            },
                          },
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-primary/10 rounded-lg text-center",
                              children: "Item 3",
                            },
                          },
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-primary/10 rounded-lg text-center",
                              children: "Item 4",
                            },
                          },
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-primary/10 rounded-lg text-center",
                              children: "Item 5",
                            },
                          },
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-primary/10 rounded-lg text-center",
                              children: "Item 6",
                            },
                          },
                        ],
                      },
                    })}
                  </div>
                  <div className="border-t p-4">
                    <button
                      onClick={() => toggleSection("basic-grid")}
                      className="flex w-full items-center justify-between text-sm"
                    >
                      <span className="font-medium">View JSON</span>
                      {expandedSections["basic-grid"] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {expandedSections["basic-grid"] && (
                      <pre className="mt-4 overflow-auto rounded bg-muted p-4 text-xs">
                        <code>
{JSON.stringify(
  {
    component: "Grid",
    properties: {
      columns: 3,
      gap: "md",
      children: [
        {
          component: "Box",
          properties: {
            className: "p-6 bg-primary/10 rounded-lg text-center",
            children: "Item 1",
          },
        },
      ],
    },
  },
  null,
  2
)}
                        </code>
                      </pre>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section id="responsive-columns" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Responsive Columns</h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-medium">
                  Breakpoint-Based Columns
                </h3>
                <Card className="overflow-hidden">
                  <div className="bg-muted/50 p-6">
                    {render({
                      component: "Grid",
                      properties: {
                        columns: { base: 1, sm: 2, md: 3, lg: 4 },
                        gap: "lg",
                        children: Array.from({ length: 8 }).map((_, i) => ({
                          component: "Card",
                          properties: {
                            className: "p-6",
                            children: [
                              {
                                component: "Text",
                                properties: {
                                  className: "text-center font-medium",
                                  children: `Card ${i + 1}`,
                                },
                              },
                              {
                                component: "Text",
                                properties: {
                                  className:
                                    "text-center text-sm text-muted-foreground mt-2",
                                  children: "Responsive item",
                                },
                              },
                            ],
                          },
                        })),
                      },
                    })}
                  </div>
                  <div className="border-t p-4">
                    <button
                      onClick={() => toggleSection("responsive-grid")}
                      className="flex w-full items-center justify-between text-sm"
                    >
                      <span className="font-medium">View JSON</span>
                      {expandedSections["responsive-grid"] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {expandedSections["responsive-grid"] && (
                      <pre className="mt-4 overflow-auto rounded bg-muted p-4 text-xs">
                        <code>
{JSON.stringify(
  {
    component: "Grid",
    properties: {
      columns: { base: 1, sm: 2, md: 3, lg: 4 },
      gap: "lg",
      children: "// Array of Card components",
    },
  },
  null,
  2
)}
                        </code>
                      </pre>
                    )}
                  </div>
                </Card>
                <p className="mt-4 text-sm text-muted-foreground">
                  Resize your browser to see how the grid adapts at different
                  breakpoints.
                </p>
              </div>
            </div>
          </section>

          <section id="gap-spacing" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Gap Spacing</h2>

            <div className="space-y-8">
              {["xs", "sm", "md", "lg", "xl"].map((gap) => (
                <div key={gap}>
                  <h3 className="mb-4 text-lg font-medium">
                    Gap: {gap.toUpperCase()}
                  </h3>
                  <Card className="overflow-hidden">
                    <div className="bg-muted/50 p-6">
                      {render({
                        component: "Grid",
                        properties: {
                          columns: 3,
                          gap,
                          children: Array.from({ length: 6 }).map((_, i) => ({
                            component: "Box",
                            properties: {
                              className:
                                "p-4 bg-primary/20 rounded text-center",
                              children: `${gap.toUpperCase()} gap`,
                            },
                          })),
                        },
                      })}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <section id="auto-fit" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Auto-Fit Mode</h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-medium">
                  Automatic Column Sizing
                </h3>
                <Card className="overflow-hidden">
                  <div className="bg-muted/50 p-6">
                    {render({
                      component: "Grid",
                      properties: {
                        autoFit: true,
                        gap: "md",
                        className: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
                        children: Array.from({ length: 7 }).map((_, i) => ({
                          component: "Card",
                          properties: {
                            className: "p-6",
                            children: {
                              component: "Text",
                              properties: {
                                className: "text-center",
                                children: `Auto-fit ${i + 1}`,
                              },
                            },
                          },
                        })),
                      },
                    })}
                  </div>
                  <div className="border-t p-4">
                    <p className="text-sm text-muted-foreground">
                      Items automatically fit based on available space with a
                      minimum width of 200px.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section id="grid-areas" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Grid Areas</h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-medium">
                  Template Areas Layout
                </h3>
                <Card className="overflow-hidden">
                  <div className="bg-muted/50 p-6">
                    {render({
                      component: "Grid",
                      properties: {
                        areas: [
                          "header header header",
                          "sidebar main main",
                          "footer footer footer",
                        ],
                        gap: "md",
                        className: "min-h-[300px]",
                        children: [
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-primary/10 rounded-lg text-center [grid-area:header]",
                              children: "Header",
                            },
                          },
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-secondary/20 rounded-lg text-center [grid-area:sidebar]",
                              children: "Sidebar",
                            },
                          },
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-accent/20 rounded-lg text-center [grid-area:main]",
                              children: "Main Content",
                            },
                          },
                          {
                            component: "Box",
                            properties: {
                              className:
                                "p-6 bg-primary/10 rounded-lg text-center [grid-area:footer]",
                              children: "Footer",
                            },
                          },
                        ],
                      },
                    })}
                  </div>
                  <div className="border-t p-4">
                    <button
                      onClick={() => toggleSection("grid-areas")}
                      className="flex w-full items-center justify-between text-sm"
                    >
                      <span className="font-medium">View JSON</span>
                      {expandedSections["grid-areas"] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {expandedSections["grid-areas"] && (
                      <pre className="mt-4 overflow-auto rounded bg-muted p-4 text-xs">
                        <code>
{JSON.stringify(
  {
    component: "Grid",
    properties: {
      areas: [
        "header header header",
        "sidebar main main",
        "footer footer footer",
      ],
      gap: "md",
      className: "min-h-[300px]",
      children: "// Components with [grid-area:name] classes",
    },
  },
  null,
  2
)}
                        </code>
                      </pre>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section id="flow-direction" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Flow Direction</h2>

            <div className="space-y-8">
              {["row", "column", "dense"].map((flow) => (
                <div key={flow}>
                  <h3 className="mb-4 text-lg font-medium">
                    Flow: {flow.charAt(0).toUpperCase() + flow.slice(1)}
                  </h3>
                  <Card className="overflow-hidden">
                    <div className="bg-muted/50 p-6">
                      {render({
                        component: "Grid",
                        properties: {
                          columns: flow === "column" ? 3 : 4,
                          rows: flow === "column" ? 4 : undefined,
                          flow,
                          gap: "md",
                          className: flow === "column" ? "h-64" : "",
                          children: Array.from({ length: 8 }).map((_, i) => ({
                            component: "Box",
                            properties: {
                              className: `p-4 bg-primary/20 rounded text-center ${
                                i === 2 && flow === "dense"
                                  ? "col-span-2"
                                  : ""
                              }`,
                              children: `${i + 1}`,
                            },
                          })),
                        },
                      })}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <section id="complete-examples" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Complete Examples</h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-medium">Product Grid</h3>
                <Card className="overflow-hidden">
                  <div className="bg-muted/50 p-6">
                    {render({
                      component: "Grid",
                      properties: {
                        columns: { base: 1, sm: 2, lg: 3 },
                        gap: "lg",
                        children: [
                          {
                            component: "Card",
                            properties: {
                              className: "overflow-hidden",
                              children: [
                                {
                                  component: "Box",
                                  properties: {
                                    className:
                                      "h-48 bg-gradient-to-br from-blue-500 to-purple-600",
                                  },
                                },
                                {
                                  component: "Box",
                                  properties: {
                                    className: "p-4",
                                    children: [
                                      {
                                        component: "Heading",
                                        properties: {
                                          level: 3,
                                          className: "mb-2",
                                          children: "Premium Package",
                                        },
                                      },
                                      {
                                        component: "Text",
                                        properties: {
                                          className:
                                            "text-sm text-muted-foreground mb-4",
                                          children:
                                            "Everything you need to get started",
                                        },
                                      },
                                      {
                                        component: "Button",
                                        properties: {
                                          variant: "default",
                                          className: "w-full",
                                          children: "Get Started",
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className: "overflow-hidden",
                              children: [
                                {
                                  component: "Box",
                                  properties: {
                                    className:
                                      "h-48 bg-gradient-to-br from-green-500 to-teal-600",
                                  },
                                },
                                {
                                  component: "Box",
                                  properties: {
                                    className: "p-4",
                                    children: [
                                      {
                                        component: "Heading",
                                        properties: {
                                          level: 3,
                                          className: "mb-2",
                                          children: "Pro Package",
                                        },
                                      },
                                      {
                                        component: "Text",
                                        properties: {
                                          className:
                                            "text-sm text-muted-foreground mb-4",
                                          children: "Advanced features for teams",
                                        },
                                      },
                                      {
                                        component: "Button",
                                        properties: {
                                          variant: "default",
                                          className: "w-full",
                                          children: "Upgrade Now",
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className: "overflow-hidden",
                              children: [
                                {
                                  component: "Box",
                                  properties: {
                                    className:
                                      "h-48 bg-gradient-to-br from-orange-500 to-red-600",
                                  },
                                },
                                {
                                  component: "Box",
                                  properties: {
                                    className: "p-4",
                                    children: [
                                      {
                                        component: "Heading",
                                        properties: {
                                          level: 3,
                                          className: "mb-2",
                                          children: "Enterprise",
                                        },
                                      },
                                      {
                                        component: "Text",
                                        properties: {
                                          className:
                                            "text-sm text-muted-foreground mb-4",
                                          children: "Custom solutions at scale",
                                        },
                                      },
                                      {
                                        component: "Button",
                                        properties: {
                                          variant: "default",
                                          className: "w-full",
                                          children: "Contact Sales",
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    })}
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Dashboard Layout</h3>
                <Card className="overflow-hidden">
                  <div className="bg-muted/50 p-6">
                    {render({
                      component: "Grid",
                      properties: {
                        areas: [
                          "stat1 stat2 stat3 stat4",
                          "chart chart table table",
                          "activity activity activity recent",
                        ],
                        columns: "repeat(4, 1fr)",
                        gap: "lg",
                        className: "min-h-[400px]",
                        children: [
                          {
                            component: "Card",
                            properties: {
                              className: "[grid-area:stat1] p-6",
                              children: [
                                {
                                  component: "Text",
                                  properties: {
                                    className:
                                      "text-sm text-muted-foreground mb-2",
                                    children: "Total Revenue",
                                  },
                                },
                                {
                                  component: "Heading",
                                  properties: {
                                    level: 3,
                                    children: "$45,231",
                                  },
                                },
                              ],
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className: "[grid-area:stat2] p-6",
                              children: [
                                {
                                  component: "Text",
                                  properties: {
                                    className:
                                      "text-sm text-muted-foreground mb-2",
                                    children: "New Users",
                                  },
                                },
                                {
                                  component: "Heading",
                                  properties: {
                                    level: 3,
                                    children: "+2,350",
                                  },
                                },
                              ],
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className: "[grid-area:stat3] p-6",
                              children: [
                                {
                                  component: "Text",
                                  properties: {
                                    className:
                                      "text-sm text-muted-foreground mb-2",
                                    children: "Active Now",
                                  },
                                },
                                {
                                  component: "Heading",
                                  properties: {
                                    level: 3,
                                    children: "573",
                                  },
                                },
                              ],
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className: "[grid-area:stat4] p-6",
                              children: [
                                {
                                  component: "Text",
                                  properties: {
                                    className:
                                      "text-sm text-muted-foreground mb-2",
                                    children: "Growth",
                                  },
                                },
                                {
                                  component: "Heading",
                                  properties: {
                                    level: 3,
                                    children: "+12.5%",
                                  },
                                },
                              ],
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className:
                                "[grid-area:chart] p-6 flex items-center justify-center",
                              children: {
                                component: "Text",
                                properties: {
                                  className: "text-muted-foreground",
                                  children: "Chart Area",
                                },
                              },
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className:
                                "[grid-area:table] p-6 flex items-center justify-center",
                              children: {
                                component: "Text",
                                properties: {
                                  className: "text-muted-foreground",
                                  children: "Data Table",
                                },
                              },
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className:
                                "[grid-area:activity] p-6 flex items-center justify-center",
                              children: {
                                component: "Text",
                                properties: {
                                  className: "text-muted-foreground",
                                  children: "Activity Feed",
                                },
                              },
                            },
                          },
                          {
                            component: "Card",
                            properties: {
                              className:
                                "[grid-area:recent] p-6 flex items-center justify-center",
                              children: {
                                component: "Text",
                                properties: {
                                  className: "text-muted-foreground",
                                  children: "Recent Items",
                                },
                              },
                            },
                          },
                        ],
                      },
                    })}
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section id="props" className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Props Reference</h2>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="p-4 text-left font-medium">Prop</th>
                      <th className="p-4 text-left font-medium">Type</th>
                      <th className="p-4 text-left font-medium">Default</th>
                      <th className="p-4 text-left font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-mono text-sm">columns</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        number | ResponsiveValue&lt;number&gt;
                      </td>
                      <td className="p-4 text-sm">12</td>
                      <td className="p-4 text-sm">
                        Number of columns in the grid
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-mono text-sm">gap</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; | &quot;3xl&quot;
                      </td>
                      <td className="p-4 text-sm">&quot;md&quot;</td>
                      <td className="p-4 text-sm">
                        Gap between grid items
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-mono text-sm">autoFit</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        boolean
                      </td>
                      <td className="p-4 text-sm">false</td>
                      <td className="p-4 text-sm">
                        Enable auto-fit for responsive columns
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-mono text-sm">rows</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        number
                      </td>
                      <td className="p-4 text-sm">-</td>
                      <td className="p-4 text-sm">
                        Number of rows in the grid
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-mono text-sm">areas</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        string[]
                      </td>
                      <td className="p-4 text-sm">-</td>
                      <td className="p-4 text-sm">
                        Grid template areas definition
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-mono text-sm">flow</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        &quot;row&quot; | &quot;column&quot; | &quot;dense&quot; | &quot;row-dense&quot; | &quot;column-dense&quot;
                      </td>
                      <td className="p-4 text-sm">&quot;row&quot;</td>
                      <td className="p-4 text-sm">
                        Grid auto-flow direction
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-mono text-sm">stretch</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        boolean
                      </td>
                      <td className="p-4 text-sm">false</td>
                      <td className="p-4 text-sm">
                        Stretch items to fill container height
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-mono text-sm">children</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        ReactNode | ComponentSpec[]
                      </td>
                      <td className="p-4 text-sm">-</td>
                      <td className="p-4 text-sm">
                        Grid items content
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          <div className="mt-16 flex items-center justify-between border-t pt-8">
            <Link
              to="/showcase/flex"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              ← Flex Component
            </Link>
            <Link
              to="/showcase/stack"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              Stack Component →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}