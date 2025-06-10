import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { Header } from "./header";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
const meta = {
  title: "Blocks/Header",
  component: Header,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A flexible header component for building website navigation with multiple variants, mobile responsiveness, and customization options.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "300px" }}>
        <Story />
      </div>
    ),
  ],
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
      src: "https://placehold.co/120x40/3b82f6/ffffff?text=Logo",
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
              The header will stick to the top when you scroll down. Notice the backdrop blur and
              shadow effects that appear on scroll.
            </p>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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

export const WithIcons: Story = {
  args: {
    logo: {
      type: "text",
      text: "IconNav",
      href: "#",
    },
    navigation: [
      {
        label: "Products",
        icon: "Package" as const,
        items: [
          {
            label: "Analytics Dashboard",
            href: "#analytics",
            description: "Real-time analytics and insights",
            icon: "BarChart3" as const,
          },
          {
            label: "Cloud Storage",
            href: "#storage",
            description: "Secure file storage and sharing",
            icon: "Cloud" as const,
          },
          {
            label: "API Gateway",
            href: "#api",
            description: "Manage and monitor your APIs",
            icon: "Network" as const,
          },
          {
            label: "Database",
            href: "#database",
            description: "Scalable database solutions",
            icon: "Database" as const,
          },
        ],
      },
      {
        label: "Solutions",
        icon: "Lightbulb" as const,
        items: [
          {
            label: "E-commerce",
            href: "#ecommerce",
            description: "Complete e-commerce platform",
            icon: "ShoppingCart" as const,
          },
          {
            label: "Healthcare",
            href: "#healthcare",
            description: "HIPAA-compliant solutions",
            icon: "Heart" as const,
          },
          {
            label: "Education",
            href: "#education",
            description: "Learning management systems",
            icon: "GraduationCap" as const,
          },
        ],
      },
      {
        label: "Resources",
        icon: "BookOpen" as const,
        items: [
          {
            label: "Documentation",
            href: "#docs",
            icon: "FileText" as const,
          },
          {
            label: "Tutorials",
            href: "#tutorials",
            icon: "Video" as const,
          },
          {
            label: "Community",
            href: "#community",
            icon: "Users" as const,
          },
        ],
      },
      {
        label: "Pricing",
        href: "#pricing",
        icon: "CreditCard" as const,
      },
    ],
    actions: actions,
    showDarkModeToggle: true,
  },
};

export const MultiColumnDropdown: Story = {
  args: {
    logo: {
      type: "text",
      text: "MultiCol",
      href: "#",
    },
    navigation: [
      {
        label: "Platform",
        items: [
          {
            label: "Infrastructure",
            href: "#infrastructure",
            description: "Cloud-native infrastructure",
            icon: "Server" as const,
          },
          {
            label: "Compute",
            href: "#compute",
            description: "Scalable compute resources",
            icon: "Cpu" as const,
          },
          {
            label: "Storage",
            href: "#storage",
            description: "Object and block storage",
            icon: "HardDrive" as const,
          },
          {
            label: "Networking",
            href: "#networking",
            description: "Global CDN and load balancing",
            icon: "Globe" as const,
          },
          {
            label: "Security",
            href: "#security",
            description: "Advanced threat protection",
            icon: "Shield" as const,
          },
          {
            label: "Monitoring",
            href: "#monitoring",
            description: "Real-time performance insights",
            icon: "Activity" as const,
          },
        ],
      },
      {
        label: "Developers",
        items: [
          {
            label: "API Reference",
            href: "#api-ref",
            icon: "Code" as const,
          },
          {
            label: "SDKs",
            href: "#sdks",
            icon: "Package" as const,
          },
          {
            label: "CLI Tools",
            href: "#cli",
            icon: "Terminal" as const,
          },
          {
            label: "Examples",
            href: "#examples",
            icon: "FileCode" as const,
          },
        ],
      },
    ],
    actions: [
      {
        label: "Console",
        variant: "outline" as const,
      },
      {
        label: "Sign Up",
        variant: "default" as const,
      },
    ],
  },
};

// Dual-mode SDUI stories
export const DefaultSDUI: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Header
        logo={{
          type: "text",
          text: "YourBrand",
          href: "#",
        }}
        navigation={navigationItems}
        actions={actions}
        showDarkModeToggle={true}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify logo is rendered
      expect(canvas.getByText("YourBrand")).toBeInTheDocument();

      // Verify navigation items are present
      expect(canvas.getByText("Products")).toBeInTheDocument();
      expect(canvas.getByText("Solutions")).toBeInTheDocument();
      expect(canvas.getByText("Pricing")).toBeInTheDocument();
      expect(canvas.getByText("Docs")).toBeInTheDocument();

      // Verify action buttons are present
      expect(canvas.getByText("Sign In")).toBeInTheDocument();
      expect(canvas.getByText("Get Started")).toBeInTheDocument();

      // Verify dark mode toggle is present
      expect(canvas.getByRole("button", { name: /switch to/i })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Header",
      logo: {
        type: "text",
        text: "YourBrand",
        href: "#",
      },
      navigation: navigationItems,
      actions: [
        {
          label: "Sign In",
          variant: "ghost",
          href: "#signin",
        },
        {
          label: "Get Started",
          variant: "default",
          href: "#signup",
        },
      ],
      showDarkModeToggle: true,
    },
  }
);

