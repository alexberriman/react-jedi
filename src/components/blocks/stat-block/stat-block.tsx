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
  Award,
  Shield,
  Cloud,
  Server,
  BarChart3,
  Package,
  Clock,
  Globe,
  Rocket,
  Brain,
  Sparkles,
  TrendingUp as TrendUp
} from "lucide-react";
import { SiAmazonwebservices } from "react-icons/si";
import { AiOutlineCloudServer } from "react-icons/ai";
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
  shield: Shield,
  cloud: Cloud,
  server: Server,
  aws: SiAmazonwebservices,
  azure: AiOutlineCloudServer,
  chart: BarChart3,
  package: Package,
  clock: Clock,
  globe: Globe,
  rocket: Rocket,
  brain: Brain,
  sparkles: Sparkles,
  trend: TrendUp,
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

// Enhanced trend indicator component
function TrendIndicator({ trend, variant }: { readonly trend: StatItem["trend"]; readonly variant?: string }) {
  if (!trend) return null;

  const isPositive = trend.direction === "up";
  const isModernVariant = ["gradient", "glass", "modern", "neon"].includes(variant || "");
  
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

  if (isModernVariant) {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        isPositive && "bg-green-500/10 text-green-600 dark:text-green-400",
        trend.direction === "down" && "bg-red-500/10 text-red-600 dark:text-red-400",
        trend.direction === "neutral" && "bg-muted text-muted-foreground"
      )}>
        <Icon className="size-3" />
        <span>
          {trend.value > 0 ? "+" : ""}{trend.value}%
        </span>
        {trend.label && (
          <span className="opacity-80">
            {trend.label}
          </span>
        )}
      </div>
    );
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

// Helper function to get icon container classes for modern variants
function getIconContainerClasses(variant: string | undefined, size: "lg" | "md") {
  const baseClasses = size === "lg" 
    ? "relative mb-4 size-16 rounded-2xl flex items-center justify-center"
    : "relative size-14 rounded-xl flex items-center justify-center flex-shrink-0";

  switch (variant) {
    case "gradient": {
      return cn(baseClasses, "bg-gradient-to-br from-primary/20 to-primary/5");
    }
    case "glass": {
      return cn(baseClasses, "bg-white/10 backdrop-blur-sm border border-white/20");
    }
    case "modern": {
      return cn(baseClasses, "bg-muted");
    }
    case "neon": {
      return cn(baseClasses, "bg-primary/10");
    }
    default: {
      return baseClasses;
    }
  }
}

// Helper function to render an icon with modern variant styling
function renderModernIcon(stat: StatItem, variant: string | undefined, size: "sm" | "md" | "lg") {
  let iconSize = "size-6";
  if (size === "lg") {
    iconSize = "size-8";
  } else if (size === "md") {
    iconSize = "size-7";
  }
  
  return (
    <StatIcon 
      icon={stat.icon!} 
      className={cn(
        iconSize,
        colorClasses[stat.color || "default"],
        variant === "neon" && "drop-shadow-[0_0_10px_currentColor]"
      )}
    />
  );
}

