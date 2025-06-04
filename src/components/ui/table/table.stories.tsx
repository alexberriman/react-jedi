import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "./table";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible and accessible table component for displaying structured data.
The table component includes all standard table elements (header, body, footer, rows, cells)
with proper semantic HTML and accessibility features.

### Features
- Responsive with horizontal scroll on mobile
- Semantic HTML table elements
- Accessible with proper ARIA attributes
- Consistent styling with theme
- Support for captions and footers
- Hover states for rows
- Flexible column alignment
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV005</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$550.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV006</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$200.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV007</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$300.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,250.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test table structure
    const table = canvas.getByRole("table");
    expect(table).toBeInTheDocument();

    // Test caption
    const caption = canvas.getByText("A list of your recent invoices.");
    expect(caption).toBeInTheDocument();

    // Test headers
    const headers = canvas.getAllByRole("columnheader");
    expect(headers).toHaveLength(4);
    expect(headers[0]).toHaveTextContent("Invoice");
    expect(headers[1]).toHaveTextContent("Status");
    expect(headers[2]).toHaveTextContent("Method");
    expect(headers[3]).toHaveTextContent("Amount");

    // Test data rows (7 invoice rows + 1 footer row)
    const rows = canvas.getAllByRole("row");
    expect(rows).toHaveLength(9); // 1 header + 7 data + 1 footer

    // Test specific invoice data
    expect(canvas.getByText("INV001")).toBeInTheDocument();
    expect(canvas.getAllByText("Paid")).toHaveLength(3); // There are 3 "Paid" invoices
    expect(canvas.getAllByText("Credit Card")).toHaveLength(3); // 3 Credit Card payments
    expect(canvas.getByText("$250.00")).toBeInTheDocument();

    // Test footer
    expect(canvas.getByText("Total")).toBeInTheDocument();
    expect(canvas.getByText("$2,250.00")).toBeInTheDocument();

    // Test table accessibility
    expect(table).toHaveClass("w-full", "caption-bottom");
  },
};

export const WithoutCaption: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane.smith@example.com</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob.johnson@example.com</TableCell>
          <TableCell>Manager</TableCell>
          <TableCell>Inactive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test table structure without caption
    const table = canvas.getByRole("table");
    expect(table).toBeInTheDocument();

    // Test headers
    const headers = canvas.getAllByRole("columnheader");
    expect(headers).toHaveLength(4);
    expect(headers[0]).toHaveTextContent("Name");
    expect(headers[1]).toHaveTextContent("Email");
    expect(headers[2]).toHaveTextContent("Role");
    expect(headers[3]).toHaveTextContent("Status");

    // Test data rows (3 user rows + 1 header row)
    const rows = canvas.getAllByRole("row");
    expect(rows).toHaveLength(4); // 1 header + 3 data

    // Test user data
    expect(canvas.getByText("John Doe")).toBeInTheDocument();
    expect(canvas.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(canvas.getByText("Developer")).toBeInTheDocument();
    expect(canvas.getByText("Jane Smith")).toBeInTheDocument();
    expect(canvas.getByText("Designer")).toBeInTheDocument();
    expect(canvas.getByText("Bob Johnson")).toBeInTheDocument();
    expect(canvas.getByText("Manager")).toBeInTheDocument();
    expect(canvas.getByText("Inactive")).toBeInTheDocument();

    // Test no caption exists
    const caption = table.querySelector("caption");
    expect(caption).not.toBeInTheDocument();
  },
};

export const ComplexData: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">MacBook Pro 16&quot;</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell className="text-right">$2,399.00</TableCell>
          <TableCell className="text-right">12</TableCell>
          <TableCell>
            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
              In Stock
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">iPhone 15 Pro</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell className="text-right">$999.00</TableCell>
          <TableCell className="text-right">0</TableCell>
          <TableCell>
            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-700">
              Out of Stock
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">AirPods Pro</TableCell>
          <TableCell>Accessories</TableCell>
          <TableCell className="text-right">$249.00</TableCell>
          <TableCell className="text-right">45</TableCell>
          <TableCell>
            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
              In Stock
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Apple Watch Ultra</TableCell>
          <TableCell>Wearables</TableCell>
          <TableCell className="text-right">$799.00</TableCell>
          <TableCell className="text-right">5</TableCell>
          <TableCell>
            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700">
              Low Stock
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div className="w-[350px]">
      <Table>
        <TableCaption>Responsive table with horizontal scroll</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>001</TableCell>
            <TableCell className="whitespace-nowrap">MacBook Pro 16&quot;</TableCell>
            <TableCell>High-performance laptop for professionals</TableCell>
            <TableCell>$2,399</TableCell>
            <TableCell>12</TableCell>
            <TableCell>Electronics</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>002</TableCell>
            <TableCell className="whitespace-nowrap">iPhone 15 Pro</TableCell>
            <TableCell>Latest flagship smartphone with titanium design</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Electronics</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
