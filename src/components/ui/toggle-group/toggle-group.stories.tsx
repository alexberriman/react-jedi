import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

const meta = {
  title: "Components/UI/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
    },
    value: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: "single",
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justified">
          <AlignJustify size={16} />
        </ToggleGroupItem>
      </>
    ),
  },
};

export const Multiple: Story = {
  args: {
    type: "multiple",
    defaultValue: ["bold"],
    children: (
      <>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline size={16} />
        </ToggleGroupItem>
      </>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    type: "single",
    defaultValue: "left",
    children: (
      <>
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={16} />
        </ToggleGroupItem>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    type: "single",
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={14} />
        </ToggleGroupItem>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    type: "single",
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={20} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={20} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={20} />
        </ToggleGroupItem>
      </>
    ),
  },
};

export const WithText: Story = {
  args: {
    type: "single",
    defaultValue: "left",
    children: (
      <>
        <ToggleGroupItem value="left">
          <AlignLeft size={16} className="mr-2" />
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter size={16} className="mr-2" />
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight size={16} className="mr-2" />
          Right
        </ToggleGroupItem>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    type: "single",
    disabled: true,
    defaultValue: "center",
    children: (
      <>
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight size={16} />
        </ToggleGroupItem>
      </>
    ),
  },
};

export const SizeComparison: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Small (sm)</p>
        <ToggleGroup type="single" size="sm" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left aligned">
            <AlignLeft size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center aligned">
            <AlignCenter size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right aligned">
            <AlignRight size={14} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Default</p>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left aligned">
            <AlignLeft size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center aligned">
            <AlignCenter size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right aligned">
            <AlignRight size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Large (lg)</p>
        <ToggleGroup type="single" size="lg" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left aligned">
            <AlignLeft size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center aligned">
            <AlignCenter size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right aligned">
            <AlignRight size={20} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const VariantsShowcase: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Default variant</p>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left aligned">
            <AlignLeft size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center aligned">
            <AlignCenter size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right aligned">
            <AlignRight size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Outline variant</p>
        <ToggleGroup type="single" variant="outline" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left aligned">
            <AlignLeft size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center aligned">
            <AlignCenter size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right aligned">
            <AlignRight size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};
