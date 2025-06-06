import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
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
import { Badge } from "../badge";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

function getInvoiceStatusVariant(status: string): string {
  if (status === "Paid") return "default";
  if (status === "Pending") return "secondary";
  return "destructive";
}

function getProductStatusVariant(status: string): string {
  if (status === "In Stock") return "default";
  if (status === "Out of Stock") return "destructive";
  return "secondary";
}

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
- Multiple style variants (default, striped, bordered, minimal, compact, modern)
- Responsive with horizontal scroll on mobile
- Semantic HTML table elements
- Accessible with proper ARIA attributes
- Consistent styling with theme
- Support for captions and footers
- Hover states for rows
- Flexible column alignment
- Sticky header support
- Smooth hover animations

### Variants
- **Default**: Clean standard table with subtle hover effects
- **Striped**: Alternating row colors for better readability
- **Bordered**: Full borders around all cells
- **Minimal**: Ultra-clean with minimal borders
- **Compact**: Reduced padding for dense data display
- **Modern**: Sleek design with shadows and gradients
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped", "bordered", "minimal", "compact", "modern"],
      description: "Visual style variant of the table",
    },
    stickyHeader: {
      control: "boolean",
      description: "Whether the table header should be sticky when scrolling",
    },
    hoverable: {
      control: "boolean",
      description: "Whether to show hover effects on rows",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for invoices
const invoiceData = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: 250 },
  { id: "INV002", status: "Pending", method: "PayPal", amount: 150 },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: 350 },
  { id: "INV004", status: "Paid", method: "Credit Card", amount: 450 },
  { id: "INV005", status: "Paid", method: "PayPal", amount: 550 },
  { id: "INV006", status: "Pending", method: "Bank Transfer", amount: 200 },
  { id: "INV007", status: "Unpaid", method: "Credit Card", amount: 300 },
];

// Sample data for products
const productData = [
  { name: 'MacBook Pro 16"', category: "Electronics", price: 2399, stock: 12, status: "In Stock" },
  { name: "iPhone 15 Pro", category: "Electronics", price: 999, stock: 0, status: "Out of Stock" },
  { name: "AirPods Pro", category: "Accessories", price: 249, stock: 45, status: "In Stock" },
  { name: "Apple Watch Ultra", category: "Wearables", price: 799, stock: 5, status: "Low Stock" },
  { name: 'iPad Pro 12.9"', category: "Electronics", price: 1299, stock: 8, status: "In Stock" },
  { name: "Magic Keyboard", category: "Accessories", price: 349, stock: 23, status: "In Stock" },
];

// Sample data for users
const userData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Designer",
    status: "Active",
    lastActive: "5 minutes ago",
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Manager",
    status: "Inactive",
    lastActive: "2 days ago",
  },
  {
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Developer",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "QA Engineer",
    status: "Active",
    lastActive: "30 minutes ago",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
    Paid: "default",
    Pending: "secondary",
    Unpaid: "destructive",
    "In Stock": "default",
    "Out of Stock": "destructive",
    "Low Stock": "secondary",
    Active: "default",
    Inactive: "outline",
  };
  return <Badge variant={variants[status] || "default"}>{status}</Badge>;
};

