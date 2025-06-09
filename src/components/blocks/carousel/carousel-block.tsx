/**
 * Enhanced Carousel Block Component with multiple variants and advanced features
 *
 * This component provides a comprehensive carousel solution with support for:
 * - Multiple variants (gallery, content cards, testimonials, product showcase, fullscreen)
 * - Auto-play with pause on hover and interaction
 * - Touch/swipe support (via Embla)
 * - Dots and thumbnails navigation
 * - Ken Burns effect for images
 * - Lazy loading
 * - Zoom on click functionality
 * - Mobile-optimized touch interactions
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import type { ComponentProps as ReactJediComponentProps } from "../../../types/schema/components";
import type { CarouselDef } from "../../../types/components/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselThumbnails,
} from "./carousel";
import { render } from "../../../lib/render";
import { isComponentSpec } from "../../../types/schema/guards";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";

interface CarouselBlockProps extends ReactJediComponentProps {
  readonly spec: CarouselDef;
}

interface ImageItem {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface ContentItem {
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  cta?: {
    text: string;
    href?: string;
    action?: string;
  };
}

interface TestimonialItem {
  content: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    image?: string;
  };
  rating?: number;
}

interface ProductItem {
  name: string;
  price?: string;
  originalPrice?: string;
  image: string;
  description?: string;
  badge?: string;
  inStock?: boolean;
}

// Ken Burns effect component for images
function KenBurnsImage({ 
  src, 
  alt, 
  className,
  enableKenBurns = false,
  enableZoom = false,
  onZoom,
}: {
  readonly src: string;
  readonly alt?: string;
  readonly className?: string;
  readonly enableKenBurns?: boolean;
  readonly enableZoom?: boolean;
  readonly onZoom?: (src: string) => void;
}) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {!imageError && (
        <motion.img
          src={src}
          alt={alt || ""}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            enableKenBurns && "animate-ken-burns",
            enableZoom && "cursor-zoom-in hover:scale-105"
          )}
          style={{
            opacity: imageLoaded ? 1 : 0,
          }}
          onLoad={() => {
            // Use setTimeout to ensure state updates happen after React's render cycle
            if (typeof window !== 'undefined' && window.requestAnimationFrame) {
              window.requestAnimationFrame(() => setImageLoaded(true));
            } else {
              setImageLoaded(true);
            }
          }}
          onError={() => {
            // Use setTimeout to ensure state updates happen after React's render cycle
            if (typeof window !== 'undefined' && window.requestAnimationFrame) {
              window.requestAnimationFrame(() => setImageError(true));
            } else {
              setImageError(true);
            }
          }}
          loading="lazy"
          onClick={enableZoom ? () => onZoom?.(src) : undefined}
          whileHover={enableZoom ? { scale: 1.02 } : undefined}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {imageError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}

      {enableZoom && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/20 rounded-full p-1">
            <ZoomIn className="size-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

// Image Gallery Variant
function ImageGalleryCarousel({ 
  images, 
  enableKenBurns = true, 
  enableZoom = true,
  autoplay,
  showThumbnails = true,
  className,
}: {
  readonly images: ImageItem[];
  readonly enableKenBurns?: boolean;
  readonly enableZoom?: boolean;
  readonly autoplay?: CarouselDef["autoplay"];
  readonly showThumbnails?: boolean;
  readonly className?: string;
}) {
  const [zoomImage, setZoomImage] = React.useState<string | null>(null);

  const thumbnails = images.map(img => img.src);

  return (
    <>
      <Carousel
        variant="gallery"
        autoplay={autoplay}
        showDots={!showThumbnails}
        showThumbnails={showThumbnails}
        thumbnails={thumbnails}
        className={className}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="group">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <KenBurnsImage
                  src={image.src}
                  alt={image.alt}
                  enableKenBurns={enableKenBurns}
                  enableZoom={enableZoom}
                  onZoom={setZoomImage}
                  className="w-full h-full"
                />
                {image.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    {image.description && (
                      <p className="text-white/90 text-sm mt-1">{image.description}</p>
                    )}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        {!showThumbnails && <CarouselDots />}
        {showThumbnails && <CarouselThumbnails />}
      </Carousel>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setZoomImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomImage}
                alt="Zoomed view"
                className="max-w-full max-h-full object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-white/20"
                onClick={() => setZoomImage(null)}
              >
                <X className="size-4" />
                <span className="sr-only">Close zoom view</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Content Cards Variant
function ContentCardsCarousel({ 
  items, 
  autoplay,
  className,
}: {
  readonly items: ContentItem[];
  readonly autoplay?: CarouselDef["autoplay"];
  readonly className?: string;
}) {
  return (
    <Carousel
      variant="content"
      autoplay={autoplay}
      showDots={true}
      opts={{ align: "start" }}
      className={className}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              {item.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              <CardContent className={cn("p-6", item.image && "pt-0")}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.badge && (
                    <Badge variant="secondary">{item.badge}</Badge>
                  )}
                </div>
                {item.description && (
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                )}
                {item.cta && (
                  <Button variant="outline" size="sm">
                    {item.cta.text}
                  </Button>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  );
}

// Testimonials Variant
function TestimonialsCarousel({ 
  testimonials, 
  autoplay,
  variant = "cards",
  className,
}: {
  readonly testimonials: TestimonialItem[];
  readonly autoplay?: CarouselDef["autoplay"];
  readonly variant?: "cards" | "quotes";
  readonly className?: string;
}) {
  return (
    <Carousel
      variant="testimonials"
      autoplay={autoplay}
      showDots={true}
      opts={{ align: "center" }}
      className={className}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="basis-full md:basis-4/5 lg:basis-3/4">
            {variant === "cards" ? (
              <Card className="p-8 text-center">
                <CardContent className="space-y-6">
                  {testimonial.rating && (
                    <div className="flex justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "text-lg",
                            i < testimonial.rating! ? "text-yellow-400" : "text-muted-foreground"
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  <blockquote className="text-lg italic leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    {testimonial.author.image && (
                      <img
                        src={testimonial.author.image}
                        alt={testimonial.author.name}
                        className="size-12 rounded-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="text-left">
                      <div className="font-semibold">{testimonial.author.name}</div>
                      {testimonial.author.role && (
                        <div className="text-sm text-muted-foreground">
                          {testimonial.author.role}
                          {testimonial.author.company && ` at ${testimonial.author.company}`}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center space-y-6">
                <blockquote className="text-2xl italic leading-relaxed max-w-3xl mx-auto">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  {testimonial.author.image && (
                    <img
                      src={testimonial.author.image}
                      alt={testimonial.author.name}
                      className="size-16 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-lg">{testimonial.author.name}</div>
                    {testimonial.author.role && (
                      <div className="text-muted-foreground">
                        {testimonial.author.role}
                        {testimonial.author.company && ` at ${testimonial.author.company}`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  );
}

// Product Showcase Variant
function ProductShowcaseCarousel({ 
  products, 
  autoplay,
  className,
}: {
  readonly products: ProductItem[];
  readonly autoplay?: CarouselDef["autoplay"];
  readonly className?: string;
}) {
  return (
    <Carousel
      variant="showcase"
      autoplay={autoplay}
      showDots={true}
      opts={{ align: "start" }}
      className={className}
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <Card className="h-full group">
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                {product.badge && (
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    {product.badge}
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4 pt-0">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                {product.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  {product.price && (
                    <span className="font-bold text-lg">{product.price}</span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  );
}

// Fullscreen Variant
function FullscreenCarousel({ 
  images, 
  autoplay,
  enableKenBurns = true,
}: {
  readonly images: ImageItem[];
  readonly autoplay?: CarouselDef["autoplay"];
  readonly enableKenBurns?: boolean;
}) {
  return (
    <Carousel
      variant="fullscreen"
      autoplay={autoplay}
      showDots={true}
      className="h-screen"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-screen">
              <KenBurnsImage
                src={image.src}
                alt={image.alt}
                enableKenBurns={enableKenBurns}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-black/20" />
              {(image.title || image.description) && (
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                  <div className="max-w-4xl">
                    {image.title && (
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">{image.title}</h1>
                    )}
                    {image.description && (
                      <p className="text-xl md:text-2xl opacity-90">{image.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  );
}

/**
 * CarouselBlock - Enhanced carousel with multiple variants and advanced features
 */
