import React from "react";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-zinc-900 dark:text-white">
              React Jedi Examples
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/examples"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Examples
              </Link>
              <Link
                to="/documentation"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
