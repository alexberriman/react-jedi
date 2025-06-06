import type { Meta, StoryObj } from "@storybook/react-vite";
import { BlogPostGrid } from "./blog-post-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const meta = {
  title: "Blocks/BlogPostGrid",
  component: BlogPostGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["cards", "minimal", "magazine", "with-sidebar", "masonry"],
    },
    showFilters: {
      control: "boolean",
    },
    showSearch: {
      control: "boolean",
    },
    showPagination: {
      control: "boolean",
    },
    showLoadMore: {
      control: "boolean",
    },
    postsPerPage: {
      control: "number",
    },
    loading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof BlogPostGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample blog posts
const generateSamplePosts = (count: number) => {
  const categories = ["Technology", "Design", "Business", "Marketing", "Development"];
  const authors = [
    { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?img=3" },
    { name: "Sarah Williams", avatar: "https://i.pravatar.cc/150?img=4" },
    { name: "Chris Brown", avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  const titles = [
    "The Future of Web Development: Trends to Watch",
    "Mastering React Performance Optimization",
    "Building Scalable Design Systems",
    "The Art of Writing Clean Code",
    "Understanding Modern CSS Architecture",
    "TypeScript Best Practices for Large Projects",
    "Creating Accessible User Interfaces",
    "The Psychology of User Experience Design",
    "Microservices vs Monoliths: A Practical Guide",
    "GraphQL: The Future of API Design",
    "State Management in Modern React Applications",
    "CSS Grid vs Flexbox: When to Use What",
    "Testing Strategies for Frontend Applications",
    "The Rise of JAMstack Architecture",
    "Progressive Web Apps: A Complete Guide",
  ];

  const excerpts = [
    "Explore the latest trends and technologies shaping the future of web development. From AI integration to edge computing, discover what's next.",
    "Learn advanced techniques to optimize your React applications for better performance, faster load times, and improved user experience.",
    "A comprehensive guide to building and maintaining design systems that scale with your organization and product needs.",
    "Writing clean, maintainable code is an art. Discover principles and practices that will elevate your coding standards.",
    "Modern CSS has evolved significantly. Learn about the latest architectural patterns and methodologies for scalable stylesheets.",
    "TypeScript can be challenging in large projects. Here are battle-tested practices to keep your codebase maintainable and type-safe.",
    "Accessibility is not optional. Learn how to create inclusive user interfaces that work for everyone, regardless of ability.",
    "Understanding user psychology is crucial for creating engaging experiences. Dive into the principles that drive user behavior.",
    "Choosing between microservices and monolithic architecture? This guide helps you make the right decision for your project.",
    "GraphQL is revolutionizing API design. Learn why it might be the perfect solution for your next project.",
    "State management can make or break your React app. Explore modern solutions and patterns for managing application state.",
    "CSS Grid and Flexbox are powerful layout tools. Learn when and how to use each for optimal results.",
    "Testing is crucial for maintaining quality. Discover effective strategies for testing modern frontend applications.",
    "JAMstack is changing how we build websites. Learn about this modern architecture and its benefits.",
    "PWAs combine the best of web and mobile apps. This guide covers everything you need to know to build one.",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    title: titles[i % titles.length],
    excerpt: excerpts[i % excerpts.length],
    featuredImage: `https://placehold.co/800x450/EEE/31343C`,
    category: categories[i % categories.length],
    tags: ["react", "javascript", "web"],
    author: authors[i % authors.length],
    publishDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    readTime: ((i * 7) % 10) + 3, // Deterministic value based on index
    isFeatured: i < 2,
    slug: `${titles[i % titles.length].toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`,
  }));
};

const samplePosts = generateSamplePosts(30);

// Sidebar content for 'with-sidebar' variant
const SidebarContent = () => (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {["Technology", "Design", "Business", "Marketing", "Development"].map((category) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm">{category}</span>
              <Badge variant="secondary">{((category.length * 3) % 20) + 5}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Popular Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {samplePosts.slice(0, 5).map((post, index) => (
            <div key={post.id}>
              <h4 className="text-sm font-medium line-clamp-2">{post.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{post.readTime} min read</p>
              {index < 4 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Get the latest posts delivered to your inbox.
        </p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 text-sm border rounded-md"
          />
          <Button className="w-full" size="sm">
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  </>
);

export const Default: Story = {
  args: {
    posts: samplePosts.slice(0, 9),
    variant: "cards",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 9,
  },
};

export const MinimalList: Story = {
  args: {
    posts: samplePosts.slice(0, 10),
    variant: "minimal",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 10,
  },
};

export const MagazineStyle: Story = {
  args: {
    posts: samplePosts.slice(0, 9),
    variant: "magazine",
    showFilters: false,
    showSearch: false,
    showPagination: true,
    postsPerPage: 9,
  },
};

export const WithSidebar: Story = {
  args: {
    posts: samplePosts.slice(0, 6),
    variant: "with-sidebar",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 6,
    sidebarContent: <SidebarContent />,
  },
};

export const MasonryLayout: Story = {
  args: {
    posts: samplePosts.slice(0, 12),
    variant: "masonry",
    showFilters: true,
    showSearch: true,
    showPagination: false,
    showLoadMore: true,
    postsPerPage: 12,
  },
};

export const LoadingState: Story = {
  args: {
    posts: [],
    variant: "cards",
    loading: true,
    showFilters: true,
    showSearch: true,
    postsPerPage: 9,
  },
};

export const EmptyState: Story = {
  args: {
    posts: [],
    variant: "cards",
    showFilters: true,
    showSearch: true,
    postsPerPage: 9,
  },
};

export const FeaturedPosts: Story = {
  args: {
    posts: samplePosts.slice(0, 12),
    variant: "cards",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 12,
    featuredPostIds: ["post-3", "post-5", "post-7"],
  },
};

export const NoControls: Story = {
  args: {
    posts: samplePosts.slice(0, 6),
    variant: "cards",
    showFilters: false,
    showSearch: false,
    showPagination: false,
    postsPerPage: 6,
  },
};

export const InfiniteScroll: Story = {
  args: {
    posts: samplePosts,
    variant: "cards",
    showFilters: true,
    showSearch: true,
    showPagination: false,
    showLoadMore: true,
    postsPerPage: 9,
    onLoadMore: () => console.log("Load more triggered"),
  },
};

export const CustomSortOptions: Story = {
  args: {
    posts: samplePosts.slice(0, 9),
    variant: "cards",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 9,
    sortOptions: [
      { label: "Latest", value: "date-desc" },
      { label: "Trending", value: "popularity" },
    ],
  },
};

export const MobileResponsive: Story = {
  args: {
    posts: samplePosts.slice(0, 6),
    variant: "cards",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 6,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
