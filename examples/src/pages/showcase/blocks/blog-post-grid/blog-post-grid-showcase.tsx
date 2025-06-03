import React from "react";
import { render } from "@alexberriman/react-jedi";
import { ShowcaseWrapper } from "../../../ui/showcase-wrapper";

// Generate sample blog posts with realistic content
const generateSamplePosts = (count: number) => {
  const categories = ['Technology', 'Design', 'Business', 'Marketing', 'Development', 'Tutorial'];
  const authors = [
    { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Chris Brown', avatar: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=6' },
  ];

  const titles = [
    'The Future of Web Development: Trends to Watch in 2024',
    'Mastering React Performance Optimization Techniques',
    'Building Scalable Design Systems from Scratch',
    'The Art of Writing Clean, Maintainable Code',
    'Understanding Modern CSS Architecture Patterns',
    'TypeScript Best Practices for Large Scale Projects',
    'Creating Accessible User Interfaces That Delight',
    'The Psychology of User Experience Design',
    'Microservices vs Monoliths: A Practical Guide',
    'GraphQL: The Future of API Design',
    'State Management in Modern React Applications',
    'CSS Grid vs Flexbox: When to Use What',
    'Testing Strategies for Frontend Applications',
    'The Rise of JAMstack Architecture',
    'Progressive Web Apps: A Complete Guide',
    'Server-Side Rendering vs Static Generation',
    'Optimizing Web Performance for Mobile Users',
    'The Complete Guide to React Hooks',
    'Building Real-Time Applications with WebSockets',
    'Introduction to Machine Learning for Web Developers',
  ];

  const excerpts = [
    'Explore the latest trends and technologies shaping the future of web development. From AI integration to edge computing, discover what\'s next in the rapidly evolving landscape of modern web applications.',
    'Learn advanced techniques to optimize your React applications for better performance, faster load times, and improved user experience. We\'ll cover code splitting, lazy loading, and more.',
    'A comprehensive guide to building and maintaining design systems that scale with your organization and product needs. Learn from real-world examples and best practices.',
    'Writing clean, maintainable code is an art. Discover principles and practices that will elevate your coding standards and make your codebase a joy to work with.',
    'Modern CSS has evolved significantly. Learn about the latest architectural patterns and methodologies for scalable stylesheets including CSS-in-JS, CSS Modules, and utility-first approaches.',
    'TypeScript can be challenging in large projects. Here are battle-tested practices to keep your codebase maintainable, type-safe, and developer-friendly.',
    'Accessibility is not optional. Learn how to create inclusive user interfaces that work for everyone, regardless of ability, while maintaining beautiful design.',
    'Understanding user psychology is crucial for creating engaging experiences. Dive into the principles that drive user behavior and how to apply them in your designs.',
    'Choosing between microservices and monolithic architecture? This guide helps you make the right decision for your project based on real-world considerations.',
    'GraphQL is revolutionizing API design. Learn why it might be the perfect solution for your next project and how to implement it effectively.',
    'State management can make or break your React app. Explore modern solutions and patterns for managing application state effectively at scale.',
    'CSS Grid and Flexbox are powerful layout tools. Learn when and how to use each for optimal results in your responsive web designs.',
    'Testing is crucial for maintaining quality. Discover effective strategies for testing modern frontend applications including unit, integration, and E2E tests.',
    'JAMstack is changing how we build websites. Learn about this modern architecture and its benefits for performance, security, and scalability.',
    'PWAs combine the best of web and mobile apps. This guide covers everything you need to know to build progressive web applications.',
    'Understanding when to use SSR vs SSG is crucial for modern web apps. Learn the trade-offs and best use cases for each approach.',
    'Mobile performance is critical for user experience. Learn optimization techniques specifically targeted at improving mobile web performance.',
    'React Hooks have transformed how we write components. This complete guide covers all hooks with practical examples and best practices.',
    'Real-time features are becoming essential. Learn how to implement WebSocket connections for live updates in your applications.',
    'Machine learning is becoming accessible to web developers. Get started with practical ML applications you can build today.',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    title: titles[i % titles.length],
    excerpt: excerpts[i % excerpts.length],
    featuredImage: `https://picsum.photos/seed/${i + 1}/800/450`,
    category: categories[i % categories.length],
    tags: ['react', 'javascript', 'web'],
    author: authors[i % authors.length],
    publishDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
    readTime: Math.floor(Math.random() * 12) + 3,
    isFeatured: i < 3,
    slug: titles[i % titles.length].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));
};

const samplePosts = generateSamplePosts(30);

