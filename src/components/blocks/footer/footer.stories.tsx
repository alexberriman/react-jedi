import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer";
import { FaReact } from "react-icons/fa6";

const meta = {
  title: "Blocks/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "light", "dark", "gradient", "minimal", "brand"],
    },
    size: {
      control: "select",
      options: ["minimal", "sm", "default", "lg", "expanded"],
    },
    layout: {
      control: "select",
      options: [
        "minimal",
        "standard",
        "expanded",
        "centered",
        "columns-2",
        "columns-3",
        "columns-4",
        "columns-5",
        "columns-6",
      ],
    },
    columnGap: {
      control: "select",
      options: ["tight", "normal", "wide"],
    },
    containerWidth: {
      control: "select",
      options: ["default", "wide", "full"],
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultCompanyInfo = {
  name: "React Jedi",
  logo: <FaReact className="h-8 w-8" />,
  description: "Building modern React interfaces with JSON specifications",
  tagline: "Server-Driven UI Made Simple",
  established: "2024",
};

const defaultSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "#docs" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Press Kit", href: "#press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Community", href: "#community" },
      { label: "Support", href: "#support" },
      { label: "Status", href: "#status", external: true },
      { label: "API Reference", href: "#api" },
    ],
  },
];

const defaultSocialLinks = [
  { platform: "github" as const, href: "https://github.com", label: "GitHub" },
  { platform: "twitter" as const, href: "https://twitter.com", label: "Twitter" },
  { platform: "linkedin" as const, href: "https://linkedin.com", label: "LinkedIn" },
  { platform: "discord" as const, href: "https://discord.com", label: "Discord" },
];

const defaultContactInfo = {
  email: "hello@reactjedi.com",
  phone: "+1 (555) 123-4567",
  address: "123 Component Street, React City, JS 12345",
  hours: "Mon-Fri 9:00 AM - 6:00 PM PST",
  mapUrl: "https://maps.google.com",
};

const defaultNewsletter = {
  title: "Stay Updated",
  description: "Get the latest updates on new features and releases",
  placeholder: "your@email.com",
  buttonText: "Subscribe",
  successMessage: "Thanks for subscribing!",
  termsText: "By subscribing, you agree to our",
  termsLink: "#terms",
  onSubmit: (email: string) => {
    console.log("Newsletter signup:", email);
  },
};

const defaultLegalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookie Policy", href: "#cookies" },
  { label: "GDPR", href: "#gdpr" },
];

