import * as React from "react";
import { cn, cleanDOMProps } from "../../../lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Check, X, Sparkles, Zap, Crown } from "lucide-react";

export interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingTier {
  id?: string;
  name: string;
  description?: string;
  price: number | string;
  monthlyPrice?: number | string;
  yearlyPrice?: number | string;
  currency?: string;
  period?: string;
  features: PricingFeature[];
  cta: {
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    href?: string;
    onClick?: () => void;
  };
  badge?: string;
  highlighted?: boolean;
  popular?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  customIcon?: React.ReactNode;
  savings?: string;
}

export type PricingVariant = 
  | "cards" 
  | "comparison" 
  | "minimal" 
  | "compact" 
  | "with-testimonials"
  | "gradient";

export interface PricingTableProps {
  tiers: PricingTier[];
  columns?: 1 | 2 | 3 | 4;
  variant?: PricingVariant;
  showToggle?: boolean;
  defaultBillingCycle?: "monthly" | "yearly";
  onBillingCycleChange?: (cycle: "monthly" | "yearly") => void;
  currency?: string;
  showFeatureComparison?: boolean;
  className?: string;
  animated?: boolean;
  testimonials?: Array<{
    tierName: string;
    quote: string;
    author: string;
    role?: string;
  }>;
}

const getDefaultIcon = (index: number) => {
  const icons = [Sparkles, Zap, Crown];
  return icons[index % icons.length];
};

const formatPrice = (price: number | string): string => {
  if (typeof price === "number") {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }
  return price;
};

