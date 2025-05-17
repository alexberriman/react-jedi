import { render } from "@banja/react-jedi";
import { landingPageSchema } from "../../../schemas/landing-page";
import { usePageMetadata } from "../../../lib/meta";

export function LandingExamplePage() {
  usePageMetadata({
    title: "Landing Page Example",
    description:
      "React Jedi landing page example - Professional marketing website built entirely from JSON specifications.",
  });
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-colors">
            JSON-Driven Landing Page Example
          </h1>
          <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8 transition-colors">
            This landing page is rendered entirely from a JSON specification using React Jedi&apos;s
            server-driven UI architecture. It demonstrates how you can create beautiful, responsive
            pages with minimal code.
          </p>

          <div className="bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mb-10 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 transition-colors"></div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-2 transition-colors">
                landing-page.json
              </span>
            </div>
            <pre className="text-sm text-zinc-700 dark:text-zinc-300 overflow-auto max-h-60 transition-colors">
              {JSON.stringify(landingPageSchema, null, 2)}
            </pre>
          </div>
        </div>

        {/* Rendered Landing Page from JSON */}
        <div className="border border-indigo-600/30 rounded-xl p-1 glow-sm transition-colors">
          <div className="bg-zinc-50 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg overflow-hidden transition-colors">
            {render(landingPageSchema)}
          </div>
        </div>
      </div>
    </div>
  );
}
