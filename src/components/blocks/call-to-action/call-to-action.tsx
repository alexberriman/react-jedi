"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, cleanDOMProps } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

const callToActionVariants = cva(
  "relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        centered: "bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl",
        splitScreen: "bg-white text-gray-900",
        withBackgroundImage: "text-white",
        gradient: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white animate-gradient-shift rounded-2xl",
        minimal: "bg-transparent text-gray-900 dark:text-white",
        bold: "bg-primary text-primary-foreground rounded-3xl",
        formIntegrated: "bg-secondary text-secondary-foreground rounded-2xl",
        default: "bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl",
        primary: "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl",
        secondary: "bg-secondary text-secondary-foreground rounded-2xl",
        dark: "bg-black text-white rounded-2xl",
        light: "bg-white text-gray-900 border border-gray-200 rounded-2xl",
        glass: "bg-white/10 backdrop-blur-lg text-white border border-white/20 rounded-2xl",
      },
      size: {
        sm: "px-6 py-8",
        default: "px-8 py-12 md:px-12 md:py-16",
        lg: "px-10 py-16 md:px-16 md:py-24",
        xl: "px-12 py-20 md:px-20 md:py-32",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      align: "center",
    },
  }
);

export interface TrustIndicator {
  icon?: React.ReactNode;
  label: string;
  value?: string;
}

export interface CallToActionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof callToActionVariants> {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost";
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  tertiaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundPattern?: "dots" | "grid" | "lines" | "circles";
  overlay?: boolean;
  overlayOpacity?: number;
  icon?: React.ReactNode;
  showArrow?: boolean;
  decorative?: boolean;
  animated?: boolean;
  floatingShapes?: boolean;
  trustIndicators?: TrustIndicator[];
  formComponent?: React.ReactNode;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  splitImage?: string;
  splitImagePosition?: "left" | "right";
  gradientColors?: {
    from: string;
    via?: string;
    to: string;
  };
  shapes?: Array<{
    type: "circle" | "square" | "triangle";
    color: string;
    size: string;
    position: { top?: string; right?: string; bottom?: string; left?: string };
  }>;
}

