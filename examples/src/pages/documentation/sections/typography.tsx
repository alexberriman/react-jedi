import { Link } from "react-router-dom";

export function TypographyPage() {
  return (
    <section id="typography" className="mb-20">
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
          Typography
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
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Heading</h3>
            </div>
            <p className="text-zinc-400 mb-4">
              Headings from h1 to h6 with customizable styling options.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap text-sm">
                  {`{
  "type": "heading",
  "level": "h1",
  "content": "Page Title",
  "size": "5xl",
  "weight": "extrabold",
  "gradient": "rainbow",
  "animation": "glow"
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Text</h3>
            </div>
            <p className="text-zinc-400 mb-4">
              Paragraphs and text spans with rich styling options.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap text-sm">
                  {`{
  "type": "text",
  "text": "This is styled paragraph text with advanced features.",
  "element": "p",
  "size": "lg",
  "weight": "medium",
  "variant": "primary",
  "gradient": "ocean",
  "align": "justify",
  "lineClamp": 3,
  "shadow": true,
  "transform": "capitalize"
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">BlockQuote</h3>
            </div>
            <p className="text-zinc-400 mb-4">
              Stylized blockquotes for testimonials and citations.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap text-sm">
                  {`{
  "type": "blockquote",
  "content": "This is a beautiful quote.",
  "author": "John Doe",
  "cite": "Book Title",
  "variant": "primary"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-emerald-800/30 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3 text-emerald-400">Typography Features</h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-white">Gradients</span> - Apply beautiful text
            gradients
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-white">Transformations</span> - Uppercase,
            lowercase, capitalize
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-white">Animations</span> - Glow, pulse, shimmer
            effects
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-white">Truncation</span> - Single and multi-line
            text truncation
          </li>
        </ul>
      </div>

      <div className="text-center">
        <Link
          to="/showcase"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group"
        >
          <span>View Typography Showcase</span>
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
