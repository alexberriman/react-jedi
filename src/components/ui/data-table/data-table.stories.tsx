import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, within, userEvent, expect, waitFor } from "storybook/test";
import { DataTable, createSortableHeader, type DataTableColumn } from "./data-table";
import { Copy, Edit, Trash } from "lucide-react";
import type { Column, Row } from "@tanstack/react-table";
import { Checkbox } from "../checkbox/checkbox";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

// Sample data types
interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  createdAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: Date;
}

// Sample data
const payments: Payment[] = [
  {
    id: "1",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
    createdAt: new Date("2024-01-13"),
  },
  {
    id: "4",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    amount: 721,
    status: "failed",
    email: "Gwendolyn71@yahoo.com",
    createdAt: new Date("2024-01-11"),
  },
];

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    lastLogin: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "active",
    lastLogin: new Date("2024-01-19"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "User",
    status: "inactive",
    lastLogin: new Date("2024-01-10"),
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "Moderator",
    status: "active",
    lastLogin: new Date("2024-01-20"),
  },
];

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A powerful and flexible data table component built on TanStack Table.
Features include sorting, filtering, pagination, row selection, and customizable actions.

### Key Features
- 🔄 Sorting with visual indicators
- 🔍 Column filtering
- 📄 Pagination controls
- ✅ Row selection with callbacks
- 👁️ Column visibility toggles
- ⚡ Actions dropdown for each row
- 🎨 Fully customizable styling
- 📱 Responsive design

