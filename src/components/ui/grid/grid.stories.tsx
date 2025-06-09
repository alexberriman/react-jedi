import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { Grid } from "./grid";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta: Meta<typeof Grid> = {
  title: "Layout Components/Grid",
  component: Grid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: {
        type: "number",
      },
      description: "Number of columns in the grid",
    },
    gap: {
      control: {
        type: "number",
      },
      description: "Gap between grid items",
    },
    autoFit: {
      control: "boolean",
      description: "Whether to auto-fit columns to available width",
    },
    minColWidth: {
      control: "text",
      description: "Minimum width of auto-fit columns (when autoFit is true)",
    },
    colWidth: {
      control: "text",
      description: "Fixed column width (when autoFit is true)",
    },
    rows: {
      control: {
        type: "number",
      },
      description: "Rows in the grid",
    },
    flow: {
      control: {
        type: "select",
        options: ["row", "column", "dense", "row-dense", "column-dense"],
      },
      description: "Flow direction of grid items",
    },
    stretch: {
      control: "boolean",
      description: "Whether grid items should stretch to fill container height",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Generate a GridItem component for the examples
const GridItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium ${className}`}
  >
    {children}
  </div>
);

export const Default: Story = enhanceStoryForDualMode<typeof Grid>(
  {
    args: {
      columns: 3,
      gap: 4,
      className: "w-full max-w-4xl",
    },
    render: (args) => (
      <Grid {...args}>
        {Array.from({ length: 6 }, (_, i) => (
          <GridItem key={i}>Item {i + 1}</GridItem>
        ))}
      </Grid>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all 6 items are rendered first
      for (let i = 1; i <= 6; i++) {
        expect(canvas.getByText(`Item ${i}`)).toBeInTheDocument();
      }

      // Find the grid container - it should have the 'grid' class
      const gridContainers = canvasElement.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      // The grid container should contain our items
      let gridContainer: Element | null = null;
      for (const container of gridContainers) {
        if (container.textContent?.includes("Item 1")) {
          gridContainer = container;
          break;
        }
      }

      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass("grid");
      expect(gridContainer).toHaveClass("grid-cols-3"); // Verify columns

      // Verify grid has appropriate CSS
      const computedStyle = globalThis.getComputedStyle(gridContainer as Element);
      expect(computedStyle.display).toBe("grid");
    },
  },
  {
    renderSpec: {
      type: "Grid",
      columns: 3,
      gap: 4,
      className: "w-full max-w-4xl",
      children: Array.from({ length: 6 }, (_, i) => ({
        type: "Box",
        className:
          "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
        children: `Item ${i + 1}`,
      })),
    },
  }
);

export const AutoFit: Story = enhanceStoryForDualMode<typeof Grid>(
  {
    args: {
      autoFit: true,
      minColWidth: "200px",
      gap: 4,
      className: "w-full max-w-4xl",
    },
    render: (args) => (
      <Grid {...args}>
        {Array.from({ length: 8 }, (_, i) => (
          <GridItem key={i}>Item {i + 1}</GridItem>
        ))}
      </Grid>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all 8 items are rendered
      for (let i = 1; i <= 8; i++) {
        expect(canvas.getByText(`Item ${i}`)).toBeInTheDocument();
      }

      // Find the grid container
      const gridContainers = canvasElement.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      let gridContainer: Element | null = null;
      for (const container of gridContainers) {
        if (container.textContent?.includes("Item 1")) {
          gridContainer = container;
          break;
        }
      }

      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass("grid");

      // Verify grid uses auto-fit CSS
      const computedStyle = globalThis.getComputedStyle(gridContainer as Element);
      expect(computedStyle.display).toBe("grid");
      // AutoFit applies a dynamic grid-template-columns
    },
  },
  {
    renderSpec: {
      type: "Grid",
      autoFit: true,
      minColWidth: "200px",
      gap: 4,
      className: "w-full max-w-4xl",
      children: Array.from({ length: 8 }, (_, i) => ({
        type: "Box",
        className:
          "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
        children: `Item ${i + 1}`,
      })),
    },
  }
);

export const DifferentColumnSizes: Story = enhanceStoryForDualMode<typeof Grid>(
  {
    args: {
      className: "grid-cols-[2fr_1fr_1fr] gap-4 w-full max-w-4xl",
    },
    render: (args) => (
      <Grid {...args}>
        <GridItem>2fr</GridItem>
        <GridItem>1fr</GridItem>
        <GridItem>1fr</GridItem>
        <GridItem>2fr</GridItem>
        <GridItem>1fr</GridItem>
        <GridItem>1fr</GridItem>
      </Grid>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all items are rendered
      const items = ["2fr", "1fr", "1fr", "2fr", "1fr", "1fr"];
      for (const text of items) {
        const elements = canvas.getAllByText(text);
        expect(elements.length).toBeGreaterThan(0);
      }

      // Find the grid container
      const gridContainers = canvasElement.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      let gridContainer: Element | null = null;
      for (const container of gridContainers) {
        if (container.textContent?.includes("2fr")) {
          gridContainer = container;
          break;
        }
      }

      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass("grid");
    },
  },
  {
    renderSpec: {
      type: "Grid",
      className: "grid-cols-[2fr_1fr_1fr] gap-4 w-full max-w-4xl",
      children: [
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
          children: "2fr",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
          children: "1fr",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
          children: "1fr",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
          children: "2fr",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
          children: "1fr",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
          children: "1fr",
        },
      ],
    },
  }
);

export const NamedAreas: Story = enhanceStoryForDualMode<typeof Grid>(
  {
    args: {
      className: "w-full max-w-4xl h-[400px]",
      areas: [
        "header header header",
        "sidebar content content",
        "sidebar content content",
        "footer footer footer",
      ],
      gap: 4,
    },
    render: (args) => (
      <Grid {...args}>
        <div className="bg-blue-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:header]">
          Header
        </div>
        <div className="bg-green-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:sidebar]">
          Sidebar
        </div>
        <div className="bg-purple-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:content]">
          Main Content
        </div>
        <div className="bg-orange-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:footer]">
          Footer
        </div>
      </Grid>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all grid areas are rendered
      expect(canvas.getByText("Header")).toBeInTheDocument();
      expect(canvas.getByText("Sidebar")).toBeInTheDocument();
      expect(canvas.getByText("Main Content")).toBeInTheDocument();
      expect(canvas.getByText("Footer")).toBeInTheDocument();

      // Find the grid container - it should have the 'grid' class
      const gridContainers = canvasElement.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      // Get the actual grid container that contains our items
      let gridContainer: Element | null = null;
      for (const container of gridContainers) {
        if (
          container.querySelector('[class*="grid-area:header"]') ||
          container.textContent?.includes("Header")
        ) {
          gridContainer = container;
          break;
        }
      }

      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass("grid");

      // The text elements are inside divs that have the grid-area classes
      // Find the divs with grid-area classes
      const headerDiv = canvasElement.querySelector(String.raw`.\[grid-area\:header\]`);
      const sidebarDiv = canvasElement.querySelector(String.raw`.\[grid-area\:sidebar\]`);
      const contentDiv = canvasElement.querySelector(String.raw`.\[grid-area\:content\]`);
      const footerDiv = canvasElement.querySelector(String.raw`.\[grid-area\:footer\]`);

      // Verify all grid area divs exist
      expect(headerDiv).toBeInTheDocument();
      expect(sidebarDiv).toBeInTheDocument();
      expect(contentDiv).toBeInTheDocument();
      expect(footerDiv).toBeInTheDocument();

      // Verify they contain the correct text
      expect(headerDiv?.textContent).toContain("Header");
      expect(sidebarDiv?.textContent).toContain("Sidebar");
      expect(contentDiv?.textContent).toContain("Main Content");
      expect(footerDiv?.textContent).toContain("Footer");
    },
  },
  {
    renderSpec: {
      type: "Grid",
      className: "w-full max-w-4xl h-[400px]",
      areas: [
        "header header header",
        "sidebar content content",
        "sidebar content content",
        "footer footer footer",
      ],
      gap: 4,
      children: [
        {
          type: "Box",
          className:
            "bg-blue-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:header]",
          children: "Header",
        },
        {
          type: "Box",
          className:
            "bg-green-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:sidebar]",
          children: "Sidebar",
        },
        {
          type: "Box",
          className:
            "bg-purple-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:content]",
          children: "Main Content",
        },
        {
          type: "Box",
          className:
            "bg-orange-500/80 rounded-xl p-4 text-white font-medium flex items-center justify-center [grid-area:footer]",
          children: "Footer",
        },
      ],
    },
  }
);

export const ResponsiveGrid: Story = enhanceStoryForDualMode<typeof Grid>(
  {
    args: {
      columns: { base: 1, md: 2, lg: 3, xl: 4 },
      gap: { base: 2, md: 4, lg: 6 },
      className: "w-full max-w-4xl",
    },
    render: (args) => (
      <Grid {...args}>
        {Array.from({ length: 8 }, (_, i) => (
          <GridItem key={i}>Item {i + 1}</GridItem>
        ))}
      </Grid>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all 8 items are rendered
      for (let i = 1; i <= 8; i++) {
        expect(canvas.getByText(`Item ${i}`)).toBeInTheDocument();
      }

      // Find the grid container
      const gridContainers = canvasElement.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      let gridContainer: Element | null = null;
      for (const container of gridContainers) {
        if (container.textContent?.includes("Item 1")) {
          gridContainer = container;
          break;
        }
      }

      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass("grid");

      // Verify responsive classes
      expect(gridContainer).toHaveClass("grid-cols-1");
      expect(gridContainer).toHaveClass("md:grid-cols-2");
      expect(gridContainer).toHaveClass("lg:grid-cols-3");
      expect(gridContainer).toHaveClass("xl:grid-cols-4");
    },
  },
  {
    renderSpec: {
      type: "Grid",
      columns: { base: 1, md: 2, lg: 3, xl: 4 },
      gap: { base: 2, md: 4, lg: 6 },
      className: "w-full max-w-4xl",
      children: Array.from({ length: 8 }, (_, i) => ({
        type: "Box",
        className:
          "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
        children: `Item ${i + 1}`,
      })),
    },
  }
);

export const ColumnDense: Story = enhanceStoryForDualMode<typeof Grid>(
  {
    args: {
      columns: 3,
      flow: "column-dense",
      gap: 4,
      className: "w-full max-w-4xl grid-rows-3",
    },
    render: (args) => (
      <Grid {...args}>
        <GridItem className="row-span-2">Span 2 rows</GridItem>
        {Array.from({ length: 7 }, (_, i) => (
          <GridItem key={i}>Item {i + 1}</GridItem>
        ))}
      </Grid>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify the spanning item is rendered
      expect(canvas.getByText("Span 2 rows")).toBeInTheDocument();

      // Verify all 7 items are rendered
      for (let i = 1; i <= 7; i++) {
        expect(canvas.getByText(`Item ${i}`)).toBeInTheDocument();
      }

      // Find the grid container
      const gridContainers = canvasElement.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      let gridContainer: Element | null = null;
      for (const container of gridContainers) {
        if (container.textContent?.includes("Span 2 rows")) {
          gridContainer = container;
          break;
        }
      }

      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass("grid");
      expect(gridContainer).toHaveClass("grid-flow-column-dense");
    },
  },
  {
    renderSpec: {
      type: "Grid",
      columns: 3,
      flow: "column-dense",
      gap: 4,
      className: "w-full max-w-4xl grid-rows-3",
      children: [
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium row-span-2",
          children: "Span 2 rows",
        },
        ...Array.from({ length: 7 }, (_, i) => ({
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium",
          children: `Item ${i + 1}`,
        })),
      ],
    },
  }
);

export const MasonryLikeGrid: Story = enhanceStoryForDualMode<typeof Grid>(
  {
    args: {
      autoFit: true,
      minColWidth: "180px",
      gap: 4,
      className: "w-full max-w-4xl",
    },
    render: (args) => (
      <Grid {...args}>
        <GridItem className="h-24">Short</GridItem>
        <GridItem className="h-48">Medium</GridItem>
        <GridItem className="h-64">Tall</GridItem>
        <GridItem className="h-32">Short-Medium</GridItem>
        <GridItem className="h-56">Medium-Tall</GridItem>
        <GridItem className="h-40">Medium</GridItem>
        <GridItem className="h-32">Short-Medium</GridItem>
        <GridItem className="h-48">Medium</GridItem>
      </Grid>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all items with different heights are rendered
      expect(canvas.getByText("Short")).toBeInTheDocument();
      expect(canvas.getByText("Tall")).toBeInTheDocument();
      expect(canvas.getByText("Medium-Tall")).toBeInTheDocument();

      // Verify Medium items (there are multiple)
      const mediumItems = canvas.getAllByText("Medium");
      expect(mediumItems.length).toBe(3);

      // Verify Short-Medium items (there are multiple)
      const shortMediumItems = canvas.getAllByText("Short-Medium");
      expect(shortMediumItems.length).toBe(2);

      // Find the grid container
      const gridContainers = canvasElement.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      let gridContainer: Element | null = null;
      for (const container of gridContainers) {
        if (container.textContent?.includes("Short")) {
          gridContainer = container;
          break;
        }
      }

      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass("grid");
    },
  },
  {
    renderSpec: {
      type: "Grid",
      autoFit: true,
      minColWidth: "180px",
      gap: 4,
      className: "w-full max-w-4xl",
      children: [
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium h-24",
          children: "Short",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium h-48",
          children: "Medium",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium h-64",
          children: "Tall",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium h-32",
          children: "Short-Medium",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium h-56",
          children: "Medium-Tall",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium h-40",
          children: "Medium",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium h-32",
          children: "Short-Medium",
        },
        {
          type: "Box",
          className:
            "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium h-48",
          children: "Medium",
        },
      ],
    },
  }
);
