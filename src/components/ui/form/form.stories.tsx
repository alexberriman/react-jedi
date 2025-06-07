import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "../input/input";
import { Button } from "../button/button";

// Create a wrapper component for stories that doesn't require form props
const FormStory = ({ children }: { children?: React.ReactNode }) => {
  return <>{children}</>;
};

const meta = {
  title: "Layout Components/Form",
  component: FormStory,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Form component built on top of react-hook-form, with built-in validation and error handling.",
      },
    },
  },

  tags: ["autodocs", "ui-form"],
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// SDUI validation demo with all field types
const sduiValidationSpec = {
  type: "Form",
  defaultValues: {
    username: "",
    email: "",
    age: "",
    bio: "",
    website: ""
  },
  validation: {
    username: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters"
      },
      maxLength: {
        value: 20,
        message: "Username must be less than 20 characters"
      },
      pattern: {
        value: "^[a-zA-Z0-9_]+$",
        message: "Username can only contain letters, numbers, and underscores"
      }
    },
    email: {
      required: "Email is required",
      email: "Please enter a valid email address"
    },
    age: {
      required: "Age is required",
      min: {
        value: 18,
        message: "You must be at least 18 years old"
      },
      max: {
        value: 100,
        message: "Age must be less than 100"
      }
    },
    bio: {
      maxLength: {
        value: 200,
        message: "Bio must be less than 200 characters"
      }
    },
    website: {
      pattern: {
        value: "^https?://.*",
        message: "Website must start with http:// or https://"
      }
    }
  },
  onSubmit: "handleFormSubmit",
  children: [
    {
      type: "Heading",
      level: 3,
      children: "User Registration Form"
    },
    {
      type: "FormField",
      name: "username",
      children: [
        {
          type: "FormItem",
          children: [
            {
              type: "FormLabel",
              children: "Username *"
            },
            {
              type: "FormControl",
              children: [
                {
                  type: "Input",
                  name: "username",
                  placeholder: "Enter your username"
                }
              ]
            },
            {
              type: "FormDescription",
              children: "3-20 characters, letters, numbers, and underscores only"
            },
            {
              type: "FormMessage",
              fieldName: "username"
            }
          ]
        }
      ]
    },
    {
      type: "FormField",
      name: "email",
      children: [
        {
          type: "FormItem",
          children: [
            {
              type: "FormLabel",
              children: "Email *"
            },
            {
              type: "FormControl",
              children: [
                {
                  type: "Input",
                  name: "email",
                  inputType: "email",
                  placeholder: "you@example.com"
                }
              ]
            },
            {
              type: "FormDescription",
              children: "We'll use this for account recovery"
            },
            {
              type: "FormMessage",
              fieldName: "email"
            }
          ]
        }
      ]
    },
    {
      type: "FormField",
      name: "age",
      children: [
        {
          type: "FormItem",
          children: [
            {
              type: "FormLabel",
              children: "Age *"
            },
            {
              type: "FormControl",
              children: [
                {
                  type: "Input",
                  name: "age",
                  inputType: "number",
                  placeholder: "18"
                }
              ]
            },
            {
              type: "FormDescription",
              children: "You must be 18 or older to register"
            },
            {
              type: "FormMessage",
              fieldName: "age"
            }
          ]
        }
      ]
    },
    {
      type: "FormField",
      name: "bio",
      children: [
        {
          type: "FormItem",
          children: [
            {
              type: "FormLabel",
              children: "Bio (Optional)"
            },
            {
              type: "FormControl",
              children: [
                {
                  type: "Textarea",
                  name: "bio",
                  placeholder: "Tell us about yourself...",
                  rows: 3
                }
              ]
            },
            {
              type: "FormDescription",
              children: "Maximum 200 characters"
            },
            {
              type: "FormMessage",
              fieldName: "bio"
            }
          ]
        }
      ]
    },
    {
      type: "FormField",
      name: "website",
      children: [
        {
          type: "FormItem",
          children: [
            {
              type: "FormLabel",
              children: "Website (Optional)"
            },
            {
              type: "FormControl",
              children: [
                {
                  type: "Input",
                  name: "website",
                  placeholder: "https://example.com"
                }
              ]
            },
            {
              type: "FormDescription",
              children: "Your personal or company website"
            },
            {
              type: "FormMessage",
              fieldName: "website"
            }
          ]
        }
      ]
    },
    {
      type: "Flex",
      gap: "md",
      className: "mt-6",
      children: [
        {
          type: "Button",
          htmlType: "submit",
          children: "Register"
        },
        {
          type: "Button",
          variant: "outline",
          htmlType: "reset",
          children: "Reset"
        }
      ]
    }
  ]
};

