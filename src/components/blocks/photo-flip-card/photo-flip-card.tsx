import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";

export interface PhotoFlipCardProps {
  frontImage: string;
  frontImageAlt?: string;
  title?: string;
  description?: string;
  overlay?: {
    title?: string;
    description?: string;
    badge?: string;
    content?: React.ReactNode;
  };
  cta?: {
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    onClick?: () => void;
    href?: string;
  };
  variant?: "vertical-flip" | "horizontal-flip" | "fade" | "slide-reveal" | "rotation-3d";
  size?: "sm" | "md" | "lg" | "xl" | "auto";
  aspectRatio?: "square" | "video" | "portrait" | "wide" | "auto";
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  trigger?: "hover" | "click" | "touch";
  gradientOverlay?: {
    from?: string;
    to?: string;
    direction?: "to-t" | "to-tr" | "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl";
    opacity?: number;
  };
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  animated?: boolean;
  animationDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const sizeClasses = {
  sm: "w-48 h-48",
  md: "w-64 h-64", 
  lg: "w-80 h-80",
  xl: "w-96 h-96",
  auto: "w-full h-auto",
};

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  auto: "",
};

const borderRadiusClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md", 
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg", 
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

// Animation variant generators
const getVerticalFlipVariants = (isFlipped: boolean, duration: number) => ({
  front: {
    rotateX: isFlipped ? 180 : 0,
    transition: { duration },
  },
  back: {
    rotateX: isFlipped ? 0 : -180,
    transition: { duration },
  },
});

const getHorizontalFlipVariants = (isFlipped: boolean, duration: number) => ({
  front: {
    rotateY: isFlipped ? 180 : 0,
    transition: { duration },
  },
  back: {
    rotateY: isFlipped ? 0 : -180, 
    transition: { duration },
  },
});

const getRotation3DVariants = (isFlipped: boolean, duration: number) => ({
  front: {
    rotateY: isFlipped ? 180 : 0,
    rotateX: isFlipped ? 15 : 0,
    transition: { duration, ease: "easeInOut" },
  },
  back: {
    rotateY: isFlipped ? 0 : -180,
    rotateX: isFlipped ? -15 : 0,
    transition: { duration, ease: "easeInOut" },
  },
});

const getFadeVariants = (isFlipped: boolean, duration: number) => ({
  front: {
    opacity: isFlipped ? 0 : 1,
    scale: isFlipped ? 0.8 : 1,
    transition: { duration },
  },
  back: {
    opacity: isFlipped ? 1 : 0,
    scale: isFlipped ? 1 : 0.8,
    transition: { duration },
  },
});

const getSlideRevealVariants = (isFlipped: boolean, duration: number) => ({
  front: {
    x: isFlipped ? "-100%" : "0%",
    transition: { duration },
  },
  back: {
    x: isFlipped ? "0%" : "100%",
    transition: { duration },
  },
});

const getDefaultVariants = (duration: number) => ({
  front: { transition: { duration } },
  back: { transition: { duration } },
});

