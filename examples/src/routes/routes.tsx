import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AsyncRoute } from "../components/async-route";
import { Layout } from "../components/layout";
import { LoadingLayout } from "../components/layouts/loading-layout";
import { TemplateLayout } from "../components/layouts/template-layout";

// Lazy load all pages
const HomePage = lazy(() =>
  import("../pages/home").then((module) => ({ default: module.HomePage }))
);
const ShowcasePage = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.ShowcasePage }))
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
const TabsShowcase = lazy(() =>
  import("../pages/showcase/tabs-demo").then((module) => ({ default: module.TabsShowcase }))
);
const AccordionDemo = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.AccordionDemo }))
);
const DialogDemo = lazy(() =>
  import("../pages/showcase").then((module) => ({ default: module.DialogDemo }))
);
const HeroPreview = lazy(() =>
  import("../pages/showcase/hero").then((module) => ({ default: module.HeroPreview }))
);
const HeroShowcase = lazy(() =>
  import("../pages/showcase/hero").then((module) => ({ default: module.HeroShowcase }))
);
const ButtonShowcase = lazy(() =>
  import("../pages/showcase/button").then((module) => ({ default: module.ButtonShowcase }))
);
const BoxShowcase = lazy(() =>
  import("../pages/showcase/box").then((module) => ({ default: module.BoxShowcase }))
);
const CallToActionShowcase = lazy(() =>
  import("../pages/showcase/call-to-action").then((module) => ({ default: module.CallToActionShowcase }))
);
const CardShowcase = lazy(() =>
  import("../pages/showcase/card").then((module) => ({ default: module.CardShowcase }))
);
const CarouselShowcase = lazy(() =>
  import("../pages/showcase/carousel").then((module) => ({ default: module.CarouselShowcase }))
);
const FeatureCardShowcase = lazy(() =>
  import("../pages/showcase/feature-card").then((module) => ({ default: module.FeatureCardShowcase }))
);
const FooterShowcase = lazy(() =>
  import("../pages/showcase/footer").then((module) => ({ default: module.FooterShowcase }))
);
const ImagePreview = lazy(() =>
  import("../pages/showcase/image").then((module) => ({ default: module.ImagePreview }))
);
const InputShowcase = lazy(() =>
  import("../pages/showcase/input").then((module) => ({ default: module.InputShowcase }))
);
const LabelShowcase = lazy(() =>
  import("../pages/showcase/label").then((module) => ({ default: module.LabelShowcase }))
);
const NavigationMenuShowcase = lazy(() =>
  import("../pages/showcase/navigation-menu").then((module) => ({ default: module.NavigationMenuShowcase }))
);
const PaginationShowcase = lazy(() =>
  import("../pages/showcase/pagination").then((module) => ({ default: module.PaginationShowcase }))
);
const PricingTableShowcase = lazy(() =>
  import("../pages/showcase/pricing-table").then((module) => ({ default: module.PricingTableShowcase }))
);
const ProgressShowcase = lazy(() =>
  import("../pages/showcase/progress").then((module) => ({ default: module.ProgressShowcase }))
);
const RadioGroupDemo = lazy(() =>
  import("../pages/showcase/radio-group-demo").then((module) => ({ default: module.RadioGroupDemo }))
);
const SelectShowcase = lazy(() =>
  import("../pages/showcase/select").then((module) => ({ default: module.SelectShowcase }))
);
const SliderShowcase = lazy(() =>
  import("../pages/showcase/slider").then((module) => ({ default: module.SliderShowcase }))
);
const SwitchShowcase = lazy(() =>
  import("../pages/showcase/switch").then((module) => ({ default: module.SwitchShowcase }))
);
const TestimonialShowcase = lazy(() =>
  import("../pages/showcase/testimonial").then((module) => ({ default: module.TestimonialShowcase }))
);
const TextShowcase = lazy(() =>
  import("../pages/showcase/text-showcase").then((module) => ({ default: module.default }))
);
const ToastShowcasePage = lazy(() =>
  import("../pages/showcase/toast").then((module) => ({ default: module.ToastShowcasePage }))
);
const TooltipShowcase = lazy(() =>
  import("../pages/showcase/tooltip").then((module) => ({ default: module.TooltipShowcase }))
);
const ContainerShowcase = lazy(() =>
  import("../pages/showcase/container").then((module) => ({ default: module.ContainerShowcase }))
);

// Documentation pages
const DocumentationPage = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.DocumentationPage }))
);
const DocumentationOverview = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.DocumentationOverview }))
);
const ComponentSystem = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.ComponentSystem }))
);
const GettingStarted = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.GettingStarted }))
);
const Theming = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.Theming }))
);
const StateManagement = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.StateManagement }))
);
const Performance = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.Performance }))
);
const UIComponents = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.UIComponents }))
);
const FormComponents = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.FormComponents }))
);
const LayoutComponents = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.LayoutComponents }))
);
const Typography = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.Typography }))
);
const ComplexExamples = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.ComplexExamples }))
);

