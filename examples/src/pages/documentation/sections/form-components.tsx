import { Link } from "react-router-dom";

export function FormComponentsPage() {
  return (
    <section id="form-components" className="mb-20">
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
          Form Components
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-emerald-400"
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
            <p className="text-zinc-400 mb-4">
              Text input field with support for various input types.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap text-sm">
                  {`{
  "type": "input",
  "id": "username",
  "placeholder": "Enter your username",
  "type": "text",
  "disabled": false,
  "readOnly": false
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-emerald-400"
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
            <p className="text-zinc-400 mb-4">Form label component with accessibility features.</p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap text-sm">
                  {`{
  "type": "label",
  "text": "Username",
  "htmlFor": "username",
  "required": true
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-emerald-800/30 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3 text-emerald-400">Form Component Features</h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-white">Input Groups</span> - Group inputs with
            prefixes and suffixes
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-white">Validation States</span> - Built-in support
            for form validation
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-white">Accessibility</span> - ARIA attributes and
            keyboard navigation
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-white">Responsive Design</span> - Mobile-friendly
            form components
          </li>
        </ul>
      </div>

      <div className="text-center">
        <Link
          to="/showcase"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group"
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
    </section>
  );
}
