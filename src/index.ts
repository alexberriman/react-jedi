/**
 * React Jedi - Main Entry Point
 *
 * This file exports everything from the library.
 */

// Import styles - order matters!
import "./styles/global.css";

import type {
  ComponentResolver,
  RenderOptions,
  UISpecification,
  ComponentSpec,
} from "./types/schema/components";
import { render } from "./lib/render";
import { defaultComponentResolver } from "./lib/component-resolver";
import { buildComponentTree } from "./lib/component-tree";

// Version information
export const VERSION = "1.0.0";

/**
 * React Jedi initialization options
 */
export interface JediOptions {
  /**
   * Custom component resolver
   */
  resolver?: ComponentResolver;

  /**
   * Default theme configuration
   */
  theme?: Record<string, unknown>;

  /**
   * Whether to enable development mode with additional debugging
   * @default false
   */
  development?: boolean;

  /**
   * Custom event handlers
   */
  handlers?: Record<string, (...args: unknown[]) => void>;
}

/**
 * React Jedi instance
 */
export interface Jedi {
  /**
   * Library version
   */
  version: string;

  /**
   * Render a UI specification or component specification
   */
  render: (
    spec: UISpecification | ComponentSpec,
    options?: RenderOptions
  ) => React.ReactElement | null;

  /**
   * Build a component tree from a specification
   */
  buildTree: (spec: UISpecification | ComponentSpec) => ReturnType<typeof buildComponentTree>;

  /**
   * Default options for this instance
   */
  options: Required<JediOptions>;
}

/**
 * Create a React Jedi instance
 *
 * @param options Initialization options
 * @returns Jedi instance
 */