// Example pages
const ExamplesPage = lazy(() =>
  import("../pages/examples").then((module) => ({ default: module.ExamplesPage }))
);
const ConditionalPage = lazy(() =>
  import("../pages/examples/conditional").then((module) => ({ default: module.ConditionalPage }))
);
const AdvancedConditionalPage = lazy(() =>
  import("../pages/examples/conditional").then((module) => ({ default: module.AdvancedConditionalPage }))
);
const DataDisplayPage = lazy(() =>
  import("../pages/examples/data").then((module) => ({ default: module.DataDisplayPage }))
);
const TransitionsPage = lazy(() =>
  import("../pages/examples/transitions").then((module) => ({ default: module.TransitionsPage }))
);
const ClickAnimationsPage = lazy(() =>
  import("../pages/examples/click-animations").then((module) => ({ default: module.ClickAnimationsPage }))
);
const DragAnimationsPage = lazy(() =>
  import("../pages/examples/drag-animations").then((module) => ({ default: module.DragAnimationsPage }))
);
const ScrollAnimationsPage = lazy(() =>
  import("../pages/examples/scroll-animations").then((module) => ({ default: module.ScrollAnimationsPage }))
);
const StaggerAnimationsPage = lazy(() =>
  import("../pages/examples/stagger-animations").then((module) => ({ default: module.StaggerAnimationsPage }))
);
const AnimationSequencePage = lazy(() =>
  import("../pages/examples/animation-sequence").then((module) => ({ default: module.AnimationSequencePage }))
);
const DataFetchingPage = lazy(() =>
  import("../pages/examples/data-fetching").then((module) => ({ default: module.DataFetchingPage }))
);
const OptimisticUpdatesPage = lazy(() =>
  import("../pages/examples/optimistic-updates").then((module) => ({ default: module.OptimisticUpdatesPage }))
);
const SEOMetadataPage = lazy(() =>
  import("../pages/examples/seo-metadata").then((module) => ({ default: module.SEOMetadataPage }))
);
const StructuredDataDemo = lazy(() =>
  import("../components/seo/structured-data-demo").then((module) => ({ default: module.StructuredDataDemo }))
);
const RichSnippetsPage = lazy(() =>
  import("../pages/examples/rich-snippets").then((module) => ({ default: module.RichSnippetsPage }))
);
const FocusManagementPage = lazy(() =>
  import("../pages/accessibility/focus-management-page").then((module) => ({ default: module.FocusManagementPage }))
);

