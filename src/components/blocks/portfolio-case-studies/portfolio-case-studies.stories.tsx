import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { PortfolioCaseStudies, type CaseStudy } from "./portfolio-case-studies";
import { TrendingUp, Users, Clock, DollarSign, Star, Globe, Zap, Award } from "lucide-react";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Blocks/PortfolioCaseStudies",
  component: PortfolioCaseStudies,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["grid", "detailed-cards", "before-after", "client-spotlight", "timeline"],
    },
    showFilters: {
      control: "boolean",
    },
    showSearch: {
      control: "boolean",
    },
    showPagination: {
      control: "boolean",
    },
    showLoadMore: {
      control: "boolean",
    },
    projectsPerPage: {
      control: "number",
    },
    enableLightbox: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof PortfolioCaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProjects: CaseStudy[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    client: "TechStyle Fashion Group",
    description:
      "Complete redesign and rebuild of a multi-brand e-commerce platform, resulting in 150% increase in conversion rates.",
    longDescription:
      "We partnered with TechStyle Fashion Group to completely reimagine their e-commerce experience across multiple fashion brands. The project involved user research, UX design, development, and ongoing optimization to create a seamless shopping experience.",
    category: "E-Commerce",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe", "Next.js"],
    projectUrl: "https://example.com/techstyle",
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    galleryImages: [
      "https://placehold.co/800x450/EEE/31343C",
      "https://placehold.co/800x450/EEE/31343C",
    ],
    beforeAfterImages: {
      before: "https://placehold.co/800x450/EEE/31343C",
      after: "https://placehold.co/800x450/EEE/31343C",
    },
    completedDate: "2024-03-15",
    duration: "6 months",
    results: [
      {
        label: "Conversion Rate",
        value: "+150%",
        icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      },
      { label: "Page Load Time", value: "-60%", icon: <Clock className="h-4 w-4 text-blue-500" /> },
      {
        label: "Revenue Increase",
        value: "+$2.5M",
        icon: <DollarSign className="h-4 w-4 text-green-500" />,
      },
      {
        label: "User Satisfaction",
        value: "4.8/5",
        icon: <Star className="h-4 w-4 text-yellow-500" />,
      },
    ],
    testimonial: {
      content:
        "The team delivered beyond our expectations. The new platform has transformed our online presence and significantly boosted our sales.",
      author: "Sarah Chen",
      role: "VP of Digital",
      company: "TechStyle Fashion Group",
    },
    isFeatured: true,
    slug: "techstyle-ecommerce-redesign",
  },
  {
    id: "2",
    title: "SaaS Dashboard for Analytics",
    client: "DataViz Pro",
    description:
      "Built a comprehensive analytics dashboard that processes millions of data points in real-time.",
    longDescription:
      "DataViz Pro needed a powerful yet intuitive analytics dashboard that could handle massive datasets while providing instant insights. We created a solution that combines advanced data processing with beautiful visualizations.",
    category: "SaaS",
    technologies: ["Vue.js", "Python", "Redis", "D3.js", "Docker", "Kubernetes"],
    projectUrl: "https://example.com/dataviz",
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    completedDate: "2024-02-28",
    duration: "4 months",
    results: [
      {
        label: "Data Processing",
        value: "10M/sec",
        icon: <Zap className="h-4 w-4 text-purple-500" />,
      },
      { label: "User Growth", value: "+300%", icon: <Users className="h-4 w-4 text-green-500" /> },
      { label: "Performance", value: "99.9%", icon: <Award className="h-4 w-4 text-blue-500" /> },
    ],
    slug: "dataviz-analytics-dashboard",
  },
  {
    id: "3",
    title: "Mobile Banking App",
    client: "FinTech Solutions Inc.",
    description:
      "Developed a secure, user-friendly mobile banking application with advanced features.",
    category: "FinTech",
    technologies: ["React Native", "TypeScript", "GraphQL", "AWS", "Plaid API"],
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    beforeAfterImages: {
      before: "https://placehold.co/800x450/EEE/31343C",
      after: "https://placehold.co/800x450/EEE/31343C",
    },
    completedDate: "2024-01-20",
    duration: "8 months",
    results: [
      {
        label: "App Downloads",
        value: "500K+",
        icon: <Users className="h-4 w-4 text-green-500" />,
      },
      { label: "Security Rating", value: "A+", icon: <Award className="h-4 w-4 text-green-500" /> },
    ],
    testimonial: {
      content:
        "The app has revolutionized how our customers interact with their finances. Security and user experience are top-notch.",
      author: "Michael Torres",
      role: "CTO",
      company: "FinTech Solutions Inc.",
    },
    slug: "fintech-mobile-banking",
  },
  {
    id: "4",
    title: "Restaurant Chain Website",
    client: "Gourmet Bistro Group",
    description:
      "Created a multi-location restaurant website with online ordering and reservation system.",
    category: "Hospitality",
    technologies: ["Next.js", "Sanity CMS", "Stripe", "OpenTable API", "Vercel"],
    projectUrl: "https://example.com/gourmet",
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    completedDate: "2023-12-10",
    duration: "3 months",
    results: [
      {
        label: "Online Orders",
        value: "+200%",
        icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      },
      {
        label: "Table Bookings",
        value: "+150%",
        icon: <Users className="h-4 w-4 text-blue-500" />,
      },
    ],
    slug: "gourmet-bistro-website",
  },
  {
    id: "5",
    title: "Healthcare Portal",
    client: "MediCare Connect",
    description: "Built a HIPAA-compliant patient portal with telemedicine capabilities.",
    longDescription:
      "MediCare Connect needed a secure, compliant healthcare platform that could handle patient records, appointments, and virtual consultations. We delivered a comprehensive solution that meets all regulatory requirements.",
    category: "Healthcare",
    technologies: ["Angular", "Java Spring", "PostgreSQL", "WebRTC", "Docker"],
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    beforeAfterImages: {
      before: "https://placehold.co/800x450/EEE/31343C",
      after: "https://placehold.co/800x450/EEE/31343C",
    },
    completedDate: "2023-11-15",
    duration: "10 months",
    results: [
      {
        label: "Patient Satisfaction",
        value: "95%",
        icon: <Star className="h-4 w-4 text-yellow-500" />,
      },
      {
        label: "Appointment Time",
        value: "-40%",
        icon: <Clock className="h-4 w-4 text-blue-500" />,
      },
      {
        label: "Compliance Score",
        value: "100%",
        icon: <Award className="h-4 w-4 text-green-500" />,
      },
    ],
    testimonial: {
      content:
        "The portal has streamlined our operations and improved patient care significantly. The telemedicine features were crucial during recent times.",
      author: "Dr. Emily Watson",
      role: "Chief Medical Officer",
      company: "MediCare Connect",
    },
    isFeatured: true,
    slug: "medicare-connect-portal",
  },
  {
    id: "6",
    title: "Educational Platform",
    client: "LearnHub Academy",
    description:
      "Developed an interactive e-learning platform with AI-powered personalized learning paths.",
    category: "EdTech",
    technologies: ["React", "Python", "TensorFlow", "MongoDB", "Socket.io"],
    projectUrl: "https://example.com/learnhub",
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    completedDate: "2023-10-20",
    duration: "5 months",
    results: [
      {
        label: "Student Engagement",
        value: "+80%",
        icon: <Users className="h-4 w-4 text-green-500" />,
      },
      {
        label: "Course Completion",
        value: "+65%",
        icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      },
    ],
    slug: "learnhub-platform",
  },
  {
    id: "7",
    title: "Real Estate Marketplace",
    client: "PropertyPro Solutions",
    description:
      "Created a comprehensive real estate platform with virtual tours and AI-powered recommendations.",
    category: "Real Estate",
    technologies: ["Vue.js", "Node.js", "Elasticsearch", "Three.js", "AWS"],
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    completedDate: "2023-09-30",
    duration: "6 months",
    results: [
      {
        label: "Property Listings",
        value: "10K+",
        icon: <Globe className="h-4 w-4 text-blue-500" />,
      },
      {
        label: "User Matches",
        value: "+120%",
        icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      },
    ],
    slug: "propertypro-marketplace",
  },
  {
    id: "8",
    title: "Fitness Tracking App",
    client: "FitLife Technologies",
    description:
      "Built a comprehensive fitness tracking application with social features and personalized coaching.",
    category: "Health & Fitness",
    technologies: ["Flutter", "Firebase", "TensorFlow Lite", "HealthKit", "Google Fit API"],
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    beforeAfterImages: {
      before: "https://placehold.co/800x450/EEE/31343C",
      after: "https://placehold.co/800x450/EEE/31343C",
    },
    completedDate: "2023-08-25",
    duration: "4 months",
    results: [
      { label: "Active Users", value: "250K", icon: <Users className="h-4 w-4 text-green-500" /> },
      { label: "Retention Rate", value: "85%", icon: <Award className="h-4 w-4 text-blue-500" /> },
    ],
    testimonial: {
      content:
        "The app has helped thousands achieve their fitness goals. The AI coaching feature is a game-changer.",
      author: "Alex Rodriguez",
      role: "Founder & CEO",
      company: "FitLife Technologies",
    },
    slug: "fitlife-tracking-app",
  },
  {
    id: "9",
    title: "Corporate Intranet",
    client: "Global Enterprises Ltd.",
    description:
      "Designed and implemented a modern intranet solution for 50,000+ employees worldwide.",
    category: "Enterprise",
    technologies: ["SharePoint", "React", ".NET Core", "Azure", "Microsoft Graph API"],
    featuredImage:
      "https://placehold.co/800x450/EEE/31343C",
    completedDate: "2023-07-15",
    duration: "12 months",
    results: [
      {
        label: "Employee Adoption",
        value: "95%",
        icon: <Users className="h-4 w-4 text-green-500" />,
      },
      {
        label: "Productivity Gain",
        value: "+30%",
        icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      },
    ],
    slug: "global-enterprises-intranet",
  },
];

