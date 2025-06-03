import React from "react";
import { render } from "@alexberriman/react-jedi";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { FaGithub, FaDribbble, FaInstagram, FaMedium } from "react-icons/fa";

const sampleTeamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    department: "Executive",
    bio: "Visionary leader with 15+ years of experience in tech startups. Passionate about building products that make a difference in people's lives and creating inclusive work environments.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face",
    email: "sarah@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2019",
    skills: ["Leadership", "Strategy", "Product Vision", "Team Building", "Fundraising"],
    achievements: [
      "Raised $50M in Series B funding",
      "Named Forbes 30 Under 30 in Enterprise Technology",
      "Built team from 5 to 200+ employees",
      "Led company to $25M ARR"
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
    bio: "Full-stack engineer turned technical leader with expertise in scalable architecture and building high-performance engineering teams that deliver world-class products.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "michael@company.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    joinDate: "March 2019",
    skills: ["System Architecture", "Cloud Infrastructure", "Team Leadership", "Go", "Python", "Kubernetes"],
    achievements: [
      "Reduced infrastructure costs by 60%",
      "Built auto-scaling platform handling 1M+ requests/day",
      "Mentored 15+ junior engineers to senior level",
      "Led microservices migration with zero downtime"
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/michael-chen" },
      { platform: "custom", url: "https://github.com/michaelchen", icon: FaGithub, label: "GitHub" },
      { platform: "email", url: "michael@company.com" },
    ],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Head of Design",
    department: "Design",
    bio: "Award-winning UX designer with a passion for creating intuitive and beautiful user experiences that drive business results and delight users.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "emily@company.com",
    location: "Austin, TX",
    joinDate: "June 2020",
    skills: ["User Experience", "Product Design", "Design Systems", "Prototyping", "User Research", "Figma"],
    achievements: [
      "Redesigned core product with 40% engagement increase",
      "Built comprehensive design system used by 50+ components",
      "Won Red Dot Design Award for mobile app",
      "Led design team from 2 to 12 designers"
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/emily-rodriguez" },
      { platform: "custom", url: "https://dribbble.com/emilyrodriguez", icon: FaDribbble, label: "Dribbble" },
      { platform: "twitter", url: "https://twitter.com/emilydesigns" },
    ],
  },
  {
    id: "4", 
    name: "David Thompson",
    role: "VP of Sales",
    department: "Sales",
    bio: "Results-driven sales leader with expertise in enterprise software sales. Successfully built and scaled sales teams from startup to IPO across multiple companies.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    email: "david@company.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY", 
    joinDate: "September 2020",
    skills: ["Enterprise Sales", "Team Building", "Customer Relations", "Strategic Partnerships", "CRM Management"],
    achievements: [
      "Grew ARR from $5M to $50M in 3 years",
      "Built and managed sales team of 25+ representatives",
      "Closed largest enterprise deal worth $2.5M annually",
      "Achieved 150% of sales targets for 2 consecutive years"
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
    bio: "Growth marketing expert with a data-driven approach to building brands and scaling customer acquisition through innovative digital strategies.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    email: "lisa@company.com",
    location: "Los Angeles, CA",
    joinDate: "January 2021",
    skills: ["Growth Marketing", "Brand Strategy", "Content Marketing", "Analytics", "A/B Testing", "SEO"],
    achievements: [
      "Increased organic traffic by 300% in 18 months", 
      "Launched viral marketing campaign with 5M+ impressions",
      "Built marketing team from 2 to 15 specialists",
      "Reduced customer acquisition cost by 45%"
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/lisa-wang" },
      { platform: "twitter", url: "https://twitter.com/lisamarketing" },
      { platform: "custom", url: "https://instagram.com/lisamarketing", icon: FaInstagram, label: "Instagram" },
    ],
  },
  {
    id: "6",
    name: "James Park",
    role: "Senior Software Engineer",
    department: "Engineering",
    bio: "Backend engineer specializing in distributed systems and database optimization. Passionate about clean code, performance, and mentoring junior developers.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "james@company.com",
    location: "Remote",
    joinDate: "April 2021",
    skills: ["Distributed Systems", "Database Design", "Python", "Go", "Kubernetes", "PostgreSQL"],
    achievements: [
      "Optimized critical query performance by 80%",
      "Led microservices migration for payment system",
      "Active open source contributor with 1000+ GitHub stars",
      "Mentored 8 junior developers through code reviews"
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/james-park" },
      { platform: "custom", url: "https://github.com/jamespark", icon: FaGithub, label: "GitHub" },
    ],
  },
  {
    id: "7",
    name: "Rachel Adams",
    role: "Head of Customer Success", 
    department: "Customer Success",
    bio: "Customer-focused leader dedicated to ensuring client satisfaction and driving product adoption. Expert in building scalable support and success processes.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    email: "rachel@company.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    joinDate: "August 2021",
    skills: ["Customer Success", "Account Management", "Process Optimization", "Team Leadership", "CRM"],
    achievements: [
      "Improved customer retention rate to 95%",
      "Built customer success team from 1 to 10 people",
      "Reduced average response time by 60%",
      "Launched customer health scoring system"
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/rachel-adams" },
      { platform: "email", url: "rachel@company.com" },
      { platform: "custom", url: "https://medium.com/@racheladams", icon: FaMedium, label: "Medium" },
    ],
  },
  {
    id: "8",
    name: "Alex Kim",
    role: "Product Manager",
    department: "Product",
    bio: "Strategic product manager with a track record of launching successful features that drive user engagement and business growth through data-driven insights.",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    email: "alex@company.com",
    location: "San Francisco, CA",
    joinDate: "February 2022",
    skills: ["Product Strategy", "User Research", "Data Analysis", "Roadmap Planning", "Agile", "SQL"],
    achievements: [
      "Launched 3 major features with 25%+ adoption rates",
      "Led user research initiatives with 1000+ participants",
      "Improved product-market fit score from 6.5 to 8.2",
      "Coordinated cross-functional teams of 15+ people"
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/alex-kim" },
      { platform: "twitter", url: "https://twitter.com/alexkimpm" },
    ],
  },
];

