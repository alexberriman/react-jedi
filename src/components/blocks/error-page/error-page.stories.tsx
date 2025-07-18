import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ErrorPage } from "./error-page";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import {
  BookOpen,
  ShoppingCart,
  Newspaper,
  UtensilsCrossed,
  Monitor,
  Palette,
  Building2,
  Star,
  Phone,
  Coffee,
  Home,
  Mail,
  Calendar,
  User,
  Heart,
} from "lucide-react";

const meta = {
  title: "Blocks/ErrorPage",
  component: ErrorPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "friendly-404",
        "technical-error",
        "maintenance",
        "coming-soon",
        "search-suggestions",
        "blog",
        "ecommerce",
        "magazine",
        "restaurant",
        "saas",
        "portfolio",
        "corporate",
      ],
    },
    siteType: {
      control: "select",
      options: ["blog", "ecommerce", "magazine", "restaurant", "saas", "portfolio", "corporate"],
    },
    animated: {
      control: "boolean",
    },
    showIcon: {
      control: "boolean",
    },
    showBreadcrumb: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Popular links for examples
const popularLinks = [
  {
    label: "Homepage",
    href: "/",
    description: "Return to the main page",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Documentation",
    href: "/docs",
    description: "Browse our guides",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    label: "Support",
    href: "/support",
    description: "Get help from our team",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Read our latest posts",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    label: "Status",
    href: "/status",
    description: "Check system status",
    icon: <Monitor className="h-4 w-4" />,
  },
];

// Website-type specific popular links
const blogLinks = [
  {
    label: "Latest Articles",
    href: "/articles",
    description: "Read our newest posts",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    label: "Categories",
    href: "/categories",
    description: "Browse by topic",
    icon: <Star className="h-4 w-4" />,
  },
  {
    label: "About the Author",
    href: "/about",
    description: "Learn more about me",
    icon: <User className="h-4 w-4" />,
  },
  {
    label: "Subscribe",
    href: "/subscribe",
    description: "Get updates via email",
    icon: <Mail className="h-4 w-4" />,
  },
];

const ecommerceLinks = [
  {
    label: "Best Sellers",
    href: "/bestsellers",
    description: "Our most popular items",
    icon: <Star className="h-4 w-4" />,
  },
  {
    label: "New Arrivals",
    href: "/new",
    description: "Latest products",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    label: "Sale Items",
    href: "/sale",
    description: "Great deals and discounts",
    icon: <Heart className="h-4 w-4" />,
  },
  {
    label: "Customer Service",
    href: "/support",
    description: "Need help with your order?",
    icon: <Phone className="h-4 w-4" />,
  },
];

const restaurantLinks = [
  {
    label: "Our Menu",
    href: "/menu",
    description: "View our full menu",
    icon: <UtensilsCrossed className="h-4 w-4" />,
  },
  {
    label: "Reservations",
    href: "/reservations",
    description: "Book a table",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    label: "Location & Hours",
    href: "/location",
    description: "Find us and our hours",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    label: "Order Online",
    href: "/order",
    description: "Get delivery or takeout",
    icon: <Coffee className="h-4 w-4" />,
  },
];

const portfolioLinks = [
  {
    label: "Featured Work",
    href: "/portfolio",
    description: "My best projects",
    icon: <Palette className="h-4 w-4" />,
  },
  {
    label: "About Me",
    href: "/about",
    description: "Learn more about my background",
    icon: <User className="h-4 w-4" />,
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Let's work together",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Thoughts and insights",
    icon: <BookOpen className="h-4 w-4" />,
  },
];

export const Friendly404: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "friendly-404",
      popularLinks: popularLinks.slice(0, 3),
      contactEmail: "support@example.com",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that the error page renders with default 404 content
      expect(canvas.getByText("404 - Page Not Found")).toBeInTheDocument();
      expect(canvas.getByText(/Oops! The page you're looking for seems to have wandered off/)).toBeInTheDocument();
      
      // Test popular links
      expect(canvas.getByText("Homepage")).toBeInTheDocument();
      expect(canvas.getByText("Documentation")).toBeInTheDocument();
      expect(canvas.getByText("Support")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "friendly-404",
      popularLinks: popularLinks.slice(0, 3),
      contactEmail: "support@example.com",
    },
  }
) as Story;

