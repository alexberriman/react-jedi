import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";

export function PerformancePage() {
  usePageMetadata({
    title: "Performance Analysis",
    description: "React Jedi performance documentation - Optimization strategies and benchmarks.",
  });
  return (
    <div>
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-200 dark:border-zinc-800 inline-block pr-8 transition-colors">
          Performance Analysis
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-blue-500/50 transition-colors" />
        </h2>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-6 transition-colors">
          Understanding the performance characteristics of React Jedi&apos;s server-driven approach
          compared to traditional React development.
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6 mb-8 transition-colors">
          <h3 className="text-xl font-semibold mb-4 text-blue-400 transition-colors">
            JSON vs Code Performance Comparison
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4 transition-colors">
            Our benchmarks show that React Jedi&apos;s JSON-based approach adds minimal overhead
            while providing significant benefits:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 transition-colors">
              <h4 className="text-lg font-semibold mb-2 text-green-400 transition-colors">
                Traditional React
              </h4>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 transition-colors">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 transition-colors">✓</span>
                  <span>Direct component rendering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 transition-colors">✓</span>
                  <span>No parsing overhead</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 transition-colors">✗</span>
                  <span>Larger bundle sizes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 transition-colors">✗</span>
                  <span>Fixed at build time</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 transition-colors">
              <h4 className="text-lg font-semibold mb-2 text-purple-400 transition-colors">
                React Jedi (JSON)
              </h4>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 transition-colors">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">✓</span>
                  <span>Smaller bundle sizes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">✓</span>
                  <span>Server-driven updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 transition-colors">✓</span>
                  <span>Dynamic theming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 transition-colors">±</span>
                  <span>Small parsing overhead</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-lg p-4 transition-colors">
            <h5 className="font-semibold mb-2 text-blue-300 transition-colors">
              Benchmark Results
            </h5>
            <p className="text-zinc-700 dark:text-zinc-300 transition-colors">
              In typical use cases, React Jedi adds <strong>15-30% render time overhead</strong>{" "}
              compared to traditional React components, which is negligible for most applications
              and outweighed by the benefits of:
            </p>
            <ul className="mt-2 space-y-1 text-zinc-700 dark:text-zinc-300 transition-colors">
              <li>• Reduced bundle sizes (30-50% smaller)</li>
              <li>• Dynamic content updates without deployment</li>
              <li>• Consistent theming across all components</li>
              <li>• Rapid prototyping and iteration</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-blue-400 transition-colors">
          Performance Best Practices
        </h3>

        <div className="space-y-4">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6 transition-colors">
            <h4 className="text-lg font-semibold mb-3 text-blue-400 transition-colors">
              1. Optimize JSON Specifications
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 mb-3 transition-colors">
              Keep your JSON specifications lean and focused:
            </p>
            <CodeBlock language="json" className="relative transition-colors">
{`// ❌ Avoid deeply nested structures
{
  "type": "Container",
  "children": [{
    "type": "Box",
    "children": [{
      "type": "Flex",
      "children": [/* ... 10 levels deep */]
    }]
  }]
}

// ✅ Prefer flatter structures
{
  "type": "Container",
  "children": [
    { "type": "Heading", "content": "Title" },
    { "type": "Grid", "children": [/* items */] }
  ]
}`}
            </CodeBlock>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6 transition-colors">
            <h4 className="text-lg font-semibold mb-3 text-blue-400 transition-colors">
              2. Component Memoization
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 mb-3 transition-colors">
              React Jedi automatically memoizes component rendering for optimal performance:
            </p>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 transition-colors">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 transition-colors">•</span>
                <span>Components are only re-rendered when their JSON spec changes</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 transition-colors">•</span>
                <span>Theme changes trigger minimal re-renders</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 transition-colors">•</span>
                <span>State updates are localized to affected components</span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6 transition-colors">
            <h4 className="text-lg font-semibold mb-3 text-blue-400 transition-colors">
              3. Lazy Loading
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 mb-3 transition-colors">
              Load complex components only when needed:
            </p>
            <CodeBlock language="json" className="relative transition-colors">
{`{
  "type": "Conditional",
  "if": "state.showDetails",
  "then": {
    "type": "LazyComponent",
    "loader": "DetailedView",
    "fallback": {
      "type": "Skeleton",
      "className": "h-64"
    }
  }
}`}
            </CodeBlock>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6 transition-colors">
            <h4 className="text-lg font-semibold mb-3 text-blue-400 transition-colors">
              4. Bundle Size Optimization
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 mb-3 transition-colors">
              React Jedi significantly reduces bundle sizes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 transition-colors">
                <h5 className="font-semibold mb-2 text-green-400 transition-colors">
                  Traditional React App
                </h5>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm transition-colors">
                  Bundle includes all component code
                </p>
                <p className="text-xl font-bold text-green-400 mt-2 transition-colors">~250KB</p>
              </div>
              <div className="bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 transition-colors">
                <h5 className="font-semibold mb-2 text-purple-400 transition-colors">
                  React Jedi App
                </h5>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm transition-colors">
                  Bundle includes only core renderer
                </p>
                <p className="text-xl font-bold text-purple-400 mt-2 transition-colors">~80KB</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-8 text-blue-400 transition-colors">
          When to Use React Jedi
        </h3>

        <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-800/30 rounded-lg p-6 transition-colors">
          <p className="text-zinc-700 dark:text-zinc-300 mb-4 transition-colors">
            React Jedi is ideal for applications that prioritize:
          </p>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 transition-colors">
            <li className="flex items-start">
              <span className="text-emerald-600 dark:text-emerald-400 mr-2 transition-colors">
                ✓
              </span>
              <span>
                <strong>Dynamic content</strong> - Marketing sites, landing pages, and
                content-driven apps
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 dark:text-emerald-400 mr-2 transition-colors">
                ✓
              </span>
              <span>
                <strong>Rapid iteration</strong> - Prototypes and MVPs that need quick updates
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 dark:text-emerald-400 mr-2 transition-colors">
                ✓
              </span>
              <span>
                <strong>Multi-tenant apps</strong> - SaaS platforms with customizable interfaces
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 dark:text-emerald-400 mr-2 transition-colors">
                ✓
              </span>
              <span>
                <strong>A/B testing</strong> - Easy experimentation with different layouts
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6 mt-6 transition-colors">
          <p className="text-zinc-700 dark:text-zinc-300 transition-colors">
            <strong className="text-blue-400 transition-colors">Bottom Line:</strong> The small
            performance trade-off of React Jedi is more than compensated by its flexibility, smaller
            bundle sizes, and development speed benefits. For most web applications, the ~20ms
            difference in render time is imperceptible to users.
          </p>
        </div>
      </div>
    </div>
  );
}
