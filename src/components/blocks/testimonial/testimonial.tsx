import * as React from "react";
import { cn, cleanDOMProps } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../carousel";
import { Star, Play, Quote } from "lucide-react";

export interface TestimonialAuthor {
  readonly name: string;
  readonly role?: string;
  readonly company?: string;
  readonly avatar?: string;
  readonly companyLogo?: string;
}

export interface TestimonialData {
  readonly id?: string;
  readonly author: TestimonialAuthor;
  readonly content: string;
  readonly rating?: number;
  readonly date?: string;
  readonly videoUrl?: string;
  readonly featured?: boolean;
  readonly source?: {
    readonly platform?: string;
    readonly url?: string;
  };
}

export interface TestimonialProps {
  readonly testimonials?: TestimonialData | TestimonialData[];
  readonly variant?: "single" | "carousel" | "grid" | "masonry" | "minimal" | "video";
  readonly layout?: "card" | "quote" | "large" | "compact" | "minimal";
  readonly columns?: 1 | 2 | 3 | 4;
  readonly autoplay?: boolean;
  readonly autoplayInterval?: number;
  readonly showNavigation?: boolean;
  readonly showDots?: boolean;
  readonly className?: string;
  readonly animated?: boolean;
}

interface TestimonialCardProps {
  readonly testimonial: TestimonialData;
  readonly layout?: TestimonialProps["layout"];
  readonly animated?: boolean;
  readonly className?: string;
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={cn(
        "h-4 w-4",
        i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
      )}
    />
  ));
}

