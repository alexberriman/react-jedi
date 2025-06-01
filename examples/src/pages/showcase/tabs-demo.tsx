import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../lib/meta";
import { CodeBlock } from "../../components/ui/code-block";

export function TabsDemo() {
  usePageMetadata({
    title: "Tabs Demo",
    description:
      "React Jedi Tabs component demo showcasing tab navigation with various configurations.",
  });
  // Default tabs example
  const defaultTabsSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "account",
    className: "w-[400px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-2",
        children: [
          {
            type: "TabsTrigger",
            value: "account",
            children: "Account",
          },
          {
            type: "TabsTrigger",
            value: "password",
            children: "Password",
          },
        ],
      },
      {
        type: "TabsContent",
        value: "account",
        children: [
          {
            type: "Heading",
            level: 4,
            className: "text-sm font-medium",
            children: "Account Information",
          },
          {
            type: "Text",
            className: "text-sm text-muted-foreground mt-2",
            children: "Update your account settings and profile information here.",
          },
        ],
      },
      {
        type: "TabsContent",
        value: "password",
        children: [
          {
            type: "Heading",
            level: 4,
            className: "text-sm font-medium",
            children: "Password Settings",
          },
          {
            type: "Text",
            className: "text-sm text-muted-foreground mt-2",
            children: "Change your password and security preferences.",
          },
        ],
      },
    ],
  };

  // Vertical tabs example
  const verticalTabsSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "general",
    orientation: "vertical",
    className: "flex w-[600px]",
    children: [
      {
        type: "TabsList",
        className: "flex-col h-auto",
        children: [
          {
            type: "TabsTrigger",
            value: "general",
            className: "w-full justify-start",
            children: "General",
          },
          {
            type: "TabsTrigger",
            value: "profile",
            className: "w-full justify-start",
            children: "Profile",
          },
          {
            type: "TabsTrigger",
            value: "notifications",
            className: "w-full justify-start",
            children: "Notifications",
          },
          {
            type: "TabsTrigger",
            value: "security",
            className: "w-full justify-start",
            children: "Security",
          },
        ],
      },
      {
        type: "Box",
        className: "flex-1 pl-6",
        children: [
          {
            type: "TabsContent",
            value: "general",
            children: [
              {
                type: "Heading",
                level: 4,
                className: "text-sm font-medium",
                children: "General Settings",
              },
              {
                type: "Text",
                className: "text-sm text-muted-foreground mt-2",
                children: "Configure your general application preferences and settings.",
              },
            ],
          },
          {
            type: "TabsContent",
            value: "profile",
            children: [
              {
                type: "Heading",
                level: 4,
                className: "text-sm font-medium",
                children: "Profile Settings",
              },
              {
                type: "Text",
                className: "text-sm text-muted-foreground mt-2",
                children: "Update your profile information and public display details.",
              },
            ],
          },
          {
            type: "TabsContent",
            value: "notifications",
            children: [
              {
                type: "Heading",
                level: 4,
                className: "text-sm font-medium",
                children: "Notification Preferences",
              },
              {
                type: "Text",
                className: "text-sm text-muted-foreground mt-2",
                children: "Manage how and when you receive notifications.",
              },
            ],
          },
          {
            type: "TabsContent",
            value: "security",
            children: [
              {
                type: "Heading",
                level: 4,
                className: "text-sm font-medium",
                children: "Security Settings",
              },
              {
                type: "Text",
                className: "text-sm text-muted-foreground mt-2",
                children: "Configure two-factor authentication and other security settings.",
              },
            ],
          },
        ],
      },
    ],
  };

  // Tabs with disabled state
  const disabledTabsSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "active",
    className: "w-[400px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          {
            type: "TabsTrigger",
            value: "active",
            children: "Active",
          },
          {
            type: "TabsTrigger",
            value: "disabled",
            disabled: true,
            children: "Disabled",
          },
          {
            type: "TabsTrigger",
            value: "pending",
            children: "Pending",
          },
        ],
      },
      {
        type: "TabsContent",
        value: "active",
        children: [
          {
            type: "Heading",
            level: 4,
            className: "text-sm font-medium",
            children: "Active Tab",
          },
          {
            type: "Text",
            className: "text-sm text-muted-foreground mt-2",
            children: "This tab is active and accessible.",
          },
        ],
      },
      {
        type: "TabsContent",
        value: "pending",
        children: [
          {
            type: "Heading",
            level: 4,
            className: "text-sm font-medium",
            children: "Pending Tab",
          },
          {
            type: "Text",
            className: "text-sm text-muted-foreground mt-2",
            children: "This tab shows pending items.",
          },
        ],
      },
    ],
  };

  // Settings tabs with forms
  const settingsTabsSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "personal",
    className: "w-[500px]",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          {
            type: "TabsTrigger",
            value: "personal",
            children: "Personal Info",
          },
          {
            type: "TabsTrigger",
            value: "contact",
            children: "Contact",
          },
          {
            type: "TabsTrigger",
            value: "preferences",
            children: "Preferences",
          },
        ],
      },
      {
        type: "TabsContent",
        value: "personal",
        className: "space-y-4",
        children: [
          {
            type: "Box",
            className: "space-y-2",
            children: [
              {
                type: "Heading",
                level: 4,
                className: "text-sm font-medium",
                children: "Personal Information",
              },
              {
                type: "Text",
                className: "text-sm text-muted-foreground",
                children: "Update your personal details.",
              },
            ],
          },
          {
            type: "Box",
            className: "grid gap-4",
            children: [
              {
                type: "Box",
                className: "grid gap-2",
                children: [
                  {
                    type: "Label",
                    text: "Full Name",
                    htmlFor: "name",
                  },
                  {
                    type: "Input",
                    id: "name",
                    name: "name",
                    placeholder: "John Doe",
                    defaultValue: "John Doe",
                  },
                ],
              },
              {
                type: "Box",
                className: "grid gap-2",
                children: [
                  {
                    type: "Label",
                    text: "Username",
                    htmlFor: "username",
                  },
                  {
                    type: "Input",
                    id: "username",
                    name: "username",
                    placeholder: "@johndoe",
                    defaultValue: "@johndoe",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "TabsContent",
        value: "contact",
        className: "space-y-4",
        children: [
          {
            type: "Box",
            className: "space-y-2",
            children: [
              {
                type: "Heading",
                level: 4,
                className: "text-sm font-medium",
                children: "Contact Information",
              },
              {
                type: "Text",
                className: "text-sm text-muted-foreground",
                children: "How can we reach you?",
              },
            ],
          },
          {
            type: "Box",
            className: "grid gap-4",
            children: [
              {
                type: "Box",
                className: "grid gap-2",
                children: [
                  {
                    type: "Label",
                    text: "Email",
                    htmlFor: "email",
                  },
                  {
                    type: "Input",
                    id: "email",
                    name: "email",
                    inputType: "email",
                    placeholder: "john@example.com",
                    defaultValue: "john@example.com",
                  },
                ],
              },
              {
                type: "Box",
                className: "grid gap-2",
                children: [
                  {
                    type: "Label",
                    text: "Phone",
                    htmlFor: "phone",
                  },
                  {
                    type: "Input",
                    id: "phone",
                    name: "phone",
                    inputType: "tel",
                    placeholder: "+1 (555) 000-0000",
                    defaultValue: "+1 (555) 000-0000",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "TabsContent",
        value: "preferences",
        className: "space-y-4",
        children: [
          {
            type: "Box",
            className: "space-y-2",
            children: [
              {
                type: "Heading",
                level: 4,
                className: "text-sm font-medium",
                children: "Preferences",
              },
              {
                type: "Text",
                className: "text-sm text-muted-foreground",
                children: "Customize your experience.",
              },
            ],
          },
          {
            type: "Box",
            className: "grid gap-4",
            children: [
              {
                type: "Box",
                className: "flex items-center justify-between",
                children: [
                  {
                    type: "Label",
                    text: "Email notifications",
                    htmlFor: "notifications",
                  },
                  {
                    type: "Switch",
                    id: "notifications",
                    defaultChecked: true,
                  },
                ],
              },
              {
                type: "Box",
                className: "flex items-center justify-between",
                children: [
                  {
                    type: "Label",
                    text: "Marketing emails",
                    htmlFor: "marketing",
                  },
                  {
                    type: "Switch",
                    id: "marketing",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Tabs Component Demo</h2>
        <p className="text-gray-600 mb-8">
          A set of layered sections of content—known as tab panels—that are displayed one at a time.
        </p>
      </div>

      {/* Default Tabs */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Default Tabs</h3>
        <div className="flex justify-center">{render(defaultTabsSpec)}</div>
      </div>

      {/* Vertical Tabs */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Vertical Tabs</h3>
        <div className="flex justify-center">{render(verticalTabsSpec)}</div>
      </div>

      {/* Tabs with Disabled State */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tabs with Disabled State</h3>
        <div className="flex justify-center">{render(disabledTabsSpec)}</div>
      </div>

      {/* Settings Tabs with Forms */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Settings Tabs with Forms</h3>
        <div className="flex justify-center">{render(settingsTabsSpec)}</div>
      </div>

      {/* JSON Specification Example */}
      <div className="space-y-4 mt-12">
        <h3 className="text-xl font-semibold">JSON Specification Example</h3>
        <CodeBlock language="json" className="mt-2">
                {JSON.stringify(defaultTabsSpec, null, 2)}
              </CodeBlock>
      </div>
    </div>
  );
}
