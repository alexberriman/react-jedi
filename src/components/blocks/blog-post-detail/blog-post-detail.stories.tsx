import type { Meta, StoryObj } from '@storybook/react'
import BlogPostDetail from './blog-post-detail'

const meta = {
  title: 'Blocks/BlogPostDetail',
  component: BlogPostDetail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['centered', 'with-sidebar', 'magazine', 'minimal'],
      description: 'Layout variant for the blog post',
    },
    showComments: {
      control: 'boolean',
      description: 'Show comments section placeholder',
    },
    showShareButtons: {
      control: 'boolean',
      description: 'Show social share buttons',
    },
    showToc: {
      control: 'boolean',
      description: 'Show table of contents (sidebar variant only)',
    },
    showProgressBar: {
      control: 'boolean',
      description: 'Show reading progress bar',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
  },
} satisfies Meta<typeof BlogPostDetail>

export default meta
type Story = StoryObj<typeof meta>

const sampleContent = `
<h2>Introduction to Modern Web Development</h2>
<p>
  Web development has evolved significantly over the past decade. From simple static pages to complex, 
  interactive applications, the landscape continues to change at a rapid pace. In this comprehensive guide, 
  we'll explore the key concepts and technologies that define modern web development.
</p>

<h2>The Foundation: HTML, CSS, and JavaScript</h2>
<p>
  At the core of every web application lie three fundamental technologies: HTML for structure, CSS for styling, 
  and JavaScript for interactivity. While these technologies have been around for decades, they continue to 
  evolve with new features and capabilities.
</p>

<h3>HTML5 and Semantic Markup</h3>
<p>
  HTML5 introduced semantic elements that make our markup more meaningful. Elements like <code>&lt;article&gt;</code>, 
  <code>&lt;section&gt;</code>, and <code>&lt;nav&gt;</code> provide better structure and accessibility.
</p>

<pre><code class="language-html">&lt;article&gt;
  &lt;header&gt;
    &lt;h1&gt;Article Title&lt;/h1&gt;
    &lt;time datetime="2024-01-15"&gt;January 15, 2024&lt;/time&gt;
  &lt;/header&gt;
  &lt;section&gt;
    &lt;p&gt;Article content goes here...&lt;/p&gt;
  &lt;/section&gt;
&lt;/article&gt;</code></pre>

<h3>Modern CSS Techniques</h3>
<p>
  CSS has come a long way with features like Grid, Flexbox, and Custom Properties. These tools enable us to 
  create complex layouts with minimal code.
</p>

<h2>JavaScript Frameworks and Libraries</h2>
<p>
  The JavaScript ecosystem has exploded with frameworks and libraries designed to simplify application development. 
  React, Vue, and Angular dominate the landscape, each offering unique approaches to building user interfaces.
</p>

<h3>React: A Component-Based Approach</h3>
<p>
  React's component-based architecture has revolutionized how we think about building UIs. By breaking down 
  interfaces into reusable components, we can create maintainable and scalable applications.
</p>

<pre><code class="language-javascript">function Button({ onClick, children }) {
  return (
    &lt;button 
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    &gt;
      {children}
    &lt;/button&gt;
  );
}</code></pre>

<h2>State Management and Data Flow</h2>
<p>
  As applications grow in complexity, managing state becomes crucial. Solutions like Redux, MobX, and Zustand 
  provide structured approaches to handling application state.
</p>

<h3>The Rise of Server-Side Rendering</h3>
<p>
  Server-side rendering (SSR) has made a comeback with frameworks like Next.js and Nuxt.js. These tools combine 
  the benefits of server-rendered content with the interactivity of client-side applications.
</p>

<h2>Performance Optimization</h2>
<p>
  Performance is critical for user experience. Techniques like code splitting, lazy loading, and image optimization 
  can significantly improve load times and responsiveness.
</p>

<ul>
  <li>Implement code splitting to reduce initial bundle size</li>
  <li>Use lazy loading for images and components</li>
  <li>Optimize images with modern formats like WebP</li>
  <li>Implement caching strategies</li>
  <li>Minimize and compress assets</li>
</ul>

<h2>The Future of Web Development</h2>
<p>
  Looking ahead, exciting technologies are on the horizon. WebAssembly promises near-native performance, 
  while Web Components offer true framework-agnostic components. Progressive Web Apps continue to blur 
  the line between web and native applications.
</p>

<blockquote>
  <p>
    "The web is constantly evolving, and as developers, we must evolve with it. Embracing new technologies 
    while maintaining a solid foundation in the fundamentals is key to success."
  </p>
</blockquote>

<h2>Conclusion</h2>
<p>
  Modern web development is an exciting field with endless possibilities. By understanding the core technologies 
  and staying current with emerging trends, developers can create amazing experiences that push the boundaries 
  of what's possible on the web.
</p>
`

