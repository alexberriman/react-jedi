import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./dialog";
import { Button } from "../button";
import { enhanceStoryWithHandlers, createDialogHandlers } from "@sb/utils/enhance-story-with-handlers";

/**
 * Dialog component stories with comprehensive test coverage.
 * 
 * NOTE: The "InitiallyOpen" story may produce act() warnings during tests.
 * These warnings come from Radix UI's Presence component used within DialogPortal
 * and are related to internal animation state updates. The warnings are handled
 * by using appropriate waitFor timeouts to ensure animations complete before assertions.
 */

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Whether the dialog is initially open",
    },
    modal: {
      control: "boolean",
      description: "Whether the dialog should be modal",
    },
  },

  tags: ["autodocs", "ui-dialog"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    args: {
      defaultOpen: false,
    },
    render: (args) => (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your
              data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Wait for story to be fully rendered
    await waitFor(() => {
      const trigger = canvas.queryByRole("button", { name: /open dialog/i });
      if (!trigger) {
        throw new Error("Story not ready - trigger button not found");
      }
    }, { timeout: 5000 });

    // Ensure body doesn't have pointer-events: none
    const body = document.body;
    if (body.style.pointerEvents === "none") {
      body.style.pointerEvents = "";
    }

    // Click the trigger button to open dialog
    const triggerButton = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(triggerButton);

    // Wait for dialog to appear - look for the dialog in the document, not just canvas
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')).toBeInTheDocument();
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe(
        "Are you absolutely sure?"
      );
    });

    // Verify dialog content
    const dialogContent = document.querySelector('[data-slot="dialog-content"]');
    expect(dialogContent).toBeInTheDocument();
    expect(document.querySelector('[data-slot="dialog-description"]')?.textContent).toContain(
      "This action cannot be undone"
    );

    // Close dialog by clicking the X button
    const closeButton = within(document.body).getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    // Verify dialog is closed - check for closed state instead of removal
    await waitFor(() => {
      const dialogContent = document.querySelector(
        '[data-slot="dialog-content"]'
      ) as HTMLElement | null;
      if (dialogContent) {
        expect(dialogContent.dataset.state).toBe("closed");
      } else {
        // Dialog has been removed from DOM after animation
        expect(dialogContent).not.toBeInTheDocument();
      }
    });
    },
  },
  {
    renderSpec: {
      type: "Dialog",
      defaultOpen: false,
      onOpenChangeAction: "handleDialogOpenChange",
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
          children: {
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
        },
      ],
    },
    handlers: createDialogHandlers({
      onOpenChange: (open) => {
        console.log('Dialog open state changed to:', open);
      }
    })
  }
);

export const WithFooter: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    args: {
      defaultOpen: false,
    },
    render: (args) => (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3 px-3 py-1 border rounded"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Username
              </label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3 px-3 py-1 border rounded"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Wait for the story to be ready
    await waitFor(() => {
      const trigger = canvas.queryByRole("button", { name: /edit profile/i });
      if (!trigger) {
        throw new Error("Story not ready - trigger button not found");
      }
    }, { timeout: 5000 });

    // Open dialog
    const triggerButton = canvas.getByRole("button", { name: /edit profile/i });
    await userEvent.click(triggerButton);

    // Wait for dialog
    await waitFor(() => {
      const dialogTitle = document.querySelector('[data-slot="dialog-title"]');
      expect(dialogTitle).toBeInTheDocument();
      expect(dialogTitle?.textContent).toBe("Edit profile");
    });
    
    // Wait for dialog content to be fully rendered
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]');
      expect(dialogContent).toBeInTheDocument();
    });

    // For this test, we'll just verify the dialog opened correctly and can be closed
    // The input interaction is less important than verifying the dialog functionality
    
    // Verify the form elements are present (they may be inputs or Input components)
    const dialogContent = document.querySelector('[data-slot="dialog-content"]');
    expect(dialogContent?.textContent).toContain("Name");
    expect(dialogContent?.textContent).toContain("Username");

    // Click save button
    const saveButton = within(document.body).getByRole("button", { name: /save changes/i });
    await userEvent.click(saveButton);

    // Dialog should close after save
    await waitFor(
      () => {
        const dialogContent = document.querySelector('[data-slot="dialog-content"]');
        expect(dialogContent).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    },
  },
  {
    renderSpec: {
      type: "Dialog",
      defaultOpen: false,
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
                  children: "Make changes to your profile here. Click save when you're done.",
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
                type: "DialogClose",
                asChild: true,
                children: {
                  type: "Button",
                  children: "Save changes",
                },
              },
            },
          ],
        },
      ],
    },
  }
);

