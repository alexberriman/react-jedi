import * as React from "react";
import { cn } from "../../lib/utils";

interface JsonSyntaxHighlighterProps {
  readonly spec: unknown;
  readonly className?: string;
}

// Move arrow function to outer scope
const highlightJson = (json: string) => {
  // Escape HTML
  let highlighted = json.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  
  // Highlight different JSON elements - split regex for simplicity
  const stringRegex = /"[^"]+"/g;
  const numberRegex = /-?\d+(?:\.\d*)?/g;
  const boolNullRegex = /\b(true|false|null)\b/g;
  
  // First highlight strings and keys
  highlighted = highlighted.replaceAll(
    stringRegex,
    (match, offset, string) => {
      // Check if this string is followed by a colon (making it a key)
      const afterMatch = string.slice(offset + match.length);
      const isKey = /^\s*:/.test(afterMatch);
      const className = isKey ? 'text-blue-400' : 'text-green-400';
      return `<span class="${className}">${match}</span>`;
    }
  );
  
  // Then highlight booleans and null
  highlighted = highlighted.replaceAll(
    boolNullRegex,
    (match) => {
      const className = (match === 'true' || match === 'false') ? 'text-purple-400' : 'text-gray-400';
      return `<span class="${className}">${match}</span>`;
    }
  );
  
  // Finally highlight numbers
  highlighted = highlighted.replaceAll(
    numberRegex,
    (match) => `<span class="text-orange-400">${match}</span>`
  );
  
  // Highlight braces and brackets
  highlighted = highlighted.replaceAll(/[{}]/g, '<span class="text-gray-300">$&</span>');
  // Use separate replacements to avoid escape issues
  highlighted = highlighted.replaceAll('[', '<span class="text-gray-300">[</span>');
  highlighted = highlighted.replaceAll(']', '<span class="text-gray-300">]</span>');
  
  return highlighted;
};

export function JsonSyntaxHighlighter({ spec, className }: JsonSyntaxHighlighterProps) {
  const jsonString = JSON.stringify(spec, null, 2);
  
  return (
    <pre className={cn("text-sm overflow-auto", className)}>
      <code 
        dangerouslySetInnerHTML={{ __html: highlightJson(jsonString) }}
        className="language-json block font-mono"
      />
    </pre>
  );
}