import type { Meta, StoryObj } from "@storybook/react";
import { Markdown } from "./markdown";

const meta = {
  title: "Components/Markdown",
  component: Markdown,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    content: {
      description: "Markdown content to render",
      control: "text",
    },
    className: {
      description: "Additional CSS classes",
      control: "text",
    },
  },
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: `# Welcome to React Jedi Markdown

This is a paragraph with **bold text** and *italic text*.

## Features

- GitHub Flavored Markdown support
- Syntax highlighting for code blocks
- Tables and task lists
- Customizable components
- Type-safe and performant

### Code Example

Here's a TypeScript example:

\`\`\`typescript
interface MarkdownProps {
  content: string;
  components?: Partial<Components>;
}

function MyComponent({ content }: MarkdownProps) {
  return <Markdown content={content} />;
}
\`\`\`

Inline code looks like \`this\`.

## Links and Images

[Visit React Jedi Documentation](https://github.com/alexberriman/react-jedi)

External links open in new tabs automatically.

## Blockquotes

> This is a blockquote. It can contain multiple paragraphs.
>
> Here's the second paragraph.

## Lists

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown parsing | ✅ | Complete |
| Syntax highlighting | ✅ | Multiple languages |
| Custom components | ✅ | Fully customizable |
| Type safety | ✅ | TypeScript support |

---

That's all for this demo!`,
  },
};

export const CodeHighlighting: Story = {
  args: {
    content: `# Code Highlighting Examples

## JavaScript

\`\`\`javascript
// Function to greet
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return { message: \`Welcome, \${name}!\` };
}

const user = greet('World');
\`\`\`

## TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
\`\`\`

## React JSX

\`\`\`jsx
function Welcome({ name, isLoggedIn }) {
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <button>Sign In</button>
      )}
    </div>
  );
}
\`\`\`

## Python

\`\`\`python
def fibonacci(n):
    """Generate Fibonacci sequence up to n"""
    a, b = 0, 1
    while a < n:
        yield a
        a, b = b, a + b

# Usage
for num in fibonacci(100):
    print(num)
\`\`\`

## JSON

\`\`\`json
{
  "name": "react-jedi",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-markdown": "^10.0.0"
  }
}
\`\`\`

## CSS

\`\`\`css
.markdown-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.markdown-container h1 {
  color: var(--primary);
  margin-bottom: 1.5rem;
}
\`\`\`

## Bash

\`\`\`bash
# Install dependencies
npm install react-markdown remark-gfm

# Run the development server
npm run dev

# Build for production
npm run build
\`\`\``,
  },
};

export const GitHubFlavored: Story = {
  args: {
    content: `# GitHub Flavored Markdown

## Task Lists

- [x] Create Markdown component
- [x] Add syntax highlighting
- [ ] Add more examples
- [ ] Write tests

## Strikethrough

~~This text is crossed out~~

## Tables with Alignment

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Row 1 Col 1  | Row 1 Col 2    | Row 1 Col 3   |
| Row 2 Col 1  | Row 2 Col 2    | Row 2 Col 3   |

## Autolink Literals

www.example.com, https://example.com, and contact@example.com are automatically linked.

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote.

## Definition Lists

Term 1
:   Definition for term 1

Term 2
:   Definition for term 2
:   Another definition for term 2`,
  },
};

export const ComplexDocument: Story = {
  args: {
    content: `# React Jedi Documentation

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Examples](#examples)

## Introduction

React Jedi is a powerful library for building modern React applications with JSON specifications.

### Key Features

1. **Server-Driven UI** - Build UIs from JSON
2. **Type Safety** - Full TypeScript support
3. **Performance** - Optimized rendering
4. **Flexibility** - Extensible component system

## Getting Started

### Installation

\`\`\`bash
npm install @alexberriman/react-jedi
\`\`\`

### Basic Usage

\`\`\`tsx
import { render } from '@alexberriman/react-jedi';

const spec = {
  type: 'Markdown',
  props: {
    content: '# Hello World\\n\\nThis is markdown content!'
  }
};

function App() {
  return render(spec);
}
\`\`\`

## API Reference

### Markdown Component

The Markdown component renders markdown content with full GitHub Flavored Markdown support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`content\` | \`string\` | Required | The markdown content to render |
| \`components\` | \`Partial<Components>\` | \`{}\` | Custom component overrides |
| \`remarkPlugins\` | \`Array<unknown>\` | \`[remarkGfm]\` | Remark plugins to use |
| \`className\` | \`string\` | \`""\` | Additional CSS classes |

#### Example with Custom Components

\`\`\`tsx
const customComponents = {
  h1: ({ children }) => (
    <h1 className="custom-heading">{children}</h1>
  ),
  code: ({ inline, children }) => (
    <code className={inline ? 'custom-inline' : 'custom-block'}>
      {children}
    </code>
  ),
};

<Markdown 
  content={markdownContent}
  components={customComponents}
/>
\`\`\`

## Examples

### Simple Blog Post

\`\`\`tsx
const blogPost = \`
# My First Blog Post

Published on **January 1, 2024**

This is the introduction to my blog post...
\`;

<Markdown content={blogPost} />
\`\`\`

### Technical Documentation

\`\`\`tsx
const docs = \`
## API Endpoint

\\\`POST /api/users\\\`

### Request Body

\\\`\\\`\\\`json
{
  "name": "John Doe",
  "email": "john@example.com"
}
\\\`\\\`\\\`

### Response

Returns the created user object with a generated ID.
\`;

<Markdown content={docs} />
\`\`\`

---

> **Note:** This component uses react-markdown under the hood with custom styling to match the React Jedi design system.

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/alexberriman/react-jedi/blob/main/CONTRIBUTING.md) for details.

## License

MIT © Alex Berriman`,
  },
};

export const MinimalContent: Story = {
  args: {
    content: "This is a simple paragraph with no special formatting.",
  },
};

export const WithCustomClass: Story = {
  args: {
    content: `# Custom Styled Markdown

This markdown has custom styling applied via className.`,
    className: "p-8 bg-muted rounded-lg",
  },
};

export const ErrorHandling: Story = {
  args: {
    content: `# Malformed Markdown

This has some potentially problematic content:

<script>alert('This script tag is safely escaped')</script>

Unclosed code block:

\`\`\`javascript
function test() {
  console.log('This still renders correctly');
}

Even with broken markdown, the component handles it gracefully.`,
  },
};

export const LongContent: Story = {
  args: {
    content: `# Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Section 1

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

### Subsection 1.1

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

\`\`\`javascript
// Some code
const example = {
  foo: 'bar',
  baz: 42
};
\`\`\`

### Subsection 1.2

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## Section 2

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

### Subsection 2.1

- Item 1
  - Nested item 1.1
  - Nested item 1.2
- Item 2
- Item 3

### Subsection 2.2

1. First point
2. Second point
3. Third point

> "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."

## Section 3

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

---

*End of document*`,
  },
};