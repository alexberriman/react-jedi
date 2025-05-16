import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import { ShowcasePage, InteractiveShowcasePage } from "../pages/showcase";
import { DocumentationPage } from "../pages/documentation";
import { ExamplesPage } from "../pages/examples";
import { LandingExamplePage } from "../pages/examples/landing";
import { ConditionalPage, AdvancedConditionalPage } from "../pages/examples/conditional";
import { FormValidationPage } from "../pages/examples/form-validation";
import { BrandPresetsPage } from "../pages/brand-presets";
import { ThemingPage, ThemePlaygroundPage } from "../pages/theming";
import { PerformancePage } from "../pages/performance";
import { StatePage } from "../pages/state";

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
        children: [
          {
            index: true,
            element: <ShowcasePage />,
          },
          {
            path: "interactive",
            element: <InteractiveShowcasePage />,
          },
        ],
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
          {
            path: "conditional",
            element: <ConditionalPage />,
          },
          {
            path: "conditional-advanced",
            element: <AdvancedConditionalPage />,
          },
          {
            path: "form-validation",
            element: <FormValidationPage />,
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
      {
        path: "state",
        element: <StatePage />,
      },
    ],
  },
]);