export const Default: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "default",
    },
    render: (args) => (
      <Table {...args}>
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
          {invoiceData.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{getStatusBadge(invoice.status)}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${invoiceData.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table caption
      const caption = canvas.getByText("A list of your recent invoices.");
      expect(caption).toBeInTheDocument();

      // Test table headers
      expect(canvas.getByText("Invoice")).toBeInTheDocument();
      expect(canvas.getByText("Status")).toBeInTheDocument();
      expect(canvas.getByText("Method")).toBeInTheDocument();
      expect(canvas.getByText("Amount")).toBeInTheDocument();

      // Test some invoice data
      expect(canvas.getByText("INV001")).toBeInTheDocument();
      expect(canvas.getByText("Credit Card")).toBeInTheDocument();
      expect(canvas.getByText("$250.00")).toBeInTheDocument();

      // Test footer
      expect(canvas.getByText("Total")).toBeInTheDocument();
      expect(canvas.getByText("$2,050.00")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Table",
      variant: "default",
      caption: "A list of your recent invoices.",
      head: {
        rows: [
          {
            cells: [
              { content: "Invoice", className: "w-[100px]" },
              { content: "Status" },
              { content: "Method" },
              { content: "Amount", align: "right" },
            ],
          },
        ],
      },
      body: {
        rows: invoiceData.map((invoice) => ({
          cells: [
            { content: invoice.id, className: "font-medium" },
            {
              content: {
                type: "Badge",
                variant: getInvoiceStatusVariant(invoice.status),
                children: invoice.status,
              },
            },
            { content: invoice.method },
            { content: `$${invoice.amount.toFixed(2)}`, align: "right" },
          ],
        })),
      },
      footer: {
        rows: [
          {
            cells: [
              { content: "Total", colSpan: 3 },
              {
                content: `$${invoiceData.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}`,
                align: "right",
              },
            ],
          },
        ],
      },
    },
  }
);

export const Striped: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "striped",
    },
    render: (args) => (
      <Table {...args}>
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
          {productData.map((product) => (
            <TableRow key={product.name}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">{product.stock}</TableCell>
              <TableCell>{getStatusBadge(product.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table headers
      expect(canvas.getByText("Product")).toBeInTheDocument();
      expect(canvas.getByText("Category")).toBeInTheDocument();
      expect(canvas.getByText("Price")).toBeInTheDocument();
      expect(canvas.getByText("Stock")).toBeInTheDocument();
      expect(canvas.getByText("Status")).toBeInTheDocument();

      // Test some product data
      expect(canvas.getByText('MacBook Pro 16"')).toBeInTheDocument();
      expect(canvas.getByText("Electronics")).toBeInTheDocument();
      expect(canvas.getByText("$2,399.00")).toBeInTheDocument();
      expect(canvas.getByText("In Stock")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Table",
      variant: "striped",
      head: {
        rows: [
          {
            cells: [
              { content: "Product" },
              { content: "Category" },
              { content: "Price", align: "right" },
              { content: "Stock", align: "right" },
              { content: "Status" },
            ],
          },
        ],
      },
      body: {
        rows: productData.map((product) => ({
          cells: [
            { content: product.name, className: "font-medium" },
            { content: product.category },
            { content: `$${product.price.toFixed(2)}`, align: "right" },
            { content: product.stock.toString(), align: "right" },
            {
              content: {
                type: "Badge",
                variant: getProductStatusVariant(product.status),
                children: product.status,
              },
            },
          ],
        })),
      },
    },
  }
);

export const Bordered: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "bordered",
    },
    render: (args) => (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table headers
      expect(canvas.getByText("Name")).toBeInTheDocument();
      expect(canvas.getByText("Email")).toBeInTheDocument();
      expect(canvas.getByText("Role")).toBeInTheDocument();
      expect(canvas.getByText("Status")).toBeInTheDocument();
      expect(canvas.getByText("Last Active")).toBeInTheDocument();

      // Test some user data
      expect(canvas.getByText("John Doe")).toBeInTheDocument();
      expect(canvas.getByText("john.doe@example.com")).toBeInTheDocument();
      expect(canvas.getByText("Developer")).toBeInTheDocument();
      expect(canvas.getByText("Active")).toBeInTheDocument();
      expect(canvas.getByText("2 hours ago")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Table",
      variant: "bordered",
      head: {
        rows: [
          {
            cells: [
              { content: "Name" },
              { content: "Email" },
              { content: "Role" },
              { content: "Status" },
              { content: "Last Active" },
            ],
          },
        ],
      },
      body: {
        rows: userData.map((user) => ({
          cells: [
            { content: user.name, className: "font-medium" },
            { content: user.email },
            { content: user.role },
            {
              content: {
                type: "Badge",
                variant: user.status === "Active" ? "default" : "outline",
                children: user.status,
              },
            },
            { content: user.lastActive, className: "text-muted-foreground" },
          ],
        })),
      },
    },
  }
);

export const Minimal: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "minimal",
    },
    render: (args) => (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Update documentation</TableCell>
            <TableCell>
              <Badge variant="secondary">Medium</Badge>
            </TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>Dec 15, 2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fix login bug</TableCell>
            <TableCell>
              <Badge variant="destructive">High</Badge>
            </TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>Dec 12, 2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Design new landing page</TableCell>
            <TableCell>
              <Badge variant="outline">Low</Badge>
            </TableCell>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>Dec 20, 2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Implement search feature</TableCell>
            <TableCell>
              <Badge variant="destructive">High</Badge>
            </TableCell>
            <TableCell>Alice Brown</TableCell>
            <TableCell>Dec 14, 2024</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table headers
      expect(canvas.getByText("Task")).toBeInTheDocument();
      expect(canvas.getByText("Priority")).toBeInTheDocument();
      expect(canvas.getByText("Assignee")).toBeInTheDocument();
      expect(canvas.getByText("Due Date")).toBeInTheDocument();

      // Test task data
      expect(canvas.getByText("Update documentation")).toBeInTheDocument();
      expect(canvas.getByText("Fix login bug")).toBeInTheDocument();
      expect(canvas.getByText("Medium")).toBeInTheDocument();
      expect(canvas.getByText("High")).toBeInTheDocument();
      expect(canvas.getByText("Low")).toBeInTheDocument();
      expect(canvas.getByText("John Doe")).toBeInTheDocument();
      expect(canvas.getByText("Dec 15, 2024")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Table",
      variant: "minimal",
      head: {
        rows: [
          {
            cells: [
              { content: "Task" },
              { content: "Priority" },
              { content: "Assignee" },
              { content: "Due Date" },
            ],
          },
        ],
      },
      body: {
        rows: [
          {
            cells: [
              { content: "Update documentation" },
              {
                content: {
                  type: "Badge",
                  variant: "secondary",
                  children: "Medium",
                },
              },
              { content: "John Doe" },
              { content: "Dec 15, 2024" },
            ],
          },
          {
            cells: [
              { content: "Fix login bug" },
              {
                content: {
                  type: "Badge",
                  variant: "destructive",
                  children: "High",
                },
              },
              { content: "Jane Smith" },
              { content: "Dec 12, 2024" },
            ],
          },
          {
            cells: [
              { content: "Design new landing page" },
              {
                content: {
                  type: "Badge",
                  variant: "outline",
                  children: "Low",
                },
              },
              { content: "Bob Johnson" },
              { content: "Dec 20, 2024" },
            ],
          },
          {
            cells: [
              { content: "Implement search feature" },
              {
                content: {
                  type: "Badge",
                  variant: "destructive",
                  children: "High",
                },
              },
              { content: "Alice Brown" },
              { content: "Dec 14, 2024" },
            ],
          },
        ],
      },
    },
  }
);

