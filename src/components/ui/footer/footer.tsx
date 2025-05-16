"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Container } from "../container";
import { Text } from "../text";
import { Button } from "../button";
import { Input } from "../input";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
// Import social media icons from simple icons
import {
  SiFacebook,
  SiX, // Twitter has been renamed to X
  SiInstagram,
  SiYoutube,
  SiGithub,
} from "@icons-pack/react-simple-icons";
import { Building } from "lucide-react"; // Temporary icon for LinkedIn

const footerVariants = cva("relative w-full transition-colors duration-300", {
  variants: {
    variant: {
      default: "bg-gray-900 text-gray-300",
      light: "bg-gray-50 text-gray-700 border-t border-gray-200",
      dark: "bg-black text-gray-400",
      gradient: "bg-gradient-to-b from-gray-900 to-black text-gray-300",
      minimal: "bg-transparent text-gray-600 border-t border-gray-200",
    },
    size: {
      sm: "py-8",
      default: "py-12 md:py-16",
      lg: "py-16 md:py-24",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const socialIcons = {
  facebook: SiFacebook,
  twitter: SiX,
  instagram: SiInstagram,
  linkedin: Building, // Using Building icon as a temporary placeholder
  youtube: SiYoutube,
  github: SiGithub,
} as const;

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: keyof typeof socialIcons;
  href: string;
  label?: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface NewsletterConfig {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
}

interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  logo?: React.ReactNode;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  newsletter?: NewsletterConfig;
  copyright?: string;
  legalLinks?: FooterLink[];
  showDivider?: boolean;
  layout?: "default" | "centered" | "minimal";
}

// Helper components
const FooterLogo = ({ logo, description }: { logo?: React.ReactNode; description?: string }) => (
  <div className="mb-8 lg:mb-0">
    {logo && <div className="mb-4">{logo}</div>}
    {description && <Text className="max-w-xs text-sm opacity-80">{description}</Text>}
  </div>
);

const FooterSectionComponent = ({ section }: { section: FooterSection }) => (
  <div>
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
      {section.title}
    </h3>
    <ul className="space-y-3">
      {section.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="text-sm hover:opacity-100 opacity-80 transition-opacity inline-flex items-center gap-1"
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.label}
            {link.external && <ExternalLink className="h-3 w-3" />}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLinks = ({ links, variant }: { links: SocialLink[]; variant?: string | null }) => (
  <div className="flex gap-4">
    {links.map((link) => {
      const Icon = socialIcons[link.platform];
      return (
        <a
          key={link.platform}
          href={link.href}
          aria-label={link.label || link.platform}
          className={cn(
            "p-2 rounded-full transition-all duration-200",
            variant === "light"
              ? "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
              : "hover:bg-white/10 hover:text-white"
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className="h-5 w-5" />
        </a>
      );
    })}
  </div>
);

const ContactInfoComponent = ({ info }: { info: ContactInfo }) => (
  <div className="space-y-3">
    {info.email && (
      <a
        href={`mailto:${info.email}`}
        className="flex items-center gap-3 text-sm hover:opacity-100 opacity-80 transition-opacity"
      >
        <Mail className="h-4 w-4" />
        {info.email}
      </a>
    )}
    {info.phone && (
      <a
        href={`tel:${info.phone}`}
        className="flex items-center gap-3 text-sm hover:opacity-100 opacity-80 transition-opacity"
      >
        <Phone className="h-4 w-4" />
        {info.phone}
      </a>
    )}
    {info.address && (
      <div className="flex items-center gap-3 text-sm opacity-80">
        <MapPin className="h-4 w-4" />
        {info.address}
      </div>
    )}
  </div>
);

const Newsletter = ({
  newsletter,
  variant,
}: {
  newsletter: NewsletterConfig;
  variant?: string | null;
}) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletter.onSubmit && email) {
      newsletter.onSubmit(email);
      setEmail("");
    }
  };

  return (
    <div className="max-w-sm">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
        {newsletter.title || "Newsletter"}
      </h3>
      {newsletter.description && (
        <Text className="mb-4 text-sm opacity-80">{newsletter.description}</Text>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={newsletter.placeholder || "Enter your email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "flex-1",
            variant === "light"
              ? "bg-white border-gray-300"
              : "bg-white/10 border-white/20 text-white placeholder:text-white/60"
          )}
          required
        />
        <Button
          type="submit"
          size="default"
          variant={variant === "light" ? "default" : "secondary"}
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">{newsletter.buttonText || "Subscribe"}</span>
        </Button>
      </form>
    </div>
  );
};

const FooterBottom = ({
  copyright,
  legalLinks,
  variant,
}: {
  copyright?: string;
  legalLinks?: FooterLink[];
  variant?: string | null;
}) => (
  <div
    className={cn(
      "mt-8 pt-8 border-t",
      variant === "light" ? "border-gray-200" : "border-white/10"
    )}
  >
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      {copyright && <Text className="text-sm opacity-60">{copyright}</Text>}
      {legalLinks && legalLinks.length > 0 && (
        <div className="flex gap-6">
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:opacity-100 opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      variant,
      size,
      logo,
      description,
      sections = [],
      socialLinks = [],
      contactInfo,
      newsletter,
      copyright,
      legalLinks = [],
      showDivider = true,
      layout = "default",
      children,
      ...props
    },
    ref
  ) => {
    const renderDefaultLayout = () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <FooterLogo logo={logo} description={description} />
            {socialLinks.length > 0 && (
              <div className="mt-6">
                <SocialLinks links={socialLinks} variant={variant} />
              </div>
            )}
          </div>

          {/* Links Sections */}
          {sections.length > 0 && (
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {sections.map((section, index) => (
                  <FooterSectionComponent key={index} section={section} />
                ))}
              </div>
            </div>
          )}

          {/* Contact/Newsletter Section */}
          <div className="lg:col-span-3">
            {newsletter && <Newsletter newsletter={newsletter} variant={variant} />}
            {contactInfo && !newsletter && <ContactInfoComponent info={contactInfo} />}
          </div>
        </div>

        {/* Bottom Section */}
        {(copyright || legalLinks.length > 0) && showDivider && (
          <FooterBottom copyright={copyright} legalLinks={legalLinks} variant={variant} />
        )}
      </>
    );

    const renderCenteredLayout = () => (
      <>
        <div className="text-center">
          <FooterLogo logo={logo} description={description} />

          {sections.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
              {sections[0]?.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:opacity-100 opacity-80 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="mt-6 flex justify-center">
              <SocialLinks links={socialLinks} variant={variant} />
            </div>
          )}

          {newsletter && (
            <div className="mt-8 flex justify-center">
              <Newsletter newsletter={newsletter} variant={variant} />
            </div>
          )}
        </div>

        {(copyright || legalLinks.length > 0) && showDivider && (
          <FooterBottom copyright={copyright} legalLinks={legalLinks} variant={variant} />
        )}
      </>
    );

    const renderMinimalLayout = () => (
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          {logo && <div>{logo}</div>}
          {copyright && <Text className="text-sm opacity-60">{copyright}</Text>}
        </div>

        <div className="flex items-center gap-6">
          {sections[0]?.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:opacity-100 opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}

          {socialLinks.length > 0 && (
            <div className="ml-6 pl-6 border-l border-gray-300 dark:border-gray-700">
              <SocialLinks links={socialLinks} variant={variant} />
            </div>
          )}
        </div>
      </div>
    );

    const layoutRenderers = {
      default: renderDefaultLayout,
      centered: renderCenteredLayout,
      minimal: renderMinimalLayout,
    };

    return (
      <footer ref={ref} className={cn(footerVariants({ variant, size }), className)} {...props}>
        <Container>
          {layoutRenderers[layout]()}
          {children}
        </Container>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export { Footer, type FooterProps };
