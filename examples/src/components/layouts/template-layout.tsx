import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

export type TemplateLayoutProps = Readonly<{
  className?: string;
}>;

/**
 * Minimal layout for template pages that should be self-contained.
 * This layout has no navigation, header, or footer - just the content.
 * Used for demonstrating complete websites built with the library.
 */
export function TemplateLayout({ className }: TemplateLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      <Outlet />
    </div>
  );
}