// Stat item icon wrapper with enhanced styling
function StatItemIcon({ 
  stat, 
  showIcon, 
  alignment, 
  position,
  variant
}: { 
  readonly stat: StatItem;
  readonly showIcon?: boolean;
  readonly alignment: NonNullable<StatBlockDef["alignment"]>;
  readonly position: "top" | "side";
  readonly variant?: string;
}) {
  if (!showIcon || !stat.icon) return null;
  
  const isModernVariant = ["gradient", "glass", "modern", "neon"].includes(variant || "");
  const isTopPosition = position === "top" && stat.iconPosition === "top";
  const isSidePosition = position === "side" && (stat.iconPosition === "left" || stat.iconPosition === "right");
  
  if (!isTopPosition && !isSidePosition) return null;
  
  if (isTopPosition) {
    if (isModernVariant) {
      return (
        <div className={cn(
          getIconContainerClasses(variant, "lg"),
          alignment === "center" && "mx-auto"
        )}>
          {renderModernIcon(stat, variant, "lg")}
        </div>
      );
    }
    
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
  
  if (isSidePosition) {
    if (isModernVariant) {
      return (
        <div className={getIconContainerClasses(variant, "md")}>
          {renderModernIcon(stat, variant, "md")}
        </div>
      );
    }
    
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

// Helper function to render styled cards for different variants
function renderStyledCard(variant: string | undefined, content: React.ReactNode, showBorder?: boolean) {
  switch (variant) {
    case "gradient": {
      return (
        <motion.div 
          className={cn(
            "relative h-full rounded-2xl p-6 overflow-hidden",
            "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5",
            "hover:from-primary/10 hover:via-primary/15 hover:to-primary/10",
            "transition-all duration-300",
            showBorder && "border border-primary/20"
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">{content}</div>
        </motion.div>
      );
    }
    
    case "glass": {
      return (
        <motion.div 
          className={cn(
            "relative h-full rounded-2xl p-6 overflow-hidden",
            "bg-white/5 dark:bg-white/10 backdrop-blur-lg",
            "border border-white/10 dark:border-white/20",
            "shadow-lg shadow-black/5",
            "hover:bg-white/10 dark:hover:bg-white/15",
            "transition-all duration-300"
          )}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative z-10">{content}</div>
        </motion.div>
      );
    }
    
    case "modern": {
      return (
        <motion.div 
          className={cn(
            "relative h-full rounded-2xl p-6 overflow-hidden",
            "bg-gradient-to-b from-muted/50 to-muted",
            "hover:from-muted/70 hover:to-muted",
            "shadow-sm hover:shadow-md",
            "transition-all duration-300",
            showBorder && "border"
          )}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="relative z-10">{content}</div>
        </motion.div>
      );
    }
    
    case "neon": {
      return (
        <motion.div 
          className={cn(
            "relative h-full rounded-2xl p-6 overflow-hidden",
            "bg-background border-2 border-primary/20",
            "hover:border-primary/40",
            "shadow-[0_0_20px_rgba(var(--primary),0.1)]",
            "hover:shadow-[0_0_30px_rgba(var(--primary),0.2)]",
            "transition-all duration-300"
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">{content}</div>
        </motion.div>
      );
    }
    
    default: {
      // Default card variant
      return (
        <Card className={cn(
          "h-full overflow-hidden",
          "hover:shadow-lg transition-shadow duration-300",
          !showBorder && "border-0 shadow-md"
        )}>
          <CardContent className="p-6">
            {content}
          </CardContent>
        </Card>
      );
    }
  }
}

// Helper function to create stat content
function createStatContent({
  stat,
  variant,
  showIcon,
  showDescription,
  showTrend,
  displayValue,
  alignment,
  valueSize,
  labelSize,
}: {
  readonly stat: StatItem;
  readonly variant: StatBlockDef["variant"];
  readonly showIcon?: boolean;
  readonly showDescription?: boolean;
  readonly showTrend?: boolean;
  readonly displayValue: string;
  readonly alignment: NonNullable<StatBlockDef["alignment"]>;
  readonly valueSize: NonNullable<StatBlockDef["valueSize"]>;
  readonly labelSize: NonNullable<StatBlockDef["labelSize"]>;
}) {
  return (
    <div className={cn(
      "flex flex-col",
      alignmentClasses[alignment],
      stat.iconPosition === "left" && "flex-row items-center gap-4",
      stat.iconPosition === "right" && "flex-row-reverse items-center gap-4"
    )}>
      <StatItemIcon stat={stat} showIcon={showIcon} alignment={alignment} position="top" variant={variant} />
      <StatItemIcon stat={stat} showIcon={showIcon} alignment={alignment} position="side" variant={variant} />
      
      <div className="flex-1">
        <StatItemValue stat={stat} displayValue={displayValue} valueSize={valueSize} />
        
        <div className={cn(
          "text-muted-foreground mt-1",
          labelSizeClasses[labelSize],
          variant === "gradient" && "text-foreground/70",
          variant === "glass" && "text-white/70",
          variant === "neon" && "text-foreground/80"
        )}>
          {stat.label}
        </div>
        
        {showDescription && stat.description && (
          <p className={cn(
            "text-xs mt-2",
            "text-muted-foreground",
            variant === "gradient" && "text-foreground/60",
            variant === "glass" && "text-white/60",
            variant === "neon" && "text-foreground/70"
          )}>
            {stat.description}
          </p>
        )}
        
        {showTrend && stat.trend && (
          <div className="mt-2">
            <TrendIndicator trend={stat.trend} variant={variant} />
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get display value
function getDisplayValue(
  value: string | number,
  animatedValue: number,
  countUp?: boolean
): string {
  if (countUp && typeof value === "number") {
    return formatNumber(animatedValue);
  }
  if (typeof value === "number") {
    return formatNumber(value);
  }
  return value;
}

// Individual stat component with enhanced styling
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

  const displayValue = getDisplayValue(stat.value, animatedValue, countUp);

  const content = createStatContent({
    stat,
    variant,
    showIcon,
    showDescription,
    showTrend,
    displayValue,
    alignment,
    valueSize,
    labelSize,
  });

  // Enhanced card styling for different variants
  const isCardVariant = variant === "card" || variant === "gradient" || variant === "glass" || 
    variant === "modern" || variant === "neon" || (variant === "detailed" && showBackground);
  
  if (isCardVariant) {
    return renderStyledCard(variant, content, showBorder);
  }

  // Add border/background for other variants if specified
  if (showBorder || showBackground) {
    const wrapperClasses = cn(
      showBorder && "border rounded-lg p-6",
      showBackground && "bg-muted/50 rounded-lg p-6"
    );
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