const gridVariants = [
  {
    title: "Default Grid",
    variant: "grid",
    columns: "3",
    description: "Standard 3-column grid layout with all features enabled",
  },
  {
    title: "4-Column Grid",
    variant: "grid", 
    columns: "4",
    description: "Compact 4-column layout perfect for larger teams",
  },
  {
    title: "List View",
    variant: "list",
    columns: "1",
    description: "Detailed list layout showing more information per member",
  },
  {
    title: "Minimal Cards",
    variant: "minimal",
    columns: "4",
    showBio: false,
    showContactInfo: false,
    description: "Clean, minimal cards showing only essential information",
  },
  {
    title: "Organization Chart",
    variant: "org-chart",
    columns: "3",
    showDepartmentFilter: false,
    description: "Organized by departments with section headers",
  },
  {
    title: "Large Profile Cards",
    variant: "grid",
    columns: "2",
    avatarSize: "xl",
    gap: "lg",
    showContactInfo: true,
    description: "Large cards with detailed contact information",
  },
];

const teamGridSpecifications = gridVariants.map((variant) => ({
  type: "team-grid",
  props: {
    members: sampleTeamMembers,
    variant: variant.variant,
    columns: variant.columns,
    gap: variant.gap || "md",
    showDepartmentFilter: variant.showDepartmentFilter !== false,
    showSearch: true,
    showModal: true,
    showSocialLinks: true,
    showContactInfo: variant.showContactInfo || false,
    showBio: variant.showBio !== false,
    maxBioLength: 120,
    avatarSize: variant.avatarSize || "md",
    alignment: "center",
    animated: true,
    hoverEffect: "lift",
    className: "w-full",
  },
}));

export function TeamGridShowcase(): React.ReactElement {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Team Grid Block</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive team grid component for showcasing team members with multiple layouts,
          filtering, search, and detailed modal views. Perfect for about pages, team directories,
          and organization charts.
        </p>
      </div>

      <div className="space-y-12">
        {gridVariants.map((variant, index) => {
          const specification = teamGridSpecifications[index];
          
          return (
            <ShowcaseWrapper
              key={variant.title}
              title={variant.title}
              description={variant.description}
            >
              {render(specification)}
            </ShowcaseWrapper>
          );
        })}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Layout Options</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Grid layout with configurable columns (1-6 or auto)</li>
              <li>• List view for detailed information display</li>
              <li>• Minimal layout for compact presentations</li>
              <li>• Organization chart view grouped by departments</li>
              <li>• Responsive design with mobile-first approach</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Interactive Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Real-time search by name or role</li>
              <li>• Department filtering with custom departments</li>
              <li>• Detailed modal view with full profiles</li>
              <li>• Social media links integration</li>
              <li>• Contact information display (email, phone)</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Customization</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Multiple avatar sizes (sm, md, lg, xl)</li>
              <li>• Hover effects (lift, glow, scale, tilt)</li>
              <li>• Content alignment options</li>
              <li>• Configurable bio text length</li>
              <li>• Custom spacing and gap sizes</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Animation & Performance</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Scroll-triggered entrance animations</li>
              <li>• Staggered animation delays</li>
              <li>• Smooth hover transitions</li>
              <li>• Optimized for large team sizes</li>
              <li>• Accessibility-compliant interactions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Usage Examples</h2>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Basic Team Grid</h3>
            <pre className="text-sm overflow-x-auto">
{`{
  "type": "team-grid",
  "props": {
    "members": [
      {
        "name": "Sarah Johnson",
        "role": "CEO",
        "department": "Executive",
        "bio": "Visionary leader...",
        "avatar": "https://...",
        "socialLinks": [
          { "platform": "linkedin", "url": "https://..." }
        ]
      }
    ],
    "variant": "grid",
    "columns": "3",
    "showModal": true
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}