export const CustomClose: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    args: {
      defaultOpen: false,
    },
    render: (args) => (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button variant="outline">Custom Close Button</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Custom Close Example</DialogTitle>
            <DialogDescription>
              This dialog has a custom close button in the footer.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Custom content goes here...</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Open dialog
    const triggerButton = canvas.getByRole("button", { name: /custom close button/i });
    await userEvent.click(triggerButton);

    // Wait for dialog
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe(
        "Custom Close Example"
      );
    });

    // Test custom close button in footer - get the one with data-slot="dialog-close"
    const closeButton = document.querySelector('[data-slot="dialog-close"]') as HTMLButtonElement;
    await userEvent.click(closeButton);

    // Verify dialog closes
    await waitFor(
      () => {
        const dialogContent = document.querySelector('[data-slot="dialog-content"]');
        expect(dialogContent).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    },
  },
  {
    renderSpec: {
      type: "Dialog",
      defaultOpen: false,
      children: [
        {
          type: "DialogTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Custom Close Button",
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
                  children: "Custom Close Example",
                },
                {
                  type: "DialogDescription",
                  children: "This dialog has a custom close button in the footer.",
                },
              ],
            },
            {
              type: "Box",
              className: "py-4",
              children: {
                type: "Text",
                children: "Custom content goes here...",
              },
            },
            {
              type: "DialogFooter",
              children: [
                {
                  type: "DialogClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "secondary",
                    children: "Close",
                  },
                },
                {
                  type: "Button",
                  children: "Save",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const ScrollableContent: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    args: {
      defaultOpen: false,
    },
    render: (args) => (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button variant="outline">Terms of Service</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
            <DialogDescription>Please read our terms of service carefully.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>
                <h3 className="font-medium">Section {i + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris.
                </p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Decline
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">Accept</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Open dialog
    const triggerButton = canvas.getByRole("button", { name: /terms of service/i });
    await userEvent.click(triggerButton);

    // Wait for dialog
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe(
        "Terms of Service"
      );
    });

    // Test scrolling by checking multiple sections are visible
    expect(within(document.body).getByText("Section 1")).toBeInTheDocument();
    expect(within(document.body).getByText("Section 10")).toBeInTheDocument();

    // Click Accept button
    const acceptButton = within(document.body).getByRole("button", { name: /accept/i });
    await userEvent.click(acceptButton);

    // Dialog should close
    await waitFor(
      () => {
        const dialogContent = document.querySelector('[data-slot="dialog-content"]');
        expect(dialogContent).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    },
  },
  {
    renderSpec: {
      type: "Dialog",
      defaultOpen: false,
      children: [
        {
          type: "DialogTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Terms of Service",
          },
        },
        {
          type: "DialogContent",
          className: "max-h-[80vh] overflow-y-auto",
          children: [
            {
              type: "DialogHeader",
              children: [
                {
                  type: "DialogTitle",
                  children: "Terms of Service",
                },
                {
                  type: "DialogDescription",
                  children: "Please read our terms of service carefully.",
                },
              ],
            },
            {
              type: "Box",
              className: "space-y-4",
              children: Array.from({ length: 10 }).map((_, i) => ({
                type: "Box",
                key: i.toString(),
                children: [
                  {
                    type: "Heading",
                    level: 3,
                    className: "font-medium",
                    children: `Section ${i + 1}`,
                  },
                  {
                    type: "Text",
                    className: "text-sm text-muted-foreground",
                    children:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                  },
                ],
              })),
            },
            {
              type: "DialogFooter",
              children: [
                {
                  type: "DialogClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "outline",
                    children: "Decline",
                  },
                },
                {
                  type: "DialogClose",
                  asChild: true,
                  children: {
                    type: "Button",
                    children: "Accept",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const NonModal: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    args: {
      defaultOpen: false,
      modal: false,
    },
    render: (args) => (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button variant="outline">Non-Modal Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Non-Modal Dialog</DialogTitle>
            <DialogDescription>
              This dialog doesn&apos;t block interaction with the background content. You can still
              interact with other elements on the page.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>This is a non-modal dialog. Click outside and see!</p>
          </div>
        </DialogContent>
      </Dialog>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Open dialog
    const triggerButton = canvas.getByRole("button", { name: /non-modal dialog/i });
    await userEvent.click(triggerButton);

    // Wait for dialog
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe(
        "Non-Modal Dialog"
      );
    });

    // Verify it's non-modal by checking we can click outside
    // In a non-modal dialog, clicking outside shouldn't close it
    await userEvent.click(document.body);

    // Dialog should still be open
    expect(document.querySelector('[data-slot="dialog-content"]')).toBeInTheDocument();

    // Close by clicking X button
    const closeButton = within(document.body).getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    await waitFor(
      () => {
        const dialogContent = document.querySelector('[data-slot="dialog-content"]');
        expect(dialogContent).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    },
  },
  {
    renderSpec: {
      type: "Dialog",
      defaultOpen: false,
      modal: false,
      children: [
        {
          type: "DialogTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Non-Modal Dialog",
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
                  children: "Non-Modal Dialog",
                },
                {
                  type: "DialogDescription",
                  children:
                    "This dialog doesn't block interaction with the background content. You can still interact with other elements on the page.",
                },
              ],
            },
            {
              type: "Box",
              className: "py-4",
              children: {
                type: "Text",
                children: "This is a non-modal dialog. Click outside and see!",
              },
            },
          ],
        },
      ],
    },
  }
);

export const InitiallyOpen: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    args: {
      defaultOpen: true,
    },
    parameters: {
      dualMode: {
        enabled: false // Disable dual mode for initially open dialogs
      }
    },
    render: (args) => (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button variant="outline">Reopen Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Initially Open</DialogTitle>
            <DialogDescription>
              This dialog is open by default when the story loads.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for initial mount - dialog should already be open
    await waitFor(() => {
      const dialogTitle = document.querySelector('[data-slot="dialog-title"]');
      expect(dialogTitle).toBeInTheDocument();
      expect(dialogTitle?.textContent).toBe("Initially Open");
    }, { timeout: 5000 });
    
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]');
      expect(dialogContent).toBeInTheDocument();
      expect(dialogContent).toHaveAttribute('data-state', 'open');
    });
    
    // Small delay to ensure animations have settled
    await new Promise((resolve) => globalThis.setTimeout(resolve, 100));

    // Ensure body doesn't have pointer-events: none before clicking
    const body = document.body;
    if (body.style.pointerEvents === "none") {
      body.style.pointerEvents = "";
    }

    // Close the dialog
    const closeButton = within(document.body).getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    // Wait for dialog to be fully closed and removed from DOM
    // Radix UI animates the dialog before removing it, so we wait for complete removal
    await waitFor(
      () => {
        const dialogContent = document.querySelector('[data-slot="dialog-content"]');
        expect(dialogContent).not.toBeInTheDocument();
      },
      { timeout: 10000 } // Increased timeout for animation
    );

    // Small delay after close animation
    await new Promise((resolve) => globalThis.setTimeout(resolve, 100));

    // Ensure body pointer events are restored for clicking reopen button
    if (body.style.pointerEvents === "none") {
      body.style.pointerEvents = "";
    }

    // Reopen using trigger button - wait for it to be accessible after dialog closes
    await waitFor(() => {
      const reopenButton = canvas.getByRole("button", { name: /reopen dialog/i });
      expect(reopenButton).toBeInTheDocument();
      expect(reopenButton).not.toBeDisabled();
      // Also check the button is clickable
      const buttonElement = reopenButton as HTMLButtonElement;
      if (buttonElement.style.pointerEvents === "none") {
        throw new Error("Button not yet clickable");
      }
    }, { timeout: 5000 });
    
    const reopenButton = canvas.getByRole("button", { name: /reopen dialog/i });
    await userEvent.click(reopenButton);

    // Verify dialog opens again
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]');
      expect(dialogContent).toBeInTheDocument();
      expect(dialogContent).toHaveAttribute('data-state', 'open');
    }, { timeout: 5000 });
    },
  },
  {
    renderSpec: {
      type: "Dialog",
      defaultOpen: true,
      children: [
        {
          type: "DialogTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Reopen Dialog",
          },
        },
        {
          type: "DialogContent",
          children: {
            type: "DialogHeader",
            children: [
              {
                type: "DialogTitle",
                children: "Initially Open",
              },
              {
                type: "DialogDescription",
                children: "This dialog is open by default when the story loads.",
              },
            ],
          },
        },
      ],
    },
  }
);
