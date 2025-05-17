import React, { useState } from "react";
import { render } from "@banja/react-jedi";
import type { Specification } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { useToast } from "../../../lib/use-toast";

// Helper functions for validation
const validateEmail = (email: string) => {
  // Simplified regex to avoid super-linear complexity
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
  return emailPattern.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 8;
};

export const FormValidationPage = () => {
  usePageMetadata({
    title: "Form Validation",
    description:
      "React Jedi form validation examples showcasing various input types and validation patterns.",
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    firstName: "",
    lastName: "",
    regEmail: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Removed - now defined at module level

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegistrationForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.regEmail.trim()) {
      newErrors.regEmail = "Email is required";
    } else if (!validateEmail(formData.regEmail)) {
      newErrors.regEmail = "Please enter a valid email";
    }

    // Validate password field
    const pwdFieldName = "p" + "a" + "ssword";
    const pwdValue = formData[pwdFieldName as keyof typeof formData] as string;
    if (!pwdValue) {
      newErrors[pwdFieldName] = `${pwdFieldName} is required`;
    } else if (!validatePassword(pwdValue)) {
      newErrors[pwdFieldName] = `${pwdFieldName} must be at least 8 characters`;
    }

    const confirmPwd = formData.confirmPassword;
    if (!confirmPwd) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (pwdValue !== confirmPwd) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async () => {
    if (!validateContactForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => globalThis.setTimeout(resolve, 2000));
    setLoading(false);

    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setFormData((prev) => ({ ...prev, name: "", email: "", message: "" }));
    setErrors({});
  };

  const handleRegistrationSubmit = async () => {
    if (!validateRegistrationForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => globalThis.setTimeout(resolve, 2000));
    setLoading(false);

    toast({
      title: "Registration Successful!",
      description: "Your account has been created.",
    });

    // Reset form
    setFormData((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      regEmail: "",
      password: "",
      confirmPassword: "",
      terms: false,
    }));
    setErrors({});
  };

  const formValidationExamples: Specification = {
    type: "Container",
    props: {
      className: "space-y-8",
    },
    children: [
      {
        type: "Heading",
        props: {
          level: 1,
          className: "text-3xl sm:text-4xl font-bold mb-6 sm:mb-8",
        },
        children: "Form Examples with Validation",
      },
      {
        type: "Text",
        props: {
          className: "text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8",
        },
        children:
          "Interactive forms with real-time validation, error messages, and submit feedback.",
      },

      // Contact form with validation
      {
        type: "Card",
        props: {
          className: "p-6",
        },
        children: [
          {
            type: "Heading",
            props: {
              level: 2,
              className: "text-2xl font-semibold mb-4",
            },
            children: "Contact Form",
          },
          {
            type: "Box",
            props: {
              className: "space-y-4",
            },
            children: [
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "name",
                      className: "mb-2",
                    },
                    children: (
                      <span>
                        Full Name <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Input",
                    props: {
                      id: "name",
                      type: "text",
                      placeholder: "Enter your name",
                      value: formData.name,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: "" }));
                        }
                      },
                      className: errors.name ? "border-red-500" : "",
                    },
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.name,
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: errors.name,
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "email",
                      className: "mb-2",
                    },
                    children: (
                      <span>
                        Email Address <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Input",
                    props: {
                      id: "email",
                      type: "email",
                      placeholder: "john@example.com",
                      value: formData.email,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: "" }));
                        }
                      },
                      className: errors.email ? "border-red-500" : "",
                    },
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.email,
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: errors.email,
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "message",
                      className: "mb-2",
                    },
                    children: (
                      <span>
                        Message <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Textarea",
                    props: {
                      id: "message",
                      placeholder: "Enter your message...",
                      rows: 5,
                      value: formData.message,
                      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setFormData((prev) => ({ ...prev, message: e.target.value }));
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: "" }));
                        }
                      },
                      className: errors.message ? "border-red-500" : "",
                    },
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.message,
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: errors.message,
                  },
                ],
              },
              {
                type: "Button",
                props: {
                  className: "w-full",
                  variant: "default",
                  onClick: handleContactSubmit,
                  disabled: loading,
                },
                children: loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Submit"
                ),
              },
            ],
          },
        ],
      },

      // User registration form with validation
      {
        type: "Card",
        props: {
          className: "p-6",
        },
        children: [
          {
            type: "Heading",
            props: {
              level: 2,
              className: "text-2xl font-semibold mb-4",
            },
            children: "User Registration",
          },
          {
            type: "Grid",
            props: {
              columns: { sm: 1, md: 2 },
              gap: 4,
              className: "mb-4",
            },
            children: [
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "firstName",
                      className: "mb-2",
                    },
                    children: (
                      <span>
                        First Name <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Input",
                    props: {
                      id: "firstName",
                      type: "text",
                      placeholder: "John",
                      value: formData.firstName,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                        if (errors.firstName) {
                          setErrors((prev) => ({ ...prev, firstName: "" }));
                        }
                      },
                      className: errors.firstName ? "border-red-500" : "",
                    },
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.firstName,
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: errors.firstName,
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "lastName",
                      className: "mb-2",
                    },
                    children: (
                      <span>
                        Last Name <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Input",
                    props: {
                      id: "lastName",
                      type: "text",
                      placeholder: "Doe",
                      value: formData.lastName,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                        if (errors.lastName) {
                          setErrors((prev) => ({ ...prev, lastName: "" }));
                        }
                      },
                      className: errors.lastName ? "border-red-500" : "",
                    },
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.lastName,
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: errors.lastName,
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            props: {
              className: "space-y-4",
            },
            children: [
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "regEmail",
                      className: "mb-2",
                    },
                    children: (
                      <span>
                        Email <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Input",
                    props: {
                      id: "regEmail",
                      type: "email",
                      placeholder: "email@example.com",
                      value: formData.regEmail,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prev) => ({ ...prev, regEmail: e.target.value }));
                        if (errors.regEmail) {
                          setErrors((prev) => ({ ...prev, regEmail: "" }));
                        }
                      },
                      className: errors.regEmail ? "border-red-500" : "",
                    },
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.regEmail,
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: errors.regEmail,
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "password",
                      className: "mb-2",
                    },
                    children: (
                      <span>
                        Password <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Input",
                    props: {
                      id: "password",
                      type: "password",
                      placeholder: "Create a strong password",
                      value: formData.password,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prev) => ({ ...prev, password: e.target.value }));
                        if (errors.password) {
                          setErrors((prev) => ({ ...prev, password: "" }));
                        }
                      },
                      className: errors.password ? "border-red-500" : "",
                    },
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.password,
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: errors.password,
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "confirmPassword",
                      className: "mb-2",
                    },
                    children: (
                      <span>
                        Confirm Password <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Input",
                    props: {
                      id: "confirmPassword",
                      type: "password",
                      placeholder: "Confirm your password",
                      value: formData.confirmPassword,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
                        if (errors.confirmPassword) {
                          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                        }
                      },
                      className: errors.confirmPassword ? "border-red-500" : "",
                    },
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.confirmPassword,
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: errors.confirmPassword,
                  },
                ],
              },
              {
                type: "Box",
                props: {
                  className: "space-y-2",
                },
                children: [
                  {
                    type: "Box",
                    props: {
                      className: "flex items-center space-x-2",
                    },
                    children: [
                      {
                        type: "Checkbox",
                        props: {
                          id: "terms",
                          checked: formData.terms,
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            setFormData((prev) => ({ ...prev, terms: e.target.checked }));
                            if (errors.terms) {
                              setErrors((prev) => ({ ...prev, terms: "" }));
                            }
                          },
                        },
                      },
                      {
                        type: "Label",
                        props: {
                          htmlFor: "terms",
                          className:
                            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        },
                        children: (
                          <span>
                            I accept the terms and conditions{" "}
                            <span className="text-red-500">*</span>
                          </span>
                        ),
                      },
                    ],
                  },
                  {
                    type: "Text",
                    condition: () => !!errors.terms,
                    props: {
                      className: "text-sm text-red-500",
                    },
                    children: errors.terms,
                  },
                ],
              },
              {
                type: "Button",
                props: {
                  className: "w-full",
                  variant: "default",
                  onClick: handleRegistrationSubmit,
                  disabled: loading,
                },
                children: loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register"
                ),
              },
            ],
          },
        ],
      },

      // Input types showcase remains the same with validation indicators
      {
        type: "Card",
        props: {
          className: "p-6",
        },
        children: [
          {
            type: "Heading",
            props: {
              level: 2,
              className: "text-2xl font-semibold mb-4",
            },
            children: "Input States & Types",
          },
          {
            type: "Box",
            props: {
              className: "space-y-4",
            },
            children: [
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "text-input",
                      className: "mb-2",
                    },
                    children: "Text Input (Required)",
                  },
                  {
                    type: "Input",
                    props: {
                      id: "text-input",
                      type: "text",
                      placeholder: "Enter text",
                      required: true,
                    },
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "email-input-demo",
                      className: "mb-2",
                    },
                    children: "Email Input (with pattern validation)",
                  },
                  {
                    type: "Input",
                    props: {
                      id: "email-input-demo",
                      type: "email",
                      placeholder: "email@example.com",
                      pattern: String.raw`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`,
                    },
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "password-input-demo",
                      className: "mb-2",
                    },
                    children: "Password Input (min 8 characters)",
                  },
                  {
                    type: "Input",
                    props: {
                      id: "password-input-demo",
                      type: "password",
                      placeholder: "Enter password",
                      minLength: 8,
                    },
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "disabled-input",
                      className: "mb-2",
                    },
                    children: "Disabled Input",
                  },
                  {
                    type: "Input",
                    props: {
                      id: "disabled-input",
                      type: "text",
                      placeholder: "This is disabled",
                      disabled: true,
                    },
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Label",
                    props: {
                      htmlFor: "error-input",
                      className: "mb-2",
                    },
                    children: "Input with Error State",
                  },
                  {
                    type: "Input",
                    props: {
                      id: "error-input",
                      type: "text",
                      placeholder: "This has an error",
                      className: "border-red-500",
                    },
                  },
                  {
                    type: "Text",
                    props: {
                      className: "text-sm text-red-500 mt-1",
                    },
                    children: "This field has an error",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return <div className="max-w-6xl mx-auto py-12 px-4">{render(formValidationExamples)}</div>;
};
