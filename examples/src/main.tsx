import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ErrorBoundary } from "@banja/react-jedi";
import { SmoothScrollProvider } from "./components/layout/smooth-scroll";
import "./styles/index.css";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SmoothScrollProvider>
        <RouterProvider router={router} />
      </SmoothScrollProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