export const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  (
    {
      tiers,
      columns = 3,
      variant = "cards",
      showToggle = true,
      defaultBillingCycle = "monthly",
      onBillingCycleChange,
      currency: defaultCurrency,
      showFeatureComparison = false,
      className,
      animated = true,
      testimonials = [],
      ...props
    },
    ref
  ) => {
    const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">(defaultBillingCycle);

    const handleBillingCycleChange = (cycle: "monthly" | "yearly") => {
      setBillingCycle(cycle);
      onBillingCycleChange?.(cycle);
    };

    const getGridCols = () => {
      switch (columns) {
        case 1: {
          return "grid-cols-1";
        }
        case 2: {
          return "grid-cols-1 md:grid-cols-2";
        }
        case 3: {
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        }
        case 4: {
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        }
        default: {
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        }
      }
    };

    const getCurrentPrice = (tier: PricingTier): string => {
      let price: number | string;
      
      if (billingCycle === "yearly" && tier.yearlyPrice !== undefined) {
        price = tier.yearlyPrice;
      } else if (billingCycle === "monthly" && tier.monthlyPrice !== undefined) {
        price = tier.monthlyPrice;
      } else {
        price = tier.price;
      }
      
      return formatPrice(price);
    };

    const allFeatures = React.useMemo(() => {
      const featuresSet = new Set<string>();
      for (const tier of tiers) {
        for (const feature of tier.features) {
          featuresSet.add(feature.text);
        }
      }
      return [...featuresSet];
    }, [tiers]);

    if (variant === "comparison" && showFeatureComparison) {
      return (
        <div ref={ref} className={cn("w-full", className)} {...cleanDOMProps(props)}>
          {showToggle && (
            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-1">
                <Button
                  variant={billingCycle === "monthly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleBillingCycleChange("monthly")}
                  className="relative"
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === "yearly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleBillingCycleChange("yearly")}
                  className="relative"
                >
                  Yearly
                  {tiers.some((tier) => tier.savings) && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Save up to 20%
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left font-medium">Features</th>
                  {tiers.map((tier, index) => (
                    <th
                      key={index}
                      className={cn(
                        "p-4 text-center",
                        tier.highlighted && "bg-primary/5"
                      )}
                    >
                      <div className="space-y-2">
                        {tier.badge && (
                          <Badge variant={tier.highlighted ? "default" : "secondary"}>
                            {tier.badge}
                          </Badge>
                        )}
                        <h3 className="text-xl font-bold">{tier.name}</h3>
                        {tier.description && (
                          <p className="text-sm text-muted-foreground">{tier.description}</p>
                        )}
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-2xl font-normal text-muted-foreground">
                            {tier.currency || defaultCurrency || "$"}
                          </span>
                          <span className="text-4xl font-bold">{getCurrentPrice(tier)}</span>
                          {tier.period && (
                            <span className="text-sm text-muted-foreground">/{tier.period}</span>
                          )}
                        </div>
                        <Button
                          variant={tier.highlighted ? "default" : "outline"}
                          className="w-full"
                          onClick={tier.cta.onClick}
                        >
                          {tier.cta.text}
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((featureText, featureIndex) => (
                  <tr key={featureIndex} className="border-t">
                    <td className="p-4 text-sm">{featureText}</td>
                    {tiers.map((tier, tierIndex) => {
                      const feature = tier.features.find((f) => f.text === featureText);
                      const included = feature?.included ?? false;
                      return (
                        <td
                          key={tierIndex}
                          className={cn(
                            "p-4 text-center",
                            tier.highlighted && "bg-primary/5"
                          )}
                        >
                          {included ? (
                            <Check className="mx-auto h-5 w-5 text-emerald-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    const getCardClasses = (tier: PricingTier, isAnimated: boolean) => {
      const baseClasses = "relative flex flex-col overflow-hidden transition-all";
      const animatedClasses = isAnimated ? "duration-300 hover:shadow-2xl" : "";
      
      if (tier.highlighted) {
        return cn(
          baseClasses,
          animatedClasses,
          "border-primary shadow-xl",
          isAnimated && "scale-105 hover:scale-110",
          "z-10",
          variant === "gradient" && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-primary/5 before:-z-10"
        );
      }
      
      return cn(
        baseClasses,
        !tier.highlighted && isAnimated && "hover:scale-[1.02] hover:shadow-lg",
        variant === "minimal" && "border-0 shadow-none hover:shadow-md",
        variant === "compact" && "p-0"
      );
    };

    const renderTestimonial = (testimonial: { quote: string; author: string; role?: string }) => (
      <div className="mt-4 border-t pt-4">
        <blockquote className="text-sm italic text-muted-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <p className="mt-2 text-xs font-medium">
          — {testimonial.author}
          {testimonial.role && <span className="text-muted-foreground">, {testimonial.role}</span>}
        </p>
      </div>
    );

    const renderPriceSection = (tier: PricingTier, currentPrice: string) => {
      let rawPrice: number | string;
      
      if (billingCycle === "yearly" && tier.yearlyPrice !== undefined) {
        rawPrice = tier.yearlyPrice;
      } else if (billingCycle === "monthly" && tier.monthlyPrice !== undefined) {
        rawPrice = tier.monthlyPrice;
      } else {
        rawPrice = tier.price;
      }
      
      return (
        <div className="space-y-1">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl font-normal text-muted-foreground">
              {tier.currency || defaultCurrency || "$"}
            </span>
            <span
              className={cn(
                "font-bold tracking-tight",
                typeof rawPrice === "number" || rawPrice !== "Custom"
                  ? "text-5xl"
                  : "text-3xl"
              )}
            >
              {currentPrice}
            </span>
            {tier.period && billingCycle === "monthly" && (
              <span className="text-sm font-normal text-muted-foreground">
                /{tier.period}
              </span>
            )}
            {billingCycle === "yearly" && (
              <span className="text-sm font-normal text-muted-foreground">
                /year
              </span>
            )}
          </div>
          {billingCycle === "yearly" && tier.savings && (
            <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
              {tier.savings}
            </p>
          )}
        </div>
      );
    };

    const renderCard = (tier: PricingTier, index: number) => {
      const Icon = tier.icon || getDefaultIcon(index);
      const testimonial = testimonials.find((t) => t.tierName === tier.name);
      const currentPrice = getCurrentPrice(tier);

      return (
        <Card
          key={index}
          className={getCardClasses(tier, animated)}
          role="article"
        >
          {tier.badge && (
            <div className="absolute right-4 top-4 z-10">
              <Badge
                variant={tier.highlighted ? "default" : "secondary"}
                className={cn(
                  animated && "animate-in fade-in slide-in-from-top-2 duration-500",
                  tier.popular && "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                )}
              >
                {tier.badge}
              </Badge>
            </div>
          )}

          <CardHeader className={cn("space-y-4", variant === "compact" && "p-4")}>
            {(tier.customIcon || Icon) && (
              <div className={cn(
                "mx-auto flex h-12 w-12 items-center justify-center rounded-full",
                tier.highlighted ? "bg-primary/20 text-primary" : "bg-muted",
                animated && "transition-transform hover:rotate-12"
              )}>
                {tier.customIcon || <Icon className="h-6 w-6" />}
              </div>
            )}
            <div className="space-y-2 text-center">
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              {tier.description && (
                <CardDescription className="text-base">{tier.description}</CardDescription>
              )}
            </div>
          </CardHeader>

          <CardContent className={cn("flex-1 space-y-6", variant === "compact" && "p-4 pt-0")}>
            {renderPriceSection(tier, currentPrice)}

            <ul className="space-y-3">
              {tier.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className={cn(
                    "flex items-start gap-3",
                    !feature.included && "opacity-60",
                    animated && "transition-all hover:translate-x-1"
                  )}
                  title={feature.tooltip}
                >
                  <div
                    className={cn(
                      "rounded-full p-0.5",
                      feature.included
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-destructive/20 text-destructive"
                    )}
                  >
                    {feature.included ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </div>
                  <span className={cn("text-sm", !feature.included && "line-through")}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {variant === "with-testimonials" && testimonial && renderTestimonial(testimonial)}
          </CardContent>

          <CardFooter className={cn("pt-6", variant === "compact" && "p-4")}>
            <Button
              className={cn(
                "w-full text-base font-medium",
                animated && "transition-all hover:scale-105"
              )}
              variant={tier.highlighted ? "default" : tier.cta.variant || "outline"}
              size="lg"
              onClick={tier.cta.onClick}
              asChild={tier.cta.href ? true : undefined}
            >
              {tier.cta.href ? (
                <a href={tier.cta.href}>{tier.cta.text}</a>
              ) : (
                tier.cta.text
              )}
            </Button>
          </CardFooter>
        </Card>
      );
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...cleanDOMProps(props)}>
        {showToggle && variant !== "comparison" && (
          <div className="mb-8 flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-lg font-medium">Choose your billing cycle</h3>
              <p className="text-sm text-muted-foreground">
                Save up to 20% with yearly billing
              </p>
            </div>
            <Tabs
              value={billingCycle}
              onValueChange={(value) => handleBillingCycleChange(value as "monthly" | "yearly")}
              className="w-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="relative">
                  Yearly
                  <Badge
                    variant="secondary"
                    className="absolute -right-12 -top-2 text-[10px]"
                  >
                    SAVE 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className={cn("grid gap-6", getGridCols(), variant === "gradient" && "gap-8")}>
          {tiers.map((tier, index) => renderCard(tier, index))}
        </div>
      </div>
    );
  }
);

PricingTable.displayName = "PricingTable";