import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Markdown } from "./markdown";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main heading renders
    const mainHeading = canvas.getByRole("heading", { level: 1, name: /Welcome to React Jedi Markdown/ });
    expect(mainHeading).toBeInTheDocument();

    // Test paragraph with formatting renders
    expect(canvas.getByText(/This is a paragraph with/)).toBeInTheDocument();

    // Test features list renders
    expect(canvas.getByText(/GitHub Flavored Markdown support/)).toBeInTheDocument();
    expect(canvas.getByText(/Syntax highlighting for code blocks/)).toBeInTheDocument();

    // Test code block renders
    expect(canvas.getByText(/interface MarkdownProps/)).toBeInTheDocument();

    // Test inline code renders
    expect(canvas.getByText(/Inline code looks like/)).toBeInTheDocument();

    // Test link renders
    const link = canvas.getByRole("link", { name: /Visit React Jedi Documentation/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/alexberriman/react-jedi");

    // Test blockquote renders
    expect(canvas.getByText(/This is a blockquote/)).toBeInTheDocument();

    // Test lists render
    expect(canvas.getByText(/First item/)).toBeInTheDocument();
    expect(canvas.getByText(/Item one/)).toBeInTheDocument();
    expect(canvas.getByText(/Nested item/)).toBeInTheDocument();

    // Test table renders
    expect(canvas.getByText(/Feature/)).toBeInTheDocument();
    expect(canvas.getByText(/Markdown parsing/)).toBeInTheDocument();
  },
}) as Story;

export const CodeHighlighting: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main heading renders
    const heading = canvas.getByRole("heading", { level: 1, name: /Code Highlighting Examples/ });
    expect(heading).toBeInTheDocument();

    // Test language-specific headings render
    expect(canvas.getByRole("heading", { level: 2, name: /JavaScript/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2, name: /TypeScript/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2, name: /React JSX/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2, name: /Python/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2, name: /JSON/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2, name: /CSS/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2, name: /Bash/ })).toBeInTheDocument();

    // Test code blocks render
    expect(canvas.getByText(/function greet/)).toBeInTheDocument();
    expect(canvas.getByText(/interface User/)).toBeInTheDocument();
    expect(canvas.getByText(/function Welcome/)).toBeInTheDocument();
    expect(canvas.getByText(/def fibonacci/)).toBeInTheDocument();
    expect(canvas.getByText(/"react-jedi"/)).toBeInTheDocument();
    expect(canvas.getByText(/\.markdown-container/)).toBeInTheDocument();
    expect(canvas.getByText(/npm install/)).toBeInTheDocument();
  },
}) as Story;

export const GitHubFlavored: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main heading renders
    const heading = canvas.getByRole("heading", { level: 1, name: /GitHub Flavored Markdown/ });
    expect(heading).toBeInTheDocument();

    // Test task lists render
    expect(canvas.getByText(/Create Markdown component/)).toBeInTheDocument();
    expect(canvas.getByText(/Add syntax highlighting/)).toBeInTheDocument();
    expect(canvas.getByText(/Add more examples/)).toBeInTheDocument();
    expect(canvas.getByText(/Write tests/)).toBeInTheDocument();

    // Test strikethrough renders
    expect(canvas.getByText(/This text is crossed out/)).toBeInTheDocument();

    // Test table renders
    expect(canvas.getByText(/Left-aligned/)).toBeInTheDocument();
    expect(canvas.getByText(/Center-aligned/)).toBeInTheDocument();
    expect(canvas.getByText(/Right-aligned/)).toBeInTheDocument();
    expect(canvas.getByText(/Row 1 Col 1/)).toBeInTheDocument();

    // Test autolink renders
    expect(canvas.getByText(/www.example.com/)).toBeInTheDocument();
    expect(canvas.getByText(/contact@example.com/)).toBeInTheDocument();

    // Test footnotes render
    expect(canvas.getByText(/Here's a sentence with a footnote/)).toBeInTheDocument();

    // Test definition lists render
    expect(canvas.getByText(/Term 1/)).toBeInTheDocument();
    expect(canvas.getByText(/Definition for term 1/)).toBeInTheDocument();
  },
}) as Story;

