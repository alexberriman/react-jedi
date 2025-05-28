import type { Meta, StoryObj } from "@storybook/react";
import { fn, within, userEvent, expect, waitFor } from "@storybook/test";
import { DataTable, createSortableHeader, type DataTableColumn } from "./data-table";
import { Copy, Edit, Trash } from "lucide-react";
import type { Column, Row } from "@tanstack/react-table";
import { Checkbox } from "../checkbox/checkbox";

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
  title: "Components/DataDisplay/DataTable",
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

export const Default: Story = {
  args: {
    columns: paymentColumns as DataTableColumn<unknown>[],
    data: payments as unknown[],
    filterColumn: "email",
    filterPlaceholder: "Filter emails...",
    pageSize: 5,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test filtering
    const filterInput = canvas.getByPlaceholderText('Filter emails...');
    await userEvent.type(filterInput, 'gmail');
    
    // Wait for filtered results
    await waitFor(() => {
      const rows = canvas.getAllByRole('row');
      // Header + filtered rows
      expect(rows.length).toBeLessThan(7); // Less than header + all 5 items
    });
    
    // Clear filter
    await userEvent.clear(filterInput);
    
    // Test sorting by clicking Email header
    const emailHeader = canvas.getByRole('button', { name: /email/i });
    await userEvent.click(emailHeader);
    
    // Test row selection
    const checkboxes = canvas.getAllByRole('checkbox');
    await userEvent.click(checkboxes[1]); // Click first row checkbox
    
    // Test pagination - go to next page
    const nextButton = canvas.getByRole('button', { name: /next/i });
    if (!nextButton.hasAttribute('disabled')) {
      await userEvent.click(nextButton);
    }
    
    // Go back to previous page
    const prevButton = canvas.getByRole('button', { name: /previous/i });
    await userEvent.click(prevButton);
  },
};

export const WithActions: Story = {
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
          navigator.clipboard.writeText(payment.id);
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
    
    // Find the first actions button (three dots menu)
    const actionsButtons = canvas.getAllByRole('button', { name: /toggle menu/i });
    await userEvent.click(actionsButtons[0]);
    
    // Wait for dropdown menu to appear
    await waitFor(() => {
      expect(canvas.getByText('Copy ID')).toBeInTheDocument();
    });
    
    // Click on Edit action
    await userEvent.click(canvas.getByText('Edit'));
    
    // Click actions button again to open menu
    await userEvent.click(actionsButtons[0]);
    
    // Wait for menu and click Copy ID
    await waitFor(() => {
      expect(canvas.getByText('Copy ID')).toBeInTheDocument();
    });
    
    await userEvent.click(canvas.getByText('Copy ID'));
  },
};

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

export const MinimalFeatures: Story = {
  args: {
    columns: userColumns as DataTableColumn<unknown>[],
    data: users as unknown[],
    showPagination: false,
    showColumnFilter: false,
    showViewOptions: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify table renders with data
    expect(canvas.getByText('John Doe')).toBeInTheDocument();
    expect(canvas.getByText('jane.smith@example.com')).toBeInTheDocument();
    
    // Test sorting by clicking Name header
    const nameHeader = canvas.getByRole('button', { name: /name/i });
    await userEvent.click(nameHeader);
    
    // Click again to reverse sort
    await userEvent.click(nameHeader);
    
    // Verify no pagination controls
    expect(canvas.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    expect(canvas.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
  },
};

export const CustomStyling: Story = {
  args: {
    columns: paymentColumns as DataTableColumn<unknown>[],
    data: payments as unknown[],
    filterColumn: "email",
    className: "shadow-lg rounded-lg",
    pageSize: 3,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify custom styling is applied
    const table = canvas.getByRole('table').parentElement?.parentElement;
    expect(table).toHaveClass('shadow-lg');
    expect(table).toHaveClass('rounded-lg');
    
    // Basic interaction test
    const filterInput = canvas.getByPlaceholderText('Filter emails...');
    await userEvent.type(filterInput, 'yahoo');
    
    await waitFor(() => {
      expect(canvas.getByText('ken99@yahoo.com')).toBeInTheDocument();
    });
  },
};

export const WithRowSelection: Story = {
  args: {
    columns: paymentColumns as DataTableColumn<unknown>[],
    data: payments as unknown[],
    filterColumn: "email",
    selectable: true,
    onRowSelect: fn((selectedRows: unknown[]) => {
      console.log("Selected rows:", selectedRows as Payment[]);
    }),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Get all checkboxes
    const checkboxes = canvas.getAllByRole('checkbox');
    
    // Select first row
    await userEvent.click(checkboxes[1]);
    
    // Select second row
    await userEvent.click(checkboxes[2]);
    
    // Verify onRowSelect was called
    await waitFor(() => {
      expect(args.onRowSelect).toHaveBeenCalled();
    });
    
    // Select all rows
    await userEvent.click(checkboxes[0]); // Header checkbox
    
    // Deselect all
    await userEvent.click(checkboxes[0]);
  },
};

export const EmptyState: Story = {
  args: {
    columns: paymentColumns as DataTableColumn<unknown>[],
    data: [],
    filterColumn: "email",
    filterPlaceholder: "Filter emails...",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify empty state message
    expect(canvas.getByText('No results.')).toBeInTheDocument();
    
    // Verify filter input is still available
    expect(canvas.getByPlaceholderText('Filter emails...')).toBeInTheDocument();
    
    // Verify table headers are still rendered
    expect(canvas.getByText('Email')).toBeInTheDocument();
    expect(canvas.getByText('Amount')).toBeInTheDocument();
  },
};
