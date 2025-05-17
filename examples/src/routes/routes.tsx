import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AsyncRoute } from "../components/async-route";
import { Layout } from "../components/layout";
import { LoadingLayout } from "../components/layouts/loading-layout";

// Lazy load all pages
const HomePage = lazy(() =>
  import("../pages/home").then((module) => ({ default: module.HomePage }))
);
const ShowcasePage = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.ShowcasePage }))
);
const InteractiveShowcasePage = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.InteractiveShowcasePage }))
);
const AdvancedLayoutShowcase = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.AdvancedLayoutShowcase }))
);
const ScrollAreaDemo = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.ScrollAreaDemo }))
);
const ResizableDemo = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.ResizableDemo }))
);
const SheetDemo = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.SheetDemo }))
);
const TabsDemo = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.TabsDemo }))
);
const AccordionDemo = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.AccordionDemo }))
);
const DialogDemo = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.DialogDemo }))
);
const OverlayInteractivePage = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.OverlayInteractivePage }))
);
const HeroPreview = lazy(() =>
  import("../pages/showcase/hero").then((module) => ({ default: module.HeroPreview }))
);

// Documentation pages
const DocumentationLayout = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.DocumentationLayout }))
);
const DocumentationOverview = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.DocumentationOverview }))
);
const GettingStartedPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({
    default: module.GettingStartedPage,
  }))
);
const ComponentSystemPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({
    default: module.ComponentSystemPage,
  }))
);
const LayoutComponentsPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({
    default: module.LayoutComponentsPage,
  }))
);
const TypographyPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({ default: module.TypographyPage }))
);
const UIComponentsPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({ default: module.UIComponentsPage }))
);
const FormComponentsPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({
    default: module.FormComponentsPage,
  }))
);
const DocThemingPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({ default: module.ThemingPage }))
);
const StateManagementPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({
    default: module.StateManagementPage,
  }))
);
const ComplexExamplesPage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({
    default: module.ComplexExamplesPage,
  }))
);
const DocPerformancePage = lazy(() =>
  import("../pages/documentation/sections").then((module) => ({ default: module.PerformancePage }))
);

// Example pages
const ExamplesPage = lazy(() =>
  import("../pages/examples").then((module) => ({ default: module.ExamplesPage }))
);
const LandingExamplePage = lazy(() =>
  import("../pages/examples/landing").then((module) => ({ default: module.LandingExamplePage }))
);
const ConditionalPage = lazy(() =>
  import("../pages/examples/conditional").then((module) => ({ default: module.ConditionalPage }))
);
const AdvancedConditionalPage = lazy(() =>
  import("../pages/examples/conditional").then((module) => ({
    default: module.AdvancedConditionalPage,
  }))
);
const FormValidationPage = lazy(() =>
  import("../pages/examples/form-validation").then((module) => ({
    default: module.FormValidationPage,
  }))
);
const NavigationPage = lazy(() =>
  import("../pages/examples/navigation").then((module) => ({ default: module.NavigationPage }))
);
const DataDisplayPage = lazy(() =>
  import("../pages/examples/data").then((module) => ({ default: module.DataDisplayPage }))
);
const TransitionsPage = lazy(() =>
  import("../pages/examples/transitions").then((module) => ({ default: module.TransitionsPage }))
);
const ClickAnimationsPage = lazy(() =>
  import("../pages/examples/click-animations").then((module) => ({
    default: module.ClickAnimationsPage,
  }))
);
const DragAnimationsPage = lazy(() =>
  import("../pages/examples/drag-animations").then((module) => ({
    default: module.DragAnimationsPage,
  }))
);
const ScrollAnimationsPage = lazy(() =>
  import("../pages/examples/scroll-animations").then((module) => ({
    default: module.ScrollAnimationsPage,
  }))
);
const StaggerAnimationsPage = lazy(() =>
  import("../pages/examples/stagger-animations").then((module) => ({
    default: module.default,
  }))
);

// Other pages
const BrandPresetsPage = lazy(() =>
  import("../pages/brand-presets").then((module) => ({ default: module.BrandPresetsPage }))
);
const ThemingPage = lazy(() =>
  import("../pages/theming").then((module) => ({ default: module.ThemingPage }))
);
const ThemePlaygroundPage = lazy(() =>
  import("../pages/theming").then((module) => ({ default: module.ThemePlaygroundPage }))
);
const PerformancePage = lazy(() =>
  import("../pages/performance").then((module) => ({ default: module.PerformancePage }))
);
const StatePage = lazy(() =>
  import("../pages/state").then((module) => ({ default: module.StatePage }))
);

