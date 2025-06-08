import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { FAQBlock } from "./faq";
import type { FAQDef } from "../../../types/components/faq";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta: Meta<typeof FAQBlock> = {
  title: "Blocks/FAQ",
  component: FAQBlock,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Comprehensive FAQ component with multiple variants including accordion, grid cards, two-column, categorized, and search. Features voting system, category filtering, search functionality, and contact support CTA.",
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
    answer:
      "React Jedi is a server-driven UI library that enables developers to build modern React interfaces using JSON specifications. It provides a single render() function that transforms JSON schemas into fully functional React components.",
    category: "general",
    tags: ["react", "json", "ui"],
    isPopular: true,
    anchorId: "what-is-react-jedi",
    relatedArticles: [
      { title: "Getting Started Guide", href: "/docs/getting-started" },
      { title: "Component Overview", href: "/docs/components" },
    ],
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
    anchorId: "installation",
  },
  {
    id: "3",
    question: "What components are available?",
    answer:
      "React Jedi includes over 50+ components covering layout (Box, Grid, Flex), typography (Text, Heading), UI elements (Button, Card, Badge), forms (Input, Select, Checkbox), and advanced blocks (Header, Footer, Carousel, FAQ).",
    category: "general",
    tags: ["components", "ui", "blocks"],
    anchorId: "available-components",
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
      { title: "Tailwind Integration", href: "/docs/tailwind" },
    ],
  },
  {
    id: "5",
    question: "Can I use TypeScript with React Jedi?",
    answer:
      "Yes! React Jedi is built with TypeScript and provides full type safety. All component specifications have proper TypeScript interfaces, and the render function is fully typed to catch errors at compile time.",
    category: "typescript",
    tags: ["typescript", "types", "safety"],
    isPopular: true,
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
    tags: ["events", "handlers", "interactions"],
  },
  {
    id: "7",
    question: "Is React Jedi production ready?",
    answer:
      "Yes, React Jedi is production ready and actively maintained. It includes comprehensive testing, accessibility features, performance optimizations, and is used by companies worldwide for building scalable applications.",
    category: "general",
    tags: ["production", "stability", "maintenance"],
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
    tags: ["contribute", "github", "community"],
  },
];

const sampleCategories = [
  { id: "general", name: "General", description: "General questions about React Jedi", count: 3 },
  {
    id: "installation",
    name: "Installation",
    description: "Setup and installation help",
    count: 1,
  },
  { id: "styling", name: "Styling", description: "Customization and theming", count: 1 },
  { id: "typescript", name: "TypeScript", description: "TypeScript integration", count: 1 },
  { id: "events", name: "Events", description: "Event handling and interactions", count: 1 },
  { id: "contributing", name: "Contributing", description: "How to contribute", count: 1 },
];