export const Friendly404WithSearch: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "friendly-404",
      popularLinks,
      searchConfig: {
        enabled: true,
        placeholder: "Search for pages...",
        searchAction: "/search",
      },
      contactEmail: "support@example.com",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that the error page renders with 404 content
      expect(canvas.getByText("404 - Page Not Found")).toBeInTheDocument();
      
      // Test search functionality
      expect(canvas.getByPlaceholderText("Search for pages...")).toBeInTheDocument();
      
      // Test all popular links are rendered
      for (const link of popularLinks) {
        expect(canvas.getByText(link.label)).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "friendly-404",
      popularLinks,
      searchConfig: {
        enabled: true,
        placeholder: "Search for pages...",
        searchAction: "/search",
      },
      contactEmail: "support@example.com",
    },
  }
) as Story;

export const Friendly404WithBreadcrumb: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "friendly-404",
      showBreadcrumb: true,
      breadcrumbItems: [
        { label: "Products", href: "/products" },
        { label: "Electronics", href: "/products/electronics" },
        { label: "Not Found" },
      ],
      popularLinks: popularLinks.slice(0, 4),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that the error page renders with 404 content
      expect(canvas.getByText("404 - Page Not Found")).toBeInTheDocument();
      
      // Test breadcrumb items
      expect(canvas.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(canvas.getByRole("link", { name: "Products" })).toBeInTheDocument();
      expect(canvas.getByRole("link", { name: "Electronics" })).toBeInTheDocument();
      expect(canvas.getByText("Not Found")).toBeInTheDocument();
      
      // Test popular links
      expect(canvas.getByText("Homepage")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "friendly-404",
      showBreadcrumb: true,
      breadcrumbItems: [
        { label: "Products", href: "/products" },
        { label: "Electronics", href: "/products/electronics" },
        { label: "Not Found" },
      ],
      popularLinks: popularLinks.slice(0, 4),
    },
  }
) as Story;

export const Friendly404CustomContent: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "friendly-404",
      title: "Oops! Lost in Space",
      description:
        "Houston, we have a problem. The page you're looking for has drifted into the cosmos.",
      image: "https://placehold.co/400x300/EEE/31343C",
      showIcon: false,
      popularLinks: popularLinks.slice(0, 3),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test custom title and description
      expect(canvas.getByText("Oops! Lost in Space")).toBeInTheDocument();
      expect(canvas.getByText(/Houston, we have a problem/)).toBeInTheDocument();
      
      // Test image renders
      const image = canvas.getByAltText("Oops! Lost in Space");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "https://placehold.co/400x300/EEE/31343C");
      
      // Test no icon is shown
      expect(canvas.queryByTestId("error-icon")).not.toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "friendly-404",
      title: "Oops! Lost in Space",
      description:
        "Houston, we have a problem. The page you're looking for has drifted into the cosmos.",
      image: "https://placehold.co/400x300/EEE/31343C",
      showIcon: false,
      popularLinks: popularLinks.slice(0, 3),
    },
  }
) as Story;

export const TechnicalError: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "technical-error",
      contactEmail: "support@example.com",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test technical error content
      expect(canvas.getByText("500 - Server Error")).toBeInTheDocument();
      expect(canvas.getByText(/Something went wrong on our end/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "technical-error",
      contactEmail: "support@example.com",
    },
  }
) as Story;

export const TechnicalErrorDetailed: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "technical-error",
      title: "500 - Internal Server Error",
      description:
        "An unexpected error occurred while processing your request. Error ID: ERR_2024_001. Our engineering team has been automatically notified.",
      contactEmail: "support@example.com",
      customActions: [
        { label: "Retry", onClick: () => globalThis.location.reload() },
        { label: "System Status", href: "/status" },
      ],
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test custom technical error content
      expect(canvas.getByText("500 - Internal Server Error")).toBeInTheDocument();
      expect(canvas.getByText(/An unexpected error occurred/)).toBeInTheDocument();
      expect(canvas.getByText(/Error ID: ERR_2024_001/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "technical-error",
      title: "500 - Internal Server Error",
      description:
        "An unexpected error occurred while processing your request. Error ID: ERR_2024_001. Our engineering team has been automatically notified.",
      contactEmail: "support@example.com",
      customActions: [
        { label: "Retry", href: "#" },
        { label: "System Status", href: "/status" },
      ],
    },
  }
) as Story;

