import * as React from "react";
import { Loading, ErrorBoundary } from "@alexberriman/react-jedi";

interface AsyncRouteProps {
  readonly component: React.LazyExoticComponent<React.ComponentType>;
  readonly loadingText?: string;
}

export function AsyncRoute({
  component: Component,
  loadingText = "Loading page...",
}: AsyncRouteProps) {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Loading fullScreen text={loadingText} />}>
        <Component />
      </React.Suspense>
    </ErrorBoundary>
  );
}
