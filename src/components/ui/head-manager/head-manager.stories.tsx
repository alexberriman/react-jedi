import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, waitFor } from "storybook/test";
import { HeadManager } from "./head-manager";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Utility/HeadManager",
  component: HeadManager,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
HeadManager is a utility component that manages document head elements including title, meta tags,
Open Graph tags, Twitter cards, canonical URLs, and favicons. It provides a declarative way to set
and manage SEO-related metadata for your pages.

### Features
- Page title management with optional suffix
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Twitter card metadata
- Canonical URL specification
- Favicon management with multiple formats

### Usage Notes
- The component renders its children without any wrapper elements
- Metadata is cleaned up when the component unmounts
- Previous values are restored to prevent memory leaks
`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    metadata: {
      description: "Page metadata configuration",
      control: { type: "object" },
    },
    titleSuffix: {
      description: "Suffix to append to all page titles",
      control: { type: "text" },
    },
    defaultTitle: {
      description: "Default title when none is provided",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof HeadManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = enhanceStoryForDualMode(
  {
    args: {
      metadata: {
        title: "My Page",
        description: "This is a simple page with basic metadata",
      },
      children: <div>Page content goes here</div>,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Verify content is rendered
      expect(canvas.getByText("Page content goes here")).toBeInTheDocument();

      // Wait for head updates
      await waitFor(() => {
        expect(document.title).toContain("My Page");
      });

      // Verify meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeInTheDocument();
      expect(metaDescription?.getAttribute("content")).toBe(
        "This is a simple page with basic metadata"
      );
    },
  },
  {
    renderSpec: {
      type: "HeadManager",
      metadata: {
        title: "My Page",
        description: "This is a simple page with basic metadata",
      },
      children: {
        type: "Text",
        children: "Page content goes here",
      },
    },
  }
) as Story;

export const CompleteMetadata: Story = enhanceStoryForDualMode(
  {
    args: {
      metadata: {
        title: "Product Page",
        description: "Discover our amazing product that will change your life",
        keywords: ["product", "amazing", "innovative"],
        author: "John Doe",
        ogTitle: "Amazing Product - Transform Your Life",
        ogDescription: "Our revolutionary product helps you achieve more",
        ogImage: "https://example.com/product-og.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: "Check out this amazing product!",
        twitterDescription: "Transform your daily routine with our innovation",
        twitterImage: "https://example.com/product-twitter.jpg",
        canonicalUrl: "https://example.com/products/amazing",
      },
      titleSuffix: " | MyCompany",
      children: <div>Product page content</div>,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Verify content
      expect(canvas.getByText("Product page content")).toBeInTheDocument();

      // Wait for head updates
      await waitFor(() => {
        expect(document.title).toBe("Product Page | MyCompany");
      });

      // Verify meta tags
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute("content")).toBe(
        "Discover our amazing product that will change your life"
      );

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      expect(metaKeywords?.getAttribute("content")).toBe("product, amazing, innovative");

      const metaAuthor = document.querySelector('meta[name="author"]');
      expect(metaAuthor?.getAttribute("content")).toBe("John Doe");

      // Verify Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle?.getAttribute("content")).toBe("Amazing Product - Transform Your Life");

      const ogDescription = document.querySelector('meta[property="og:description"]');
      expect(ogDescription?.getAttribute("content")).toBe(
        "Our revolutionary product helps you achieve more"
      );

      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage?.getAttribute("content")).toBe("https://example.com/product-og.jpg");

      // Verify Twitter tags
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      expect(twitterCard?.getAttribute("content")).toBe("summary_large_image");

      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      expect(twitterTitle?.getAttribute("content")).toBe("Check out this amazing product!");

      // Verify canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute("href")).toBe("https://example.com/products/amazing");
    },
  },
  {
    renderSpec: {
      type: "HeadManager",
      metadata: {
        title: "Product Page",
        description: "Discover our amazing product that will change your life",
        keywords: ["product", "amazing", "innovative"],
        author: "John Doe",
        ogTitle: "Amazing Product - Transform Your Life",
        ogDescription: "Our revolutionary product helps you achieve more",
        ogImage: "https://example.com/product-og.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: "Check out this amazing product!",
        twitterDescription: "Transform your daily routine with our innovation",
        twitterImage: "https://example.com/product-twitter.jpg",
        canonicalUrl: "https://example.com/products/amazing",
      },
      titleSuffix: " | MyCompany",
      children: {
        type: "Text",
        children: "Product page content",
      },
    },
  }
) as Story;

export const WithFavicon: Story = enhanceStoryForDualMode(
  {
    args: {
      metadata: {
        title: "Home",
        description: "Welcome to our website",
        favicon: "/favicon.ico",
      },
      children: <div>Home page content</div>,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      // Verify content
      expect(canvas.getByText("Home page content")).toBeInTheDocument();

      // Wait for head updates
      await waitFor(() => {
        expect(document.title).toContain("Home");
      });

      // Verify favicon link
      const faviconLink = document.querySelector('link[rel="icon"]');
      expect(faviconLink).toBeInTheDocument();
      expect(faviconLink?.getAttribute("href")).toBe("/favicon.ico");
    },
  },
  {
    renderSpec: {
      type: "HeadManager",
      metadata: {
        title: "Home",
        description: "Welcome to our website",
        favicon: "/favicon.ico",
      },
      children: {
        type: "Text",
        children: "Home page content",
      },
    },
  }
) as Story;

export const WithFaviconSet: Story = enhanceStoryForDualMode({
  args: {
    metadata: {
      title: "Advanced Favicon Example",
      favicon: {
        default: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        icon16: "/favicon-16x16.png",
        icon32: "/favicon-32x32.png",
        manifest: "/site.webmanifest",
      },
    },
    children: <div>Page with multiple favicon formats</div>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Verify content is rendered
    expect(canvas.getByText("Page with multiple favicon formats")).toBeInTheDocument();

    // Wait for head updates
    await waitFor(() => {
      expect(document.title).toContain("Advanced Favicon Example");
    });
  },
}) as Story;

export const BlogPost: Story = enhanceStoryForDualMode({
  args: {
    metadata: {
      title: "How to Build Modern Web Applications",
      description: "Learn the best practices for building scalable web apps in 2025",
      keywords: ["web development", "react", "modern", "tutorial"],
      author: "Jane Smith",
      ogTitle: "Modern Web Apps: A Complete Guide",
      ogDescription: "Everything you need to know about building web applications",
      ogImage: "https://example.com/blog/modern-web-apps.jpg",
      twitterCard: "summary",
      canonicalUrl: "https://example.com/blog/modern-web-apps",
    },
    titleSuffix: " - Tech Blog",
    children: <div>Blog post content</div>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Verify content is rendered
    expect(canvas.getByText("Blog post content")).toBeInTheDocument();

    // Wait for head updates
    await waitFor(() => {
      expect(document.title).toBe("How to Build Modern Web Applications - Tech Blog");
    });

    // Verify meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe(
      "Learn the best practices for building scalable web apps in 2025"
    );

    // Verify author
    const metaAuthor = document.querySelector('meta[name="author"]');
    expect(metaAuthor?.getAttribute("content")).toBe("Jane Smith");

    // Verify Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute("content")).toBe("Modern Web Apps: A Complete Guide");

    // Verify canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe("https://example.com/blog/modern-web-apps");
  },
}) as Story;

export const MinimalConfiguration: Story = enhanceStoryForDualMode({
  args: {
    metadata: {
      title: "Simple Page",
    },
    children: <div>Minimal metadata configuration</div>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Verify content is rendered
    expect(canvas.getByText("Minimal metadata configuration")).toBeInTheDocument();

    // Wait for head updates
    await waitFor(() => {
      expect(document.title).toContain("Simple Page");
    });
  },
}) as Story;

export const WithDefaultTitle: Story = enhanceStoryForDualMode({
  args: {
    metadata: {
      title: "",
      description: "This page uses the default title",
    },
    defaultTitle: "My Default App Title",
    children: <div>Page using default title</div>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Verify content is rendered
    expect(canvas.getByText("Page using default title")).toBeInTheDocument();

    // Wait for head updates
    await waitFor(() => {
      expect(document.title).toBe("My Default App Title");
    });

    // Verify meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe("This page uses the default title");
  },
}) as Story;