export const Maintenance: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "maintenance",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test maintenance content
      expect(canvas.getByText("Under Maintenance")).toBeInTheDocument();
      expect(canvas.getByText(/We're currently performing scheduled maintenance/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "maintenance",
    },
  }
) as Story;

export const MaintenanceWithTimer: Story = {
  args: {
    variant: "maintenance",
    title: "Scheduled Maintenance",
    description:
      "We are performing system upgrades to enhance your experience. Expected completion time: 2:00 AM EST.",
    customActions: [
      { label: "Check Status", href: "/status", variant: "default" },
      { label: "Follow Updates", href: "https://twitter.com/example", variant: "outline" },
    ],
  },
};

export const ComingSoon: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "coming-soon",
      countdownDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test coming soon content
      expect(canvas.getByText("Coming Soon")).toBeInTheDocument();
      expect(canvas.getByText(/Something exciting is in the works/)).toBeInTheDocument();
      
      // Test countdown is visible
      expect(canvas.getByText("Launching in:")).toBeInTheDocument();
      expect(canvas.getByText("Days")).toBeInTheDocument();
      expect(canvas.getByText("Hours")).toBeInTheDocument();
      expect(canvas.getByText("Minutes")).toBeInTheDocument();
      expect(canvas.getByText("Seconds")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "coming-soon",
      countdownDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  }
) as Story;

export const ComingSoonCustom: Story = {
  args: {
    variant: "coming-soon",
    title: "New Feature Launching Soon!",
    description:
      "Get ready for our revolutionary new dashboard. Sign up to be notified when we launch.",
    countdownDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    countdownMessage: "Launching in:",
    customActions: [
      { label: "Get Notified", href: "#notify", variant: "default" },
      { label: "Learn More", href: "#learn", variant: "outline" },
    ],
  },
};

export const SearchSuggestions: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "search-suggestions",
      searchConfig: {
        enabled: true,
        placeholder: "What are you looking for?",
        onSearch: (query) => console.log("Searching for:", query),
      },
      popularLinks,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test search suggestions content
      expect(canvas.getByText("Can't Find What You're Looking For?")).toBeInTheDocument();
      
      // Test search input
      expect(canvas.getByPlaceholderText("What are you looking for?")).toBeInTheDocument();
      
      // Test popular links are displayed
      for (const link of popularLinks) {
        expect(canvas.getByText(link.label)).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "search-suggestions",
      searchConfig: {
        enabled: true,
        placeholder: "What are you looking for?",
      },
      popularLinks,
    },
  }
) as Story;

export const SearchSuggestionsWithCategories: Story = {
  args: {
    variant: "search-suggestions",
    title: "Let's Find What You Need",
    description: "Use the search below or browse our most visited sections.",
    searchConfig: {
      enabled: true,
      placeholder: "Search docs, products, support...",
      searchAction: "/search",
    },
    popularLinks: [
      {
        label: "Getting Started Guide",
        href: "/docs/getting-started",
        description: "New to our platform?",
      },
      { label: "API Reference", href: "/docs/api", description: "Technical documentation" },
      { label: "Pricing Plans", href: "/pricing", description: "Find the right plan" },
      { label: "Feature Requests", href: "/feedback", description: "Suggest new features" },
      { label: "Community Forum", href: "/community", description: "Connect with users" },
      { label: "Video Tutorials", href: "/tutorials", description: "Learn by watching" },
    ],
  },
};

