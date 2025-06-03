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
  import("../pages/showcase/tabs-demo").then((module) => ({ default: module.TabsDemo }))
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
const AspectRatioShowcase = lazy(() =>
  import("../pages/showcase/aspect-ratio").then((module) => ({ default: module.AspectRatioShowcase }))
);
const AvatarShowcase = lazy(() =>
  import("../pages/showcase/avatar").then((module) => ({ default: module.AvatarShowcase }))
);
const BadgeShowcase = lazy(() =>
  import("../pages/showcase/badge").then((module) => ({ default: module.BadgeShowcase }))
);
const ButtonShowcase = lazy(() =>
  import("../pages/showcase/button").then((module) => ({ default: module.ButtonShowcase }))
);
const BoxShowcase = lazy(() =>
  import("../pages/showcase/box").then((module) => ({ default: module.BoxShowcase }))
);
const BlockQuoteShowcase = lazy(() =>
  import("../pages/showcase/blockquote").then((module) => ({ default: module.BlockQuoteShowcasePage }))
);
const MarkdownShowcase = lazy(() =>
  import("../pages/showcase/markdown").then((module) => ({ default: module.MarkdownShowcase }))
);
const CallToActionShowcase = lazy(() =>
  import("../pages/showcase/blocks/call-to-action").then((module) => ({ default: module.CallToActionShowcase }))
);
const TimelineShowcase = lazy(() =>
  import("../pages/showcase/blocks/timeline").then((module) => ({ default: module.TimelineShowcase }))
);
const CardShowcase = lazy(() =>
  import("../pages/showcase/card").then((module) => ({ default: module.CardShowcase }))
);
const CarouselShowcase = lazy(() =>
  import("../pages/showcase/carousel").then((module) => ({ default: module.CarouselShowcase }))
);
const CarouselBlockShowcase = lazy(() =>
  import("../pages/showcase/blocks/carousel").then((module) => ({ default: module.CarouselShowcase }))
);
const FooterShowcase = lazy(() =>
  import("../pages/showcase/footer").then((module) => ({ default: module.FooterShowcase }))
);
const FormShowcase = lazy(() =>
  import("../pages/showcase/form").then((module) => ({ default: module.FormShowcase }))
);
const ImagePreview = lazy(() =>
  import("../pages/showcase/image").then((module) => ({ default: module.ImagePreview }))
);
const InputShowcase = lazy(() =>
  import("../pages/showcase/input").then((module) => ({ default: module.InputShowcase }))
);
const InputOTPShowcase = lazy(() =>
  import("../pages/showcase/input-otp").then((module) => ({ default: module.InputOTPShowcase }))
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
const PopoverShowcase = lazy(() =>
  import("../pages/showcase/popover").then((module) => ({ default: module.PopoverShowcase }))
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
const ToggleShowcase = lazy(() =>
  import("../pages/showcase/toggle").then((module) => ({ default: module.ToggleShowcase }))
);
const ToggleGroupShowcase = lazy(() =>
  import("../pages/showcase/toggle-group").then((module) => ({ default: module.ToggleGroupShowcase }))
);
const TestimonialShowcase = lazy(() =>
  import("../pages/showcase/blocks/testimonial").then((module) => ({ default: module.TestimonialShowcasePage }))
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
const GridShowcase = lazy(() =>
  import("../pages/showcase/grid").then((module) => ({ default: module.GridShowcase }))
);
const FlexShowcase = lazy(() =>
  import("../pages/showcase/flex").then((module) => ({ default: module.FlexShowcase }))
);
const StackShowcase = lazy(() =>
  import("../pages/showcase/stack").then((module) => ({ default: module.StackShowcase }))
);
const GroupShowcase = lazy(() =>
  import("../pages/showcase/group").then((module) => ({ default: module.GroupShowcase }))
);
const HeadingShowcase = lazy(() =>
  import("../pages/showcase/heading").then((module) => ({ default: module.HeadingShowcase }))
);
const HoverCardShowcase = lazy(() =>
  import("../pages/showcase/hover-card").then((module) => ({ default: module.HoverCardShowcase }))
);
const CenterShowcase = lazy(() =>
  import("../pages/showcase/center").then((module) => ({ default: module.CenterShowcase }))
);
const SimpleGridShowcase = lazy(() =>
  import("../pages/showcase/simple-grid").then((module) => ({ default: module.SimpleGridShowcase }))
);
const MasonryShowcase = lazy(() =>
  import("../pages/showcase/masonry").then((module) => ({ default: module.MasonryShowcase }))
);
const SpacerShowcase = lazy(() =>
  import("../pages/showcase/spacer").then((module) => ({ default: module.SpacerShowcase }))
);
const SeparatorShowcase = lazy(() =>
  import("../pages/showcase/separator").then((module) => ({ default: module.SeparatorShowcase }))
);
const TextareaShowcase = lazy(() =>
  import("../pages/showcase/textarea").then((module) => ({ default: module.TextareaShowcase }))
);
const CheckboxShowcase = lazy(() =>
  import("../pages/showcase/checkbox").then((module) => ({ default: module.CheckboxShowcase }))
);
const SkeletonShowcase = lazy(() =>
  import("../pages/showcase/skeleton").then((module) => ({ default: module.SkeletonShowcase }))
);
const AlertShowcase = lazy(() =>
  import("../pages/showcase/alert").then((module) => ({ default: module.AlertShowcasePage }))
);
const AlertDialogShowcase = lazy(() =>
  import("../pages/showcase/alert-dialog").then((module) => ({ default: module.AlertDialogShowcase }))
);
const CollapsibleShowcase = lazy(() =>
  import("../pages/showcase/collapsible").then((module) => ({ default: module.CollapsibleShowcase }))
);
const TableShowcase = lazy(() =>
  import("../pages/showcase/table").then((module) => ({ default: module.TableShowcase }))
);
const DataTableShowcase = lazy(() =>
  import("../pages/showcase/data-table").then((module) => ({ default: module.DataTableShowcase }))
);
const ChartShowcase = lazy(() =>
  import("../pages/showcase/chart").then((module) => ({ default: module.ChartShowcase }))
);
const DrawerShowcase = lazy(() =>
  import("../pages/showcase/drawer").then((module) => ({ default: module.DrawerShowcase }))
);
const DropdownMenuShowcase = lazy(() =>
  import("../pages/showcase/dropdown-menu").then((module) => ({ default: module.DropdownMenuShowcase }))
);
const ContextMenuShowcase = lazy(() =>
  import("../pages/showcase/context-menu").then((module) => ({ default: module.ContextMenuShowcase }))
);
const MenubarShowcase = lazy(() =>
  import("../pages/showcase/menubar").then((module) => ({ default: module.MenubarShowcase }))
);
const BreadcrumbShowcase = lazy(() =>
  import("../pages/showcase/breadcrumb").then((module) => ({ default: module.BreadcrumbShowcase }))
);
const CommandShowcase = lazy(() =>
  import("../pages/showcase/command").then((module) => ({ default: module.CommandShowcase }))
);
const CalendarShowcase = lazy(() =>
  import("../pages/showcase/calendar").then((module) => ({ default: module.CalendarShowcase }))
);
const DatePickerShowcase = lazy(() =>
  import("../pages/showcase/date-picker").then((module) => ({ default: module.DatePickerShowcase }))
);
const ComboboxShowcase = lazy(() =>
  import("../pages/showcase/combobox").then((module) => ({ default: module.ComboboxShowcase }))
);
const BlocksShowcasePage = lazy(() =>
  import("../pages/showcase/blocks").then((module) => ({ default: module.BlocksShowcasePage }))
);
const HeaderShowcase = lazy(() =>
  import("../pages/showcase/header").then((module) => ({ default: module.HeaderShowcase }))
);
const PageHeroHeaderShowcase = lazy(() =>
  import("../pages/showcase/page-hero-header").then((module) => ({ default: module.PageHeroHeaderShowcase }))
);
const FooterBlockShowcase = lazy(() =>
  import("../pages/showcase/blocks/footer").then((module) => ({ default: module.FooterBlockShowcase }))
);
const FeatureCardBlockShowcase = lazy(() =>
  import("../pages/showcase/blocks/feature-card").then((module) => ({ default: module.FeatureCardShowcasePage }))
);
const PricingTableShowcase = lazy(() =>
  import("../pages/showcase/blocks/pricing-table").then((module) => ({ default: module.PricingTableShowcase }))
);
const TeamGridShowcase = lazy(() =>
  import("../pages/showcase/blocks/team-grid").then((module) => ({ default: module.TeamGridShowcase }))
);
const BlogPostGridShowcase = lazy(() =>
  import("../pages/showcase/blocks/blog-post-grid").then((module) => ({ default: module.BlogPostGridShowcase }))
);
const BlogPostDetailShowcase = lazy(() =>
  import("../pages/showcase/blocks/blog-post-detail").then((module) => ({ default: module.BlogPostDetailShowcase }))
);
const BrandLogoBarShowcase = lazy(() =>
  import("../pages/showcase/blocks/brand-logo-bar").then((module) => ({ default: module.BrandLogoBarShowcase }))
);
const ServiceListShowcase = lazy(() =>
  import("../pages/showcase/blocks/service-list").then((module) => ({ default: module.ServiceListShowcase }))
);
const PageSectionShowcase = lazy(() =>
  import("../pages/showcase/blocks/page-section").then((module) => ({ default: module.default }))
);
const ContactFormShowcase = lazy(() =>
  import("../pages/showcase/blocks/contact-form").then((module) => ({ default: module.ContactFormShowcasePage }))
);
const LatestNewsShowcase = lazy(() =>
  import("../pages/showcase/blocks/latest-news").then((module) => ({ default: module.LatestNewsShowcase }))
);

// Documentation pages
const DocumentationPage = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.DocumentationPage }))
);
const DocumentationLayout = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.DocumentationLayout }))
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
const Templating = lazy(() =>
  import("../pages/documentation").then((module) => ({ default: module.Templating }))
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
  import("../pages/examples/stagger-animations").then((module) => ({ default: module.default }))
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
const TemplateVariablesPage = lazy(() =>
  import("../pages/examples/template-variables").then((module) => ({ default: module.TemplateVariablesPage }))
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
const CssDiagnosticsPage = lazy(() =>
  import("../pages/debug/css-diagnostics").then((module) => ({ default: module.CssDiagnosticsPage }))
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
            path: "blocks",
            children: [
              {
                index: true,
                element: <AsyncRoute component={BlocksShowcasePage} loadingText="Loading blocks showcase..." />,
              },
              {
                path: "footer",
                element: <AsyncRoute component={FooterBlockShowcase} loadingText="Loading footer block..." />,
              },
              {
                path: "feature-card",
                element: <AsyncRoute component={FeatureCardBlockShowcase} loadingText="Loading feature card block..." />,
              },
              {
                path: "pricing-table",
                element: <AsyncRoute component={PricingTableShowcase} loadingText="Loading pricing table block..." />,
              },
              {
                path: "call-to-action",
                element: <AsyncRoute component={CallToActionShowcase} loadingText="Loading call-to-action block..." />,
              },
              {
                path: "timeline",
                element: <AsyncRoute component={TimelineShowcase} loadingText="Loading timeline block..." />,
              },
              {
                path: "testimonial",
                element: <AsyncRoute component={TestimonialShowcase} loadingText="Loading testimonial block..." />,
              },
              {
                path: "carousel",
                element: <AsyncRoute component={CarouselBlockShowcase} loadingText="Loading carousel block..." />,
              },
              {
                path: "team-grid",
                element: <AsyncRoute component={TeamGridShowcase} loadingText="Loading team grid block..." />,
              },
              {
                path: "blog-post-grid",
                element: <AsyncRoute component={BlogPostGridShowcase} loadingText="Loading blog post grid block..." />,
              },
              {
                path: "blog-post-detail",
                element: <AsyncRoute component={BlogPostDetailShowcase} loadingText="Loading blog post detail block..." />,
              },
              {
                path: "brand-logo-bar",
                element: <AsyncRoute component={BrandLogoBarShowcase} loadingText="Loading brand logo bar block..." />,
              },
              {
                path: "service-list",
                element: <AsyncRoute component={ServiceListShowcase} loadingText="Loading service list block..." />,
              },
              {
                path: "page-section",
                element: <AsyncRoute component={PageSectionShowcase} loadingText="Loading page section block..." />,
              },
              {
                path: "contact-form",
                element: <AsyncRoute component={ContactFormShowcase} loadingText="Loading contact form block..." />,
              },
              {
                path: "latest-news",
                element: <AsyncRoute component={LatestNewsShowcase} loadingText="Loading latest news block..." />,
              },
            ],
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
            element: <AsyncRoute component={CenterShowcase} loadingText="Loading center showcase..." />,
          },
          {
            path: "flex",
            element: <AsyncRoute component={FlexShowcase} loadingText="Loading flex demo..." />,
          },
          {
            path: "stack",
            element: <AsyncRoute component={StackShowcase} loadingText="Loading stack showcase..." />,
          },
          {
            path: "aspect-ratio",
            element: <AsyncRoute component={AspectRatioShowcase} loadingText="Loading aspect ratio showcase..." />,
          },
          {
            path: "avatar",
            element: <AsyncRoute component={AvatarShowcase} loadingText="Loading avatar showcase..." />,
          },
          {
            path: "badge",
            element: <AsyncRoute component={BadgeShowcase} loadingText="Loading badge showcase..." />,
          },
          {
            path: "blockquote",
            element: <AsyncRoute component={BlockQuoteShowcase} loadingText="Loading blockquote showcase..." />,
          },
          {
            path: "markdown",
            element: <AsyncRoute component={MarkdownShowcase} loadingText="Loading markdown showcase..." />,
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
            path: "breadcrumb",
            element: <AsyncRoute component={BreadcrumbShowcase} loadingText="Loading breadcrumb showcase..." />,
          },
          {
            path: "command",
            element: <AsyncRoute component={CommandShowcase} loadingText="Loading command showcase..." />,
          },
          {
            path: "calendar",
            element: <AsyncRoute component={CalendarShowcase} loadingText="Loading calendar showcase..." />,
          },
          {
            path: "date-picker",
            element: <AsyncRoute component={DatePickerShowcase} loadingText="Loading date picker showcase..." />,
          },
          {
            path: "combobox",
            element: <AsyncRoute component={ComboboxShowcase} loadingText="Loading combobox showcase..." />,
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
            path: "checkbox",
            element: <AsyncRoute component={CheckboxShowcase} loadingText="Loading checkbox showcase..." />,
          },
          {
            path: "collapsible",
            element: <AsyncRoute component={CollapsibleShowcase} loadingText="Loading collapsible showcase..." />,
          },
          {
            path: "footer",
            element: <AsyncRoute component={FooterShowcase} loadingText="Loading footer showcase..." />,
          },
          {
            path: "form",
            element: <AsyncRoute component={FormShowcase} loadingText="Loading form showcase..." />,
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
            path: "input-otp",
            element: <AsyncRoute component={InputOTPShowcase} loadingText="Loading input OTP showcase..." />,
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
            path: "popover",
            element: <AsyncRoute component={PopoverShowcase} loadingText="Loading popover showcase..." />,
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
            path: "spacer",
            element: <AsyncRoute component={SpacerShowcase} loadingText="Loading spacer showcase..." />,
          },
          {
            path: "separator",
            element: <AsyncRoute component={SeparatorShowcase} loadingText="Loading separator showcase..." />,
          },
          {
            path: "switch",
            element: <AsyncRoute component={SwitchShowcase} loadingText="Loading switch showcase..." />,
          },
          {
            path: "table",
            element: <AsyncRoute component={TableShowcase} loadingText="Loading table showcase..." />,
          },
          {
            path: "data-table",
            element: <AsyncRoute component={DataTableShowcase} loadingText="Loading data table showcase..." />,
          },
          {
            path: "chart",
            element: <AsyncRoute component={ChartShowcase} loadingText="Loading chart showcase..." />,
          },
          {
            path: "toggle",
            element: <AsyncRoute component={ToggleShowcase} loadingText="Loading toggle showcase..." />,
          },
          {
            path: "toggle-group",
            element: <AsyncRoute component={ToggleGroupShowcase} loadingText="Loading toggle group showcase..." />,
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
            path: "textarea",
            element: <AsyncRoute component={TextareaShowcase} loadingText="Loading textarea showcase..." />,
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
            path: "skeleton",
            element: <AsyncRoute component={SkeletonShowcase} loadingText="Loading skeleton showcase..." />,
          },
          {
            path: "container",
            element: <AsyncRoute component={ContainerShowcase} loadingText="Loading container showcase..." />,
          },
          {
            path: "grid",
            element: <AsyncRoute component={GridShowcase} loadingText="Loading grid showcase..." />,
          },
          {
            path: "group",
            element: <AsyncRoute component={GroupShowcase} loadingText="Loading group showcase..." />,
          },
          {
            path: "heading",
            element: <AsyncRoute component={HeadingShowcase} loadingText="Loading heading showcase..." />,
          },
          {
            path: "header",
            element: <AsyncRoute component={HeaderShowcase} loadingText="Loading header showcase..." />,
          },
          {
            path: "page-hero-header",
            element: <AsyncRoute component={PageHeroHeaderShowcase} loadingText="Loading page hero header showcase..." />,
          },
          {
            path: "hover-card",
            element: <AsyncRoute component={HoverCardShowcase} loadingText="Loading hover card showcase..." />,
          },
          {
            path: "simple-grid",
            element: <AsyncRoute component={SimpleGridShowcase} loadingText="Loading simple grid showcase..." />,
          },
          {
            path: "masonry",
            element: <AsyncRoute component={MasonryShowcase} loadingText="Loading masonry showcase..." />,
          },
          {
            path: "alert",
            element: <AsyncRoute component={AlertShowcase} loadingText="Loading alert showcase..." />,
          },
          {
            path: "alert-dialog",
            element: <AsyncRoute component={AlertDialogShowcase} loadingText="Loading alert dialog showcase..." />,
          },
          {
            path: "drawer",
            element: <AsyncRoute component={DrawerShowcase} loadingText="Loading drawer showcase..." />,
          },
          {
            path: "dropdown-menu",
            element: <AsyncRoute component={DropdownMenuShowcase} loadingText="Loading dropdown menu showcase..." />,
          },
          {
            path: "context-menu",
            element: <AsyncRoute component={ContextMenuShowcase} loadingText="Loading context menu showcase..." />,
          },
          {
            path: "menubar",
            element: <AsyncRoute component={MenubarShowcase} loadingText="Loading menubar showcase..." />,
          },
        ],
      },
      {
        path: "documentation",
        element: <AsyncRoute component={DocumentationLayout} loadingText="Loading documentation..." />,
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
            path: "templating",
            element: (
              <AsyncRoute component={Templating} loadingText="Loading template variables..." />
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
          {
            path: "template-variables",
            element: (
              <AsyncRoute
                component={TemplateVariablesPage}
                loadingText="Loading template variables demo..."
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
        path: "debug/css",
        element: <AsyncRoute component={CssDiagnosticsPage} loadingText="Loading CSS diagnostics..." />,
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