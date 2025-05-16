import { render } from "@banja/react-jedi";
import type { Specification } from "@banja/react-jedi";

const formValidationExamples: Specification = {
  type: "container",
  props: {
    className: "space-y-8",
  },
  children: [
    {
      type: "heading",
      props: {
        as: "h1",
        className: "text-4xl font-bold mb-8",
      },
      content: "Form Validation Examples",
    },

    {
      type: "text",
      props: {
        className: "text-lg text-gray-600 mb-8",
      },
      content:
        "Comprehensive examples showcasing different validation rules, error states, and field types.",
    },

    // Basic validation example
    {
      type: "card",
      props: {
        className: "p-6",
      },
      children: [
        {
          type: "heading",
          props: {
            as: "h2",
            className: "text-2xl font-semibold mb-4",
          },
          content: "Basic Form Validation",
        },
        {
          type: "form",
          props: {
            className: "space-y-4",
          },
          state: {
            formData: {},
          },
          onSubmit: {
            handler: "submit",
            preventDefault: true,
            actions: [
              {
                action: "console",
                level: "log",
                message: "Form submitted successfully!",
              },
            ],
          },
          validation: {
            fields: {
              name: {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              },
              email: {
                required: "Email is required",
                pattern: {
                  value: String.raw`^[^\s@]+@[^\s@]+\.[^\s@]+$`,
                  message: "Please enter a valid email",
                },
              },
            },
          },
          children: [
            {
              type: "form-field",
              props: {
                name: "name",
                label: "Full Name",
              },
              children: {
                type: "input",
                props: {
                  type: "text",
                  placeholder: "Enter your name",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "email",
                label: "Email Address",
              },
              children: {
                type: "input",
                props: {
                  type: "email",
                  placeholder: "john@example.com",
                },
              },
            },
            {
              type: "button",
              props: {
                type: "submit",
                className: "w-full",
              },
              content: "Submit",
            },
          ],
        },
      ],
    },

    // Advanced validation with multiple rules
    {
      type: "card",
      props: {
        className: "p-6",
      },
      children: [
        {
          type: "heading",
          props: {
            as: "h2",
            className: "text-2xl font-semibold mb-4",
          },
          content: "User Registration Form",
        },
        {
          type: "form",
          props: {
            className: "space-y-4",
          },
          state: {
            formData: {},
          },
          onSubmit: {
            handler: "submit",
            preventDefault: true,
            actions: [
              {
                action: "console",
                level: "log",
                message: "Registration successful!",
              },
            ],
          },
          validation: {
            fields: {
              username: {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
                pattern: {
                  value: "^[a-zA-Z0-9_]+$",
                  message: "Username can only contain letters, numbers, and underscores",
                },
              },
              email: {
                required: "Email is required",
                email: true,
              },
              password: {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]`,
                  message:
                    "Password must contain uppercase, lowercase, number, and special character",
                },
              },
              confirmPassword: {
                required: "Please confirm your password",
              },
              age: {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old",
                },
                max: {
                  value: 120,
                  message: "Please enter a valid age",
                },
              },
              terms: {
                required: "You must accept the terms and conditions",
              },
            },
          },
          children: [
            {
              type: "form-field",
              props: {
                name: "username",
                label: "Username",
              },
              children: {
                type: "input",
                props: {
                  type: "text",
                  placeholder: "Choose a username",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "email",
                label: "Email",
              },
              children: {
                type: "input",
                props: {
                  type: "email",
                  placeholder: "email@example.com",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "password",
                label: "Password",
              },
              children: {
                type: "input",
                props: {
                  type: "password",
                  placeholder: "Create a strong password",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "confirmPassword",
                label: "Confirm Password",
              },
              children: {
                type: "input",
                props: {
                  type: "password",
                  placeholder: "Confirm your password",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "age",
                label: "Age",
              },
              children: {
                type: "input",
                props: {
                  type: "number",
                  placeholder: "Enter your age",
                  min: 1,
                  max: 150,
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "terms",
              },
              children: {
                type: "checkbox",
                props: {
                  label: "I accept the terms and conditions",
                },
              },
            },
            {
              type: "button",
              props: {
                type: "submit",
                className: "w-full",
                variant: "default",
              },
              content: "Register",
            },
          ],
        },
      ],
    },

    // Different field types with validation
    {
      type: "card",
      props: {
        className: "p-6",
      },
      children: [
        {
          type: "heading",
          props: {
            as: "h2",
            className: "text-2xl font-semibold mb-4",
          },
          content: "Contact Form with Various Field Types",
        },
        {
          type: "form",
          props: {
            className: "space-y-4",
          },
          state: {
            formData: {
              contactMethod: "email",
            },
          },
          onSubmit: {
            handler: "submit",
            preventDefault: true,
            actions: [
              {
                action: "console",
                level: "log",
                message: "Contact form submitted!",
              },
            ],
          },
          validation: {
            fields: {
              fullName: {
                required: "Please enter your full name",
              },
              phone: {
                pattern: {
                  value: String.raw`^\+?[1-9]\d{1,14}$`,
                  message: "Please enter a valid phone number",
                },
              },
              contactMethod: {
                required: "Please select a contact method",
              },
              department: {
                required: "Please select a department",
              },
              message: {
                required: "Please enter your message",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Message must not exceed 500 characters",
                },
              },
            },
          },
          children: [
            {
              type: "form-field",
              props: {
                name: "fullName",
                label: "Full Name",
              },
              children: {
                type: "input",
                props: {
                  type: "text",
                  placeholder: "John Doe",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "phone",
                label: "Phone Number",
              },
              children: {
                type: "input",
                props: {
                  type: "tel",
                  placeholder: "+1234567890",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "contactMethod",
                label: "Preferred Contact Method",
              },
              children: {
                type: "radio-group",
                props: {
                  defaultValue: "email",
                  options: [
                    { value: "email", label: "Email" },
                    { value: "phone", label: "Phone" },
                    { value: "text", label: "Text Message" },
                  ],
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "department",
                label: "Department",
              },
              children: {
                type: "select",
                props: {
                  placeholder: "Select a department",
                  options: [
                    { value: "sales", label: "Sales" },
                    { value: "support", label: "Support" },
                    { value: "billing", label: "Billing" },
                    { value: "general", label: "General Inquiry" },
                  ],
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "message",
                label: "Message",
              },
              children: {
                type: "textarea",
                props: {
                  placeholder: "Enter your message here...",
                  rows: 5,
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "newsletter",
              },
              children: {
                type: "checkbox",
                props: {
                  label: "Subscribe to newsletter",
                },
              },
            },
            {
              type: "button",
              props: {
                type: "submit",
                className: "w-full",
                variant: "default",
              },
              content: "Send Message",
            },
          ],
        },
      ],
    },

    // Error state styling example
    {
      type: "card",
      props: {
        className: "p-6",
      },
      children: [
        {
          type: "heading",
          props: {
            as: "h2",
            className: "text-2xl font-semibold mb-4",
          },
          content: "Shipping Form with Pre-filled Errors",
        },
        {
          type: "text",
          props: {
            className: "text-sm text-gray-600 mb-4",
          },
          content: "This form has intentional errors to demonstrate error state styling.",
        },
        {
          type: "form",
          props: {
            className: "space-y-4",
          },
          state: {
            formData: {
              recipientName: "J",
              address: "",
              city: "",
              zipCode: "123",
              shippingType: "",
            },
            errors: {
              recipientName: "Name must be at least 2 characters",
              address: "Address is required",
              city: "City is required",
              zipCode: "Please enter a valid ZIP code",
              shippingType: "Please select a shipping type",
            },
          },
          validation: {
            fields: {
              recipientName: {
                required: "Recipient name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              },
              address: {
                required: "Address is required",
              },
              city: {
                required: "City is required",
              },
              zipCode: {
                required: "ZIP code is required",
                pattern: {
                  value: String.raw`^\d{5}(?:-\d{4})?$`,
                  message: "Please enter a valid ZIP code",
                },
              },
              shippingType: {
                required: "Please select a shipping type",
              },
            },
          },
          children: [
            {
              type: "form-field",
              props: {
                name: "recipientName",
                label: "Recipient Name",
              },
              children: {
                type: "input",
                props: {
                  type: "text",
                  placeholder: "Enter recipient name",
                  defaultValue: "J",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "address",
                label: "Shipping Address",
              },
              children: {
                type: "input",
                props: {
                  type: "text",
                  placeholder: "Enter street address",
                  defaultValue: "",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "city",
                label: "City",
              },
              children: {
                type: "input",
                props: {
                  type: "text",
                  placeholder: "Enter city",
                  defaultValue: "",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "zipCode",
                label: "ZIP Code",
              },
              children: {
                type: "input",
                props: {
                  type: "text",
                  placeholder: "12345",
                  defaultValue: "123",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "shippingType",
                label: "Shipping Type",
              },
              children: {
                type: "radio-group",
                props: {
                  options: [
                    { value: "standard", label: "Standard (5-7 days)" },
                    { value: "express", label: "Express (2-3 days)" },
                    { value: "overnight", label: "Overnight" },
                  ],
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "giftMessage",
                label: "Gift Message (Optional)",
              },
              children: {
                type: "textarea",
                props: {
                  placeholder: "Add a gift message...",
                  rows: 3,
                },
              },
            },
            {
              type: "button",
              props: {
                type: "submit",
                className: "w-full",
                variant: "default",
              },
              content: "Continue to Payment",
            },
          ],
        },
      ],
    },

    // Real-time validation example
    {
      type: "card",
      props: {
        className: "p-6",
      },
      children: [
        {
          type: "heading",
          props: {
            as: "h2",
            className: "text-2xl font-semibold mb-4",
          },
          content: "Real-time Validation",
        },
        {
          type: "text",
          props: {
            className: "text-sm text-gray-600 mb-4",
          },
          content: "This form validates fields as you type.",
        },
        {
          type: "form",
          props: {
            className: "space-y-4",
          },
          state: {
            formData: {},
          },
          validation: {
            mode: "onChange",
            fields: {
              email: {
                required: "Email is required",
                email: true,
              },
              password: {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              },
            },
          },
          children: [
            {
              type: "form-field",
              props: {
                name: "email",
                label: "Email with real-time validation",
              },
              children: {
                type: "input",
                props: {
                  type: "email",
                  placeholder: "Enter your email",
                },
              },
            },
            {
              type: "form-field",
              props: {
                name: "password",
                label: "Password with real-time validation",
              },
              children: {
                type: "input",
                props: {
                  type: "password",
                  placeholder: "Enter your password",
                },
              },
            },
            {
              type: "button",
              props: {
                type: "submit",
                className: "w-full",
                variant: "default",
              },
              content: "Submit",
            },
          ],
        },
      ],
    },
  ],
};

export const FormValidationPage = () => {
  return <div className="max-w-6xl mx-auto py-12 px-4">{render(formValidationExamples)}</div>;
};
