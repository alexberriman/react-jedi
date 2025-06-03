/**
 * Component Schema Types
 *
 * This file combines all component specification types into a comprehensive type system
 * for the Server-Driven UI architecture.
 */

import type { BaseComponentSpec } from "./base";
import type { LayoutComponentSpec } from "./layout";
import type { TypographyComponentSpec } from "./typography";
import type { UIComponentSpec } from "./ui";
export type { UISpecification } from "./specification";

/**
 * Union type of all component specifications.
 * This represents any component that can be rendered in the UI.
 */
export type ComponentSpec =
  | BaseComponentSpec
  | LayoutComponentSpec
  | TypographyComponentSpec
  | UIComponentSpec;

/**
 * Type for component type strings.
 * This helps with type checking when resolving components.
 */
export type ComponentType = ComponentSpec["type"];

/**
 * Component resolver function type.
 * Maps component types to their React implementations.
 * Uses ComponentProps as the base props that all components will receive.
 */
export type ComponentResolver = (type: string) => React.ComponentType<ComponentProps> | null;

/**
 * Component props to be passed to resolved React components.
 */
export interface ComponentProps {
  /**
   * The component specification.
   */
  spec: ComponentSpec;

  /**
   * Optional children to render inside the component.
   */
  children?: React.ReactNode;

  /**
   * Optional theme context.
   */
  theme?: Record<string, unknown>;

  /**
   * Optional global state.
   */
  state?: Record<string, unknown>;

  /**
   * Optional parent component context.
   */
  parentContext?: Record<string, unknown>;
}

/**
 * Component render options.
 */
export interface RenderOptions {
  /**
   * Custom component resolver.
   */
  resolver?: ComponentResolver;

  /**
   * Theme configuration.
   */
  theme?: Record<string, unknown>;

  /**
   * Initial state values.
   */
  initialState?: Record<string, unknown>;

  /**
   * Whether to enable development mode with additional debugging.
   * @default false
   */
  development?: boolean;

  /**
   * Whether to show error boundaries around components.
   * @default true
   */
  errorBoundaries?: boolean;

  /**
   * Custom error handler for component rendering errors.
   */
  onError?: (error: Error, componentType: string) => void;

  /**
   * Custom event handlers.
   */
  handlers?: Record<string, (...args: unknown[]) => void>;

  /**
   * Environment variables available to expressions.
   */
  env?: Record<string, string>;

  /**
   * Style context for style extension system.
   */
  styleContext?: import("@/lib/theme/style-extension").StyleContext;

  /**
   * Whether to use the style extension system.
   * @default true
   */
  useStyleExtension?: boolean;

  /**
   * State manager instance for state management.
   * Internal use - populated by the render function.
   */
  stateManager?: import("@/lib/state").StateManager;

  /**
   * Memoization options for performance optimization.
   */
  memoization?: import("@/lib/performance/memoization").MemoizationOptions;

  /**
   * State optimization configuration for performance.
   */
  stateOptimization?: import("@/lib/performance/state-optimizations").StateOptimizationConfig;

  /**
   * Data sources state for data binding.
   * Populated when data sources are available.
   */
  dataSources?: import("@/hooks/use-data-sources").DataSourcesState;

  /**
   * Options for data source fetching.
   */
  dataSourceOptions?: import("@/hooks/use-data-sources").UseDataSourcesOptions;

  /**
   * Template variables for variable substitution in string values.
   * Variables can be referenced in strings using {{variableName}} syntax.
   * Supports nested properties using dot notation (e.g., {{user.name}}).
   * Reserved variables like {{currentYear}} are automatically available.
   */
  variables?: Record<string, unknown>;
}

/**
 * Type guard to check if a component spec is a specific type.
 *
 * @param spec The component specification to check
 * @param type The component type to check against
 * @returns True if the component is of the specified type
 */
export function isComponentType<T extends ComponentSpec>(
  spec: ComponentSpec,
  type: ComponentType
): spec is T {
  return spec.type === type;
}

/**
 * Type with all component types mapped to their specifications.
 * This helps with type checking when accessing component props.
 */
export interface ComponentTypes {
  // Layout Components
  Box: import("./layout").BoxSpec;
  Container: import("./layout").ContainerSpec;
  Grid: import("./layout").GridSpec;
  Flex: import("./layout").FlexSpec;
  AspectRatio: import("./layout").AspectRatioSpec;
  Separator: import("./layout").SeparatorSpec;
  ScrollArea: import("../components/scroll-area").ScrollAreaSpecification;
  Stack: import("../components/stack").StackSpec;
  Group: import("../components/group").GroupSpec;

  // Typography Components
  Text: import("./typography").TextSpec;
  Heading: import("./typography").HeadingSpec;
  BlockQuote: import("./typography").BlockQuoteSpec;

  // UI Components
  Button: import("./ui").ButtonSpec;
  Card: import("./ui").CardSpec;
  Badge: import("./ui").BadgeSpec;
  Avatar: import("./ui").AvatarSpec;
  Image: import("./ui").ImageSpec;
  Skeleton: import("./ui").SkeletonSpec;
  Label: import("./ui").LabelSpec;
  Input: import("./input").InputSpec;
  Textarea: import("./ui").TextareaSpec;
  Checkbox: import("./ui").CheckboxSpec;
  RadioGroup: import("./ui").RadioGroupSpec;
  RadioGroupItem: import("./ui").RadioGroupItemSpec;
  Select: import("./ui").SelectSpec;
  SelectContent: import("./ui").SelectContentSpec;
  SelectGroup: import("./ui").SelectGroupSpec;
  SelectItem: import("./ui").SelectItemSpec;
  SelectLabel: import("./ui").SelectLabelSpec;
  SelectSeparator: import("./ui").SelectSeparatorSpec;
  SelectTrigger: import("./ui").SelectTriggerSpec;
  SelectValue: import("./ui").SelectValueSpec;
  Toggle: import("../components/toggle").ToggleSpec;
  ToggleGroup: import("../components/toggle-group").ToggleGroupSpec;
  ToggleGroupItem: import("../components/toggle-group").ToggleGroupItemSpec;
  Tabs: import("../components/tabs").TabsSpecification;
  TabsList: import("../components/tabs").TabsListSpecification;
  TabsTrigger: import("../components/tabs").TabsTriggerSpecification;
  TabsContent: import("../components/tabs").TabsContentSpecification;
  Popover: import("../components/popover").PopoverSpec;
  PopoverTrigger: import("../components/popover").PopoverTriggerSpec;
  PopoverContent: import("../components/popover").PopoverContentSpec;
  PopoverAnchor: import("../components/popover").PopoverAnchorSpec;

  // Date/Time Components
  Calendar: import("../components/calendar").CalendarComponentProps;
  DatePicker: import("../components/date-picker").DatePickerComponentProps;

  // Data Display Components
  Table: import("../components/table").TableSpec;
  DataTable: import("../components/data-table").DataTableSpec;
}