### Built with TanStack Table
This component leverages the power of TanStack Table for headless UI functionality,
providing a flexible foundation for data display and manipulation.
        `,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    onRowSelect: fn(),
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Define columns for payments table
const paymentColumns: DataTableColumn<Payment>[] = [
  {
    id: "select",
    header: ({ column, table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<Payment> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "email",
    accessorKey: "email",
    header: createSortableHeader<Payment>("Email") as
      | string
      | ((props: { column: Column<Payment, unknown> }) => React.ReactNode),
    enableSorting: true,
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: createSortableHeader<Payment>("Amount") as
      | string
      | ((props: { column: Column<Payment, unknown> }) => React.ReactNode),
    cell: ({ row }: { row: Row<Payment> }) => {
      const amount = Number.parseFloat(String(row.getValue("amount")));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Payment> }) => {
      const status = row.getValue("status") as string;
      const colorMap = {
        pending: "bg-yellow-100 text-yellow-700",
        processing: "bg-blue-100 text-blue-700",
        success: "bg-green-100 text-green-700",
        failed: "bg-red-100 text-red-700",
      };
      const color = colorMap[status as keyof typeof colorMap];
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${color}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: createSortableHeader<Payment>("Date") as
      | string
      | ((props: { column: Column<Payment, unknown> }) => React.ReactNode),
    cell: ({ row }: { row: Row<Payment> }) => {
      const date = row.getValue("createdAt") as Date;
      return date.toLocaleDateString();
    },
    enableSorting: true,
  },
];

export const Default: Story = enhanceStoryForDualMode(
  {
    args: {
      columns: paymentColumns as DataTableColumn<unknown>[],
      data: payments as unknown[],
      filterColumn: "email",
      filterPlaceholder: "Filter emails...",
      pageSize: 5,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test basic rendering
      expect(canvas.getByRole("table")).toBeInTheDocument();
      expect(canvas.getByText("ken99@yahoo.com")).toBeInTheDocument();

      // Test filtering
      const filterInput = canvas.getByPlaceholderText("Filter emails...");
      await userEvent.type(filterInput, "gmail");

      // Wait for filtered results
      await waitFor(() => {
        const rows = canvas.getAllByRole("row");
        // Header + filtered rows
        expect(rows.length).toBeLessThan(7); // Less than header + all 5 items
      });

      // Clear filter
      await userEvent.clear(filterInput);

      // Test sorting by clicking Email header
      const emailHeader = canvas.getByRole("button", { name: /email/i });
      await userEvent.click(emailHeader);

      // Test row selection
      const checkboxes = canvas.getAllByRole("checkbox");
      if (checkboxes.length > 1) {
        await userEvent.click(checkboxes[1]); // Click first row checkbox
      }

      // Test pagination - go to next page
      const nextButton = canvas.getByRole("button", { name: /next/i });
      if (!nextButton.hasAttribute("disabled")) {
        await userEvent.click(nextButton);

        // Only go back if we actually went forward
        await waitFor(() => {
          const prevButton = canvas.getByRole("button", { name: /previous/i });
          expect(prevButton).not.toBeDisabled();
        });

        const prevButton = canvas.getByRole("button", { name: /previous/i });
        await userEvent.click(prevButton);
      }
    },
  },
  {
    renderSpec: {
      type: "DataTable",
      columns: [
        { id: "select", header: "Select", enableSorting: false, enableHiding: false },
        { id: "id", accessorKey: "id", header: "ID" },
        { id: "email", accessorKey: "email", header: "Email", enableSorting: true },
        { id: "amount", accessorKey: "amount", header: "Amount", enableSorting: true, type: "currency" },
        { id: "status", accessorKey: "status", header: "Status" },
        { id: "createdAt", accessorKey: "createdAt", header: "Date", enableSorting: true, type: "date" },
      ],
      data: [
        { id: "1", amount: 316, status: "success", email: "ken99@yahoo.com", createdAt: "2024-01-15" },
        { id: "2", amount: 242, status: "success", email: "Abe45@gmail.com", createdAt: "2024-01-14" },
        { id: "3", amount: 837, status: "processing", email: "Monserrat44@gmail.com", createdAt: "2024-01-13" },
        { id: "4", amount: 874, status: "success", email: "Silas22@gmail.com", createdAt: "2024-01-12" },
        { id: "5", amount: 721, status: "failed", email: "Gwendolyn71@yahoo.com", createdAt: "2024-01-11" },
      ],
      filterColumn: "email",
      filterPlaceholder: "Filter emails...",
      pageSize: 5,
    },
  }
) as Story;

export const WithActions: Story = enhanceStoryForDualMode(
  {
    args: {
      columns: paymentColumns.filter((col) => col.id !== "select") as DataTableColumn<unknown>[],
      data: payments as unknown[],
      filterColumn: "email",
      filterPlaceholder: "Filter emails...",
      pageSize: 5,
      actions: [
        {
          label: "Copy ID",
          onClick: fn((row: unknown) => {
            const payment = row as Payment;
            // Mock clipboard write for testing
            console.log("Copying ID:", payment.id);
          }),
          icon: Copy,
        },
        {
          label: "Edit",
          onClick: fn(),
          icon: Edit,
        },
        {
          label: "Delete",
          onClick: fn(),
          icon: Trash,
        },
      ],
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test basic rendering
      expect(canvas.getByRole("table")).toBeInTheDocument();
      expect(canvas.getByText("ken99@yahoo.com")).toBeInTheDocument();

      // Wait for table to be fully rendered with data
      await waitFor(
        () => {
          expect(canvas.getByRole("table")).toBeInTheDocument();
          // Ensure data is loaded by checking for specific content
          expect(canvas.getByText("ken99@yahoo.com")).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );

      // Wait a bit for any animations or async rendering to complete
      await new Promise(resolve => globalThis.setTimeout(resolve, 500));

      // Check if we're in React mode (actions should be rendered)
      // In SDUI mode, actions might not be rendered without proper event handlers
      const isReactMode = !canvasElement.closest('[data-testid="sdui-render"]');
      
      if (!isReactMode) {
        console.log('Skipping action button tests in SDUI mode');
        return;
      }

      // Find the action buttons - they are in the last column of the table
      let actionsButtons: HTMLElement[] = [];
      
      await waitFor(() => {
        const tableElement = canvas.getByRole("table");
        const rows = within(tableElement).getAllByRole("row");
        
        // Skip the header row and look for action buttons in data rows
        const dataRows = rows.slice(1);
        actionsButtons = [];
        
        for (const row of dataRows) {
          const cells = within(row).getAllByRole("cell");
          const lastCell = cells.at(-1);
          if (lastCell) {
            const buttons = within(lastCell).queryAllByRole("button");
            actionsButtons.push(...buttons);
          }
        }
        
        expect(actionsButtons.length).toBeGreaterThan(0);
      }, { timeout: 5000 });
      
      // Click the first actions button
      await userEvent.click(actionsButtons[0]);

      // Wait for dropdown menu to appear - check in document since it might be in a portal
      await waitFor(
        () => {
          const dropdownItems = within(document.body).queryAllByRole("menuitem");
          expect(dropdownItems.length).toBeGreaterThan(0);
          // Also check for the specific text
          expect(within(document.body).getByText("Copy ID")).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );

      // Click on Edit action
      const editButton = within(document.body).getByText("Edit");
      await userEvent.click(editButton);

      // Wait a bit for the menu to close
      await new Promise(resolve => globalThis.setTimeout(resolve, 300));

      // Find actions button again and click to open menu
      const tableElement = canvas.getByRole("table");
      const rows = within(tableElement).getAllByRole("row");
      const dataRows = rows.slice(1);
      const firstRowCells = within(dataRows[0]).getAllByRole("cell");
      const lastCell = firstRowCells.at(-1);
      if (!lastCell) throw new Error("Last cell not found");
      const actionButton = within(lastCell).getByRole("button");
      await userEvent.click(actionButton);

      // Wait for menu to reopen
      await waitFor(
        () => {
          expect(within(document.body).getByText("Copy ID")).toBeInTheDocument();
        },
        { timeout: 10_000 }
      );

      // Click Copy ID
      const copyButton = within(document.body).getByText("Copy ID");
      await userEvent.click(copyButton);
    },
  },
  {
    renderSpec: {
      type: "DataTable",
      columns: [
        { id: "id", accessorKey: "id", header: "ID" },
        { id: "email", accessorKey: "email", header: "Email", enableSorting: true },
        { id: "amount", accessorKey: "amount", header: "Amount", enableSorting: true, type: "currency" },
        { id: "status", accessorKey: "status", header: "Status" },
        { id: "createdAt", accessorKey: "createdAt", header: "Date", enableSorting: true, type: "date" },
      ],
      data: [
        { id: "1", amount: 316, status: "success", email: "ken99@yahoo.com", createdAt: "2024-01-15" },
        { id: "2", amount: 242, status: "success", email: "Abe45@gmail.com", createdAt: "2024-01-14" },
        { id: "3", amount: 837, status: "processing", email: "Monserrat44@gmail.com", createdAt: "2024-01-13" },
        { id: "4", amount: 874, status: "success", email: "Silas22@gmail.com", createdAt: "2024-01-12" },
        { id: "5", amount: 721, status: "failed", email: "Gwendolyn71@yahoo.com", createdAt: "2024-01-11" },
      ],
      filterColumn: "email",
      filterPlaceholder: "Filter emails...",
      pageSize: 5,
      actions: [
        { label: "Copy ID", onClick: "copyId" },
        { label: "Edit", onClick: "edit" },
        { label: "Delete", onClick: "delete" },
      ],
    },
  }
) as Story;

// User columns without selection
const userColumns: DataTableColumn<User>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: createSortableHeader<User>("Name") as
      | string
      | ((props: { column: Column<User, unknown> }) => React.ReactNode),
    enableSorting: true,
  },
  {
    id: "email",
    accessorKey: "email",
    header: createSortableHeader<User>("Email") as
      | string
      | ((props: { column: Column<User, unknown> }) => React.ReactNode),
    enableSorting: true,
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    cell: ({ row }: { row: Row<User> }) => {
      const role = row.getValue("role") as string;
      const colorMap = {
        Admin: "bg-purple-100 text-purple-700",
        Moderator: "bg-indigo-100 text-indigo-700",
        User: "bg-gray-100 text-gray-700",
      };
      const color = colorMap[role as keyof typeof colorMap] || colorMap.User;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${color}`}
        >
          {role}
        </span>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<User> }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${color}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "lastLogin",
    accessorKey: "lastLogin",
    header: createSortableHeader<User>("Last Login") as
      | string
      | ((props: { column: Column<User, unknown> }) => React.ReactNode),
    cell: ({ row }: { row: Row<User> }) => {
      const date = row.getValue("lastLogin") as Date;
      return date.toLocaleDateString();
    },
    enableSorting: true,
  },
];

