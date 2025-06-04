import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioCaseStudies, type CaseStudy } from './portfolio-case-studies';
import { TrendingUp, Users, Clock, DollarSign, Star, Globe, Zap, Award } from 'lucide-react';

const meta = {
  title: 'Blocks/PortfolioCaseStudies',
  component: PortfolioCaseStudies,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'detailed-cards', 'before-after', 'client-spotlight', 'timeline'],
    },
    showFilters: {
      control: 'boolean',
    },
    showSearch: {
      control: 'boolean',
    },
    showPagination: {
      control: 'boolean',
    },
    showLoadMore: {
      control: 'boolean',
    },
    projectsPerPage: {
      control: 'number',
    },
    enableLightbox: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof PortfolioCaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProjects: CaseStudy[] = [
  {
    id: '1',
    title: 'E-Commerce Platform Redesign',
    client: 'TechStyle Fashion Group',
    description: 'Complete redesign and rebuild of a multi-brand e-commerce platform, resulting in 150% increase in conversion rates.',
    longDescription: 'We partnered with TechStyle Fashion Group to completely reimagine their e-commerce experience across multiple fashion brands. The project involved user research, UX design, development, and ongoing optimization to create a seamless shopping experience.',
    category: 'E-Commerce',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe', 'Next.js'],
    projectUrl: 'https://example.com/techstyle',
    featuredImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=1200',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=1200',
    ],
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&w=1200',
      after: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&w=1200',
    },
    completedDate: '2024-03-15',
    duration: '6 months',
    results: [
      { label: 'Conversion Rate', value: '+150%', icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
      { label: 'Page Load Time', value: '-60%', icon: <Clock className="h-4 w-4 text-blue-500" /> },
      { label: 'Revenue Increase', value: '+$2.5M', icon: <DollarSign className="h-4 w-4 text-green-500" /> },
      { label: 'User Satisfaction', value: '4.8/5', icon: <Star className="h-4 w-4 text-yellow-500" /> },
    ],
    testimonial: {
      content: 'The team delivered beyond our expectations. The new platform has transformed our online presence and significantly boosted our sales.',
      author: 'Sarah Chen',
      role: 'VP of Digital',
      company: 'TechStyle Fashion Group',
    },
    isFeatured: true,
    slug: 'techstyle-ecommerce-redesign',
  },
  {
    id: '2',
    title: 'SaaS Dashboard for Analytics',
    client: 'DataViz Pro',
    description: 'Built a comprehensive analytics dashboard that processes millions of data points in real-time.',
    longDescription: 'DataViz Pro needed a powerful yet intuitive analytics dashboard that could handle massive datasets while providing instant insights. We created a solution that combines advanced data processing with beautiful visualizations.',
    category: 'SaaS',
    technologies: ['Vue.js', 'Python', 'Redis', 'D3.js', 'Docker', 'Kubernetes'],
    projectUrl: 'https://example.com/dataviz',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    completedDate: '2024-02-28',
    duration: '4 months',
    results: [
      { label: 'Data Processing', value: '10M/sec', icon: <Zap className="h-4 w-4 text-purple-500" /> },
      { label: 'User Growth', value: '+300%', icon: <Users className="h-4 w-4 text-green-500" /> },
      { label: 'Performance', value: '99.9%', icon: <Award className="h-4 w-4 text-blue-500" /> },
    ],
    slug: 'dataviz-analytics-dashboard',
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    client: 'FinTech Solutions Inc.',
    description: 'Developed a secure, user-friendly mobile banking application with advanced features.',
    category: 'FinTech',
    technologies: ['React Native', 'TypeScript', 'GraphQL', 'AWS', 'Plaid API'],
    featuredImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&w=1200',
      after: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&w=1200',
    },
    completedDate: '2024-01-20',
    duration: '8 months',
    results: [
      { label: 'App Downloads', value: '500K+', icon: <Users className="h-4 w-4 text-green-500" /> },
      { label: 'Security Rating', value: 'A+', icon: <Award className="h-4 w-4 text-green-500" /> },
    ],
    testimonial: {
      content: 'The app has revolutionized how our customers interact with their finances. Security and user experience are top-notch.',
      author: 'Michael Torres',
      role: 'CTO',
      company: 'FinTech Solutions Inc.',
    },
    slug: 'fintech-mobile-banking',
  },
  {
    id: '4',
    title: 'Restaurant Chain Website',
    client: 'Gourmet Bistro Group',
    description: 'Created a multi-location restaurant website with online ordering and reservation system.',
    category: 'Hospitality',
    technologies: ['Next.js', 'Sanity CMS', 'Stripe', 'OpenTable API', 'Vercel'],
    projectUrl: 'https://example.com/gourmet',
    featuredImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    completedDate: '2023-12-10',
    duration: '3 months',
    results: [
      { label: 'Online Orders', value: '+200%', icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
      { label: 'Table Bookings', value: '+150%', icon: <Users className="h-4 w-4 text-blue-500" /> },
    ],
    slug: 'gourmet-bistro-website',
  },
  {
    id: '5',
    title: 'Healthcare Portal',
    client: 'MediCare Connect',
    description: 'Built a HIPAA-compliant patient portal with telemedicine capabilities.',
    longDescription: 'MediCare Connect needed a secure, compliant healthcare platform that could handle patient records, appointments, and virtual consultations. We delivered a comprehensive solution that meets all regulatory requirements.',
    category: 'Healthcare',
    technologies: ['Angular', 'Java Spring', 'PostgreSQL', 'WebRTC', 'Docker'],
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&w=1200',
      after: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&w=1200',
    },
    completedDate: '2023-11-15',
    duration: '10 months',
    results: [
      { label: 'Patient Satisfaction', value: '95%', icon: <Star className="h-4 w-4 text-yellow-500" /> },
      { label: 'Appointment Time', value: '-40%', icon: <Clock className="h-4 w-4 text-blue-500" /> },
      { label: 'Compliance Score', value: '100%', icon: <Award className="h-4 w-4 text-green-500" /> },
    ],
    testimonial: {
      content: 'The portal has streamlined our operations and improved patient care significantly. The telemedicine features were crucial during recent times.',
      author: 'Dr. Emily Watson',
      role: 'Chief Medical Officer',
      company: 'MediCare Connect',
    },
    isFeatured: true,
    slug: 'medicare-connect-portal',
  },
  {
    id: '6',
    title: 'Educational Platform',
    client: 'LearnHub Academy',
    description: 'Developed an interactive e-learning platform with AI-powered personalized learning paths.',
    category: 'EdTech',
    technologies: ['React', 'Python', 'TensorFlow', 'MongoDB', 'Socket.io'],
    projectUrl: 'https://example.com/learnhub',
    featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    completedDate: '2023-10-20',
    duration: '5 months',
    results: [
      { label: 'Student Engagement', value: '+80%', icon: <Users className="h-4 w-4 text-green-500" /> },
      { label: 'Course Completion', value: '+65%', icon: <TrendingUp className="h-4 w-4 text-blue-500" /> },
    ],
    slug: 'learnhub-platform',
  },
  {
    id: '7',
    title: 'Real Estate Marketplace',
    client: 'PropertyPro Solutions',
    description: 'Created a comprehensive real estate platform with virtual tours and AI-powered recommendations.',
    category: 'Real Estate',
    technologies: ['Vue.js', 'Node.js', 'Elasticsearch', 'Three.js', 'AWS'],
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    completedDate: '2023-09-30',
    duration: '6 months',
    results: [
      { label: 'Property Listings', value: '10K+', icon: <Globe className="h-4 w-4 text-blue-500" /> },
      { label: 'User Matches', value: '+120%', icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
    ],
    slug: 'propertypro-marketplace',
  },
  {
    id: '8',
    title: 'Fitness Tracking App',
    client: 'FitLife Technologies',
    description: 'Built a comprehensive fitness tracking application with social features and personalized coaching.',
    category: 'Health & Fitness',
    technologies: ['Flutter', 'Firebase', 'TensorFlow Lite', 'HealthKit', 'Google Fit API'],
    featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?ixlib=rb-4.0.3&w=1200',
      after: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=1200',
    },
    completedDate: '2023-08-25',
    duration: '4 months',
    results: [
      { label: 'Active Users', value: '250K', icon: <Users className="h-4 w-4 text-green-500" /> },
      { label: 'Retention Rate', value: '85%', icon: <Award className="h-4 w-4 text-blue-500" /> },
    ],
    testimonial: {
      content: 'The app has helped thousands achieve their fitness goals. The AI coaching feature is a game-changer.',
      author: 'Alex Rodriguez',
      role: 'Founder & CEO',
      company: 'FitLife Technologies',
    },
    slug: 'fitlife-tracking-app',
  },
  {
    id: '9',
    title: 'Corporate Intranet',
    client: 'Global Enterprises Ltd.',
    description: 'Designed and implemented a modern intranet solution for 50,000+ employees worldwide.',
    category: 'Enterprise',
    technologies: ['SharePoint', 'React', '.NET Core', 'Azure', 'Microsoft Graph API'],
    featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    completedDate: '2023-07-15',
    duration: '12 months',
    results: [
      { label: 'Employee Adoption', value: '95%', icon: <Users className="h-4 w-4 text-green-500" /> },
      { label: 'Productivity Gain', value: '+30%', icon: <TrendingUp className="h-4 w-4 text-blue-500" /> },
    ],
    slug: 'global-enterprises-intranet',
  },
];