export function CarouselBlock({ spec }: CarouselBlockProps) {
  const {
    children,
    items,
    options,
    orientation = "horizontal",
    showArrows = true,
    showDots = false,
    autoplay,
    styles,
    variant = "default",
    data,
  } = spec;

  const className = spec.className as string | undefined;
  const style = spec.style as React.CSSProperties | undefined;

  // Handle different variants based on data structure or explicit variant
  if (variant === "gallery" && data?.images) {
    return (
      <ImageGalleryCarousel
        images={data.images}
        autoplay={autoplay}
        enableKenBurns={data.enableKenBurns}
        enableZoom={data.enableZoom}
        showThumbnails={data.showThumbnails}
        className={className as string | undefined}
      />
    );
  }

  if (variant === "content" && data?.items) {
    return (
      <ContentCardsCarousel
        items={data.items}
        autoplay={autoplay}
        className={className as string | undefined}
      />
    );
  }

  if (variant === "testimonials" && data?.testimonials) {
    return (
      <TestimonialsCarousel
        testimonials={data.testimonials}
        autoplay={autoplay}
        variant={data.testimonialsVariant}
        className={className as string | undefined}
      />
    );
  }

  if (variant === "showcase" && data?.products) {
    return (
      <ProductShowcaseCarousel
        products={data.products}
        autoplay={autoplay}
        className={className as string | undefined}
      />
    );
  }

  if (variant === "fullscreen" && data?.images) {
    return (
      <FullscreenCarousel
        images={data.images}
        autoplay={autoplay}
        enableKenBurns={data.enableKenBurns}
      />
    );
  }

  // Default/fallback implementation for basic carousel
  const carouselOptions = { ...options };
  const renderItems = items || (children ? [children] : []);

  return (
    <Carousel
      opts={carouselOptions}
      orientation={orientation}
      autoplay={autoplay}
      showDots={showDots}
      className={className as string | undefined}
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
                    return <React.Fragment key={childIndex}>{render(child)}</React.Fragment>;
                  }
                  return <React.Fragment key={childIndex}>{child}</React.Fragment>;
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

      {showDots && <CarouselDots />}
    </Carousel>
  );
}