export const CustomErrorPage: Story = {
  args: {
    variant: "friendly-404",
    title: "Page Temporarily Unavailable",
    description: "This page is being updated with fresh content. Check back soon!",
    showIcon: false,
    children: (
      <div className="p-6 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-2">What you can do:</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Double-check the URL for typos</li>
          <li>Use the search bar to find what you need</li>
          <li>Browse our popular pages below</li>
          <li>Contact our support team for assistance</li>
        </ul>
      </div>
    ),
    popularLinks: popularLinks.slice(0, 3),
    contactEmail: "help@example.com",
  },
};

export const NoAnimation: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "friendly-404",
      animated: false,
      popularLinks: popularLinks.slice(0, 3),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that the error page renders without animation
      expect(canvas.getByText("404 - Page Not Found")).toBeInTheDocument();
      expect(canvas.getByText(/Oops! The page you're looking for seems to have wandered off/)).toBeInTheDocument();
      
      // Test popular links
      expect(canvas.getByText("Homepage")).toBeInTheDocument();
      expect(canvas.getByText("Documentation")).toBeInTheDocument();
      expect(canvas.getByText("Support")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "friendly-404",
      animated: false,
      popularLinks: popularLinks.slice(0, 3),
    },
  }
) as Story;

export const MinimalError: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "friendly-404",
      title: "404",
      description: "Page not found",
      showIcon: true,
      homeLinkText: "Home",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test minimal error content
      expect(canvas.getByText("404")).toBeInTheDocument();
      expect(canvas.getByText("Page not found")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "friendly-404",
      title: "404",
      description: "Page not found",
      showIcon: true,
      homeLinkText: "Home",
    },
  }
) as Story;

export const AllFeatures: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      variant: "search-suggestions",
      showBreadcrumb: true,
      breadcrumbItems: [{ label: "Store", href: "/store" }, { label: "Search" }],
      searchConfig: {
        enabled: true,
        placeholder: "Search our store...",
        searchAction: "/search",
      },
      popularLinks,
      contactEmail: "support@example.com",
      customActions: [
        { label: "View Cart", href: "/cart", variant: "outline" },
        { label: "Track Order", href: "/orders", variant: "outline" },
      ],
      children: (
        <div className="text-sm text-muted-foreground">
          <p>
            Can&apos;t find what you&apos;re looking for? Our customer service team is here to help!
          </p>
          <p className="mt-2">Call us: 1-800-EXAMPLE | Hours: Mon-Fri 9AM-5PM EST</p>
        </div>
      ),
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test search suggestions content
      expect(canvas.getByText("Can't Find What You're Looking For?")).toBeInTheDocument();
      
      // Test breadcrumb
      expect(canvas.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(canvas.getByRole("link", { name: "Store" })).toBeInTheDocument();
      expect(canvas.getByText("Search")).toBeInTheDocument();
      
      // Test search functionality
      expect(canvas.getByPlaceholderText("Search our store...")).toBeInTheDocument();
      
      // Test popular links are displayed
      for (const link of popularLinks) {
        expect(canvas.getByText(link.label)).toBeInTheDocument();
      }
      
      // Test custom children content
      expect(canvas.getByText(/Can't find what you're looking for\? Our customer service team is here to help!/)).toBeInTheDocument();
      expect(canvas.getByText(/Call us: 1-800-EXAMPLE/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      variant: "search-suggestions",
      showBreadcrumb: true,
      breadcrumbItems: [{ label: "Store", href: "/store" }, { label: "Search" }],
      searchConfig: {
        enabled: true,
        placeholder: "Search our store...",
        searchAction: "/search",
      },
      popularLinks,
      contactEmail: "support@example.com",
      customActions: [
        { label: "View Cart", href: "/cart", variant: "outline" },
        { label: "Track Order", href: "/orders", variant: "outline" },
      ],
      children: [
        {
          type: "Box",
          className: "text-sm text-muted-foreground",
          children: [
            {
              type: "Text",
              as: "p",
              children: "Can't find what you're looking for? Our customer service team is here to help!"
            },
            {
              type: "Text",
              as: "p",
              className: "mt-2",
              children: "Call us: 1-800-EXAMPLE | Hours: Mon-Fri 9AM-5PM EST"
            }
          ]
        }
      ],
    },
  }
) as Story;