function renderAvatar(author: TestimonialAuthor, layout: string, featured: boolean) {
  return (
    <Avatar
      className={cn(
        "border-2",
        layout === "large" ? "h-16 w-16" : "h-12 w-12",
        featured ? "border-primary" : "border-border"
      )}
    >
      <AvatarImage src={author.avatar} alt={author.name} />
      <AvatarFallback className="font-medium text-sm">
        {author.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

function renderAuthorInfo(author: TestimonialAuthor) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-foreground">{author.name}</span>
      {(author.role || author.company) && (
        <span className="text-sm text-muted-foreground">
          {author.role}
          {author.role && author.company && " at "}
          {author.company}
        </span>
      )}
    </div>
  );
}

function renderCompanyLogo(author: TestimonialAuthor) {
  if (!author.companyLogo) return null;
  return (
    <img
      src={author.companyLogo}
      alt={`${author.company} logo`}
      className="h-6 w-auto object-contain opacity-70 grayscale hover:grayscale-0 transition-all"
    />
  );
}

function renderVideoOverlay(
  videoUrl: string | undefined, 
  isVideoPlaying: boolean, 
  setIsVideoPlaying: (playing: boolean) => void
) {
  if (!videoUrl || isVideoPlaying) return null;
  return (
    <div 
      className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer group"
      role="button"
      tabIndex={0}
      onClick={() => setIsVideoPlaying(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsVideoPlaying(true);
        }
      }}
      aria-label="Play video testimonial"
    >
      <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
        <Play className="h-8 w-8 text-black fill-current" />
      </div>
    </div>
  );
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function TestimonialCard({
  testimonial,
  layout = "card",
  animated = true,
  className,
}: TestimonialCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const { author, content, rating, date, videoUrl, featured, source } = testimonial;

  if (layout === "minimal") {
    return (
      <div className={cn("space-y-4", animated && "transition-all duration-300", className)}>
        <p className="text-muted-foreground italic">&ldquo;{content}&rdquo;</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {renderAvatar(author, layout, featured || false)}
            {renderAuthorInfo(author)}
          </div>
          {renderCompanyLogo(author)}
        </div>
      </div>
    );
  }

  if (layout === "quote") {
    return (
      <figure
        className={cn(
          "border-l-4 pl-6",
          featured ? "border-primary" : "border-border",
          animated && "transition-all duration-300",
          className
        )}
      >
        {rating && <div className="flex gap-1 mb-3">{renderStars(rating)}</div>}
        <blockquote className="text-lg italic text-muted-foreground mb-4">{content}</blockquote>
        <figcaption className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {renderAvatar(author, layout, featured || false)}
            <div>
              <cite className="not-italic font-medium text-foreground">{author.name}</cite>
              {(author.role || author.company) && (
                <p className="text-sm text-muted-foreground">
                  {author.role}
                  {author.role && author.company && " at "}
                  {author.company}
                </p>
              )}
            </div>
          </div>
          {renderCompanyLogo(author)}
        </figcaption>
        {source && (
          <div className="mt-3 text-xs text-muted-foreground">
            {source.url ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Source: {source.platform || "View original"}
              </a>
            ) : (
              <span>via {source.platform}</span>
            )}
          </div>
        )}
      </figure>
    );
  }

  if (layout === "large") {
    return (
      <div
        className={cn(
          "relative p-8 rounded-2xl bg-gradient-to-br",
          featured
            ? "from-primary/10 via-primary/5 to-transparent border border-primary/20"
            : "from-muted/50 via-background to-transparent border border-border",
          animated && "transition-all duration-300 hover:shadow-lg",
          className
        )}
      >
        {videoUrl && (
          <div className="relative mb-6 rounded-lg overflow-hidden aspect-video">
            {isVideoPlaying ? (
              <iframe
                src={videoUrl}
                title={`Video testimonial from ${author.name}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={author.avatar || "https://via.placeholder.com/800x450"}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                {renderVideoOverlay(videoUrl, isVideoPlaying, setIsVideoPlaying)}
              </>
            )}
          </div>
        )}
        <div className="absolute -top-2 -left-2 text-6xl text-primary/20 font-serif">
          <Quote className="h-12 w-12 rotate-180" />
        </div>
        <div className="relative z-10 space-y-6">
          {rating && <div className="flex gap-1">{renderStars(rating)}</div>}
          <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">
            {content}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {renderAvatar(author, layout, featured || false)}
              {renderAuthorInfo(author)}
            </div>
            <div className="flex items-center gap-4">
              {renderCompanyLogo(author)}
              {date && <span className="text-sm text-muted-foreground">{date}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card layout
  return (
    <Card
      className={cn(
        "transition-all duration-300",
        featured && "border-primary shadow-lg shadow-primary/10 scale-[1.02]",
        animated && "hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-6 space-y-4">
        {videoUrl && (
          <div className="relative -m-6 mb-4 rounded-t-lg overflow-hidden aspect-video">
            {isVideoPlaying ? (
              <iframe
                src={videoUrl}
                title={`Video testimonial from ${author.name}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={author.avatar || "https://via.placeholder.com/400x225"}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                {renderVideoOverlay(videoUrl, isVideoPlaying, setIsVideoPlaying)}
              </>
            )}
          </div>
        )}
        {rating && <div className="flex gap-1">{renderStars(rating)}</div>}
        <p className="text-muted-foreground italic">&ldquo;{content}&rdquo;</p>
        {date && <p className="text-sm text-muted-foreground">{date}</p>}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            {renderAvatar(author, layout, featured || false)}
            {renderAuthorInfo(author)}
          </div>
          {renderCompanyLogo(author)}
        </div>
        {source && (
          <div className="pt-2 text-xs text-muted-foreground border-t">
            {source.url ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Source: {source.platform || "View original"}
              </a>
            ) : (
              <span>via {source.platform}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function renderSingleTestimonial(
  testimonialArray: TestimonialData[],
  layout: TestimonialProps["layout"],
  animated: boolean,
  className: string | undefined,
  props: Record<string, unknown>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={className} {...cleanDOMProps(props)}>
      <TestimonialCard
        testimonial={testimonialArray[0]}
        layout={layout}
        animated={animated}
      />
    </div>
  );
}

function renderCarouselTestimonials(
  testimonialArray: TestimonialData[],
  layout: TestimonialProps["layout"],
  animated: boolean,
  columns: number,
  autoplay: boolean,
  autoplayInterval: number,
  showNavigation: boolean,
  className: string | undefined,
  props: Record<string, unknown>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={cn("w-full", className)} {...cleanDOMProps(props)}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={undefined}
        className="w-full"
      >
        <CarouselContent>
          {testimonialArray.map((testimonial, index) => (
            <CarouselItem
              key={testimonial.id || index}
              className={cn(
                "basis-full",
                columns > 1 && "md:basis-1/2",
                columns > 2 && "lg:basis-1/3",
                columns > 3 && "xl:basis-1/4"
              )}
            >
              <div className="p-1">
                <TestimonialCard
                  testimonial={testimonial}
                  layout={layout}
                  animated={animated}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </>
        )}
      </Carousel>
    </div>
  );
}

function renderGridTestimonials(
  testimonialArray: TestimonialData[],
  layout: TestimonialProps["layout"],
  animated: boolean,
  columns: number,
  className: string | undefined,
  props: Record<string, unknown>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-6",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...cleanDOMProps(props)}
    >
      {testimonialArray.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id || index}
          testimonial={testimonial}
          layout={layout}
          animated={animated}
        />
      ))}
    </div>
  );
}

function renderMasonryTestimonials(
  testimonialArray: TestimonialData[],
  layout: TestimonialProps["layout"],
  animated: boolean,
  className: string | undefined,
  props: Record<string, unknown>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6",
        className
      )}
      {...cleanDOMProps(props)}
    >
      {testimonialArray.map((testimonial, index) => (
        <div key={testimonial.id || index} className="break-inside-avoid">
          <TestimonialCard
            testimonial={testimonial}
            layout={layout}
            animated={animated}
          />
        </div>
      ))}
    </div>
  );
}

