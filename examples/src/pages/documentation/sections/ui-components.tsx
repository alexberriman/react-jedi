import { Link } from "react-router-dom";
import { usePageMetadata } from "../../../lib/meta";

export function UIComponentsPage() {
  usePageMetadata({
    title: "UI Components",
    description: "React Jedi UI components documentation - Buttons, cards, badges, and more.",
  });
  return (
    <section id="ui-components" className="mb-20">
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-200 dark:border-zinc-800 inline-block pr-8 transition-colors">
          UI Components
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50 transition-colors" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group transition-colors">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 transition-colors">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors"
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
              <h3 className="text-xl font-semibold transition-colors">Button</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">
              Versatile button component with multiple variants and sizes.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
              <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm transition-colors">
                <pre className="whitespace-pre-wrap text-sm transition-colors">
                  {`{
  "type": "button",
  "text": "Click Me",
  "variant": "primary",
  "size": "lg",
  "icon": "arrow-right",
  "loading": false,
  "disabled": false
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group transition-colors">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 transition-colors">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors"
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
              <h3 className="text-xl font-semibold transition-colors">Card</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">
              Container for grouping related content with optional header and footer.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
              <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm transition-colors">
                <pre className="whitespace-pre-wrap text-sm transition-colors">
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
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group transition-colors">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 transition-colors">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors"
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
              <h3 className="text-xl font-semibold transition-colors">Badge</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">
              Small status indicators with various styling options.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
              <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm transition-colors">
                <pre className="whitespace-pre-wrap text-sm transition-colors">
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
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group transition-colors">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 transition-colors">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors"
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
              <h3 className="text-xl font-semibold transition-colors">Avatar</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">
              Display user profile images with fallback initials.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
              <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm transition-colors">
                <pre className="whitespace-pre-wrap text-sm transition-colors">
                  {`{
  "type": "avatar",
  "src": "https://example.com/avatar.jpg",
  "alt": "User Name",
  "fallback": "JD",
  "size": "md"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center transition-colors">
        <Link
          to="/showcase"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-zinc-900 dark:text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group transition-colors"
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
    </section>
  );
}