export const MinimalFeatures: Story = enhanceStoryForDualMode(
  {
    args: {
      columns: userColumns as DataTableColumn<unknown>[],
      data: users as unknown[],
      showPagination: false,
      showColumnFilter: false,
      showViewOptions: false,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test basic rendering
      expect(canvas.getByRole("table")).toBeInTheDocument();

      // Verify table renders with data
      expect(canvas.getByText("John Doe")).toBeInTheDocument();
      expect(canvas.getByText("jane.smith@example.com")).toBeInTheDocument();

      // Test sorting by clicking Name header
      const nameHeader = canvas.getByRole("button", { name: /name/i });
      await userEvent.click(nameHeader);

      // Click again to reverse sort
      await userEvent.click(nameHeader);

      // Verify no pagination controls
      expect(canvas.queryByRole("button", { name: /next/i })).not.toBeInTheDocument();
      expect(canvas.queryByRole("button", { name: /previous/i })).not.toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "DataTable",
      columns: [
        { id: "name", accessorKey: "name", header: "Name", enableSorting: true },
        { id: "email", accessorKey: "email", header: "Email", enableSorting: true },
        { id: "role", accessorKey: "role", header: "Role" },
        { id: "status", accessorKey: "status", header: "Status" },
        { id: "lastLogin", accessorKey: "lastLogin", header: "Last Login", enableSorting: true, type: "date" },
      ],
      data: [
        { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "active", lastLogin: "2024-01-20" },
        { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "active", lastLogin: "2024-01-19" },
        { id: "3", name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "inactive", lastLogin: "2024-01-10" },
        { id: "4", name: "Alice Williams", email: "alice.williams@example.com", role: "Moderator", status: "active", lastLogin: "2024-01-20" },
      ],
      pagination: { enabled: false },
      features: { columnFilter: false, viewOptions: false },
    },
  }
) as Story;

