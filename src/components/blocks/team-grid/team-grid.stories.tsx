import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import { TeamGrid, type TeamMember } from "./team-grid";
import { FaGithub, FaDribbble, FaInstagram } from "react-icons/fa";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const sampleMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    department: "Executive",
    bio: "Visionary leader with 15+ years of experience in tech startups. Passionate about building products that make a difference in people's lives.",
    avatar:
      "https://placehold.co/150x150/EEE/31343C",
    email: "sarah@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2019",
    skills: ["Leadership", "Strategy", "Product Vision", "Team Building"],
    achievements: [
      "Raised $50M in Series B",
      "Named Forbes 30 Under 30",
      "Built team from 5 to 200+",
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/sarah-johnson" },
      { platform: "twitter", url: "https://twitter.com/sarahjohnson" },
      { platform: "email", url: "sarah@company.com" },
    ],
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    department: "Engineering",
    bio: "Full-stack engineer turned technical leader. Expertise in scalable architecture and building high-performance engineering teams.",
    avatar:
      "https://placehold.co/150x150/EEE/31343C",
    email: "michael@company.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    joinDate: "March 2019",
    skills: ["System Architecture", "Cloud Infrastructure", "Team Leadership", "Go", "Python"],
    achievements: [
      "Reduced infrastructure costs by 60%",
      "Built auto-scaling platform",
      "Mentored 15+ engineers",
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/michael-chen" },
      {
        platform: "custom",
        url: "https://github.com/michaelchen",
        icon: FaGithub,
        label: "GitHub",
      },
      { platform: "email", url: "michael@company.com" },
    ],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Head of Design",
    department: "Design",
    bio: "Award-winning UX designer with a passion for creating intuitive and beautiful user experiences that drive business results.",
    avatar:
      "https://placehold.co/150x150/EEE/31343C",
    email: "emily@company.com",
    location: "Austin, TX",
    joinDate: "June 2020",
    skills: ["User Experience", "Product Design", "Design Systems", "Prototyping", "User Research"],
    achievements: [
      "Redesigned core product with 40% engagement increase",
      "Built design system used by 50+ components",
      "Won Red Dot Design Award",
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/emily-rodriguez" },
      {
        platform: "custom",
        url: "https://dribbble.com/emilyrodriguez",
        icon: FaDribbble,
        label: "Dribbble",
      },
      { platform: "twitter", url: "https://twitter.com/emilydesigns" },
    ],
  },
  {
    id: "4",
    name: "David Thompson",
    role: "VP of Sales",
    department: "Sales",
    bio: "Results-driven sales leader with expertise in enterprise software sales. Built and scaled sales teams from startup to IPO.",
    avatar:
      "https://placehold.co/150x150/EEE/31343C",
    email: "david@company.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    joinDate: "September 2020",
    skills: ["Enterprise Sales", "Team Building", "Customer Relations", "Strategic Partnerships"],
    achievements: [
      "Grew ARR from $5M to $50M",
      "Built sales team of 25+",
      "Closed largest enterprise deal",
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/david-thompson" },
      { platform: "email", url: "david@company.com" },
      { platform: "phone", url: "+1-555-345-6789" },
    ],
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Head of Marketing",
    department: "Marketing",
    bio: "Growth marketing expert with a data-driven approach to building brands and scaling customer acquisition.",
    avatar:
      "https://placehold.co/150x150/EEE/31343C",
    email: "lisa@company.com",
    location: "Los Angeles, CA",
    joinDate: "January 2021",
    skills: ["Growth Marketing", "Brand Strategy", "Content Marketing", "Analytics", "A/B Testing"],
    achievements: [
      "Increased organic traffic by 300%",
      "Launched viral marketing campaign",
      "Built marketing team from 2 to 15",
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/lisa-wang" },
      { platform: "twitter", url: "https://twitter.com/lisamarketing" },
      {
        platform: "custom",
        url: "https://instagram.com/lisamarketing",
        icon: FaInstagram,
        label: "Instagram",
      },
    ],
  },
  {
    id: "6",
    name: "James Park",
    role: "Senior Software Engineer",
    department: "Engineering",
    bio: "Backend engineer specializing in distributed systems and database optimization. Passionate about clean code and mentoring junior developers.",
    avatar:
      "https://placehold.co/150x150/EEE/31343C",
    email: "james@company.com",
    location: "Remote",
    joinDate: "April 2021",
    skills: ["Distributed Systems", "Database Design", "Python", "Go", "Kubernetes"],
    achievements: [
      "Optimized query performance by 80%",
      "Led microservices migration",
      "Open source contributor",
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/james-park" },
      { platform: "custom", url: "https://github.com/jamespark", icon: FaGithub, label: "GitHub" },
    ],
  },
];

