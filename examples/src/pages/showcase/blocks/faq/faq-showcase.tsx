import { useState } from "react";
import { Link } from "react-router-dom";
import { render } from "@alexberriman/react-jedi";
import type { FAQDef } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";

export function FAQShowcase() {
  usePageMetadata({
    title: "FAQ Block - React Jedi",
    description: "Comprehensive FAQ component with multiple variants including accordion, grid cards, two-column, categorized, and search functionality.",
  });

  const [activeExample, setActiveExample] = useState("accordion");

  // Sample FAQ data
  const sampleFAQs = [
    {
      id: "1",
      question: "What is React Jedi?",
      answer: "React Jedi is a server-driven UI library that enables developers to build modern React interfaces using JSON specifications. It provides a single render() function that transforms JSON schemas into fully functional React components.",
      category: "general",
      tags: ["react", "json", "ui"],
      isPopular: true,
      anchorId: "what-is-react-jedi",
      relatedArticles: [
        { title: "Getting Started Guide", href: "/docs/getting-started" },
        { title: "Component Overview", href: "/docs/components" }
      ]
    },
    {
      id: "2",
      question: "How do I install React Jedi?",
      answer: `<p>You can install React Jedi using npm or yarn:</p>
      <pre><code>npm install react-jedi
# or
yarn add react-jedi</code></pre>
      <p>Then import and use it in your React application:</p>
      <pre><code>import { render } from 'react-jedi';

const spec = {
  type: 'Button',
  children: 'Click me!'
};

function App() {
  return render(spec);
}</code></pre>`,
      category: "installation",
      tags: ["install", "npm", "setup"],
      isPopular: true,
      anchorId: "installation"
    },
    {
      id: "3",
      question: "What components are available?",
      answer: "React Jedi includes over 50+ components covering layout (Box, Grid, Flex), typography (Text, Heading), UI elements (Button, Card, Badge), forms (Input, Select, Checkbox), and advanced blocks (Header, Footer, Carousel, FAQ).",
      category: "general",
      tags: ["components", "ui", "blocks"],
      anchorId: "available-components"
    },
    {
      id: "4",
      question: "How do I customize component styles?",
      answer: `<p>React Jedi uses Tailwind CSS for styling. You can customize components in several ways:</p>
      <ul>
        <li><strong>className prop:</strong> Add custom Tailwind classes</li>
        <li><strong>style prop:</strong> Use inline styles for specific cases</li>
        <li><strong>Theme system:</strong> Configure global design tokens</li>
        <li><strong>CSS overrides:</strong> Override default styles with custom CSS</li>
      </ul>`,
      category: "styling",
      tags: ["tailwind", "css", "theming"],
      relatedArticles: [
        { title: "Theming Guide", href: "/docs/theming" },
        { title: "Tailwind Integration", href: "/docs/tailwind" }
      ]
    },
    {
      id: "5",
      question: "Can I use TypeScript with React Jedi?",
      answer: "Yes! React Jedi is built with TypeScript and provides full type safety. All component specifications have proper TypeScript interfaces, and the render function is fully typed to catch errors at compile time.",
      category: "typescript",
      tags: ["typescript", "types", "safety"],
      isPopular: true
    },
    {
      id: "6",
      question: "How do I handle events and interactions?",
      answer: `<p>React Jedi supports event handling through action props and event handlers:</p>
      <pre><code>{
  "type": "Button",
  "onClick": "handleClick",
  "children": "Click me"
}</code></pre>
      <p>You provide the handlers in the render context:</p>
      <pre><code>const handlers = {
  handleClick: () => console.log('Button clicked!')
};

render(spec, { handlers });</code></pre>`,
      category: "events",
      tags: ["events", "handlers", "interactions"]
    },
    {
      id: "7",
      question: "Is React Jedi production ready?",
      answer: "Yes, React Jedi is production ready and actively maintained. It includes comprehensive testing, accessibility features, performance optimizations, and is used by companies worldwide for building scalable applications.",
      category: "general",
      tags: ["production", "stability", "maintenance"]
    },
    {
      id: "8",
      question: "How do I contribute to React Jedi?",
      answer: `<p>We welcome contributions! Here's how you can help:</p>
      <ul>
        <li>Report bugs and issues on GitHub</li>
        <li>Submit feature requests</li>
        <li>Contribute code via pull requests</li>
        <li>Improve documentation</li>
        <li>Help other users in discussions</li>
      </ul>
      <p>Check our <a href="/contributing">contributing guide</a> for detailed instructions.</p>`,
      category: "contributing",
      tags: ["contribute", "github", "community"]
    }
  ];

  const sampleCategories = [
    { id: "general", name: "General", description: "General questions about React Jedi", count: 3 },
    { id: "installation", name: "Installation", description: "Setup and installation help", count: 1 },
    { id: "styling", name: "Styling", description: "Customization and theming", count: 1 },
    { id: "typescript", name: "TypeScript", description: "TypeScript integration", count: 1 },
    { id: "events", name: "Events", description: "Event handling and interactions", count: 1 },
    { id: "contributing", name: "Contributing", description: "How to contribute", count: 1 }
  ];

  // Example configurations
  const examples = {
    accordion: {
      type: "FAQ",
      variant: "accordion",
      items: sampleFAQs.slice(0, 5),
      openFirst: true,
      allowCollapse: true,
      animated: true,
      voting: {
        enabled: true,
        showVoteCount: true
      }
    } as FAQDef,
    
    grid: {
      type: "FAQ",
      variant: "grid",
      items: sampleFAQs.slice(0, 6),
      columns: 2,
      animated: true,
      spacing: "normal",
      voting: {
        enabled: true,
        showVoteCount: false
      }
    } as FAQDef,
    
    twoColumn: {
      type: "FAQ",
      variant: "two-column",
      items: sampleFAQs.slice(0, 6),
      animated: true,
      spacing: "relaxed",
      voting: {
        enabled: true
      }
    } as FAQDef,
    
    withCategories: {
      type: "FAQ",
      variant: "categorized",
      items: sampleFAQs,
      categories: sampleCategories,
      showCategories: true,
      showPopularFirst: true,
      animated: true,
      voting: {
        enabled: true,
        showVoteCount: true
      }
    } as FAQDef,
    
    withSearch: {
      type: "FAQ",
      variant: "search",
      items: sampleFAQs,
      showSearch: true,
      animated: true,
      search: {
        enabled: true,
        placeholder: "Search frequently asked questions...",
        searchInAnswers: true,
        highlightMatches: true
      },
      voting: {
        enabled: true
      }
    } as FAQDef,
    
    complete: {
      type: "FAQ",
      variant: "accordion",
      items: sampleFAQs,
      categories: sampleCategories,
      showCategories: true,
      showSearch: true,
      showPopularFirst: true,
      openFirst: true,
      animated: true,
      spacing: "normal",
      search: {
        enabled: true,
        placeholder: "Search our knowledge base...",
        searchInAnswers: true,
        highlightMatches: true
      },
      voting: {
        enabled: true,
        showVoteCount: true,
        requireAuth: false
      },
      contactSupport: {
        enabled: true,
        title: "Still need help?",
        description: "Can't find what you're looking for? Our support team is here to help.",
        buttonText: "Contact Support",
        href: "/contact"
      }
    } as FAQDef
  };

  const exampleTabs = [
    { id: "accordion", label: "Accordion", description: "Basic accordion-style FAQ" },
    { id: "grid", label: "Grid Cards", description: "FAQ items displayed as cards in a grid" },
    { id: "twoColumn", label: "Two-Column", description: "Two-column layout for better readability" },
    { id: "withCategories", label: "With Categories", description: "FAQ with category filtering" },
    { id: "withSearch", label: "With Search", description: "FAQ with search functionality" },
    { id: "complete", label: "All Features", description: "Complete FAQ with all features enabled" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/showcase/blocks"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Blocks
          </Link>
          <Badge variant="secondary">Content Block</Badge>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          FAQ Block
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
          Comprehensive FAQ component with multiple variants including accordion, grid cards, 
          two-column, categorized, and search functionality. Features voting system, 
          category filtering, and contact support CTA.
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge>Accordion</Badge>
          <Badge>Grid Layout</Badge>
          <Badge>Search</Badge>
          <Badge>Categories</Badge>
          <Badge>Voting</Badge>
          <Badge>Animations</Badge>
          <Badge>Mobile Optimized</Badge>
          <Badge>Accessible</Badge>
        </div>
      </div>

      <Tabs value={activeExample} onValueChange={setActiveExample} className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Variants & Examples</h2>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            {exampleTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-xs lg:text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {exampleTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <ShowcaseWrapper
              title={tab.label}
              description={tab.description}
              code={JSON.stringify(examples[tab.id as keyof typeof examples], null, 2)}
            >
              {render(examples[tab.id as keyof typeof examples])}
            </ShowcaseWrapper>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Features & Capabilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Search Functionality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Powerful search that works across questions, answers, and tags with match highlighting and real-time filtering.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📂</span>
                Category Filtering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize FAQs by categories with count indicators and easy switching between different topic areas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">👍</span>
                Voting System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built-in helpful/not helpful voting system with optional vote counts to gather user feedback on content quality.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                Multiple Layouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Choose from accordion, grid cards, two-column, or categorized layouts to match your design needs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Smooth Animations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Beautiful expand/collapse animations with stagger effects and configurable timing for enhanced user experience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                Mobile Optimized
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fully responsive design with mobile-first approach, touch-friendly interactions, and optimized layouts for all screen sizes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Rich Content Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Support for HTML content, related articles, anchor links, and custom React components within FAQ answers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Contact Support CTA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Optional contact support section to encourage users to reach out when they can&apos;t find what they&apos;re looking for.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">♿</span>
                Accessibility First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Full keyboard navigation, ARIA attributes, screen reader support, and semantic HTML structure for maximum accessibility.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold mb-2">💡 Pro Tip</h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          For best results, organize your FAQs by popularity and category. Use the search functionality 
          to help users quickly find specific answers, and enable voting to continuously improve your content quality.
        </p>
      </div>
    </div>
  );
}