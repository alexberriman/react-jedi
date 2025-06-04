import * as React from "react";
import { cn, omit } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Container } from "../../ui/container";
import { Heading } from "../../ui/heading";
import { Text } from "../../ui/text";
import { ChevronRight, Play, ArrowRight } from "lucide-react";

export interface PageHeroHeaderCTAProperties {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg";
  icon?: "arrow" | "chevron" | "play" | "none";
  iconPosition?: "left" | "right";
}

export interface PageHeroHeaderStatProperties {
  value: string;
  label: string;
}

export interface PageHeroHeaderProperties {
  variant?: "centered" | "split" | "fullscreen" | "minimal" | "left-aligned" | "right-aligned" | "multi-column";
  title: string;
  titleLevel?: "h1" | "h2" | "h3";
  subtitle?: string;
  description?: string;
  primaryCTA?: PageHeroHeaderCTAProperties;
  secondaryCTA?: PageHeroHeaderCTAProperties;
  tertiaryLink?: {
    label: string;
    href: string;
  };
  badges?: Array<{
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  }>;
  stats?: PageHeroHeaderStatProperties[];
  image?: {
    src: string;
    alt: string;
    position?: "right" | "left" | "background" | "bottom";
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    priority?: boolean;
  };
  video?: {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
  backgroundImage?: {
    src: string;
    overlay?: "dark" | "light" | "gradient" | "none";
    overlayOpacity?: number;
    parallax?: boolean;
  };
  height?: "full" | "large" | "medium" | "auto";
  alignment?: "left" | "center" | "right";
  spacing?: "tight" | "normal" | "loose";
  backgroundColor?: string;
  textColor?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  animated?: boolean;
  className?: string;
  // React Jedi specific props that should not be passed to DOM
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
  readonly conditionalProps?: Record<string, unknown>;
  readonly computedProps?: Record<string, unknown>;
  readonly when?: string | boolean;
  readonly eventActions?: Record<string, unknown>;
}

function HeroCTA({
  label,
  href,
  onClick,
  variant = "default",
  size = "default",
  icon = "none",
  iconPosition = "right",
}: Readonly<PageHeroHeaderCTAProperties>) {
  const iconElement = icon !== "none" && (
    <span
      className={cn(
        "inline-flex shrink-0",
        size === "sm" && "h-3 w-3",
        size === "default" && "h-4 w-4",
        size === "lg" && "h-5 w-5"
      )}
    >
      {icon === "arrow" && <ArrowRight />}
      {icon === "chevron" && <ChevronRight />}
      {icon === "play" && <Play />}
    </span>
  );

  const content = (
    <>
      {iconPosition === "left" && iconElement}
      <span>{label}</span>
      {iconPosition === "right" && iconElement}
    </>
  );

  const handleClick = () => {
    if (onClick) onClick();
    if (href && !onClick) globalThis.location.href = href;
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
        "gap-2",
        icon !== "none" && iconPosition === "right" && "pr-3",
        icon !== "none" && iconPosition === "left" && "pl-3"
      )}
    >
      {content}
    </Button>
  );
}