// ===== WEBSITE-TYPE SPECIFIC STORIES =====

export const BlogErrorPage: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      siteType: "blog",
      popularLinks: blogLinks,
      searchConfig: {
        enabled: true,
        placeholder: "Search articles and topics...",
        searchAction: "/search",
      },
      contactEmail: "hello@myblog.com",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test blog error page content
      expect(canvas.getByText("Article Not Found")).toBeInTheDocument();
      expect(canvas.getByText(/The article you're looking for might have been moved/)).toBeInTheDocument();
      
      // Test search functionality
      expect(canvas.getByPlaceholderText("Search articles and topics...")).toBeInTheDocument();
      
      // Test blog-specific links
      expect(canvas.getByText("Latest Articles")).toBeInTheDocument();
      expect(canvas.getByText("Categories")).toBeInTheDocument();
      expect(canvas.getByText("About the Author")).toBeInTheDocument();
      expect(canvas.getByText("Subscribe")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      siteType: "blog",
      popularLinks: blogLinks,
      searchConfig: {
        enabled: true,
        placeholder: "Search articles and topics...",
        searchAction: "/search",
      },
      contactEmail: "hello@myblog.com",
    },
  }
) as Story;

export const EcommerceErrorPage: Story = enhanceStoryForDualMode<typeof ErrorPage>(
  {
    args: {
      siteType: "ecommerce",
      popularLinks: ecommerceLinks,
      searchConfig: {
        enabled: true,
        placeholder: "Search products...",
        searchAction: "/search",
      },
      contactEmail: "support@shop.com",
      customActions: [
        { label: "View Cart", href: "/cart", variant: "outline" },
        { label: "Track Order", href: "/orders", variant: "outline" },
        { label: "Live Chat", href: "/chat", variant: "ghost" },
      ],
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test ecommerce error page content
      expect(canvas.getByText("Product Not Found")).toBeInTheDocument();
      expect(canvas.getByText(/Sorry, the product you're looking for is currently unavailable/)).toBeInTheDocument();
      
      // Test search functionality
      expect(canvas.getByPlaceholderText("Search products...")).toBeInTheDocument();
      
      // Test ecommerce-specific links
      expect(canvas.getByText("Best Sellers")).toBeInTheDocument();
      expect(canvas.getByText("New Arrivals")).toBeInTheDocument();
      expect(canvas.getByText("Sale Items")).toBeInTheDocument();
      expect(canvas.getByText("Customer Service")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "ErrorPage",
      siteType: "ecommerce",
      popularLinks: ecommerceLinks,
      searchConfig: {
        enabled: true,
        placeholder: "Search products...",
        searchAction: "/search",
      },
      contactEmail: "support@shop.com",
      customActions: [
        { label: "View Cart", href: "/cart", variant: "outline" },
        { label: "Track Order", href: "/orders", variant: "outline" },
        { label: "Live Chat", href: "/chat", variant: "ghost" },
      ],
    },
  }
) as Story;

export const MagazineErrorPage: Story = {
  args: {
    siteType: "magazine",
    popularLinks: [
      {
        label: "Latest Stories",
        href: "/latest",
        description: "Our newest articles",
        icon: <Newspaper className="h-4 w-4" />,
      },
      {
        label: "Trending",
        href: "/trending",
        description: "Most popular content",
        icon: <Star className="h-4 w-4" />,
      },
      {
        label: "Subscribe",
        href: "/subscribe",
        description: "Get our newsletter",
        icon: <Mail className="h-4 w-4" />,
      },
      {
        label: "Archives",
        href: "/archives",
        description: "Browse past issues",
        icon: <BookOpen className="h-4 w-4" />,
      },
    ],
    searchConfig: {
      enabled: true,
      placeholder: "Search stories and topics...",
      searchAction: "/search",
    },
    customActions: [
      { label: "Subscribe Now", href: "/subscribe", variant: "default" },
      { label: "Free Trial", href: "/trial", variant: "outline" },
    ],
  },
};

export const RestaurantErrorPage: Story = {
  args: {
    siteType: "restaurant",
    popularLinks: restaurantLinks,
    contactEmail: "info@restaurant.com",
    customActions: [
      { label: "Make Reservation", href: "/reservations", variant: "default" },
      { label: "Order Takeout", href: "/order", variant: "outline" },
      { label: "Call Us", href: "tel:+1234567890", variant: "ghost" },
    ],
    image: "https://placehold.co/600x400/EEE/31343C",
    showIcon: false,
  },
};

export const SaaSErrorPage: Story = {
  args: {
    siteType: "saas",
    popularLinks: [
      {
        label: "Dashboard",
        href: "/dashboard",
        description: "Access your account",
        icon: <Monitor className="h-4 w-4" />,
      },
      {
        label: "Documentation",
        href: "/docs",
        description: "API guides and tutorials",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        label: "Support Center",
        href: "/support",
        description: "Get help and answers",
        icon: <Mail className="h-4 w-4" />,
      },
      {
        label: "System Status",
        href: "/status",
        description: "Check service health",
        icon: <Star className="h-4 w-4" />,
      },
    ],
    searchConfig: {
      enabled: true,
      placeholder: "Search docs, features, help...",
      searchAction: "/search",
    },
    contactEmail: "support@saas.com",
    customActions: [
      { label: "Try Again", onClick: () => globalThis.location.reload(), variant: "default" },
      { label: "Contact Support", href: "/support", variant: "outline" },
      { label: "Status Page", href: "/status", variant: "ghost" },
    ],
  },
};

export const PortfolioErrorPage: Story = {
  args: {
    siteType: "portfolio",
    popularLinks: portfolioLinks,
    contactEmail: "hello@designer.com",
    customActions: [
      { label: "View Portfolio", href: "/portfolio", variant: "default" },
      { label: "Hire Me", href: "/contact", variant: "outline" },
    ],
    image: "https://placehold.co/600x400/EEE/31343C",
    showIcon: false,
  },
};

export const CorporateErrorPage: Story = {
  args: {
    siteType: "corporate",
    popularLinks: [
      {
        label: "About Us",
        href: "/about",
        description: "Learn about our company",
        icon: <Building2 className="h-4 w-4" />,
      },
      {
        label: "Services",
        href: "/services",
        description: "What we offer",
        icon: <Star className="h-4 w-4" />,
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Get in touch",
        icon: <Phone className="h-4 w-4" />,
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join our team",
        icon: <User className="h-4 w-4" />,
      },
    ],
    showBreadcrumb: true,
    breadcrumbItems: [{ label: "Company", href: "/company" }, { label: "Not Found" }],
    contactEmail: "info@company.com",
    customActions: [
      { label: "Contact Sales", href: "/sales", variant: "default" },
      { label: "Support", href: "/support", variant: "outline" },
      { label: "Site Map", href: "/sitemap", variant: "ghost" },
    ],
  },
};

// ===== ENHANCED EXISTING STORIES =====

export const Enhanced404WithSearch: Story = {
  args: {
    variant: "friendly-404",
    title: "Oops! Page Not Found",
    description:
      "The page you're looking for seems to have taken a vacation. Let's help you find what you need.",
    popularLinks: popularLinks.slice(0, 4),
    searchConfig: {
      enabled: true,
      placeholder: "Search our site...",
      searchAction: "/search",
    },
    contactEmail: "help@example.com",
    customActions: [{ label: "Report Issue", href: "/report", variant: "outline" }],
  },
};

export const EnhancedComingSoon: Story = {
  args: {
    variant: "coming-soon",
    title: "Something Amazing is Coming",
    description: "We're crafting an incredible experience just for you. Get ready to be amazed!",
    countdownDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    countdownMessage: "Launching in:",
    customActions: [
      { label: "Get Early Access", href: "#early", variant: "default" },
      { label: "Learn More", href: "#about", variant: "outline" },
      { label: "Follow Updates", href: "#follow", variant: "ghost" },
    ],
    image: "https://placehold.co/600x400/EEE/31343C",
    showIcon: false,
  },
};
