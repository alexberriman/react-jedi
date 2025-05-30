import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavigationMenuProps = {
  children: React.ReactNode;
  className?: string;
};

export function NavigationMenu({ children, className }: Readonly<NavigationMenuProps>) {
  return (
    <nav className={cn("relative", className)}>
      <ul className="flex items-center gap-1">
        {children}
      </ul>
    </nav>
  );
}

export const NavigationMenuList = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

type NavigationMenuItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function NavigationMenuItem({ children, className }: Readonly<NavigationMenuItemProps>) {
  return <li className={cn("relative", className)}>{children}</li>;
}

type NavigationMenuTriggerProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavigationMenuTrigger({ children, className, onClick }: Readonly<NavigationMenuTriggerProps>) {
  return (
    <button
      className={cn(
        "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
        "hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none",
        className
      )}
      onClick={onClick}
    >
      {children}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-300"
        aria-hidden="true"
      />
    </button>
  );
}

type NavigationMenuContentProps = {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
};

export function NavigationMenuContent({ children, className, show = false }: Readonly<NavigationMenuContentProps>) {
  if (!show) return null;
  
  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div
        className={cn(
          "w-max rounded-lg bg-white dark:bg-gray-900 shadow-xl p-1",
          "animate-in fade-in-0 zoom-in-95",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function NavigationMenuLink({ className, children, ...props }: Readonly<React.ComponentProps<"a">>) {
  return (
    <a
      className={cn(
        "block select-none rounded px-3 py-2 text-sm leading-none no-underline outline-none transition-colors",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export const navigationMenuTriggerStyle = () =>
  "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none";