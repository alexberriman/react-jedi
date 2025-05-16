import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer";
import { Container } from "../container/container";

const meta = {
  title: "Components/UI/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple logo component for stories
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600" />
    <span className="text-xl font-bold">Acme Inc</span>
  </div>
);

const defaultSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#integrations" },
      { label: "API", href: "#api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#help" },
      { label: "Documentation", href: "#docs", external: true },
      { label: "Contact", href: "#contact" },
      { label: "Status", href: "#status" },
    ],
  },
];

const socialLinks = [
  { platform: "twitter" as const, href: "https://twitter.com/acme" },
  { platform: "facebook" as const, href: "https://facebook.com/acme" },
  { platform: "linkedin" as const, href: "https://linkedin.com/company/acme" },
  { platform: "github" as const, href: "https://github.com/acme" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookie Policy", href: "#cookies" },
];

export const Default: Story = {
  args: {
    logo: <Logo />,
    description: "Building the future of web development with cutting-edge tools and technologies.",
    sections: defaultSections,
    socialLinks,
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    legalLinks,
  },
};

export const WithNewsletter: Story = {
  args: {
    logo: <Logo />,
    sections: defaultSections.slice(0, 2),
    socialLinks,
    newsletter: {
      title: "Stay updated",
      description: "Get the latest news and updates delivered to your inbox.",
      placeholder: "your@email.com",
      buttonText: "Subscribe",
      onSubmit: (email) => console.log("Newsletter signup:", email),
    },
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    legalLinks,
  },
};

export const WithContactInfo: Story = {
  args: {
    logo: <Logo />,
    sections: defaultSections,
    contactInfo: {
      email: "hello@acme.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, San Francisco, CA 94105",
    },
    socialLinks,
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
  },
};

export const LightVariant: Story = {
  args: {
    variant: "light",
    logo: <Logo />,
    description: "Building the future of web development with cutting-edge tools and technologies.",
    sections: defaultSections,
    socialLinks,
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    legalLinks,
  },
};

export const DarkVariant: Story = {
  args: {
    variant: "dark",
    logo: <Logo />,
    description: "Building the future of web development with cutting-edge tools and technologies.",
    sections: defaultSections,
    socialLinks,
    newsletter: {
      title: "Stay updated",
      description: "Get the latest news delivered to your inbox.",
    },
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    legalLinks,
  },
};

export const GradientVariant: Story = {
  args: {
    variant: "gradient",
    logo: <Logo />,
    description: "Building the future of web development with cutting-edge tools and technologies.",
    sections: defaultSections,
    socialLinks,
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    legalLinks,
  },
};

export const CenteredLayout: Story = {
  args: {
    layout: "centered",
    logo: <Logo />,
    description: "Building the future of web development.",
    sections: [
      {
        title: "Navigation",
        links: [
          { label: "Home", href: "#home" },
          { label: "About", href: "#about" },
          { label: "Services", href: "#services" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    socialLinks,
    newsletter: {
      title: "Newsletter",
      description: "Stay in the loop",
    },
    copyright: `© ${new Date().getFullYear()} Acme Inc.`,
    legalLinks,
  },
};

export const MinimalLayout: Story = {
  args: {
    layout: "minimal",
    variant: "minimal",
    size: "sm",
    logo: <Logo />,
    sections: [
      {
        title: "Links",
        links: [
          { label: "About", href: "#about" },
          { label: "Blog", href: "#blog" },
          { label: "Careers", href: "#careers" },
        ],
      },
    ],
    socialLinks: socialLinks.slice(0, 3),
    copyright: `© ${new Date().getFullYear()} Acme Inc.`,
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    logo: <Logo />,
    sections: defaultSections.slice(0, 2),
    socialLinks,
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    logo: <Logo />,
    description: "Building the future of web development with cutting-edge tools and technologies.",
    sections: defaultSections,
    socialLinks,
    newsletter: {
      title: "Join our newsletter",
      description: "Get weekly insights and updates from our team.",
    },
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    legalLinks,
  },
};

export const WithoutDivider: Story = {
  args: {
    showDivider: false,
    logo: <Logo />,
    sections: defaultSections,
    socialLinks,
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    legalLinks,
  },
};

export const CustomChildren: Story = {
  args: {
    logo: <Logo />,
    sections: defaultSections,
    socialLinks,
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    children: (
      <div className="mt-8 p-4 bg-purple-600/10 rounded-lg text-center">
        <p className="text-sm">
          🚀 Special announcement: We&apos;re launching something amazing soon!
        </p>
      </div>
    ),
  },
};

export const CompleteExample: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Container className="py-20">
          <h1 className="text-4xl font-bold mb-4">Page Content</h1>
          <p className="text-gray-600">
            This example shows how the footer looks at the bottom of a page with content.
          </p>
        </Container>
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "gradient",
    logo: <Logo />,
    description: "Building the future of web development with cutting-edge tools and technologies.",
    sections: defaultSections,
    socialLinks,
    newsletter: {
      title: "Stay in the loop",
      description: "Get the latest updates delivered to your inbox.",
      placeholder: "Enter your email",
      onSubmit: (email) => console.log("Newsletter signup:", email),
    },
    contactInfo: {
      email: "hello@acme.com",
      phone: "+1 (555) 123-4567",
    },
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
    legalLinks,
  },
};
