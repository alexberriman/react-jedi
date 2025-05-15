export function ShowcasePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Component Showcase</h1>
        <p className="text-xl text-zinc-300 mb-12">
          Explore all the available components from Milestone 1. Each component can be defined via JSON specification.
        </p>

        {/* Component Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: "Layout Components",
              description: "Essential components for creating layouts and structured content.",
              components: ["Container", "Box", "Grid", "Flex", "AspectRatio", "Separator"],
            },
            {
              title: "Typography Components",
              description: "Components for text content with various styling options.",
              components: ["Heading", "Text", "BlockQuote"],
            },
            {
              title: "UI Components",
              description: "Interactive and visual UI elements for user interfaces.",
              components: ["Button", "Card", "Badge", "Avatar", "Skeleton"],
            },
            {
              title: "Media Components",
              description: "Components for displaying media content.",
              components: ["Image"],
            },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-emerald-500/50 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-3">{category.title}</h2>
              <p className="text-zinc-300 mb-4">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.components.map((component, idx) => (
                  <span
                    key={idx}
                    className="bg-zinc-700 text-zinc-100 px-3 py-1 rounded-md text-sm"
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-700/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">More Components Coming Soon</h2>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            This showcase displays Milestone 1 components. Future milestones will bring interactive components, 
            advanced layouts, theming system, and much more!
          </p>
        </div>
      </div>
    </div>
  );
}