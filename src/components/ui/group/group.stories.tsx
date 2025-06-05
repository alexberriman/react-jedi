import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import { Group } from "./group";
import { Button } from "../button";
import { Badge } from "../badge";
import { Avatar } from "../avatar";
import { Separator } from "../separator";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Layout Components/Group",
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

export const Default: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all buttons are rendered
      expect(canvas.getByRole("button", { name: "Button 1" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Button 2" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Button 3" })).toBeInTheDocument();

      // Verify group container
      const groupContainer = canvas.getByRole("button", { name: "Button 1" }).parentElement;
      expect(groupContainer).toBeInTheDocument();

      // Verify flex layout is applied
      expect(groupContainer).toHaveClass("inline-flex");
      expect(groupContainer).toHaveClass("items-center"); // align="center"
    },
  },
  {
    renderSpec: {
      type: "Group",
      spacing: "md",
      align: "center",
      children: [
        {
          type: "Button",
          variant: "default",
          children: "Button 1",
        },
        {
          type: "Button",
          variant: "secondary",
          children: "Button 2",
        },
        {
          type: "Button",
          variant: "outline",
          children: "Button 3",
        },
      ],
    },
  }
);

export const WithMixedComponents: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify buttons are rendered
      expect(canvas.getByRole("button", { name: "Save" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Cancel" })).toBeInTheDocument();

      // Verify badge is rendered
      expect(canvas.getByText("Draft")).toBeInTheDocument();

      // Verify avatar is rendered
      expect(canvas.getByAltText("Avatar")).toBeInTheDocument();

      // Verify separator exists
      const separators = canvasElement.querySelectorAll('[data-orientation="vertical"]');
      expect(separators.length).toBeGreaterThan(0);

      // Verify group container maintains alignment
      const groupContainer = canvas.getByRole("button", { name: "Save" }).parentElement;
      expect(groupContainer).toHaveClass("items-center");
    },
  },
  {
    renderSpec: {
      type: "Group",
      spacing: "md",
      align: "center",
      children: [
        {
          type: "Button",
          size: "sm",
          children: "Save",
        },
        {
          type: "Button",
          size: "sm",
          variant: "outline",
          children: "Cancel",
        },
        {
          type: "Separator",
          orientation: "vertical",
          className: "h-6",
        },
        {
          type: "Badge",
          children: "Draft",
        },
        {
          type: "Avatar",
          className: "h-8 w-8",
          children: {
            type: "Image",
            src: "https://placehold.co/32x32/EEE/31343C",
            alt: "Avatar",
          },
        },
      ],
    },
  }
);

export const SpacingVariants: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all spacing variants render
      expect(canvas.getByText("Spacing: none")).toBeInTheDocument();
      expect(canvas.getByText("Spacing: xs")).toBeInTheDocument();
      expect(canvas.getByText("Spacing: sm")).toBeInTheDocument();
      expect(canvas.getByText("Spacing: md")).toBeInTheDocument();
      expect(canvas.getByText("Spacing: lg")).toBeInTheDocument();
      expect(canvas.getByText("Spacing: xl")).toBeInTheDocument();

      // Test buttons are rendered in each variant
      const allButtons = canvas.getAllByRole("button");
      expect(allButtons).toHaveLength(18); // 6 groups x 3 buttons
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Spacing: none",
            },
            {
              type: "Group",
              spacing: "none",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Spacing: xs",
            },
            {
              type: "Group",
              spacing: "xs",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Spacing: sm",
            },
            {
              type: "Group",
              spacing: "sm",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Spacing: md",
            },
            {
              type: "Group",
              spacing: "md",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Spacing: lg",
            },
            {
              type: "Group",
              spacing: "lg",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Spacing: xl",
            },
            {
              type: "Group",
              spacing: "xl",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const AlignmentVariants: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all alignment labels render
      expect(canvas.getByText("Align: start")).toBeInTheDocument();
      expect(canvas.getByText("Align: center")).toBeInTheDocument();
      expect(canvas.getByText("Align: end")).toBeInTheDocument();
      expect(canvas.getByText("Align: baseline")).toBeInTheDocument();

      // Test content in each group
      const buttons = canvas.getAllByRole("button", { name: "Button" });
      expect(buttons).toHaveLength(4);

      const badges = canvas.getAllByText("Badge");
      expect(badges).toHaveLength(4);

      // Test text elements
      const textElements = canvas.getAllByText("Text");
      expect(textElements).toHaveLength(3);

      expect(canvas.getByText("Small text")).toBeInTheDocument();
      expect(canvas.getByText("Large text")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Align: start",
            },
            {
              type: "Group",
              align: "start",
              spacing: "md",
              className: "h-16 bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button" },
                { type: "Badge", children: "Badge" },
                { type: "Text", element: "span", className: "text-sm", children: "Text" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Align: center",
            },
            {
              type: "Group",
              align: "center",
              spacing: "md",
              className: "h-16 bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button" },
                { type: "Badge", children: "Badge" },
                { type: "Text", element: "span", className: "text-sm", children: "Text" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Align: end",
            },
            {
              type: "Group",
              align: "end",
              spacing: "md",
              className: "h-16 bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button" },
                { type: "Badge", children: "Badge" },
                { type: "Text", element: "span", className: "text-sm", children: "Text" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Align: baseline",
            },
            {
              type: "Group",
              align: "baseline",
              spacing: "md",
              className: "bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button" },
                { type: "Badge", children: "Badge" },
                { type: "Text", element: "span", className: "text-sm", children: "Small text" },
                { type: "Text", element: "span", className: "text-lg", children: "Large text" },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WrappingBehavior: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test wrapping labels
      expect(canvas.getByText("Wrap: wrap (default)")).toBeInTheDocument();
      expect(canvas.getByText("Wrap: nowrap")).toBeInTheDocument();

      // Test all buttons are rendered
      const allButtons = canvas.getAllByRole("button");
      expect(allButtons).toHaveLength(12); // 2 groups x 6 buttons
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Wrap: wrap (default)",
            },
            {
              type: "Box",
              className: "w-80 rounded border p-4",
              children: {
                type: "Group",
                spacing: "md",
                wrap: "wrap",
                children: [
                  { type: "Button", children: "Button 1" },
                  { type: "Button", children: "Button 2" },
                  { type: "Button", children: "Button 3" },
                  { type: "Button", children: "Button 4" },
                  { type: "Button", children: "Button 5" },
                  { type: "Button", children: "Button 6" },
                ],
              },
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Wrap: nowrap",
            },
            {
              type: "Box",
              className: "w-80 overflow-x-auto rounded border p-4",
              children: {
                type: "Group",
                spacing: "md",
                wrap: "nowrap",
                children: [
                  { type: "Button", children: "Button 1" },
                  { type: "Button", children: "Button 2" },
                  { type: "Button", children: "Button 3" },
                  { type: "Button", children: "Button 4" },
                  { type: "Button", children: "Button 5" },
                  { type: "Button", children: "Button 6" },
                ],
              },
            },
          ],
        },
      ],
    },
  }
);