export const Default: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects,
    variant: "grid",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    projectsPerPage: 6,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that search bar is rendered
    const searchInput = canvas.getByPlaceholderText(/search projects/i);
    expect(searchInput).toBeInTheDocument();
    
    // Test that filters are rendered
    const categoryFilter = canvas.getByText(/all categories/i);
    expect(categoryFilter).toBeInTheDocument();
    
    // Test that project cards are rendered - look for project titles
    const projectTitles = sampleProjects.slice(0, 6).map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that client names are rendered
    const firstClient = canvas.getByText(sampleProjects[0].client);
    expect(firstClient).toBeInTheDocument();
    
    // Test that categories are shown
    const firstCategory = canvas.getByText(sampleProjects[0].category);
    expect(firstCategory).toBeInTheDocument();
    
    // Test that View Case Study buttons are rendered
    const viewButtons = canvas.getAllByText(/view case study/i);
    expect(viewButtons.length).toBeGreaterThan(0);
  },
}) as Story;

export const DetailedCards: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects,
    variant: "detailed-cards",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    projectsPerPage: 4,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that project titles are rendered in detailed view
    const projectTitles = sampleProjects.slice(0, 4).map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that long descriptions are shown (if available)
    const projectWithLongDesc = sampleProjects.find(p => p.longDescription);
    if (projectWithLongDesc) {
      expect(canvas.getByText(projectWithLongDesc.longDescription || projectWithLongDesc.description)).toBeInTheDocument();
    }
    
    // Test that technologies are displayed
    const firstProjectTech = sampleProjects[0].technologies[0];
    expect(canvas.getByText(firstProjectTech)).toBeInTheDocument();
    
    // Test that View Full Case Study buttons are rendered
    const viewButtons = canvas.getAllByText(/view full case study/i);
    expect(viewButtons.length).toBeGreaterThan(0);
  },
}) as Story;

