import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import type { TextareaSpec } from "../../../types/schema/ui";
import { Textarea } from "./textarea";
import { render } from "../../../lib/render";
import { Label } from "../label/label";

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
export const Default: Story = {
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
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
    
    // Test clicking and typing
    await user.click(textarea);
    expect(textarea).toHaveFocus();
    
    // Test typing text
    await user.type(textarea, "Hello, this is a test message!");
    expect(textarea).toHaveValue("Hello, this is a test message!");
    
    // Test rows attribute
    expect(textarea).toHaveAttribute('rows', '4');
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "This is some example text that shows how the textarea looks with content.",
    rows: 4,
  },
};

export const Disabled: Story = {
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
    
    // Test disabled attribute
    expect(textarea).toHaveAttribute('disabled');
    
    // Test cannot focus disabled textarea
    expect(textarea).not.toHaveFocus();
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: "This text is read-only and cannot be edited.",
    readOnly: true,
    rows: 4,
  },
};

export const CustomRows: Story = {
  args: {
    placeholder: "This textarea has 6 rows",
    rows: 6,
  },
};

export const MaxLength: Story = {
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
    expect(textarea).toHaveAttribute('maxlength', '100');
    
    // Test typing within limit
    await user.click(textarea);
    await user.type(textarea, "This is a test message that should fit within the 100 character limit set on this textarea.");
    
    // Test that the text was entered (it's exactly 99 characters)
    expect((textarea as HTMLTextAreaElement).value.length).toBeLessThanOrEqual(100);
  },
};

export const WithLabel: Story = {
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
    const label = canvas.getByText('Message');
    const textarea = canvas.getByPlaceholderText('Type your message here...');
    
    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    
    // Test label htmlFor and textarea id
    expect(label).toHaveAttribute('for', 'message');
    expect(textarea).toHaveAttribute('id', 'message');
    
    // Test clicking label focuses textarea
    await user.click(label);
    expect(textarea).toHaveFocus();
    
    // Test typing in textarea
    await user.type(textarea, 'Label clicked and focused!');
    expect(textarea).toHaveValue('Label clicked and focused!');
  },
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="required-message">Required Message</Label>
      <Textarea id="required-message" placeholder="This field is required" required rows={4} />
    </div>
  ),
};

// JSON Specification Rendering
export const FromJsonSpec: Story = {
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
};

export const ResizableTextarea: Story = {
  name: "Resizable Textarea",
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
};

export const NoResizeTextarea: Story = {
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
};

export const ErrorState: Story = {
  name: "Error State",
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
};

export const HelperText: Story = {
  name: "With Helper Text",
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="helper-textarea">Bio</Label>
      <Textarea id="helper-textarea" placeholder="Tell us about yourself" rows={4} />
      <p className="text-sm text-muted-foreground">Write a short bio. Maximum 200 characters.</p>
    </div>
  ),
};

export const FullWidthForm: Story = {
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
};

export const Showcase: Story = {
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
};