function SimpleFormExample() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormDescription>We&apos;ll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Default: Story = enhanceStoryForDualMode<typeof FormStory>({
  args: {},
  render: () => <SimpleFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Check if we're in SDUI mode (form validation won't work in SDUI)
    const renderMode = canvasElement.querySelector('[data-testid="story-render-mode"]');
    const isSDUIMode = renderMode?.getAttribute('data-mode') === 'sdui';

    // Verify form fields are rendered
    const usernameInput = canvas.getByPlaceholderText("Enter username");
    const emailInput = canvas.getByPlaceholderText("Enter email");
    const submitButton = canvas.getByRole("button", { name: "Submit" });

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Only test validation in React mode since SDUI doesn't support react-hook-form
    if (!isSDUIMode) {
      // Test validation - submit empty form
      await userEvent.click(submitButton);

      // Wait for validation errors
      await waitFor(() => {
        expect(canvas.getByText("Username must be at least 2 characters.")).toBeInTheDocument();
        expect(canvas.getByText("Please enter a valid email address.")).toBeInTheDocument();
      });

      // Fill in valid data
      await userEvent.type(usernameInput, "testuser");
      await userEvent.type(emailInput, "test@example.com");

      // Verify error messages are gone
      await waitFor(() => {
        expect(canvas.queryByText("Username must be at least 2 characters.")).not.toBeInTheDocument();
        expect(canvas.queryByText("Please enter a valid email address.")).not.toBeInTheDocument();
      });
    }
  },
}, {
  renderSpec: {
    type: "Flex",
    direction: "column",
    gap: "xl",
    children: [
      {
        type: "Flex",
        direction: "column",
        gap: "sm",
        children: [
          {
            type: "Label",
            children: "Username"
          },
          {
            type: "Input",
            placeholder: "Enter username"
          },
          {
            type: "Text",
            size: "sm",
            variant: "muted",
            children: "This is your public display name."
          }
        ]
      },
      {
        type: "Flex",
        direction: "column",
        gap: "sm",
        children: [
          {
            type: "Label",
            children: "Email"
          },
          {
            type: "Input",
            placeholder: "Enter email"
          },
          {
            type: "Text",
            size: "sm",
            variant: "muted",
            children: "We'll never share your email."
          }
        ]
      },
      {
        type: "Button",
        children: "Submit"
      }
    ]
  }
});

