import React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
import { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  variant?: "default" | "highlighted" | "minimal" | "bordered";
  orientation?: "vertical" | "horizontal";
  align?: "left" | "center" | "right";
  highlight?: boolean;
  highlightColor?: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = "currentColor",
  badge,
  badgeVariant = "secondary",
  variant = "default",
  orientation = "vertical",
  align = "left",
  highlight = false,
  highlightColor = "hsl(var(--primary))",
  link,
  onClick,
  className,
  children,
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const variantClasses = {
    default: "border bg-card text-card-foreground shadow-sm",
    highlighted: "border-2 bg-gradient-to-br from-background to-card shadow-lg",
    minimal: "border-0 bg-transparent shadow-none",
    bordered: "border-2 border-primary/20 bg-card/50 shadow-sm",
  };

  const orientationClasses = {
    vertical: "flex-col",
    horizontal: "flex-row items-center gap-6",
  };

  const iconSizeClasses = {
    vertical: "h-10 w-10",
    horizontal: "h-8 w-8",
  };

  const borderHighlight = highlight
    ? {
        borderColor: highlightColor,
        borderWidth: "2px",
      }
    : {};

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      globalThis.location.href = link;
    }
  };

  const isClickable = !!onClick || !!link;

  return (
    <Card
      className={cn(
        variantClasses[variant],
        isClickable && "cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]",
        highlight && "ring-2 ring-offset-2",
        className
      )}
      style={{
        ...borderHighlight,
        ...(highlight && ({ "--tw-ring-color": highlightColor } as React.CSSProperties)),
      }}
      onClick={isClickable ? handleClick : undefined}
    >
      <CardHeader className={cn("space-y-4", orientationClasses[orientation], alignClasses[align])}>
        <div
          className={cn(
            "flex gap-4",
            orientation === "horizontal" ? "items-center" : "flex-col",
            alignClasses[align]
          )}
        >
          {/* Icon */}
          {Icon && (
            <div
              className={cn(
                "rounded-lg p-3 bg-primary/10",
                iconSizeClasses[orientation],
                "flex items-center justify-center"
              )}
              style={{ color: iconColor }}
            >
              <Icon className="w-full h-full" />
            </div>
          )}

          {/* Title and Badge */}
          <div className={cn("space-y-2", alignClasses[align])}>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              {badge && (
                <Badge variant={badgeVariant} className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>

            {/* Description */}
            {description && (
              <CardDescription className="text-sm text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Additional Content */}
      {children && <CardContent className={cn(alignClasses[align])}>{children}</CardContent>}
    </Card>
  );
};

FeatureCard.displayName = "FeatureCard";
