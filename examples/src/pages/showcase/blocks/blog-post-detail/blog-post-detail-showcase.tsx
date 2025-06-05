import React from "react";
import { render } from "@alexberriman/react-jedi";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";

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

const sampleRelatedPosts = [
  {
    id: '1',
    title: 'Understanding React Hooks: A Deep Dive',
    excerpt: 'Explore the power of React Hooks and how they revolutionize state management in functional components.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    url: '#',
    readTime: 8,
    category: 'React',
  },
  {
    id: '2',
    title: 'CSS Grid vs Flexbox: When to Use Each',
    excerpt: 'Learn the strengths and use cases of CSS Grid and Flexbox to create responsive layouts.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    url: '#',
    readTime: 6,
    category: 'CSS',
  },
  {
    id: '3',
    title: 'Building Performant Web Applications',
    excerpt: 'Discover techniques and best practices for optimizing web application performance.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    url: '#',
    readTime: 12,
    category: 'Performance',
  },
];

const BlogPostDetailShowcase = () => {
  const defaultShowcase = {
    type: "BlogPostDetail",
    props: {
      variant: "centered",
      title: "The Complete Guide to Modern Web Development in 2024",
      content: sampleContent,
      heroImage: {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
        alt: "Modern web development workspace",
        caption: "Photo by Christopher Gower on Unsplash"
      },
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        bio: "Sarah is a full-stack developer with over 10 years of experience building web applications. She specializes in React, Node.js, and modern web technologies.",
        social: {
          twitter: "sarahjohnsondev",
          linkedin: "sarahjohnson",
          github: "sarahjohnson"
        }
      },
      publishDate: "2024-01-15T00:00:00Z",
      categories: ["Web Development", "JavaScript", "Tutorial"],
      tags: ["react", "javascript", "css", "html", "web-development"],
      relatedPosts: sampleRelatedPosts,
      prevPost: {
        title: "Getting Started with TypeScript",
        url: "#"
      },
      nextPost: {
        title: "Advanced React Patterns",
        url: "#"
      }
    }
  };

  const withSidebarShowcase = {
    type: "BlogPostDetail",
    props: {
      ...defaultShowcase.props,
      variant: "with-sidebar"
    }
  };

  const magazineShowcase = {
    type: "BlogPostDetail",
    props: {
      ...defaultShowcase.props,
      variant: "magazine",
      heroImage: {
        src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&h=900&fit=crop",
        alt: "Coding on multiple screens",
        caption: "The modern developer workspace"
      }
    }
  };

  const minimalShowcase = {
    type: "BlogPostDetail",
    props: {
      ...defaultShowcase.props,
      variant: "minimal",
      heroImage: undefined,
      showComments: false,
      categories: ["Blog"],
      tags: []
    }
  };

  const technicalArticleContent = `
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

## Best Practices

1. **Use HTTPS:** Always serve your application over HTTPS in production
2. **Secure Cookies:** Set httpOnly, secure, and sameSite flags
3. **Token Expiration:** Implement refresh tokens for better security
4. **Input Validation:** Always validate and sanitize user input
5. **Rate Limiting:** Implement rate limiting to prevent brute force attacks

## Conclusion

We've implemented a basic authentication system in Next.js. Remember to adapt this implementation to your specific needs and always follow security best practices in production environments.
  `;

  const technicalShowcase = {
    type: "BlogPostDetail",
    props: {
      variant: "with-sidebar",
      title: "Implementing Authentication in Next.js Applications",
      content: technicalArticleContent,
      heroImage: {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
        alt: "Code editor showing authentication implementation"
      },
      author: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        bio: "Senior Full-Stack Engineer specializing in Next.js and Node.js. Passionate about web security and performance.",
        social: {
          twitter: "michaelchen_dev",
          github: "mchen"
        }
      },
      publishDate: "2024-01-20T00:00:00Z",
      categories: ["Next.js", "Security", "Tutorial"],
      tags: ["authentication", "nextjs", "jwt", "security", "typescript"],
      relatedPosts: sampleRelatedPosts
    }
  };

  return (
    <div className="space-y-12">
      <ShowcaseWrapper
        title="Default (Centered) Layout"
        description="The standard centered layout provides a comfortable reading experience with optimal line length."
      >
        {render(defaultShowcase)}
      </ShowcaseWrapper>

      <ShowcaseWrapper
        title="With Sidebar Layout"
        description="Includes a sticky table of contents and related posts in the sidebar for enhanced navigation."
      >
        {render(withSidebarShowcase)}
      </ShowcaseWrapper>

      <ShowcaseWrapper
        title="Magazine Layout"
        description="A bold, magazine-style layout with larger typography and full-width hero images."
      >
        {render(magazineShowcase)}
      </ShowcaseWrapper>

      <ShowcaseWrapper
        title="Minimal Layout"
        description="A clean, distraction-free layout focused purely on content without hero images or comments."
      >
        {render(minimalShowcase)}
      </ShowcaseWrapper>

      <ShowcaseWrapper
        title="Technical Article Example"
        description="A technical tutorial with code highlighting, step-by-step instructions, and sidebar navigation."
      >
        {render(technicalShowcase)}
      </ShowcaseWrapper>
    </div>
  );
};

export default BlogPostDetailShowcase;