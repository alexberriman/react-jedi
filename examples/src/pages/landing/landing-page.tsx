import { render } from "@banja/react-jedi";
import { landingPageSchema } from "../../schemas/landing-page";

export function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            JSON-Driven Landing Page Example
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            This landing page is rendered entirely from a JSON specification using React Jedi's server-driven UI architecture.
            It demonstrates how you can create beautiful, responsive pages with minimal code.
          </p>
          
          <div className="bg-black/50 border border-zinc-800 rounded-lg p-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-zinc-400 ml-2">landing-page.json</span>
            </div>
            <pre className="text-sm text-zinc-300 overflow-auto max-h-60">
              {JSON.stringify(landingPageSchema, null, 2)}
            </pre>
          </div>
        </div>

        {/* Rendered Landing Page from JSON */}
        <div className="border border-indigo-600/30 rounded-xl p-1 glow-sm">
          <div className="bg-zinc-900/90 backdrop-blur-sm rounded-lg overflow-hidden">
            {render({ spec: landingPageSchema })}
          </div>
        </div>
      </div>
    </div>
  );
}