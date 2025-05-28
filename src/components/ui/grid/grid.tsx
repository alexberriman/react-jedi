import * as React from "react";
import { cn, cleanDOMProps } from "../../../lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns in the grid
   * @default 3
   */
  columns?: number | { [key: string]: number };
  /**
   * Gap between grid items
   * @default 4
   */
  gap?: number | { [key: string]: number };
  /**
   * Whether to auto-fit columns to available width
   * @default false
   */
  autoFit?: boolean;
  /**
   * Minimum width of auto-fit columns (when autoFit is true)
   * @default "250px"
   */
  minColWidth?: string;
  /**
   * Fixed column width (when autoFit is true)
   */
  colWidth?: string;
  /**
   * Rows in the grid
   */
  rows?: number | { [key: string]: number };
  /**
   * Areas template for named grid areas
   */
  areas?: string[];
  /**
   * Flow direction of grid items
   * @default "row"
   */
  flow?: "row" | "column" | "dense" | "row-dense" | "column-dense";
  /**
   * Whether grid items should stretch to fill container height
   * @default false
   */
  stretch?: boolean;
}

type ResponsiveValue = number | { [key: string]: number };

// Helper to generate responsive classes
const getResponsiveClasses = (value: ResponsiveValue, prefix: string): string => {
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([breakpoint, val]) => {
        if (breakpoint === "base") {
          return `${prefix}-${val}`;
        }
        return `${breakpoint}:${prefix}-${val}`;
      })
      .join(" ");
  }
  return `${prefix}-${value}`;
};

/**
 * Grid component providing a CSS Grid-based layout system with responsive options.
 * Allows configuring columns, rows, gaps, flow direction and more.
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      columns = 3,
      gap = 4,
      autoFit = false,
      minColWidth = "250px",
      colWidth,
      rows,
      areas,
      flow = "row",
      stretch = false,
      children,
      ...props
    },
    ref
  ) => {
    const cleanProps = cleanDOMProps(props);
    // Generate column classes
    const getColumnsClass = () => {
      if (autoFit) {
        const sizeValue = colWidth || `minmax(${minColWidth}, 1fr)`;
        return `grid-cols-[repeat(auto-fit,${sizeValue})]`;
      }
      return getResponsiveClasses(columns, "grid-cols");
    };

    // Generate row classes
    const getRowsClass = () => {
      if (!rows) return "";
      return getResponsiveClasses(rows, "grid-rows");
    };

    // Generate gap classes
    const getGapClass = () => {
      return getResponsiveClasses(gap, "gap");
    };

    // Generate flow classes
    const getFlowClass = () => {
      return `grid-flow-${flow}`;
    };

    // Generate areas classes
    const getAreasClass = () => {
      if (!areas || areas.length === 0) return "";
      const areasTemplate = areas.map((area) => `"${area}"`).join(" ");
      return `grid-areas-[${areasTemplate}]`;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          getColumnsClass(),
          getRowsClass(),
          getGapClass(),
          getFlowClass(),
          getAreasClass(),
          stretch && "h-full",
          className
        )}
        {...cleanProps}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

export { Grid };