export const BeforeAfter: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects.filter((p) => p.beforeAfterImages),
    variant: "before-after",
    showFilters: true,
    showSearch: false,
    showPagination: true,
    projectsPerPage: 6,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that project titles are rendered
    const projectsWithBeforeAfter = sampleProjects.filter((p) => p.beforeAfterImages);
    const projectTitles = projectsWithBeforeAfter.slice(0, 6).map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that Before/After toggle buttons are shown
    const toggleButtons = canvas.getAllByText(/show (before|after)/i);
    expect(toggleButtons.length).toBeGreaterThan(0);
    
    // Test that search is NOT rendered
    const searchInput = canvas.queryByPlaceholderText(/search projects/i);
    expect(searchInput).not.toBeInTheDocument();
  },
}) as Story;

export const ClientSpotlight: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects.filter((p) => p.testimonial),
    variant: "client-spotlight",
    showFilters: false,
    showSearch: true,
    showPagination: true,
    projectsPerPage: 4,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that client names are prominently displayed
    const projectsWithTestimonial = sampleProjects.filter((p) => p.testimonial);
    const clientNames = projectsWithTestimonial.slice(0, 4).map(project => project.client);
    for (const client of clientNames) {
      expect(canvas.getByText(client)).toBeInTheDocument();
    }
    
    // Test that testimonials are rendered
    const firstTestimonial = projectsWithTestimonial[0].testimonial?.content;
    if (firstTestimonial) {
      // Look for partial text since the component adds quotes
      const testimonialElement = canvas.getByText(/The team delivered beyond our expectations/i);
      expect(testimonialElement).toBeInTheDocument();
    }
    
    // Test that Read More buttons are rendered
    const readMoreButtons = canvas.getAllByText(/read more/i);
    expect(readMoreButtons.length).toBeGreaterThan(0);
    
    // Test that filters are NOT rendered
    const categoryFilter = canvas.queryByText(/all categories/i);
    expect(categoryFilter).not.toBeInTheDocument();
  },
}) as Story;

