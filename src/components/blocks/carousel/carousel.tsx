import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { cn, cleanDOMProps } from "../../../lib/utils";
import { Button } from "../../ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoplay?: {
    enabled?: boolean;
    delay?: number;
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
  };
  showDots?: boolean;
  showThumbnails?: boolean;
  thumbnails?: string[];
  variant?: "default" | "gallery" | "content" | "testimonials" | "showcase" | "fullscreen";
  animated?: boolean;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  currentIndex: number;
  scrollTo: (index: number) => void;
  slideCount: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins = [],
  autoplay,
  showDots = false,
  showThumbnails = false,
  thumbnails = [],
  variant = "default",
  animated = true,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  // Configure autoplay plugin if enabled
  const autoplayPlugin = React.useMemo(() => {
    if (!autoplay?.enabled) return null;
    
    return Autoplay({
      delay: autoplay.delay || 4000,
      stopOnInteraction: autoplay.stopOnInteraction !== false,
      stopOnMouseEnter: autoplay.stopOnMouseEnter !== false,
    });
  }, [autoplay]);

  // Combine plugins
  const allPlugins = React.useMemo(() => {
    const pluginArray = [...plugins];
    if (autoplayPlugin) {
      pluginArray.push(autoplayPlugin);
    }
    return pluginArray;
  }, [plugins, autoplayPlugin]);

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    allPlugins
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setCurrentIndex(api.selectedScrollSnap());
    setSlideCount(api.scrollSnapList().length);
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    
    // Initialize carousel state
    onSelect(api);
    
    // Set up event listeners
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("reInit", onSelect);
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  const contextValue = React.useMemo(() => ({
    carouselRef,
    api: api,
    opts,
    orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    currentIndex,
    scrollTo,
    slideCount,
    autoplay,
    showDots,
    showThumbnails,
    thumbnails,
    variant,
    animated,
  }), [
    carouselRef,
    api,
    opts,
    orientation,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    currentIndex,
    scrollTo,
    slideCount,
    autoplay,
    showDots,
    showThumbnails,
    thumbnails,
    variant,
    animated,
  ]);

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn(
          "relative",
          variant === "fullscreen" && "h-screen w-screen",
          className
        )}
        role="region"
        aria-roledescription="carousel"
        aria-label={`Carousel with ${slideCount} slides, currently showing slide ${currentIndex + 1}`}
        data-slot="carousel"
        {...cleanDOMProps(props)}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
        {...cleanDOMProps(props)}
      />
    </div>
  );
}

function CarouselItem({ 
  className, 
  children,
  ...props 
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  const { orientation, variant, animated } = useCarousel();

  const content = animated ? (
    <motion.div
      initial={variant === "gallery" ? { opacity: 0, scale: 0.95 } : { opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  ) : children;

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        variant === "gallery" && "cursor-pointer",
        className
      )}
      {...cleanDOMProps(props)}
    >
      {content}
    </div>
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: Readonly<React.ComponentProps<typeof Button>>) {
  const { orientation, scrollPrev, canScrollPrev, variant: carouselVariant } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full z-10",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        carouselVariant === "fullscreen" && orientation === "horizontal" && "left-4",
        carouselVariant === "gallery" && "bg-black/20 border-white/20 text-white hover:bg-black/40",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...cleanDOMProps(props)}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: Readonly<React.ComponentProps<typeof Button>>) {
  const { orientation, scrollNext, canScrollNext, variant: carouselVariant } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full z-10",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        carouselVariant === "fullscreen" && orientation === "horizontal" && "right-4",
        carouselVariant === "gallery" && "bg-black/20 border-white/20 text-white hover:bg-black/40",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...cleanDOMProps(props)}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { slideCount, currentIndex, scrollTo, variant: carouselVariant } = useCarousel();

  if (slideCount <= 1) return null;

  return (
    <div
      className={cn(
        "flex justify-center gap-2 py-4",
        carouselVariant === "fullscreen" && "absolute bottom-4 left-1/2 -translate-x-1/2 z-10",
        className
      )}
      role="tablist"
      aria-label="Carousel navigation dots"
      {...cleanDOMProps(props)}
    >
      {Array.from({ length: slideCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to slide ${index + 1}`}
          className={cn(
            "size-2 rounded-full transition-all duration-200",
            index === currentIndex 
              ? "bg-primary scale-125" 
              : "bg-primary/30 hover:bg-primary/50",
            carouselVariant === "gallery" && "bg-white/40 data-[selected]:bg-white"
          )}
          onClick={() => scrollTo(index)}
          data-selected={index === currentIndex}
        />
      ))}
    </div>
  );
}

function CarouselThumbnails({ 
  className, 
  thumbnailClassName,
  ...props 
}: React.ComponentProps<"div"> & {
  thumbnailClassName?: string;
}) {
  const { thumbnails, currentIndex, scrollTo, slideCount } = useCarousel();

  if (!thumbnails || thumbnails.length === 0 || slideCount <= 1) return null;

  return (
    <div
      className={cn("flex gap-2 py-4 overflow-x-auto", className)}
      {...cleanDOMProps(props)}
    >
      {thumbnails.map((thumbnail, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "shrink-0 size-16 rounded-md overflow-hidden border-2 transition-all duration-200",
            index === currentIndex 
              ? "border-primary scale-105" 
              : "border-transparent opacity-60 hover:opacity-100",
            thumbnailClassName
          )}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        >
          <img
            src={thumbnail}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselThumbnails,
  useCarousel,
};