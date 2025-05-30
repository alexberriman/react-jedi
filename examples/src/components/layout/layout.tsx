import { Link, Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { MobileMenu } from "../ui/mobile-menu";
import { DarkModeToggle } from "../ui/dark-mode-toggle";
import { cn } from "@/lib/utils";
import { ScrollToTop } from "./scroll-to-top";
import { ScrollProgress } from "./scroll-progress";
import { BackToTop } from "./back-to-top";
import { PageTransition } from "./page-transition";
import { AnchorScroll } from "./anchor-scroll";

export type LayoutProps = Readonly<{
  className?: string;
}>;

export function Layout({ className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <ScrollToTop />
      <ScrollProgress />
      <BackToTop />
      <AnchorScroll />
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Link to="/" className="flex items-center gap-2">
              <div className="text-blue-600 dark:text-blue-400 flex items-center font-bold text-xl md:text-2xl hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2"
                  fill="currentColor"
                >
                  <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6A9.996 9.996 0 0 1 12.001 22C6.477 22 2 17.523 2 12c0-5.185 3.947-9.449 9.001-9.95a7.48 7.48 0 0 0 .38-.031zM17.5 11a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm-1.61-2.93a.53.53 0 0 0 .74 0l1.06-1.06c.2-.2.2-.53 0-.73l-1.06-1.06a.52.52 0 0 0-.74 0 .52.52 0 0 0 0 .73l.33.33h-1.95c-.29 0-.53.24-.53.53v2.07c0 .29.24.53.53.53.29 0 .53-.24.53-.53v-1.54l1.09 1.09c.2.2.53.2.73 0zm-3.28 0 1.09-1.09v1.54c0 .29.24.53.53.53.29 0 .53-.24.53-.53V8.41c0-.29-.24-.53-.53-.53h-1.95l.33-.33a.52.52 0 0 0 0-.73.52.52 0 0 0-.74 0L11.02 7.88c-.2.2-.2.53 0 .73l1.06 1.06c.2.2.54.2.74 0z" />
                </svg>
                React Jedi
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Components
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-0">
                    <ul className="grid gap-0 p-1 w-[280px] bg-white dark:bg-gray-900 rounded-lg border-0">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/showcase"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Component Gallery
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Browse all UI components with live previews
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Examples
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-0">
                    <ul className="grid gap-0 p-1 w-[280px] bg-white dark:bg-gray-900 rounded-lg border-0">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/examples"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            All Examples
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Browse all example implementations
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/examples/landing"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Landing Page
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Hero section, features, and CTA components
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/examples/navigation"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Navigation Patterns
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Menus, sidebars, and breadcrumbs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/templates/marketing"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Marketing Template
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Full marketing website with multiple pages
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/documentation"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      )}
                    >
                      Documentation
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-0">
                    <ul className="grid gap-0 p-1 w-[280px] bg-white dark:bg-gray-900 rounded-lg border-0">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/theming"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Theming System
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Theme configuration and customization options
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/brand-presets"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Brand Presets
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Pre-made themes for popular brands
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/performance"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Performance
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Benchmarks and optimization tips
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/state"
                          className="block select-none rounded px-3 py-2.5 leading-none no-underline outline-none transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            State Management
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Server-driven state patterns
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <DarkModeToggle />
          </div>
        </div>
      </header>
      <main className={cn("", className)}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Components</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/showcase"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Component Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Examples</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/examples"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    All Examples
                  </Link>
                </li>
                <li>
                  <Link
                    to="/examples/landing"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Landing Page
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/documentation"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/theming"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Theming System
                  </Link>
                </li>
                <li>
                  <Link
                    to="/performance"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Performance
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">React Jedi</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A modern React UI library focused on performance and developer experience.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/react-jedi"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              © 2024 React Jedi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