// Feature pages
const ThemingPage = lazy(() =>
  import("../pages/theming").then((module) => ({ default: module.ThemingPage }))
);
const ThemePlaygroundPage = lazy(() =>
  import("../pages/theming").then((module) => ({ default: module.ThemePlaygroundPage }))
);
const BrandPresetsPage = lazy(() =>
  import("../pages/brand-presets").then((module) => ({ default: module.BrandPresetsPage }))
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
const MarketingDebugPage = lazy(() =>
  import("../pages/debug/marketing-home").then((module) => ({ default: module.MarketingDebugPage }))
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
            element: <AsyncRoute component={TabsShowcase} loadingText="Loading tabs showcase..." />,
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
            path: "center",
            element: <AsyncRoute component={HeroPreview} loadingText="Loading center showcase..." />,
          },
          {
            path: "flex",
            element: <AsyncRoute component={HeroPreview} loadingText="Loading flex demo..." />,
          },
          {
            path: "button",
            element: <AsyncRoute component={ButtonShowcase} loadingText="Loading button showcase..." />,
          },
          {
            path: "box",
            element: <AsyncRoute component={BoxShowcase} loadingText="Loading box showcase..." />,
          },
          {
            path: "call-to-action",
            element: <AsyncRoute component={CallToActionShowcase} loadingText="Loading call-to-action showcase..." />,
          },
          {
            path: "card",
            element: <AsyncRoute component={CardShowcase} loadingText="Loading card showcase..." />,
          },
          {
            path: "carousel",
            element: <AsyncRoute component={CarouselShowcase} loadingText="Loading carousel showcase..." />,
          },
          {
            path: "feature-card",
            element: <AsyncRoute component={FeatureCardShowcase} loadingText="Loading feature card showcase..." />,
          },
          {
            path: "footer",
            element: <AsyncRoute component={FooterShowcase} loadingText="Loading footer showcase..." />,
          },
          {
            path: "hero",
            element: <AsyncRoute component={HeroShowcase} loadingText="Loading hero showcase..." />,
          },
          {
            path: "image",
            element: <AsyncRoute component={ImagePreview} loadingText="Loading image showcase..." />,
          },
          {
            path: "input",
            element: <AsyncRoute component={InputShowcase} loadingText="Loading input showcase..." />,
          },
          {
            path: "label",
            element: <AsyncRoute component={LabelShowcase} loadingText="Loading label showcase..." />,
          },
          {
            path: "navigation-menu",
            element: <AsyncRoute component={NavigationMenuShowcase} loadingText="Loading navigation menu showcase..." />,
          },
          {
            path: "pagination",
            element: <AsyncRoute component={PaginationShowcase} loadingText="Loading pagination showcase..." />,
          },
          {
            path: "pricing-table",
            element: <AsyncRoute component={PricingTableShowcase} loadingText="Loading pricing table showcase..." />,
          },
          {
            path: "progress",
            element: <AsyncRoute component={ProgressShowcase} loadingText="Loading progress showcase..." />,
          },
          {
            path: "radio-group",
            element: <AsyncRoute component={RadioGroupDemo} loadingText="Loading radio group demo..." />,
          },
          {
            path: "select",
            element: <AsyncRoute component={SelectShowcase} loadingText="Loading select showcase..." />,
          },
          {
            path: "slider",
            element: <AsyncRoute component={SliderShowcase} loadingText="Loading slider showcase..." />,
          },
          {
            path: "switch",
            element: <AsyncRoute component={SwitchShowcase} loadingText="Loading switch showcase..." />,
          },
          {
            path: "testimonial",
            element: <AsyncRoute component={TestimonialShowcase} loadingText="Loading testimonial showcase..." />,
          },
          {
            path: "text",
            element: <AsyncRoute component={TextShowcase} loadingText="Loading text showcase..." />,
          },
          {
            path: "toast",
            element: <AsyncRoute component={ToastShowcasePage} loadingText="Loading toast showcase..." />,
          },
          {
            path: "tooltip",
            element: <AsyncRoute component={TooltipShowcase} loadingText="Loading tooltip showcase..." />,
          },
          {
            path: "container",
            element: <AsyncRoute component={ContainerShowcase} loadingText="Loading container showcase..." />,
          },
        ],
      },
      {
        path: "documentation",
        children: [
          {
            index: true,
            element: (
              <AsyncRoute component={DocumentationOverview} loadingText="Loading documentation..." />
            ),
          },
          {
            path: "getting-started",
            element: (
              <AsyncRoute component={GettingStarted} loadingText="Loading getting started..." />
            ),
          },
          {
            path: "component-system",
            element: (
              <AsyncRoute component={ComponentSystem} loadingText="Loading component system..." />
            ),
          },
          {
            path: "theming",
            element: <AsyncRoute component={Theming} loadingText="Loading theming..." />,
          },
          {
            path: "state-management",
            element: (
              <AsyncRoute component={StateManagement} loadingText="Loading state management..." />
            ),
          },
          {
            path: "performance",
            element: <AsyncRoute component={Performance} loadingText="Loading performance..." />,
          },
          {
            path: "ui-components",
            element: <AsyncRoute component={UIComponents} loadingText="Loading UI components..." />,
          },
          {
            path: "form-components",
            element: (
              <AsyncRoute component={FormComponents} loadingText="Loading form components..." />
            ),
          },
          {
            path: "layout-components",
            element: (
              <AsyncRoute component={LayoutComponents} loadingText="Loading layout components..." />
            ),
          },
          {
            path: "typography",
            element: <AsyncRoute component={Typography} loadingText="Loading typography..." />,
          },
          {
            path: "complex-examples",
            element: (
              <AsyncRoute component={ComplexExamples} loadingText="Loading complex examples..." />
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
          {
            path: "animation-sequence",
            element: (
              <AsyncRoute
                component={AnimationSequencePage}
                loadingText="Loading animation sequences..."
              />
            ),
          },
          {
            path: "data-fetching",
            element: (
              <AsyncRoute
                component={DataFetchingPage}
                loadingText="Loading data fetching example..."
              />
            ),
          },
          {
            path: "optimistic-updates",
            element: (
              <AsyncRoute
                component={OptimisticUpdatesPage}
                loadingText="Loading optimistic updates example..."
              />
            ),
          },
          {
            path: "seo-metadata",
            element: (
              <AsyncRoute
                component={SEOMetadataPage}
                loadingText="Loading SEO metadata example..."
              />
            ),
          },
          {
            path: "structured-data",
            element: (
              <AsyncRoute
                component={StructuredDataDemo}
                loadingText="Loading structured data demo..."
              />
            ),
          },
          {
            path: "rich-snippets",
            element: (
              <AsyncRoute
                component={RichSnippetsPage}
                loadingText="Loading rich snippets demo..."
              />
            ),
          },
          {
            path: "focus-management",
            element: (
              <AsyncRoute
                component={FocusManagementPage}
                loadingText="Loading focus management demo..."
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
            element: (
              <AsyncRoute
                component={MarketingTemplatePage}
                loadingText="Loading marketing template..."
              />
            ),
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
  {
    // Separate route tree for template pages with minimal layout
    path: "/templates/marketing",
    element: (
      <LoadingLayout>
        <TemplateLayout />
      </LoadingLayout>
    ),
    children: [
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
      {
        path: "debug",
        element: (
          <AsyncRoute
            component={MarketingDebugPage}
            loadingText="Loading debug page..."
          />
        ),
      },
    ],
  },
]);