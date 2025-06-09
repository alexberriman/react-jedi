import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { Flex } from "./flex";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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
    // Children will be provided in each story individually
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Flex>(
  {
    args: {
      direction: "row",
      wrap: "nowrap",
      justify: "start",
      align: "start",
      gap: "md",
      children: (
        <>
          <BoxItem>1</BoxItem>
          <BoxItem>2</BoxItem>
          <BoxItem>3</BoxItem>
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that flex container renders
      const flexContainer = canvas.getByTestId("flex-container");
      expect(flexContainer).toBeInTheDocument();
      
      // Test that it has the correct classes
      expect(flexContainer).toHaveClass("flex");
      expect(flexContainer).toHaveClass("flex-row");
      expect(flexContainer).toHaveClass("justify-start");
      expect(flexContainer).toHaveClass("items-start");
      expect(flexContainer).toHaveClass("gap-4");
      
      // Test that 3 box items render
      const boxes = canvas.getAllByText(/^[1-3]$/);
      expect(boxes).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "row",
      wrap: "nowrap",
      justify: "start",
      align: "start",
      gap: "md",
      children: [
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "1",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "2",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "3",
        },
      ],
    },
  }
);

export const Column: Story = enhanceStoryForDualMode<typeof Flex>(
  {
    args: {
      direction: "column",
      align: "center",
      gap: "md",
      children: (
        <>
          <BoxItem>1</BoxItem>
          <BoxItem>2</BoxItem>
          <BoxItem>3</BoxItem>
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that flex container renders with column direction
      const flexContainer = canvas.getByTestId("flex-container");
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass("flex-col");
      expect(flexContainer).toHaveClass("items-center");
      expect(flexContainer).toHaveClass("gap-4");
      
      // Test that 3 box items render
      const boxes = canvas.getAllByText(/^[1-3]$/);
      expect(boxes).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      align: "center",
      gap: "md",
      children: [
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "1",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "2",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "3",
        },
      ],
    },
  }
);

export const JustifyBetween: Story = enhanceStoryForDualMode<typeof Flex>(
  {
    args: {
      justify: "between",
      align: "center",
      className: "w-[400px]",
      children: (
        <>
          <BoxItem>1</BoxItem>
          <BoxItem>2</BoxItem>
          <BoxItem>3</BoxItem>
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that flex container renders with justify-between
      const flexContainer = canvas.getByTestId("flex-container");
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass("justify-between");
      expect(flexContainer).toHaveClass("items-center");
      expect(flexContainer).toHaveClass("w-[400px]");
      
      // Test that 3 box items render
      const boxes = canvas.getAllByText(/^[1-3]$/);
      expect(boxes).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      justify: "space-between",
      align: "center",
      className: "w-[400px]",
      children: [
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "1",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "2",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "3",
        },
      ],
    },
  }
);

export const JustifyCenter: Story = enhanceStoryForDualMode<typeof Flex>(
  {
    args: {
      justify: "center",
      align: "center",
      gap: "md",
      className: "w-[400px]",
      children: (
        <>
          <BoxItem>1</BoxItem>
          <BoxItem>2</BoxItem>
          <BoxItem>3</BoxItem>
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that flex container renders with justify-center
      const flexContainer = canvas.getByTestId("flex-container");
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass("justify-center");
      expect(flexContainer).toHaveClass("items-center");
      expect(flexContainer).toHaveClass("gap-4");
      expect(flexContainer).toHaveClass("w-[400px]");
      
      // Test that 3 box items render
      const boxes = canvas.getAllByText(/^[1-3]$/);
      expect(boxes).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      justify: "center",
      align: "center",
      gap: "md",
      className: "w-[400px]",
      children: [
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "1",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "2",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "3",
        },
      ],
    },
  }
);

export const WrapExample: Story = enhanceStoryForDualMode<typeof Flex>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify wrap is enabled
      const flexContainer = canvas.getByTestId("flex-container");
      expect(flexContainer).toHaveClass("flex-wrap");

      // Verify 6 items are rendered
      const boxes = canvas.getAllByText(/^[1-6]$/);
      expect(boxes).toHaveLength(6);

      // Verify constrained width
      expect(flexContainer).toHaveClass("w-[300px]");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      wrap: "wrap",
      gap: "md",
      className: "w-[300px]",
      children: [
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "1",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "2",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "3",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "4",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "5",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "6",
        },
      ],
    },
  }
);

export const RowReverse: Story = enhanceStoryForDualMode<typeof Flex>(
  {
    args: {
      direction: "rowReverse",
      gap: "md",
      children: (
        <>
          <BoxItem>1</BoxItem>
          <BoxItem>2</BoxItem>
          <BoxItem>3</BoxItem>
        </>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that flex container renders with row-reverse direction
      const flexContainer = canvas.getByTestId("flex-container");
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass("flex-row-reverse");
      expect(flexContainer).toHaveClass("gap-4");
      
      // Test that 3 box items render
      const boxes = canvas.getAllByText(/^[1-3]$/);
      expect(boxes).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "row-reverse",
      gap: "md",
      children: [
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "1",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "2",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
          children: "3",
        },
      ],
    },
  }
);

