import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioCaseStudies, type CaseStudy } from '../../../../../src/components/blocks/portfolio-case-studies';
import { Badge } from '../../../../../src/components/ui/badge';
import { Button } from '../../../../../src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../src/components/ui/tabs';
import { 
  TrendingUp, Users, Clock, DollarSign, Star, Globe, Zap, Award, 
  Code, Palette, BarChart3, Briefcase, ExternalLink, ChevronRight 
} from 'lucide-react';
import { PageHeader } from '../../../components/ui/page-header';
import { ShowcaseWrapper } from '../../../components/ui/showcase-wrapper';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../../../src/components/ui/dialog';
import { ScrollArea } from '../../../../../src/components/ui/scroll-area';
import { format } from 'date-fns';

const sampleProjects: CaseStudy[] = [
  {
    id: '1',
    title: 'E-Commerce Platform Redesign',
    client: 'TechStyle Fashion Group',
    description: 'Complete redesign and rebuild of a multi-brand e-commerce platform, resulting in 150% increase in conversion rates.',
    longDescription: 'We partnered with TechStyle Fashion Group to completely reimagine their e-commerce experience across multiple fashion brands. The project involved user research, UX design, development, and ongoing optimization to create a seamless shopping experience that drives conversions and delights customers.',
    category: 'E-Commerce',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe', 'Next.js', 'Redis', 'Elasticsearch'],
    projectUrl: 'https://example.com/techstyle',
    featuredImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=1200',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=1200',
      'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&w=1200',
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
      content: 'The team delivered beyond our expectations. The new platform has transformed our online presence and significantly boosted our sales. Their attention to detail and focus on user experience made all the difference.',
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
    longDescription: 'DataViz Pro needed a powerful yet intuitive analytics dashboard that could handle massive datasets while providing instant insights. We created a solution that combines advanced data processing with beautiful visualizations, making complex data accessible to all users.',
    category: 'SaaS',
    technologies: ['Vue.js', 'Python', 'Redis', 'D3.js', 'Docker', 'Kubernetes', 'Apache Kafka', 'ClickHouse'],
    projectUrl: 'https://example.com/dataviz',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&w=1200',
      'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&w=1200',
    ],
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
    longDescription: 'We created a next-generation mobile banking app that combines security with user experience. Features include biometric authentication, real-time transactions, budgeting tools, and investment management, all wrapped in an intuitive interface.',
    category: 'FinTech',
    technologies: ['React Native', 'TypeScript', 'GraphQL', 'AWS', 'Plaid API', 'Face ID/Touch ID', 'Node.js'],
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
      { label: 'Daily Active Users', value: '85%', icon: <BarChart3 className="h-4 w-4 text-blue-500" /> },
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
    technologies: ['Next.js', 'Sanity CMS', 'Stripe', 'OpenTable API', 'Vercel', 'Tailwind CSS'],
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
    longDescription: 'MediCare Connect needed a secure, compliant healthcare platform that could handle patient records, appointments, and virtual consultations. We delivered a comprehensive solution that meets all regulatory requirements while providing an exceptional user experience.',
    category: 'Healthcare',
    technologies: ['Angular', 'Java Spring', 'PostgreSQL', 'WebRTC', 'Docker', 'HL7 FHIR', 'AWS Healthcare'],
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
    technologies: ['React', 'Python', 'TensorFlow', 'MongoDB', 'Socket.io', 'WebRTC', 'AWS Lambda'],
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
    technologies: ['Vue.js', 'Node.js', 'Elasticsearch', 'Three.js', 'AWS', 'MapBox', 'Stripe Connect'],
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
    technologies: ['Flutter', 'Firebase', 'TensorFlow Lite', 'HealthKit', 'Google Fit API', 'Dart'],
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
    technologies: ['SharePoint', 'React', '.NET Core', 'Azure', 'Microsoft Graph API', 'Power BI'],
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

function ProjectDetailModal({ project, isOpen, onClose }: { readonly project: CaseStudy | null; readonly isOpen: boolean; readonly onClose: () => void }) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <ScrollArea className="h-full max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{project.category}</Badge>
              {project.isFeatured && <Badge variant="default">Featured Project</Badge>}
            </div>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="text-base">
              {project.client} • {format(new Date(project.completedDate), 'MMMM yyyy')}
              {project.duration && ` • ${project.duration} project`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            {/* Hero Image */}
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={project.featuredImage} 
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
              <p className="text-muted-foreground">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.results.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 text-center">
                        <div className="flex justify-center mb-2">
                          {stat.icon || <TrendingUp className="h-5 w-5 text-primary" />}
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.galleryImages.map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${project.title} - ${index + 1}`}
                        className="h-full w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <blockquote className="space-y-3">
                    <p className="text-lg italic">&ldquo;{project.testimonial.content}&rdquo;</p>
                    <footer className="text-sm">
                      <strong>{project.testimonial.author}</strong>
                      {project.testimonial.role && `, ${project.testimonial.role}`}
                      {project.testimonial.company && ` at ${project.testimonial.company}`}
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {project.projectUrl && (
                <Button onClick={() => window.open(project.projectUrl, '_blank')}>
                  Visit Live Site
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function PortfolioCaseStudiesShowcase() {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (project: CaseStudy) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const examples = [
    {
      title: 'Grid Layout',
      description: 'Classic grid layout showcasing projects with key information and results.',
      component: (
        <PortfolioCaseStudies
          projects={sampleProjects}
          variant="grid"
          showFilters={true}
          showSearch={true}
          projectsPerPage={6}
          onViewDetails={handleViewDetails}
        />
      ),
    },
    {
      title: 'Detailed Cards',
      description: 'Comprehensive project cards with extended information and multiple CTAs.',
      component: (
        <PortfolioCaseStudies
          projects={sampleProjects}
          variant="detailed-cards"
          showFilters={true}
          projectsPerPage={3}
          onViewDetails={handleViewDetails}
        />
      ),
    },
    {
      title: 'Before & After',
      description: 'Interactive before/after comparison view for transformation projects.',
      component: (
        <PortfolioCaseStudies
          projects={sampleProjects.filter(p => p.beforeAfterImages)}
          variant="before-after"
          showFilters={false}
          showSearch={true}
          projectsPerPage={6}
          onViewDetails={handleViewDetails}
        />
      ),
    },
    {
      title: 'Client Spotlight',
      description: 'Client-focused view with testimonials and project outcomes.',
      component: (
        <PortfolioCaseStudies
          projects={sampleProjects.filter(p => p.testimonial)}
          variant="client-spotlight"
          showFilters={false}
          showSearch={true}
          projectsPerPage={4}
          onViewDetails={handleViewDetails}
        />
      ),
    },
    {
      title: 'Timeline View',
      description: 'Chronological timeline layout showcasing project progression.',
      component: (
        <PortfolioCaseStudies
          projects={sampleProjects}
          variant="timeline"
          showFilters={false}
          showSearch={false}
          showPagination={false}
          onViewDetails={handleViewDetails}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Portfolio & Case Studies"
        description="Showcase your work with stunning portfolio layouts"
      />

      <ShowcaseWrapper>
        <div className="space-y-12">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Portfolio Showcase</CardTitle>
              <CardDescription>
                Display your projects and case studies with multiple layout options, filtering capabilities, and detailed project views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <span className="text-sm">5 Layout Variants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-sm">Technology Tags</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Results Metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="text-sm">Client Details</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              {examples.map((example, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {example.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {examples.map((example, index) => (
              <TabsContent key={index} value={index.toString()} className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </CardHeader>
                  </Card>
                  {example.component}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Multiple Layout Options
                  </h4>
                  <p className="text-sm text-muted-foreground ml-6">
                    Choose from grid, detailed cards, before/after, client spotlight, or timeline layouts.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Advanced Filtering
                  </h4>
                  <p className="text-sm text-muted-foreground ml-6">
                    Filter by category, search by keywords, and sort by date or featured status.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Project Metrics
                  </h4>
                  <p className="text-sm text-muted-foreground ml-6">
                    Showcase key results with custom icons and statistics for each project.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Client Testimonials
                  </h4>
                  <p className="text-sm text-muted-foreground ml-6">
                    Include client feedback and testimonials to build trust and credibility.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Technology Stack Display
                  </h4>
                  <p className="text-sm text-muted-foreground ml-6">
                    Highlight the technologies used in each project with styled badges.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Detailed Project Views
                  </h4>
                  <p className="text-sm text-muted-foreground ml-6">
                    Open detailed modals with galleries, extended descriptions, and more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Example */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Example</CardTitle>
              <CardDescription>
                How to implement the Portfolio Case Studies component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { PortfolioCaseStudies } from '@/components/blocks/portfolio-case-studies';

const projects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    client: 'Fashion Brand',
    description: 'Complete platform redesign...',
    category: 'E-Commerce',
    technologies: ['React', 'Node.js', 'AWS'],
    featuredImage: '/images/project1.jpg',
    completedDate: '2024-03-15',
    results: [
      { label: 'Conversion Rate', value: '+150%' },
      { label: 'Load Time', value: '-60%' }
    ],
    slug: 'ecommerce-platform'
  }
  // ... more projects
];

function Portfolio() {
  return (
    <PortfolioCaseStudies
      projects={projects}
      variant="grid"
      showFilters={true}
      showSearch={true}
      projectsPerPage={9}
      onViewDetails={(project) => {
        // Handle project detail view
        console.log('View project:', project);
      }}
    />
  );
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </ShowcaseWrapper>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </>
  );
}