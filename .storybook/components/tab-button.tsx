import * as React from "react";
import { cn } from "../../src/lib/utils";

interface TabButtonProps {
  readonly active: boolean;
  readonly onClick: () => void;
  readonly icon?: React.ReactNode;
  readonly children: React.ReactNode;
}

export function TabButton({ active, onClick, icon, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
        "hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer",
        active && "bg-white dark:bg-gray-900 shadow-sm text-blue-600 dark:text-blue-400",
        !active && "text-gray-600 dark:text-gray-400"
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}