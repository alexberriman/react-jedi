import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "../label";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta: Meta<typeof RadioGroup> = {
  title: "Form Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "select",
      options: ["option1", "option2", "option3"],
      description: "The value of the selected item",
    },
    defaultValue: {
      control: "select",
      options: ["option1", "option2", "option3"],
      description: "The default value of the selected item",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio group is disabled",
    },
    onValueChange: {
      action: "value changed",
      description: "Called when the selected value changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof RadioGroup>(
  {
    args: {
      defaultValue: "option1",
    },
    render: (args) => (
      <RadioGroup {...args}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="option3" />
          <Label htmlFor="option3">Option 3</Label>
        </div>
      </RadioGroup>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test all radio items are rendered
      const option1 = canvas.getByRole("radio", { name: "Option 1" });
      const option2 = canvas.getByRole("radio", { name: "Option 2" });
      const option3 = canvas.getByRole("radio", { name: "Option 3" });

      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
      expect(option3).toBeInTheDocument();

      // Test default value
      expect(option1).toBeChecked();
      expect(option2).not.toBeChecked();
      expect(option3).not.toBeChecked();

      // Test clicking changes selection
      await user.click(option2);
      expect(option1).not.toBeChecked();
      expect(option2).toBeChecked();
      expect(option3).not.toBeChecked();

      // Test clicking another option
      await user.click(option3);
      expect(option1).not.toBeChecked();
      expect(option2).not.toBeChecked();
      expect(option3).toBeChecked();
    },
  },
  {
    renderSpec: {
      type: "RadioGroup",
      defaultValue: "option1",
      children: [
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option1",
              id: "option1",
            },
            {
              type: "Label",
              htmlFor: "option1",
              children: "Option 1",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option2",
              id: "option2",
            },
            {
              type: "Label",
              htmlFor: "option2",
              children: "Option 2",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option3",
              id: "option3",
            },
            {
              type: "Label",
              htmlFor: "option3",
              children: "Option 3",
            },
          ],
        },
      ],
    },
  }
);

export const WithoutDefault: Story = enhanceStoryForDualMode<typeof RadioGroup>(
  {
    render: () => (
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test no default selection
      const defaultOption = canvas.getByRole("radio", { name: "Default" });
      const comfortableOption = canvas.getByRole("radio", { name: "Comfortable" });
      const compactOption = canvas.getByRole("radio", { name: "Compact" });

      expect(defaultOption).not.toBeChecked();
      expect(comfortableOption).not.toBeChecked();
      expect(compactOption).not.toBeChecked();

      // Test selection works
      await user.click(comfortableOption);
      expect(comfortableOption).toBeChecked();
      expect(defaultOption).not.toBeChecked();
      expect(compactOption).not.toBeChecked();
    },
  },
  {
    renderSpec: {
      type: "RadioGroup",
      children: [
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "default",
              id: "r1",
            },
            {
              type: "Label",
              htmlFor: "r1",
              children: "Default",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "comfortable",
              id: "r2",
            },
            {
              type: "Label",
              htmlFor: "r2",
              children: "Comfortable",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "compact",
              id: "r3",
            },
            {
              type: "Label",
              htmlFor: "r3",
              children: "Compact",
            },
          ],
        },
      ],
    },
  }
);

