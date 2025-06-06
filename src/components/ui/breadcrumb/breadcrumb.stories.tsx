import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../breadcrumb";
import { Home, Slash } from "lucide-react";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Breadcrumb>(
  {
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test breadcrumb navigation structure exists
      const nav = canvasElement.querySelector('nav') || canvasElement.querySelector('[data-slot="breadcrumb"]');
      expect(nav).toBeInTheDocument();

      // Test text content is present
      expect(canvas.getByText("Home")).toBeInTheDocument();
      expect(canvas.getByText("Dashboard")).toBeInTheDocument();
      expect(canvas.getByText("Settings")).toBeInTheDocument();

      // Test current page has aria-current attribute
      const currentPage = canvas.getByText("Settings");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    },
  },
  {
    renderSpec: {
      type: "breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", isCurrentPage: true },
      ],
    },
  }
);

export const WithHomeIcon: Story = enhanceStoryForDualMode<typeof Breadcrumb>(
  {
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>React Jedi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test breadcrumb navigation structure exists
      const nav = canvasElement.querySelector('nav') || canvasElement.querySelector('[data-slot="breadcrumb"]');
      expect(nav).toBeInTheDocument();

      // Test text content is present
      expect(canvas.getByText("Home")).toBeInTheDocument();
      expect(canvas.getByText("Projects")).toBeInTheDocument();
      expect(canvas.getByText("React Jedi")).toBeInTheDocument();

      // Test current page has aria-current attribute
      const currentPage = canvas.getByText("React Jedi");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    },
  },
  {
    renderSpec: {
      type: "breadcrumb",
      items: [
        { label: "Home", href: "/", icon: "🏠" },
        { label: "Projects", href: "/projects" },
        { label: "React Jedi", isCurrentPage: true },
      ],
    },
  }
);

export const WithEllipsis: Story = enhanceStoryForDualMode<typeof Breadcrumb>(
  {
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/parent">Parent</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test breadcrumb navigation structure exists
      const nav = canvasElement.querySelector('nav') || canvasElement.querySelector('[data-slot="breadcrumb"]');
      expect(nav).toBeInTheDocument();

      // Test text content is present
      expect(canvas.getByText("Parent")).toBeInTheDocument();
      expect(canvas.getByText("Current Page")).toBeInTheDocument();

      // Test current page has aria-current attribute
      const currentPage = canvas.getByText("Current Page");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    },
  },
  {
    renderSpec: {
      type: "breadcrumb",
      items: [
        { label: "🏠", href: "/" },
        { label: "Parent", href: "/parent" },
        { label: "Current Page", isCurrentPage: true },
      ],
    },
  }
);

export const CustomSeparator: Story = enhanceStoryForDualMode<typeof Breadcrumb>(
  {
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Electronics</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test breadcrumb navigation structure exists
      const nav = canvasElement.querySelector('nav') || canvasElement.querySelector('[data-slot="breadcrumb"]');
      expect(nav).toBeInTheDocument();

      // Test text content is present
      expect(canvas.getByText("Home")).toBeInTheDocument();
      expect(canvas.getByText("Products")).toBeInTheDocument();
      expect(canvas.getByText("Electronics")).toBeInTheDocument();

      // Test current page has aria-current attribute
      const currentPage = canvas.getByText("Electronics");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    },
  },
  {
    renderSpec: {
      type: "breadcrumb",
      separator: "slash",
      items: [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Electronics", isCurrentPage: true },
      ],
    },
  }
);

export const ComplexExample: Story = enhanceStoryForDualMode<typeof Breadcrumb>(
  {
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects/react-jedi">React Jedi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test breadcrumb navigation structure exists
      const nav = canvasElement.querySelector('nav') || canvasElement.querySelector('[data-slot="breadcrumb"]');
      expect(nav).toBeInTheDocument();

      // Test text content is present
      expect(canvas.getByText("Dashboard")).toBeInTheDocument();
      expect(canvas.getByText("Projects")).toBeInTheDocument();
      expect(canvas.getByText("React Jedi")).toBeInTheDocument();
      expect(canvas.getByText("Settings")).toBeInTheDocument();

      // Test current page has aria-current attribute
      const currentPage = canvas.getByText("Settings");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    },
  },
  {
    renderSpec: {
      type: "breadcrumb",
      items: [
        { label: "Dashboard", href: "/", icon: "🏠" },
        { label: "Projects", href: "/projects" },
        { label: "React Jedi", href: "/projects/react-jedi" },
        { label: "Settings", isCurrentPage: true },
      ],
    },
  }
);

export const ResponsiveBreadcrumb: Story = enhanceStoryForDualMode<typeof Breadcrumb>(
  {
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block" />
          <BreadcrumbItem className="hidden sm:block">
            <BreadcrumbLink href="/documents">Documents</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block" />
          <BreadcrumbItem className="hidden sm:block">
            <BreadcrumbLink href="/documents/shared">Shared</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Important File.pdf</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test breadcrumb navigation structure exists
      const nav = canvasElement.querySelector('nav') || canvasElement.querySelector('[data-slot="breadcrumb"]');
      expect(nav).toBeInTheDocument();

      // Test current page is always visible
      const currentPage = canvas.getByText("Important File.pdf");
      expect(currentPage).toBeInTheDocument();
      expect(currentPage).toHaveAttribute("aria-current", "page");

      // Test that breadcrumb structure exists
      expect(canvas.getByText("Home")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "breadcrumb",
      items: [
        { label: "Home", href: "/", icon: "🏠" },
        { label: "Documents", href: "/documents" },
        { label: "Shared", href: "/documents/shared" },
        { label: "Important File.pdf", isCurrentPage: true },
      ],
    },
  }
);

export const NoLinks: Story = enhanceStoryForDualMode<typeof Breadcrumb>(
  {
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <span className="text-muted-foreground">Home</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="text-muted-foreground">Category</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test breadcrumb navigation structure exists
      const nav = canvasElement.querySelector('nav') || canvasElement.querySelector('[data-slot="breadcrumb"]');
      expect(nav).toBeInTheDocument();

      // Test text content is present
      expect(canvas.getByText("Home")).toBeInTheDocument();
      expect(canvas.getByText("Category")).toBeInTheDocument();
      expect(canvas.getByText("Product")).toBeInTheDocument();

      // Test current page has aria-current attribute
      const currentPage = canvas.getByText("Product");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    },
  },
  {
    renderSpec: {
      type: "breadcrumb",
      items: [
        { label: "Home" },
        { label: "Category" },
        { label: "Product", isCurrentPage: true },
      ],
    },
  }
);
