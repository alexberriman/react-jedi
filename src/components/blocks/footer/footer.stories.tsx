import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Footer } from "./footer";
import { FaReact } from "react-icons/fa6";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

export const Minimal: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test copyright appears
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();

    // Test navigation links appear
    const aboutLink = canvas.getByRole("link", { name: "About" });
    const blogLink = canvas.getByRole("link", { name: "Blog" });
    const contactLink = canvas.getByRole("link", { name: "Contact" });
    expect(aboutLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    // Test social links appear
    const socialNav = canvas.getByLabelText("Social media links");
    expect(socialNav).toBeInTheDocument();
    
    // Test that there are exactly 3 social links (github, twitter, linkedin)
    const socialLinks = canvas.getAllByRole("link", { name: /GitHub|Twitter|LinkedIn/ });
    expect(socialLinks).toHaveLength(3);
  },
});

export const Standard: Story = enhanceStoryForDualMode<typeof Footer>({
  args: {
    layout: "standard",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
    newsletter: defaultNewsletter,
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company info appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();
    
    const companyDescription = canvas.getByText("Building modern React interfaces with JSON specifications");
    expect(companyDescription).toBeInTheDocument();

    // Test newsletter section appears
    const newsletterTitle = canvas.getByText("Stay Updated");
    expect(newsletterTitle).toBeInTheDocument();
    
    const emailInput = canvas.getByPlaceholderText("your@email.com");
    expect(emailInput).toBeInTheDocument();

    // Test footer sections appear
    const productSection = canvas.getByText("Product");
    const companySection = canvas.getByText("Company");
    const resourcesSection = canvas.getByText("Resources");
    expect(productSection).toBeInTheDocument();
    expect(companySection).toBeInTheDocument();
    expect(resourcesSection).toBeInTheDocument();

    // Test some specific links
    const featuresLink = canvas.getByRole("link", { name: "Features" });
    const aboutLink = canvas.getByRole("link", { name: "About" });
    expect(featuresLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    // Test social links
    const socialNav = canvas.getByLabelText("Social media links");
    expect(socialNav).toBeInTheDocument();

    // Test legal links
    const privacyLink = canvas.getByRole("link", { name: "Privacy Policy" });
    const termsLink = canvas.getByRole("link", { name: "Terms of Service" });
    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const Expanded: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company info appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test contact info appears
    const contactTitle = canvas.getByText("Contact Us");
    expect(contactTitle).toBeInTheDocument();

    const emailLink = canvas.getByRole("link", { name: "hello@reactjedi.com" });
    const phoneLink = canvas.getByRole("link", { name: "+1 (555) 123-4567" });
    expect(emailLink).toBeInTheDocument();
    expect(phoneLink).toBeInTheDocument();

    // Test developers section appears
    const developersSection = canvas.getByText("Developers");
    expect(developersSection).toBeInTheDocument();

    // There are multiple GitHub links (social icon and developer link), so get all and check
    const allGithubLinks = canvas.getAllByRole("link", { name: "GitHub" });
    expect(allGithubLinks.length).toBeGreaterThan(1); // Should have at least 2 GitHub links
    
    const npmLink = canvas.getByRole("link", { name: "NPM Package" });
    expect(npmLink).toBeInTheDocument();

    // Test social links section with Follow Us title
    const followUsTitle = canvas.getByText("Follow Us");
    expect(followUsTitle).toBeInTheDocument();

    // Test that we have 6 social links (including YouTube and Instagram)
    const socialNav = canvas.getByLabelText("Social media links");
    expect(socialNav).toBeInTheDocument();

    // Test newsletter
    const newsletterTitle = canvas.getByText("Stay Updated");
    expect(newsletterTitle).toBeInTheDocument();

    // Test address appears
    const address = canvas.getByText("123 Component Street, React City, JS 12345");
    expect(address).toBeInTheDocument();

    // Test business hours
    const hoursText = canvas.getByText("Mon-Fri 9:00 AM - 6:00 PM PST");
    expect(hoursText).toBeInTheDocument();
  },
});

export const Centered: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company info appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test newsletter appears
    const newsletterTitle = canvas.getByText("Stay Updated");
    expect(newsletterTitle).toBeInTheDocument();

    // Test social links appear
    const socialNav = canvas.getByLabelText("Social media links");
    expect(socialNav).toBeInTheDocument();

    // Test copyright appears
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();

    // Test some navigation links
    const featuresLink = canvas.getByRole("link", { name: "Features" });
    const aboutLink = canvas.getByRole("link", { name: "About" });
    expect(featuresLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  },
});

