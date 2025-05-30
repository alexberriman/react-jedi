import { cn } from "../../lib/utils";

interface PageHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-gray-50 dark:bg-gray-950",
        "border-b border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">{description}</p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  );
}
