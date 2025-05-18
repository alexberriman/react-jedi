import * as React from "react";
import { cn, cleanDOMProps } from "../../../lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...cleanProps}
    />
  );
}

export { Skeleton };
