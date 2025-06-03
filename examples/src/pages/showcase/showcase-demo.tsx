import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";

interface ShowcaseDemoProps {
  readonly children: React.ReactNode;
  readonly background?: "default" | "dark" | "gradient";
}

export function ShowcaseDemo({ children, background = "default" }: ShowcaseDemoProps) {
  const bgClasses = {
    default: "bg-white dark:bg-gray-900",
    dark: "bg-gray-900",
    gradient: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
  };

  return (
    <div className={`p-6 rounded-lg border border-gray-200 dark:border-gray-700 ${bgClasses[background]}`}>
      {children}
    </div>
  );
}

interface ShowcaseSectionProps {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly code?: string;
  readonly children: React.ReactNode;
}

export function ShowcaseSection({ id, title, description, code, children }: ShowcaseSectionProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id={id} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        {description && (
          <p className="text-base text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>

      {children}

      {code && (
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left font-medium text-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="flex items-center gap-2">
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
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              View Code
            </span>
            {showCode ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {showCode && (
            <div className="relative">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                title="Copy code"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
              <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
                <code className="text-sm font-mono">{code}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </section>
  );
}