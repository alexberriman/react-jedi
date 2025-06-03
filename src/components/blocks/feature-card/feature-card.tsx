import React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { motion, Variants } from "framer-motion";

export interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon | IconType | React.ReactNode;
  iconColor?: string;
  iconSize?: "sm" | "md" | "lg" | "xl";
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  variant?: "default" | "highlighted" | "minimal" | "bordered" | "gradient" | "shadow" | "glass";
  iconPosition?: "top" | "left" | "right" | "background";
  align?: "left" | "center" | "right";
  highlight?: boolean;
  highlightColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDirection?: "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl" | "to-t" | "to-tr";
  borderStyle?: "none" | "solid" | "dashed" | "dotted" | "double";
  shadowSize?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  cta?: {
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    onClick?: () => void;
    href?: string;
  };
  link?: string;
  onClick?: () => void;
  animated?: boolean;
  animationDelay?: number;
  hoverEffect?: "none" | "lift" | "glow" | "pulse" | "rotate";
  className?: string;
  children?: React.ReactNode;
}

const iconSizes = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

const iconContainerSizes = {
  sm: "p-2",
  md: "p-3",
  lg: "p-4",
  xl: "p-5",
};

const shadowSizes = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

const hoverEffects = {
  none: "",
  lift: "hover:scale-[1.02] hover:shadow-xl",
  glow: "hover:shadow-lg hover:shadow-primary/25",
  pulse: "hover:animate-pulse",
  rotate: "hover:rotate-1",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay || 0,
      ease: "easeOut",
    },
  }),
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  iconColor = "currentColor",
  iconSize = "md",
  badge,
  badgeVariant = "secondary",
  variant = "default",
  iconPosition = "top",
  align = "left",
  highlight = false,
  highlightColor = "hsl(var(--primary))",
  gradientFrom = "hsl(var(--primary))",
  gradientTo = "hsl(var(--secondary))",
  gradientDirection = "to-br",
  borderStyle = "solid",
  shadowSize = "sm",
  cta,
  link,
  onClick,
  animated = true,
  animationDelay = 0,
  hoverEffect = "lift",
  className,
  children,
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const variantClasses = {
    default: "border bg-card text-card-foreground",
    highlighted: "border-2 bg-gradient-to-br from-background to-card",
    minimal: "border-0 bg-transparent shadow-none",
    bordered: "border-2 border-primary/20 bg-card/50",
    gradient: `bg-gradient-${gradientDirection}`,
    shadow: "border-0 bg-card",
    glass: "border border-white/20 bg-white/10 backdrop-blur-md",
  };

  const borderStyles = {
    none: "border-0",
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
    double: "border-double",
  };

  const iconPositionClasses = {
    top: "flex-col",
    left: "flex-row items-start gap-4",
    right: "flex-row-reverse items-start gap-4",
    background: "relative",
  };

  const borderHighlight = highlight
    ? {
        borderColor: highlightColor,
        borderWidth: "2px",
      }
    : {};

  const gradientStyle = variant === "gradient"
    ? {
        backgroundImage: `linear-gradient(${gradientDirection.replace("-", " ")}, ${gradientFrom}, ${gradientTo})`,
      }
    : {};

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      globalThis.location.href = link;
    } else if (cta?.onClick) {
      cta.onClick();
    } else if (cta?.href) {
      globalThis.location.href = cta.href;
    }
  };

  const isClickable = !!onClick || !!link || !!cta?.onClick || !!cta?.href;

  const renderIcon = () => {
    if (!icon) return null;

    let iconElement: React.ReactElement | null = null;
    
    if (React.isValidElement(icon)) {
      iconElement = icon;
    } else if (typeof icon === "function") {
      const IconComponent = icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
      iconElement = React.createElement(IconComponent, { 
        className: cn(iconSizes[iconSize], "flex-shrink-0"),
        style: { color: iconColor },
      });
    }

    if (!iconElement) return null;

    if (iconPosition === "background") {
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          {React.cloneElement(iconElement, {
            className: "h-32 w-32",
          })}
        </div>
      );
    }

    return (
      <div
        data-slot="icon"
        className={cn(
          "rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0",
          iconContainerSizes[iconSize]
        )}
        style={{ color: iconColor }}
      >
        {iconElement}
      </div>
    );
  };

  const cardContent = (
    <Card
      role="article"
      className={cn(
        variantClasses[variant],
        borderStyles[borderStyle],
        shadowSizes[shadowSize],
        isClickable && "cursor-pointer transition-all",
        isClickable && hoverEffect !== "none" && hoverEffects[hoverEffect],
        highlight && "ring-2 ring-offset-2",
        className
      )}
      style={{
        ...borderHighlight,
        ...gradientStyle,
        ...(highlight && ({ "--tw-ring-color": highlightColor } as React.CSSProperties)),
      }}
      onClick={isClickable ? handleClick : undefined}
    >
      {iconPosition === "background" && renderIcon()}
      
      <CardHeader className={cn("space-y-4", alignClasses[align])}>
        <div
          className={cn(
            "flex gap-4",
            iconPositionClasses[iconPosition],
            alignClasses[align],
            iconPosition === "background" && "relative z-10"
          )}
        >
          {iconPosition !== "background" && renderIcon()}

          <div className={cn("space-y-2 flex-1", alignClasses[align])}>
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              {badge && (
                <Badge variant={badgeVariant} className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>

            {description && (
              <CardDescription className="text-sm text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      {(children || cta) && (
        <CardContent className={cn(alignClasses[align])}>
          {children}
          {cta && (
            <Button
              variant={cta.variant || "default"}
              onClick={(e) => {
                e.stopPropagation();
                if (cta.onClick) {
                  cta.onClick();
                } else if (cta.href) {
                  globalThis.location.href = cta.href;
                }
              }}
              className="mt-4"
            >
              {cta.text}
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );

  if (animated) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={animationDelay}
        variants={cardVariants}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

FeatureCard.displayName = "FeatureCard";

export interface FeatureCardGridProps {
  cards: FeatureCardProps[];
  columns?: "1" | "2" | "3" | "4" | "auto";
  gap?: "sm" | "md" | "lg";
  animated?: boolean;
  staggerDelay?: number;
  className?: string;
}

const columnClasses = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  auto: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({
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
        <FeatureCard
          key={index}
          {...card}
          animated={animated}
          animationDelay={animated ? index * staggerDelay : 0}
        />
      ))}
    </div>
  );
};

FeatureCardGrid.displayName = "FeatureCardGrid";