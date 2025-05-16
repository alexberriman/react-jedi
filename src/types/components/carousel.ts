import type { BaseComponentSpec } from "../schema/base";
import type { ComponentChildren } from "../schema/base";

export interface CarouselDef extends BaseComponentSpec {
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
  autoplay?: {
    enabled?: boolean;
    delay?: number;
    stopOnInteraction?: boolean;
  };
}
