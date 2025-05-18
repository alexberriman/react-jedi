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
        "bg-gradient-to-br from-gray-50 via-white to-gray-50",
        "dark:from-gray-800 dark:via-gray-900 dark:to-gray-800",
        "border-b border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(156, 163, 175, 0.2) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(156, 163, 175, 0.2) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

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
