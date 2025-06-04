import type { Meta, StoryObj } from "@storybook/react";
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
      options: ["vertical-centered", "vertical-alternating", "horizontal", "minimal", "with-images"],
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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format",
    icon: <FiStar className="h-4 w-4" />,
    isPast: true,
  },
  {
    id: "2",
    date: new Date("2023-03-20"),
    title: "Design Phase Complete",
    description: "UI/UX designs approved and development resources allocated",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format",
    icon: <FiCheckCircle className="h-4 w-4" />,
    isPast: true,
  },
  {
    id: "3",
    date: new Date("2023-06-01"),
    title: "Beta Launch",
    description: "Successful beta launch with 500+ early adopters",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format",
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
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&auto=format",
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

export const VerticalCentered: Story = {
  args: {
    items: companyHistoryData,
    variant: "vertical-centered",
    lineStyle: "solid",
    animated: true,
  },
};

export const VerticalAlternating: Story = {
  args: {
    items: productRoadmapData,
    variant: "vertical-alternating",
    lineStyle: "solid",
    animated: true,
  },
};

export const Horizontal: Story = {
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
};

export const Minimal: Story = {
  args: {
    items: careerProgressionData,
    variant: "minimal",
    animated: true,
  },
};

export const WithImages: Story = {
  args: {
    items: projectTimelineWithImages,
    variant: "with-images",
    animated: true,
  },
};

export const DashedLine: Story = {
  args: {
    items: companyHistoryData,
    variant: "vertical-alternating",
    lineStyle: "dashed",
    animated: true,
  },
};

export const NoAnimation: Story = {
  args: {
    items: productRoadmapData,
    variant: "vertical-centered",
    animated: false,
  },
};

export const WithCustomContent: Story = {
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
};

export const CompanyMilestones: Story = {
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
};

export const ProductRoadmap: Story = {
  name: "Product Roadmap (Full Example)",
  args: {
    items: productRoadmapData,
    variant: "vertical-centered",
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: "A product development roadmap showing completed, in-progress, and planned features.",
      },
    },
  },
};