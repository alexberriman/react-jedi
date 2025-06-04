import * as React from "react";

import { cn, cleanDOMProps } from "../../../lib/utils";

export interface TableProperties extends React.HTMLAttributes<HTMLTableElement> {
  /** The visual style variant of the table */
  variant?: "default" | "striped" | "bordered" | "minimal" | "compact" | "modern";
  /** Whether the table header should be sticky when scrolling */
  stickyHeader?: boolean;
  /** Whether to show hover effects on rows */
  hoverable?: boolean;
  children?: React.ReactNode;
}

/**
 * Table component that serves as a container for table elements.
 * This is a composable component where headers are added through
 * TableHeader and TableHead components.
 *
 * Usage example:
 * ```tsx
 * <Table variant="modern">
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = React.forwardRef<HTMLTableElement, TableProperties>(
  ({ className, variant = "default", stickyHeader = false, hoverable = true, children, ...props }, ref) => {
    const variantClasses = {
      default: "w-full caption-bottom text-sm",
      striped: "w-full caption-bottom text-sm",
      bordered: "w-full caption-bottom text-sm border border-border rounded-lg overflow-hidden",
      minimal: "w-full caption-bottom text-sm",
      compact: "w-full caption-bottom text-sm",
      modern: "w-full caption-bottom text-sm bg-card shadow-sm rounded-xl overflow-hidden",
    };

    const wrapperClasses = {
      default: "relative w-full overflow-x-auto",
      striped: "relative w-full overflow-x-auto",
      bordered: "relative w-full overflow-x-auto rounded-lg",
      minimal: "relative w-full overflow-x-auto",
      compact: "relative w-full overflow-x-auto",
      modern: "relative w-full overflow-x-auto rounded-xl shadow-lg",
    };

    return (
      <div className={cn(wrapperClasses[variant])}>
        <table
          ref={ref}
          className={cn(variantClasses[variant], className)}
          data-variant={variant}
          data-hoverable={hoverable}
          {...cleanDOMProps(props)}
        >
          {children}
        </table>
      </div>
    );
  }
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky, ...props }, ref) => {
  const table = React.useContext(TableContext);
  const variant = table?.variant || "default";

  const variantClasses = {
    default: "[&_tr]:border-b",
    striped: "bg-muted/30 [&_tr]:border-b",
    bordered: "bg-muted/20",
    minimal: "",
    compact: "[&_tr]:border-b",
    modern: "bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm",
  };

  return (
    <thead
      ref={ref}
      className={cn(
        variantClasses[variant],
        sticky && "sticky top-0 z-10 bg-background",
        className
      )}
      {...cleanDOMProps(props)}
    />
  );
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const table = React.useContext(TableContext);
  const variant = table?.variant || "default";

  const variantClasses = {
    default: "[&_tr:last-child]:border-0",
    striped: "[&_tr:nth-child(even)]:bg-muted/30 [&_tr:last-child]:border-0",
    bordered: "",
    minimal: "[&_tr:last-child]:border-0",
    compact: "[&_tr:last-child]:border-0",
    modern: "[&_tr:last-child]:border-0",
  };

  return (
    <tbody
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...cleanDOMProps(props)}
    />
  );
});
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const table = React.useContext(TableContext);
  const variant = table?.variant || "default";

  const variantClasses = {
    default: "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
    striped: "bg-muted/40 border-t font-medium [&>tr]:last:border-b-0",
    bordered: "bg-muted/20 font-medium",
    minimal: "border-t font-medium [&>tr]:last:border-b-0",
    compact: "bg-muted/50 border-t font-medium text-xs [&>tr]:last:border-b-0",
    modern: "bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm border-t font-medium [&>tr]:last:border-b-0",
  };

  return (
    <tfoot
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...cleanDOMProps(props)}
    />
  );
});
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => {
    const table = React.useContext(TableContext);
    const variant = table?.variant || "default";
    const hoverable = table?.hoverable ?? true;

    const variantClasses = {
      default: cn(
        "border-b transition-all duration-200",
        hoverable && "hover:bg-muted/50 hover:shadow-sm"
      ),
      striped: cn(
        "transition-all duration-200",
        hoverable && "hover:bg-muted/60"
      ),
      bordered: cn(
        "border-b transition-all duration-200",
        hoverable && "hover:bg-muted/30"
      ),
      minimal: cn(
        "border-b border-border/50 transition-all duration-200",
        hoverable && "hover:bg-muted/20"
      ),
      compact: cn(
        "border-b transition-all duration-200",
        hoverable && "hover:bg-muted/40"
      ),
      modern: cn(
        "border-b border-border/30 transition-all duration-300",
        hoverable && "hover:bg-primary/5 hover:shadow-md hover:scale-[1.01] hover:z-10 relative"
      ),
    };

    return (
      <tr
        ref={ref}
        className={cn(
          variantClasses[variant],
          "data-[state=selected]:bg-primary/10",
          className
        )}
        {...cleanDOMProps(props)}
      />
    );
  }
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const table = React.useContext(TableContext);
  const variant = table?.variant || "default";

  const variantClasses = {
    default: "text-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    striped: "text-foreground h-12 px-4 text-left align-middle font-semibold [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    bordered: "text-foreground h-12 px-4 text-left align-middle font-medium border-r last:border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    minimal: "text-muted-foreground h-10 px-3 text-left align-middle font-medium text-xs uppercase tracking-wider [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    compact: "text-foreground h-8 px-2 text-left align-middle font-medium text-xs [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    modern: "text-foreground h-14 px-6 text-left align-middle font-semibold tracking-tight [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  };

  return (
    <th
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...cleanDOMProps(props)}
    />
  );
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const table = React.useContext(TableContext);
  const variant = table?.variant || "default";

  const variantClasses = {
    default: "p-4 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    striped: "p-4 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    bordered: "p-4 align-middle border-r last:border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    minimal: "px-3 py-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    compact: "px-2 py-1 align-middle text-sm [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    modern: "px-6 py-4 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  };

  return (
    <td
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...cleanDOMProps(props)}
    />
  );
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => {
  const table = React.useContext(TableContext);
  const variant = table?.variant || "default";

  const variantClasses = {
    default: "text-muted-foreground mt-4 text-sm",
    striped: "text-muted-foreground mt-4 text-sm",
    bordered: "text-muted-foreground mt-4 text-sm px-4",
    minimal: "text-muted-foreground mt-3 text-xs uppercase tracking-wider",
    compact: "text-muted-foreground mt-2 text-xs",
    modern: "text-muted-foreground mt-6 text-sm italic",
  };

  return (
    <caption
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...cleanDOMProps(props)}
    />
  );
});
TableCaption.displayName = "TableCaption";

// Create a context to pass table props down to child components
interface TableContextValue {
  variant: TableProperties["variant"];
  hoverable: boolean;
}

const TableContext = React.createContext<TableContextValue | undefined>(undefined);

// Wrap the Table component to provide context
const TableWithContext = React.forwardRef<HTMLTableElement, TableProperties>(
  ({ variant = "default", hoverable = true, ...props }, ref) => {
    return (
      <TableContext.Provider value={{ variant, hoverable }}>
        <Table ref={ref} variant={variant} hoverable={hoverable} {...props} />
      </TableContext.Provider>
    );
  }
);
TableWithContext.displayName = "Table";

export {
  TableWithContext as Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};