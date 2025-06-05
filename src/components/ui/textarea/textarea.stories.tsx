import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import type { TextareaSpec } from "../../../types/schema/ui";
import { Textarea } from "./textarea";
import { render } from "../../../lib/render";
import { Label } from "../label/label";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Form Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A multi-line text input component for longer text content.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Direct component usage stories
export const Default: Story = enhanceStoryForDualMode<typeof Textarea>({
  args: {
    placeholder: "Enter your message...",
    rows: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test textarea renders
    const textarea = canvas.getByPlaceholderText("Enter your message...");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe("textarea");

    // Test data-slot attribute
    expect(textarea).toHaveAttribute("data-slot", "textarea");

    // Test clicking and typing
    await user.click(textarea);
    expect(textarea).toHaveFocus();

    // Test typing text
    await user.type(textarea, "Hello, this is a test message!");
    expect(textarea).toHaveValue("Hello, this is a test message!");

    // Test rows attribute
    expect(textarea).toHaveAttribute("rows", "4");
  },
});

export const WithValue: Story = enhanceStoryForDualMode<typeof Textarea>({
  args: {
    defaultValue: "This is some example text that shows how the textarea looks with content.",
    rows: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test textarea renders with value
    const textarea = canvas.getByDisplayValue("This is some example text that shows how the textarea looks with content.");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe("textarea");

    // Test data-slot attribute
    expect(textarea).toHaveAttribute("data-slot", "textarea");

    // Test value content
    expect(textarea).toHaveValue("This is some example text that shows how the textarea looks with content.");

    // Test rows attribute
    expect(textarea).toHaveAttribute("rows", "4");
  },
});

export const Disabled: Story = enhanceStoryForDualMode<typeof Textarea>({
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
    rows: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test disabled textarea
    const textarea = canvas.getByPlaceholderText("This textarea is disabled");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeDisabled();

    // Test data-slot attribute
    expect(textarea).toHaveAttribute("data-slot", "textarea");

    // Test disabled attribute
    expect(textarea).toHaveAttribute("disabled");

    // Test cannot focus disabled textarea
    expect(textarea).not.toHaveFocus();
  },
});

export const ReadOnly: Story = enhanceStoryForDualMode<typeof Textarea>({
  args: {
    defaultValue: "This text is read-only and cannot be edited.",
    readOnly: true,
    rows: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test read-only textarea
    const textarea = canvas.getByDisplayValue("This text is read-only and cannot be edited.");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe("textarea");

    // Test data-slot attribute
    expect(textarea).toHaveAttribute("data-slot", "textarea");

    // Test readOnly attribute
    expect(textarea).toHaveAttribute("readonly");

    // Test can focus but cannot edit
    await user.click(textarea);
    expect(textarea).toHaveFocus();

    // Test value remains unchanged when typing
    const originalValue = (textarea as HTMLTextAreaElement).value;
    await user.type(textarea, "Additional text");
    expect(textarea).toHaveValue(originalValue);
  },
});

export const CustomRows: Story = enhanceStoryForDualMode<typeof Textarea>({
  args: {
    placeholder: "This textarea has 6 rows",
    rows: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test textarea with custom rows
    const textarea = canvas.getByPlaceholderText("This textarea has 6 rows");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe("textarea");

    // Test data-slot attribute
    expect(textarea).toHaveAttribute("data-slot", "textarea");

    // Test custom rows attribute
    expect(textarea).toHaveAttribute("rows", "6");
  },
});

export const MaxLength: Story = enhanceStoryForDualMode<typeof Textarea>({
  args: {
    placeholder: "Maximum 100 characters allowed",
    maxLength: 100,
    rows: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test textarea with maxLength
    const textarea = canvas.getByPlaceholderText("Maximum 100 characters allowed");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe("textarea");

    // Test data-slot attribute
    expect(textarea).toHaveAttribute("data-slot", "textarea");

    // Test maxLength attribute
    expect(textarea).toHaveAttribute("maxlength", "100");

    // Test typing within limit
    await user.click(textarea);
    await user.type(
      textarea,
      "This is a test message that should fit within the 100 character limit set on this textarea."
    );

    // Test that the text was entered (it's exactly 99 characters)
    expect((textarea as HTMLTextAreaElement).value.length).toBeLessThanOrEqual(100);
  },
});