function renderVideoTestimonials(
  testimonialArray: TestimonialData[],
  layout: TestimonialProps["layout"],
  animated: boolean,
  columns: number,
  className: string | undefined,
  props: Record<string, unknown>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const videoTestimonials = testimonialArray.filter(t => t.videoUrl);
  const textTestimonials = testimonialArray.filter(t => !t.videoUrl);

  return (
    <div ref={ref} className={cn("space-y-8", className)} {...cleanDOMProps(props)}>
      {videoTestimonials.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Video Testimonials</h3>
          <div className={cn(
            "grid gap-6",
            videoTestimonials.length === 1 && "grid-cols-1",
            videoTestimonials.length === 2 && "grid-cols-1 md:grid-cols-2",
            videoTestimonials.length >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}>
            {videoTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id || index}
                testimonial={testimonial}
                layout="large"
                animated={animated}
              />
            ))}
          </div>
        </div>
      )}
      {textTestimonials.length > 0 && (
        <div className="space-y-4">
          {videoTestimonials.length > 0 && (
            <h3 className="text-2xl font-semibold">More Testimonials</h3>
          )}
          <div className={cn(
            "grid gap-6",
            columns === 1 && "grid-cols-1",
            columns === 2 && "grid-cols-1 md:grid-cols-2",
            columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          )}>
            {textTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id || index}
                testimonial={testimonial}
                layout={layout}
                animated={animated}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

 
export const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  (
    {
      testimonials,
      variant = "single",
      layout = "card",
      columns = 3,
      autoplay = false,
      autoplayInterval = 5000,
      showNavigation = true,
      showDots = true,
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    let testimonialArray: TestimonialData[];
    if (Array.isArray(testimonials)) {
      testimonialArray = testimonials;
    } else if (testimonials) {
      testimonialArray = [testimonials];
    } else {
      testimonialArray = [];
    }

    if (testimonialArray.length === 0) {
      return null;
    }

    if (variant === "single" || testimonialArray.length === 1) {
      return renderSingleTestimonial(testimonialArray, layout, animated, className, props, ref);
    }

    if (variant === "carousel") {
      return renderCarouselTestimonials(
        testimonialArray, 
        layout, 
        animated, 
        columns, 
        autoplay, 
        autoplayInterval, 
        showNavigation, 
        className, 
        props, 
        ref
      );
    }

    if (variant === "grid") {
      return renderGridTestimonials(testimonialArray, layout, animated, columns, className, props, ref);
    }

    if (variant === "masonry") {
      return renderMasonryTestimonials(testimonialArray, layout, animated, className, props, ref);
    }

    if (variant === "video") {
      return renderVideoTestimonials(testimonialArray, layout, animated, columns, className, props, ref);
    }

    // Default to grid
    return renderGridTestimonials(testimonialArray, layout, animated, columns, className, props, ref);
  }
);

Testimonial.displayName = "Testimonial";