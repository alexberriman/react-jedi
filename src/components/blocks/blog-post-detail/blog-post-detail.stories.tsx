import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import BlogPostDetail from "./blog-post-detail";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Blocks/BlogPostDetail",
  component: BlogPostDetail,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["centered", "with-sidebar", "magazine", "minimal"],
      description: "Layout variant for the blog post",
    },
    showComments: {
      control: "boolean",
      description: "Show comments section placeholder",
    },
    showShareButtons: {
      control: "boolean",
      description: "Show social share buttons",
    },
    showToc: {
      control: "boolean",
      description: "Show table of contents (sidebar variant only)",
    },
    showProgressBar: {
      control: "boolean",
      description: "Show reading progress bar",
    },
    animated: {
      control: "boolean",
      description: "Enable animations",
    },
  },
} satisfies Meta<typeof BlogPostDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = `
## Introduction to Modern Web Development

Web development has evolved significantly over the past decade. From simple static pages to complex, interactive applications, the landscape continues to change at a rapid pace. In this comprehensive guide, we'll explore the key concepts and technologies that define modern web development.

## The Foundation: HTML, CSS, and JavaScript

At the core of every web application lie three fundamental technologies: HTML for structure, CSS for styling, and JavaScript for interactivity. While these technologies have been around for decades, they continue to evolve with new features and capabilities.

### HTML5 and Semantic Markup

HTML5 introduced semantic elements that make our markup more meaningful. Elements like \`<article>\`, \`<section>\`, and \`<nav>\` provide better structure and accessibility.

\`\`\`html
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-01-15">January 15, 2024</time>
  </header>
  <section>
    <p>Article content goes here...</p>
  </section>
</article>
\`\`\`

### Modern CSS Techniques

CSS has come a long way with features like Grid, Flexbox, and Custom Properties. These tools enable us to create complex layouts with minimal code.

## JavaScript Frameworks and Libraries

The JavaScript ecosystem has exploded with frameworks and libraries designed to simplify application development. React, Vue, and Angular dominate the landscape, each offering unique approaches to building user interfaces.

### React: A Component-Based Approach

React's component-based architecture has revolutionized how we think about building UIs. By breaking down interfaces into reusable components, we can create maintainable and scalable applications.

\`\`\`javascript
function Button({ onClick, children }) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
\`\`\`

## State Management and Data Flow

As applications grow in complexity, managing state becomes crucial. Solutions like Redux, MobX, and Zustand provide structured approaches to handling application state.

### The Rise of Server-Side Rendering

Server-side rendering (SSR) has made a comeback with frameworks like Next.js and Nuxt.js. These tools combine the benefits of server-rendered content with the interactivity of client-side applications.

## Performance Optimization

Performance is critical for user experience. Techniques like code splitting, lazy loading, and image optimization can significantly improve load times and responsiveness.

- Implement code splitting to reduce initial bundle size
- Use lazy loading for images and components
- Optimize images with modern formats like WebP
- Implement caching strategies
- Minimize and compress assets

## The Future of Web Development

Looking ahead, exciting technologies are on the horizon. WebAssembly promises near-native performance, while Web Components offer true framework-agnostic components. Progressive Web Apps continue to blur the line between web and native applications.

> "The web is constantly evolving, and as developers, we must evolve with it. Embracing new technologies while maintaining a solid foundation in the fundamentals is key to success."

## Conclusion

Modern web development is an exciting field with endless possibilities. By understanding the core technologies and staying current with emerging trends, developers can create amazing experiences that push the boundaries of what's possible on the web.
`;

const sampleAuthor = {
  name: "Sarah Johnson",
  avatar: "https://placehold.co/400x400/EEE/31343C",
  bio: "Sarah is a full-stack developer with over 10 years of experience building web applications. She specializes in React, Node.js, and modern web technologies.",
  social: {
    twitter: "sarahjohnsondev",
    linkedin: "sarahjohnson",
    github: "sarahjohnson",
  },
};