function ValidationFormExample() {
  const formSchema = z.object({
    age: z.string().refine((val) => !Number.isNaN(Number.parseInt(val, 10)), {
      message: "Please enter a valid number",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your age" {...field} />
              </FormControl>
              <FormDescription>Must be a valid number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters with uppercase, lowercase, and numbers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const WithValidation: Story = enhanceStoryForDualMode<typeof FormStory>({
  args: {},
  render: () => <ValidationFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Check if we're in SDUI mode
    const renderMode = canvasElement.querySelector('[data-testid="story-render-mode"]');
    const isSDUIMode = renderMode?.getAttribute('data-mode') === 'sdui';

    // Find form elements
    const ageInput = canvas.getByPlaceholderText("Enter your age");
    const passwordInput = canvas.getByPlaceholderText("Enter password");
    const submitButton = canvas.getByRole("button", { name: /submit/i });

    expect(ageInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Only test validation in React mode
    if (!isSDUIMode) {
      // Test password validation - too short
      await userEvent.type(passwordInput, "short");
      await userEvent.click(submitButton); // Trigger validation

      await waitFor(() => {
        expect(canvas.getByText("Password must be at least 8 characters")).toBeInTheDocument();
      });

      // Clear and test password with missing uppercase
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "lowercase123");
      await userEvent.click(submitButton); // Trigger validation

      await waitFor(() => {
        expect(
          canvas.getByText("Password must contain at least one uppercase letter")
        ).toBeInTheDocument();
      });

      // Enter valid age
      await userEvent.type(ageInput, "25");

      // Enter valid password
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "ValidPass123");
      await userEvent.click(submitButton); // Trigger validation

      // Verify no validation errors
      await waitFor(() => {
        expect(canvas.queryByText("Please enter a valid number")).not.toBeInTheDocument();
        expect(canvas.queryByText("Password must be at least 8 characters")).not.toBeInTheDocument();
        expect(
          canvas.queryByText("Password must contain at least one uppercase letter")
        ).not.toBeInTheDocument();
      });
    }
  },
}, {
  renderSpec: {
    type: "Form",
    validation: {
      age: {
        required: "Age is required",
        pattern: {
          value: "^[0-9]+$",
          message: "Please enter a valid number"
        },
        min: {
          value: 1,
          message: "Age must be at least 1"
        },
        max: {
          value: 150,
          message: "Age must be less than 150"
        }
      },
      password: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters"
        },
        pattern: {
          value: String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$`,
          message: "Password must contain uppercase, lowercase, and numbers"
        }
      }
    },
    onSubmit: "handleFormSubmit",
    children: [
      {
        type: "FormField",
        name: "age",
        children: [
          {
            type: "FormItem",
            children: [
              {
                type: "FormLabel",
                children: "Age"
              },
              {
                type: "FormControl",
                children: [
                  {
                    type: "Input",
                    name: "age",
                    inputType: "number",
                    placeholder: "Enter your age"
                  }
                ]
              },
              {
                type: "FormDescription",
                children: "Must be a valid number."
              },
              {
                type: "FormMessage",
                fieldName: "age"
              }
            ]
          }
        ]
      },
      {
        type: "FormField",
        name: "password",
        children: [
          {
            type: "FormItem",
            children: [
              {
                type: "FormLabel",
                children: "Password"
              },
              {
                type: "FormControl",
                children: [
                  {
                    type: "Input",
                    name: "password",
                    inputType: "password",
                    placeholder: "Enter password"
                  }
                ]
              },
              {
                type: "FormDescription",
                children: "Must be at least 8 characters with uppercase, lowercase, and numbers."
              },
              {
                type: "FormMessage",
                fieldName: "password"
              }
            ]
          }
        ]
      },
      {
        type: "Button",
        htmlType: "submit",
        children: "Submit"
      }
    ]
  }
});

function RequiredFieldsFormExample() {
  const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Last Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
                <FormDescription>
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const WithRequiredFields: Story = enhanceStoryForDualMode<typeof FormStory>({
  args: {},
  render: () => <RequiredFieldsFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Check if we're in SDUI mode
    const renderMode = canvasElement.querySelector('[data-testid="story-render-mode"]');
    const isSDUIMode = renderMode?.getAttribute('data-mode') === 'sdui';

    // Find form elements
    const firstNameInput = canvas.getByPlaceholderText("John");
    const lastNameInput = canvas.getByPlaceholderText("Doe");
    const termsCheckbox = canvas.getByRole("checkbox");
    const submitButton = canvas.getByRole("button", { name: "Submit" });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(termsCheckbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Verify required field indicators
    const requiredIndicators = canvas.getAllByText("*");
    expect(requiredIndicators).toHaveLength(2);

    // Only test validation in React mode
    if (!isSDUIMode) {
      // Try to submit empty form
      await userEvent.click(submitButton);

      // Check for validation errors
      await waitFor(() => {
        expect(canvas.getByText("First name is required")).toBeInTheDocument();
        expect(canvas.getByText("Last name is required")).toBeInTheDocument();
        expect(canvas.getByText("You must accept the terms and conditions")).toBeInTheDocument();
      });

      // Fill in first name only
      await userEvent.type(firstNameInput, "John");
      await userEvent.click(submitButton);

      // First name error should be gone
      await waitFor(() => {
        expect(canvas.queryByText("First name is required")).not.toBeInTheDocument();
        expect(canvas.getByText("Last name is required")).toBeInTheDocument();
      });

      // Fill in last name and check terms
      await userEvent.type(lastNameInput, "Doe");
      await userEvent.click(termsCheckbox);

      // All errors should be gone
      await waitFor(() => {
        expect(canvas.queryByText("First name is required")).not.toBeInTheDocument();
        expect(canvas.queryByText("Last name is required")).not.toBeInTheDocument();
        expect(
          canvas.queryByText("You must accept the terms and conditions")
        ).not.toBeInTheDocument();
      });
    }
  },
}, {
  renderSpec: {
    type: "Flex",
    direction: "column",
    gap: "xl",
    children: [
      {
        type: "Flex",
        direction: "column",
        gap: "sm",
        children: [
          {
            type: "Flex",
            gap: "xs",
            children: [
              {
                type: "Label",
                children: "First Name"
              },
              {
                type: "Text",
                variant: "destructive",
                children: "*"
              }
            ]
          },
          {
            type: "Input",
            placeholder: "John"
          }
        ]
      },
      {
        type: "Flex",
        direction: "column",
        gap: "sm",
        children: [
          {
            type: "Flex",
            gap: "xs",
            children: [
              {
                type: "Label",
                children: "Last Name"
              },
              {
                type: "Text",
                variant: "destructive",
                children: "*"
              }
            ]
          },
          {
            type: "Input",
            placeholder: "Doe"
          }
        ]
      },
      {
        type: "Flex",
        align: "start",
        gap: "sm",
        children: [
          {
            type: "Checkbox"
          },
          {
            type: "Flex",
            direction: "column",
            gap: "xs",
            children: [
              {
                type: "Label",
                children: "Accept terms and conditions"
              },
              {
                type: "Text",
                size: "sm",
                variant: "muted",
                children: "You agree to our Terms of Service and Privacy Policy."
              }
            ]
          }
        ]
      },
      {
        type: "Button",
        children: "Submit"
      }
    ]
  }
});

function InitialErrorsFormExample() {
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    phone: z.string().min(10, { message: "Phone number too short" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "invalid-email",
      phone: "123",
    },
    mode: "all", // Changed to "all" to validate on mount
  });

  // Trigger validation on mount to show initial errors
  React.useEffect(() => {
    form.trigger();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const WithInitialErrors: Story = enhanceStoryForDualMode<typeof FormStory>({
  args: {},
  render: () => <InitialErrorsFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Check if we're in SDUI mode
    const renderMode = canvasElement.querySelector('[data-testid="story-render-mode"]');
    const isSDUIMode = renderMode?.getAttribute('data-mode') === 'sdui';

    // In SDUI mode, fields will have placeholder values instead of actual values
    if (isSDUIMode) {
      // Find form elements by placeholder in SDUI mode
      const emailInput = canvas.getByRole('textbox', { name: /email/i });
      const phoneInput = canvas.getByRole('textbox', { name: /phone/i });
      
      expect(emailInput).toBeInTheDocument();
      expect(phoneInput).toBeInTheDocument();
    } else {
      // Wait for initial validation to trigger
      await waitFor(() => {
        // Verify initial errors are displayed
        expect(canvas.getByText("Invalid email")).toBeInTheDocument();
        expect(canvas.getByText("Phone number too short")).toBeInTheDocument();
      });

      // Find form elements
      const emailInput = canvas.getByDisplayValue("invalid-email");
      const phoneInput = canvas.getByDisplayValue("123");

      // Fix email
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, "valid@example.com");

      // Email error should be gone
      await waitFor(() => {
        expect(canvas.queryByText("Invalid email")).not.toBeInTheDocument();
        expect(canvas.getByText("Phone number too short")).toBeInTheDocument();
      });

      // Fix phone
      await userEvent.clear(phoneInput);
      await userEvent.type(phoneInput, "1234567890");

      // All errors should be gone
      await waitFor(() => {
        expect(canvas.queryByText("Invalid email")).not.toBeInTheDocument();
        expect(canvas.queryByText("Phone number too short")).not.toBeInTheDocument();
      });
    }
  },
}, {
  renderSpec: {
    type: "Flex",
    direction: "column",
    gap: "xl",
    children: [
      {
        type: "Flex",
        direction: "column",
        gap: "sm",
        children: [
          {
            type: "Label",
            children: "Email"
          },
          {
            type: "Input",
            value: "invalid-email"
          },
          {
            type: "Text",
            size: "sm",
            variant: "destructive",
            children: "Invalid email"
          }
        ]
      },
      {
        type: "Flex",
        direction: "column",
        gap: "sm",
        children: [
          {
            type: "Label",
            children: "Phone"
          },
          {
            type: "Input",
            value: "123"
          },
          {
            type: "Text",
            size: "sm",
            variant: "destructive",
            children: "Phone number too short"
          }
        ]
      },
      {
        type: "Button",
        children: "Submit"
      }
    ]
  }
});

function ContactFormExample() {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Contact form submitted:", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject of your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Type your message here..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                />
              </FormControl>
              <FormDescription>We&apos;ll respond to your message within 24 hours.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send Message</Button>
      </form>
    </Form>
  );
}

export const ContactForm: Story = enhanceStoryForDualMode<typeof FormStory>({
  args: {},
  render: () => <ContactFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Check if we're in SDUI mode
    const renderMode = canvasElement.querySelector('[data-testid="story-render-mode"]');
    const isSDUIMode = renderMode?.getAttribute('data-mode') === 'sdui';

    // Find form elements
    const nameInput = canvas.getByPlaceholderText("Your name");
    const emailInput = canvas.getByPlaceholderText("Your email");
    const subjectInput = canvas.getByPlaceholderText("Subject of your message");
    const messageTextarea = canvas.getByPlaceholderText("Type your message here...");
    const submitButton = canvas.getByRole("button", { name: "Send Message" });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
    expect(messageTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Verify grid layout (2 columns for name and email)
    const gridContainer = canvasElement.querySelector(".grid-cols-2");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass("grid");
    expect(gridContainer).toHaveClass("gap-4");

    // Verify description text
    expect(canvas.getByText("We'll respond to your message within 24 hours.")).toBeInTheDocument();

    // Only test validation in React mode
    if (!isSDUIMode) {
      // Try to submit empty form
      await userEvent.click(submitButton);

      // Check for validation errors
      await waitFor(() => {
        expect(canvas.getByText("Name is required")).toBeInTheDocument();
        expect(canvas.getByText("Invalid email address")).toBeInTheDocument();
        expect(canvas.getByText("Subject is required")).toBeInTheDocument();
        expect(canvas.getByText("Message must be at least 10 characters")).toBeInTheDocument();
      });

      // Fill in the form
      await userEvent.type(nameInput, "Jane Doe");
      await userEvent.type(emailInput, "jane@example.com");
      await userEvent.type(subjectInput, "Question about your service");
      await userEvent.type(messageTextarea, "I would like to know more about your pricing plans.");

      // All errors should be cleared
      await waitFor(() => {
        expect(canvas.queryByText("Name is required")).not.toBeInTheDocument();
        expect(canvas.queryByText("Invalid email address")).not.toBeInTheDocument();
        expect(canvas.queryByText("Subject is required")).not.toBeInTheDocument();
        expect(canvas.queryByText("Message must be at least 10 characters")).not.toBeInTheDocument();
      });
    }
  },
}, {
  renderSpec: {
    type: "Flex",
    direction: "column",
    gap: "xl",
    children: [
      {
        type: "Grid",
        columns: 2,
        gap: "md",
        children: [
          {
            type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              {
                type: "Label",
                children: "Name"
              },
              {
                type: "Input",
                placeholder: "Your name"
              }
            ]
          },
          {
            type: "Flex",
            direction: "column",
            gap: "sm",
            children: [
              {
                type: "Label",
                children: "Email"
              },
              {
                type: "Input",
                placeholder: "Your email"
              }
            ]
          }
        ]
      },
      {
        type: "Flex",
        direction: "column",
        gap: "sm",
        children: [
          {
            type: "Label",
            children: "Subject"
          },
          {
            type: "Input",
            placeholder: "Subject of your message"
          }
        ]
      },
      {
        type: "Flex",
        direction: "column",
        gap: "sm",
        children: [
          {
            type: "Label",
            children: "Message"
          },
          {
            type: "Textarea",
            placeholder: "Type your message here...",
            rows: 4
          },
          {
            type: "Text",
            size: "sm",
            variant: "muted",
            children: "We'll respond to your message within 24 hours."
          }
        ]
      },
      {
        type: "Button",
        children: "Send Message"
      }
    ]
  }
});

// Comprehensive validation example for SDUI
export const ComprehensiveValidationSDUI: Story = {
  name: "Comprehensive Validation (SDUI)",
  render: () => {
    return <div>This story is for SDUI mode only</div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Comprehensive form validation example demonstrating all validation rules in SDUI mode."
      }
    },
    renderSpec: sduiValidationSpec
  }
};
