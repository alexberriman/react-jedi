import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, cleanDOMProps } from "../../../lib/utils";
import { getAlertAriaProps } from "../../../lib/accessibility";

const alertVariants = cva(
  "relative w-full rounded-xl px-5 py-4 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-1 items-start shadow-sm border-l-4 transition-all duration-200 hover:shadow-md [&>svg]:size-5 [&>svg]:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-background/50 backdrop-blur-sm text-foreground border-border/50 border-l-primary/50 [&>svg]:text-primary",
        destructive:
          "bg-destructive/5 backdrop-blur-sm text-destructive border-destructive/20 border-l-destructive [&>svg]:text-destructive *:data-[slot=alert-description]:text-destructive/90",
        info: "bg-blue-50/50 dark:bg-blue-950/20 backdrop-blur-sm text-blue-900 dark:text-blue-100 border-blue-200/50 dark:border-blue-800/50 border-l-blue-500 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        warning: "bg-yellow-50/50 dark:bg-yellow-950/20 backdrop-blur-sm text-yellow-900 dark:text-yellow-100 border-yellow-200/50 dark:border-yellow-800/50 border-l-yellow-500 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        success: "bg-green-50/50 dark:bg-green-950/20 backdrop-blur-sm text-green-900 dark:text-green-100 border-green-200/50 dark:border-green-800/50 border-l-green-500 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {
  readonly "aria-live"?: "polite" | "assertive" | "off";
  readonly role?: "alert" | "status";
}

function Alert({
  className,
  variant,
  "aria-live": ariaLive,
  role = "alert",
  ...props
}: AlertProps) {
  const ariaProps = getAlertAriaProps({
    ariaLive: ariaLive || "polite",
    role,
  });

  const cleanProps = cleanDOMProps(props);

  return (
    <div
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...ariaProps}
      {...cleanProps}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-5 font-semibold tracking-tight text-base", className)}
      {...cleanProps}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1.5 text-sm opacity-90 [&_p]:leading-relaxed",
        className
      )}
      {...cleanProps}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
