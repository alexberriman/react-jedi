import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../../components/ui/code-block";

export function TimelineShowcase() {
  usePageMetadata({
    title: "Timeline Block",
    description:
      "A versatile Timeline component for displaying chronological events, milestones, and roadmaps. Supports multiple layout variants, animations, and rich content.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Timeline" },
    { id: "variants", label: "Timeline Variants" },
    { id: "line-styles", label: "Line Styles" },
    { id: "milestones", label: "Milestones & Badges" },
    { id: "with-icons", label: "With Icons" },
    { id: "with-images", label: "With Images" },
    { id: "custom-content", label: "Custom Content" },
    { id: "animations", label: "Animations" },
    { id: "examples", label: "Complete Examples" },
    { id: "props", label: "Props & Options" },
  ];

  // Basic timeline data
  const basicTimelineSpec: UISpecification = {
    type: "Timeline",
    items: [
      {
        id: "1",
        date: "January 2024",
        title: "Project Started",
        description: "Initial planning and requirements gathering",
      },
      {
        id: "2",
        date: "February 2024",
        title: "Design Phase",
        description: "UI/UX design and prototyping",
      },
      {
        id: "3",
        date: "March 2024",
        title: "Development",
        description: "Core features implementation",
      },
      {
        id: "4",
        date: "April 2024",
        title: "Launch",
        description: "Product release to market",
      },
    ],
  };

  // Timeline variants
  const variantsSpec: UISpecification = {
    type: "Stack",
    spacing: "12",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h3",
            className: "mb-4",
            children: "Vertical Centered (Default)",
          },
          {
            type: "Timeline",
            variant: "vertical-centered",
            items: [
              {
                id: "1",
                date: "2023 Q1",
                title: "Foundation",
                description: "Establishing core infrastructure",
                isPast: true,
              },
              {
                id: "2",
                date: "2023 Q2",
                title: "Growth Phase",
                description: "Scaling operations and team",
                isPast: true,
              },
              {
                id: "3",
                date: "2023 Q3",
                title: "Expansion",
                description: "New markets and products",
                isMilestone: true,
              },
              {
                id: "4",
                date: "2023 Q4",
                title: "Future Plans",
                description: "Strategic initiatives",
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h3",
            className: "mb-4",
            children: "Vertical Alternating",
          },
          {
            type: "Timeline",
            variant: "vertical-alternating",
            items: [
              {
                id: "1",
                date: "Week 1",
                title: "Research",
                description: "Market analysis and user interviews",
                isPast: true,
              },
              {
                id: "2",
                date: "Week 2-3",
                title: "Ideation",
                description: "Brainstorming and concept development",
                isPast: true,
              },
              {
                id: "3",
                date: "Week 4-6",
                title: "Prototyping",
                description: "Building and testing prototypes",
              },
              {
                id: "4",
                date: "Week 7-8",
                title: "Refinement",
                description: "Iterating based on feedback",
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h3",
            className: "mb-4",
            children: "Horizontal (Desktop Only)",
          },
          {
            type: "Timeline",
            variant: "horizontal",
            items: [
              {
                id: "1",
                date: "Step 1",
                title: "Sign Up",
                description: "Create your account",
                isPast: true,
              },
              {
                id: "2",
                date: "Step 2",
                title: "Verify",
                description: "Confirm your email",
                isPast: true,
              },
              {
                id: "3",
                date: "Step 3",
                title: "Setup",
                description: "Configure your profile",
              },
              {
                id: "4",
                date: "Step 4",
                title: "Launch",
                description: "Start using the platform",
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h3",
            className: "mb-4",
            children: "Minimal Style",
          },
          {
            type: "Timeline",
            variant: "minimal",
            items: [
              {
                id: "1",
                date: "10:00 AM",
                title: "Morning Standup",
                isPast: true,
              },
              {
                id: "2",
                date: "11:30 AM",
                title: "Design Review",
                description: "Review new mockups with the team",
                isPast: true,
              },
              {
                id: "3",
                date: "2:00 PM",
                title: "Client Meeting",
                description: "Project progress update",
              },
              {
                id: "4",
                date: "4:00 PM",
                title: "Code Review",
              },
            ],
          },
        ],
      },
    ],
  };

  // Line styles example
  const lineStylesSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h3",
            className: "mb-4",
            children: "Solid Line (Default)",
          },
          {
            type: "Timeline",
            lineStyle: "solid",
            items: [
              { id: "1", date: "Step 1", title: "Research Phase", isPast: true },
              { id: "2", date: "Step 2", title: "Planning Phase", isPast: true },
              { id: "3", date: "Step 3", title: "Execution Phase" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h3",
            className: "mb-4",
            children: "Dashed Line",
          },
          {
            type: "Timeline",
            lineStyle: "dashed",
            items: [
              { id: "1", date: "Phase 1", title: "Discovery", isPast: true },
              { id: "2", date: "Phase 2", title: "Development" },
              { id: "3", date: "Phase 3", title: "Deployment" },
            ],
          },
        ],
      },
    ],
  };

  // Milestones and badges
  const milestonesSpec: UISpecification = {
    type: "Timeline",
    variant: "vertical-alternating",
    items: [
      {
        id: "1",
        date: "January 2023",
        title: "Company Founded",
        description: "Started with a small team of 3 founders",
        isMilestone: true,
        isPast: true,
        badge: "Beginning",
      },
      {
        id: "2",
        date: "March 2023",
        title: "First Customer",
        description: "Onboarded our first paying customer",
        isPast: true,
        badge: "Achievement",
      },
      {
        id: "3",
        date: "June 2023",
        title: "Series A Funding",
        description: "Raised $10M to accelerate growth",
        isMilestone: true,
        isPast: true,
        badge: "Milestone",
      },
      {
        id: "4",
        date: "September 2023",
        title: "Team Expansion",
        description: "Grew from 3 to 25 employees",
        isPast: true,
      },
      {
        id: "5",
        date: "December 2023",
        title: "Product Launch 2.0",
        description: "Major product update with new features",
        isMilestone: true,
        badge: "Current",
      },
      {
        id: "6",
        date: "Q2 2024",
        title: "International Expansion",
        description: "Planning to enter European markets",
        badge: "Upcoming",
      },
    ],
  };

  // With icons example (requires icons to be provided as strings for JSON spec)
  const withIconsSpec: UISpecification = {
    type: "Timeline",
    variant: "vertical-centered",
    items: [
      {
        id: "1",
        date: "Phase 1",
        title: "Planning",
        description: "Define project scope and objectives",
        icon: "📋",
        isPast: true,
      },
      {
        id: "2",
        date: "Phase 2",
        title: "Design",
        description: "Create wireframes and prototypes",
        icon: "🎨",
        isPast: true,
      },
      {
        id: "3",
        date: "Phase 3",
        title: "Development",
        description: "Build the product features",
        icon: "💻",
        isMilestone: true,
      },
      {
        id: "4",
        date: "Phase 4",
        title: "Testing",
        description: "QA and user testing",
        icon: "🧪",
      },
      {
        id: "5",
        date: "Phase 5",
        title: "Launch",
        description: "Deploy to production",
        icon: "🚀",
      },
    ],
  };

  // With images example
  const withImagesSpec: UISpecification = {
    type: "Timeline",
    variant: "with-images",
    items: [
      {
        id: "1",
        date: "Q1 2023",
        title: "Project Kickoff",
        description: "Team assembled and initial planning completed. Set ambitious goals for the year.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format",
        isPast: true,
      },
      {
        id: "2",
        date: "Q2 2023",
        title: "First Prototype",
        description: "Successfully built and tested our MVP with early users. Received positive feedback.",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format",
        isPast: true,
        isMilestone: true,
        badge: "Milestone",
      },
      {
        id: "3",
        date: "Q3 2023",
        title: "Beta Launch",
        description: "Opened beta access to 500 users. Gathering feedback and iterating rapidly.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format",
      },
      {
        id: "4",
        date: "Q4 2023",
        title: "Public Release",
        description: "Full product launch planned with marketing campaign and PR strategy.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format",
      },
    ],
  };

  // Custom content example
  const customContentSpec: UISpecification = {
    type: "Timeline",
    variant: "vertical-centered",
    items: [
      {
        id: "1",
        date: "January 2024",
        title: "Feature Release v2.0",
        description: "Major update with performance improvements",
        isPast: true,
        content: {
          type: "Stack",
          spacing: "3",
          className: "mt-4",
          children: [
            {
              type: "Text",
              variant: "small",
              weight: "medium",
              children: "Key Features:",
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "Text", variant: "small", children: "• 50% faster load times" },
                { type: "Text", variant: "small", children: "• New dashboard UI" },
                { type: "Text", variant: "small", children: "• Advanced analytics" },
              ],
            },
            {
              type: "Flex",
              gap: "2",
              className: "mt-3",
              children: [
                { type: "Badge", children: "Performance" },
                { type: "Badge", children: "UI/UX" },
                { type: "Badge", variant: "secondary", children: "Analytics" },
              ],
            },
          ],
        },
      },
      {
        id: "2",
        date: "February 2024",
        title: "Security Update",
        description: "Enhanced security protocols and compliance",
        isMilestone: true,
        content: {
          type: "Card",
          className: "mt-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  variant: "small",
                  weight: "medium",
                  children: "Security Enhancements",
                },
                {
                  type: "Stack",
                  spacing: "4",
                  className: "mt-3",
                  children: [
                    {
                      type: "Flex",
                      justify: "between",
                      children: [
                        { type: "Text", variant: "small", children: "Encryption" },
                        { type: "Text", variant: "small", weight: "medium", children: "AES-256" },
                      ],
                    },
                    {
                      type: "Flex",
                      justify: "between",
                      children: [
                        { type: "Text", variant: "small", children: "Compliance" },
                        { type: "Text", variant: "small", weight: "medium", children: "SOC 2 Type II" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: "3",
        date: "March 2024",
        title: "Partnership Announcement",
        description: "Strategic partnership to expand capabilities",
        badge: "New",
        content: {
          type: "Box",
          className: "mt-4",
          children: [
            {
              type: "Button",
              size: "sm",
              children: "Read Press Release",
            },
          ],
        },
      },
    ],
  };

  // Animation toggle example
  const animationSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h3",
            className: "mb-4",
            children: "With Animation (Default)",
          },
          {
            type: "Timeline",
            animated: true,
            items: [
              { id: "1", date: "Step 1", title: "This timeline animates on scroll", isPast: true },
              { id: "2", date: "Step 2", title: "Items fade in sequentially", isPast: true },
              { id: "3", date: "Step 3", title: "Creating smooth visual flow" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h3",
            className: "mb-4",
            children: "Without Animation",
          },
          {
            type: "Timeline",
            animated: false,
            items: [
              { id: "1", date: "Step 1", title: "This timeline appears immediately", isPast: true },
              { id: "2", date: "Step 2", title: "No scroll-triggered animations", isPast: true },
              { id: "3", date: "Step 3", title: "Better for performance-sensitive contexts" },
            ],
          },
        ],
      },
    ],
  };

  // Complete example - Company History
  const companyHistorySpec: UISpecification = {
    type: "Box",
    className: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl",
    children: [
      {
        type: "Heading",
        level: "h2",
        className: "text-center mb-8",
        children: "Our Journey",
      },
      {
        type: "Timeline",
        variant: "vertical-alternating",
        animated: true,
        items: [
          {
            id: "1",
            date: "2019",
            title: "The Beginning",
            description: "Started in a garage with a big dream",
            icon: "🚀",
            isMilestone: true,
            isPast: true,
            badge: "Founded",
          },
          {
            id: "2",
            date: "2020",
            title: "First Product Launch",
            description: "Released our flagship product to market",
            icon: "📦",
            isPast: true,
          },
          {
            id: "3",
            date: "2021",
            title: "Series A Funding",
            description: "Raised $10M to scale operations",
            icon: "💰",
            isMilestone: true,
            isPast: true,
            badge: "Funded",
          },
          {
            id: "4",
            date: "2022",
            title: "Global Expansion",
            description: "Opened offices in 5 countries",
            icon: "🌍",
            isPast: true,
          },
          {
            id: "5",
            date: "2023",
            title: "100K Users Milestone",
            description: "Reached 100,000 active users worldwide",
            icon: "🎉",
            isMilestone: true,
            isPast: true,
            badge: "Achievement",
          },
          {
            id: "6",
            date: "2024",
            title: "AI Integration",
            description: "Launching AI-powered features",
            icon: "🤖",
            badge: "Current",
          },
          {
            id: "7",
            date: "2025",
            title: "IPO Plans",
            description: "Preparing for public offering",
            icon: "📈",
            badge: "Future",
          },
        ],
      },
    ],
  };

  // Product roadmap example
  const productRoadmapSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "Product Roadmap 2024",
              },
              {
                type: "CardDescription",
                children: "Our planned features and improvements for this year",
              },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Timeline",
              variant: "vertical-centered",
              lineStyle: "dashed",
              items: [
                {
                  id: "1",
                  date: "Q1 2024",
                  title: "Performance Optimization",
                  description: "Core engine improvements for 2x faster processing",
                  icon: "⚡",
                  isPast: true,
                  badge: "Completed",
                },
                {
                  id: "2",
                  date: "Q2 2024",
                  title: "Mobile App Launch",
                  description: "Native iOS and Android applications",
                  icon: "📱",
                  isPast: true,
                  badge: "In Progress",
                },
                {
                  id: "3",
                  date: "Q3 2024",
                  title: "Enterprise Features",
                  description: "SSO, audit logs, and advanced permissions",
                  icon: "🏢",
                  isMilestone: true,
                  badge: "Planned",
                },
                {
                  id: "4",
                  date: "Q4 2024",
                  title: "AI Assistant",
                  description: "Smart recommendations and automation",
                  icon: "🤖",
                  badge: "Planned",
                },
              ],
            },
          },
        ],
      },
    ],
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex">
      {/* Table of Contents - Fixed Sidebar */}
      <aside className="w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 p-6">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">On this page</h3>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/showcase/blocks"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
          >
            ← Back to Blocks
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Timeline Block</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile Timeline component for displaying chronological events, milestones, and roadmaps. Perfect for showing company history, project progress, product roadmaps, or any sequence of events over time.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Timeline block provides a visually appealing way to display chronological information. It supports multiple layout variants, custom content, rich media, and smooth animations to create engaging timeline experiences.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Five layout variants: vertical-centered, vertical-alternating, horizontal, minimal, and with-images</li>
                <li>Support for milestones and badges to highlight important events</li>
                <li>Custom icons and images for visual enhancement</li>
                <li>Rich content support with custom React components</li>
                <li>Scroll-triggered animations with Framer Motion</li>
                <li>Past/future event styling differentiation</li>
                <li>Solid and dashed line styles</li>
                <li>Fully responsive with mobile-optimized layouts</li>
                <li>Accessible with proper semantic markup</li>
              </ul>
            </div>
          </section>

          {/* Basic Timeline Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Timeline</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple timeline with dates, titles, and descriptions.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicTimelineSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicTimelineSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Timeline Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from multiple layout variants to best suit your content and design needs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(variantsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(variantsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Line Styles Section */}
          <section id="line-styles" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Line Styles</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the connecting line between timeline items.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(lineStylesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(lineStylesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Milestones Section */}
          <section id="milestones" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Milestones & Badges</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Highlight important events with milestones and add contextual badges.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(milestonesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(milestonesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add visual interest with custom icons for each timeline item.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(withIconsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(withIconsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Images Section */}
          <section id="with-images" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Images</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create rich timelines with images for each event.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(withImagesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(withImagesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Custom Content Section */}
          <section id="custom-content" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add rich custom content to timeline items using nested components.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(customContentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(customContentSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Animations Section */}
          <section id="animations" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Animations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control scroll-triggered animations for smooth visual effects.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(animationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(animationSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing Timeline components in context.
            </p>
            
            <div className="space-y-8">
              {/* Company History Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Company History</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(companyHistorySpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                    {JSON.stringify(companyHistorySpec, null, 2)}
                  </CodeBlock>
                </details>
              </div>

              {/* Product Roadmap Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Product Roadmap</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(productRoadmapSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                    {JSON.stringify(productRoadmapSpec, null, 2)}
                  </CodeBlock>
                </details>
              </div>
            </div>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium">Prop</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Default</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">type</td>
                    <td className="py-3 px-4 font-mono">&quot;Timeline&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">items</td>
                    <td className="py-3 px-4 font-mono">TimelineItem[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Array of timeline items to display</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td className="py-3 px-4 font-mono">&quot;vertical-centered&quot; | &quot;vertical-alternating&quot; | &quot;horizontal&quot; | &quot;minimal&quot; | &quot;with-images&quot;</td>
                    <td className="py-3 px-4">&quot;vertical-centered&quot;</td>
                    <td className="py-3 px-4">Layout variant of the timeline</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">lineStyle</td>
                    <td className="py-3 px-4 font-mono">&quot;solid&quot; | &quot;dashed&quot;</td>
                    <td className="py-3 px-4">&quot;solid&quot;</td>
                    <td className="py-3 px-4">Style of the connecting line</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">animated</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Enable scroll-triggered animations</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-3">TimelineItem Properties</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium">Property</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Required</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">id</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">Yes</td>
                    <td className="py-3 px-4">Unique identifier for the item</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">date</td>
                    <td className="py-3 px-4 font-mono">string | Date</td>
                    <td className="py-3 px-4">Yes</td>
                    <td className="py-3 px-4">Date or time label for the event</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">title</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">Yes</td>
                    <td className="py-3 px-4">Main title of the timeline event</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">No</td>
                    <td className="py-3 px-4">Additional description text</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">icon</td>
                    <td className="py-3 px-4 font-mono">string | ReactNode</td>
                    <td className="py-3 px-4">No</td>
                    <td className="py-3 px-4">Icon to display in the timeline marker</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">image</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">No</td>
                    <td className="py-3 px-4">Image URL (for with-images variant)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">isMilestone</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">No</td>
                    <td className="py-3 px-4">Highlight as a milestone event</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">isPast</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">No</td>
                    <td className="py-3 px-4">Style as a past event</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">badge</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">No</td>
                    <td className="py-3 px-4">Badge text to display</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">content</td>
                    <td className="py-3 px-4 font-mono">ReactNode | UISpecification</td>
                    <td className="py-3 px-4">No</td>
                    <td className="py-3 px-4">Custom content to render</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <Link
                to="/showcase/blocks"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                ← Back to Component Blocks
              </Link>
              <Link
                to="/documentation/ui-components"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                View Documentation →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}