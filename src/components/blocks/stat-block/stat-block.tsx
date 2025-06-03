/**
 * Stat Block Component
 *
 * A versatile statistics display component with multiple variants:
 * - Grid layout for multiple stats
 * - Horizontal/vertical arrangements
 * - Card-based layouts with backgrounds
 * - Minimal text-only display
 * - Detailed view with trends and descriptions
 * - Animated number counting
 * - Trend indicators with up/down arrows
 * - Icon support with flexible positioning
 * - Responsive column layouts
 * - Customizable sizing and colors
 */

import * as React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Users,
  ShoppingCart,
  Eye,
  Heart,
  Star,
  Activity,
  Zap,
  Target,
  Award
} from "lucide-react";
import type { ComponentProps as ReactJediComponentProps } from "../../../types/schema/components";
import type { StatBlockDef, StatItem } from "../../../types/components/stat-block";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../ui/card";

interface StatBlockProps extends ReactJediComponentProps {
  readonly spec: StatBlockDef;
}

// Icon mapping for string-based icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dollar: DollarSign,
  users: Users,
  cart: ShoppingCart,
  eye: Eye,
  heart: Heart,
  star: Star,
  activity: Activity,
  zap: Zap,
  target: Target,
  award: Award,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
};

// Column classes for grid layout
const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
};

// Gap classes
const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
};

// Size classes for values
const valueSizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
  "2xl": "text-5xl",
  "3xl": "text-6xl",
};

// Size classes for labels
const labelSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

// Color classes
const colorClasses = {
  default: "",
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  error: "text-red-600 dark:text-red-400",
};

// Alignment classes
const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

// Count up hook for animated numbers
function useCountUp(
  end: number,
  duration: number = 2000,
  enabled: boolean = true
) {
  const [count, setCount] = React.useState(enabled ? 0 : end);
  const [hasStarted, setHasStarted] = React.useState(false);

  React.useEffect(() => {
    if (!enabled || hasStarted) {
      setCount(end);
      return;
    }

    setHasStarted(true);
    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        globalThis.requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    globalThis.requestAnimationFrame(updateCount);
  }, [end, duration, enabled, hasStarted]);

  return count;
}

// Format number with commas
function formatNumber(value: number | string): string {
  if (typeof value === "string") return value;
  return new Intl.NumberFormat().format(value);
}

// Trend indicator component
function TrendIndicator({ trend }: { readonly trend: StatItem["trend"] }) {
  if (!trend) return null;

  const isPositive = trend.direction === "up";
  
  let Icon;
  if (isPositive) {
    Icon = ArrowUp;
  } else if (trend.direction === "down") {
    Icon = ArrowDown;
  } else {
    Icon = Minus;
  }
  
  let colorClass;
  if (isPositive) {
    colorClass = "text-green-600 dark:text-green-400";
  } else if (trend.direction === "down") {
    colorClass = "text-red-600 dark:text-red-400";
  } else {
    colorClass = "text-muted-foreground";
  }

  return (
    <div className={cn("flex items-center gap-1", colorClass)}>
      <Icon className="size-4" />
      <span className="text-sm font-medium">
        {trend.value > 0 ? "+" : ""}{trend.value}%
      </span>
      {trend.label && (
        <span className="text-xs text-muted-foreground ml-1">
          {trend.label}
        </span>
      )}
    </div>
  );
}

// Icon component
function StatIcon({ 
  icon, 
  className 
}: { 
  readonly icon: string;
  readonly className?: string;
}) {
  const IconComponent = iconMap[icon];
  if (!IconComponent) return null;
  
  return <IconComponent className={className} />;
}

