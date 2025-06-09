import type { BaseComponentSpec } from "./base";

export interface PhotoFlipCardSpec extends BaseComponentSpec {
  type: "PhotoFlipCard";
  frontImage: string;
  frontImageAlt?: string;
  title?: string;
  description?: string;
  overlay?: {
    title?: string;
    description?: string;
    badge?: string;
    content?: unknown;
  };
  cta?: {
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    onClick?: string;
    href?: string;
  };
  variant?: "vertical-flip" | "horizontal-flip" | "fade" | "slide-reveal" | "rotation-3d";
  size?: "sm" | "md" | "lg" | "xl" | "auto";
  aspectRatio?: "square" | "video" | "portrait" | "wide" | "auto";
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  trigger?: "hover" | "click" | "touch";
  gradientOverlay?: {
    from?: string;
    to?: string;
    direction?: "to-t" | "to-tr" | "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl";
    opacity?: number;
  };
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  animated?: boolean;
  animationDuration?: number;
}

export interface PhotoFlipCardGridSpec extends BaseComponentSpec {
  type: "PhotoFlipCardGrid";
  cards: PhotoFlipCardSpec[];
  columns?: "1" | "2" | "3" | "4" | "auto";
  gap?: "sm" | "md" | "lg";
  animated?: boolean;
  staggerDelay?: number;
}