export const Timeline: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects,
    variant: "timeline",
    showFilters: false,
    showSearch: false,
    showPagination: false,
    sortOptions: [
      { label: "Newest First", value: "date-desc" },
      { label: "Oldest First", value: "date-asc" },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that project titles are rendered in timeline format
    const projectTitles = sampleProjects.map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that years are displayed
    const firstProjectYear = new Date(sampleProjects[0].completedDate).getFullYear().toString();
    const yearElements = canvas.getAllByText(firstProjectYear);
    expect(yearElements.length).toBeGreaterThan(0);
    
    // Test that View Details buttons are rendered
    const viewButtons = canvas.getAllByText(/view details/i);
    expect(viewButtons.length).toBeGreaterThan(0);
    
    // Test that search and filters are NOT rendered
    const searchInput = canvas.queryByPlaceholderText(/search projects/i);
    expect(searchInput).not.toBeInTheDocument();
  },
}) as Story;

export const WithFeatured: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects,
    variant: "grid",
    showFilters: true,
    showSearch: true,
    showPagination: true,
    projectsPerPage: 6,
    featuredProjectIds: ["1", "5"],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that featured badges are shown
    const featuredBadges = canvas.getAllByText(/featured/i);
    expect(featuredBadges.length).toBeGreaterThanOrEqual(2); // At least the two we specified
    
    // Test that project titles are rendered
    const projectTitles = sampleProjects.slice(0, 6).map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
  },
}) as Story;

export const LoadMore: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects,
    variant: "grid",
    showFilters: true,
    showSearch: true,
    showPagination: false,
    showLoadMore: true,
    projectsPerPage: 3,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that only first 3 projects are initially shown
    const projectTitles = sampleProjects.slice(0, 3).map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that Load More button is rendered
    const loadMoreButton = canvas.getByRole('button', { name: /load more projects/i });
    expect(loadMoreButton).toBeInTheDocument();
    
    // Test that pagination is NOT rendered
    const pageNumbers = canvas.queryByText(/page \d+ of \d+/i);
    expect(pageNumbers).not.toBeInTheDocument();
  },
}) as Story;

export const NoResults: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: [],
    variant: "grid",
    showFilters: true,
    showSearch: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that empty state message is shown
    const emptyMessage = canvas.getByText(/no projects found/i);
    expect(emptyMessage).toBeInTheDocument();
    
    // Test that search and filters are still rendered
    const searchInput = canvas.getByPlaceholderText(/search projects/i);
    expect(searchInput).toBeInTheDocument();
  },
}) as Story;

export const Loading: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects,
    variant: "grid",
    loading: true,
    projectsPerPage: 6,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // Test that loading skeletons are rendered
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  },
}) as Story;

export const WithCategories: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects,
    variant: "grid",
    showFilters: true,
    showSearch: true,
    categories: ["E-Commerce", "SaaS", "FinTech", "Healthcare", "EdTech", "Enterprise"],
    projectsPerPage: 6,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that project cards are rendered
    const projectTitles = sampleProjects.slice(0, 6).map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that category filter is rendered
    const categoryFilter = canvas.getByText(/all categories/i);
    expect(categoryFilter).toBeInTheDocument();
  },
}) as Story;

export const MobileResponsive: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects.slice(0, 3),
    variant: "grid",
    showFilters: true,
    showSearch: true,
    showPagination: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that project cards are rendered in mobile view
    const projectTitles = sampleProjects.slice(0, 3).map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that search is rendered in mobile view
    const searchInput = canvas.getByPlaceholderText(/search projects/i);
    expect(searchInput).toBeInTheDocument();
  },
}) as Story;

export const WithCustomHandler: Story = enhanceStoryForDualMode({
  args: {
    type: "PortfolioCaseStudies",
    projects: sampleProjects,
    variant: "grid",
    showFilters: true,
    showSearch: true,
    onViewDetails: (project: CaseStudy) => {
      alert(`Viewing project: ${project.title}`);
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test that project cards are rendered
    const projectTitles = sampleProjects.slice(0, 9).map(project => project.title);
    for (const title of projectTitles) {
      expect(canvas.getByText(title)).toBeInTheDocument();
    }
    
    // Test that View Case Study buttons are rendered
    const viewButtons = canvas.getAllByText(/view case study/i);
    expect(viewButtons.length).toBeGreaterThan(0);
  },
}) as Story;
