import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";

export function DialogDemo() {
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
        ],
      },
    ],
  };

  // Dialog with form example
  const formDialogSpec: UISpecification = {
    type: "Dialog",
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
                    children: "Name",
                  },
                  {
                    type: "Input",
                    id: "name",
                    defaultValue: "Pedro Duarte",
                    className: "col-span-3",
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
                    children: "Username",
                  },
                  {
                    type: "Input",
                    id: "username",
                    defaultValue: "@peduarte",
                    className: "col-span-3",
                  },
                ],
              },
            ],
          },
          {
            type: "DialogFooter",
            children: {
              type: "Button",
              children: "Save changes",
            },
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
        }
      ]
    }
  ]
}`;

  const formJsonExample = `{
  "type": "Dialog",
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
              "children": "Make changes to your profile here. Click save when you're done."
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
                  "children": "Name"
                },
                {
                  "type": "Input",
                  "id": "name",
                  "defaultValue": "Pedro Duarte",
                  "className": "col-span-3"
                }
              ]
            }
          ]
        },
        {
          "type": "DialogFooter",
          "children": {
            "type": "Button",
            "children": "Save changes"
          }
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
          <h1 className="text-4xl font-bold text-emerald-400">Dialog Component</h1>
          <p className="text-lg text-zinc-300">
            A modal dialog that interrupts the user with important content and expects a response.
          </p>
        </section>

        {/* Basic Dialog Example */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-zinc-100">Basic Dialog</h2>
            <p className="text-zinc-400">A simple dialog with title and description.</p>
          </div>

          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8">
            {render(basicDialogSpec)}
          </div>

          <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4">
            <h3 className="text-sm font-mono text-emerald-400 mb-2">JSON Specification:</h3>
            <pre className="text-xs text-zinc-300 overflow-x-auto whitespace-pre">
              {basicJsonExample}
            </pre>
          </div>
        </section>

        {/* Form Dialog Example */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-zinc-100">Dialog with Form</h2>
            <p className="text-zinc-400">A dialog containing form elements and footer actions.</p>
          </div>

          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8">
            {render(formDialogSpec)}
          </div>

          <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4">
            <h3 className="text-sm font-mono text-emerald-400 mb-2">JSON Specification:</h3>
            <pre className="text-xs text-zinc-300 overflow-x-auto whitespace-pre">
              {formJsonExample}
            </pre>
          </div>
        </section>

        {/* Schema Documentation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Schema Properties</h2>

          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-3">Dialog Properties</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-sm text-zinc-300">type</dt>
                  <dd className="text-sm text-zinc-400 mt-1">Must be &quot;Dialog&quot;</dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-300">open</dt>
                  <dd className="text-sm text-zinc-400 mt-1">
                    boolean - Whether the dialog is open
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-300">defaultOpen</dt>
                  <dd className="text-sm text-zinc-400 mt-1">
                    boolean - Whether the dialog is initially open (default: false)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-300">modal</dt>
                  <dd className="text-sm text-zinc-400 mt-1">
                    boolean - Whether to add backdrop and lock scrolling (default: true)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-300">children</dt>
                  <dd className="text-sm text-zinc-400 mt-1">
                    [DialogTrigger, DialogContent] - Must contain trigger and content components
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-3">
                DialogContent Properties
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-sm text-zinc-300">type</dt>
                  <dd className="text-sm text-zinc-400 mt-1">Must be &quot;DialogContent&quot;</dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-300">overlay</dt>
                  <dd className="text-sm text-zinc-400 mt-1">
                    boolean - Whether to show overlay (default: true)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-300">showClose</dt>
                  <dd className="text-sm text-zinc-400 mt-1">
                    boolean - Whether to show close button (default: true)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm text-zinc-300">className</dt>
                  <dd className="text-sm text-zinc-400 mt-1">
                    string - Additional CSS classes for styling
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
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-3">Accessibility</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>✓ Full keyboard navigation support</li>
                <li>✓ Focus management and trapping</li>
                <li>✓ Screen reader announcements</li>
                <li>✓ Escape key closes dialog</li>
              </ul>
            </div>
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-3">Customization</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>✓ Modal or non-modal behavior</li>
                <li>✓ Customizable content layout</li>
                <li>✓ Optional close button</li>
                <li>✓ Flexible trigger element</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-zinc-800">
          <a
            href="/showcase"
            className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
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
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
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