export function PageHeroHeader({
  variant = "centered",
  title,
  titleLevel = "h1",
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  tertiaryLink,
  badges,
  stats,
  image,
  video,
  backgroundImage,
  height = "large",
  alignment = variant === "centered" ? "center" : "left",
  spacing = "normal",
  backgroundColor,
  textColor,
  maxWidth = "xl",
  animated = true,
  className,
  ...props
}: Readonly<PageHeroHeaderProperties>) {
  const cleanProps = omit(props, [
    "parentContext",
    "spec",
    "theme",
    "state",
    "conditionalProps",
    "computedProps",
    "when",
    "eventActions",
  ]);

  const heightClasses = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]",
    auto: "",
  };

  const spacingClasses = {
    tight: "py-12 md:py-16 lg:py-20",
    normal: "py-16 md:py-24 lg:py-32",
    loose: "py-24 md:py-32 lg:py-40",
  };

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const overlayClasses = {
    dark: "bg-black",
    light: "bg-white",
    gradient: "bg-gradient-to-b from-black/80 to-black/20",
    none: "",
  };

  const renderBadges = () => {
    if (!badges || badges.length === 0) return null;

    return (
      <div
        className={cn(
          "flex gap-2 flex-wrap",
          alignment === "center" && "justify-center",
          alignment === "right" && "justify-end"
        )}
      >
        {badges.map((badge, index) => (
          <Badge key={index} variant={badge.variant}>
            {badge.text}
          </Badge>
        ))}
      </div>
    );
  };

  const renderStats = () => {
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-8 mt-12",
          stats.length === 2 && "grid-cols-2",
          stats.length === 3 && "grid-cols-3",
          stats.length >= 4 && "grid-cols-2 md:grid-cols-4",
          alignment === "center" && "text-center",
          alignment === "right" && "text-right"
        )}
      >
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderCTAs = () => {
    if (!primaryCTA && !secondaryCTA && !tertiaryLink) return null;

    return (
      <div
        className={cn(
          "flex flex-wrap gap-4 items-center",
          alignment === "center" && "justify-center",
          alignment === "right" && "justify-end"
        )}
      >
        {primaryCTA && <HeroCTA {...primaryCTA} />}
        {secondaryCTA && <HeroCTA {...secondaryCTA} />}
        {tertiaryLink && (
          <a
            href={tertiaryLink.href}
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            {tertiaryLink.label}
          </a>
        )}
      </div>
    );
  };

  const renderContentBlock = () => (
    <div
      className={cn(
        "space-y-6",
        variant === "split" && image?.position === "right" && "lg:pr-12",
        variant === "split" && image?.position === "left" && "lg:pl-12",
        alignment === "center" && "w-full"
      )}
    >
      {renderBadges()}

      <div className={cn(
        "space-y-4",
        alignment === "center" && "w-full"
      )}>
        <Heading
          level={titleLevel}
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
            variant === "fullscreen" && backgroundImage && "text-white",
            alignment === "center" && "text-center"
          )}
        >
          {title}
        </Heading>

        {subtitle && (
          <Text
            className={cn(
              "text-xl md:text-2xl font-medium",
              variant === "fullscreen" && backgroundImage
                ? "text-white/90"
                : "text-muted-foreground",
              alignment === "center" && "text-center"
            )}
          >
            {subtitle}
          </Text>
        )}

        {description && (
          <Text
            className={cn(
              "text-base md:text-lg max-w-3xl",
              alignment === "center" && "mx-auto text-center",
              alignment === "right" && "ml-auto",
              variant === "fullscreen" && backgroundImage
                ? "text-white/80"
                : "text-muted-foreground"
            )}
          >
            {description}
          </Text>
        )}
      </div>

      {renderCTAs()}
      {renderStats()}
    </div>
  );

  const renderImageBlock = () => {
    if (!image || variant === "fullscreen") return null;

    return (
      <div
        className={cn(
          "relative",
          variant === "split" && "lg:flex-1",
          image.position === "bottom" && "mt-12"
        )}
      >
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "w-full h-full rounded-lg",
            image.objectFit && `object-${image.objectFit}`
          )}
          loading={image.priority ? "eager" : "lazy"}
        />
      </div>
    );
  };

  const renderContent = () => {
    const contentBlock = renderContentBlock();
    const imageBlock = renderImageBlock();

    switch (variant) {
      case "split": {
        return (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {image?.position === "left" ? (
              <>
                {imageBlock}
                {contentBlock}
              </>
            ) : (
              <>
                {contentBlock}
                {imageBlock}
              </>
            )}
          </div>
        );
      }

      case "multi-column": {
        return (
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">{contentBlock}</div>
            <div className="space-y-8">
              {/* Additional content area for features, testimonials, etc. */}
            </div>
          </div>
        );
      }

      case "left-aligned":
      case "right-aligned": {
        return (
          <div className={cn("max-w-3xl", alignment === "right" && "ml-auto")}>
            {contentBlock}
            {imageBlock}
          </div>
        );
      }

      case "minimal": {
        return <div className="max-w-3xl mx-auto">{contentBlock}</div>;
      }

      default: {
        return (
          <>
            {contentBlock}
            {imageBlock}
          </>
        );
      }
    }
  };

  const renderVideo = () => {
    if (!video) return null;

    return (
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={video.src}
        poster={video.poster}
        autoPlay={video.autoPlay}
        loop={video.loop}
        muted={video.muted ?? true}
        playsInline
        aria-hidden="true"
      >
        <track kind="captions" />
      </video>
    );
  };

  const renderBackgroundOverlay = () => {
    if (!backgroundImage || backgroundImage.overlay === "none") return null;

    return (
      <div
        className={cn(
          "absolute inset-0",
          overlayClasses[backgroundImage.overlay ?? "dark"]
        )}
        style={{ opacity: backgroundImage.overlayOpacity ?? 0.5 }}
      />
    );
  };

  const sectionClasses = cn(
    "relative overflow-hidden",
    heightClasses[height],
    spacingClasses[spacing],
    alignmentClasses[alignment],
    backgroundColor,
    animated && "animate-in fade-in duration-700",
    className
  );

  const containerClasses = cn(
    "relative z-10",
    variant === "fullscreen" && "h-full flex items-center"
  );

  return (
    <section
      data-slot="page-hero-header"
      className={sectionClasses}
      style={{
        color: textColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage.src})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      {...cleanProps}
    >
      {renderVideo()}
      {renderBackgroundOverlay()}

      <Container 
        size={(() => {
          if (maxWidth === "full") return undefined;
          if (maxWidth === "2xl") return "xl";
          return maxWidth;
        })()}
        className={cn(
          containerClasses,
          maxWidth === "full" && "max-w-full"
        )}
      >
        {renderContent()}
      </Container>
    </section>
  );
}

PageHeroHeader.displayName = "PageHeroHeader";