import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { ErrorBoundary } from "@alexberriman/react-jedi";
import { SmoothScrollProvider } from "./components/layout/smooth-scroll";
import "./styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <SmoothScrollProvider>
          <RouterProvider router={router} />
        </SmoothScrollProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