export const Disabled: Story = enhanceStoryForDualMode<typeof RadioGroup>(
  {
    render: () => (
      <RadioGroup defaultValue="option2" disabled>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="d1" />
          <Label htmlFor="d1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="d2" />
          <Label htmlFor="d2">Option 2 (Selected)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="d3" />
          <Label htmlFor="d3">Option 3</Label>
        </div>
      </RadioGroup>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test all items are disabled
      const option1 = canvas.getByRole("radio", { name: "Option 1" });
      const option2 = canvas.getByRole("radio", { name: "Option 2 (Selected)" });
      const option3 = canvas.getByRole("radio", { name: "Option 3" });

      expect(option1).toBeDisabled();
      expect(option2).toBeDisabled();
      expect(option3).toBeDisabled();

      // Test default value is still selected
      expect(option2).toBeChecked();

      // Test clicking doesn't change selection
      await user.click(option1);
      expect(option2).toBeChecked();
      expect(option1).not.toBeChecked();
    },
  },
  {
    renderSpec: {
      type: "RadioGroup",
      defaultValue: "option2",
      disabled: true,
      children: [
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option1",
              id: "d1",
            },
            {
              type: "Label",
              htmlFor: "d1",
              children: "Option 1",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option2",
              id: "d2",
            },
            {
              type: "Label",
              htmlFor: "d2",
              children: "Option 2 (Selected)",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option3",
              id: "d3",
            },
            {
              type: "Label",
              htmlFor: "d3",
              children: "Option 3",
            },
          ],
        },
      ],
    },
  }
);

export const WithIndividualDisabled: Story = enhanceStoryForDualMode<typeof RadioGroup>(
  {
    render: () => (
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="id1" />
          <Label htmlFor="id1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="id2" disabled />
          <Label htmlFor="id2">Option 2 (Disabled)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="id3" />
          <Label htmlFor="id3">Option 3</Label>
        </div>
      </RadioGroup>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test individual disabled state
      const option1 = canvas.getByRole("radio", { name: "Option 1" });
      const option2 = canvas.getByRole("radio", { name: "Option 2 (Disabled)" });
      const option3 = canvas.getByRole("radio", { name: "Option 3" });

      expect(option1).not.toBeDisabled();
      expect(option2).toBeDisabled();
      expect(option3).not.toBeDisabled();

      // Test clicking disabled option doesn't change selection
      expect(option1).toBeChecked();
      await user.click(option2);
      expect(option1).toBeChecked();
      expect(option2).not.toBeChecked();

      // Test other options still work
      await user.click(option3);
      expect(option3).toBeChecked();
      expect(option1).not.toBeChecked();
    },
  },
  {
    renderSpec: {
      type: "RadioGroup",
      defaultValue: "option1",
      children: [
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option1",
              id: "id1",
            },
            {
              type: "Label",
              htmlFor: "id1",
              children: "Option 1",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option2",
              id: "id2",
              disabled: true,
            },
            {
              type: "Label",
              htmlFor: "id2",
              children: "Option 2 (Disabled)",
            },
          ],
        },
        {
          type: "Flex",
          align: "center",
          gap: "sm",
          children: [
            {
              type: "RadioGroupItem",
              value: "option3",
              id: "id3",
            },
            {
              type: "Label",
              htmlFor: "id3",
              children: "Option 3",
            },
          ],
        },
      ],
    },
  }
);

const ControlledRadioGroup = () => {
  const [value, setValue] = React.useState("option2");

  return (
    <div className="space-y-4">
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="c1" />
          <Label htmlFor="c1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="c2" />
          <Label htmlFor="c2">Option 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="c3" />
          <Label htmlFor="c3">Option 3</Label>
        </div>
      </RadioGroup>
      <p className="text-sm text-muted-foreground">Selected value: {value}</p>
    </div>
  );
};