const sampleAuthor = {
  name: 'Sarah Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  bio: 'Sarah is a full-stack developer with over 10 years of experience building web applications. She specializes in React, Node.js, and modern web technologies.',
  social: {
    twitter: 'sarahjohnsondev',
    linkedin: 'sarahjohnson',
    github: 'sarahjohnson',
  },
}

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
]

export const Default: Story = {
  args: {
    variant: 'centered',
    title: 'The Complete Guide to Modern Web Development in 2024',
    content: sampleContent,
    heroImage: {
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop',
      alt: 'Modern web development workspace',
      caption: 'Photo by Christopher Gower on Unsplash',
    },
    author: sampleAuthor,
    publishDate: '2024-01-15',
    categories: ['Web Development', 'JavaScript', 'Tutorial'],
    tags: ['react', 'javascript', 'css', 'html', 'web-development'],
    relatedPosts: sampleRelatedPosts,
    prevPost: {
      title: 'Getting Started with TypeScript',
      url: '#',
    },
    nextPost: {
      title: 'Advanced React Patterns',
      url: '#',
    },
    showComments: true,
    showShareButtons: true,
    showToc: true,
    showProgressBar: true,
    animated: true,
  },
}

export const WithSidebar: Story = {
  args: {
    ...Default.args,
    variant: 'with-sidebar',
  },
}

export const Magazine: Story = {
  args: {
    ...Default.args,
    variant: 'magazine',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&h=900&fit=crop',
      alt: 'Coding on multiple screens',
      caption: 'The modern developer workspace',
    },
  },
}

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
    heroImage: undefined,
    showComments: false,
  },
}

export const WithoutHeroImage: Story = {
  args: {
    ...Default.args,
    heroImage: undefined,
  },
}

export const WithoutRelatedPosts: Story = {
  args: {
    ...Default.args,
    relatedPosts: [],
  },
}

export const WithoutNavigation: Story = {
  args: {
    ...Default.args,
    prevPost: undefined,
    nextPost: undefined,
  },
}

export const NoAnimations: Story = {
  args: {
    ...Default.args,
    animated: false,
  },
}

export const MinimalFeatures: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
    heroImage: undefined,
    showComments: false,
    showShareButtons: false,
    showProgressBar: false,
    relatedPosts: [],
    tags: [],
    categories: ['Blog'],
  },
}

export const TechnicalArticle: Story = {
  args: {
    variant: 'with-sidebar',
    title: 'Implementing Authentication in Next.js Applications',
    content: `
<h2>Overview</h2>
<p>
  Authentication is a critical component of modern web applications. In this tutorial, we'll implement 
  a complete authentication system in Next.js using JWT tokens and secure best practices.
</p>

<h2>Prerequisites</h2>
<p>Before we begin, make sure you have:</p>
<ul>
  <li>Node.js 16+ installed</li>
  <li>Basic knowledge of React and Next.js</li>
  <li>Understanding of REST APIs</li>
</ul>

<h2>Setting Up the Project</h2>
<p>First, create a new Next.js application:</p>

<pre><code class="language-bash">npx create-next-app@latest my-auth-app --typescript --tailwind --app
cd my-auth-app
npm install jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken @types/bcryptjs</code></pre>

<h2>Creating the Authentication API</h2>
<p>Let's create our authentication endpoints:</p>

<h3>User Registration</h3>
<pre><code class="language-typescript">// app/api/auth/register/route.ts
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
}</code></pre>

<h2>Implementing Protected Routes</h2>
<p>Now let's create middleware to protect our routes:</p>

<pre><code class="language-typescript">// middleware.ts
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
};</code></pre>

<h2>Best Practices</h2>
<ol>
  <li><strong>Use HTTPS:</strong> Always serve your application over HTTPS in production</li>
  <li><strong>Secure Cookies:</strong> Set httpOnly, secure, and sameSite flags</li>
  <li><strong>Token Expiration:</strong> Implement refresh tokens for better security</li>
  <li><strong>Input Validation:</strong> Always validate and sanitize user input</li>
  <li><strong>Rate Limiting:</strong> Implement rate limiting to prevent brute force attacks</li>
</ol>

<h2>Conclusion</h2>
<p>
  We've implemented a basic authentication system in Next.js. Remember to adapt this implementation 
  to your specific needs and always follow security best practices in production environments.
</p>
    `,
    heroImage: {
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      alt: 'Code editor showing authentication implementation',
    },
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Senior Full-Stack Engineer specializing in Next.js and Node.js. Passionate about web security and performance.',
      social: {
        twitter: 'michaelchen_dev',
        github: 'mchen',
      },
    },
    publishDate: '2024-01-20',
    categories: ['Next.js', 'Security', 'Tutorial'],
    tags: ['authentication', 'nextjs', 'jwt', 'security', 'typescript'],
    relatedPosts: sampleRelatedPosts,
    showComments: true,
    showShareButtons: true,
    showToc: true,
    showProgressBar: true,
    animated: true,
  },
}