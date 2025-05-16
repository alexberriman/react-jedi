import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Button } from "../button";
import { Badge } from "../badge";
import { Check, X } from "lucide-react";

export interface PricingTier {
  name: string;
  description?: string;
  price: number | string;
  currency?: string;
  period?: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  cta: {
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  };
  badge?: string;
  highlighted?: boolean;
}

export interface PricingTableProps {
  tiers: PricingTier[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  ({ tiers, columns = 3, className, ...props }, ref) => {
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

    return (
      <div ref={ref} className={cn("grid gap-6", getGridCols(), className)} {...props}>
        {tiers.map((tier, index) => (
          <Card
            key={index}
            className={cn(
              "relative flex flex-col overflow-hidden transition-all duration-300",
              tier.highlighted && [
                "border-primary shadow-xl scale-105 z-10",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-primary/10 before:-z-10",
              ],
              "hover:shadow-lg hover:scale-[1.02]"
            )}
          >
            {tier.badge && (
              <div className="absolute top-4 right-4 z-10">
                <Badge variant={tier.highlighted ? "default" : "secondary"}>{tier.badge}</Badge>
              </div>
            )}

            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              {tier.description && (
                <CardDescription className="text-base">{tier.description}</CardDescription>
              )}
            </CardHeader>

            <CardContent className="flex-1 space-y-6">
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  {tier.currency && (
                    <span className="text-2xl font-normal text-muted-foreground">
                      {tier.currency}
                    </span>
                  )}
                  <span
                    className={cn(
                      "font-bold tracking-tight",
                      typeof tier.price === "number" || tier.price !== "Custom"
                        ? "text-5xl"
                        : "text-3xl"
                    )}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm font-normal text-muted-foreground">
                      /{tier.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={cn("flex items-start gap-3", !feature.included && "opacity-60")}
                  >
                    <div
                      className={cn(
                        "rounded-full p-0.5",
                        feature.included
                          ? "bg-emerald-500/20 text-emerald-500"
                          : "bg-destructive/20 text-destructive"
                      )}
                    >
                      {feature.included ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </div>
                    <span className={cn("text-sm", !feature.included && "line-through")}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                className="w-full text-base font-medium"
                variant={tier.highlighted ? "default" : tier.cta.variant || "outline"}
                size="lg"
              >
                {tier.cta.text}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
);

PricingTable.displayName = "PricingTable";
