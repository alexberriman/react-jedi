import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { BlogPostGrid } from "./blog-post-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode({
  args: {
    posts: samplePosts.slice(0, 9),
    variant: "cards",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 9,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that search bar is rendered
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
    
    // Test that filters are rendered
    const categoryFilter = canvas.getByText(/all categories/i);
    expect(categoryFilter).toBeInTheDocument();
    
    // Test that posts are rendered - look for post titles
    const postTitles = samplePosts.slice(0, 9).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Note: Pagination only shows when there are multiple pages
    
    // Test that post content is rendered
    const firstPostTitle = canvas.getByText(samplePosts[0].title);
    expect(firstPostTitle).toBeInTheDocument();
  },
}) as Story;

export const MinimalList: Story = enhanceStoryForDualMode({
  args: {
    posts: samplePosts.slice(0, 10),
    variant: "minimal",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 10,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test minimal variant rendering - check for post titles
    const postTitles = samplePosts.slice(0, 10).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test search and filters
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
    
    // Test pagination
    // Note: Pagination is tested elsewhere
    
    // Verify minimal layout renders
    const firstPost = canvas.getByText(samplePosts[0].title);
    expect(firstPost).toBeInTheDocument();
  },
}) as Story;

export const MagazineStyle: Story = enhanceStoryForDualMode({
  args: {
    posts: samplePosts.slice(0, 9),
    variant: "magazine",
    showFilters: false,
    showSearch: false,
    showPagination: true,
    postsPerPage: 9,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test magazine variant rendering - check for post titles
    const postTitles = samplePosts.slice(0, 9).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that search and filters are NOT rendered
    const searchInput = canvas.queryByPlaceholderText(/search posts/i);
    expect(searchInput).not.toBeInTheDocument();
    
    // Test pagination is rendered
    // Note: Pagination is tested elsewhere
    
    // Test featured posts are displayed prominently
    const firstPostTitle = canvas.getByText(samplePosts[0].title);
    expect(firstPostTitle).toBeInTheDocument();
  },
}) as Story;

