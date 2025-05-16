import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  variant?: "centered" | "left-aligned" | "split";
  primaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  };
  secondaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundGradient?: string;
  backgroundOverlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  title = "Hero Title",
  subtitle,
  description,
  variant = "centered",
  primaryAction,
  secondaryAction,
  backgroundImage,
  backgroundVideo,
  backgroundGradient,
  backgroundOverlay = true,
  className,
  children,
}) => {
  const contentAlignmentClass = {
    centered: "text-center items-center",
    "left-aligned": "text-left items-start",
    split: "text-left items-start md:items-center",
  }[variant];

  const containerClass = {
    centered: "mx-auto max-w-5xl",
    "left-aligned": "max-w-3xl",
    split: "grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto",
  }[variant];

  const backgroundStyle: React.CSSProperties = {};

  if (backgroundImage) {
    backgroundStyle.backgroundImage = `url(${backgroundImage})`;
    backgroundStyle.backgroundSize = "cover";
    backgroundStyle.backgroundPosition = "center";
  }

  if (backgroundGradient) {
    backgroundStyle.background = backgroundGradient;
  }

  return (
    <section
      className={cn("relative w-full py-24 md:py-32 lg:py-40 overflow-hidden", className)}
      style={backgroundStyle}
    >
      {/* Background Video */}
      {backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {/* Background Overlay */}
      {backgroundOverlay && (backgroundImage || backgroundVideo) && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      {/* Content Container */}
      <div className="relative z-10 container px-4 md:px-6">
        <div className={containerClass}>
          <div className={cn("flex flex-col gap-6", contentAlignmentClass)}>
            {/* Subtitle */}
            {subtitle && (
              <p className="text-sm md:text-base font-medium text-primary uppercase tracking-wide animate-fade-in">
                {subtitle}
              </p>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-in-up">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up animation-delay-200">
                {description}
              </p>
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                {primaryAction && (
                  <Button
                    variant={primaryAction.variant || "default"}
                    size="lg"
                    asChild={!!primaryAction.href}
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.href ? (
                      <a href={primaryAction.href}>{primaryAction.text}</a>
                    ) : (
                      primaryAction.text
                    )}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    variant={secondaryAction.variant || "outline"}
                    size="lg"
                    asChild={!!secondaryAction.href}
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.href ? (
                      <a href={secondaryAction.href}>{secondaryAction.text}</a>
                    ) : (
                      secondaryAction.text
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Custom Content (for split variant) */}
          {variant === "split" && children && (
            <div className="animate-fade-in-up animation-delay-600">{children}</div>
          )}
        </div>

        {/* Custom Content (for non-split variants) */}
        {variant !== "split" && children && (
          <div className={cn("mt-16", contentAlignmentClass)}>{children}</div>
        )}
      </div>
    </section>
  );
};

Hero.displayName = "Hero";
