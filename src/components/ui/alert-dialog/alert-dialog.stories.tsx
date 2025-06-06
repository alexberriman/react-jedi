import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";
import { Button } from "../button";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Alert dialog component for confirming destructive actions. Used to interrupt users and ask them to confirm an action, especially for irreversible operations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state of the dialog",
    },
    defaultOpen: {
      control: "boolean",
      description: "Default open state when uncontrolled",
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test opening the dialog
      const trigger = canvas.getByRole("button", { name: "Show Dialog" });
      await user.click(trigger);

      // Dialog should be visible (search in document since it's in a portal)
      await waitFor(() => {
        const dialog = document.querySelector('[role="alertdialog"]');
        expect(dialog).toBeInTheDocument();
      });

      // Check title and description (search in document)
      const portalScreen = within(document.body);
      expect(portalScreen.getByText("Are you absolutely sure?")).toBeInTheDocument();
      expect(portalScreen.getByText(/This action cannot be undone/)).toBeInTheDocument();

      // Test cancel button
      const cancelButton = portalScreen.getByRole("button", { name: "Cancel" });
      await user.click(cancelButton);

      // Dialog should be closed
      await waitFor(
        () => {
          expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Open again to test action button
      await user.click(trigger);
      await waitFor(() => {
        expect(document.querySelector('[role="alertdialog"]')).toBeInTheDocument();
      });
      const actionButton = portalScreen.getByRole("button", { name: "Continue" });
      await user.click(actionButton);

      // Dialog should be closed after action
      await waitFor(
        () => {
          expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "AlertDialog",
      children: [
        {
          type: "AlertDialogTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Show Dialog",
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
                  children: "Continue",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const DestructiveAction: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test destructive variant trigger
      const trigger = canvas.getByRole("button", { name: "Delete Account" });
      await user.click(trigger);

      // Dialog should be visible (search in document since it's in a portal)
      await waitFor(() => {
        const dialog = document.querySelector('[role="alertdialog"]');
        expect(dialog).toBeInTheDocument();
      });

      // Check destructive action button styling
      const portalScreen = within(document.body);
      const deleteButton = portalScreen.getByRole("button", { name: "Yes, delete account" });
      expect(deleteButton).toHaveClass("bg-destructive");

      // Test keyboard navigation - Escape key
      await user.keyboard("{Escape}");
      await waitFor(
        () => {
          expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "AlertDialog",
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
                  className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                  children: "Yes, delete account",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithCustomContent: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Show Custom Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Do you want to save them before leaving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t Save</AlertDialogCancel>
            <AlertDialogAction variant="outline">Cancel</AlertDialogAction>
            <AlertDialogAction>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test opening the dialog
      const trigger = canvas.getByRole("button", { name: "Show Custom Dialog" });
      await user.click(trigger);

      // Dialog should be visible
      await waitFor(() => {
        const dialog = document.querySelector('[role="alertdialog"]');
        expect(dialog).toBeInTheDocument();
      });

      // Check content
      const portalScreen = within(document.body);
      expect(portalScreen.getByText("Save Changes?")).toBeInTheDocument();
      expect(portalScreen.getByText(/You have unsaved changes/)).toBeInTheDocument();

      // Check all three buttons are present
      expect(portalScreen.getByRole("button", { name: "Don't Save" })).toBeInTheDocument();
      expect(portalScreen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
      expect(portalScreen.getByRole("button", { name: "Save Changes" })).toBeInTheDocument();

      // Close the dialog
      const cancelButton = portalScreen.getByRole("button", { name: "Don't Save" });
      await user.click(cancelButton);

      await waitFor(
        () => {
          expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "AlertDialog",
      children: [
        {
          type: "AlertDialogTrigger",
          asChild: true,
          children: {
            type: "Button",
            children: "Show Custom Dialog",
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
                  children: "Save Changes?",
                },
                {
                  type: "AlertDialogDescription",
                  children: "You have unsaved changes. Do you want to save them before leaving?",
                },
              ],
            },
            {
              type: "AlertDialogFooter",
              children: [
                {
                  type: "AlertDialogCancel",
                  children: "Don't Save",
                },
                {
                  type: "AlertDialogAction",
                  variant: "outline",
                  children: "Cancel",
                },
                {
                  type: "AlertDialogAction",
                  children: "Save Changes",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const ControlledState: Story = enhanceStoryForDualMode(
  {
    render: function ControlledDialog() {
      const [open, setOpen] = React.useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Dialog</Button>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
                <AlertDialogDescription>
                  This dialog is controlled via external state.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test controlled state
      const trigger = canvas.getByRole("button", { name: "Open Dialog" });

      // Initially no dialog
      expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();

      // Open dialog
      await user.click(trigger);
      await waitFor(() => {
        const dialog = document.querySelector('[role="alertdialog"]');
        expect(dialog).toBeInTheDocument();
      });

      // Test that both cancel and confirm close the dialog
      const portalScreen = within(document.body);
      const cancelButton = portalScreen.getByRole("button", { name: "Cancel" });
      await user.click(cancelButton);
      await waitFor(
        () => {
          expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Open again and test confirm
      await user.click(trigger);
      await waitFor(() => {
        expect(document.querySelector('[role="alertdialog"]')).toBeInTheDocument();
      });
      const confirmButton = portalScreen.getByRole("button", { name: "Confirm" });
      await user.click(confirmButton);
      await waitFor(
        () => {
          expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      children: [
        {
          type: "Button",
          children: "Open Dialog",
        },
        {
          type: "AlertDialog",
          defaultOpen: false,
          children: {
            type: "AlertDialogContent",
            children: [
              {
                type: "AlertDialogHeader",
                children: [
                  {
                    type: "AlertDialogTitle",
                    children: "Controlled Dialog",
                  },
                  {
                    type: "AlertDialogDescription",
                    children: "This dialog is controlled via external state.",
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
                    children: "Confirm",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  }
);

export const LongContent: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Long Content</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terms of Service</AlertDialogTitle>
            <AlertDialogDescription className="max-h-[200px] overflow-y-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
              inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Decline</AlertDialogCancel>
            <AlertDialogAction>Accept</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test opening the dialog
      const trigger = canvas.getByRole("button", { name: "Show Long Content" });
      await user.click(trigger);

      // Dialog should be visible
      await waitFor(() => {
        const dialog = document.querySelector('[role="alertdialog"]');
        expect(dialog).toBeInTheDocument();
      });

      // Check content
      const portalScreen = within(document.body);
      expect(portalScreen.getByText("Terms of Service")).toBeInTheDocument();
      expect(portalScreen.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();

      // Check buttons
      expect(portalScreen.getByRole("button", { name: "Decline" })).toBeInTheDocument();
      expect(portalScreen.getByRole("button", { name: "Accept" })).toBeInTheDocument();

      // Close the dialog
      const declineButton = portalScreen.getByRole("button", { name: "Decline" });
      await user.click(declineButton);

      await waitFor(
        () => {
          expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "AlertDialog",
      children: [
        {
          type: "AlertDialogTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Show Long Content",
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
                  children: "Terms of Service",
                },
                {
                  type: "AlertDialogDescription",
                  className: "max-h-[200px] overflow-y-auto",
                  children:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                },
              ],
            },
            {
              type: "AlertDialogFooter",
              children: [
                {
                  type: "AlertDialogCancel",
                  children: "Decline",
                },
                {
                  type: "AlertDialogAction",
                  children: "Accept",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithIcon: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Warning Action
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Warning
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              This is a potentially dangerous action. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test opening the dialog
      const trigger = canvas.getByRole("button", { name: "Warning Action" });
      await user.click(trigger);

      // Dialog should be visible
      await waitFor(() => {
        const dialog = document.querySelector('[role="alertdialog"]');
        expect(dialog).toBeInTheDocument();
      });

      // Check content
      const portalScreen = within(document.body);
      expect(portalScreen.getByText("Warning")).toBeInTheDocument();
      expect(portalScreen.getByText(/This is a potentially dangerous action/)).toBeInTheDocument();

      // Check buttons
      expect(portalScreen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
      expect(portalScreen.getByRole("button", { name: "Proceed" })).toBeInTheDocument();

      // Close the dialog
      const cancelButton = portalScreen.getByRole("button", { name: "Cancel" });
      await user.click(cancelButton);

      await waitFor(
        () => {
          expect(document.querySelector('[role="alertdialog"]')).not.toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    },
  },
  {
    renderSpec: {
      type: "AlertDialog",
      children: [
        {
          type: "AlertDialogTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Warning Action",
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
                  children: {
                    type: "Flex",
                    align: "center",
                    gap: "sm",
                    children: [
                      {
                        type: "Text",
                        variant: "destructive",
                        children: "⚠️",
                      },
                      {
                        type: "Text",
                        children: "Warning",
                      },
                    ],
                  },
                },
                {
                  type: "AlertDialogDescription",
                  children: "This is a potentially dangerous action. Are you sure you want to proceed?",
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
                  variant: "destructive",
                  children: "Proceed",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);