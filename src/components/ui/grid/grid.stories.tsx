import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./grid";

const meta: Meta<typeof Grid> = {
  title: "UI/Grid",
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
    className={`bg-gradient-to-tr from-purple-500/80 to-indigo-500/80 rounded-xl shadow-lg backdrop-blur-sm p-6 flex items-center justify-center text-white font-medium animate-pulse ${className}`}
  >
    {children}
  </div>
);

export const Default: Story = {
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
};

export const AutoFit: Story = {
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
};

export const DifferentColumnSizes: Story = {
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
};

export const NamedAreas: Story = {
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
};

export const ResponsiveGrid: Story = {
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
};

export const ColumnDense: Story = {
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
};

export const MasonryLikeGrid: Story = {
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
};
