import { Link, Outlet } from "react-router-dom";

export type LayoutProps = Readonly<{
  className?: string;
}>;

export function Layout({ className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-900 to-slate-900 text-white">
      <header className="border-b border-zinc-800 backdrop-blur-lg bg-black/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-emerald-400 flex items-center font-bold text-2xl hover:text-emerald-300 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8 mr-2 fill-current"
              >
                <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6A9.996 9.996 0 0 1 12.001 22C6.477 22 2 17.523 2 12c0-5.185 3.947-9.449 9.001-9.95a7.48 7.48 0 0 0 .38-.031zM17.5 11a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm-1.61-2.93a.53.53 0 0 0 .74 0l1.06-1.06c.2-.2.2-.53 0-.73l-1.06-1.06a.52.52 0 0 0-.74 0 .52.52 0 0 0 0 .73l.33.33h-1.95c-.29 0-.53.24-.53.53v2.07c0 .29.24.53.53.53.29 0 .53-.24.53-.53v-1.54l1.09 1.09c.2.2.53.2.73 0zm-3.28 0 1.09-1.09v1.54c0 .29.24.53.53.53.29 0 .53-.24.53-.53V8.41c0-.29-.24-.53-.53-.53h-1.95l.33-.33a.52.52 0 0 0 0-.73.52.52 0 0 0-.74 0L11.02 7.88c-.2.2-.2.53 0 .73l1.06 1.06c.2.2.54.2.74 0z" />
              </svg>
              React Jedi
            </div>
          </Link>
          <nav className="flex items-center gap-6 font-medium">
            <Link to="/showcase" className="text-zinc-200 hover:text-emerald-400 transition-colors">
              Components
            </Link>
            <Link to="/examples" className="text-zinc-200 hover:text-emerald-400 transition-colors">
              Examples
            </Link>
            <Link
              to="/documentation"
              className="text-zinc-200 hover:text-emerald-400 transition-colors"
            >
              Documentation
            </Link>
            <Link
              to="/brand-presets"
              className="text-zinc-200 hover:text-emerald-400 transition-colors"
            >
              Brand Presets
            </Link>
            <Link to="/theming" className="text-zinc-200 hover:text-emerald-400 transition-colors">
              Theming
            </Link>
            <Link
              to="/performance"
              className="text-zinc-200 hover:text-emerald-400 transition-colors"
            >
              Performance
            </Link>
            <Link to="/state" className="text-zinc-200 hover:text-emerald-400 transition-colors">
              State
            </Link>
            <a
              href="https://github.com/banja-au/react-jedi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 hover:text-emerald-400 transition-colors flex items-center gap-1"
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
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <main className={className}>
        <Outlet />
      </main>
      <footer className="bg-black/30 border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-400">
          <p>© {new Date().getFullYear()} React Jedi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