const meta: Meta<typeof TeamGrid> = {
  title: "Blocks/TeamGrid",
  component: TeamGrid,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive team grid component with multiple layouts, filtering, search, and modal functionality.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["grid", "list", "minimal", "cards", "org-chart"],
      description: "Layout variant for displaying team members",
    },
    columns: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "auto"],
      description: "Number of columns for grid layout",
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Spacing between grid items",
    },
    avatarSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of avatar images",
    },
    alignment: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Content alignment within cards",
    },
    hoverEffect: {
      control: "select",
      options: ["none", "lift", "glow", "scale", "tilt"],
      description: "Hover effect for team member cards",
    },
    showDepartmentFilter: {
      control: "boolean",
      description: "Show department filter buttons",
    },
    showSearch: {
      control: "boolean",
      description: "Show search input",
    },
    showModal: {
      control: "boolean",
      description: "Enable detailed modal view on click",
    },
    showSocialLinks: {
      control: "boolean",
      description: "Display social media links",
    },
    showContactInfo: {
      control: "boolean",
      description: "Display email and phone contact info",
    },
    showBio: {
      control: "boolean",
      description: "Display bio text in cards",
    },
    maxBioLength: {
      control: "number",
      description: "Maximum length of bio text before truncation",
    },
    animated: {
      control: "boolean",
      description: "Enable scroll-triggered animations",
    },
    staggerDelay: {
      control: "number",
      description: "Delay between animation of each card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof TeamGrid>(
  {
    args: {
      members: sampleMembers,
      variant: "grid",
      columns: "3",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: false,
      avatarSize: "md",
      alignment: "center",
      showBio: true,
      maxBioLength: 120,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "lift",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test search functionality
      const searchInput = canvas.getByPlaceholderText("Search team members...");
      expect(searchInput).toBeInTheDocument();
      
      // Test department filter buttons
      expect(canvas.getByText("All Departments")).toBeInTheDocument();
      expect(canvas.getByText("Executive")).toBeInTheDocument();
      expect(canvas.getByText("Engineering")).toBeInTheDocument();
      
      // Test team member cards render with correct content
      expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(canvas.getByText("CEO & Founder")).toBeInTheDocument();
      expect(canvas.getByText("Michael Chen")).toBeInTheDocument();
      expect(canvas.getByText("CTO")).toBeInTheDocument();
      expect(canvas.getByText("Emily Rodriguez")).toBeInTheDocument();
      expect(canvas.getByText("Head of Design")).toBeInTheDocument();
      
      // Test bio text is visible (truncated)
      expect(canvas.getByText(/Visionary leader with 15\+ years/)).toBeInTheDocument();
      expect(canvas.getByText(/Full-stack engineer turned technical leader/)).toBeInTheDocument();
      
      // Test avatars render
      const avatars = canvas.getAllByRole("img");
      expect(avatars.length).toBeGreaterThan(0);
      
      // Test search functionality works
      await user.type(searchInput, "Sarah");
      await waitFor(() => {
        expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();
        expect(canvas.queryByText("Michael Chen")).not.toBeInTheDocument();
      });
      
      // Clear search
      await user.clear(searchInput);
      await waitFor(() => {
        expect(canvas.getByText("Michael Chen")).toBeInTheDocument();
      });
      
      // Test department filter
      const engineeringButton = canvas.getByText("Engineering");
      await user.click(engineeringButton);
      await waitFor(() => {
        expect(canvas.getByText("Michael Chen")).toBeInTheDocument();
        expect(canvas.getByText("James Park")).toBeInTheDocument();
        expect(canvas.queryByText("Sarah Johnson")).not.toBeInTheDocument();
      });
    },
  },
  {
    renderSpec: {
      type: "TeamGrid",
      members: sampleMembers,
      variant: "grid",
      columns: "3",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: false,
      avatarSize: "md",
      alignment: "center",
      showBio: true,
      maxBioLength: 120,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "lift",
    },
  }
);

