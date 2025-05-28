import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";
import { Group } from "./group";
import { Button } from "../button";
import { Badge } from "../badge";
import { Avatar } from "../avatar";
import { Separator } from "../separator";

const meta = {
  title: "Components/Layout/Group",
  component: Group,
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: {
      control: "select",
      options: ["wrap", "nowrap", "wrap-reverse"],
    },
    grow: {
      control: "boolean",
    },
    preventGrow: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spacing: "md",
    align: "center",
  },
  render: (args) => (
    <Group {...args}>
      <Button variant="default">Button 1</Button>
      <Button variant="secondary">Button 2</Button>
      <Button variant="outline">Button 3</Button>
    </Group>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all buttons are rendered
    expect(canvas.getByRole('button', { name: 'Button 1' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Button 2' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Button 3' })).toBeInTheDocument();
    
    // Verify group container
    const groupContainer = canvas.getByRole('button', { name: 'Button 1' }).parentElement;
    expect(groupContainer).toBeInTheDocument();
    
    // Verify flex layout is applied
    expect(groupContainer).toHaveClass('flex');
    expect(groupContainer).toHaveClass('items-center'); // align="center"
  },
};

export const WithMixedComponents: Story = {
  args: {
    spacing: "md",
    align: "center",
  },
  render: (args) => (
    <Group {...args}>
      <Button size="sm">Save</Button>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
      <Separator orientation="vertical" className="h-6" />
      <Badge>Draft</Badge>
      <Avatar className="h-8 w-8">
        <img src="https://placehold.co/32x32/EEE/31343C" alt="Avatar" />
      </Avatar>
    </Group>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify buttons are rendered
    expect(canvas.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    
    // Verify badge is rendered
    expect(canvas.getByText('Draft')).toBeInTheDocument();
    
    // Verify avatar is rendered
    expect(canvas.getByAltText('Avatar')).toBeInTheDocument();
    
    // Verify separator exists
    const separators = canvasElement.querySelectorAll('[data-orientation="vertical"]');
    expect(separators.length).toBeGreaterThan(0);
    
    // Verify group container maintains alignment
    const groupContainer = canvas.getByRole('button', { name: 'Save' }).parentElement;
    expect(groupContainer).toHaveClass('items-center');
  },
};

export const SpacingVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium">Spacing: none</p>
        <Group spacing="none">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Spacing: xs</p>
        <Group spacing="xs">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Spacing: sm</p>
        <Group spacing="sm">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Spacing: md</p>
        <Group spacing="md">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Spacing: lg</p>
        <Group spacing="lg">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Spacing: xl</p>
        <Group spacing="xl">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
    </div>
  ),
};

export const AlignmentVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium">Align: start</p>
        <Group align="start" spacing="md" className="h-16 bg-slate-100 p-2">
          <Button size="sm">Button</Button>
          <Badge>Badge</Badge>
          <span className="text-sm">Text</span>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Align: center</p>
        <Group align="center" spacing="md" className="h-16 bg-slate-100 p-2">
          <Button size="sm">Button</Button>
          <Badge>Badge</Badge>
          <span className="text-sm">Text</span>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Align: end</p>
        <Group align="end" spacing="md" className="h-16 bg-slate-100 p-2">
          <Button size="sm">Button</Button>
          <Badge>Badge</Badge>
          <span className="text-sm">Text</span>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Align: baseline</p>
        <Group align="baseline" spacing="md" className="bg-slate-100 p-2">
          <Button size="sm">Button</Button>
          <Badge>Badge</Badge>
          <span className="text-sm">Small text</span>
          <span className="text-lg">Large text</span>
        </Group>
      </div>
    </div>
  ),
};

export const WrappingBehavior: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium">Wrap: wrap (default)</p>
        <div className="w-80 rounded border p-4">
          <Group spacing="md" wrap="wrap">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
            <Button>Button 4</Button>
            <Button>Button 5</Button>
            <Button>Button 6</Button>
          </Group>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Wrap: nowrap</p>
        <div className="w-80 overflow-x-auto rounded border p-4">
          <Group spacing="md" wrap="nowrap">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
            <Button>Button 4</Button>
            <Button>Button 5</Button>
            <Button>Button 6</Button>
          </Group>
        </div>
      </div>
    </div>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium">Justify: start</p>
        <Group justify="start" spacing="md" className="w-full bg-slate-100 p-2">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Justify: center</p>
        <Group justify="center" spacing="md" className="w-full bg-slate-100 p-2">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Justify: end</p>
        <Group justify="end" spacing="md" className="w-full bg-slate-100 p-2">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Justify: between</p>
        <Group justify="between" spacing="md" className="w-full bg-slate-100 p-2">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Justify: around</p>
        <Group justify="around" spacing="md" className="w-full bg-slate-100 p-2">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Justify: evenly</p>
        <Group justify="evenly" spacing="md" className="w-full bg-slate-100 p-2">
          <Button size="sm">Button 1</Button>
          <Button size="sm">Button 2</Button>
          <Button size="sm">Button 3</Button>
        </Group>
      </div>
    </div>
  ),
};

