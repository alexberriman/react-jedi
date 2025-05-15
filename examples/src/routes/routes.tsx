import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import { ShowcasePage } from "../pages/showcase";
import { DocumentationPage } from "../pages/documentation";
import { LandingPage } from "../pages/landing";
import { BrandPresetsPage } from "../pages/brand-presets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "showcase",
        element: <ShowcasePage />,
      },
      {
        path: "documentation",
        element: <DocumentationPage />,
      },
      {
        path: "landing",
        element: <LandingPage />,
      },
      {
        path: "brand-presets",
        element: <BrandPresetsPage />,
      },
    ],
  },
]);