export const Controlled: Story = enhanceStoryForDualMode<typeof RadioGroup>(
  {
    render: () => <ControlledRadioGroup />,
    play: async ({ canvasElement, canvasIndex }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test initial state
      const option1 = canvas.getByRole("radio", { name: "Option 1" });
      const option2 = canvas.getByRole("radio", { name: "Option 2" });
      const option3 = canvas.getByRole("radio", { name: "Option 3" });

      expect(option2).toBeChecked();
      expect(canvas.getByText("Selected value: option2")).toBeInTheDocument();

      // Only test state changes in React Component mode (canvasIndex === 0)
      // SDUI mode is static and doesn't support controlled component behavior
      if (canvasIndex === 0) {
        // Test changing selection updates display
        await user.click(option1);
        expect(option1).toBeChecked();
        expect(canvas.getByText("Selected value: option1")).toBeInTheDocument();

        await user.click(option3);
        expect(option3).toBeChecked();
        expect(canvas.getByText("Selected value: option3")).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "RadioGroup",
          value: "option2",
          children: [
            {
              type: "Flex",
              align: "center",
              gap: "sm",
              children: [
                {
                  type: "RadioGroupItem",
                  value: "option1",
                  id: "c1",
                },
                {
                  type: "Label",
                  htmlFor: "c1",
                  children: "Option 1",
                },
              ],
            },
            {
              type: "Flex",
              align: "center",
              gap: "sm",
              children: [
                {
                  type: "RadioGroupItem",
                  value: "option2",
                  id: "c2",
                },
                {
                  type: "Label",
                  htmlFor: "c2",
                  children: "Option 2",
                },
              ],
            },
            {
              type: "Flex",
              align: "center",
              gap: "sm",
              children: [
                {
                  type: "RadioGroupItem",
                  value: "option3",
                  id: "c3",
                },
                {
                  type: "Label",
                  htmlFor: "c3",
                  children: "Option 3",
                },
              ],
            },
          ],
        },
        {
          type: "Text",
          element: "p",
          className: "text-sm text-muted-foreground",
          children: "Selected value: option2",
        },
      ],
    },
  }
);

