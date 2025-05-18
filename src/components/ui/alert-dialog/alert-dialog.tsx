import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn, cleanDOMProps } from "../../../lib/utils";
import { buttonVariants } from "../button";
import type { VariantProps } from "class-variance-authority";

function AlertDialog({
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Root>>) {
  const cleanProps = cleanDOMProps(props);
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...cleanProps} />;
}

function AlertDialogTrigger({
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Trigger>>) {
  const cleanProps = cleanDOMProps(props);
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...cleanProps} />;
}

function AlertDialogPortal({
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Portal>>) {
  const cleanProps = cleanDOMProps(props);
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...cleanProps} />;
}

function AlertDialogOverlay({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Overlay>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...cleanProps}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Content>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...cleanProps}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: Readonly<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: Readonly<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Title>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...cleanProps}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Description>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...cleanProps}
    />
  );
}

function AlertDialogAction({
  className,
  variant,
  size,
  ...props
}: Readonly<
  React.ComponentProps<typeof AlertDialogPrimitive.Action> & VariantProps<typeof buttonVariants>
>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants({ variant, size }), className)}
      {...cleanProps}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof AlertDialogPrimitive.Cancel>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...cleanProps}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
