"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import { Mail, Phone, MapPin, Send, ExternalLink, ChevronRight } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaTiktok,
  FaPinterest,
  FaDiscord,
  FaWhatsapp,
  FaTelegram,
  FaReddit,
} from "react-icons/fa6";

const footerVariants = cva("relative w-full transition-colors duration-300", {
  variants: {
    variant: {
      default: "bg-gray-900 text-gray-300",
      light: "bg-gray-50 text-gray-700 border-t border-gray-200",
      dark: "bg-black text-gray-400",
      gradient: "bg-gradient-to-b from-gray-900 to-black text-gray-300",
      minimal: "bg-transparent text-gray-600 border-t border-gray-200",
      brand: "bg-primary text-primary-foreground",
    },
    size: {
      minimal: "py-4",
      sm: "py-8",
      default: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      expanded: "py-20 md:py-32",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const socialIconMap = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  github: FaGithub,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  discord: FaDiscord,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  reddit: FaReddit,
} as const;

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: keyof typeof socialIconMap;
  href: string;
  label?: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  mapUrl?: string;
}

interface CompanyInfo {
  name?: string;
  logo?: React.ReactNode;
  description?: string;
  tagline?: string;
  established?: string;
  registration?: string;
}

interface NewsletterConfig {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  termsText?: string;
  termsLink?: string;
  onSubmit?: (email: string) => void | Promise<void>;
}

interface FooterBlockProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  companyInfo?: CompanyInfo;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  newsletter?: NewsletterConfig;
  copyright?: string;
  legalLinks?: FooterLink[];
  showDivider?: boolean;
  layout?: "minimal" | "standard" | "expanded" | "centered" | "columns-2" | "columns-3" | "columns-4" | "columns-5" | "columns-6";
  columnGap?: "tight" | "normal" | "wide";
  backgroundColor?: string;
  backgroundImage?: string;
  containerWidth?: "default" | "wide" | "full";
}

const CompanyInfoComponent = ({ info }: { info: CompanyInfo }) => (
  <div className="space-y-4">
    {info.logo && <div className="mb-4">{info.logo}</div>}
    {info.name && <h3 className="text-xl font-bold">{info.name}</h3>}
    {info.tagline && <p className="text-sm font-medium opacity-90">{info.tagline}</p>}
    {info.description && <Text className="text-sm opacity-80">{info.description}</Text>}
    <div className="space-y-1 text-xs opacity-70">
      {info.established && <p>Est. {info.established}</p>}
      {info.registration && <p>Reg. {info.registration}</p>}
    </div>
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
            className="group text-sm hover:opacity-100 opacity-80 transition-all duration-200 inline-flex items-center gap-2"
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.icon && <span className="text-xs">{link.icon}</span>}
            <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
            {link.external ? (
              <ExternalLink className="h-3 w-3 opacity-50" />
            ) : (
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-50 -ml-1 transition-opacity" />
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLinks = ({ 
  links, 
  variant,
  size = "default",
  showLabels = false 
}: { 
  links: SocialLink[]; 
  variant?: string | null;
  size?: "sm" | "default" | "lg";
  showLabels?: boolean;
}) => {
  const sizeClasses = {
    sm: "p-1.5 text-sm",
    default: "p-2",
    lg: "p-3 text-lg",
  };
  
  const baseClasses = "rounded-lg transition-all duration-200 flex items-center gap-2";
  
  let variantClasses = "hover:bg-white/10 hover:text-white";
  if (variant === "light") {
    variantClasses = "hover:bg-gray-200 text-gray-600 hover:text-gray-900";
  } else if (variant === "brand") {
    variantClasses = "hover:bg-white/20 hover:text-white";
  }

  return (
    <nav className="flex flex-wrap gap-3" aria-label="Social media links">
      {links.map((link) => {
        const Icon = socialIconMap[link.platform];
        return (
          <a
            key={link.platform}
            href={link.href}
            aria-label={link.label || link.platform}
            className={cn(
              baseClasses,
              sizeClasses[size],
              variantClasses
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon />
            {showLabels && <span className="text-xs">{link.label || link.platform}</span>}
          </a>
        );
      })}
    </nav>
  );
};

const ContactInfoComponent = ({ info, variant }: { info: ContactInfo; variant?: string | null }) => (
  <div className="space-y-4">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
      Contact Us
    </h3>
    <div className="space-y-3">
      {info.email && (
        <a
          href={`mailto:${info.email}`}
          className="flex items-center gap-3 text-sm hover:opacity-100 opacity-80 transition-opacity group"
        >
          <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
          {info.email}
        </a>
      )}
      {info.phone && (
        <a
          href={`tel:${info.phone.replaceAll(/[^\d+]/g, '')}`}
          className="flex items-center gap-3 text-sm hover:opacity-100 opacity-80 transition-opacity group"
        >
          <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
          {info.phone}
        </a>
      )}
      {info.address && (
        <div className="flex items-start gap-3 text-sm opacity-80">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{info.address}</span>
        </div>
      )}
      {info.hours && (
        <div className="text-sm opacity-70 mt-2">
          <p className="font-medium">Business Hours:</p>
          <p>{info.hours}</p>
        </div>
      )}
      {info.mapUrl && (
        <a
          href={info.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-100 opacity-80 transition-opacity mt-2"
        >
          <MapPin className="h-4 w-4" />
          View on Map
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  </div>
);

const getInputClasses = (variant?: string | null) => {
  if (variant === "light") {
    return "bg-white border-gray-300";
  }
  if (variant === "brand") {
    return "bg-white/20 border-white/30 text-white placeholder:text-white/70";
  }
  return "bg-white/10 border-white/20 text-white placeholder:text-white/60";
};

const Newsletter = ({
  newsletter,
  variant,
}: {
  newsletter: NewsletterConfig;
  variant?: string | null;
}) => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletter.onSubmit && email) {
      setIsLoading(true);
      try {
        await newsletter.onSubmit(email);
        setEmail("");
        setShowSuccess(true);
        globalThis.setTimeout(() => setShowSuccess(false), 3000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
        {newsletter.title || "Newsletter"}
      </h3>
      {newsletter.description && (
        <Text className="mb-4 text-sm opacity-80">{newsletter.description}</Text>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder={newsletter.placeholder || "Enter your email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "flex-1",
              getInputClasses(variant)
            )}
            required
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="default"
            variant={variant === "light" ? "default" : "secondary"}
            className="shrink-0"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">{newsletter.buttonText || "Subscribe"}</span>
          </Button>
        </div>
        {newsletter.termsText && (
          <p className="text-xs opacity-70">
            {newsletter.termsText}{" "}
            {newsletter.termsLink && (
              <a href={newsletter.termsLink} className="underline hover:opacity-100">
                Terms & Conditions
              </a>
            )}
          </p>
        )}
      </form>
      {showSuccess && (
        <p className="mt-2 text-sm text-green-500">
          {newsletter.successMessage || "Successfully subscribed!"}
        </p>
      )}
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
        <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:opacity-100 opacity-60 transition-opacity inline-flex items-center gap-1"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
              {link.external && <ExternalLink className="h-3 w-3" />}
            </a>
          ))}
        </nav>
      )}
    </div>
  </div>
);

const FooterBlock = React.forwardRef<HTMLElement, FooterBlockProps>(
  (
    {
      className,
      variant,
      size,
      companyInfo,
      sections = [],
      socialLinks = [],
      contactInfo,
      newsletter,
      copyright,
      legalLinks = [],
      showDivider = true,
      layout = "standard",
      columnGap = "normal",
      backgroundColor,
      backgroundImage,
      containerWidth = "default",
      children,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      tight: "gap-6 lg:gap-8",
      normal: "gap-8 lg:gap-12",
      wide: "gap-10 lg:gap-16",
    };

    const containerClasses = {
      default: "",
      wide: "max-w-screen-2xl",
      full: "max-w-none px-4 md:px-8",
    };

    const getColumnClass = () => {
      switch (layout) {
        case "columns-2": {
          return "grid-cols-1 md:grid-cols-2";
        }
        case "columns-3": {
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        }
        case "columns-4": {
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        }
        case "columns-5": {
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-5";
        }
        case "columns-6": {
          return "grid-cols-1 md:grid-cols-3 lg:grid-cols-6";
        }
        default: {
          return "";
        }
      }
    };

    const renderMinimalLayout = () => (
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {companyInfo?.logo && <div>{companyInfo.logo}</div>}
          {copyright && <Text className="text-sm opacity-60 text-center md:text-left">{copyright}</Text>}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {sections[0]?.links && (
            <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {sections[0].links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:opacity-100 opacity-60 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {socialLinks.length > 0 && (
            <div className="flex items-center">
              {sections[0]?.links && (
                <Separator orientation="vertical" className="h-6 mr-6 hidden md:block" />
              )}
              <SocialLinks links={socialLinks} variant={variant} size="sm" />
            </div>
          )}
        </div>
      </div>
    );

    const renderStandardLayout = () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            {companyInfo && <CompanyInfoComponent info={companyInfo} />}
            {socialLinks.length > 0 && (
              <div className="mt-6">
                <SocialLinks links={socialLinks} variant={variant} />
              </div>
            )}
          </div>

          {sections.length > 0 && (
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {sections.map((section, index) => (
                  <FooterSectionComponent key={index} section={section} />
                ))}
              </div>
            </div>
          )}

          <div className="lg:col-span-3">
            {newsletter && <Newsletter newsletter={newsletter} variant={variant} />}
            {contactInfo && !newsletter && <ContactInfoComponent info={contactInfo} variant={variant} />}
          </div>
        </div>

        {(copyright || legalLinks.length > 0) && showDivider && (
          <FooterBottom copyright={copyright} legalLinks={legalLinks} variant={variant} />
        )}
      </>
    );

    const renderExpandedLayout = () => (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            {companyInfo && <CompanyInfoComponent info={companyInfo} />}
            {contactInfo && (
              <div className="mt-8">
                <ContactInfoComponent info={contactInfo} variant={variant} />
              </div>
            )}
            {socialLinks.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
                  Follow Us
                </h3>
                <SocialLinks links={socialLinks} variant={variant} size="lg" showLabels />
              </div>
            )}
          </div>

          {sections.length > 0 && (
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {sections.map((section, index) => (
                  <FooterSectionComponent key={index} section={section} />
                ))}
              </div>
            </div>
          )}

          {newsletter && (
            <div className="lg:col-span-3">
              <Newsletter newsletter={newsletter} variant={variant} />
            </div>
          )}
        </div>

        {(copyright || legalLinks.length > 0) && showDivider && (
          <FooterBottom copyright={copyright} legalLinks={legalLinks} variant={variant} />
        )}
      </>
    );

    const renderCenteredLayout = () => (
      <>
        <div className="text-center max-w-2xl mx-auto">
          {companyInfo && (
            <div className="mb-8">
              {companyInfo.logo && <div className="flex justify-center mb-4">{companyInfo.logo}</div>}
              {companyInfo.name && <h3 className="text-xl font-bold mb-2">{companyInfo.name}</h3>}
              {companyInfo.description && (
                <Text className="text-sm opacity-80">{companyInfo.description}</Text>
              )}
            </div>
          )}

          {sections.length > 0 && (
            <nav className="mb-8">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
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
            </nav>
          )}

          {socialLinks.length > 0 && (
            <div className="mb-8 flex justify-center">
              <SocialLinks links={socialLinks} variant={variant} />
            </div>
          )}

          {newsletter && (
            <div className="mb-8 flex justify-center">
              <Newsletter newsletter={newsletter} variant={variant} />
            </div>
          )}
        </div>

        {(copyright || legalLinks.length > 0) && showDivider && (
          <FooterBottom copyright={copyright} legalLinks={legalLinks} variant={variant} />
        )}
      </>
    );

    const renderColumnLayout = () => (
      <>
        <div className={cn("grid", getColumnClass(), gapClasses[columnGap])}>
          {companyInfo && (
            <div>
              <CompanyInfoComponent info={companyInfo} />
              {socialLinks.length > 0 && (
                <div className="mt-6">
                  <SocialLinks links={socialLinks} variant={variant} />
                </div>
              )}
            </div>
          )}

          {sections.map((section, index) => (
            <FooterSectionComponent key={index} section={section} />
          ))}

          {contactInfo && <ContactInfoComponent info={contactInfo} variant={variant} />}
          {newsletter && <Newsletter newsletter={newsletter} variant={variant} />}
        </div>

        {(copyright || legalLinks.length > 0) && showDivider && (
          <FooterBottom copyright={copyright} legalLinks={legalLinks} variant={variant} />
        )}
      </>
    );

    const layoutRenderers = {
      minimal: renderMinimalLayout,
      standard: renderStandardLayout,
      expanded: renderExpandedLayout,
      centered: renderCenteredLayout,
      "columns-2": renderColumnLayout,
      "columns-3": renderColumnLayout,
      "columns-4": renderColumnLayout,
      "columns-5": renderColumnLayout,
      "columns-6": renderColumnLayout,
    };

    const footerStyle: React.CSSProperties = {
      backgroundColor,
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    return (
      <footer
        ref={ref}
        className={cn(footerVariants({ variant, size }), className)}
        style={footerStyle}
        {...props}
      >
        <Container className={containerClasses[containerWidth]}>
          {layoutRenderers[layout]()}
          {children}
        </Container>
      </footer>
    );
  }
);

FooterBlock.displayName = "FooterBlock";

export { FooterBlock, type FooterBlockProps, type FooterSection, type SocialLink, type ContactInfo, type CompanyInfo, type NewsletterConfig };