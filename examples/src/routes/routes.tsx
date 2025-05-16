import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import { ShowcasePage } from "../pages/showcase";
import { DocumentationPage } from "../pages/documentation";
import { ExamplesPage } from "../pages/examples";
import { LandingExamplePage } from "../pages/examples/landing";
import { BrandPresetsPage } from "../pages/brand-presets";
import { ThemingPage, ThemePlaygroundPage } from "../pages/theming";
import { PerformancePage } from "../pages/performance";

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
        path: "examples",
        children: [
          {
            index: true,
            element: <ExamplesPage />,
          },
          {
            path: "landing",
            element: <LandingExamplePage />,
          },
        ],
      },
      {
        path: "brand-presets",
        element: <BrandPresetsPage />,
      },
      {
        path: "theming",
        children: [
          {
            index: true,
            element: <ThemingPage />,
          },
          {
            path: "playground",
            element: <ThemePlaygroundPage />,
          },
        ],
      },
      {
        path: "performance",
        element: <PerformancePage />,
      },
    ],
  },
]);