export const Compact: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "compact",
    },
    render: (args) => (
      <div className="w-full max-w-2xl">
        <Table {...args}>
          <TableCaption>Server metrics for the last hour</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Server</TableHead>
              <TableHead>CPU %</TableHead>
              <TableHead>Memory %</TableHead>
              <TableHead>Disk %</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs">web-01</TableCell>
              <TableCell>45%</TableCell>
              <TableCell>62%</TableCell>
              <TableCell>78%</TableCell>
              <TableCell>
                <Badge variant="default" className="h-5 text-xs">
                  Healthy
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-xs">web-02</TableCell>
              <TableCell>89%</TableCell>
              <TableCell>91%</TableCell>
              <TableCell>85%</TableCell>
              <TableCell>
                <Badge variant="destructive" className="h-5 text-xs">
                  Critical
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-xs">db-01</TableCell>
              <TableCell>23%</TableCell>
              <TableCell>45%</TableCell>
              <TableCell>56%</TableCell>
              <TableCell>
                <Badge variant="default" className="h-5 text-xs">
                  Healthy
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-xs">db-02</TableCell>
              <TableCell>67%</TableCell>
              <TableCell>73%</TableCell>
              <TableCell>69%</TableCell>
              <TableCell>
                <Badge variant="secondary" className="h-5 text-xs">
                  Warning
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-xs">cache-01</TableCell>
              <TableCell>12%</TableCell>
              <TableCell>28%</TableCell>
              <TableCell>34%</TableCell>
              <TableCell>
                <Badge variant="default" className="h-5 text-xs">
                  Healthy
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table caption
      expect(canvas.getByText("Server metrics for the last hour")).toBeInTheDocument();

      // Test table headers
      expect(canvas.getByText("Server")).toBeInTheDocument();
      expect(canvas.getByText("CPU %")).toBeInTheDocument();
      expect(canvas.getByText("Memory %")).toBeInTheDocument();
      expect(canvas.getByText("Disk %")).toBeInTheDocument();
      expect(canvas.getByText("Status")).toBeInTheDocument();

      // Test server data
      expect(canvas.getByText("web-01")).toBeInTheDocument();
      expect(canvas.getByText("45%")).toBeInTheDocument();
      expect(canvas.getByText("Healthy")).toBeInTheDocument();
      expect(canvas.getByText("Critical")).toBeInTheDocument();
      expect(canvas.getByText("Warning")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-full max-w-2xl",
      children: {
        type: "Table",
        variant: "compact",
        caption: "Server metrics for the last hour",
        head: {
          rows: [
            {
              cells: [
                { content: "Server" },
                { content: "CPU %" },
                { content: "Memory %" },
                { content: "Disk %" },
                { content: "Status" },
              ],
            },
          ],
        },
        body: {
          rows: [
            {
              cells: [
                { content: "web-01", className: "font-mono text-xs" },
                { content: "45%" },
                { content: "62%" },
                { content: "78%" },
                {
                  content: {
                    type: "Badge",
                    variant: "default",
                    className: "h-5 text-xs",
                    children: "Healthy",
                  },
                },
              ],
            },
            {
              cells: [
                { content: "web-02", className: "font-mono text-xs" },
                { content: "89%" },
                { content: "91%" },
                { content: "85%" },
                {
                  content: {
                    type: "Badge",
                    variant: "destructive",
                    className: "h-5 text-xs",
                    children: "Critical",
                  },
                },
              ],
            },
            {
              cells: [
                { content: "db-01", className: "font-mono text-xs" },
                { content: "23%" },
                { content: "45%" },
                { content: "56%" },
                {
                  content: {
                    type: "Badge",
                    variant: "default",
                    className: "h-5 text-xs",
                    children: "Healthy",
                  },
                },
              ],
            },
            {
              cells: [
                { content: "db-02", className: "font-mono text-xs" },
                { content: "67%" },
                { content: "73%" },
                { content: "69%" },
                {
                  content: {
                    type: "Badge",
                    variant: "secondary",
                    className: "h-5 text-xs",
                    children: "Warning",
                  },
                },
              ],
            },
            {
              cells: [
                { content: "cache-01", className: "font-mono text-xs" },
                { content: "12%" },
                { content: "28%" },
                { content: "34%" },
                {
                  content: {
                    type: "Badge",
                    variant: "default",
                    className: "h-5 text-xs",
                    children: "Healthy",
                  },
                },
              ],
            },
          ],
        },
      },
    },
  }
);

