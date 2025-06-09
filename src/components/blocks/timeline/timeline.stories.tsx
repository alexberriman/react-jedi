import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline } from "./timeline";
import {
  FiBriefcase,
  FiCheckCircle,
  FiCode,
  FiGlobe,
  FiPackage,
  FiPlay,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
  FiAward,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import { expect, within } from "storybook/test";

const meta = {
  title: "Blocks/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile Timeline component for displaying chronological events, milestones, and roadmaps. Supports multiple layout variants, animations, and rich content.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "vertical-centered",
        "vertical-alternating",
        "horizontal",
        "minimal",
        "with-images",
      ],
      description: "Visual style variant of the timeline",
    },
    lineStyle: {
      control: "radio",
      options: ["solid", "dashed"],
      description: "Style of the connecting line",
    },
    animated: {
      control: "boolean",
      description: "Enable scroll-triggered animations",
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const companyHistoryData = [
  {
    id: "1",
    date: new Date("2019-03-15"),
    title: "Company Founded",
    description: "Started with a vision to revolutionize the industry",
    icon: <FiPlay className="h-4 w-4" />,
    isMilestone: true,
    isPast: true,
    badge: "Beginning",
  },
  {
    id: "2",
    date: new Date("2019-09-01"),
    title: "First Product Launch",
    description: "Released our flagship product to early adopters",
    icon: <FiPackage className="h-4 w-4" />,
    isPast: true,
  },
  {
    id: "3",
    date: new Date("2020-06-10"),
    title: "Series A Funding",
    description: "Secured $10M in funding to accelerate growth",
    icon: <FiTrendingUp className="h-4 w-4" />,
    isMilestone: true,
    isPast: true,
    badge: "Milestone",
  },
  {
    id: "4",
    date: new Date("2021-01-15"),
    title: "Team Expansion",
    description: "Grew from 5 to 50 employees across 3 offices",
    icon: <FiUsers className="h-4 w-4" />,
    isPast: true,
  },
  {
    id: "5",
    date: new Date("2022-03-20"),
    title: "Global Launch",
    description: "Expanded operations to 15 countries worldwide",
    icon: <FiGlobe className="h-4 w-4" />,
    isPast: true,
  },
  {
    id: "6",
    date: new Date("2023-11-01"),
    title: "Award Recognition",
    description: "Named 'Startup of the Year' by Tech Magazine",
    icon: <FiAward className="h-4 w-4" />,
    isMilestone: true,
    isPast: true,
    badge: "Achievement",
  },
];

const productRoadmapData = [
  {
    id: "1",
    date: "Q1 2024",
    title: "AI Integration",
    description: "Implement advanced AI features for better user experience",
    icon: <FiZap className="h-4 w-4" />,
    isPast: true,
    badge: "Completed",
  },
  {
    id: "2",
    date: "Q2 2024",
    title: "Mobile App Launch",
    description: "Native iOS and Android applications",
    icon: <FiCheckCircle className="h-4 w-4" />,
    isPast: true,
    badge: "Completed",
  },
  {
    id: "3",
    date: "Q3 2024",
    title: "Enterprise Features",
    description: "Advanced security, SSO, and admin controls",
    icon: <FiBriefcase className="h-4 w-4" />,
    isMilestone: true,
    badge: "In Progress",
  },
  {
    id: "4",
    date: "Q4 2024",
    title: "API v2.0",
    description: "Complete API redesign with GraphQL support",
    icon: <FiCode className="h-4 w-4" />,
    badge: "Planned",
  },
  {
    id: "5",
    date: "Q1 2025",
    title: "Analytics Dashboard",
    description: "Real-time insights and reporting capabilities",
    icon: <FiTarget className="h-4 w-4" />,
    badge: "Planned",
  },
  {
    id: "6",
    date: "Q2 2025",
    title: "Global Infrastructure",
    description: "Multi-region deployment for improved performance",
    icon: <FiGlobe className="h-4 w-4" />,
    isMilestone: true,
    badge: "Future",
  },
];

const projectTimelineWithImages = [
  {
    id: "1",
    date: new Date("2023-01-15"),
    title: "Project Kickoff",
    description: "Initial planning and requirements gathering phase completed",
    image: "https://placehold.co/800x450/EEE/31343C",
    icon: <FiStar className="h-4 w-4" />,
    isPast: true,
  },
  {
    id: "2",
    date: new Date("2023-03-20"),
    title: "Design Phase Complete",
    description: "UI/UX designs approved and development resources allocated",
    image: "https://placehold.co/800x450/EEE/31343C",
    icon: <FiCheckCircle className="h-4 w-4" />,
    isPast: true,
  },
  {
    id: "3",
    date: new Date("2023-06-01"),
    title: "Beta Launch",
    description: "Successful beta launch with 500+ early adopters",
    image: "https://placehold.co/800x450/EEE/31343C",
    icon: <FiPlay className="h-4 w-4" />,
    isMilestone: true,
    isPast: true,
    badge: "Milestone",
  },
  {
    id: "4",
    date: new Date("2023-09-15"),
    title: "Production Release",
    description: "Full production release with enhanced features based on beta feedback",
    image: "https://placehold.co/800x450/EEE/31343C",
    icon: <FiGlobe className="h-4 w-4" />,
    isPast: true,
  },
];

const careerProgressionData = [
  {
    id: "1",
    date: "2018",
    title: "Junior Developer",
    description: "Started career in web development",
    isPast: true,
  },
  {
    id: "2",
    date: "2020",
    title: "Senior Developer",
    description: "Promoted to senior role, led team of 3",
    isPast: true,
  },
  {
    id: "3",
    date: "2022",
    title: "Tech Lead",
    description: "Architected major platform redesign",
    isMilestone: true,
    isPast: true,
  },
  {
    id: "4",
    date: "2024",
    title: "Engineering Manager",
    description: "Currently managing 15+ engineers",
    badge: "Current",
  },
];

export const VerticalCentered = enhanceStoryForDualMode<typeof Timeline>(
  {
    args: {
      items: companyHistoryData,
      variant: "vertical-centered",
      lineStyle: "solid",
      animated: true,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify timeline items are present
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(companyHistoryData.length);
      
      // Verify company history data is rendered
      await expect(canvas.getByText("Company Founded")).toBeInTheDocument();
      await expect(canvas.getByText("Started with a vision to revolutionize the industry")).toBeInTheDocument();
      await expect(canvas.getByText("First Product Launch")).toBeInTheDocument();
      await expect(canvas.getByText("Series A Funding")).toBeInTheDocument();
      
      // Verify dates are formatted correctly
      await expect(canvas.getByText("Mar 15, 2019")).toBeInTheDocument();
      await expect(canvas.getByText("Sep 1, 2019")).toBeInTheDocument();
      
      // Verify badges are present
      await expect(canvas.getByText("Beginning")).toBeInTheDocument();
      await expect(canvas.getByText("Milestone")).toBeInTheDocument();
      
      // Verify icons are rendered (they should be present as SVG elements)
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: companyHistoryData.map(item => ({
        ...item,
        date: typeof item.date === "object" ? item.date.toISOString() : item.date,
        icon: item.icon ? "FiPlay" : undefined, // Icons will be mapped to string identifiers
      })),
      variant: "vertical-centered",
      lineStyle: "solid",
      animated: true,
    },
  }
);

export const VerticalAlternating = enhanceStoryForDualMode<typeof Timeline>(
  {
    args: {
      items: productRoadmapData,
      variant: "vertical-alternating",
      lineStyle: "solid",
      animated: true,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify timeline items are present
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(productRoadmapData.length);
      
      // Verify product roadmap data is rendered
      await expect(canvas.getByText("AI Integration")).toBeInTheDocument();
      await expect(canvas.getByText("Implement advanced AI features for better user experience")).toBeInTheDocument();
      await expect(canvas.getByText("Mobile App Launch")).toBeInTheDocument();
      await expect(canvas.getByText("Enterprise Features")).toBeInTheDocument();
      
      // Verify quarters are displayed
      await expect(canvas.getByText("Q1 2024")).toBeInTheDocument();
      await expect(canvas.getByText("Q2 2024")).toBeInTheDocument();
      await expect(canvas.getByText("Q3 2024")).toBeInTheDocument();
      
      // Verify status badges
      await expect(canvas.getByText("Completed")).toBeInTheDocument();
      await expect(canvas.getByText("In Progress")).toBeInTheDocument();
      await expect(canvas.getByText("Planned")).toBeInTheDocument();
      
      // Verify icons are rendered
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: productRoadmapData,
      variant: "vertical-alternating",
      lineStyle: "solid",
      animated: true,
    },
  }
);

export const Horizontal = enhanceStoryForDualMode<typeof Timeline>(
  {
    args: {
      items: productRoadmapData.slice(0, 4),
      variant: "horizontal",
      lineStyle: "solid",
      animated: true,
    },
    parameters: {
      viewport: {
        defaultViewport: "desktop",
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify timeline items are present (horizontal layout)
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(4);
      
      // Verify first 4 roadmap items are rendered
      await expect(canvas.getByText("AI Integration")).toBeInTheDocument();
      await expect(canvas.getByText("Mobile App Launch")).toBeInTheDocument();
      await expect(canvas.getByText("Enterprise Features")).toBeInTheDocument();
      await expect(canvas.getByText("API v2.0")).toBeInTheDocument();
      
      // Verify horizontal layout specific elements
      await expect(canvas.getByText("Q1 2024")).toBeInTheDocument();
      await expect(canvas.getByText("Q2 2024")).toBeInTheDocument();
      
      // Verify icons are rendered
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: productRoadmapData.slice(0, 4),
      variant: "horizontal",
      lineStyle: "solid",
      animated: true,
    },
  }
);

export const Minimal = enhanceStoryForDualMode<typeof Timeline>(
  {
    args: {
      items: careerProgressionData,
      variant: "minimal",
      animated: true,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify timeline items are present
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(careerProgressionData.length);
      
      // Verify career progression data is rendered
      await expect(canvas.getByText("Junior Developer")).toBeInTheDocument();
      await expect(canvas.getByText("Started career in web development")).toBeInTheDocument();
      await expect(canvas.getByText("Senior Developer")).toBeInTheDocument();
      await expect(canvas.getByText("Tech Lead")).toBeInTheDocument();
      await expect(canvas.getByText("Engineering Manager")).toBeInTheDocument();
      
      // Verify years are displayed
      await expect(canvas.getByText("2018")).toBeInTheDocument();
      await expect(canvas.getByText("2020")).toBeInTheDocument();
      await expect(canvas.getByText("2022")).toBeInTheDocument();
      await expect(canvas.getByText("2024")).toBeInTheDocument();
      
      // Verify current badge
      await expect(canvas.getByText("Current")).toBeInTheDocument();
      
      // Minimal variant should have dot indicators
      const dots = canvasElement.querySelectorAll(".h-2.w-2.rounded-full");
      expect(dots.length).toBe(careerProgressionData.length);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: careerProgressionData,
      variant: "minimal",
      animated: true,
    },
  }
);

export const WithImages = enhanceStoryForDualMode<typeof Timeline>(
  {
    args: {
      items: projectTimelineWithImages,
      variant: "with-images",
      animated: true,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify timeline items are present
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(projectTimelineWithImages.length);
      
      // Verify project timeline data is rendered
      await expect(canvas.getByText("Project Kickoff")).toBeInTheDocument();
      await expect(canvas.getByText("Initial planning and requirements gathering phase completed")).toBeInTheDocument();
      await expect(canvas.getByText("Design Phase Complete")).toBeInTheDocument();
      await expect(canvas.getByText("Beta Launch")).toBeInTheDocument();
      await expect(canvas.getByText("Production Release")).toBeInTheDocument();
      
      // Verify dates are formatted correctly
      await expect(canvas.getByText("Jan 15, 2023")).toBeInTheDocument();
      await expect(canvas.getByText("Mar 20, 2023")).toBeInTheDocument();
      
      // Verify milestone badge
      await expect(canvas.getByText("Milestone")).toBeInTheDocument();
      
      // Verify images are rendered
      const images = canvasElement.querySelectorAll("img");
      expect(images.length).toBe(projectTimelineWithImages.length);
      
      // Verify icons are rendered
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: projectTimelineWithImages.map(item => ({
        ...item,
        date: typeof item.date === "object" ? item.date.toISOString() : item.date,
      })),
      variant: "with-images",
      animated: true,
    },
  }
);

export const DashedLine = enhanceStoryForDualMode<typeof Timeline>(
  {
    args: {
      items: companyHistoryData,
      variant: "vertical-alternating",
      lineStyle: "dashed",
      animated: true,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify timeline items are present
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(companyHistoryData.length);
      
      // Verify company history data is rendered
      await expect(canvas.getByText("Company Founded")).toBeInTheDocument();
      await expect(canvas.getByText("Series A Funding")).toBeInTheDocument();
      
      // Verify dashed line styling is applied (should have gradient background classes)
      const gradientElements = canvasElement.querySelectorAll(".bg-gradient-to-b");
      expect(gradientElements.length).toBeGreaterThan(0);
      
      // Verify icons are rendered
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: companyHistoryData.map(item => ({
        ...item,
        date: typeof item.date === "object" ? item.date.toISOString() : item.date,
      })),
      variant: "vertical-alternating",
      lineStyle: "dashed",
      animated: true,
    },
  }
);

export const NoAnimation = enhanceStoryForDualMode<typeof Timeline>(
  {
    args: {
      items: productRoadmapData,
      variant: "vertical-centered",
      animated: false,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify timeline items are present
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(productRoadmapData.length);
      
      // Verify product roadmap data is rendered
      await expect(canvas.getByText("AI Integration")).toBeInTheDocument();
      await expect(canvas.getByText("Mobile App Launch")).toBeInTheDocument();
      
      // Verify animation is disabled - with animation disabled, there should be fewer motion elements
      // This is a basic check since the component conditionally renders motion components
      
      // Verify static rendering works correctly
      await expect(canvas.getByText("Q1 2024")).toBeInTheDocument();
      await expect(canvas.getByText("Completed")).toBeInTheDocument();
      
      // Verify icons are rendered
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: productRoadmapData,
      variant: "vertical-centered",
      animated: false,
    },
  }
);

export const WithCustomContent = enhanceStoryForDualMode<typeof Timeline>(
  {
    args: {
      items: [
        {
          id: "1",
          date: "January 2024",
          title: "Feature Release",
          description: "Major feature update with custom content",
          icon: <FiPackage className="h-4 w-4" />,
          isPast: true,
          content: (
            <div className="mt-4 space-y-3">
              <div className="flex gap-2">
                <Badge>Performance</Badge>
                <Badge>Security</Badge>
                <Badge>UX</Badge>
              </div>
              <p className="text-sm">Key improvements:</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>50% faster load times</li>
                <li>Enhanced security protocols</li>
                <li>Redesigned user interface</li>
              </ul>
              <Button size="sm" className="mt-3">
                View Release Notes
              </Button>
            </div>
          ),
        },
        {
          id: "2",
          date: "March 2024",
          title: "Infrastructure Update",
          description: "Complete migration to cloud infrastructure",
          icon: <FiGlobe className="h-4 w-4" />,
          isMilestone: true,
          content: (
            <div className="mt-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Migration Stats</p>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Uptime</p>
                    <p className="text-2xl font-bold">99.99%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <p className="text-2xl font-bold">45ms</p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
      variant: "vertical-centered",
      animated: true,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify timeline items are present
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(2);
      
      // Verify custom content items are rendered
      await expect(canvas.getByText("Feature Release")).toBeInTheDocument();
      await expect(canvas.getByText("Major feature update with custom content")).toBeInTheDocument();
      await expect(canvas.getByText("Infrastructure Update")).toBeInTheDocument();
      
      // Verify custom content badges
      await expect(canvas.getByText("Performance")).toBeInTheDocument();
      await expect(canvas.getByText("Security")).toBeInTheDocument();
      await expect(canvas.getByText("UX")).toBeInTheDocument();
      
      // Verify custom content text
      await expect(canvas.getByText("Key improvements:")).toBeInTheDocument();
      await expect(canvas.getByText("50% faster load times")).toBeInTheDocument();
      await expect(canvas.getByText("Enhanced security protocols")).toBeInTheDocument();
      
      // Verify custom button
      await expect(canvas.getByText("View Release Notes")).toBeInTheDocument();
      
      // Verify migration stats
      await expect(canvas.getByText("Migration Stats")).toBeInTheDocument();
      await expect(canvas.getByText("99.99%")).toBeInTheDocument();
      await expect(canvas.getByText("45ms")).toBeInTheDocument();
      
      // Verify icons are rendered
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: [
        {
          id: "1",
          date: "January 2024",
          title: "Feature Release",
          description: "Major feature update with custom content",
          isPast: true,
          content: {
            type: "Box",
            className: "mt-4 space-y-3",
            children: [
              {
                type: "Flex",
                className: "gap-2",
                children: [
                  { type: "Badge", children: "Performance" },
                  { type: "Badge", children: "Security" },
                  { type: "Badge", children: "UX" },
                ],
              },
              {
                type: "Text",
                className: "text-sm",
                children: "Key improvements:",
              },
              {
                type: "Box",
                as: "ul",
                className: "list-inside list-disc space-y-1 text-sm text-muted-foreground",
                children: [
                  { type: "Text", as: "li", children: "50% faster load times" },
                  { type: "Text", as: "li", children: "Enhanced security protocols" },
                  { type: "Text", as: "li", children: "Redesigned user interface" },
                ],
              },
              {
                type: "Button",
                size: "sm",
                className: "mt-3",
                children: "View Release Notes",
              },
            ],
          },
        },
        {
          id: "2",
          date: "March 2024",
          title: "Infrastructure Update",
          description: "Complete migration to cloud infrastructure",
          isMilestone: true,
          content: {
            type: "Box",
            className: "mt-4",
            children: {
              type: "Box",
              className: "rounded-lg bg-muted p-4",
              children: [
                {
                  type: "Text",
                  className: "text-sm font-medium",
                  children: "Migration Stats",
                },
                {
                  type: "Grid",
                  className: "mt-2 grid-cols-2 gap-4 text-sm",
                  children: [
                    {
                      type: "Box",
                      children: [
                        {
                          type: "Text",
                          className: "text-muted-foreground",
                          children: "Uptime",
                        },
                        {
                          type: "Text",
                          className: "text-2xl font-bold",
                          children: "99.99%",
                        },
                      ],
                    },
                    {
                      type: "Box",
                      children: [
                        {
                          type: "Text",
                          className: "text-muted-foreground",
                          children: "Response Time",
                        },
                        {
                          type: "Text",
                          className: "text-2xl font-bold",
                          children: "45ms",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
      variant: "vertical-centered",
      animated: true,
    },
  }
);

export const CompanyMilestones = enhanceStoryForDualMode<typeof Timeline>(
  {
    name: "Company Milestones (Full Example)",
    args: {
      items: companyHistoryData,
      variant: "vertical-alternating",
      lineStyle: "solid",
      animated: true,
    },
    parameters: {
      docs: {
        description: {
          story: "A complete company history timeline showcasing major milestones and achievements.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify all company milestones are rendered
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(companyHistoryData.length);
      
      // Verify major milestones
      await expect(canvas.getByText("Company Founded")).toBeInTheDocument();
      await expect(canvas.getByText("Series A Funding")).toBeInTheDocument();
      await expect(canvas.getByText("Award Recognition")).toBeInTheDocument();
      
      // Verify milestone badges
      await expect(canvas.getByText("Beginning")).toBeInTheDocument();
      await expect(canvas.getByText("Milestone")).toBeInTheDocument();
      await expect(canvas.getByText("Achievement")).toBeInTheDocument();
      
      // Verify alternating layout is working
      const cards = canvasElement.querySelectorAll(".bg-card, .bg-background");
      expect(cards.length).toBeGreaterThan(0);
      
      // Verify icons are rendered
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: companyHistoryData.map(item => ({
        ...item,
        date: typeof item.date === "object" ? item.date.toISOString() : item.date,
      })),
      variant: "vertical-alternating",
      lineStyle: "solid",
      animated: true,
    },
  }
);

export const ProductRoadmap = enhanceStoryForDualMode<typeof Timeline>(
  {
    name: "Product Roadmap (Full Example)",
    args: {
      items: productRoadmapData,
      variant: "vertical-centered",
      animated: true,
    },
    parameters: {
      docs: {
        description: {
          story:
            "A product development roadmap showing completed, in-progress, and planned features.",
        },
      },
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Verify all roadmap items are rendered
      const timelineItems = canvasElement.querySelectorAll("li");
      expect(timelineItems.length).toBe(productRoadmapData.length);
      
      // Verify product roadmap features
      await expect(canvas.getByText("AI Integration")).toBeInTheDocument();
      await expect(canvas.getByText("Mobile App Launch")).toBeInTheDocument();
      await expect(canvas.getByText("Enterprise Features")).toBeInTheDocument();
      await expect(canvas.getByText("API v2.0")).toBeInTheDocument();
      await expect(canvas.getByText("Analytics Dashboard")).toBeInTheDocument();
      await expect(canvas.getByText("Global Infrastructure")).toBeInTheDocument();
      
      // Verify different statuses
      await expect(canvas.getByText("Completed")).toBeInTheDocument();
      await expect(canvas.getByText("In Progress")).toBeInTheDocument();
      await expect(canvas.getByText("Planned")).toBeInTheDocument();
      await expect(canvas.getByText("Future")).toBeInTheDocument();
      
      // Verify quarters
      await expect(canvas.getByText("Q1 2024")).toBeInTheDocument();
      await expect(canvas.getByText("Q2 2024")).toBeInTheDocument();
      await expect(canvas.getByText("Q3 2024")).toBeInTheDocument();
      await expect(canvas.getByText("Q4 2024")).toBeInTheDocument();
      
      // Verify milestone indicators
      const milestoneElements = canvasElement.querySelectorAll(".bg-primary");
      expect(milestoneElements.length).toBeGreaterThan(0);
      
      // Verify icons are rendered
      const icons = canvasElement.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Timeline",
      items: productRoadmapData,
      variant: "vertical-centered",
      animated: true,
    },
  }
);
