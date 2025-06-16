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
import { mapSchema } from "../../../../components/blocks/map/map.schema";
import { newsletterSignupSchema } from "../../../../components/blocks/newsletter-signup/newsletter-signup.schema";
import { pageHeroHeaderSchema } from "../../../../components/blocks/page-hero-header/page-hero-header.schema";
import { pageSectionSchema } from "../../../../components/blocks/page-section/page-section.schema";
import { photoFlipCardSchema } from "../../../../components/blocks/photo-flip-card/photo-flip-card.schema";
import { photoGallerySchema } from "../../../../components/blocks/photo-gallery/photo-gallery.schema";
import { portfolioCaseStudiesSchema } from "../../../../components/blocks/portfolio-case-studies/portfolio-case-studies.schema";
import { processStepsSchema } from "../../../../components/blocks/process-steps/process-steps.schema";
import { productShowcaseSchema } from "../../../../components/blocks/product-showcase/product-showcase.schema";
import { restaurantMenuSchema } from "../../../../components/blocks/restaurant-menu/restaurant-menu.schema";
import { serviceListSchema } from "../../../../components/blocks/service-list/service-list.schema";
import { sidebarSchema, sidebarProviderSchema, sidebarInsetSchema, sidebarTriggerSchema } from "../../../../components/blocks/sidebar/sidebar.schema";
import { socialShareBarSchema } from "../../../../components/blocks/social-share-bar/social-share-bar.schema";
import { statBlockSchema } from "../../../../components/blocks/stat-block/stat-block.schema";
import { teamGridSchema } from "../../../../components/blocks/team-grid/team-grid.schema";
import { testimonialSchema } from "../../../../components/blocks/testimonial/testimonial.schema";
import { timelineSchema } from "../../../../components/blocks/timeline/timeline.schema";
import { typewriterTextSchema } from "../../../../components/blocks/typewriter-text/typewriter-text.schema";

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
    
    // Map
    registry.set("map", { schema: mapSchema });
    
    // Newsletter Signup
    registry.set("newsletter-signup", { schema: newsletterSignupSchema });
    
    // Page Hero Header
    registry.set("page-hero-header", { schema: pageHeroHeaderSchema });
    
    // Page Section
    registry.set("page-section", { schema: pageSectionSchema });
    
    // Photo Flip Card
    registry.set("photo-flip-card", { schema: photoFlipCardSchema });
    
    // Photo Gallery
    registry.set("PhotoGallery", { schema: photoGallerySchema });
    
    // Portfolio Case Studies
    registry.set("PortfolioCaseStudies", { schema: portfolioCaseStudiesSchema });
    
    // Process Steps
    registry.set("ProcessSteps", { schema: processStepsSchema });
    
    // Product Showcase
    registry.set("ProductShowcase", { schema: productShowcaseSchema });
    
    // Restaurant Menu
    registry.set("RestaurantMenu", { schema: restaurantMenuSchema });
    
    // Service List
    registry.set("ServiceList", { schema: serviceListSchema });
    
    // Sidebar components
    registry.set("Sidebar", { schema: sidebarSchema });
    registry.set("SidebarProvider", { schema: sidebarProviderSchema });
    registry.set("SidebarInset", { schema: sidebarInsetSchema });
    registry.set("SidebarTrigger", { schema: sidebarTriggerSchema });
    
    // Social Share Bar
    registry.set("SocialShareBar", { schema: socialShareBarSchema });
    
    // Stat Block
    registry.set("StatBlock", { schema: statBlockSchema });
    
    // Team Grid
    registry.set("TeamGrid", { schema: teamGridSchema });
    
    // Testimonial
    registry.set("Testimonial", { schema: testimonialSchema });
    
    // Timeline
    registry.set("Timeline", { schema: timelineSchema });
    
    // Typewriter Text
    registry.set("TypewriterText", { schema: typewriterTextSchema });
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
    
    // Map examples
    examples.set("map", [
      {
        type: "map",
        variant: "embedded",
        height: 400,
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
        markers: [
          {
            id: "hq",
            position: { lat: 37.7749, lng: -122.4194 },
            title: "Headquarters",
            infoWindow: {
              title: "Main Office",
              content: "Our main headquarters location"
            }
          }
        ],
        showZoomControls: true,
        enableScrollZoom: false
      }
    ]);
    
    // Newsletter Signup examples
    examples.set("newsletter-signup", [
      {
        type: "newsletter-signup",
        variant: "inline",
        title: "Stay Updated",
        description: "Get the latest news and updates delivered to your inbox",
        emailPlaceholder: "Enter your email",
        submitButtonText: "Subscribe",
        showGdprCheckbox: true,
        gdprText: "I agree to receive marketing emails",
        animated: true
      }
    ]);
    
    // Page Hero Header examples
    examples.set("page-hero-header", [
      {
        type: "page-hero-header",
        variant: "centered",
        title: "Welcome to React Jedi",
        subtitle: "Build Amazing UIs with JSON",
        description: "The most powerful server-driven UI library for React applications",
        primaryCTA: {
          label: "Get Started",
          href: "/docs",
          variant: "default",
          icon: "arrow"
        },
        secondaryCTA: {
          label: "View Demo",
          href: "/demo",
          variant: "outline"
        },
        badges: [
          { text: "v2.0 Released", variant: "secondary" }
        ],
        height: "large",
        animated: true
      }
    ]);
    
    // Page Section examples
    examples.set("page-section", [
      {
        type: "page-section",
        variant: "contained",
        layout: {
          type: "centered",
          contentWidth: "medium"
        },
        heading: {
          title: "Our Features",
          subtitle: "Everything you need",
          alignment: "center"
        },
        description: "Discover the powerful features that make React Jedi the best choice for your next project",
        padding: "lg",
        animate: true,
        children: []
      }
    ]);
    
    // Photo Flip Card examples
    examples.set("photo-flip-card", [
      {
        type: "photo-flip-card",
        frontImage: "https://picsum.photos/400/600",
        title: "Amazing Product",
        description: "Discover our latest innovation",
        overlay: {
          title: "Learn More",
          description: "Click to explore features and benefits",
          badge: "New"
        },
        cta: {
          text: "View Details",
          href: "/product"
        },
        variant: "vertical-flip",
        size: "md",
        animated: true
      }
    ]);
    
    // Photo Gallery examples
    examples.set("PhotoGallery", [
      {
        type: "PhotoGallery",
        photos: [
          {
            id: "1",
            src: "https://picsum.photos/800/600",
            alt: "Beautiful landscape",
            title: "Mountain View",
            description: "A stunning mountain landscape",
            category: "Nature"
          },
          {
            id: "2",
            src: "https://picsum.photos/600/800",
            alt: "Portrait photo",
            title: "Urban Portrait",
            category: "Portrait"
          }
        ],
        variant: "grid",
        columns: 3,
        enableLightbox: true,
        enableZoom: true,
        animated: true
      }
    ]);
    
    // Portfolio Case Studies examples
    examples.set("PortfolioCaseStudies", [
      {
        type: "PortfolioCaseStudies",
        projects: [
          {
            id: "1",
            title: "E-commerce Platform Redesign",
            client: "TechCorp Inc.",
            description: "Complete redesign of the e-commerce platform to improve user experience and conversion rates.",
            category: "Web Development",
            technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
            featuredImage: "https://picsum.photos/800/600",
            completedDate: "2024-01-15",
            slug: "ecommerce-redesign",
            results: [
              { label: "Conversion Rate", value: "+45%" },
              { label: "Page Load Time", value: "-60%" }
            ]
          }
        ],
        variant: "grid",
        showFilters: true,
        showSearch: true
      }
    ]);
    
    // Process Steps examples
    examples.set("ProcessSteps", [
      {
        type: "ProcessSteps",
        steps: [
          {
            title: "Discovery",
            description: "Understanding your requirements and goals",
            status: "completed"
          },
          {
            title: "Design",
            description: "Creating wireframes and mockups",
            status: "current"
          },
          {
            title: "Development",
            description: "Building your solution",
            status: "upcoming"
          },
          {
            title: "Launch",
            description: "Deploying to production",
            status: "upcoming"
          }
        ],
        variant: "horizontal",
        showConnectors: true,
        animated: true
      }
    ]);
    
    // Product Showcase examples
    examples.set("ProductShowcase", [
      {
        type: "ProductShowcase",
        products: [
          {
            id: "1",
            name: "Premium Headphones",
            description: "High-quality wireless headphones with noise cancellation",
            price: 299.99,
            salePrice: 249.99,
            images: ["https://picsum.photos/400/400"],
            category: "Electronics",
            inStock: true,
            rating: 4.5,
            reviewCount: 128
          },
          {
            id: "2",
            name: "Smart Watch",
            description: "Feature-rich smartwatch with health tracking",
            price: 399.99,
            images: ["https://picsum.photos/400/400"],
            category: "Electronics",
            inStock: true,
            featured: true
          }
        ],
        variant: "grid",
        columns: 3,
        showRatings: true,
        animated: true
      }
    ]);
    
    // Restaurant Menu examples
    examples.set("RestaurantMenu", [
      {
        type: "RestaurantMenu",
        title: "Our Menu",
        categories: [
          {
            id: "appetizers",
            name: "Appetizers",
            description: "Start your meal with our delicious appetizers",
            items: [
              {
                id: "1",
                name: "Bruschetta",
                description: "Grilled bread topped with fresh tomatoes, garlic, and basil",
                price: 8.99,
                dietaryRestrictions: ["vegetarian"],
                isPopular: true
              },
              {
                id: "2",
                name: "Calamari Fritti",
                description: "Crispy fried squid rings served with marinara sauce",
                price: 12.99,
                allergens: ["shellfish"]
              }
            ]
          },
          {
            id: "mains",
            name: "Main Courses",
            items: [
              {
                id: "3",
                name: "Grilled Salmon",
                description: "Fresh Atlantic salmon with lemon butter sauce",
                price: 24.99,
                dietaryRestrictions: ["gluten-free"],
                allergens: ["fish"]
              }
            ]
          }
        ],
        layout: "categorized",
        showImages: true,
        showFilters: true,
        currency: "$"
      }
    ]);
    
    // Service List examples
    examples.set("ServiceList", [
      {
        type: "ServiceList",
        services: [
          {
            id: "1",
            icon: "cloud",
            title: "Cloud Storage",
            description: "Secure and scalable cloud storage solution",
            features: ["Unlimited storage", "99.9% uptime", "Auto-backup"],
            pricing: { price: "9.99", period: "month" },
            ctaText: "Get Started",
            ctaLink: "#"
          },
          {
            id: "2",
            icon: "shield",
            title: "Security Suite",
            description: "Enterprise-grade security for your business",
            features: ["Real-time monitoring", "Threat detection", "Firewall protection"],
            pricing: { price: "29.99", period: "month" },
            badge: "popular",
            ctaText: "Start Free Trial",
            ctaLink: "#"
          }
        ],
        variant: "cards",
        columns: 3,
        animated: true
      }
    ]);
    
    // Sidebar examples
    examples.set("Sidebar", [
      {
        type: "Sidebar",
        header: {
          children: [
            {
              items: [
                {
                  label: "Dashboard",
                  icon: "home",
                  href: "/#"
                }
              ]
            }
          ]
        },
        content: {
          groups: [
            {
              label: "Main Menu",
              items: [
                {
                  label: "Projects",
                  icon: "folder",
                  href: "/#"
                },
                {
                  label: "Documents",
                  icon: "file",
                  href: "/#"
                }
              ]
            }
          ]
        }
      }
    ]);
    
    // Social Share Bar examples
    examples.set("SocialShareBar", [
      {
        type: "SocialShareBar",
        url: "https://example.com/article",
        title: "Check out this article!",
        variant: "horizontal",
        platforms: ["twitter", "facebook", "linkedin", "email", "copy"],
        showLabels: true,
        animated: true
      }
    ]);
    
    // Stat Block examples
    examples.set("StatBlock", [
      {
        type: "StatBlock",
        variant: "grid",
        stats: [
          {
            label: "Total Revenue",
            value: 125_000,
            prefix: "$",
            icon: "dollar",
            trend: { value: 12.5, direction: "up", label: "vs last month" }
          },
          {
            label: "Active Users",
            value: 5234,
            icon: "users",
            trend: { value: 8.2, direction: "up" }
          },
          {
            label: "Conversion Rate",
            value: "3.4",
            suffix: "%",
            icon: "target",
            trend: { value: -2.1, direction: "down" }
          }
        ],
        columns: 3,
        showTrend: true,
        showIcon: true,
        animated: true
      }
    ]);
    
    // Team Grid examples
    examples.set("TeamGrid", [
      {
        type: "TeamGrid",
        members: [
          {
            id: "1",
            name: "Sarah Johnson",
            role: "CEO & Founder",
            department: "Executive",
            bio: "Visionary leader with 15+ years of experience",
            avatar: "https://placehold.co/150x150/EEE/31343C",
            email: "sarah@company.com",
            socialLinks: [
              { platform: "linkedin", url: "https://linkedin.com/in/sarah" },
              { platform: "twitter", url: "https://twitter.com/sarah" }
            ]
          },
          {
            id: "2",
            name: "Michael Chen",
            role: "CTO",
            department: "Engineering",
            bio: "Full-stack engineer turned technical leader",
            avatar: "https://placehold.co/150x150/EEE/31343C",
            email: "michael@company.com",
            socialLinks: [
              { platform: "linkedin", url: "https://linkedin.com/in/michael" }
            ]
          }
        ],
        variant: "grid",
        columns: "3",
        showSocialLinks: true,
        showModal: true,
        animated: true
      }
    ]);
    
    // Testimonial examples
    examples.set("Testimonial", [
      {
        type: "Testimonial",
        testimonials: {
          id: "1",
          author: {
            name: "Sarah Chen",
            role: "Product Designer",
            company: "Tech Corp",
            avatar: "https://placehold.co/150x150/EEE/31343C",
            companyLogo: "https://logo.clearbit.com/google.com"
          },
          content: "This library has transformed how we build UI components. The Server-Driven UI approach allows us to iterate faster and deliver beautiful experiences to our users.",
          rating: 5,
          date: "November 2024",
          source: {
            platform: "Twitter",
            url: "https://twitter.com/example"
          }
        },
        variant: "single",
        layout: "card",
        animated: true
      }
    ]);
    
    // Timeline examples
    examples.set("Timeline", [
      {
        type: "Timeline",
        items: [
          {
            id: "1",
            date: "2019-03-15",
            title: "Company Founded",
            description: "Started with a vision to revolutionize the industry",
            isMilestone: true,
            isPast: true,
            badge: "Beginning"
          },
          {
            id: "2",
            date: "2020-06-10",
            title: "Series A Funding",
            description: "Secured $10M in funding to accelerate growth",
            isMilestone: true,
            isPast: true,
            badge: "Milestone"
          },
          {
            id: "3",
            date: "2023-11-01",
            title: "Award Recognition",
            description: "Named 'Startup of the Year' by Tech Magazine",
            isMilestone: true,
            isPast: true,
            badge: "Achievement"
          }
        ],
        variant: "vertical-centered",
        lineStyle: "solid",
        animated: true
      }
    ]);
    
    // Typewriter Text examples
    examples.set("TypewriterText", [
      {
        type: "TypewriterText",
        variant: "basic",
        texts: "Hello, welcome to React Jedi!",
        typeSpeed: 50,
        textSize: "2xl",
        fontWeight: "semibold",
        textColor: "#2563eb",
        cursorColor: "#2563eb",
        showCursor: true,
        cursorBlink: true,
        animated: true
      }
    ]);
  }
};