export const Modern: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "modern",
    },
    render: (args) => (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">Acme Corporation</div>
                <div className="text-sm text-muted-foreground">contact@acme.com</div>
              </div>
            </TableCell>
            <TableCell>Dec 10, 2024</TableCell>
            <TableCell>8 items</TableCell>
            <TableCell className="text-right font-medium">$1,249.00</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">Globex Industries</div>
                <div className="text-sm text-muted-foreground">info@globex.com</div>
              </div>
            </TableCell>
            <TableCell>Dec 09, 2024</TableCell>
            <TableCell>12 items</TableCell>
            <TableCell className="text-right font-medium">$2,859.00</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">Soylent Corp</div>
                <div className="text-sm text-muted-foreground">hello@soylent.com</div>
              </div>
            </TableCell>
            <TableCell>Dec 08, 2024</TableCell>
            <TableCell>5 items</TableCell>
            <TableCell className="text-right font-medium">$649.00</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table headers
      expect(canvas.getByText("Customer")).toBeInTheDocument();
      expect(canvas.getByText("Order Date")).toBeInTheDocument();
      expect(canvas.getByText("Items")).toBeInTheDocument();
      expect(canvas.getByText("Total")).toBeInTheDocument();
      expect(canvas.getByText("Actions")).toBeInTheDocument();

      // Test customer data
      expect(canvas.getByText("Acme Corporation")).toBeInTheDocument();
      expect(canvas.getByText("contact@acme.com")).toBeInTheDocument();
      expect(canvas.getByText("Dec 10, 2024")).toBeInTheDocument();
      expect(canvas.getByText("8 items")).toBeInTheDocument();
      expect(canvas.getByText("$1,249.00")).toBeInTheDocument();

      // Test buttons
      const viewButtons = canvas.getAllByText("View");
      expect(viewButtons).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Table",
      variant: "modern",
      head: {
        rows: [
          {
            cells: [
              {
                content: {
                  type: "Checkbox",
                },
                className: "w-12",
              },
              { content: "Customer" },
              { content: "Order Date" },
              { content: "Items" },
              { content: "Total", align: "right" },
              { content: "Actions" },
            ],
          },
        ],
      },
      body: {
        rows: [
          {
            cells: [
              {
                content: {
                  type: "Checkbox",
                },
              },
              {
                content: {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-medium",
                      children: "Acme Corporation",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "contact@acme.com",
                    },
                  ],
                },
              },
              { content: "Dec 10, 2024" },
              { content: "8 items" },
              { content: "$1,249.00", align: "right", className: "font-medium" },
              {
                content: {
                  type: "Button",
                  variant: "ghost",
                  size: "sm",
                  children: "View",
                },
              },
            ],
          },
          {
            cells: [
              {
                content: {
                  type: "Checkbox",
                },
              },
              {
                content: {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-medium",
                      children: "Globex Industries",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "info@globex.com",
                    },
                  ],
                },
              },
              { content: "Dec 09, 2024" },
              { content: "12 items" },
              { content: "$2,859.00", align: "right", className: "font-medium" },
              {
                content: {
                  type: "Button",
                  variant: "ghost",
                  size: "sm",
                  children: "View",
                },
              },
            ],
          },
          {
            cells: [
              {
                content: {
                  type: "Checkbox",
                },
              },
              {
                content: {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-medium",
                      children: "Soylent Corp",
                    },
                    {
                      type: "Text",
                      className: "text-sm text-muted-foreground",
                      children: "hello@soylent.com",
                    },
                  ],
                },
              },
              { content: "Dec 08, 2024" },
              { content: "5 items" },
              { content: "$649.00", align: "right", className: "font-medium" },
              {
                content: {
                  type: "Button",
                  variant: "ghost",
                  size: "sm",
                  children: "View",
                },
              },
            ],
          },
        ],
      },
    },
  }
);

