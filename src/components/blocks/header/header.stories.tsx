import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";

const meta = {
  title: "Blocks/Header",
  component: Header,
  tags: ["test"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A flexible header component for building website navigation with multiple variants, mobile responsiveness, and customization options.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal", "centered", "split"],
      description: "The visual variant of the header",
    },
    sticky: {
      control: "boolean",
      description: "Makes the header sticky on scroll",
    },
    showDarkModeToggle: {
      control: "boolean",
      description: "Shows a dark mode toggle button",
    },
    blur: {
      control: "boolean",
      description: "Adds backdrop blur effect when sticky",
    },
    shadow: {
      control: "boolean",
      description: "Adds shadow when scrolled (only with sticky)",
    },
    height: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The height of the header",
    },
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
      description: "Maximum width of the header content",
    },
    mobileTriggerIcon: {
      control: "select",
      options: ["menu", "dots"],
      description: "Icon style for mobile menu trigger",
    },
    animated: {
      control: "boolean",
      description: "Enables smooth transitions",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation data
const navigationItems = [
  {
    label: "Products",
    items: [
      {
        label: "Analytics",
        href: "#analytics",
        description: "Powerful analytics and reporting tools",
      },
      {
        label: "Automation",
        href: "#automation",
        description: "Automate your workflow with AI",
      },
      {
        label: "Security",
        href: "#security",
        description: "Enterprise-grade security features",
      },
      {
        label: "Integrations",
        href: "#integrations",
        description: "Connect with your favorite tools",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      {
        label: "For Startups",
        href: "#startups",
        description: "Everything you need to launch fast",
      },
      {
        label: "For Enterprise",
        href: "#enterprise",
        description: "Scale with confidence",
      },
      {
        label: "For Agencies",
        href: "#agencies",
        description: "Manage multiple clients efficiently",
      },
    ],
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Docs",
    href: "#docs",
  },
];

const actions = [
  {
    label: "Sign In",
    variant: "ghost" as const,
    href: "#signin",
  },
  {
    label: "Get Started",
    variant: "default" as const,
    href: "#signup",
  },
];

export const Default: Story = {
  args: {
    logo: {
      type: "text",
      text: "YourBrand",
      href: "#",
    },
    navigation: navigationItems,
    actions: actions,
    showDarkModeToggle: true,
  },
};

export const ImageLogo: Story = {
  args: {
    logo: {
      type: "image",
      src: "https://via.placeholder.com/120x40/3b82f6/ffffff?text=Logo",
      alt: "Company Logo",
      href: "#",
    },
    navigation: navigationItems,
    actions: actions,
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
    logo: {
      type: "text",
      text: "Minimal",
      href: "#",
    },
    actions: [
      {
        label: "Contact",
        variant: "ghost" as const,
      },
      {
        label: "Get Started",
        variant: "default" as const,
      },
    ],
    showDarkModeToggle: true,
  },
};

export const Centered: Story = {
  args: {
    variant: "centered",
    logo: {
      type: "text",
      text: "Centered",
      href: "#",
    },
    navigation: [
      { label: "Home", href: "#" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    actions: [
      {
        label: "Get Started",
        variant: "default" as const,
      },
    ],
    showDarkModeToggle: true,
  },
};

export const Split: Story = {
  args: {
    variant: "split",
    logo: {
      type: "text",
      text: "Split Layout",
      href: "#",
    },
    navigation: [
      { label: "Products", href: "#products" },
      { label: "Solutions", href: "#solutions" },
      { label: "Pricing", href: "#pricing" },
    ],
    actions: actions,
  },
};

export const StickyHeader: Story = {
  args: {
    sticky: true,
    blur: true,
    shadow: true,
    logo: {
      type: "text",
      text: "StickyBrand",
      href: "#",
    },
    navigation: navigationItems,
    actions: actions,
    showDarkModeToggle: true,
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="h-[200vh] bg-gradient-to-b from-background to-muted p-8">
          <div className="mx-auto max-w-4xl space-y-4">
            <h1 className="text-4xl font-bold">Scroll to see sticky header</h1>
            <p className="text-lg text-muted-foreground">
              The header will stick to the top when you scroll down. Notice the backdrop blur
              and shadow effects that appear on scroll.
            </p>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
};

export const WithoutNavigation: Story = {
  args: {
    logo: {
      type: "text",
      text: "SimpleApp",
      href: "#",
    },
    actions: [
      {
        label: "Dashboard",
        variant: "ghost" as const,
        href: "#dashboard",
      },
      {
        label: "Logout",
        variant: "outline" as const,
        onClick: () => alert("Logging out..."),
      },
    ],
    showDarkModeToggle: true,
  },
};

export const NavigationOnly: Story = {
  args: {
    logo: {
      type: "text",
      text: "NavOnly",
      href: "#",
    },
    navigation: [
      { label: "Home", href: "#" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

export const SmallHeight: Story = {
  args: {
    height: "sm",
    logo: {
      type: "text",
      text: "Compact",
      href: "#",
    },
    navigation: navigationItems,
    actions: actions,
  },
};

export const LargeHeight: Story = {
  args: {
    height: "lg",
    logo: {
      type: "text",
      text: "Spacious",
      href: "#",
    },
    navigation: navigationItems,
    actions: actions,
    showDarkModeToggle: true,
  },
};

export const FullWidth: Story = {
  args: {
    maxWidth: "full",
    backgroundColor: "bg-primary",
    className: "text-primary-foreground",
    logo: {
      type: "text",
      text: "FullWidth",
      href: "#",
    },
    navigation: navigationItems.map((item) => ({
      ...item,
      className: "text-primary-foreground",
    })),
    actions: [
      {
        label: "Sign In",
        variant: "secondary" as const,
      },
      {
        label: "Get Started",
        variant: "outline" as const,
      },
    ],
  },
};

export const CustomBackground: Story = {
  args: {
    backgroundColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    className: "text-white",
    blur: false,
    logo: {
      type: "text",
      text: "Gradient",
      href: "#",
    },
    navigation: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "About", href: "#about" },
    ],
    actions: [
      {
        label: "Get Started",
        variant: "secondary" as const,
      },
    ],
  },
};

export const MobileDots: Story = {
  args: {
    mobileTriggerIcon: "dots",
    logo: {
      type: "text",
      text: "DotMenu",
      href: "#",
    },
    navigation: navigationItems,
    actions: actions,
    showDarkModeToggle: true,
  },
};

export const ComplexNavigation: Story = {
  args: {
    logo: {
      type: "text",
      text: "Enterprise",
      href: "#",
    },
    navigation: [
      {
        label: "Products",
        items: [
          {
            label: "Cloud Infrastructure",
            href: "#cloud",
            description: "Scalable cloud solutions for modern applications",
          },
          {
            label: "AI Platform",
            href: "#ai",
            description: "Build and deploy AI models at scale",
          },
          {
            label: "Data Analytics",
            href: "#analytics",
            description: "Real-time insights from your data",
          },
          {
            label: "Security Suite",
            href: "#security",
            description: "Comprehensive security for your infrastructure",
          },
          {
            label: "Developer Tools",
            href: "#devtools",
            description: "Tools to accelerate your development",
          },
          {
            label: "IoT Platform",
            href: "#iot",
            description: "Connect and manage IoT devices",
          },
        ],
      },
      {
        label: "Solutions",
        items: [
          {
            label: "By Industry",
            href: "#industry",
            description: "Solutions tailored to your industry",
          },
          {
            label: "By Company Size",
            href: "#size",
            description: "Right-sized solutions for your business",
          },
          {
            label: "By Use Case",
            href: "#usecase",
            description: "Purpose-built for your needs",
          },
        ],
      },
      {
        label: "Resources",
        items: [
          {
            label: "Documentation",
            href: "#docs",
            description: "Comprehensive guides and API references",
          },
          {
            label: "Blog",
            href: "#blog",
            description: "Latest news and insights",
          },
          {
            label: "Community",
            href: "#community",
            description: "Connect with other users",
          },
          {
            label: "Support",
            href: "#support",
            description: "Get help when you need it",
          },
        ],
      },
      {
        label: "Company",
        items: [
          {
            label: "About Us",
            href: "#about",
          },
          {
            label: "Careers",
            href: "#careers",
          },
          {
            label: "Partners",
            href: "#partners",
          },
          {
            label: "Contact",
            href: "#contact",
          },
        ],
      },
    ],
    actions: [
      {
        label: "Contact Sales",
        variant: "ghost" as const,
      },
      {
        label: "Sign In",
        variant: "outline" as const,
      },
      {
        label: "Start Free Trial",
        variant: "default" as const,
      },
    ],
    showDarkModeToggle: true,
    sticky: true,
  },
};

export const NoAnimation: Story = {
  args: {
    animated: false,
    sticky: true,
    logo: {
      type: "text",
      text: "NoAnim",
      href: "#",
    },
    navigation: navigationItems,
    actions: actions,
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="h-[150vh] p-8">
          <p>Scroll to see the header stick without animations</p>
        </div>
      </div>
    ),
  ],
};