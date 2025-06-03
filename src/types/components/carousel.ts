import type { BaseComponentSpec } from "../schema/base";
import type { ComponentChildren } from "../schema/base";

export interface CarouselDef extends Omit<BaseComponentSpec, "data"> {
  type: "Carousel";
  children?: ComponentChildren;
  items?: ComponentChildren[];
  options?: {
    loop?: boolean;
    align?: "start" | "center" | "end";
    slidesToScroll?: number;
    dragFree?: boolean;
    containScroll?: "trimSnaps" | "keepSnaps";
  };
  orientation?: "horizontal" | "vertical";
  showArrows?: boolean;
  showDots?: boolean;
  showThumbnails?: boolean;
  autoplay?: {
    enabled?: boolean;
    delay?: number;
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
  };
  variant?: "default" | "gallery" | "content" | "testimonials" | "showcase" | "fullscreen";
  animated?: boolean;
  data?: {
    // Gallery variant data
    images?: Array<{
      src: string;
      alt?: string;
      title?: string;
      description?: string;
    }>;
    enableKenBurns?: boolean;
    enableZoom?: boolean;
    showThumbnails?: boolean;
    
    // Content cards variant data
    items?: Array<{
      title: string;
      description?: string;
      image?: string;
      badge?: string;
      cta?: {
        text: string;
        href?: string;
        action?: string;
      };
    }>;
    
    // Testimonials variant data
    testimonials?: Array<{
      content: string;
      author: {
        name: string;
        role?: string;
        company?: string;
        image?: string;
      };
      rating?: number;
    }>;
    testimonialsVariant?: "cards" | "quotes";
    
    // Product showcase variant data
    products?: Array<{
      name: string;
      price?: string;
      originalPrice?: string;
      image: string;
      description?: string;
      badge?: string;
      inStock?: boolean;
    }>;
  };
}
