import type { Meta, StoryObj } from "@storybook/react-vite";
import { render } from "../../../lib/render";
import { Toaster } from "./index";
import type { UISpecification } from "../../../types/schema/specification";

const meta = {
  title: "Components/Toast/SDUI",
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Toast notifications working in SDUI mode with string event handlers",
      },
    },
  },
  tags: ["autodocs", "ui-toast", "sdui"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicToastSDUI: Story = {
  render: () => {
    const spec: UISpecification = {
      version: "1.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: 4,
        children: [
          {
            type: "Button",
            children: "Show Basic Toast",
            onClickAction: "toast('This is a basic toast notification')"
          },
          {
            type: "Button",
            variant: "default",
            children: "Show Success Toast",
            onClickAction: "toastSuccess('Success! Operation completed.')"
          },
          {
            type: "Button",
            variant: "destructive",
            children: "Show Error Toast",
            onClickAction: "toastError('Error! Something went wrong.')"
          },
          {
            type: "Button",
            variant: "secondary",
            children: "Show Warning Toast",
            onClickAction: "toastWarning('Warning! Please check your input.')"
          },
          {
            type: "Button",
            variant: "outline",
            children: "Show Info Toast",
            onClickAction: "toastInfo('Info: Here is some information.')"
          }
        ]
      }
    };

    return render(spec) || <div>Failed to render</div>;
  }
};

export const ToastWithCustomMessages: Story = {
  render: () => {
    const spec: UISpecification = {
      version: "1.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: 4,
        children: [
          {
            type: "Heading",
            level: "h3",
            children: "Custom Toast Messages"
          },
          {
            type: "Button",
            children: "Welcome Message",
            onClickAction: "toast('Welcome to React Jedi SDUI!')"
          },
          {
            type: "Button",
            variant: "default",
            children: "Save Success",
            onClickAction: "toastSuccess('Your changes have been saved successfully!')"
          },
          {
            type: "Button",
            variant: "destructive",
            children: "Delete Error",
            onClickAction: "toastError('Failed to delete item. Please try again.')"
          },
          {
            type: "Button",
            variant: "secondary",
            children: "Validation Warning",
            onClickAction: "toastWarning('Please fill in all required fields.')"
          },
          {
            type: "Button",
            variant: "outline",
            children: "Update Info",
            onClickAction: "toastInfo('A new version is available. Click to update.')"
          }
        ]
      }
    };

    return render(spec) || <div>Failed to render</div>;
  }
};

export const ToastInForm: Story = {
  render: () => {
    const spec: UISpecification = {
      version: "1.0",
      root: {
        type: "Card",
        className: "w-[400px]",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "Contact Form"
              },
              {
                type: "CardDescription",
                children: "Fill out the form to get in touch"
              }
            ]
          },
          {
            type: "CardContent",
            children: {
              type: "Flex",
              direction: "column",
              gap: 4,
              children: [
                {
                  type: "Input",
                  placeholder: "Your name",
                  id: "name"
                },
                {
                  type: "Input",
                  placeholder: "Your email",
                  inputType: "email",
                  id: "email"
                },
                {
                  type: "Textarea",
                  placeholder: "Your message",
                  id: "message"
                },
                {
                  type: "Button",
                  className: "w-full",
                  children: "Send Message",
                  onClickAction: "toastSuccess('Thank you! Your message has been sent.')"
                }
              ]
            }
          }
        ]
      }
    };

    return render(spec) || <div>Failed to render</div>;
  }
};

export const ToastDismissExample: Story = {
  render: () => {
    const spec: UISpecification = {
      version: "1.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: 4,
        align: "center",
        children: [
          {
            type: "Heading",
            level: "h3",
            children: "Toast Dismiss Example"
          },
          {
            type: "Text",
            children: "Show a loading toast, then dismiss it after operation completes"
          },
          {
            type: "Button",
            children: "Start Operation",
            onClickAction: "toastLoading('Processing your request...')"
          },
          {
            type: "Button",
            variant: "outline",
            children: "Dismiss All Toasts",
            onClickAction: "toastDismiss()"
          }
        ]
      }
    };

    return render(spec) || <div>Failed to render</div>;
  }
};