export const CustomStyling: Story = enhanceStoryForDualMode(
  {
    args: {
      columns: paymentColumns as DataTableColumn<unknown>[],
      data: payments as unknown[],
      filterColumn: "email",
      filterPlaceholder: "Filter emails...",
      className: "shadow-lg rounded-lg",
      pageSize: 3,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test basic rendering
      expect(canvas.getByRole("table")).toBeInTheDocument();

      // Verify custom styling is applied to the outer wrapper
      // The className is applied to the outermost div that contains the table
      const wrapper = canvas.getByRole("table").closest(".shadow-lg");
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass("shadow-lg");
      expect(wrapper).toHaveClass("rounded-lg");

      // Basic interaction test
      const filterInput = canvas.getByPlaceholderText("Filter emails...");
      await userEvent.type(filterInput, "yahoo");

      await waitFor(() => {
        expect(canvas.getByText("ken99@yahoo.com")).toBeInTheDocument();
      });
    },
  },
  {
    renderSpec: {
      type: "DataTable",
      columns: [
        { id: "select", header: "Select", enableSorting: false, enableHiding: false },
        { id: "id", accessorKey: "id", header: "ID" },
        { id: "email", accessorKey: "email", header: "Email", enableSorting: true },
        { id: "amount", accessorKey: "amount", header: "Amount", enableSorting: true, type: "currency" },
        { id: "status", accessorKey: "status", header: "Status" },
        { id: "createdAt", accessorKey: "createdAt", header: "Date", enableSorting: true, type: "date" },
      ],
      data: [
        { id: "1", amount: 316, status: "success", email: "ken99@yahoo.com", createdAt: "2024-01-15" },
        { id: "2", amount: 242, status: "success", email: "Abe45@gmail.com", createdAt: "2024-01-14" },
        { id: "3", amount: 837, status: "processing", email: "Monserrat44@gmail.com", createdAt: "2024-01-13" },
        { id: "4", amount: 874, status: "success", email: "Silas22@gmail.com", createdAt: "2024-01-12" },
        { id: "5", amount: 721, status: "failed", email: "Gwendolyn71@yahoo.com", createdAt: "2024-01-11" },
      ],
      filterColumn: "email",
      filterPlaceholder: "Filter emails...",
      className: "shadow-lg rounded-lg",
      pageSize: 3,
    },
  }
) as Story;

