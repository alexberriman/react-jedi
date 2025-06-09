import type { BaseComponentSpec } from "../schema/base";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

export interface PageSectionDef extends BaseComponentSpec {
  type: "PageSection";
  variant?: "default" | "bordered" | "elevated" | "glass" | "gradient" | "inverted";
  layout?: "default" | "image-left" | "image-right" | "two-column" | "centered" | "hero" | "feature-alternating";
  heading?: {
    title?: string;
    subtitle?: string;
    description?: string;
    alignment?: "left" | "center" | "right";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  };
  ctas?: Array<{
    text: string;
    href: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    iconPosition?: "left" | "right";
  }>;
  image?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    aspectRatio?: string;
    rounded?: boolean;
  };
  background?: {
    type?: "solid" | "gradient" | "pattern" | "image" | "video" | "animated-gradient";
    color?: string;
    gradient?: {
      from: string;
      to: string;
      via?: string;
      direction?: "to-t" | "to-tr" | "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl" | "radial";
    };
    pattern?: "dots" | "grid" | "lines" | "waves" | "zigzag" | "circles" | "plus" | "cross";
    patternOpacity?: number;
    image?: {
      src: string;
      overlay?: boolean;
      overlayOpacity?: number;
      parallax?: boolean;
      position?: string;
    };
  };
  contentMaxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  removeContainerPadding?: boolean;
  aspectRatio?: string;
  dividers?: {
    top?: {
      type: "wave" | "curve" | "slant" | "arrow" | "zigzag" | "mountains" | "clouds";
      flip?: boolean;
      height?: "sm" | "md" | "lg";
      color?: string;
    };
    bottom?: {
      type: "wave" | "curve" | "slant" | "arrow" | "zigzag" | "mountains" | "clouds";
      flip?: boolean;
      height?: "sm" | "md" | "lg";
      color?: string;
    };
  };
  animation?: {
    type?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "slide-up" | "slide-down" | "rotate-in" | "blur-in";
    duration?: number;
    delay?: number;
    stagger?: boolean;
  };
  height?: "auto" | "screen" | "min-screen" | "1/2-screen" | "3/4-screen";
  // children is inherited from BaseComponentSpec with type ComponentChildren
}