const sampleRelatedPosts = [
  {
    id: "1",
    title: "Understanding React Hooks: A Deep Dive",
    excerpt:
      "Explore the power of React Hooks and how they revolutionize state management in functional components.",
    image: "https://placehold.co/600x400/EEE/31343C",
    url: "#",
    readTime: 8,
    category: "React",
  },
  {
    id: "2",
    title: "CSS Grid vs Flexbox: When to Use Each",
    excerpt:
      "Learn the strengths and use cases of CSS Grid and Flexbox to create responsive layouts.",
    image: "https://placehold.co/600x400/EEE/31343C",
    url: "#",
    readTime: 6,
    category: "CSS",
  },
  {
    id: "3",
    title: "Building Performant Web Applications",
    excerpt: "Discover techniques and best practices for optimizing web application performance.",
    image: "https://placehold.co/600x400/EEE/31343C",
    url: "#",
    readTime: 12,
    category: "Performance",
  },
];

// Define default args to reuse across stories
const defaultArgs = {
  variant: "centered" as const,
  title: "The Complete Guide to Modern Web Development in 2024",
  content: sampleContent,
  heroImage: {
    src: "https://placehold.co/1200x600/EEE/31343C",
    alt: "Modern web development workspace",
    caption: "Photo by Christopher Gower on Unsplash",
  },
  author: sampleAuthor,
  publishDate: "2024-01-15",
  categories: ["Web Development", "JavaScript", "Tutorial"],
  tags: ["react", "javascript", "css", "html", "web-development"],
  relatedPosts: sampleRelatedPosts,
  prevPost: {
    title: "Getting Started with TypeScript",
    url: "#",
  },
  nextPost: {
    title: "Advanced React Patterns",
    url: "#",
  },
  showComments: true,
  showShareButtons: true,
  showToc: true,
  showProgressBar: true,
  animated: true,
};

export const Default = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test author info
    expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();

    // Test categories
    expect(canvas.getByText("Web Development")).toBeInTheDocument();
    expect(canvas.getByText("JavaScript")).toBeInTheDocument();
    expect(canvas.getByText("Tutorial")).toBeInTheDocument();

    // Test content sections
    expect(canvas.getByText(/Introduction to Modern Web Development/)).toBeInTheDocument();
    expect(canvas.getByText(/The Foundation: HTML, CSS, and JavaScript/)).toBeInTheDocument();

    // Test tags
    expect(canvas.getByText("react")).toBeInTheDocument();
    expect(canvas.getByText("javascript")).toBeInTheDocument();

    // Test related posts
    expect(canvas.getByText("Understanding React Hooks: A Deep Dive")).toBeInTheDocument();

    // Test navigation
    expect(canvas.getByText("Getting Started with TypeScript")).toBeInTheDocument();
    expect(canvas.getByText("Advanced React Patterns")).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs
  }
}) as Story;

export const WithSidebar = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    ...defaultArgs,
    variant: "with-sidebar",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test author info
    expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();

    // Test sidebar-specific elements
    // Test table of contents appears (with-sidebar variant shows TOC)
    expect(canvas.getByText(/Table of Contents/i)).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs,
    variant: "with-sidebar",
  }
}) as Story;

export const Magazine = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    ...defaultArgs,
    variant: "magazine",
    heroImage: {
      src: "https://placehold.co/1600x900/EEE/31343C",
      alt: "Coding on multiple screens",
      caption: "The modern developer workspace",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test magazine-specific layout
    expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();

    // Test hero image caption
    expect(canvas.getByText("The modern developer workspace")).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs,
    variant: "magazine",
    heroImage: {
      src: "https://placehold.co/1600x900/EEE/31343C",
      alt: "Coding on multiple screens",
      caption: "The modern developer workspace",
    },
  }
}) as Story;

export const Minimal = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    ...defaultArgs,
    variant: "minimal",
    heroImage: undefined,
    showComments: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test author info
    expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();

    // Test minimal variant doesn't show comments
    const comments = canvas.queryByText(/Comments/i);
    expect(comments).not.toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs,
    variant: "minimal",
    heroImage: undefined,
    showComments: false,
  }
}) as Story;

