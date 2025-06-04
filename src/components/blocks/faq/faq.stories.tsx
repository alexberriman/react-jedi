import type { Meta, StoryObj } from "@storybook/react";
import { FAQBlock } from "./faq";
import type { FAQDef } from "../../../types/components/faq";

const meta: Meta<typeof FAQBlock> = {
  title: "Blocks/FAQ",
  component: FAQBlock,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Comprehensive FAQ component with multiple variants including accordion, grid cards, two-column, categorized, and search. Features voting system, category filtering, search functionality, and contact support CTA.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
    </ul>
    <p>Example with className:</p>
    <pre><code>{
  "type": "Button",
  "className": "bg-purple-600 hover:bg-purple-700",
  "children": "Custom Button"
}</code></pre>`,
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

// Basic Accordion FAQ
export const Accordion: Story = {
  args: {
    spec: {
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
  },
  parameters: {
    docs: {
      description: {
        story: "Basic accordion-style FAQ with collapsible items, voting system, and smooth animations.",
      },
    },
  },
};

// Grid Cards Variant
export const GridCards: Story = {
  args: {
    spec: {
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
  },
  parameters: {
    docs: {
      description: {
        story: "Grid layout with FAQ items displayed as cards, perfect for showcasing featured questions.",
      },
    },
  },
};

// Two-Column Layout
export const TwoColumn: Story = {
  args: {
    spec: {
      type: "FAQ",
      variant: "two-column",
      items: sampleFAQs.slice(0, 6),
      animated: true,
      spacing: "relaxed",
      voting: {
        enabled: true
      }
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Two-column layout that distributes FAQ items evenly across both columns for better readability.",
      },
    },
  },
};

// FAQ with Categories
export const WithCategories: Story = {
  args: {
    spec: {
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
  },
  parameters: {
    docs: {
      description: {
        story: "FAQ with category filtering, showing popular items first and category-based organization.",
      },
    },
  },
};

// FAQ with Search
export const WithSearch: Story = {
  args: {
    spec: {
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
  },
  parameters: {
    docs: {
      description: {
        story: "FAQ with search functionality that searches both questions and answers with match highlighting.",
      },
    },
  },
};

// Complete FAQ with All Features
export const Complete: Story = {
  args: {
    spec: {
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
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Complete FAQ with all features enabled: search, categories, voting, contact support, and animations.",
      },
    },
  },
};

// Three-Column Grid
export const ThreeColumnGrid: Story = {
  args: {
    spec: {
      type: "FAQ",
      variant: "grid",
      items: sampleFAQs,
      columns: 3,
      animated: true,
      spacing: "compact",
      maxItems: 9,
      voting: {
        enabled: false
      }
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Three-column grid layout with compact spacing and limited item count for overview sections.",
      },
    },
  },
};

// Minimal FAQ
export const Minimal: Story = {
  args: {
    spec: {
      type: "FAQ",
      variant: "accordion",
      items: sampleFAQs.slice(0, 4),
      animated: false,
      allowCollapse: false,
      spacing: "compact",
      voting: {
        enabled: false
      }
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal FAQ without animations, voting, or collapsing for simple informational display.",
      },
    },
  },
};

// FAQ with Contact Support Only
export const WithContactSupport: Story = {
  args: {
    spec: {
      type: "FAQ",
      variant: "grid",
      items: sampleFAQs.slice(0, 4),
      columns: 2,
      animated: true,
      contactSupport: {
        enabled: true,
        title: "Need more help?",
        description: "Browse our knowledge base or get in touch with our expert support team.",
        buttonText: "Get Support",
        href: "/support"
      }
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story: "FAQ with prominent contact support CTA for encouraging user engagement.",
      },
    },
  },
};

// Popular Questions Only
export const PopularOnly: Story = {
  args: {
    spec: {
      type: "FAQ",
      variant: "accordion",
      items: sampleFAQs.filter(item => item.isPopular),
      showPopularFirst: true,
      openFirst: true,
      animated: true,
      voting: {
        enabled: true,
        showVoteCount: true
      }
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Display only popular/featured FAQ items for highlighting the most important questions.",
      },
    },
  },
};

// Mobile Optimized
export const MobileOptimized: Story = {
  args: {
    spec: {
      type: "FAQ",
      variant: "accordion",
      items: sampleFAQs.slice(0, 5),
      animated: true,
      spacing: "compact",
      showSearch: true,
      search: {
        enabled: true,
        placeholder: "Search FAQs..."
      },
      voting: {
        enabled: true,
        showVoteCount: false
      },
      className: "max-w-md mx-auto"
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Mobile-optimized FAQ with compact spacing and streamlined interface for small screens.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto border rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
};