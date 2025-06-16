import { SchemaRegistry, ComponentExamples, RegistryModule } from "../../types/registry.types";
import { headerSchema } from "../../../../components/blocks/header/header.schema";
import { footerSchema } from "../../../../components/blocks/footer/footer.schema";
import { callToActionSchema } from "../../../../components/blocks/call-to-action/call-to-action.schema";
import { faqSchema } from "../../../../components/blocks/faq/faq.schema";
import { contactFormBlockSchema } from "../../../../components/blocks/contact-form-block/contact-form-block.schema";
import { pricingTableSchema } from "../../../../components/blocks/pricing-table/pricing-table.schema";
import { announcementBarSchema } from "../../../../components/blocks/announcement-bar/announcement-bar.schema";
import { blogPostDetailSchema } from "../../../../components/blocks/blog-post-detail/blog-post-detail.schema";
import { blogPostGridSchema } from "../../../../components/blocks/blog-post-grid/blog-post-grid.schema";
import { brandLogoBarSchema } from "../../../../components/blocks/brand-logo-bar/brand-logo-bar.schema";
import { carouselSchema } from "../../../../components/blocks/carousel/carousel.schema";
import { contactFormSchema } from "../../../../components/blocks/contact-form/contact-form.schema";
import { cookieConsentBannerSchema } from "../../../../components/blocks/cookie-consent-banner/cookie-consent-banner.schema";
import { errorPageSchema } from "../../../../components/blocks/error-page/error-page.schema";
import { eventListingsSchema } from "../../../../components/blocks/event-listings/event-listings.schema";
import { featureCardSchema } from "../../../../components/blocks/feature-card/feature-card.schema";
import { featuresSchema } from "../../../../components/blocks/features/features.schema";
import { iconSchema } from "../../../../components/blocks/icon/icon.schema";
import { jobListingsSchema } from "../../../../components/blocks/job-listings/job-listings.schema";
import { latestNewsSchema } from "../../../../components/blocks/latest-news/latest-news.schema";
import { locationHoursSchema } from "../../../../components/blocks/location-hours/location-hours.schema";

/**
 * Registry for content block components
 */
