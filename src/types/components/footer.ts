import type { BaseComponentProps } from "./base";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube" | "github";
  href: string;
  label?: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface NewsletterConfig {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: string;
}

export interface FooterProps extends BaseComponentProps {
  variant?: "default" | "light" | "dark" | "gradient" | "minimal";
  size?: "sm" | "default" | "lg";
  layout?: "default" | "centered" | "minimal";
  logo?: string | ComponentSpecification;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  newsletter?: NewsletterConfig;
  copyright?: string;
  legalLinks?: FooterLink[];
  showDivider?: boolean;
}

export interface ComponentSpecification {
  type: string;
  props?: Record<string, unknown>;
  children?: ComponentSpecification[];
}
