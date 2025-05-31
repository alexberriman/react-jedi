import React from "react";
import { CodeBlock } from "./code-block";

interface CodeProps {
  code: string;
  language?: string;
  className?: string;
}

export const Code: React.FC<CodeProps> = ({ code, language = "typescript", className }) => {
  return <CodeBlock language={language} className={className}>{code}</CodeBlock>;
};
