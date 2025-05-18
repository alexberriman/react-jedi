import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { useState } from "react";
import { PageHeader } from "../../components/ui/page-header";

export function OverlayInteractivePage() {
  const [dialogState, setDialogState] = useState<{
    confirm: boolean;
    profile: boolean;
    deletion: boolean;
  }>({
    confirm: false,
    profile: false,
    deletion: false,
  });

  const [sheetState, setSheetState] = useState<{
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  }>({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const [alertDialogState, setAlertDialogState] = useState(false);
  const [drawerState, setDrawerState] = useState(false);

  // Dialog Examples
  const confirmDialog: UISpecification = {
    type: "Dialog",
    open: dialogState.confirm,
    onOpenChange: (open: boolean) => setDialogState((prev) => ({ ...prev, confirm: open })),
    children: [
      {
        type: "DialogTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "default",
          className: "bg-emerald-600 hover:bg-emerald-700",
          children: "Confirm Action Dialog",
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
                children: "Confirm Your Action",
              },
              {
                type: "DialogDescription",
                children: "Are you sure you want to proceed? This action cannot be undone.",
              },
            ],
          },
          {
            type: "DialogFooter",
            className: "mt-6",
            children: [
              {
                type: "Button",
                variant: "outline",
                onClick: () => setDialogState((prev) => ({ ...prev, confirm: false })),
                children: "Cancel",
              },
              {
                type: "Button",
                variant: "default",
                className: "bg-emerald-600 hover:bg-emerald-700",
                onClick: () => {
                  // Handle confirmation
                  setDialogState((prev) => ({ ...prev, confirm: false }));
                },
                children: "Confirm",
              },
            ],
          },
        ],
      },
    ],
  };

  const profileDialog: UISpecification = {
    type: "Dialog",
    open: dialogState.profile,
    onOpenChange: (open: boolean) => setDialogState((prev) => ({ ...prev, profile: open })),
    children: [
      {
        type: "DialogTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Edit Profile Dialog",
        },
      },
      {
        type: "DialogContent",
        className: "sm:max-w-[600px]",
        children: [
          {
            type: "DialogHeader",
            children: [
              {
                type: "DialogTitle",
                children: "Edit Profile",
              },
              {
                type: "DialogDescription",
                children: "Update your profile information and click save.",
              },
            ],
          },
          {
            type: "Box",
            className: "space-y-6 py-6",
            children: [
              {
                type: "Box",
                className: "flex items-center gap-4",
                children: [
                  {
                    type: "Avatar",
                    className: "h-20 w-20",
                    children: [
                      {
                        type: "AvatarImage",
                        src: "https://github.com/shadcn.png",
                        alt: "User avatar",
                      },
                      {
                        type: "AvatarFallback",
                        children: "JD",
                      },
                    ],
                  },
                  {
                    type: "Button",
                    variant: "outline",
                    size: "sm",
                    children: "Change Avatar",
                  },
                ],
              },
              {
                type: "Box",
                className: "grid gap-4",
                children: [
                  {
                    type: "Box",
                    className: "grid grid-cols-2 gap-4",
                    children: [
                      {
                        type: "Box",
                        className: "space-y-2",
                        children: [
                          {
                            type: "Label",
                            htmlFor: "first-name",
                            children: "First Name",
                          },
                          {
                            type: "Input",
                            id: "first-name",
                            defaultValue: "John",
                          },
                        ],
                      },
                      {
                        type: "Box",
                        className: "space-y-2",
                        children: [
                          {
                            type: "Label",
                            htmlFor: "last-name",
                            children: "Last Name",
                          },
                          {
                            type: "Input",
                            id: "last-name",
                            defaultValue: "Doe",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "space-y-2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "email",
                        children: "Email",
                      },
                      {
                        type: "Input",
                        id: "email",
                        inputType: "email",
                        defaultValue: "john.doe@example.com",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "space-y-2",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "bio",
                        children: "Bio",
                      },
                      {
                        type: "Textarea",
                        id: "bio",
                        rows: 4,
                        placeholder: "Tell us about yourself...",
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
                onClick: () => setDialogState((prev) => ({ ...prev, profile: false })),
                children: "Cancel",
              },
              {
                type: "Button",
                onClick: () => setDialogState((prev) => ({ ...prev, profile: false })),
                children: "Save Changes",
              },
            ],
          },
        ],
      },
    ],
  };

  // Sheet Examples
  const leftSheet: UISpecification = {
    type: "Sheet",
    open: sheetState.left,
    onOpenChange: (open: boolean) => setSheetState((prev) => ({ ...prev, left: open })),
    children: [
      {
        type: "SheetTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          className: "border-purple-500/30 text-purple-400 hover:bg-purple-500/10",
          children: "Open Left Sheet",
        },
      },
      {
        type: "SheetContent",
        side: "left",
        className: "w-[400px] sm:w-[540px]",
        children: [
          {
            type: "SheetHeader",
            children: [
              {
                type: "SheetTitle",
                children: "Settings Menu",
              },
              {
                type: "SheetDescription",
                children: "Configure your application preferences and settings.",
              },
            ],
          },
          {
            type: "Box",
            className: "py-6 space-y-6",
            children: [
              {
                type: "Box",
                className: "space-y-3",
                children: [
                  {
                    type: "Text",
                    className: "text-sm font-medium",
                    children: "Appearance",
                  },
                  {
                    type: "Box",
                    className: "flex items-center justify-between",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "dark-mode",
                        children: "Dark Mode",
                      },
                      {
                        type: "Switch",
                        id: "dark-mode",
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
                        htmlFor: "reduced-motion",
                        children: "Reduced Motion",
                      },
                      {
                        type: "Switch",
                        id: "reduced-motion",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Separator",
              },
              {
                type: "Box",
                className: "space-y-3",
                children: [
                  {
                    type: "Text",
                    className: "text-sm font-medium",
                    children: "Notifications",
                  },
                  {
                    type: "Box",
                    className: "flex items-center justify-between",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "email-notifications",
                        children: "Email Notifications",
                      },
                      {
                        type: "Switch",
                        id: "email-notifications",
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
                        htmlFor: "push-notifications",
                        children: "Push Notifications",
                      },
                      {
                        type: "Switch",
                        id: "push-notifications",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "SheetFooter",
            children: {
              type: "Button",
              onClick: () => setSheetState((prev) => ({ ...prev, left: false })),
              children: "Close Settings",
            },
          },
        ],
      },
    ],
  };

  const bottomSheet: UISpecification = {
    type: "Sheet",
    open: sheetState.bottom,
    onOpenChange: (open: boolean) => setSheetState((prev) => ({ ...prev, bottom: open })),
    children: [
      {
        type: "SheetTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          className: "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10",
          children: "Open Bottom Sheet",
        },
      },
      {
        type: "SheetContent",
        side: "bottom",
        className: "h-[400px]",
        children: [
          {
            type: "SheetHeader",
            children: [
              {
                type: "SheetTitle",
                children: "Share This Page",
              },
              {
                type: "SheetDescription",
                children: "Choose how you'd like to share this content.",
              },
            ],
          },
          {
            type: "Box",
            className: "grid grid-cols-3 gap-4 py-6",
            children: [
              {
                type: "Button",
                variant: "outline",
                className: "h-24 flex flex-col items-center justify-center gap-2",
                children: [
                  {
                    type: "Box",
                    className: "h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center",
                    children: "📧",
                  },
                  {
                    type: "Text",
                    className: "text-sm",
                    children: "Email",
                  },
                ],
              },
              {
                type: "Button",
                variant: "outline",
                className: "h-24 flex flex-col items-center justify-center gap-2",
                children: [
                  {
                    type: "Box",
                    className: "h-8 w-8 rounded-full bg-sky-400 flex items-center justify-center",
                    children: "🐦",
                  },
                  {
                    type: "Text",
                    className: "text-sm",
                    children: "Twitter",
                  },
                ],
              },
              {
                type: "Button",
                variant: "outline",
                className: "h-24 flex flex-col items-center justify-center gap-2",
                children: [
                  {
                    type: "Box",
                    className:
                      "h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center",
                    children: "📘",
                  },
                  {
                    type: "Text",
                    className: "text-sm",
                    children: "Facebook",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Alert Dialog Example
  const deleteAlertDialog: UISpecification = {
    type: "AlertDialog",
    open: alertDialogState,
    onOpenChange: setAlertDialogState,
    children: [
      {
        type: "AlertDialogTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "destructive",
          children: "Delete Account",
        },
      },
      {
        type: "AlertDialogContent",
        children: [
          {
            type: "AlertDialogHeader",
            children: [
              {
                type: "AlertDialogTitle",
                children: "Are you absolutely sure?",
              },
              {
                type: "AlertDialogDescription",
                children:
                  "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
              },
            ],
          },
          {
            type: "AlertDialogFooter",
            children: [
              {
                type: "AlertDialogCancel",
                children: "Cancel",
              },
              {
                type: "AlertDialogAction",
                className: "bg-red-600 hover:bg-red-700",
                onClick: () => {
                  console.log("Account deleted");
                  setAlertDialogState(false);
                },
                children: "Yes, delete my account",
              },
            ],
          },
        ],
      },
    ],
  };

  // Drawer Example
  const mobileDrawer: UISpecification = {
    type: "Drawer",
    open: drawerState,
    onOpenChange: setDrawerState,
    children: [
      {
        type: "DrawerTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          className: "border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10",
          children: "Open Mobile Drawer",
        },
      },
      {
        type: "DrawerContent",
        children: [
          {
            type: "DrawerHeader",
            children: [
              {
                type: "DrawerTitle",
                children: "Navigation Menu",
              },
              {
                type: "DrawerDescription",
                children: "Access main sections of the application.",
              },
            ],
          },
          {
            type: "Box",
            className: "px-4 py-4 space-y-2",
            children: [
              {
                type: "Button",
                variant: "ghost",
                className: "w-full justify-start",
                children: "🏠 Home",
              },
              {
                type: "Button",
                variant: "ghost",
                className: "w-full justify-start",
                children: "📊 Dashboard",
              },
              {
                type: "Button",
                variant: "ghost",
                className: "w-full justify-start",
                children: "👤 Profile",
              },
              {
                type: "Button",
                variant: "ghost",
                className: "w-full justify-start",
                children: "⚙️ Settings",
              },
            ],
          },
          {
            type: "DrawerFooter",
            children: [
              {
                type: "Button",
                variant: "outline",
                onClick: () => setDrawerState(false),
                children: "Close",
              },
            ],
          },
        ],
      },
    ],
  };

  // Popover Examples
  const basicPopover: UISpecification = {
    type: "Popover",
    children: [
      {
        type: "PopoverTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          className: "border-violet-500/30 text-violet-400 hover:bg-violet-500/10",
          children: "Show Popover",
        },
      },
      {
        type: "PopoverContent",
        className: "w-80",
        children: [
          {
            type: "Text",
            className: "font-semibold mb-2",
            children: "Popover Content",
          },
          {
            type: "Text",
            className: "text-sm text-gray-600 dark:text-gray-400",
            children:
              "This is a popover with some useful information. It can contain any content you need.",
          },
          {
            type: "Box",
            className: "mt-4 flex gap-2",
            children: [
              {
                type: "Button",
                size: "sm",
                variant: "outline",
                children: "Cancel",
              },
              {
                type: "Button",
                size: "sm",
                children: "Confirm",
              },
            ],
          },
        ],
      },
    ],
  };

  // HoverCard Example
  const hoverCard: UISpecification = {
    type: "HoverCard",
    children: [
      {
        type: "HoverCardTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "link",
          className: "text-amber-400 hover:text-amber-300",
          children: "Hover for more info",
        },
      },
      {
        type: "HoverCardContent",
        className: "w-80",
        children: [
          {
            type: "Box",
            className: "flex items-start gap-4",
            children: [
              {
                type: "Avatar",
                children: [
                  {
                    type: "AvatarImage",
                    src: "https://github.com/shadcn.png",
                  },
                  {
                    type: "AvatarFallback",
                    children: "SC",
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-1",
                children: [
                  {
                    type: "Text",
                    className: "font-semibold",
                    children: "shadcn/ui",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-zinc-600 dark:text-zinc-400",
                    children:
                      "Beautifully designed components built with Radix UI and Tailwind CSS.",
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
    <div className="flex flex-col">
      <PageHeader 
        title="Interactive Overlay Components"
        description="Explore our comprehensive collection of overlay components with interactive states. Click on any component to see it in action!"
      />
      
      <div className="container mx-auto px-4 py-8">

          {/* Dialogs Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Dialogs</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Modal dialogs for important interactions that require user attention.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-600 dark:text-emerald-400">
                  Confirmation Dialog
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  A simple dialog for confirming user actions.
                </p>
                {render(confirmDialog)}
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-600 dark:text-emerald-400">
                  Profile Edit Dialog
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Complex dialog with form elements and validation.
                </p>
                {render(profileDialog)}
              </div>
            </div>
          </section>

          {/* Sheets Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Sheets</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
            Slide-out panels that overlay the main content from different directions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">Settings Sheet (Left)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A settings panel that slides in from the left side.
              </p>
              {render(leftSheet)}
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">Share Sheet (Bottom)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A share panel that slides up from the bottom.
              </p>
              {render(bottomSheet)}
            </div>
          </div>
        </section>

          {/* Alert Dialogs Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Alert Dialogs</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
            Critical confirmations that require explicit user acknowledgment.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-3 text-red-400">Destructive Alert</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              A dangerous action confirmation with destructive styling.
            </p>
            {render(deleteAlertDialog)}
          </div>
        </section>

          {/* Drawer Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Drawer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
            Mobile-friendly navigation drawer that slides in from the side.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-3 text-indigo-400">Navigation Drawer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              A mobile navigation drawer with menu items.
            </p>
            {render(mobileDrawer)}
          </div>
        </section>

          {/* Popovers and HoverCards Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Popovers & HoverCards</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
            Contextual overlays that appear on interaction with triggers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-3 text-violet-400">Popover</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Click-triggered overlay with custom content.
              </p>
              {render(basicPopover)}
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-3 text-amber-400">HoverCard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Hover-triggered overlay with rich content.
              </p>
              {render(hoverCard)}
            </div>
          </div>
        </section>

          {/* State Management Info */}
          <section className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-700/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Interactive State Management</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
            All overlay components in this showcase are fully interactive with controlled state
            management. Each component responds to user interactions and maintains its own state.
          </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-400 mb-2">Features</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>✓ Controlled open/close states</li>
                <li>✓ Form interactions within overlays</li>
                <li>✓ Keyboard navigation support</li>
                <li>✓ Focus management</li>
              </ul>
            </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-400 mb-2">Accessibility</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>✓ ARIA attributes</li>
                <li>✓ Escape key to close</li>
                <li>✓ Focus trapping</li>
                <li>✓ Screen reader support</li>
              </ul>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <nav className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <a
              href="/showcase"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
            href="/showcase/interactive"
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:text-emerald-300 transition-colors"
          >
            Interactive Components
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
          </nav>
      </div>
    </div>
  );
}
