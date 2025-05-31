import { Link } from "react-router-dom";
import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";

export function FormComponentsPage() {
  usePageMetadata({
    title: "Form Components",
    description:
      "React Jedi form components documentation - Inputs, selects, checkboxes, and validation.",
  });
  return (
    <div>
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-700 inline-block pr-8">
          Form Components
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 transition duration-300 group">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Input</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Text input field with support for various input types.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <CodeBlock language="json" className="relative">
{`{
  "type": "input",
  "id": "username",
  "placeholder": "Enter your username",
  "type": "text",
  "disabled": false,
  "readOnly": false
}`}
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 transition duration-300 group">
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
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Label</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Form label component with accessibility features.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <CodeBlock language="json" className="relative">
{`{
  "type": "label",
  "text": "Username",
  "htmlFor": "username",
  "required": true
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900/30 to-gray-900/30 border border-gray-800/30 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Form Component Features
        </h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Input Groups
            </span>{" "}
            - Group inputs with prefixes and suffixes
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Validation States
            </span>{" "}
            - Built-in support for form validation
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Accessibility
            </span>{" "}
            - ARIA attributes and keyboard navigation
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Responsive Design
            </span>{" "}
            - Mobile-friendly form components
          </li>
        </ul>
      </div>

      <div className="text-center">
        <Link
          to="/showcase"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full text-zinc-900 dark:text-white font-medium hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-gray-500/20 group"
        >
          <span>View Form Components Showcase</span>
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