// Helper Components
const BackgroundImage = ({ src }: { src: string }) => (
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${src})` }}
  />
);

const BackgroundVideo = ({ src }: { src: string }) => (
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src={src} type="video/mp4" />
  </video>
);

const BackgroundPattern = ({ pattern }: { pattern: string }) => {
  const patternStyles = {
    dots: "bg-dot-pattern",
    grid: "bg-grid-pattern",
    lines: "bg-line-pattern",
    circles: "bg-circle-pattern",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 opacity-5",
        patternStyles[pattern as keyof typeof patternStyles]
      )}
    />
  );
};

const Overlay = ({ opacity = 50 }: { opacity?: number }) => (
  <div
    className="absolute inset-0 bg-black"
    style={{ opacity: opacity / 100 }}
  />
);

const GradientDecorations = () => (
  <>
    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-3xl animate-blob" />
    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-3xl animate-blob animation-delay-400" />
  </>
);

const AnimatedDecorations = () => (
  <>
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="absolute top-10 left-10"
    >
      <Star className="h-5 w-5 text-yellow-400" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="absolute bottom-10 right-10"
    >
      <Sparkles className="h-5 w-5 text-blue-400" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="absolute top-1/2 right-20"
    >
      <Zap className="h-4 w-4 text-purple-400" />
    </motion.div>
  </>
);

const CTAIcon = ({
  icon,
  align,
  animated,
}: {
  icon: React.ReactNode;
  align?: string | null;
  animated?: boolean;
}) => {
  const content = (
    <div
      className={cn(
        "mb-4 inline-flex",
        align === "center" && "justify-center w-full",
        align === "right" && "justify-end w-full"
      )}
    >
      {icon}
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
};

const CTATitle = ({
  title,
  size,
  align,
  animated,
}: {
  title: string;
  size?: string | null;
  align?: string | null;
  animated?: boolean;
}) => {
  const content = (
    <h2
      className={cn(
        "font-bold tracking-tight",
        size === "sm" && "text-2xl md:text-3xl",
        size === "default" && "text-3xl md:text-4xl lg:text-5xl",
        size === "lg" && "text-4xl md:text-5xl lg:text-6xl",
        size === "xl" && "text-5xl md:text-6xl lg:text-7xl",
        align === "center" && "mx-auto",
        (align === "center" || align === "left") && "max-w-4xl"
      )}
    >
      {title}
    </h2>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {content}
    </motion.div>
  );
};

const CTASubtitle = ({
  subtitle,
  align,
  animated,
}: {
  subtitle: string;
  align?: string | null;
  animated?: boolean;
}) => {
  const content = (
    <p
      className={cn(
        "mt-2 text-lg font-medium opacity-80",
        align === "center" && "mx-auto",
        (align === "center" || align === "left") && "max-w-3xl"
      )}
    >
      {subtitle}
    </p>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {content}
    </motion.div>
  );
};

const CTADescription = ({
  description,
  size,
  align,
  animated,
}: {
  description: string;
  size?: string | null;
  align?: string | null;
  animated?: boolean;
}) => {
  const content = (
    <p
      className={cn(
        "mt-4 text-lg opacity-90",
        size === "sm" && "text-base",
        size === "lg" && "text-xl",
        size === "xl" && "text-2xl",
        align === "center" && "mx-auto",
        (align === "center" || align === "left") && "max-w-2xl"
      )}
    >
      {description}
    </p>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {content}
    </motion.div>
  );
};

const TrustIndicatorsList = ({
  indicators,
  animated,
}: {
  indicators: TrustIndicator[];
  animated?: boolean;
}) => {
  const content = (
    <div className="mt-8 flex flex-wrap justify-center gap-6">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center gap-2">
          {indicator.icon && <span className="text-2xl">{indicator.icon}</span>}
          <div>
            {indicator.value && (
              <div className="text-2xl font-bold">{indicator.value}</div>
            )}
            <div className="text-sm opacity-80">{indicator.label}</div>
          </div>
        </div>
      ))}
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {content}
    </motion.div>
  );
};

// Background Elements Component
const BackgroundElements = ({
  backgroundImage,
  backgroundVideo,
  backgroundPattern,
  hasBackground,
  overlay,
  overlayOpacity,
  floatingShapes,
  shapes,
  decorative,
  variant,
  animated,
}: {
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundPattern?: string;
  hasBackground: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
  floatingShapes?: boolean;
  shapes?: CallToActionProps["shapes"];
  decorative?: boolean;
  variant?: string | null;
  animated?: boolean;
}) => (
  <>
    {backgroundImage && <BackgroundImage src={backgroundImage} />}
    {backgroundVideo && <BackgroundVideo src={backgroundVideo} />}
    {backgroundPattern && <BackgroundPattern pattern={backgroundPattern} />}
    {hasBackground && overlay && <Overlay opacity={overlayOpacity} />}
    
    {/* Animated Background Shapes */}
    {floatingShapes && (
      <>
        <div className="floating-shape floating-shape-1 opacity-5" />
        <div className="floating-shape floating-shape-2 opacity-5" />
        <div className="floating-shape floating-shape-3 opacity-5" />
      </>
    )}

    {/* Custom Shapes */}
    {shapes && <CustomShapes shapes={shapes} />}

    {/* Decorative Elements */}
    {decorative && variant === "gradient" && <GradientDecorations />}
    {decorative && animated && <AnimatedDecorations />}
  </>
);

// Split Screen Image Component
const SplitScreenImage = ({ splitImage }: { splitImage: string }) => (
  <div className="relative h-full min-h-[400px] md:min-h-[600px]">
    <img
      src={splitImage}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
);

// CTA Actions Component
const CTAActions = ({
  primaryAction,
  secondaryAction,
  tertiaryAction,
  align,
  animated,
  buttonSize,
  buttonVariant,
  variant,
  size,
  showArrow,
}: {
  primaryAction?: CallToActionProps["primaryAction"];
  secondaryAction?: CallToActionProps["secondaryAction"];
  tertiaryAction?: CallToActionProps["tertiaryAction"];
  align?: string | null;
  animated?: boolean;
  buttonSize?: CallToActionProps["buttonSize"];
  buttonVariant?: CallToActionProps["buttonVariant"];
  variant?: string | null;
  size?: string | null;
  showArrow?: boolean;
}) => {
  const content = (
    <div
      className={cn(
        "mt-8 w-full flex flex-col sm:flex-row gap-4",
        align === "center" && "justify-center items-center sm:items-stretch",
        align === "right" && "justify-end items-end sm:items-stretch",
        align === "left" && "justify-start items-start sm:items-stretch"
      )}
    >
      {primaryAction && (
        <Button
          size={buttonSize === "default" && size === "lg" ? "lg" : buttonSize}
          variant={primaryAction.variant || buttonVariant}
          onClick={primaryAction.onClick}
          asChild={!!primaryAction.href}
          className={cn(
            "group",
            animated && "hover-scale hover-glow"
          )}
        >
          {primaryAction.href ? (
            <a href={primaryAction.href}>
              {primaryAction.icon}
              {primaryAction.label}
              {showArrow && !primaryAction.icon && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </a>
          ) : (
            <>
              {primaryAction.icon}
              {primaryAction.label}
              {showArrow && !primaryAction.icon && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </>
          )}
        </Button>
      )}
      {secondaryAction && (
        <Button
          size={buttonSize === "default" && size === "lg" ? "lg" : buttonSize}
          variant="ghost"
          onClick={secondaryAction.onClick}
          asChild={!!secondaryAction.href}
          className={cn(
            variant === "light" ? "text-gray-700 hover:bg-gray-100" : "text-current hover:bg-white/10",
            animated && "hover-scale"
          )}
        >
          {secondaryAction.href ? (
            <a href={secondaryAction.href}>
              {secondaryAction.icon}
              {secondaryAction.label}
            </a>
          ) : (
            <>
              {secondaryAction.icon}
              {secondaryAction.label}
            </>
          )}
        </Button>
      )}
      {tertiaryAction && (
        <Button
          size={buttonSize}
          variant="link"
          onClick={tertiaryAction.onClick}
          asChild={!!tertiaryAction.href}
          className={cn(
            "text-sm opacity-80 hover:opacity-100",
            animated && "transition-opacity"
          )}
        >
          {tertiaryAction.href ? (
            <a href={tertiaryAction.href}>{tertiaryAction.label}</a>
          ) : (
            tertiaryAction.label
          )}
        </Button>
      )}
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {content}
    </motion.div>
  );
};

const CustomShapes = ({ shapes }: { shapes: CallToActionProps["shapes"] }) => {
  if (!shapes) return null;

  return (
    <>
      {shapes.map((shape, index) => {
        const shapeClasses = {
          circle: "rounded-full",
          square: "rounded-lg",
          triangle: "triangle",
        };

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className={cn(
              "absolute",
              shapeClasses[shape.type],
              shape.type !== "triangle" && `bg-${shape.color}`
            )}
            style={{
              ...shape.position,
              width: shape.size,
              height: shape.size,
              borderColor: shape.type === "triangle" ? shape.color : undefined,
            }}
          />
        );
      })}
    </>
  );
};

const CallToAction = React.forwardRef<HTMLDivElement, CallToActionProps>(
  (
    {
      className,
      variant,
      size,
      align,
      title,
      subtitle,
      description,
      primaryAction,
      secondaryAction,
      tertiaryAction,
      backgroundImage,
      backgroundVideo,
      backgroundPattern,
      overlay = true,
      overlayOpacity = 50,
      icon,
      showArrow = true,
      decorative = true,
      animated = true,
      floatingShapes = false,
      trustIndicators,
      formComponent,
      buttonVariant = "secondary",
      buttonSize = "default",
      splitImage,
      splitImagePosition = "right",
      gradientColors,
      shapes,
      children,
      ...props
    },
    ref
  ) => {
    const isSplitScreen = variant === "splitScreen" && splitImage;
    const hasBackground = !!(backgroundImage || backgroundVideo);

    // Apply custom gradient if provided
    const customGradientStyle = gradientColors
      ? {
          background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${
            gradientColors.via || gradientColors.to
          } 50%, ${gradientColors.to} 100%)`,
        }
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          isSplitScreen && "grid md:grid-cols-2 items-center",
          !isSplitScreen && callToActionVariants({ variant, size, align }),
          animated && variant === "gradient" && "animate-gradient-shift",
          animated && !isSplitScreen && "hover-lift",
          className
        )}
        style={customGradientStyle}
        {...cleanDOMProps(props)}
      >
        {/* Background Elements */}
        {!isSplitScreen && (
          <BackgroundElements
            backgroundImage={backgroundImage}
            backgroundVideo={backgroundVideo}
            backgroundPattern={backgroundPattern}
            hasBackground={hasBackground}
            overlay={overlay}
            overlayOpacity={overlayOpacity}
            floatingShapes={floatingShapes}
            shapes={shapes}
            decorative={decorative}
            variant={variant}
            animated={animated}
          />
        )}

        {/* Split Screen Image */}
        {isSplitScreen && splitImagePosition === "left" && (
          <SplitScreenImage splitImage={splitImage} />
        )}

        {/* Content */}
        <div
          className={cn(
            "relative z-10",
            isSplitScreen && "px-8 py-12 md:px-12 md:py-16",
            !isSplitScreen && variant === "minimal" && "max-w-4xl mx-auto"
          )}
        >
          {/* Icon */}
          {icon && <CTAIcon icon={icon} align={align} animated={animated} />}

          {/* Title */}
          <CTATitle title={title} size={size} align={align} animated={animated} />

          {/* Subtitle */}
          {subtitle && (
            <CTASubtitle subtitle={subtitle} align={align} animated={animated} />
          )}

          {/* Description */}
          {description && (
            <CTADescription
              description={description}
              size={size}
              align={align}
              animated={animated}
            />
          )}

          {/* Trust Indicators */}
          {trustIndicators && trustIndicators.length > 0 && (
            <TrustIndicatorsList indicators={trustIndicators} animated={animated} />
          )}

          {/* Form Component */}
          {formComponent && (
            <motion.div
              initial={animated ? { opacity: 0, y: 20 } : undefined}
              animate={animated ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              {formComponent}
            </motion.div>
          )}

          {/* Actions */}
          {(primaryAction || secondaryAction || tertiaryAction) && !formComponent && (
            <CTAActions
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
              tertiaryAction={tertiaryAction}
              align={align}
              animated={animated}
              buttonSize={buttonSize}
              buttonVariant={buttonVariant}
              variant={variant}
              size={size}
              showArrow={showArrow}
            />
          )}

          {/* Custom Children */}
          {children}
        </div>

        {/* Split Screen Image Right */}
        {isSplitScreen && splitImagePosition === "right" && (
          <SplitScreenImage splitImage={splitImage} />
        )}
      </div>
    );
  }
);

CallToAction.displayName = "CallToAction";

export { CallToAction };