export const WithStickyHeader: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "default",
      stickyHeader: true,
    },
    render: (args) => (
      <div className="h-[400px] overflow-auto">
        <Table {...args}>
          <TableHeader sticky>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 20 }, (_, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono">TXN{String(i + 1).padStart(6, "0")}</TableCell>
                <TableCell>Dec {10 + i}, 2024</TableCell>
                <TableCell>Transaction description for item {i + 1}</TableCell>
                <TableCell className="text-right">${((i * 123 + 456) % 1000).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table headers
      expect(canvas.getByText("Transaction ID")).toBeInTheDocument();
      expect(canvas.getByText("Date")).toBeInTheDocument();
      expect(canvas.getByText("Description")).toBeInTheDocument();
      expect(canvas.getByText("Amount")).toBeInTheDocument();

      // Test some transaction data
      expect(canvas.getByText("TXN000001")).toBeInTheDocument();
      expect(canvas.getByText("Dec 10, 2024")).toBeInTheDocument();
      expect(canvas.getByText("Transaction description for item 1")).toBeInTheDocument();
      expect(canvas.getByText("$456.00")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "h-[400px] overflow-auto",
      children: {
        type: "Table",
        variant: "default",
        stickyHeader: true,
        head: {
          rows: [
            {
              cells: [
                { content: "Transaction ID" },
                { content: "Date" },
                { content: "Description" },
                { content: "Amount", align: "right" },
              ],
            },
          ],
        },
        body: {
          rows: Array.from({ length: 20 }, (_, i) => ({
            cells: [
              { content: `TXN${String(i + 1).padStart(6, "0")}`, className: "font-mono" },
              { content: `Dec ${10 + i}, 2024` },
              { content: `Transaction description for item ${i + 1}` },
              { content: `$${((i * 123 + 456) % 1000).toFixed(2)}`, align: "right" },
            ],
          })),
        },
      },
    },
  }
);