export const ComplexDocument: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main heading renders
    const mainHeading = canvas.getByRole("heading", { level: 1, name: /React Jedi Documentation/ });
    expect(mainHeading).toBeInTheDocument();

    // Test table of contents renders
    expect(canvas.getByText(/Table of Contents/)).toBeInTheDocument();
    expect(canvas.getByText(/Introduction/)).toBeInTheDocument();
    expect(canvas.getByText(/Getting Started/)).toBeInTheDocument();
    expect(canvas.getByText(/API Reference/)).toBeInTheDocument();

    // Test key features list renders
    expect(canvas.getByText(/Server-Driven UI/)).toBeInTheDocument();
    expect(canvas.getByText(/Type Safety/)).toBeInTheDocument();
    expect(canvas.getByText(/Performance/)).toBeInTheDocument();
    expect(canvas.getByText(/Flexibility/)).toBeInTheDocument();

    // Test installation code block renders
    expect(canvas.getByText(/npm install @alexberriman\/react-jedi/)).toBeInTheDocument();

    // Test basic usage code renders
    expect(canvas.getByText(/import { render }/)).toBeInTheDocument();

    // Test API table renders
    expect(canvas.getByText(/content/)).toBeInTheDocument();
    expect(canvas.getByText(/string/)).toBeInTheDocument();
    expect(canvas.getByText(/Required/)).toBeInTheDocument();

    // Test blockquote renders
    expect(canvas.getByText(/This component uses react-markdown/)).toBeInTheDocument();

    // Test contributing link renders
    const contributingLink = canvas.getByRole("link", { name: /Contributing Guide/ });
    expect(contributingLink).toBeInTheDocument();

    // Test license renders
    expect(canvas.getByText(/MIT © Alex Berriman/)).toBeInTheDocument();
  },
}) as Story;

export const MinimalContent: Story = enhanceStoryForDualMode({
  args: {
    content: "This is a simple paragraph with no special formatting.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test simple paragraph renders
    const paragraph = canvas.getByText("This is a simple paragraph with no special formatting.");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName.toLowerCase()).toBe("p");
  },
}) as Story;

export const WithCustomClass: Story = enhanceStoryForDualMode({
  args: {
    content: `# Custom Styled Markdown

This markdown has custom styling applied via className.`,
    className: "p-8 bg-muted rounded-lg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test heading renders
    const heading = canvas.getByRole("heading", { level: 1, name: /Custom Styled Markdown/ });
    expect(heading).toBeInTheDocument();

    // Test paragraph renders
    expect(canvas.getByText(/This markdown has custom styling/)).toBeInTheDocument();

    // Test the markdown container has custom classes
    const markdownContainer = canvas.getByText(/Custom Styled Markdown/).closest('div');
    expect(markdownContainer).toHaveClass("p-8", "bg-muted", "rounded-lg");
  },
}) as Story;

export const ErrorHandling: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test heading renders
    const heading = canvas.getByRole("heading", { level: 1, name: /Malformed Markdown/ });
    expect(heading).toBeInTheDocument();

    // Test problematic content text renders
    expect(canvas.getByText(/This has some potentially problematic content/)).toBeInTheDocument();

    // Test script tag is safely handled (should not execute)
    expect(canvas.getByText(/alert\('This script tag is safely escaped'\)/)).toBeInTheDocument();

    // Test unclosed code block still renders
    expect(canvas.getByText(/Unclosed code block/)).toBeInTheDocument();
    expect(canvas.getByText(/function test/)).toBeInTheDocument();
    expect(canvas.getByText(/console.log/)).toBeInTheDocument();

    // Test graceful handling message renders
    expect(canvas.getByText(/Even with broken markdown/)).toBeInTheDocument();
  },
}) as Story;

export const LongContent: Story = enhanceStoryForDualMode({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test main heading renders
    const mainHeading = canvas.getByRole("heading", { level: 1, name: /Lorem Ipsum/ });
    expect(mainHeading).toBeInTheDocument();

    // Test major section headings render
    expect(canvas.getByRole("heading", { level: 2, name: /Section 1/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2, name: /Section 2/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2, name: /Section 3/ })).toBeInTheDocument();

    // Test subsection headings render
    expect(canvas.getByRole("heading", { level: 3, name: /Subsection 1.1/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 3, name: /Subsection 1.2/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 3, name: /Subsection 2.1/ })).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 3, name: /Subsection 2.2/ })).toBeInTheDocument();

    // Test content paragraphs render
    expect(canvas.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
    expect(canvas.getByText(/Ut enim ad minim veniam/)).toBeInTheDocument();
    expect(canvas.getByText(/Excepteur sint occaecat/)).toBeInTheDocument();

    // Test code block renders
    expect(canvas.getByText(/const example/)).toBeInTheDocument();
    expect(canvas.getByText(/foo: 'bar'/)).toBeInTheDocument();

    // Test table renders
    expect(canvas.getByText(/Column 1/)).toBeInTheDocument();
    expect(canvas.getByText(/Data 1/)).toBeInTheDocument();
    expect(canvas.getByText(/Data 5/)).toBeInTheDocument();

    // Test lists render
    expect(canvas.getByText(/Item 1/)).toBeInTheDocument();
    expect(canvas.getByText(/Nested item 1.1/)).toBeInTheDocument();
    expect(canvas.getByText(/First point/)).toBeInTheDocument();
    expect(canvas.getByText(/Second point/)).toBeInTheDocument();

    // Test blockquote renders
    expect(canvas.getByText(/Neque porro quisquam est/)).toBeInTheDocument();

    // Test final content renders
    expect(canvas.getByText(/At vero eos et accusamus/)).toBeInTheDocument();
    expect(canvas.getByText(/End of document/)).toBeInTheDocument();
  },
}) as Story;
