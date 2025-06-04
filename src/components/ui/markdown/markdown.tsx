import * as React from "react";
import ReactMarkdown from "react-markdown";
import type { PluggableList } from "unified";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";
import { cn, omit } from "../../../lib/utils";

// Import common languages for syntax highlighting
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";

// Register languages
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("md", markdown);

export interface MarkdownProps extends React.ComponentProps<"div"> {
  content: string;
  components?: Partial<Components>;
  remarkPlugins?: PluggableList;
  allowedElements?: string[];
  disallowedElements?: string[];
  unwrapDisallowed?: boolean;
  skipHtml?: boolean;
  urlTransform?: (url: string) => string;
  // React-specific props that should not be passed to DOM element
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
  readonly conditionalProps?: Record<string, unknown>;
  readonly computedProps?: Record<string, unknown>;
  readonly when?: string | boolean;
  readonly actions?: Record<string, unknown>;
}

const defaultComponents: Partial<Components> = {
  h1: ({ children, ...props }) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8 mb-4" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-3" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-3" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="scroll-m-20 text-base font-semibold tracking-tight mt-6 mb-3" {...props}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
      {children}
    </blockquote>
  ),
  hr: ({ ...props }) => <hr className="my-8 h-px border-0 bg-muted" {...props} />,
  table: ({ children, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="border-b" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="m-0 border-t p-0 even:bg-muted" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
      {children}
    </td>
  ),
  a: ({ children, href, ...props }) => (
    <a 
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" 
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <img
      className="rounded-md my-6"
      src={src}
      alt={alt || ""}
      loading="lazy"
      {...props}
    />
  ),
  pre: ({ children, ...props }) => {
    return (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-muted p-4 border-0" {...props}>
        {children}
      </pre>
    );
  },
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !match;
    
    if (isInline) {
      return (
        <code 
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" 
          {...props}
        >
          {children}
        </code>
      );
    }

    const language = match[1];
    
    return (
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "hsl(var(--muted))",
          fontSize: "0.875rem",
          borderRadius: "0.5rem",
          border: 0,
        }}
        codeTagProps={{
          style: {
            fontSize: "inherit",
            fontFamily: "inherit",
          }
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};

const Markdown = React.forwardRef<HTMLDivElement, MarkdownProps>(
  ({ 
    className,
    content,
    components,
    remarkPlugins = [remarkGfm],
    allowedElements,
    disallowedElements,
    unwrapDisallowed = false,
    skipHtml = false,
    urlTransform,
    ...props
  }, ref) => {
    const cleanProps = omit(props, [
      "parentContext", 
      "spec", 
      "theme", 
      "state", 
      "conditionalProps", 
      "computedProps", 
      "when", 
      "actions"
    ]);

    const mergedComponents = React.useMemo(
      () => ({
        ...defaultComponents,
        ...components,
      }),
      [components]
    );

    return (
      <div
        ref={ref}
        className={cn("prose prose-gray dark:prose-invert max-w-none", className)}
        {...cleanProps}
      >
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          components={mergedComponents}
          allowedElements={allowedElements}
          disallowedElements={disallowedElements}
          unwrapDisallowed={unwrapDisallowed}
          skipHtml={skipHtml}
          urlTransform={urlTransform}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }
);

Markdown.displayName = "Markdown";

export { Markdown };