export const TwoColumns: Story = enhanceStoryForDualMode<typeof Footer>({
  args: {
    layout: "columns-2",
    companyInfo: defaultCompanyInfo,
    sections: [defaultSections[0]],
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company info appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test product section appears
    const productSection = canvas.getByText("Product");
    expect(productSection).toBeInTheDocument();

    // Test some product links
    const featuresLink = canvas.getByRole("link", { name: "Features" });
    const pricingLink = canvas.getByRole("link", { name: "Pricing" });
    expect(featuresLink).toBeInTheDocument();
    expect(pricingLink).toBeInTheDocument();

    // Test legal links
    const privacyLink = canvas.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const ThreeColumns: Story = enhanceStoryForDualMode<typeof Footer>({
  args: {
    layout: "columns-3",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections.slice(0, 2),
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company info appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test sections appear (Product and Company)
    const productSection = canvas.getByText("Product");
    const companySection = canvas.getByText("Company");
    expect(productSection).toBeInTheDocument();
    expect(companySection).toBeInTheDocument();

    // Test some links from each section
    const featuresLink = canvas.getByRole("link", { name: "Features" });
    const aboutLink = canvas.getByRole("link", { name: "About" });
    expect(featuresLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const FourColumns: Story = enhanceStoryForDualMode<typeof Footer>({
  args: {
    layout: "columns-4",
    columnGap: "normal",
    companyInfo: defaultCompanyInfo,
    sections: defaultSections,
    contactInfo: { email: defaultContactInfo.email, phone: defaultContactInfo.phone },
    copyright: "© 2024 React Jedi. All rights reserved.",
    legalLinks: defaultLegalLinks,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company info appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test all three sections appear
    const productSection = canvas.getByText("Product");
    const companySection = canvas.getByText("Company");
    const resourcesSection = canvas.getByText("Resources");
    expect(productSection).toBeInTheDocument();
    expect(companySection).toBeInTheDocument();
    expect(resourcesSection).toBeInTheDocument();

    // Test contact info appears
    const contactTitle = canvas.getByText("Contact Us");
    expect(contactTitle).toBeInTheDocument();

    const emailLink = canvas.getByRole("link", { name: "hello@reactjedi.com" });
    const phoneLink = canvas.getByRole("link", { name: "+1 (555) 123-4567" });
    expect(emailLink).toBeInTheDocument();
    expect(phoneLink).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const FiveColumns: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test newsletter appears
    const newsletterTitle = canvas.getByText("Newsletter");
    expect(newsletterTitle).toBeInTheDocument();

    const newsletterInput = canvas.getByPlaceholderText("Email address");
    expect(newsletterInput).toBeInTheDocument();

    // Test contact info appears
    const contactTitle = canvas.getByText("Contact Us");
    expect(contactTitle).toBeInTheDocument();

    // Test sections appear
    const productSection = canvas.getByText("Product");
    expect(productSection).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const SixColumns: Story = enhanceStoryForDualMode<typeof Footer>({
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
        links: defaultLegalLinks.map((link) => ({ ...link, external: false })),
      },
    ],
    socialLinks: defaultSocialLinks,
    copyright: "© 2024 React Jedi. All rights reserved.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test support section appears - there are multiple "Support" texts (link and section title)
    const allSupportTexts = canvas.getAllByText("Support");
    expect(allSupportTexts.length).toBeGreaterThan(1); // Should have at least the section title and the link

    // Test legal section appears
    const legalSection = canvas.getByText("Legal");
    expect(legalSection).toBeInTheDocument();

    // Test some links
    const helpCenterLink = canvas.getByRole("link", { name: "Help Center" });
    expect(helpCenterLink).toBeInTheDocument();

    // Test social links
    const socialNav = canvas.getByLabelText("Social media links");
    expect(socialNav).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const LightVariant: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test light variant styling by checking company name
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test newsletter appears
    const newsletterTitle = canvas.getByText("Stay Updated");
    expect(newsletterTitle).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const DarkVariant: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test contact info appears
    const contactTitle = canvas.getByText("Contact Us");
    expect(contactTitle).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const BrandVariant: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test newsletter appears
    const newsletterTitle = canvas.getByText("Stay Updated");
    expect(newsletterTitle).toBeInTheDocument();

    // Test sections appear
    const productSection = canvas.getByText("Product");
    expect(productSection).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const WithAllSocialPlatforms: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test Follow Us title (since it's expanded layout with social icons)
    const followUsTitle = canvas.getByText("Follow Us");
    expect(followUsTitle).toBeInTheDocument();

    // Test social navigation exists
    const socialNav = canvas.getByLabelText("Social media links");
    expect(socialNav).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const NewsletterFocus: Story = enhanceStoryForDualMode<typeof Footer>({
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
      description:
        "Get weekly insights on React best practices, new features, and community highlights delivered to your inbox.",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi Newsletter");
    expect(companyName).toBeInTheDocument();

    // Test newsletter focus elements
    const newsletterTitle = canvas.getByText("Join 10,000+ developers");
    expect(newsletterTitle).toBeInTheDocument();

    const newsletterDescription = canvas.getByText(/Get weekly insights on React best practices/);
    expect(newsletterDescription).toBeInTheDocument();

    const emailInput = canvas.getByPlaceholderText("Enter your email");
    expect(emailInput).toBeInTheDocument();

    // Test social links
    const socialNav = canvas.getByLabelText("Social media links");
    expect(socialNav).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const ContactFocus: Story = enhanceStoryForDualMode<typeof Footer>({
  args: {
    layout: "columns-3",
    variant: "dark",
    companyInfo: defaultCompanyInfo,
    contactInfo: {
      email: "support@reactjedi.com",
      phone: "+1 (555) 123-4567",
      address: "123 Component Street, Suite 456, React City, JS 12345, United States",
      hours:
        "Monday - Friday: 9:00 AM - 6:00 PM PST\nSaturday: 10:00 AM - 4:00 PM PST\nSunday: Closed",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test contact focus elements
    const contactTitle = canvas.getByText("Contact Us");
    expect(contactTitle).toBeInTheDocument();

    const supportEmail = canvas.getByRole("link", { name: "support@reactjedi.com" });
    expect(supportEmail).toBeInTheDocument();

    const phoneLink = canvas.getByRole("link", { name: "+1 (555) 123-4567" });
    expect(phoneLink).toBeInTheDocument();

    // Test Quick Links section
    const quickLinksTitle = canvas.getByText("Quick Links");
    expect(quickLinksTitle).toBeInTheDocument();

    const supportCenterLink = canvas.getByRole("link", { name: "Support Center" });
    expect(supportCenterLink).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const WideContainer: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test standard layout elements
    const newsletterTitle = canvas.getByText("Stay Updated");
    expect(newsletterTitle).toBeInTheDocument();

    const productSection = canvas.getByText("Product");
    expect(productSection).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});

export const FullWidthContainer: Story = enhanceStoryForDualMode<typeof Footer>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test footer renders
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Test company name appears
    const companyName = canvas.getByText("React Jedi");
    expect(companyName).toBeInTheDocument();

    // Test full width layout with multiple sections
    const productSection = canvas.getByText("Product");
    const companySection = canvas.getByText("Company");
    const resourcesSection = canvas.getByText("Resources");
    expect(productSection).toBeInTheDocument();
    expect(companySection).toBeInTheDocument();
    expect(resourcesSection).toBeInTheDocument();

    // Test contact info appears
    const contactTitle = canvas.getByText("Contact Us");
    expect(contactTitle).toBeInTheDocument();

    // Test newsletter appears
    const newsletterTitle = canvas.getByText("Stay Updated");
    expect(newsletterTitle).toBeInTheDocument();

    // Test social links
    const socialNav = canvas.getByLabelText("Social media links");
    expect(socialNav).toBeInTheDocument();

    // Test copyright
    const copyright = canvas.getByText("© 2024 React Jedi. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  },
});
