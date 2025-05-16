import { useTheme } from "../../../lib/theme/use-theme";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useTheme();

  return (
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
          "--error-bg": "var(--destructive-bg)",
          "--error-text": "var(--destructive-text)",
          "--error-border": "var(--destructive-border)",
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
  );
};

export { Toaster };
