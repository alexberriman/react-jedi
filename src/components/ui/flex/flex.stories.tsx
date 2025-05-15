import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./flex";

const BoxItem = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div
    className={`size-16 bg-primary/15 flex items-center justify-center rounded-md ${className || ""}`}
  >
    {children || "Box"}
  </div>
);

const meta = {
  title: "UI/Flex",
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
};

export const ResponsiveLayout: Story = {
  args: {
    className: "flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4 sm:items-center",
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
};
