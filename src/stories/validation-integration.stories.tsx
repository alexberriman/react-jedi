import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { render } from "@/lib/render";
import type { UISpecification } from "@/types/schema/components";

const meta: Meta = {
  title: "Features/Validation Integration",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["test"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const invalidGridSpec: UISpecification = {
  version: "1.0",
  root: {
    type: "Grid",
    columns: 15, // Invalid: should be 1-12
    gap: 4,
    children: [
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "Invalid Grid Example",
              },
            ],
          },
          {
            type: "CardContent",
            children: [
              {
                type: "Text",
                children: "This grid has 15 columns, which is invalid.",
              },
            ],
          },
        ],
      },
    ],
  },
};

const multipleErrorsSpec: UISpecification = {
  version: "1.0",
  root: {
    type: "Container",
    children: [
      {
        type: "InvalidComponent", // Error: Unknown component
        children: "This won't work",
      },
      {
        type: "Heading",
        level: 10 as never, // Error: Invalid level
        children: "Bad Heading",
      },
      {
        type: "Grid",
        columns: 0, // Error: Invalid columns
        children: [],
      },
      {
        type: "Button",
        // Warning: No children or aria-label
      },
      {
        type: "Image",
        // Error: Missing required 'src'
        alt: "Test image",
      },
    ],
  },
};

const validSpec: UISpecification = {
  version: "1.0",
  root: {
    type: "Container",
    className: "p-8",
    children: [
      {
        type: "Heading",
        level: "h1",
        children: "Valid Specification",
      },
      {
        type: "Text",
        className: "mt-4",
        children: "This specification has no validation errors.",
      },
      {
        type: "Button",
        className: "mt-4",
        variant: "default",
        children: "Click me",
      },
    ],
  },
};

export const InvalidGridColumns: Story = {
  render: () => render(invalidGridSpec, { development: true }) || <div>Failed to render</div>,
};

export const MultipleValidationErrors: Story = {
  render: () => render(multipleErrorsSpec, { development: true }) || <div>Failed to render</div>,
};

export const ValidSpecification: Story = {
  render: () => render(validSpec, { development: true }) || <div>Failed to render</div>,
};

export const ForceValidationInProduction: Story = {
  render: () => render(multipleErrorsSpec, { 
    development: false, 
    validateSpecifications: true 
  }) || <div>Failed to render</div>,
};

export const DisableValidationInDevelopment: Story = {
  render: () => render(multipleErrorsSpec, { 
    development: true, 
    validateSpecifications: false 
  }) || <div>Failed to render</div>,
};

export const ProductionModeWithErrors: Story = {
  render: () => {
    // Simulate production environment
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    
    const element = render(multipleErrorsSpec);
    
    // Restore environment
    process.env.NODE_ENV = originalEnv;
    
    return element || <div>Failed to render</div>;
  },
};

export const InteractiveValidation: Story = {
  render: () => {
    const spec: UISpecification = {
      version: "1.0",
      root: {
        type: "Container",
        className: "p-8 space-y-4",
        children: [
          {
            type: "Heading",
            level: "h2",
            children: "Interactive Validation Demo",
          },
          {
            type: "Text",
            children: "This demo shows validation errors in development mode.",
          },
          {
            type: "Grid",
            columns: 20 as never, // Invalid
            children: [
              {
                type: "Card",
                children: [
                  {
                    type: "CardHeader",
                    children: [
                      {
                        type: "CardTitle",
                        children: "Invalid Grid",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    return render(spec, { development: true }) || <div>Failed to render</div>;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for validation panel to appear
    const validationPanel = await canvas.findByText("Validation Issues");
    await expect(validationPanel).toBeInTheDocument();

    // Check for error badge
    const errorBadge = canvas.getByText(/error/);
    await expect(errorBadge).toBeInTheDocument();
  },
};