export const WithLabel: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Type your message here..." rows={4} />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test label and textarea association
      const label = canvas.getByText("Message");
      const textarea = canvas.getByPlaceholderText("Type your message here...");

      expect(label).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();

      // Test data-slot attributes
      expect(textarea).toHaveAttribute("data-slot", "textarea");

      // Test label htmlFor and textarea id
      expect(label).toHaveAttribute("for", "message");
      expect(textarea).toHaveAttribute("id", "message");

      // Test clicking label focuses textarea
      await user.click(label);
      expect(textarea).toHaveFocus();

      // Test typing in textarea
      await user.type(textarea, "Label clicked and focused!");
      expect(textarea).toHaveValue("Label clicked and focused!");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Label",
          htmlFor: "message",
          children: "Message",
        },
        {
          type: "Textarea",
          id: "message",
          placeholder: "Type your message here...",
          rows: 4,
        },
      ],
    },
  }
);

export const Required: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <div className="space-y-2">
        <Label htmlFor="required-message">Required Message</Label>
        <Textarea id="required-message" placeholder="This field is required" required rows={4} />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test label and required textarea
      const label = canvas.getByText("Required Message");
      const textarea = canvas.getByPlaceholderText("This field is required");

      expect(label).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();

      // Test data-slot attribute
      expect(textarea).toHaveAttribute("data-slot", "textarea");

      // Test required attribute
      expect(textarea).toHaveAttribute("required");

      // Test label association
      expect(label).toHaveAttribute("for", "required-message");
      expect(textarea).toHaveAttribute("id", "required-message");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Label",
          htmlFor: "required-message",
          children: "Required Message",
        },
        {
          type: "Textarea",
          id: "required-message",
          placeholder: "This field is required",
          required: true,
          rows: 4,
        },
      ],
    },
  }
);

// JSON Specification Rendering
export const FromJsonSpec: Story = enhanceStoryForDualMode(
  {
    name: "From JSON Specification",
    parameters: {
      docs: {
        source: {
          code: `
const spec: TextareaSpec = {
  type: "Textarea",
  id: "comment-textarea",
  name: "comment",
  placeholder: "Leave a comment...",
  rows: 5,
  maxLength: 500,
  className: "w-full"
};

return render({
  spec,
  resolver: defaultComponentResolver
});
          `,
        },
      },
    },
    render: () => {
      const spec: TextareaSpec = {
        type: "Textarea",
        id: "comment-textarea",
        name: "comment",
        placeholder: "Leave a comment...",
        rows: 5,
        maxLength: 500,
        className: "w-full",
      };

      const Component = render(spec);

      return <>{Component}</>;
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test JSON-rendered textarea
      const textarea = canvas.getByPlaceholderText("Leave a comment...");
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName.toLowerCase()).toBe("textarea");

      // Test data-slot attribute
      expect(textarea).toHaveAttribute("data-slot", "textarea");

      // Test attributes from spec
      expect(textarea).toHaveAttribute("id", "comment-textarea");
      expect(textarea).toHaveAttribute("name", "comment");
      expect(textarea).toHaveAttribute("rows", "5");
      expect(textarea).toHaveAttribute("maxlength", "500");
    },
  },
  {
    renderSpec: {
      type: "Textarea",
      id: "comment-textarea",
      name: "comment",
      placeholder: "Leave a comment...",
      rows: 5,
      maxLength: 500,
      className: "w-full",
    },
  }
);

export const ResizableTextarea: Story = enhanceStoryForDualMode(
  {
    render: () => {
      const spec: TextareaSpec = {
        type: "Textarea",
        placeholder: "This textarea can be resized",
        rows: 4,
        resize: "both",
        className: "min-h-[100px] resize",
      };

      const Component = render(spec);

      return <>{Component}</>;
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test resizable textarea
      const textarea = canvas.getByPlaceholderText("This textarea can be resized");
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName.toLowerCase()).toBe("textarea");

      // Test data-slot attribute
      expect(textarea).toHaveAttribute("data-slot", "textarea");

      // Test rows attribute
      expect(textarea).toHaveAttribute("rows", "4");
    },
  },
  {
    renderSpec: {
      type: "Textarea",
      placeholder: "This textarea can be resized",
      rows: 4,
      resize: "both",
      className: "min-h-[100px] resize",
    },
  }
);

export const NoResizeTextarea: Story = enhanceStoryForDualMode(
  {
    name: "Non-resizable Textarea",
    render: () => {
      const spec: TextareaSpec = {
        type: "Textarea",
        placeholder: "This textarea cannot be resized",
        rows: 4,
        resize: "none",
        className: "resize-none",
      };

      const Component = render(spec);

      return <>{Component}</>;
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test non-resizable textarea
      const textarea = canvas.getByPlaceholderText("This textarea cannot be resized");
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName.toLowerCase()).toBe("textarea");

      // Test data-slot attribute
      expect(textarea).toHaveAttribute("data-slot", "textarea");

      // Test rows attribute
      expect(textarea).toHaveAttribute("rows", "4");
    },
  },
  {
    renderSpec: {
      type: "Textarea",
      placeholder: "This textarea cannot be resized",
      rows: 4,
      resize: "none",
      className: "resize-none",
    },
  }
);

