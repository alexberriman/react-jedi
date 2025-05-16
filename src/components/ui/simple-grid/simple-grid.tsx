"use client";

import { forwardRef } from "react";
import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

export interface SimpleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns for the grid */
  columns?:
    | number
    | {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
  /** Spacing between grid items */
  spacing?:
    | string
    | {
        base?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
      };
  /** Minimum child width */
  minChildWidth?: string;
  /** Children elements to be arranged in the grid */
  children?: ReactNode;
}

// Helper functions to reduce cognitive complexity
const processResponsiveColumns = (
  columns: SimpleGridProps["columns"],
  styles: Record<string, string>
) => {
  if (typeof columns === "number") {
    styles["--grid-columns"] = columns.toString();
    return;
  }

  if (columns?.base) styles["--grid-columns"] = columns.base.toString();
  if (columns?.sm) styles["--grid-columns-sm"] = columns.sm.toString();
  if (columns?.md) styles["--grid-columns-md"] = columns.md.toString();
  if (columns?.lg) styles["--grid-columns-lg"] = columns.lg.toString();
  if (columns?.xl) styles["--grid-columns-xl"] = columns.xl.toString();
};

const processResponsiveSpacing = (
  spacing: SimpleGridProps["spacing"],
  styles: Record<string, string>
) => {
  if (typeof spacing === "string") {
    styles["--grid-spacing"] = spacing;
    return;
  }

  if (spacing?.base) styles["--grid-spacing"] = spacing.base;
  if (spacing?.sm) styles["--grid-spacing-sm"] = spacing.sm;
  if (spacing?.md) styles["--grid-spacing-md"] = spacing.md;
  if (spacing?.lg) styles["--grid-spacing-lg"] = spacing.lg;
  if (spacing?.xl) styles["--grid-spacing-xl"] = spacing.xl;
};

const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  ({ className, columns = 1, spacing = "4", minChildWidth, children, ...props }, ref) => {
    const getResponsiveStyles = () => {
      const styles: Record<string, string> = {};

      processResponsiveColumns(columns, styles);
      processResponsiveSpacing(spacing, styles);

      if (minChildWidth) {
        styles["--grid-min-child-width"] = minChildWidth;
      }

      return styles;
    };

    const gridClasses = cn(
      "grid",
      minChildWidth
        ? "grid-cols-[repeat(auto-fit,minmax(var(--grid-min-child-width),1fr))]"
        : "grid-cols-[repeat(var(--grid-columns,1),1fr)]",
      "gap-[var(--grid-spacing)]",
      "sm:grid-cols-[repeat(var(--grid-columns-sm,var(--grid-columns,1)),1fr)]",
      "md:grid-cols-[repeat(var(--grid-columns-md,var(--grid-columns-sm,var(--grid-columns,1))),1fr)]",
      "lg:grid-cols-[repeat(var(--grid-columns-lg,var(--grid-columns-md,var(--grid-columns-sm,var(--grid-columns,1)))),1fr)]",
      "xl:grid-cols-[repeat(var(--grid-columns-xl,var(--grid-columns-lg,var(--grid-columns-md,var(--grid-columns-sm,var(--grid-columns,1))))),1fr)]",
      "sm:gap-[var(--grid-spacing-sm,var(--grid-spacing))]",
      "md:gap-[var(--grid-spacing-md,var(--grid-spacing-sm,var(--grid-spacing)))]",
      "lg:gap-[var(--grid-spacing-lg,var(--grid-spacing-md,var(--grid-spacing-sm,var(--grid-spacing))))]",
      "xl:gap-[var(--grid-spacing-xl,var(--grid-spacing-lg,var(--grid-spacing-md,var(--grid-spacing-sm,var(--grid-spacing)))))]",
      className
    );

    return (
      <div ref={ref} className={gridClasses} style={getResponsiveStyles()} {...props}>
        {children}
      </div>
    );
  }
);

SimpleGrid.displayName = "SimpleGrid";

export { SimpleGrid };
