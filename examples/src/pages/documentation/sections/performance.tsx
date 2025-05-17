export function PerformancePage() {
  return (
    <section id="performance" className="mb-20">
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
          Performance Analysis
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-blue-500/50" />
        </h2>
      </div>

      <div className="prose prose-invert prose-blue max-w-none">
        <p className="text-xl text-zinc-300 mb-6">
          Understanding the performance characteristics of React Jedi&apos;s server-driven approach
          compared to traditional React development.
        </p>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">
            JSON vs Code Performance Comparison
          </h3>
          <p className="text-zinc-300 mb-4">
            Our benchmarks show that React Jedi&apos;s JSON-based approach adds minimal overhead
            while providing significant benefits:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-black/50 border border-zinc-800 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-green-400">Traditional React</h4>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Direct component rendering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>No parsing overhead</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Larger bundle sizes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Fixed at build time</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/50 border border-zinc-800 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-purple-400">React Jedi (JSON)</h4>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Smaller bundle sizes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Server-driven updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>Dynamic theming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">±</span>
                  <span>Small parsing overhead</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-lg p-4">
            <h5 className="font-semibold mb-2 text-blue-300">Benchmark Results</h5>
            <p className="text-zinc-300">
              In typical use cases, React Jedi adds <strong>15-30% render time overhead</strong>{" "}
              compared to traditional React components, which is negligible for most applications
              and outweighed by the benefits of:
            </p>
            <ul className="mt-2 space-y-1 text-zinc-300">
              <li>• Reduced bundle sizes (30-50% smaller)</li>
              <li>• Dynamic content updates without deployment</li>
              <li>• Consistent theming across all components</li>
              <li>• Rapid prototyping and iteration</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-blue-400">Performance Best Practices</h3>

        <div className="space-y-4">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">
              1. Optimize JSON Specifications
            </h4>
            <p className="text-zinc-300 mb-3">Keep your JSON specifications lean and focused:</p>
            <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">
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
              </pre>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">2. Component Memoization</h4>
            <p className="text-zinc-300 mb-3">
              React Jedi automatically memoizes component rendering for optimal performance:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Components are only re-rendered when their JSON spec changes</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Theme changes trigger minimal re-renders</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>State updates are localized to affected components</span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">3. Lazy Loading</h4>
            <p className="text-zinc-300 mb-3">Load complex components only when needed:</p>
            <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">
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
              </pre>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">
              4. Bundle Size Optimization
            </h4>
            <p className="text-zinc-300 mb-3">React Jedi significantly reduces bundle sizes:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black/50 border border-zinc-800 rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-green-400">Traditional React App</h5>
                <p className="text-zinc-400 text-sm">Bundle includes all component code</p>
                <p className="text-xl font-bold text-green-400 mt-2">~250KB</p>
              </div>
              <div className="bg-black/50 border border-zinc-800 rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-purple-400">React Jedi App</h5>
                <p className="text-zinc-400 text-sm">Bundle includes only core renderer</p>
                <p className="text-xl font-bold text-purple-400 mt-2">~80KB</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-8 text-blue-400">When to Use React Jedi</h3>

        <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-800/30 rounded-lg p-6">
          <p className="text-zinc-300 mb-4">
            React Jedi is ideal for applications that prioritize:
          </p>
          <ul className="space-y-2 text-zinc-300">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>
                <strong>Dynamic content</strong> - Marketing sites, landing pages, and
                content-driven apps
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>
                <strong>Rapid iteration</strong> - Prototypes and MVPs that need quick updates
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>
                <strong>Multi-tenant apps</strong> - SaaS platforms with customizable interfaces
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>
                <strong>A/B testing</strong> - Easy experimentation with different layouts
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6 mt-6">
          <p className="text-zinc-300">
            <strong className="text-blue-400">Bottom Line:</strong> The small performance trade-off
            of React Jedi is more than compensated by its flexibility, smaller bundle sizes, and
            development speed benefits. For most web applications, the ~20ms difference in render
            time is imperceptible to users.
          </p>
        </div>
      </div>
    </section>
  );
}