// Template pages
const MarketingTemplatePage = lazy(() =>
  import("../pages/templates").then((module) => ({ default: module.MarketingTemplatePage }))
);
const MarketingHomePage = lazy(() =>
  import("../pages/templates").then((module) => ({ default: module.MarketingHomePage }))
);
const MarketingAboutPage = lazy(() =>
  import("../pages/templates").then((module) => ({ default: module.MarketingAboutPage }))
);
const MarketingServicesPage = lazy(() =>
  import("../pages/templates").then((module) => ({ default: module.MarketingServicesPage }))
);
const MarketingCasesPage = lazy(() =>
  import("../pages/templates").then((module) => ({ default: module.MarketingCasesPage }))
);
const MarketingPricingPage = lazy(() =>
  import("../pages/templates").then((module) => ({ default: module.MarketingPricingPage }))
);
const MarketingContactPage = lazy(() =>
  import("../pages/templates").then((module) => ({ default: module.MarketingContactPage }))
);

// Error pages
const NotFoundPage = lazy(() =>
  import("../pages/error").then((module) => ({ default: module.default }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoadingLayout>
        <Layout />
      </LoadingLayout>
    ),
    children: [
      {
        index: true,
        element: <AsyncRoute component={HomePage} loadingText="Loading home..." />,
      },
      {
        path: "showcase",
        children: [
          {
            index: true,
            element: <AsyncRoute component={ShowcasePage} loadingText="Loading showcase..." />,
          },
          {
            path: "interactive",
            element: (
              <AsyncRoute
                component={InteractiveShowcasePage}
                loadingText="Loading interactive showcase..."
              />
            ),
          },
          {
            path: "layout",
            element: (
              <AsyncRoute
                component={AdvancedLayoutShowcase}
                loadingText="Loading layout showcase..."
              />
            ),
          },
          {
            path: "scroll-area",
            element: (
              <AsyncRoute component={ScrollAreaDemo} loadingText="Loading scroll area demo..." />
            ),
          },
          {
            path: "resizable",
            element: (
              <AsyncRoute component={ResizableDemo} loadingText="Loading resizable demo..." />
            ),
          },
          {
            path: "sheet",
            element: <AsyncRoute component={SheetDemo} loadingText="Loading sheet demo..." />,
          },
          {
            path: "tabs",
            element: <AsyncRoute component={TabsDemo} loadingText="Loading tabs demo..." />,
          },
          {
            path: "accordion",
            element: (
              <AsyncRoute component={AccordionDemo} loadingText="Loading accordion demo..." />
            ),
          },
          {
            path: "dialog",
            element: <AsyncRoute component={DialogDemo} loadingText="Loading dialog demo..." />,
          },
          {
            path: "hero",
            element: <AsyncRoute component={HeroPreview} loadingText="Loading hero preview..." />,
          },
          {
            path: "overlay-interactive",
            element: (
              <AsyncRoute
                component={OverlayInteractivePage}
                loadingText="Loading overlay demo..."
              />
            ),
          },
        ],
      },
      {
        path: "documentation",
        element: (
          <AsyncRoute component={DocumentationLayout} loadingText="Loading documentation..." />
        ),
        children: [
          {
            index: true,
            element: (
              <AsyncRoute component={DocumentationOverview} loadingText="Loading overview..." />
            ),
          },
          {
            path: "getting-started",
            element: (
              <AsyncRoute component={GettingStartedPage} loadingText="Loading getting started..." />
            ),
          },
          {
            path: "component-system",
            element: (
              <AsyncRoute
                component={ComponentSystemPage}
                loadingText="Loading component system..."
              />
            ),
          },
          {
            path: "layout-components",
            element: (
              <AsyncRoute
                component={LayoutComponentsPage}
                loadingText="Loading layout components..."
              />
            ),
          },
          {
            path: "typography",
            element: <AsyncRoute component={TypographyPage} loadingText="Loading typography..." />,
          },
          {
            path: "ui-components",
            element: (
              <AsyncRoute component={UIComponentsPage} loadingText="Loading UI components..." />
            ),
          },
          {
            path: "form-components",
            element: (
              <AsyncRoute component={FormComponentsPage} loadingText="Loading form components..." />
            ),
          },
          {
            path: "theming",
            element: (
              <AsyncRoute component={DocThemingPage} loadingText="Loading theming docs..." />
            ),
          },
          {
            path: "state-management",
            element: (
              <AsyncRoute
                component={StateManagementPage}
                loadingText="Loading state management..."
              />
            ),
          },
          {
            path: "complex-examples",
            element: (
              <AsyncRoute
                component={ComplexExamplesPage}
                loadingText="Loading complex examples..."
              />
            ),
          },
          {
            path: "performance",
            element: (
              <AsyncRoute
                component={DocPerformancePage}
                loadingText="Loading performance docs..."
              />
            ),
          },
        ],
      },
      {
        path: "examples",
        children: [
          {
            index: true,
            element: <AsyncRoute component={ExamplesPage} loadingText="Loading examples..." />,
          },
          {
            path: "landing",
            element: (
              <AsyncRoute component={LandingExamplePage} loadingText="Loading landing example..." />
            ),
          },
          {
            path: "conditional",
            element: (
              <AsyncRoute
                component={ConditionalPage}
                loadingText="Loading conditional example..."
              />
            ),
          },
          {
            path: "conditional-advanced",
            element: (
              <AsyncRoute
                component={AdvancedConditionalPage}
                loadingText="Loading advanced conditional..."
              />
            ),
          },
          {
            path: "form-validation",
            element: (
              <AsyncRoute component={FormValidationPage} loadingText="Loading form validation..." />
            ),
          },
          {
            path: "navigation",
            element: (
              <AsyncRoute component={NavigationPage} loadingText="Loading navigation example..." />
            ),
          },
          {
            path: "data-display",
            element: (
              <AsyncRoute component={DataDisplayPage} loadingText="Loading data display..." />
            ),
          },
          {
            path: "transitions",
            element: (
              <AsyncRoute component={TransitionsPage} loadingText="Loading transitions..." />
            ),
          },
          {
            path: "click-animations",
            element: (
              <AsyncRoute
                component={ClickAnimationsPage}
                loadingText="Loading click animations..."
              />
            ),
          },
          {
            path: "drag-animations",
            element: (
              <AsyncRoute component={DragAnimationsPage} loadingText="Loading drag animations..." />
            ),
          },
          {
            path: "scroll-animations",
            element: (
              <AsyncRoute
                component={ScrollAnimationsPage}
                loadingText="Loading scroll animations..."
              />
            ),
          },
          {
            path: "stagger-animations",
            element: (
              <AsyncRoute
                component={StaggerAnimationsPage}
                loadingText="Loading stagger animations..."
              />
            ),
          },
        ],
      },
      {
        path: "templates",
        children: [
          {
            path: "marketing",
            children: [
              {
                index: true,
                element: (
                  <AsyncRoute
                    component={MarketingTemplatePage}
                    loadingText="Loading marketing template..."
                  />
                ),
              },
              {
                path: "home",
                element: (
                  <AsyncRoute
                    component={MarketingHomePage}
                    loadingText="Loading marketing home..."
                  />
                ),
              },
              {
                path: "about",
                element: (
                  <AsyncRoute component={MarketingAboutPage} loadingText="Loading about page..." />
                ),
              },
              {
                path: "services",
                element: (
                  <AsyncRoute
                    component={MarketingServicesPage}
                    loadingText="Loading services page..."
                  />
                ),
              },
              {
                path: "cases",
                element: (
                  <AsyncRoute
                    component={MarketingCasesPage}
                    loadingText="Loading case studies..."
                  />
                ),
              },
              {
                path: "pricing",
                element: (
                  <AsyncRoute
                    component={MarketingPricingPage}
                    loadingText="Loading pricing page..."
                  />
                ),
              },
              {
                path: "contact",
                element: (
                  <AsyncRoute
                    component={MarketingContactPage}
                    loadingText="Loading contact page..."
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        path: "brand-presets",
        element: <AsyncRoute component={BrandPresetsPage} loadingText="Loading brand presets..." />,
      },
      {
        path: "theming",
        children: [
          {
            index: true,
            element: <AsyncRoute component={ThemingPage} loadingText="Loading theming..." />,
          },
          {
            path: "playground",
            element: (
              <AsyncRoute
                component={ThemePlaygroundPage}
                loadingText="Loading theme playground..."
              />
            ),
          },
        ],
      },
      {
        path: "performance",
        element: <AsyncRoute component={PerformancePage} loadingText="Loading performance..." />,
      },
      {
        path: "state",
        element: <AsyncRoute component={StatePage} loadingText="Loading state management..." />,
      },
      {
        path: "*",
        element: <AsyncRoute component={NotFoundPage} loadingText="Loading..." />,
      },
    ],
  },
]);
