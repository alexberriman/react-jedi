import { ReactNode, useEffect } from "react";

interface SmoothScrollProviderProps {
  readonly children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Enable smooth scrolling behavior globally
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";

    // Cleanup function to reset scroll behavior
    return () => {
      html.style.scrollBehavior = "auto";
    };
  }, []);

  return <>{children}</>;
}
