/**
 * Carousel Component with JSON specification support
 *
 * This component bridges the gap between the JSON specification
 * and the shadcn/ui Carousel implementation.
 */

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ComponentProps as ReactJediComponentProps } from "@/types/schema/components";
import type { CarouselDef } from "@/types/components/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel";
import { render } from "@/lib/render";
import { isComponentSpec } from "@/types/schema/guards";

interface CarouselComponentProps extends ReactJediComponentProps {
  readonly spec: CarouselDef;
}

/**
 * CarouselComponent - Renders a carousel from JSON specification
 */
export function CarouselComponent({ spec }: CarouselComponentProps) {
  const {
    children,
    items,
    options,
    orientation = "horizontal",
    showArrows = true,
    showDots = false,
    autoplay,
    styles,
  } = spec;

  const className = spec.className;
  const style = spec.style;

  // Configure carousel options
  type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
  const carouselOptions: CarouselOptions = {
    ...options,
  };

  // Handle autoplay (would need the autoplay plugin)
  if (autoplay?.enabled) {
    // Note: autoplay would need to be implemented using embla-carousel-autoplay plugin
    console.warn("Autoplay is not yet implemented in the Carousel component");
  }

  // Determine what to render
  const renderItems = items || (children ? [children] : []);

  return (
    <Carousel
      opts={carouselOptions}
      orientation={orientation}
      className={className}
      style={styles || style}
    >
      <CarouselContent>
        {renderItems.map((item, index) => {
          let content;

          if (typeof item === "string") {
            content = item;
          } else if (Array.isArray(item)) {
            content = (
              <>
                {item.map((child, childIndex) => {
                  if (isComponentSpec(child)) {
                    return render(child);
                  }
                  return child;
                })}
              </>
            );
          } else if (isComponentSpec(item)) {
            content = render(item);
          } else {
            content = item;
          }

          return <CarouselItem key={index}>{content}</CarouselItem>;
        })}
      </CarouselContent>

      {showArrows && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}

      {showDots && (
        <div className="flex justify-center gap-2 py-2">
          {/* Note: Dots functionality would need to be implemented */}
          {/* This would require state management to track the current slide */}
        </div>
      )}
    </Carousel>
  );
}
