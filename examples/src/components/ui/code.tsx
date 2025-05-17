import React from "react";
import { cn } from "@/lib/utils";

interface CodeProps {
  code: string;
  language?: string;
  className?: string;
}

export const Code: React.FC<CodeProps> = ({ code, language = "typescript", className }) => {
  return (
    <div className={cn("relative", className)}>
      <pre className="overflow-x-auto rounded-lg bg-muted p-4">
        <code className={`language-${language} text-sm`}>{code}</code>
      </pre>
    </div>
  );
};
