import * as React from "react";
import { cn } from "../../lib/utils";
import { Markdown } from "../../components/ui/markdown";

interface JsonSyntaxHighlighterProps {
  readonly spec: unknown;
  readonly className?: string;
}

export function JsonSyntaxHighlighter({ spec, className }: JsonSyntaxHighlighterProps) {
  const jsonString = JSON.stringify(spec, null, 2);
  
  return (
    <Markdown
      content={`\`\`\`json\n${jsonString}\n\`\`\``}
      className={cn("text-sm [&_pre]:m-0 [&_pre]:p-0 [&_pre]:bg-transparent [&_pre]:border-0", className)}
    />
  );
}