export const NoHoverEffect: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "default",
      hoverable: false,
    },
    render: (args) => (
      <Table {...args}>
        <TableCaption>Table without hover effects on rows</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Feature</TableHead>
            <TableHead>Free</TableHead>
            <TableHead>Pro</TableHead>
            <TableHead>Enterprise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Users</TableCell>
            <TableCell className="text-center">5</TableCell>
            <TableCell className="text-center">Unlimited</TableCell>
            <TableCell className="text-center">Unlimited</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Storage</TableCell>
            <TableCell className="text-center">10GB</TableCell>
            <TableCell className="text-center">100GB</TableCell>
            <TableCell className="text-center">1TB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Support</TableCell>
            <TableCell className="text-center">Community</TableCell>
            <TableCell className="text-center">Priority</TableCell>
            <TableCell className="text-center">24/7 Phone</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table caption
      expect(canvas.getByText("Table without hover effects on rows")).toBeInTheDocument();

      // Test table headers
      expect(canvas.getByText("Feature")).toBeInTheDocument();
      expect(canvas.getByText("Free")).toBeInTheDocument();
      expect(canvas.getByText("Pro")).toBeInTheDocument();
      expect(canvas.getByText("Enterprise")).toBeInTheDocument();

      // Test feature data
      expect(canvas.getByText("Users")).toBeInTheDocument();
      expect(canvas.getByText("Storage")).toBeInTheDocument();
      expect(canvas.getByText("Support")).toBeInTheDocument();
      expect(canvas.getByText("10GB")).toBeInTheDocument();
      expect(canvas.getByText("100GB")).toBeInTheDocument();
      expect(canvas.getByText("1TB")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Table",
      variant: "default",
      hoverable: false,
      caption: "Table without hover effects on rows",
      head: {
        rows: [
          {
            cells: [
              { content: "Feature" },
              { content: "Free" },
              { content: "Pro" },
              { content: "Enterprise" },
            ],
          },
        ],
      },
      body: {
        rows: [
          {
            cells: [
              { content: "Users", className: "font-medium" },
              { content: "5", align: "center" },
              { content: "Unlimited", align: "center" },
              { content: "Unlimited", align: "center" },
            ],
          },
          {
            cells: [
              { content: "Storage", className: "font-medium" },
              { content: "10GB", align: "center" },
              { content: "100GB", align: "center" },
              { content: "1TB", align: "center" },
            ],
          },
          {
            cells: [
              { content: "Support", className: "font-medium" },
              { content: "Community", align: "center" },
              { content: "Priority", align: "center" },
              { content: "24/7 Phone", align: "center" },
            ],
          },
        ],
      },
    },
  }
);

