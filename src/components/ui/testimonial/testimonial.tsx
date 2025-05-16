import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Card, CardContent } from "../card";
import { Star } from "lucide-react";

export interface TestimonialProps {
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
  content: string;
  rating?: number;
  date?: string;
  variant?: "card" | "minimal" | "large" | "quote";
  highlight?: boolean;
  className?: string;
}

export const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  (
    { author, content, rating, date, variant = "card", highlight = false, className, ...props },
    ref
  ) => {
    const renderStars = (rating: number) => {
      return Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
          )}
        />
      ));
    };

    const renderAvatar = () => (
      <Avatar
        className={cn(
          "border-2",
          variant === "large" ? "h-16 w-16" : "h-12 w-12",
          highlight ? "border-primary" : "border-border"
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

    const renderAuthorInfo = () => (
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

    if (variant === "minimal") {
      return (
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          <p className="text-muted-foreground italic">&ldquo;{content}&rdquo;</p>
          <div className="flex items-center gap-3">
            {renderAvatar()}
            {renderAuthorInfo()}
          </div>
        </div>
      );
    }

    if (variant === "large") {
      return (
        <div
          ref={ref}
          className={cn(
            "relative p-8 rounded-2xl bg-gradient-to-br",
            highlight
              ? "from-primary/10 via-primary/5 to-transparent border border-primary/20"
              : "from-muted/50 via-background to-transparent border border-border",
            className
          )}
          {...props}
        >
          <div className="absolute -top-2 -left-2 text-6xl text-primary/20 font-serif">&ldquo;</div>
          <div className="relative z-10 space-y-6">
            {rating && <div className="flex gap-1">{renderStars(rating)}</div>}
            <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">
              {content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {renderAvatar()}
                {renderAuthorInfo()}
              </div>
              {date && <span className="text-sm text-muted-foreground">{date}</span>}
            </div>
          </div>
        </div>
      );
    }

    if (variant === "quote") {
      return (
        <figure
          ref={ref}
          className={cn(
            "border-l-4 pl-6",
            highlight ? "border-primary" : "border-border",
            className
          )}
          {...props}
        >
          <blockquote className="text-lg italic text-muted-foreground mb-4">{content}</blockquote>
          <figcaption className="flex items-center gap-3">
            {renderAvatar()}
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
          </figcaption>
        </figure>
      );
    }

    // Default card variant
    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-300",
          highlight && "border-primary shadow-lg shadow-primary/10 scale-[1.02]",
          className
        )}
        {...props}
      >
        <CardContent className="p-6 space-y-4">
          {rating && <div className="flex gap-1">{renderStars(rating)}</div>}
          <p className="text-muted-foreground italic">&ldquo;{content}&rdquo;</p>
          {date && <p className="text-sm text-muted-foreground">{date}</p>}
          <div className="flex items-center gap-3 pt-2">
            {renderAvatar()}
            {renderAuthorInfo()}
          </div>
        </CardContent>
      </Card>
    );
  }
);

Testimonial.displayName = "Testimonial";