export const Default: Story = {
  args: {
    projects: sampleProjects,
    variant: 'grid',
    showFilters: true,
    showSearch: true,
    showPagination: true,
    projectsPerPage: 6,
  },
};

export const DetailedCards: Story = {
  args: {
    projects: sampleProjects,
    variant: 'detailed-cards',
    showFilters: true,
    showSearch: true,
    showPagination: true,
    projectsPerPage: 4,
  },
};

export const BeforeAfter: Story = {
  args: {
    projects: sampleProjects.filter(p => p.beforeAfterImages),
    variant: 'before-after',
    showFilters: true,
    showSearch: false,
    showPagination: true,
    projectsPerPage: 6,
  },
};

export const ClientSpotlight: Story = {
  args: {
    projects: sampleProjects.filter(p => p.testimonial),
    variant: 'client-spotlight',
    showFilters: false,
    showSearch: true,
    showPagination: true,
    projectsPerPage: 4,
  },
};

export const Timeline: Story = {
  args: {
    projects: sampleProjects,
    variant: 'timeline',
    showFilters: false,
    showSearch: false,
    showPagination: false,
    sortOptions: [
      { label: 'Newest First', value: 'date-desc' },
      { label: 'Oldest First', value: 'date-asc' },
    ],
  },
};

export const WithFeatured: Story = {
  args: {
    projects: sampleProjects,
    variant: 'grid',
    showFilters: true,
    showSearch: true,
    showPagination: true,
    projectsPerPage: 6,
    featuredProjectIds: ['1', '5'],
  },
};