// Stat item icon wrapper
function StatItemIcon({ 
  stat, 
  showIcon, 
  alignment, 
  position 
}: { 
  readonly stat: StatItem;
  readonly showIcon?: boolean;
  readonly alignment: string;
  readonly position: "top" | "side";
}) {
  if (!showIcon || !stat.icon) return null;
  
  if (position === "top" && stat.iconPosition === "top") {
    return (
      <StatIcon 
        icon={stat.icon} 
        className={cn(
          "size-8 mb-2",
          colorClasses[stat.color || "default"],
          alignment === "center" && "mx-auto"
        )}
      />
    );
  }
  
  if (position === "side" && (stat.iconPosition === "left" || stat.iconPosition === "right")) {
    return (
      <StatIcon 
        icon={stat.icon} 
        className={cn(
          "size-8 flex-shrink-0",
          colorClasses[stat.color || "default"]
        )}
      />
    );
  }
  
  return null;
}

// Stat item value display
function StatItemValue({ 
  stat, 
  displayValue, 
  valueSize 
}: { 
  readonly stat: StatItem;
  readonly displayValue: string;
  readonly valueSize: NonNullable<StatBlockDef["valueSize"]>;
}) {
  return (
    <div className={cn(
      "font-bold",
      valueSizeClasses[valueSize],
      colorClasses[stat.color || "default"]
    )}>
      {stat.prefix && <span className="font-normal">{stat.prefix}</span>}
      {displayValue}
      {stat.unit && <span className="font-normal text-base ml-1">{stat.unit}</span>}
      {stat.suffix && <span className="font-normal">{stat.suffix}</span>}
    </div>
  );
}

// Individual stat component
function StatItemComponent({
  stat,
  variant,
  showBorder,
  showBackground,
  showTrend,
  showDescription,
  showIcon,
  animated,
  animationDelay,
  countUp,
  countUpDuration,
  valueSize,
  labelSize,
  alignment,
}: {
  readonly stat: StatItem;
  readonly variant: StatBlockDef["variant"];
  readonly showBorder?: boolean;
  readonly showBackground?: boolean;
  readonly showTrend?: boolean;
  readonly showDescription?: boolean;
  readonly showIcon?: boolean;
  readonly animated?: boolean;
  readonly animationDelay?: number;
  readonly countUp?: boolean;
  readonly countUpDuration?: number;
  readonly valueSize: NonNullable<StatBlockDef["valueSize"]>;
  readonly labelSize: NonNullable<StatBlockDef["labelSize"]>;
  readonly alignment: NonNullable<StatBlockDef["alignment"]>;
}) {
  const numericValue = typeof stat.value === "number" ? stat.value : 0;
  const animatedValue = useCountUp(
    numericValue,
    countUpDuration,
    countUp && typeof stat.value === "number"
  );

  let displayValue: string;
  if (countUp && typeof stat.value === "number") {
    displayValue = formatNumber(animatedValue);
  } else if (typeof stat.value === "number") {
    displayValue = formatNumber(stat.value);
  } else {
    displayValue = stat.value;
  }

  const content = (
    <div className={cn(
      "flex flex-col",
      alignmentClasses[alignment],
      stat.iconPosition === "left" && "flex-row items-center gap-4",
      stat.iconPosition === "right" && "flex-row-reverse items-center gap-4"
    )}>
      <StatItemIcon stat={stat} showIcon={showIcon} alignment={alignment} position="top" />
      <StatItemIcon stat={stat} showIcon={showIcon} alignment={alignment} position="side" />
      
      <div className="flex-1">
        <StatItemValue stat={stat} displayValue={displayValue} valueSize={valueSize} />
        
        <div className={cn(
          "text-muted-foreground mt-1",
          labelSizeClasses[labelSize]
        )}>
          {stat.label}
        </div>
        
        {showDescription && stat.description && (
          <p className="text-xs text-muted-foreground mt-2">
            {stat.description}
          </p>
        )}
        
        {showTrend && stat.trend && (
          <div className="mt-2">
            <TrendIndicator trend={stat.trend} />
          </div>
        )}
      </div>
    </div>
  );

  // Wrap in card for card variant
  if (variant === "card" || (variant === "detailed" && showBackground)) {
    return (
      <Card className={cn(
        "h-full",
        !showBorder && "border-0 shadow-none"
      )}>
        <CardContent className="p-6">
          {content}
        </CardContent>
      </Card>
    );
  }

  // Add border/background for other variants if specified
  const wrapperClasses = cn(
    showBorder && "border rounded-lg p-6",
    showBackground && "bg-muted/50 rounded-lg p-6"
  );

  if (showBorder || showBackground) {
    return <div className={wrapperClasses}>{content}</div>;
  }

  return content;
}

