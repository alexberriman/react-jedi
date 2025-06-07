import * as React from "react";
import { cn, cleanDOMProps } from "../../../lib/utils";

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns in the masonry grid
   * Can be responsive with breakpoint object
   * @default 3
   */
  columns?: number | { [key: string]: number };
  /**
   * Gap between masonry items (in Tailwind units)
   * @default 4
   */
  gap?: number | { [key: string]: number };
  /**
   * Minimum width for columns when using auto-sizing
   * @default "250px"
   */
  minColWidth?: string;
  /**
   * Whether to use auto-fit columns based on container width
   * @default false
   */
  autoFit?: boolean;
  /**
   * Animation settings for items entering the viewport
   * @default { duration: 0.3, stagger: 0.05 }
   */
  animation?: {
    duration?: number;
    stagger?: number;
    easing?: string;
  };
  /**
   * Whether to apply glassmorphic effects to items
   * @default false
   */
  glassmorphic?: boolean;
  /**
   * Custom item wrapper component
   */
  itemComponent?: React.ElementType;
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
 * Masonry component creates a Pinterest-style grid layout with items flowing vertically.
 * Supports responsive columns, animations, and beautiful glassmorphic effects.
 */
const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  (
    {
      className,
      columns = 3,
      gap = 4,
      minColWidth = "250px",
      autoFit = false,
      animation = { duration: 0.3, stagger: 0.05 },
      glassmorphic = false,
      itemComponent: ItemComponent = "div",
      children,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false);
    const [columnCount, setColumnCount] = React.useState(() =>
      typeof columns === "number" ? columns : columns.base || 3
    );

    // Handle responsive column updates
    React.useEffect(() => {
      setMounted(true);

      if (typeof columns === "object") {
        const handleResize = () => {
          const width = window.innerWidth;

          // Check breakpoints (assumes standard Tailwind breakpoints)
          if (width >= 1536 && columns["2xl"]) {
            setColumnCount(columns["2xl"]);
          } else if (width >= 1280 && columns.xl) {
            setColumnCount(columns.xl);
          } else if (width >= 1024 && columns.lg) {
            setColumnCount(columns.lg);
          } else if (width >= 768 && columns.md) {
            setColumnCount(columns.md);
          } else if (width >= 640 && columns.sm) {
            setColumnCount(columns.sm);
          } else {
            setColumnCount(columns.base || 3);
          }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, [columns]);

    // Distribute children into columns
    const distributeChildren = () => {
      const cols: React.ReactNode[][] = Array.from({ length: columnCount }, () => []);
      const childArray = React.Children.toArray(children);

      for (const [index, child] of childArray.entries()) {
        const columnIndex = index % columnCount;
        cols[columnIndex].push(child);
      }

      return cols;
    };

    const columnsContent = distributeChildren();

    // Generate column styles
    const getColumnStyle = () => {
      if (autoFit) {
        return {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}, 1fr))`,
        };
      }
      return {
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
      };
    };

    // Generate gap classes
    const getGapClass = () => {
      return getResponsiveClasses(gap, "gap");
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full",
          getGapClass(),
          className
        )}
        style={getColumnStyle()}
        {...cleanDOMProps(props)}
      >
        {columnsContent.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-[inherit]">
            {column.map((child, itemIndex) => {
              const globalIndex = colIndex + itemIndex * columnCount;
              const animationDelay = animation.stagger ? globalIndex * animation.stagger : 0;

              return (
                <ItemComponent
                  key={itemIndex}
                  className={cn(
                    "transition-all",
                    mounted && "animate-in fade-in duration-300",
                    glassmorphic && [
                      "backdrop-blur-md",
                      "bg-white/10",
                      "dark:bg-gray-900/10",
                      "border border-white/20",
                      "dark:border-gray-700/30",
                      "shadow-xl",
                      "hover:shadow-2xl",
                      "hover:bg-white/15",
                      "dark:hover:bg-gray-900/15",
                      "hover:scale-[1.02]",
                      "cursor-pointer",
                    ]
                  )}
                  style={{
                    animationDelay: `${animationDelay}s`,
                    animationDuration: `${animation.duration}s`,
                    animationTimingFunction: animation.easing || "ease-out",
                  }}
                >
                  {child}
                </ItemComponent>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);
Masonry.displayName = "Masonry";

export { Masonry };
