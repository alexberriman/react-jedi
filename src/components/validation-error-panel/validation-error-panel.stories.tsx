import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ValidationErrorPanel } from "./validation-error-panel";
import { ValidationStageType, type ValidationStageError } from "@/lib/parser/validation-pipeline";
import { ValidationSeverity } from "@/lib/validation/validator";

const meta: Meta<typeof ValidationErrorPanel> = {
  title: "Components/ValidationErrorPanel",
  component: ValidationErrorPanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["test"],
  decorators: [
    (Story) => (
      <div style={{ minHeight: "400px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicErrors: ValidationStageError[] = [
  {
    severity: ValidationSeverity.ERROR,
    message: "Invalid Grid columns value",
    path: ["root", "columns"],
    invalidValue: 15,
    suggestions: ["Grid columns must be between 1 and 12", "Try using columns: 12"],
    stage: ValidationStageType.SEMANTIC,
  },
  {
    severity: ValidationSeverity.WARNING,
    message: "Container has no children",
    path: ["root", "children", "0"],
    suggestions: ["Add child components to the Container"],
    stage: ValidationStageType.SEMANTIC,
  },
];

export const Default: Story = {
  args: {
    errors: basicErrors,
  },
};

export const MultipleErrors: Story = {
  args: {
    errors: [
      {
        severity: ValidationSeverity.ERROR,
        message: "Component type 'CustomButton' not found",
        path: ["root", "children", "0", "type"],
        invalidValue: "CustomButton",
        suggestions: ["Did you mean 'Button'?", "Available types: Button, Card, Text"],
        stage: ValidationStageType.SCHEMA,
      },
      {
        severity: ValidationSeverity.ERROR,
        message: "Invalid prop 'onClick' for Text component",
        path: ["root", "children", "1", "onClick"],
        suggestions: ["Text components don't support onClick", "Use Button for clickable elements"],
        stage: ValidationStageType.SCHEMA,
      },
      {
        severity: ValidationSeverity.WARNING,
        message: "Deprecated property 'fullWidth' used",
        path: ["root", "children", "2", "fullWidth"],
        invalidValue: true,
        suggestions: ["Use className='w-full' instead"],
        stage: ValidationStageType.SEMANTIC,
      },
      {
        severity: ValidationSeverity.INFO,
        message: "Consider using semantic HTML",
        path: ["root", "children", "3"],
        suggestions: ["Use Heading component instead of Text with large size"],
        stage: ValidationStageType.SEMANTIC,
      },
      {
        severity: ValidationSeverity.ERROR,
        message: "Required property 'src' missing",
        path: ["root", "children", "4"],
        suggestions: ["Image components require a 'src' property"],
        stage: ValidationStageType.SCHEMA,
      },
    ],
  },
};

export const MixedSeverity: Story = {
  args: {
    errors: [
      {
        severity: ValidationSeverity.ERROR,
        message: "Invalid Heading level",
        path: ["root", "children", "0", "level"],
        invalidValue: 7,
        suggestions: ["Heading level must be between 1 and 6"],
        stage: ValidationStageType.SEMANTIC,
      },
      {
        severity: ValidationSeverity.WARNING,
        message: "Large bundle size detected",
        path: ["root"],
        suggestions: ["Consider lazy loading some components", "Split into smaller specifications"],
        stage: ValidationStageType.SEMANTIC,
      },
      {
        severity: ValidationSeverity.INFO,
        message: "Accessibility improvement available",
        path: ["root", "children", "1"],
        suggestions: ["Add aria-label to improve screen reader support"],
        stage: ValidationStageType.SEMANTIC,
      },
    ],
  },
};

export const LongErrorMessages: Story = {
  args: {
    errors: Array.from({ length: 10 }, (_, index) => ({
      severity: (() => {
        if (index % 3 === 0) return ValidationSeverity.ERROR;
        if (index % 3 === 1) return ValidationSeverity.WARNING;
        return ValidationSeverity.INFO;
      })(),
      message: `This is a very long error message that describes in detail what went wrong with component ${index + 1}. It includes multiple sentences to test how the panel handles text wrapping and overflow.`,
      path: ["root", "children", `${index}`, "property", "nested", "deep", "path"],
      invalidValue: { complex: "object", with: ["multiple", "values", index] },
      suggestions: [
        "First suggestion with detailed explanation",
        "Second suggestion that is also quite long",
        "Third suggestion",
      ],
      stage: ValidationStageType.SEMANTIC,
    })),
  },
};

export const NoAnimations: Story = {
  args: {
    errors: basicErrors,
    animated: false,
  },
};

export const WithCustomClassName: Story = {
  args: {
    errors: basicErrors,
    className: "bottom-8 right-8",
  },
};

export const Interactive: Story = {
  args: {
    errors: basicErrors,
    onDismiss: () => console.log("Panel dismissed"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for panel to appear
    const panel = await canvas.findByText("Validation Issues");
    await expect(panel).toBeInTheDocument();

    // Test collapse/expand
    const detailsButton = canvas.getByText("Details");
    await userEvent.click(detailsButton);

    // Test copy button
    const copyButton = canvas.getByText("Copy Report");
    await userEvent.click(copyButton);

    // Test dismiss button
    const dismissButton = canvas.getByLabelText("Dismiss validation panel");
    await userEvent.click(dismissButton);

    // Panel should be removed
    await expect(panel).not.toBeInTheDocument();
  },
};