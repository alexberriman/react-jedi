import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ChartShowcase() {
  usePageMetadata({
    title: "Chart Component",
    description:
      "A comprehensive showcase of the React Jedi Chart component with all chart types, customization options, and data visualization examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "line-charts", label: "Line Charts" },
    { id: "bar-charts", label: "Bar Charts" },
    { id: "area-charts", label: "Area Charts" },
    { id: "pie-charts", label: "Pie Charts" },
    { id: "radar-charts", label: "Radar Charts" },
    { id: "radial-bar-charts", label: "Radial Bar Charts" },
    { id: "customization", label: "Customization" },
    { id: "interactive-features", label: "Interactive Features" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Real-World Examples" },
  ];

  // Sample data for charts
  const sampleData = [
    { name: "Jan", sales: 4000, revenue: 2400, users: 240 },
    { name: "Feb", sales: 3000, revenue: 1398, users: 310 },
    { name: "Mar", sales: 2000, revenue: 9800, users: 290 },
    { name: "Apr", sales: 2780, revenue: 3908, users: 200 },
    { name: "May", sales: 1890, revenue: 4800, users: 181 },
    { name: "Jun", sales: 2390, revenue: 3800, users: 250 },
  ];

  const pieData = [
    { name: "Desktop", value: 8045, fill: "#8884d8" },
    { name: "Mobile", value: 3347, fill: "#82ca9d" },
    { name: "Tablet", value: 1398, fill: "#ffc658" },
    { name: "Other", value: 412, fill: "#ff7c7c" },
  ];

  const radarData = [
    { subject: "Performance", A: 120, B: 110, fullMark: 150 },
    { subject: "Usability", A: 98, B: 130, fullMark: 150 },
    { subject: "Security", A: 86, B: 130, fullMark: 150 },
    { subject: "Reliability", A: 99, B: 100, fullMark: 150 },
    { subject: "Efficiency", A: 85, B: 90, fullMark: 150 },
    { subject: "Maintainability", A: 65, B: 85, fullMark: 150 },
  ];

  const chartConfig = {
    sales: { label: "Sales", color: "#8884d8" },
    revenue: { label: "Revenue", color: "#82ca9d" },
    users: { label: "Users", color: "#ffc658" },
  };

  // Line Charts
  const basicLineSpec: UISpecification = {
    type: "Chart",
    chartType: "line",
    data: sampleData,
    config: chartConfig,
    dataKey: "sales",
    height: 300,
    showGrid: true,
    showLegend: false,
  };

  const multiLineSpec: UISpecification = {
    type: "Chart",
    chartType: "line",
    data: sampleData,
    config: chartConfig,
    dataKeys: ["sales", "revenue"],
    height: 300,
    showGrid: true,
    showLegend: true,
    colors: ["#8884d8", "#82ca9d"],
  };

  // Bar Charts
  const basicBarSpec: UISpecification = {
    type: "Chart",
    chartType: "bar",
    data: sampleData,
    config: chartConfig,
    dataKey: "sales",
    height: 300,
    showGrid: true,
    showLegend: false,
  };

  const stackedBarSpec: UISpecification = {
    type: "Chart",
    chartType: "bar",
    data: sampleData,
    config: chartConfig,
    dataKeys: ["sales", "revenue"],
    height: 300,
    showGrid: true,
    showLegend: true,
    stackId: "stack1",
    colors: ["#8884d8", "#82ca9d"],
  };

  // Area Charts
  const basicAreaSpec: UISpecification = {
    type: "Chart",
    chartType: "area",
    data: sampleData,
    config: chartConfig,
    dataKey: "sales",
    height: 300,
    showGrid: true,
    showLegend: false,
    fillOpacity: 0.6,
  };

  const stackedAreaSpec: UISpecification = {
    type: "Chart",
    chartType: "area",
    data: sampleData,
    config: chartConfig,
    dataKeys: ["sales", "revenue"],
    height: 300,
    showGrid: true,
    showLegend: true,
    stackId: "stack1",
    fillOpacity: 0.4,
    colors: ["#8884d8", "#82ca9d"],
  };

  // Pie Charts
  const basicPieSpec: UISpecification = {
    type: "Chart",
    chartType: "pie",
    data: pieData,
    config: {
      desktop: { label: "Desktop", color: "#8884d8" },
      mobile: { label: "Mobile", color: "#82ca9d" },
      tablet: { label: "Tablet", color: "#ffc658" },
      other: { label: "Other", color: "#ff7c7c" },
    },
    dataKey: "value",
    height: 300,
    showLegend: true,
    colors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"],
  };

  const donutSpec: UISpecification = {
    type: "Chart",
    chartType: "pie",
    data: pieData,
    config: {
      desktop: { label: "Desktop", color: "#8884d8" },
      mobile: { label: "Mobile", color: "#82ca9d" },
      tablet: { label: "Tablet", color: "#ffc658" },
      other: { label: "Other", color: "#ff7c7c" },
    },
    dataKey: "value",
    height: 300,
    showLegend: true,
    innerRadius: 60,
    outerRadius: 100,
    colors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"],
  };

  // Radar Charts
  const basicRadarSpec: UISpecification = {
    type: "Chart",
    chartType: "radar",
    data: radarData,
    config: {
      A: { label: "Product A", color: "#8884d8" },
      B: { label: "Product B", color: "#82ca9d" },
    },
    dataKeys: ["A", "B"],
    height: 350,
    showLegend: true,
    fillOpacity: 0.6,
    colors: ["#8884d8", "#82ca9d"],
  };

  // Radial Bar Charts
  const radialBarSpec: UISpecification = {
    type: "Chart",
    chartType: "radialBar",
    data: [
      { name: "Completion", value: 75 },
      { name: "Progress", value: 60 },
      { name: "Target", value: 90 },
    ],
    config: {
      completion: { label: "Completion", color: "#8884d8" },
    },
    dataKey: "value",
    height: 300,
    showLegend: true,
    innerRadius: 20,
    outerRadius: 80,
  };

  // Customization examples
  const customColorsSpec: UISpecification = {
    type: "Chart",
    chartType: "bar",
    data: sampleData,
    config: chartConfig,
    dataKey: "sales",
    height: 300,
    showGrid: true,
    colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
    animationDuration: 2000,
    strokeWidth: 3,
  };

  const noAnimationSpec: UISpecification = {
    type: "Chart",
    chartType: "line",
    data: sampleData,
    config: chartConfig,
    dataKey: "sales",
    height: 300,
    showGrid: false,
    showXAxis: true,
    showYAxis: true,
    animationDuration: 0,
    strokeWidth: 4,
    colors: ["#8b5cf6"],
  };

  // Interactive features
  const interactiveSpec: UISpecification = {
    type: "Chart",
    chartType: "area",
    data: sampleData,
    config: chartConfig,
    dataKeys: ["sales", "revenue", "users"],
    height: 350,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    colors: ["#8884d8", "#82ca9d", "#ffc658"],
    fillOpacity: 0.3,
  };

  // Real-world examples
  const salesDashboardSpec: UISpecification = {
    type: "Card",
    className: "w-full",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Monthly Sales Performance" },
          { type: "CardDescription", children: "Revenue and sales trends over the past 6 months" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Chart",
          chartType: "line",
          data: sampleData,
          config: chartConfig,
          dataKeys: ["sales", "revenue"],
          height: 400,
          showGrid: true,
          showLegend: true,
          showTooltip: true,
          colors: ["#3b82f6", "#10b981"],
          strokeWidth: 3,
        },
      },
    ],
  };

  const analyticsOverviewSpec: UISpecification = {
    type: "Grid",
    cols: 2,
    gap: "6",
    className: "w-full",
    children: [
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: "Traffic Sources" },
              { type: "CardDescription", children: "Visitor distribution" },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Chart",
              chartType: "pie",
              data: pieData,
              config: {
                desktop: { label: "Desktop", color: "#8884d8" },
                mobile: { label: "Mobile", color: "#82ca9d" },
                tablet: { label: "Tablet", color: "#ffc658" },
                other: { label: "Other", color: "#ff7c7c" },
              },
              dataKey: "value",
              height: 300,
              showLegend: true,
              colors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"],
            },
          },
        ],
      },
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: "Monthly Growth" },
              { type: "CardDescription", children: "User acquisition trends" },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Chart",
              chartType: "bar",
              data: sampleData,
              config: chartConfig,
              dataKey: "users",
              height: 300,
              showGrid: true,
              colors: ["#6366f1"],
            },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Chart Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful data visualization component built with Recharts. Supports multiple chart types including line, bar, area, pie, radar, and radial bar charts with full customization options.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Chart component is a comprehensive data visualization solution that leverages the power of Recharts to create beautiful, interactive charts. It&apos;s designed to work seamlessly with React Jedi&apos;s JSON-driven approach.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Six chart types: Line, Bar, Area, Pie, Radar, and Radial Bar</li>
                <li>Interactive tooltips and legends</li>
                <li>Customizable colors, animations, and styling</li>
                <li>Responsive design with configurable dimensions</li>
                <li>Grid lines, axes, and layout options</li>
                <li>Support for single and multi-series data</li>
                <li>Stacked charts for comparative data visualization</li>
              </ul>
            </div>
          </section>

          {/* Line Charts Section */}
          <section id="line-charts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Line Charts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Perfect for showing trends and changes over time.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Basic Line Chart</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(basicLineSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(basicLineSpec, null, 2)}
                  </pre>
                </details>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Multi-Series Line Chart</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(multiLineSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(multiLineSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Bar Charts Section */}
          <section id="bar-charts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Bar Charts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ideal for comparing values across categories.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Basic Bar Chart</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(basicBarSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(basicBarSpec, null, 2)}
                  </pre>
                </details>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Stacked Bar Chart</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(stackedBarSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(stackedBarSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Area Charts Section */}
          <section id="area-charts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Area Charts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Great for showing cumulative values and proportions over time.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Basic Area Chart</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(basicAreaSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(basicAreaSpec, null, 2)}
                  </pre>
                </details>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Stacked Area Chart</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(stackedAreaSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(stackedAreaSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Pie Charts Section */}
          <section id="pie-charts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Pie Charts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Perfect for showing parts of a whole and percentage distributions.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Basic Pie Chart</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(basicPieSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(basicPieSpec, null, 2)}
                  </pre>
                </details>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Donut Chart</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(donutSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(donutSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Radar Charts Section */}
          <section id="radar-charts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Radar Charts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Excellent for comparing multiple variables and showing performance metrics.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Multi-Series Radar Chart</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(basicRadarSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(basicRadarSpec, null, 2)}
                </pre>
              </details>
            </div>
          </section>

          {/* Radial Bar Charts Section */}
          <section id="radial-bar-charts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Radial Bar Charts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Great for showing progress, completion rates, and circular data.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Progress Indicator</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(radialBarSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(radialBarSpec, null, 2)}
                </pre>
              </details>
            </div>
          </section>

          {/* Customization Section */}
          <section id="customization" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Customization Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize colors, animations, and styling to match your design.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Custom Colors & Animation</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(customColorsSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(customColorsSpec, null, 2)}
                  </pre>
                </details>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Minimal Style (No Animation)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(noAnimationSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(noAnimationSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Interactive Features Section */}
          <section id="interactive-features" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Interactive Features</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Built-in tooltips, legends, and hover effects enhance user interaction.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Interactive Multi-Series Chart</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(interactiveSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(interactiveSpec, null, 2)}
                </pre>
              </details>
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
                    <td className="py-3 px-4 font-mono">&quot;Chart&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">chartType</td>
                    <td className="py-3 px-4 font-mono">&quot;line&quot; | &quot;bar&quot; | &quot;area&quot; | &quot;pie&quot; | &quot;radar&quot; | &quot;radialBar&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Type of chart to render</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">data</td>
                    <td className="py-3 px-4 font-mono">Array&lt;object&gt;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Array of data objects for the chart</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">config</td>
                    <td className="py-3 px-4 font-mono">ChartConfig</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Chart configuration for data keys</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">dataKey</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Single data key for the chart</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">dataKeys</td>
                    <td className="py-3 px-4 font-mono">string[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Array of data keys for multiple series</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">height</td>
                    <td className="py-3 px-4 font-mono">number | string</td>
                    <td className="py-3 px-4">350</td>
                    <td className="py-3 px-4">Height of the chart</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">width</td>
                    <td className="py-3 px-4 font-mono">number | string</td>
                    <td className="py-3 px-4">&quot;100%&quot;</td>
                    <td className="py-3 px-4">Width of the chart</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showGrid</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show grid lines</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showLegend</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Show chart legend</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showTooltip</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show tooltip on hover</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">colors</td>
                    <td className="py-3 px-4 font-mono">string[]</td>
                    <td className="py-3 px-4">[&quot;#8884d8&quot;, &quot;#82ca9d&quot;, ...]</td>
                    <td className="py-3 px-4">Array of colors for the chart</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">animationDuration</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">1000</td>
                    <td className="py-3 px-4">Animation duration in milliseconds</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">stackId</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Stack ID for stacked charts</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">innerRadius</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">0</td>
                    <td className="py-3 px-4">Inner radius for pie/radial charts</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">outerRadius</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">80</td>
                    <td className="py-3 px-4">Outer radius for pie/radial charts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Real-World Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Real-World Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See charts integrated into complete dashboard and analytics interfaces.
            </p>
            
            <div className="space-y-8">
              {/* Sales Dashboard */}
              <div>
                <h3 className="text-lg font-medium mb-3">Sales Dashboard</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(salesDashboardSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(salesDashboardSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Analytics Overview */}
              <div>
                <h3 className="text-lg font-medium mb-3">Analytics Overview</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(analyticsOverviewSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(analyticsOverviewSpec, null, 2)}
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