export const WithoutHeroImage = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    ...defaultArgs,
    heroImage: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test no hero image present - hero image should not be in the document
    const heroImage = canvas.queryByAltText("Modern web development workspace");
    expect(heroImage).not.toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs,
    heroImage: undefined,
  }
}) as Story;

export const WithoutRelatedPosts = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    ...defaultArgs,
    relatedPosts: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test no related posts section
    const relatedPosts = canvas.queryByText(/Related Posts/i);
    expect(relatedPosts).not.toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs,
    relatedPosts: [],
  }
}) as Story;

export const WithoutNavigation = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    ...defaultArgs,
    prevPost: undefined,
    nextPost: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test no navigation links
    const prevLink = canvas.queryByText("Getting Started with TypeScript");
    const nextLink = canvas.queryByText("Advanced React Patterns");
    expect(prevLink).not.toBeInTheDocument();
    expect(nextLink).not.toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs,
    prevPost: undefined,
    nextPost: undefined,
  }
}) as Story;

export const NoAnimations = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    ...defaultArgs,
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test content renders without animations
    expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(canvas.getByText(/Introduction to Modern Web Development/)).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs,
    animated: false,
  }
}) as Story;

export const MinimalFeatures = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    ...defaultArgs,
    variant: "minimal",
    heroImage: undefined,
    showComments: false,
    showShareButtons: false,
    showProgressBar: false,
    relatedPosts: [],
    tags: [],
    categories: ["Blog"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("The Complete Guide to Modern Web Development in 2024")
    ).toBeInTheDocument();

    // Test minimal features
    expect(canvas.getByText("Blog")).toBeInTheDocument();

    // Test no share buttons
    const shareButtons = canvas.queryByText(/Share/i);
    expect(shareButtons).not.toBeInTheDocument();

    // Test no tags section
    const reactTag = canvas.queryByText("react");
    expect(reactTag).not.toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    ...defaultArgs,
    variant: "minimal",
    heroImage: undefined,
    showComments: false,
    showShareButtons: false,
    showProgressBar: false,
    relatedPosts: [],
    tags: [],
    categories: ["Blog"],
  }
}) as Story;

