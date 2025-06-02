import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShowcaseWrapperProps {
  children: ReactNode;
  className?: string;
  isolated?: boolean;
}

export function ShowcaseWrapper({ children, className, isolated = true }: ShowcaseWrapperProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800",
        isolated && "isolate",
        className
      )}
    >
      <div className="bg-gray-50 dark:bg-gray-900 p-6">
        {children}
      </div>
    </div>
  );
}