export const ErrorState: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <div className="space-y-2">
        <Label htmlFor="error-textarea">Description</Label>
        <Textarea
          id="error-textarea"
          placeholder="Enter description"
          className="border-red-500 focus:border-red-500"
          rows={4}
        />
        <p className="text-sm text-red-500">Description is required</p>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test error state textarea
      const label = canvas.getByText("Description");
      const textarea = canvas.getByPlaceholderText("Enter description");
      const errorText = canvas.getByText("Description is required");

      expect(label).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(errorText).toBeInTheDocument();

      // Test data-slot attribute
      expect(textarea).toHaveAttribute("data-slot", "textarea");

      // Test label association
      expect(label).toHaveAttribute("for", "error-textarea");
      expect(textarea).toHaveAttribute("id", "error-textarea");

      // Test rows attribute
      expect(textarea).toHaveAttribute("rows", "4");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Label",
          htmlFor: "error-textarea",
          children: "Description",
        },
        {
          type: "Textarea",
          id: "error-textarea",
          placeholder: "Enter description",
          className: "border-red-500 focus:border-red-500",
          rows: 4,
        },
        {
          type: "Text",
          className: "text-sm text-red-500",
          children: "Description is required",
        },
      ],
    },
  }
);

export const HelperText: Story = enhanceStoryForDualMode(
  {
    name: "With Helper Text",
    render: () => (
      <div className="space-y-2">
        <Label htmlFor="helper-textarea">Bio</Label>
        <Textarea id="helper-textarea" placeholder="Tell us about yourself" rows={4} />
        <p className="text-sm text-muted-foreground">Write a short bio. Maximum 200 characters.</p>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test helper text textarea
      const label = canvas.getByText("Bio");
      const textarea = canvas.getByPlaceholderText("Tell us about yourself");
      const helperText = canvas.getByText("Write a short bio. Maximum 200 characters.");

      expect(label).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(helperText).toBeInTheDocument();

      // Test data-slot attribute
      expect(textarea).toHaveAttribute("data-slot", "textarea");

      // Test label association
      expect(label).toHaveAttribute("for", "helper-textarea");
      expect(textarea).toHaveAttribute("id", "helper-textarea");

      // Test rows attribute
      expect(textarea).toHaveAttribute("rows", "4");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Label",
          htmlFor: "helper-textarea",
          children: "Bio",
        },
        {
          type: "Textarea",
          id: "helper-textarea",
          placeholder: "Tell us about yourself",
          rows: 4,
        },
        {
          type: "Text",
          className: "text-sm text-muted-foreground",
          children: "Write a short bio. Maximum 200 characters.",
        },
      ],
    },
  }
);

export const FullWidthForm: Story = enhanceStoryForDualMode(
  {
    name: "Full Width in Form",
    render: () => (
      <form className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <input
            id="subject"
            type="text"
            placeholder="Message subject"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            rows={6}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Send Message
        </button>
      </form>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test form with textarea
      const subjectLabel = canvas.getByText("Subject");
      const subjectInput = canvas.getByPlaceholderText("Message subject");
      const messageLabel = canvas.getByText("Message");
      const textarea = canvas.getByPlaceholderText("Type your message here...");
      const submitButton = canvas.getByText("Send Message");

      expect(subjectLabel).toBeInTheDocument();
      expect(subjectInput).toBeInTheDocument();
      expect(messageLabel).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();

      // Test textarea specifically
      expect(textarea.tagName.toLowerCase()).toBe("textarea");
      expect(textarea).toHaveAttribute("data-slot", "textarea");
      expect(textarea).toHaveAttribute("id", "message");
      expect(textarea).toHaveAttribute("rows", "6");

      // Test label associations
      expect(subjectLabel).toHaveAttribute("for", "subject");
      expect(messageLabel).toHaveAttribute("for", "message");
    },
  },
  {
    renderSpec: {
      type: "Box",
      element: "form",
      className: "w-full max-w-md space-y-4",
      children: [
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Label",
              htmlFor: "subject",
              children: "Subject",
            },
            {
              type: "Input",
              id: "subject",
              inputType: "text",
              placeholder: "Message subject",
              className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Label",
              htmlFor: "message",
              children: "Message",
            },
            {
              type: "Textarea",
              id: "message",
              placeholder: "Type your message here...",
              rows: 6,
              className: "w-full",
            },
          ],
        },
        {
          type: "Button",
          className: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
          children: "Send Message",
        },
      ],
    },
  }
);