export const WithRowSelection: Story = enhanceStoryForDualMode(
  {
    args: {
      columns: paymentColumns.filter((col) => col.id !== "select") as DataTableColumn<unknown>[],
      data: payments as unknown[],
      filterColumn: "email",
      selectable: true,
      onRowSelect: fn((selectedRows: unknown[]) => {
        console.log("Selected rows:", selectedRows as Payment[]);
      }),
    },
    play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement);

      // Test basic rendering
      expect(canvas.getByRole("table")).toBeInTheDocument();

      // Get all checkboxes
      const checkboxes = canvas.getAllByRole("checkbox");

      // Select first row
      if (checkboxes.length > 1) {
        await userEvent.click(checkboxes[1]);

        // Select second row
        if (checkboxes.length > 2) {
          await userEvent.click(checkboxes[2]);
        }

        // Verify onRowSelect was called
        await waitFor(() => {
          expect(args.onRowSelect).toHaveBeenCalled();
        });

        // Select all rows
        await userEvent.click(checkboxes[0]); // Header checkbox

        // Deselect all
        await userEvent.click(checkboxes[0]);
      }
    },
  },
  {
    renderSpec: {
      type: "DataTable",
      columns: [
        { id: "id", accessorKey: "id", header: "ID" },
        { id: "email", accessorKey: "email", header: "Email", enableSorting: true },
        { id: "amount", accessorKey: "amount", header: "Amount", enableSorting: true, type: "currency" },
        { id: "status", accessorKey: "status", header: "Status" },
        { id: "createdAt", accessorKey: "createdAt", header: "Date", enableSorting: true, type: "date" },
      ],
      data: [
        { id: "1", amount: 316, status: "success", email: "ken99@yahoo.com", createdAt: "2024-01-15" },
        { id: "2", amount: 242, status: "success", email: "Abe45@gmail.com", createdAt: "2024-01-14" },
        { id: "3", amount: 837, status: "processing", email: "Monserrat44@gmail.com", createdAt: "2024-01-13" },
        { id: "4", amount: 874, status: "success", email: "Silas22@gmail.com", createdAt: "2024-01-12" },
        { id: "5", amount: 721, status: "failed", email: "Gwendolyn71@yahoo.com", createdAt: "2024-01-11" },
      ],
      filterColumn: "email",
      features: { selectable: true },
    },
  }
) as Story;

export const EmptyState: Story = enhanceStoryForDualMode(
  {
    args: {
      columns: paymentColumns as DataTableColumn<unknown>[],
      data: [],
      filterColumn: "email",
      filterPlaceholder: "Filter emails...",
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Test basic rendering
      expect(canvas.getByRole("table")).toBeInTheDocument();

      // Verify empty state message
      expect(canvas.getByText("No results.")).toBeInTheDocument();

      // Verify filter input is still available
      expect(canvas.getByPlaceholderText("Filter emails...")).toBeInTheDocument();

      // Verify table headers are still rendered
      expect(canvas.getByText("Email")).toBeInTheDocument();
      expect(canvas.getByText("Amount")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "DataTable",
      columns: [
        { id: "select", header: "Select", enableSorting: false, enableHiding: false },
        { id: "id", accessorKey: "id", header: "ID" },
        { id: "email", accessorKey: "email", header: "Email", enableSorting: true },
        { id: "amount", accessorKey: "amount", header: "Amount", enableSorting: true, type: "currency" },
        { id: "status", accessorKey: "status", header: "Status" },
        { id: "createdAt", accessorKey: "createdAt", header: "Date", enableSorting: true, type: "date" },
      ],
      data: [],
      filterColumn: "email",
      filterPlaceholder: "Filter emails...",
    },
  }
) as Story;