export const GridLayout: Story = enhanceStoryForDualMode<typeof TeamGrid>(
  {
    args: {
      members: sampleMembers,
      variant: "grid",
      columns: "4",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: true,
      avatarSize: "md",
      alignment: "center",
      showBio: true,
      maxBioLength: 120,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "lift",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test 4-column grid layout
      expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(canvas.getByText("Michael Chen")).toBeInTheDocument();
      expect(canvas.getByText("Emily Rodriguez")).toBeInTheDocument();
      expect(canvas.getByText("David Thompson")).toBeInTheDocument();
      
      // Test contact info is visible
      expect(canvas.getByText("sarah@company.com")).toBeInTheDocument();
      expect(canvas.getByText("michael@company.com")).toBeInTheDocument();
      
      // Test bio content renders
      expect(canvas.getByText(/Visionary leader with 15\+ years/)).toBeInTheDocument();
      expect(canvas.getByText(/Full-stack engineer turned technical leader/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "TeamGrid",
      members: sampleMembers,
      variant: "grid",
      columns: "4",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: true,
      avatarSize: "md",
      alignment: "center",
      showBio: true,
      maxBioLength: 120,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "lift",
    },
  }
);

export const ListLayout: Story = enhanceStoryForDualMode<typeof TeamGrid>(
  {
    args: {
      members: sampleMembers,
      variant: "list",
      columns: "3",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: true,
      avatarSize: "md",
      alignment: "center",
      showBio: true,
      maxBioLength: 200,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "lift",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test list layout renders team members
      expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(canvas.getByText("CEO & Founder")).toBeInTheDocument();
      expect(canvas.getByText("Michael Chen")).toBeInTheDocument();
      expect(canvas.getByText("CTO")).toBeInTheDocument();
      
      // Test longer bio text is visible in list layout
      expect(canvas.getByText(/Visionary leader with 15\+ years of experience in tech startups/)).toBeInTheDocument();
      expect(canvas.getByText(/Full-stack engineer turned technical leader\. Expertise in scalable architecture/)).toBeInTheDocument();
      
      // Test contact info is displayed
      expect(canvas.getByText("sarah@company.com")).toBeInTheDocument();
      expect(canvas.getByText("michael@company.com")).toBeInTheDocument();
      
      // Test social links are present
      const socialButtons = canvas.getAllByRole("button");
      expect(socialButtons.length).toBeGreaterThan(6); // Search, filters, plus social buttons
    },
  },
  {
    renderSpec: {
      type: "TeamGrid",
      members: sampleMembers,
      variant: "list",
      columns: "3",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: true,
      avatarSize: "md",
      alignment: "center",
      showBio: true,
      maxBioLength: 200,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "lift",
    },
  }
);

export const MinimalLayout: Story = enhanceStoryForDualMode<typeof TeamGrid>(
  {
    args: {
      members: sampleMembers,
      variant: "minimal",
      columns: "2",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: false,
      avatarSize: "md",
      alignment: "center",
      showBio: false,
      maxBioLength: 120,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "glow",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test minimal layout renders team members
      expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(canvas.getByText("CEO & Founder")).toBeInTheDocument();
      expect(canvas.getByText("Michael Chen")).toBeInTheDocument();
      expect(canvas.getByText("CTO")).toBeInTheDocument();
      
      // Test bio is NOT visible in minimal layout
      expect(canvas.queryByText(/Visionary leader with 15\+ years/)).not.toBeInTheDocument();
      expect(canvas.queryByText(/Full-stack engineer turned technical leader/)).not.toBeInTheDocument();
      
      // Test contact info is NOT visible
      expect(canvas.queryByText("sarah@company.com")).not.toBeInTheDocument();
      expect(canvas.queryByText("michael@company.com")).not.toBeInTheDocument();
      
      // Test avatars and department badges are present
      const avatars = canvas.getAllByRole("img");
      expect(avatars.length).toBeGreaterThan(0);
      expect(canvas.getByText("Executive")).toBeInTheDocument();
      expect(canvas.getByText("Engineering")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "TeamGrid",
      members: sampleMembers,
      variant: "minimal",
      columns: "2",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: false,
      avatarSize: "md",
      alignment: "center",
      showBio: false,
      maxBioLength: 120,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "glow",
    },
  }
);

export const OrgChartLayout: Story = enhanceStoryForDualMode<typeof TeamGrid>(
  {
    args: {
      members: sampleMembers,
      variant: "org-chart",
      columns: "3",
      gap: "md",
      showDepartmentFilter: false,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: true,
      avatarSize: "md",
      alignment: "center",
      showBio: true,
      maxBioLength: 120,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "lift",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test org chart layout renders department sections
      expect(canvas.getByText("Executive")).toBeInTheDocument();
      expect(canvas.getByText("Engineering")).toBeInTheDocument();
      expect(canvas.getByText("Design")).toBeInTheDocument();
      expect(canvas.getByText("Sales")).toBeInTheDocument();
      expect(canvas.getByText("Marketing")).toBeInTheDocument();
      
      // Test team members are grouped under departments
      expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(canvas.getByText("CEO & Founder")).toBeInTheDocument();
      expect(canvas.getByText("Michael Chen")).toBeInTheDocument();
      expect(canvas.getByText("James Park")).toBeInTheDocument();
      
      // Test contact info is displayed
      expect(canvas.getByText("sarah@company.com")).toBeInTheDocument();
      expect(canvas.getByText("michael@company.com")).toBeInTheDocument();
      
      // Test that department filter is NOT shown (disabled for org chart)
      expect(canvas.queryByText("All Departments")).not.toBeInTheDocument();
      
      // Test search still works
      expect(canvas.getByPlaceholderText("Search team members...")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "TeamGrid",
      members: sampleMembers,
      variant: "org-chart",
      columns: "3",
      gap: "md",
      showDepartmentFilter: false,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: true,
      avatarSize: "md",
      alignment: "center",
      showBio: true,
      maxBioLength: 120,
      animated: true,
      staggerDelay: 0.1,
      hoverEffect: "lift",
    },
  }
);

export const CompactGrid: Story = {
  args: {
    ...Default.args,
    variant: "grid",
    columns: "6",
    gap: "sm",
    avatarSize: "sm",
    showBio: false,
    showContactInfo: false,
    maxBioLength: 60,
  },
};

export const LargeCards: Story = {
  args: {
    ...Default.args,
    variant: "grid",
    columns: "2",
    gap: "lg",
    avatarSize: "xl",
    showBio: true,
    showContactInfo: true,
    maxBioLength: 200,
    hoverEffect: "scale",
  },
};

export const WithoutFilters: Story = {
  args: {
    ...Default.args,
    showDepartmentFilter: false,
    showSearch: false,
  },
};

export const WithoutModal: Story = {
  args: {
    ...Default.args,
    showModal: false,
    showBio: true,
    showContactInfo: true,
  },
};

export const NoAnimations: Story = {
  args: {
    ...Default.args,
    animated: false,
    hoverEffect: "none",
  },
};

export const SingleColumn: Story = {
  args: {
    ...Default.args,
    variant: "list",
    columns: "1",
    showBio: true,
    showContactInfo: true,
    maxBioLength: 300,
  },
};

export const TiltHoverEffect: Story = {
  args: {
    ...Default.args,
    hoverEffect: "tilt",
    animated: true,
    staggerDelay: 0.2,
  },
};

export const LeftAligned: Story = {
  args: {
    ...Default.args,
    alignment: "left",
    showBio: true,
    maxBioLength: 150,
  },
};

export const CustomDepartments: Story = {
  args: {
    ...Default.args,
    departments: ["Leadership", "Engineering", "Design", "Sales & Marketing", "Operations"],
    variant: "org-chart",
  },
};
