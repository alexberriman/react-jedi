import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { usePageMetadata } from "../../../lib/meta";
import { PageHeader } from "../../../components/ui/page-header";

export function MarketingTemplatePage() {
  usePageMetadata({
    title: "Marketing Template",
    description:
      "Full marketing website template built with React Jedi - Modern, responsive multi-page site.",
  });
  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Full Marketing Website Template"
        description="A complete marketing website template built with React Jedi's JSON-driven architecture. This template demonstrates how to create a professional marketing site with multiple pages, modern design, and seamless navigation—all driven by JSON specifications."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-16">

          <div className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 rounded-2xl p-8 mb-10">
            <h3 className="text-2xl font-semibold mb-6 text-purple-300">Template Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Multi-page structure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Modern, sexy design</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-gray-700 dark:text-gray-300">JSON-driven architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Responsive layouts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Dark theme optimized</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Reusable components</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Available Pages</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/templates/marketing/home" className="block">
                <div className="p-6 rounded-lg bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 hover:border-blue-500/40 transition-all group">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Homepage
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Hero section, features, testimonials, and CTA
                  </p>
                </div>
              </Link>

              <Link to="/templates/marketing/about" className="block">
                <div className="p-6 rounded-lg bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    About Us
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Company story, values, team, and mission
                  </p>
                </div>
              </Link>

              <Link to="/templates/marketing/services" className="block">
                <div className="p-6 rounded-lg bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 hover:border-green-500/40 transition-all group">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
                    Services
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Detailed service offerings and expertise
                  </p>
                </div>
              </Link>

              <Link to="/templates/marketing/cases" className="block">
                <div className="p-6 rounded-lg bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors">
                    Case Studies
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Portfolio and success stories</p>
                </div>
              </Link>

              <Link to="/templates/marketing/pricing" className="block">
                <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                    Pricing
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Pricing plans and packages</p>
                </div>
              </Link>

              <Link to="/templates/marketing/contact" className="block">
                <div className="p-6 rounded-lg bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 hover:border-red-500/40 transition-all group">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                    Contact
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Contact form and information</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Implementation Details</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This marketing template showcases how to build a complete website using JSON
              specifications. Each page is rendered from a JSON schema that defines the structure,
              content, and styling.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The template includes reusable component patterns, consistent theming, and responsive
              layouts—all configured through declarative JSON schemas that make it easy to customize
              and extend.
            </p>
            <div className="flex gap-4">
              <Link to="/templates/marketing/home">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0"
                >
                  View Live Demo
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="backdrop-blur-sm">
                View Source Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
