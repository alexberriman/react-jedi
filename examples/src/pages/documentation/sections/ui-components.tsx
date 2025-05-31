import { Link } from "react-router-dom";
import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";

export function UIComponentsPage() {
  usePageMetadata({
    title: "UI Components",
    description: "React Jedi UI components documentation - Buttons, cards, badges, and more.",
  });
  return (
    <div>
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-700 inline-block pr-8">
          UI Components
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-gray-500/50" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Button</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Versatile button component with multiple variants and sizes.
            </p>
            <div className="relative group-hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 to-gray-500/20 rounded-lg blur opacity-0 group-hover:opacity-100"></div>
              <CodeBlock language="json" className="relative">
{`{
  "type": "button",
  "text": "Click Me",
  "variant": "primary",
  "size": "lg",
  "icon": "arrow-right",
  "loading": false,
  "disabled": false
}`}
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Card</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Container for grouping related content with optional header and footer.
            </p>
            <div className="relative group-hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 to-gray-500/20 rounded-lg blur opacity-0 group-hover:opacity-100"></div>
              <CodeBlock language="json" className="relative">
{`{
  "type": "card",
  "children": [
    {
      "type": "heading",
      "level": "h3",
      "content": "Card Title"
    },
    {
      "type": "text",
      "text": "Card content goes here."
    }
  ]
}`}
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Badge</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Small status indicators with various styling options.
            </p>
            <div className="relative group-hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 to-gray-500/20 rounded-lg blur opacity-0 group-hover:opacity-100"></div>
              <CodeBlock language="json" className="relative">
{`{
  "type": "badge",
  "text": "New",
  "variant": "default",
  "size": "default"
}

// Or with different variants
{
  "type": "badge",
  "text": "Beta",
  "variant": "secondary"
}

{
  "type": "badge",
  "text": "2 items",
  "variant": "outline"
}`}
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Avatar</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Display user profile images with fallback initials.
            </p>
            <div className="relative group-hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 to-gray-500/20 rounded-lg blur opacity-0 group-hover:opacity-100"></div>
              <CodeBlock language="json" className="relative">
{`{
  "type": "avatar",
  "src": "https://example.com/avatar.jpg",
  "alt": "User Name",
  "fallback": "JD",
  "size": "md"
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/showcase"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full text-zinc-900 dark:text-white font-medium hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-gray-500/20 group"
        >
          <span>View UI Components Showcase</span>
          <svg
            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
