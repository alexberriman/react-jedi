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
        title="Marketing Website Template"
        description="A complete marketing website template built with React Jedi's JSON-driven architecture. This template demonstrates how to create a professional marketing site with multiple pages, modern design, and seamless navigation—all driven by JSON specifications."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-16">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 mb-10">
            <h3 className="text-2xl font-semibold mb-6">Template Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm">•</span>
                <span className="text-zinc-700 dark:text-zinc-300">Multi-page structure</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">•</span>
                <span className="text-zinc-700 dark:text-zinc-300">Modern design</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">•</span>
                <span className="text-zinc-700 dark:text-zinc-300">JSON-driven architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">•</span>
                <span className="text-zinc-700 dark:text-zinc-300">Responsive layouts</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">•</span>
                <span className="text-zinc-700 dark:text-zinc-300">Dark theme optimized</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">•</span>
                <span className="text-zinc-700 dark:text-zinc-300">Reusable components</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6">Available Pages</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/templates/marketing/home" className="block">
                <div className="p-6 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">
                    Homepage
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Hero section, features, testimonials, and CTA
                  </p>
                </div>
              </Link>

              <Link to="/templates/marketing/about" className="block">
                <div className="p-6 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">
                    About Us
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Company story, values, team, and mission
                  </p>
                </div>
              </Link>

              <Link to="/templates/marketing/services" className="block">
                <div className="p-6 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">
                    Services
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Detailed service offerings and expertise
                  </p>
                </div>
              </Link>

              <Link to="/templates/marketing/cases" className="block">
                <div className="p-6 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">
                    Case Studies
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Portfolio and success stories</p>
                </div>
              </Link>

              <Link to="/templates/marketing/pricing" className="block">
                <div className="p-6 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">
                    Pricing
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Pricing plans and packages</p>
                </div>
              </Link>

              <Link to="/templates/marketing/contact" className="block">
                <div className="p-6 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <h4 className="text-xl font-semibold mb-2">
                    Contact
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Contact form and information</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Implementation Details</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              This marketing template showcases how to build a complete website using JSON
              specifications. Each page is rendered from a JSON schema that defines the structure,
              content, and styling.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
              The template includes reusable component patterns, consistent theming, and responsive
              layouts—all configured through declarative JSON schemas that make it easy to customize
              and extend.
            </p>
            <div className="flex gap-4">
              <Link to="/templates/marketing/home">
                <Button
                  size="lg"
                  className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                >
                  View Live Demo
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                View Source Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}