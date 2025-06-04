import { useTheme } from "../../../lib/theme/use-theme";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useEffect, useRef } from "react";

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add role="status" to the toast container for better accessibility
    // Sonner uses aria-live="polite" which is functionally equivalent,
    // but some accessibility tools expect role="status" for toast notifications
    if (!containerRef.current) return;

    // Function to add role="status" to aria-live regions
    const addRoleStatus = () => {
      const liveRegions = containerRef.current?.querySelectorAll('[aria-live="polite"]:not([role])');
      if (liveRegions) for (const element of liveRegions) {
        element.setAttribute('role', 'status');
      }
    };

    // Apply immediately
    addRoleStatus();

    // Watch for dynamically added toasts
    const observer = new MutationObserver(() => {
      addRoleStatus();
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-live']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Sonner
        theme={(theme?.colorMode || "light") as ToasterProps["theme"]}
        className="toaster group"
        style={
          {
            "--normal-bg": "var(--background)",
            "--normal-text": "var(--foreground)",
            "--normal-border": "var(--border)",
            "--success-bg": "var(--success-bg)",
            "--success-text": "var(--success-text)",
            "--success-border": "var(--success-border)",
            "--error-bg": "var(--error-bg)",
            "--error-text": "var(--error-text)",
            "--error-border": "var(--error-border)",
            "--warning-bg": "var(--warning-bg)",
            "--warning-text": "var(--warning-text)",
            "--warning-border": "var(--warning-border)",
            "--info-bg": "var(--info-bg)",
            "--info-text": "var(--info-text)",
            "--info-border": "var(--info-border)",
            position: "bottom-right",
            ...props.style,
          } as React.CSSProperties
        }
        {...props}
      />
    </div>
  );
};

export { Toaster };
