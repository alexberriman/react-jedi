import { render } from "@banja/react-jedi";
import { landingPageSchema } from "../../../schemas/landing-page";
import { usePageMetadata } from "../../../lib/meta";
import { PageHeader } from "../../../components/ui/page-header";

export function LandingExamplePage() {
  usePageMetadata({
    title: "Landing Page Example",
    description:
      "React Jedi landing page example - Professional marketing website built entirely from JSON specifications.",
  });
  return (
    <div className="flex flex-col">
      <PageHeader 
        title="JSON-Driven Landing Page Example"
        description="This landing page is rendered entirely from a JSON specification using React Jedi's server-driven UI architecture. It demonstrates how you can create beautiful, responsive pages with minimal code."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-16">

          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-10 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 transition-colors"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 transition-colors">
                landing-page.json
              </span>
            </div>
            <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-auto max-h-60 transition-colors">
              {JSON.stringify(landingPageSchema, null, 2)}
            </pre>
          </div>
        </div>

        {/* Rendered Landing Page from JSON */}
        <div className="border border-indigo-600/30 rounded-xl p-1 glow-sm transition-colors">
          <div className="bg-gray-50 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg overflow-hidden transition-colors">
            {render(landingPageSchema)}
          </div>
        </div>
      </div>
    </div>
  );
}
