import { render } from "@banja/react-jedi";
import type { Specification } from "@banja/react-jedi";

// Simplified form examples that work with the JSON structure
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
        className: "text-4xl font-bold mb-8",
      },
      children: "Form Examples",
    },

    {
      type: "Text",
      props: {
        className: "text-lg text-gray-600 mb-8",
      },
      children: "Examples showcasing different input types, states, and layouts.",
    },

    // Basic form example
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
                  children: "Full Name",
                },
                {
                  type: "Input",
                  props: {
                    id: "name",
                    type: "text",
                    placeholder: "Enter your name",
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
                    htmlFor: "email",
                    className: "mb-2",
                  },
                  children: "Email Address",
                },
                {
                  type: "Input",
                  props: {
                    id: "email",
                    type: "email",
                    placeholder: "john@example.com",
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
                    htmlFor: "message",
                    className: "mb-2",
                  },
                  children: "Message",
                },
                {
                  type: "Textarea",
                  props: {
                    id: "message",
                    placeholder: "Enter your message...",
                    rows: 5,
                  },
                },
              ],
            },
            {
              type: "Button",
              props: {
                className: "w-full",
                variant: "default",
              },
              children: "Submit",
            },
          ],
        },
      ],
    },

    // User registration form
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
                  children: "First Name",
                },
                {
                  type: "Input",
                  props: {
                    id: "firstName",
                    type: "text",
                    placeholder: "John",
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
                    htmlFor: "lastName",
                    className: "mb-2",
                  },
                  children: "Last Name",
                },
                {
                  type: "Input",
                  props: {
                    id: "lastName",
                    type: "text",
                    placeholder: "Doe",
                  },
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
                  children: "Email",
                },
                {
                  type: "Input",
                  props: {
                    id: "regEmail",
                    type: "email",
                    placeholder: "email@example.com",
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
                    htmlFor: "password",
                    className: "mb-2",
                  },
                  children: "Password",
                },
                {
                  type: "Input",
                  props: {
                    id: "password",
                    type: "password",
                    placeholder: "Create a strong password",
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
                    htmlFor: "confirmPassword",
                    className: "mb-2",
                  },
                  children: "Confirm Password",
                },
                {
                  type: "Input",
                  props: {
                    id: "confirmPassword",
                    type: "password",
                    placeholder: "Confirm your password",
                  },
                },
              ],
            },
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
                  },
                },
                {
                  type: "Label",
                  props: {
                    htmlFor: "terms",
                    className:
                      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  },
                  children: "I accept the terms and conditions",
                },
              ],
            },
            {
              type: "Button",
              props: {
                className: "w-full",
                variant: "default",
              },
              children: "Register",
            },
          ],
        },
      ],
    },

    // Different input types
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
          children: "Input Types Showcase",
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
                  children: "Text Input",
                },
                {
                  type: "Input",
                  props: {
                    id: "text-input",
                    type: "text",
                    placeholder: "Enter text",
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
                    htmlFor: "email-input",
                    className: "mb-2",
                  },
                  children: "Email Input",
                },
                {
                  type: "Input",
                  props: {
                    id: "email-input",
                    type: "email",
                    placeholder: "email@example.com",
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
                    htmlFor: "password-input",
                    className: "mb-2",
                  },
                  children: "Password Input",
                },
                {
                  type: "Input",
                  props: {
                    id: "password-input",
                    type: "password",
                    placeholder: "Enter password",
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
                    htmlFor: "number-input",
                    className: "mb-2",
                  },
                  children: "Number Input",
                },
                {
                  type: "Input",
                  props: {
                    id: "number-input",
                    type: "number",
                    placeholder: "Enter number",
                    min: 0,
                    max: 100,
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
                    htmlFor: "date-input",
                    className: "mb-2",
                  },
                  children: "Date Input",
                },
                {
                  type: "Input",
                  props: {
                    id: "date-input",
                    type: "date",
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
                    htmlFor: "file-input",
                    className: "mb-2",
                  },
                  children: "File Input",
                },
                {
                  type: "Input",
                  props: {
                    id: "file-input",
                    type: "file",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Choice inputs
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
          children: "Choice Inputs",
        },
        {
          type: "Box",
          props: {
            className: "space-y-6",
          },
          children: [
            // Checkboxes
            {
              type: "Box",
              children: [
                {
                  type: "Label",
                  props: {
                    className: "mb-3 font-medium",
                  },
                  children: "Checkboxes",
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
                            id: "option1",
                          },
                        },
                        {
                          type: "Label",
                          props: {
                            htmlFor: "option1",
                            className:
                              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                          },
                          children: "Option 1",
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "flex items-center space-x-2",
                      },
                      children: [
                        {
                          type: "Checkbox",
                          props: {
                            id: "option2",
                            defaultChecked: true,
                          },
                        },
                        {
                          type: "Label",
                          props: {
                            htmlFor: "option2",
                            className:
                              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                          },
                          children: "Option 2 (pre-checked)",
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "flex items-center space-x-2",
                      },
                      children: [
                        {
                          type: "Checkbox",
                          props: {
                            id: "option3",
                            disabled: true,
                          },
                        },
                        {
                          type: "Label",
                          props: {
                            htmlFor: "option3",
                            className:
                              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                          },
                          children: "Option 3 (disabled)",
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Radio buttons
            {
              type: "Box",
              children: [
                {
                  type: "Label",
                  props: {
                    className: "mb-3 font-medium",
                  },
                  children: "Radio Buttons",
                },
                {
                  type: "RadioGroup",
                  props: {
                    defaultValue: "comfortable",
                  },
                  children: [
                    {
                      type: "Box",
                      props: {
                        className: "flex items-center space-x-2",
                      },
                      children: [
                        {
                          type: "RadioGroupItem",
                          props: {
                            value: "default",
                            id: "r1",
                          },
                        },
                        {
                          type: "Label",
                          props: {
                            htmlFor: "r1",
                            className: "font-normal",
                          },
                          children: "Default",
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "flex items-center space-x-2",
                      },
                      children: [
                        {
                          type: "RadioGroupItem",
                          props: {
                            value: "comfortable",
                            id: "r2",
                          },
                        },
                        {
                          type: "Label",
                          props: {
                            htmlFor: "r2",
                            className: "font-normal",
                          },
                          children: "Comfortable",
                        },
                      ],
                    },
                    {
                      type: "Box",
                      props: {
                        className: "flex items-center space-x-2",
                      },
                      children: [
                        {
                          type: "RadioGroupItem",
                          props: {
                            value: "compact",
                            id: "r3",
                          },
                        },
                        {
                          type: "Label",
                          props: {
                            htmlFor: "r3",
                            className: "font-normal",
                          },
                          children: "Compact",
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Select dropdown
            {
              type: "Box",
              children: [
                {
                  type: "Label",
                  props: {
                    htmlFor: "select-demo",
                    className: "mb-2",
                  },
                  children: "Select Dropdown",
                },
                {
                  type: "Select",
                  children: [
                    {
                      type: "SelectTrigger",
                      props: {
                        id: "select-demo",
                      },
                      children: {
                        type: "SelectValue",
                        props: {
                          placeholder: "Select an option",
                        },
                      },
                    },
                    {
                      type: "SelectContent",
                      children: [
                        {
                          type: "SelectItem",
                          props: {
                            value: "apple",
                          },
                          children: "Apple",
                        },
                        {
                          type: "SelectItem",
                          props: {
                            value: "banana",
                          },
                          children: "Banana",
                        },
                        {
                          type: "SelectItem",
                          props: {
                            value: "orange",
                          },
                          children: "Orange",
                        },
                      ],
                    },
                  ],
                },
              ],
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
