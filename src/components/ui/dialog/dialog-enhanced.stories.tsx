import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./dialog";
import { Button } from "../button";
import { enhanceStoryWithHandlers, createDialogHandlers } from "@sb/utils/enhance-story-with-handlers";

const meta = {
  title: "Components/Dialog/Enhanced",
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

// Basic dialog with proper event handler support
export const BasicWithHandlers: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    args: {
      defaultOpen: false,
    },
    render: function DialogStory(args) {
      const [open, setOpen] = useState(args.defaultOpen || false);
      
      return (
        <Dialog {...args} open={open} onOpenChange={setOpen}>
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
      );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Click the trigger button to open dialog
      const triggerButton = canvas.getByRole("button", { name: /open dialog/i });
      await userEvent.click(triggerButton);

      // Wait for dialog to appear
      await waitFor(() => {
        expect(document.querySelector('[data-slot="dialog-title"]')).toBeInTheDocument();
      });

      // Close dialog
      const closeButton = within(document.body).getByRole("button", { name: /close/i });
      await userEvent.click(closeButton);

      // Verify dialog is closed
      await waitFor(() => {
        const dialogContent = document.querySelector('[data-slot="dialog-content"]');
        if (dialogContent) {
          expect((dialogContent as HTMLElement).dataset.state).toBe("closed");
        } else {
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

// Dialog with footer actions and proper handlers
export const WithFooterActions: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    args: {
      defaultOpen: false,
    },
    render: function DialogStory(args) {
      const [open, setOpen] = useState(args.defaultOpen || false);
      const [status, setStatus] = useState("");
      
      return (
        <>
          <div className="text-center space-y-4">
            <Dialog {...args} open={open} onOpenChange={setOpen}>
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
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setStatus("Cancelled");
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setStatus("Saved!");
                      setOpen(false);
                    }}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {status && <p className="text-sm text-muted-foreground">Status: {status}</p>}
          </div>
        </>
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "text-center space-y-4",
      children: [
        {
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
                  children: [
                    {
                      type: "Button",
                      variant: "outline",
                      onClickAction: "handleCancel",
                      children: "Cancel",
                    },
                    {
                      type: "Button",
                      onClickAction: "handleSave",
                      children: "Save changes",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Text",
          id: "status-text",
          className: "text-sm text-muted-foreground",
          children: "",
        },
      ],
    },
    handlers: createDialogHandlers({
      onOpenChange: (open) => {
        console.log('Dialog open state:', open);
      },
      onCancel: () => {
        console.log('Cancel clicked');
        // In a real app, you'd update state here
      },
      onSave: () => {
        console.log('Save clicked');
        // In a real app, you'd update state here
      }
    })
  }
);

// Controlled dialog example
export const ControlledDialog: Story = enhanceStoryWithHandlers<typeof Dialog>(
  {
    render: function DialogStory() {
      const [open, setOpen] = useState(false);
      const [confirmations, setConfirmations] = useState(0);
      
      return (
        <div className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Confirmations: {confirmations}
            </p>
            <Button onClick={() => setOpen(true)}>
              Open Controlled Dialog
            </Button>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Controlled Dialog</DialogTitle>
                <DialogDescription>
                  This dialog is controlled by React state. It can only be closed
                  by clicking the confirm button.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setConfirmations(prev => prev + 1);
                    setOpen(false);
                  }}
                >
                  Confirm ({confirmations})
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "text-center space-y-4",
      state: {
        initial: {
          dialogOpen: false,
          confirmations: 0
        }
      },
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Text",
              className: "text-sm text-muted-foreground mb-4",
              children: "Confirmations: {{state.confirmations}}",
            },
            {
              type: "Button",
              onClickAction: "openDialog",
              children: "Open Controlled Dialog",
            },
          ],
        },
        {
          type: "Dialog",
          open: "{{state.dialogOpen}}",
          onOpenChangeAction: "handleDialogOpenChange",
          children: [
            {
              type: "DialogContent",
              children: [
                {
                  type: "DialogHeader",
                  children: [
                    {
                      type: "DialogTitle",
                      children: "Controlled Dialog",
                    },
                    {
                      type: "DialogDescription",
                      children:
                        "This dialog is controlled by React state. It can only be closed by clicking the confirm button.",
                    },
                  ],
                },
                {
                  type: "DialogFooter",
                  children: {
                    type: "Button",
                    onClickAction: "handleConfirm",
                    children: "Confirm ({{state.confirmations}})",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    handlers: {
      openDialog: () => {
        console.log('Opening dialog');
        // Would update state.dialogOpen = true
      },
      handleDialogOpenChange: (...args: unknown[]) => {
        const open = args[0] as boolean;
        console.log('Dialog open change:', open);
        // Would update state.dialogOpen = open
      },
      handleConfirm: () => {
        console.log('Confirm clicked');
        // Would update state.confirmations++ and state.dialogOpen = false
      },
    },
  }
);