export const PhotoFlipCard: React.FC<PhotoFlipCardProps> = ({
  frontImage,
  frontImageAlt = "Card image",
  title,
  description,
  overlay,
  cta,
  variant = "vertical-flip",
  size = "md",
  aspectRatio = "square",
  borderRadius = "lg",
  trigger = "hover",
  gradientOverlay,
  shadow = "md",
  animated = true,
  animationDuration = 0.6,
  className,
  style,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInteraction = () => {
    if (trigger === "click" || trigger === "touch") {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setIsFlipped(false);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cta?.onClick) {
      cta.onClick();
    } else if (cta?.href) {
      globalThis.location.href = cta.href;
    }
  };

  // Animation variants for different flip types
  const getAnimationVariants = () => {
    const duration = animationDuration;
    
    switch (variant) {
      case "vertical-flip": { 
        return getVerticalFlipVariants(isFlipped, duration);
      }
      case "horizontal-flip": { 
        return getHorizontalFlipVariants(isFlipped, duration);
      }
      case "rotation-3d": { 
        return getRotation3DVariants(isFlipped, duration);
      }
      case "fade": { 
        return getFadeVariants(isFlipped, duration);
      }
      case "slide-reveal": { 
        return getSlideRevealVariants(isFlipped, duration);
      }
      default: { 
        return getDefaultVariants(duration);
      }
    }
  };

  const variants = getAnimationVariants();


  const getBackTransform = () => {
    const isFlipVariant = variant.includes("flip") || variant === "rotation-3d";
    if (!isFlipVariant) return undefined;
    
    const rotateY = variant === "vertical-flip" ? "0" : "180";
    const rotateX = variant === "vertical-flip" ? "180" : "0";
    return `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const cardContent = (
    <div
      className={cn(
        "relative overflow-hidden cursor-pointer group",
        sizeClasses[size],
        aspectRatio !== "auto" && aspectRatioClasses[aspectRatio],
        borderRadiusClasses[borderRadius],
        className
      )}
      style={{
        perspective: variant.includes("flip") || variant === "rotation-3d" ? "1000px" : undefined,
        transformStyle: "preserve-3d",
        ...style,
      }}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleInteraction();
        }
      }}
      aria-label={overlay?.title || title || "Flip card"}
    >
      {/* Front Side */}
      <motion.div
        className={cn(
          "absolute inset-0 backface-hidden",
          borderRadiusClasses[borderRadius],
          shadowClasses[shadow],
          "transition-shadow duration-300",
          variant === "slide-reveal" ? "relative" : ""
        )}
        animate={variants.front}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="relative w-full h-full">
          <img
            src={frontImage}
            alt={frontImageAlt}
            className={cn(
              "w-full h-full object-cover",
              borderRadiusClasses[borderRadius]
            )}
            loading="lazy"
          />
          
          {/* Front overlay content */}
          {(title || description) && (
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4",
              borderRadiusClasses[borderRadius]
            )}>
              {title && (
                <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-white/90 text-sm line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Back Side */}
      <motion.div
        className={cn(
          "absolute inset-0 backface-hidden",
          borderRadiusClasses[borderRadius],
          shadowClasses[shadow],
          "transition-shadow duration-300",
          variant === "slide-reveal" ? "relative" : ""
        )}
        animate={variants.back}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transform: getBackTransform(),
        }}
      >
        <div className="relative w-full h-full">
          {/* Background image same as front */}
          <img
            src={frontImage}
            alt={frontImageAlt}
            className={cn(
              "w-full h-full object-cover",
              borderRadiusClasses[borderRadius]
            )}
            loading="lazy"
          />
          
          {/* Dark overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/70",
              borderRadiusClasses[borderRadius]
            )}
          />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
            <div className="space-y-4 text-white">
              {overlay?.badge && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-full backdrop-blur-sm">
                  {overlay.badge}
                </span>
              )}
              
              {overlay?.title && (
                <h3 className="text-xl font-bold">
                  {overlay.title}
                </h3>
              )}
              
              {overlay?.description && (
                <p className="text-white/90 text-sm leading-relaxed">
                  {overlay.description}
                </p>
              )}
              
              {overlay?.content && (
                <div className="text-white">
                  {overlay.content}
                </div>
              )}
              
              {cta && (
                <Button
                  variant={cta.variant || "secondary"}
                  onClick={handleCtaClick}
                  className="mt-4 bg-white text-primary hover:bg-white/90"
                >
                  {cta.text}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

PhotoFlipCard.displayName = "PhotoFlipCard";

// Grid component for displaying multiple flip cards
export interface PhotoFlipCardGridProps {
  cards: PhotoFlipCardProps[];
  columns?: "1" | "2" | "3" | "4" | "auto";
  gap?: "sm" | "md" | "lg";
  animated?: boolean;
  staggerDelay?: number;
  className?: string;
}

const columnClasses = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6", 
  lg: "gap-8",
};

export const PhotoFlipCardGrid: React.FC<PhotoFlipCardGridProps> = ({
  cards,
  columns = "3",
  gap = "md",
  animated = true,
  staggerDelay = 0.1,
  className,
}) => {
  return (
    <div className={cn("grid", columnClasses[columns], gapClasses[gap], className)}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          whileInView={animated ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-50px" }}
          transition={animated ? {
            duration: 0.5,
            delay: index * staggerDelay,
            ease: "easeOut",
          } : undefined}
        >
          <PhotoFlipCard {...card} animated={false} />
        </motion.div>
      ))}
    </div>
  );
};

PhotoFlipCardGrid.displayName = "PhotoFlipCardGrid";