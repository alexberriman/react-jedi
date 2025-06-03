import { ReactNode } from "react";

interface ShowcaseWrapperProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly isolated?: boolean;
}

export function ShowcaseWrapper({ children, className, isolated = false }: ShowcaseWrapperProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
      {children}
    </div>
  );
}