/**
 * StatBlock - Versatile statistics display component
 */
export function StatBlock({ spec }: StatBlockProps) {
  const {
    variant = "grid",
    stats = [],
    columns = 3,
    gap = "md",
    alignment = "center",
    showBorder = false,
    showBackground = false,
    showTrend = true,
    showDescription = true,
    showIcon = true,
    animated = true,
    animationDuration = 300,
    staggerDelay = 100,
    countUp = true,
    countUpDuration = 2000,
    valueSize = "2xl",
    labelSize = "sm",
  } = spec;

  const className = spec.className as string | undefined;
  const style = spec.style as React.CSSProperties | undefined;

  // Handle different variants
  const renderStats = () => {
    if (variant === "horizontal") {
      return (
        <div className="flex flex-wrap items-center justify-between gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={animated ? { opacity: 0, y: 20 } : undefined}
              animate={animated ? { opacity: 1, y: 0 } : undefined}
              transition={animated ? { 
                duration: animationDuration / 1000, 
                delay: (index * staggerDelay) / 1000 
              } : undefined}
              className="flex-1 min-w-[150px]"
            >
              <StatItemComponent
                stat={stat}
                variant={variant}
                showBorder={showBorder}
                showBackground={showBackground}
                showTrend={showTrend}
                showDescription={showDescription}
                showIcon={showIcon}
                animated={animated}
                animationDelay={index * staggerDelay}
                countUp={countUp}
                countUpDuration={countUpDuration}
                valueSize={valueSize}
                labelSize={labelSize}
                alignment={alignment}
              />
            </motion.div>
          ))}
        </div>
      );
    }

    if (variant === "vertical") {
      return (
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={animated ? { opacity: 0, x: -20 } : undefined}
              animate={animated ? { opacity: 1, x: 0 } : undefined}
              transition={animated ? { 
                duration: animationDuration / 1000, 
                delay: (index * staggerDelay) / 1000 
              } : undefined}
            >
              <StatItemComponent
                stat={stat}
                variant={variant}
                showBorder={showBorder}
                showBackground={showBackground}
                showTrend={showTrend}
                showDescription={showDescription}
                showIcon={showIcon}
                animated={animated}
                animationDelay={index * staggerDelay}
                countUp={countUp}
                countUpDuration={countUpDuration}
                valueSize={valueSize}
                labelSize={labelSize}
                alignment="left"
              />
            </motion.div>
          ))}
        </div>
      );
    }

    // Default grid layout (also used for card, minimal, detailed variants)
    return (
      <div className={cn("grid", columnClasses[columns], gapClasses[gap])}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id || index}
            initial={animated ? { opacity: 0, y: 20 } : undefined}
            animate={animated ? { opacity: 1, y: 0 } : undefined}
            transition={animated ? { 
              duration: animationDuration / 1000, 
              delay: (index * staggerDelay) / 1000 
            } : undefined}
          >
            <StatItemComponent
              stat={stat}
              variant={variant}
              showBorder={variant === "grid" ? showBorder : false}
              showBackground={variant === "minimal" ? false : showBackground}
              showTrend={variant === "minimal" ? false : showTrend}
              showDescription={variant === "minimal" ? false : showDescription}
              showIcon={variant === "minimal" ? false : showIcon}
              animated={animated}
              animationDelay={index * staggerDelay}
              countUp={countUp}
              countUpDuration={countUpDuration}
              valueSize={valueSize}
              labelSize={labelSize}
              alignment={alignment}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)} style={style}>
      {renderStats()}
    </div>
  );
}