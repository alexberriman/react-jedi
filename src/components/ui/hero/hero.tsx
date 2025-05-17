import React, { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../button";
import { ChevronDown, Sparkles } from "lucide-react";

type ButtonVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";

export interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  variant?: "centered" | "left-aligned" | "split";
  primaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  secondaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundGradient?: string;
  backgroundOverlay?: boolean;
  animated?: boolean;
  floatingShapes?: boolean;
  parallax?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Helper components to reduce cognitive complexity
const AnimatedBackground = ({ animated }: { animated?: boolean }) => {
  if (!animated) return null;

  const defaultGradient =
    "linear-gradient(135deg, oklch(0.205 0 0), oklch(0.922 0 0), oklch(0.205 0 0))";

  return (
    <div
      className="absolute inset-0 opacity-10 animate-gradient-shift"
      style={{ background: defaultGradient }}
    />
  );
};

const FloatingShapes = ({ floatingShapes }: { floatingShapes?: boolean }) => {
  if (!floatingShapes) return null;

  return (
    <>
      <div className="floating-shape floating-shape-1" />
      <div className="floating-shape floating-shape-2" />
      <div className="floating-shape floating-shape-3" />
    </>
  );
};

const AnimatedSparkle = ({ animated, variant }: { animated?: boolean; variant?: string }) => {
  if (!animated || variant !== "centered") return null;

  return (
    <div className="animate-float">
      <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
    </div>
  );
};

const ScrollIndicator = ({
  variant,
  scrollIndicatorVisible,
  animated,
}: {
  variant?: string;
  scrollIndicatorVisible: boolean;
  animated?: boolean;
}) => {
  if (variant !== "centered") return null;

  return (
    <div
      className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-opacity duration-500",
        animated && "animate-float",
        !scrollIndicatorVisible && "opacity-0"
      )}
    >
      <ChevronDown className="h-6 w-6" />
    </div>
  );
};

const getContentAlignment = (variant?: string) =>
  ({
    centered: "text-center items-center",
    "left-aligned": "text-left items-start",
    split: "text-left items-start md:items-center",
  })[variant || "centered"];

const getContainerClass = (variant?: string) =>
  ({
    centered: "mx-auto max-w-5xl",
    "left-aligned": "max-w-3xl",
    split: "grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto",
  })[variant || "centered"];

interface HeroButtonProps {
  action: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  animated?: boolean;
  isPrimary?: boolean;
}

const HeroButton = ({ action, animated, isPrimary }: HeroButtonProps) => {
  const defaultVariant = isPrimary ? "default" : "outline";
  const href = action.href;
  const variant = action.variant || defaultVariant;

  return (
    <Button
      variant={variant}
      size="lg"
      asChild={!!href}
      onClick={action.onClick}
      className={cn(
        animated && "hover-scale",
        animated && isPrimary && "hover-glow",
        animated && !isPrimary && "hover-border-glow",
        animated && isPrimary && variant === "default" && "animate-pulse-ring"
      )}
    >
      {href ? <a href={href}>{action.text}</a> : action.text}
    </Button>
  );
};

interface HeroContentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  animated?: boolean;
  primaryAction?: HeroProps["primaryAction"];
  secondaryAction?: HeroProps["secondaryAction"];
}

const HeroContent = ({
  title,
  subtitle,
  description,
  animated,
  primaryAction,
  secondaryAction,
}: HeroContentProps) => (
  <>
    {subtitle && (
      <p
        className={cn(
          "text-sm md:text-base font-medium text-primary uppercase tracking-wide",
          animated && "animate-fade-in-down animation-delay-100"
        )}
      >
        {subtitle}
      </p>
    )}

    <h1
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
        animated && "animated-gradient-text",
        animated && "animate-fade-in-up animation-delay-200"
      )}
    >
      {title}
    </h1>

    {description && (
      <p
        className={cn(
          "text-lg md:text-xl text-muted-foreground max-w-2xl",
          animated && "animate-fade-in-up animation-delay-300"
        )}
      >
        {description}
      </p>
    )}

    {(primaryAction || secondaryAction) && (
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-4",
          animated && "animate-fade-in-up animation-delay-400"
        )}
      >
        {primaryAction && <HeroButton action={primaryAction} animated={animated} isPrimary />}
        {secondaryAction && <HeroButton action={secondaryAction} animated={animated} />}
      </div>
    )}
  </>
);

const BackgroundVideo = ({
  src,
  parallax,
  mousePosition,
}: {
  src: string;
  parallax?: boolean;
  mousePosition: { x: number; y: number };
}) => (
  <video
    className={cn("absolute inset-0 w-full h-full object-cover", parallax && "parallax")}
    style={
      parallax
        ? {
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`,
          }
        : undefined
    }
    src={src}
    autoPlay
    loop
    muted
    playsInline
  />
);

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
  animated = true,
  floatingShapes = false,
  parallax = false,
  className,
  children,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  useEffect(() => {
    if (!parallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - globalThis.innerWidth / 2) / globalThis.innerWidth;
      const y = (e.clientY - globalThis.innerHeight / 2) / globalThis.innerHeight;
      setMousePosition({ x, y });
    };

    globalThis.addEventListener("mousemove", handleMouseMove);
    return () => globalThis.removeEventListener("mousemove", handleMouseMove);
  }, [parallax]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollIndicatorVisible(globalThis.scrollY < 100);
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  const contentAlignmentClass = getContentAlignment(variant);
  const containerClass = getContainerClass(variant);

  const backgroundStyle: React.CSSProperties = {};

  if (backgroundImage) {
    backgroundStyle.backgroundImage = `url(${backgroundImage})`;
    backgroundStyle.backgroundSize = "cover";
    backgroundStyle.backgroundPosition = "center";
  }

  if (backgroundGradient) {
    backgroundStyle.background = backgroundGradient;
  }

  const showDefaultBackground = !backgroundImage && !backgroundVideo && !backgroundGradient;

  return (
    <section
      className={cn(
        "relative w-full py-24 md:py-32 lg:py-40 overflow-hidden",
        animated && "animate-fade-in",
        className
      )}
      style={backgroundStyle}
    >
      {showDefaultBackground && <AnimatedBackground animated={animated} />}
      <FloatingShapes floatingShapes={floatingShapes} />

      {backgroundVideo && (
        <BackgroundVideo src={backgroundVideo} parallax={parallax} mousePosition={mousePosition} />
      )}

      {backgroundOverlay && (backgroundImage || backgroundVideo) && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      <div className="relative z-10 container px-4 md:px-6">
        <div className={containerClass}>
          <div className={cn("flex flex-col gap-6", contentAlignmentClass)}>
            <AnimatedSparkle animated={animated} variant={variant} />
            <HeroContent
              title={title}
              subtitle={subtitle}
              description={description}
              animated={animated}
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
            />
          </div>

          {variant === "split" && children && (
            <div className={cn(animated && "animate-fade-in-left animation-delay-600")}>
              {children}
            </div>
          )}
        </div>

        {variant !== "split" && children && (
          <div className={cn("mt-16", contentAlignmentClass)}>{children}</div>
        )}
      </div>

      <ScrollIndicator
        variant={variant}
        scrollIndicatorVisible={scrollIndicatorVisible}
        animated={animated}
      />
    </section>
  );
};

Hero.displayName = "Hero";
