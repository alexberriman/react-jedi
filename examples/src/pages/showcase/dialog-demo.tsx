import React, { useState } from "react";
import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../lib/meta";
import { useToast } from "../../lib/use-toast";

export function DialogDemo() {
  usePageMetadata({
    title: "Dialog Demo",
    description: "React Jedi Dialog component demo with modal overlays and interactive dialogs.",
  });

  // State for form dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Pedro Duarte",
    username: "@peduarte",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!formData.username.startsWith("@")) {
      newErrors.username = "Username must start with @";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => globalThis.setTimeout(resolve, 1500));
    setLoading(false);

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });

    setDialogOpen(false);
  };

  // Basic dialog example
  const basicDialogSpec: UISpecification = {
    type: "Dialog",
    children: [
      {
        type: "DialogTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Open Dialog",
        },
      },
      {
        type: "DialogContent",
        children: [
          {
            type: "DialogHeader",
            children: [
              {
                type: "DialogTitle",
                children: "Are you absolutely sure?",
              },
              {
                type: "DialogDescription",
                children:
                  "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
              },
            ],
          },
          {
            type: "DialogFooter",
            children: [
              {
                type: "Button",
                variant: "outline",
                children: "Cancel",
              },
              {
                type: "Button",
                variant: "destructive",
                children: "Delete Account",
              },
            ],
          },
        ],
      },
    ],
  };

  // Dialog with form example - enhanced with validation
  const formDialogSpec: UISpecification = {
    type: "Dialog",
    open: dialogOpen,
    onOpenChange: setDialogOpen,
    children: [
      {
        type: "DialogTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Edit Profile",
        },
      },
      {
        type: "DialogContent",
        className: "sm:max-w-[425px]",
        children: [
          {
            type: "DialogHeader",
            children: [
              {
                type: "DialogTitle",
                children: "Edit profile",
              },
              {
                type: "DialogDescription",
                children: "Make changes to your profile here. Click save when you&apos;re done.",
              },
            ],
          },
          {
            type: "Box",
            className: "grid gap-4 py-4",
            children: [
              {
                type: "Box",
                className: "grid grid-cols-4 items-center gap-4",
                children: [
                  {
                    type: "Label",
                    htmlFor: "name",
                    className: "text-right",
                    children: (
                      <span>
                        Name <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Box",
                    className: "col-span-3 space-y-1",
                    children: [
                      {
                        type: "Input",
                        id: "name",
                        value: formData.name,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) {
                            setErrors((prev) => ({ ...prev, name: "" }));
                          }
                        },
                        className: errors.name ? "border-red-500" : "",
                      },
                      {
                        type: "Text",
                        condition: () => !!errors.name,
                        className: "text-sm text-red-500",
                        children: errors.name,
                      },
                    ],
                  },
                ],
              },
              {
                type: "Box",
                className: "grid grid-cols-4 items-center gap-4",
                children: [
                  {
                    type: "Label",
                    htmlFor: "username",
                    className: "text-right",
                    children: (
                      <span>
                        Username <span className="text-red-500">*</span>
                      </span>
                    ),
                  },
                  {
                    type: "Box",
                    className: "col-span-3 space-y-1",
                    children: [
                      {
                        type: "Input",
                        id: "username",
                        value: formData.username,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          setFormData((prev) => ({ ...prev, username: e.target.value }));
                          if (errors.username) {
                            setErrors((prev) => ({ ...prev, username: "" }));
                          }
                        },
                        className: errors.username ? "border-red-500" : "",
                      },
                      {
                        type: "Text",
                        condition: () => !!errors.username,
                        className: "text-sm text-red-500",
                        children: errors.username,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "DialogFooter",
            children: [
              {
                type: "Button",
                variant: "outline",
                onClick: () => setDialogOpen(false),
                children: "Cancel",
              },
              {
                type: "Button",
                onClick: handleSave,
                disabled: loading,
                children: loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
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
                    Saving...
                  </span>
                ) : (
                  "Save changes"
                ),
              },
            ],
          },
        ],
      },
    ],
  };

  // JSON Examples
  const basicJsonExample = `{
  "type": "Dialog",
  "children": [
    {
      "type": "DialogTrigger",
      "asChild": true,
      "children": {
        "type": "Button",
        "variant": "outline",
        "children": "Open Dialog"
      }
    },
    {
      "type": "DialogContent",
      "children": [
        {
          "type": "DialogHeader",
          "children": [
            {
              "type": "DialogTitle",
              "children": "Are you absolutely sure?"
            },
            {
              "type": "DialogDescription", 
              "children": "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            }
          ]
        },
        {
          "type": "DialogFooter",
          "children": [
            {
              "type": "Button",
              "variant": "outline",
              "children": "Cancel"
            },
            {
              "type": "Button",
              "variant": "destructive",
              "children": "Delete Account"
            }
          ]
        }
      ]
    }
  ]
}`;

  const formJsonExample = `{
  "type": "Dialog",
  "open": dialogOpen,
  "onOpenChange": setDialogOpen,
  "children": [
    {
      "type": "DialogTrigger",
      "asChild": true,
      "children": {
        "type": "Button",
        "variant": "outline",
        "children": "Edit Profile"
      }
    },
    {
      "type": "DialogContent",
      "className": "sm:max-w-[425px]",
      "children": [
        {
          "type": "DialogHeader",
          "children": [
            {
              "type": "DialogTitle",
              "children": "Edit profile"
            },
            {
              "type": "DialogDescription",
              "children": "Make changes to your profile here. Click save when you&apos;re done."
            }
          ]
        },
        {
          "type": "Box",
          "className": "grid gap-4 py-4",
          "children": [
            {
              "type": "Box",
              "className": "grid grid-cols-4 items-center gap-4",
              "children": [
                {
                  "type": "Label",
                  "htmlFor": "name",
                  "className": "text-right",
                  "children": "Name *"
                },
                {
                  "type": "Box",
                  "className": "col-span-3 space-y-1",
                  "children": [
                    {
                      "type": "Input",
                      "id": "name",
                      "value": formData.name,
                      "onChange": handleNameChange,
                      "className": errors.name ? "border-red-500" : ""
                    },
                    {
                      "type": "Text",
                      "condition": () => !!errors.name,
                      "className": "text-sm text-red-500",
                      "children": errors.name
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "DialogFooter",
          "children": [
            {
              "type": "Button",
              "variant": "outline",
              "onClick": () => setDialogOpen(false),
              "children": "Cancel"
            },
            {
              "type": "Button",
              "onClick": handleSave,
              "disabled": loading,
              "children": loading ? "Saving..." : "Save changes"
            }
          ]
        }
      ]
    }
  ]
}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Component Overview */}
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
            Dialog Component
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            A modal dialog that interrupts the user with important content and expects a response.
          </p>
        </section>

        {/* Basic Dialog Example */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-zinc-100">Basic Dialog</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              A simple dialog with title, description, and action buttons.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
            {render(basicDialogSpec)}
          </div>

          <div className="bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-2">
              JSON Specification:
            </h3>
            <pre className="text-xs text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-pre">
              {basicJsonExample}
            </pre>
          </div>
        </section>

        {/* Form Dialog Example */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-zinc-100">
              Dialog with Form Validation
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              A dialog containing form elements with validation, loading states, and toast
              notifications.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
            {render(formDialogSpec)}
          </div>

          <div className="bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-2">
              JSON Specification:
            </h3>
            <pre className="text-xs text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-pre">
              {formJsonExample}
            </pre>
          </div>
        </section>

        {/* Schema Documentation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Schema Properties</h2>

          <div className="space-y-4">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Dialog Properties
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">type</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Must be &quot;Dialog&quot;
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">open</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    boolean - Whether the dialog is open
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    defaultOpen
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    boolean - Whether the dialog is initially open (default: false)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">modal</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    boolean - Whether to add backdrop and lock scrolling (default: true)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">children</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    [DialogTrigger, DialogContent] - Must contain trigger and content components
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Form Validation Features
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">validation</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Real-time field validation with error messages
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    loading states
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Visual feedback during form submission
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    toast notifications
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Success and error notifications using toast
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    error styling
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Visual indicators for fields with validation errors
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Component Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Accessibility
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>✓ Full keyboard navigation support</li>
                <li>✓ Focus management and trapping</li>
                <li>✓ Screen reader announcements</li>
                <li>✓ Escape key closes dialog</li>
              </ul>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Form Handling
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>✓ Client-side validation</li>
                <li>✓ Loading state management</li>
                <li>✓ Error message display</li>
                <li>✓ Success notifications</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href="/showcase"
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:text-emerald-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Showcase
          </a>

          <a
            href="/documentation"
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:text-emerald-300 transition-colors"
          >
            View Documentation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
