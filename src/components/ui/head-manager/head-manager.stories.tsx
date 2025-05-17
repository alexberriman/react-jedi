import type { Meta, StoryObj } from "@storybook/react";
import { HeadManager } from "./head-manager";

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

export const BasicUsage: Story = {
  args: {
    metadata: {
      title: "My Page",
      description: "This is a simple page with basic metadata",
    },
    children: <div>Page content goes here</div>,
  },
};

export const CompleteMetadata: Story = {
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
};

export const WithFavicon: Story = {
  args: {
    metadata: {
      title: "Home",
      description: "Welcome to our website",
      favicon: "/favicon.ico",
    },
    children: <div>Home page content</div>,
  },
};

export const WithFaviconSet: Story = {
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
};

export const BlogPost: Story = {
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
};

export const MinimalConfiguration: Story = {
  args: {
    metadata: {
      title: "Simple Page",
    },
    children: <div>Minimal metadata configuration</div>,
  },
};

export const WithDefaultTitle: Story = {
  args: {
    metadata: {
      title: "",
      description: "This page uses the default title",
    },
    defaultTitle: "My Default App Title",
    children: <div>Page using default title</div>,
  },
};
