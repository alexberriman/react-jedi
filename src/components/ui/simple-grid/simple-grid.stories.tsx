import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { SimpleGrid } from "./simple-grid";
import { Box } from "../box";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Layout Components/SimpleGrid",
  component: SimpleGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The SimpleGrid component creates a responsive grid layout with equal-sized cells.
It's perfect for creating uniform grids of content like image galleries, product cards, or feature grids.

## Features
- Equal-sized grid cells
- Responsive column configuration
- Flexible spacing between items
- Auto-fit with minimum child width option
- Supports all standard HTML div attributes

## Usage
\`\`\`tsx
import { SimpleGrid } from "@alexberriman/react-jedi";

// Fixed columns
<SimpleGrid columns={3} spacing="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</SimpleGrid>

// Responsive columns
<SimpleGrid
  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
  spacing="6"
>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</SimpleGrid>

// Auto-fit with minimum width
<SimpleGrid minChildWidth="250px" spacing="4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</SimpleGrid>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      description: "Number of columns (can be responsive)",
      control: { type: "object" },
    },
    spacing: {
      description: "Spacing between grid items",
      control: { type: "text" },
    },
    minChildWidth: {
      description: "Minimum width for grid children (enables auto-fit)",
      control: { type: "text" },
    },
    children: {
      description: "Grid content",
      control: false,
    },
  },
} satisfies Meta<typeof SimpleGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo box for examples
const DemoBox = ({ index }: { index: number }) => (
  <Box className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow">
    {index}
  </Box>
);

export const Default: Story = enhanceStoryForDualMode<typeof SimpleGrid>(
  {
    args: {
      columns: 3,
      spacing: "4",
      children: (
        <>
          {Array.from({ length: 6 }, (_, i) => (
            <DemoBox key={i} index={i + 1} />
          ))}
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test grid renders
      const grid = canvasElement.querySelector('[data-slot="simple-grid"]');
      expect(grid).toBeTruthy();

      // Test all 6 items are rendered
      for (let i = 1; i <= 6; i++) {
        expect(canvas.getByText(i.toString())).toBeInTheDocument();
      }

      // Test grid layout is applied
      if (grid) {
        const gridElement = grid as HTMLElement;
        const computedStyle = globalThis.getComputedStyle(gridElement);
        expect(computedStyle.display).toBe("grid");
        // Check that it has 3 columns by checking the computed style
        // The exact format might vary, so just check it has 3 columns worth of space
        const templateColumns = computedStyle.gridTemplateColumns;
        const columnCount = templateColumns.split(" ").length;
        expect(columnCount).toBe(3);
      }
    },
  },
  {
    renderSpec: {
      type: "SimpleGrid",
      columns: 3,
      spacing: "4",
      children: Array.from({ length: 6 }, (_, i) => ({
        type: "Box",
        className: "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow",
        children: String(i + 1),
      })),
    },
  }
);

export const ResponsiveColumns: Story = enhanceStoryForDualMode<typeof SimpleGrid>(
  {
    args: {
      columns: {
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      },
      spacing: "6",
      children: (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <DemoBox key={i} index={i + 1} />
          ))}
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all 10 items render
      for (let i = 1; i <= 10; i++) {
        expect(canvas.getByText(i.toString())).toBeInTheDocument();
      }

      // Test responsive classes are applied
      const grid = canvasElement.querySelector('[data-slot="simple-grid"]');
      expect(grid).toBeTruthy();

      // Check that grid has the proper CSS variables set
      if (grid) {
        const gridElement = grid as HTMLElement;
        const styles = gridElement.style;
        expect(styles.getPropertyValue("--grid-columns")).toBe("1");
        expect(styles.getPropertyValue("--grid-columns-sm")).toBe("2");
        expect(styles.getPropertyValue("--grid-columns-md")).toBe("3");
        expect(styles.getPropertyValue("--grid-columns-lg")).toBe("4");
        expect(styles.getPropertyValue("--grid-columns-xl")).toBe("5");
      }
    },
  },
  {
    renderSpec: {
      type: "SimpleGrid",
      columns: {
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      },
      spacing: "6",
      children: Array.from({ length: 10 }, (_, i) => ({
        type: "Box",
        className: "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow",
        children: String(i + 1),
      })),
    },
  }
);

export const AutoFitMinWidth: Story = enhanceStoryForDualMode<typeof SimpleGrid>(
  {
    args: {
      minChildWidth: "200px",
      spacing: "4",
      children: (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <DemoBox key={i} index={i + 1} />
          ))}
        </>
      ),
    },
    parameters: {
      docs: {
        description: {
          story: "Grid automatically adjusts columns based on minimum child width",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test auto-fit grid
      const grid = canvasElement.querySelector('[data-slot="simple-grid"]');
      expect(grid).toBeTruthy();

      // Test all items render
      for (let i = 1; i <= 12; i++) {
        expect(canvas.getByText(i.toString())).toBeInTheDocument();
      }

      // Test auto-fit CSS is applied
      if (grid) {
        const gridElement = grid as HTMLElement;
        const styles = gridElement.style;
        expect(styles.getPropertyValue("--grid-min-child-width")).toBe("200px");
      }
    },
  },
  {
    renderSpec: {
      type: "SimpleGrid",
      minChildWidth: "200px",
      spacing: "4",
      children: Array.from({ length: 12 }, (_, i) => ({
        type: "Box",
        className: "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow",
        children: String(i + 1),
      })),
    },
  }
);

export const ResponsiveSpacing: Story = enhanceStoryForDualMode<typeof SimpleGrid>(
  {
    args: {
      columns: 3,
      spacing: {
        base: "2",
        sm: "4",
        md: "6",
        lg: "8",
      },
      children: (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <DemoBox key={i} index={i + 1} />
          ))}
        </>
      ),
    },
    parameters: {
      docs: {
        description: {
          story: "Spacing increases at larger screen sizes",
        },
      },
    },
    play: async ({ canvasElement }) => {
      // Test responsive spacing classes
      const grid = canvasElement.querySelector('[data-slot="simple-grid"]');
      expect(grid).toBeTruthy();

      // Check that grid has the proper spacing CSS variables set
      if (grid) {
        const gridElement = grid as HTMLElement;
        const styles = gridElement.style;
        expect(styles.getPropertyValue("--grid-spacing")).toBe("2");
        expect(styles.getPropertyValue("--grid-spacing-sm")).toBe("4");
        expect(styles.getPropertyValue("--grid-spacing-md")).toBe("6");
        expect(styles.getPropertyValue("--grid-spacing-lg")).toBe("8");
      }
    },
  },
  {
    renderSpec: {
      type: "SimpleGrid",
      columns: 3,
      spacing: {
        base: "2",
        sm: "4",
        md: "6",
        lg: "8",
      },
      children: Array.from({ length: 9 }, (_, i) => ({
        type: "Box",
        className: "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-shadow",
        children: String(i + 1),
      })),
    },
  }
);

export const LargeGrid: Story = enhanceStoryForDualMode<typeof SimpleGrid>(
  {
    args: {
      columns: {
        base: 2,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
      },
      spacing: "3",
      children: (
        <>
          {Array.from({ length: 24 }, (_, i) => (
            <Box
              key={i}
              className="bg-slate-100 dark:bg-slate-800 rounded p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium"
            >
              Item {i + 1}
            </Box>
          ))}
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test large number of items render correctly
      expect(canvas.getByText("Item 1")).toBeInTheDocument();
      expect(canvas.getByText("Item 12")).toBeInTheDocument();
      expect(canvas.getByText("Item 24")).toBeInTheDocument();

      // Count all items
      const items = canvas.getAllByText(/^Item \d+$/);
      expect(items).toHaveLength(24);
    },
  },
  {
    renderSpec: {
      type: "SimpleGrid",
      columns: {
        base: 2,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
      },
      spacing: "3",
      children: Array.from({ length: 24 }, (_, i) => ({
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 rounded p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: `Item ${i + 1}`,
      })),
    },
  }
);

export const ContentCards: Story = enhanceStoryForDualMode<typeof SimpleGrid>(
  {
    args: {
      columns: {
        base: 1,
        sm: 2,
        lg: 3,
      },
      spacing: "6",
      children: (
        <>
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-3">
              <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg"></div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Card Title {i + 1}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                This is a content card in a SimpleGrid layout. It demonstrates how real content might
                look.
              </p>
            </Box>
          ))}
        </>
      ),
    },
    parameters: {
      docs: {
        description: {
          story: "Example with content cards",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all cards render
      for (let i = 1; i <= 6; i++) {
        expect(canvas.getByText(`Card Title ${i}`)).toBeInTheDocument();
      }

      // Test card content
      const cards = canvas.getAllByText(/This is a content card/);
      expect(cards).toHaveLength(6);

      // Test grid has proper shadow styling
      const cardElements = canvasElement.querySelectorAll(".shadow-lg");
      expect(cardElements.length).toBeGreaterThanOrEqual(6);
    },
  },
  {
    renderSpec: {
      type: "SimpleGrid",
      columns: {
        base: 1,
        sm: 2,
        lg: 3,
      },
      spacing: "6",
      children: Array.from({ length: 6 }, (_, i) => ({
        type: "Box",
        className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-3",
        children: [
          {
            type: "Box",
            className: "h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg",
          },
          {
            type: "Heading",
            level: 3,
            className: "text-lg font-semibold text-slate-800 dark:text-slate-200",
            children: `Card Title ${i + 1}`,
          },
          {
            type: "Text",
            className: "text-slate-600 dark:text-slate-400 text-sm",
            children: "This is a content card in a SimpleGrid layout. It demonstrates how real content might look.",
          },
        ],
      })),
    },
  }
);

export const MixedContent: Story = enhanceStoryForDualMode<typeof SimpleGrid>(
  {
    args: {
      columns: 4,
      spacing: "4",
      children: (
        <>
          <Box className="bg-red-500 text-white rounded p-4 h-32">Red</Box>
          <Box className="bg-blue-500 text-white rounded p-4 h-48">Blue (Taller)</Box>
          <Box className="bg-green-500 text-white rounded p-4 h-32">Green</Box>
          <Box className="bg-yellow-500 text-black rounded p-4 h-40">Yellow</Box>
          <Box className="bg-purple-500 text-white rounded p-4 h-32">Purple</Box>
          <Box className="bg-pink-500 text-white rounded p-4 h-56">Pink (Tallest)</Box>
          <Box className="bg-orange-500 text-white rounded p-4 h-32">Orange</Box>
          <Box className="bg-teal-500 text-white rounded p-4 h-36">Teal</Box>
        </>
      ),
    },
    parameters: {
      docs: {
        description: {
          story: "SimpleGrid with mixed height content. Note how rows adjust to the tallest item.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all color boxes render
      const colors = [
        "Red",
        "Blue (Taller)",
        "Green",
        "Yellow",
        "Purple",
        "Pink (Tallest)",
        "Orange",
        "Teal",
      ];
      for (const color of colors) {
        expect(canvas.getByText(color)).toBeInTheDocument();
      }

      // Test different height classes
      expect(canvasElement.querySelector(".h-32")).toBeTruthy();
      expect(canvasElement.querySelector(".h-48")).toBeTruthy();
      expect(canvasElement.querySelector(".h-56")).toBeTruthy();
    },
  },
  {
    renderSpec: {
      type: "SimpleGrid",
      columns: 4,
      spacing: "4",
      children: [
        {
          type: "Box",
          className: "bg-red-500 text-white rounded p-4 h-32",
          children: "Red",
        },
        {
          type: "Box",
          className: "bg-blue-500 text-white rounded p-4 h-48",
          children: "Blue (Taller)",
        },
        {
          type: "Box",
          className: "bg-green-500 text-white rounded p-4 h-32",
          children: "Green",
        },
        {
          type: "Box",
          className: "bg-yellow-500 text-black rounded p-4 h-40",
          children: "Yellow",
        },
        {
          type: "Box",
          className: "bg-purple-500 text-white rounded p-4 h-32",
          children: "Purple",
        },
        {
          type: "Box",
          className: "bg-pink-500 text-white rounded p-4 h-56",
          children: "Pink (Tallest)",
        },
        {
          type: "Box",
          className: "bg-orange-500 text-white rounded p-4 h-32",
          children: "Orange",
        },
        {
          type: "Box",
          className: "bg-teal-500 text-white rounded p-4 h-36",
          children: "Teal",
        },
      ],
    },
  }
);
