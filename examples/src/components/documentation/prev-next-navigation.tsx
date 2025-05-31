import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationLink {
  path: string;
  label: string;
}

interface PrevNextNavigationProps {
  prev?: NavigationLink;
  next?: NavigationLink;
}

export function PrevNextNavigation({ prev, next }: PrevNextNavigationProps) {
  return (
    <nav
      className="flex items-center justify-between mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
      aria-label="Pagination"
    >
      {prev ? (
        <Link
          to={prev.path}
          className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group max-w-sm"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors" />
          <div className="text-left">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              Previous
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
              {prev.label}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={next.path}
          className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group max-w-sm"
        >
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              Next
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
              {next.label}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}