export const LoadMore: Story = {
  args: {
    projects: sampleProjects,
    variant: 'grid',
    showFilters: true,
    showSearch: true,
    showPagination: false,
    showLoadMore: true,
    projectsPerPage: 3,
  },
};

export const NoResults: Story = {
  args: {
    projects: [],
    variant: 'grid',
    showFilters: true,
    showSearch: true,
  },
};

export const Loading: Story = {
  args: {
    projects: sampleProjects,
    variant: 'grid',
    loading: true,
    projectsPerPage: 6,
  },
};

export const WithCategories: Story = {
  args: {
    projects: sampleProjects,
    variant: 'grid',
    showFilters: true,
    showSearch: true,
    categories: ['E-Commerce', 'SaaS', 'FinTech', 'Healthcare', 'EdTech', 'Enterprise'],
    projectsPerPage: 6,
  },
};

export const MobileResponsive: Story = {
  args: {
    projects: sampleProjects.slice(0, 3),
    variant: 'grid',
    showFilters: true,
    showSearch: true,
    showPagination: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WithCustomHandler: Story = {
  args: {
    projects: sampleProjects,
    variant: 'grid',
    showFilters: true,
    showSearch: true,
    onViewDetails: (project) => {
      alert(`Viewing project: ${project.title}`);
    },
  },
};