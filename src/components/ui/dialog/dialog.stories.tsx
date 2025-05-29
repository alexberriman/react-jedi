import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
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

const meta = {
  title: "Components/Overlay/Dialog",
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

  tags: ['ui-dialog'],} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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
    
    // Click the trigger button to open dialog
    const triggerButton = canvas.getByRole('button', { name: /open dialog/i });
    await userEvent.click(triggerButton);
    
    // Wait for dialog to appear - look for the dialog in the document, not just canvas
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')).toBeInTheDocument();
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe('Are you absolutely sure?');
    });
    
    // Verify dialog content
    const dialogContent = document.querySelector('[data-slot="dialog-content"]');
    expect(dialogContent).toBeInTheDocument();
    expect(document.querySelector('[data-slot="dialog-description"]')?.textContent).toContain('This action cannot be undone');
    
    // Close dialog by clicking the X button
    const closeButton = within(document.body).getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);
    
    // Verify dialog is closed - check for closed state instead of removal
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]') as HTMLElement | null;
      if (dialogContent) {
        expect(dialogContent.dataset.state).toBe('closed');
      } else {
        // Dialog has been removed from DOM after animation
        expect(dialogContent).not.toBeInTheDocument();
      }
    });
  },
};

export const WithFooter: Story = {
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
    
    // Open dialog
    const triggerButton = canvas.getByRole('button', { name: /edit profile/i });
    await userEvent.click(triggerButton);
    
    // Wait for dialog
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe('Edit profile');
    });
    
    // Interact with form fields - use specific selectors to avoid ambiguity
    const nameInput = document.querySelector('#name') as HTMLInputElement;
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'John Doe');
    
    const usernameInput = document.querySelector('#username') as HTMLInputElement;
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, '@johndoe');
    
    // Click save button
    const saveButton = within(document.body).getByRole('button', { name: /save changes/i });
    await userEvent.click(saveButton);
    
    // Dialog should close after save
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]') as HTMLElement | null;
      if (dialogContent) {
        expect(dialogContent.dataset.state).toBe('closed');
      } else {
        expect(dialogContent).not.toBeInTheDocument();
      }
    });
  },
};

export const CustomClose: Story = {
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
    const triggerButton = canvas.getByRole('button', { name: /custom close button/i });
    await userEvent.click(triggerButton);
    
    // Wait for dialog
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe('Custom Close Example');
    });
    
    // Test custom close button in footer - get the one with data-slot="dialog-close"
    const closeButton = document.querySelector('[data-slot="dialog-close"]') as HTMLButtonElement;
    await userEvent.click(closeButton);
    
    // Verify dialog closes
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]') as HTMLElement | null;
      if (dialogContent) {
        expect(dialogContent.dataset.state).toBe('closed');
      } else {
        expect(dialogContent).not.toBeInTheDocument();
      }
    });
  },
};

export const ScrollableContent: Story = {
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
    const triggerButton = canvas.getByRole('button', { name: /terms of service/i });
    await userEvent.click(triggerButton);
    
    // Wait for dialog
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe('Terms of Service');
    });
    
    // Test scrolling by checking multiple sections are visible
    expect(within(document.body).getByText('Section 1')).toBeInTheDocument();
    expect(within(document.body).getByText('Section 10')).toBeInTheDocument();
    
    // Click Accept button
    const acceptButton = within(document.body).getByRole('button', { name: /accept/i });
    await userEvent.click(acceptButton);
    
    // Dialog should close
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]') as HTMLElement | null;
      if (dialogContent) {
        expect(dialogContent.dataset.state).toBe('closed');
      } else {
        expect(dialogContent).not.toBeInTheDocument();
      }
    });
  },
};

export const NonModal: Story = {
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
    const triggerButton = canvas.getByRole('button', { name: /non-modal dialog/i });
    await userEvent.click(triggerButton);
    
    // Wait for dialog
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe('Non-Modal Dialog');
    });
    
    // Verify it's non-modal by checking we can click outside
    // In a non-modal dialog, clicking outside shouldn't close it
    await userEvent.click(document.body);
    
    // Dialog should still be open
    expect(document.querySelector('[data-slot="dialog-content"]')).toBeInTheDocument();
    
    // Close by clicking X button
    const closeButton = within(document.body).getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);
    
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]') as HTMLElement | null;
      if (dialogContent) {
        expect(dialogContent.dataset.state).toBe('closed');
      } else {
        expect(dialogContent).not.toBeInTheDocument();
      }
    });
  },
};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
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
    
    // Dialog should already be open
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe('Initially Open');
    });
    expect(document.querySelector('[data-slot="dialog-content"]')).toBeInTheDocument();
    
    // Close the dialog
    const closeButton = within(document.body).getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);
    
    // Wait for dialog to close
    await waitFor(() => {
      const dialogContent = document.querySelector('[data-slot="dialog-content"]') as HTMLElement | null;
      if (dialogContent) {
        expect(dialogContent.dataset.state).toBe('closed');
      } else {
        expect(dialogContent).not.toBeInTheDocument();
      }
    });
    
    // Reopen using trigger button - wait for it to be accessible after dialog closes
    await waitFor(() => {
      const reopenButton = canvas.getByRole('button', { name: /reopen dialog/i });
      expect(reopenButton).toBeInTheDocument();
    });
    const reopenButton = canvas.getByRole('button', { name: /reopen dialog/i });
    await userEvent.click(reopenButton);
    
    // Verify dialog opens again
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dialog-content"]')).toBeInTheDocument();
    });
  },
};
