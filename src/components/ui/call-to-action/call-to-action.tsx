"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, cleanDOMProps } from "../../../lib/utils";
import { Button } from "../button";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";

const callToActionVariants = cva(
  "relative overflow-hidden rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-gray-900 to-gray-800 text-white",
        primary: "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        gradient:
          "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white animate-gradient-shift",
        dark: "bg-black text-white",
        light: "bg-white text-gray-900 border border-gray-200",
        glass: "bg-white/10 backdrop-blur-lg text-white border border-white/20",
      },
      size: {
        sm: "px-6 py-8",
        default: "px-8 py-12 md:px-12 md:py-16",
        lg: "px-10 py-16 md:px-16 md:py-24",
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

interface CallToActionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof callToActionVariants> {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  overlay?: boolean;
  icon?: React.ReactNode;
  showArrow?: boolean;
  decorative?: boolean;
  animated?: boolean;
  floatingShapes?: boolean;
}

// Helper components to reduce cognitive complexity
const BackgroundImage = ({ src }: { src: string }) => (
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${src})` }}
  />
);

const Overlay = () => <div className="absolute inset-0 bg-black/50" />;

const GradientDecorations = () => (
  <>
    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-3xl animate-blob" />
    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-3xl animate-blob animation-delay-400" />
  </>
);

const AnimatedDecorations = () => (
  <>
    <div className="absolute top-10 left-10 animate-float">
      <Star className="h-5 w-5 text-yellow-400" />
    </div>
    <div className="absolute bottom-10 right-10 animate-float animation-delay-300">
      <Sparkles className="h-5 w-5 text-blue-400" />
    </div>
    <div className="absolute top-1/2 right-20 animate-float animation-delay-600">
      <Zap className="h-4 w-4 text-purple-400" />
    </div>
  </>
);

const DefaultDecoration = () => (
  <Sparkles className="absolute top-6 right-6 h-5 w-5 text-yellow-400 animate-pulse" />
);

const CTAIcon = ({
  icon,
  align,
  animated,
}: {
  icon: React.ReactNode;
  align?: string | null;
  animated?: boolean;
}) => (
  <div
    className={cn(
      "mb-4 inline-flex",
      align === "center" && "justify-center w-full",
      align === "right" && "justify-end w-full",
      animated && "animate-scale-in animation-delay-100"
    )}
  >
    {icon}
  </div>
);

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
}) => (
  <h2
    className={cn(
      "font-bold tracking-tight",
      size === "sm" && "text-2xl md:text-3xl",
      size === "default" && "text-3xl md:text-4xl lg:text-5xl",
      size === "lg" && "text-4xl md:text-5xl lg:text-6xl",
      align === "center" && "mx-auto",
      (align === "center" || align === "left") && "max-w-4xl",
      animated && "animate-fade-in-up animation-delay-200"
    )}
  >
    {title}
  </h2>
);

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
}) => (
  <p
    className={cn(
      "mt-4 text-lg opacity-90",
      size === "sm" && "text-base",
      size === "lg" && "text-xl",
      align === "center" && "mx-auto",
      (align === "center" || align === "left") && "max-w-2xl",
      animated && "animate-fade-in-up animation-delay-300"
    )}
  >
    {description}
  </p>
);

interface ActionButtonProps {
  action: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: string | null;
  size?: string | null;
  showArrow?: boolean;
  isSecondary?: boolean;
  animated?: boolean;
}

const ActionButton = ({
  action,
  variant,
  size,
  showArrow,
  isSecondary,
  animated,
}: ActionButtonProps) => {
  let buttonVariant: "ghost" | "default" | "secondary";
  if (isSecondary) {
    buttonVariant = "ghost";
  } else if (variant === "light") {
    buttonVariant = "default";
  } else {
    buttonVariant = "secondary";
  }

  const buttonSize = size === "sm" ? "default" : "lg";
  const buttonClass =
    isSecondary &&
    cn(variant === "light" ? "text-gray-700 hover:bg-gray-100" : "text-current hover:bg-white/10");

  return (
    <Button
      size={buttonSize}
      variant={buttonVariant}
      onClick={action.onClick}
      asChild={!!action.href}
      className={cn(
        isSecondary && buttonClass,
        !isSecondary && "group",
        animated && !isSecondary && "hover-scale hover-glow animate-pulse-ring",
        animated && isSecondary && "hover-scale"
      )}
    >
      {action.href ? (
        <a href={action.href}>
          {action.label}
          {!isSecondary && showArrow && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </a>
      ) : (
        <>
          {action.label}
          {!isSecondary && showArrow && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </>
      )}
    </Button>
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
      description,
      primaryAction,
      secondaryAction,
      backgroundImage,
      overlay = true,
      icon,
      showArrow = true,
      decorative = true,
      animated = true,
      floatingShapes = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          callToActionVariants({ variant, size, align }),
          animated && variant === "gradient" && "animate-gradient-shift",
          animated && "hover-lift",
          className
        )}
        {...cleanDOMProps(props)}
      >
        {/* Background Image */}
        {backgroundImage && <BackgroundImage src={backgroundImage} />}

        {/* Overlay */}
        {backgroundImage && overlay && <Overlay />}

        {/* Animated Background Shapes */}
        {floatingShapes && (
          <>
            <div className="floating-shape floating-shape-1 opacity-5" />
            <div className="floating-shape floating-shape-2 opacity-5" />
            <div className="floating-shape floating-shape-3 opacity-5" />
          </>
        )}

        {/* Decorative Elements */}
        {decorative && variant === "gradient" && <GradientDecorations />}
        {decorative && animated && <AnimatedDecorations />}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          {icon && <CTAIcon icon={icon} align={align} animated={animated} />}

          {/* Title */}
          <CTATitle title={title} size={size} align={align} animated={animated} />

          {/* Description */}
          {description && (
            <CTADescription
              description={description}
              size={size}
              align={align}
              animated={animated}
            />
          )}

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                "mt-8 flex flex-col sm:flex-row gap-4",
                align === "center" && "justify-center",
                align === "right" && "justify-end",
                align === "left" && "justify-start",
                animated && "animate-fade-in-up animation-delay-400"
              )}
            >
              {primaryAction && (
                <ActionButton
                  action={primaryAction}
                  variant={variant}
                  size={size}
                  showArrow={showArrow}
                  isSecondary={false}
                  animated={animated}
                />
              )}
              {secondaryAction && (
                <ActionButton
                  action={secondaryAction}
                  variant={variant}
                  size={size}
                  isSecondary={true}
                  animated={animated}
                />
              )}
            </div>
          )}

          {/* Custom Children */}
          {children}
        </div>

        {/* Floating decoration */}
        {decorative && variant === "default" && !animated && <DefaultDecoration />}
      </div>
    );
  }
);

CallToAction.displayName = "CallToAction";

export { CallToAction };