// Grid variants to showcase
const gridVariants = [
  {
    title: "Cards Layout",
    variant: "cards",
    postsPerPage: 9,
    description: "Classic card layout with featured images, perfect for visual content",
  },
  {
    title: "Minimal List",
    variant: "minimal",
    postsPerPage: 10,
    description: "Clean list layout for content-focused presentations",
  },
  {
    title: "Magazine Style",
    variant: "magazine",
    postsPerPage: 9,
    showFilters: false,
    showSearch: false,
    description: "Editorial-style layout with featured posts",
  },
  {
    title: "With Sidebar",
    variant: "with-sidebar",
    postsPerPage: 6,
    description: "Blog layout with sidebar for additional content",
    sidebarContent: {
      type: "Stack",
      spacing: "lg",
      children: [
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: {
                type: "CardTitle",
                children: "Categories"
              }
            },
            {
              type: "CardContent",
              children: {
                type: "Stack",
                spacing: "sm",
                children: ['Technology', 'Design', 'Business', 'Marketing', 'Development'].map(category => ({
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  children: [
                    {
                      type: "Text",
                      size: "sm",
                      children: category
                    },
                    {
                      type: "Badge",
                      variant: "secondary",
                      children: Math.floor(Math.random() * 20) + 5
                    }
                  ]
                }))
              }
            }
          ]
        },
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: {
                type: "CardTitle",
                children: "Newsletter"
              }
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
                  type: "Button",
                  variant: "default",
                  className: "w-full",
                  children: "Subscribe"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    title: "Masonry Layout",
    variant: "masonry",
    postsPerPage: 12,
    showPagination: false,
    showLoadMore: true,
    description: "Pinterest-style masonry grid with variable heights",
  },
];

const blogGridSpecifications = gridVariants.map((variant) => ({
  type: "BlogPostGrid",
  props: {
    posts: samplePosts,
    variant: variant.variant,
    showFilters: variant.showFilters !== false,
    showSearch: variant.showSearch !== false,
    showPagination: variant.showPagination !== false,
    showLoadMore: variant.showLoadMore || false,
    postsPerPage: variant.postsPerPage,
    sidebarContent: variant.sidebarContent,
    sortOptions: [
      { label: 'Newest First', value: 'date-desc' },
      { label: 'Oldest First', value: 'date-asc' },
      { label: 'Most Popular', value: 'popularity' }
    ],
    className: "w-full",
  },
}));

export function BlogPostGridShowcase(): React.ReactElement {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Blog Post Grid Block</h1>
        <p className="text-lg text-muted-foreground">
          A versatile blog post grid component with multiple layout variants, filtering, search, 
          sorting, and pagination. Perfect for blog homepages, article archives, and content hubs.
        </p>
      </div>

      <div className="space-y-12">
        {gridVariants.map((variant, index) => {
          const specification = blogGridSpecifications[index];
          
          return (
            <ShowcaseWrapper
              key={variant.title}
              title={variant.title}
              description={variant.description}
            >
              {render(specification)}
            </ShowcaseWrapper>
          );
        })}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Layout Variants</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Card grid with featured images</li>
              <li>• Minimal list for content-focused display</li>
              <li>• Magazine-style editorial layout</li>
              <li>• Sidebar layout for additional content</li>
              <li>• Masonry grid for dynamic heights</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Functionality</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Advanced filtering by category</li>
              <li>• Real-time search across posts</li>
              <li>• Multiple sort options</li>
              <li>• Pagination or infinite scroll</li>
              <li>• Featured post highlighting</li>
              <li>• Loading states and skeletons</li>
              <li>• Fully responsive design</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Usage Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-medium mb-2">JSON Specification</h3>
            <pre className="text-sm overflow-x-auto">
{`{
  type: "BlogPostGrid",
  props: {
    posts: [...], // Array of blog post objects
    variant: "cards", // cards | minimal | magazine | with-sidebar | masonry
    showFilters: true,
    showSearch: true,
    showPagination: true,
    postsPerPage: 9,
    featuredPostIds: ["post-1", "post-2"],
    categories: ["Technology", "Design", "Business"],
    sortOptions: [
      { label: "Newest First", value: "date-desc" },
      { label: "Most Popular", value: "popularity" }
    ]
  }
}`}
            </pre>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-medium mb-2">Blog Post Structure</h3>
            <pre className="text-sm overflow-x-auto">
{`{
  id: "unique-id",
  title: "Post Title",
  excerpt: "Brief description...",
  featuredImage: "https://example.com/image.jpg",
  category: "Technology",
  tags: ["react", "javascript"],
  author: {
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg"
  },
  publishDate: "2024-01-15T10:00:00Z",
  readTime: 5, // minutes
  isFeatured: true,
  slug: "post-url-slug"
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Customization</h2>
        <div className="prose prose-sm max-w-none">
          <p>
            The Blog Post Grid block is highly customizable through props. You can control the layout variant,
            enable/disable features like search and filtering, customize the number of posts per page,
            and even provide custom sidebar content for the sidebar variant.
          </p>
          <p>
            For advanced use cases, you can implement custom onLoadMore handlers for infinite scroll,
            provide pre-filtered categories, and highlight specific posts as featured content.
          </p>
        </div>
      </div>
    </div>
  );
}