export const Showcase: Story = enhanceStoryForDualMode(
  {
    name: "Component Showcase",
    parameters: {
      layout: "padded",
    },
    render: () => (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Sizes & States</h3>
          <div className="grid gap-4">
            <Textarea placeholder="Default textarea" rows={3} />
            <Textarea placeholder="Disabled textarea" disabled rows={3} />
            <Textarea defaultValue="Read-only content" readOnly rows={3} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">With Labels</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Normal</Label>
              <Textarea placeholder="Enter text..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Required *</Label>
              <Textarea placeholder="This field is required" required rows={3} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Resize Options</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Resizable (both)</Label>
              <Textarea placeholder="Drag corner to resize" className="resize" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Vertical only</Label>
              <Textarea placeholder="Can only resize vertically" className="resize-y" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>No resize</Label>
              <Textarea placeholder="Cannot be resized" className="resize-none" rows={3} />
            </div>
          </div>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test showcase sections
      expect(canvas.getByText("Sizes & States")).toBeInTheDocument();
      expect(canvas.getByText("With Labels")).toBeInTheDocument();
      expect(canvas.getByText("Resize Options")).toBeInTheDocument();

      // Test various textareas in showcase
      const defaultTextarea = canvas.getByPlaceholderText("Default textarea");
      const disabledTextarea = canvas.getByPlaceholderText("Disabled textarea");
      const readonlyTextarea = canvas.getByDisplayValue("Read-only content");

      expect(defaultTextarea).toBeInTheDocument();
      expect(defaultTextarea).toHaveAttribute("data-slot", "textarea");

      expect(disabledTextarea).toBeInTheDocument();
      expect(disabledTextarea).toBeDisabled();
      expect(disabledTextarea).toHaveAttribute("data-slot", "textarea");

      expect(readonlyTextarea).toBeInTheDocument();
      expect(readonlyTextarea).toHaveAttribute("readonly");
      expect(readonlyTextarea).toHaveAttribute("data-slot", "textarea");

      // Test labeled textareas
      const normalTextarea = canvas.getByPlaceholderText("Enter text...");
      const requiredTextarea = canvas.getByPlaceholderText("This field is required");

      expect(normalTextarea).toBeInTheDocument();
      expect(requiredTextarea).toBeInTheDocument();
      expect(requiredTextarea).toHaveAttribute("required");

      // Test resize textareas
      const resizableTextarea = canvas.getByPlaceholderText("Drag corner to resize");
      const verticalOnlyTextarea = canvas.getByPlaceholderText("Can only resize vertically");
      const noResizeTextarea = canvas.getByPlaceholderText("Cannot be resized");

      expect(resizableTextarea).toBeInTheDocument();
      expect(verticalOnlyTextarea).toBeInTheDocument();
      expect(noResizeTextarea).toBeInTheDocument();
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
              element: "h3",
              className: "text-lg font-semibold mb-4",
              children: "Sizes & States",
            },
            {
              type: "Flex",
              direction: "column",
              gap: "md",
              children: [
                {
                  type: "Textarea",
                  placeholder: "Default textarea",
                  rows: 3,
                },
                {
                  type: "Textarea",
                  placeholder: "Disabled textarea",
                  disabled: true,
                  rows: 3,
                },
                {
                  type: "Textarea",
                  defaultValue: "Read-only content",
                  readOnly: true,
                  rows: 3,
                },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              element: "h3",
              className: "text-lg font-semibold mb-4",
              children: "With Labels",
            },
            {
              type: "Flex",
              direction: "column",
              gap: "md",
              children: [
                {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Label",
                      children: "Normal",
                    },
                    {
                      type: "Textarea",
                      placeholder: "Enter text...",
                      rows: 3,
                    },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Label",
                      children: "Required *",
                    },
                    {
                      type: "Textarea",
                      placeholder: "This field is required",
                      required: true,
                      rows: 3,
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
              type: "Text",
              element: "h3",
              className: "text-lg font-semibold mb-4",
              children: "Resize Options",
            },
            {
              type: "Flex",
              direction: "column",
              gap: "md",
              children: [
                {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Label",
                      children: "Resizable (both)",
                    },
                    {
                      type: "Textarea",
                      placeholder: "Drag corner to resize",
                      className: "resize",
                      rows: 3,
                    },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Label",
                      children: "Vertical only",
                    },
                    {
                      type: "Textarea",
                      placeholder: "Can only resize vertically",
                      className: "resize-y",
                      rows: 3,
                    },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: [
                    {
                      type: "Label",
                      children: "No resize",
                    },
                    {
                      type: "Textarea",
                      placeholder: "Cannot be resized",
                      className: "resize-none",
                      rows: 3,
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
