"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const callToActionVariants = cva(
  "relative overflow-hidden rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-gray-900 to-gray-800 text-white",
        primary: "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        gradient: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white",
        dark: "bg-black text-white",
        light: "bg-white text-gray-900 border border-gray-200",
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
    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
  </>
);

const DefaultDecoration = () => (
  <Sparkles className="absolute top-6 right-6 h-5 w-5 text-yellow-400 animate-pulse" />
);

const CTAIcon = ({ icon, align }: { icon: React.ReactNode; align?: string | null }) => (
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

const CTATitle = ({
  title,
  size,
  align,
}: {
  title: string;
  size?: string | null;
  align?: string | null;
}) => (
  <h2
    className={cn(
      "font-bold tracking-tight",
      size === "sm" && "text-2xl md:text-3xl",
      size === "default" && "text-3xl md:text-4xl lg:text-5xl",
      size === "lg" && "text-4xl md:text-5xl lg:text-6xl",
      align === "center" && "mx-auto",
      (align === "center" || align === "left") && "max-w-4xl"
    )}
  >
    {title}
  </h2>
);

const CTADescription = ({
  description,
  size,
  align,
}: {
  description: string;
  size?: string | null;
  align?: string | null;
}) => (
  <p
    className={cn(
      "mt-4 text-lg opacity-90",
      size === "sm" && "text-base",
      size === "lg" && "text-xl",
      align === "center" && "mx-auto",
      (align === "center" || align === "left") && "max-w-2xl"
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
}

const ActionButton = ({ action, variant, size, showArrow, isSecondary }: ActionButtonProps) => {
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
      className={cn(isSecondary && buttonClass, !isSecondary && "group")}
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
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(callToActionVariants({ variant, size, align }), className)}
        {...props}
      >
        {/* Background Image */}
        {backgroundImage && <BackgroundImage src={backgroundImage} />}

        {/* Overlay */}
        {backgroundImage && overlay && <Overlay />}

        {/* Decorative Elements */}
        {decorative && variant === "gradient" && <GradientDecorations />}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          {icon && <CTAIcon icon={icon} align={align} />}

          {/* Title */}
          <CTATitle title={title} size={size} align={align} />

          {/* Description */}
          {description && <CTADescription description={description} size={size} align={align} />}

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                "mt-8 flex flex-col sm:flex-row gap-4",
                align === "center" && "justify-center",
                align === "right" && "justify-end",
                align === "left" && "justify-start"
              )}
            >
              {primaryAction && (
                <ActionButton
                  action={primaryAction}
                  variant={variant}
                  size={size}
                  showArrow={showArrow}
                  isSecondary={false}
                />
              )}
              {secondaryAction && (
                <ActionButton
                  action={secondaryAction}
                  variant={variant}
                  size={size}
                  isSecondary={true}
                />
              )}
            </div>
          )}

          {/* Custom Children */}
          {children}
        </div>

        {/* Floating decoration */}
        {decorative && variant === "default" && <DefaultDecoration />}
      </div>
    );
  }
);

CallToAction.displayName = "CallToAction";

export { CallToAction };
