import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

export function DarkModeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    // Get initial theme from localStorage or default to system
    const stored = localStorage.getItem("theme");
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setTheme(stored as "light" | "dark" | "system");
    }
  }, []);

  useEffect(() => {
    // Determine resolved theme
    let activeTheme: ResolvedTheme;

    if (theme === "system") {
      const isDark = globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
      activeTheme = isDark ? "dark" : "light";
    } else {
      activeTheme = theme as ResolvedTheme;
    }

    setResolvedTheme(activeTheme);

    // Apply theme to document
    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setResolvedTheme(mediaQuery.matches ? "dark" : "light");
      if (mediaQuery.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const handleThemeChange = () => {
    const nextTheme: { [key: string]: Theme } = {
      light: "dark",
      dark: "system",
      system: "light",
    };
    setTheme(nextTheme[theme]);
  };

  return (
    <div className="relative">
      <button
        onClick={handleThemeChange}
        className={cn(
          "group relative flex h-9 w-9 items-center justify-center rounded-lg",
          "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
          "dark:focus:ring-offset-zinc-900",
          "cursor-pointer"
        )}
        title={`Current theme: ${theme}`}
      >
        <div className="relative h-5 w-5">
          {/* Sun icon - visible in light mode */}
          <Sun
            className={cn(
              "absolute inset-0 h-5 w-5 transition-all duration-500",
              "text-yellow-500",
              resolvedTheme === "light"
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 rotate-90 opacity-0"
            )}
          />

          {/* Moon icon - visible in dark mode */}
          <Moon
            className={cn(
              "absolute inset-0 h-5 w-5 transition-all duration-500",
              "text-blue-500 dark:text-blue-400",
              resolvedTheme === "dark"
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-90 opacity-0"
            )}
          />

          {/* Monitor icon - visible in system mode */}
          {theme === "system" && (
            <Monitor
              className={cn(
                "absolute inset-0 h-5 w-5 animate-pulse",
                "text-emerald-500 dark:text-emerald-400"
              )}
            />
          )}
        </div>

        {/* Background animation */}
        <div
          className={cn(
            "absolute inset-0 -z-10 rounded-lg transition-all duration-300",
            "bg-gradient-to-r opacity-0 group-hover:opacity-100",
            resolvedTheme === "light"
              ? "from-yellow-400/20 to-orange-400/20"
              : "from-blue-400/20 to-purple-400/20"
          )}
        />
      </button>

      {/* Theme indicator dots */}
      <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-1">
        <div
          className={cn(
            "h-1 w-1 rounded-full transition-all duration-300",
            theme === "light" ? "bg-yellow-500 w-3" : "bg-zinc-400 dark:bg-zinc-600"
          )}
        />
        <div
          className={cn(
            "h-1 w-1 rounded-full transition-all duration-300",
            theme === "dark" ? "bg-blue-500 w-3" : "bg-zinc-400 dark:bg-zinc-600"
          )}
        />
        <div
          className={cn(
            "h-1 w-1 rounded-full transition-all duration-300",
            theme === "system" ? "bg-emerald-500 w-3" : "bg-zinc-400 dark:bg-zinc-600"
          )}
        />
      </div>
    </div>
  );
}