// Default Carousel FAQ
export const Default: Story = enhanceStoryForDualMode<typeof FAQBlock>(
  {
    args: {
      spec: {
        type: "FAQ",
        variant: "carousel",
        items: sampleFAQs,
        animated: true,
        showSearch: false,
        showCategories: false,
        voting: {
          enabled: true,
          showVoteCount: true,
        },
        contactSupport: {
          enabled: true,
          title: "Still have questions?",
          description: "Our support team is here to help you 24/7",
          buttonText: "Contact Support",
        },
      } as FAQDef,
    },
    parameters: {
      docs: {
        description: {
          story:
            "Modern carousel-style FAQ with smooth animations and navigation. Navigate through questions using previous/next buttons or the progress indicators.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test FAQ header renders
      expect(canvas.getByText("Frequently Asked Questions")).toBeInTheDocument();
      expect(canvas.getByText("Find answers to common questions about our products and services")).toBeInTheDocument();
      
      // Test first FAQ item renders (carousel shows one at a time)
      expect(canvas.getByText("What is React Jedi?")).toBeInTheDocument();
      
      // Test navigation buttons render
      expect(canvas.getByRole("button", { name: "Previous" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Next" })).toBeInTheDocument();
      
      // Test expand/collapse button
      const expandButtons = canvas.getAllByRole("button").filter(btn => {
        return btn.querySelector('svg');
      });
      expect(expandButtons.length).toBeGreaterThan(0);
      
      // Test contact support section
      expect(canvas.getByText("Still have questions?")).toBeInTheDocument();
      expect(canvas.getByText("Our support team is here to help you 24/7")).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Contact Support" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "FAQ",
      variant: "carousel",
      items: sampleFAQs,
      animated: true,
      showSearch: false,
      showCategories: false,
      voting: {
        enabled: true,
        showVoteCount: true,
      },
      contactSupport: {
        enabled: true,
        title: "Still have questions?",
        description: "Our support team is here to help you 24/7",
        buttonText: "Contact Support",
      },
    },
  }
) as Story;

// Carousel with Search
export const CarouselWithSearch: Story = enhanceStoryForDualMode<typeof FAQBlock>(
  {
    args: {
      spec: {
        type: "FAQ",
        variant: "carousel",
        items: sampleFAQs,
        animated: true,
        showSearch: true,
        showCategories: true,
        search: {
          enabled: true,
          placeholder: "Search questions...",
          searchInAnswers: true,
        },
        categories: sampleCategories,
        voting: {
          enabled: true,
          showVoteCount: true,
        },
      } as FAQDef,
    },
    parameters: {
      docs: {
        description: {
          story:
            "Carousel FAQ with search functionality and category filters for better navigation through large FAQ sets.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test FAQ header renders
      expect(canvas.getByText("Frequently Asked Questions")).toBeInTheDocument();
      
      // Test search input renders
      expect(canvas.getByPlaceholderText("Search questions...")).toBeInTheDocument();
      
      // Test category filters render
      expect(canvas.getByRole("button", { name: "All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: /General/i })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: /Installation/i })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: /Styling/i })).toBeInTheDocument();
      
      // Test first FAQ item renders
      expect(canvas.getByText("What is React Jedi?")).toBeInTheDocument();
      
      // Test navigation buttons
      expect(canvas.getByRole("button", { name: "Previous" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Next" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "FAQ",
      variant: "carousel",
      items: sampleFAQs,
      animated: true,
      showSearch: true,
      showCategories: true,
      search: {
        enabled: true,
        placeholder: "Search questions...",
        searchInAnswers: true,
      },
      categories: sampleCategories,
      voting: {
        enabled: true,
        showVoteCount: true,
      },
    },
  }
) as Story;

// Basic Accordion FAQ
export const Accordion: Story = enhanceStoryForDualMode<typeof FAQBlock>(
  {
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
          showVoteCount: true,
        },
      } as FAQDef,
    },
    parameters: {
      docs: {
        description: {
          story:
            "Basic accordion-style FAQ with collapsible items, voting system, and smooth animations.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test FAQ header renders
      expect(canvas.getByText("Frequently Asked Questions")).toBeInTheDocument();
      
      // Test all accordion items render
      expect(canvas.getByText("What is React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("How do I install React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("What components are available?")).toBeInTheDocument();
      expect(canvas.getByText("How do I customize component styles?")).toBeInTheDocument();
      expect(canvas.getByText("Can I use TypeScript with React Jedi?")).toBeInTheDocument();
      
      // Test that first item is expanded (openFirst: true)
      expect(canvas.getByText(/React Jedi is a server-driven UI library/)).toBeInTheDocument();
      
      // Test voting buttons are present in expanded item
      expect(canvas.getByLabelText("thumbs up")).toBeInTheDocument();
      expect(canvas.getByLabelText("thumbs down")).toBeInTheDocument();
      expect(canvas.getByText("Was this helpful?")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "FAQ",
      variant: "accordion",
      items: sampleFAQs.slice(0, 5),
      openFirst: true,
      allowCollapse: true,
      animated: true,
      voting: {
        enabled: true,
        showVoteCount: true,
      },
    },
  }
) as Story;

// Grid Cards Variant
export const GridCards: Story = enhanceStoryForDualMode<typeof FAQBlock>(
  {
    args: {
      spec: {
        type: "FAQ",
        variant: "grid",
        items: sampleFAQs.slice(0, 6),
        columns: 2,
        animated: true,
        voting: {
          enabled: true,
          showVoteCount: false,
        },
      } as FAQDef,
    },
    parameters: {
      docs: {
        description: {
          story:
            "Grid layout with FAQ items displayed as modern expandable cards, perfect for showcasing featured questions. Click on questions to expand answers.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test FAQ header renders
      expect(canvas.getByText("Frequently Asked Questions")).toBeInTheDocument();
      
      // Test grid items render
      expect(canvas.getByText("What is React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("How do I install React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("What components are available?")).toBeInTheDocument();
      expect(canvas.getByText("How do I customize component styles?")).toBeInTheDocument();
      expect(canvas.getByText("Can I use TypeScript with React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("How do I handle events and interactions?")).toBeInTheDocument();
      
      // Test that answers are visible (grid variant shows expanded by default)
      expect(canvas.getByText(/React Jedi is a server-driven UI library/)).toBeInTheDocument();
      
      // Test popular badges
      const popularBadges = canvas.getAllByText("Popular");
      expect(popularBadges.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "FAQ",
      variant: "grid",
      items: sampleFAQs.slice(0, 6),
      columns: 2,
      animated: true,
      voting: {
        enabled: true,
        showVoteCount: false,
      },
    },
  }
) as Story;

// Two-Column Layout
export const TwoColumn: Story = enhanceStoryForDualMode<typeof FAQBlock>(
  {
    args: {
      spec: {
        type: "FAQ",
        variant: "two-column",
        items: sampleFAQs.slice(0, 6),
        animated: true,
        spacing: "relaxed",
        voting: {
          enabled: true,
        },
      } as FAQDef,
    },
    parameters: {
      docs: {
        description: {
          story:
            "Two-column layout that distributes FAQ items evenly across both columns for better readability.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test FAQ header renders
      expect(canvas.getByText("Frequently Asked Questions")).toBeInTheDocument();
      
      // Test all FAQ items render
      expect(canvas.getByText("What is React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("How do I install React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("What components are available?")).toBeInTheDocument();
      expect(canvas.getByText("How do I customize component styles?")).toBeInTheDocument();
      expect(canvas.getByText("Can I use TypeScript with React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("How do I handle events and interactions?")).toBeInTheDocument();
      
      // Test answers are visible
      expect(canvas.getByText(/React Jedi is a server-driven UI library/)).toBeInTheDocument();
      
      // Test voting section is present
      const helpfulTexts = canvas.getAllByText("Was this helpful?");
      expect(helpfulTexts.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "FAQ",
      variant: "two-column",
      items: sampleFAQs.slice(0, 6),
      animated: true,
      spacing: "relaxed",
      voting: {
        enabled: true,
      },
    },
  }
) as Story;

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
        showVoteCount: true,
      },
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "FAQ with category filtering, showing popular items first and category-based organization.",
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
        highlightMatches: true,
      },
      voting: {
        enabled: true,
      },
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "FAQ with search functionality that searches both questions and answers with match highlighting.",
      },
    },
  },
};

// Complete FAQ with All Features
export const Complete: Story = enhanceStoryForDualMode<typeof FAQBlock>(
  {
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
          highlightMatches: true,
        },
        voting: {
          enabled: true,
          showVoteCount: true,
          requireAuth: false,
        },
        contactSupport: {
          enabled: true,
          title: "Still need help?",
          description: "Can't find what you're looking for? Our support team is here to help.",
          buttonText: "Contact Support",
          href: "/contact",
        },
      } as FAQDef,
    },
    parameters: {
      docs: {
        description: {
          story:
            "Complete FAQ with all features enabled: search, categories, voting, contact support, and animations.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test FAQ header renders
      expect(canvas.getByText("Frequently Asked Questions")).toBeInTheDocument();
      
      // Test search input renders
      expect(canvas.getByPlaceholderText("Search our knowledge base...")).toBeInTheDocument();
      
      // Test category filters render
      expect(canvas.getByRole("button", { name: "All" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: /General/i })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: /Installation/i })).toBeInTheDocument();
      
      // Test FAQ items render (popular ones should be first)
      expect(canvas.getByText("What is React Jedi?")).toBeInTheDocument();
      
      // Test contact support section
      expect(canvas.getByText("Still need help?")).toBeInTheDocument();
      expect(canvas.getByText("Can't find what you're looking for? Our support team is here to help.")).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Contact Support" })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
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
        highlightMatches: true,
      },
      voting: {
        enabled: true,
        showVoteCount: true,
        requireAuth: false,
      },
      contactSupport: {
        enabled: true,
        title: "Still need help?",
        description: "Can't find what you're looking for? Our support team is here to help.",
        buttonText: "Contact Support",
        href: "/contact",
      },
    },
  }
) as Story;

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
        enabled: false,
      },
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Three-column grid layout with compact spacing and limited item count for overview sections.",
      },
    },
  },
};

// Minimal FAQ
export const Minimal: Story = enhanceStoryForDualMode<typeof FAQBlock>(
  {
    args: {
      spec: {
        type: "FAQ",
        variant: "accordion",
        items: sampleFAQs.slice(0, 4),
        animated: false,
        allowCollapse: false,
        spacing: "compact",
        voting: {
          enabled: false,
        },
      } as FAQDef,
    },
    parameters: {
      docs: {
        description: {
          story:
            "Minimal FAQ without animations, voting, or collapsing for simple informational display.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test FAQ header renders
      expect(canvas.getByText("Frequently Asked Questions")).toBeInTheDocument();
      
      // Test accordion items render
      expect(canvas.getByText("What is React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("How do I install React Jedi?")).toBeInTheDocument();
      expect(canvas.getByText("What components are available?")).toBeInTheDocument();
      expect(canvas.getByText("How do I customize component styles?")).toBeInTheDocument();
      
      // Test no voting section (voting disabled)
      expect(canvas.queryByText("Was this helpful?")).not.toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "FAQ",
      variant: "accordion",
      items: sampleFAQs.slice(0, 4),
      animated: false,
      allowCollapse: false,
      spacing: "compact",
      voting: {
        enabled: false,
      },
    },
  }
) as Story;

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
        href: "/support",
      },
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
      items: sampleFAQs.filter((item) => item.isPopular),
      showPopularFirst: true,
      openFirst: true,
      animated: true,
      voting: {
        enabled: true,
        showVoteCount: true,
      },
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Display only popular/featured FAQ items for highlighting the most important questions.",
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
        placeholder: "Search FAQs...",
      },
      voting: {
        enabled: true,
        showVoteCount: false,
      },
      className: "max-w-md mx-auto",
    } as FAQDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mobile-optimized FAQ with compact spacing and streamlined interface for small screens.",
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