export const contentBlocksRegistry: RegistryModule = {
  registerSchemas(registry: SchemaRegistry): void {
    // Header
    registry.set("header", { schema: headerSchema });
    
    // Footer
    registry.set("Footer", { schema: footerSchema });
    
    // Call to Action
    registry.set("CallToAction", { schema: callToActionSchema });
    
    // FAQ
    registry.set("FAQ", { schema: faqSchema });
    
    // Contact Form Block
    registry.set("ContactFormBlock", { schema: contactFormBlockSchema });
    
    // Pricing Table
    registry.set("PricingTable", { schema: pricingTableSchema });
    
    // Announcement Bar
    registry.set("AnnouncementBar", { schema: announcementBarSchema });
    
    // Blog Post Detail
    registry.set("BlogPostDetail", { schema: blogPostDetailSchema });
    
    // Blog Post Grid
    registry.set("BlogPostGrid", { schema: blogPostGridSchema });
    
    // Brand Logo Bar
    registry.set("BrandLogoBar", { schema: brandLogoBarSchema });
    
    // Carousel
    registry.set("Carousel", { schema: carouselSchema });
    
    // Contact Form
    registry.set("ContactForm", { schema: contactFormSchema });
    
    // Cookie Consent Banner
    registry.set("CookieConsentBanner", { schema: cookieConsentBannerSchema });
    
    // Error Page
    registry.set("ErrorPage", { schema: errorPageSchema });
    
    // Event Listings
    registry.set("EventListings", { schema: eventListingsSchema });
    
    // Feature Card
    registry.set("FeatureCard", { schema: featureCardSchema });
    
    // Features
    registry.set("Features", { schema: featuresSchema });
    
    // Icon
    registry.set("Icon", { schema: iconSchema });
    
    // Job Listings
    registry.set("JobListings", { schema: jobListingsSchema });
    
    // Latest News
    registry.set("LatestNews", { schema: latestNewsSchema });
    
    // Location Hours
    registry.set("LocationHours", { schema: locationHoursSchema });
  },
  
  registerExamples(examples: ComponentExamples): void {
    // Header examples
    examples.set("header", [
      {
        type: "header",
        logo: {
          type: "text",
          text: "My Company",
          href: "/"
        },
        navigation: [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" }
        ],
        actions: [
          {
            text: "Sign In",
            href: "/signin",
            variant: "outline"
          }
        ],
        sticky: true,
        blur: true
      }
    ]);
    
    // Footer examples
    examples.set("Footer", [
      {
        type: "Footer",
        companyInfo: {
          name: "React Jedi",
          description: "Building modern React interfaces with JSON specifications"
        },
        sections: [
          {
            title: "Product",
            links: [
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" }
            ]
          }
        ],
        copyright: "© 2024 React Jedi. All rights reserved."
      }
    ]);
    
    // Call to Action examples
    examples.set("CallToAction", [
      {
        type: "CallToAction",
        title: "Get Started Today",
        description: "Join thousands of developers building with React Jedi",
        primaryAction: {
          label: "Start Free Trial",
          href: "#"
        }
      }
    ]);
    
    // FAQ examples
    examples.set("FAQ", [
      {
        type: "FAQ",
        items: [
          {
            id: "1",
            question: "What is React Jedi?",
            answer: "React Jedi is a server-driven UI library for building React interfaces with JSON."
          }
        ]
      }
    ]);
    
    // Contact Form Block examples
    examples.set("ContactFormBlock", [
      {
        type: "ContactFormBlock",
        title: "Contact Us",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Name",
            validation: [{ type: "required" }]
          },
          {
            id: "email",
            type: "email",
            label: "Email",
            validation: [{ type: "required" }, { type: "email" }]
          }
        ]
      }
    ]);
    
    // Pricing Table examples
    examples.set("PricingTable", [
      {
        type: "PricingTable",
        tiers: [
          {
            name: "Starter",
            price: 9,
            features: [
              { text: "5 Projects", included: true },
              { text: "Community Support", included: true }
            ],
            cta: {
              text: "Get Started"
            }
          }
        ]
      }
    ]);
    
    // Announcement Bar examples
    examples.set("AnnouncementBar", [
      {
        type: "AnnouncementBar",
        variant: "top-banner",
        message: "🎉 New feature released! Check out our latest updates.",
        actions: [
          { label: "Learn More", variant: "primary" }
        ],
        colorScheme: "info"
      }
    ]);
    
    // Blog Post Detail examples
    examples.set("BlogPostDetail", [
      {
        type: "BlogPostDetail",
        title: "Getting Started with React Jedi",
        content: "# Introduction\n\nReact Jedi is a powerful server-driven UI library...",
        author: {
          name: "John Doe",
          avatar: "https://picsum.photos/100/100"
        },
        publishDate: "2024-01-15",
        categories: ["Tutorial", "React"],
        variant: "centered"
      }
    ]);
    
    // Blog Post Grid examples
    examples.set("BlogPostGrid", [
      {
        type: "BlogPostGrid",
        posts: [
          {
            id: "1",
            title: "Getting Started with React Jedi",
            excerpt: "Learn how to build server-driven UIs with React Jedi.",
            category: "Tutorial",
            author: { name: "John Doe" },
            publishDate: "2024-01-15",
            readTime: 5,
            slug: "getting-started"
          }
        ],
        variant: "cards",
        showFilters: true,
        showSearch: true
      }
    ]);
    
    // Brand Logo Bar examples
    examples.set("BrandLogoBar", [
      {
        type: "BrandLogoBar",
        logos: [
          {
            id: "1",
            name: "Company 1",
            lightSrc: "https://placehold.co/120x60/EEE/31343C",
            darkSrc: "https://placehold.co/120x60/31343C/EEE"
          },
          {
            id: "2",
            name: "Company 2",
            lightSrc: "https://placehold.co/120x60/EEE/31343C",
            darkSrc: "https://placehold.co/120x60/31343C/EEE"
          }
        ],
        variant: "grid",
        heading: "Trusted by leading companies"
      }
    ]);
    
    // Carousel examples
    examples.set("Carousel", [
      {
        type: "Carousel",
        showDots: true,
        autoplay: {
          enabled: true,
          delay: 4000
        },
        variant: "default"
      }
    ]);
    
    // Contact Form examples
    examples.set("ContactForm", [
      {
        type: "ContactForm",
        variant: "simple",
        title: "Contact Us",
        description: "Get in touch with our team",
        submitText: "Send Message",
        animated: true
      }
    ]);
    
    // Cookie Consent Banner examples
    examples.set("CookieConsentBanner", [
      {
        type: "CookieConsentBanner",
        variant: "bottom-banner",
        title: "We use cookies",
        description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.",
        categories: [
          {
            id: "necessary",
            name: "Necessary",
            description: "Essential cookies for the website to function properly",
            required: true
          },
          {
            id: "analytics",
            name: "Analytics",
            description: "Help us understand how visitors interact with the website"
          }
        ]
      }
    ]);
    
    // Error Page examples
    examples.set("ErrorPage", [
      {
        type: "ErrorPage",
        variant: "friendly-404",
        title: "404 - Page Not Found",
        description: "Oops! The page you're looking for seems to have wandered off.",
        homeLink: "/",
        homeLinkText: "Go to Homepage",
        animated: true
      }
    ]);
    
    // Event Listings examples
    examples.set("EventListings", [
      {
        type: "EventListings",
        variant: "cards",
        showSearch: true,
        showFilters: true,
        showCountdown: true,
        showCapacity: true,
        events: [
          {
            id: "1",
            title: "React Conference 2024",
            description: "The biggest React conference of the year",
            startDate: "2024-06-15T09:00:00Z",
            location: { name: "San Francisco Convention Center" },
            category: "Conference",
            price: { amount: 299, currency: "USD" }
          }
        ]
      }
    ]);
    
    // Feature Card examples
    examples.set("FeatureCard", [
      {
        type: "FeatureCard",
        title: "Fast Performance",
        description: "Lightning-fast rendering with optimized components",
        icon: "Zap",
        iconColor: "#3B82F6",
        variant: "default",
        animated: true
      }
    ]);
    
    // Features examples
    examples.set("Features", [
      {
        type: "Features",
        title: "Product Features",
        subtitle: "Everything you need to build modern applications",
        variant: "grid",
        gridColumns: 3,
        animated: true,
        features: [
          {
            id: "1",
            title: "Fast Performance",
            description: "Optimized for speed with lazy loading and code splitting",
            icon: "FiZap",
            category: "Performance",
            benefits: ["Sub-second load times", "Optimized bundle size"]
          },
          {
            id: "2",
            title: "Type Safety",
            description: "Full TypeScript support with comprehensive type definitions",
            icon: "FiShield",
            category: "Development",
            status: "available"
          },
          {
            id: "3",
            title: "Dark Mode",
            description: "Built-in dark mode support with automatic theme detection",
            icon: "FiMoon",
            category: "UI/UX",
            status: "beta"
          }
        ]
      }
    ]);
    
    // Icon examples
    examples.set("Icon", [
      {
        type: "Icon",
        icon: "FiHome",
        size: "md"
      },
      {
        type: "Icon",
        icon: "FiStar",
        size: "lg",
        color: "#FFD700",
        animated: true,
        animationType: "pulse"
      },
      {
        type: "Icon",
        icon: "FiUser",
        variant: "background",
        background: "#E0E7FF",
        size: "xl"
      }
    ]);
    
    // Job Listings examples
    examples.set("JobListings", [
      {
        type: "JobListings",
        variant: "grid",
        showFilters: true,
        showSearch: true,
        showSalary: true,
        jobs: [
          {
            id: "1",
            title: "Senior Frontend Developer",
            department: "Engineering",
            location: "San Francisco, CA",
            type: "full-time",
            salaryRange: {
              min: 120_000,
              max: 180_000,
              currency: "$",
              period: "yearly"
            },
            description: "We're looking for an experienced frontend developer to join our team and help build the next generation of our product.",
            requirements: [
              "5+ years of React experience",
              "Strong TypeScript skills",
              "Experience with modern CSS"
            ],
            posted: "2024-01-15",
            featured: true,
            experienceLevel: "senior"
          },
          {
            id: "2",
            title: "Product Designer",
            department: "Design",
            location: "Remote",
            type: "remote",
            description: "Join our design team to create beautiful and intuitive user experiences.",
            posted: "2024-01-10",
            experienceLevel: "mid"
          }
        ]
      }
    ]);
    
    // Latest News examples
    examples.set("LatestNews", [
      {
        type: "LatestNews",
        heading: "Latest Updates",
        variant: "cards-row",
        count: 3,
        showCategoryTabs: true,
        animated: true,
        articles: [
          {
            id: "1",
            title: "Introducing Our New Dashboard",
            excerpt: "We've completely redesigned our dashboard with a focus on usability and performance.",
            category: "Product",
            date: "2024-01-20",
            author: {
              name: "Sarah Johnson",
              avatar: "https://picsum.photos/100/100?random=1"
            },
            thumbnail: "https://picsum.photos/400/300?random=1",
            url: "/blog/new-dashboard",
            readTime: "5 min read"
          },
          {
            id: "2",
            title: "Best Practices for React Development",
            excerpt: "Learn the latest best practices for building scalable React applications.",
            category: "Engineering",
            date: "2024-01-18",
            author: {
              name: "Mike Chen",
              avatar: "https://picsum.photos/100/100?random=2"
            },
            url: "/blog/react-best-practices",
            readTime: "8 min read"
          }
        ],
        viewAllUrl: "/blog",
        viewAllText: "View All Articles"
      }
    ]);
    
    // Location Hours examples
    examples.set("LocationHours", [
      {
        type: "LocationHours",
        variant: "single-location",
        showCurrentStatus: true,
        showContactInfo: true,
        showMap: false,
        locations: [
          {
            id: "1",
            name: "Downtown Store",
            description: "Our flagship location in the heart of the city",
            businessHours: [
              { day: "monday", openTime: "09:00", closeTime: "18:00" },
              { day: "tuesday", openTime: "09:00", closeTime: "18:00" },
              { day: "wednesday", openTime: "09:00", closeTime: "18:00" },
              { day: "thursday", openTime: "09:00", closeTime: "20:00" },
              { day: "friday", openTime: "09:00", closeTime: "20:00" },
              { day: "saturday", openTime: "10:00", closeTime: "17:00" },
              { day: "sunday", openTime: "12:00", closeTime: "17:00" }
            ],
            contact: {
              phone: "(555) 123-4567",
              email: "downtown@example.com",
              address: {
                street: "123 Main Street",
                city: "San Francisco",
                state: "CA",
                zipCode: "94105"
              },
              website: "https://example.com/downtown"
            },
            services: ["In-store pickup", "Personal shopping", "Gift wrapping"],
            timezone: "America/Los_Angeles"
          }
        ]
      }
    ]);
  }
};