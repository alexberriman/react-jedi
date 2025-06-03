import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { ShowcaseWrapper } from "@/components/ui/showcase-wrapper";
import { StyleDiagnostic } from "@/components/ui/style-diagnostic";

export function MarkdownShowcase() {
  usePageMetadata({
    title: "Markdown Component",
    description:
      "A comprehensive showcase of the React Jedi Markdown component with GitHub Flavored Markdown support, syntax highlighting, and customization options.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");
  const [liveContent, setLiveContent] = useState(`# Live Editor

Type your **markdown** here and see it rendered in real-time!

- Try adding lists
- Code blocks with \`inline code\`
- [Links](https://example.com)

\`\`\`javascript
console.log('Syntax highlighting works!');
\`\`\``);

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Formatting" },
    { id: "headings", label: "Headings" },
    { id: "lists", label: "Lists" },
    { id: "code", label: "Code & Syntax Highlighting" },
    { id: "tables", label: "Tables" },
    { id: "blockquotes", label: "Blockquotes" },
    { id: "links", label: "Links & Images" },
    { id: "live-editor", label: "Live Editor" },
    { id: "json-spec", label: "JSON Specification" },
    { id: "props", label: "Props & Options" },
  ];

  // Basic formatting example
  const basicFormattingSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: `This is a paragraph with **bold text**, *italic text*, and ***bold italic text***.

You can also use ~~strikethrough text~~ and \`inline code\`.

Line breaks can be created with double spaces at the end of a line  
or by leaving a blank line between paragraphs.

---

Horizontal rules are created with three dashes.`
    }
  };

  // Headings example
  const headingsSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: `# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
##### Heading Level 5
###### Heading Level 6`
    }
  };

  // Lists example
  const listsSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: `## Unordered Lists

- First item
- Second item
  - Nested item 1
  - Nested item 2
    - Deep nested item
- Third item

## Ordered Lists

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

## Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task`
    }
  };

  // Code examples
  const codeSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: `## Inline Code

Use \`backticks\` for inline code snippets.

## Code Blocks

\`\`\`javascript
// JavaScript example
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return { message: \`Welcome, \${name}!\` };
}

const user = greet('World');
\`\`\`

\`\`\`typescript
// TypeScript example
interface User {
  id: number;
  name: string;
  email?: string;
}

const createUser = (data: Partial<User>): User => {
  return {
    id: Date.now(),
    name: 'Anonymous',
    ...data,
  };
};
\`\`\`

\`\`\`css
/* CSS example */
.markdown-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
\`\`\``
    }
  };

  // Tables example
  const tablesSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: `## Basic Table

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1-1  | Row 1-2  | Row 1-3  |
| Row 2-1  | Row 2-2  | Row 2-3  |
| Row 3-1  | Row 3-2  | Row 3-3  |

## Table with Alignment

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |
| 123          | 456            | 789           |`
    }
  };

  // Blockquotes example
  const blockquotesSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: `> This is a blockquote. It can contain multiple paragraphs and other elements.
>
> Here's the second paragraph within the blockquote.

### Nested Elements in Blockquotes

> ## Heading in a blockquote
> 
> - List item 1
> - List item 2
> 
> Even code blocks work:
> 
> \`\`\`javascript
> console.log('Hello from a blockquote!');
> \`\`\``
    }
  };

  // Links and images example
  const linksImagesSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: `## Links

[Basic link](https://example.com)

[Link with title](https://example.com "This is a title")

[Reference-style link][reference]

Autolinks: https://example.com

## Images

![React Logo](https://via.placeholder.com/150x150?text=React+Logo)

![Image with alt text](https://via.placeholder.com/300x200?text=Placeholder "This is a title")

[reference]: https://github.com/alexberriman/react-jedi "React Jedi on GitHub"`
    }
  };

  // Live editor spec
  const liveEditorSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: liveContent
    }
  };

  // JSON specification example
  const jsonExampleSpec: UISpecification = {
    type: "markdown",
    properties: {
      content: `# Document Title

This markdown is rendered from a JSON specification using the React Jedi render function.

## Example Code

\`\`\`javascript
const spec = {
  type: 'markdown',
  properties: {
    content: '# Hello World\\n\\nThis is markdown!'
  }
};

render(spec);
\`\`\``
    }
  };

  const jsonSpecCode = `{
  "type": "markdown",
  "properties": {
    "content": "# Hello World\\n\\nThis is **markdown** content!",
    "className": "custom-markdown-class"
  }
}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Markdown Component</h1>
          <p className="text-xl text-muted-foreground">
            Render rich markdown content with syntax highlighting and GitHub Flavored Markdown support
          </p>
        </div>

        <div className="flex gap-8">
          {/* Table of Contents */}
          <nav className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              <h2 className="font-semibold mb-4">On this page</h2>
              <ul className="space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(item.id);
                        document.querySelector(`#${item.id}`)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`block py-1 px-3 rounded text-sm transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 space-y-12">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  The Markdown component allows you to render markdown content with full GitHub Flavored Markdown support, syntax highlighting for code blocks, and customizable styling. It&apos;s perfect for documentation, blog posts, or any content that needs rich formatting.
                </p>
                <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>GitHub Flavored Markdown (GFM) support</li>
                  <li>Syntax highlighting for multiple programming languages</li>
                  <li>Tables, task lists, and strikethrough</li>
                  <li>Custom component overrides for styling</li>
                  <li>Safe HTML rendering with configurable options</li>
                  <li>Responsive and accessible by default</li>
                  <li>Dark mode support</li>
                </ul>
              </div>
              
              {/* Style Diagnostic */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Style Diagnostic</h3>
                <StyleDiagnostic />
              </div>
            </section>

            {/* Basic Formatting Section */}
            <section id="basic" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Basic Formatting</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Markdown supports various inline formatting options for text.
              </p>
              
              <ShowcaseWrapper>
                {render(basicFormattingSpec)}
              </ShowcaseWrapper>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View Markdown Source
                </summary>
                <CodeBlock language="markdown" className="mt-2">
                  {basicFormattingSpec.properties.content}
                </CodeBlock>
              </details>
            </section>

            {/* Headings Section */}
            <section id="headings" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Headings</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Six levels of headings are available, from h1 to h6.
              </p>
              <ShowcaseWrapper>
                {render(headingsSpec)}
              </ShowcaseWrapper>
            </section>

            {/* Lists Section */}
            <section id="lists" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Lists</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create ordered, unordered, and task lists with proper nesting.
              </p>
              <ShowcaseWrapper>
                {render(listsSpec)}
              </ShowcaseWrapper>
            </section>

            {/* Code Section */}
            <section id="code" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Code & Syntax Highlighting</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Display inline code and code blocks with syntax highlighting for popular languages.
              </p>
              <ShowcaseWrapper>
                {render(codeSpec)}
              </ShowcaseWrapper>
            </section>

            {/* Tables Section */}
            <section id="tables" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Tables</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create tables with optional column alignment.
              </p>
              <ShowcaseWrapper>
                {render(tablesSpec)}
              </ShowcaseWrapper>
            </section>

            {/* Blockquotes Section */}
            <section id="blockquotes" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Blockquotes</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Quote text with support for nested elements.
              </p>
              <ShowcaseWrapper>
                {render(blockquotesSpec)}
              </ShowcaseWrapper>
            </section>

            {/* Links & Images Section */}
            <section id="links" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Links & Images</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Add links and images with various formatting options.
              </p>
              <ShowcaseWrapper>
                {render(linksImagesSpec)}
              </ShowcaseWrapper>
            </section>

            {/* Live Editor Section */}
            <section id="live-editor" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Live Editor</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try editing the markdown below to see real-time rendering.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Markdown Input</h3>
                  <textarea
                    value={liveContent}
                    onChange={(e) => setLiveContent(e.target.value)}
                    className="w-full h-96 p-4 border rounded-lg font-mono text-sm bg-muted"
                    placeholder="Type your markdown here..."
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Rendered Output</h3>
                  <ShowcaseWrapper className="h-96 overflow-auto">
                    {render(liveEditorSpec)}
                  </ShowcaseWrapper>
                </div>
              </div>
            </section>

            {/* JSON Specification Section */}
            <section id="json-spec" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">JSON Specification</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The Markdown component can be rendered using JSON specifications with the React Jedi render function.
              </p>
              
              <ShowcaseWrapper>
                {render(jsonExampleSpec)}
              </ShowcaseWrapper>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Example JSON Specification</h3>
                <CodeBlock language="json">
                  {jsonSpecCode}
                </CodeBlock>
              </div>
            </section>

            {/* Props Section */}
            <section id="props" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Prop</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Default</th>
                      <th className="text-left py-3 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-sm">content</td>
                      <td className="py-3 px-4 font-mono text-sm">string</td>
                      <td className="py-3 px-4 font-mono text-sm">required</td>
                      <td className="py-3 px-4">The markdown content to render</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-sm">className</td>
                      <td className="py-3 px-4 font-mono text-sm">string</td>
                      <td className="py-3 px-4 font-mono text-sm">&quot;&quot;</td>
                      <td className="py-3 px-4">Additional CSS classes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-sm">components</td>
                      <td className="py-3 px-4 font-mono text-sm">object</td>
                      <td className="py-3 px-4 font-mono text-sm">{}</td>
                      <td className="py-3 px-4">Custom component overrides</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-sm">remarkPlugins</td>
                      <td className="py-3 px-4 font-mono text-sm">array</td>
                      <td className="py-3 px-4 font-mono text-sm">[remarkGfm]</td>
                      <td className="py-3 px-4">Remark plugins to use</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-sm">skipHtml</td>
                      <td className="py-3 px-4 font-mono text-sm">boolean</td>
                      <td className="py-3 px-4 font-mono text-sm">false</td>
                      <td className="py-3 px-4">Skip HTML in markdown</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}