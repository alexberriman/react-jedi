import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { Flex } from "./flex";

const BoxItem = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div
    className={`size-16 bg-primary/15 flex items-center justify-center rounded-md ${className || ""}`}
  >
    {children || "Box"}
  </div>
);

const meta = {
  title: "Layout Components/Flex",
  component: Flex,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "rowReverse", "columnReverse"],
      description: "The direction of the flex container",
    },
    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "wrapReverse"],
      description: "Whether and how flex items wrap",
    },
    justify: {
      control: "select",
      options: ["start", "end", "center", "between", "around", "evenly"],
      description: "How items are justified along the main axis",
    },
    align: {
      control: "select",
      options: ["start", "end", "center", "baseline", "stretch"],
      description: "How items are aligned along the cross axis",
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "The gap between flex items",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
    children: {
      control: "text",
      description: "The content of the flex container",
    },
  },
  args: {
    children: (
      <>
        <BoxItem>1</BoxItem>
        <BoxItem>2</BoxItem>
        <BoxItem>3</BoxItem>
      </>
    ),
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: "row",
    wrap: "nowrap",
    justify: "start",
    align: "start",
    gap: "md",
  },
};

export const Column: Story = {
  args: {
    direction: "column",
    align: "center",
    gap: "md",
  },
};

export const JustifyBetween: Story = {
  args: {
    justify: "between",
    align: "center",
    className: "w-[400px]",
  },
};

export const JustifyCenter: Story = {
  args: {
    justify: "center",
    align: "center",
    gap: "md",
    className: "w-[400px]",
  },
};

export const WrapExample: Story = {
  args: {
    wrap: "wrap",
    gap: "md",
    className: "w-[300px]",
    children: (
      <>
        <BoxItem>1</BoxItem>
        <BoxItem>2</BoxItem>
        <BoxItem>3</BoxItem>
        <BoxItem>4</BoxItem>
        <BoxItem>5</BoxItem>
        <BoxItem>6</BoxItem>
      </>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify wrap is enabled
    const flexContainer = canvas.getByTestId('flex-container');
    expect(flexContainer).toHaveClass('flex-wrap');
    
    // Verify 6 items are rendered
    const boxes = canvas.getAllByText(/^[1-6]$/);
    expect(boxes).toHaveLength(6);
    
    // Verify constrained width
    expect(flexContainer).toHaveClass('w-[300px]');
  },
};

export const RowReverse: Story = {
  args: {
    direction: "rowReverse",
    gap: "md",
  },
};

export const AlignStretch: Story = {
  args: {
    align: "stretch",
    gap: "md",
    className: "h-32",
    children: (
      <>
        <BoxItem className="h-full">1</BoxItem>
        <BoxItem className="h-full">2</BoxItem>
        <BoxItem className="h-full">3</BoxItem>
      </>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify stretch alignment
    const flexContainer = canvas.getByTestId('flex-container');
    expect(flexContainer).toHaveClass('items-stretch');
    
    // Verify container has height
    expect(flexContainer).toHaveClass('h-32');
    
    // Verify children
    const boxes = flexContainer.querySelectorAll('.h-full');
    expect(boxes).toHaveLength(3);
  },
};

export const ResponsiveLayout: Story = {
  args: {
    className: "w-full flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4 sm:items-center",
    children: (
      <>
        <BoxItem className="w-full sm:w-auto">Responsive</BoxItem>
        <BoxItem className="w-full sm:w-auto">Layout</BoxItem>
        <BoxItem className="w-full sm:w-auto">Example</BoxItem>
      </>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify responsive classes are applied
    const flexContainer = canvas.getByTestId('flex-container');
    expect(flexContainer).toHaveClass('flex');
    expect(flexContainer).toHaveClass('w-full');
    expect(flexContainer).toHaveClass('flex-col');
    expect(flexContainer).toHaveClass('sm:flex-row');
    expect(flexContainer).toHaveClass('sm:items-center');
    
    // Verify responsive box items
    const boxes = canvas.getAllByText(/Responsive|Layout|Example/);
    expect(boxes).toHaveLength(3);
    
    // Check that each box item has responsive classes
    const boxItems = canvasElement.querySelectorAll('.size-16');
    expect(boxItems).toHaveLength(3);
    for (const boxItem of boxItems) {
      expect(boxItem).toHaveClass('w-full');
      expect(boxItem).toHaveClass('sm:w-auto');
    }
  },
};

export const ComplexAlignment: Story = {
  render: (args) => (
    <div className="space-y-8 w-full max-w-[500px]">
      <Flex justify="between" align="center" className="bg-muted/50 p-4 rounded-lg">
        <BoxItem>Left</BoxItem>
        <Flex gap="sm">
          <BoxItem>Right 1</BoxItem>
          <BoxItem>Right 2</BoxItem>
        </Flex>
      </Flex>

      <Flex direction="column" gap="md" className="bg-muted/50 p-4 rounded-lg">
        <BoxItem className="w-full">Header</BoxItem>
        <Flex gap="sm" justify="center" className="w-full">
          <BoxItem>Content 1</BoxItem>
          <BoxItem>Content 2</BoxItem>
        </Flex>
        <BoxItem className="w-full">Footer</BoxItem>
      </Flex>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the outer container
    const container = canvasElement.querySelector('.space-y-8');
    expect(container).toBeInTheDocument();
    
    // Verify first flex layout (justify-between)
    const firstFlex = canvasElement.querySelector('.justify-between');
    expect(firstFlex).toHaveClass('bg-muted/50');
    expect(firstFlex).toHaveClass('p-4');
    
    // Verify nested flex in first section
    const nestedFlex = firstFlex?.querySelector('.gap-2');
    expect(nestedFlex).toBeInTheDocument();
    
    // Verify second flex layout (column direction)
    const columnFlex = canvasElement.querySelector('.flex-col');
    expect(columnFlex).toHaveClass('bg-muted/50');
    
    // Verify complex layout has all expected text
    expect(canvas.getByText('Left')).toBeInTheDocument();
    expect(canvas.getByText('Right 1')).toBeInTheDocument();
    expect(canvas.getByText('Right 2')).toBeInTheDocument();
    expect(canvas.getByText('Header')).toBeInTheDocument();
    expect(canvas.getByText('Content 1')).toBeInTheDocument();
    expect(canvas.getByText('Content 2')).toBeInTheDocument();
    expect(canvas.getByText('Footer')).toBeInTheDocument();
  },
};
