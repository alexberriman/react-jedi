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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      <ScrollToTop />
      <ScrollProgress />
      <BackToTop />
      <AnchorScroll />
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Components
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/showcase"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Component Gallery</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Browse all UI components with live previews
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/showcase/interactive"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">
                            Interactive Showcase
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Form components, toggles, and state management
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/showcase/layout"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Layout Components</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Advanced layout systems and responsive containers
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/showcase/overlay-interactive"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Overlays & Dialogs</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Modals, sheets, popovers, and tooltips
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
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/examples"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">All Examples</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Browse all example implementations
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/examples/landing"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Landing Page</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Hero section, features, and CTA components
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/examples/form-validation"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Form Validation</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Complex forms with real-time validation
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/examples/navigation"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">
                            Navigation Patterns
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Menus, sidebars, and breadcrumbs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/templates/marketing"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Marketing Template</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
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
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/test-responsive"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Test Responsive</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Debug responsive breakpoints
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/theming"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Theming System</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Theme configuration and customization options
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/brand-presets"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">Brand Presets</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Pre-built theme configurations for popular brands
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/performance"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">
                            Performance Metrics
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Benchmarks and optimization techniques
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/state"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <div className="text-sm font-medium leading-none">State Management</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            JSON-based state patterns and optimizations
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a
              href="https://github.com/banja-au/react-jedi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>

            <DarkModeToggle />
          </div>
        </div>
      </header>
      <main className={className}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/showcase" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Components
                  </Link>
                </li>
                <li>
                  <Link to="/examples" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Documentation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/documentation" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link to="/theming" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Theming
                  </Link>
                </li>
                <li>
                  <Link to="/state" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    State Management
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/performance" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Performance
                  </Link>
                </li>
                <li>
                  <Link to="/brand-presets" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Brand Presets
                  </Link>
                </li>
                <li>
                  <a href="https://github.com/banja-au/react-jedi" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} React Jedi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}