export const JustifyContent: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all justify labels render
      expect(canvas.getByText("Justify: start")).toBeInTheDocument();
      expect(canvas.getByText("Justify: center")).toBeInTheDocument();
      expect(canvas.getByText("Justify: end")).toBeInTheDocument();
      expect(canvas.getByText("Justify: between")).toBeInTheDocument();
      expect(canvas.getByText("Justify: around")).toBeInTheDocument();
      expect(canvas.getByText("Justify: evenly")).toBeInTheDocument();

      // Test all buttons are rendered
      const allButtons = canvas.getAllByRole("button");
      expect(allButtons).toHaveLength(18); // 6 groups x 3 buttons
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Justify: start",
            },
            {
              type: "Group",
              justify: "start",
              spacing: "md",
              className: "w-full bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Justify: center",
            },
            {
              type: "Group",
              justify: "center",
              spacing: "md",
              className: "w-full bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Justify: end",
            },
            {
              type: "Group",
              justify: "end",
              spacing: "md",
              className: "w-full bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Justify: between",
            },
            {
              type: "Group",
              justify: "between",
              spacing: "md",
              className: "w-full bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Justify: around",
            },
            {
              type: "Group",
              justify: "around",
              spacing: "md",
              className: "w-full bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Justify: evenly",
            },
            {
              type: "Group",
              justify: "evenly",
              spacing: "md",
              className: "w-full bg-slate-100 p-2",
              children: [
                { type: "Button", size: "sm", children: "Button 1" },
                { type: "Button", size: "sm", children: "Button 2" },
                { type: "Button", size: "sm", children: "Button 3" },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const GrowBehavior: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test grow labels
      expect(canvas.getByText("Without grow (default)")).toBeInTheDocument();
      expect(canvas.getByText("With grow")).toBeInTheDocument();

      // Test all buttons are rendered
      const allButtons = canvas.getAllByRole("button");
      expect(allButtons).toHaveLength(6); // 2 groups x 3 buttons
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "Without grow (default)",
            },
            {
              type: "Group",
              spacing: "md",
              className: "w-full bg-slate-100 p-2",
              children: [
                { type: "Button", children: "Button 1" },
                { type: "Button", children: "Button 2" },
                { type: "Button", children: "Button 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2 text-sm font-medium",
              children: "With grow",
            },
            {
              type: "Group",
              spacing: "md",
              grow: true,
              className: "w-full bg-slate-100 p-2",
              children: [
                { type: "Button", children: "Button 1" },
                { type: "Button", children: "Button 2" },
                { type: "Button", children: "Button 3" },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const FormActions: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify dialog content
      expect(canvas.getByText("Save Changes?")).toBeInTheDocument();
      expect(canvas.getByText(/You have unsaved changes/)).toBeInTheDocument();

      // Verify all action buttons
      const cancelButton = canvas.getByRole("button", { name: "Cancel" });
      const discardButton = canvas.getByRole("button", { name: "Discard" });
      const saveButton = canvas.getByRole("button", { name: "Save Changes" });

      expect(cancelButton).toBeInTheDocument();
      expect(discardButton).toBeInTheDocument();
      expect(saveButton).toBeInTheDocument();

      // Verify group container has justify-end
      const groupContainer = cancelButton.parentElement;
      expect(groupContainer).toHaveClass("justify-end");

      // Test button interaction
      await userEvent.click(saveButton);
      // Button should still be there (no actual action in this story)
      expect(saveButton).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "max-w-md",
      children: {
        type: "Box",
        className: "space-y-4 rounded-lg border p-6",
        children: [
          {
            type: "Heading",
            level: 3,
            className: "text-lg font-semibold",
            children: "Save Changes?",
          },
          {
            type: "Text",
            element: "p",
            className: "text-sm text-muted-foreground",
            children: "You have unsaved changes. Would you like to save them before leaving?",
          },
          {
            type: "Group",
            spacing: "sm",
            justify: "end",
            children: [
              { type: "Button", variant: "outline", children: "Cancel" },
              { type: "Button", variant: "outline", children: "Discard" },
              { type: "Button", children: "Save Changes" },
            ],
          },
        ],
      },
    },
  }
);

export const ToolbarExample: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify formatting buttons
      expect(canvas.getByRole("button", { name: "Bold" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Italic" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Underline" })).toBeInTheDocument();

      // Verify alignment buttons
      expect(canvas.getByRole("button", { name: "Align Left" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Align Center" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Align Right" })).toBeInTheDocument();

      // Verify additional buttons
      expect(canvas.getByRole("button", { name: "Link" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Image" })).toBeInTheDocument();

      // Verify separators (should be 2)
      const separators = canvasElement.querySelectorAll('[data-orientation="vertical"]');
      expect(separators).toHaveLength(2);

      // Verify nested groups structure
      const allButtons = canvas.getAllByRole("button");
      expect(allButtons).toHaveLength(8);
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "rounded-lg border p-4",
      children: {
        type: "Group",
        spacing: "sm",
        align: "center",
        children: [
          {
            type: "Group",
            spacing: "xs",
            children: [
              { type: "Button", size: "sm", variant: "outline", children: "Bold" },
              { type: "Button", size: "sm", variant: "outline", children: "Italic" },
              { type: "Button", size: "sm", variant: "outline", children: "Underline" },
            ],
          },
          {
            type: "Separator",
            orientation: "vertical",
            className: "h-6",
          },
          {
            type: "Group",
            spacing: "xs",
            children: [
              { type: "Button", size: "sm", variant: "outline", children: "Align Left" },
              { type: "Button", size: "sm", variant: "outline", children: "Align Center" },
              { type: "Button", size: "sm", variant: "outline", children: "Align Right" },
            ],
          },
          {
            type: "Separator",
            orientation: "vertical",
            className: "h-6",
          },
          { type: "Button", size: "sm", variant: "outline", children: "Link" },
          { type: "Button", size: "sm", variant: "outline", children: "Image" },
        ],
      },
    },
  }
);

export const TagList: Story = enhanceStoryForDualMode<typeof Group>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify heading
      expect(canvas.getByText("Tags")).toBeInTheDocument();

      // Verify all tags are rendered
      expect(canvas.getByText("React")).toBeInTheDocument();
      expect(canvas.getByText("TypeScript")).toBeInTheDocument();
      expect(canvas.getByText("Tailwind CSS")).toBeInTheDocument();
      expect(canvas.getByText("Storybook")).toBeInTheDocument();
      expect(canvas.getByText("Vite")).toBeInTheDocument();
      expect(canvas.getByText("UI Components")).toBeInTheDocument();
      expect(canvas.getByText("Design System")).toBeInTheDocument();
      expect(canvas.getByText("+ Add Tag")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "max-w-lg space-y-4",
      children: [
        {
          type: "Heading",
          level: 3,
          className: "text-sm font-medium",
          children: "Tags",
        },
        {
          type: "Group",
          spacing: "sm",
          children: [
            { type: "Badge", variant: "secondary", children: "React" },
            { type: "Badge", variant: "secondary", children: "TypeScript" },
            { type: "Badge", variant: "secondary", children: "Tailwind CSS" },
            { type: "Badge", variant: "secondary", children: "Storybook" },
            { type: "Badge", variant: "secondary", children: "Vite" },
            { type: "Badge", variant: "secondary", children: "UI Components" },
            { type: "Badge", variant: "secondary", children: "Design System" },
            { type: "Badge", variant: "outline", children: "+ Add Tag" },
          ],
        },
      ],
    },
  }
);
