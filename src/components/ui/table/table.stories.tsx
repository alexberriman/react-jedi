import type { Meta, StoryObj } from "@storybook/react";
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
  { name: "MacBook Pro 16\"", category: "Electronics", price: 2399, stock: 12, status: "In Stock" },
  { name: "iPhone 15 Pro", category: "Electronics", price: 999, stock: 0, status: "Out of Stock" },
  { name: "AirPods Pro", category: "Accessories", price: 249, stock: 45, status: "In Stock" },
  { name: "Apple Watch Ultra", category: "Wearables", price: 799, stock: 5, status: "Low Stock" },
  { name: "iPad Pro 12.9\"", category: "Electronics", price: 1299, stock: 8, status: "In Stock" },
  { name: "Magic Keyboard", category: "Accessories", price: 349, stock: 23, status: "In Stock" },
];

// Sample data for users
const userData = [
  { name: "John Doe", email: "john.doe@example.com", role: "Developer", status: "Active", lastActive: "2 hours ago" },
  { name: "Jane Smith", email: "jane.smith@example.com", role: "Designer", status: "Active", lastActive: "5 minutes ago" },
  { name: "Bob Johnson", email: "bob.johnson@example.com", role: "Manager", status: "Inactive", lastActive: "2 days ago" },
  { name: "Alice Brown", email: "alice.brown@example.com", role: "Developer", status: "Active", lastActive: "1 hour ago" },
  { name: "Charlie Wilson", email: "charlie.wilson@example.com", role: "QA Engineer", status: "Active", lastActive: "30 minutes ago" },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
    "Paid": "default",
    "Pending": "secondary",
    "Unpaid": "destructive",
    "In Stock": "default",
    "Out of Stock": "destructive",
    "Low Stock": "secondary",
    "Active": "default",
    "Inactive": "outline",
  };
  return <Badge variant={variants[status] || "default"}>{status}</Badge>;
};

export const Default: Story = {
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
};

export const Striped: Story = {
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
};

export const Bordered: Story = {
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
};

export const Minimal: Story = {
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
          <TableCell><Badge variant="secondary">Medium</Badge></TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>Dec 15, 2024</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Fix login bug</TableCell>
          <TableCell><Badge variant="destructive">High</Badge></TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Dec 12, 2024</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Design new landing page</TableCell>
          <TableCell><Badge variant="outline">Low</Badge></TableCell>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>Dec 20, 2024</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Implement search feature</TableCell>
          <TableCell><Badge variant="destructive">High</Badge></TableCell>
          <TableCell>Alice Brown</TableCell>
          <TableCell>Dec 14, 2024</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
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
            <TableCell><Badge variant="default" className="h-5 text-xs">Healthy</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-xs">web-02</TableCell>
            <TableCell>89%</TableCell>
            <TableCell>91%</TableCell>
            <TableCell>85%</TableCell>
            <TableCell><Badge variant="destructive" className="h-5 text-xs">Critical</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-xs">db-01</TableCell>
            <TableCell>23%</TableCell>
            <TableCell>45%</TableCell>
            <TableCell>56%</TableCell>
            <TableCell><Badge variant="default" className="h-5 text-xs">Healthy</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-xs">db-02</TableCell>
            <TableCell>67%</TableCell>
            <TableCell>73%</TableCell>
            <TableCell>69%</TableCell>
            <TableCell><Badge variant="secondary" className="h-5 text-xs">Warning</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-xs">cache-01</TableCell>
            <TableCell>12%</TableCell>
            <TableCell>28%</TableCell>
            <TableCell>34%</TableCell>
            <TableCell><Badge variant="default" className="h-5 text-xs">Healthy</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const Modern: Story = {
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
            <Button variant="ghost" size="sm">View</Button>
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
            <Button variant="ghost" size="sm">View</Button>
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
            <Button variant="ghost" size="sm">View</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithStickyHeader: Story = {
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
};

export const NoHoverEffect: Story = {
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
};

export const ComplexData: Story = {
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
              <Badge variant="outline" className="text-xs">React</Badge>
              <Badge variant="outline" className="text-xs">Node.js</Badge>
              <Badge variant="outline" className="text-xs">+2</Badge>
            </div>
          </TableCell>
          <TableCell className="text-right font-medium">$125,000</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">View</Button>
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
              <Badge variant="outline" className="text-xs">Strategy</Badge>
              <Badge variant="outline" className="text-xs">Analytics</Badge>
            </div>
          </TableCell>
          <TableCell className="text-right font-medium">$115,000</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Responsive: Story = {
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
};