export const ComplexData: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "modern",
    },
    render: (args) => (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead className="text-right">Salary</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                <div>
                  <div className="font-medium">Sarah Anderson</div>
                  <div className="text-sm text-muted-foreground">Senior Developer</div>
                </div>
              </div>
            </TableCell>
            <TableCell>Engineering</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-muted">
                  <div className="h-full w-[85%] rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs">
                  React
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Node.js
                </Badge>
                <Badge variant="outline" className="text-xs">
                  +2
                </Badge>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium">$125,000</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600" />
                <div>
                  <div className="font-medium">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">Product Manager</div>
                </div>
              </div>
            </TableCell>
            <TableCell>Product</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-muted">
                  <div className="h-full w-[92%] rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-medium">92%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs">
                  Strategy
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Analytics
                </Badge>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium">$115,000</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table headers
      expect(canvas.getByText("Employee")).toBeInTheDocument();
      expect(canvas.getByText("Department")).toBeInTheDocument();
      expect(canvas.getByText("Performance")).toBeInTheDocument();
      expect(canvas.getByText("Projects")).toBeInTheDocument();
      expect(canvas.getByText("Salary")).toBeInTheDocument();
      expect(canvas.getByText("Actions")).toBeInTheDocument();

      // Test employee data
      expect(canvas.getByText("Sarah Anderson")).toBeInTheDocument();
      expect(canvas.getByText("Senior Developer")).toBeInTheDocument();
      expect(canvas.getByText("Engineering")).toBeInTheDocument();
      expect(canvas.getByText("85%")).toBeInTheDocument();
      expect(canvas.getByText("React")).toBeInTheDocument();
      expect(canvas.getByText("$125,000")).toBeInTheDocument();

      // Test buttons
      const editButtons = canvas.getAllByText("Edit");
      expect(editButtons).toHaveLength(2);
      const viewButtons = canvas.getAllByText("View");
      expect(viewButtons).toHaveLength(2);
    },
  },
  {
    renderSpec: {
      type: "Table",
      variant: "modern",
      head: {
        rows: [
          {
            cells: [
              { content: "Employee" },
              { content: "Department" },
              { content: "Performance" },
              { content: "Projects" },
              { content: "Salary", align: "right" },
              { content: "Actions" },
            ],
          },
        ],
      },
      body: {
        rows: [
          {
            cells: [
              {
                content: {
                  type: "Flex",
                  align: "center",
                  gap: "md",
                  children: [
                    {
                      type: "Box",
                      className: "h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600",
                    },
                    {
                      type: "Box",
                      children: [
                        {
                          type: "Text",
                          className: "font-medium",
                          children: "Sarah Anderson",
                        },
                        {
                          type: "Text",
                          className: "text-sm text-muted-foreground",
                          children: "Senior Developer",
                        },
                      ],
                    },
                  ],
                },
              },
              { content: "Engineering" },
              {
                content: {
                  type: "Flex",
                  align: "center",
                  gap: "sm",
                  children: [
                    {
                      type: "Box",
                      className: "h-2 w-24 rounded-full bg-muted",
                      children: {
                        type: "Box",
                        className: "h-full w-[85%] rounded-full bg-green-500",
                      },
                    },
                    {
                      type: "Text",
                      className: "text-sm font-medium",
                      children: "85%",
                    },
                  ],
                },
              },
              {
                content: {
                  type: "Flex",
                  gap: "xs",
                  children: [
                    {
                      type: "Badge",
                      variant: "outline",
                      className: "text-xs",
                      children: "React",
                    },
                    {
                      type: "Badge",
                      variant: "outline",
                      className: "text-xs",
                      children: "Node.js",
                    },
                    {
                      type: "Badge",
                      variant: "outline",
                      className: "text-xs",
                      children: "+2",
                    },
                  ],
                },
              },
              { content: "$125,000", align: "right", className: "font-medium" },
              {
                content: {
                  type: "Flex",
                  gap: "sm",
                  children: [
                    {
                      type: "Button",
                      variant: "ghost",
                      size: "sm",
                      children: "Edit",
                    },
                    {
                      type: "Button",
                      variant: "ghost",
                      size: "sm",
                      children: "View",
                    },
                  ],
                },
              },
            ],
          },
          {
            cells: [
              {
                content: {
                  type: "Flex",
                  align: "center",
                  gap: "md",
                  children: [
                    {
                      type: "Box",
                      className: "h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600",
                    },
                    {
                      type: "Box",
                      children: [
                        {
                          type: "Text",
                          className: "font-medium",
                          children: "Michael Chen",
                        },
                        {
                          type: "Text",
                          className: "text-sm text-muted-foreground",
                          children: "Product Manager",
                        },
                      ],
                    },
                  ],
                },
              },
              { content: "Product" },
              {
                content: {
                  type: "Flex",
                  align: "center",
                  gap: "sm",
                  children: [
                    {
                      type: "Box",
                      className: "h-2 w-24 rounded-full bg-muted",
                      children: {
                        type: "Box",
                        className: "h-full w-[92%] rounded-full bg-green-500",
                      },
                    },
                    {
                      type: "Text",
                      className: "text-sm font-medium",
                      children: "92%",
                    },
                  ],
                },
              },
              {
                content: {
                  type: "Flex",
                  gap: "xs",
                  children: [
                    {
                      type: "Badge",
                      variant: "outline",
                      className: "text-xs",
                      children: "Strategy",
                    },
                    {
                      type: "Badge",
                      variant: "outline",
                      className: "text-xs",
                      children: "Analytics",
                    },
                  ],
                },
              },
              { content: "$115,000", align: "right", className: "font-medium" },
              {
                content: {
                  type: "Flex",
                  gap: "sm",
                  children: [
                    {
                      type: "Button",
                      variant: "ghost",
                      size: "sm",
                      children: "Edit",
                    },
                    {
                      type: "Button",
                      variant: "ghost",
                      size: "sm",
                      children: "View",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  }
);

export const Responsive: Story = enhanceStoryForDualMode<typeof Table>(
  {
    args: {
      variant: "default",
    },
    parameters: {
      viewport: {
        defaultViewport: "mobile1",
      },
    },
    render: (args) => (
      <div className="w-[350px]">
        <Table {...args}>
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test table caption
      expect(canvas.getByText("Responsive table with horizontal scroll")).toBeInTheDocument();

      // Test table headers
      expect(canvas.getByText("ID")).toBeInTheDocument();
      expect(canvas.getByText("Product Name")).toBeInTheDocument();
      expect(canvas.getByText("Description")).toBeInTheDocument();
      expect(canvas.getByText("Price")).toBeInTheDocument();
      expect(canvas.getByText("Stock")).toBeInTheDocument();
      expect(canvas.getByText("Category")).toBeInTheDocument();

      // Test product data
      expect(canvas.getByText("001")).toBeInTheDocument();
      expect(canvas.getByText('MacBook Pro 16"')).toBeInTheDocument();
      expect(canvas.getByText("High-performance laptop for professionals")).toBeInTheDocument();
      expect(canvas.getByText("$2,399")).toBeInTheDocument();
      expect(canvas.getByText("12")).toBeInTheDocument();
      expect(canvas.getByText("Electronics")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[350px]",
      children: {
        type: "Table",
        variant: "default",
        caption: "Responsive table with horizontal scroll",
        head: {
          rows: [
            {
              cells: [
                { content: "ID" },
                { content: "Product Name" },
                { content: "Description" },
                { content: "Price" },
                { content: "Stock" },
                { content: "Category" },
              ],
            },
          ],
        },
        body: {
          rows: [
            {
              cells: [
                { content: "001" },
                { content: 'MacBook Pro 16"', className: "whitespace-nowrap" },
                { content: "High-performance laptop for professionals" },
                { content: "$2,399" },
                { content: "12" },
                { content: "Electronics" },
              ],
            },
            {
              cells: [
                { content: "002" },
                { content: "iPhone 15 Pro", className: "whitespace-nowrap" },
                { content: "Latest flagship smartphone with titanium design" },
                { content: "$999" },
                { content: "0" },
                { content: "Electronics" },
              ],
            },
          ],
        },
      },
    },
  }
);