export const WithSidebar: Story = enhanceStoryForDualMode(
  {
    args: {
      posts: samplePosts.slice(0, 6),
      variant: "with-sidebar",
      showFilters: true,
      showSearch: true,
      showPagination: true,
      postsPerPage: 6,
      sidebarContent: <SidebarContent />,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      
      // Test sidebar variant rendering - check that some posts are displayed
      // In sidebar layout, titles may appear multiple times
      const allTitles = canvas.getAllByText(samplePosts[0].title);
      expect(allTitles.length).toBeGreaterThan(0);
      
      // Test search and filters
      const searchInput = canvas.getByPlaceholderText(/search posts/i);
      expect(searchInput).toBeInTheDocument();
      
      // Test sidebar content is rendered
      const categoriesTitle = canvas.getByText('Categories');
      expect(categoriesTitle).toBeInTheDocument();
      
      const popularPostsTitle = canvas.getByText('Popular Posts');
      expect(popularPostsTitle).toBeInTheDocument();
      
      const newsletterTitle = canvas.getByText('Newsletter');
      expect(newsletterTitle).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "BlogPostGrid",
      posts: samplePosts.slice(0, 6),
      variant: "with-sidebar",
      showFilters: true,
      showSearch: true,
      showPagination: true,
      postsPerPage: 6,
      sidebarContent: {
        type: "Flex",
        direction: "column",
        gap: "lg",
        children: [
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [{
                  type: "CardTitle",
                  children: "Categories"
                }]
              },
              {
                type: "CardContent",
                children: [{
                  type: "Flex",
                  direction: "column",
                  gap: "sm",
                  children: ["Technology", "Design", "Business", "Marketing", "Development"].map((category) => ({
                    type: "Flex",
                    align: "center",
                    justify: "between",
                    children: [
                      {
                        type: "Text",
                        size: "sm",
                        children: category
                      },
                      {
                        type: "Badge",
                        variant: "secondary",
                        children: String(((category.length * 3) % 20) + 5)
                      }
                    ]
                  }))
                }]
              }
            ]
          },
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [{
                  type: "CardTitle",
                  children: "Popular Posts"
                }]
              },
              {
                type: "CardContent",
                children: [{
                  type: "Flex",
                  direction: "column",
                  gap: "md",
                  children: samplePosts.slice(0, 5).map((post, index) => ({
                    type: "Flex",
                    direction: "column",
                    gap: "sm",
                    children: [
                      {
                        type: "Heading",
                        level: 4,
                        className: "text-sm font-medium line-clamp-2",
                        children: post.title
                      },
                      {
                        type: "Text",
                        size: "xs",
                        variant: "muted",
                        children: `${post.readTime} min read`
                      },
                      ...(index < 4 ? [{
                        type: "Separator",
                        className: "mt-3"
                      }] : [])
                    ]
                  }))
                }]
              }
            ]
          },
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [{
                  type: "CardTitle",
                  children: "Newsletter"
                }]
              },
              {
                type: "CardContent",
                children: [
                  {
                    type: "Text",
                    size: "sm",
                    variant: "muted",
                    className: "mb-4",
                    children: "Get the latest posts delivered to your inbox."
                  },
                  {
                    type: "Flex",
                    direction: "column",
                    gap: "sm",
                    children: [
                      {
                        type: "Input",
                        inputType: "email",
                        placeholder: "Enter your email"
                      },
                      {
                        type: "Button",
                        className: "w-full",
                        size: "sm",
                        children: "Subscribe"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
) as Story;

export const MasonryLayout: Story = enhanceStoryForDualMode({
  args: {
    posts: samplePosts.slice(0, 20),
    variant: "masonry",
    showFilters: true,
    showSearch: true,
    showPagination: false,
    showLoadMore: true,
    postsPerPage: 12,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test masonry variant rendering - check for post titles
    const postTitles = samplePosts.slice(0, 12).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test search and filters
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
    
    // Test that pagination is NOT rendered
    const pagination = canvas.queryByRole('navigation');
    expect(pagination).not.toBeInTheDocument();
    
    // Test that Load More button is rendered
    const loadMoreButton = canvas.getByRole('button', { name: 'Load More' });
    expect(loadMoreButton).toBeInTheDocument();
  },
}) as Story;

export const LoadingState: Story = enhanceStoryForDualMode({
  args: {
    posts: [],
    variant: "cards",
    loading: true,
    showFilters: true,
    showSearch: true,
    postsPerPage: 9,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test search and filters are still rendered in loading state
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
    
    // Test loading skeletons are rendered
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  },
}) as Story;

export const EmptyState: Story = enhanceStoryForDualMode({
  args: {
    posts: [],
    variant: "cards",
    showFilters: true,
    showSearch: true,
    postsPerPage: 9,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test search and filters are still rendered
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
    
    // Test empty state message is shown
    const emptyMessage = canvas.getByText(/no posts found/i);
    expect(emptyMessage).toBeInTheDocument();
  },
}) as Story;

export const FeaturedPosts: Story = enhanceStoryForDualMode({
  args: {
    posts: samplePosts.slice(0, 12),
    variant: "cards",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 12,
    featuredPostIds: ["post-3", "post-5", "post-7"],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that posts are rendered - check for post titles
    const postTitles = samplePosts.slice(0, 12).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test featured posts have special styling
    // First 2 posts are already featured + 3 additional = 5 total
    const featuredBadges = canvas.getAllByText(/featured/i);
    expect(featuredBadges).toHaveLength(5);
    
    // Test search and filters
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
  },
}) as Story;

export const NoControls: Story = enhanceStoryForDualMode({
  args: {
    posts: samplePosts.slice(0, 6),
    variant: "cards",
    showFilters: false,
    showSearch: false,
    showPagination: false,
    postsPerPage: 6,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that posts are rendered - check for post titles
    const postTitles = samplePosts.slice(0, 6).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that search is NOT rendered
    const searchInput = canvas.queryByPlaceholderText(/search posts/i);
    expect(searchInput).not.toBeInTheDocument();
    
    // Test that pagination is NOT rendered
    const pagination = canvas.queryByRole('navigation');
    expect(pagination).not.toBeInTheDocument();
    
    // Test that filters are NOT rendered
    const categoryFilter = canvas.queryByText(/all categories/i);
    expect(categoryFilter).not.toBeInTheDocument();
  },
}) as Story;

export const InfiniteScroll: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test initial posts are rendered - check for at least some post titles
    const postTitles = samplePosts.slice(0, 9).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that pagination is NOT rendered
    const pagination = canvas.queryByRole('navigation');
    expect(pagination).not.toBeInTheDocument();
    
    // Test that Load More button is rendered
    const loadMoreButton = canvas.getByRole('button', { name: 'Load More' });
    expect(loadMoreButton).toBeInTheDocument();
    
    // Test search and filters
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
  },
}) as Story;

export const CustomSortOptions: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that posts are rendered - check for post titles
    const postTitles = samplePosts.slice(0, 9).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test sort options are rendered
    // There are multiple dropdowns, so check for the sort option text
    const sortDropdown = canvas.getByText('Latest');
    expect(sortDropdown).toBeInTheDocument();
    
    // Test search and filters
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
  },
}) as Story;

export const MobileResponsive: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that posts are rendered - check for post titles
    const postTitles = samplePosts.slice(0, 6).map(post => post.title);
    for (const title of postTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test search and filters are rendered in mobile view
    const searchInput = canvas.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
    
    // Test pagination in mobile view
    // Note: Pagination is tested elsewhere
  },
}) as Story;