export const GrowBehavior: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium">Without grow (default)</p>
        <Group spacing="md" className="w-full bg-slate-100 p-2">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </Group>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With grow</p>
        <Group spacing="md" grow className="w-full bg-slate-100 p-2">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </Group>
      </div>
    </div>
  ),
};

export const FormActions: Story = {
  name: "Form Actions Example",
  render: () => (
    <div className="max-w-md">
      <div className="space-y-4 rounded-lg border p-6">
        <h3 className="text-lg font-semibold">Save Changes?</h3>
        <p className="text-sm text-muted-foreground">
          You have unsaved changes. Would you like to save them before leaving?
        </p>
        <Group spacing="sm" justify="end">
          <Button variant="outline">Cancel</Button>
          <Button variant="outline">Discard</Button>
          <Button>Save Changes</Button>
        </Group>
      </div>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify dialog content
    expect(canvas.getByText('Save Changes?')).toBeInTheDocument();
    expect(canvas.getByText(/You have unsaved changes/)).toBeInTheDocument();
    
    // Verify all action buttons
    const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
    const discardButton = canvas.getByRole('button', { name: 'Discard' });
    const saveButton = canvas.getByRole('button', { name: 'Save Changes' });
    
    expect(cancelButton).toBeInTheDocument();
    expect(discardButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    
    // Verify group container has justify-end
    const groupContainer = cancelButton.parentElement;
    expect(groupContainer).toHaveClass('justify-end');
    
    // Test button interaction
    await userEvent.click(saveButton);
    // Button should still be there (no actual action in this story)
    expect(saveButton).toBeInTheDocument();
  },
};

export const ToolbarExample: Story = {
  name: "Toolbar Example",
  render: () => (
    <div className="rounded-lg border p-4">
      <Group spacing="sm" align="center">
        <Group spacing="xs">
          <Button size="sm" variant="outline">
            Bold
          </Button>
          <Button size="sm" variant="outline">
            Italic
          </Button>
          <Button size="sm" variant="outline">
            Underline
          </Button>
        </Group>
        <Separator orientation="vertical" className="h-6" />
        <Group spacing="xs">
          <Button size="sm" variant="outline">
            Align Left
          </Button>
          <Button size="sm" variant="outline">
            Align Center
          </Button>
          <Button size="sm" variant="outline">
            Align Right
          </Button>
        </Group>
        <Separator orientation="vertical" className="h-6" />
        <Button size="sm" variant="outline">
          Link
        </Button>
        <Button size="sm" variant="outline">
          Image
        </Button>
      </Group>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify formatting buttons
    expect(canvas.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Italic' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Underline' })).toBeInTheDocument();
    
    // Verify alignment buttons
    expect(canvas.getByRole('button', { name: 'Align Left' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Align Center' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Align Right' })).toBeInTheDocument();
    
    // Verify additional buttons
    expect(canvas.getByRole('button', { name: 'Link' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Image' })).toBeInTheDocument();
    
    // Verify separators (should be 2)
    const separators = canvasElement.querySelectorAll('[data-orientation="vertical"]');
    expect(separators).toHaveLength(2);
    
    // Verify nested groups structure
    const allButtons = canvas.getAllByRole('button');
    expect(allButtons).toHaveLength(8);
  },
};

export const TagList: Story = {
  name: "Tag List Example",
  render: () => (
    <div className="max-w-lg space-y-4">
      <h3 className="text-sm font-medium">Tags</h3>
      <Group spacing="sm">
        <Badge variant="secondary">React</Badge>
        <Badge variant="secondary">TypeScript</Badge>
        <Badge variant="secondary">Tailwind CSS</Badge>
        <Badge variant="secondary">Storybook</Badge>
        <Badge variant="secondary">Vite</Badge>
        <Badge variant="secondary">UI Components</Badge>
        <Badge variant="secondary">Design System</Badge>
        <Badge variant="outline">+ Add Tag</Badge>
      </Group>
    </div>
  ),
};
