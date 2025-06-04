import type { BaseComponentSpec } from "../schema/base";

export interface StatItem {
  id?: string;
  label: string;
  value: string | number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  description?: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
    label?: string;
  };
  icon?: string;
  iconPosition?: "top" | "left" | "right";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
  href?: string;
}

export interface StatBlockDef extends BaseComponentSpec {
  type: "StatBlock";
  variant?: "grid" | "horizontal" | "vertical" | "card" | "minimal" | "detailed" | "gradient" | "glass" | "modern" | "neon";
  stats: StatItem[];
  
  // Layout options
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg" | "xl";
  alignment?: "left" | "center" | "right";
  
  // Display options
  showBorder?: boolean;
  showBackground?: boolean;
  showTrend?: boolean;
  showDescription?: boolean;
  showIcon?: boolean;
  
  // Animation options
  animated?: boolean;
  animationDuration?: number;
  staggerDelay?: number;
  countUp?: boolean;
  countUpDuration?: number;
  
  // Size options
  size?: "sm" | "md" | "lg" | "xl";
  valueSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  labelSize?: "xs" | "sm" | "md" | "lg";
}