export const WithDirection: Story = enhanceStoryForDualMode<typeof RadioGroup>(
  {
    render: () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Vertical (Default)</h3>
          <RadioGroup defaultValue="vertical1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vertical1" id="v1" />
              <Label htmlFor="v1">Vertical Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vertical2" id="v2" />
              <Label htmlFor="v2">Vertical Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vertical3" id="v3" />
              <Label htmlFor="v3">Vertical Option 3</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-3">Horizontal</h3>
          <RadioGroup defaultValue="horizontal1" className="flex flex-row gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal1" id="h1" />
              <Label htmlFor="h1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal2" id="h2" />
              <Label htmlFor="h2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal3" id="h3" />
              <Label htmlFor="h3">Option 3</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test vertical layout headers and options render
      expect(canvas.getByText("Vertical (Default)")).toBeInTheDocument();
      const v1 = canvas.getByRole("radio", { name: "Vertical Option 1" });
      const v2 = canvas.getByRole("radio", { name: "Vertical Option 2" });
      const v3 = canvas.getByRole("radio", { name: "Vertical Option 3" });
      
      expect(v1).toBeInTheDocument();
      expect(v2).toBeInTheDocument();
      expect(v3).toBeInTheDocument();
      expect(v1).toBeChecked();

      // Test horizontal layout headers and options render
      expect(canvas.getByText("Horizontal")).toBeInTheDocument();
      const h1 = canvas.getByRole("radio", { name: "Option 1" });
      const h2 = canvas.getByRole("radio", { name: "Option 2" });
      const h3 = canvas.getByRole("radio", { name: "Option 3" });
      
      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
      expect(h1).toBeChecked();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "lg",
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Heading",
              element: "h3",
              className: "text-lg font-medium mb-3",
              children: "Vertical (Default)",
            },
            {
              type: "RadioGroup",
              defaultValue: "vertical1",
              children: [
                {
                  type: "Flex",
                  align: "center",
                  gap: "sm",
                  children: [
                    {
                      type: "RadioGroupItem",
                      value: "vertical1",
                      id: "v1",
                    },
                    {
                      type: "Label",
                      htmlFor: "v1",
                      children: "Vertical Option 1",
                    },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "sm",
                  children: [
                    {
                      type: "RadioGroupItem",
                      value: "vertical2",
                      id: "v2",
                    },
                    {
                      type: "Label",
                      htmlFor: "v2",
                      children: "Vertical Option 2",
                    },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "sm",
                  children: [
                    {
                      type: "RadioGroupItem",
                      value: "vertical3",
                      id: "v3",
                    },
                    {
                      type: "Label",
                      htmlFor: "v3",
                      children: "Vertical Option 3",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Heading",
              element: "h3",
              className: "text-lg font-medium mb-3",
              children: "Horizontal",
            },
            {
              type: "RadioGroup",
              defaultValue: "horizontal1",
              className: "flex flex-row gap-4",
              children: [
                {
                  type: "Flex",
                  align: "center",
                  gap: "sm",
                  children: [
                    {
                      type: "RadioGroupItem",
                      value: "horizontal1",
                      id: "h1",
                    },
                    {
                      type: "Label",
                      htmlFor: "h1",
                      children: "Option 1",
                    },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "sm",
                  children: [
                    {
                      type: "RadioGroupItem",
                      value: "horizontal2",
                      id: "h2",
                    },
                    {
                      type: "Label",
                      htmlFor: "h2",
                      children: "Option 2",
                    },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "sm",
                  children: [
                    {
                      type: "RadioGroupItem",
                      value: "horizontal3",
                      id: "h3",
                    },
                    {
                      type: "Label",
                      htmlFor: "h3",
                      children: "Option 3",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithDescriptions: Story = enhanceStoryForDualMode<typeof RadioGroup>(
  {
    render: () => (
      <RadioGroup defaultValue="plan1">
        <div className="relative flex cursor-pointer rounded-lg border p-4">
          <div className="flex items-center">
            <RadioGroupItem value="plan1" id="plan1" />
          </div>
          <div className="ml-3 flex flex-col">
            <Label htmlFor="plan1" className="font-medium">
              Free Plan
            </Label>
            <span className="text-sm text-muted-foreground">
              Perfect for getting started. Limited features.
            </span>
          </div>
        </div>
        <div className="relative flex cursor-pointer rounded-lg border p-4">
          <div className="flex items-center">
            <RadioGroupItem value="plan2" id="plan2" />
          </div>
          <div className="ml-3 flex flex-col">
            <Label htmlFor="plan2" className="font-medium">
              Pro Plan
            </Label>
            <span className="text-sm text-muted-foreground">Advanced features for power users.</span>
          </div>
        </div>
        <div className="relative flex cursor-pointer rounded-lg border p-4">
          <div className="flex items-center">
            <RadioGroupItem value="plan3" id="plan3" />
          </div>
          <div className="ml-3 flex flex-col">
            <Label htmlFor="plan3" className="font-medium">
              Enterprise Plan
            </Label>
            <span className="text-sm text-muted-foreground">All features with priority support.</span>
          </div>
        </div>
      </RadioGroup>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all plan options render
      const freePlan = canvas.getByRole("radio", { name: "Free Plan" });
      const proPlan = canvas.getByRole("radio", { name: "Pro Plan" });
      const enterprisePlan = canvas.getByRole("radio", { name: "Enterprise Plan" });

      expect(freePlan).toBeInTheDocument();
      expect(proPlan).toBeInTheDocument();
      expect(enterprisePlan).toBeInTheDocument();

      // Test descriptions render
      expect(canvas.getByText("Perfect for getting started. Limited features.")).toBeInTheDocument();
      expect(canvas.getByText("Advanced features for power users.")).toBeInTheDocument();
      expect(canvas.getByText("All features with priority support.")).toBeInTheDocument();

      // Test default selection
      expect(freePlan).toBeChecked();
    },
  },
  {
    renderSpec: {
      type: "RadioGroup",
      defaultValue: "plan1",
      children: [
        {
          type: "Box",
          className: "relative flex cursor-pointer rounded-lg border p-4",
          children: [
            {
              type: "Box",
              className: "flex items-center",
              children: {
                type: "RadioGroupItem",
                value: "plan1",
                id: "plan1",
              },
            },
            {
              type: "Flex",
              direction: "column",
              className: "ml-3",
              children: [
                {
                  type: "Label",
                  htmlFor: "plan1",
                  className: "font-medium",
                  children: "Free Plan",
                },
                {
                  type: "Text",
                  element: "span",
                  className: "text-sm text-muted-foreground",
                  children: "Perfect for getting started. Limited features.",
                },
              ],
            },
          ],
        },
        {
          type: "Box",
          className: "relative flex cursor-pointer rounded-lg border p-4",
          children: [
            {
              type: "Box",
              className: "flex items-center",
              children: {
                type: "RadioGroupItem",
                value: "plan2",
                id: "plan2",
              },
            },
            {
              type: "Flex",
              direction: "column",
              className: "ml-3",
              children: [
                {
                  type: "Label",
                  htmlFor: "plan2",
                  className: "font-medium",
                  children: "Pro Plan",
                },
                {
                  type: "Text",
                  element: "span",
                  className: "text-sm text-muted-foreground",
                  children: "Advanced features for power users.",
                },
              ],
            },
          ],
        },
        {
          type: "Box",
          className: "relative flex cursor-pointer rounded-lg border p-4",
          children: [
            {
              type: "Box",
              className: "flex items-center",
              children: {
                type: "RadioGroupItem",
                value: "plan3",
                id: "plan3",
              },
            },
            {
              type: "Flex",
              direction: "column",
              className: "ml-3",
              children: [
                {
                  type: "Label",
                  htmlFor: "plan3",
                  className: "font-medium",
                  children: "Enterprise Plan",
                },
                {
                  type: "Text",
                  element: "span",
                  className: "text-sm text-muted-foreground",
                  children: "All features with priority support.",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithCustomStyling: Story = enhanceStoryForDualMode<typeof RadioGroup>(
  {
    render: () => (
      <RadioGroup defaultValue="custom1" className="gap-6">
        <div className="group relative flex items-center space-x-2 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
          <RadioGroupItem value="custom1" id="custom1" className="text-blue-600" />
          <Label
            htmlFor="custom1"
            className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Custom Style 1
          </Label>
        </div>
        <div className="group relative flex items-center space-x-2 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
          <RadioGroupItem value="custom2" id="custom2" className="text-green-600" />
          <Label
            htmlFor="custom2"
            className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Custom Style 2
          </Label>
        </div>
        <div className="group relative flex items-center space-x-2 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
          <RadioGroupItem value="custom3" id="custom3" className="text-purple-600" />
          <Label
            htmlFor="custom3"
            className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Custom Style 3
          </Label>
        </div>
      </RadioGroup>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all custom styled options render
      const custom1 = canvas.getByRole("radio", { name: "Custom Style 1" });
      const custom2 = canvas.getByRole("radio", { name: "Custom Style 2" });
      const custom3 = canvas.getByRole("radio", { name: "Custom Style 3" });

      expect(custom1).toBeInTheDocument();
      expect(custom2).toBeInTheDocument();
      expect(custom3).toBeInTheDocument();

      // Test default selection
      expect(custom1).toBeChecked();
    },
  },
  {
    renderSpec: {
      type: "RadioGroup",
      defaultValue: "custom1",
      className: "gap-6",
      children: [
        {
          type: "Box",
          className: "group relative flex items-center space-x-2 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800",
          children: [
            {
              type: "RadioGroupItem",
              value: "custom1",
              id: "custom1",
              className: "text-blue-600",
            },
            {
              type: "Label",
              htmlFor: "custom1",
              className: "cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-100",
              children: "Custom Style 1",
            },
          ],
        },
        {
          type: "Box",
          className: "group relative flex items-center space-x-2 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800",
          children: [
            {
              type: "RadioGroupItem",
              value: "custom2",
              id: "custom2",
              className: "text-green-600",
            },
            {
              type: "Label",
              htmlFor: "custom2",
              className: "cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-100",
              children: "Custom Style 2",
            },
          ],
        },
        {
          type: "Box",
          className: "group relative flex items-center space-x-2 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800",
          children: [
            {
              type: "RadioGroupItem",
              value: "custom3",
              id: "custom3",
              className: "text-purple-600",
            },
            {
              type: "Label",
              htmlFor: "custom3",
              className: "cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-100",
              children: "Custom Style 3",
            },
          ],
        },
      ],
    },
  }
);