export function createJedi(options: JediOptions = {}): Jedi {
  const defaultOptions: Required<JediOptions> = {
    resolver: defaultComponentResolver,
    theme: {},
    development: false,
    handlers: {},
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return {
    version: VERSION,

    render: (spec, renderOptions = {}) => {
      // Merge instance options with render-specific options
      const mergedRenderOptions = {
        resolver: mergedOptions.resolver,
        theme: mergedOptions.theme,
        development: mergedOptions.development,
        handlers: mergedOptions.handlers,
        ...renderOptions,
      };

      return render(spec, mergedRenderOptions);
    },

    buildTree: (spec) => buildComponentTree(spec),

    options: mergedOptions,
  };
}

// Export all components through the barrel file
export * from "./components/index";

// Export everything from lib barrel file
export * from "./lib/index";

// Export schemas guards separately to avoid conflicts

// Export types with explicit re-exports to avoid conflicts
export type {
  BaseComponentSpec,
  AspectRatioSpec,
  BadgeSpec,
  ButtonSpec,
  SeparatorSpec,
  CardSpec,
  CardHeaderSpec,
  CardTitleSpec,
  CardDescriptionSpec,
  CardContentSpec,
  CardFooterSpec,
  CardActionSpec,
  AvatarSpec,
  AvatarImageSpec,
  AvatarFallbackSpec,
  FormSpec,
  FormFieldSpec,
  FormItemSpec,
  FormLabelSpec,
  FormControlSpec,
  FormDescriptionSpec,
  FormMessageSpec,
  FormValidationSpec,
  CheckboxSpecification,
  RadioGroupSpec,
  RadioGroupItemSpec,
  SelectSpec,
  SelectTriggerSpec,
  SelectValueSpec,
  SelectContentSpec,
  SelectItemSpec,
  SelectGroupSpec,
  SelectLabelSpec,
  SelectSeparatorSpec,
  SwitchSpec,
  SliderSpec,
  CollapsibleSpec,
  CollapsibleTriggerSpec,
  CollapsibleContentSpec,
  ToggleSpec,
  ToggleGroupSpec,
  ToggleGroupItemSpec,
  ProgressSpec,
  StackSpec,
  GroupSpec,
  CenterSpec,
  SpacerSpec,
  SimpleGridSpec,
  MasonrySpec,
  ScrollAreaSpecification,
  ResizablePanelGroupSpecification,
  ResizablePanelSpecification,
  ResizableHandleSpecification,
  SheetSpecification,
  SheetTriggerSpecification,
  SheetContentSpecification,
  SheetHeaderSpecification,
  SheetFooterSpecification,
  SheetTitleSpecification,
  SheetDescriptionSpecification,
  SheetCloseSpecification,
  TabsSpecification,
  TabsListSpecification,
  TabsTriggerSpecification,
  TabsContentSpecification,
  AccordionType,
  DialogType,
  DialogTriggerType,
  DialogContentType,
  DialogHeaderType,
  DialogFooterType,
  DialogTitleType,
  DialogDescriptionType,
  DialogCloseType,
  DrawerType,
  DrawerTriggerType,
  DrawerPortalType,
  DrawerContentType,
  DrawerOverlayType,
  DrawerHeaderType,
  DrawerFooterType,
  DrawerTitleType,
  DrawerDescriptionType,
  DrawerCloseType,
  DrawerSectionType,
  DrawerHandleType,
  DropdownMenuProps,
  DropdownMenuContentItem,
  DropdownMenuItemSpecification,
  DropdownMenuLabelSpecification,
  DropdownMenuSeparatorSpecification,
  DropdownMenuCheckboxSpecification,
  DropdownMenuRadioGroupSpecification,
  DropdownMenuGroupSpecification,
  DropdownMenuSubSpecification,
  ContextMenuComponentSpec,
  ContextMenuItemSpec,
  MenubarComponent,
  MenubarMenuSpec,
  MenubarItemSpec,
  MenubarSubmenuSpec,
  MenubarCheckboxItemSpec,
  MenubarRadioGroupSpec,
  MenubarRadioItemSpec,
  MenubarSeparatorSpec,
  PopoverSpec,
  PopoverTriggerSpec,
  PopoverContentSpec,
  PopoverAnchorSpec,
  HoverCardProps,
  HoverCardTriggerSpec,
  HoverCardContentSpec,
  AlertDialogDefinition,
  NavigationMenuComponent,
  NavigationItemSpec,
  NavigationTriggerSpec,
  NavigationContentSpec,
  NavigationLinkSpec,
  NavigationSectionSpec,
  NavigationFeatureSpec,
  BreadcrumbProps,
  BreadcrumbItemSpec,
  PaginationProps,
  PaginationLinkItemSpec,
  CommandSpec,
  CommandDialogSpec,
  CommandItemSpec,
  CommandGroupSpec,
  CommandInputSpec,
  CommandListSpec,
  CommandEmptySpec,
  CommandGroupComponentSpec,
  CommandItemComponentSpec,
  CommandSeparatorSpec,
  CommandShortcutSpec,
  SidebarComponentProps,
  SidebarSpecification,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroup as SidebarGroupSpec,
  SidebarContent as SidebarContentSpec,
  SidebarSection,
  SidebarInput as SidebarInputSpec,
  SidebarSubMenuItem,
  SidebarMenuItemAction,
  SidebarGroupAction as SidebarGroupActionSpec,
  FAQDef,
  FAQItem,
  FAQCategory,
  FAQSearchOptions,
  FAQVotingOptions,
  FAQContactSupport,
  StatBlockDef,
  StatItem,
  CalendarComponentProps,
  CalendarDateSpec,
  CalendarRangeSpec,
  DatePickerComponentProps,
  ComboboxDef,
  InputOTPDef,
  TableSpec,
  TableCellSpec,
  TableRowSpec,
  TableHeadSpec,
  TableBodySpec,
  TableFooterSpec,
  DataTableSpec,
  DataTableColumnSpec,
  DataTableActionSpec,
  DataTablePaginationSpec,
  DataTableFeaturesSpec,
  CarouselDef,
  ChartComponentProps,
  FooterProps,
  HeadManagerSpec,
  ExtendedHeadManagerSpec,
} from "./types/components";
export type {
  // Re-export from schema with explicit names to avoid conflicts
  ComponentChildren,
  EventHandler,
  AccessibilityProps,
  SkeletonSpec,
  LabelSpec,
  InputSpec,
  UISpecification,
  SpecificationMetadata,
  ThemeSpecification,
  ThemeColors,
  ColorScale,
  ThemeTypography,
  AnimationPreset,
  StateSpecification,
  DataSourceSpecification,
  RestDataSourceConfig,
  GraphQLDataSourceConfig,
  StaticDataSourceConfig,
  WebSocketDataSourceConfig,
  FunctionDataSourceConfig,
  BoxSpec,
  ContainerSpec,
  GridSpec,
  FlexSpec,
  LayoutComponentSpec,
  TextSpec,
  HeadingSpec,
  BlockQuoteSpec,
  TypographyComponentSpec,
  UIComponentSpec,
  ComponentSpec,
  ComponentType,
  ComponentResolver,
  ComponentProps,
  RenderOptions,
  ComponentTypes,

  // Theme types
  ThemeMode,
  ThemePreset,
  ThemeVariant,
  ColorModeSettings,
  ThemeColorModePreset,
  ThemeExtension,
  ThemeToken,
  ThemeGeneratorConfig,
  EnhancedThemeSpecification,
} from "./types/schema";

// Re-export specific hooks that are not in lib barrel
export {
  useDataSources,
  useDataBinding,
  useMutation,
  useIsMobile,
  type DataSourcesState,
  type DataSourceState,
  type UseDataSourcesOptions,
  type RestConfig,
  type GraphQLConfig,
  type StaticConfig,
  type WebSocketConfig,
  type FunctionConfig,
  type UseMutationConfig,
} from "./hooks";