export const TechnicalArticle = enhanceStoryForDualMode<typeof BlogPostDetail>({
  args: {
    variant: "with-sidebar",
    title: "Implementing Authentication in Next.js Applications",
    content: `
## Overview

Authentication is a critical component of modern web applications. In this tutorial, we'll implement a complete authentication system in Next.js using JWT tokens and secure best practices.

## Prerequisites

Before we begin, make sure you have:

- Node.js 16+ installed
- Basic knowledge of React and Next.js
- Understanding of REST APIs

## Setting Up the Project

First, create a new Next.js application:

\`\`\`bash
npx create-next-app@latest my-auth-app --typescript --tailwind --app
cd my-auth-app
npm install jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
\`\`\`

## Creating the Authentication API

Let's create our authentication endpoints:

### User Registration

\`\`\`typescript
// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database (simplified)
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ token, user: { id: user.id, email } });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
\`\`\`

## Implementing Protected Routes

Now let's create middleware to protect our routes:

\`\`\`typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
\`\`\`

## Best Practices

1. **Use HTTPS:** Always serve your application over HTTPS in production
2. **Secure Cookies:** Set httpOnly, secure, and sameSite flags
3. **Token Expiration:** Implement refresh tokens for better security
4. **Input Validation:** Always validate and sanitize user input
5. **Rate Limiting:** Implement rate limiting to prevent brute force attacks

## Conclusion

We've implemented a basic authentication system in Next.js. Remember to adapt this implementation to your specific needs and always follow security best practices in production environments.
    `,
    heroImage: {
      src: "https://placehold.co/1200x600/EEE/31343C",
      alt: "Code editor showing authentication implementation",
    },
    author: {
      name: "Michael Chen",
      avatar: "https://placehold.co/400x400/EEE/31343C",
      bio: "Senior Full-Stack Engineer specializing in Next.js and Node.js. Passionate about web security and performance.",
      social: {
        twitter: "michaelchen_dev",
        github: "mchen",
      },
    },
    publishDate: "2024-01-20",
    categories: ["Next.js", "Security", "Tutorial"],
    tags: ["authentication", "nextjs", "jwt", "security", "typescript"],
    relatedPosts: sampleRelatedPosts,
    showComments: true,
    showShareButtons: true,
    showToc: true,
    showProgressBar: true,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main title renders
    expect(
      canvas.getByText("Implementing Authentication in Next.js Applications")
    ).toBeInTheDocument();

    // Test author info
    expect(canvas.getByText("Michael Chen")).toBeInTheDocument();

    // Test categories
    expect(canvas.getByText("Next.js")).toBeInTheDocument();
    expect(canvas.getByText("Security")).toBeInTheDocument();

    // Test content sections - use getAllByText since TOC may contain duplicates
    const overviewElements = canvas.getAllByText(/Overview/);
    expect(overviewElements.length).toBeGreaterThan(0);
    
    const prerequisitesElements = canvas.getAllByText(/Prerequisites/);
    expect(prerequisitesElements.length).toBeGreaterThan(0);
    
    const projectSetupElements = canvas.getAllByText(/Setting Up the Project/);
    expect(projectSetupElements.length).toBeGreaterThan(0);

    // Test tags
    expect(canvas.getByText("authentication")).toBeInTheDocument();
    expect(canvas.getByText("nextjs")).toBeInTheDocument();

    // Test table of contents for sidebar variant
    expect(canvas.getByText(/Table of Contents/i)).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: 'BlogPostDetail',
    variant: "with-sidebar",
    title: "Implementing Authentication in Next.js Applications",
    content: `
## Overview

Authentication is a critical component of modern web applications. In this tutorial, we'll implement a complete authentication system in Next.js using JWT tokens and secure best practices.

## Prerequisites

Before we begin, make sure you have:

- Node.js 16+ installed
- Basic knowledge of React and Next.js
- Understanding of REST APIs

## Setting Up the Project

First, create a new Next.js application:

\`\`\`bash
npx create-next-app@latest my-auth-app --typescript --tailwind --app
cd my-auth-app
npm install jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
\`\`\`

## Creating the Authentication API

Let's create our authentication endpoints:

### User Registration

\`\`\`typescript
// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database (simplified)
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ token, user: { id: user.id, email } });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
\`\`\`

## Implementing Protected Routes

Now let's create middleware to protect our routes:

\`\`\`typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
\`\`\`

## Best Practices

1. **Use HTTPS:** Always serve your application over HTTPS in production
2. **Secure Cookies:** Set httpOnly, secure, and sameSite flags
3. **Token Expiration:** Implement refresh tokens for better security
4. **Input Validation:** Always validate and sanitize user input
5. **Rate Limiting:** Implement rate limiting to prevent brute force attacks

## Conclusion

We've implemented a basic authentication system in Next.js. Remember to adapt this implementation to your specific needs and always follow security best practices in production environments.
    `,
      heroImage: {
        src: "https://placehold.co/1200x600/EEE/31343C",
        alt: "Code editor showing authentication implementation",
      },
      author: {
        name: "Michael Chen",
        avatar: "https://placehold.co/400x400/EEE/31343C",
        bio: "Senior Full-Stack Engineer specializing in Next.js and Node.js. Passionate about web security and performance.",
        social: {
          twitter: "michaelchen_dev",
          github: "mchen",
        },
      },
      publishDate: "2024-01-20",
      categories: ["Next.js", "Security", "Tutorial"],
      tags: ["authentication", "nextjs", "jwt", "security", "typescript"],
      relatedPosts: sampleRelatedPosts,
      showComments: true,
      showShareButtons: true,
      showToc: true,
      showProgressBar: true,
      animated: true,
  }
}) as Story;
