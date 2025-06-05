import * as React from "react";
import { cn } from "../../lib/utils";

interface JsonSyntaxHighlighterProps {
  spec: unknown;
  className?: string;
}

export function JsonSyntaxHighlighter({ spec, className }: JsonSyntaxHighlighterProps) {
  const jsonString = JSON.stringify(spec, null, 2);
  
  // Simple syntax highlighting for JSON
  const highlightJson = (json: string) => {
    // Escape HTML
    let highlighted = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Highlight different JSON elements
    highlighted = highlighted.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let className = 'text-gray-500'; // default
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            className = 'text-blue-400'; // key
          } else {
            className = 'text-green-400'; // string value
          }
        } else if (/true|false/.test(match)) {
          className = 'text-purple-400'; // boolean
        } else if (/null/.test(match)) {
          className = 'text-gray-400'; // null
        } else {
          className = 'text-orange-400'; // number
        }
        return `<span class="${className}">${match}</span>`;
      }
    );
    
    // Highlight braces and brackets
    highlighted = highlighted.replace(/[{}]/g, '<span class="text-gray-300">$&</span>');
    highlighted = highlighted.replace(/[\[\]]/g, '<span class="text-gray-300">$&</span>');
    
    return highlighted;
  };
  
  return (
    <pre className={cn("text-sm overflow-auto", className)}>
      <code 
        dangerouslySetInnerHTML={{ __html: highlightJson(jsonString) }}
        className="language-json block font-mono"
      />
    </pre>
  );
}