export const AlignStretch: Story = enhanceStoryForDualMode<typeof Flex>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify stretch alignment
      const flexContainer = canvas.getByTestId("flex-container");
      expect(flexContainer).toHaveClass("items-stretch");

      // Verify container has height
      expect(flexContainer).toHaveClass("h-32");

      // Verify children
      const boxes = flexContainer.querySelectorAll(".h-full");
      expect(boxes).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      align: "stretch",
      gap: "md",
      className: "h-32",
      children: [
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md h-full",
          children: "1",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md h-full",
          children: "2",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md h-full",
          children: "3",
        },
      ],
    },
  }
);

export const ResponsiveLayout: Story = enhanceStoryForDualMode<typeof Flex>(
  {
    args: {
      className:
        "w-full flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4 sm:items-center",
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify responsive classes are applied
      const flexContainer = canvas.getByTestId("flex-container");
      expect(flexContainer).toHaveClass("flex");
      expect(flexContainer).toHaveClass("w-full");
      expect(flexContainer).toHaveClass("flex-col");
      expect(flexContainer).toHaveClass("sm:flex-row");
      expect(flexContainer).toHaveClass("sm:items-center");

      // Verify responsive box items
      const boxes = canvas.getAllByText(/Responsive|Layout|Example/);
      expect(boxes).toHaveLength(3);

      // Check that each box item has responsive classes
      const boxItems = canvasElement.querySelectorAll(".size-16");
      expect(boxItems).toHaveLength(3);
      for (const boxItem of boxItems) {
        expect(boxItem).toHaveClass("w-full");
        expect(boxItem).toHaveClass("sm:w-auto");
      }
    },
  },
  {
    renderSpec: {
      type: "Flex",
      className:
        "w-full flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4 sm:items-center",
      children: [
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md w-full sm:w-auto",
          children: "Responsive",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md w-full sm:w-auto",
          children: "Layout",
        },
        {
          type: "Box",
          className: "size-16 bg-primary/15 flex items-center justify-center rounded-md w-full sm:w-auto",
          children: "Example",
        },
      ],
    },
  }
);

export const ComplexAlignment: Story = enhanceStoryForDualMode<typeof Flex>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify first flex layout (justify-between)
      const firstFlex = canvasElement.querySelector(".justify-between");
      expect(firstFlex).toBeInTheDocument();
      expect(firstFlex).toHaveClass("bg-muted/50");
      expect(firstFlex).toHaveClass("p-4");

      // Verify nested flex in first section
      const nestedFlex = firstFlex?.querySelector(".gap-2");
      expect(nestedFlex).toBeInTheDocument();

      // Verify second flex layout (column direction)
      const columnFlex = canvasElement.querySelector(".flex-col:not(.gap-8)");
      expect(columnFlex).toBeInTheDocument();
      expect(columnFlex).toHaveClass("bg-muted/50");

      // Verify complex layout has all expected text
      expect(canvas.getByText("Left")).toBeInTheDocument();
      expect(canvas.getByText("Right 1")).toBeInTheDocument();
      expect(canvas.getByText("Right 2")).toBeInTheDocument();
      expect(canvas.getByText("Header")).toBeInTheDocument();
      expect(canvas.getByText("Content 1")).toBeInTheDocument();
      expect(canvas.getByText("Content 2")).toBeInTheDocument();
      expect(canvas.getByText("Footer")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      className: "w-full max-w-[500px]",
      children: [
        {
          type: "Flex",
          justify: "space-between",
          align: "center",
          className: "bg-muted/50 p-4 rounded-lg",
          children: [
            {
              type: "Box",
              className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
              children: "Left",
            },
            {
              type: "Flex",
              gap: "sm",
              children: [
                {
                  type: "Box",
                  className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
                  children: "Right 1",
                },
                {
                  type: "Box",
                  className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
                  children: "Right 2",
                },
              ],
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          gap: "md",
          className: "bg-muted/50 p-4 rounded-lg",
          children: [
            {
              type: "Box",
              className: "size-16 bg-primary/15 flex items-center justify-center rounded-md w-full",
              children: "Header",
            },
            {
              type: "Flex",
              gap: "sm",
              justify: "center",
              className: "w-full",
              children: [
                {
                  type: "Box",
                  className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
                  children: "Content 1",
                },
                {
                  type: "Box",
                  className: "size-16 bg-primary/15 flex items-center justify-center rounded-md",
                  children: "Content 2",
                },
              ],
            },
            {
              type: "Box",
              className: "size-16 bg-primary/15 flex items-center justify-center rounded-md w-full",
              children: "Footer",
            },
          ],
        },
      ],
    },
  }
);
