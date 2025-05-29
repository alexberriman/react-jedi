import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { Footer } from "./footer";
import { Container } from "../container/container";

const meta = {
  title: "Components/UI/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },

  tags: ['ui-footer'],} satisfies Meta<typeof Footer>;

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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify logo is rendered
    expect(canvas.getByText('Acme Inc')).toBeInTheDocument();
    
    // Verify description
    expect(canvas.getByText('Building the future of web development with cutting-edge tools and technologies.')).toBeInTheDocument();
    
    // Verify all sections are rendered
    expect(canvas.getByText('Product')).toBeInTheDocument();
    expect(canvas.getByText('Company')).toBeInTheDocument();
    expect(canvas.getByText('Support')).toBeInTheDocument();
    
    // Verify some links
    expect(canvas.getByRole('link', { name: 'Features' })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: 'Documentation' })).toBeInTheDocument();
    
    // Verify social links
    const socialSection = canvas.getByRole('navigation', { name: /social/i });
    expect(within(socialSection).getAllByRole('link')).toHaveLength(4);
    
    // Verify copyright
    expect(canvas.getByText(`© ${new Date().getFullYear()} Acme Inc. All rights reserved.`)).toBeInTheDocument();
    
    // Verify legal links
    expect(canvas.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify newsletter section
    expect(canvas.getByText('Stay updated')).toBeInTheDocument();
    expect(canvas.getByText('Get the latest news and updates delivered to your inbox.')).toBeInTheDocument();
    
    // Find newsletter form
    const emailInput = canvas.getByPlaceholderText('your@email.com');
    const subscribeButton = canvas.getByRole('button', { name: 'Subscribe' });
    
    expect(emailInput).toBeInTheDocument();
    expect(subscribeButton).toBeInTheDocument();
    
    // Test newsletter submission
    const testEmail = 'test@example.com';
    await userEvent.type(emailInput, testEmail);
    await userEvent.click(subscribeButton);
    
    // Note: We can't verify console.log directly, but we've tested the interaction
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify contact info is rendered
    const emailLink = canvas.getByRole('link', { name: 'hello@acme.com' });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@acme.com');
    
    const phoneLink = canvas.getByRole('link', { name: '+1 (555) 123-4567' });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
    
    expect(canvas.getByText('123 Main St, San Francisco, CA 94105')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify footer has light variant class
    const footer = canvas.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-50');
    
    // Verify content is rendered
    expect(canvas.getByText('Acme Inc')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify footer has dark variant class
    const footer = canvas.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-black');
    expect(footer).toHaveClass('text-gray-400');
    
    // Verify newsletter section is included
    expect(canvas.getByText('Stay updated')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify footer has gradient variant class
    const footer = canvas.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gradient-to-b');
    
    // Verify content appears correctly on gradient
    expect(canvas.getByText('Acme Inc')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify centered layout - check for text alignment
    const footer = canvas.getByRole('contentinfo');
    const mainContent = footer.querySelector('.text-center');
    expect(mainContent).toBeInTheDocument();
    
    // Verify navigation links are rendered (section title not shown in centered layout)
    expect(canvas.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: 'About' })).toBeInTheDocument();
    
    // Verify newsletter is centered
    expect(canvas.getByText('Newsletter')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify minimal styling
    const footer = canvas.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-transparent');
    
    // Verify only 3 social links
    const socialSection = canvas.getByRole('navigation', { name: /social/i });
    expect(within(socialSection).getAllByRole('link')).toHaveLength(3);
    
    // Verify minimal content - links are rendered without section title
    expect(canvas.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify small size padding
    const footer = canvas.getByRole('contentinfo');
    expect(footer).toHaveClass('py-8');
    
    // Verify only 2 sections are shown
    expect(canvas.getByText('Product')).toBeInTheDocument();
    expect(canvas.getByText('Company')).toBeInTheDocument();
    expect(canvas.queryByText('Support')).not.toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify large size padding
    const footer = canvas.getByRole('contentinfo');
    expect(footer).toHaveClass('py-16');
    
    // Verify newsletter content
    expect(canvas.getByText('Join our newsletter')).toBeInTheDocument();
    expect(canvas.getByText('Get weekly insights and updates from our team.')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify no divider is present
    const footer = canvas.getByRole('contentinfo');
    const divider = footer.querySelector('hr');
    expect(divider).not.toBeInTheDocument();
    
    // Verify content is still rendered
    expect(canvas.getByText('Acme Inc')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify custom children are rendered
    const announcement = canvas.getByText(/Special announcement/);
    expect(announcement).toBeInTheDocument();
    
    // Verify custom styling
    const announcementContainer = announcement.parentElement;
    expect(announcementContainer).toHaveClass('bg-purple-600/10');
    expect(announcementContainer).toHaveClass('rounded-lg');
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify page content is rendered
    expect(canvas.getByText('Page Content')).toBeInTheDocument();
    expect(canvas.getByText('This example shows how the footer looks at the bottom of a page with content.')).toBeInTheDocument();
    
    // Verify footer with all features
    const footer = canvas.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gradient-to-b');
    
    // Verify all sections are present
    expect(within(footer).getByText('Stay in the loop')).toBeInTheDocument();
    // Note: contactInfo is not displayed when newsletter is present
    
    // Test newsletter interaction
    const emailInput = within(footer).getByPlaceholderText('Enter your email');
    await userEvent.type(emailInput, 'complete@example.com');
    
    // Verify gradient variant with full content
    expect(within(footer).getAllByRole('link').length).toBeGreaterThan(10);
  },
};
