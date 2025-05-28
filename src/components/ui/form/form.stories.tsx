import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
const FormStory = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const meta = {
  title: "Components/Layout/Form",
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
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => <SimpleFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify form fields are rendered
    const usernameInput = canvas.getByPlaceholderText('Enter username');
    const emailInput = canvas.getByPlaceholderText('Enter email');
    const submitButton = canvas.getByRole('button', { name: 'Submit' });
    
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    
    // Test validation - submit empty form
    await userEvent.click(submitButton);
    
    // Wait for validation errors
    await waitFor(() => {
      expect(canvas.getByText('Username must be at least 2 characters.')).toBeInTheDocument();
      expect(canvas.getByText('Please enter a valid email address.')).toBeInTheDocument();
    });
    
    // Fill in valid data
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(emailInput, 'test@example.com');
    
    // Verify error messages are gone
    await waitFor(() => {
      expect(canvas.queryByText('Username must be at least 2 characters.')).not.toBeInTheDocument();
      expect(canvas.queryByText('Please enter a valid email address.')).not.toBeInTheDocument();
    });
  },
};

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

export const WithValidation: Story = {
  args: {
    children: null,
  },
  render: () => <ValidationFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Find form elements
    const ageInput = canvas.getByPlaceholderText('Enter your age');
    const passwordInput = canvas.getByPlaceholderText('Enter password');
    
    // Test age validation - invalid input
    await userEvent.type(ageInput, 'abc');
    await userEvent.tab(); // Trigger validation
    
    await waitFor(() => {
      expect(canvas.getByText('Please enter a valid number')).toBeInTheDocument();
    });
    
    // Test password validation - too short
    await userEvent.type(passwordInput, 'short');
    await userEvent.tab();
    
    await waitFor(() => {
      expect(canvas.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
    
    // Clear and enter valid age
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, '25');
    
    // Clear and test password with missing uppercase
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'lowercase123');
    
    await waitFor(() => {
      expect(canvas.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
    });
    
    // Enter valid password
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'ValidPass123');
    
    // Verify no validation errors
    await waitFor(() => {
      expect(canvas.queryByText('Please enter a valid number')).not.toBeInTheDocument();
      expect(canvas.queryByText('Password must be at least 8 characters')).not.toBeInTheDocument();
    });
  },
};

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

export const WithRequiredFields: Story = {
  args: {
    children: null,
  },
  render: () => <RequiredFieldsFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Find form elements
    const firstNameInput = canvas.getByPlaceholderText('John');
    const lastNameInput = canvas.getByPlaceholderText('Doe');
    const termsCheckbox = canvas.getByRole('checkbox');
    const submitButton = canvas.getByRole('button', { name: 'Submit' });
    
    // Verify required field indicators
    const requiredIndicators = canvas.getAllByText('*');
    expect(requiredIndicators).toHaveLength(2);
    
    // Try to submit empty form
    await userEvent.click(submitButton);
    
    // Check for validation errors
    await waitFor(() => {
      expect(canvas.getByText('First name is required')).toBeInTheDocument();
      expect(canvas.getByText('Last name is required')).toBeInTheDocument();
      expect(canvas.getByText('You must accept the terms and conditions')).toBeInTheDocument();
    });
    
    // Fill in first name only
    await userEvent.type(firstNameInput, 'John');
    await userEvent.click(submitButton);
    
    // First name error should be gone
    await waitFor(() => {
      expect(canvas.queryByText('First name is required')).not.toBeInTheDocument();
      expect(canvas.getByText('Last name is required')).toBeInTheDocument();
    });
    
    // Fill in last name and check terms
    await userEvent.type(lastNameInput, 'Doe');
    await userEvent.click(termsCheckbox);
    
    // All errors should be gone
    await waitFor(() => {
      expect(canvas.queryByText('First name is required')).not.toBeInTheDocument();
      expect(canvas.queryByText('Last name is required')).not.toBeInTheDocument();
      expect(canvas.queryByText('You must accept the terms and conditions')).not.toBeInTheDocument();
    });
  },
};

function InitialErrorsFormExample() {
  const formSchema = z.object({
    email: z.string().email(),
    phone: z.string().min(10, { message: "Phone number too short" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "invalid-email",
      phone: "123",
    },
    mode: "onChange",
  });

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

export const WithInitialErrors: Story = {
  args: {
    children: null,
  },
  render: () => <InitialErrorsFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Validation errors should be visible immediately due to mode: 'onChange'
    await waitFor(() => {
      expect(canvas.getByText('Invalid email')).toBeInTheDocument();
      expect(canvas.getByText('Phone number too short')).toBeInTheDocument();
    });
    
    // Find form elements
    const emailInput = canvas.getByDisplayValue('invalid-email');
    const phoneInput = canvas.getByDisplayValue('123');
    
    // Clear and fix email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid@email.com');
    
    // Email error should disappear
    await waitFor(() => {
      expect(canvas.queryByText('Invalid email')).not.toBeInTheDocument();
      expect(canvas.getByText('Phone number too short')).toBeInTheDocument();
    });
    
    // Clear and fix phone
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '1234567890');
    
    // All errors should be gone
    await waitFor(() => {
      expect(canvas.queryByText('Invalid email')).not.toBeInTheDocument();
      expect(canvas.queryByText('Phone number too short')).not.toBeInTheDocument();
    });
  },
};

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

export const ContactForm: Story = {
  args: {
    children: null,
  },
  render: () => <ContactFormExample />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Find form elements
    const nameInput = canvas.getByPlaceholderText('Your name');
    const emailInput = canvas.getByPlaceholderText('Your email');
    const subjectInput = canvas.getByPlaceholderText('Subject of your message');
    const messageTextarea = canvas.getByPlaceholderText('Type your message here...');
    const submitButton = canvas.getByRole('button', { name: 'Send Message' });
    
    // Verify grid layout (2 columns for name and email)
    const gridContainer = nameInput.parentElement?.parentElement?.parentElement;
    expect(gridContainer).toHaveClass('grid-cols-2');
    
    // Try to submit empty form
    await userEvent.click(submitButton);
    
    // Check for validation errors
    await waitFor(() => {
      expect(canvas.getByText('Name is required')).toBeInTheDocument();
      expect(canvas.getByText('Invalid email address')).toBeInTheDocument();
      expect(canvas.getByText('Subject is required')).toBeInTheDocument();
      expect(canvas.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });
    
    // Fill in the form
    await userEvent.type(nameInput, 'Jane Doe');
    await userEvent.type(emailInput, 'jane@example.com');
    await userEvent.type(subjectInput, 'Question about your service');
    await userEvent.type(messageTextarea, 'I would like to know more about your pricing plans.');
    
    // All errors should be cleared
    await waitFor(() => {
      expect(canvas.queryByText('Name is required')).not.toBeInTheDocument();
      expect(canvas.queryByText('Invalid email address')).not.toBeInTheDocument();
      expect(canvas.queryByText('Subject is required')).not.toBeInTheDocument();
      expect(canvas.queryByText('Message must be at least 10 characters')).not.toBeInTheDocument();
    });
    
    // Verify description text
    expect(canvas.getByText("We'll respond to your message within 24 hours.")).toBeInTheDocument();
  },
};