export const ImageLogoSDUI: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Header
        logo={{
          type: "image",
          src: "https://placehold.co/120x40/3b82f6/ffffff?text=Logo",
          alt: "Company Logo",
          href: "#",
        }}
        navigation={navigationItems}
        actions={actions}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify image logo is rendered
      const logo = canvas.getByRole("img", { name: "Company Logo" });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "https://placehold.co/120x40/3b82f6/ffffff?text=Logo");

      // Verify navigation items are present
      expect(canvas.getByText("Products")).toBeInTheDocument();
      expect(canvas.getByText("Solutions")).toBeInTheDocument();

      // Verify action buttons are present
      expect(canvas.getByText("Sign In")).toBeInTheDocument();
      expect(canvas.getByText("Get Started")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Header",
      logo: {
        type: "image",
        src: "https://placehold.co/120x40/3b82f6/ffffff?text=Logo",
        alt: "Company Logo",
        href: "#",
      },
      navigation: navigationItems,
      actions: [
        {
          label: "Sign In",
          variant: "ghost",
          href: "#signin",
        },
        {
          label: "Get Started",
          variant: "default",
          href: "#signup",
        },
      ],
    },
  }
);

export const MinimalSDUI: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Header
        variant="minimal"
        logo={{
          type: "text",
          text: "Minimal",
          href: "#",
        }}
        actions={[
          {
            label: "Contact",
            variant: "ghost" as const,
          },
          {
            label: "Get Started",
            variant: "default" as const,
          },
        ]}
        showDarkModeToggle={true}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify logo is rendered
      expect(canvas.getByText("Minimal")).toBeInTheDocument();

      // Verify action buttons are present
      expect(canvas.getByText("Contact")).toBeInTheDocument();
      expect(canvas.getByText("Get Started")).toBeInTheDocument();

      // Verify dark mode toggle is present
      expect(canvas.getByRole("button", { name: /switch to/i })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Header",
      variant: "minimal",
      logo: {
        type: "text",
        text: "Minimal",
        href: "#",
      },
      actions: [
        {
          label: "Contact",
          variant: "ghost",
        },
        {
          label: "Get Started",
          variant: "default",
        },
      ],
      showDarkModeToggle: true,
    },
  }
);

export const CenteredSDUI: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Header
        variant="centered"
        logo={{
          type: "text",
          text: "Centered",
          href: "#",
        }}
        navigation={[
          { label: "Home", href: "#" },
          { label: "About", href: "#about" },
          { label: "Services", href: "#services" },
          { label: "Contact", href: "#contact" },
        ]}
        actions={[
          {
            label: "Get Started",
            variant: "default" as const,
          },
        ]}
        showDarkModeToggle={true}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify logo is rendered
      expect(canvas.getByText("Centered")).toBeInTheDocument();

      // Verify navigation items are present
      expect(canvas.getByText("Home")).toBeInTheDocument();
      expect(canvas.getByText("About")).toBeInTheDocument();
      expect(canvas.getByText("Services")).toBeInTheDocument();
      expect(canvas.getByText("Contact")).toBeInTheDocument();

      // Verify action button is present
      expect(canvas.getByText("Get Started")).toBeInTheDocument();

      // Verify dark mode toggle is present
      expect(canvas.getByRole("button", { name: /switch to/i })).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Header",
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
          variant: "default",
        },
      ],
      showDarkModeToggle: true,
    },
  }
);

export const WithIconsSDUI: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Header
        logo={{
          type: "text",
          text: "IconNav",
          href: "#",
        }}
        navigation={[
          {
            label: "Products",
            icon: "Package" as const,
            items: [
              {
                label: "Analytics Dashboard",
                href: "#analytics",
                description: "Real-time analytics and insights",
                icon: "BarChart3" as const,
              },
              {
                label: "Cloud Storage",
                href: "#storage",
                description: "Secure file storage and sharing",
                icon: "Cloud" as const,
              },
            ],
          },
          {
            label: "Pricing",
            href: "#pricing",
            icon: "CreditCard" as const,
          },
        ]}
        actions={actions}
        showDarkModeToggle={true}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Verify logo is rendered
      expect(canvas.getByText("IconNav")).toBeInTheDocument();

      // Verify navigation items with icons are present
      expect(canvas.getByText("Products")).toBeInTheDocument();
      expect(canvas.getByText("Pricing")).toBeInTheDocument();

      // Test dropdown functionality with proper async handling
      const productsDropdown = canvas.getByText("Products");
      
      // Wrap hover interaction in waitFor to handle async state updates
      await waitFor(async () => {
        await user.hover(productsDropdown);
      });

      // Wait for dropdown to appear and verify submenu items
      await waitFor(() => {
        expect(within(document.body).getByText("Analytics Dashboard")).toBeInTheDocument();
        expect(within(document.body).getByText("Cloud Storage")).toBeInTheDocument();
      });

      // Verify action buttons are present
      expect(canvas.getByText("Sign In")).toBeInTheDocument();
      expect(canvas.getByText("Get Started")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Header",
      logo: {
        type: "text",
        text: "IconNav",
        href: "#",
      },
      navigation: [
        {
          label: "Products",
          icon: "Package",
          items: [
            {
              label: "Analytics Dashboard",
              href: "#analytics",
              description: "Real-time analytics and insights",
              icon: "BarChart3",
            },
            {
              label: "Cloud Storage",
              href: "#storage",
              description: "Secure file storage and sharing",
              icon: "Cloud",
            },
          ],
        },
        {
          label: "Pricing",
          href: "#pricing",
          icon: "CreditCard",
        },
      ],
      actions: [
        {
          label: "Sign In",
          variant: "ghost",
          href: "#signin",
        },
        {
          label: "Get Started",
          variant: "default",
          href: "#signup",
        },
      ],
      showDarkModeToggle: true,
    },
  }
);
