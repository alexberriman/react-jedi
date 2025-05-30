import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

export type CodeBlockProps = Readonly<{
  children: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  title?: string;
}>;

export function CodeBlock({
  children,
  language = "typescript",
  className,
  showLineNumbers = false,
  title,
}: CodeBlockProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-lg", className)}>
      {title && (
        <div className="flex items-center justify-between bg-zinc-900 border-b border-zinc-800 px-4 py-2">
          <span className="text-sm font-medium text-zinc-400">{title}</span>
          <span className="text-xs text-zinc-500">{language}</span>
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "1rem",
            backgroundColor: "#18181b",
            fontSize: "0.875rem",
            borderRadius: title ? "0" : "0.5rem",
          }}
          lineNumberStyle={{
            minWidth: "2.5rem",
            paddingRight: "1rem",
            color: "#52525b",
            userSelect: "none",
          }}
        >
          {children.trim()}
        </SyntaxHighlighter>
        <button
          onClick={() => navigator.clipboard.writeText(children.trim())}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 p-2 rounded-md text-xs"
          aria-label="Copy code"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}