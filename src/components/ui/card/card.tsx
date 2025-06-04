import * as React from "react";

import { cn, cleanDOMProps } from "../../../lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm overflow-hidden",
        className
      )}
      {...cleanProps}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...cleanProps}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...cleanProps}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...cleanProps}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...cleanProps}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return <div data-slot="card-content" className={cn("px-6 pb-6", className)} {...cleanProps} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...cleanProps}
    />
  );
}

interface CardImageProperties extends React.ComponentProps<"img"> {
  variant?: "cover" | "contain" | "zoom";
  overlay?: boolean;
}

function CardImage({ className, variant = "cover", overlay = false, ...props }: Readonly<CardImageProperties>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <div data-slot="card-image" className="relative aspect-video overflow-hidden">
      <img 
        alt=""
        className={cn(
          "h-full w-full object-cover transition-transform duration-300",
          variant === "zoom" && "hover:scale-105",
          className
        )}
        {...cleanProps}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      )}
    </div>
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, CardImage };
