import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@alexberriman/react-jedi";

export type NavItem = {
  title: string;
  href?: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: "Documentation",
    href: "/documentation",
  },
  {
    title: "Components",
    children: [
      { title: "Component Gallery", href: "/showcase" },
    ],
  },
  {
    title: "Examples",
    children: [
      { title: "All Examples", href: "/examples" },
      { title: "Marketing Template", href: "/templates/marketing" },
    ],
  },
  {
    title: "Resources",
    children: [
      { title: "Theming System", href: "/theming" },
      { title: "Brand Presets", href: "/brand-presets" },
      { title: "Performance Metrics", href: "/performance" },
      { title: "State Management", href: "/state" },
    ],
  },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
        <div className="flex flex-col gap-4 py-4">
          <Link to="/" className="flex items-center gap-2 px-2" onClick={() => setOpen(false)}>
            <div className="text-blue-600 dark:text-blue-400 flex items-center font-bold text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 mr-1 fill-current"
              >
                <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6A9.996 9.996 0 0 1 12.001 22C6.477 22 2 17.523 2 12c0-5.185 3.947-9.449 9.001-9.95a7.48 7.48 0 0 0 .38-.031zM17.5 11a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm-1.61-2.93a.53.53 0 0 0 .74 0l1.06-1.06c.2-.2.2-.53 0-.73l-1.06-1.06a.52.52 0 0 0-.74 0 .52.52 0 0 0 0 .73l.33.33h-1.95c-.29 0-.53.24-.53.53v2.07c0 .29.24.53.53.53.29 0 .53-.24.53-.53v-1.54l1.09 1.09c.2.2.53.2.73 0zm-3.28 0 1.09-1.09v1.54c0 .29.24.53.53.53.29 0 .53-.24.53-.53V8.41c0-.29-.24-.53-.53-.53h-1.95l.33-.33a.52.52 0 0 0 0-.73.52.52 0 0 0-.74 0L11.02 7.88c-.2.2-.2.53 0 .73l1.06 1.06c.2.2.54.2.74 0z" />
              </svg>
              React Jedi
            </div>
          </Link>
          <div className="h-px bg-gray-200 dark:bg-gray-800 mx-2" />
          <nav className="flex flex-col gap-2">
            {navItems.map((item) =>
              item.children ? (
                <Collapsible key={item.title}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md transition-colors">
                    <span className="font-medium">{item.title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform ui-state-open:rotate-180"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href as string}
                        className="block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-md transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-2 py-2 font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>
          <div className="h-px bg-gray-200 dark:bg-gray-800 mx-2" />
          <a
            href="https://github.com/alexberriman/react-jedi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md transition-colors"
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
        </div>
      </SheetContent>
    </Sheet>
  );
}