export const Minimal: Story = {
  args: {
    layout: "minimal",
    size: "minimal",
    variant: "minimal",
    companyInfo: { logo: <FaReact className="h-6 w-6" /> },
    sections: [
      {
        title: "Links",
        links: [
          { label: "About", href: "#about" },
          { label: "Blog", href: "#blog" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    socialLinks: defaultSocialLinks.slice(0, 3),
    copyright: "© 2024 React Jedi. All rights reserved.",
  },
};

export const Standard: Story = {
  args: {
    layout: "standard",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const Expanded: Story = {
  args: {
    layout: "expanded",
    size: "expanded",
    companyInfo: defaultCompanyInfo,
    sections: [
      ...defaultSections,
      {
        title: "Developers",
        links: [
          { label: "GitHub", href: "#github", external: true },
          { label: "NPM Package", href: "#npm", external: true },
          { label: "Contributing", href: "#contributing" },
          { label: "Code of Conduct", href: "#conduct" },
        ],
      },
    ],
    socialLinks: [
      ...defaultSocialLinks,
      { platform: "youtube" as const, href: "https://youtube.com", label: "YouTube" },
      { platform: "instagram" as const, href: "https://instagram.com", label: "Instagram" },
    ],
    contactInfo: defaultContactInfo,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const Centered: Story = {
  args: {
    layout: "centered",
    variant: "gradient",
    companyInfo: defaultCompanyInfo,
    sections: [
      {
        title: "Navigation",
        links: [...defaultSections[0].links, ...defaultSections[1].links],
      },
    ],
    socialLinks: defaultSocialLinks,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks.slice(0, 2),
  },
};

export const TwoColumns: Story = {
  args: {
    layout: "columns-2",
    companyInfo: defaultCompanyInfo,
    sections: [defaultSections[0]],
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const ThreeColumns: Story = {
  args: {
    layout: "columns-3",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections.slice(0, 2),
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const FourColumns: Story = {
  args: {
    layout: "columns-4",
    columnGap: "normal",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    contactInfo: { email: defaultContactInfo.email, phone: defaultContactInfo.phone },
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const FiveColumns: Story = {
  args: {
    layout: "columns-5",
    columnGap: "tight",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    contactInfo: defaultContactInfo,
    newsletter: { 
      title: "Newsletter", 
      placeholder: "Email address",
      onSubmit: defaultNewsletter.onSubmit,
    },
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const SixColumns: Story = {
  args: {
    layout: "columns-6",
    columnGap: "tight",
    size: "lg",
    companyInfo: { logo: defaultCompanyInfo.logo, name: defaultCompanyInfo.name },
    sections: [
      ...defaultSections,
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "#help" },
          { label: "Contact Us", href: "#contact" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Legal",
        links: defaultLegalLinks.map(link => ({ ...link, external: false })),
      },
    ],
    socialLinks: defaultSocialLinks,
    copyright: "© 2024 React Jedi. All rights reserved.",
  },
};

export const LightVariant: Story = {
  args: {
    variant: "light",
    layout: "standard",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const DarkVariant: Story = {
  args: {
    variant: "dark",
    layout: "expanded",
    size: "lg",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
    contactInfo: defaultContactInfo,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const BrandVariant: Story = {
  args: {
    variant: "brand",
    layout: "standard",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
    className: "bg-blue-600",
  },
};

export const WithAllSocialPlatforms: Story = {
  args: {
    layout: "expanded",
    companyInfo: defaultCompanyInfo,
    socialLinks: [
      { platform: "facebook" as const, href: "#", label: "Facebook" },
      { platform: "twitter" as const, href: "#", label: "Twitter" },
      { platform: "instagram" as const, href: "#", label: "Instagram" },
      { platform: "linkedin" as const, href: "#", label: "LinkedIn" },
      { platform: "youtube" as const, href: "#", label: "YouTube" },
      { platform: "github" as const, href: "#", label: "GitHub" },
      { platform: "tiktok" as const, href: "#", label: "TikTok" },
      { platform: "pinterest" as const, href: "#", label: "Pinterest" },
      { platform: "discord" as const, href: "#", label: "Discord" },
      { platform: "whatsapp" as const, href: "#", label: "WhatsApp" },
      { platform: "telegram" as const, href: "#", label: "Telegram" },
      { platform: "reddit" as const, href: "#", label: "Reddit" },
    ],
    sections: defaultSections.slice(0, 2),
    copyright: "© 2024 React Jedi. All rights reserved.",
  },
};

export const NewsletterFocus: Story = {
  args: {
    layout: "centered",
    variant: "gradient",
    companyInfo: {
      logo: <FaReact className="h-12 w-12" />,
      name: "React Jedi Newsletter",
      description: "Stay ahead with the latest in React development",
    },
    newsletter: {
      title: "Join 10,000+ developers",
      description: "Get weekly insights on React best practices, new features, and community highlights delivered to your inbox.",
      placeholder: "Enter your email",
      buttonText: "Subscribe Now",
      termsText: "We respect your privacy. Unsubscribe at any time.",
      onSubmit: (email: string) => {
        console.log("Newsletter signup:", email);
      },
    },
    socialLinks: defaultSocialLinks,
    copyright: "© 2024 React Jedi. All rights reserved.",
  },
};

export const ContactFocus: Story = {
  args: {
    layout: "columns-3",
    variant: "dark",
    companyInfo: defaultCompanyInfo,
    contactInfo: {
      email: "support@reactjedi.com",
      phone: "+1 (555) 123-4567",
      address: "123 Component Street, Suite 456, React City, JS 12345, United States",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM PST\nSaturday: 10:00 AM - 4:00 PM PST\nSunday: Closed",
      mapUrl: "https://maps.google.com",
    },
    sections: [
      {
        title: "Quick Links",
        links: [
          { label: "Support Center", href: "#support" },
          { label: "Documentation", href: "#docs" },
          { label: "Community Forum", href: "#forum" },
          { label: "System Status", href: "#status", external: true },
        ],
      },
    ],
    copyright: "© 2024 React Jedi. All rights reserved.",
  },
};

export const WideContainer: Story = {
  args: {
    layout: "standard",
    containerWidth: "wide",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};

export const FullWidthContainer: Story = {
  args: {
    layout: "columns-6",
    containerWidth: "full",
    variant: "gradient",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
    contactInfo: defaultContactInfo,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
};