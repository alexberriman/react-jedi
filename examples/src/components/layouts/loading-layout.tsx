import * as React from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "@banja/react-jedi";

interface LoadingLayoutProps {
  readonly children?: React.ReactNode;
}

export function LoadingLayout({ children }: LoadingLayoutProps) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial loading
    const timer = globalThis.setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => globalThis.clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading fullScreen text="Loading application..." />;
  }

  return <>{children || <Outlet />}</>;
}
